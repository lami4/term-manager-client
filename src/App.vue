<template>
  <div id="app">
      <button
          v-for="tab in availableTabs"
          :key="tab.name"
          @click="currentTab = tab.component"
          class="tab-button">
          {{ tab.name }}
      </button>
      <NavigationBar/>
      <keep-alive>
        <component :is="currentTab"></component>
      </keep-alive>
      <NotificationContainer/>
  </div>
</template>

<script>
import TermManager from './views/TermManager/TermManager';
import UserManager from './views/UserManager/UserManager';
import SuggestionManager from './views/SuggestionManager/SuggestionManager';
import NotificationContainer from './components/Notificater/NotificationContainer';
import SystemPrivileges from "./views/UserManager/domain/SystemPrivileges";
import {mapState} from "vuex";
import NavigationBar from "./components/NavigationBar";
export default {
    components: {
        TermManager,
        UserManager,
        SuggestionManager,
        NotificationContainer,
        NavigationBar
    },
    data() {
        return {
            currentTab: TermManager,
            tabs: [
                {
                    name: "UserManager",
                    component: UserManager,
                    requiredPrivilege: SystemPrivileges.USER_MANAGER
                },
                {
                    name: "TermManager",
                    component: TermManager,
                    requiredPrivilege: null
                },
                {
                    name: "SuggestionManager",
                    component: SuggestionManager,
                    requiredPrivilege: SystemPrivileges.SUGGESTION_MANAGER
                },
            ],
        }
    },
    computed: {
        ...mapState('Session', {
            userPrivileges: "userPrivileges"
        }),
        availableTabs() {
            return this.tabs.filter(tab => tab.requiredPrivilege === null || this.userPrivileges.includes(tab.requiredPrivilege));
        }
    }
}
</script>

<style>

body {
  background-color: #f8fcfd;
  font-family: Verdana, sans-serif;
  color: #747474;
  font-size: 13px;
}

.router-link {
  margin-right: 10px;
  display: inline-block;
}

.tab-button {
  margin: 5px;
}

</style>