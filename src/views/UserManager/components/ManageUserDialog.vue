<template>
    <BaseDialog
        :show="show"
        :title="dialogTitle"
        @close="$emit('close')"
        @submit="onSubmit()"
        :submit-button-label="submitButtonLabel"
        ref="baseDialog">

        <template v-slot:body>
            <BaseInput
                key="parameter-1"
                class="dialogbox__base-input"
                label="First name"
                v-model="user.firstName"
                :is-required="true"/>
            <BaseInput
                key="parameter-2"
                class="dialogbox__base-input"
                label="Last name"
                v-model="user.lastName"
                :is-required="true"/>
            <BaseInput
                key="parameter-3"
                class="dialogbox__base-input"
                label="Email"
                v-model="user.email"
                :is-required="true"/>
            <BaseInput
                v-if="isCreate"
                key="parameter-4"
                class="dialogbox__base-input"
                label="Password"
                type="password"
                v-model="user.password"
                :is-required="true"/>
            <BaseDropdown
                key="parameter-5"
                class="dialogbox__base-dropdown"
                label="Status"
                :options="[{id:'ACTIVE', name:'Active'}, {id:'BLOCKED', name:'Blocked'}]"
                v-model="user.status"
                :is-required="true"/>
            <BaseCheckbox
                v-for="privilege in privileges"
                class="dialogbox__base-dropdown"
                :key="'privilege-' + privilege.id"
                :label="privilege.name"
                v-model="privilegeSelection[privilege.id]"/>
        </template>
    </BaseDialog>
</template>

<script>
import BaseDialog from "../../../components/BaseDialog";
import {mapState} from "vuex";
import User from "../domain/User.js"
export default {
    name: "ManageUserDialog",
    components: {
        BaseDialog
    },
    props: {
        show: {
            type: Boolean,
            required: true
        },
        isCreate: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            user: new User(),
            privilegeSelection: {}
        }
    },
    computed: {
        ...mapState('UserManager', {
            selectedUser: 'selectedUser',
            privileges: 'privileges',
        }),
        dialogTitle() {
            return this.isCreate ? 'Create user' : 'Modify user';
        },
        submitButtonLabel() {
            return this.isCreate ? 'Create' : 'Apply';
        }
    },
    watch: {
        show(newValue) {
            if (newValue) {
                if (this.isCreate) {
                    this.user = new User();
                    this.privilegeSelection = {};
                } else {
                    this.user = new User(this.selectedUser);
                    this.user.privileges.forEach(p => this.$set(this.privilegeSelection, p.id, true));
                }
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.baseDialog.validate().then(isValid => {
                if (isValid) {
                    this.setPrivilegeSelectionToUserModel();
                    this.$emit(this.isCreate ? 'create-user' : 'edit-user', this.user);
                }
            });
        },
        setPrivilegeSelectionToUserModel() {
            this.user.privileges = Object.entries(this.privilegeSelection)
                .filter(entry => entry[1])
                .map(entry => this.privileges.find(p => p.id === +entry[0]));
        }
    }
}
</script>

<style>
</style>