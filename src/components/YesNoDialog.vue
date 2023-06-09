<template>
    <BaseDialog
        :show="show"
        :title="title"
        :width="400"
        @close="onClose()"
        @submit="onSubmit()">
        <template v-slot:body>
            <p class="yes-no-dialog-message">{{ message }}</p>
        </template>
        <template v-slot:footer>
            <BaseButton class="base-button--s dialogbox_base-button" label="Yes" @click="onSubmit()"></BaseButton>
            <BaseButton class="base-button--s" label="No" @click="onClose()"></BaseButton>
        </template>
    </BaseDialog>
</template>

<script>
import BaseDialog from './BaseDialog';
export default {
    name: "YesNoDialog",
    components: {
        BaseDialog
    },
    props: {
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        show: {
            type: Boolean,
            required: true
        },
        eventName: {
            type: String,
            required: false,
            default: 'submit'
        }

    },
    methods: {
        onClose() {
            this.$emit('close')
        },
        onSubmit() {
            this.$emit(this.eventName);
            this.onClose();
        }
    }
}
</script>

<style lang="scss">
.yes-no-dialog-message {
    font-family: Verdana, sans-serif;
    color: #000;
}
</style>