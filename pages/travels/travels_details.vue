<template>
	<view class="travels_details">
		<view class="header">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="header_content">
				<view class="iconfont" style="font-weight: bold;" @click="back">&#xe633;</view>
				<image src="../../static/temp/cate13.jpg" style="border-radius: 40upx;"></image>
				<view class="content">
					<view class="content_top">
						<text class="size">来着</text>
						<text class="name">流浪的尤克里里</text>
					</view>
					<view class="list_bottom">
						<view class="item" >
							<text class="iconfont" >&#xe605;</text>
							<text class="item_num" >100</text>
						</view>
						<view class="item" >
							<text class="iconfont" >&#xe639;</text>
							<text class="item_num" >100</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="img">
			<image src="../../static/hotel/yj_img.png" mode="aspectFill"></image>
			<image class="img_lable" src="../../static/hotel/yj_lable.png" mode="widthFix"></image>
		</view>
		
		<view class="fwb">
			<rich-text :nodes="strings"></rich-text>
		</view>
		<view class="footer">
			<view class="list" @click="fabulous">
				<image src="../../static/hotel/zan.png" v-if="!fabulous_s"></image>
				<image src="../../static/hotel/y_zan.png" v-else></image>
				<view class="zan">点赞</view>
			</view>
			<view class="list" style="margin: 0 60upx;" @click="collection">
				<image src="../../static/hotel/sc.png"  v-if="!collection_s"></image>
				<image src="../../static/hotel/y_sc.png" v-else></image>
				<view class="zan">收藏</view>
			</view>
			<view class="list">
				<image src="../../static/hotel/fx.png"></image>
				<!-- <image src="../../static/hotel/y_sc.png"></image> -->
				<view class="zan">分享</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				collection_s:false,
				fabulous_s:false,
				strings:'<div style=""><p>“我看着太阳下山，然后躺下来，看星星出来。”我唱着一 小段词，每次看见另一颗星星在昏暗的天际冒出来，就再唱 一遍，宛若把星星唤</p><img src="../../static/hotel/yj.png"/></div>'
			}
		},
		methods:{
			fabulous(){
				this.fabulous_s=!this.fabulous_s
			},
			collection(){
				this.collection_s=!this.collection_s
			},
			back(){
				uni.navigateBack({})
			},
		}
	}
</script>

<style lang="scss">
	.footer{
		display: flex;
		align-items: center;
		justify-content: center;
		image{width: 50upx;height: 50upx;display: inline-block;}
		background:rgba(247,247,247,1);
		width: 100%;
		height: 150upx;
		position: fixed;
		bottom: 0;
		left: 0;
		.list{
			color: #333333;
		}
	}
	.img{
		position: relative;
		.img_lable{
			position: absolute;
			top: 0;
			right: 30upx;
			width:100upx ;
		}
	}
	.fwb{padding: 20upx;}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.header_content{
		display: flex;
		align-items: center;
		padding: 20upx;
		image{width: 100upx;height: 100upx;border-radius: 50upx;margin: 0 20upx;}
		.content{
			.content_top{
				.size{font-size: 26upx;color: #9FA0A0;margin-right: 6upx;}
				.name{font-size: 32upx;color: #000000;font-size: 600;}
			}
			.list_bottom{
				display: flex;
				align-items: center;
				.item{
					margin-right: 14upx;
					display: flex;
					align-items: center;
					.iconfont{font-size: 40upx;margin-right: 10upx;color: #bcb9ba;}
				}
			}
		}
	}
</style>
