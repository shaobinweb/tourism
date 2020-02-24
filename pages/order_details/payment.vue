<template>
	<view class="payment">
		<view class="payment_price">
			<view class="payment_price_name">
				<view class="name">应付金额：</view>
				<view class="name_price">￥0.02</view>
			</view>
			<view class="payment_option">
				<view class="option_item" @click="zfb">
					<view class="item">
						<view class="iconfont" style="font-size: 50upx;color: #21b1e9;">&#xe68a;</view>
						<view class="name">支付宝支付</view>
					</view>
					<view class="iconfont" v-if="judeg" style="font-size: 50upx;color: #ff8b00;">&#xe658;</view>
				</view>
				<view class="option_item" @click="wx">
					<view class="item">
						<view class="iconfont" style="font-size: 50upx;color: #23a737;">&#xe611;</view>
						<view class="name">微信支付</view>
					</view>
					<view class="iconfont"  v-if="!judeg" style="font-size: 50upx;color: #ff8b00;">&#xe658;</view>
				</view>
			</view>
			<view class="tips">
				重要提示：请在 24 小时内完成支付，超时订单将自动取消。 我们将在您完成支付后的 72 小时内发货。 
			</view>
		</view>
		<button class="but">现在支付</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				judeg:true
			}
		},
		methods:{
			zfb(){
				this.judeg=true
			},
			wx(){
				this.judeg=false
			},
		}
	}
</script>

<style lang="scss">
	page{background: #f0f2f5;}
	.but{height: 80upx;line-height: 80upx;background: #ff8b00;color: #FFFFFF;width: 90%;margin: 100upx auto;}
	.payment_price{background: #FFFFFF;margin-top: 40upx;}
	.tips{padding:20upx;color: #999;font-size: 26upx;}
	.payment_option{
		padding: 10upx 20upx;
		.option_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 0;
			border-bottom: 1px solid #EEEEEE;
			.item{display: flex;align-items: center;.name{margin-left: 20upx;}}
		}
	}
	.payment_price_name{
		display: flex;
		align-items: center;
		padding:  20upx;
		border-bottom: 1px solid #EEEEEE;
		.name_price{
			font-size: 34upx;
			color: #f23030;
			font-weight: bold;
			margin-left: 15upx;
		}
	}
</style>
