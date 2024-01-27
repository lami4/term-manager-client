<template>
    <div :class="['grid-wrapper', {'grid-wrapper--overflow': isOverflowDisplayMode}]">
        <table 
            ref="table"
            :class="['base-grid', {'base-grid--fit': isFitDisplayMode, 'base-grid--overflow': isOverflowDisplayMode}]">
            <thead class="base-grid__header">
                <tr>
                    <th v-for="column in columns"
                        :key="column.id"
                        :data-column-id="column.htmlId"
                        :style="getStyle()">
                        <slot name="headerCell" v-bind:column="column">
                            {{column.name}}
                        </slot>
                        <div :class="['base-grid__column-resizer']" 
                            v-if="isColumnResizingEnabled" 
                            @mousedown.stop="startColumnResize($event)"></div>
                    </th>
                </tr>
            </thead>
            <tbody class="base-grid__body">
                <tr v-for="entry in entries"
                    :key="entry.id"
                    :data-entry-id="entry.id"
                    @click="selectEntry($event, entry)">
                    <td v-for="column in columns" 
                        :key="column.id" 
                        :data-column-id="column.htmlId">
                        <slot name="bodyCell" v-bind:value="entry">
                            {{cellRenderer(column, entry)}}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
        <div ref="column-resizer-line" class="base-grid__column-resizer-line"></div>
    </div>
</template>


