<template>
  <div class="index">
    <div class="search">
      <div>
        <input class="searchInput" type="search" placeholder="搜索商品"/>
        <span class="icon"></span>
      </div>
    </div>
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in focus " :key="index">
          <swiper-item @click="swiperEvent(item)" class="swiper-item">
            <image :src="item.img" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="channel">
      <div v-for="(item, index) in kingKongArea" :key="index">
        <img :src="item.picUrls[0]" alt="">
        <p>{{item.title}}</p>
      </div>
    </div>
    <div class="imageTop">
      <img :src="urlone"/>
    </div>
    <div class="imageBottom">
      <img :src="url2"/>
      <img :src="url3"/>
    </div>
    <div class="brand">
      <div class="head">
        为你推荐
      </div>
      <div class="content">
        <div class="brandItem" v-if="categoryItems.length>0" v-for="(item, index) in categoryItems" :key="index">
          <img :src="item.categoryItem.primaryPicUrl" alt="">
          <div style="background-color: antiquewhite"><p class="simpleDesc">{{item.categoryItem.simpleDesc}}</p></div>
          <p>{{item.categoryItem.name}}</p>
          <div class="price">
            <p>¥{{item.categoryItem.activityPrice}}</p>
            <p>¥{{item.categoryItem.retailPrice}}</p>
            <p>减{{item.categoryItem.retailPrice-item.categoryItem.activityPrice}}元</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { get } from "../../utils";

export default {
  data () {
    return {
      //热销好评品牌
      categoryItems: [],
      //最上面的滚动图
      focus:[],
      //5个图标
      kingKongArea:[],
      //3张图片
      operationImg:[],
      urlone:'',
      url2:'',
      url3:'',

    }
  },

  components: {
  },

  methods: {
    async getData() {
      const data = await get("index/index.json");
      // console.log(data)
      // data.operationCfg.forEach(value => {
      //   if (value.picUrls.length){
      //     this.operationImg.push(value.picUrls[0])
      //   }
      // })
      let arr = data.operationCfg[0]
      let arr2 = data.operationCfg[1]
      let arr3 = data.operationCfg[2]
      this.urlone = arr.picUrls[0]
      this.url2 = arr2.picUrls[0]
      this.url3 = arr3.picUrls[0]
      // console.log(this.operationImg)
      this.operationImg = data.operationCfg;
      this.focus = data.focus;
      this.kingKongArea = data.kingKongArea
    },
    async rcmd(){
      const rcmddata = await get("rcmd/index.json");
      let list = rcmddata.rcmdItemList.filter(val=>{
        return val.type === 1
      })
      console.log(list)
      this.categoryItems = list
    },
    swiperEvent(item){
      console.log(item.content)
      wx.navigateTo({
        url: "../webview/main?url=" + item.content
      });
    }
  },
  mounted() {
    this.getData();
    this.rcmd()
  }
}
</script>

<style  lang='scss' scoped>
@import "style";
</style>
