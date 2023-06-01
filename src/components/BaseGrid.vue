<template>
    <div class="grid-wrapper">
        <table class="base-grid">
            <thead :class="{'selectable': isColumnSelectEnabled}">
            <tr>
                <th v-for="column in columns"
                    :key="column.id"
                    :data-column-id="column.htmlId"
                    @click="selectColumn($event, column)">
                    <slot name="headerCell" v-bind:column="column">
                        {{column.name}}
                    </slot>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="entry in entries"
                :key="entry.id"
                :data-entry-id="entry.id"
                @click="selectEntry($event, entry)">
                <td v-for="column in columns" :key="column.id" :data-column-id="column.htmlId">
                    <slot name="bodyCell" v-bind:value="entry.properties ? entry.properties[column.htmlId] : entry[column.htmlId]">
                        {{entry.properties ? entry.properties[column.htmlId] : entry[column.htmlId]}}
                    </slot>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
//TODO: DESIGN DIALOG BOX AND INPUTS
//REFACTOR: CONTROLLER FOR LESS
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
        isColumnSelectEnabled: {
            required: false,
            type: Boolean,
            default: false
        },
        isColumnUnselectEnabled: {
            required: false,
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            selectedTr: null,
            selectedTh: null,
        }
    },
    methods: {
        selectEntry(event, term) {
            if (this.isRowSelectEnabled) {
                const tr = event.target.parentNode;
                if (this.selectedTh) {
                    this.selectedTh.classList.remove("selected");
                    this.selectedTh = null;
                }
                if (this.selectedTr === tr) {
                    if (!this.isRowUnselectEnabled) return;
                    this.selectedTr.classList.remove("selected");
                    this.selectedTr = null;
                    this.$emit('unselect-entry', null);
                    return;
                }
                if (this.selectedTr && this.selectedTr !== tr) {
                    this.selectedTr.classList.remove("selected");
                    this.selectedTr = tr;
                    this.selectedTr.classList.toggle("selected");
                } else {
                    this.selectedTr = tr;
                    this.selectedTr.classList.toggle("selected");
                }
                this.$emit('select-entry', term);
                if (this.isColumnSelectEnabled) {
                    this.$emit('unselect-column', null);
                }
            }
        },
        selectColumn(event, column) {
            if (this.isColumnSelectEnabled) {
                const th = event.target
                if (this.selectedTr) {
                    this.selectedTr.classList.remove("selected");
                    this.selectedTr = null;
                }
                if (this.selectedTh === th) {
                    if (!this.isColumnUnselectEnabled) return;
                    this.selectedTh.classList.remove("selected");
                    this.selectedTh = null;
                    this.$emit('select-column', null);
                    return;
                }
                if (this.selectedTh && this.selectedTh !== th) {
                    this.selectedTh.classList.remove("selected");
                    this.selectedTh = th;
                    this.selectedTh.classList.toggle("selected");
                } else {
                    this.selectedTh = th;
                    this.selectedTh.classList.toggle("selected");
                }
                this.$emit('unselect-entry', null);
                this.$emit('select-column', column);
            }
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

.base-grid {
    width: 100%;
    overflow-wrap: break-word;
    border-collapse: separate;
    border-spacing: 0px;
    color: $grid-base-font-color;
    background-color: $grid-base-bgc;

    & th,
    & td {
        text-align: left;
        padding: 10px 0 10px 15px;
    }

    & thead {
        font-size: 16px;
        background-color: $header-bgc;
        color: $header-font-color;
        & th {
            border: solid $header-bgc 3px;
            &.selected {
                border: solid $page-bgc 3px;
                background-color: $base-selection-bgc;
                cursor: pointer;
            }
        }
        &.selectable th:not(.selected):hover {
            border-color: $page-bgc;
            cursor: pointer;
        }
    }

    & tbody {
        & td {
            border-bottom: solid $base-selection-bgc 1px;
        }

        & tr {
            &.selected {
                background-color: $base-selection-bgc;
            }
        }
    }

}
</style>