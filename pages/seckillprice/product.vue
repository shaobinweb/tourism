<template>
	<view :class="{'container':true, 'product':true,'over_body':over_body}">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image
							:src="item.image_url" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 抢购倒计时 -->
		<view class="countdown">
			<view class="countdown_n1">
				<view class="c_n1_left">¥{{good_data.shop_price || 0}}</view>
				<view class="c_n1_right">
					<view class="n1_price">¥{{good_data.market_price || 0}}</view>
					<view class="n1_good_num">剩余{{good_data.stock || 0}}件</view>
				</view>
			</view>
			<view class="countdown_n2">
				<view class="n2_end_title">距结束还剩</view>
				<view class="n2_end_time">{{h}} 时 {{m}} 分 {{s}} 秒</view>
			</view>
		</view>
		<view class="introduce-section">
			<text class="title">{{good_data.title || ''}}</text>
			<view class="title_desc">
				{{good_data.goods_remark || ''}}
			</view>
			<view class="price_type">现金+购物金</view>
			<view class="price-box">
				<view class="price-box-left">
					<text class="price-tip">¥</text>
					<text class="price">{{good_data.shop_price || 0}} </text>
					<!-- <text class="price">{{(good_data.shop_price - good_data.cecn_num) || 0}}+{{good_data.cecn_num || 0}} </text> -->
					<!-- <label class="price_type_text"> 购物金</label> -->
				</view>
				<view class="price-box-right">
					<text class="right-tip">¥</text>
					<text class="right_price">{{good_data.market_price || 0}}</text>
				</view>
			</view>
		</view>
		<!-- 服务项目 -->
		<view class="service_box">
			<view class="service_list">
				<view class="service_item">
					<label class="service_item_icon"></label>
					<text>商家包邮发货</text>
				</view>
				<view class="service_item">
					<label class="service_item_icon"></label>
					<text>七天退货</text>
				</view>
				<view class="service_item">
					<label class="service_item_icon"></label>
					<text>退货补运费</text>
				</view>
			</view>
		</view>
		<!-- 选择地区 -->
		<view class="location">
			<view class="location_top"  @tap="openAddres">
				<view class="location_t_l">
					<!-- 用官方的地区选择组件不支持app端 -->
					<text class="location_text">地区</text>
					<label class="location_btn" v-if="proviceShow">选择配送地区</label>
					<text class="location_btn">{{pickerText.label}}</text>
				</view>
				<view class="location_t_r">
					<text class="yticon icon-you"></text>
				</view>
			</view>
			<view class="location_bototm">
				<view class="location_t_l">
					<text class="location_text">运费</text>
					<label class="location_btn">包邮</label>
				</view>
			</view>
		</view>
		
		<view class="c-list" v-if="specList.length != 0">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">选择</text>
				<view class="con">
					<text class="selected-text">
						{{spec_str}}
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
		</view>
		
		<!-- 评价 -->
		<view class="eva-section">
			<view @tap="go_comment"  hover-class="none">
			<view class="e-header">
				<text class="tit">商品评价</text>
				<text v-if="comment_f == undefined">0</text>
				<text v-else>{{comment_f.length}}</text>
				<!-- have_comment根据是否有评论显示相对应的内容 -->
				<text class="tip" v-if="comment_f.num_total ==0">暂无评论</text>
				<text class="tip" v-if="comment_f.num_total !=0"> {{(comment_f.num_good/comment_f.num_total)*100}}%好评</text>
				
				<text class="yticon icon-you"></text>
			</view> 
			</view>
			<view class="eva-box" v-if="comment_f.num_total !=0">
				<image class="portrait" :src="(indexofFun(newest_comment.user_headpic,'127.0.0.1')) ? '../../static/missing-face.png':newest_comment.user_headpic" mode="aspectFill"></image>
				<view class="right">
					<view class="comment_rank">
						<text class="name">{{newest_comment.username}}</text>
						<sx-rate :types="0" :ids="item.id" :value="newest_comment.description_rank" disabled fontSize="12px"/>
					</view>
					<text class="con">{{newest_comment.content}}</text>
					<view class="commetn_image">
						<image v-for="(item,index) in newest_comment.image" :src="item" mode="aspectFit" :key="index"></image>
					</view>
					<view class="bot">
						<text class="attr">{{newest_comment.spec_item}}</text>
						<text class="time">{{newest_comment.add_time}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="detail-desc">
			<view class="d-header">
				<view :class="{ 'header_item': true, 'active' : good_parameter == 0}"  @tap="good_parameterFun(0)">商品详情</view>
				<view :class="{ 'header_item': true, 'active' : good_parameter == 1}"  @tap="good_parameterFun(1)">商品参数</view>
			</view>
			<rich-text :nodes="desc" v-if="good_parameter == 0"></rich-text>
			<view class="attr_list" v-if="good_parameter == 1">
				<view class="attr_list_header">商品参数</view>
				<view class="attr_list_box">
					<view class="attr_list_item" v-for="(item,index) in attr_list" :key="index">
						<view class="attr_lsit_L">{{item.attr_name}}</view>
						<view class="attr_list_R">{{item.attr_value}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<view v-if="favorite" class="p-b-btn active" @click="add_cancelFun('cancel')">
				<text class="yticon icon-shoucang nav_icon"></text>
				<text>收藏</text>
			</view>
			<view v-else class="p-b-btn"  @click="add_cancelFun('add')">
				<text class="yticon icon-shoucang nav_icon"></text>
				<text>收藏</text>
			</view>
			<view  @click="toggleSpec"  class="p-b-btn" style="position: relative;">
				<text class="yticon icon-gouwuche nav_icon"></text>
				<text class="cart_num">{{cart_num}}</text>
				<text>加入购物车</text>
			</view>
			<view class="action-btn-group">
				<block v-if="goods_stock == 0">
					<button type="primary" class=" action-btn no-border buy-now-btn" @click="toggleSpec" style="background: #e8e8e8;color:  #909399;">
						<text class="share_money">￥{{lgzShowMoney}}</text>
						<label>立即赚</label>
					</button>
					<button type="primary" class=" action-btn no-border add-cart-btn" style="background: #e8e8e8;color:  #909399;">
						<text class="share_money">￥{{fxzShowMoney}}</text>
					    <label>分享赚</label>
					</button>
				</block>
				<block v-else>
					<button type="primary" class=" action-btn no-border buy-now-btn" @click="toggleSpec">
						<text class="share_money">￥{{lgzShowMoney}}</text>
						<label>立即赚</label>
					</button>
					<button type="primary" class=" action-btn no-border add-cart-btn">
						<text class="share_money">￥{{fxzShowMoney}}</text>
					    <label>分享赚</label>
					</button>
				</block>
			</view>
		</view>
		
		<!-- 是否有库存 -->
		<view class="stock" v-if="goods_stock == 0">
			<label>该商品没有库存</label>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view 
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image  :src="spec_icon"></image>
					<view class="right">
						<!-- <text class="stock">现金+购物金</text> -->
						<view>
							<!-- <text class="price">¥{{childItem.price - good_data.cecn_num}}+{{good_data.cecn_num}}</text> -->
							<text class="price">¥{{spec_price}}+{{good_data.cecn_num}}</text>
							<label class="price_type">购物金</label>
						</view>
						
						<view class="selected">
							已选：
							<text class="selected-text">
								{{spec_str}}
							</text>
						</view>
					</view>
				</view>
				<scroll-view scroll-y style="height: 100%;padding-bottom:140rpx">
					<view v-for="(item,index) in specList" :key="index" class="attr-list">
						<text class="spe_name">{{item.name || "规格"}}</text>
						<view class="item-list">
							<!-- 循环规格和颜色   -->
							<text 
								v-for="(childItem, childIndex) in item.item" 
								:key="childIndex" class="tit"
								:class="{selected:indexofFunction(childItem.item)}"
								@click="selectSpec(childItem.spec_key)"
								:data-id = "childItem.id"
							>
								{{childItem.item}}
							</text>
						</view>
					</view>
					<!-- 选择数量 -->
					<view class="good_number">
						<view class="good_n_left">购买数量</view>
						<view class="good_n_right">
							<view :class="{'good_btn':true, 'no_add_jian': good_number <=1}" @tap="add_minus_fun('minu')">-</view>
							<view class="num_text">
							<input class="num_input" :value="good_number" type="number" disabled />
							</view>
							<view class="good_btn" @tap="add_minus_fun('add')">+</view>
						</view>
					</view>
				</scroll-view>
				<view class="spec_btn">
					<button class="btn" @click="addcar">加入购物车</button>
					<button class="btn" @click="buy">立即购买</button>
				</view>
			</view>
		</view>
		<!-- 分享 -->
		<share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></share>
		<!-- 地区选择器 插件 -->
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
	</view>
</template>

<script>
	import request from '../../tool/request.js';
	import share from '@/components/share';
	import cityDatas from '../../tool/city.area.js';
	import simpleAddress from "@/components/simple-address/simple-address.nvue";
	import SxRate from '@/components/sx-rate'
	export default{
		components: {
			share,
			simpleAddress,
			SxRate
		},
		data() {
			return {
				good_data : [],//商品信息
				good_id : 0,//商品id
				over_body : false,//选择地址隐藏body超出的部分
				
				// 新的地址插件变量
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				proviceShow: true,
	
				have_comment: true,
				good_parameter : 0,
				
				specClass: 'none',
				specSelected:[],
				good_number : 1,
				shareList: [],
				imgList: [],
				desc: '',
				specList: [],//规格
				spec_str : '',//选中的规格或默认规格'
				spec_curr : [],//提交订单需要的规格key
				comment_f : null,//评论
				attr_list : null,//商品参数
				color_img_list : null,//选中的规格信息
				spec_icon : null,//展示的规格图片
				spec_price : null ,//选择规格的价格，可能不同规格有不同价格
				fxzShowMoney : 0,//分享赚金钱
				lgzShowMoney : 0,//立即赚
				favorite: false,//判断是否被收藏
				cart_num : 0,//购物车数量
				bind_phone: false ,//判断是否绑定手机号码
				goods_stock : 1,//商品库存
				remainingd:0,//结束时间倒计时
				h:0,
				m:0,
				s:0,
				//评论statr
				newest_comment:{}
				//评论end
			};
		},
		async onLoad(options){
			let _this = this
			// _this.$api.msg(`商品id${options.id}`)
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			let id = options.id;
			this.good_id = options.id
			//获取商品详情
			let good_info = await request.requestGet(request.getUrl('goodsInfo')+id)
			let data = good_info.data.data
			//把日期转时间戳
			let time = data.promInfo.end_time
			console.log("商品详情网络请求",good_info.data.data)
			time = time.substring(0,19); 
			time = time.replace(/-/g,'/'); 
			
			let timestamp = new Date(time).getTime()
			this.remainingd = (timestamp/1000)  - Math.round(new Date().getTime()/1000);
			
			this.good_data = data.goods//商品信息
			this.imgList = data.goods_images//轮播图
			this.desc = data.goods_content//详情
			this.specList = data.filter_spec//规格
			this.spec_str = data.spec_str//选中的规格
			this.comment_f = data.comment_f//评论
			this.attr_list = data.attr_list//商品参数（区分商品详情）
			this.spec_curr = data.spec_curr//提交订单需要的商品规格
			this.color_img_list = data.color_img_list//选中的规格信息
			this.lgzShowMoney = data.lgzShowMoney //立即赚
			this.fxzShowMoney = data.fxzShowMoney//分享赚
			this.goods_stock = data.goods_stock //库存
			
			
			// 后台的富文本图片路径是相对路径,现在换成绝对路径,适用本地,线上的去掉这个
			this.desc = this.desc.replace(/src="/g,`src="http://senior.db.juntest.com/`)
			//给图片添加适配，兼容app，在css加的样式在app无效
			this.desc = this.desc.replace(/<img /g,`<img style="width:100%"`)
			 //获取规格图片，为空就默认为商品图片
			this.select_spec()
			this.cancelFun()//判断是否被收藏
			//获取购物车数量
			this.get_cart_num()
			this.shareList = await this.$api.json('shareList');
			
			//倒计时
			this.jishiqi()
			setInterval(this.jishiqi,1000);
		},
		methods:{
			// 判断选中的规格
			indexofFunction(str){
				if(this.spec_str.indexOf(str)>=0){
					return true
				}
				else{
					return false
				}
			},
			//判断头像
			indexofFun(str,endStr){
				// 判断endStr是否在str
				console.log("目标字符串xxxxxxxxxxxxxxxxxxxxxxxxxx",str)
				console.log("xxxxxxxx",endStr)
				if(str == null){
					return true
				}
				if(str.indexOf(endStr)>=0){
					return true
				}
				else{
					return false
				}
			},
			//查看评论
			go_comment(){
				uni.navigateTo({
					url:`/pages/evaluate/evaluate?good_id=${this.good_id}`
				})
			},
			//打开地址选择插件
			openAddres() {
			    this.$refs.simpleAddress.open();
			},
			//地址选择
			onConfirm(e) {
			    this.pickerText = e
				this.proviceShow = false
				console.log(this.pickerText)
			},
			//倒计时计时器
			jishiqi: function() {
				let that=this
				var dj = that.remainingd;
				if (dj <= 0) {
					that.remaining = "已过期";
				} else {
					var ddf = that.djs(dj); //格式化过后的时间
					that.remaining = ddf;
					//当前时间减去时间
					dj = dj - 1;
					that.remainingd = dj;
				}
			},
			//得到的秒换算成时分秒
			djs: function(ms) { 
				let h = parseInt(ms / (60 * 60)) ;
				if(h<10){
					h='0'+h
				}
				let m = parseInt((ms % (60 * 60)) / 60);
				if(m<10){
					m='0'+m
				}
				let s = (ms % (60 * 60)) % 60;
				if(s<10){
					s='0'+s
				}
				this.h=h
				this.m=m
				this.s=s
			},
			//判断用户是否绑定手机号码
			verifyFun: async function(){
				let _this  =this
				let verifyPhone = await request.requestGet('mobileVerfication')
				let data = verifyPhone.data.errorCode
				if( data == 200400){
					_this.$api.msg('请登陆')
					uni.navigateTo({
						url:'../phone/step1?type=register'
					})
				}
				if( data == 200100){
					_this.$api.msg('请绑定手机号码')
					uni.navigateTo({
						url:`../phone/step1?type=bind_phone`
					})
				}
				if( data == 200200){
					this.bind_phone = true
				}
				console.log("是否绑定手机号码",verifyPhone.data.errorCode)
			},
			//获取购物车数量
			get_cart_num : async function  () { 
				// let get_num = await request.requestGet('get_cart_num')
				// console.log("获取购物车的数量请求",get_num)
			},
			//加入购物车   this.verifyPhone()验证是否绑定手机号码
			addcar : async function (){
				let _this= this
				this.verifyFun()
				setTimeout(async function (){
					if(_this.bind_phone){
						let add_cart = await request.requestPost('add_cart',{
							goods_id : _this.good_id,
							spec_key : _this.spec_curr,
							goods_spec : _this.spec_curr,
							goods_num : _this.good_number
					})
					_this.$api.msg(`${add_cart.data.message}`)
					console.log("加入购物车请求",add_cart.data.message)
					}
				},300)
				
			},
			buy(){
				let _this = this
				_this.verifyFun()
				setTimeout(function(){
					console.log("购买",_this.bind_phone)
					if(_this.bind_phone){
						uni.navigateTo({
							url: `/pages/order/createOrder?goods_id=${_this.good_id}&goods_spec=${_this.spec_curr}&goods_num=${_this.good_number}&type=product`
					})
					_this.toggleSpec()
					}
				},300)
			},
			//判断是否被收藏
			 cancelFun : async function (){
				let cancel_api = await request.requestGet('collect',{
					goods_id : this.good_id
				})
				if( cancel_api.data.errorCode == 110172 ){
					this.favorite = true
				}
				console.log("判断是否被收藏",cancel_api)
			 },
			 //添加收藏
			 add_cancelFun : async function ( type ){
				 let _this = this
				 _this.verifyFun()

					 //登陆才能收藏的相关操作
				let cancel_add 
				console.log("类型收藏请求",type == 'cancel')
				console.log("收藏请求",type)
				 if( type == 'add' ){
					    cancel_add = await request.requestPost('add_collect',{
					 	goods_id : _this.good_id
					 })
					 console.log("增加收藏请求",cancel_add)
				 }
				if ( type == 'cancel' ){
				    console.log("取消收藏")
					cancel_add = await request.requestPost('cancel_collect',{
					 		goods_id : _this.good_id
					})
				_this.favorite = false
				_this.$api.msg(`${cancel_add.data.message}`)
				}
				if( cancel_add.data.errorCode == 110092 ){
					_this.favorite = true
					 _this.$api.msg(`${cancel_add.data.message}`)
				}
				console.log("收藏请求",cancel_add)
			    _this.cancelFun()

			 },
			// 选择规格更新图片方法
			select_spec : function ( ){
				let _this = this
				_this.spec_icon = _this.good_data.thumb
				//这个是更新规格的价钱
				console.log("规格详情",_this.specList)
				console.log("规格详情color_img_list",_this.color_img_list)
				if ( _this.specList.length !=0 ){
					Object.keys(_this.specList).forEach(function(key){
					    console.log(key,_this.specList[key]);
						_this.specList[key].item.forEach( item =>{
							if( _this.spec_str.indexOf(item.item) >= 0){
								_this.spec_price =  item.price - _this.good_data.cecn_num
							}
						})
					});
				}
				if ( _this.specList.length ==0 ){
					_this.spec_price =  _this.good_data.shop_price - _this.good_data.cecn_num
				}
				// 这个是更新规格弹窗的商品图片
				console.log("哈哈哈哈哈",_this.color_img_list)
				if( _this.color_img_list.length != 0){
						_this.color_img_list.forEach(item =>{
						if( _this.spec_str.indexOf(item.name)>=0){
							if( item.img == "" ){
							_this.spec_icon = _this.good_data.thumb
							console.log("规格图片",_this.spec_icon )
							}
							else{
								_this.spec_icon = item.img
							}
						}
					 })
				}
				else{
					_this.spec_icon = _this.good_data.thumb
					console.log("最后规格图片的路径else",_this.spec_icon)
				}
				
			},
			previewimg(){
				uni.previewImage({
					urls: ["https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"],
				})
			},
			stopPrevent :function(){},
			//规格弹窗开关
			toggleSpec() {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
			},
			//选择规格
			async selectSpec(sid){
			   console.log("规格的id=====",sid)
			   let _this = this
			   let Spec_data = await request.requestGet(request.getUrl('spcList')+this.good_id+'/s/'+sid)
			   let data = Spec_data.data.data
			   this.specList = data.filter_spec//更新规格数据
			   this.spec_str = data.spec_str//修改选中的规格
			   this.spec_curr = data.spec_curr//提交订单需要的商品规格 
			   //获取规格图片，为空就默认为商品图片
			   this.select_spec()
			},
			//分享
			share(){
				this.$refs.share.toggleMask();	
			},
			// 商品详情   商品参数切换
			good_parameterFun : function ( index ){
				this.good_parameter = index
			},
		    // 商品加减
			add_minus_fun : function ( type ){
				if( type == "add"){
					this.good_number ++ 
				}
				else{
					if( this.good_number <= 1){
						this.$api.msg('商品件数不能小于1')
						return
					}
					this.good_number --
				}
			}
		}	
	}
</script>

<style lang='scss'>
	.commetn_image{ width:100%;height: 100rpx;margin-bottom:20rpx;display: flex;
		image{ width:100rpx;height: 100%;margin-right:20rpx;}
	}
	/* 评分 */
	.comment_rank{ display:flex;align-items: center;
		.name{ margin-right: 40rpx;}
	}
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		
		.title{
			font-size: 24rpx;
			color: $font-color-dark;
			/* height: 40upx; */
			line-height: 36upx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: 28rpx;
			color: #999;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 28upx;
			position:relative;
		}
		.tit{
			width: auto;
			margin-right:20rpx;
			font-size: 28rpx;
			color: #999;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
				color: rgb(51, 51, 51);;
			}
			.icon-you{
				margin-left: 10upx;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		margin-bottom:60px;
		.d-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
			padding:0px 60px;	
			.header_item{
				padding-bottom:20rpx;
				background: #fff;
				position: relative;
				color: #333;
				z-index: 1;
				font-size:28rpx;
				border-bottom:2px solid #ffffff;
			}
			.active{ 
				color: #E82F0B;
				border-bottom:2px solid #E82F0B;
				transition: all 0.3s;
			}
			
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		position: relative;
		z-index:101;
		.a-t{
			display: flex;
			image{
				width: 210upx;
				height: 210upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: 36rpx;
					color: rgb(230, 8, 7);
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
				.stock{ margin-bottom:10rpx;font-size: 24rpx;margin-top:20rpx}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
			padding-bottom:20rpx;
			border-bottom:1px solid #eee;
			.spe_name{ font-size: 24rpx;color: #999;}
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #fff;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 10rpx;
				width: auto;
				height: auto;
				padding: 10rpx 10rpx;
				font-size: $font-base;
				color: #999;
				border: 1px solid #999;
				font-size: 24rpx;
			}
			.selected{
				border-color: #E60807;
				color: #E60807;
			}
		}
		.spec_btn{ position: fixed;left:0;bottom:0;right:0;display: flex;justify-content: space-between;align-items: center;height: 88rpx;}
		.price_type{ font-size: 28rpx;color: rgb(230, 8, 7);display: inline-block;margin-left:8rpx}
	}
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 101;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			height: 70%;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 0upx;
				background: #e4393c;
				font-size: 28rpx;
				color: #fff;
				flex:1;
				line-height: 88rpx;
				height: 100%;
			}
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
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left:0upx;
		bottom:0upx;
		z-index: 95;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100upx;
		background: rgba(255,255,255,.9);

		border-radius: 0upx;
		
		.p-b-btn{
			display:flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: auto;
			height: 100%;
			padding:0px 20rpx;
			.nav_icon{ margin-right:8rpx}
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 100%;
			border-radius: 100px;
			overflow: hidden;
			
			background: #e4393c;
			margin-left: 20upx;
			position:relative;
			border-radius: 0px;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
				flex-direction: column;
			}
		}
	}
	.title_desc{ font-size: 24upx;line-height: 40rpx;height: auto;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;color: blueviolet;margin-top:4rpx}
	.price_type{ color: rgba(204, 45, 30, 1);font-size: 24rpx;font-weight: bold;margin-top:6rpx}
	.price-tip{ color:rgba(204, 45, 30, 1);font-weight: bold;}
	.price { color:rgba(204, 45, 30, 1);font-weight: bold;}
	.price-box-right{ margin-left:40rpx;color: rgb(153, 153, 153);}
	.right-tip,.right_price{ font-weight: bold;}
	.right_price{ text-decoration:line-through}
	.price_type_text{ font-size: 28rpx;color: rgba(204, 45, 30, 1);font-weight: bold;margin-left:8rpx}
	.service_box{ width: 100%;height: 80rpx;background: #ffffff;font-size: 24rpx;color: #999;display: flex;flex-direction: row;padding:0px 30rpx;margin-bottom:20rpx}
	.service_list{ width:100%;height: 100%;border-top:1px solid #ddd;display: flex;justify-content: space-between;align-items: center;}
	.service_item{ display: flex;align-items: center;justify-content: center;padding-right: 20rpx;}
	.service_item_icon{ width:28rpx;height: 28rpx;display: inline-block;border-radius: 100%;background: url(../../static/sure.png);background-size: 100% 100%;margin-right:10rpx}
	.location{ width:100%;height: auto;background: #ffffff;margin-bottom:20rpx;padding:0px 24rpx;}
	.location_top{display: flex;justify-content: space-between;align-items: center;height: 80rpx;width:100%}
	.location_text{ font-size: 28rpx;color: #999;display: inline-block;height: 80rpx;line-height: 80rpx;text-align: center;}
	.location_btn{ font-size: 28upx;color: #666;display: inline-block;margin-left:20rpx;height: 80rpx;line-height: 80rpx;text-align: center;}
	.location_t_r{ height: 80rpx;line-height: 80rpx;text-align: center;}
	.share_money{ display:block;height: 40rpx;}
	/* 购买数量 */
	.good_number{ width:100%;height: 40px;margin-top:10rpx;display: flex;justify-content: space-between;align-items: center;}
	.good_n_left{ font-size:30rpx;color: rgb(51, 51, 51);}
	.good_n_right{ display: flex;justify-content: center;align-items: center;}
	.num_input{ font-size: 28upx;background: #f6f6f6;border:0;width:80rpx;height: 65rpx;text-align: center;margin-left:8rpx;margin-right:8rpx;border-radius: 8rpx;}
	.good_btn{ width:65rpx;height: 65rpx;background: #f6f6f6;display: flex;justify-content: center;align-items: center;border-radius: 8rpx;}
	.no_add_jian{ color:#ccc}
	/* 抢购倒计时 */
	.countdown{ padding:8rpx 20rpx;display: flex;background: #AE0101;align-items: center;justify-content: space-between;font-size:28rpx;color: #fff;
			.countdown_n1{ flex:1;display: flex;align-items: center;
				.c_n1_left{ margin-right:10rpx}
				.c_n1_right{ font-size:20rpx;
					.n1_price{text-decoration:line-through }
					.n1_good_num{ font-size:24rpx;border:1px solid #fff;padding:2rpx;margin-top:2px}
				}
			}
			.countdown_n2{ flex:1;display: flex;align-items: center;justify-content: center;font-size:24rpx;flex-direction: column;
				.n2_end_time{ background: #333;padding:0 6rpx;margin-top:6rpx}
			}
	}
	/* 是否有库存 */
	.stock{ width:100%;height: 60rpx;position: fixed;left:0px;right:0px;bottom:100rpx;background: #FF9500;display: flex;align-items: center;justify-content: center;font-size:28rpx;z-index:100;color: #fff;}
	
	/* 地区选择器 */
	.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 35upx;
		}
	 
		.title {
			font-size: 34upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
	 
		.cancel-icon {
			font-size: 34upx;
			color: rgba(153, 153, 153, 1);
		}
	 
		.check {
			padding-left: 17upx;
			color: #FF7E28;
		}
	 
		.select-box {
			height: 1024upx;
		}
	 
		.select-item {
			display: flex;
			align-items: center;
			padding-left: 50upx;
			margin-bottom: 20upx;
			border-bottom: 1px solid #F6F6F6;
		}
	 
		.select-list {
			width: 120upx;
			height: 40upx;
			text-align: center;
			overflow: hidden;
			/*超出部分隐藏*/
			text-overflow: ellipsis;
			/* 超出部分显示省略号 */
			white-space: nowrap;
			/*规定段落中的文本不进行换行 */
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			margin-right: 30upx;
			border-bottom: 1px solid #FFFFFF;
		}
	 
		.select-list-cont {
			padding-left: 67upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 40px;
		}
	 
		.selected {
			font-size: 24rpx;
			color: #333;
		}
		.over_body{ overflow: hidden;height: 100%;}
		.attr_list{ width:90%;margin:auto;font-size: 26rpx;padding-bottom:10px}
		.attr_list_header{ width:100%;text-align: center;margin-top:20px;font-style:italic;color: #999;margin-bottom:10px}
		.attr_list_box{ width:100%;height: auto;border:1px solid #eee;padding:2px}
		.attr_list_item{ display:flex;align-items: center;width:100%;}
		.attr_lsit_L{ flex:1;background: #fff;border:1px solid #ccc;padding-top:4px;padding-bottom:4px;padding-left:6px}
		.attr_list_R{ flex:2;border:1px solid #ccc;margin-left:2px;padding-top:4px;padding-bottom:4px;padding-left:6px}
		.cart_num{ color: #fff;font-size: 8px;font-weight: 700;background: #e4393c;border-radius: 100px;padding:0px 3px;position: absolute;left:40rpx;top:20rpx}
</style>
