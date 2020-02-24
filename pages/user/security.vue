<template>
	<view class="security">
		<view class="security_content">
			<view class="security_lists">
				<navigator url="/pages/modify/modify?id=1">
					<view class="security_list">
						<view class="phone_name">手机绑定</view>
						<view class="phone">
							<view>{{phone.substring(0,3)}}****{{phone.substring(7,11)}}</view>
							<image src="../../static/meiyong/you.png"></image>
						</view>
					</view>
				</navigator>
				<navigator url="/pages/modify/modify?id=2">	
					<view class="security_list">
						<view class="security_list_item">
							<view class="phone_name">支付密码</view>
							<view class="phone">
								<image src="../../static/meiyong/you.png"></image>
							</view>
						</view>
					</view>
				</navigator>
			</view>

		</view>
	</view>
</template>

<script>
	export default{
		name:"security",
		onShow() {
			//获取个人中心的用户信息
		    let userData = uni.getStorageSync('myInofData')
			this.phone = userData.data.user_info.mobile
			this.password = userData.data.user_info.password
		    console.log("获取用户缓存",this.phone)
		},
		data(){
			return{
				phone : '',//用户手机
				password:'',//用户密码
			}
		},
	}
</script>

<style lang="scss">
	page{background: #eee;}
	navigator:nth-of-type(1){margin-top: 40upx;}
	navigator:nth-of-type(2){margin-top: 40upx;}
	.security_list{display: flex;justify-content: space-between;padding: 20upx;padding: 26upx;background: #FFFFFF;border-bottom: 1px solid #d9d9d9;
		.phone_name{font-size: 28upx;color: #333;}
		.phone{color: #999;display: flex;align-items: center;
		view{font-size: 28upx;}
			image{width: 30upx;height: 30upx;}
		}
		.security_list_item{width:100%;display: flex;justify-content: space-between;align-items: center;}
	}
</style>