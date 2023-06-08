<template>
    <div class="dialogbox" :class="{'dialogbox_displayed': show}">
        <div class="dialogbox-container" :style="'width:' + width + 'px'">
            <div class="dialogbox-header">
                <span class="dialogbox-title">{{ title }}</span>
                <span class="dialogbox-close-button" @click="onClose()">&times;</span>
            </div>
            <ValidationObserver ref="observer" slim>
                <div class="dialogbox-body">
                    <slot name="body"></slot>
                </div>
            </ValidationObserver>
            <div class="dialogbox-footer">
                <slot name="footer">
                    <BaseButton class="base-button--s dialogbox_base-button" @click="$emit('submit')" :label="submitButtonLabel"/>
                    <BaseButton class="base-button--s" @click="onClose()" label="Cancel"/>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BaseDialog",
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
    &-container {
        background-color: $dialogbox-container-bgc;
        margin: auto auto;
        max-height: 800px;
    }
    &-header {
        background-color: $dialogbox-header-bgc;
        color: $white-color;
        font-size: 16px;
        padding: 15px;
        font-weight: bold;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    &-body {
        padding: 15px 15px 0 15px;
    }
    &-footer {
        padding: 15px;
        display: flex;
        justify-content: flex-end;
    }
    &-close-button:hover {
        color: $black-color;
        text-decoration: none;
        cursor: pointer;
    }
    &_base-dropdown:not(:last-child),
    &_base-input:not(:last-child),
    &_base-textarea:not(:last-child),
    &_base-checkbox:not(:last-child) {
        margin-bottom: 15px;
    }
    &_base-button {
        margin-right: 10px;
    }
}
</style>