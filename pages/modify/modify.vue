<template>
	<view class="modify">
		<view v-if="modifys">
			<view class="modify_list">
				<view class="title">手机</view>
				<input type="text" name="phone" class="modify_phone" :value="phone" @input="phone_input" disabled=""/>
			</view>
			<view class="modify_list">
				<view class="title">图形码</view>
				<input type="text" name="txm" class="txm" value="" placeholder="请输入图形码" @input="imgcode_input"/>
				<view class="random" @click="random"><image :src="code_img" mode="aspectFit" @tap="createCode"></image></view>
			</view>
			<view class="modify_list">
				<view style="display: flex;align-items: center;">
					<view class="title">验证码</view>
					<input type="text" name="phone_random" class="phone_txm" value="" placeholder="请输入验证码" @input="code_input"/>
				</view>
				<button class="phone_random " @click="sphone_random" :disabled="captchaDisabled" :class="captchaDisabled?a:''">{{phone_code}}</button>
			</view>
			<button class="sublmit" @click="sublmit_s">确定</button>
		</view>
		<!-- 修改密码 -->
		<view v-if="modifys==false&&id==2">
			<view class="modify_list">
				<view class="title">新密码</view>
				<input type="password" name="password" class="modify_phone" :value="password" placeholder="请输入新密码" @input="password_input" />
			</view>
			<view class="modify_list">
				<view class="title">重复密码</view>
				<input type="password" name="cf_password" class="modify_phone" :value="r_password" placeholder="请输入重复密码" @input="rep_password" />
			</view>
			
			<button class="sublmit" @tap="pay_sublmit">确定</button>
		</view>
	</view>
</template>

<script>
	// id为2并且type=0代表是在支付页面过来的修改成功直接返回上一个页面
	import request from '@/tool/request.js'
	export default{
		name:"modify",
		data(){
			return{
				code:'',
				id:1,//判断是修改手机还是支付密码
				type:0,//0是代表支付页面过来的
				phone_code:'获取验证码',  //59s后可重发
				captchaDisabled:false,
				modifys:true,
				code_img : '',//图形验证码路径
				code_img_str : '',//图形验证码输入
				phone : '',//用户手机
				password:'',//密码
				r_password:'',//确认密码
			}
		},
		methods:{
			//监听电话输入框
			phone_input :function(e){
				console.log('手机',e.detail.value)
				this.phone = e.detail.value
			},
			//监听图形验证码输入
			imgcode_input : function(e){
				console.log('图形验证码',e.detail.value)
				this.code_img_str = e.detail.value
			},
			//监听验证码输入
			code_input: function(e){
				console.log("手机验证码",e.detail.value)
				this.code  =e.detail.value
			},
			//监听密码输入
			password_input : function(e){
				console.log("密码输入",e.detail.value)
				this.password  =e.detail.value
			},
			//监听第二次密码输入
			rep_password : function(e){
				console.log("第二次密码输入",e.detail.value)
				this.r_password  =e.detail.value
			},
			//切换验证码
			createCode() {
			    var timestamp = Date.parse(new Date());
			    this.code_img = `http://senior.db.juntest.com/captcha?y=${timestamp}`
			  },
			random(){
				this.createCode()
			},
			//密码修改确认事件
			async pay_sublmit(){
				console.log("密码修改")
				let password = await request.requestPost('pay_password',{
					password:this.password,
					repassword : this.r_password
				})
				console.log("密码修改状态",password)
				let data = password.data
				if( data.errorCode == 100019){
					// 修改成功,其他状态码都是不成功
					this.$api.msg(`${data.message}`)
					if(this.type == 0){
						setTimeout(function(){
							uni.navigateBack({
								
							})
						},1000)
					}
					else{
						setTimeout(function(){
							uni.switchTab({
								url:'../user/index'
							})
						},1000)
					}
					
				}
				else{
					this.$api.msg(`${data.message}`)
				}
			},
			//获取验证码
			async sublmit_s(){
				// this.modifys=false
				if(this.id == 2){
					//修改密码
					console.log("修改密码")
					let password = await request.requestPost('update_paypass_set',{code:this.code,img_code:this.code_img_str})
					let data = password.data
					console.log("验证请求",data)
					if( data.errorCode == 100108 || data.errorCode == 100282 || data.errorCode== 100107 || data.errorCode== 100284 || data.errorCode== 100095||data.errorCode == 100094 ){
						this.$api.msg(`${data.message}`)
					}
					else{
						this.$api.msg(`${data.message}`)
						this.modifys=false
					}
				}
			},
			async sphone_random(){
				console.log(111)
				var _this=this
				_this.captchaDisabled=true
				let sms_code = await request.requestPost('safety_sms',{code:_this.code_img_str})
				let data = sms_code.data
				if( data.errorCode == 100120 || data.errorCode == 100121 || data.errorCode == 100122 || data.errorCode == 100124){
					_this.$api.msg(`${data.message}`)
				}
				else{
					_this.$api.msg(`${data.message}`)
					var coden = 60    // 定义60秒的倒计时
					var codeV = setInterval(function () {    	
						_this.phone_code=(--coden) + 's后可重发'
						if (coden == 0) {  
						  clearInterval(codeV)
						  this.phone_code="获取验证码"
						}
					 }, 1000)  
				}
				console.log("打印验证码请求",data)
			}
		},
		onLoad(options){
			this.id=options.id
			if(this.id==1){
				uni.setNavigationBarTitle({
					title:"修改绑定手机"
				});
			}
			if(this.id==2){
				uni.setNavigationBarTitle({
					title:"修改支付密码"
				});
				this.type = options.type
			}
			//获取个人中心的用户信息
			let userData = uni.getStorageSync('myInofData')
			this.phone = userData.data.user_info.mobile
			console.log("获取用户缓存",this.phone)
			 this.createCode()
		}
	}
</script>

<style lang="scss">
	page{background: #f9f9f9;}
	button::after{ border: none;} 
	.random {
		height: 80upx;
		line-height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
	    width: 170upx;
	}
	  
	.random .left {
	  font-family: Arial;
	  font-style: italic;
	  font-weight: bold;
	  border: 0;
	  letter-spacing: 3px;
	  font-size: 36upx;
	  background-color: #ccc;
	  color: blue;
	  padding: 0 24upx;
	  width: 170upx;	
	}
	.modify{
		.modify_list{
			background: #FFFFFF;
			display: flex;
			padding:  0 20upx ;
			margin: 20upx 0;
			height: 80upx;
			line-height: 80upx;
			align-items: center; 
			width: 100%;
			input{font-size: 26upx;}
			.title{font-size: 28upx;color: #999;box-sizing: border-box;width: 130upx;}
			.modify_phone{width: 75%;}
			.phone_txm{width: 50%;}
			.txm{width: 58%;}
			
			.a{background: #eee;border: 1px solid #eee;}
			&:nth-of-type(3){display: flex;align-items: center;justify-content: space-between;}
		}
	}
	.phone_random{
		background: #333;
		font-size: 20upx;
		color: #FFFFFF;
		border-radius: 30upx;
		height: 60upx;
		line-height: 60upx;
		padding: 0 20upx;
		width: 200upx;
		margin: 0;
	}
	.sublmit{background: #333;color: #FFFFFF;letter-spacing: 2px;margin: 100upx 24upx 0;}
	.code_n1_right{
		flex:1;display: flex;justify-content: center;
		image{ width:220rpx;height:72rpx}
	}
</style>