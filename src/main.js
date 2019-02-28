import Vue from 'vue'
import App from './App'
import store from '@/store'
import '@/assets/styles/main.css'

import VueApollo from 'vue-apollo'
import { createApolloClient } from './utils/apollo'

const apolloClient = createApolloClient()
const apolloProvider = new VueApollo({
  // 根据需求可定义多个客户端，调用的时候指定需要调用的客户端即可
  defaultClient: apolloClient
})

Vue.config.productionTip = false
App.mpType = 'app'

new Vue({
  el: '#app',
  store,
  // 注入 apolloProvider
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
