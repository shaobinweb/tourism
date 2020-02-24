<template>
	<view class="after">
		<view class="after_list" v-for="item in list" :key="item.id">
			<view class="list_header">{{item.delivery_sn}}</view>
			<view class="list_good">
				<view class="good_image">
					<image :src="item.goods_thumb" mode="aspectFit"></image>
				</view>
				<view class="good_info">
					<view class="good_name">{{item.goods}}</view>
					<view class="good_num">x{{item.goods_num}}</view>
				</view>
			</view>
			<view class="list_type">
				<image src="../../static/th.png" mode="aspectFit"></image>
				<label>退货</label>
				<text>{{item.status_str}}</text>
			</view>
			<view class="after_btn" @tap="after_desc({id:item.id})">
				<view class="btn">查看</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default {
		data() {
			return {
				list:null,
		    }
		},
		onShow(){
			this.get_list()
		},
		methods: {
			async get_list(){
				let data_api = await request.requestGet('after_list')
				this.list = data_api.data.data.data.data
				console.log(data_api)
				console.log(this.list)
			},
			after_desc(pos){
				uni.navigateTo({
					url:`/pages/order/after_desc?id=${pos.id}&type=0`
				})
			}
		}
	}
</script>

<style lang="scss">
	page{ background: #f0f0f0;}
	.after{ width:100%;height: 100%;display: flex;flex-direction: column;align-items: center;
		.after_list{ width:96%;height: auto;padding:10px 0px;background: #fff;border-radius: 10rpx;margin-top:30rpx}
		.list_header{ width:100%;height: 60rpx;border-bottom:1px solid #e8e8e8;font-size: 28rpx;color: #333;padding-left:20rpx;font-weight: bold;}
		.list_good{ padding:40rpx 30rpx;display: flex;
			.good_image{ width:140rpx;height: 140rpx;margin-right:30rpx;
				image{width:100%;height: 100%;}
			}
			.good_info{ font-size: 24rpx;color: #333;display: flex;height: 140rpx;justify-content: space-between;flex-direction: column;}
			.good_name{ display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;width:460rpx}
		}
		.list_type{ width:100%;height: 80rpx;border-top:1px solid #e8e8e8;border-bottom:1px solid #e8e8e8;padding-left:30rpx;display: flex;align-items: center;font-size: 28rpx;color: #333;
			image{ width:30rpx;height: 30rpx;margin-right:16rpx}
			label{font-size: 28rpx;color: #333;font-weight: bold;margin-right:16rpx}
			text{font-size: 28rpx;color: #333;font-weight: bold;}
		}
		.after_btn{ width:100%;height: 120rpx;padding-right:20px;display: flex;justify-content: flex-end;align-items: center;
			.btn{ width:100rpx;height: 66rpx;border:1px solid #ddd;color: #666;font-size: 28rpx;display: flex;justify-content: center;align-items: center;border-radius: 4rpx;}
		}
	}
</style>
