<template>
	<view class="details">
		<view class="details_box1">
			<view class="box1_top">
				<!-- <view class="img"> -->
					<image mode="aspectFill"  src="http://funpalau2.db.juntest.com/images/admin/upload/20191211/1988459767c88e333b068478a17915cf.png"></image>
				<!-- </view> -->
				<view class="yh">限时特惠</view>
				<view class="top_content">【帕劳】澳门直飞帕劳6天5晚自由  行(3天出海船票+帕劳当地五星酒  店+赠送接送机+豪华海鲜晚餐)</view>
			</view>
			<view class="box1_type">
				<view class="box1_type_name">套餐类型：</view>
				<view class="box1_type_name">6天5晚自由行</view>
			</view>
			<view class="box1_type">
				<view class="box1_type_name">出行航空：</view>
				<view class="box1_type_name">亚太航空</view>
			</view>
			<view class="box1_type">
				<view class="box1_type_name">出行日期：</view>
				<view class="box1_type_name">2019-12-01</view>
			</view>
			<view class="box1_type">
				<view class="box1_type_name">行程总额：</view>
				<view class="box1_type_name" style="color: #FF7700;">￥11560</view>
			</view>
		</view>
		<view class="details_box2 details_box1">
			<view class="box2_title">联系人信息</view>
			<view class="box2_content">
				<view class="box2_item">
					<view class="item_name">姓名：</view>
					<view class="item_name">李某某</view>
				</view>
				<view class="box2_item">
					<view class="item_name">手机号：</view>
					<view class="item_name">137****0202</view>
				</view>
				<view class="box2_item">
					<view class="item_name">邮箱号：</view>
					<view class="item_name">19******8@qq.com</view>
				</view>
			</view>
		</view>
		<!-- <view class="checkin" :class="{'open_s':opens}">
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
		</view> -->
		<view class="details_box2 details_box3 details_box1" >
			<view class="box2_title">出行人信息(3)</view>
			<view class="box3_item" :class="{'open_s':opens}">
				<view class="box2_content" >
					<view class="box2_item">
						<view class="item_name">姓名：</view>
						<view class="item_name">李某某</view>
					</view>
					<view class="box2_item">
						<view class="item_name">护   照：</view>
						<view class="item_name">E00160***</view>
					</view>
				</view>
				<view class="box2_content">
					<view class="box2_item">
						<view class="item_name">姓名：</view>
						<view class="item_name">李某某</view>
					</view>
					<view class="box2_item">
						<view class="item_name">护   照：</view>
						<view class="item_name">E00160***</view>
					</view>
				</view>
			</view>
			<view class="gd" @click="more">
				<view class="gd_name">查看更多</view>
				<view class="iconfont">&#xe683;</view>
			</view>
		</view>
		<view class="details_box4 details_box1 details_box2" style="margin-bottom: 120upx;">
			<view class="box2_title">订单信息</view>
			<view class="box2_content">
				<view class="box2_item">
					<view class="item_name">创建时间：</view>
					<view class="item_names">2019-10-10 11:08:08</view>
				</view>
				<view class="box2_item">
					<view class="item_name">订单编号：</view>
					<view class="item_names">2222222222222222222</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="fonter_kf">咨询客服</view>
			<view class="fonter_phone">电话咨询</view>
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
			more(){
				this.opens=!this.opens
			},
		}
	}
</script>

<style lang="scss">
	.details_box4{}
	.details .details_box3 .open_s{max-height: 1300upx;}
	.details_box3{
		
		.box3_item{
			max-height: 150upx;
			overflow: hidden;
			background: #FFFFFF;
			transition: 1s;
		}
		.box2_content{
			
			border-bottom: 1px solid #EEEEEE;
		}
		.gd{
			height: 80upx;
			display: flex;
			align-items: center;
			justify-content: center;
			.gd_name{font-size: 30upx;color: #FF7700;margin-right: 10upx;}
			.iconfont{color: #FF7700;}
		}
	}
	.box2_title{font-size: 32upx;color: #2C2C2C;font-weight: bold;margin-bottom: 10upx;}
	.details_box2{
		
		.box2_item{
			font-size: 30upx;
			font-weight: 500;
			color:#585858 ;
			display: flex;
			align-items: center;
			height: 80upx;
			.item_name{
				width: 160upx;
			}
			// .item_names
		}
	}
	.details_box1{
		width: 95%;
		margin: 20upx auto;
		border-radius: 20upx;
		background: #FFFFFF;
		padding: 20upx;
		.box1_top{
			display: flex;
			align-items: center;
			position: relative;
			.yh{
				font-size: 26upx;
				color: #FFFFFF;
				background: #EF001E;
				padding: 8upx 15upx;
				border-radius: 20upx 0 20upx 0upx;
				position: absolute;
				top: 0;
				left: 0;
			}
			// .img{
			// 	width: 200upx;
			// 	height: 200upx;
				
			height: 100%;		
			// }
			image{width: 200upx;height: 200upx;display: block;flex-shrink: 0;border-radius: 20upx;}
			.top_content{font-size: 32upx;color: #2C2C2C;font-weight: bold;margin-left: 20upx;}
		}
		.box1_type{
			display: flex;
			align-items: center;
			margin-top: 20upx;
			.box1_type_name{font-size: 30upx;color: #2C2C2C;font-weight: 400;margin-right: 20upx;}
			
		}
		
	}
	
	page{background: #F4F4F4;}
	.details .open_s{max-height: 300upx;}

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
	.footer{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		
		display: flex;
		text-align: center;
		align-items: center;
		height: 100upx;
		line-height: 100upx;
		.fonter_kf{font-size: 32upx;color: #FFFFFF;background:#FF7700;flex: 1;}
		.fonter_phone{font-size: 32upx;color: #FFFFFF;background:#F85967;flex: 1; }
	}
</style>



