<template>
  <div id="term-manager">
    <h1>Term Manager</h1>
    <ControlPanel 
      @showAddTermDialogbox="showAddTermDialogbox"
      @showEditTermDialogbox="showEditTermDialogbox"
      @showAddColumnDialogbox="showAddColumnDialogbox"
      @showEditColumnDialogbox="showEditColumnDialogbox"
      @deleteColumn="deleteColumn"
      @deleteTerm="deleteTerm"
    />
    <div class="table-wrapper">
      <TermGrid></TermGrid>
    </div>
    <DialogBox ref="addColumnDialogbox" title="Add Column" htmlId="add-column-dialog-box">
      <div slot="dialogbox-body">
        <label for="column-name" class="inp">
        <input type="text" id="column-name"  v-model="columnName"  placeholder=" ">
          <span class="label">Column name</span>
          <span class="focus-bg"></span>
        </label>
      </div>
      <div slot="dialogbox-footer">
        <button class="btn" @click="addColumn">Add</button>
        <button class="btn" @click="closeAddColumnDialogbox">Close</button>
      </div>
    </DialogBox>
    <DialogBox ref="editColumnDialogbox" title="Edit Column" htmlId="edit-column-dialog-box">
      <div slot="dialogbox-body">
        <label for="column-name" class="inp">
        <input type="text" id="column-name"  v-model="columnName"  placeholder=" ">
          <span class="label">Column name</span>
          <span class="focus-bg"></span>
        </label>
      </div>
      <div slot="dialogbox-footer">
        <button class="btn" @click="updateColumn">Apply</button>
        <button class="btn" @click="closeEditColumnDialogbox">Close</button>
      </div>
    </DialogBox>
    <DialogBox ref="addTermDialogbox" title="Add Term" htmlId="add-term-dialog-box">
      <div v-if="columns" slot="dialogbox-body">
        <label v-for="column in columns" :for="column.htmlId"  class="inp" v-bind:key="column.id">
        <input type="text" :id="column.htmlId" placeholder=" ">
          <span class="label">{{ column.columnName }}</span>
          <span class="focus-bg"></span>
        </label>
      </div>
      <div slot="dialogbox-footer">
        <button class="btn" @click="addTerm">Add</button>
        <button class="btn" @click="closeAddTermDialogbox">Close</button>
      </div>
    </DialogBox>
    <DialogBox ref="editTermDialogbox" title="Edit Term" htmlId="edit-term-dialog-box">
      <div v-if="columns" slot="dialogbox-body">
        <label v-for="column in columns" :for="column.htmlId"  class="inp" v-bind:key="column.id">
        <input type="text" :id="column.htmlId" placeholder=" ">
          <span class="label">{{ column.columnName }}</span>
          <span class="focus-bg"></span>
        </label>
      </div>
      <div slot="dialogbox-footer">
        <button class="btn" @click="updateTerm">Apply</button>
        <button class="btn" @click="closeEditTermDialogbox">Close</button>
      </div>
    </DialogBox>
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
          columnName: ""
        }
    },
    computed: mapState({
         selectedTerm: "selectedTerm",
         selectedColumn: "selectedColumn",
         columns: "columns",
         terms: "terms"
    }),
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
    }),
    showAddColumnDialogbox() {
      this.$refs.addColumnDialogbox.show();
    },
    closeAddColumnDialogbox() {
      this.$refs.addColumnDialogbox.close();
    },
    showEditColumnDialogbox() {
      if (!this.selectedColumn) {
        this.showAnnouncement("You did not select a column to edit!", "red");
        return;
      }
      document.querySelector('#edit-column-dialog-box #column-name').value = this.selectedColumn.columnName;
      this.$refs.editColumnDialogbox.show();
    },
    closeEditColumnDialogbox() {
      this.$refs.editColumnDialogbox.close();
    },
    showAddTermDialogbox() {
      this.$refs.addTermDialogbox.show();
    },
    closeAddTermDialogbox() {
      
      this.$refs.addTermDialogbox.close();
    },
    showEditTermDialogbox() {
      if (!this.selectedTerm) {
        this.showAnnouncement("You did not select a term to edit!", "red");
        return;
      }
      document.querySelectorAll('#edit-term-dialog-box [id*="column_"]').forEach((element) => {
        element.value = this.selectedTerm.termProperties[element.id];
      });
      this.$refs.editTermDialogbox.show();
    },
    closeEditTermDialogbox() {
      this.$refs.editTermDialogbox.close();
    },
    columnNameIsUnique(columnName) {
      for (var i = 0; i < this.columns.length; i++) {
           var obj = this.columns[i];
           if (obj.columnName.toLowerCase() == columnName.toLowerCase()) {return false};
      }
      return true;
    },
    getColumns() {
      this.getColumnsAction();
    },
    addColumn() {
      if (this.isInputValidInAddColumnDialogBox()) {
        this.closeAddColumnDialogbox();
        let userInput = this.convertUserInputToJsonObject(document.querySelectorAll('#add-column-dialog-box input'));
        this.addColumnAction(userInput);
      }
    },
    updateColumn() {
      if (this.isInputValidInAddColumnDialogBox()) {
        this.closeEditColumnDialogbox();
        let userInput = this.convertUserInputToJsonObject(document.querySelectorAll('#edit-column-dialog-box input'));
        this.updateColumnAction(userInput);
      } 
    },
    deleteColumn() {
      this.deleteColumnAction();
    },
    getTerms() {
      this.getTermsAction();
    },
    addTerm() {
      this.closeAddTermDialogbox();
      let userInput = this.convertUserInputToJsonObject(document.querySelectorAll('#add-term-dialog-box [id*="column_"]'));
      this.addTermAction(userInput)
      .then(() => {
        this.$refs.addTermDialogbox.emptyTextInputs();
      })
    },
    updateTerm() {
      this.closeEditTermDialogbox();
      let userInput = this.convertUserInputToJsonObject(document.querySelectorAll('#edit-term-dialog-box [id*="column_"]'));
      this.updateTermAction(userInput)
    },
    deleteTerm() {
      this.deleteTermAction()
    },
    convertUserInputToJsonObject(input) {
      let jsonString = "{";
      input.forEach((obj) => {
        jsonString += `"${obj.id}": "${obj.value}", `;
      });
      jsonString = jsonString.replace(/, $/g, '}');
      return JSON.parse(jsonString);
    },
    isInputValidInAddColumnDialogBox() {
      if (!this.columnName) {
        let notification = {
          type: 'error',
          message: "Column name is required!"
        }
        this.$store.dispatch('notificator/add', notification)
        console.log("Column name is required!")
        return false;
      } 
      if (!this.columnNameIsUnique(this.columnName)) {
        let notification = {
          type: 'error',
          message: "This name is already in use!"
        }
        this.$store.dispatch('notificator/add', notification)
        console.log("This name is already in use!")
        return false;
      }
      return true;
    }
  },
  mounted () {
    this.getColumns();
    this.getTerms();
    console.log(EventBus)
    EventBus.$on('eventBusClick', (payload) => {
      console.log(payload)
    })
  },
  updated() {
    if(this.selectedColumn && document.querySelector(`td[data-id=${this.selectedColumn.html_id}]:not(.selected-column)`)) {
      document.querySelector(`td[data-id=${this.selectedColumn.html_id}]:not(.selected-column)`).classList.add("selected-column");
    }
  }
}
</script>

<style>

</style>