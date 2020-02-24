<template>
	<view class="my_order">
		<view class="my_order_header">
			<block v-for="(item,index) in order_type" :key="index">
				<view class="itme">
					<view class="item_name" :class="{'header_types':item.id==header_id}" @click="header_Fun_item(item)">{{item.name}}</view>
				</view>
			</block>
		</view>
		<view class="order_list">
			<view class="list_item">
				<view class="item_top">
					<view class="item_top_lef">订单编号：R2020010409393776857</view>
					<view class="item_top_rig">待付款</view>
				</view>
				<view class="item_content">
					<image src="http://funpalau2.db.juntest.com/uploads/tourism/20180828/e4819b1426d626fa7cf719bff99b0360.jpg"></image>
					<view class="item_content_rig">
						<view class="rig_title">香港直飞塞班5天/6天自由行（特别赠送精品行程/赠接送机/已含税费/全程领队）</view>
						<view class="time">起始时间:2020-01-01</view>
						<view class="time">结束时间:2020-01-10</view>
						<view class="item_price">￥0.2</view>
					</view>
				</view>
				<view class="item_bot">
					<view class="bot_lef">
						<view class="bot_lef_name">实付款</view>
						<view class="bot_price">￥0.2</view>
					</view>
					<view class="bot_rig">
						<view class="rig_payment">付款</view>
						<view class="rig_cancel" @click="cancelOrder">取消订单</view>
					</view>
				</view>
			</view>
			<view class="list_item">
				<view class="item_top">
					<view class="item_top_lef">订单编号：R2020010409393776857</view>
					<view class="item_top_rig">待付款</view>
				</view>
				<view class="item_content" @click="orderFun">
					<image src="http://funpalau2.db.juntest.com/uploads/tourism/20180828/e4819b1426d626fa7cf719bff99b0360.jpg"></image>
					<view class="item_content_rig">
						<view class="rig_title">香港直飞塞班5天/6天自由行（特别赠送精品行程/赠接送机/已含税费/全程领队）</view>
						<view class="time">起始时间:2020-01-01</view>
						<view class="time">结束时间:2020-01-10</view>
						<view class="item_price">￥2220</view>
					</view>
				</view>
				<view class="item_bot">
					<view class="bot_lef">
						<view class="bot_lef_name">实付款</view>
						<view class="bot_price">￥0.2</view>
					</view>
					<view class="bot_rig">
						<view class="rig_payment" @click="payment">付款</view>
						<view class="rig_cancel" @click="cancelOrder">取消订单</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				header_id:1,
				order_type:[{
					id:1,
					name:'全部订单'
				},
				{
					id:2,
					name:'待付款'
				},
				{
					id:3,
					name:'待出行'
				},
				{
					id:4,
					name:'待评价'
				},
				{
					id:5,
					name:'已取消'
				}]
			}
		},
		methods:{
			header_Fun_item(item){
				this.header_id=item.id
			},
			payment(){
				uni.navigateTo({
					url:'/pages/order_details/payment'
				})
			},
			orderFun(){
				uni.navigateTo({
					url:'/pages/order_details/list_order_details'
				})
			},
			cancelOrder(){
				uni.showModal({
					title:'信息',
					content: '确定要取消订单吗？取消后不可恢复.',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.order_list{
		
		
		.list_item{
			margin-top: 20upx;
			background: #FFFFFF;
			.item_top{
				padding: 20upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.item_top_lef{}
				.item_top_rig{color: #f23030;}
			}
			.item_content{
				display: flex;
				// align-items: center;
				flex-direction: row;
				justify-content: space-between;
				background: #f8f8f8;
				padding: 20upx;
				border-bottom: 1px solid #f8f8f;
				image{display: inline-block;width: 200upx;height: 200upx;margin-right: 20upx;}
				.item_content_rig{font-size: 28upx;display: inline-block;width: 75%;
					.item_price{font-size: 32upx;color: #f23030;}
					.rig_title{color: #666;}
					.time{margin-top: 5upx;}
				}
			}
			.item_bot{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx;
				.bot_lef{display: flex;align-items: center;.bot_price{font-size: 30upx;color: #f23030;}}
				.bot_rig{display: flex;
					align-items: center;
					.rig_payment{
						background: #ff8b00 !important;
						color: #FFFFFF;
						padding:8upx 20upx;
						border-radius: 5upx;
						font-size: 26upx;
						margin-right: 26upx;
					}
					.rig_cancel{
						border: 1upx solid #ddd;
						// color: #FFFFFF;
						padding:8upx 20upx;
					}
				}
			}
		}
	}
	.header_types{border-bottom: 2px solid #ff8b00;color: #ff8b00;}
	page{background: #E4E4E4;}
	.my_order_header{
		background: #FFFFFF;
		display: flex;
		height: 80upx;
		align-items: center;
		.itme{
			text-align: center;
			flex: 1;
			border-right: 1px solid #EEEEEE;
			.item_name{
				height: 60upx;
				line-height: 60upx;
				margin: 0 10upx;
			}
		}
	}
</style>
