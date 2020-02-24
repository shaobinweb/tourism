<template>
	<view class="evaluate">
		<view class="evaluate_header">
			<block v-for="(item,index) in evaluate_header_list" :key="index">
				<view class="evaluate_header_content" :class="{'bor':item.id==id}" @click="evaluateFun(item.id)">
					<view>{{item.name}}</view>
					<view>{{item.number}}</view>
				</view>
			</block>
		</view>
		<uni-load-more :status="loadingType">
			<!-- <view>是的发送到发送到</view> -->
		</uni-load-more>
		<view class="evaluate_list">
			<view class="evaluate_list_content" v-for="item in comment_data.comment_list" :key="item.id">
				<view class="evaluate_list_content_top">
					<view class="top_lef">
						<image :src="item.user_headpic"></image>
						<view>{{item.username}}</view>
					</view>
					<view class="top_rig">{{item.add_time}}</view>
				</view>
				<view class="evaluate_list_content_btu">
					<view class="connent_box" v-if="item.content!=''">{{item.content}}</view>
					<view class="connent_image" v-if="item.img.length!=0">
						<block v-for="(imgList,index) in item.img" :key="index">
							<image :src="imgList" mode="aspectFit"></image>
						</block>
					</view>
					<view class="btu_class">{{item.spec_item}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import request from '@/tool/request.js'
	export default{
		name:"evaluate",
		components:[uniLoadMore],
		data(){
			return{
				evaluate_header_list:[{id:1,number:12,name:"全部"},{id:2,number:2,name:"好评"},{id:3,number:32,name:"中评"},{id:4,number:42,name:"差评"}],
				id:1,
				loadingType:"more",
				goods_id:'',//商品id
				type:1,//1 全部 2好评 3 中评 4差评
				comment_data:null,//评论信息
			}
		},
		onLoad(pos) {
			console.log(pos)
			this.goods_id = pos.good_id
			this.get_comment()
		},
		onShow() {
			
		},
		methods:{
			//获取评论
			async get_comment(){
				let _this = this
				let data_api = await request.requestPost('comment_index',{
					goods_id:_this.goods_id,
					type:_this.type
				})
				_this.comment_data = data_api.data.data
				_this.evaluate_header_list[0].number = _this.comment_data.comment_f.num_total
				_this.evaluate_header_list[1].number = _this.comment_data.comment_f.num_good
				_this.evaluate_header_list[2].number = _this.comment_data.comment_f.num_mid
				_this.evaluate_header_list[3].number = _this.comment_data.comment_f.num_bad
				console.log("评论",data_api)
			},
			evaluateFun(id){
				this.id=id
				this.type = id
				this.get_comment()
			}
		}
	}
</script>

<style lang="scss">
	page{background: #f0f0f0;}
	.evaluate_header view.bor{border-bottom: 4upx solid #e4393c;}
	.connent_image{ width:100rpx;height: 100rpx;display: flex;margin-top:20rpx;
		image{ width:100%;height: 100%;margin-right:20rpx}
	}
	.connent_box{ margin-top:20rpx}
	.evaluate_header{
		display: flex;
		background: #FFFFFF;
		.evaluate_header_content{
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: center;
			padding: 20upx 0;
			view{
				&:nth-of-type(1){
					font-size: 28upx;
					color: #333;
					text-align: center;
				}
				&:nth-of-type(2){
					font-size: 24upx;
					color: #999;
					text-align: center;
					padding: 12upx 0;
				}
			}
			
		}
	}
	.evaluate_list{
		background: #FFFFFF;
		margin-top: 20upx;
		.evaluate_list_content{
			padding: 20upx 50upx; 
			border-bottom:1px solid #e8e8e8;
			.evaluate_list_content_top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.top_lef{
					display: flex;
					align-items: center;
					image{width: 90upx;height:90upx;border-radius: 50upx;display: inline-block;margin-right: 10upx;}
					view{font-size: 24upx;color: #333333;}
				}
				.top_rig{
					font-size: 24upx;
					color: #999;
				}
			}
			.evaluate_list_content_btu{
				margin-left:20rpx;
				.btu_class{font-size: 24upx;color: #999;margin-top: 16upx;}
			}
		}
	}
</style>