import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VModal from 'vue-js-modal'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
 
Vue.use(VModal)
Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
