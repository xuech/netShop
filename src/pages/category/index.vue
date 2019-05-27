<template>
  <div class="content">
    <scroll-view class="left" scroll-y="true" @click="">
      <div class="iconText" @click="selectitem(item,index)" v-for="(item, index) in categoryList" :class="[index===nowIndex?'active':'']" :key="index">
        {{item.name}}
      </div>
    </scroll-view>
    <scroll-view class="right" scroll-y="true">
      <div v-if="focusBanner" class="banner">
        <img :src="focusBanner.picUrl"/>
      </div>
      <div class="title">
        <span>—</span>
        <span>分类</span>
        <span>—</span>
      </div>
      <div class="bottom">
        <div  v-for="(category,index) in categoryGroupList" :key="category.id">
          <div class="category">{{category.name}}</div>
          <div style="display: flex;flex-wrap: wrap;">
            <div class="item" @click="categoryEvent(item)" v-for="(item,index2) in category.categoryList" :key="item.id">
              <img :src="item.bannerUrl" alt="">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>

  </div>
</template>

<script>
  import { get } from "../../utils";
  export default {
    data () {
      return {
        categoryList:[],
        listData:[],
        categoryGroupList:[],
        focusBanner:{},
        nowIndex: 0,

      }
    },
    methods: {
      async getData(){
        const data = await get("list/category.json");
        console.log(data)
        this.categoryList = data.categoryList
        this.selectitem(this.categoryList[0],0)
      },
      selectitem(item, index){
        this.nowIndex = index;
        this.categoryGroupList = item.categoryGroupList;
        this.focusBanner = item.focusBannerList[0]
      },
      categoryItemList(){

      },
      categoryEvent(item) {
        let data = JSON.stringify(item)
        wx.navigateTo({
          url: "../categoryList/main?params=" + data
        });
      }
    },
    mounted() {
      this.getData();
    }
  }
</script>

<style lang='scss' scoped>
  @import "style";
</style>
