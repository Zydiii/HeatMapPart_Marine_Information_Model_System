import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.use(VueResource)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
