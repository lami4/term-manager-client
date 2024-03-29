<template>
    <BaseDialog
        :show="show"
        :title="dialogTitle"
        @close="$emit('close')"
        @submit="onSubmit()"
        :submit-button-label="submitButtonLabel"
        ref="baseDialog">
        <template v-slot:body>
            <BaseInput
                key="parameter-1"
                class="dialogbox__base-input"
                label="Column name"
                v-model="column.name"
                :is-required="true"
                :validation-rules="uniqueNameRule"/>
            <BaseCheckbox
                class="dialogbox__base-dropdown"
                key="parameter-2"
                label="Is mandatory"
                v-model="column.mandatory"/>
            <BaseCheckbox
                class="dialogbox__base-dropdown"
                key="parameter-3"
                label="Is filterable"
                v-model="column.filterable"/>
            <BaseCheckbox
                class="dialogbox__base-dropdown"
                key="parameter-4"
                label="Is sortable"
                v-model="column.sortable"/>
            <BaseDropdown
                key="parameter-5"
                class="dialogbox__base-dropdown"
                label="Type"
                :options="elementTypes"
                v-model="column.elementType"
                :is-required="true"/>
            <ReorderableList
                key="parameter-6"
                :mapper="mapper"
                v-if="column.elementType === 'SELECT'"
                v-model="column.dropdownOptions"
                label="Dropdown options"/>
        </template>
    </BaseDialog>
</template>

<script>
import BaseDialog from "../../../components/BaseDialog";
import ReorderableList from "../../../components/SortableList/ReorderableList";
import Column from "../domain/Column.js"
import ElementType from "../domain/ElementType";
import {mapActions, mapState} from "vuex";
import ColumnDropdownOption from "../domain/ColumnDropdownOption";
export default {
    name: "ManageColumnDialog",
    components: {
        BaseDialog,
        ReorderableList
    },
    props: {
        show: {
            type: Boolean,
            required: true
        },
        isCreate: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            column: new Column(),
            sortableListElements: []
        }
    },
    computed: {
        ...mapState('TermGridSettings', {
            selectedColumn: "selectedColumn",
            columns: "columns",
        }),
        submitButtonLabel() {
            return this.isCreate ? 'Create' : 'Apply';
        },
        dialogTitle() {
            return this.isCreate ? 'Create new column' : 'Edit column';
        },
        elementTypes() {
            return ElementType.elementTypes;
        },
        uniqueNameRule() {
            return {
                isColumnNameUnique: {
                    columns: this.columns,
                    originalName: this.isCreate ? null : this.selectedColumn?.name
                }
            }
        }
    },
    watch: {
        show(newValue) {
            if (newValue) {
                this.column = this.isCreate ? new Column() : new Column(this.selectedColumn);
            }
        }
    },
    methods: {
        ...mapActions('TermGridSettings', {
            addColumnAction: 'addColumn',
            updateColumnAction: 'updateColumn'
        }),
        onSubmit() {
            this.$refs.baseDialog.validate().then(isValid => {
                if (isValid) {
                    this.$emit(this.isCreate ? 'create-column' : 'edit-column', this.column);
                }
            });
        },
        mapper(reorderableItems) {
            return reorderableItems.map(item => new ColumnDropdownOption({columnId: this.selectedColumn?.id,...item}));
        }
    }
}
</script>

<style>
</style>