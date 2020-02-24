<template>
	<view class="address_box">
		<!-- 地址列表 -->
		<view class="raffle_box">
			<view class="raffle_n1">{{info.title_1}}</view>
			<view class="raffle_n1">{{info.title_2}}</view>
		</view>
		<view class="address_list" v-for=" item in address_list" :key="item.id" @tap="select_address(item)">
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
		<!-- 确认收货地址 -->
		<view class="raffle_address" v-if="address_if">
			<view class="raffle_add_box">
				<view class="raffle_add_n1">你确定要把{{choice_address.address}}设置为奖品收货地址吗</view>
				<view class="raffle_add_n2">
					<view class="raffle_add_cacel" @tap="cancelFun">取消</view>
					<view class="raffle_add_btn" @tap="Determine">确定</view>
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
				item:null,
				info:{'title_1':'1、点击地址进行选择','title_2':'2、设置后无法自行更改，需联系客服'},
				address_if:false,
				choice_address:{},
			    gif_id : 0,
				choice_address_id:0,//选中地址id
				raffle_id:0,//奖品id，支付也就传这个
			}
		},
		onLoad(option){
			this.gif_id = option.id
		},
		async onShow() {
			this.addressListFun()
		},
		methods: {
			async Determine(){
				let _this = this				
				let data_api = await request.requestPost('luck_draw_receive',{id:this.gif_id,address:this.choice_address_id})
				if(data_api.data.code == 200){
					console.log("领取的状态",data_api.data)
					setTimeout(function(){
						uni.navigateTo({
							url:`./pay?type=product&serial_id=${data_api.data.data.orderId}`
						})
					},500)
				}
				
				
			},
			cancelFun(){
				this.address_if = false
			},
			select_address : function (item){
				console.log(item.id)
				this.address_if = true
				this.choice_address = item
				this.choice_address_id = item.id
			},
			//获取地址
			async addressListFun (){
				let addressList = await request.requestGet('addressList')
				this.address_list = addressList.data.data.lists
				console.log("地址",JSON.stringify(this.addressList))
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
	// 确认收货地址statr
	.raffle_address{ width:100%;height: 100%;background: rgba(0,0,0,0.6);position: fixed;top:0px;bottom:0rpx;right:0px;left:0rpx;display: flex;justify-content: center;align-items: center;z-index:100;
		.raffle_add_box{ width:600rpx;height: 210rpx;background: #fff;border-radius: 16rpx;}
		.raffle_add_n1{ width:100%;height: 130rpx;display: flex;justify-content: center;align-items: center;padding-left:60rpx;padding-right:60rpx;font-size:28rpx;text-align: center;}
		.raffle_add_n2{ width:100%;height: 80rpx;border-top:1px solid #f1f1f1;display: flex;justify-content: space-between;
			.raffle_add_cacel,.raffle_add_btn{ flex:1;display: flex;justify-content: center;align-items: center;}
			.raffle_add_btn{ flex:1}
		}
	}
	//确认收货地址end
	.raffle_box{ font-size:24rpx;margin-bottom:20rpx}
	page{ background: #f9f9f9;padding:30rpx 20rpx}
	.address_list{ width:94%;height: auto;background: #fff;padding:24rpx 30rpx;border-radius: 10rpx;margin-bottom:20rpx;display: flex;align-items: center;box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);}
	.list_L{ width:60rpx;height:60rpx;background: #f0f0f0;border-radius: 60rpx;font-size: 28rpx;text-align: center;line-height: 60rpx;margin-right:20rpx}
	.list_R_T{ display:flex;align-items: center;font-size: 26rpx;color: #333;}
	.address_name{ margin-right:12rpx}
	.list_R_B{ font-size:26rpx;color: #333;margin-top:20rpx}
</style>
