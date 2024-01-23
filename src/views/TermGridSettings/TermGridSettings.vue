<template>
    <div class="term-grid-settings-wrp">
        <Toolbar
            class="term-grid-settings__toolbar"
            :mode="'custom'">
            <BaseButton
                class="base-button--xs toolbar__base-button--default"
                @click="onCreateColumnClick()"
                label="Create"/>
            <BaseButton
                class="base-button--xs toolbar__base-button--default"
                @click="onEditColumnClick()"
                label="Edit"
                :disabled="!isAnyRowSelected"/>
            <BaseButton
                class="base-button--xs toolbar__base-button--default"
                @click="onDeleteColumnClick()"
                label="Delete"
                :disabled="!isAnyRowSelected"/>
            <BaseButton
                class="base-button--xs toolbar__base-button--default"
                @click="onReorderColumnsClick()"
                label="Reorder columns"/>
        </Toolbar>
        <BaseGrid
            :columns="gridColumns"
            :entries="columns"
            @select-entry="updateSelectedColumn($event)">
        </BaseGrid>
        <ManageColumnDialog
            :show="showManageColumnDialog"
            :is-create="isCreate"
            @create-column="onCreateColumn($event)"
            @edit-column="onEditColumn($event)"
            @close="showManageColumnDialog = false"/>
        <ReorderColumnsDialog
            :show="showReorderColumnsDialog"
            @close="showReorderColumnsDialog = false"
            @reorder-columns="onReorderColumns($event)"/>
        <YesNoDialogBox
            title="Delete column"
            message="Are you sure you want to delete the selected column?"
            :show="showYesNoDialog"
            @close="showYesNoDialog = false"
            event-name="delete-column"
            @delete-column="onDeleteColumn()"/>
    </div>
</template>

<script>
import BaseGrid from '../../components/BaseGrid/BaseGrid.vue';
import YesNoDialogBox from '../../components/YesNoDialog';
import Toolbar from '../../components/Toolbar';
import {mapActions, mapState} from 'vuex';
import TermGridSettingsService from "../../services/TermGridSettingsService";
import ManageColumnDialog from './components/ManageColumnDialog.vue';
import ReorderColumnsDialog from './components/ReorderColumnsDialog.vue'

export default {
    name: 'TermGridSettings',
    components: {
        YesNoDialogBox,
        BaseGrid,
        Toolbar,
        ManageColumnDialog,
        ReorderColumnsDialog
    },
    data() {
        return {
            gridColumns: [
                {
                    htmlId: 'name',
                    id: 1,
                    name: 'Column name',
                },
                {
                    htmlId: 'elementType',
                    id: 2,
                    name: 'Column type',
                },
                {
                    htmlId: 'mandatory',
                    id: 3,
                    name: 'Is mandatory',
                },
                {
                    htmlId: 'filterable',
                    id: 4,
                    name: 'Is filterable',
                },
                {
                    htmlId: 'sortable',
                    id: 5,
                    name: 'Is sortable',
                },
            ],
            showYesNoDialog: false,
            showManageColumnDialog: false,
            showReorderColumnsDialog: false,
            isCreate: true
        }
    },
    computed: {
        ...mapState('TermGridSettings', {
            selectedColumn: 'selectedColumn',
            columns: 'columns',
        }),
        isAnyRowSelected() {
            return !!this.selectedColumn;
        }
    },
    methods: {
        ...mapActions('TermGridSettings', {
            updateSelectedColumn: 'updateSelectedColumn',
        }),
        onCreateColumnClick() {
            this.isCreate = true;
            this.showManageColumnDialog = true;
        },
        onEditColumnClick() {
            this.isCreate = false;
            this.showManageColumnDialog = true;
        },
        onDeleteColumnClick() {
            this.showYesNoDialog = true;
        },
        onReorderColumnsClick() {
            this.showReorderColumnsDialog = true;
        },
        onCreateColumn(column) {
            TermGridSettingsService.addColumn(column).then(() => this.showManageColumnDialog = false);
        },
        onEditColumn(column) {
            TermGridSettingsService.updateColumn(column).then(() => this.showManageColumnDialog = false);
        },
        onDeleteColumn() {
            TermGridSettingsService.deleteColumn(this.selectedColumn);
        },
        onReorderColumns(reorderSettings) {
            TermGridSettingsService.reorderColumns(reorderSettings).then(() => this.showReorderColumnsDialog = false);
        }
    },
    mounted() {
        TermGridSettingsService.getColumns();
    }
}
</script>

<style>
.term-grid-settings-wrp {
    padding: 0 10px;
}
.term-grid-settings__toolbar {
    margin-bottom: 5px;
}
</style>