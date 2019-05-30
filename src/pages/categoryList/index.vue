<template>
  <div class="content">
    <scroll-view class="head" scroll-x="true" :scroll-left="scrollLeft">
      <div @click="selectItem(item,index)" v-for="(item, index) in subCategoryList" :class="[index===nowIndex?'active':'']" :key="index">
        {{item.name}}
      </div>
    </scroll-view>
    <div class="info">
      <p>{{selecteItem.frontName}}</p>
    </div>
    <div class="list" v-if="goodsList.length!==0">
      <div @click="goodsEvent(item.id)" class="brandItem" v-for="(item, index) in goodsList" :key="index">
        <img :src="item.primaryPicUrl" alt="">
        <div style="background-color: antiquewhite"><p class="simpleDesc">{{item.simpleDesc}}</p></div>
        <p>{{item.name}}</p>
        <div class="price">
          <p v-if="item.activityPrice">¥{{item.activityPrice}}</p>
          <p v-if="item.retailPrice">¥{{item.retailPrice}}</p>
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
        scrollLeft: 0,
        subCategoryList:[],
        nowIndex: 0,
        categoryId: 0,
        itemID: 0,
        selecteItem:{},
        goodsList:[]

      }
    },
    methods: {
      initData(){
        this.categoryId = 0
        this.itemID = 0
        this.nowIndex = 0
        this.goodsList = []
        // this.navData = []
        this.selecteItem = {}
        this.scrollLeft = 0
      },
      async getData(){
        const data = await get("list/subCate.json", {
          categoryId: this.categoryId
        });
        wx.setNavigationBarTitle({
          title: data.category.name
        })
        this.subCategoryList = data.category.subCategoryList
        this.subCategoryList.forEach((val,index)=>{
          if (this.subCategoryList[index].id === this.itemID){
            console.log("test",this.subCategoryList[index].id,this.itemID)
            this.selectItem(this.subCategoryList[index],index)
          }
        })
      },
      selectItem(item, index){
        this.nowIndex = index;
        this.selecteItem = item
        this.getSubList(item.id)
        this.scrollLeft = this.nowIndex * 60;
      },
      async getSubList(id){
        const data = await  get("list/l2Items2.json",{
          categoryL1Id:this.categoryId,
          categoryL2Id:id
        });
        console.log(data)
        this.goodsList = data.itemList
      },
      goodsEvent(id){
        wx.navigateTo({
          url: "../goods/main?id=" + id
        });
      }

    },
    mounted() {
      let data = JSON.parse(this.$root.$mp.query.params);
      this.categoryId = data.superCategoryId
      this.itemID = data.id
      this.getData();
    },
    onLoad() {
      this.initData()
    },
  }
</script>

<style lang='scss' scoped>
  @import "style";
</style>
