<template>
  <div>
    <van-button type="primary" @click="gogogo">主要按钮</van-button>
    <a href="../pA/package/main"> 分包 </a>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        username: '',
        stepperValue: 1
      }
    },

    components: {
    },

    methods: {
      onChange(val){
        console.log(val)
      },
      gogogo(){

      }
    },

    created () {

    }
  }
</script>

<style scoped>

</style>