<script>
import Constants from './constants/Constants';
export default {
    name: "BaseGrid",
    props: {
        columns: {
            required: true,
            type: Array,
        },
        entries: {
            required: true,
            type: Array
        },
        isRowSelectEnabled: {
            required: false,
            type: Boolean,
            default: true
        },
        isRowUnselectEnabled: {
            required: false,
            type: Boolean,
            default: false
        },
        displayMode: {
            required: false,
            type: String,
            validate: propValue => [Constants.FIT, Constants.OVERFLOW].includes(propValue),
            default: Constants.FIT
        },
        isColumnResizingEnabled: {
            required: false,
            type: Boolean,
            default: false
        },
        columnMinWidth: {
            required: false,
            type: Number,
            default: 70
        },
        defaultColumnWidth: {
            required: false,
            type: Number,
            default: 200
        },
        columnResizingThrottling: {
            required: false,
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            selectedTr: null
        }
    },
    computed: {
        labels() {
            return Object.fromEntries(
                this.columns.map(column => {
                    const labels = column.dropdownOptions ? Object.fromEntries(column.dropdownOptions.map(option => [option.id, option.name])) : {}
                    return [column.htmlId, labels]
                })
            );
        },
        isOverflowDisplayMode() {
            return this.displayMode === Constants.OVERFLOW;
        },
        isFitDisplayMode() {
            return this.displayMode === Constants.FIT;
        }
    },
    methods: {
        getStyle() {
            if (this.isOverflowDisplayMode) {
                return `width: ${this.defaultColumnWidth}px; max-width: ${this.defaultColumnWidth}px;`
            }
            return '';
        },
        //TODO: move to utils.js
        throttleEvent(cb, context) {
            let isEventAllowed = true;
            return event => {
                if (isEventAllowed) {
                    cb(event, context);
                    isEventAllowed = false;
                    setTimeout(() => isEventAllowed = true, this.columnResizingThrottling);
                }
            }
        },
        startColumnResize(event) {
            if (this.isFitDisplayMode) {
                this.resizeColumnInFitMode(event);
            }
            if (this.isOverflowDisplayMode) {
                this.resizeColumnInOverflowMode(event);
            }
        },
        initColumnResizerLine(context) {
            context.columnResizerLine.style.display = 'block';
            context.columnResizerLine.style.top = 0;
            context.columnResizerLine.style.left = (context.initialMousePosition - context.tableSizeAndPositioningInfo.x) + 'px';
            context.columnResizerLine.style.height = context.tableSizeAndPositioningInfo.height + 'px';
        },
        resizeColumnInFitMode(event) {
            //THE TABLE MUST MEET THE FOLLOWING CONDITIONS TO BE ABLE TO RESIZED IN THIS MODE:
            //1. table must have width: 100%; and table-layout: fixed;
            //2. you can play with overflow: hidden; white-space: nowrap; (must be placed on th and td)
            //to control the way overlflow is working
            const table = this.$refs['table'];
            const column = event.target.parentNode;
            const neighbourColumn = column.nextSibling;
            const context = {
                tableSizeAndPositioningInfo: table.getBoundingClientRect(),
                columnResizerLine: this.$refs['column-resizer-line'],
                columnResizerLinePosition: null,
                column,
                initialColumnWidth: column.offsetWidth,
                neighbourColumn,
                initialNeighbourColumnWidth: neighbourColumn.offsetWidth,
                initialMousePosition: event.clientX,
                allowedMousePositionLeftOffset: event.clientX - (column.offsetWidth - this.columnMinWidth),
                allowedMousePositionRightOffset: event.clientX + (neighbourColumn.offsetWidth - this.columnMinWidth)
            }

            //show column resizer
            this.initColumnResizerLine(context);

            //create handlers
            const onMouseMoveHandler = this.throttleEvent(moveColumnResizerLine, context);
            const mouseUpHandler = event => applyColumnResizing(event, context);

            //create listeners
            document.addEventListener('mousemove', onMouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);

            //hide column resize line and remove listeners
            function terminateColumnResize() {
                context.columnResizerLine.style.display = 'none';
                document.removeEventListener('mousemove', onMouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            }

            //function responsible for moving the column resizer on the mouse-move event
            function moveColumnResizerLine(event, context) {
                if (context.allowedMousePositionLeftOffset > event.clientX || event.clientX > context.allowedMousePositionRightOffset) return;
                context.columnResizerLinePosition = event.clientX - context.tableSizeAndPositioningInfo.x;
                context.columnResizerLine.style.left = context.columnResizerLinePosition + 'px';
            }

            //function responsible for applying the column resizing on the mouse-up event
            function applyColumnResizing(event, context) {
                if (context.initialMousePosition === event.clientX) {
                    terminateColumnResize();
                    return;
                }
                const mousePositionOffset = context.columnResizerLinePosition + context.tableSizeAndPositioningInfo.x - context.initialMousePosition;
                context.column.style.width = (context.initialColumnWidth + mousePositionOffset) + 'px';
                context.neighbourColumn.style.width = (context.initialNeighbourColumnWidth - mousePositionOffset) + 'px';
                terminateColumnResize();
            };
        },
        resizeColumnInOverflowMode(event) {
            //THE TABLE MUST MEET THE FOLLOWING CONDITIONS TO BE ABLE TO RESIZED IN THIS MODE:
            //1. table wrapper must have overflow-x set to auto
            //2. table must have width set to max-content;
            //if max-content is not supported by browser, resize table width -> context.table.style.width = (context.initialTableWidth + mousePositionOffset) + 'px';
            //3. th must have inline width attribute
            //4. you must set width and max-width on all cells with the given id
            const table = this.$refs['table'];
            const column = event.target.parentNode;
            const context = {
                table,
                tableSizeAndPositioningInfo: table.getBoundingClientRect(),
                columnResizerLine: this.$refs['column-resizer-line'],
                columnResizerLinePosition: null,
                column,
                initialColumnWidth: column.offsetWidth,
                initialMousePosition: event.clientX,
                allowedMousePositionLeftOffset: event.clientX - (column.offsetWidth - this.columnMinWidth)
            }
            
            //show column resizer
            this.initColumnResizerLine(context);

            //create handlers
            const onMouseMoveHandler = this.throttleEvent(moveColumnResizerLine, context);
            const mouseUpHandler = event => applyColumnResizing(event, context);

            //create listeners
            document.addEventListener('mousemove', onMouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
            
            //function responsible for moving the column resizer on the mouse-move event
            function moveColumnResizerLine(event, context) {
                if (context.allowedMousePositionLeftOffset > event.clientX) return;
                context.columnResizerLinePosition = event.clientX - context.tableSizeAndPositioningInfo.x;
                context.columnResizerLine.style.left = context.columnResizerLinePosition + 'px';
            }

            //hide column resize line and remove listeners
            function terminateColumnResize() {
                context.columnResizerLine.style.display = 'none';
                document.removeEventListener('mousemove', onMouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            }

            function applyColumnResizing(event, context) {
                if (context.initialMousePosition === event.clientX) {
                    terminateColumnResize();
                    return;
                };
                const mousePositionOffset = context.columnResizerLinePosition + context.tableSizeAndPositioningInfo.x - context.initialMousePosition;
                const newWidth = (context.initialColumnWidth + mousePositionOffset) + 'px';
                const cells = context.table.querySelectorAll(`[data-column-id=${context.column.getAttribute('data-column-id')}]`);
                for (let i = 0; i < cells.length; i++) {
                    cells[i].style.width = newWidth;
                    cells[i].style.maxWidth = newWidth;
                }
                terminateColumnResize();
            }
        },
        selectEntry(event, term) {
            if (this.isRowSelectEnabled) {
                const tr = event.target.parentNode;
                if (this.selectedTr === tr) {
                    if (!this.isRowUnselectEnabled) return;
                    this.selectedTr.classList.remove("selected-row");
                    this.selectedTr = null;
                    this.$emit('unselect-entry', null);
                    return;
                }
                if (this.selectedTr && this.selectedTr !== tr) {
                    this.selectedTr.classList.remove("selected-row");
                    this.selectedTr = tr;
                    this.selectedTr.classList.toggle("selected-row");
                } else {
                    this.selectedTr = tr;
                    this.selectedTr.classList.toggle("selected-row");
                }
                this.$emit('select-entry', term);
            }
        },
        cellRenderer(column, entry) {
            if (this.isDropdownOption(column)) {
                return this.labels[column.htmlId][entry.properties[column.htmlId]];
            }
            return entry.properties ? entry.properties[column.htmlId] : entry[column.htmlId];
        },
        isDropdownOption(column) {
            return column.elementType === 'SELECT';
        }
    }
}
</script>

<style lang="scss">
$page-bgc: #f8fcfd;
$grid-base-bgc: #fff;
$grid-base-font-color: #343a40;
$header-font-color: #fff;
$header-bgc: #6f8faf;
$base-selection-bgc: #e0e0e0;

.grid-wrapper {
    position: relative;
    &--overflow {
        overflow-x: auto;
    }
}

.base-grid {
    border-collapse: collapse;
    color: $grid-base-font-color;
    background-color: $grid-base-bgc;
    &--fit {
        width: 100%;
        table-layout: fixed;
    }

    &--overflow {
        width: max-content;
    }

    &__header th,
    &__body td {
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
        text-align: left;
        padding: 10px 0 10px 15px;
    }

    &__header {
        font-size: 16px;
        background-color: $header-bgc;
        color: $header-font-color;
        & th {
            position: relative;
            border-right: solid $base-selection-bgc 1px;
            &:last-child .base-grid__column-resizer {
                display: none;
            }
        }
    }

    &__column-resizer {
        position: absolute;
        top: 0;
        right: 0;
        width: 5px;
        cursor: col-resize;
        user-select: none;
        height: 100%;
        box-sizing: border-box;
    }

    &__column-resizer-line {
        width: 1px;
        position: absolute;
        display: none;
        background: $base-selection-bgc;
    }

    &__body {
        & td {
            border: solid $base-selection-bgc 1px;
        }

        & tr {
            &.selected-row {
                background-color: $base-selection-bgc;
            }
        }
    }

}
</style>