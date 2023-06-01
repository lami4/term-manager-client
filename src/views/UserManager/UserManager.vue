<template>
  <div id="user-manager-wrp">
    <h1>User manager</h1>
    <Toolbar
        class="user-manager__toolbar"
        :default-edit-button-enabled="isCrudButtonsEnabled"
        :default-delete-button-enabled="isCrudButtonsEnabled"
        @create="onCreateUserClick()"
        @edit="onEditUserClick()"
        @delete="onDeleteUserClick()"/>
    <BaseGrid
        :columns="columns"
        :entries="users"
        @select-entry="updateSelectedUser($event)">
    </BaseGrid>
    <CreateEditUserDialogBox
        :show="showManageUserDialog"
        :is-create="isCreate"
        @create-user="onCreateUser($event)"
        @edit-user="onEditUser($event)"
        @close="showManageUserDialog = false"/>
    <YesNoDialogBox
        title="Delete user"
        message="Are you sure you want to delete the selected user?"
        :show="showYesNoDialog"
        @close="showYesNoDialog = false"
        event-name="delete-user"
        @delete-user="onDeleteUser()"/>
  </div>
</template>

<script>
import EventBus from '../../eventBus/eventBus.js';
import BaseGrid from "../../components/BaseGrid.vue";
import CreateEditUserDialogBox from "./components/ManageUserDialog.vue";
import {mapActions, mapState} from "vuex";
import YesNoDialogBox from "../../components/YesNoDialogBox";
import Toolbar from "../../components/Toolbar";

export default {
  name: 'UserManager',
  components: {
    YesNoDialogBox,
    BaseGrid,
    CreateEditUserDialogBox,
    Toolbar
  },
  data() {
    return {
      columns: [
        {
          htmlId: "firstName",
          id: 1,
          name: "First name",
        },
        {
          htmlId: "lastName",
          id: 2,
          name: "Last name",
        },
        {
          htmlId: "email",
          id: 3,
          name: "E-mail",
        },
        {
          htmlId: "status",
          id: 4,
          name: "Status",
        },
      ],
      eventBus: EventBus,
      title: "",
      message: "",
      showYesNoDialog: false,
      showManageUserDialog: false,
      isCreate: true
    }
  },
  computed: {
    ...mapState('UserManager', {
      selectedUser: 'selectedUser',
      users: 'users'
    }),
    isCrudButtonsEnabled() {
      return !!this.selectedUser;
    }
  },
  methods: {
    ...mapActions('UserManager', {
      getUsers: 'getUsers',
      updateSelectedUser: 'updateSelectedUser',
      getPrivileges: 'getPrivileges',
      addUser: 'addUser',
      updateUser: 'updateUser',
      deleteUser: 'deleteUser'
    }),
    onCreateUserClick() {
      this.isCreate = true;
      this.showManageUserDialog = true;
    },
    onEditUserClick() {
      this.isCreate = false;
      this.showManageUserDialog = true;
    },
    onDeleteUserClick() {
      this.showYesNoDialog = true;
    },
    onCreateUser(user) {
      this.addUser(user).then(() => this.showManageUserDialog = false);
    },
    onEditUser(user) {
      this.updateUser(user).then(() => this.showManageUserDialog = false);
    },
    onDeleteUser() {
      this.deleteUser(this.selectedUser);
    }
  },
  mounted() {
    this.getUsers();
    this.getPrivileges();
  }
}
</script>

<style>
.user-manager__toolbar {
  margin-bottom: 15px;
}
</style>