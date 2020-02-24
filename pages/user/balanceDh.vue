<template>
	<view class="exchanges">
		<view class="exchange">
			<view class="exchange_tit">提现金额</view>
			<view class="money">
				<text>￥:</text>
				<input type="text" placeholder="提现金额" v-model="money"/>
			</view>
			<view class="exchange_js">最少提现 1 元；剩可用余额:￥0.00</view>
		</view>
		<view class="mode_tit">
			<view class="mode_con">选择提现方式</view>
			<view class="mode" @click="mode">
				<view>{{content}}</view>
				<image src="../../static/meiyong/you.png"></image>
			</view>
		</view>
		<view class="information" v-if="r1">
			<view class="information_tit">支付宝账号信息</view>
			<view class="information_list">
				<view class="item">
					<view ><text class="star">*</text>支付宝账号</view>
					<input type="text" placeholder="支付宝账号" v-model="account"/>
				</view>
				<view class="item">
					<view ><text class="star">*</text>支付宝名称</view>
					<input type="text" placeholder="支付宝名称" v-model="account_name"/>
				</view>
			</view>
		</view>
		<view class="information" v-else>
			<view class="information_tit">银行卡账号信息</view>
			<view class="information_list">
				<view class="item">
					<view ><text class="star">*</text>银行卡账号</view>
					<input type="text" placeholder="银行卡账号" v-model="account"/>
				</view>
				<view class="item">
					<view ><text class="star">*</text>银行名称</view>
					<input type="text" placeholder="银行卡名称" v-model="account_name"/>
				</view>
				<view class="item">
					<view ><text class="star">*</text>开户行</view>
					<input type="text" placeholder="开户行" v-model="bank_deposit"/>
				</view>
				<view class="item">
					<view ><text class="star">*</text>真实姓名</view>
					<input type="text" placeholder="真是姓名" v-model="bank_rename"/>
				</view>
			</view>
		</view>
		<view class="balanceDh">
			<button class="btu" @tap="submit_balance">确定提现</button>
		</view>
		<uni-popup ref="popups" type="bottom">
			<view class="tip">
				<view class="tip_tit">
					<text class="">选择提现到:</text>
					<text class="qx">取消</text>
				</view>
				<view class="tip_option" @click="alipay">
					<view class="tip_option_lef">
						<view>支付宝</view>
						<view>24小时到账</view>
					</view>
					<radio value="r1" :checked="r1"/>
				</view>
				<view class="tip_option" style="border: none;" @click="bankcard">
					<view class="tip_option_lef">
						<view>银行卡</view>
						<view>24小时到账</view>
					</view>
					<radio value="r2" :checked="r2"/>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "../../components/popup/uni-popup/uni-popup.vue"
	import request from '@/tool/request.js'
	export default{
		name:"exchange",
		components:{uniPopup},
		data(){
			return{
				r1:true,
				r2:false,
				content:"支付宝",
				money:'',//提现金额
				account:'',//银行卡账户或支付宝账号
				account_name:'',//银行名称或支付宝名称
				bank_deposit:'',//开户行，仅用于银行卡提现
				bank_rename:'',//真实姓名，仅用于银行卡提现
				type:'',//1支付宝，2银行卡，3微信零钱（微信只需要选择money和type）
			}
		},
		methods:{
			//提现确认
			async submit_balance(){
				console.log(this.money)
				console.log(this.account)
				console.log(this.account)
				console.log(this.account_name)
				console.log(this.bank_deposit)
				console.log(this.bank_rename)
				//支付宝提交
				console.log(this.r1)
				if(this.r1){
					console.log("类型",this.content)
					let withdrawals = await request.requestPost('withdrawals_do',{
						type:1,
						money:this.money,
						account: this.account,
						account_name:this.account_name
					})
					console.log("提交数据请求",withdrawals.data.errorCode)
					if(withdrawals.data.errorCode == 100013){
						this.$api.msg('提交成功')
					    setTimeout(function(){
							uni.navigateBack({})
						},300)
					}
					else{
						this.$api.msg(`${withdrawals.data.errorCode}`)
					}
					console.log("提交数据请求",withdrawals.data.errorCode)
				}
				if(this.r2){
					let withdrawals = await request.requestPost('withdrawals_do',{
						type:2,
						money:this.money,
						account: this.account,
						account_name:this.account_name,
						account_name:this.account_name,
						bank_deposit:this.bank_deposit,
						bank_rename:this.bank_rename
					})
					if(withdrawals.data.errorCode == 100013){
						this.$api.msg('提交成功')
					    setTimeout(function(){
					    	uni.navigateBack({})
					    },300)
					}
					else{
						this.$api.msg(`${withdrawals.data.errorCode}`)
					}
				}
				
				
			},
			mode(){
				this.$refs.popups.open()
			},
			alipay(){
				this.r1=true
				this.r2=false
				this.content="支付宝"
				this.$refs.popups.close()
			},
			bankcard(){
				this.r1=false
				this.r2=true
				this.content="银行卡"
				this.$refs.popups.close()
			},
		}
	}
</script>

<style lang="scss">
	page{background: #f9f9f9;}
	.exchange{
		background: #FFFFFF;margin-top: 20upx;
		padding: 20upx 20upx;
		.exchange_tit{font-size: 28upx;color: #333333;}
		.exchange_js{color: #999;font-size: 26upx;margin-top: 20upx;}
		.money{
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			padding: 16upx 0;
			text{font-size: 34upx;}
			input{font-size: 32upx;margin-left: 20upx;}
		}
	}
	.mode_tit .mode_con{font-size: 30upx;color: #333;padding: 30upx 10upx;background: #FFFFFF;margin-top: 20upx;border-bottom: 1px solid #EEEEEE;
	}
	.mode{display: flex;align-items: center;justify-content: space-between;background: #FFFFFF;padding: 34upx 10upx;
		view{font-size: 34upx;color: #333;}
		image{width: 50upx;height: 50upx;}
	}
	.information{
		background: #FFFFFF;
		.information_tit{font-size: 30upx;color: #333;padding: 30upx 10upx;border-bottom: 1px solid #EEEEEE;margin-top: 20upx;}
		.information_list{
			padding: 0 10upx;
			.item{
				border-bottom: 1px solid #eee;
				view{font-size: 26upx;color: #333;margin-top: 30upx;}
				.star{color: red;}
				input{font-size: 28upx;height: 80upx;line-height: 80upx;padding-left:10upx ;}
			}
		}
	}
	.tip{
		background: #FFFFFF;
		.tip_tit{
			width:100%;
			height: 70rpx;
			padding: 0 30rpx;
			text-align: center;
			font-size: 26rpx;
			color: #999;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		.tip_option{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 40upx;
			padding: 20rpx 0;
			border-bottom: 1px solid #EEEEEE;
			
			.tip_option_lef {
				
				view{
					&:nth-of-type(1){
						color: #333;
						font-size: 36upx;
						overflow: hidden;
					}
					&:nth-of-type(2){
						color: #999;
						font-size: 26upx;
						overflow: hidden;
						margin-top: 6upx;
					}
				}
			}
			
		}
		
	}
	.btu{color: #fff;background: #333;border-radius: 0;margin-top: 30upx;margin: 50upx 10upx 170upx;}
</style>