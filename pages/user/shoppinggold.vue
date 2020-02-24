<template>
	<view class="wallet">
		<view class="wallet_header">
			<view class="wallet_content">
				<view class="wallet_title">我的购物金</view>
				<view  class="wallet_number">
					<text class="xh">￥</text>
					<text class="number">{{list.red_packet_amount}}</text>
				</view>
			</view>
		</view>
		<view class="wallet_mode">
			<navigator url="/pages/user/exchange" hover-class="none">
				<view class="mode_options">
					<image src="../../static/meiyong/icon-withdraw.png"></image>
					<text>提现</text>
				</view>
			</navigator>
		</view>
		<view style="margin-top:20rpx">
			<view class="wallet_list" v-for="item in list.walletLogs" :key="item.id">
				<view class="list_item">
					<view class="item_time">{{item.time.substring(0,10)}}</view>
					<view class="item_type">{{item.remark}}</view>
					<view class="item_right" v-if="item.type == 2">
						-{{item.money}}
					</view>
					<view class="item_right" v-if="item.type == 1" style="color: #FE5A5B;">
						+{{item.money}}
					</view>
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
				id:1,
				wallet_list:[{id:1,name:"所有"},{id:2,name:"收入"},{id:3,name:"支出"}],
				list:null,
			}
		},
		onShow() {
			this.get_list()
		},
		methods:{
			walletBill(id){
				this.id=id
			},
			async get_list(){
				let data_api = await request.requestPost('user_amoun')
				this.list = data_api.data.data
				console.log("购物金流水",data_api)
			}
		}
	}
</script>

<style lang="scss">
	page{background: #eee;}
	.bor{border-bottom: 4upx solid #333;}
	.wallet_list{ width:100%;height: 80rpx;background: #fff;border-bottom:1px solid #e8e8e8;
		.list_item{ width:100%;height: 80rpx;display: flex;justify-content: space-between;align-items: center;padding:0px 10rpx}
		.item_left{ display:flex;align-items: center;}
		.item_time,.item_type,.item_right{ flex:1;display: flex;justify-content: center;}
		.item_time{color: #999;}
		.item_right{color: #3DB264;}
	}
	.wallet{
		.wallet_header{
			background: #f1f1f1;
			.wallet_content{
				width:90%;
				margin:20upx auto;
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

	}
</style>