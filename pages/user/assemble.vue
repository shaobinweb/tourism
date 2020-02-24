<template>
	<view class="assemble">
		<view class="assemble_navigation">
			<block v-for="(item,index) in assemble_list" :key="index">
				<view class="item" @click="assembleNavigation(item.id,item.type)" :class="{'show':item.id==id}">{{item.name}}</view>
			</block>
		</view>
		<view class="commodity">
			<view class="commodity_list" v-for="item in list" :key="item.id">
				<view class="commodity_list_left" @tap="navToDetailPage({id:item.goods_detail.id})">
					<image :src="item.goods_detail.thumb"></image>
					<view class="rig">
						<view class="title">{{item.goods_detail.title}}</view>
						<view class="number">{{item.pieces.single_num}}人团</view>
						<view class="price">
							<view class="zx_price">拼团价:¥ {{item.payable_price}}</view>
							<view class="f_price">¥{{item.goods_detail.shop_price}}</view>
						</view>
					</view>
				</view>
				<view class="commodity_list_rig">
					<block v-if="item.whether == 1">
						<view  class="xg">失效</view>
					</block>
					<block v-else>
						<view class="xg" v-if="item.is_pay == 0" @tap="payFun(item.id)">去支付</view>
						<view v-else class="xg" @tap="group_desc(item.id)">拼团中</view>
					</block>
					<view class="time">{{item.end_time.substring(0,10)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import request from '@/tool/request.js'
	export default{
		name:"assemble",
		data(){
			return{
				assemble_list:[{id:1,name:'全部',type:''},{id:2,name:'拼团中',type:'have_in_hand'},{id:3,name:'已成功',type:'success'},{id:4,name:'已失效',type:'fail'}],
				id:1,
				list:[],
				type:''
			}
		},
		async onLoad(ops) {
			this.id = ops.id
			let _this = this
			let list = await request.requestGet('pieces_order_list',{type:ops.type})
			console.log("拼团列表",list)
			this.list = list.data.data.order_list.data
			this.is_time()
		},
		methods:{
			//拼团详情
			group_desc(id){
				uni.navigateTo({
					url:`/pages/assemble/group_details?id=${id}`
				})
			},
			//判断是否失效
			is_time(){
				let _this = this
				_this.list.forEach(item=>{
					let now = new Date().getTime();//当前时间戳
					let end_time = item.end_time.replace(/-/g,"/")//把-换成/
					var end_time_int = new Date(`${end_time}`).getTime();//截止时间戳 
					if(end_time_int>now){
						item.whether = 0
					}
					else{
						item.whether = 1
					}
				})
			},
			async assembleNavigation(id,type){
				let _this = this
				_this.id=id
				// this.type = type
				_this.list = []
				if(type!=''){
					console.log("状态",type)
					let list = await request.requestGet('pieces_order_list',{type:type})
					console.log("拼团列表",list)
					_this.list = list.data.data.order_list.data
					this.is_time()
					
				}
				else{
					console.log("状态",type)
					let list = await request.requestGet('pieces_order_list')
					console.log("拼团列表",list)
					_this.list = list.data.data.order_list.data
					this.is_time()
					
				}
				
			},
			payFun(id){
				uni.redirectTo({
					url:`/pages/assemble/pay?serial_id=${id}&type=product`
				})
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
	page{background: #f9f9f9;}
	.show{border-bottom: 2px solid #C72420;}
	.assemble{
		.assemble_navigation{
			display: flex;
			justify-content: space-around;
			padding: 10upx 0;
			align-items: center;
			background: #FFFFFF;
			box-sizing: border-box;
			.item{font-size: 26upx;color: #333;height: 100upx;line-height: 100upx;}
		}
	}
	.commodity{
		background: #FFFFFF;
		padding: 24upx 20upx;
		margin-top: 20upx;
		.commodity_list{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom:20rpx;
			
			.commodity_list_left{
				display: flex;
				align-items: center;
				.rig{
					view{padding: 5upx 0;}
					margin-left: 14upx;
					.title{font-size: 24rpx;color: #666;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;width:350rpx;margin-right:30rpx;margin-bottom:10rpx}
					.number{font-size: 24upx;color: #e4393c;display: inline-block;border: 1px solid #e4393c;padding: 0 6upx;border-radius: 10upx;}
					.price{
						display: flex;
						align-items: center;
						// height: 40upx;
						// line-height: 40upx;
						.zx_price{font-size: 24upx;color: #e4393c;}
						.f_price{font-size: 20upx;color: #999;text-decoration: line-through;margin-left: 20upx;}
					}
				}
				image{width: 150rpx;height: 150rpx;}
			}
			.commodity_list_rig{display: flex;justify-content: center;flex-direction: column;width:150rpx;
				.xg{font-size: 28upx;color: #e4393c;width:120rpx;display: flex;justify-content: center;}
				.time{font-size: 24upx;color: #333;margin-top:10rpx;}
			}
		}
	}
</style>