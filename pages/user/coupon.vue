<template>
	<view class="coupon">
		<view class="coupon_type">
			<block v-for="(item,index) in coupon_list" :key="index">
				<view class="item"  @click="coupon(item.id)">
					<view :class="{'box':item.id==id}">{{item.name}}</view>
				</view>
			</block>
		</view>
		<view class="list_box" v-for="item in list" :key="item.id">
			<view class="list_item" :style="{'background':id == 1 || id == 3 ? 'rgba(255, 255, 255, 0.8)':'#fff'}">
				<view class="list_top">
					<view class="top_n1">{{item.coupon_name}}</view>
					<view class="top_n2">￥{{item.quota}}</view>
				</view>
				<view class="coupon_type_img">
					<image v-if="id == 1" src="../../static/coupon-used.png"></image>
					<image v-if="id == 3" src="../../static/coupon-date.png"></image>
				</view>
				<view class="list_bottom">
					<view class="list_bottom_n1">有效期至：{{item.end_time}}</view>
					<view class="list_bottom_n2" v-if="id==2" @tap="go_index">立即使用</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default{
		name:'coupon',
		data(){
			return{
				id:2,
				coupon_list:[{id:1,name:'已使用',status:'used'},{id:2,name:'未使用',static:'usable'},{id:3,name:'已过期',static:'timeout'}],
				list:[],//优惠卷列表
				status:'usable',//状态
				page:1
			}
		},
		
		async onShow() {
			this.get_coupon_list()
		},
		//加载更多
		async onReachBottom(){
			let _this = this
			_this.page++
			let couponAPI = await  request.requestGet('user_coupon',{status:this.status,page:_this.page})
			let list = couponAPI.data.data.coupon_list
			list.forEach(item=>{
				 var date = new Date(item.end_time*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				 var Y = date.getFullYear() + '-';
				 var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				 var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
				 item.end_time = Y+M+D
			})
			_this.list = _this.list.concat(list) 
		},
		methods:{
			async get_coupon_list(){
				let _this = this
				this.page = 1
				_this.list = []
				let couponAPI = await  request.requestGet('user_coupon',{status:this.status,page:_this.page})
				let list = couponAPI.data.data.coupon_list
				list.forEach(item=>{
					 var date = new Date(item.end_time*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
					 var Y = date.getFullYear() + '-';
					 var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					 var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
					 item.end_time = Y+M+D
				})
				_this.list = _this.list.concat(list)
				console.log("优惠卷信息",couponAPI)
			},
			go_index: function(){
				uni.switchTab({
					url:'../index/index'
				})
			},
			coupon(id){
				this.id=id
				this.page = 1
				if(id == 1){ this.status = 'used'}
				if(id == 2){ this.status = 'usable'}
				if(id == 3){ this.status = 'timeout'}
				this.get_coupon_list()
				console.log(this.status)
			}
		}
	}
</script>

<style lang="scss">
	page{background: #eee;}
	.coupon{ height:100vh;background: #eee;}
	.box{border-bottom: 3px solid #999;}
	.coupon_type{display: flex;justify-content: space-around;background: #FFFFFF;}
	.item{color: #333;font-size: 26upx;padding: 15upx 0upx;
		view{padding: 15upx 0;}
	}
	.list_box{ padding:60rpx 30rpx;
		.list_item{  background: url('../../static/coupon-bg.png') no-repeat center center;background-size: 100% 100%;height:280rpx;margin-bottom:-60rpx}
		.list_top{ width:100%;padding:50rpx 40rpx 20rpx 40rpx;height: 108rpx;display: flex;justify-content: space-between;font-size:30rpxx;color:#333;
			.top_n2{ color:#F86C5B}
		}
		.list_bottom{ width:100%;height: 68rpx;padding-left:40rpx;padding-right:40rpx;font-size:24rpx;display: flex;align-items: center;justify-content: space-between;position: relative;
			.list_bottom_n1{ color:#999}
			.list_bottom_n2{ color: #333;font-size:28rpx;margin-right:30rpx}
			.list_bottom_n2:after{  content: "";position: absolute;right: 20rpx;top: 24rpx;height: 0;border: 12rpx solid transparent;border-left: 16rpx solid #333;}
		}
	}
	.coupon_type_img{ width:100%;height: 100rpx;display: flex;justify-content: flex-end;
		image{ width:200rpx;height: 100rpx;}
	}

</style>