<template>
    <div class="term-manager-wrp">
        <Toolbar
            class="term-manager__toolbar"
            mode="term-manager"
            @create-term-click="onCreateTermClick()"
            @edit-term-click="onEditTermClick()"
            @delete-term-click="onDeleteTermClick()"
            @suggest-term-click="onSuggestTermClick()"/>
        <BaseGrid
            :columns="columns"
            :entries="terms"
            @select-entry="updateSelectedTerm($event)"
            @unselect-entry="updateSelectedTerm($event)"/>
        <ManageTermDialog
            :show="showManageTermDialog"
            :is-create="isCreate"
            :mode="manageTermDialogMode"
            @create-term="onCreateTerm($event)"
            @edit-term="onEditTerm($event)"
            @suggest-term="onSuggestTerm($event)"
            @close="showManageTermDialog = false"/>
        <YesNoDialogBox
            title="Delete term"
            message="Are you sure you want to delete the selected term?"
            :show="showYesNoDialog"
            event-name="delete-term"
            @close="showYesNoDialog = false"
            @delete-term="onDeleteTerm()"/>
        </div>
</template>

<script>
import Toolbar from '../../components/Toolbar';
import BaseGrid from '../../components/BaseGrid.vue';
import ManageTermDialog from './components/ManageTermDialog.vue';
import YesNoDialogBox from '../../components/YesNoDialog.vue';
import AuthenticationService from '../../services/AuthenticationService';
import TermManagerService from '../../services/TermManagerService';
import SuggestionManagerService from '../../services/SuggestionManagerService';
import {mapActions, mapState} from 'vuex';
import TermGridSettingsService from '../../services/TermGridSettingsService';

export default {
    name: 'TermManager',
    components: {
        BaseGrid,
        Toolbar,
        ManageTermDialog,
        YesNoDialogBox
    },
    data() {
        return {
            showYesNoDialog: false,
            showManageTermDialog: false,
            manageTermDialogMode: 'default',
            isCreate: true
        }
    },
    computed: {
        ...mapState('TermManager', {
            selectedTerm: 'selectedTerm',
            terms: 'terms'
        }),
        ...mapState('TermGridSettings', {
            columns: 'columns'
        })
    },
    methods: {
        ...mapActions('TermManager', {
            updateSelectedTerm: 'updateSelectedTerm'
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
            this.showYesNoDialog = true;
        },
        onSuggestTermClick() {
            this.manageTermDialogMode = 'suggest-term';
            this.isCreate = true;
            this.showManageTermDialog = true;
        },
        onCreateTerm(term) {
            TermManagerService.addTerm(term).then(() => this.showManageTermDialog = false);
        },
        onEditTerm(term) {
            TermManagerService.updateTerm(term).then(() => this.showManageTermDialog = false);
        },
        onSuggestTerm(suggestion) {
            SuggestionManagerService.addSuggestion(suggestion).then(() => this.showManageTermDialog = false);
        },
        onDeleteTerm() {
            TermManagerService.deleteTerm(this.selectedTerm);
        },
    },
    mounted() {
        TermManagerService.getTerms();
        TermGridSettingsService.getColumns();
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