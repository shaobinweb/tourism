<template>
	<!-- 选中和未选中控制default类名    successicon是根据官方的组件自定义的icon图标  选中就加successicon  默认就为default-->
	<view class="cart">
		<!-- 购物车列表 -->
		<view class="cart_list" v-for="item in cart_list" :key="item.id">
			<view class="cart_list_icon" >
				 <icon v-if=" item.selected == 0" type="success default "  size="26" @tap="selectFun({id:item.id,value:'selected'})"/>
				 <icon v-if=" item.selected == 1" type="success successicon "  size="26" @tap="selectFun({id:item.id,value:'unselected'})"/>
			</view>
			<view class="cart_list_img">
				<image :src="item.goods_info.thumb" mode="aspectFill" @tap="go_product(item.goods_info.id)"></image>
			</view>
			<view class="cart_list_info">
				<view class="list_info_top" @tap="go_product(item.goods_info.id)">{{item.goods_info.title}}</view>
				<view class="list_info_mid">{{item.spec_text}}</view>
				<view class="list_info_bottom">
					<view class="list_price">
						￥{{item.goods_info.shop_price -item.goods_info.cecn_num}}+{{item.goods_info.cecn_num}} <text class="price_type">购物金</text>
					</view>
					<view class="list_add_num">
						<view class="good_n_right">
							<view :class="{'good_btn':true, 'no_add_jian': item.goods_num <=1}" @tap="add_minus_fun('minu',item.id)">-</view>
							<view class="num_text">
							<input class="num_input" :value="item.goods_num" type="number" disabled="true"/>
							</view>
							<view class="good_btn" @tap="add_minus_fun('add',item.id)">+</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下方的统计nav -->
		<view class="total_nav">
			<view class="cart_list_icon" @tap="checkallFun">
				 <icon v-if=" !is_checkAll" type="success default "  size="26"/>
				 <icon v-else type="success successicon "  size="26"/>
				 <text class="cart_quan">全选</text>
			</view>
			<view class="total_nav_right">
				<block v-if="go_btn" >
					<view class="total_right_num">共{{good_num}}件</view>
					<view class="total_right_price">
						总计:
						<label class="total_pri_t">{{total_price}}+{{cecn_num}} 购物金</label>
					</view>
					<block v-if="cart_list.length == 0">
						<view class="total_btn_go total_btn" style="background: #e8e8e8;color: #333;">去结算</view>
					</block>
					<block v-else>
						<view class="total_btn_go total_btn" @tap="goBuy_cartFun">去结算</view>
					</block>
				</block>
				<view v-else class="total_btn_go total_btn" @tap="del_cartFun">删除</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<block v-if="cart_list.length == 0">
			<view class="no_good">
				<image src="../../static/shopcart.png" mode="aspectFit"></image>
				<view class="no_good_btn" @tap="go_goodList">前去购物</view>
			</view>
			<view class="f-header m-t">
				<view class="tit-box">
					<view class="tit_box_line"></view>
					<text class="tit"> 为你推荐</text>
					<view class="tit_box_line"></view>
				</view>
			</view>
			<view class="guess-section">
				<view 
					v-for="(item, index) in recommend_list" :key="index"
					class="guess-item"
					@click="navToDetailPage({id:item.id})"
				>
					<view class="item_img_box image-wrapper">
						<image :src="item.thumb" mode="aspectFill" style="height:100% !important"></image>
						<view class="recommend_box">
							<text class="recommend_type">新品</text>
							<label class="recommend_price">¥{{item.shop_price}}</label>
						</view>
					</view>
					<view class="recommend_bottom">
						<text class="title clamp">{{item.title}}</text>
						<label class="recommend_buy_type">现金+购物金</label>
						<text class="price">{{item.shop_price}}+{{item.cecn_num}}购物金</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default { 
		data() {
			return {
				good_number : 2,
				go_btn : true,
				is_checkAll : false,
				cart_list : [],
				cecn_num:0,//购物金
				end_id:"",
				total_price : "0.00",
				good_num :0,
				recommend_list : [], 
			}
		},
		methods: {
			//购物车为空的去购买按钮
			go_goodList(){
				// uni.navigateTo({
				// 	url:'/pages/product/list?type=cart'
				// })
				uni.switchTab({
					url:'/pages/category/category'
				})
			},
			//详情页
			navToDetailPage(obj_id) {
				console.log("商品跳转id",obj_id.id)
				uni.navigateTo({
					url: `/pages/product/product?id=${obj_id.id}`
				})
			},
			//点击商品标题跳转到详情页
			go_product : async  function(id) {
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			//获取购物车
			get_cart:async function  () {
				
				let cart_list = await request.requestGet('cart_list')
				this.cart_list = cart_list.data.data.cartList
				console.log("购物车的数据",cart_list)
				//选中商品的总价
				this.total_price = cart_list.data.data.total_price - cart_list.data.data.cecn_num
				this.cecn_num = cart_list.data.data.cecn_num
				console.log("选择的商品总价xxxxxxx",this.cecn_num)
				//如果购物车为空编辑状态就恢复默认
				if(this.cart_list.length == 0){
					let pages = getCurrentPages();
					let page = pages[pages.length - 1]
					var currentWebview = page.$getAppWebview();
						currentWebview.setTitleNViewButtonStyle(0, {  
							text: "编辑",  
					}); 
					this.go_btn = true
				}
				//判断是否被选中
				this.if_checkallFun()
				
			},
			//删除
			del_cartFun :async  function ( e ){
				this.get_idFun()
				uni.showLoading({
					title:'删除中'
				})
				let del_api = await request.requestPost('del_cart',{ids:this.end_id})
				if ( del_api.data.errorCode == 110043){
					uni.hideLoading()
				}
				//刷新页面
				this.get_cart()
				this.$api.msg('删除成功')
			},
			// 商品加减
			add_minus_fun : async function ( type,id ){
				let _this = this
				let num = 0
				
				this.cart_list.forEach( item =>{
					if( type == "add"){
						if( item.id == id){
							num = item.goods_num +1
						}	
					}
					else{
						if( item.id == id){
							if( item.goods_num <= 1){
								this.$api.msg('商品件数不能小于1')
								return
							}
							num = item.goods_num -1
						}
					}
				})
				console.log("数量",num)
				if( type == "add" ){
					let cart_add_num = await request.requestPost('cart_add_num',{
						cart_id : id,
						num : 1
					})
				}
				else{
					let cart_add_num = await request.requestPost('reduce_num',{
						cart_id : id,
						num : -1
					})
				}
				setTimeout(function(){
					_this.get_cart()
				},200)
				
			},
			//选中商品
			selectFun : async function ( pos ){
				let _this = this
				let data_api = await request.requestPost('choice_cart',{id:pos.id,value:pos.value})
				setTimeout(function(){
					_this.get_cart()
					_this.if_checkallFun()
				},200)
				console.log(data_api)
				console.log("id",id)
			},
			//全选
			checkallFun : async function ( e ){
				let _this = this
				_this.get_idFun()
				//如果购物车为0就return
				if( _this.cart_list.length == 0) {
					_this.$api.msg('购物车空空如也哦!')
					return
				}
				// 先判断是否有全选状态,取反
				let checked = !this.is_checkAll
				// _this.cart_list.forEach( item =>{
				// 	item.selected = checked
				// })
				// _this.is_checkAll = checked
				let id = ''
				_this.cart_list.forEach( item =>{
					let s = item.id
					id = id + ','+ s
				})
				id = id.substring(1)
				if( !checked ){
					// 全不选
					console.log("测试111",id)
					let data_api = await request.requestPost('choice_cart',{id:id,value:'unselected'})
					console.log(data_api)
					this.good_num = 0
					// this.total_price = 0
				}
				else{
					console.log("测试2222",id)
					let data_api = await request.requestPost('choice_cart',{id:id,value:'selected'})
					console.log(data_api)
				}
				setTimeout(function(){
					_this.get_cart()
					_this.if_checkallFun()
				},200)
				
			},
			//判断是否全选
			if_checkallFun : function( e ){
				let _this = this
				this.good_num = 0//每次执行先清0
				//定义一个计算值，判断这个值和数组长度相等就是全选
				let count = 0
				_this.cart_list.forEach( item => {
					// 只要有一个没选中就为false
					if ( item.selected === 0){
						_this.is_checkAll = false
					}
					else{
						count ++
						this.good_num += item.goods_num
					}
				})
				if( count == _this.cart_list.length){
					console.log("全选xxxxx",count)
					_this.is_checkAll = true
				}
				//如果购物车为0，下方的选中按钮就变灰
				if( _this.cart_list.length == 0){
					this.is_checkAll = false
				}
			},
			//获取选中的购物车id拼接字符串
			get_idFun: function(){
				let _this = this
				let del_cart_id = ""
				_this.cart_list.forEach( item =>{
					if(item.selected){
						del_cart_id = del_cart_id+ item.id+','
					}
				})
				//去掉最后的逗号
			    this.end_id = del_cart_id.substring(0,del_cart_id.length-1)
			},
			//去购买
			goBuy_cartFun : function ( e ){
				uni.navigateTo({
					url:'../order/createOrder?type=cart'
				})
			}
		},
		async onShow() {
			//为你推荐
			let index_comData = await request.requestGet('index_recommend',{
				page : 1
			})
			this.recommend_list = index_comData.data.data.goods
			console.log("推荐的商品",index_comData) 
			//登陆才能请求购物车
			if(uni.getStorageSync('is_login')){
				//获取列表
				this.get_cart()
				//获取购物车id拼接字符串
				this.get_idFun()
			}
			else{
				this.$api.msg('请登陆')
			}

		},
		// #ifndef MP
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			console.log(e.text)
			if (index === 0) {
				// 点击编辑  切换状态
				this.go_btn = !this.go_btn
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				if(!this.go_btn){
					var currentWebview = page.$getAppWebview();
					currentWebview.setTitleNViewButtonStyle(0, {  
						text: "完成",  
					}); 
				}
				else{
					var currentWebview = page.$getAppWebview();
					currentWebview.setTitleNViewButtonStyle(0, {  
						text: "编辑",  
					}); 
				}
			} 
		}
		// #endif
	}
