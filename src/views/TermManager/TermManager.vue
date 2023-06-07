<template>
    <div id="term-manager-wrp">
        <h1>Term Manager</h1>
        <Toolbar
            class="term-manager__toolbar"
            mode="term-manager"
            @sign-in-click="showSignInDialog = true"
            @sign-out-click="signOut()"
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
            :is-column-select-enabled="true"
            :is-column-unselect-enabled="true"/>
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
        <SignInDialog
            :show="showSignInDialog"
            @submit="signIn($event)"
            @close="showSignInDialog = false"/>
        </div>
</template>

<script>
import Toolbar from "../../components/Toolbar.vue";
import BaseGrid from "../../components/BaseGrid.vue";
import ManageColumnDialog from "./components/ManageColumnDialog.vue";
import ManageTermDialog from "./components/ManageTermDialog.vue";
import SignInDialog from "./components/SignInDialog.vue";
import YesNoDialogBox from "../../components/YesNoDialog.vue";
import AuthenticationService from "../../services/AuthenticationService";
import ReorderColumnsDialog from "./components/ReorderColumnsDialog";
import {mapActions, mapState} from 'vuex';

//TODO: Изменить стиль тултипов
//TODO: Запилить кнопк обновления грида
//TODO: Реализовать вспывающие уведомление при добавлении нового термина через вебсокет
//TODO: Зарефакторить БЭМ -- там кое где неправильный синтаксис
//TODO: Использовать HttpClient.js во всех сервисах
export default {
    name: 'TermManager',
    components: {
        BaseGrid,
        Toolbar,
        ManageColumnDialog,
        ManageTermDialog,
        ReorderColumnsDialog,
        SignInDialog,
        YesNoDialogBox
    },
    data() {
        return {
            showYesNoDialog: false,
            showSignInDialog: false,
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
            selectedTerm: "selectedTerm",
            selectedColumn: "selectedColumn",
            columns: "columns",
            terms: "terms"
        })
    },
    methods: {
        ...mapActions('TermManager', {
            //TODO: PROPERLY RENAME ACTIONS
            getTerms: 'getTerms',
            getColumns: 'getColumns',
            updateSelectedTerm: 'updateSelectedTerm',
            updateSelectedColumn: 'updateSelectedColumn',
            addColumn: 'addColumn',
            updateColumn: 'updateColumn',
            deleteColumn: 'deleteColumn',
            addTerm: 'addTerm',
            updateTerm: 'updateTerm',
            deleteTerm: 'deleteTerm',
            reorderColumns: 'reorderColumns'
        }),
        ...mapActions('SuggestionManager', {
            //TODO: PROPERLY RENAME ACTIONS
            addSuggestion: 'addSuggestion',
        }),
        signIn(userCredentials) {
            AuthenticationService.signIn(userCredentials).then(() => this.showSignInDialog = false);
        },
        signOut() {
            AuthenticationService.signOut();
        },
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
            this.addTerm(term).then(() => this.showManageTermDialog = false);
        },
        onEditTerm(term) {
            this.updateTerm(term).then(() => this.showManageTermDialog = false);
        },
        onSuggestTerm(suggestion) {
            this.addSuggestion(suggestion).then(() => this.showManageTermDialog = false);
        },
        onDeleteTerm() {
            this.deleteTerm(this.selectedTerm);
        },
        onCreateColumn(column) {
            this.addColumn(column).then(() => this.showManageColumnDialog = false);
        },
        onEditColumn(column) {
            this.updateColumn(column).then(() => this.showManageColumnDialog = false);
        },
        onDeleteColumn() {
            this.deleteColumn(this.selectedColumn)
        },
        onReorderColumns(reorderSettings) {
            this.reorderColumns(reorderSettings).then(() => this.showReorderColumnsDialog = false);
        }
    },
    mounted() {
        this.getTerms();
        this.getColumns();
    },
    beforeCreate() {
        AuthenticationService.validateSession();
    }
}
</script>

<style>
.term-manager__toolbar {
    margin-bottom: 15px;
}
</style>