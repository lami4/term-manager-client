<template>
    <div class="term-manager-wrp">
        <Toolbar
            class="term-manager__toolbar"
            mode="term-manager"
            @create-term-click="onCreateTermClick()"
            @edit-term-click="onEditTermClick()"
            @delete-term-click="onDeleteTermClick()"
            @suggest-term-click="onSuggestTermClick()"
            @create-column-click="onCreateColumnClick()"
            @edit-column-click="onEditColumnClick()"
            @delete-column-click="onDeleteColumnClick()"
            @reorder-columns-click="onReorderColumnsClick()"/>
        <BaseGrid
            :columns="columns"
            :entries="terms"
            @select-entry="updateSelectedTerm($event)"
            @unselect-entry="updateSelectedTerm($event)"
            @select-column="updateSelectedColumn($event)"
            @unselect-column="updateSelectedColumn($event)"
            :is-column-select-enabled="isColumnsSelectable"
            :is-column-unselect-enabled="isColumnsSelectable"/>
        <ManageTermDialog
            :show="showManageTermDialog"
            :is-create="isCreate"
            :mode="manageTermDialogMode"
            @create-term="onCreateTerm($event)"
            @edit-term="onEditTerm($event)"
            @suggest-term="onSuggestTerm($event)"
            @close="showManageTermDialog = false"/>
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
            :title="yesNoDialogTitle"
            :message="yesNoDialogMessage"
            :show="showYesNoDialog"
            @close="showYesNoDialog = false"
            :event-name="yesNoDialogEvent"
            @delete-term="onDeleteTerm()"
            @delete-column="onDeleteColumn()"/>
        </div>
</template>

<script>
import Toolbar from '../../components/Toolbar.vue';
import BaseGrid from '../../components/BaseGrid.vue';
import ManageColumnDialog from './components/ManageColumnDialog.vue';
import ManageTermDialog from './components/ManageTermDialog.vue';
import YesNoDialogBox from '../../components/YesNoDialog.vue';
import AuthenticationService from '../../services/AuthenticationService';
import ReorderColumnsDialog from './components/ReorderColumnsDialog';
import TermGridService from '../../services/TermGridService';
import SuggestionManagerService from '../../services/SuggestionManagerService';
import {mapActions, mapState} from 'vuex';
import SystemPrivileges from "../UserManager/domain/SystemPrivileges";

export default {
    name: 'TermManager',
    components: {
        BaseGrid,
        Toolbar,
        ManageColumnDialog,
        ManageTermDialog,
        ReorderColumnsDialog,
        YesNoDialogBox
    },
    data() {
        return {
            showYesNoDialog: false,
            showManageTermDialog: false,
            manageTermDialogMode: 'default',
            showManageColumnDialog: false,
            showReorderColumnsDialog: false,
            isCreate: true,
            yesNoDialogEvent: '',
            yesNoDialogTitle: '',
            yesNoDialogMessage: ''
        }
    },
    computed: {
        ...mapState('TermManager', {
            selectedTerm: 'selectedTerm',
            selectedColumn: 'selectedColumn',
            columns: 'columns',
            terms: 'terms'
        }),
        ...mapState('Session', {
            userPrivileges: 'userPrivileges'
        }),
        isColumnsSelectable() {
            return this.userPrivileges.includes(SystemPrivileges.TERM_GRID_MANAGER);
        }
    },
    methods: {
        ...mapActions('TermManager', {
            updateSelectedTerm: 'updateSelectedTerm',
            updateSelectedColumn: 'updateSelectedColumn'
        }),
        onCreateTermClick() {
            this.manageTermDialogMode = 'default';
            this.isCreate = true;
            this.showManageTermDialog = true;
        },
        onEditTermClick() {
            this.manageTermDialogMode = 'default';
            this.isCreate = false;
            this.showManageTermDialog = true;
        },
        onDeleteTermClick() {
            this.yesNoDialogEvent = 'delete-term';
            this.yesNoDialogTitle = 'Delete term';
            this.yesNoDialogMessage = 'Are you sure you want to delete the selected term?'
            this.showYesNoDialog = true;
        },
        onSuggestTermClick() {
            this.manageTermDialogMode = 'suggest-term';
            this.isCreate = true;
            this.showManageTermDialog = true;
        },
        onCreateColumnClick() {
            this.isCreate = true;
            this.showManageColumnDialog = true;
        },
        onEditColumnClick() {
            this.isCreate = false;
            this.showManageColumnDialog = true;
        },
        onDeleteColumnClick() {
            this.yesNoDialogEvent = 'delete-column';
            this.yesNoDialogTitle = 'Delete column';
            this.yesNoDialogMessage = 'Are you sure you want to delete the selected column?'
            this.showYesNoDialog = true;
        },
        onReorderColumnsClick() {
            this.showReorderColumnsDialog = true;
        },
        onCreateTerm(term) {
            TermGridService.addTerm(term).then(() => this.showManageTermDialog = false);
        },
        onEditTerm(term) {
            TermGridService.updateTerm(term).then(() => this.showManageTermDialog = false);
        },
        onSuggestTerm(suggestion) {
            SuggestionManagerService.addSuggestion(suggestion).then(() => this.showManageTermDialog = false);
        },
        onDeleteTerm() {
            TermGridService.deleteTerm(this.selectedTerm);
        },
        onCreateColumn(column) {
            TermGridService.addColumn(column).then(() => this.showManageColumnDialog = false);
        },
        onEditColumn(column) {
            TermGridService.updateColumn(column).then(() => this.showManageColumnDialog = false);
        },
        onDeleteColumn() {
            TermGridService.deleteColumn(this.selectedColumn);
        },
        onReorderColumns(reorderSettings) {
            TermGridService.reorderColumns(reorderSettings).then(() => this.showReorderColumnsDialog = false);
        }
    },
    mounted() {
        TermGridService.getTerms();
        TermGridService.getColumns();
    },
    beforeCreate() {
        AuthenticationService.validateSession();
    }
}
</script>

<style>
.term-manager-wrp {
    padding: 0 10px;
}
.term-manager__toolbar {
    margin-bottom: 5px;
}
</style>