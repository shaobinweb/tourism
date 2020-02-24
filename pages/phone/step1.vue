<template>
	<view class="register">
	
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput
						v-model="phone"
						type="text"
						maxlength="11"
						placeholder="手机号"
					></wInput>
					<wInput
						v-model="verCode"
						type="number"
						maxlength="6"
						placeholder="验证码"
						
						isShowCode
						ref="runCode"
						@setCode="getVerCode()"
					></wInput>
					<wInput v-if="type == 'register'"
						v-model="passData"
						type="password"
						maxlength="11"
						placeholder="推荐人（选填）"
					></wInput>
				</view>
				
				<wButton 
				    v-if="type == 'register'"
					text="登 录"
					:rotate="isRotate" 
					@click.native="startReg()"
				></wButton>
				<wButton
					v-else
					text="绑 定"
					:rotate="isRotate" 
					@click.native="startReg()"
				></wButton>
			
			<!-- 其他登录 -->
			<view class="other_login cuIcon" v-if="type=='register'">
				<view class="login_icon">
				    <!--  #ifdef  APP-PLUS -->
					<view class="cuIcon-weixin" @tap="weixinFun"></view>
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<button class="cuIcon-weixin" open-type="getUserInfo" @getuserinfo="weixinFun" style="background: none;border:none !important"></button>
					<!-- <view class="cuIcon-weixin" ></view> -->
					<!--  #endif -->
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import {
	    mapMutations  
	} from 'vuex';
	import request from '@/tool/request.js'
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '../../static/applogo.png',
				phone:'', // 用户/电话
				passData:'', //密码
				verCode:"", //验证码
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
				type:'666',//类型，register是手机登录方式,bind_phone绑定手机号码
			}
		},
		components:{
			wInput,
			wButton,
		},

		onLoad(ops) {
			this.type = ops.type
			console.log("类型",this.type)
		},
		methods: {
			//微信登陆
			async weixinFun(){
				request.login()
			},
			isShowAgree(){
				//是否选择协议
				this.showAgree = !this.showAgree;
			},
			async getVerCode(){
				console.log("类型",this.type)
				//获取验证码
				if(this.type == "register"){
					console.log("我要注册登录手机号")
					//获取验证码
					let get_code = await request.requestPost('get_phone_code',{mobile:this.phone})
					let data = get_code.data.errorCode
					console.log("获取手机验证码请求",get_code) 
					if( data == 100227 || data == 100230 || data == 101022){
						this.$api.msg(`${get_code.data.message}`)  
					}
					if( data == 100326){
						this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
						this.$api.msg(`${get_code.data.message}`)
					}
				}
				if(this.type == "bind_phone"){
					console.log("我要绑定手机号码")
					//获取验证码
					let get_code = await request.requestPost('code_verfication',{mobile:this.phone})
					let data = get_code.data.errorCode
					console.log("获取手机验证码请求",get_code) 
					if( data == 100227 || data == 100230  || data == 101022){
						this.$api.msg(`${get_code.message}`)
					}
					if( data == 100049){
						this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
						this.$api.msg(`${get_code.data.message}`)
					}
				}
					
			},
		    async startReg() {
				//登录
				//手机验证码登陆
				if(this.type == "register"){
					let login_phone = await request.requestPost('code_login',{
						mobile : this.phone,
						sms_code : this.verCode,
					})
					//手机验证登陆返回来的错误转态处理
					let data_code = login_phone.data.errorCode
					if( data_code == 100220 || data_code == 100222 || data_code == 100224){
						this.$api.msg(`${login_phone.data.message}`)
						return
					}
					else{
						this.$api.msg(`${login_phone.data.message}`)
						console.log("手机号码验证登陆请求转态",login_phone)
						// 登陆成功修改请求头的信息
						uni.setStorageSync("ebizToken", login_phone.data.data.loginToken);
						uni.setStorageSync('first_app',true)
						uni.setStorageSync('userInfo',login_phone.data.data) 
						uni.setStorageSync('ebizUuid',login_phone.data.data.id) 
						uni.setStorageSync('is_login',true)
						console.log("登陆的token,也是缓存的token",uni.getStorageSync('ebizToken'))
						uni.switchTab({
							url:'../index/index'
						})
					}
				}
				if( this.type == "bind_phone"){
					//绑定手机号码
					let bind_phone = await request.requestPost('bind_phoone',{
						mobile : this.phone,
						code : this.verCode})
					if(bind_phone.data.errorCode == 100235 || bind_phone.data.errorCode == 100200){
						this.$api.msg(`${bind_phone.data.message}`)
					}
					if(bind_phone.data.errorCode == 100051){
						this.$api.msg('绑定成功')
						setTimeout(function(){
							uni.switchTab({
								url:'../index/index'
							})
						},300)
					}
					console.log("绑定手机号码是否成功",bind_phone)
				}				
		    }
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css"); 
	@import url("./css/main.css");
	.main-list{ padding:40rpx}
	button::after{ border:none !important}
</style>