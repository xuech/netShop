<template>
  <div class="content">
    <div>
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item>
            <image :src="item"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="desc">
      <div class="topdesc">
        <p>{{dataSource.name}}</p>
        <p>{{dataSource.simpleDesc}}</p>
      </div>
      <div class="middesc">
        <div v-if="dataSource.activityPrice" class="price">
          <p>¥{{dataSource.activityPrice}}</p>
          <p>¥{{dataSource.retailPrice}}</p>
        </div>
        <div v-else  class="price">
          <p>¥{{dataSource.retailPrice}}</p>
        </div>
        <div v-if="dataSource.itemRewardVO" class="back">
          <p>{{dataSource.itemRewardVO.rewardText}}</p>
          <p>¥{{dataSource.itemRewardVO.rewardAmount}}</p>
          <!--<i-icon type="feedback" size="28"/>-->
        </div>
      </div>
      <div class="tag" v-if="tagList">
        <div v-for="(item,index) in tagList" :key="item.id">
          <div class="tagBtn">{{item.tagName}} ></div>
        </div>
      </div>
    </div>
    <div class="chose">
      <div>
        <p>已选择：</p>
        <p>></p>
      </div>
      <div>
        <p>限制：{{dataSource.couponLimit}}</p>
      </div>
      <div>
        <p>配送：上海市普陀区长风公园</p>
        <p>></p>
      </div>
      <div>
        <p>服务：</p>
        <div class="server">
          <div v-for="(item,index) in policyList" :key="item.id">
            {{item.title}}
          </div>
        </div>
        <p>></p>
      </div>
    </div>
    <div class="comment">
      <div class="commentTitle">
        <p>用户评论({{dataSource.commentCount}})</p>
        <p>{{dataSource.itemStar.goodCmtRate}} ></p>
      </div>
      <div v-if="comments" class="user">
        <div class="icon">
          <img :src=comments.frontUserAvatar>
          <p>{{comments.frontUserName}}</p>
        </div>
        <p class="commentTime">{{comments.commentTime}}</p>
        <p class="content">{{comments.content}}</p>
        <div class="photo" v-if="comments.picList" >
          <img v-for="item in comments.picList" :key="item" :src="item" style="width: 140rpx;height: 140rpx;margin-right: 20rpx"/>
        </div>
      </div>
    </div>
    <div class="attr">
      <p>商品参数</p>
      <div :class="['cellAttr',index===6 ? 'lastCell' : '']" v-if="attrList" v-for="(item,index) in attrList" :key="item">
        <div>{{item.attrName}}</div>
        <p>{{item.attrValue}}</p>
      </div>
    </div>
    <div class="picDiv">
      <wxParse :className="parseClass" :content="dataSource.itemDetail.detailHtml"/>
    </div>
    <div class="bottom-fixed">
      <div @click="backHome">
        <div class="backHome"></div>
      </div>
      <div @click="shopCar">
        <div class="car">
          <span></span>
          <img src="/static/images/ic_menu_shoping_nor.png" alt="">
        </div>
      </div>
      <div @click="buy">立即购买</div>
      <div @click="addShopCar">加入购物车</div>
    </div>
  </div>
</template>

<script>
  import { get,formatTime } from "../../utils";
  import wxParse from 'mpvue-wxparse'

  export default {
    components: {
      wxParse
    },
    data () {
      return {
        //轮播图
        gallery: [],
        //商品参数
        attrList:[],
        comments:{},
        dataSource: {},
        policyList:[],
        tagList:[]
      }
    },
    methods:{
      async getData(id){
        const data = await get("item/detail.json", {
          itemId: id
        });
        this.gallery.push(data.listPicUrl)
        this.gallery.push(data.itemDetail.picUrl1)
        this.gallery.push(data.itemDetail.picUrl2)
        this.gallery.push(data.itemDetail.picUrl3)
        this.gallery.push(data.itemDetail.picUrl4)
        this.attrList = data.attrList
        if (data.comments){
          let comment = data.comments[0]
          let date = new Date(comment.createTime)
          comment.commentTime =  formatTime(date)
          this.comments = comment
        }
        this.policyList = data.policyList
        this.tagList = data.tagList
        this.dataSource = data

      },
      backHome(){

      },
      addShopCar(){

      },
      shopCar(){},
      buy(){},
      initData(){
        this.gallery = []
      }
    },
    mounted () {
      this.getData(this.$root.$mp.query.id);
      this.initData()
    },
    //mpvue 不支持
    // filters: {
    //   dateFormate(val){
    //     console.log(val)
    //     let date = new Date(val)
    //     return formatTime(date)
    //   }
    // }
  }
</script>

<style lang='scss' scoped>
  @import "style";
  @import url("~mpvue-wxparse/src/wxParse.css");
</style>
