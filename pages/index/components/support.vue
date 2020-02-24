<template>
  <view>
    <scroll-view class="scroll-view_H" scroll-x="true"  scroll-left="120">
      <view v-if="pro_list.length===0" class="floor-item">
        <view class="item_img_box"><image mode="aspectFill"></image></view>
          <view class="title clamp"></view>
         
         
      </view>
      <view
        v-for="(item,index) in pro_list"
        :key="index"
        @click="navToDetailPage"
        :data-id="item.id"
        :data-cate ="item.cate_type.cate"
        class="scroll-view-item_H uni-bg-red floor-item"
      >
        <view class="item_img_box"><span class="type">{{item.cate_type.tag}}</span><image :src="item.thumb" mode="aspectFill"></image></view>
        <view class="title clamp">{{item.name.substring(0,15)+'...'}}</view>
        <view  v-if="item.price!==null&&item.price!==undefined">
          <text class="price"><span class="signal">￥</span>{{item.price}}</text>起
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    pro_list: Array
  },
  data() {
    return {
      scrollTop: 0,
            old: {
                scrollTop: 0
            },
      pro_list2: []
    }
  },
  methods: {
    navToDetailPage: function (e) {
      console.log("子组件的id", e.currentTarget.dataset.id)
      this.$emit('showclick', {
        id: e.currentTarget.dataset.id
      })
    },
   
  },
  beforeMount() {
    let swNum = -1
    for (var key in this.pro_list) {
      if (key % 3 === 0) {
        swNum++
        this.pro_list2[swNum] = new Array()
      }
      this.pro_list2[swNum].push(this.pro_list[key])

    }
    // console.log("子组件的商品数据",this.pro_list2)

  }

}
</script>

<style lang="scss">
/* 秒杀专区 */

.scoll-wrapper {
  height: 300rpx;
  display: flex;
  align-items: flex-start;
}
.floor-item {
  width: 200upx;
  font-size: $font-sm + 2upx;
  color: $font-color-dark;
  margin-right: 18upx;
  margin-top: 10upx;
  line-height: 1.8;
  display: inline-block;

  image {
    width: 200upx;
    height: 120upx;
    border-radius: 10upx;
  }
  .price {
    color: #ea5638;
    font-weight: bold;
    font-size: 30upx;
    .signal{
      font-size: 24rpx
    }
  }
}

.item_img_box {
  position: relative;
  height: 140rpx;
  .type{
    height: 35upx;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    font-size: 20upx;
    line-height: 35upx;
    border-radius: 10upx 0 10upx 0;
    padding:5rpx 8rpx;
    z-index: 1;
    background: rgba(28,51,69,0.6);
  }
}
.item_img_box image {
  width: 100%;
  height: 140rpx !important;
}
.item_price_left {
  display: inline-block;
  width: 100rpx;
  text-align: center;
  height: 40rpx;
  line-height: 42rpx;
  color: #fff;
  background: #cc2d1e;
}
.item_price_right {
  display: inline-block;
  text-align: center;
  color: #cc2d1e;
  background: #fff;
  padding: 0 12rpx;
  width: 100%;
  text-align: center;
  line-height: 38rpx;
}
.buy_type {
  width: 100%;
  height: auto;
  color: rgba(153, 153, 153, 1);
  font-size: 24rpx;
  display: block;
}
.clamp {
  // display: -webkit-box;
  // word-break: break-all; 
  // text-overflow: ellipsis;
  // font-size: 24rpx;//自适应字体
  // overflow: hidden;
  // -webkit-box-orient: vertical;
  // -webkit-line-clamp:2;//设置 需要显示的行数
  white-space: normal;
  font-weight: bold;
  color: #252629;
  margin-top: 10upx;
  font-size: 24upx;
}
</style>
