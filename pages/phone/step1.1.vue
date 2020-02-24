<template>
	<view class="step1">
		<view class="step1_n1" @tap="backFun"><image src="../../static/phone_close.png" mode="aspectFit"></image></view>
		<view class="step1_n2">验证手机</view>
		<view class="step1_n3">根据国家法律法规，用户须绑定手机<br>完成平台实名认证</view>
		<view class="step1_n4">
			<view class="n4_left">
				<label>+86</label>
<!-- 				<text><image src="../../static/triangle.png" mode="aspectFit"></image></text> -->
			</view>
			<view class="n4_right">
				<input class="phone_input" type="number" @input="phoneFun" focus placeholder="请输入你的手机号码" maxlength="11" />
			</view>
		</view>
		<!-- active -->
		<view v-if="phone.length == 11" class="phone_btn active" @tap="verification">验证</view>
		<view v-else class="phone_btn">验证</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default {
		data() {
			return {
				phone:Number,
				type:'',//类型，register是手机登录方式,bind_phone绑定手机号码
			}
		},
		onLoad(ops) {
			console.log("类型",ops.type)
			this.type = ops.type
		},
		methods: {
			//返回
			backFun : function(e){
				uni.navigateBack({})
			},
			//监听输入
			phoneFun: function(e){
				this.phone = e.detail.value
				console.log(e.detail.value)
			},
			//跳转
			verification : async function(){
				if(this.type == "register"){
					console.log("我要注册登录手机号")
					//获取验证码
					let get_code = await request.requestPost('get_phone_code',{mobile:this.phone})
					let data = get_code.data.errorCode
					console.log("获取手机验证码请求",get_code) 
					if( data == 100227 || data == 100230 ){
						this.$api.msg(`${get_code.message}`)  
					}
					if( data == 100326){
						this.$api.msg(`${get_code.data.message}`)
						uni.navigateTo({
							url:`./step2?phone=${this.phone}&type=${this.type}`
						})
					}
				}
				if(this.type == "bind_phone"){
					console.log("我要绑定手机号码")
					//获取验证码
					let get_code = await request.requestPost('code_verfication',{mobile:this.phone})
					let data = get_code.data.errorCode
					console.log("获取手机验证码请求",get_code) 
					if( data == 100227 || data == 100230  ){
						this.$api.msg(`${get_code.message}`)
					}
					if( data == 100049){
						this.$api.msg(`${get_code.data.message}`)
						uni.navigateTo({
							url:`./step2?phone=${this.phone}&type=${this.type}`
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.step1{ width:100%;height: auto;padding-left:30rpx;padding-right:30rpx;padding-top:120rpx;
		.step1_n1{
			image{ width:40rpx;height: 40rpx;}
		}
		.step1_n2{ font-size:52rpx;color:#333333;font-weight: bold;margin-top:60rpx}
		.step1_n3{ font-size:28rpx;color:#666666;margin-top:20rpx}
		.step1_n4{ background: #EBEBEB;width:680rpx;height: 100rpx;border-radius: 6rpx;margin-top:60rpx;display: flex;align-items: center;
			.n4_left{ background: #EEEEEE;padding:8rpx 20rpx;margin-left:20rpx;
				image{ width:16rpx;height: 20rpx;margin-left:8rpx}
			}
			.n4_right{
				.phone_input{ width:480rpx;height: 96rpx;line-height: 96rpx;padding-left:10rpx;color: #333333;font-size:32rpx;font-weight: bold;}
			}
		}
		.phone_btn{ width:680rpx;height: 100rpx;font-size:28rpx;border-radius: 50rpx;background: #FAE3E6;text-align: center;line-height: 100rpx;margin-top:100rpx;color: #FFFFFF;font-weight: 400;
		}
	   .active{ background: #E91B1B;color: #FFFFFF;}
	}
</style>
