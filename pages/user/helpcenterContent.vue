<template>
	<view class="help">
		<view class="search">
			<input type="text" class="input" placeholder="请输入你要的搜索的关键词" placeholder-class="plac_input"/>
			<view class="icon">
				<icon type="search" size="24" color="#fff"></icon>
			</view>
		</view>
		<view class="sort" @click="judeg">
			<text>全部分类</text>
			<image src="../../static/meiyong/x.png" v-if="judegS"></image>
			<image src="../../static/meiyong/s.png" v-else></image>
		</view>
		<view class="help_contnet">
			<view class="help_top">
				<view class="home" @click="home">首页</view> 
				<view class="you">>></view>
				<view class="home">佣金的来源及用处？</view>
				<view class="copy"  @click="past">复制文字</view>
			</view>
		</view>
		<view class="help_text">
			<view style="padding-bottom: 20upx;">
				<view class="text_title">佣金的来源及用处?</view>
				<view class="text_contetn">{{content}}</view>
				<view class="line"></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		name:"helpcenter",
		data(){
			return{
				judegS:true,
				drop:false,
				name:"加载更多",
				content:"佣金获取方法 佣金目前可以通过以下2种方法增加 1：每天完成商家推广任务就增加18-50元/天佣金，领2个官方任务和5个动态任务就可以完成任务领取,按要求提交任务，审批后就获得18-50元/天的佣金。 2：推荐一个人注册成功可以获得2-100元的佣金，后期会开发佣金可交易系统，会员可以将佣金转让给需要打广告的商家。 佣金使用方法 佣金目前可以通过以下4种方法使用 1： 佣金抵现金购物使用。提供几百种商品，少量现金+佣金的模式将需要的商品买回家。 2：给自己打广告，如果自己有产品需要推广，可以用少量的佣金给自己打广告。 3：给自己续会员费用。会员到期，可以使用佣金充值续费续期。 4：待开发，在佣金交易系统上进行转让，会员将佣金转让给需要打广告的商家。"
			}
		},
		methods: {
			judeg(){
				this.judegS=!this.judegS
			},
			dropDown(){				
				if(this.drop){
					this.name="加载完毕"
				}
				this.drop=true
			},
			home(){
				uni.navigateBack({
					delta:2
				})
			},
			past(){
				var value=this.content
				uni.setClipboardData({
					data: value
				});
				uni.showToast({
				    title: '复制成功',
				    duration: 2000,
					icon:"none"
				});
			},
		}
	}
</script>


<style lang="scss">
	page{background: #f9f9f9;}
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
			display: flex;
			padding-left: 68upx;
			color: #666;
			font-size: 26upx;
			align-items: center;
			.home{
				color: #0080ff;
				font-size: 26upx;
			}
			.you{margin:  0 10upx;}
			.copy{border: 1px solid #ccc;color: #333;font-size: 28upx;height: 60upx;line-height: 60upx;border-radius: 10upx;margin-left: 30upx;padding: 0 10upx;}
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
	.help_text{
		background: #FFFFFF;
		padding:0 26upx ;
		margin-bottom: 10upx;
		.text_title{
			color: #333;
			font-size: 32upx;
			border-bottom: 1px solid #e6e6e6;
			padding: 40upx 0;
			text-align: center;
		}
		.text_contetn{line-height: 60upx;color: #666666!important;font-size: 26upx;margin: 20upx 40upx;}
		.line{background: #e6e6e6;height: 1px;margin-top: 10upx;}
	}
</style>