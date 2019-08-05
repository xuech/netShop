<template>
  <div>
    <web-view :src="webViewUrl"></web-view>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        webViewUrl: 'https://act.you.163.com/act/pub/RxRWDz4F3p.html',
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
