<template>
    <button class="base-button" @click="$emit('click')">
        <slot>{{label}}</slot>
    </button>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        label: {
            type: String,
            required: false,
            default: 'BaseButton'
        }
    }
}
</script>

<style lang="scss">
$button-onhover-bgc: #e0e0e0;
$button-bgc: #fff;

.base-button {
    cursor: pointer;
    border: 1px solid $button-onhover-bgc;
    outline: none;
    background-color: $button-bgc;
    display: inline-block;
    font-family: Verdana, sans-serif;
    padding: 0 8px;
    &:hover {
        background-color: $button-onhover-bgc;
        transition: 0.4s;
    }
    &:hover:disabled {
        background-color: $button-bgc;
        cursor: default;
    }
    & img {
        display: block;
        transition: 0.4s;
    }
    &:disabled img {
        opacity: 0.2;
    }
    &--s {
        height: 28px;
    }
    &--xs {
        height: 35px;
    }
    &--no-right-border {
        border-right: none;
    }
}
</style>