<template>
    <div class="reorderable-list">
        <p class="reorderable-list__label" v-if="label">{{ label }}</p>
        <div class="reorderable-list__wrapper">
            <ValidationProvider ref="itemValidator" :rules="{required: true}" v-slot="{ errors }" :disabled="true" slim>
                <div class="reorderable-list__header"
                     v-if="showItemCreator"
                     v-tooltip.right="{content: errors[0], shown: errors.length > 0, triggers: [], hideTriggers: ['click'],delay: {show: 0, hidden: 300}, autoHide: false}">
                    <input class="reorderable-list__header-input"
                        type="text"
                        @keyup.enter="onAddItem()"
                        v-model="element.name"
                        placeholder="Add new option...">
                    <button class="reorderable-list__item-button" @click="onAddItem()">
                        <img class="reorderable-list__item-button-icon" src="../../assets/icons/plus.svg">
                    </button>
                </div>
            </ValidationProvider>
            <Draggable tag="div" v-model="localItems" handle=".handle" @end="onDragEnd()">
                <ReorderableItem
                    v-for="(item, index) in localItems"
                    :key="index"
                    v-model="item.name"
                    :is-deletable="isItemsDeletable"
                    :is-draggable="isItemsDraggable"
                    :is-editable="isItemsEditable"
                    @input="onItemInput()"
                    @delete-item="onDeleteItem($event, index)"/>
            </Draggable>
        </div>
    </div>
</template>

<script>
import ReorderableItemModel from './domain/ReorderableItem';
import ReorderableItem from './components/ReorderableItem';
import Draggable from 'vuedraggable';
export default {
    name: 'ReorderableList',
    components: {
        ReorderableItem,
        Draggable
    },
    model: {
        prop: 'items',
        event: 'update:items'
    },
    props: {
        items: {
            type: Array
        },
        showItemCreator: {
            type: Boolean,
            default: true
        },
        isItemsDeletable: {
            type: Boolean,
            default: true
        },
        isItemsDraggable: {
            type: Boolean,
            default: true
        },
        isItemsEditable: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            element: new ReorderableItemModel(),
            localItems: []
        }
    },
    watch: {
        items: {
            immediate: true,
            handler() {
                this.localItems = this.items.map(option => new ReorderableItemModel(option));
            }
        }
    },
    methods: {
        onAddItem() {
            this.$refs.itemValidator.reset();
            this.$refs.itemValidator.validate().then(result => {
                if (!result.valid) return;
                this.element.position = this.localItems.length;
                this.localItems.push(this.element);
                this.element = new ReorderableItemModel();
                this.$emit('update:items', this.localItems);
            });
        },
        onDeleteItem(event, index) {
            this.localItems.splice(index, 1);
            this.$emit('update:items', this.localItems);
        },
        onItemInput() {
            this.$emit('update:items', this.localItems);
        },
        onDragEnd() {
            this.localItems.forEach((item, index) => item.position = index);
            this.$emit('update:items', this.localItems);
        }
    }
}
</script>

<style lang="scss">
$button-height: 20px;
$button-width: 20px;
$common-padding: 3px 6px 3px 6px;
$common-height: 26px;
$bottom-border: 1px solid #f2f2f2;
.reorderable-list {
    &__label {
        font-size: 14px;
        font-weight: bold;
        color: #000;
        margin: 0 0 4px 0;
        padding: 0;
    }
    &__wrapper {
    border: 1px solid #e0e0e0;
    font-size: 12px;
    font-family: Verdana, sans-serif;
    background-color: #fff;
    height: 200px;
    overflow: auto;
    }
    &__header {
        display: flex;
        height: $common-height;
        border-bottom: $bottom-border;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        padding: $common-padding;
    }
    &__header-input {
        width: 100%;
        margin: 0;
        padding: 0 2px;
        box-sizing: border-box;
        border: none;
        outline: none;
        font-size: 12px;
        font-family: Verdana, sans-serif;
    }
    &__item {
        width: 100%;
        height: $common-height;
        padding: $common-padding;
        box-sizing: border-box;
        border-bottom: $bottom-border;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:last-child {
            border:none;
        }
    }
    &__item-input {
        border: none;
        background-color: inherit;
        width: 100%;
        outline: none;
        margin: 0 0 0 5px;
        font-size: 12px;
        font-family: Verdana, sans-serif;
    }
    &__item-button {
        padding: 0;
        margin: 0;
        height: $button-height;
        width: $button-width;
        border: none;
        cursor: pointer;
        background-color: transparent;
    }
    &__item-button-icon {
        height: $button-height;
        width: $button-width;
    }
}
</style>