<template>
	<view class="order">
		<!-- 菜单 -->
		<view class="order_header">
			<view v-for="item in tab_nav" :key="item.type" :class="{'order_h_item':true, 'active':curr_nav_id == item.type}"  @tap="chage_nav(item.type)">{{item.name}}</view>
		</view>
		<!-- 主体 -->
		<view class="order_box">
			<view v-if="order_list.length == 0" class="no_order">
				<view class="no_order_title">订单空空如也</view>
				<image src="../../static/no_order.png" mode="aspectFit"></image>
			</view>
			<view v-else class="order_main" v-for=" (item) in order_list" :key="item.id">
				<view class="order_list" >
					<view class="main_header">
						<view class="main_header_l">{{item.add_time}}</view>
						<block v-if="item.is_send == 0">
							<view class="main_header_r">{{item.is_pay == 0? '未支付' : '待发货'}}</view> 
						</block>
						<block v-else>
							<block v-if="item.receiving_time == null">
								<view class="main_header_r">待收货</view>
							</block>
							 <block v-else>
								 <view class="main_header_r">待评价</view>
							 </block>
						</block>
					</view>
					<!-- 订单商品详情 -->
					<!-- 循环商品列表 -->
					<view class="good_list" v-for="(list_item) in item.goods_list" :key="list_item.id">
						<view class="main_box" @tap="navToDetailPage({id:list_item.goods_id})">
							<view class="main_box_l">
								<image :src="list_item.goods_thumb" mode="aspectFill"></image>
							</view>
							<view class="main_box_r">
								<view class="main_title">{{list_item.goods_name}} </view>
								<view class="main_spec">{{list_item.spec_title}}</view>
								<view class="main_price">
									<view>
										<text class="good_price">¥ {{list_item.payable_price}}</text>
										<label class="good_num">x {{list_item.goods_num}}</label>
									</view>
									<block v-if="item.is_pay != 0">
										<view class="after_sale" v-if="item.is_returning == false"   @tap="afterFun({id:list_item.id,type:0})">
											申请售后
										</view>
									    <view class="after_sale" v-else @tap="afterFun({id:list_item.id,type:1})">
											售后中
										</view>
									</block>
								</view>
							</view>
						</view>
						
					</view>
					<!-- 商品统计 -->
					<view class="main_total">
						<view class="total_left">共11件商品</view>
						<view class="total_right">小计： ¥{{item.payable_price}}</view>
					</view>
					<!-- 操作按钮 -->
					<view class="main_btn">
						<view class="main_btn_def" @tap="order_cancel(item)" v-if="item.is_send == 0 && item.is_pay == 0 && item.status!=0">取消订单</view>
						<view class="main_btn_def"  @tap="order_desc(item)">订单详情</view>
						<view class="main_btn_def active" v-if="item.is_pay == 0" :data-id="item.id"  @tap="pay">去付款</view>
						<view class="main_btn_def" v-if="item.is_send == 1" :data-id="item.id" @tap="logisticsFun({id:item.id})">查看物流</view>
						<view class="main_btn_def active" v-if="item.is_send == 1 && item.receiving_time ==null" :data-id="item.id" @tap="order_confirm({id:item.id})">确认收货</view>
						<view class="main_btn_def active" v-if="item.is_send == 1 && item.receiving_time !=null" :iddata-id="item.id" @tap="evaluate_confirm({id:item.id})">评价订单</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 取消订单弹窗 -->
		<view class="cancel_alert" v-if="cancel_alert">
			<view class="cancel_box">
				<view class="cancel_title">确认取消订单</view>
				<view class="cancel_btns">
					<view class="btn_left" @tap="cancel_alertFun('cancel')">取消</view>
					<view class="btn_right" @tap="cancel_ok('cancel')">确定</view>
				</view>
			</view>
		</view>
		<!-- 确认收货弹窗 -->
		<view class="cancel_alert" v-if="receiving_alert">
			<view class="cancel_box">
				<view class="cancel_title">是否确认收货</view>
				<view class="cancel_btns">
					<view class="btn_left" @tap="cancel_alertFun('receiving')">取消</view>
					<view class="btn_right" @tap="cancel_ok('receiving')">确定</view>
				</view>
			</view>
		</view>
		<!-- 右上角的菜单 -->
		<view class="right_nav" v-if="show_right">
			<view class="right_nav_jia"></view>
			<view class="right_nav_item" v-for="(item,index) in right_nav_list" :key="index" @tap="go_nav({url:item.url})">{{item.title}}</view>
		</view>
		<!-- 查看物流 -->
		<view class="cha_wuliu" v-if="chaxun_if">
			<view class="wuliu_box animated linearTop">
				<view class="wuliu_header">查看物流</view>
				<view class="wuliu_company">
					<view class="company_name">
						<view class="c_name_left">物流公司:</view>
						<view class="c_name_right">{{wuliu_data.shippingInfo.shipping_name}}</view>
					</view>
					<view class="company_name">
						<view class="c_name_left">物流单号:</view>
						<view class="c_name_right">{{wuliu_data.shippingInfo.shipping_sn}}</view>
					</view>
				</view>
				<view class="wuliu_list">
					<view  class="wuliu_list_item" v-for="(item,index) in wuliu_data.kdTrail_cn.data" :key="index">
						<view class="wuliu_list_time">{{item.time}}</view>
						<view class="wuliu_list_desc">{{item.context}}</view>
					</view>			
				</view>
				<view class="chaxun_close" @tap="wuliu_close">
					<view class="close_btn">关闭</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default{
		data(){
			return {
				curr_nav_id : 0,
				page : 1,
				state_id : 0,
				tab_nav : [
					{ type : 0, name : '全部'},
					{ type : 1, name : '待付款'},
					{ type :3, name : '待发货'},
					{ type : 4, name : '待收货'},
					{ type : 5, name : '待评价'},
				],
				order_list :{},
				cancel_alert:false,
				order_id:null,
				show_right:false,
				right_nav_list:[{'title':'首页','url':'/pages/index/index'},{'title':'购物车','url':'/pages/cart/cart'},{'title':'个人中心','url':'/pages/user/index'}],
				keyword:'',//搜索关键字
				chaxun_if:false,//查询物流
				wuliu_data : null,//物流信息
				receiving_alert:false,//确认收货弹窗
				receiving_id:0,//确认收货的id
			}
		},
		async onLoad( ops ){
			console.log(ops.state)
			this.curr_nav_id = ops.state
			this.state_id = ops.state
			if( ops.state == 0 ){
				this.state_id = 'all'
			}
			this.get_order()
			
		},
		onShow() {
			this.get_order()
		},
		onNavigationBarSearchInputChanged (e) {
			this.keyword = e.text
		    console.log("你输入了信息",this.keyword)
		},
		async onNavigationBarSearchInputConfirmed(){
			// 原生搜索
			let order_list = await request.requestGet('my_order',{
				type : this.state_id,
				key:this.keyword
			})
			this.order_list=order_list.data.data.orderList
		},
		onNavigationBarButtonTap(e) {
			this.show_right = !this.show_right
		},
		methods:{
			//售后调整
			afterFun(pos){
				if(pos.type == 0){
					uni.navigateTo({
						url:`/pages/order/after_sale?id=${pos.id}`
					})
				}
				else{
					uni.navigateTo({
						url:`/pages/order/after_desc?id=${pos.id}`
					})
				}
			   
			},
			//评价跳转
			evaluate_confirm(id){
				uni.navigateTo({
					url:`./evaluate?id=${id.id}`
				})
			},
			//关闭物流查询
			wuliu_close(){
				this.chaxun_if = false
			},
			//查看物流
			async logisticsFun(posim){
				this.chaxun_if = true
				let data_api = await request.requestGet('chaxun',{
					id:posim.id
				})
				this.wuliu_data = data_api.data.data
				console.log("查看物流",this.wuliu_data)
			},
			//确认收货
			async order_confirm(posim){
				this.receiving_alert = true
				this.receiving_id = posim.id
			},
			//详情页
			navToDetailPage(obj_id) {
				console.log("商品跳转id",obj_id.id)
				uni.navigateTo({
					url: `/pages/product/product?id=${obj_id.id}`
				})
			},
			//导航跳转
			go_nav(url){
				console.log(url)
				uni.switchTab({
					url:`${url.url}`
				})
			},
			//去付款
			pay:function(e){
				console.log(e.target.dataset.id)
				uni.redirectTo({
					url:`/pages/money/pay?serial_id=${e.target.dataset.id}&type=order`
				})
			},
			//取消弹窗
			cancel_alertFun : function(type){
				if(type == 'cancel'){
					this.cancel_alert = false
				}
				else if(type=='receiving'){
					this.receiving_alert = false
				}
			},
			//确认取消订单
			cancel_ok : async function(type){
				console.log(type)
				if(type=="cancel"){
					let _this = this
					let cancel = await request.requestPost('order_cancel',{id:this.order_id})
					this.cancel_alert = false
					_this.get_order()
				}
				else if(type =='receiving'){
					console.log("确认收货")
					let _this = this
					let confirm_api = await request.requestPost('order_confirm',{id:this.receiving_id})
					if(confirm_api.data.errorCode==110111){
						this.$api.msg('确认收货成功')
						setTimeout(function(){
							_this.get_order()
						},500)
					}
					else{
						this.$api.msg(`${confirm_api.data.message}`)
					}
					this.receiving_alert = false
					console.log("收货确认",confirm_api)
				}
				
			},
			//取消支付
			order_cancel : async function(id){
				console.log("取消订单的id")
				this.cancel_alert = true
				this.order_id = id
			},
			//订单详情
			order_desc: function(id){
				console.log(id)
				uni.navigateTo({
					url:`./order_desc?id=${id}`
				})
			},
			go_test : function (){
				this.$api.msg('正在维护...')
			},
			// 切换菜单
			chage_nav : function ( nav_id ){
				this.order_list= []
				this.curr_nav_id = nav_id
				this.state_id = nav_id
				this.page = 1
				if( this.state == 0 ){
					this.state_id = 'all'
				}
				this.get_order()
			},
			get_order : async function(){
				this.page = 1
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				// 请求数据
				let order_list = await request.requestGet('my_order',{
					type : this.state_id
				})
				this.order_list = order_list.data.data.orderList
				console.log("订单请求数据",order_list)
				uni.hideLoading()
			}
		},
		onReachBottom : async function ( e ){
			this.page++
			let order_list = await request.requestGet('my_order',{
				type : this.state_id,
				page : this.page
			})
			Object.assign(this.order_list,order_list.data.data.orderList)
			console.log("加载更多",this.order_list)
		},
	}
