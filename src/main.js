import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;
if(process.env.NODE_ENV === 'development'){
  require('./mock')
}
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
