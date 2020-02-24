<template>
	<view class="exchanges">
		<view class="exchange">
			<view class="exchange_tit">兑换金额</view>
			<view class="exchange_js">( 您的余额为￥{{money_use}}，可兑换{{money_use}}购物金）</view>
			<view class="money">
				<text>兑换金额:</text>
				<input type="text" placeholder="0" v-model="exchange_num"/>
			</view>
		</view>
		<button class="btu" @tap="next_step">下一步</button>
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
	export default{
		name:"exchange",
		data(){
			return{
				money_use:0,
				exchange_num:0,
				balance_alert:false,
				pass_code:'',//密码
			}
		},
		async onShow() {
			// 获取可兑换多少购物金
			let data_api = await request.requestGet('exchange')
			console.log("获取可兑换购物金",data_api)
			this.money_use = data_api.data.data.userMoney
		},
		methods:{
			next_step(){
				console.log( typeof this.money_use)
				console.log( typeof this.exchange_num)
				if(parseFloat(this.exchange_num) <= 0 || parseFloat(this.exchange_num) > parseFloat(this.money_use)){
					this.$api.msg('请输入正确的数量')
					return
				}
				else{
					this.balance_alert = true
				}
			},
			async balance_pay(){
				let data_api = await request.requestPost('exchange',{
					exchange_num:this.exchange_num,
					pay_pass:this.pass_code
				})
				this.balance_alert = false
				this.$api.msg(`${data_api.data.message}`)
				if( data_api.data.errorCode == 200){
					setTimeout(function(){
						uni.navigateBack({})
					},500)
				}
				console.log("兑换结果",data_api)
			},
			balance_cancel(){
				this.balance_alert = false
			}
		}
	}
</script>

<style lang="scss">
	.exchange{
		background: #FFFFFF;margin-top: 20rpx;
		padding: 20rpx 20rpx;
		.exchange_tit{font-size: 28rpx;color: #333333;}
		.exchange_js{color: #999;font-size: 26rpx;margin-top:10rpx}
		.money{
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			padding: 16rpx 0;
			text{color: #FE5A5B;font-size: 32rpx;width:200rpx}
			input{color: #FE5A5B;font-size: 32rpx;margin-left: 20rpx;}
		}
	}
	.btu{color: #fff;background: #333;border-radius: 0;margin-top: 30rpx;margin: 50rpx 20rpx 0;margin-top: 50rpx;}
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