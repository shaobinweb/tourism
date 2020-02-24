<template>
  <view>
    <view 
				class="guess-item"
				@click="navToDetailPage(product)"
			>
				<view class="item_img_box image-wrapper">
					<image :src="product.thumb" mode="aspectFill" style="height:100% !important"></image>
				
				</view>
				<view class="recommend_bottom">
					<text class="title">{{product.name.substring(0,22)+'...'}}</text>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view class="lef" style="display: flex;align-items: center;">
						<text class="price"><span class="signal">￥</span>{{product.market_price}}</text>
						<span class="sales">{{product.sales}}人已购</span>
					</view>
					<view class="iconfont" style="color: #999999;">&#xe61c;</view>
				</view>
			</view>
      		<view style="clear:both"></view>
  </view>
</template>

<script>
export default {
  props: {
    product:Object
  },
  data() {
    return {
    
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
}
</script>

<style lang="scss">
	/* 猜你喜欢 */
.recommend_bottom{margin: 10upx;}
		.guess-item{
			padding-bottom: 10rpx;
			border-radius: 14rpx;
			background: #ffffff;
			margin-bottom:20rpx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 10upx;
			overflow: hidden;
			image{
				width: 100%;
				// height: 100%;
				opacity: 1;
				border-radius: 10upx;
				display: block;
			}
		}
		.title{
			font-size: 28rpx;
			color: rgba(51, 51, 51, 1);
			font-weight: 600;
			// line-height: 80upx;
		}
	  .price {
    color: red;
    font-weight: bold;
    font-size: 30upx;
	margin-right: 8upx;
    .signal{
      font-size: 24rpx
		}
		
	}
	.sales{
			margin-left: 10upx;
			font-size: 15rpx;
			color: #B0B4B7;
			font-weight: normal;
		}
</style>
