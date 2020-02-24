<template>
	<view>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<!-- <view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back"><view class="icon iconfont icon-xiangqian" @tap="back" v-if="showBack"></view></view> 
				<view class="middle"></view>
				<view class="icon-btn">
					<view class="icon iconfont icon-tongzhi" @tap="toMsg"></view>
					<view class="icon iconfont icon-cart" @tap="joinCart"></view>
				</view>
			</view> -->
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back" ><view class="icon iconfont icon-xiangqian" @tap="back" v-if="showBack"></view></view>
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				<view class="icon-btn">
					<view class="icon iconfont icon-tongzhi" @tap="toMsg"></view>
					<view class="icon iconfont icon-cart" @tap="joinCart"></view>
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<view class="box" @tap="share">
					<view class="icon iconfont icon-fenxiang"></view>
					<view class="text">分享</view>
				</view>
				<view class="box" @tap="toChat">
					<view class="icon iconfont icon-kefu"></view>
					<view class="text">客服</view>
				</view>
				<view class="box" @tap="keep">
					<view class="icon iconfont" :class=" [isKeep?'icon-yishoucang':'icon-shoucang']"></view>
					<view class="text">{{isKeep?'已':''}}收藏</view>
				</view>
			</view>
			<view class="btn">
				<view class="joinCart" @tap="joinCart">加入购物车</view>
				<view class="buy" @tap="buy">立即购买</view>
			</view>
		</view>
		<!-- share弹窗 -->
		<view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="h1">分享</view>
				<view class="list">
					<view class="box">
						<image src="../../static/img/share/wx.png"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/pyq.png"></image>
						<view class="title">
							朋友圈
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/wb.png"></image>
						<view class="title">
							新浪微博
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/qq.png"></image>
						<view class="title">
							QQ
						</view>
					</view>
				</view>
				<view class="btn" @tap="hideShare">
					取消
				</view>
			</view>
			
		</view>
		<!-- 服务-模态层弹窗 -->
		<view class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="row" v-for="(item,index) in goodsData.service" :key="index">
						<view class="title">{{item.name}}</view>
						<view class="description">{{item.description}}</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="hideService">完成</view></view>
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="title">选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in comboData" :class="[item.id==selectCombo.tcid?'on':'']" @tap="setSelectCombo(item)" :key="index">{{item.comboname}}</view>
					</view>
					<view class="content">
						<view class="title">出发日期：</view>
						<z-calendar
								:datePrice="datePrice" 
								howManyMonth="12" 
								@changeDate="changeDate" 
								defaultSelect="2019-12-12"
								mode="1">
						</z-calendar>
					</view>
					<view class="buy-num">购买数量</view>
					<view class="length" style="border-top:none;">
						<view class="text">成人数量</view>
						<view class="number">
							<view class="sub" @tap.stop="sub('adult')">
								<view class="icon iconfont icon-jian"></view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="selectCombo.adultnum" />
							</view>
							<view class="add"  @tap.stop="add('adult')">
								<view class="icon iconfont icon-jia"></view>
							</view>
						</view>
						
					</view>
					<view class="length" style="border-top:none;"> 
						<view class="text">小孩数量</view>
						<view class="number">
							<view class="sub" @tap.stop="sub('child')">
								<view class="icon iconfont icon-jian"></view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="selectCombo.childnum" />
							</view>
							<view class="add"  @tap.stop="add('child')">
								<view class="icon iconfont icon-jia"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn">
					<view class="price"><span class="sign">￥</span>{{totalPrice}}</view>
				<view class="btn-group">
					<view class="joinCart" @tap="hideSpec">立即购买</view>
				<view class="buy" @tap="hideSpec">立即购买</view></view>
				</view>
			</view>
		</view>
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="swiper in swiperList" :key="swiper.id">
					<image :src="swiper.thumbs"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">{{currentSwiper+1}}/{{swiperList.length}}</view>
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="price">￥{{goodsData.market_price}}</view>
			<view class="title">
				{{goodsData.name}}
			</view>
		</view>
		<!-- 服务-规则选择 -->
		<view class="info-box spec">
			<view class="row" @tap="showService">
				<view class="text">服务</view>
				<view class="content"><view class="serviceitem" v-for="(item,index) in goodsData.service" :key="index">{{item.name}}</view></view>
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view>
		</view>
		<view class="combo section" id="combo">
			<view class="combo-left">
				<view class="iconfont icon-icon-" ></view>
			<view class="title">{{goodsData.departure_cn}}出发</view>
			<view class="selected-combo">已选：
				{{(selectCombo.tcid===0||(selectCombo.childnum===0&&selectCombo.adultnum===0))?'未选择':`${selectCombo.comboname} 成人 ${selectCombo.adultnum}名,小孩 ${selectCombo.childnum}名`}}
				</view>
			</view>
			<view class=" select-combo" @tap="showSpec(false)">查看套餐 <view class="iconfont icon-jiantou" style="font-size:22upx"></view></view>
		</view>
			<!-- <view class="row" @tap="showSpec(false)">
				<view class="text">选择套餐：</view>
					<view class="sp">
						<view v-for="(item,index) in comboData" :key="index" :class="[index==selectCombo?'on':'']">{{item.comboname}}</view>
					</view>
					
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view> -->
		<!-- 评价 -->
		<!-- <view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">商品评价({{goodsData.comment.number}})</view>
				<view class="arrow" @tap="toRatings">
					<view class="show" @tap="showComments(goodsData.id)">
						查看全部
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<view class="comment" @tap="toRatings">
				<view class="user-info">
					<view class="face"><image :src="goodsData.comment.userface"></image></view>
					<view class="username">{{goodsData.comment.username}}</view>
				</view>
				<view class="content">
					{{goodsData.comment.content}}
				</view>
			</view>
		</view> -->
		<!-- 详情 -->
		<view class="description">
			<view class="title">———— 商品详情 ————</view>
			<view class="content">
				<rich-text :nodes="descriptionStr"></rich-text>
				<view class="subtitle" id="cost_description" v-if="cost_description!==''&&cost_description!==null&&cost_description!==undefined">行程信息</view>	
				<rich-text :nodes="cost_description"></rich-text>
				<view class="subtitle" v-if="arrange_journey!==''&&arrange_journey!==null&&arrange_journey!==undefined">行程安排</view>	
				<rich-text  v-if="arrange_journey!==''&&arrange_journey!==null&&arrange_journey!==undefined" :nodes="arrange_journey"></rich-text>
				<view class="subtitle" v-if="buy_journey!==''&&buy_journey!==null&&buy_journey!==undefined">购买须知</view>	
				<rich-text :nodes="buy_journey"></rich-text>
				<view class="subtitle" v-if="remark!==''&&remark!==null&&remark!==undefined">使用说明</view>	
				<rich-text :nodes="remark"></rich-text>
			</view>
			
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js';
	import zCalendar from "../../components/njzz-calendar/njzz-calendar.vue"
