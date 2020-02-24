<template>
	<view class="travels container999" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
		<image class="hea_img" src="../../static/hotel/sp_dt.png"></image>
		<view class="header-s">
			<view class="status_bar"><!-- 这里是状态栏 --></view>
			<view class="header">
				<view class="iconfont" style="color: #FFFFFF;" @click="back">&#xe633;</view>
				<view class="search">
					<view class="iconfont">&#xe644;</view>
					<view class="search_name">搜索目的地</view>
				</view>
			</view>
		</view>
		<!-- 导航栏 agents导航栏标题 -->
		<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper style="min-height: 100vh;margin-top: 20upx;" :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
				<!-- <view :id="'top'+listIndex" style="width: 100%;height: 180upx;">边距盒子</view> -->
				<view class='content'>
					<!-- <view class='card' v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index">
						{{item}}
					</view> -->
					<block v-for="(item,index) in listItem" :key="index">
						<view class="content_list" @click="travelsFun">
							<view class="img" @click="opens">
								<image :src="item.img" ></image>
								<view class="iconfont" style="font-size: 100upx;">&#xe619;</view>
							</view>
							<view class="list_title">{{item.title}}</view>
							<view class="characteristic">
								<view class="characteristic_item">陆地观光</view>
								<view class="characteristic_item">秘境圣地</view>
							</view>
							<view class="list_bottom">
								<view class="item" >
									<text class="iconfont" style="color: #fd9802;">&#xe605;</text>
									<text class="item_num" style="color: #fd9802;">{{item.see}}</text>
								</view>
								<view class="item" >
									<text class="iconfont" style="color: #fd9802;">&#xe639;</text>
									<text class="item_num" style="color: #fd9802;">{{item.zan}}</text>
								</view>
								<view class="iconfont">&#xe61c;</view>
							</view>
						</view>
					</block>
				</view>
				<view class='noCard' v-if="listItem.length===0" style="text-align: center;margin-top: 20upx;">
					暂无信息
				</view>
				<view style="width: 100%;height: 100upx;opacity:0;">底部占位盒子</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<uni-popup ref="popup" type="center">
			<view class="video_content" style="position: relative;">
				<video 	id="myVideo" 
						src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
						autoplay="true"
						@play='plays'
						@fullscreenchange="fullscreenchange"
				></video>
				<view class="abc" @click="detele" style="position: absolute;top: -66upx;right: -26upx;">
					<view class="iconfont" style="font-size: 60upx;color: #FFFFFF;">&#xe61d;</view>
				</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "../../components/popup/uni-popup/uni-popup.vue"
	const util = require('../../tool/util.js');
	import refresh from '../../components/xinAdd/refresh.vue';
	import navTab from '../../components/xinAdd/navTab.vue';
	export default{
		components:{refresh,navTab,uniPopup},
		data(){
			return{
				toView:'',//回到顶部id
				tabTitle:['帕劳','日本','巴厘岛','塞班','马尔代夫','杜马盖地','沙巴'], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				pages:[1,1,1,1], //第几个swiper的第几页
				list: [[{
					img:'../../static/hotel/sps.png',
					title:'【帕劳】安德茂大瀑布—— 帕劳的天使瀑布。',
					id:1,
					see:120,
					zan:120,
				},
				{
					img:'../../static/hotel/yj.png',
					title:' 【帕劳】海豚共游——友好的世界.',
					id:1,
					see:120,
					zan:120,
				}],[],[],[],[],[],[]] //数据格式
			}
		},
		methods:{
			opens(){
				this.$refs.popup.open()
				// this.plays()
			},
			detele(){
				this.$refs.popup.close()
			},
			fullscreenchange(e){console.log(e)},
			plays(e){console.log(e)},
			toTop(){
				this.toView = ''
				setTimeout(()=>{
					this.toView = 'top' + this.currentTab
				},10)
			},
			back(){
				uni.navigateBack({})
			},
			changeTab(index){
				this.currentTab = index;
			},
			travelsFun(){
				// uni.navigateTo({
				// 	url:'/pages/travels/travels_details'
				// })
			},
			// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
			isRequest() {
				return new Promise((resolve, reject) => {
					this.pages[this.currentTab]++
					var that = this
					setTimeout(() => {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: `请求第${that.currentTab + 1 }个导航栏的第${that.pages[that.currentTab]}页数据成功`
						})
						let newData = ['新数据1','新数据2','新数据3']
						resolve(newData)
					}, 1000)
				})
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				this.$refs.navTab.longClick(index);
			},
			// 加载更多 util.throttle为防抖函数
			lower1: util.throttle(function(e) {
			console.log(`加载${this.currentTab}`)//currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
			uni.showLoading({
				title: '加载中',
				mask:true
			})
				this.isRequest().then((res)=>{
					let tempList = this.list
					tempList[this.currentTab] = tempList[this.currentTab].concat(res)
					console.log(tempList)
					this.list = tempList
					this.$forceUpdate() //二维数组，开启强制渲染
				})
			}, 300),
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e){
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh(){
					setTimeout(() => {
						uni.showToast({
							icon: 'success',
							title: '刷新成功'
						})
						this.$refs.refresh.endAfter() //刷新结束调用
					}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.content_list{width: 48%;
	.iconfont{color: #bcb9ba;}
	.video_content{
		position: relative;
		background: #FFFFFF;
	}
	.abc{
		position: absolute;
		top: 0;
		right: 0;
		font-size: 50upx;
		color: #FFFFFF;
	}
	.img{position: relative;
		.iconfont{
			position: absolute;
			left: 50%;
			top: 50%;
			color: #FFFFFF;
			transform: translate(-50%,-50%);
		}
	}
	.img image{width: 100%;height: 280upx;display: block;}
		.list_title{font-size: 28upx;font-weight: 600;padding: 15upx 0;}
		.characteristic{
			font-size: 26upx;
			color: #666666;
			display: flex;
			align-items: center;
			
			.characteristic_item{
				background: rgba(246,246,246,1);
				padding: 5upx 10upx;
				margin: 8upx 12upx 8upx 0;
			}
		}
		.list_bottom{
			// padding: 0 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.item{display: flex;align-items: center;
				.item_num{margin-left: 10upx;color: #bcb9ba;;}
			}
		}
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.hea_img{width: 100%;height: 200upx;}
	.header-s{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
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
	
	
	.container999 {
	  width: 100vw;
	  font-size: 28upx;
	  min-height: 100vh;
	  overflow: hidden;
	  // color: #6B8082;
	  position: relative;
	  // background-color: #f6f6f6;
	}
	.content {
		width: 100%;
		display: flex;
		padding: 0 20upx;
		justify-content: space-between;
		flex-wrap: wrap;
		&:after{
			content: '';
			width: 48%;
		}
	}
	
	// .card {
	// 	width: 90%;
	// 	height: 368upx;
	// 	background-color: white;
	// 	margin: 0 auto 42upx auto;
	// 	background: #FFFFFF;
	// 	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.10);
	// 	border-radius: 5px;
	// 	position: relative;
	// }
	
	// .noCard {
	// 	width: 90%;
	// 	height: 200upx;
	// 	margin: auto;
	// 	background-color: white;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	color: #999999;
	// 	box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
	// 	border-radius: 10upx;
	// }
	
	
	// .nav {
	// 	position: fixed;
	// 	left: 0;
	// 	top: 0;
	// 	color: white;
	// 	width: 100%;
	// 	display: flex;
	// 	flex-direction: column;
	// 	align-items: flex-start;
	// 	justify-content: flex-start;
	// 	font-size: 24upx;
	// 	background-color: #50B7EA;
	// 	z-index: 996;
	// }
	
	// .searchInput999 {
	// 	width: 90%;
	// 	margin: 0 auto;
	// 	background: white;
	// 	border-radius: 30upx;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	height: 56upx;
	// }
	
	// .search999 {
	// 	width: 32upx;
	// 	height: 32upx;
	// }
	
	// .searchBox999 {
	// 	width: 56upx;
	// 	height: 56upx;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// }
	
	// .input999 {
	// 	color: #999;
	// 	width: 80%;
	// }
</style>
