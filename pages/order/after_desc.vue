<template>
	<view class="desc_box">
		<view class="desc_top">
			<block v-if="after_data.after_sale.status == 1">
				<view class="after_statr">申请中</view>
				<view class="after_desc">你已发起退货申请，请耐心等待平台处理</view>
			</block>
			<block v-if="after_data.after_sale.status == 2">
				<view class="after_statr">申请成功</view>
				<view class="after_desc">你已发起退货申请成功，请耐心等待平台处理</view>
			</block>
			<block v-if="after_data.after_sale.status == 6">
				<view class="after_statr">售后完成</view>
				<view class="after_desc">售后完成，欢迎下次购买</view>
			</block>
			<block v-if="after_data.after_sale.status == -1">
				<view class="after_statr">申请失败</view>
				<view class="after_desc">申请失败</view>
			</block>
		</view>
		<view class="desc_good">
			<view class="good_info">
				<view class="good_image">
					<image :src="after_data.order_goods_info.goods_thumb" mode="aspectFill"></image>
				</view>
				<view class="good_desc">
					<view class="good_name">{{after_data.order_goods_info.goods_name}}</view>
					<view class="good_spec">{{after_data.order_goods_info.spec_title}}</view>
					<view class="good_price_box">
						<view class="good_price">¥ {{after_data.order_goods_info.shop_price}}</view>
						<view class="good_num">x{{after_data.order_goods_info.goods_num}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="after_conter">
			<view class="conter_n1">
				<label>售后类型:</label>
				<text>退货</text>
			</view>
			<view class="conter_n1">
				<label>申请时间:</label>
				<text>{{after_data.after_sale.add_time}}</text>
			</view>
			<view class="conter_n1">
				<label>退款编号:</label>
				<text>{{after_data.after_sale.delivery_sn}}</text>
			</view>
			<view class="conter_n1">
				<label>原因描述:</label>
				<text>{{after_data.after_sale.reason||''}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default {
		data() {
			return {
				id:0,
				after_data:'',//所有信息
				type:'',//0是在售后列表过来
			}
		},
		onLoad(pos) {
			this.id = pos.id
			this.type = pos.type
			this.getData()
		},
		onShow() {
			
		},
		methods: {
			async getData(){
				let data_api
				if(this.type == 0){
					data_api = await request.requestGet('after_list_desc',{
						id:this.id
					})
				}
				else{
				data_api = await request.requestGet('after_sale',{
					og_id:this.id
				})	
				}
				
				this.after_data = data_api.data.data
				console.log("售后状态",data_api)
			}
		}
	}
</script>

<style lang="scss">
page{ background: #fff;}
.desc_top{ width:100%;height: 220rpx;background: #e4393c;color: #ffffff;padding-lefr:30rpx;display: flex;align-items: center;flex-direction: column;justify-content: center;}
.after_statr{ width:100%;padding-left:30rpx;font-size:28rpx}
.after_desc{ width:100%;padding-left:30rpx;margin-top:30rpx;font-size:24rpx}
.desc_good{ width:100%;margin-top:30rpx;border-bottom:1px solid #e8e8e8}
.good_info{ width:100%;padding:40rpx 30rpx;display: flex;align-items: center;}
.good_image{ width:150rpx;height:150rpx;
	image{ width:100%;height:100%}
}
.good_desc{ width:520rpx;margin-left:20rpx;display: flex;flex-direction: column;justify-content: space-between;height: 150rpx;}
.good_name{     display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 2;overflow: hidden;font-size: 24rpx;color: #333;}
.good_price_box{ display: flex;color: #e4393c;font-size:12px}
.good_price{ font-weight: bold;margin-right:30rpx}
.good_num{ color:#666}
.good_spec{ font-size:24rpx;color: #999;}
.after_conter{ width:100%;padding:30rpx}
.conter_n1{ margin-bottom:10rpx;
	label{ margin-right:30rpx}
	text{}
}
</style>
