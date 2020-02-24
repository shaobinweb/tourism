<template>
	<view class="details">
		<view class="details_box1">
			<view class="iconfont">&#xe6e5;</view>
			<view class="address">
				<view class="name">收件人:吴三仔</view>
				<view class="address_content">收货地址:江西南昌进贤</view>
			</view>
		</view>
		<view class="details_box2">
			<view class="box2_title">订单编号：H2019122718055237077</view>
			<view class="box2_content">
				<image src="http://funpalau2.db.juntest.com/images/admin/upload/20191211/1988459767c88e333b068478a17915cf.png"></image>
				<view class="box2_rig">
					<view class="box2_tit">帕劳百悦大饭店</view>
					<view class="msg">标准海景房</view>
					<view class="price">￥688.00元</view>
				</view>
			</view>
		</view>
		<view class="checkin" :class="{'open_s':opens}">
			<view class="ckeckin_header">
				<view class="checkin_lef">入住1</view>
				<view class="open" @click="open"><text v-if="!opens">展开</text><text v-else>收起</text></view>
			</view>
			<view class="checkin_list" v-if="opens">
				<view class="list_item">
					<view class="item_name">
						<view class="name">姓名</view>
						<view class="name_content">测试</view>
					</view>
					<view class="item_name">
						<view class="name">手机号</view>
						<view class="name_content">157081543</view>
					</view>
					<view class="item_name">
						<view class="name">护照</view>
						<view class="name_content">wx123456</view>
					</view>
				</view>
			</view>
		</view>
		<view class="details_box3">
			<view class="box3_remarks">
				<text class="name">备注</text>
				<text class="remarks_content">写我认识沙发偶尔饿</text>
			</view>
			<view class="box3_remarks" style="">
				<text class="name">商品总额</text>
				<text class="price">￥6800.00元</text>
			</view>
		</view>
		<view class="details_box4">
			<view class="box4_list">
				<view class="box4_item">
					<text class="name">实付款：</text>
					<text class="box4_price">￥688.00</text>
				</view>
				<view class="box4_item">
					<view class="time">下单时间：2019-12-27 18:05:52</view>
					<!-- <view class="box4_price">￥688.00</view> -->
				</view>
			</view>
		</view>
		<view class="box5">
			<navigator url="/pages/order_details/payment">
				<view class="payment">去支付</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				opens:false
			}
		},
		methods:{
			open(){
				this.opens=!this.opens
			}
		}
	}
</script>

<style lang="scss">
	page{background: #F4F4F4;}
	.details .open_s{max-height: 300upx;}
	.box5{
		background: #FFFFFF;
		padding: 20upx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		.payment{background: #E1A022;color: #FFFFFF;border-radius: 8upx;padding: 8upx 15upx;display: inline-block;}
	}
	.details_box4{
		background: #FFFFFF;
		padding: 20upx;
		// display: flex;
		// flex-direction: row-reverse;
		.box4_list{text-align: right;}
		.box4_item{
			// display: flex;
			// align-items: center;
			.name{
				color: #000000;
				font-size: 28upx;
				margin-right: 20upx;
			}
			.box4_price{
				font-size: 36upx;
				color: #f23030;
				font-weight: 600;
			}
			.time{font-size: 26upx;color: #999999;}
		}
	}
	.details_box3{
		background: #FFFFFF;
		padding: 20upx;
		border-bottom: 1px solid #EEEEEE;
		.box3_remarks{
			
			display: flex;justify-content: space-between;align-items: center;
			padding: 8upx;
			font-size: 26upx;
			color: #999999;
			.name{display: inline-block;width: 130upx;}
			.price{color: #f23030;}
		}
	}
	.checkin{
		transition: .3s;
		max-height: 90upx;
		// line-height: 100upx;
		.ckeckin_header{
			display: flex;
			justify-content: space-between;
			padding: 15upx 20upx;
			.open{color: #ff8b00;font-size: 26upx;}
		}
		.checkin_list{
			padding: 20upx;
			.list_item{
				.item_name{
					display: flex;
					margin-bottom: 12upx;
					.name{color: #999;font-size: 24upx;width: 120upx;}
					.name_content{font-size: 26upx;}
				}
			}
		}
	}
	.details_box2{
		.box2_title{padding: 30upx 20upx;font-size: 26upx;color: #000000;background: #FFFFFF;}
		.box2_content{
			display: flex;
			background: #fafafa;
			align-items: center;
			padding: 20upx;
			image{display: inline-block;width: 140upx;height: 140upx;margin-right: 20upx;}
			.box2_rig{
				.box2_tit{font-size: 28upx;}
				.msg{font-size: 26upx;color: #999;padding: 12upx 0;}
				.price{font-size: 26upx;}
			}
		}
	}
	.details_box1{
		background: #FFFFFF;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
		padding: 20upx;
		.iconfont{margin-right: 20upx;}
		.name{margin-bottom: 10upx;}
	}
</style>
