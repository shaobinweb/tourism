<template>
	<view class="setmeal">
		<view class="setmeal_rb">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="status_img">
				<swiper class="swiper" style="height: 440upx;" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item>
						<image src="../../static/hotel/qy.png" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<view class="header">
					<view class="iconfont" style="color: #FFFFFF;" @click="back">&#xe633;</view>
					<view class="search">
						<view class="iconfont">&#xe644;</view>
						<view class="search_name">搜索目的地</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box1_setmeal">
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<view class="box2_setmeal">
			<view class="box2_more">
				<scroll-view scroll-x="true" class="kite-classify-scroll">
					<view class="more_list">
						<block v-for="(item,index) in box3_more" :key="index">
							<view class="item" :class="{'more_type':item.id==more_id}" @click="more_pl_fun(item)">{{item.name}}</view>
						</block>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="box3_setmeal">
			<view class="box3_list">
				<view class="img">
					<image src="../../static/hotel/qx.png" mode="aspectFill"></image>
					<view class="hot">HOT</view>
				</view>
				<view class="list_rig">
					<view class="rig_title">【帕劳】PADI潜水考证OW/AOW潜  水证课程深潜（中文课程...</view>
					<view class="rig_list">
						<view class="list_item">全套专业潜水装备</view>
						<view class="list_item">中文教练</view>
					</view>
					<view class="rig_bot">
						<view class="rig_price">
							￥<text class="price">7833</text>起
						</view>
						<view class="bot_rig">
							<view class="iconfont">&#xe6e5;</view>
							<view class="address">多地出发</view>
						</view>
					</view>
				</view>
			</view>
			<view class="box3_list">
				<view class="img">
					<image src="../../static/hotel/qx.png" mode="aspectFill"></image>
					<view class="hot">HOT</view>
				</view>
				<view class="list_rig">
					<view class="rig_title">【帕劳】PADI潜水考证OW/AOW潜  水证课程深潜（中文课程...</view>
					<view class="rig_list">
						<view class="list_item">全套专业潜水装备</view>
						<view class="list_item">中文教练</view>
					</view>
					<view class="rig_bot">
						<view class="rig_price">
							￥<text class="price">7833</text>起
						</view>
						<view class="bot_rig">
							<view class="iconfont">&#xe6e5;</view>
							<view class="address">多地出发</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navTab from '../../components/xinAdd/navTab.vue';
	export default{
		components:{navTab},
		data(){
			return{
				tabTitle:['帕劳','日本','巴厘岛','塞班','马尔代夫','杜马盖地','沙巴'],
				box3_more:[{name:'帕劳',id:1},{name:'塞班',id:2},],
				more_id:1,
			}
		},
		methods:{
			back(){
				uni.navigateBack({})
			},
			more_pl_fun(item){
				this.more_id=item.id
			},
		}
	}
</script>

<style lang="scss">
	.img{position: relative;}
	.hot{background: #EF001E;font-size: 26upx;font-weight: 600;color: #FFFFFF;padding: 5upx 8upx;border-radius: 12upx 0 12upx 0;position: absolute;top: 0;left: 0;z-index: 10;}
	.box3_setmeal{
		padding: 20upx;
		height: 100%;
		.box3_list{
			display: flex;
			height: 100%;
			margin-bottom: 20upx;
			image{display: block;width: 246upx;flex-shrink:0;height: 184upx;margin-right: 14upx;border-radius: 12upx;}
			.rig_title{color: #333333;font-weight: 600;letter-spacing: 2upx;}
			.rig_list{
				display: flex;
				align-items: center;
				padding: 10upx 0;
				.list_item{background: #fdf8f3;padding: 4upx 8upx;color: #FF7700;font-size: 28upx;margin-right: 10upx;}
			}
			.rig_bot{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.rig_price{color: #FF7700;font-weight: 600;.price{font-size: 32upx;}}
				.bot_rig{
					display: flex;
					align-items: center;
					.iconfont{color: #FF7700;margin-right: 6upx;}
					.address{color: #000000;font-size: 24upx;}
				}
			}
		}
	}
	.box2_more{
		padding: 20upx;
		.more_list{
			display: flex;
			align-items: center;
			.item{color:#666666;background: #EEEEEE;padding: 12upx;border-radius: 10upx;margin-right: 15upx;font-size: 24upx;}
		}
	}
	.box2_setmeal .box2_more .more_list .more_type{background: #F99B04;color: #FFFFFF;}
	.kite-classify-scroll{
	    width: 100%;
		
		overflow: hidden;
	 	white-space: nowrap;
	}
	.kite-classify-cell{
		display: inline-block;
	
	}
	.box1_setmeal{border-bottom: 1px solid #EEEEEE;width: 98%;overflow: hidden; box-shadow: 2px 0 6upx #eee;  }
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.status_img{
		position: relative;
	}
	.header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		// background: url(../../static/hotel/dt.png) no-repeat;
		// background-size: cover;
		height: 160upx;
		padding: 0 20upx;
		width: 100%;
		position: absolute;
		left: 50%;
		top: 0%;
		transform: translate(-50%);
		.iconfont{font-size: 45upx;}
		.search{
			width: 90%;
			background: #FFFFFF;
			border-radius: 60upx;
			display: flex;
			align-items: center;
			padding: 16upx;
			.search_name{font-size: 26upx;color: #000000;margin-left: 20upx;}
		}
	}
</style>
