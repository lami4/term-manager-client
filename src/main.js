import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ValidationProvider, extend, setInteractionMode, ValidationObserver } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import BaseButton from "./components/BaseButton";
import BaseDropdown from "./components/BaseDropdown";
import BaseInput from "./components/BaseInput";
import BaseTextarea from "./components/BaseTextarea";
import BaseCheckbox from "./components/BaseCheckbox";
import {VTooltip} from "floating-vue";
import 'floating-vue/dist/style.css';

// Add a rule.
extend('required', {
  ...required,
  message: 'This field is required'
});

extend('isColumnNameUnique', {
  validate: (value, columns) => !columns.find(item => item.name === value),
  message: 'This name is not unique'
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('BaseButton', BaseButton);
Vue.component('BaseDropdown', BaseDropdown);
Vue.component('BaseInput', BaseInput);
Vue.component('BaseTextarea', BaseTextarea);
Vue.component('BaseCheckbox', BaseCheckbox);
Vue.directive('tooltip', VTooltip);

setInteractionMode('passive');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
