<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled />
		</view>
		<!-- #endif -->
	
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<swiper class="carousel" circular @change="swiperChange" :indicator-dots ="true" indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#cc2d1e">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({title: '轮播广告'})">
					<image :src="item.ad_pic" />
				</swiper-item>
			</swiper>
		</view>
			<!-- vip卡 -->
		<view @tap="vip_animation" class="vipCardContainer">
			<view class="vipCard">
				<view class="vipCardTopic">
					<view class="vipCardTitle">
						<image class="viplog" src="../../static/demo/viplogo.png"/>
						<view class="vipTip">即可享受vip会员特权</view>
					</view>
					<view class="openVip">立即开店</view>
				</view>
				<view class="cardBoss">
					<view class="bossMessage">
						<image class="avatar" src="../../static/demo/missing-face.png"></image>
						<view >的小店</view>
					</view>
					<view class="codeDescript">
						<view class="addWx">点击添加<br>店主微信</view>
						<image class="code" src="http://jlf.db.juntest.com/images/admin/upload/20191024/b0899bb27f2b5759b329d6495bed5fd4.png"/>
					</view>
				</view>
				<view class="level">
					<view class="vipLevel">
						<text class="levelName">普通会员</text>
						<text class="levelcontent">内容待定</text>
					</view>
					<view class="vipLevel">
						<text class="levelName">银牌vip</text>
						<text class="levelcontent">内容待定</text>
					</view>
					<view class="vipLevel">
						<text class="levelName">金牌vip</text>
						<text class="levelcontent">内容待定</text>
					</view>
					<view class="vipLevel">
						<text class="levelName">砖石vip</text>
						<text class="levelcontent">内容待定</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 分类 -->
		<view class="cate-section" :style="{ 'margin-top' : vip_margin_top + 'upx' }">
			<view v-for="item in hot_navList" :key="item.id" class="cate-item" :data-id = "item.id" @tap="hot_navFun">
				<image :src="item.icon"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<!-- 文字滚动 -->
		<view class="text_scoll">
			<view class="scoll_logo"></view>
			<view class="scoll_con">关于购物金怎么使用</view>
		</view>
		<!-- 美妆护肤 -->
		<view class="seckill-section">
			<view class="s-header">
				<label>专属推荐<span class="destination">{{destination.name}}</span></label>
				<view class="yticon" >
					<text class="iconfont" style="color: #4c4d50; margin-right: 10upx;">&#xe60f;</text>
					<label class="header-more" style="color: #4c4d50;" @tap="changeCate(activeCate,true)">换一换目的地</label>
				</view>
			</view>
			<view class="cate-tags">
				<scroll-view scroll-x="true" show-scrollbar="true">
					<span v-for="tag in cateTags" :key="tag.type" :class="activeCate===tag.type?'active':''" @tap="changeCate(tag.type)">
						{{tag.name}}
					</span>
				</scroll-view>
			</view>
			<scroll-view class="floor-list">
			<!-- 首页轮播组件 -->
				<support :pro_list="cate_content"  @showclick="navToDetailPage"></support>
			</scroll-view>
		
		</view>
		<!-- 推荐目的地 -->
		<view class="seckill-section">
			<view class="s-header">
				<label>推荐目的地</label>
			</view>
			<view class="box1_list">
				<view class="list_item">
					<view class="item_img">
						<image src="../../static/hotel/sps.png" ></image>
						<view class="item_title">
							<view class="title">普吉岛</view>
							<view class="name">斯米兰开导</view>
						</view>
					</view>
					<view class="item_center">
						<view class="item_center_title">丽江</view>
						<view class="item_center_conten">艳遇之都</view>
					</view>
					<view class="item_center">
						<view class="item_center_title">泸沽湖</view>
						<view class="item_center_conten">女儿国</view>
					</view>
				</view>
				<view class="list_item">
					<view class="item_img">
						<image src="../../static/hotel/yj.png" ></image>
						<view class="item_title">
							<view class="title">日本</view>
							<view class="name">城市交通卡</view>
						</view>
					</view>
					<view class="item_center">
						<view class="item_center_title">巴厘岛</view>
						<view class="item_center_conten">乌布热气球</view>
					</view>
					<view class="item_center">
						<view class="item_center_title">泸沽湖</view>
						<view class="item_center_conten">女儿国</view>
					</view>
				</view>
				<view class="list_item">
					<view class="item_img">
						<image src="../../static/hotel/sps.png" ></image>
						<view class="item_title">
							<view class="title">普吉岛</view>
							<view class="name">斯米兰开导</view>
						</view>
					</view>
					<view class="item_center">
						<view class="item_center_title">丽江</view>
						<view class="item_center_conten">艳遇之都</view>
					</view>
					<view class="item_center">
						<view class="item_center_title">泸沽湖</view>
						<view class="item_center_conten">女儿国</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 猜你喜欢 -->

		<view >
			<view class="pro-tab">
				<scroll-view  scroll-x="true"  scroll-left="120" >
					<view class="scroll">
						<view class="scroll_list"  v-for="(item,index) in supportCate" :key="item.cate" @tap="routeCate(item.cate,true)">
							<view :class="defaultCate===item.cate?'active':''"> {{item.name}}</view>
							<!-- <view class="notes" v-if="index<1">猜你喜欢</view> -->
							<view class="notes" v-if="index==1">旅行过大年</view>
							<view class="notes"v-else>猜你喜欢</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="box2">
				<waterfall :key="monkeyKey" :columnCount="2" :style="{'height':top+300+'px'}">
					<!-- <view class="pbl"> -->
						<block v-for="(product, index) of recommend_list" :key="index">
							<waterfall-item  @click="navToDetailPage(product)" @output="heightOutput">
									<product class="product"
										:product="product"
									></product>
							</waterfall-item>
						</block>
					<!-- </view> -->
				</waterfall>
				<view v-if="touchBottom" style="margin-bottom:50px;text-align: center;">没有更多了</view>
			</view>
		</view>

	</view>
