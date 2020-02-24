<template>
	<view class="order_desc">
		<!-- 第一部分 -->
		<view class="order_n1">
			<block v-if="order_desc.is_pay == 0">
				<view class="n1_title">订单待付款</view>
				<view class="n1_desc">您的订单已确认请尽快完成付款哦~</view>
			</block>
			<block v-if="order_desc.is_pay == 1">
				<block v-if="order_desc.is_send == 0">
					<view class="n1_title">订单已付款</view>
					<view class="n1_desc">我们将尽快为您发货，请稍等~</view>
				</block>
				<block v-if="order_desc.is_send == 1  ">
					<block v-if="order_desc.receiving_time == null">
						<view class="n1_title">你的订单已发货</view>
						<view class="n1_desc">请耐心等待宝贝送达你的手中~</view>
					</block>
					<block v-else>
						<view class="n1_title">订单已收货</view>
						<view class="n1_desc">宝贝已收到您的手中~</view>
					</block>
				</block>
			</block>
		</view>
		<!-- 第二部分 -->
		<view class="order_n2">
			<view class="n2_icon address_icon"></view>
			<view class="n2_address_info">
				<view class="n2_address_name">
					<view class="address_name">收货人 {{order_desc.consignee}}</view>
					<view class="address_tel">{{order_desc.phone}}</view>
				</view>
				<view class="n2_address">
					{{order_desc.province}} {{order_desc.city}}  {{order_desc.district}}  {{order_desc.address}} 
				</view>
			</view>
		</view>
		<!-- 第三部分 -->
		<view class="order_n3">
			<view class="n3_header">
				<image mode="aspectFit" src="../../static/order_desc.png"></image>
				<view class="n3_header_title">SONDAY</view>
			</view>
			<!-- 商品列表 -->
			<view class="n3_good_list" v-for="item in order_desc.goods_list" :key="item.id">
				<view class="good_list_img">
					<image :src="item.goods_thumb"></image>
				</view>
				<view class="good_info">
					<view class="good_name">{{item.goods_name}}</view>
					<view class="good_spc">{{item.spec_title}}</view>
					<view class="good_price">
						<text class="price">¥ {{item.shop_price}}</text>
						<text class="good_num">x{{item.goods_num}}</text>
					</view>
				</view>
			</view>
			<!-- 买家留言 -->
			<view class="Message">
				<view class="Message_left">买家留言</view>
				<view class="Message_value">{{order_desc.user_remark || '无'}}</view>
			</view>
			<!-- 发票 -->
			<view class="Message">
				<view class="Message_left">发票信息</view>
				<view class="Message_value">{{invoice.taxpayer || '无'}}</view>
			</view>
			<!-- 订单合计 -->
			<view class="order_total">
				<view class="total_item">
					<view class="item_left">优惠券</view>
					<view class="item_right">¥ {{order_desc.coupon_price}}</view>
				</view>
				<view class="total_item">
					<view class="item_left">购物金</view>
					<view class="item_right">¥ {{order_desc.cecn_num}}</view>
				</view>
				<view class="total_item">
					<view class="item_left">促销优惠</view>
					<view class="item_right">¥ 0.00</view>
				</view>
				<view class="total_item">
					<view class="item_left">运费（快递）</view>
					<view class="item_right">¥ 0.00</view>
				</view>
				<view class="total_item">
					<view class="item_left" style="color: #333333;font-size: 28rpx;font-weight: bold;">总价</view>
					<view class="item_right">¥ {{order_desc.total_price}}</view>
				</view>
			</view>
			<view class="payment">
				<view class="payment_left">实付款</view>
				<view class="payment_right">¥ {{order_desc.payable_price}}</view>
			</view>
		</view>
		<!-- 第四部分 -->
		<view class="order_n4">
			<view class="n4_header">
				订单详情
			</view>
			<view class="n4_info">
				<view class="n4_item">
					<view class="n4_item_left">订单编号：</view>
					<view class="n4_item_right">{{order_desc.order_sn}}</view>
				</view>
				<view class="n4_item">
					<view class="n4_item_left">支付交易号：</view>
					<view class="n4_item_right">{{order_desc.order_sn || ''}}</view>
				</view>
				<view class="n4_item">
					<view class="n4_item_left">创建时间：</view>
					<view class="n4_item_right">{{order_desc.add_time}}</view>
				</view>
				<view class="n4_item">
					<view class="n4_item_left">支付时间：</view>
					<view class="n4_item_right">{{order_desc.pay_time || '待支付'}}</view>
				</view>
				<view class="n4_item">
					<view class="n4_item_left">发货时间：</view>
					<view class="n4_item_right">{{order_desc.send_time || ''}}</view>
				</view>
			</view>
			<view class="n4_btn">
				<view class="btn_pay btns" v-if="order_desc.is_pay == 0 && order_desc.status!=0" @tap="payFun">支付订单</view>
				<view class="btn_cancel btns" v-if="order_desc.is_pay == 0 && order_desc.status!=0" @tap="cancelFun">取消订单</view>
				<view class="btn_cancel btns" v-if="order_desc.status==0" @tap="delectFun">删除订单</view>
				<view class="btn_cancel btns" v-if="order_desc.is_send == 1"  @tap="logisticsFun">查看物流</view>
				<view class="btn_pay btns" v-if="order_desc.is_pay == 1 && order_desc.receiving_time == null && order_desc.is_send == 1"  @tap="order_confirm">确认收货</view>
			</view>
		</view>
		<!-- 删除订单弹窗 -->
		<view class="cancel_alert animated bounceIn" v-if="delect_alert">
			<view class="cancel_box">
				<view class="cancel_title">确认订单订单</view>
				<view class="cancel_btns">
					<view class="btn_left" @tap="delect_alertFun">取消</view>
					<view class="btn_right" @tap="delect_ok">确定</view>
				</view>
			</view>
		</view>
		<!-- 取消订单弹窗 -->
		<view class="cancel_alert animated bounceIn" v-if="cancel_alert">
			<view class="cancel_box">
				<view class="cancel_title">确认取消订单</view>
				<view class="cancel_btns">
					<view class="btn_left" @tap="cancel_alertFun">取消</view>
					<view class="btn_right" @tap="cancel_ok">确定</view>
				</view>
			</view>
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
	export default {
		data() {
			return {
				order_id : 0,
				order_desc : null,
				cancel_alert:false,
				invoice:'',
				chaxun_if:false,//查询物流
				wuliu_data : null,//物流信息
				delect_alert:false,
			}
		},
		async onLoad(ops) {
			this.order_id = ops.id
			let order_desc = await request.requestPost('order_detail',{id:this.order_id})
			this.order_desc = order_desc.data.data.order_info
			this.invoice = order_desc.data.data.invoice
			console.log("订单详情数据",order_desc)
		},
		methods: {
			//删除订单
			delectFun(){
				this.delect_alert = true
			},
			delect_alertFun(){
				this.delect_alert = false
			},
			async delect_ok(){
				let data_api = await request.requestPost('del_order',{id:this.order_id})
				this.$api.msg(`${data_api.data.message}`)
				if(data_api.data.errorCode == 100028){
					setTimeout(function(){
						uni.redirectTo({
							url:`../order/order?state=0`
						})
					},500)
				}
				console.log("删除订单",data_api)
			},
			//关闭物流查询
			wuliu_close(){
				this.chaxun_if = false
			},
			//查看物流
			async logisticsFun(){
				this.chaxun_if = true
				let data_api = await request.requestGet('chaxun',{
					id:this.order_desc.id
				})
				this.wuliu_data = data_api.data.data
				console.log("查看物流",data_api)
			},
			//确认收货
			async order_confirm(){
				let _this = this
				let confirm_api = await request.requestPost('order_confirm',{id:this.order_desc.id})
				if(confirm_api.data.errorCode==110111){
					this.$api.msg('确认收货成功')
					setTimeout(function(){
						_this.get_order()
					},500)
				}
				else{
					this.$api.msg(`${confirm_api.data.message}`)
				}
				console.log("收货确认",confirm_api)
			},
			payFun:function(){
				uni.redirectTo({
					url:`../money/pay?serial_id=${this.order_desc.id}&type=order`
				})
			},
			//取消订单
			cancelFun: function(){
				this.cancel_alert = true
			},
			//确认取消订单
			cancel_ok : async function(){
				let _this = this
				uni.showLoading({
					title:'取消中'
				})
				let cancel = await request.requestPost('order_cancel',{id:this.order_id})
				uni.hideLoading()
				this.$api.msg(`${cancel.data.message}`)
				this.cancel_alert = false
				uni.navigateBack({})
			},
			//取消弹窗
			cancel_alertFun : function(){
				this.cancel_alert = false
			},
			//取消支付
			order_cancel : async function(id){
				this.cancel_alert = true
				this.order_id = id
			},
		}
	}
