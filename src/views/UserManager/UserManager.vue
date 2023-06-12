<template>
    <div id="user-manager-wrp">
        <h1>User manager</h1>
        <Toolbar
            class="user-manager__toolbar"
            :mode="'custom'"
            @create="onCreateUserClick()"
            @edit="onEditUserClick()"
            @delete="onDeleteUserClick()">
            <BaseButton
                class="base-button--xs toolbar__base-button--default"
                @click="onCreateUserClick()"
                label="Create"/>
            <BaseButton
                class="base-button--xs toolbar__base-button--default"
                @click="onEditUserClick()"
                label="Edit"
                :disabled="!isAnyNodeSelected"/>
            <BaseButton
                class="base-button--xs toolbar__base-button--default"
                @click="onDeleteUserClick()"
                label="Delete"
                :disabled="!isAnyNodeSelected"/>
            <BaseButton
                class="base-button--xs toolbar__base-button--default"
                @click="onResetPasswordClick()"
                label="Reset password"
                :disabled="!isAnyNodeSelected"/>
        </Toolbar>
        <BaseGrid
            :columns="columns"
            :entries="users"
            @select-entry="updateSelectedUser($event)">
        </BaseGrid>
        <ManageUserDialog
            :show="showManageUserDialog"
            :is-create="isCreate"
            @create-user="onCreateUser($event)"
            @edit-user="onEditUser($event)"
            @close="showManageUserDialog = false"/>
        <ResetPasswordDialog
            :show="showResetPasswordDialog"
            @reset-password="onResetPassword($event)"
            @close="showResetPasswordDialog = false"/>
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
import BaseGrid from '../../components/BaseGrid.vue';
import YesNoDialogBox from '../../components/YesNoDialog';
import Toolbar from '../../components/Toolbar';
import {mapActions, mapState} from 'vuex';
import UserManagerService from "../../services/UserManagerService";
import ManageUserDialog from "./components/ManageUserDialog";
import ResetPasswordDialog from "./components/ResetPasswordDialog";

export default {
    name: 'UserManager',
    components: {
        ManageUserDialog,
        ResetPasswordDialog,
        YesNoDialogBox,
        BaseGrid,
        Toolbar
    },
    data() {
        return {
            columns: [
                {
                    htmlId: 'firstName',
                    id: 1,
                    name: 'First name',
                },
                {
                    htmlId: 'lastName',
                    id: 2,
                    name: 'Last name',
                },
                {
                    htmlId: 'email',
                    id: 3,
                    name: 'E-mail',
                },
                {
                    htmlId: 'status',
                    id: 4,
                    name: 'Status',
                },
            ],
            title: '',
            message: '',
            showYesNoDialog: false,
            showManageUserDialog: false,
            showResetPasswordDialog: false,
            isCreate: true
        }
    },
    computed: {
        ...mapState('UserManager', {
            selectedUser: 'selectedUser',
            users: 'users'
        }),
        isAnyNodeSelected() {
            return !!this.selectedUser;
        }
    },
    methods: {
        ...mapActions('UserManager', {
            updateSelectedUser: 'updateSelectedUser',
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
            UserManagerService.addUser(user).then(() => this.showManageUserDialog = false);
        },
        onResetPassword(user) {
            UserManagerService.resetPassword(user).then(() => this.showResetPasswordDialog = false);
        },
        onEditUser(user) {
            UserManagerService.updateUser(user).then(() => this.showManageUserDialog = false);
        },
        onDeleteUser() {
            UserManagerService.deleteUser(this.selectedUser);
        },
        onResetPasswordClick() {
            this.showResetPasswordDialog = true;
        }
    },
    mounted() {
        UserManagerService.getUsers();
        UserManagerService.getPrivileges();
    }
}
</script>

<style>
.user-manager__toolbar {
    margin-bottom: 15px;
}
</style>