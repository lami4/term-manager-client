<template>
  <div id="app">
    <NotificationContainer/>
    <button
      v-for="tab in tabs"
      v-bind:key="tab"
      v-on:click="currentTab = tab"
      class="tab-button"
    >
      {{ tab }}
    </button>
    <component v-bind:is="currentTab"></component>
  </div>
</template>

<script>
import TermManager from './components/TermManager'
import About from './components/About'
import NotificationContainer from './components/NotificationContainer'
export default {
    components: {
        TermManager,
        About,
        NotificationContainer
    },
    data() {
      return {
        currentTab: "About",
        tabs: ["About", "TermManager"]
      }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins');

body {
  background: #B6E5D8;
  font-family: Poppins;
  color: #747474;
  font-size: 12px;
}

.router-link {
  margin-right: 10px;
  display: inline-block;
}

.tab-button {
  margin: 5px;
}

</style>