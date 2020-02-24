<template>
	<view  :class="{'content':true,'ovher_body':cateMaskState===1}">
		<view class="spot" v-if="spot">
			<view>首页</view>
			<view>购物车</view>
			<view>商品分类</view>
			<view>个人中心</view>
			<text class="spot_s"></text>
		</view>
	
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="tab-bar">
				<scroll-view scroll-x="true" class="kite-classify-scroll">
					<view class="scroll_flex" style="display: flex;padding: 0 10upx;">
						<block  v-for="tag in cateTags" :key="tag.cate">
							<view class="tab-item"  :class="activeCate===tag.cate?'active':''" @tap="changeCate(tag.cate)">
							{{tag.name}}
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
			<view class="filter-bar">
				<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
					{{pl_name ||'综合排列'}}
				</view>
				<view class="nav-item" :class="{current: filterIndex === 3}" @click="tabClick(3)">
					出发地
				</view>
				<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
					销量
				</view>
				<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
					<text>价格</text>
					<view class="p-box">
						<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="yticon icon-shang"></text>
						<text :class="{active: priceOrder === 2 && filterIndex === 2}" class="yticon icon-shang xia"></text>
					</view>
				</view>
				<text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')"></text>
				<view class="tips_pl" v-if="tips_type">
					<block v-for="(item,index) in tips_pl" :key="index">
						<view class="tips_content" :class="{'tips_type':item.id==tips_id}" @click="tips_pl_fun(item)">
							<view class="name">{{item.name}}</view>
							<view class="iconfont" v-if="tips_id==item.id">&#xe63f;</view>
						</view>
					</block>
				</view>
				<view class="tips_tj tips_pl" v-if="core_type">
					<scroll-view scroll-y="true" style="height: 500upx;">
						<view class="tj_title">推荐城市</view>
						<view class="tj_list">
							<view class="item">
								<view class="item_name">长沙</view>
								<view class="bl">48.79%选择</view>
							</view>
							<view class="item">
								<view class="item_name">长沙</view>
								<view class="bl">48.79%选择</view>
							</view>
						</view>
						<view class="tj_title">热门出发城市</view>
						<view class="core_cs" >
							<block v-for="(item,index) in tj_cs" :key="index">
								<view class="core_cs_list" :class="{'core_type':item.id==core_id}" @click="core_pl_fun(item)">{{item.name}}</view>
							</block>
						</view>
					</scroll-view>
				</view>
			</view>
			</view>
		<!-- 首页过来的分类有banner图片 -->
		<view class="index_banner" v-if="type2 == 'index'">
			<image :src="banner_img" mode="aspectFit" style="height:320rpx"></image>
		</view>
		<view class="box3_more">
			<scroll-view scroll-x="true" class="kite-classify-scroll">
				<view class="more_list">
					<block v-for="(item,index) in box3_more" :key="index">
						<view class="item" :class="{'more_type':item.id==more_id}" @click="more_pl_fun(item)">{{item.name}}</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<view class="goods-list">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@click="navToDetailPage(item.id)"
			>
				<view class="image-wrapper">
					<view class="item_img_box"><span class="type">{{item.departure_cn}}出发</span><image :src="item.thumb" mode="aspectFill"></image></view>
				</view>
				<!--  -->
				<view class="others">
					<text class="title clamp">{{item.name}}</text>
					<view class="sell-point">
						<span class="point" v-for="(point,index) in item.selling_point" :key="index">{{point}}</span>
					</view>
					<view class="others_time" style="padding: 5upx 0;">
						<view class="iconfont" style="color: rgb(255, 221, 0);margin-right: 10upx;">&#xe634;</view>
						<view class="others_time_content" style="font-size: 24upx;color: #999999;">班期：02/22-04/25</view>
					</view>
					<view class="price-box">
						<view class="price">
						{{item.market_price}} 
						</view>起
					</view>
					
					<view class="bottom-info">
						<view class="cate" style="display: flex;align-items: center;">
							<text class="iconfont" style="color: #999999;">&#xe60d;</text>
							<text>{{item.cate}}</text>
						</view>
						<view class="sales">
							<text style="margin-right: 10upx;">已售{{item.sales}}</text>
							<text>{{item.sales}}评价</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType">
			<!-- <view>是的发送到发送到</view> -->
		</uni-load-more>
		<!--  -->
		<view class="cate-mask " :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view class="cate_top" scroll-y="true">
					<view class="cate_tit">
						<view class="qb_cate">全部分类</view>
					</view>
					<view class="scroll">
						<scroll-view scroll-y class="cate-list">
							<view class="scroll_content">
								<view class="scroll_list">
									<view :class="{'active':item.cate == activeCate}" v-for="item in cateTags" :key="item.cate" @tap="cut_nav('category',item.cate)">{{item.name}}</view>
								</view>
							</view>
							<view class="price_range">
								<view class="price_tit">价格区</view>
								<view class="price_content">
									<input type="number" placeholder="最低价" placeholder-class="place" v-model="low"/>
									<view>—</view>
									<input type="number" placeholder="最高价" placeholder-class="place" v-model="high"/>
								</view>
								<view class="options">
									<block v-for="(item,index) in price" :key="index">
										<view class="options_list" @click="priceFun(item.id)" :class="{red:id==item.id}">
											<view>{{item.prices}}</view>
										</view>
									</block>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="buttons">
						<view @click="toggleCateMask">取消</view>
						<view @tap="confirmFun">确定</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import request from '../../tool/request.js'
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0, 
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				salesOrder : 1,//1销量从低到高 2销量从高到低
				cateList: [{id:1,name:"护肤"},{id:11,name:"美妆护肤"},{id:10,name:"美妆护肤"},{id:12,name:"美妆护肤"},{id:13,name:"美妆护肤"},{id:14,name:"美妆护肤"},{id:15,name:"美妆护肤"},{id:16,name:"美妆护肤"}],
				goodsList: [],
				page : 0,
				len:7,
				row:3,
				price:[{id:1,prices:"0-100"},{id:2,prices:"100-500",},{id:3,prices:"500-1000"}],
				low:"",
				high:"",
				id:0,
				deg:0,
				spot:false,
				type : '',//判断是分类页面还是搜索页面
				type2:'',//判断是不是首页，首页会传一张图片
				banner_img : '',//首页的头部分类banner
				//右边分类
				confirm: false,//判断是否有筛选
				category:[],//侧边所有分类
				// activeCate:1462,//分类id
				 activeCate:1462,//分类id
				category_attribution: '',//分类属性
				attribution_list:[],//选中的属性		
				attribution_str :'',//选出选中的属性字符串
				cateTags:null,
				activeCate:0,
				tips_pl:[{name:'综合排序',id:1},{name:'销量排序',id:2},{name:'低价排序',id:3},{name:'高价排序',id:4},{name:'评价排序',id:5},],
				tips_id:1,
				pl_name:'',
				tips_type:false,
				tj_cs:[{name:'上海',id:1},{name:'上海',id:2},{name:'上海',id:3},{name:'上海',id:4},],
				core_id:0,
				core_type:false,
				box3_more:[{name:'曼谷+普吉岛',id:1},{name:'曼谷+清迈',id:2},],
				more_id:0,
			};
		},
		onNavigationBarButtonTap(e) {
			this.spot=!this.spot
		},
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			// this.$api.msg('点击了搜索框');
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		async onShow() {
			//初始化
			let good_api
			let _this = this
			this.type = uni.getStorageSync('type');
			
			if(this.type =='search'){
				this.keyword = uni.getStorageSync('keyword');
				
			}else{
				this.keyword=''
			}
			if(_this.type =='search'&&_this.keyword!==''){
			   good_api = await request.requestGet('goodslist',{
					name : _this.keyword,
					page:_this.page
				})
			}
			else{
				good_api = await request.requestGet(request.getUrl('goodslist'))
			}
			this.goodsList = good_api.data.data.lists;
			console.log("onshow侧边导航",good_api)
			// _this.category = good_api.data.data.category//所有分类
			// _this.activeCate = _this.category[0].id//选中的分类id
			// _this.category_attribution = good_api.data.data.category_attribution//分类属性
			console.log("分类",_this.category )
		},
		onLoad(options){
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			console.log(options);
			this.type = uni.getStorageSync('type');
			
			if(this.type =='search'){
				this.keyword = uni.getStorageSync('keyword');
				
			}else{
				this.keyword=''
			}
			this.loadData();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},

		methods: {
			//确定筛选
			confirmFun(){
				this.confirm = true
				this.loadData('refresh')
				this.toggleCateMask()
			},
			
			//新添start
			tips_pl_fun(item){
				this.tips_id=item.id
				this.pl_name=item.name
				this.tips_type=false
			},
			core_pl_fun(item){
				this.core_id=item.id
				// this.pl_name=item.name
				this.core_type=false
			},
			more_pl_fun(item){
				this.more_id=item.id
				// this.pl_name=item.name
				// this.core_type=false
			},
			//结束end
			//分类属性切换
			cut_nav(type,id,fid){  
				console.log("筛选",type) 
				// 所有分类
				if(type == 'category') {
					this.activeCate = id
					console.log("切换的分类id",this.activeCate)
				}
			},
			// 全部
			whole(){
				if(this.deg==180){
					this.deg=0
				}else{
					this.deg=180
				}
			},
			//加载分类
			async loadCateList(fid, sid){
				let list = await this.$api.json('cateList');
				let cateList = list.filter(item=>item.pid == fid);
				
				cateList.forEach(item=>{
					let tempList = list.filter(val=>val.pid == item.id);
					item.child = tempList;
				})
				
				this.cateList = cateList;
				console.log("侧边导航_数据",this.cateList)
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				if(type === 'refresh'){
					// 如果是下拉刷新 或者是切换分类时也需要清空数据
					this.goodsList = [];
				    this.page = 0
				}
				this.page++
				let goodsList = null
				let data = null
				console.log("类型",this.type)
				if (this.type==='search') {
					this.activeCate=0;
				}
				    console.log("类型xxxxxx",this.confirm)
					let good_api
					//判断是否有筛选行为
					if(!this.confirm){
						console.log("没有筛选")
						good_api = await request.requestGet(request.getUrl('goodslist')+'/cate/'+this.activeCate+'/page/'+this.page)
					}
					else{
						console.log("筛选",this.activeCate)
						let parameter = {}
						parameter.page = this.page//分页
						parameter.cate = this.activeCate//分类id（例如：33）
						if( this.low!='') {
							parameter.price = this.low + '_' + this.high//筛选（例如：0_100，100_300）
						}
						if( this.attribution_str != ''){
							parameter.attr = this.attribution_str
						}
						
						console.log("参数",parameter)
						good_api = await request.requestGet('goodslist',parameter)
						console.log("请求",good_api)
					}
					let list_s={
						name:'推荐',
						cate:1
					}
					// good_api.data.data.supportCate.splice(0,0,list_s);
					// good_api.data.data.supportCate.unshift(list_s)
					this.cateTags = good_api.data.data.supportCate
					console.log(this.cateTags,'==============')
					data = good_api.data.data.lists
					console.log("-=-=-=api数据",good_api)
					// console.log("api数据",data)
						goodsList = data
						
				//    sort数组排序    1代表是销量     2  代表是价格
				if(this.filterIndex === 1){
					goodsList.sort((a,b)=>b.sales - a.sales)
				}
				if(this.filterIndex === 2){
					goodsList.sort((a,b)=>{
						if(this.priceOrder == 1){
							return a.market_price - b.market_price;
						}
						return b.market_price - a.market_price;
					})
				}
				// 拼接数据
				this.goodsList = this.goodsList.concat(goodsList);
				
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了) 如果请求的数据为空 loadingType就设为nomore
				this.loadingType  = data.length == 0 ? 'nomore' : 'more';
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
				
				console.log("商品列表数据",this.goodsList)
			},
			//筛选点击
			tabClick(index){
				console.log(index)
				if(index==0){
					this.tips_type=!this.tips_type
					this.core_type=false
					this.priceOrder = 0;
					console.log(this.tips_type)
				}
				if(index==3){
					this.core_type=!this.core_type
					this.tips_type=false
				}
				// 如果不是销量或者价格就直接return
				if( (this.filterIndex === index && index !== 2) && (this.filterIndex === index && index !== 1)){
					return;
				}
				this.filterIndex = index;
				if(index === 1){
					this.salesOrder = this.salesOrder === 1 ? 2: 1;
					console.log(this.salesOrder)
				}
				if(index === 2){
					this.priceOrder = this.priceOrder === 1 ? 2: 1;
				}else if(index===3){
					
					
				}
				else if(index==0){
					
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 0);
				// uni.showLoading({
				// 	title: '正在加载'
				// })
			},
			//显示分类面板
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(cate){
				if (this.activeCate===cate) {
					this.activeCate = 0
				}else{
					this.activeCate = cate;
				}
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				// uni.showLoading({
				// 	title: '正在加载'
				// })
			},
			//详情
			navToDetailPage(id){
				//测试数据没有写id，用title代替
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			stopPrevent(){},
			priceFun(id){
				this.id=id
				if(id==1){
					this.low=0
					this.high=100
					
				}else if(id==2){
					this.low=100
					this.high=500
				}else{
					this.low=500
					this.high=1000
				}
			}	
		},
	}
</script>

<style lang="scss">
	@import './scss/list.scss'
</style>
