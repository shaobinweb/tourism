<template>
	<view class="group">
		<view class="group_n1">
			<view class="group_good">
				<view class="good_top" @tap="navToDetailPage({id:detail_data.goods.id})">
					<view class="good_image">
						<image :src="detail_data.goods.thumb"></image>
					</view>
					<view class="good_info">
						<view class="good_name">
							{{detail_data.goods.title}}
						</view>
						<view class="good_spec">{{detail_data.pieces_order.spec_title}}</view>
						<view class="good_np">
							<view class="good_np_left">{{detail_data.pieces_detail.single_num}}人拼团</view>
							<view class="good_np_right">
								<text>￥{{detail_data.pieces_order.payable_price}}</text>
								<label>￥{{detail_data.goods.shop_price}}</label>
							</view>
						</view>
					</view>
				</view>
				<view class="good_bottom">
					<view class="type_icon">
						<image src="../../../static/sure.png" mode="aspectFit"></image>
						<text>商家包邮发货</text>
					</view>
					<view class="type_icon">
						<image src="../../../static/sure.png" mode="aspectFit"></image>
						<text>七天退货</text>
					</view>
					<view class="type_icon">
						<image src="../../../static/sure.png" mode="aspectFit"></image>
						<text>退货补运费</text>
					</view>
				</view>
			</view>
			<view class="good_end_time">
				还差<text>{{3-detail_data.user_pic.length}}人</text>拼团成功，剩余时间
				<label>{{h}}</label>时
				<label>{{m}}</label>分
				<label>{{s}}</label>秒
			</view>
			<view class="good_user">
				<block v-if="detail_data.user_pic.length == 1">
					<image class="active_use" v-for="item in detail_data.user_pic" :key="item.id" :src="item.head_pic.indexOf('127.0.0.1') >=0 ? '../../static/missing-face.png':item.head_pic" mode="aspectFit"></image>
					<image class="default_usr" mode="aspectFit"></image>
					<image class="default_usr" mode="aspectFit"></image>
				</block>
				<block v-if="detail_data.user_pic.length == 2">
					<image class="active_use" v-for="item in detail_data.user_pic" :key="item.id" :src="item.head_pic.indexOf('127.0.0.1') >=0 ? '../../static/missing-face.png':item.head_pic" mode="aspectFit"></image>
					<image class="default_usr" mode="aspectFit"></image>
				</block>
				<block v-if="detail_data.user_pic.length == 3">
					<image class="active_use" v-for="item in detail_data.user_pic" :key="item.id" :src="item.head_pic.indexOf('127.0.0.1') >=0 ? '../../static/missing-face.png':item.head_pic" mode="aspectFit"></image>
				</block>
			</view>
			<view class="copy_line" @tap="shareFun">邀请好友拼团</view>
		</view>
		<view class="group_n2">
			<view class="group_n2_header">JUNSHOP拼团</view>
			<view class="group_n2_rule">
				<view class="n2_rule_l">
					拼团玩法：支付即开通、邀请好友参与、成功拼团
				</view>
				<view class="group_n2_r yticon">
					<label>详情规则</label>
					<text class="icon-you"></text>
				</view>
			</view>
			<view class="group_step">
				<view class="step_n1">
					<view class="step_left">1</view>
					<view class="step_right">
						<view class="step_titel">支付开团/参团</view>
					</view>
				</view>
				<view class="step_n1">
					<view class="step_left">2</view>
					<view class="step_right">
						<view class="step_titel">邀请好友</view>
					</view>
				</view>
				<view class="step_n1">
					<view class="step_left">3</view>
					<view class="step_right">
						<view class="step_titel">支付开团/参团</view>
						<view class="step_desc">(开团失败自动退款)</view>
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
				id:0,
				detail_data:null,
				remainingd:0,//结束时间倒计时
				h:0,
				m:0,
				s:0,
				set_time:null,
			}
		},
		async onLoad(pos) {
			this.id = pos.id
			this.get_data()
		},
		methods: {
			//分享拼团链接
			shareFun(){
				let line_str = request.baseUrl+'/shop/pieces/detail/id/' + this.detail_data.goods.id +'/pieces/'+ this.detail_data.pieces_detail.id+'/group/'+ this.detail_data.small_pieces_list[0].group_id +'.html'
				console.log("拼团邀请链接",line_str)
				//#ifndef H5
				// 这个代码不存在h5端
					uni.setClipboardData({
						data: line_str,
						success: function () {
							console.log("app端或者小程序复制成功",line_str)
						}
					});
				//#endif
				// uni.navigateTo({
				// 	url:`./product_detail?id=${this.detail_data.goods.id}&pieces=${this.detail_data.pieces_detail.id}&group=${this.detail_data.small_pieces_list[0].group_id}`
				// })
			},
			//得到的秒换算成时分秒
			djs: function() { 
				let time =this.detail_data.pieces_order.end_time//获取目标时间2020-10-20 10:20:10
				// time = time.substring(0,19); 
				time = time.replace(/-/g,'/'); //把时间的-换成/为了兼容
				let timestamp = new Date(time).getTime()//当前时间戳
				this.remainingd = (timestamp/1000)  - Math.round(new Date().getTime()/1000);//时间差
				let h = parseInt(this.remainingd / (60 * 60)) ;
				if(h<10){
					h='0'+h
				}
				let m = parseInt((this.remainingd % (60 * 60)) / 60);
				if(m<10){
					m='0'+m
				}
				let s = (this.remainingd % (60 * 60)) % 60;
				if(s<10){
					s='0'+s
				}
				// console.log('xxxxxxxxxxx时间戳',s)
				this.h=h
				this.m=m
				this.s=s
			},
			// 获取拼团详情
			async get_data(){
				let data_api = await request.requestGet('group_user_detail',{id:this.id})
				console.log("时间xxxxxxxxxxxxx",data_api)
				this.detail_data = data_api.data.data
				
				console.log("拼团详情api",data_api.data.data)
				//倒计时
				this.djs()
				this.set_time = setInterval(this.djs,1000);
			},
			//详情页
			navToDetailPage(obj_id) {
				console.log("商品跳转id",obj_id.id)
				uni.navigateTo({
					url: `/pages/product/product?id=${obj_id.id}`
				})
			},
		},
		destroyed() {
			// 页面消失就清除定时器
			let _this = this
			clearInterval(_this.set_time)
			_this.set_time = null;
		}
	}
