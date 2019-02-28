import Vue from 'vue'
// 创建ApolloClient实例
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// 安装vue插件
Vue.use(VueApollo)

// 创建 apollo 客户端
export function createApolloClient (ssr = false) {
  // 与API 的HTTP 连接
  const httpLink = new HttpLink({
    // 这里使用绝对路径
    uri: 'http://localhost:3020/graphql'
  })

  // 缓存实现
  const cache = new InMemoryCache()

  // 如果在客户端则恢复注入状态
  if (!ssr) {
    if (typeof window !== 'undefined') {
      const state = window.__APOLLO_STATE__
      if (state) {
        // 如果你有多个客户端，使用 `state.<client_id>`
        cache.restore(state.defaultClient)
      }
    }
  }

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    ...(ssr ? {
      // 在服务端设置此选项以优化 SSR 时的查询
      ssrMode: true
    } : {
      // 这将暂时禁用查询强制获取
      ssrForceFetchDelay: 100
    })
  })

  return apolloClient
}
