<template>
    <div :class="['grid-wrapper', {'grid-wrapper--overflow': isOverflowDisplayMode}]">
        <table :class="['base-grid', {'base-grid--fit': isFitDisplayMode, 'base-grid--overflow': isOverflowDisplayMode}]">
            <thead class="base-grid__header">
                <tr>
                    <th v-for="column in columns"
                        :key="column.id"
                        :data-column-id="column.htmlId"
                        :style="getStyle()">
                        <slot name="headerCell" v-bind:column="column">
                            {{column.name}}
                        </slot>
                        <div :class="['base-grid__resizer']" 
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
        resizeColumnInFitMode(event) {
            //THE TABLE MUST MEET THE FOLLOWING CONDITIONS TO BE ABLE TO RESIZED IN THIS MODE:
            //1. table must have width: 100%; and table-layout: fixed;
            //2. you can play with overflow: hidden; white-space: nowrap; (must be placed on th and td)
            //to control the way overlflow is working
            const column = event.target.parentNode;
            const neighbourColumn = column.nextSibling;
            const context = {
                column,
                neighbourColumn,
                initialMousePosition: event.clientX,
                initialColumnWidth: column.offsetWidth,
                initialNeighbourColumnWidth: neighbourColumn.offsetWidth,
                allowedMousePositionLeftOffset: event.clientX - (column.offsetWidth - this.columnMinWidth),
                allowedMousePositionRightOffset: event.clientX + (neighbourColumn.offsetWidth - this.columnMinWidth)
            }

            function resizeColumn(event, context) {
                if (context.allowedMousePositionLeftOffset > event.clientX || event.clientX > context.allowedMousePositionRightOffset)  return;
                const mousePositionOffset = event.clientX - context.initialMousePosition;
                context.column.style.width = (context.initialColumnWidth + mousePositionOffset) + 'px';
                context.neighbourColumn.style.width = (context.initialNeighbourColumnWidth - mousePositionOffset) + 'px';
            };

            //create handlers
            const onMouseMoveHandler = this.throttleEvent(resizeColumn, context);
            const mouseUpHandler = function () {
                event.target.classList.remove('resizing');
                document.removeEventListener('mousemove', onMouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };
            //create listeners
            document.addEventListener('mousemove', onMouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
            event.target.classList.add('resizing');
        },
        resizeColumnInOverflowMode(event) {
            //THE TABLE MUST MEET THE FOLLOWING CONDITIONS TO BE ABLE TO RESIZED IN THIS MODE:
            //1. table wrapper must have overflow-x set to auto
            //2. table must have width set to max-content;
            //if max-content is not supported by browser, resize table width -> context.table.style.width = (context.initialTableWidth + mousePositionOffset) + 'px';
            //3. th must have inline width attribute
            //4. you must set width and max-width on all cells with the given id
            const table = event.target.closest('table');
            const column = event.target.parentNode;
            const context = {
                column,
                table,
                initialMousePosition: event.clientX,
                initialTableWidth: table.offsetWidth,
                initialColumnWidth: column.offsetWidth,
                allowedMousePositionLeftOffset: event.clientX - (column.offsetWidth - this.columnMinWidth)
            }
            function resizeColumn(event, context) {
                if (context.allowedMousePositionLeftOffset > event.clientX) return;
                const mousePositionOffset = event.clientX - context.initialMousePosition;
                const delta = (context.initialColumnWidth + mousePositionOffset) + 'px';
                const cells = context.table.querySelectorAll(`[data-column-id=${context.column.getAttribute('data-column-id')}]`);
                for (let i = 0; i < cells.length; i++) {
                    cells[i].style.width = delta;
                    cells[i].style.maxWidth = delta;
                }
            };

            //create handlers
            const onMouseMoveHandler = this.throttleEvent(resizeColumn, context);
            const mouseUpHandler = function () {
                event.target.classList.remove('base-grid__resizer--resizing');
                document.removeEventListener('mousemove', onMouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };
            //create listeners
            document.addEventListener('mousemove', onMouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
            event.target.classList.add('base-grid__resizer--resizing');

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
    &--overflow {
        overflow-x: auto;
    }
}

.base-grid {
    border-collapse: separate;
    border-spacing: 0px;
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
            border: solid $header-bgc 3px;
            &:last-child .base-grid__resizer {
                display: none;
            }
        }
    }

    &__resizer {
        position: absolute;
        top: 0;
        right: 0;
        width: 5px;
        cursor: col-resize;
        user-select: none;
        height: 100%;
        border-right: 2px solid blue;
        box-sizing: border-box;

        &:hover,
        &--resizing {
            border-right: 2px solid black;
        }
    }

    &__body {
        & td {
            border-bottom: solid $base-selection-bgc 1px;
        }

        & tr {
            &.selected-row {
                background-color: $base-selection-bgc;
            }
        }
    }

}
</style>