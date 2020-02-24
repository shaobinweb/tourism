<template>
	<view class="hotel_details">
		<view class="img">
			<view class="back"></view>
			<image src="http://funpalau2.db.juntest.com/images/admin/upload/20191211/c45088e6fb5dc2f490d8676fd490823e.jpg"></image>
		</view>
		<view class="introduce" id="comb_1">
			<view class="hotel_title">帕劳百悦大饭店</view>
			<view class="hotel_content">Sea Passion Hotel</view>
			<view class="hotel_characteristic">
				<view class="item">当地五星</view>
				<view class="item">私人沙滩</view>
				<view class="item">出海码头</view>
				<view class="item">室外游泳池</view>
				<!-- <view class="item">秘境圣地</view>
				<view class="item">人间净土</view> -->
			</view>
			<view class="content">酒店拥有众多度假设施和装满热带鱼与活珊瑚的碧蓝色礁湖及许多近在咫尺 的葱绿小岛。</view>
		</view>
		<view class="hotel_box1" id="comb_2">
			<view class="box1_title">设施服务</view>
			<view class="box1_list">
				<view class="item">
					<image src="../../static/hotel/0.png"></image>
					<view>私人浴室淋浴</view>
				</view>
				<view class="item">
					<image src="../../static/hotel/1.png"></image>
					<view>客房茶设施</view>
				</view>
				<view class="item">
					<image src="../../static/hotel/2.png"></image>
					<view>免费洗浴用品</view>
				</view>
				<view class="item">
					<image src="../../static/hotel/3.png"></image>
					<view>客房电视机</view>
				</view>
				<view class="item">
					<image src="../../static/hotel/4.png"></image>
					<view>大厅WIFI</view>
				</view>
			</view>
		</view>
		<view class="hotel_box2"  id="comb_3">
			<view class="box2_title">房型预订</view>
			<view class="box2_time" @click="open">
				<view class="time_lef">
					<view class="ks_time">10月20日 今日入住</view>
					<view class="sc">5晚</view>
					<view class="ks_time">10月25日 结束时间</view>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
			<view class="box2_list">
				<image src="http://funpalau2.db.juntest.com/images/admin/upload/20191211/1988459767c88e333b068478a17915cf.png"></image>
				<view class="list_rig">
					<view class="rig_title">标准海景房  Ocean View Room</view>
					<view class="list_rig_item">
						<view class="item_list">
							<view class="iconfont" style="color: #F83144;">&#xe602;</view>
							<view class="name">电视</view>
						</view>
						<view class="item_list">
							<view class="iconfont" style="color: #F83144;">&#xe62f;</view>
							<view class="name">电话</view>
						</view>
						<view class="item_list">
							<view class="iconfont" style="color: #F83144;">&#xe63d;</view>
							<view class="name">空调</view>
						</view>
					<!-- 	<view class="item_list">
							<view class="iconfont" style="color: #F83144;">&#xe632;</view>
							<view class="name">吹风机</view>
						</view> -->
						<view class="item_list">
							<view class="iconfont" style="color: #F83144;">&#xe640;</view>
							<view class="name">冰箱</view>
						</view>
						<view class="item_list">
							<view class="iconfont" style="color: #F83144;">&#xe90a;</view>
							<view class="name">拖鞋</view>
						</view>
						<view class="item_list">
							<view class="iconfont" style="color: #F83144;">&#xe661;</view>
							<view class="name">沙发</view>
						</view>
					</view>
					<view class="lable_s">
						<view class="lable_lef">
							<view >立减</view>
							<view>天天特惠</view>
						</view>
						<view class="price">
							<text>￥</text>
							<text class="price_num">1988</text>
							起
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="hotel_box3">
			<view class="box3_title">
				<view class="title">预订须知</view>
				<view class="title_gd">
					<view class="gd_name">查看详情</view>
					<view class="iconfont">&#xe603;</view>
				</view>
			</view>
			<view class="box3_list">
				<view class="item">
					<view class="item_name">入住时间</view>
					<view class="item_content">12:00 至 23:59以后入住12:00之前退房</view>
				</view>
				<view class="item">
					<view class="item_name">携带宠物</view>
					<view class="item_content">不可携带宠物</view>
				</view>
				<view class="item">
					<view class="item_name">可住人数</view>
					<view class="item_content">可住2人,不可加客</view>
				</view>
				<view class="item">
					<view class="item_name">特殊说明</view>
					<view class="item_content">联系电话8888-88888888</view>
				</view>
			</view>
		</view>
		<view class="hotel_box4">
			<view class="box4_title">相关推荐</view>
			<view class="box4_list">
				<view class="img">
					<view class="hot">HOT</view>
					<image src="http://funpalau2.db.juntest.com/uploads/tourism/20180904/af4afe4f7f189163ed40bf5e5829e7bd.jpg" mode="aspectFill"></image>
				</view>
				<view class="list_rig">
					<view class="rig_title">【帕劳】澳门直飞帕劳6天5晚自由行  (3天海船票...</view>
					<view class="bq">
						<view class="bq_item">落地签说走就走</view>
						<view class="bq_item">落地签说走就走</view>
					</view>
					<view class="lable_s">
						<view class="price">
							<text>￥</text>
							<text class="price_num">1988</text>
							起
						</view>
						<view class="lable_lef">
							<view class="iconfont">&#xe6e5;</view>
							<view>多地出发</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="fonter_kf">咨询客服</view>
			<view class="fonter_phone">电话咨询</view>
		</view>
		<calendar @change="change" :modal="true" :show="showCaledar"></calendar>
	</view>
</template>
<!-- -->
<script>
	import calendar from '@/components/xinAdd/date-picker.vue';
	export default{
		components:{calendar},
		data(){
			return{
				showCaledar:true
			}
		},
		onShow() {
			// comb_3
			
		},
		methods:{
			change({ choiceDate, dayCount }) {
				//参数解释
				//1.choiceDate 时间区间（开始时间和结束时间）
				//2.dayCount 共多少晚
				this.time=choiceDate[0].re + '  到 ' + choiceDate[1].re 
				console.log(choiceDate, dayCount);
				// console.log('入住从 ' + choiceDate[0].re + '  到 ' + choiceDate[1].re + '  共 ' + dayCount + ' 晚');
			},
			open(){
				this.showCaledar=!this.showCaledar
			}
		}
	}
</script>

<style lang="scss">
	page{background: #F4F4F4;}
	
	.hotel_box4{
		background: #FFFFFF;
		padding: 20upx 20upx 110upx;
		
		.box4_title{font-size: 34upx;color: #000000;font-weight: 600;}
		.box4_list{
			margin-top: 20upx;
			.img{
				width: 250upx;
				height: 220upx;
				margin-right: 10upx;
				position: relative;
				border-radius: 10upx;
				.hot{
					display: inline-block;
					font-size: 26upx;
					padding: 6upx;
					background: #EF001E;
					color: #FFFFFF;
					font-weight: 600;
					border-radius: 10upx 0 10upx 0;
					position: absolute;
					left: 0;
					top: 0;
					z-index: 100;
				}
			}
			display: flex;
			// align-items: center;
			flex-direction: row;
			justify-content: space-between;
			image{
				display: inline-block;
				width: 250upx;
				height: 220upx;
				border-radius: 10upx;
				margin-right: 10px;
			}
			.list_rig{
				.rig_title{
					font-size: 30upx;
					font-weight: 600;
				}
				.bq{
					display: flex;
					align-items: center;
					color: #FF7700;
					padding: 20upx 0;
					
					.bq_item{margin-right: 8upx;font-size: 26upx;background: rgba(255,119,0,0.2);padding: 8upx 10upx;
					border-radius: 4upx;}
				}
				.lable_s{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.price{
						color: #FF7700;
						font-weight: 600;
						.price_num{font-size: 36upx;}
					}
					.lable_lef{
						display: flex;
						align-items: center;
						color: #000000;
						.iconfont{color: #FF7700;}
					}
				}
			}
		}
	}
	.hotel_box3{
		margin: 20upx 0;
		background: #FFFFFF;
		padding: 20upx ;
		color: #000000;
		.box3_title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			// margin-bottom: 10upx;
			.title{font-size: 34upx;font-weight: 600;}
			.title_gd{
				color: #00BAFF;
				display: flex;
				align-items: center;
				.gd_name{margin-right: 10upx;}
				.iconfont{font-size: 26upx;}
			}
		}
		.box3_list{
			.item{
				display: flex;
				align-items: center;
				border-bottom: 1upx solid #eee;
				padding: 20upx 0;
				
				.item_name{font-size: 28upx;font-weight: 500;color: #000000;margin-right: 30upx;}
				.item_content{font-size: 28upx;color: #555555;}
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
	.img{position: relative;}
	.back{
		display: inline-block;
		width: 60upx;
		height:60upx;
		background: url(../../static/hotelR_back.png) no-repeat center;
		background-size: cover;
		position: absolute;
		top: 70upx;
		left: 15upx;
		z-index: 100;
	}
	.introduce{
		background: #FFFFFF;
		padding:20upx;
		.hotel_title{font-size: 34upx;color: #000000;font-weight: 600;}
		.hotel_content{font-size: 30upx;color: #555555;margin: 15upx 0;}
		.hotel_characteristic{
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			.item{
				border: 1px solid #FFA900;
				padding: 16upx 14upx;
				color: #FFA900;
				
			}
		}
		.content{
			color: #6C6C6C;
			padding: 15upx 0 0;
		}
	}
	.hotel_box1{
		margin: 14upx 0;
		background: #FFFFFF;
		padding: 20upx;
		.box1_title{font-size: 34upx;font-weight: 600;}
		.box1_list{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20upx 0;
			.item{
				text-align: center;
				font-size: 24upx;
				image{
					display: inline-block;
					width: 80upx;
					height: 80upx;
				}
				view{color: #FF7700;}
			}
		}
	}
	.hotel_box2{
		background: #FFFFFF;
		padding: 20upx 20upx ;
		.box2_title{font-size: 34upx;font-weight: 600;}
		.box2_time{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 0;
			.time_lef{display: flex;align-items: center;
				.ks_time{color: #00BAFF;font-size: 30upx;font-weight: 500;}
				.sc{
					color: #6C6C6C;
					border: 1px solid #6C6C6C;
					padding: 5upx 8upx;
					border-radius: 20upx;
					margin: 0 15upx;
				}
			}
		}
		.box2_list{
			display: flex;
			padding: 30upx 0 20upx;
			border-top: 1upx solid #E4E4E4;
			image{display: inline-block;width: 250upx;height: 220upx;border-radius: 20upx;margin-right: 20upx;}
			.list_rig{
				.rig_title{font-weight: 600;font-size: 30upx;border-bottom: 1upx solid #000;padding: 0 0 15upx 0;}
				.list_rig_item{
					display: flex;
					text-align: center;
					padding-top: 10upx;
					.item_list{
						margin-right: 10upx;
						.iconfont{font-size: 52upx;}
						.name{font-size: 26upx;color: #4E4E4E;}
					}
				}
			}
			.lable_s{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10upx 0;
				.lable_lef{
					display: flex;
					align-items: center;
					view{
						color: #F83144;
						border: 1upx solid #F83144;
						border-radius: 10upx;
						padding:5upx 10upx ;
						&:nth-of-type(1){
							margin-right: 20upx;
						}
					}
				}
				.price{
					font-weight: 600;
					color: #FE760A;
					.price_num{font-size: 36upx;}
				}
			}
		}
		
	}
</style>
