<template>
	<view class="assemble">
		<view class="assemble_img"><image :src="banner" mode="widthFix" style="height: 232rpx;"></image></view>
		<view class="assemble_scroll">
			<scroll-view scroll-x="true" class="bookshelf-content" @scroll="assembleScroll">
				<block v-for="(item, index) in assemble_list" :key="index">
				  <view class="item" @tap="goDetail(item.id)" :class="{'bor':id==item.id}" >
					<text class="item-title text-over-1">{{item.name}}</text>
				  </view>
				</block>
			</scroll-view>
		</view>
		<view class="commodity">
			<view class="commodity_list" v-for="item in list" :key="item.id">
				<view class="commodity_list_left">
					<image :src="item.thumb"></image>
					<view class="rig">
						<view class="title">{{item.title}}</view>
						<view class="number">{{item.single_num}}人团</view>
						<view class="price">
							<view class="zx_price">拼团价:¥ {{item.price}}</view>
							<view class="f_price">¥{{item.shop_price}}</view>
						</view>
					</view>
				</view>
				<view class="commodity_list_rig" :data-id="item.id" :data-pid="item.group_pieces_id" @tap="go_group">
					去拼团
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default{
		name:'assemble',
		data(){
			return{
				id:1,
				assemble_list:[],
				list : '',
				banner:'',
				good_id:'',
				p_id:0
			}
		},
		async onShow() {
			let group_fl = await request.requestGet('group_fl')
			console.log("分类",group_fl)
			this.assemble_list = group_fl.data.data.first_category//拼团分类
			this.id = this.assemble_list[0].id
			let group_api = await request.requestGet('group_index')
			console.log("拼团列表",group_api)
			this.list = group_api.data.data.group_goods_list//拼团商品列表
			
			//拼团banner
			let banner_api = await request.requestGet('pieces_banner')
			this.banner = banner_api.data.data.banner[0].ad_pic
		},
		methods:{
			//拼团列表
			async get_list(){
				console.log("请求的id",this.id)
				let group_api = await request.requestGet('group_index',{category:this.id})
				console.log("列表",group_api)
				this.list = group_api.data.data.group_goods_list//拼团商品列表
			},
			// 去拼团
			go_group : function(e){
				console.log("拼团id",e)
				this.good_id = e.target.dataset.id
				this.p_id = e.target.dataset.pid
				console.log("拼团的id",this.p_id)
				uni.navigateTo({
					url:`./product?id=${this.good_id}&p_id=${this.p_id}`
				})
			},
			assembleScroll(){},
			goDetail(e){
				this.id=e
				this.get_list()
			},
		}
	}
</script>
<style lang="scss">
	page{background: #eee;}
	.bor{border-bottom: 4upx solid red;}
	.assemble{
		width: 100%;
		.assemble_img{
			image{width: 100%;}
		}
		.assemble_scroll{
			background: #FFFFFF;
			.bookshelf-content {
			        white-space: nowrap; // 滚动必须加的属性
			        width: 100%;
			        .item {
			          display: inline-block;
			          vertical-align: top;
					  padding: 20upx 30upx;
			          .item-title {
			            display: block; // 让字体换行
			            height: 60upx;
			            line-height: 60upx;
			            font-size: 24upx;
						color: #999; 
			        }
			    }
			}
		}
		
	}
	.commodity{
		background: #FFFFFF;
		padding: 24upx;
		margin-top: 20upx;
		.commodity_list{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.commodity_list_left{
				display: flex;
				align-items: center;
				.rig{
					view{padding: 5upx 0;}
					margin-left: 20px;
					.title{font-size: 28upx;color: #666;}
					.number{font-size: 24upx;color: #999;}
					.price{
						display: flex;
						align-items: center;
						height: 40upx;
						line-height: 40upx;
						.zx_price{font-size: 24upx;color: #e4393c;}
						.f_price{font-size: 20upx;color: #999;text-decoration: line-through;margin-left: 20upx;}
					}
				}
				image{width: 150upx;height: 150upx;}
			}
			.commodity_list_rig{
				height: 60upx;
				width: 120upx;
				line-height: 60upx;
				text-align: center;
				font-size: 26upx;
				background: #333;
				color: #fff; 
				border-radius: 10upx;
			}
		}
	}
</style>