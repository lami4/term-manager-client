<template>
    <div class="reorderable-list__item">
        <button class="reorderable-list__item-button handle" v-if="isDraggable">
            <img class="reorderable-list__item-button-icon" src="../../../assets/icons/drag.svg">
        </button>
        <input class="reorderable-list__item-input"
               type="text"
               :value="value"
               :disabled="!isEditable"
               @input="$emit('input', $event.target.value)">
        <button class="reorderable-list__item-button" v-if="isDeletable" @click="$emit('delete-item', $event)">
            <img class="reorderable-list__item-button-icon" src="../../../assets/icons/bin.svg">
        </button>
    </div>
</template>

<script>
export default {
    name: "ReorderableItem",
    props: {
        value: [String, Number],
        isDeletable: {
            type: Boolean,
            required: false,
            default: true
        },
        isDraggable: {
            type: Boolean,
            required: false,
            default: true
        },
        isEditable: {
            type: Boolean,
            required: false,
            default: true
        }
    }
}
</script>

<style>
</style>