<template>
	<view class="member">
		<view class="member_top">
			<view class="top"></view>
			<view class="member_beat">
				<view class="member_beat_flex">
					<image :src="userInfo.data.user_list.head_pic || '@/static/missing-face.png'"></image>
					<view class="member_beat_content">
						<view class="yh_pone">{{userInfo.data.user_list.nickname || '游客'}}</view>
						<view class="yh_name">{{userInfo.data.user_list.nickname || '游客'}}的小店</view>
					</view>
				</view>
				<view class="bottom">
					<text class="img"></text>
					<text>升级为ViP后分享可赚钱</text>
				</view>
			</view>
			
		</view>
		<view class="wz"></view>
		<view class="privilege">
			<view class="privilege_list">
				<view class="privilege_list_flex">
					<image src="../../static/meiyong/bigicon_vip_Silver.png"></image>
					<view class="privilege_list_content">
						<view class="privilege_tit">银牌ViP(体验版) </view>
						<view class="privilege_tit_content">邀请3人获得7天VIP体验 | 10人获得30天VIP体验</view>
					</view>
				</view>
			</view>
			<view class="privilege_list">
				<view class="privilege_list_flex">
					<image src="../../static/meiyong/bigicon_vip_Silver.png"></image>
					<view class="privilege_list_content">
						<view class="privilege_tit">银牌ViP </view>
						<view class="privilege_tit_content">升级银牌ViP赠超值优惠券</view>
					</view>
				</view>
				<!-- 立即开通 -->
				<view class="opening" @tap="open_vip"></view>
			</view>
			<view class="privilege_list">
				<view class="privilege_list_flex">
					<image src="../../static/meiyong/bigicon_vip_gold.png"></image>
					<view class="privilege_list_content">
						<view class="privilege_tit">金牌ViP</view>
						<view class="privilege_tit_content">享受专属导师教授营销技能</view>
					</view>
				</view>
			</view>
			<view class="privilege_list">
				<view class="privilege_list_flex">
					<image src="../../static/meiyong/bigicon_vip_diamond.png"></image>
					<view class="privilege_list_content">
						<view class="privilege_tit">钻石ViP</view>
						<view class="privilege_tit_content">自购或销售赚佣金</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<image src="http://jlf.db.juntest.com/images/admin/upload/20191122/842efddbb0b7034cdde4483c11287cf9.jpeg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default{
		name:"member",
		data(){
			return{
				userInfo:'',//会员卡的用户信息
			}
		},
		onShow() {
			let data = uni.getStorageSync('myInofData')
			this.userInfo = data
			console.log("会员资料",data)
		},
		methods:{
			open_vip(){
				uni.navigateTo({
					url:"./pro_list"
				})
			}
		}
	}
</script>

<style lang="scss">
	.member{
		.member_top{
			position: relative;
			.top{background: #C3213B;height: 200rpx;}
			
			.member_beat{
				width: 700upx;
				height: 244upx;
				background: url(~@/static/meiyong/vip_bg.png) no-repeat center;
				background-size: cover;
				margin: auto;
				position: absolute;
				bottom: -76rpx;
				left: 50%;
				transform: translate( -50%);	 
				.member_beat_flex{
					display: flex;
					position: absolute;
					top: 38rpx;
					left: 30rpx;
					image{width: 100rpx;height: 100rpx;border-radius: 50rpx;margin-right: 20rpx;}
					.member_beat_content{
						.yh_pone{font-size: 32rpx;color: rgba(33, 31, 36, 1);}
						.yh_name{font-size: 24rpx;background: linear-gradient(90deg, rgba(190, 197, 216, 1) 0%, rgba(190, 197, 216, 1) 100%);border-radius:26rpx;padding: 10rpx 10rpx;margin-top:8rpx}
					}
				}
			}
			.bottom{
				display: flex;
				align-items: center;
				position: absolute;
				bottom: 20upx;
				left: 30upx;
				.img{width: 44upx;height: 44upx;background: url(../../static/meiyong/impr.png) no-repeat center;background-size:cover ;display: block;margin-right: 10upx;}
				text{font-size: 28upx;color: rgba(65, 71, 85, 1);}
			}	
			
		}
		.wz{
			background: url(../../static/meiyong/vip_bg3.png) no-repeat center;
			background-size: cover;
			width: 100%;
			height: 100upx;
			margin-top: 70upx;
		}
		.privilege{
			background: #F5F5F5;
			padding: 28upx 24upx;
			.privilege_list{
				background: #FFFFFF;
				padding: 0 20upx;
				height: 176upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 24upx;
				border-radius: 16upx;
				&:last-child{
					margin-bottom: 0upx;
					
				}
				.privilege_list_flex{
					display: flex;
					align-items: center;
					
					image{width: 88upx;height: 88upx;display: block;margin-right: 20upx;}
					.privilege_list_content{
						.privilege_tit{font-size: 28upx;color: rgba(33, 31, 36, 1);}
						.privilege_tit_content{font-size: 24upx;color: #666;}
					}
				}
				.opening{
					background: url(../../static/meiyong/btn.png) no-repeat center;
					background-size: contain;
					width: 154upx;
					height: 68upx;
				}
			}
			
		}
		.footer image{width: 100%;display: block;}
	}
</style>