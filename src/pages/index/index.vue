<template>
  <div>
  </div>
</template>

<script>
  import { get } from "../../utils";

export default {
  data () {
    return {
      motto: '',
    }
  },

  components: {
  },

  methods: {
    async getData() {
      const data = await get("index/index.json");
      console.log(data)
    },
  },
  mounted() {
    this.getData();
  },
}
</script>

<style scoped>

</style>
