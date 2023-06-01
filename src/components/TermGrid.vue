<script>
import { mapState } from 'vuex';
export default {
    computed: {
      // ...mapState({
      //    columns: "columns",
      //    terms: "terms"
      // })
    },
  data() {
      return {
        columns: [
          {
            id: 1,
            columnName: "Term",
            htmlId: "column_1"
          },
          {
            id: 2,
            columnName: "Definition",
            htmlId: "column_2"
          },
          {
            id: 3,
            columnName: "Part of speech",
            htmlId: "column_3"
          },
        ],
        terms: [
          {
            id: 1,
            termProperties: {
              column_1: "SQL",
              column_2: "Programming language",
              column_3: "Noun"
            }
          },
          {
            id: 2,
            termProperties: {
              column_1: "SQL",
              column_2: "Programming language",
              column_3: "Noun"
            }
          }
        ]
      }
  },
    methods: {
        isTermId(termId, iterratedField) {
            return termId == iterratedField;
        },
        generateId(termId, columnId) {
            return termId + '_' + columnId;
        },
        selectTerm(event) {
            //Remove column selection, if it is in place
            if (document.querySelector('col[class="selected-column"]')) {
              document.querySelector('col[class="selected-column"]').classList.remove("selected-column");
            }
            //Store the TR that is the parent of the TD that fired the event in a variable
            let tr = event.target.parentNode;
            //If tr that fired the onclick event does not have 'selected-term' class but there is another tr that has it,
            //find this tr and delete 'selected-term' class from it
            if (!tr.classList.contains("selected-term") && document.querySelector('tr[class="selected-term"]')) {
                 document.querySelector('tr[class="selected-term"]').classList.remove("selected-term");
            }
            tr.classList.toggle("selected-term");
            //emit null if tr that fired the onclick is not assigned 'selected-term' class. Otherwise, emit a term id.
            if (tr.classList.contains("selected-term")) {
              this.$store.dispatch("updateSelectedTerm", event.target.parentNode.id);
            } else {
              this.$store.dispatch("updateSelectedTerm", null);
            }
        },
        selectColumn(event) {
            //Remove column selection, if it is in place
            if (document.querySelector(".selected-term")) {
                document.querySelector(".selected-term").classList.remove("selected-term");
            }
            //Find out the value of the data-column-id attribute in an element that fired the event
            let columnId = event.target.getAttribute("data-column-id");
            //Using the data-column-id attribute find an appropriate col element
            let col = document.querySelector(`col[data-column-id="${columnId}"]`);
            //If col that fired the onclick event does not have 'selected-column' class but there is another col that has it, 
            //find this col and delete 'selected-column' class from it
            if (!col.classList.contains("selected-column") && document.querySelector(".selected-column")) {
                 document.querySelector(".selected-column").classList.remove("selected-column");
            }
            col.classList.toggle("selected-column");
            //emit null if th that fired the onclick is not assigned 'selected-term' class. Otherwise, emit a column id.
            if (col.classList.contains("selected-column")) {
              this.$store.dispatch("updateSelectedColumn", columnId);
            } else {
              this.$store.dispatch("updateSelectedColumn", null);
            }
        }
    },
    render(h) {
      let colgroup = null;
      let thead = null;
      let tbody = null;
      
      if (this.terms) {
        tbody = h('tbody', null, this.terms.map(term => {
          //preparing TDs for TR
          let tds = [];
          for (let property in term.termProperties) {
              let dataObject = {
                key: this.generateId(term.id, property), 
                attrs: {
                  'data-id': property
                  }
              }
              tds.push(h('td', dataObject, term.termProperties[property]))
          }
          //preparing TRs
          let dataObject = {
            key: term.id,
            attrs: {
              id: term.id
            },
            on: {
              click: this.selectTerm
            }
          }
          return h('tr', dataObject, tds);
        }))
      }

      if (this.columns) {
        let columnHeaders = [];
        let cols = [];
        for (let column of this.columns) {
          //preparing COLs for COLGROUP
          let dataObject = {
            attrs: {
               'data-column-id': column.htmlId
            },
          };
          cols.push(h('col', dataObject, null));
          //preparing THs for THEAD
          dataObject = {
            key: column.id,
            attrs: {
               'data-column-id': column.htmlId
            },
            on: {
              click: this.selectColumn
            }
          }
          columnHeaders.push(h('th', dataObject, column.columnName))
        }
        colgroup = h('colgroup', {}, cols);
        thead = h('thead', null, [h('tr', null, columnHeaders)]);
      }

      return h('table', {'class': 'base-grid'}, [colgroup, thead, tbody])
    }
}
</script>

<style>
.grid-wrapper {
  border-radius: 10px;
  width: 1000px;
  overflow: hidden;
}

.base-grid {
  width: 100%;
  overflow-wrap: break-word;
  border-collapse: collapse;
}

.base-grid th {
  color: #4f4f4f;
  background-color: #b1d4e0;
}

.base-grid th,
.base-grid td {
  text-align: left;
  padding: 10px 0 10px 15px;
  cursor: default;
}

.base-grid {
  color: #4f4f4f;
  background-color: #ffffff;
}

.base-grid tr {
  border-bottom: 1px solid #f2f2f2;
}

.base-grid tr:last-child{
  border-bottom: 0px solid #f2f2f2;
}

.selected {
  background-color: #E3E8E9;
}

.selected {
  background-color: #E3E8E9;
}

</style>