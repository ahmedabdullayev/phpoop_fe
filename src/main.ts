import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './libraries/settings'
import VueCustomTooltip from '@adamdehaven/vue-custom-tooltip'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap'

createApp(App).use(store).use(router).use(VueCustomTooltip).mount('#app')
