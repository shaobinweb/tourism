<template>
	<view class="balance">
		<view class="banlance_top">
			<view class="banlance_tit">充值金额</view>
			<view class="banlance_number">
				<text>￥</text>
				<input type="text" placeholder="0.00" v-model="number" />
			</view>
		</view>
		<view class="mode">选择支付方式</view>
		<view class="pay-type-list">
			<view v-for="item in payList" class="type-item b-b" :data-code="item.code" @click="changePayType" :key="item.id"  v-if='item.code=="weixin"'>
				<image v-if='item.code=="weixin"' src="../../static/weixin_icon.png" mode="aspectFill" class="pay_type_icon"></image>
				<image v-if='item.code=="balance"' src="../../static/yuer_icon.png" mode="aspectFill" class="pay_type_icon"></image>
				<view class="con">
					<text class="tit">{{item.name}}</text>
					<!-- <text>推荐使用微信支付</text> -->
				</view>
				<label class="radio">
					<radio value="" color="#e4393c" :checked='payType == item.code' />
					</radio>
				</label>
			</view>
		</view>
		<button class="btu" @tap="pay_balance">下一步</button>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default{
		name:"balance",
		data(){
			return{
				number:"",
				payType: 'weixin',
				payList:'',//支付列表
			}
		},
		async onShow() {
			let pay_list = await request.requestGet('wallet_list')
			this.payList= pay_list.data.data.payList
			console.log("支付列表请求状态",pay_list)
		},
		methods:{
			//选择支付方式
			changePayType(e) {
				this.payType = e.currentTarget.dataset.code;
			},
			//余额支付
			async pay_balance(){
				let data_api
				// #ifdef  APP-PLUS
				data_api = await request.requestPost('do_recharge',{
					recharge_num:this.number,
					pay_radio:this.payType
				})
				// #endif
				// #ifdef  MP
				data_api = await request.requestPost('do_recharge',{
					recharge_num:this.number,
					pay_radio:this.payType,
					scene:'lite'
				})
				// #endif
				if(this.payType == 'weixin'){
					// #ifdef  APP-PLUS
					// app支付
					uni.requestPayment({
					    provider: 'wxpay',
					    orderInfo: data_api.data.data.message, //微信、支付宝订单数据
					    success: function (res) {
							uni.showToast({
								title:'支付成功'
							})
							setTimeout(function(){
								uni.redirectTo({
									url:`../order/order?state=3`
								})
							},500)
					        console.log('success:' + JSON.stringify(res)); 
					    },
					    fail: function (err) {
					        console.log('fail:' + JSON.stringify(err));
							uni.showToast({
								title:'取消支付'
							})
					    }
					});
					// #endif
					// #ifdef  MP-WEIXIN
					// 微信小程序支付
					let wxpatData = JSON.parse(data_api.data.data.message)
					console.log("支付信息",wxpatData)
					uni.requestPayment({
					    provider: 'wxpay',
					    timeStamp: wxpatData.timeStamp,
					    nonceStr: wxpatData.nonceStr,
					    package: wxpatData.package,
					    signType: wxpatData.signType,
					    paySign: wxpatData.paySign,
					    success: function (res) {
							console.log("微信支付结果",res)
					    },
					    fail: function (err) {
							uni.showToast({
								title:'取消支付'
							})
					        console.log("微信支付结果failfailfail",err)
					    }
					});
					// #endif
				}
				console.log("支付充值",data_api)
			}
		}
	}
</script>

<style lang="scss">
	.balance{
		.banlance_top{
			padding: 0 30upx;
			.banlance_tit{font-size: 30upx;color: #333;margin-top: 10upx;}
			.banlance_number{
				display: flex;
				align-items: center;
				border-bottom: 1px solid #eee;
				margin-top: 10upx;
				height: 90upx;
				
				text{
					color: #FE5A5B;
					font-size: 34upx;
					margin-right: 20upx;
				}
				input{
					font-size: 32upx;
					color: #FE5A5B;
				}
			}
		}
		.mode{font-size: 28upx;color: #888;padding:50upx 30upx 18upx 30upx ;}
		.xz_mode{
			display: flex;
			align-items: center;
			border-top: 1px solid #eee;
			border-bottom: 1px solid #eee;
			padding: 30upx;
			checkbox{margin-right: 20upx;}
			text{font-size: 32upx;}
		}
		.btu{color: #fff;background: #333;border-radius: 0;margin-top: 30upx;margin: 50upx 20upx 0;margin-top: 86upx;}
	}
	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
			image{ width:48rpx;height: 24px;margin-right:16rpx}
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
</style>