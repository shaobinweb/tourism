<template>
	<view>
		<swiper class="scoll-wrapper" circular  :indicator-dots ="true" indicator-color="#c9c9c9" indicator-active-color="#cc2d1e">
				<swiper-item v-for = "(list2,index) in pro_list2" :key="index"  class="swiper_item_list">
					<view v-for="(item, index) in list2" :key="index"
					class="floor-item"
					@click="navToDetailPage" :data-id="item.id">
						<view class="item_img_box">
							<image :src="item.thumb" mode="aspectFill"></image>
							<view class="item_price">
								<text class="item_price_left">推荐</text>
								<label class="item_price_right">¥{{item.shop_price}}</label>
							</view>
						</view>
						<text class="title clamp">{{item.title}}</text>
						<label class="buy_type">现金+购物金</label>
						<text class="price">{{item.shop_price - item.cecn_num }}+{{item.cecn_num}}购物金</text>
					</view>
				</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			pro_list :Array
		},
		data() {
			return {
				pro_list2 : []
			}
		},
		methods:{
			navToDetailPage:function (e) {
				console.log("子组件的id",e.currentTarget.dataset.id)
				this.$emit('showclick', {
					id:e.currentTarget.dataset.id
				})
			}
		},
		beforeMount(){
					let swNum = -1
		           	for(var key in this.pro_list){
		           		if( key % 3 === 0 ){
		           			swNum ++
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

	.scoll-wrapper{
		height: 400rpx;
		display:flex;
		align-items: flex-start;
	}
	.floor-item{
		width: 210rpx;
		font-size: $font-sm+2upx;
		color: $font-color-dark;
		line-height: 1.8;
		image{
			width: 210upx;
			height: 200upx;
			border-radius: 6upx;
		}
		.price{
			color: rgba(204, 45, 30, 1);
			font-weight: bold;
			font-size: 24upx;
		}
	}
	.swiper_item_list{ display: flex;flex-direction: row;justify-content: space-between;}
	.ad_banner{ width:100%;height: 290rpx;margin-bottom:40upx}
	.ad_banner image{ width:100%;height: 290upx;}
	.item_img_box{ position: relative;height: 212rpx }
	.item_img_box image{ width:100%;height: 212rpx !important;}
	.item_price{ width:auto;height: 42rpx;background:rgba(255, 255, 255, 1);border: 1px solid rgba(204, 45, 30, 0.6);position: absolute;bottom: 0;left: 0;font-size: 24rpx;display: flex;align-items: center;}
	.item_price_left{ display: inline-block;width:100rpx;text-align: center;height: 40rpx;line-height: 42rpx;color:#fff;background:#CC2D1E;}
	.item_price_right{ display: inline-block;text-align: center;color:#CC2D1E;background:#fff;padding: 0 12rpx;width: 100%;text-align: center;line-height: 38rpx;}
	.buy_type{ width:100%;height: auto;color: rgba(153, 153, 153, 1);font-size: 24rpx;display: block;}
	.clamp{ font-size:28rpx}
</style>
