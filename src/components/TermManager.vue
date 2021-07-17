<template>
  <div id="term-manager">
    <h1>Term Manager</h1>
    <ControlPanel />
    <div class="table-wrapper">
      <TermGrid></TermGrid>
    </div>
    <DialogBox></DialogBox>
  </div>
</template>

<script>
import DialogBox from "./DialogBox.vue";
import TermGrid from "./TermGrid.vue";
import ControlPanel from "./ControlPanel.vue";
import EventBus from '../eventBus/eventBus.js';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
    components: {
        DialogBox,
        TermGrid,
        ControlPanel
    },
    data() {
        return {
        }
    },
    computed: {
      ...mapState({
         selectedTerm: "selectedTerm",
         selectedColumn: "selectedColumn",
         columns: "columns",
         terms: "terms"
      })
    },
    methods: {
    ...mapActions({
      getTermsAction: 'getTerms',
      addTermAction: 'addTerm',
      updateTermAction: 'updateTerm',
      deleteTermAction: 'deleteTerm',
      getColumnsAction: 'getColumns',
      addColumnAction: 'addColumn',
      updateColumnAction: 'updateColumn',
      deleteColumnAction: 'deleteColumn'
    })
  },
  mounted () {
    this.getColumnsAction();
    this.getTermsAction();
    EventBus.$on('submitDialogbox', (payload, action, object) => {
      if (action == 'add' && object == 'term') {
        return this.addTermAction(payload)
      }
      if (action == 'edit' && object == 'term') {
        return this.updateTermAction(payload)
      }
      if (action == 'add' && object == 'column') {
        return this.addColumnAction(payload);
      }
      if (action == 'edit' && object == 'column') {
        return this.updateColumnAction(payload);
      }
    })
    EventBus.$on('deleteTerm', () => {
      this.deleteTermAction();
    })
    EventBus.$on('deleteColumn', () => {
      this.deleteColumnAction();
    })
  },
  updated() {
    if(this.selectedColumn && document.querySelector(`td[data-id=${this.selectedColumn.htmlId}]:not(.selected-column)`)) {
      document.querySelector(`td[data-id=${this.selectedColumn.htmlId}]:not(.selected-column)`).classList.add("selected-column");
    }
  }
}
</script>

<style>

</style>