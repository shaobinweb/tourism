<template>
	<view class="reward">
		<view class="reward_number">
			<view class="money">￥{{userInfo.data.user_money || 0}}</view>
			<view class="total">总金额</view>
		</view>
		<view class="reward_list">
			<view>邀请人数</view>
			<view>奖励金额</view>
			<view>日期</view>
		</view>
		<!-- 订单流水 -->
		<view class="wallet_list">
			<view class="wallet_item" v-for="item in list" :key="item.id">
				<view class="wallet_item_L">
					<view class="item_L_day">{{item.nickname}}</view>
				</view>
				<view class="wallet_item_M">
					{{item.consumption_amount}}
				</view>
				<view class="wallet_item_R">
					<text style="color: #3DB264;">{{item.time.substring(0,10)}}</text>
				</view>
			</view>
		</view>
	</view>	
</template>
<script>
	import request from '@/tool/request.js'
	export default{
		name:'wallet',
		data(){
			return{
				list:[],
				userInfo:null,
				page:1
			}
		},
		async onShow() {
			let userInfo = await request.requestGet('myhome')
			this.userInfo = userInfo.data
			this.get_list()
		},
		methods:{
			async get_list(){
				let data_api = await request.requestPost('team_share',{page:this.page})
				console.log("我的奖励",data_api)
				let _list = data_api.data.data.shareinfo.data
				this.list = this.list.concat(_list)
				console.log(this.list)
			}
		},
		onReachBottom : async function ( e ){
			console.log("加载更多")
			//分页
			this.page++
			this.get_list()
		}
	}
</script>

<style lang="scss">
	page{background: #eee;}
	.bor{border-bottom: 4upx solid #333;}
	.reward{
		.reward_number{
			text-align: center;
			background: #F59A31;
			.money{font-size:72upx;color: #FFFFFF;padding: 65upx 0 20upx;}
			.total{color: #FFFFFF;padding: 0upx 0 30upx; font-size: 30upx;}
		}
		.reward_list{
			background: #FFFFFF;
			display: flex;
			view{
				flex: 1;
				text-align: center;
				color: #999;
				font-size: 28upx;
				padding: 25upx 0;
			}
		}
	}
	.wallet_list{ width:100%;height: auto;background: #fff;margin-top:20rpx;
		.wallet_item{ font-size: 24rpx;color: #333;width:100%;border-bottom:1px solid #ddd;padding:24rpx 0rpx 30rpx 0rpx;display: flex;align-items: center;justify-content: space-between;}
	.wallet_item_M,.wallet_item_R{ flex:1;justify-content: center;display: flex;}
	.wallet_item_L{ flex:1;text-align: center;}
	}
</style>