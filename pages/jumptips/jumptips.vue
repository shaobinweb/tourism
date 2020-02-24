<template>
	<view class="jump">
		<view class="jump_content">
			<icon type="success" color="#3DB264" ></icon>
			<text>请输入提示金额</text>
		</view>
		<view class="jump_second">
			<view class="dm">{{second}}s后页面自动</view>
			<view>跳转</view>
		</view>
		<view class="jump_button">
			<view class="return" @click="returnIndex">返回首页</view>
			<view class="lj_jump">立即跳转</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				second:3
			}
		},
		methods:{
			jump(){
				let _this=this
				let jumps=setInterval(function(){
					_this.second--
					if(_this.second==0){
						
						uni.navigateBack({
							delta: 2
						})
						clearInterval(jumps)
						
					}
				},1000)
				
			},
			returnIndex(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		},
		onLoad() {
			this.jump()
		}
	}
</script>

<style lang="scss">
	.jump_content{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 100upx;
		text{
			color:#3DB264 ;
		}
	}
	.jump_second{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 50upx;
		font-size: 32upx;
		.dm{color: #999;}
	}
	.jump_button{
		display: flex;
		justify-content: space-around;
		margin-top: 50upx;
		.return{
			width: 220upx;
			height: 100upx;
			line-height: 100upx;
			border: 1px solid #333;
			text-align: center;
			font-size: 30upx;
		}
		.lj_jump{
			width: 220upx;
			height: 100upx;
			line-height: 100upx;
			border: 1px solid #333;
			text-align: center;
			font-size: 30upx;
			background: #333;
			color: #FFFFFF;
			
		}
	}
</style>