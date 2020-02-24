<template>
	<view class="wallet">
		<view class="wallet_header">
			<view class="wallet_content">
				<view class="wallet_title">分享收入</view>
				<view  class="wallet_number">
					<text class="xh">￥</text>
					<text class="number">{{userInfo.data.user_info.frozen_money || 0}}</text>
				</view>
				<view class="frozen">金额: ￥0.00</view>
			</view>
		</view>
		<view class="wallet_bill">
			<view class="bill_option">
				<block v-for="(item,index) in wallet_list" :key="index">
					<view class="wallet_bill_item">
						<view class="item" @click="walletBill(item.id)" :class="{'bor':item.id==id}">{{item.name}}</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 订单流水 -->
		<view class="wallet_list">
			<view class="wallet_item" v-for="(item,index) in list" :key="index">
				<view class="wallet_item_L">
					<view class="item_L_day">{{item.time.substring(0,10)}}</view>
				</view>
				<view class="wallet_item_M">
					{{item.remark}}
				</view>
				<view class="wallet_item_R">
					<text v-if="item.user_money>0" style="color: #3DB264;">+{{item.money}}</text>
					<text v-else style="color: red;">-{{item.money}}</text>
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
				id:'all',
				wallet_list:[{id:'all',name:"所有"},{id:'income',name:"已释放"},{id:'expenditure',name:"待释放"}],
				list : [],
				control_id:1,
				page:1,
				userInfo:null
			}
		},
		methods:{
			walletBill(id){
				this.id=id
				this.getList(id)
			},
			async getList(type){
				let _this = this
				_this.page = 1
				this.list = []
				let request_api
				if( type == 'all'){
					console.log("全部")
					request_api = await request.requestGet('user_packet',{page:this.page})
					console.log(request_api)
				}
				else{
					console.log("支出或收入")
					request_api = await request.requestGet('user_packet',{
						type,
						page:this.page
					})
				}
				console.log("钱包流水api",request_api)
				let data = request_api.data.data
				let list = data.usable_coupon
				this.list = this.list.concat(list)
				
				
			}
		},
		 async onShow(options){
			this.getList('all')
			//获取钱包数据
			let userInfo = await request.requestGet('myhome')
			this.userInfo = userInfo.data
		}
	}
</script>

<style lang="scss">
	page{background: #eee;}
	.bor{border-bottom: 4upx solid #333;}
	.wallet{
		.wallet_header{
			background: #f1f1f1;
			.wallet_content{
				width:90%;
				margin:20upx auto;
				height:330rpx;
				background: url(../../static/meiyong/wallet.png) no-repeat center;
				background-size: 100% 100%;
				padding: 68upx 0 56upx;
				.wallet_title{
					font-size: 28upx;
					text-align: center;
					color: 	#AE4C00;
					
				}
				.wallet_number{
					display: flex;
					align-items: center;
					color:#AE4C00;
					justify-content: center;
					margin: 20upx 0;
					.xh{font-size: 30upx;}
					.number{font-size: 66upx;}
				}
				.frozen{
					color:#AE4C00;
					font-size: 24upx;
					text-align: center;
				}
			}
		}
		.wallet_mode{
			display: flex;
			justify-content: space-around;
			padding: 40upx 0;
			background: #FFFFFF;
			font-size: 28upx;
			color: #333;
			view{width: 100upx;}
			.mode_option{
				display: flex;
				flex-direction: column;
				text-align: center;
				image{width:50upx;height: 50upx;display: block;margin: 0 auto;}
				text{margin-top: 5upx;}
					
			}
			.mode_options{
				display: flex;
				flex-direction: column;
				text-align: center;
				image{width:50upx;height: 50upx;display: block;margin: 0 auto;}
				text{margin-top: 5upx;}
			}
		}
		.wallet_bill{
			margin-top: 15upx;
			background: #FFFFFF;
			
			.bill_option{
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding-left:20rpx;
				padding-right:20px;
				.wallet_bill_item{
					width: auto;
					flex:1;
					text-align: center;
					font-size: 28upx;
					height: 100upx;
					line-height: 100upx;
					color: #999;
					display: flex;justify-content: center;
					.item{ width:100rpx}
				}
			}
		}
		.wallet_list{ width:100%;height: auto;background: #fff;margin-top:20rpx;
			.wallet_item{ font-size: 24rpx;color: #333;width:100%;border-bottom:1px solid #ddd;padding:24rpx 40rpx 30rpx 40rpx;display: flex;align-items: center;justify-content: space-between;}
		.wallet_item_M,.wallet_item_R{ flex:1;justify-content: center;display: flex;}
		.wallet_item_L{ flex:1;text-align: center;}
		}
	}
</style>