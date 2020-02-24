<template>
	<view class="sigIn">
		<!-- 头部 -->
		<view class="sigIn_header">
			<block v-if="sigInData.num1<8">
				<view class="header_title">
					连续签到<text class="day_num">{{sigInData.redPacket.days}}</text>天
				</view>
				<view class="header_desc">
					领<text class="sigIn_money">{{sigInData.redPacket.num}}</text>
					购物金福利
				</view>
			</block>
			<block v-else>
				<view class="header_desc" style="margin-top:-40rpx;font-size:60rpx">
					您已经成功签到一个星期啦！
				</view>
			</block>
		</view>
		<!-- 打卡天数 -->
		<view class="sigIn_wek">
			<view class="sigIn_wek_T">
				<block v-for="item in sigInData.day_reward" :key="item.id">
					<view class="wek_T_item activeBG" v-if="item.days<=sigInData.num">
						<view>{{item.days}}天</view>
						<view>+￥{{item.num}}</view>
					</view>
					<view v-else class="wek_T_item wek_T_top">￥{{item.num}}</view>
				</block>
			</view>
			<view class="sigIn_wek_B">
				<view class="wek_B_n1" v-if="sigInData.num1<8">再签<text>1</text>天，即可领取{{sigInData.redPacket.num}}元购物金</view>
				<view v-if="sigInData.is_sign_in == 1 || sigInData.num1>=8" class="wek_B_n2">
					已签到
				</view>
				<view v-else class="wek_B_n2" @tap="siginFinish">
					签到
				</view>
			</view>
		</view>
		<!-- 为你推荐 -->
		<view class="sigIn_recommend">
			<view class="recommend_title">
				为你推荐
			</view>
			<view class="good_list">
				<view class="item" v-for="item in sigInData.goodsData" :key="item.id" @click="navToDetailPage({id:item.id})">
					<view class="item_n1">
						<image :src="item.thumb" mode="aspectFill" class="good_img"></image>
					</view>
					<view class="item_n2">
						<view class="good_title">{{item.title}}</view>
						<view class="pay_type">现金+CECN</view>
						<block v-if="item.sales_sum !=''|| item.sales_sum !=undefined">
							 <!-- +{{item.sales_sum}}购物金 -->
							<view class="good_money">¥{{item.shop_price}} <text class="type_money"></text></view>
						</block>
						<block v-else>
							<view class="good_money">¥{{item.shop_price}}</text></view>
						</block>
					</view>
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
				sigInData:null,
			}
		},
		async onShow() {
			this.get_siginFun()
			
		},
		methods: {
			async get_siginFun(){
				let siginApi = await request.requestGet('sign_in_index')
				this.sigInData = siginApi.data.data
				console.log("签到请求",this.sigInData)
			},
			//签到按钮
			async siginFinish(){
				let dataApi = await request.requestPost('sign_in_btn')
				console.log("签到按钮",dataApi)
				this.$api.msg(`${dataApi.data.message}`)
				this.get_siginFun()
			},
			//详情页
			navToDetailPage(obj_id) {
				console.log("商品跳转id",obj_id.id)
				uni.navigateTo({
					url: `/pages/product/product?id=${obj_id.id}`
				})
			},
		}
	}
</script>

<style lang="scss">

.sigIn{
	page{ background: #f5f5f5;}
	.sigIn_header{ width:100%;height: 380rpx;background: linear-gradient(340deg,rgb(255, 0, 0) 0%,rgb(48, 117, 243) 100%);font-size:52rpx;font-weight: bold;color: #fff;padding-top:100rpx;padding-left:24rpx}
	.day_num{ margin-left:8rpx;margin-right:8rpx}
	.header_desc{ font-size:72rpx}
	.sigIn_money{ margin-left:12rpx;margin-right:12rpx;color: #FFC400;}
	// 打卡天数
	.sigIn_wek{ width:94%;height: auto;background: #fff;margin:-40rpx auto auto auto;border-radius: 20rpx;padding:40rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;
	.sigIn_wek_T{ display: flex;align-items: center;justify-content: space-between;width:100%}
	.wek_T_item{ width:80rpx;height:80rpx;border-radius: 100%;background:url(http://jlf.db.juntest.com/themes/member_mobile/assets/images/pick.png)center center;background-size: 150%;font-size: 20rpx;display: flex;align-items: center;flex-direction: column;color: #fff;padding-top:4rpx}
	.wek_T_top{ padding-top:10rpx}
	.activeBG{ background: #FF7101 ;}
	.sigIn_wek_B{ margin-top:40rpx;color: #928E8E;font-size: 24rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;}
	.wek_B_n2{ background: #FF7101;color: #fff;margin-top:16rpx;border-radius: 200rpx;font-size: 36rpx;padding:8rpx 0;width:200rpx;text-align: center;}
	}
	//为你推荐
	.sigIn_recommend{ width:94%;height: auto;margin:auto;padding-top:16rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;
		.recommend_title{ font-size:28rpx;color: #888888;}
		.good_list{ width:100%;height:auto;display: flex;flex-wrap: wrap;justify-content: space-between;align-items: center;margin-bottom:20rpx;
			.item{ width:49%;height: auto;background: #fff;border-radius: 10px;margin-top:20rpx;overflow: hidden;
				.good_img{ width:340rpx;height: 340rpx;}
				.good_img image{ width:100%;height: 100%;}
			}
			.item_n2{ width:100%;height: auto;padding:0rpx 20rpx 15rpx 20rpx;font-size: 28rpx;}
			.good_title{ width:100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
			.pay_type{ margin-top:6rpx;margin-bottom:6rpx}
			.good_money{ color: #FF7101;}
			.type_money{ font-size:24rpx;margin-left:10rpx}
		}
	}
}
</style>
