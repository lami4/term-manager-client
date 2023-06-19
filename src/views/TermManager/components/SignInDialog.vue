<template>
    <BaseDialog
        :show="show"
        title="Sign in"
        @close="$emit('close')"
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
import BaseDialog from "../../../components/BaseDialog";
import UserCredentials from "../domain/UserCredentials.js"
export default {
    name: "SignInDialog",
    components: {
        BaseDialog
    },
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            userCredentials: new UserCredentials()
        }
    },
    methods: {
        onSubmit() {
            this.$refs.baseDialog.validate().then(isValid => {
                if (isValid) {
                    this.$emit('submit', this.userCredentials);
                }
            });
        }
    },
    watch: {
        show(newValue) {
            if (newValue) {
                this.userCredentials = new UserCredentials();
            }
        }
    }
}
</script>

<style>
</style>