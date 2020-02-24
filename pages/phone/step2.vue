<template>
	<view class="step2">
		<view class="step2_n1"><image src="../../static/phone_back.png" mode="aspectFit" @tap="backFun"></image></view>
		<view class="step2_n2">填写验证码</view>
		<view class="step2_n3">
			<label class="step2_n3_desc">已发送短信验证码到 </label>
			<text class="step2_n3_phone">+86 {{phone}}</text>
		</view>
		<view class="step2_n4">
			<input class="phone_input phone_n1" data-id=0 @input="phoneFun" :focus="current_id == 0" maxlength="1" type="number" />
			<input class="phone_input phone_n2" data-id=1 @input="phoneFun" :focus="current_id == 1" maxlength="1" type="number" />
			<input class="phone_input phone_n3" data-id=2 @input="phoneFun" :focus="current_id == 2" maxlength="1" type="number" />
			<input class="phone_input phone_n4" data-id=3 @input="phoneFun" :focus="current_id == 3" maxlength="1" type="number" />
			<input class="phone_input phone_n5" data-id=4 @input="phoneFun" :focus="current_id == 4" maxlength="1" type="number" />
			<input class="phone_input phone_n6" data-id=5 @input="phoneFun" :focus="current_id == 5" maxlength="1" type="number" />
		</view>
		<view class="step2_time">
			<view v-if="time == 0">没收到验证码？ <text style="color: #E91B1B;">重新发送</text></view>
			<label v-else>{{time}}秒后重新发送</label>
		</view>
		<!-- 图形验证码 -->
		<view class="step2_code">
			<view class="code_n1">
				<view class="code_n1_left">
					 <input class="uni-input code_input" type="number" :focus="current_id == 6"  placeholder="输入图形验证码" @input="img_codeFun" />
				</view>
				<view class="code_n1_right">
					<image :src="code_img" mode="aspectFit" @tap="handover"></image>
				</view>
			</view>
		</view>
		<!-- active -->
		<view class="phone_btn active" @tap="verification">验证</view>
		<!-- <view v-else class="phone_btn">验证</view> -->
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default {
		data() {
			return {
				time:60,
				phone:Number,
				phone_value:[{val:''},{val:''},{val:''},{val:''},{val:''},{val:''}],
				end_code : Number,//手机验证码
				code_img : '',//图形验证码路径
				code_img_str : '',//图形验证码的code
				current_id:0,//当前获取焦点的input，输入就跳到下一个input 
				type:'',//类型，register是手机登录方式,bind_phone绑定手机号码
			}
		},
		onLoad(ops) {
			this.phone = ops.phone
			this.type = ops.type
			//随机图形码
			this.handover()
		},
		onShow() {
			this.count_down()
		},
		methods: {
			//验证    手机验证码都不能为空，并且验证码必须6位，图形验证码必须4位
			verification: async function(){
				if( this.end_code.length != 6 || this.code_img_str.length !=4){
					this.$api.msg('验证码或图形验证码有误')
					return
				}
				//手机验证码登陆
				if(this.type == "register"){
					let login_phone = await request.requestPost('code_login',{
						mobile : this.phone,
						sms_code : this.end_code,
						identifying_code : this.code_img_str
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
						code : this.end_code,
						identifying_code : this.code_img_str})
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
			},
			//监听图形验证码输入
			img_codeFun : function(e){
				this.code_img_str = e.detail.value
			},
			//监听验证码输入
			phoneFun : function(e){
				let _this = this
				let code =''
				_this.phone_value[e.currentTarget.dataset.id].val=e.detail.value
				//修改获取焦点的input
				if(_this.phone_value[e.currentTarget.dataset.id].val !=""){
					_this.current_id = Number(e.currentTarget.dataset.id) + 1
				}
				//拼接最后的code
				_this.phone_value.forEach(item=>{
					code+=item.val
				})
				_this.end_code = code
				console.log("最后的验证码",this.end_code)
			},
			//切换验证码
			handover : function(){
				var timestamp = Date.parse(new Date());
				this.code_img = `http://senior.db.juntest.com/captcha?y=${timestamp}`
			},
			//返回
			backFun : function (){
				uni.navigateBack({})
			},
			//倒计时
			count_down:function(){
				let _this = this
				setInterval(function(){
					_this.time--
					if(_this.time<=0){
						_this.time = 0
					}
				},1000)
			}
		}
	}
</script>

<style lang="scss">
	.step2{ width:100%;height: auto;padding-left:30rpx;padding-right:30rpx;padding-top:120rpx;
		.step2_n1{
			image{ width:40rpx;height: 40rpx;}
		}
		.step2_n2{ font-size:52rpx;color:#333333;font-weight: bold;margin-top:60rpx}
		.step2_n3{ color: #666666;font-size: 28rpx;margin-top:20rpx;
			.step2_n3_phone{ margin-left:4px;color: #E91B1B;font-size: 28rpx;font-weight: bold;}
		}
		.step2_n4{ width:680rpx;height: 100rpx;border:1px solid rgba(235,235,235,1);background:rgba(245,245,245,1);border-radius:3px;margin-top:100rpx;display: flex;align-items: center;justify-content: center;
			.phone_input{ width:80rpx;height: 60rpx;border-right:1px solid #EBEBEB;text-align: center;}
			.phone_n6{ border-right: none;}
		}
		.step2_time{ margin-top:50rpx;font-size: 28rpx;color: #666666;}
		.step2_code{ width:auto;height:auto;display: flex;justify-content: space-between;margin-top:40rpx;
		.code_n1{ display:flex;width:100%}
			.code_input{ felx:1;height: 80rpx;padding-left:40rpx}
			.code_n1_left{ display:flex;justify-content: center;border-bottom:1px solid #e8e8e8}
			.code_n1_right{
				flex:1;display: flex;justify-content: center;
				image{ width:220rpx;height:72rpx}
			}
		}
		.phone_btn{ width:680rpx;height: 100rpx;font-size:28rpx;border-radius: 50rpx;background: #FAE3E6;text-align: center;line-height: 100rpx;margin-top:100rpx;color: #FFFFFF;font-weight: 400;
				}
		.active{ background: #E91B1B;color: #FFFFFF;}
	}
</style>
