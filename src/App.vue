<template>
  <div id="app">
      <NavigationBar/>
      <keep-alive>
          <router-view/>
      </keep-alive>
      <NotificationContainer/>
  </div>
</template>

<script>
import TermManager from './views/TermManager/TermManager';
import UserManager from './views/UserManager/UserManager';
import SuggestionManager from './views/SuggestionManager/SuggestionManager';
import NotificationContainer from './components/Notificater/NotificationContainer';
import NavigationBar from "./components/NavigationBar";
export default {
    components: {
        TermManager,
        UserManager,
        SuggestionManager,
        NotificationContainer,
        NavigationBar
    }
}
</script>

<style>

body {
  background-color: #f8fcfd;
  font-family: Verdana, sans-serif;
  color: #747474;
  font-size: 13px;
  margin: 0;
}

.router-link {
  margin-right: 10px;
  display: inline-block;
}

.tab-button {
  margin: 5px;
}

</style>