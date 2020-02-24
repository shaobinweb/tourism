<template>
	<view class="address_box">
		<!-- 地址列表 -->
		<view class="address_list" v-for=" item in address_list" :key="item.id" @tap="select_address(item.id)">
			<view class="list_L">
				{{item.consignee.substring(0,1)}}
			</view>
			<view class="list_R">
				<view class="list_R_T">
					<view class="address_name">{{item.consignee}}</view>
					<view class="address_tel">{{item.mobile}}</view>
				</view>
				<view class="list_R_B">
					<text class="address_desc">{{item.address}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	import Vue from 'vue'
	export default {
		data() {
			return {
				source: 0,
				address_list: null,
				del_ads_alert : false,
				ads_id : 0,
				id:0,
				type :'edit',
				item:null
			}
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
		},
		async onShow() {
			this.addressListFun()
		},
		methods: {
			select_address : function ( as_id){
				Vue.prototype.$address_id = as_id
				uni.navigateBack({})
			},
			//获取地址
			async addressListFun (){
				let addressList = await request.requestGet('addressList')
				this.address_list = addressList.data.data.lists
				console.log("地址",JSON.stringify(this.addressList))
			},
			//选择地址
			checkAddress(item){
			
			},
		},
		// #ifndef MP
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				// 点击编辑  切换状态
				this.$api.msg("点击了按钮")
			} 
		}
		// #endif
	}
</script>

<style lang="scss">
	page{ background: #f9f9f9;padding:30rpx 20rpx}
	.address_list{ width:94%;height: auto;background: #fff;padding:24rpx 30rpx;border-radius: 10rpx;margin-bottom:20rpx;display: flex;align-items: center;box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);}
	.list_L{ width:60rpx;height:60rpx;background: #f0f0f0;border-radius: 60rpx;font-size: 28rpx;text-align: center;line-height: 60rpx;margin-right:20rpx}
	.list_R_T{ display:flex;align-items: center;font-size: 26rpx;color: #333;}
	.address_name{ margin-right:12rpx}
	.list_R_B{ font-size:26rpx;color: #333;margin-top:20rpx}
</style>