</script>

<style lang='scss'>
	uni-page-wrapper{ padding-bottom:200rpx}
	page{ background: #f0f0f0; }
	.no_good{ width:100%;height:auto;display: flex;flex-direction: column;align-items: center;justify-content: center;margin-top:60rpx;
		image{ width:220rpx;height: 170rpx;}
	}
	.no_good_btn{ width:240rpx;height: 62rpx;background: #e4393c;font-size:28rpx;color: #fff;display: flex;align-items: center;justify-content: center;margin-top:40rpx;margin-bottoom:40rpx}
	.cart{ 
		width:auto;height: auto;padding:0rpx 20rpx 0rpx 20rpx;margin-bottom: 120rpx;
		.cart_list{ width:100%;height: auto;padding:30rpx;background: #fff;border-radius: 10rpx;font-size: 24rpx;display: flex;align-items: center;justify-content:flex-start;margin-top:20rpx;
			.cart_list_icon{ }
			.cart_list_img{ width:150rpx;height: 150rpx;border-radius: 10rpx;margin-left:30rpx;
				image{ width:100%;height: 100%;border-radius: 10rpx;}
			}
			.cart_list_info{ flex: 1;margin-left:20rpx;display: flex;flex-direction: column;justify-content: space-between;height: 150rpx;
				.list_info_top{ color: #333;line-height: 32rpx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
				.list_info_mid{ line-height: 28rpx;color: #999;}
				.list_price{ font-size:28rpx;color:#e4393c}
				.price_type{ margin-left:10rpx;font-size: 24rpx;}
				.list_info_bottom{ display: flex;justify-content: space-between;align-items: center;}
				/* 加减操作按钮 */
				.good_number{ width:100%;height: 48rpx;display: flex;justify-content: space-between;align-items: center;}
				.good_n_left{ font-size:30rpx;color: rgb(51, 51, 51);}
				.good_n_right{ display: flex;justify-content: center;align-items: center;border:1px solid #ccc;height: 48rpx;}
				.num_input{ font-size: 28rpx;border:0;width:80rpx;height: 48rpx;text-align: center;margin-left:8rpx;margin-right:8rpx;border-radius: 8rpx;}
				.good_btn{ width:48rpx;height: 48rpx;display: flex;justify-content: center;align-items: center;border-radius: 8rpx;font-size: 50rpx;color: #666;}
				/*  #ifdef  H5  */
				.good_btn{ margin-top:-8rpx}
				/*  #endif  */
				.no_add_jian{ color:#ccc}
				.num_text{ border-left:1px solid #ccc;border-right:1px solid #ccc}
			}
		}
		/* 下方的统计nav */
		.total_nav{ width:100%;height: auto;background: #FFFFFF;position: fixed;bottom:0rpx;left:0;right:0;padding:10rpx 20rpx;font-size: 24rpx;display: flex;align-items: center;justify-content: space-between;z-index:100}
		/*  #ifdef  H5  */
		.total_nav{ bottom:116rpx}
		/*  #endif  */
		.cart_list_icon{ display: flex;align-items: center;}
		.cart_quan{ color: #666;font-size: 28rpx;margin-left:14rpx}
		.total_nav_right{ display: flex;align-items: center;justify-content: center;z-index:100}
		.total_btn{ height: 70rpx;line-height: 70rpx;width:180rpx;font-size: 28rpx;border-radius: 1998rpx;color: #fff;text-align: center;}
		.total_btn_go{ background: linear-gradient(to right, #FF6600 0%, #E9483B 100%);margin-left:20rpx;}
		.total_right_num,.total_right_price{ color:#999;font-size: 24rpx;margin-right:10rpx}
		.total_pri_t{ color:#E75246;font-size: 28rpx;margin-left:10rpx}
		
		/* 购物车推荐 */
		.f-header{
			height: 100upx;
			padding: 6upx 30upx 8upx;
			background: rgb(239, 239, 240);
			margin-top:0px;
			image{
				flex-shrink: 0;
				width: 80upx;
				height: 80upx;
				margin-right: 20upx;
			}
			.tit-box{
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
			}
			.tit{
				font-size: 32rpx;
				color: rgba(51, 51, 51, 1);
				font-weight: 500;
				line-height: 1.3;
				margin:0 60rpx;
			}
			.tit2{
				font-size: $font-sm;
				color: $font-color-light;
			}
			.icon-you{
				font-size: $font-lg +2upx;
				color: $font-color-light;
			}
		}
		/* 猜你喜欢 */
		.guess-section{
			display:flex;
			flex-wrap:wrap;
			width:100%;
			padding: 0 30rpx 40rpx 30rpx;
			background: rgb(239, 239, 240);
			padding-bottom:60px !important;
			.guess-item{
				position: relative;
				display:flex;
				flex-direction: column;
				width: 48%;
				padding-bottom: 10rpx;
				border-radius: 14rpx;
				background: #ffffff;
				margin-bottom:20rpx;
				&:nth-child(2n+1){
					margin-right: 4%;
				}
			}
			.image-wrapper{
				width: 100%;
				height: 330upx;
				border-radius: 3px 3px 0px 0px;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
					opacity: 1;
				}
			}
			.title{
				font-size: 28rpx;
				color: rgba(51, 51, 51, 1);
				
			}
			.price{
				font-size: 24rpx;
				color: rgba(204, 45, 30, 1);
				line-height: 1;
				font-weight: bold;
			}
			.recommend_buy_type{ width:100%;height: auto;color: rgba(153, 153, 153, 1);font-size: 24rpx;display: block;margin:10upx 0px 0 0}
			.recommend_buy_type{ width:100%;height: auto;color: rgba(153, 153, 153, 1);font-size: 24rpx;display: block;margin:10upx 0px 0 0}
			.tit_box_line{ width:72rpx;height: 1px;background: #cdced2;}
			.recommend_box{ width: auto;height:42rpx;background: rgba(255, 255, 255, 1);border:2rpx solid rgba(204, 45, 30, 0.6);position: absolute;left:0;bottom:0}
			.recommend_type{ display: inline-block;padding:0px 12rpx;line-height: 38rpx;background: #CC2D1E;color: #FFFFFF;font-size: 24rpx;}
			.recommend_price{ display: inline-block;color: #CC2D1E;background: #fff;padding:0 12rpx;text-align: center;line-height: 38rpx;font-size: 24rpx;}
			.recommend_bottom{ padding-left:12rpx;padding-top:8rpx}
		}
	}
	
</style>
