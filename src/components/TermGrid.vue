<!--<template>
      <table class="term-grid">
        <colgroup></colgroup>
        <thead v-if="columns">
            <tr>
            <th v-for="column in columns" v-bind:key="column.id" @click="selectColumn" :data-id="column.html_id">{{ column.column_name }}</th>
            </tr>
        </thead>
        <tbody v-if="terms">
            <tr v-for="term in terms" v-bind:key="term.id" :id="term.id">
                <td v-if="!isTermId(term.id, value)" v-for="(value, jsonKey) in term" v-bind:key="generateId(term.id, jsonKey)" @click="selectTerm" :data-id="jsonKey">{{ value }}</td>
            </tr>
        </tbody>
      </table> 
</template> -->

<script>
import { mapState } from 'vuex';
export default {
    computed: mapState({
         columns: "columns",
         terms: "terms"
    }),
    methods: {
        isTermId(termId, iterratedField) {
            return termId == iterratedField;
        },
        generateId(termId, columnId) {
            return termId + '_' + columnId;
        },
        selectTerm(event) {
          console.log(3)
            //remove column selection
            document.querySelectorAll(".selected-column").forEach(el => {
              el.classList.remove("selected-column");
            });
            //if tr that fired the onclick event does not have 'selected-term' class but there is another tr that has it, find this tr that and delete 'selected-term' class from it
            if(!event.target.parentNode.classList.contains("selected-term") && document.querySelector(".selected-term")) {
                 document.querySelector(".selected-term").classList.remove("selected-term");
            }
            event.target.parentNode.classList.toggle("selected-term");
            //emit null if tr that fired the onclick is not assigned 'selected-term' class. Otherwise, emit a term id.
            if (event.target.parentNode.classList.contains("selected-term")) {
              this.$store.dispatch("updateSelectedTerm", event.target.parentNode.id);
            } else {
              this.$store.dispatch("updateSelectedTerm", null);
            }
        },
        selectColumn(event) {
          console.log(1)
            //remove term selection
            if(document.querySelector(".selected-term")) {
                document.querySelector(".selected-term").classList.remove("selected-term");
            }
            //if th that fired the onclick event does not have 'selected-column' class but there is another th that has it, find this th that and delete 'selected-column' class from it
            if(!event.target.classList.contains("selected-column") && document.querySelector("th.selected-column")) {
              //remove 'selected-column' class from another column
              document.querySelectorAll(".selected-column").forEach(el => {
                el.classList.remove("selected-column");
              });
              //set 'selected-column' class to th that fired the onclick event
              event.target.classList.add("selected-column");
              let columnId = event.target.getAttribute("data-id");
              //set 'selected-column' to all td elements that has the same data-id as th that fired the onclick event
              document.querySelectorAll(`[data-id="${columnId}"]`).forEach(el => {
                el.classList.add("selected-column");
              });
              this.$store.dispatch("updateSelectedColumn", event.target.getAttribute("data-id"));
            } else if(!event.target.classList.contains("selected-column") && !document.querySelector(".selected-column")) {
              //set 'selected-column' class to th that fired the onclick event
              event.target.classList.add("selected-column");
              let columnId = event.target.getAttribute("data-id");
              //set 'selected-column' to all td elements that has the same data-id as th that fired the onclick event
              document.querySelectorAll(`[data-id="${columnId}"]`).forEach(el => {
                el.classList.add("selected-column");
              });
              this.$store.dispatch("updateSelectedColumn", event.target.getAttribute("data-id"));
            } else {
              document.querySelectorAll(".selected-column").forEach(el => {
                el.classList.remove("selected-column");
              });
              this.$store.dispatch("updateSelectedColumn", event.target.getAttribute("data-id"));
            }
        }    
    },
    render(h) {
      let colgroup = h('colgroup');
      let thead = null;
      let tbody = null;
      
      if (this.terms) {
        tbody = h('tbody', null, this.terms.map(term => {
          //preparing TDs for TR
          let tds = [];
          for (let property in term) {
            if (!this.isTermId(term.id, term[property])) {
              let dataObject = {
                key: this.generateId(term.id, property), 
                attrs: {
                  'data-id': property
                  }
              }
              tds.push(h('td', dataObject, term[property]))
            }
          }
          //preparing data object for TR
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
        for (let column of this.columns) {
          let dataObject = {
            key: column.id,
            attrs: {
               'data-id': column.html_id
            },
            on: {
              click: this.selectColumn
            }
          }
          columnHeaders.push(h('th', dataObject, column.column_name))
        }
        thead = h('thead', null, [h('tr', null, columnHeaders)])
      }

      return h('table', {'class': 'term-grid'}, [colgroup, thead, tbody])
    },
}
</script>

<style>
.table-wrapper {
  border-radius: 10px;
  width: 1000px;
  overflow: hidden;
}

.term-grid {
  width: 100%;
  overflow-wrap: break-word;
  border-collapse: collapse;
}

.term-grid th {
  color: #4f4f4f;
  background-color: #b1d4e0;
}

.term-grid th, 
.term-grid td {
  text-align: left;
  padding: 10px 0 10px 15px;
  cursor: default;
}

.term-grid td {
  color: #4f4f4f;
  background-color: #ffffff;
}

.term-grid tr {
  border-bottom: 1px solid #f2f2f2;
}

.term-grid tr:last-child{
  border-bottom: 0px solid #f2f2f2;
}

.term-grid tr.selected-term td {
  background-color: #E3E8E9;
}

.term-grid td.selected-column {
  background-color: #E3E8E9;
}

</style>