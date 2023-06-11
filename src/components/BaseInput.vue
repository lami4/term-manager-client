<template>
    <ValidationProvider :rules="{required: isRequired, ...validationRules}" v-slot="{ errors }" slim>
        <div class="base-input">
            <p class="base-input-label">{{ label + asterisk}}</p>
                <input
                    v-tooltip.right="{content: errors[0], shown: errors.length > 0, showTriggers: [], hideTriggers: ['click'], delay: {show: 0, hidden: 300}, autoHide: false}"
                    :class="['base-input-element', {'base-input-element_invalid':errors.length > 0}]"
                    :value="value"
                    :type="type"
                    @input="$emit('input', $event.target.value)">
        </div>
    </ValidationProvider>
</template>

<script>
export default {
    name: "BaseInput",
    props: {
        value: [String, Number],
        label: {
            type: String,
            required: true
        },
        isRequired: {
            type: Boolean,
            required: true
        },
        type: {
            type: String,
            required: false,
            default: 'text'
        },
        validationRules: {
            type: Object,
            required: false
        }
    },
    computed: {
        asterisk() {
            return this.isRequired ? ' *' : '';
        }
    }
}
</script>

<style lang="scss">
.base-input-element {
    height: 25px;
    width: 100%;
    border: 1px solid #e0e0e0;
    font-size: 12px;
    font-family: Verdana, sans-serif;
    padding: 0 2px;
    box-sizing: border-box;
    outline: none;
    &_invalid {
        border-color: #F44336;
    }
}
.base-input-label {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin: 0 0 4px 0;
    padding: 0;
}
</style>