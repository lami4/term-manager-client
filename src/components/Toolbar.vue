<template>
    <div class="toolbar">
      <template v-if="mode === 'term-manager'">
        <div class="toolbar-section">
            <BaseButton class="base-button--xs"
                        @click="$emit('create-term-click')"
                        v-tooltip="'Create new term'">
                <img src="../assets/icons/add_term.svg">
            </BaseButton>
            <BaseButton class="base-button--xs"
                        :disabled="!selectedTerm"
                        @click="$emit('edit-term-click')"
                        v-tooltip="'Edit term'">
                <img src="../assets/icons/edit_term.svg">
            </BaseButton>
            <BaseButton class="base-button--xs"
                        :disabled="!selectedTerm"
                        @click="$emit('delete-term-click')"
                        v-tooltip="'Delete term'">
                <img src="../assets/icons/delete_term.svg">
            </BaseButton>
            <BaseButton class="base-button--xs"
                        @click="$emit('suggest-term-click')"
                        v-tooltip="'Suggest new term'">
                <img src="../assets/icons/report_mistake.svg">
            </BaseButton>
        </div>
        <div class="toolbar-section">
            <BaseButton class="base-button--xs"
                        @click="$emit('create-column-click')"
                        v-tooltip="'Create new column'">
                <img src="../assets/icons/add_column.svg">
            </BaseButton>
            <BaseButton class="base-button--xs"
                        :disabled="!selectedColumn"
                        @click="$emit('edit-column-click')"
                        v-tooltip="'Edit column'">
                <img src="../assets/icons/edit_column.svg">
            </BaseButton>
            <BaseButton class="base-button--xs"
                        :disabled="!selectedColumn"
                        @click="$emit('delete-column-click')"
                        v-tooltip="'Delete column'">
                <img src="../assets/icons/delete_column.svg">
            </BaseButton>
            <BaseButton class="base-button--xs"
                        @click="$emit('reorder-columns-click')"
                        v-tooltip="'Reorder columns'">
                <img style="transform: rotate(90deg);" src="../assets/icons/reorder_columns.svg">
            </BaseButton>
        </div>
        <div class="toolbar-section">
            <BaseButton class="base-button--xs" @click="$emit(isSignedIn ? 'sign-out-click' : 'sign-in-click')" :label="isSignedIn ? 'Sign out' : 'Sign in'"/>
        </div>
      </template>
      <template v-if="mode === 'default-crud'">
        <div class="toolbar-section">
          <BaseButton
              class="base-button--xs toolbar-section--default-button"
              @click="$emit('create')"
              label="Create"
              :disabled="!defaultCreateButtonEnabled"/>
          <BaseButton
              class="base-button--xs toolbar-section--default-button"
              @click="$emit('edit')"
              label="Edit"
              :disabled="!defaultEditButtonEnabled"/>
          <BaseButton
              class="base-button--xs toolbar-section--default-button"
              @click="$emit('delete')"
              label="Delete"
              :disabled="!defaultDeleteButtonEnabled"/>
        </div>
      </template>
      <template v-if="mode === 'custom'">
        <div class="toolbar-section">
          <slot></slot>
        </div>
      </template>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    props: {
      mode: {
        type: String,
        required: true,
        validator: propValue => ['default-crud', 'term-manager', 'custom'].includes(propValue)
      },
      defaultCreateButtonEnabled: {
        type: Boolean,
        required: false,
        default: true
      },
      defaultEditButtonEnabled: {
        type: Boolean,
        required: false,
        default: true
      },
      defaultDeleteButtonEnabled: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    computed: {
        ...mapState('TermManager', {
            selectedTerm: "selectedTerm",
            selectedColumn: "selectedColumn"
        }),
        ...mapState('Session', {
            isSignedIn: "isSignedIn"
        })
    }
}
</script>

<style lang="scss">
$button-onhover-bgc: #e0e0e0;

.toolbar {
    display: flex;

    &-section {
        display: flex;
        margin-right: 15px;

        & button:last-child {
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }

        & button:first-child {
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
        }

        &--default-button {
            min-width: 80px;
        }

    }
}

</style>