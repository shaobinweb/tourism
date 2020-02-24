<template>
	<view class="trip">
		<view class="trip_order">
			<scroll-view scroll-y="true" style="height: 800upx;" class="scroll" @scroll="scroll">
				<view class="scroll_s">
					<view class="line"  :style="{ background: activeColor, height: fontSize + 'upx' }"></view>
					<view>
						<view class="trip_order_list">
							<view class="dot"></view>
							<view class="list_item">
								<view class="time">11月29日 星期四</view>
								<view class="item_content">
									帕劳百悦假期2/3天精品出海浮潜小团（赠送百悦海鲜晚餐+百悦厨师无人岛现做午餐+免费提供美人鱼拍照道具服+可订出海导游跟拍）
								</view>
								<view class="item_setmal">套餐类型: 两天出海</view>
								<view class="item_person_num">出游人数: 1人</view>
								<view class="date">
									<view class="data_lef">出行日期: 2019-11-29</view>
									<navigator url="/pages/order_details/list_order_details">
										<view class="data_rig">
											<view class="rig_name">查看详情</view>
											<view class="iconfont">&#xe603;</view>
										</view>
									</navigator>
								</view>
							</view>
						</view>
						<view class="trip_order_list">
							<view class="dot"></view>
							<view class="list_item">
								<view class="time">11月29日 星期四</view>
								<view class="item_content">
									费提供美人鱼拍照道具服+可订出海导游跟拍）
								</view>
								<view class="item_setmal">套餐类型: 两天出海</view>
								<view class="item_person_num">出游人数: 1人</view>
								<view class="date">
									<view class="data_lef">出行日期: 2019-11-29</view>
									<view class="data_rig">
										<view class="rig_name">查看详情</view>
										<view class="iconfont">&#xe603;</view>
									</view>
								</view>
							</view>
						</view>
						<view class="trip_order_list">
							<view class="dot"></view>
							<view class="list_item">
								<view class="time">11月29日 星期四</view>
								<view class="item_content">
									费提供美人鱼拍照道具服+可订出海导游跟拍）
								</view>
								<view class="item_setmal">套餐类型: 两天出海</view>
								<view class="item_person_num">出游人数: 1人</view>
								<view class="date">
									<view class="data_lef">出行日期: 2019-11-29</view>
									<view class="data_rig">
										<view class="rig_name">查看详情</view>
										<view class="iconfont">&#xe603;</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="project_list">
			<block v-for="(item,index) in project" :key="index">
				<view class="list_item">
					<view class="number">{{item.id}}</view>
					<view class="tile">{{item.title}}</view>
					<view class="item_content">{{item.content}}</view>
				</view>
			</block>
		</view>
		<view class="dh_list" v-if="dh_type">
			<block v-for="(item,index) in dh_list" :key="index">
				<view class="dh_list_item" :class="{'dh_chass':item.id==dh_id}" @tap="dh_optionFun(item)">{{item.name}}</view>
			</block>
			
		</view>
		<!-- tourlinebanner.png -->
		<view class="img">
			<image src="../../static/ad_in_tourline.png" mode="widthFix"></image>
		</view>
		<view class="discount" style="padding-bottom: 100upx;">
			<view class="discount_list">
				<view class="discount_list_item">
					<view class="sx_th">限时特惠</view>
					<image src="http://funpalau2.db.juntest.com//uploads/tourism/20180831/ebe20ed6cc3251bba337eb1d42773b1e.jpg" mode="aspectFill"></image>
					<view class="item_title">【澳门,,】帕劳百悦假期2/3天精品出海浮潜小团</view>
					<view class="item_price">
						<view class="price_lef">￥1350.00</view>
						<view class="price_rig">
							<view class="iconfont">&#xe6e5;</view>
							<view class="rig_writing">澳门出发</view>
						</view>
					</view>
				</view>
				<view class="discount_list_item">
					<view class="sx_th">限时特惠</view>
					<image src="http://funpalau2.db.juntest.com//uploads/tourism/20180831/ebe20ed6cc3251bba337eb1d42773b1e.jpg" mode="aspectFill"></image>
					<view class="item_title">【澳门,,】帕劳百悦假期2/3天精品出海浮潜小团</view>
					<view class="item_price">
						<view class="price_lef">￥1350.00</view>
						<view class="price_rig">
							<view class="iconfont">&#xe6e5;</view>
							<view class="rig_writing">澳门出发</view>
						</view>
					</view>
				</view>
				<view class="discount_list_item">
					<view class="sx_th">限时特惠</view>
					<image src="http://funpalau2.db.juntest.com//uploads/tourism/20180831/ebe20ed6cc3251bba337eb1d42773b1e.jpg" mode="aspectFill"></image>
					<view class="item_title">【澳门,,】帕劳百悦假期2/3天精品出海浮潜小团</view>
					<view class="item_price">
						<view class="price_lef">￥1350.00</view>
						<view class="price_rig">
							<view class="iconfont">&#xe6e5;</view>
							<view class="rig_writing">澳门出发</view>
						</view>
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
				activeColor:'#FF9600',
				fontSize:800,
				dh_type:false,
				dh_id:1,
				dh_list:[{name:'自由泳',id:1},{name:'当地游',id:2},{name:'深潜',id:3},{name:'酒店预订',id:4}],
				project:[{
					title:'自由出行',
					content:'背着包无拘无束自由旅行',
					id:1,
				},
				{
					title:'当地游玩',
					content:'深入探索当地独特景点',
					id:2,
				},{
					title:'深潜推送',
					content:'世界上著名的潜水圣地',
					id:3,
				},{
					title:'酒店预订',
					content:'入住精品度假酒店',
					id:4,
				},]
			}
		},
		methods:{
			scroll(e){
				// console.log(e)
				this.fontSize=e.detail.scrollHeight*2
			},
			dh_optionFun(item){
				this.dh_id=item.id
			},	
			
		},
		onPageScroll(e){
			console.log(e)
			if(e.scrollTop>=440){
				this.dh_type=true
			}else{
				this.dh_type=false
			}
			
		}
	}