</script>

<style lang='scss'>
	page{ height:100%}
	 /* 查看物流statr */
	.cha_wuliu{ width:100%;height:100%;background: rgba(0,0,0,0.4);position: fixed;z-index:100;left:0;top:0;right:0;bottom:0;display: flex;justify-content: center;align-items: center;
		.wuliu_box{ width:600rpx;height: 1060rpx;background: #fff;border-radius: 12rpx;display: flex;flex-direction: column;position: relative;}
		.wuliu_header{ width:100%;height: 84rpx;color: #111;font-size: 32rpx;display: flex;align-items: center;justify-content: center;}
		.wuliu_company{ width:100%;height: auto;padding-left:40rpx;padding-right:40rpx;display: flex;flex-direction: column;}
		.company_name{ display: flex;align-items: center;margin-bottom:12rpx}
		.c_name_left{ margin-right:4rpx}
		.chaxun_close{ width:100%;height:80rpx;border-top:1px solid #f1f1f1;position: absolute;bottom:0;display: flex;justify-content: flex-end;align-items: center;}
		.close_btn{ width:120rpx;height: auto;}
		.wuliu_list{ width:100%;height: 800rpx;padding-left:40rpx;padding-right:40rpx;font-size:24rpx;overflow: auto;}
		.wuliu_list_time{ margin-bottom:8rpx}
		.wuliu_list_item{ margin-bottom:20rpx}
	}
	 /* 查看物流end */
	/* 右上角的菜单 */
	.right_nav{ width:240rpx;height:240rpx;background: #ffffff;box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);position: fixed;right:30rpx;top:10px;z-index:100;display: flex;flex-direction: column;align-items: center;justify-content: center;
	}
	.right_nav_item{ width:100%;font-size:28rpx;height:80rpx;position: relative;z-index:201;display: flex;justify-content: center;align-items: center;background: #fff;}
	.right_nav:before{   content: "";position: absolute;right: 10px;top: -5px;width: 10px;height: 10px;background: #fff;-webkit-box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);-webkit-transform: rotate(45deg);transform: rotate(45deg);z-index: 15;}
	.order{ 
		width:100%;background: #f0f0f0;padding-bottom:100rpx;
		.order_header{ width:100%;height: 90rpx;background: #fff;font-size:24rpx;color: #999;display: flex;align-items: center;justify-content: space-between;padding-left:40rpx;padding-right:40rpx;position: fixed;top:0px;left:0;right:0;z-index:10;
			.order_h_item{ height: 90rpx;line-height: 90rpx;text-align: center;}
			.active{ color:#e4393c;border-bottom:2px solid #e4393c}
		}
		/*  #ifdef  H5  */
		.order_header{ top:44px}
		/*  #endif  */
		/* 主体部分 */
		.order_main{ width:94%;height: auto;background: #fff;margin:20rpx auto auto auto;border-radius: 10rpx;padding:20rpx;
			.main_header{ font-size:28rpx;color: #333;display: flex;align-items: center;justify-content: space-between;border-bottom:1px solid #e8e8e8;padding-bottom:20rpx;
				.main_header_r{ color:red}
			}
			.main_box{ width:100%;height: auto;background: #fff;display: flex;align-items: center;text-justify: left;flex-wrap: wrap;margin-top:20rpx;border-bottom:1px solid #e8e8e8;padding-bottom:30rpx;padding-top:10rpx;
				.main_box_l{ width:140rpx;height: 140rpx;border-radius: 20rpx;overflow: hidden;
					image{ width:100%;height:100%}
				}
				.main_box_r{ font-size:24rpx;flex:1;margin-left:28rpx;height: 140rpx;display: flex;flex-direction: column;justify-content: space-between;
					.main_title{ color: #333;line-height: 28rpx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
					.main_spec{ color:#999;line-height: 28rpx;}
					.main_price{ color:#e4393c;line-height: 28rpx;display: flex;justify-content: space-between;align-items: center;}
					.good_num{ color:#666;margin-left:40rpx}
					
				}
			}
		}
		.after_sale{ font-size:24rpx;line-height: 40rpx;padding:0px 20rpx;border:1px solid #AAAAAA;color: #999;width:160rpx;display: flex;justify-content: center;align-items: center;}
		/* 商品统计部分 */
		.main_total{ width:100%;height: auto;font-size: 24rpx;color: #333;height: 80rpx;display: flex;justify-content: flex-end;align-items: center;border-bottom:1px solid #e8e8e8;
			.total_left{ margin-right:32rpx}
		}
		/* 按钮 */
		.main_btn{ width:100%;height: auto;padding:20rpx 0 20rpx 20rpx;display: flex;align-items: center;justify-content: flex-end;font-size: 24rpx;color: #666666;
			.main_btn_def{ padding:0 20rpx;height: 60rpx;line-height: 52rpx;border:1px solid #ddd;border-radius: 50rpx;margin-right:20rpx}
			.active{ margin-right:0rpx;color: #e4393c;background: #e4393c;color: #fff;border:1px solid #e4393c}
		}
		.order_box{ padding-top:90rpx;}
	}
	/* 取消订单弹窗 */
	.cancel_alert{ width:100%;height: 100%;position: fixed;left:0px;right:0px;top:0px;bottom:0px;background: rgba(0,0,0,0.4);z-index:100;display: flex;justify-content: center;align-items: center;
		.cancel_box{ width:60%;height: 150rpx;border-radius: 12rpx;background: #fff;font-size: 28rpx;color: #555;display: flex;flex-direction: column;align-items: center;justify-content: flex-end;}
		.cancel_btns{ width:100%;height: 80rpx;line-height: 80rpx;display: flex;align-items: center;border-top:1px solid #e8e8e8;justify-content: center;align-items: center;margin-top:20rpx;}
		.btn_left,.btn_right{ flex:1;text-align: center;line-height: 80rpx;}
	}
	.no_order{ position: fixed;bottom:0;left:0;right:0;display: flex;top:120rpx;justify-content: center;align-items: center;font-size: 32rpx;background: #fff;flex-direction: column;
	/*  #ifdef APP-PLUS */
	.no_order{ top:120rpx}
	/*  #endif  */
		image{ width:148rpx;height: 128rpx;margin-top:20px}
	}
</style>
