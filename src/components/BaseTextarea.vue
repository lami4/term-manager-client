<template>
    <ValidationProvider :rules="{required: isRequired}" v-slot="{ errors }" slim>
        <div class="base-textarea">
            <p class="base-textarea-label">{{ label + asterisk }}</p>
                <textarea
                    v-tooltip.right="{content: errors[0], shown: errors.length > 0, showTriggers: [], hideTriggers: ['click'], delay: {show: 0, hidden: 300}, autoHide: false}"
                    :class="['base-textarea-element', {'base-textarea-element_invalid':errors.length > 0}]"
                    :value="value"
                    @input="$emit('input', $event.target.value)"></textarea>
        </div>
    </ValidationProvider>
</template>

<script>
export default {
    name: "BaseTextarea",
    props: {
        value: String,
        label: {
            type: String,
            required: true
        },
        isRequired: {
            type: Boolean,
            required: true
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
.base-textarea-element {
    width: 100%;
    border: 1px solid #e0e0e0;
    font-size: 12px;
    font-family: Verdana, sans-serif;
    box-sizing: border-box;
    outline: none;
    resize: none;
    padding: 2px;
    height: 80px;
    display: block;
    &_invalid {
        border-color: #F44336;
    }
}
.base-textarea-label {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin: 0 0 4px 0;
    padding: 0;
}
</style>