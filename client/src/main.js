import Vue from 'vue'
import App from './App.vue'
import VueYoutube from 'vue-youtube'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)
Vue.use(VueYoutube)
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')