<template lang="pug">
.container(@click="clickHandle")
  .message {{msg}}
  counter
</template>

<script>
import counter from '@/pages/counter'
export default {
  components: {counter},
  data () {
    return {
      msg: 'Hello World'
    }
  },
  methods: {
    clickHandle (msg, ev) {
      this.msg = 'Good morning!'
    }
  }
}
</script>

<style scoped>
.message {
  color: #f00;
  padding: 10px;
  text-align: center;
}
</style>