</script>

<style lang='scss'>
	page{ background: #f0f0f0;}
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
   .order_desc{ 
	   /* 第一部分 */
	   .order_n1{ width:100%;height: auto;background: #333;padding:30rpx;color: #fff;
			.n1_title{ font-size:28rpx;}
			.n1_desc{ font-size:24rpx;margin-top:16rpx}
	   }
	   /* 第二部分 */
	   .order_n2{width:100%;height: auto;padding:30rpx;background: #fff;display: flex;color: #636673;font-size: 24rpx;align-items: center;
		   .address_icon{ width:50rpx;height:50rpx;background:url(../../static/icon-location.png) no-repeat;background-size: 100%;margin-right:20rpx}
		   .n2_address_name{ display: flex;margin-bottom:6rpx;
			.address_tel{ margin-left:20rpx}
		   }
	   }
	   /* 第三部分 */
	   .order_n3{width:100%;height: auto;background: #ffffff;margin-top:14rpx;
		   .n3_header{ display: flex;align-items: center;height: 80rpx;border-bottom:1px solid #e8e8e8;
			   image{ width:32rpx;height: 32rpx;margin-left:30rpx}
			   .n3_header_title{ font-size:28rpx;margin-left:6px}
		   }
		   /* 商品列表 */
		   .n3_good_list{ width:100%;height: auto;padding:40rpx 30rpx;background: #ffffff;font-size: 26rpx;color: #636673;display: flex;align-items: center;
				.good_list_img{ 
					image{ width:150rpx;height: 150rpx;border-radius: 20rpx;}
				}
				.good_info{ margin-left:20rpx;width:500rpx;height: 150rpx;display: flex;justify-content: space-between;flex-direction: column;}
				.good_name{ color: #333;line-height: 32rpx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
				.good_spc{ color: #333;}
				.good_price{ color:#000}
				.good_num{ margin-left:40rpx}
		   }
		   /* 留言 */
		   .Message{ border-bottom:1px solid #e8e8e8;padding-left:30rpx;padding-right:30rpx;color: #333;font-size: 28rpx;display: flex;align-items: center;padding-top:20rpx;padding-bottom:20rpx;
			.Message_value{ color:#636673;margin-left:20rpx}
		   }
		   /* 订单合计 */
		   .order_total{ padding:30rpx;padding-bottom:10rpx;border-bottom:1px solid #e8e8e8;color: #636673;font-size: 24rpx;
			 .total_item{ display:flex;justify-content: space-between;align-items: center;margin-bottom:8rpx}
		   }
		   .payment{ padding:14rpx 30rpx;display: flex;align-items: center;justify-content: space-between;
			.payment_left{ color:#333333;font-size:28rpx;font-weight: bold;}
			.payment_right{ font-size:28rpx;font-weight: bold;color: #F86C5B;}
		   }
	   }
	 /* 第四部分 */
	 .order_n4{ width:100%;height: auto;padding:40rpx 30rpx 120rpx 30rpx;background: #ffffff;margin-top:20rpx;
		.n4_header{ border-left:3px solid red;font-size: 30rpx;line-height: 34rpx;padding-left:10rpx}
		.n4_info{ font-size: 26rpx;color: #636673;margin-top:20rpx}
		.n4_item{ display: flex;margin-top:14rpx}
		.n4_item_left{ width:200rpx}
		.n4_btn{ margin-top:80rpx}
		.btns{ width:100%;display: block;height: 44px;line-height: 44px;background: #f8f8f8;text-align: center;margin-bottom:20rpx;font-size: 28rpx;color: #333;}
		.btn_pay{ background: #333;color: #fff;}
	 }
   }
   /* 取消订单弹窗 */
   .cancel_alert{ width:100%;height: 100%;position: fixed;left:0px;right:0px;top:0px;bottom:0px;background: rgba(0,0,0,0.4);z-index:100;display: flex;justify-content: center;align-items: center;
   	.cancel_box{ width:60%;height: 150rpx;border-radius: 12rpx;background: #fff;font-size: 28rpx;color: #555;display: flex;flex-direction: column;align-items: center;justify-content: flex-end;}
   	.cancel_btns{ width:100%;height: 80rpx;line-height: 80rpx;display: flex;align-items: center;border-top:1px solid #e8e8e8;justify-content: center;align-items: center;margin-top:20rpx;}
   	.btn_left,.btn_right{ flex:1;text-align: center;line-height: 80rpx;}
   }
</style>
