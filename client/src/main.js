import Vue from 'vue'
import App from './App.vue'
import VueYoutube from 'vue-youtube'
import VueChatScroll from 'vue-chat-scroll'
import moment from 'moment'


Vue.use(VueChatScroll)
Vue.use(VueYoutube)

Vue.component('dynamic-from-now', {
    name: 'DynamicFromNow',
    props: {
        tag: { type: String, default: 'span' },
        value: { type: String, default: () => moment().toISOString() },
        interval: { type: Number, default: 1000 }
    },
    data() {
        return { fromNow: moment(this.value).fromNow() }
    },
    mounted() {
        this.intervalId = setInterval(this.updateFromNow, this.interval)
        this.$watch('value', this.updateFromNow)
    },
    beforeDestroy() {
        clearInterval(this.intervalId)
    },
    methods: {
        updateFromNow() {
            var newFromNow = moment(this.value).fromNow()
            if (newFromNow !== this.fromNow) {
                this.fromNow = newFromNow
            }
        }
    },
    render(h) {
        return h(this.tag, this.fromNow)
    }
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')