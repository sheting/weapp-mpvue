<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <div v-if="$apollo.loading">Loading...</div>
    <p v-else>query1: {{ query1 }}</p>
    <div v-if="$apollo.loading">Loading...</div>
    <p>query2: {{ query2 }}</p>
    <div v-if="$apollo.queries.helloMessage.loading">Loading...</div>
    <p>query3: {{ query3 }}</p>
    <div v-if="$apollo.loading">Loading...</div>
    <span>moment lists: </span>
    <span v-for="(item, index) in moments" :key="index">
      {{item}}
    </span>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import gql from 'graphql-tag'

const QUERY_LIST = gql`
  query {
    moments {
      user {
        id
        name
        avatar
      }
      main {
        content
        pics
      }
      comments {
        user {
          id
          name
        }
        reply
      }
    }
  }
`

export default {
  apollo: {
    // hello1 是vue的属性
    query1: gql`query {
      hello
    }`,
    query2: gql`{hello}`,
    // 带参数查询
    query3: {
      query: gql`query helloMessage ($message: String!) {
        queryHello(message: $message)
      }`,
      variables: {
        message: 'Hello By Param'
      }
    },
    moments: {
      query: QUERY_LIST
    }
  },
  data () {
    return {
      newTag: 'test-xt-tag',
      query1: 'hello world1',
      query2: 'hello world2',
      query3: 'hello world3',
      moments: []
    }
  },
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },
    async addTag () {
      // 调用graphql 变更
      await this.$apollo.mutate({
        mutation: gql`mutation ($label: String!) {
          addTag(label: $label) {
            id
            label
          }
        }`,
        // 参数
        variables: {
          label: this.newTag
        }
      })
    }
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
