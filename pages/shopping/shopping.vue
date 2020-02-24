<template>
	<view class="shopping">
		<view class="positions">
			<view class="shopping_header">
				<view class="core">任务中心</view>
				<view class="rule">任务规则</view>
			</view>
			<view class="shipping_option">
				<block v-for="(item,index) in task_option" :key="index">
					<view class="item" @click="shippingOption(item.id)">
						<view v-if="item.bloo">{{item.name}}</view>
						<view :class="{state:item.id==id}" v-else>{{item.name}}</view>
						<!-- :style="item.id==id:'color:#CC2D1E;border-bottom: 1px solid'" -->
					</view>
				</block>
			</view>
		</view>
		
		<view class="shipping_list">
			<view class="item">
				<view class="item_lef">
					<image src="../../static/meiyong/sq_icon.png" ></image>
					<view class="introduce">
						<view>省钱专区活动Svip1</view>
						<view>未领取，剩余96条</view>
					</view>
				</view>
				<view class="money">￥320</view>
			</view>
			<view class="item">
				<view class="item_lef">
					<image src="../../static/meiyong/sq_icon.png" ></image>
					<view class="introduce">
						<view>省钱专区活动Svip2</view>
						<view>未领取，剩余120条</view>
					</view>
				</view>
				<view class="money">￥320</view>
			</view>
			<view class="item">
				<view class="item_lef">
					<image src="../../static/meiyong/sq_icon.png" ></image>
					<view class="introduce">
						<view>家教机器人</view>
						<view>未领取，剩余20条</view>
					</view>
				</view>
				<view class="money">￥320</view>
			</view>
			<view class="item">
				<view class="item_lef">
					<image src="../../static/meiyong/sq_icon.png" ></image>
					<view class="introduce">
						<view>叁天特价活动</view>
						<view>未领取，剩余12条</view>
					</view>
				</view>
				<view class="money">￥320</view>
			</view>
			<view class="item">
				<view class="item_lef">
					<image src="../../static/meiyong/sq_icon.png" ></image>
					<view class="introduce">
						<view>省钱专区活动Svip2</view>
						<view>未领取，剩余120条</view>
					</view>
				</view>
				<view class="money">￥320</view>
			</view>
			<view class="item">
				<view class="item_lef">
					<image src="../../static/meiyong/sq_icon.png" ></image>
					<view class="introduce">
						<view>省钱专区活动Svip2</view>
						<view>未领取，剩余120条</view>
					</view>
				</view>
				<view class="money">￥320</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"shopping",
		data(){
			return{
				id:1,
				task_option:[{id:1,name:"普通任务"},{id:2,name:"Vip任务"},{id:3,name:"任务记录"},{id:4,name:"发布任务",bloo:true}]
			}
		},
		methods:{
			shippingOption(id){
				if(id!==4){
					this.id=id
				}
			},
		}
	}
</script>

<style lang="scss">
	.shipping_option .item view.state{color:#CC2D1E;border-bottom: 1px solid}
	.shopping{}
	.positions{position: relative;}
	.shopping_header{
		width: 100%;
		height: 378upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		
		background: url(../../static/meiyong/head_bg.png) center center;
		.core{
			font-size: 32upx;
			color: #FFFFFF;
			margin-right: 100upx;
			margin-bottom: 100upx;
		}
		.rule{
			font-size: 28upx;
			color: rgba(255,255,255,.8);
			margin-right: 40upx;
			margin-bottom: 100upx;
		}
	}
	.shipping_option{
		display: flex;
		position: absolute;
		align-items: center;
		background: #FFFFFF;
		border-radius: 50upx 50upx 0 0;
		width: 100%;
		bottom: 0upx;
		.item{
			flex: 1;
			text-align: center;
			height: 100upx;
			line-height: 100upx;
			font-size: 30upx;
			color: rgba(51,51,51,1);
			view{display: inline-block;}
			&:last-child{
				color: #FFFFFF;
				// background: url(../../static/meiyong/plus.svg);
				border-radius: 0 50upx 0 0;
				background: linear-gradient(270deg,rgba(204,45,30,1) 0%,rgba(255,121,118,1) 100%);
				view{
				background: url(../../static/meiyong/plus.svg) no-repeat 0upx 50%;	
				padding-left: 34upx;
				}
			}
		}
	}
	.shipping_list{
		padding: 0 54upx 0 26upx;
		.item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin:  16upx 0;
			height: 140upx;
			// line-height: 140upx;
			.item_lef{
				display: flex;
				align-items: center;
				image{width: 88upx;height: 88upx;margin-right: 20upx;}
				.introduce{
					view{
						&:nth-of-type(1){font-size: 28upx;color: rgba(51,51,51,1);}
						&:nth-of-type(2){font-size: 24upx;color: rgba(153,153,153,1);}
					}
				}
			}
			.money{font-size: 28upx;font-weight: 600;color: rgba(204,45,30,1);}
		}
	}
</style>