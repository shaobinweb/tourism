<template>
	<view class="help">
		<!-- 返回按钮，覆盖掉h5的按钮 -->
		<view class="back_btn" @tap="back_btn">
			<image src="../../static/back_web.png" mode="aspectFit"></image>
		</view>
		<web-view  src="http://senior.db.juntest.com/web/index/test.html"></web-view>
	</view>
</template>

<script>
	var wv;//计划创建的webview
	export default{
		name:"helpcenter",
		data(){
			return{
				judegS:true,
				drop:false,
				name:"加载更多"
			}
		},
		onReady() {
		        // #ifdef APP-PLUS
		        var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
		        setTimeout(function() {
		            wv = currentWebview.children()[0]
		            wv.setStyle({top:44})
		        }, 1000); //如果是页面初始化调用时，需要延时一下
		        // #endif
		},
		methods: {
			back_btn(){
				uni.navigateBack({
					
				})
			},
			judeg(){
				this.judegS=!this.judegS
			},
			dropDown(){				
				if(this.drop){
					this.name="加载完毕"
				}
				this.drop=true
			}
		}
	}
</script>


<style lang="scss">
	page{background: #f9f9f9;}
	.back_btn{ width:100rpx;height: 88rpx;position: fixed;left:0px;top:0px;z-index:100;display: flex;justify-content: center;align-items: center;
		image{ width:40rpx;height: 40rpx;}
	}
	.plac_input{font-size: 26upx;color: #7b7878;}
	.search{
		background: url(../../static/meiyong/bj.jpg) no-repeat center;	
		height: 260upx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.input{
			border: 1px solid #0080ff;
			width: 60%;
			padding: 10upx 10upx;
			height: 80upx;
			box-sizing: border-box;
			background: #FFFFFF;
			font-size: 26upx;
			color: #333;

		}
		.icon{
			background: #007aff;
			display: inline-block;
			height: 80upx;
			padding: 30upx;
			display: flex;
			align-items: center;
		}
	}
	.sort{
		display: flex;
		align-items: center;
		background: #FFFFFF;
		height: 100upx;
		margin-bottom: 30upx;
		justify-content: center;
		text{font-size: 30upx;color: #333;}
		image{width: 40upx;height: 40upx;}
	}
	.help_contnet{
		background: #FFFFFF;
		.help_top{
			height: 80upx;
			line-height: 80upx;
			border-bottom: 1px solid #eee;
			background: url(../../static/meiyong/hlep_home.png) no-repeat 24upx 24upx;
		}
		.help_botton{height: 80upx;line-height: 80upx;display: flex;justify-content: center;align-items: center;
			image{width: 30upx;height: 30upx;}
			text{font-size: 26upx;color: #333;}
			
		}
		.help_list{
			margin: 0 36upx;
			position: relative;
			padding-left: 30upx;
			border-bottom: 1px solid #eee;
			.item{
				font-size: 26upx;
				color: #666;
				padding: 20upx 0;
				&:before{
					position: absolute;
					content: '■';
					left: -8upx;
					top: 24upx;
					font-size: 20upx;
					color: #969696;
				}
			}
		}
	}
</style>