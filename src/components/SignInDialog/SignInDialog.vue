<template>
    <BaseDialog
        :show="showSignInDialog"
        title="Sign in"
        @close="closeDialog()"
        @submit="onSubmit()"
        submit-button-label="Sign in"
        :width="400"
        ref="baseDialog">
        <template v-slot:body>
            <BaseInput
                class="dialogbox__base-input"
                label="E-mail"
                v-model="userCredentials.email"
                :is-required="true"/>
            <BaseInput
                class="dialogbox__base-input"
                label="Password"
                v-model="userCredentials.password"
                type="password"
                :is-required="true"/>
        </template>
    </BaseDialog>
</template>

<script>
import BaseDialog from "../BaseDialog.vue"
import UserCredentials from "./domain/UserCredentials.js";
import AuthenticationService from "../../services/AuthenticationService";
import {mapActions, mapState} from "vuex";

export default {
    name: "SignInDialog",
    components: {
        BaseDialog
    },
    data() {
        return {
            userCredentials: new UserCredentials()
        }
    },
    computed: {
        ...mapState('Session', {
            isSignedIn: 'isSignedIn',
            showSignInDialog: 'showSignInDialog'
        })
    },
    watch: {
        showSignInDialog(newValue) {
            if (newValue) {
                this.userCredentials = new UserCredentials();
            }
        }
    },
    methods: {
        ...mapActions('Session', {
            setShowSignInDialog: 'setShowSignInDialog',
        }),
        onSubmit() {
            this.$refs.baseDialog.validate().then(isValid => {
                if (isValid) {
                    AuthenticationService.signIn(this.userCredentials)
                        .then(() => this.closeDialog())
                        .catch(() => {})
                }
            });
        },
        closeDialog() {
            this.setShowSignInDialog(false);
        }
    }
}
</script>

<style>
</style>