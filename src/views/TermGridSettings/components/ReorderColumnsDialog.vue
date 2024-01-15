<template>
    <BaseDialog
        :show="show"
        title="Reorder columns"
        submit-button-label="Apply"
        cancel-button-label="Cancel"
        @close="$emit('close')"
        @submit="onSubmit()"
        ref="baseDialog">
        <template v-slot:body>
            <ReorderableList
                v-model="reorderableItems"
                :show-item-creator="false"
                :is-items-deletable="false"
                :is-items-editable="false"/>
        </template>
    </BaseDialog>
</template>

<script>
import BaseDialog from "../../../components/BaseDialog";
import ReorderableItem from "../../../components/SortableList/domain/ReorderableItem";
import ReorderableList from "../../../components/SortableList/ReorderableList";
import {mapState} from "vuex";
export default {
    name: "ReorderColumnsDialog",
    components: {
        BaseDialog,
        ReorderableList
    },
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            reorderableItems: []
        }
    },
    computed: {
        ...mapState('TermGridSettings', {
            columns: "columns"
        })
    },
    methods: {
        onSubmit() {
            this.$emit('reorder-columns', this.reorderableItems);
        }
    },
    watch: {
        show() {
            this.reorderableItems = this.columns.map(option => {
                return new ReorderableItem(option);
            });
        }
    }
}
</script>

<style>

</style>