<template>
    <div class="grid-wrapper">
        <table class="base-grid">
            <thead class="base-grid__header">
            <tr>
                <th v-for="column in columns"
                    :key="column.id"
                    :data-column-id="column.htmlId">
                    <slot name="headerCell" v-bind:column="column">
                        {{column.name}}
                    </slot>
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
    },
    data() {
        return {
            selectedTr: null
        }
    },
    computed: {
        labels() {
            return Object.fromEntries(
                this.columns.map(column => [column.htmlId, Object.fromEntries(
                    column.dropdownOptions.map(option => [option.id, option.name]))]
                )
            );
        }
    },
    methods: {
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

.base-grid {
    width: 100%;
    overflow-wrap: break-word;
    border-collapse: separate;
    border-spacing: 0px;
    color: $grid-base-font-color;
    background-color: $grid-base-bgc;

    &__header th,
    &__body td {
        text-align: left;
        padding: 10px 0 10px 15px;
        min-width: 250px;
    }

    &__header {
        font-size: 16px;
        background-color: $header-bgc;
        color: $header-font-color;
        & th {
            border: solid $header-bgc 3px;
            &.selected-column {
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