export default {
	components:{
		zCalendar
	},

	data() {
		return {
			datePrice:[],
			id:0,
			//控制渐变标题栏的参数
			beforeHeaderzIndex: 11,//层级
			afterHeaderzIndex: 10,//层级
			beforeHeaderOpacity: 1,//不透明度
			afterHeaderOpacity: 0,//不透明度
			//是否显示返回按钮
			// #ifndef MP
			showBack:true,
			// #endif
			//轮播主图数据
			swiperList: [
				{ id: 1, thumbs: '' }
			],
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[],//导航条锚点
			selectAnchor:0,//选中锚点
			serviceClass: '',//服务弹窗css类，控制开关动画
			specClass: '',//规格弹窗css类，控制开关动画
			shareClass:'',//分享弹窗css类，控制开关动画
			// 商品信息
			goodsData:{
				id:1,
				name:"商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
				market_price:"127.00",
				number:1,
				
				comment:{
					number:102,
					userface:'../../static/img/face.jpg',
					username:'大黑哥',
					content:'很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
				}
			},
			comboData:[],
			selectCombo:{
				trid:0,
				tcid:0,
				adultnum:0,
				childnum:0,
				oldnum:0,
				adultPrice:0,
				oldPrice:0,
				childPrice:0,
				date:null,
			},//选中规格
			isKeep:false,//收藏
			//商品描述html
			descriptionStr:null,
			cost_description:null,
			arrange_journey:null,
			buy_journey:null,
			remark:null,
		};
	},
	onLoad(option) {
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif

		this.id = option.id
		this.loadData()
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.id); //打印出上个页面传递的参数。
	},
	onReady(){
		this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onPageScroll(e) {
		//锚点切换
		this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		uni.showToast({ title: '触发上拉加载' });
	},
	mounted () {
		
	},
	computed: {
		totalPrice: function(){
				let old = parseInt(this.selectCombo.oldnum)
				let adult = parseInt(this.selectCombo.adultnum)
				let child = parseInt(this.selectCombo.childnum)
				let oldPrice = this.selectCombo.oldPrice
				let adultPrice = this.selectCombo.adultPrice
				let childPrice = this.selectCombo.childPrice
				let totalPrice = old*oldPrice+adult*adultPrice+child*childPrice
				console.log(this.selectCombo);
				
				console.log(totalPrice);
				
				return totalPrice
		}
	},
	methods: {
		changeDate(data){ //选择日期事件  可以将data绑定到此页面以用来提交等操作
				this.selectCombo.adultPrice = data.price
				this.selectCombo.oldPrice = data.oldprice
				this.selectCombo.childPrice = data.childprice
				this.selectCombo.date = data.date
		},
		async loadData () {
			
			await await request.requestGet(request.getUrl('goodInfo')+this.id)
			.then((result) => {
				let data = result.data.data;
				this.goodsData = data.detaildata
				this.swiperList = data.detail_img
				this.goodsData.service = [
					{name:"正品保证",description:"此商品官方保证为正品"},
					{name:"极速退款",description:"此商品享受退货极速退款服务"},
					{name:"7天退换",description:"此商品享受7天无理由退换服务"}
				]
				this.comboData = data.combodata

				let detail_explain = data.detail_explain;
				this.cost_description = detail_explain.cost_description
				this.arrange_journey = detail_explain.arrange_journey
				this.buy_journey = detail_explain.buy_journey
				this.remark = detail_explain.remark
				this.descriptionStr = detail_explain.brief_journey

				// 后台的富文本图片路径是相对路径,现在换成绝对路径,适用本地,线上的去掉这个
				this.buy_journey = this.buy_journey.replace(/src="/g,`src="http://funpalau2.db.juntest.com/`)
				//给图片添加适配，兼容app，在css加的样式在app无效
				this.buy_journey = this.buy_journey.replace(/<img /g,`<img style="width:100%"`)
					// 后台的富文本图片路径是相对路径,现在换成绝对路径,适用本地,线上的去掉这个
				this.arrange_journey = this.arrange_journey.replace(/src="/g,`src="http://funpalau2.db.juntest.com/`)
				//给图片添加适配，兼容app，在css加的样式在app无效
				this.arrange_journey = this.arrange_journey.replace(/<img /g,`<img style="width:100%"`)
				// 后台的富文本图片路径是相对路径,现在换成绝对路径,适用本地,线上的去掉这个
				this.cost_description = this.cost_description.replace(/src="/g,`src="http://funpalau2.db.juntest.com/`)
				//给图片添加适配，兼容app，在css加的样式在app无效
				this.cost_description = this.cost_description.replace(/<img /g,`<img style="width:100%"`)
				// 后台的富文本图片路径是相对路径,现在换成绝对路径,适用本地,线上的去掉这个
				this.remark = this.remark.replace(/src="/g,`src="http://funpalau2.db.juntest.com/`)
				//给图片添加适配，兼容app，在css加的样式在app无效
				this.remark = this.remark.replace(/<img /g,`<img style="width:100%"`)
				// 后台的富文本图片路径是相对路径,现在换成绝对路径,适用本地,线上的去掉这个
				this.descriptionStr = this.descriptionStr.replace(/src="/g,`src="http://funpalau2.db.juntest.com/`)
				//给图片添加适配，兼容app，在css加的样式在app无效
				this.descriptionStr = this.descriptionStr.replace(/<img /g,`<img style="width:100%"`)
				console.log(data);
				
			}).catch((err) => {
				console.log(err);
				
			});
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		//消息列表
		toMsg(){
			uni.navigateTo({
				url:'../msg/msg'
			})
		},
		// 客服
		toChat(){
			uni.navigateTo({
				url:"../msg/chat/chat?name=客服008"
			})
		},
		// 分享
		share(){
			this.shareClass = 'show';
		},
		hideShare(){
			this.shareClass = 'hide';
			setTimeout(() => {
				this.shareClass = 'none';
			}, 150);
		},
		//收藏
		keep(){
			this.isKeep = this.isKeep?false:true;
		},
		// 加入购物车
		joinCart(){
			if(this.selectSpec==null){
				return this.showSpec(()=>{
					uni.showToast({title: "已加入购物车"});
				});
			}
			uni.showToast({title: "已加入购物车"});
		},
		//立即购买
		buy(){
			// if(this.selectSpec==null){
			// 	return this.showSpec(()=>{
			// 		this.toConfirmation();
			// 	});
			// }
			uni.navigateTo({
				url:'/pages/order_details/order_details'
			})
			this.toConfirmation();
		},
		//商品评论
		toRatings(){
			uni.navigateTo({
				url:'ratings/ratings'
			})
		},
		//跳转确认订单页面
		toConfirmation(){
			let tmpList=[];
			let goods = {id:this.goodsData.id,img:'../../static/img/goods/p1.jpg',name:this.goodsData.name,spec:'规格:'+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};
			tmpList.push(goods);
			uni.setStorage({
				key:'buylist',
				data:tmpList,
				success: () => {
					uni.navigateTo({
						url:'../order/confirmation'
					})
				}
			})
		},
		//跳转评论列表
		showComments(goodsid){
			
		},
		//选择规格
		setSelectCombo(item){
			this.selectCombo.trid = item.trid;
			this.selectCombo.tcid = item.id;
			this.selectCombo.comboname = item.comboname
			request.requestGet(request.getUrl('linePrice')+item.id)
			.then((result) => {
				let data = result .data.data
				this.datePrice = data;
			}).catch((err) => {
				console.log(err)
			});
			
		},
		//减少数量
		sub(type){
			switch (type) {
				case 'adult':
					if(this.selectCombo.adultnum<=0){
						return;
					}
					this.selectCombo.adultnum--;
					break;
			
				case 'child':
					if(this.selectCombo.childnum<=0){
						return;
					}
					this.selectCombo.childnum--;
					break;
			}
		},
		//增加数量
		add(type){
						switch (type) {
				case 'adult':
					this.selectCombo.adultnum++;
					break;
			
				case 'child':
					this.selectCombo.childnum++;
					break;
			}
		},
		//跳转锚点
		toAnchor(index){
			this.selectAnchor = index;
			uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
		},
		//计算锚点高度
		calcAnchor(){
			this.anchorlist=[
				{name:'展示图',top:0},
				{name:'套餐',top:0},
				{name:'详情',top:0},
				
			]
			let commentsView = uni.createSelectorQuery().select("#combo");
			// console.log(commentsView)
			commentsView.boundingClientRect((data) => {
				let statusbarHeight = 0;
				//APP内还要计算状态栏高度
				// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
				// #endif
				let headerHeight = uni.upx2px(100);
				console.log(data)
				this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
				this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;
			}).exec();
		console.log(this.anchorlist)
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		//服务弹窗
		showService() {
			console.log('show');
			this.serviceClass = 'show';
		},
		//关闭服务弹窗
		hideService() {
			this.serviceClass = 'hide';
			setTimeout(() => {
				this.serviceClass = 'none';
			}, 200);
		},
		//规格弹窗
		showSpec(fun) {
			console.log('show');
			this.specClass = 'show';
			this.specCallback = fun;
		},
		specCallback(){
			return;
		},
		//关闭规格弹窗
		hideSpec() {
			this.specClass = 'hide';
			//回调
			this.selectCombo&&this.specCallback&&this.specCallback();
			this.specCallback = false;
			setTimeout(() => {
				this.specClass = 'none';
			}, 200);
		},
		discard() {
			//丢弃
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	@import './scss/product.scss'
</style>