</template>

<script>
	import request from '@/tool/request.js';
		import indexBanner from '../../components/indexbanner.vue'
		// 瀑布流组件
		import waterfall from  '../../components/xg-waterfall/xg-waterfall'
		import waterfallItem from  '../../components/xg-waterfall/xg-waterfall-item'
		import product from './components/product'
		import support from './components/support'
	export default {
		components: {
			indexBanner,
			waterfall,
			waterfallItem,
			product,
			support
		},
		data() {
			return {
				titleNViewBackground: '',
				vip_margin_top : -180,
				carouselList: [],
				goodsList: [],
				header_nav : [],
				cateTags:null,
				monkeyKey:1,
				reachBottom:false,
				destination:{id:0,name:'帕劳'},
				supportCate :null,
				defaultCate:1,
				touchBottom:false,
				activeCate:'route',
				page:1,
				top:0,
				hot_navList : [ 
					{ id:0,name : 'VIP专区',icon:'http://jlf.db.juntest.com/images/admin/upload/20191021/3f971c6cf01401949596ed40b598fdc4.png'},
					{ id:1,name : '新人专区',icon:'http://jlf.db.juntest.com/images/admin/upload/20191021/85f20a064fb09c6d6281a1371198ba44.png'},
					{ id:2,name : '拼团',icon:'http://jlf.db.juntest.com/images/admin/upload/20191021/bde1912292b667bcbfb54c3cf656d0b3.png'},
					{ id:3,name : '限时秒杀',icon:'http://jlf.db.juntest.com/images/admin/upload/20191021/128f57741dbcd3a20d6f037970782e82.png'},
					{ id:4,name : '领券中心',icon:'http://jlf.db.juntest.com/images/admin/upload/20191021/aab3111e4a4fc1eb34ee0bd6e2765a17.png'}
					],
				pro_list : [
					{ id:0,title : '酵素去屑止痒洗发乳滋养柔顺控油止痒无硅油洗发水修护护发乳',image:'http://jlf.db.juntest.com/images/admin/upload/20191125/b9e0db3c513c8a9fea87760c94370dd5.png',price : '¥26+2 购物金',type:'现金+购物金'},
					{ id:1,title : '酵素去屑止痒洗发乳滋养柔顺控油止痒无硅油洗发水修护护发乳',image:'http://jlf.db.juntest.com/images/admin/upload/20191125/b9e0db3c513c8a9fea87760c94370dd5.png',price : '¥26+2 购物金',type:'现金+购物金'},
					{ id:2,title : '酵素去屑止痒洗发乳滋养柔顺控油止痒无硅油洗发水修护护发乳',image:'http://jlf.db.juntest.com/images/admin/upload/20191125/b9e0db3c513c8a9fea87760c94370dd5.png',price : '¥26+2 购物金',type:'现金+购物金'},
					{ id:3,title : '酵素去屑止痒洗发乳滋养柔顺控油止痒无硅油洗发水修护护发乳',image:'http://jlf.db.juntest.com/images/admin/upload/20191125/b9e0db3c513c8a9fea87760c94370dd5.png',price : '¥26+2 购物金',type:'现金+购物金'}
				],
				cate_content : [
				],
				 recommend_list : []
			};
		},

		onLoad() {
			this.changeCate(this.activeCate,null)
			this.loadData();
		
		},
		onTabItemTap(e){
			console.log(e)
		},
		methods: {
			heightOutput(top){
				console.log(top);
				
				this.top = top;
			},
			async changeCate(tag,change=false){
				this.activeCate = tag;
				console.log(this.destination.id);
				
				await request.requestGet('indexCateChange',{cate:tag,destination:this.destination.id,change:change})
				.then((result) => {
					let data = result.data.data;
					this.destination = this.$set(this.destination,0,{id:data.destination['id'],name:data.destination['di_name']})
					
					this.cate_content = data.data;
					
				}).catch((err) => {
					console.log(err);
				});

			},
			async routeCate(cate,change=false) {
				if (change) {
					this.page=1;
					this.touchBottom = false;
				}
				if (this.touchBottom) {
					return [];
				}
				await request.requestGet('indexRouteCateChange',{cate:cate,page:this.page})
				.then((result) => {
					let data = result.data.data;
					if (this.page===1) {
					
						++this.monkeyKey
						this.recommend_list = data.data;
					}else{
						this.recommend_list = this.recommend_list.concat(data.data);
					}
					if (data.data===[]||data.data===null|data.data.length===0) {
						this.touchBottom=true;
					}
					this.defaultCate = cate

				}).catch((err) => {
					console.log(err);
				});
			},
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				await  request.requestGet('index')
				.then((res) => {
					let data = res.data.data;
					this.carouselList = data.banner;
					this.hot_navList = data.pc_cate
					this.cateTags = data.cateTags
					this.destination = {id:data.destination_list[0]['id'],name:data.destination_list[0]['di_name']}
					this.supportCate = data.supportCate
					console.log(data);
					
				}).catch((err) => {
					console.log(err);
					
				});
				
				
				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			//详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			//首页会员卡动画
			vip_animation : function (){
				this.vip_margin_top = this.vip_margin_top === -40 ? -180 : -40
			},
			//热门导航事件
			hot_navFun ( e ){
				let nav_id = e.currentTarget.dataset.id
				this.$api.msg(`你点击了第了第${nav_id + 1}个导航`)
				console.log(nav_id)
				if(nav_id=='100'){
					uni.navigateTo({
						url:'/pages/hotel/hotel'
					})
				}else if(nav_id=='102'){
					uni.navigateTo({
						url:'/pages/travels/travels'
					})
				}else if(nav_id=="103"){
					uni.navigateTo({
						url:'/pages/videos/videos'
					})
				}else if(nav_id=="99"){
					uni.navigateTo({
						url:'/pages/setmeal/tj_setmeal'
					})
				}
			},
		},
		onReachBottom : function ( e ){
			this.routeCate(this.defaultCate);
			this.page++;
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			// this.$api.msg('点击了搜索框');
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描dddd');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
			else if ( index === 2){
				uni.setStorageSync('type', '')
				uni.switchTab({
					url: '/pages/product/list'
				})
			}
		}
		// #endif
	}
</script>
<style lang="scss">
@import './scss/index.scss'
</style>
