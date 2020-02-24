<template>
	<view class="invitation">
		<view class="my_logo">
			<image :src="userInfo.data.user_list.head_pic||''"></image>
			<view class="my_phone">{{userInfo.data.user_list.nickname || "游客"}} </view>
			<view class="top_user" v-if="userInfo.top_user != null">邀请人:{{userInfo.top_user}}</view>
		</view>
		<view class="agent">
			<view class="agent_title">
				<text>我的代理({{team_data.num}})</text>
				
			</view>
			<view class="agent_list">
				<view class="list_item" v-for="item in team_data.team_list" :key="item.id">
					<block v-if="item.pic.indexOf('127.0.0.1')>=0">
						<image src="../../static/missing-face.png" mode="aspectFit"></image>
					</block>
					<block v-else>
						<image :src="item.pic||''" mode="aspectFit"></image>
					</block>
					<view class="list_name">{{item.nickname}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default{
		name:"invitation",
		data(){
			return{
				userInfo : null,//用户信息
				team_data:null,
			}
		},
		async onShow() {
			let userInfo = await request.requestGet('myhome')
			this.userInfo = userInfo.data
			console.log("获取主页数据成功",this.userInfo)
			//个人中心的用户信息
			uni.setStorageSync('myInofData',userInfo.data)
			let data_api = await request.requestPost('team')
			this.team_data = data_api.data.data
			console.log("团队",data_api.data.data)
		}
	}
</script>

<style lang="scss">
	page{background: #eee;}
	.top_user{ width:100%;display: flex;justify-content: center;align-items: center;height: 50rpx;font-size:24rpx;color:#999}
	.invitation{
		.my_logo{
			padding-bottom:10rpx;
			text-align: center;
			background: #fff;
			image{width: 160upx;height: 160upx;border-radius:100upx;margin: 50upx 0 20upx;}
			.my_phone{font-size: 24upx;color: #333;}
		}
		.agent{
			margin-top: 30upx;
		}
		.agent_title{
			text-align: center;
			background: #FFFFFF;
			padding: 20upx 30upx;
			text{
				padding: 20upx 30upx;
				border-bottom: 2px solid #333;
				color: #333;
				font-size: 26upx;
			}
		}
		.agent_list{ width:100%;height: auto;padding:20rpx;background: #fff}
		.list_item{ display: flex;height: 140rpx;align-items: center;
			image{ width:100rpx;height: 100rpx;border-radius: 100rpx;margin-right:20rpx;overflow: hidden;}
		}
	}
</style>