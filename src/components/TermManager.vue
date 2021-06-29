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
        <label v-for="column in columns" :for="column.html_id"  class="inp" v-bind:key="column.id">
        <input type="text" :id="column.html_id" placeholder=" ">
          <span class="label">{{ column.column_name }}</span>
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
        <label v-for="column in columns" :for="column.html_id"  class="inp" v-bind:key="column.id">
        <input type="text" :id="column.html_id" placeholder=" ">
          <span class="label">{{ column.column_name }}</span>
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
import TermGridService from "../services/TermGridService.js";
import { mapState } from 'vuex';
import { mapActions } from 'vuex'

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
      document.querySelector('#edit-column-dialog-box #column-name').value = this.selectedColumn.column_name;
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
      document.querySelectorAll('#edit-term-dialog-box [id*="column_"]').forEach((el) => {
        el.value = this.selectedTerm[el.id];
      });
      this.$refs.editTermDialogbox.show();
    },
    closeEditTermDialogbox() {
      this.$refs.editTermDialogbox.close();
    },
    columnNameIsUnique(columnName) {
      for (var i = 0; i < this.columns.length; i++) {
           var obj = this.columns[i];
           if (obj.column_name.toLowerCase() == columnName.toLowerCase()) {return false};
      }
      return true;
    },
    getColumns() {
      this.getColumnsAction();
    },
    addColumn() {
      if (this.columnName == "") {
        let notification = {
          type: 'error',
          message: "Column name is required!"
        }
        this.$store.dispatch('notificator/add', notification)
      } else if (!this.columnNameIsUnique(this.columnName)) {
        let notification = {
          type: 'error',
          message: "This name is already in use!"
        }
        this.$store.dispatch('notificator/add', notification)
      } else {
        this.closeAddColumnDialogbox();
        this.addColumnAction(this.columnName);
      }
    },
    updateColumn() {
      if (this.columnName == "") {
        this.showAnnouncement("Column name is required!", "red");
      } else if (!this.columnNameIsUnique(this.columnName)) {
        this.showAnnouncement("This name is already in use!", "red");
      } else {
        this.closeEditColumnDialogbox();
        this.selectedColumn.column_name = this.columnName;
        TermGridService.updateColumn(this.selectedColumn)
        .then(() => {
          this.getColumns();
          this.getTerms();
        })
        .then(() => {
          this.showAnnouncement("Column was successfully updated!", "green");
        })
        .catch((error) => {console.log(error)});
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
      let userInput = this.convertUserInputToJsonString(document.querySelectorAll('#add-term-dialog-box [id*="column_"]'), null);
      this.addTermAction(userInput)
      .then(() => {
        this.$refs.addTermDialogbox.emptyTextInputs();
      })
    },
    updateTerm() {
      this.closeEditTermDialogbox();
      let userInput = this.convertUserInputToJsonString(document.querySelectorAll('#edit-term-dialog-box [id*="column_"]'), this.selectedTerm.id);
      this.updateTermAction(userInput)
    },
    deleteTerm() {
      this.deleteTermAction()
    },
    convertUserInputToJsonString(input, termId) {
      let jsonString = "{";
      if (termId) {jsonString += `"id": "${termId}", `} 
      input.forEach((obj) => {
        jsonString += `"${obj.id}": "${obj.value}", `;
      });
      return jsonString.replace(/, $/g, '}');
    }
  },
  mounted () {
    this.getColumns();
    this.getTerms();
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