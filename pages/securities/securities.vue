<template>
	<view class="securities" :style="{background:(id==3?'#fff':'#eee')}">
		<view class="securities_list">
			<view class="item" :class="{'bor':id==0}" @click="couponFun(0)">全部</view>
			<block v-for="(item,index) in securities_class" :key="index">
				<view class="item" :class="{'bor':id==item.id}" @click="couponFun(item.id)">{{item.name}}</view>
			</block>
			<view class="item" :class="{'bor':id==3}" @click="couponFun(3)">优惠码兑换</view>
		</view>
		<view v-if="id!=3" class="coupon_list" v-for="item in list" :key="item.id">
			<view class="coupon_list_left">
				<image src="../../static/sc.png"></image>
				<view class="list_content">
					<view class="">{{item.title}}【{{item.tisp}}】</view>
					<view>{{item.coupon_level_name}}</view>
					<view>
						<text class="fracture">{{item.discount_type_id}}</text>
						<text class="number">{{item.quota}}</text>
						<text class="full">满￥{{item.money}}可用</text>
					</view>
				</view>
			</view>
			<view class="coupon_list_rig" @tap="receiveFun(item.id)">
				<view class="receive">
					<view>立即领取</view>
				</view>
				<view class="remnamt">剩余{{parseInt((1-item.send_num/item.num)*100)}}%</view>
			</view>
		</view>
		<!-- 优惠码兑换 -->
		<view v-if="id==3" class="PromoCode">
			<view class="code_input">
				<input type="number" v-model="code" class="code_input_" placeholder="填写优惠码" placeholder-style="font-size:28rpx" />
			</view>
			<view class="coupon_btn">领取</view>
		</view>
		<view class="securities_footer">
			<view class="x_order">
				<!-- <view class="order_img"></view> -->
				<view class="order_tit">领劵下单</view>
			</view>
			<view class="x_class">
				<!-- <view class="order_img"></view> -->
				<view class="order_tit" @tap="my_coupon">我的优惠价</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default{
		name:"securities",
		data(){
			return{
				id:0,
				securities_class:[],
				list:[],//优惠卷列表
				code:'',//优惠码兑换
			}
		},
		onShow() {
			this.couponFun(0)
		},
		methods:{
			//跳转到我的优惠卷
			my_coupon: function(){
				uni.navigateTo({
					url:'../user/coupon'
				})
			},
			//领取优惠卷
			receiveFun: async function(id){
				let request_data = await request.requestGet('coupon_receive',{coupon:id})
				let data = request_data.data
				if( data.errorCode == 110080 ){
					//领取成功
					this.$api.msg(`${data.message}`)
				}
				else{
					this.$api.msg(`${data.message}`)
				}
				console.log('领取优惠卷',request_data)
			},
			async couponFun(id){
				this.id=id
				if(this.id == 0){
					let coupon_api = await request.requestGet('coupon_index')
					this.list = coupon_api.data.data.list
					this.securities_class = coupon_api.data.data.coupon_level
				}
				else if(this.id == 1 || this.id == 2){
					let coupon_api = await request.requestGet('coupon_fl',{cl:this.id})
					this.list = coupon_api.data.data.list
					this.securities_class = coupon_api.data.data.coupon_level
					console.log('优惠卷请求',this.list)
				}
				else{
					
				}
			}
		}
	}
</script>

<style lang="scss">
	.bor{border-bottom: 4upx solid red;}
	page{background: #eee;}
	
	.PromoCode{
		width:100%;display: flex;justify-content: center;padding-top:100rpx;flex-direction: column;align-items: center;
		.code_input{ width:400rpx;height: 70rpx;height: 70rpx;text-align: center;border:2rpx solid #ddd;border-radius: 50rpx;}
		.code_input_{ height:64rpx;text-align: center;font-size: 28rpx;}
		.coupon_btn{ width:160rpx;background: #74d2d4;height: 70rpx;line-height: 70rpx;text-align: center;color: #fff;font-size:28rpx;margin-top:80rpx}
	}
	.securities{
		border-top: 1px solid #eee;
		height: 92vh;
		.securities_list{
			display: flex;
			// align-items: center;
			
			padding: 8upx 0;
			background: #FFFFFF;
			.item{
				font-size: 24upx;
				color: #999;
				padding: 0 26upx;
				height: 80upx;
				line-height: 80upx;
				
			}
		}
		.securities_footer{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			display: flex;
			height: 100upx;
			line-height: 100upx;
			.x_order{
				flex: 1;
				text-align: center;	
				background: #e4393c url(../../static/meiyong/lj.png) no-repeat center 15upx;
				background-size: 45upx 45upx;
				.order_tit{
					font-size: 24upx;
					color: #fff;
					padding-top: 34upx;
				}
			}
			.x_class{
				flex: 1;
				text-align: center;
				background: #FFFFFF url(../../static/meiyong/my.png) no-repeat center 15upx;
				background-size: 45upx 45upx;
				.order_tit{
					font-size: 24upx;
					color: #333;
					padding-top: 34upx;
				}
			}
		}
	}
	.coupon_list{
		width: 96%;
		margin: 10upx auto;
		height: 200upx;
		
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		.coupon_list_left{
			display: flex;
			align-items: center;
			image{width: 150upx;height: 150upx;display: inline-block;margin: 0  20upx 0 30upx;}
			.list_content{
				view{
					&:nth-of-type(1){
						font-size: 24upx;
						color: #666;
						text{margin-left: 5upx;}
					}
					&:nth-of-type(2){
						font-size: 22upx;
						color: #999999;
						padding: 20upx 0;
					}
					
				}
				view:nth-of-type(3){
					.fracture{font-size: 28upx;color: #e4393c;margin-right:8upx;}
					.number{font-size: 38upx;color: #e4393c;}
					.full{font-size: 28upx;color: #e4393c;padding-left: 68upx;}
				}
			}
		}
		.coupon_list_rig{
			background: #e4393c;
			padding: 0 24upx;
			.receive{
				width: 100upx;
				height: 100upx;
				color: #FFFFFF;
				border:6upx solid #FFFFFF;
				border-radius: 60upx;
				font-size: 24upx;
				margin: 26upx auto 0;
				
				view{padding: 10upx;text-align: center;}
			}
			.remnamt{
				font-size: 24upx;color: #FFFFFF;text-align: center;margin-top: 20upx;
			}
		}
	}
</style>