</script>

<style lang="scss">
	.page{padding-bottom: 100uxp;}
	.dh_list{
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 28upx;
		height: 80upx;
		line-height: 80upx;
		position: fixed;
		top: 50upx;
		left: 0;
		width: 100%;
		background: #FFFFFF;
		z-index: 100;
		
		.dh_list_item{box-sizing: border-box;padding: 0upx 20upx;border-radius: 20upx;}
	}
	.trip .dh_list .dh_chass{box-sizing: border-box;background: rgba(255,180,0,1);height: 50upx;line-height: 50upx;}
	.discount{
		.discount_list{
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			.discount_list_item{
				width: 45%;
				margin-bottom: 20upx;
				border: 1px solid #EEEEEE;
				border-radius: 20upx;
				position: relative;
				.sx_th{background: #EF001E;color: #FFFFFF;padding: 6upx 10px;border-radius: 20upx 0 20upx 0;
					display: inline-block;
					position: absolute;
					left: 0;
					z-index: 100;
				}
				
				image{display: block;width: 100%;height: 260upx;border-radius: 20upx;}
				.item_title{font-weight: 500;font-size: 26upx;margin-top: 15upx;line-height: 40upx;}
				.item_price{display: flex;
					align-items: center;
					padding:10upx 10upx ;
					justify-content: space-between;
					.price_lef{color: rgba(255, 119, 0, 1);font-weight: 600;}
					.price_rig{display: flex;align-items: center;
						.iconfont{color: rgba(255, 119, 0, 1);}
					}
				}
			}
			&:after{
				content: '';
				width: 45%;
				
			}
		}
	}
	.img{
		// padding-bottom: 100upx;
		image{display: block;width: 96%;border-radius: 20upx;margin: 40upx auto;}}
	.scroll{
		.scroll_s{
			display: flex;
			justify-content: space-around;
			
		}
		.line{height: 600upx;width: 6upx;background: #EEEEEE;margin: 0 20upx;transition: height 1s}
	}
	.dot{
		z-index: 100;
		display: inline-block;
		position: absolute;
		left: -32upx;
		padding:6upx;
		border: 4upx solid #eee;
		border-radius: 40upx;
		background-color: #fff;
		// box-shadow: 3px 3px 8px #ccc;
		transition: .5s;
		top: 24upx;
		border: 2px solid #FF9600;
	}
	.trip_order_list{
		// padding: 20upx;
		margin-right: 20upx;
		width: 96%;
		position:relative ;
		margin-top:10upx;
		
		transition: left 1s;
		.list_item{
			.time{padding: 15upx 0;}
			.item_content{background: rgba(255,218,212,1);padding:10upx 20upx;border-radius: 20upx 20upx 0 0;font-weight: 600;font-size: 32upx;letter-spacing: 2upx;line-height: 40upx; }
			.item_setmal{margin-left: 20upx;padding-top: 15upx;}
			.item_person_num{margin-left: 20upx;padding-top: 15upx;}
			.date{
				display: flex;
				justify-content: space-between;
				margin-left: 20upx;
				padding-top: 15upx;
				.data_rig{
					color: #FF9600;
					display: flex;
					align-items: center;
				}
			}
		}
	}
	.project_list{
		display: flex;
		align-items: center;
		justify-content: space-around;
		
		flex-wrap: wrap;
		.list_item{
			position: relative;
			text-align: center;
			border-radius: 20upx;
			border: 1px solid #A0A0A0;
			width: 45%;
			margin-top: 20upx;
			.tile{font-size: 34upx;letter-spacing: 4upx;font-weight: 600;padding: 14upx 0;}
			.item_content{color: #979797;padding-bottom: 14upx;}
			.number{background: linear-gradient(90deg, rgba(255, 51, 84, 1) 0%, rgba(239, 95, 144, 1) 100%);
				border-radius: 10upx 0 10upx 0;color: #FFFFFF;
				position: absolute;
				padding: 0 10upx;
			}
		}
	}
	
</style>
