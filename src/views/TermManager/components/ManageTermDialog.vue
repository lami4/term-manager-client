<template>
    <BaseDialog
        :show="show"
        :title="dialogTitle"
        @close="$emit('close')"
        @submit="onSubmit()"
        :submit-button-label="submitButtonLabel"
        ref="baseDialog">
        <template v-slot:body>
            <template v-for="column in columns">
                    <BaseInput
                        :key="column.htmlId"
                        class="dialogbox_base-input"
                        v-if="column.elementType === 'TEXTINPUT'"
                        :label="column.name"
                        v-model="term.properties[column.htmlId]"
                        :is-required="column.mandatory"/>
                    <BaseDropdown
                        :key="column.htmlId"
                        class="dialogbox_base-dropdown"
                        v-if="column.elementType === 'SELECT'"
                        :label="column.name"
                        :options="column.dropdownOptions"
                        v-model="term.properties[column.htmlId]"/>
                    <BaseTextarea
                        :key="column.htmlId"
                        class="dialogbox_base-textarea"
                        v-if="column.elementType === 'TEXTAREA'"
                        :label="column.name"
                        v-model="term.properties[column.htmlId]"
                        :is-required="column.mandatory"/>
                    <BaseCheckbox
                        :key="column.htmlId"
                        class="dialogbox_base-checkbox"
                        v-if="column.elementType === 'CHECKBOX'"
                        :label="column.name"
                        v-model="term.properties[column.htmlId]"/>
            </template>
        </template>
    </BaseDialog>
</template>

<script>
import BaseDialog from "../../../components/BaseDialog";
import {mapActions, mapState} from "vuex";
import EventBus from "../../../eventBus/eventBus";
import Term from "../domain/Term.js";
import Suggestion from "../domain/Suggestion.js";
export default {
    name: "ManageTermDialog",
    components: {
        BaseDialog
    },
    props: {
        show: {
            type: Boolean,
            required: true
        },
        isCreate: {
            type: Boolean,
            required: true
        },
        mode: {
            type: String,
            required: true,
            validator: propValue => ['default', 'report', 'suggestion'].includes(propValue)
        }
    },
    data() {
        return {
            term: new Term()
        }
    },
    computed: {
        ...mapState('TermManager', {
            selectedTerm: 'selectedTerm',
            columns: "columns",
        }),
        dialogTitle() {
            if (this.mode === 'default') {
                return this.isCreate ? 'Create term' : 'Modify term';
            } else if (this.mode === 'report') {
                return 'Correct term';
            }
        },
        submitButtonLabel() {
            if (this.mode === 'default') {
                return this.isCreate ? 'Create' : 'Apply';
            } else if (this.mode === 'report') {
                return 'Submit';
            }
        }
    },
    watch: {
        show(newValue) {
            if (newValue) {
                this.term = this.isCreate ? new Term() : new Term(this.selectedTerm);
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.baseDialog.validate().then(isValid => {
                if (isValid) {
                    if (this.mode === 'default') {
                        this.$emit(this.isCreate ? 'create-term' : 'edit-term', this.term);
                    } else if (this.mode === 'report') {
                        this.$emit('correct-term', this.term);
                    }
                }
            });
            //
            // if (this.isSuggestion) {
            //     this.addSuggestionAction(this.prepareSuggestion(this.term.properties, true, null)).finally(() => {
            //         this.show = false;
            //     });
            //     return;
            // }
            // if (this.isCorrection) {
            //     this.addSuggestionAction(this.prepareSuggestion(this.term.properties, false, this.term.id)).finally(() => {
            //         this.show = false;
            //     });
            //     return;
            // }
            // if (this.isCreate) {
            //     this.addTermAction(this.term).finally(() => {
            //         this.show = false;
            //     });
            // } else {
            //     this.updateTermAction(this.term).finally(() => {
            //         this.show = false;
            //     });
            // }
        },
        // prepareSuggestion(properties, isNew, termId) {
        //     return new Suggestion({"properties": properties, "isNew": isNew, "termId": termId});
        // },
        // deepCopyTerm() {
        //     this.term = new Term({id: this.selectedTerm.id});
        //     this.columns.forEach(column => {
        //         this.term.properties[column.htmlId] = this.selectedTerm.properties[column.htmlId];
        //     });
        // },
        // createNewTerm() {
        //     this.term = new Term();
        //     this.columns.forEach(column => {
        //         this.term.properties[column.htmlId] = null;
        //     });
        // }
    }
}
</script>

<style>
</style>