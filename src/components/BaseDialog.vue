<template>
    <div class="dialogbox" :class="{'dialogbox_displayed': show}">
        <div class="dialogbox__container" :style="'width:' + width + 'px'">
            <div class="dialogbox__header">
                <span class="dialogbox__title">{{ title }}</span>
                <span class="dialogbox__close-button" @click="onClose()">&times;</span>
            </div>
            <ValidationObserver ref="observer" slim>
                <div class="dialogbox__body">
                    <slot name="body"></slot>
                </div>
            </ValidationObserver>
            <div class="dialogbox__footer">
                <slot name="footer">
                    <BaseButton class="base-button--s dialogbox__base-button--right-margin" @click="$emit('submit')" :label="submitButtonLabel"/>
                    <BaseButton class="base-button--s" @click="onClose()" label="Cancel"/>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseDialog',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        submitButtonLabel: {
            type: String,
            default: 'Submit'
        },
        width: {
            type: Number,
            required: false,
            default: 600
        }
    },
    watch: {
        show(newValue) {
            if (!newValue) {
                this.$refs.observer.reset();
            }
        }
    },
    methods: {
        validate() {
            this.$refs.observer.reset();
            return this.$refs.observer.validate();
        },
        onClose() {
            this.$refs.observer.reset();
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss">
$dialogbox-container-bgc: #f8fcfd;
$dialogbox-header-bgc: #6f8faf;
$white-color: #fff;
$black-color: #000;
.dialogbox {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    &_displayed {
        display: flex;
    }
    &__container {
        background-color: $dialogbox-container-bgc;
        margin: auto auto;
        max-height: 800px;
    }
    &__header {
        background-color: $dialogbox-header-bgc;
        color: $white-color;
        font-size: 16px;
        padding: 15px;
        font-weight: bold;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    &__close-button:hover {
        color: $black-color;
        text-decoration: none;
        cursor: pointer;
    }
    &__body {
        padding: 15px 15px 0 15px;
    }
    &__footer {
        padding: 15px;
        display: flex;
        justify-content: flex-end;
    }
    &__base-dropdown:not(:last-child),
    &__base-input:not(:last-child),
    &__base-textarea:not(:last-child),
    &__base-checkbox:not(:last-child) {
        margin-bottom: 15px;
    }
    &__base-button--right-margin {
        margin-right: 10px;
    }
}
</style>