</script>

<style lang="scss">
	page{ width:100%;height: 100%;background: #f0f0f0;}
	.group{ width:100%;}
	.group_n1{ width:100%;padding:40rpx 20rpx;background: #fff;
		.group_good{ width:100%;height:auto;border:1px solid #ddd;border-radius: 6rpx;font-size: 24rpx;
			.good_image{ width:160rpx;height: 160rpx;margin-right:30rpx;
				image{ width:100%;height: 100%;}
			}
			.good_info{ width:230px;height: 160rpx;display: flex;flex-direction: column;justify-content: space-between;
				.good_name{overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
				.good_np{ width:100%;display: flex;justify-content: space-between;color: #999;}
				.good_spec{ color:#999}
				.good_np_right{ 
					text{ font-size: 28rpx;color: #e4393c;margin-right:12rpx}
					label{ text-decoration: line-through;}
				}
			}
		}
		.good_top{ width:100%;border-bottom:1px solid #ddd;padding:20rpx 30rpx;display: flex;}
		.good_bottom{ width:100%;height: auto;background: #f8f8f8;padding:20rpx;display: flex;align-items: center;
			.type_icon{ width:100%;height: auto;display: flex;align-items: center;margin-right:20rpx;
				image{ width:28rpx;height: 28rpx;margin-right:4px}
			}
		}
		.good_end_time{ width:100%;display: flex;justify-content: center;align-items: center;font-size: 24rpx;color: #333;margin-top:40rpx;
			text{ color:#e4393c}
			label{ background: #333;padding:0px 4rpx;color: #fff;margin:0px 10rpx}
		}
		.good_user{ width:100%;display: flex;margin:30rpx 0rpx;align-items: center;justify-content: center;
			image{ width:68rpx;height: 68rpx;border-radius: 100%;background: #f5f5f5;margin-right:20rpx}
		}
		.copy_line{ width:94%;margin-left:3%;background: #e4393c;height: 33px;border-radius: 60rpx;color: #fff;font-size:24rpx;display: flex;align-items: center;justify-content: center;}
	}
	.group_n2{ width:100%;height:auto;margin-top:40rpx;background: #fff;padding:20rpx 20rpx 30rpx 20rpx;
		.group_n2_header{ font-size: 28rpx;font-weight: bold;color: #AE0101;font-style: italic;}
		.group_n2_rule{ font-size:24rpx;color: #333;margin-top:20rpx;display: flex;justify-content: space-between;border-bottom:1px solid #ddd;height: 60rpx;}
		.group_n2_r{ font-size:24rpx;color: #aaa;}
		.group_step{ width:100%;height: auto;margin-top:20rpx;font-size:24rpx;display: flex;justify-content: space-between;padding-left:20rpx;padding-right:20rpx}
		.step_n1{ display:flex;align-items: center;}
		.step_left{ margin-right:8rpx;    border: 1px solid #666;border-radius: 50%;font-size: 24rpx;text-align: center;width:30rpx;height: 30rpx;line-height: 25rpx;}
		.step_desc{ color:#aaa}
	}
</style>
