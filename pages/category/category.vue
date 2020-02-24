<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="(item,index) in flist" :key="item.id"  class="f-item b-b" :class="{active: item.id === currentId}" :data-cid="index" @click="tabtap(item.id)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside"  :scroll-top="tabScrollTop">
			<view class="s-list">
				<view class="ad_img">
					<image v-for="item in ad_img" :key="item.id" :src="item.img" mode="aspectFill"></image>
				</view>
				<view class="t-list">
					<view @click="navToList(titem.id)"  class="t-item" v-for="titem in tlist" :key="titem.id" :data-id="titem.id">
						<image :src="titem.image"></image>
						<text class="class_title">{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import request from '../../tool/request.js'
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				flist: [],
				ad_img : [],
				tlist: []
			}
		},
		async onLoad(){
			let classify_data = await request.requestGet('classify')
			// 一级分类
			this.flist = classify_data.data.data.first_category
			this.currentId = classify_data.data.data.first_category[0].id//默认选中第一个
			this.ad_img = classify_data.data.data.ad_img//分类广告
			this.tlist = classify_data.data.data.second_category //二级分类
			
		},
		methods: {
			//一级分类点击
			async tabtap(nav_id){
				console.log("当前分类id",nav_id)
				this.currentId = nav_id
				// 点击导航切换
				let classify_data = await request.requestGet('classify',{
					id : nav_id
				})
				this.ad_img = classify_data.data.data.ad_img//分类广告
				this.tlist = classify_data.data.data.second_category
				console.log("切换成功",classify_data)
			},
			navToList(sid, tid){
				uni.switchTab({
					url: `/pages/product/list?fid=${sid}&type=category&type2=category`
				})
			},
			// 获取分类商品
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color:#d72122;;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: #d72122;;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 30upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 30upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
	.ad_img{ width:100%;height: 280rpx;margin-bottom:20rpx;padding-right:20rpx;margin-top:20rpx}
	.ad_img image{ width:100%;height: 280rpx;}
	.class_title{ width:100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-size:24rpx;text-align: center;}
</style>
