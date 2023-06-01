<template>
    <div id="user-manager-wrp">
        <h1>User manager</h1>
        <BaseGrid
            :columns="columns"
            :entries="suggestions"
            :row-selectable="true"
            :column-selectable="false"
            @update-entry="updateSelectedSuggestionAction">
            <template v-slot:headerCell="slotProps">{{ slotProps.column.name }}</template>
            <template v-slot:bodyCell="slotProps">{{ slotProps.value }}</template>
        </BaseGrid>
    </div>
</template>

<script>
import EventBus from '../../eventBus/eventBus.js';
import BaseGrid from "../../components/BaseGrid.vue";
import {mapActions, mapState} from "vuex";
export default {
    name: 'SuggestionManager',
    components: {
        BaseGrid
    },
    data() {
        return {
            eventBus: EventBus
        }
    },
    computed: {
        ...mapState('SuggestionManager', {
            selectedSuggestion: "selectedSuggestion",
            suggestions: "suggestions"
        }),
        ...mapState('TermManager', {
            columns: 'columns'
        })
    },
    methods: {
        ...mapActions('SuggestionManager', {
            updateSelectedSuggestionAction: "updateSelectedSuggestion",
            getSuggestionsAction: "getSuggestions"
        }),
        ...mapActions('TermManager', {
            getColumnsAction: 'getColumns',
        }),
    },
    mounted() {
        this.getSuggestionsAction();
        this.getColumnsAction();
    }
}
</script>

<style>
</style>