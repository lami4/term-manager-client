<template>
    <BaseDialog
        :show="show"
        title="Reset password"
        @close="$emit('close')"
        @submit="onSubmit()"
        submit-button-label="Reset"
        ref="baseDialog">

        <template v-slot:body>
            <BaseInput
                key="parameter-1"
                class="dialogbox_base-input"
                label="New password"
                type="password"
                v-model="user.password"
                :is-required="true"/>
        </template>
    </BaseDialog>
</template>

<script>
import BaseDialog from "../../../components/BaseDialog";
import {mapState} from "vuex";
import User from "../domain/User.js"
export default {
    name: "ResetPasswordDialog",
    components: {
        BaseDialog
    },
    props: {
        show: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            user: new User()
        }
    },
    computed: {
        ...mapState('UserManager', {
            selectedUser: 'selectedUser'
        }),
    },
    watch: {
        show(newValue) {
            if (newValue) {
                this.user = new User(this.selectedUser);
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.baseDialog.validate().then(isValid => {
                if (isValid) {
                    this.$emit('reset-password', this.user);
                }
            });
        }
    }
}
</script>

<style>
</style>