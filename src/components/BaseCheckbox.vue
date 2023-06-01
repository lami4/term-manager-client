<template>
    <div class="base-checkbox">
            <div
                :class="['base-checkbox-element', {'base-checkbox-element_selected':value}]"
                @click="$emit('input', !value)">
            </div>
            <p class="base-checkbox-label">{{ label }}</p>
    </div>
</template>

<script>
export default {
    name: "BaseCheckbox",
    props: {
        value: {
            type: Boolean,
            required: true,
            default: false
        },
        label: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">

.base-checkbox {
    display: flex;
}

.base-checkbox-element {
    width: 16px;
    height: 16px;
    border: solid 1px #e0e0e0;
    padding: 0;
    margin: 0 5px 0 0;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
    &_selected {
        &::after {
            position: absolute;
            content: "";
            width: 11px;
            height: 7px;
            box-sizing: border-box;
            border: solid black 3px;
            transform: rotate(-45deg);
            border-top: none;
            border-right: none;
            background-color: transparent;
            padding: 0;
            left: 1px;
            right: 0;
            top: -3px;
            bottom: 0;
            margin: auto;
        }
    }
}

.base-checkbox-label {
    padding: 0;
    margin: 0;
    color: #000;
    font-size: 14px;
    line-height: 15px;
}
</style>