<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{orderInfo.data.data.orderInfo.money}}</text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b"  @click="changePayType('balance')">
				<image src="../../static/yuer_icon.png" mode="aspectFill" class="pay_type_icon"></image>
				<view class="con">
					<text class="tit">余额支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#e4393c" :checked='payType == "balance"' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" :data-code="weixin" @click="changePayType('weixin')">
				<image src="../../static/weixin_icon.png" mode="aspectFill" class="pay_type_icon"></image>
				<view class="con">
					<text class="tit">微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#e4393c" :checked='payType == "weixin"' />
					</radio>
				</label>
			</view>

		</view>
		<text class="mix-btn" @click="confirm">下一步</text>
		<!-- 余额支付密码弹窗 -->
		<view class=" balance" v-if="balance_alert">
			<view class="balance_box">
				<view class="balance_t">输入支付密码</view>
				<view class="balance_pass">
					<input class="pass_input" v-model="pass_code" type="text" password="true" placeholder="支付密码" placeholder-style="font-size:28rpx" />
				</view>
				<view class="pay_btn_balance">
					<view class="pay_btn_l" @tap="balance_cancel">取消</view>
					<view class="pay_btn_r" @tap="balance_pay">确认</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default {
		data() {
			return {
				payType: 'weixin',
				orderInfo: {},
				order:null,
				serial_id:null,//订单id
				balance_alert:false,
				pass_code:'',//密码
				luck_id:null,//奖品支付id
			};
		},
		computed: {
		
		},
		async onLoad(options) {
			console.log("支付订单id",options.serial_id)
			this.serial_id= options.serial_id
			// order_id
			//判断是直接购买还是在订单里面的去付款进来的，直接购买用serial_id，在订单里面来的用order_id
			let order_api
			if(options.type == "product"){
				order_api = await request.requestGet('paypostage',{oid:options.serial_id})
			}
			console.log("付钱金额",order_api.data.data.orderInfo)
			this.orderInfo = order_api
			this.luck_id = order_api.data.data.orderInfo.luck_id
		},

		methods: {
			//取消余额支付弹窗
			balance_cancel: function(){
				this.balance_alert = false
			},
			//余额支付
			balance_pay: async function(){
				let pay = await request.requestPost('paypostage',{
					code:this.payType,
					oid : this.serial_id,
					pay_pass:this.pass_code
				})
				this.$api.msg(`${pay.data.message}`)
				if(pay.data.data.code == 1){
					this.balance_alert = false
					this.$api.msg(`${pay.data.message}`)
					setTimeout(function(){
						uni.redirectTo({
							url:`../raffle/raffle`
						})
					},500)
				}
				console.log("余额支付请求",pay.data)
				console.log("余额支付请求",pay.data.message)
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type
				console.log(this.payType)
			},
			//确认支付
			 confirm: async function() {
				//现在只有两种方式就先这样判断
				if(this.payType =="weixin"){
					let pay = await request.requestPost('paypostage',{
						code:this.payType,
						oid : this.serial_id
						})
					console.log("后台返回来的订单数据",pay)
					this.payType = 'wxpay' 
					uni.requestPayment({
					    provider: this.payType,
					    orderInfo: pay.data.data.message, //微信、支付宝订单数据
					    success: function (res) {
					        console.log('success:' + JSON.stringify(res)); 
					    },
					    fail: function (err) {
					        console.log('fail:' + JSON.stringify(err));
							plus.nativeUI.alert("支付失败：" + JSON.stringify(err));
					    }
					});
					console.log("支付信息",pay.data.data.message)
				}
				else{
					// 用余额支付验证是否有设置支付密码,没有就跳转到设置密码
					let pass_data = await request.requestGet('check_setting_pay_pass')
					console.log(pass_data.data.errorCode)
					if(pass_data.data.errorCode == 100131){
						this.$api.msg('请设置支付密码')
						setTimeout(function() {
							uni.navigateTo({
								url:'/pages/modify/modify?id=2&type=0'
							})
						}, 1000);
					}
					this.balance_alert = true
				}
				
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}
	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
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
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		line-height: 80rpx;
        text-align: center;
		margin: 80upx auto 30upx;
		font-size: 24rpx;
		color: #fff;
		background-color:#e4393c;
		border-radius: 10upx;
	}
	.pay_type_icon{ width:50rpx;height:44rpx;margin-right:20rpx}
	/* 余额支付 */
	.balance{ width: 100%;height:100vh;background:rgba(0,0,0,0.4);display:flex;position:fixed;left:0;top:0;right:0;bottom:0;display: flex;align-items: center;justify-content: center;z-index:100;
		.balance_box{ width:600rpx;height: 320rpx;background: #fff;border-radius: 16rpx;display: flex;align-items: center;justify-content: space-between;font-size:28rpx;flex-direction: column;
			.balance_t{ width:100%;height: 84rpx;line-height: 84rpx;text-align: center;font-size:32rpx}
			.balance_pass{ width:350rpx;height:70rpx;text-align: center;border:1px solid #ececec;border-radius: 12rpx;}
			.pass_input{  height:64rpx;line-height: 64rpx;text-align: center;font-size: 24rpx;}
			.pay_btn_balance{ width:100%;height: 80rpx;display: flex;justify-content: space-between;align-items: center;border-top:1px solid #f1f1f1;
				.pay_btn_l{ flex:1;height: 80rpx;line-height:80rpx;text-align: center;}
				.pay_btn_r{ flex:1;height: 80rpx;line-height:80rpx;text-align: center;border-left:1px solid #f1f1f1;color: red;}
			}
		}
	}
</style>
