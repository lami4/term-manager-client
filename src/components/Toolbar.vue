<template>
    <div class="toolbar">
      <template v-if="mode === 'term-manager'">
        <div class="toolbar-section">
            <BaseButton v-if="showTermCrudButtons"
                        class="base-button--xs base-button--no-right-border toolbar__base-button--icon"
                        @click="$emit('create-term-click')"
                        v-tooltip="'Create new term'">
                <img src="../assets/icons/add_term.svg">
            </BaseButton>
            <BaseButton v-if="showTermCrudButtons"
                        class="base-button--xs base-button--no-right-border toolbar__base-button--icon"
                        :disabled="!selectedTerm"
                        @click="$emit('edit-term-click')"
                        v-tooltip="'Edit term'">
                <img src="../assets/icons/edit_term.svg">
            </BaseButton>
            <BaseButton v-if="showTermCrudButtons"
                        class="base-button--xs base-button--no-right-border toolbar__base-button--icon"
                        :disabled="!selectedTerm"
                        @click="$emit('delete-term-click')"
                        v-tooltip="'Delete term'">
                <img src="../assets/icons/delete_term.svg">
            </BaseButton>
            <BaseButton class="base-button--xs toolbar__base-button--icon"
                        @click="$emit('suggest-term-click')"
                        v-tooltip="'Suggest new term'">
                <img src="../assets/icons/report_mistake.svg">
            </BaseButton>
        </div>
        <div class="toolbar-section" v-if="showColumnSection">
            <BaseButton class="base-button--xs base-button--no-right-border toolbar__base-button--icon"
                        @click="$emit('create-column-click')"
                        v-tooltip="'Create new column'">
                <img src="../assets/icons/add_column.svg">
            </BaseButton>
            <BaseButton class="base-button--xs base-button--no-right-border toolbar__base-button--icon"
                        :disabled="!selectedColumn"
                        @click="$emit('edit-column-click')"
                        v-tooltip="'Edit column'">
                <img src="../assets/icons/edit_column.svg">
            </BaseButton>
            <BaseButton class="base-button--xs base-button--no-right-border toolbar__base-button--icon"
                        :disabled="!selectedColumn"
                        @click="$emit('delete-column-click')"
                        v-tooltip="'Delete column'">
                <img src="../assets/icons/delete_column.svg">
            </BaseButton>
            <BaseButton class="base-button--xs toolbar__base-button--icon"
                        @click="$emit('reorder-columns-click')"
                        v-tooltip="'Reorder columns'">
                <img style="transform: rotate(90deg);" src="../assets/icons/reorder_columns.svg">
            </BaseButton>
        </div>
        <div class="toolbar-section">
            <BaseButton class="base-button--xs toolbar__base-button--default"
                        @click="$emit(isSignedIn ? 'sign-out-click' : 'sign-in-click')"
                        :label="isSignedIn ? 'Sign out' : 'Sign in'"/>
        </div>
      </template>
      <template v-if="mode === 'default-crud'">
        <div class="toolbar-section">
          <BaseButton
              class="base-button--xs toolbar__default-button"
              @click="$emit('create')"
              label="Create"
              :disabled="!defaultCreateButtonEnabled"/>
          <BaseButton
              class="base-button--xs toolbar__default-button"
              @click="$emit('edit')"
              label="Edit"
              :disabled="!defaultEditButtonEnabled"/>
          <BaseButton
              class="base-button--xs toolbar__default-button"
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
import SystemPrivileges from "../views/UserManager/domain/SystemPrivileges";
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
            isSignedIn: "isSignedIn",
            userPrivileges: "userPrivileges"
        }),
        showColumnSection() {
            return this.userPrivileges.includes(SystemPrivileges.TERM_GRID_MANAGER);
        },
        showTermCrudButtons() {
            return this.userPrivileges.includes(SystemPrivileges.TERM_MANAGER);
        }
    }
}
</script>

<style lang="scss">
$generic-border-radius: 3px;

.toolbar {
    display: flex;

    &-section {
        display: flex;
        margin-right: 15px;
    }

    &__base-button--icon {

        &:last-child {
            border-top-right-radius: $generic-border-radius;
            border-bottom-right-radius: $generic-border-radius;
        }

        &:first-child {
            border-top-left-radius: $generic-border-radius;
            border-bottom-left-radius: $generic-border-radius;
        }
    }

    &__base-button--default {
        min-width: 80px;
        margin-right: 5px;
        border-radius: $generic-border-radius;
    }
}

</style>