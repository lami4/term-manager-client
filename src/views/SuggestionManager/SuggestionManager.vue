<template>
    <div class="suggestion-manager-wrp">
        <Toolbar
            :mode="'custom'"
            class="suggestion-manager__toolbar">
            <BaseButton
                class="base-button--xs toolbar__base-button--default"
                @click="onReviewSuggestionClick()"
                label="Review"
                :disabled="!isAnyNodeSelected"/>
            <BaseButton
                class="base-button--xs toolbar__base-button--default"
                @click="onDeleteSuggestionClick()"
                label="Delete"
                :disabled="!isAnyNodeSelected"/>
        </Toolbar>
        <BaseGrid
            :columns="columns"
            :entries="suggestions"
            @select-entry="updateSelectedSuggestion($event)">
        </BaseGrid>
        <ManageTermDialog
            :show="showManageTermDialog"
            :is-create="false"
            :mode="'suggest-term'"
            @accept-term="onAcceptTerm($event)"
            @close="showManageTermDialog = false"/>
        <YesNoDialogBox
            :title="'Delete suggested term'"
            :message="'Are you sure you want to delete the selected term?'"
            :show="showYesNoDialog"
            @close="showYesNoDialog = false"
            :event-name="'delete-suggestion'"
            @delete-suggestion="onDeleteSuggestion()"/>
    </div>
</template>

<script>
import BaseGrid from '../../components/BaseGrid/BaseGrid.vue';
import Toolbar from '../../components/Toolbar';
import ManageTermDialog from '../TermManager/components/ManageTermDialog';
import YesNoDialogBox from '../../components/YesNoDialog';
import {mapActions, mapState} from 'vuex';
import SuggestionManagerService from "../../services/SuggestionManagerService";
import TermGridSettingsService from "../../services/TermGridSettingsService";
export default {
    name: 'SuggestionManager',
    components: {
        BaseGrid,
        Toolbar,
        ManageTermDialog,
        YesNoDialogBox
    },
    data() {
        return {
            showManageTermDialog: false,
            showYesNoDialog: false
        }
    },
    computed: {
        ...mapState('SuggestionManager', {
            selectedSuggestion: 'selectedSuggestion',
            suggestions: 'suggestions'
        }),
        ...mapState('TermGridSettings', {
            columns: 'columns'
        }),
        isAnyNodeSelected() {
            return !!this.selectedSuggestion;
        }
    },
    methods: {
        ...mapActions('SuggestionManager', {
            updateSelectedSuggestion: 'updateSelectedSuggestion'
        }),
        onReviewSuggestionClick() {
            this.showManageTermDialog = true;
        },
        onDeleteSuggestionClick() {
            this.showYesNoDialog = true;
        },
        onAcceptTerm(suggestion) {
            SuggestionManagerService.acceptSuggestion(suggestion).then(() => this.showManageTermDialog = false);
        },
        onDeleteSuggestion() {
            SuggestionManagerService.deleteSuggestion(this.selectedSuggestion).then(() => this.showYesNoDialog = false);
        }
    },
    mounted() {
        SuggestionManagerService.getSuggestions();
        TermGridSettingsService.getColumns();
    }
}
</script>

<style>
.suggestion-manager-wrp {
    padding: 0 10px;
}
.suggestion-manager__toolbar {
    margin-bottom: 5px;
}
</style>