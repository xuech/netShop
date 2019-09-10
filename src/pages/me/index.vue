<template>
  <div>
    <van-row gutter="20">
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
      <van-col span="8">span: 8</van-col>
    </van-row>
    <van-field
      :value= username
      required
      clearable
      label="用户名"
      placeholder="请输入用户名">
    </van-field>
    <van-stepper :value= stepperValue @change="onChange"></van-stepper>
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
      }
    },

    created () {

    }
  }
</script>

<style scoped>

</style>
