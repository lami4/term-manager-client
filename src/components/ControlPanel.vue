<template>
  <div class="control-panel">
      <!-- Add term -->
      <button class="btn2" @click="showDialogbox('add', 'term')">
        <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48" width="24px">
            <path fill="#90CAF9" d="M43,30V18c0-2.2-1.8-4-4-4H9c-2.2,0-4,1.8-4,4v12c0,2.2,1.8,4,4,4h30C41.2,34,43,32.2,43,30z M9,18h30v12 L9,30V18z"/>
            <circle fill="#43A047" cx="38" cy="38" r="10"/>
            <g fill="#fff">
                <rect x="32" y="36" width="12" height="4"/>
                <rect x="36" y="32" width="4" height="12"/>
            </g>
        </svg>
      </button>
      <!-- Edit term -->
      <button class="btn2" :disabled="!selectedTerm" @click="showDialogbox('edit', 'term')">
        <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48" width="24px">
            <path fill="#90CAF9" d="M43,30V18c0-2.2-1.8-4-4-4H9c-2.2,0-4,1.8-4,4v12c0,2.2,1.8,4,4,4h30C41.2,34,43,32.2,43,30z M9,18h30v12 L9,30V18z"/>
          <svg id="i-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"  fill="#ED8A19" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" x="15" y="-1"
          >
            <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />	
        </svg>
        </svg>
      </button>
      <!-- Delete term -->
      <button class="btn2" :disabled="!selectedTerm" @click="emitDeleteTerm">
        <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48" width="24px">
            <path fill="#90CAF9" d="M43,30V18c0-2.2-1.8-4-4-4H9c-2.2,0-4,1.8-4,4v12c0,2.2,1.8,4,4,4h30C41.2,34,43,32.2,43,30z M9,18h30v12 L9,30V18z"/>
            <circle fill="#F44336" cx="38" cy="38" r="10"/>
            <g fill="#fff">
                <rect x="36.5" y="32" transform="matrix(-.707 .707 -.707 -.707 91.74 38)" width="3" height="12"/>
                <rect x="36.5" y="32" transform="matrix(-.707 -.707 .707 -.707 38 91.74)" width="3" height="12"/>
            </g>
        </svg>
      </button>
      <!-- Add column -->
      <button class="btn2" @click="showDialogbox('add', 'column')">      
      <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48" width="24px">
          <path fill="#90CAF9" d="M30,5H18c-2.2,0-4,1.8-4,4v30c0,2.2,1.8,4,4,4h12c2.2,0,4-1.8,4-4V9C34,6.8,32.2,5,30,5z M18,39V9h12l0,30 H18z"/>
          <circle fill="#43A047" cx="38" cy="38" r="10"/>
          <g fill="#fff">
              <rect x="36" y="32" width="4" height="12"/>
              <rect x="32" y="36" width="12" height="4"/>
          </g>
      </svg>
      </button>
      <!-- Edit column -->
      <button class="btn2" :disabled="!selectedColumn" @click="showDialogbox('edit', 'column')">
        <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48" width="24px">
        <path fill="#90CAF9" d="M30,5H18c-2.2,0-4,1.8-4,4v30c0,2.2,1.8,4,4,4h12c2.2,0,4-1.8,4-4V9C34,6.8,32.2,5,30,5z M18,39V9h12l0,30 H18z"></path>
          <svg id="i-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"  fill="#ED8A19" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" x="17" y="6"
          >
            <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />	
          </svg>
        </svg>
      </button>
       <!-- Delete column -->
      <button class="btn2" :disabled="!selectedColumn" @click="emitDeleteColumn">
      <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48" width="24px">
          <path fill="#90CAF9" d="M30,5H18c-2.2,0-4,1.8-4,4v30c0,2.2,1.8,4,4,4h12c2.2,0,4-1.8,4-4V9C34,6.8,32.2,5,30,5z M18,39V9h12l0,30 H18z"/>
          <circle fill="#F44336" cx="38" cy="38" r="10"/>
          <g fill="#fff">
              <rect x="36.5" y="32" transform="matrix(-.707 .707 -.707 -.707 91.74 38)" width="3" height="12"/>
              <rect x="36.5" y="32" transform="matrix(-.707 -.707 .707 -.707 38 91.74)" width="3" height="12"/>
          </g>
      </svg>
      </button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '../eventBus/eventBus.js'
export default {
    computed: mapState({
         selectedTerm: "selectedTerm",
         selectedColumn: "selectedColumn"
    }),
    methods: {
      showDialogbox(action, object) {
        EventBus.$emit('showDialogbox', action, object)
      },
      emitDeleteTerm() {
        EventBus.$emit('deleteTerm');
      },
      emitDeleteColumn() {
        EventBus.$emit('deleteColumn');
      }
    }
}
</script>

<style>
.control-panel {
  height: 40px;
  width: 240px;
  background: #E3E8E9;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.control-panel button:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.control-panel button:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.btn2 {
  border: none;
  width: 40px;
  height: 40px;
  outline: none;
  background-color: white;
}

.btn2:hover {
  background-color: grey;
}

button[disabled="disabled"] path,
button[disabled="disabled"] circle {
  fill: gray;
}

button[disabled="disabled"]:hover {
  background-color: white;
}
</style>