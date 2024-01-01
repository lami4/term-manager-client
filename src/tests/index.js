import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import {VTooltip} from "floating-vue";

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.directive('tooltip', VTooltip);

Vue.config.productionTip = false;