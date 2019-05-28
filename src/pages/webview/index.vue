<template>
  <div>
    <web-view :src="webViewUrl"></web-view>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        webViewUrl: 'https://www.baidu.com',
      }
    },
    mounted () {
      // this.webViewUrl = this.$root.$mp.query.url
      // console.log(this.webViewUrl)
    }
  }
</script>

<style scoped>

</style>
