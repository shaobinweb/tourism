<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="logo"><image src="../../static/icon-wx.png" mode="aspectFit"></image></view>
		<view class="wrapper">
			<view class="login_weixin">
				<view class="login_list">
					<view class="weixin_title">手机号码登陆</view>
					<view class="weixin_logo">
						<image src="/static/icon-tel.png" mode="aspectFill" @tap="telFun"></image>
					</view>
				</view>
				<view class="login_list weixin_list">
					<view class="weixin_title">使用微信登陆</view>
					<view class="weixin_logo">
						<image src="/static/icon-wx.png" mode="aspectFill" @tap="weixinFun"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	import request from '@/tool/request.js'
	
	export default{
		data(){
			return {
				mobile: '',
				password: '',
				logining: false
			}
		},
		onLoad(){
			
		},
		methods: {
			//跳转手机登陆
			telFun : function(){
				uni.navigateTo({
					url:`../phone/step1?type=register`
				})
			},
			navBack(){
				uni.switchTab({
					url:"../index/index" 
				})
			},	
			async toLogin(){
			
			},
			async weixinFun(){
				request.login()
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 80px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
		margin-top:40px
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.login_btn{ display: flex;justify-content: space-between;align-items: center;font-size:24rpx;color: #007AFF;margin-top:40rpx}
	.login_weixin{ width:auto;height: auto;margin-top:70rpx;display: flex;justify-content: center;align-items: center;font-size: 24rpx;color: #999;flex-direction: row;}
	.weixin_logo{ width:80rpx;height: 80rpx;margin-top:40rpx;
		image{ width:100%;height: 100%;}
	}
	.weixin_list{ margin-left:40px}
	.login_list{ display:flex;flex-direction: column;justify-content: center;align-items: center;}
	.logo{ width:250rpx;height: 250rpx;margin-top:-160rpx;
		image{ width:100%;height: 100%;}
	}
</style>
