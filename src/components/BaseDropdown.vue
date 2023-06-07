<template>
    <div class="base-dropdown">
        <p class="base-dropdown-label">{{ label }}</p>
        <select class="base-dropdown-element" :value="value" @input="$emit('input', $event.target.value)">
            <option v-for="option in options" :key="option.id" :value="option.id">
                {{ option.name }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "BaseDropdown",
    props: {
        value: [String, Number],
        label: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(newVal) {
                if (newVal === undefined) {
                    this.$emit('input', this.options[0].id);
                }
            }
        }
    }
}
</script>

<style>
.base-dropdown-element {
    height: 25px;
    width: 100%;
    border: 1px solid #e0e0e0;
    font-size: 12px;
    font-family: Verdana, sans-serif;
    box-sizing: border-box;
    outline: none;
}
.base-dropdown-label {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin: 0 0 4px 0;
    padding: 0;
}
</style>