<template>
	<view class="pro_box">
		<view  class="good_list" v-for="item in list" @tap="navToDetailPage({id:item.id})" :key="item.id">
			<view class="good_image">
				<image :src="item.thumb" mode="aspectFill"></image>
			</view>
			<view class="good_info">
				<view class="good_name">{{item.title}}</view>
				<block v-if="item.cecn_num == 0">
					<view class="good_type">单价</view>
					<view class="good_price">¥{{item.shop_price}}</view>
				</block>
				<block v-else>
					<view class="good_type">现金+购物金</view>
					<view class="good_price">¥{{item.shop_price}}+{{item.cecn_num}}</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default {
		data() {
			return {
				list:[],
				
			}
		},
		onShow() {
			
			this.getList()
		},
		methods: {
			//获取商品
			async getList(){
				console.log("请求")
				let data_api = await request.requestGet('vip_product')
				this.list = data_api.data.data.goodsList
				console.log("vip大礼包",data_api.data.data)
			},
			//详情页
			navToDetailPage(obj_id) {
				console.log("商品跳转id",obj_id.id)
				uni.navigateTo({
					url: `/pages/product/product?id=${obj_id.id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	page{ background: #f0f0f0;padding-top:30rpx;display: flex;justify-content: center;height: auto;}
	.pro_box{ width:94%;display: flex;flex-wrap: wrap;justify-content: space-between;
		.good_list{ width:49%;height: auto;margin-bottom:20rpx;}
		.good_image{ width:100%;height:350rpx;border-top-left-radius: 12rpx;border-top-right-radius: 12rpx;overflow: hidden;
			image{ width:100%;height:100%}
		}
		.good_info{ width:100%;height: auto;padding:20rpx;background: #fff;font-size: 24rpx;}
		.good_name{ display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;word-break: break-all;}
		.good_type{ margin:8rpx 0px}
		.good_price{ color: #e4393c;}
	}
	
</style>
