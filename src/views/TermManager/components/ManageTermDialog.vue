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
                        class="dialogbox__base-input"
                        v-if="column.elementType === 'TEXTINPUT'"
                        :label="column.name"
                        v-model="term.properties[column.htmlId]"
                        :is-required="column.mandatory"/>
                    <BaseDropdown
                        :key="column.htmlId"
                        class="dialogbox__base-dropdown"
                        v-if="column.elementType === 'SELECT'"
                        :label="column.name"
                        :options="column.dropdownOptions"
                        v-model="term.properties[column.htmlId]"/>
                    <BaseTextarea
                        :key="column.htmlId"
                        class="dialogbox__base-textarea"
                        v-if="column.elementType === 'TEXTAREA'"
                        :label="column.name"
                        v-model="term.properties[column.htmlId]"
                        :is-required="column.mandatory"/>
                    <BaseCheckbox
                        :key="column.htmlId"
                        class="dialogbox__base-checkbox"
                        v-if="column.elementType === 'CHECKBOX'"
                        :label="column.name"
                        v-model="term.properties[column.htmlId]"/>
            </template>
        </template>
    </BaseDialog>
</template>

<script>
import BaseDialog from "../../../components/BaseDialog";
import {mapState} from "vuex";
import Term from "../domain/Term.js";
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
            validator: propValue => ['default', 'suggest-term'].includes(propValue)
        }
    },
    data() {
        return {
            term: new Term()
        }
    },
    computed: {
        ...mapState('TermManager', {
            selectedTerm: 'selectedTerm'
        }),
        ...mapState('TermGridSettings', {
            columns: "columns"
        }),
        ...mapState('SuggestionManager', {
            selectedSuggestion: "selectedSuggestion"
        }),
        dialogTitle() {
            if (this.mode === 'default') {
                return this.isCreate ? 'Create new term' : 'Modify term';
            } else {
                return this.isCreate ? 'Suggest new term' : 'Review suggested term';
            }
        },
        submitButtonLabel() {
            if (this.mode === 'default') {
                return this.isCreate ? 'Create' : 'Apply';
            } else {
                return this.isCreate ? 'Suggest' : 'Accept';
            }
        }
    },
    watch: {
        show(newValue) {
            if (newValue) {
                if (this.mode === 'default') {
                    this.term = this.isCreate ? new Term() : new Term(this.selectedTerm);
                } else {
                    this.term = this.isCreate ? new Term() : new Term(this.selectedSuggestion);
                }
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.baseDialog.validate().then(isValid => {
                if (isValid) {
                    if (this.mode === 'default') {
                        this.$emit(this.isCreate ? 'create-term' : 'edit-term', this.term);
                    } else {
                        this.$emit(this.isCreate ? 'suggest-term' : 'accept-term', this.term);
                    }
                }
            });
        },
    }
}
</script>

<style>
</style>