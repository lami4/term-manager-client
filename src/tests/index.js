import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import {VTooltip} from "floating-vue";

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('isColumnNameUnique', {
  validate: (value, validationData) => {
    if (validationData.originalName && validationData.originalName === value) {
      return true;
    }
    return !validationData.columns.find(item => item.name === value);
  },
  params: ['columns', 'originalName'],
  message: 'This name is not unique'
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.directive('tooltip', VTooltip);

Vue.config.productionTip = false;