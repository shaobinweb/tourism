<template>
	<view class="hotel">
		<view class="header">
			<view class="back" @click="back"></view>
			<view class="header_title">酒店预订</view>
		</view>
		<view class="hotel_box1">
			<view class="box1_top">
				<view class="box1_scrool">
					<scroll-view class="scroll" scroll-x="true" show-scrollbar="true">
						<view class="item_s">
							<view class="item">帕劳</view>
							<view class="item">塞班</view>
							<view class="item">日本</view>
							<view class="item">斯里兰卡</view>
							<view class="item">宿务</view>
						</view>
					</scroll-view>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
			<view class="box1_bot">
				<timePicker
				    showType="date"
				    beginDate="1970-01-01"
				    endDate="2030-12-31"
				    beginTime="06:00:00"
				    endTime="23:59:59"
					num='1'
				    @btnConfirm="btnConfirm" 
				    @btnCancel="btnCancel"
				>
				    <view class="bot_list">
				    	<label class="name">入住日期</label>
				    	<view class="time">{{ks_time}}</view>
				    </view>
				</timePicker>
				
				<timePicker
				    showType="date"
				    beginDate="1970-01-01"
				    endDate="2030-12-31"
				    beginTime="06:00:00"
				    endTime="23:59:59"
					num='2'
				    @btnConfirm="btnConfirm" 
				    @btnCancel="btnCancel"
				>
				    <view class="bot_list" style="justify-content: space-between;">
				    	<view class="list_content" >
				    		<label class="name">退房日期</label>
				    		<view class="time">{{js_time}}</view>
				    	</view>
				    	<view class="zs" v-show="ReversedText">共{{ReversedText}}晚</view>
				    </view>
				</timePicker>
				
				<view class="bot_list">
					<label class="name">价格￥</label>
					<view class="time">0</view>
				</view>
				<button class="btu">搜索酒店</button>
			</view>
		</view>
		<view class="img">
			<view class="page-section-spacing">
				<swiper class="swiper" 
					autoplay="true" 
					interval="2000" 
					:indicator-dots ="true" indicator-color="rgba(255, 255, 255, 1)" indicator-active-color="#cc2d1e"
						>
					<swiper-item v-for="(item , index) in carouselList" :key="index" class="swiper_item">
						<image :src="item" mode="widthFix" ></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="hotel_box2">
			<scroll-view class="scroll" scroll-x="true" show-scrollbar="true">
				<view class="item_s">
					<block v-for="(item,index) in box2_option" :key="index">
						<view class="item" :class="{'box2_type':item.id==box2_id}" @click="box2_Fun(item)">{{item.name}}</view>
					</block>
				</view>
			</scroll-view>
			<view class="box2_list">
				<block v-for="(item,index) in list_item_box2" :key="index">
					<view class="list_item" :class="{'box2_types':item.id==box2_id_item}" @click="box2_Fun_item(item)">{{item.name}}</view>
				</block>
			</view>
			<navigator url="/pages/hotel/hotel_details" hover-class="none">
			<view class="product_list">
				<view class="product_list_lef">
					<image src="http://funpalau2.db.juntest.com/images/admin/upload/20191211/83ed8a79dc3f4f24456eed9efb09339f.jpg" mode="aspectFill"></image>
					<view class="hot" v-if="false">HOT</view>
				</view>
				<view class="product_list_rig">
					<view class="rig_title">帕劳百悦大饭店 最高性价比 最...</view>
					<view class="introduce">Sea Passion HotelMost...</view>
					<view class="rig_list">
						<view class="list_item">依山傍水</view>
						<view class="list_item">私人沙滩</view>
						<view class="list_item">出海码头</view>
					</view>
					<view class="rig_bot">
						<view class="bot_lef">
							<text class="iconfont" style="color: #FF7700;">&#xe6e5;</text>
							<text class="bot_lef_font">帕劳</text>
						</view>
						<view class="bot_rig">
							<view class="bot_rig_model">豪华版</view>
							<view class="bot_rig_price"><text>￥</text><text class="nesting">1988.00</text></view>
						</view>
					</view>
				</view>
			</view>
			</navigator>
		</view>
		
	</view>
</template>

<script>
	import timePicker from '@/components/xinAdd/wing-time-selector/wing-time-selector.vue';
	export default{
		components:{timePicker},
		data(){
			return{
				carouselList:['http://funpalau2.db.juntest.com/images/admin/upload/20191223/8add10df05530f86e664a4a9ab86132b.png'],
				box2_id:1,	
				box2_id_item:1,
				ks_time:'',
				js_time:'',
				ks_times:'',
				js_times:'',
				list_item_box2:[{name:'热梦套餐',id:1},{name:'舒适型',id:2},{name:'豪华型',id:3},{name:'国际五星',id:4}],
				box2_option:[
					{
						name:'帕劳',
						id:1,
					},
					{
						name:'塞班',
						id:2,
					},
					{
						name:'日本',
						id:3,
					},
					{
						name:'斯里兰卡',
						id:4,
					},
					{
						name:'马尔代夫',
						id:5,
					}
				],
				text:"123,456",
			}
		},
		computed: {
			ReversedText: function ()
			{
				if(this.ks_time!=''&&this.js_time!=''){
					var a1 = Date.parse(new Date(this.ks_times));
					var a2 = Date.parse(new Date(this.js_times));
					var day = parseInt((a2-a1)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
					console.log(a1,a2,day)
					return day
				
				}
				
				
			}
		},
		methods:{
			back(){
				uni.navigateBack({})
			},
			box2_Fun(item){
				this.box2_id=item.id
			},
			box2_Fun_item(item){
				this.box2_id_item=item.id
			},
			btnConfirm(e){
				console.log(e)
				let time=e.year+'-'+e.month+'-'+e.day
				if(e.num==1){
					this.ks_time=e.value
					this.ks_times=time
				}else{
					this.js_time=e.value
					this.js_times=time
				}
			},
			GetNumberOfDays(date1,date2){//获得天数
			    //date1：开始日期，date2结束日期
			   
			}

		}
	}
</script>

<style lang="scss">
	.product_list{
		margin-top: 30upx;
		display: flex;
		justify-content: space-between;
		.product_list_lef{
			image{display: inline-block;width: 260upx;height:235upx;}
		}
		.product_list_rig{
			.rig_title{font-size: 30upx;font-weight: 600;}
			.introduce{font-size: 30upx;color: #555555;padding: 10upx 0;}
			.rig_list{
				display: flex;
				align-items: center;
				.list_item{
					border: 1px solid #FF7700;
					padding: 6upx 10upx;
					font-size: 28upx;
					color: #FF7700;
					font-weight: 600;
					margin-right: 10upx;
				}
			}
			.rig_bot{
				display: flex;
				justify-content: space-between;
				margin-top: 30upx;
				padding: 10upx 0upx;
				.bot_rig{
					display: flex;
					.bot_rig_model{margin-right: 20upx;border-bottom: 1px solid #000;}
					.bot_rig_price{
						color: #FF7700;
						.nesting{font-size: 36upx;}
					}
				}
			}
		}
	}
	.hotel_box2{
		width: 96%;
		margin: 0 auto;
		.item_s{display: flex;align-items: center;height: 100upx;
			.item{font-size: 32upx;padding: 0 16upx;margin-right: 10upx;box-sizing: border-box;}
		}
		
	}
	.box2_list{display: flex;align-items: center;margin-top: 20upx;
		.list_item{padding: 10upx 20upx;background: #EEEEEE;color:#666666;font-size: 30upx;margin-right: 26upx;}
	}
	.hotel .hotel_box2  .box2_list .box2_types{background: #F99B04;color: #FFFEFE;}
	.hotel .hotel_box2 .item_s .box2_type{border-bottom: 3px solid #F99B04;font-size: 36upx;font-weight: 600;}
	// 轮播
	.swiper{
		height: 150upx;
		
	}
	.img{margin-top: 400upx;}
	.swiper_item image{
		width: 100%;
		height: 150upx;
		// border-radius: 10upx 10upx 0 0;
	}
	
	.scroll{ width: 100%;
	height: 100upx;
	line-height: 100upx;
	overflow: hidden;
 	white-space: nowrap;}
	.hotel_box1{
		width: 94%;
		position: absolute;
		left: 3%;
		top: 206upx;
		background: #FFFFFF;
		border-radius: 20upx;
		box-shadow: 0 0.06rem 0.31rem 0.07rem rgba(34, 34, 34, 0.16);
		margin: 0 auto;
		.box1_top{
			background: #EBECF0;
			border-radius: 20upx 20upx 0 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding-right: 20upx;
			.box1_scrool{
				
				.item_s{
					display: flex;
					width: 86%;
					.item{
						padding: 0upx 25upx;
						font-weight: 600;
						font-size: 32upx;
						letter-spacing: 2upx;
					}
				}
			}
		}
		.box1_bot{
			padding: 0 24upx;
			.bot_list{
				display: flex;
				align-items: center;
				height: 100upx;
				
				border-bottom: 1upx solid #EEEEEE;
				.name{font-size: 26upx;width: 150upx;}
				.time{font-size: 32upx;font-weight: 600;}
				.list_content{display: flex;align-items: center;justify-content: space-between;}
			}
			.btu{
				width: 92%;
				height: 100upx;
				line-height: 100upx;
				background: rgba(255, 119, 0, 1);
				border-radius: 50upx;
				color: #FFFFFF;
				margin: 20upx auto;
				// padding: 20upx 0;
			}
		}
	}
	.header{
		width: 100%;
		height: 400upx;
		overflow: hidden;
		background: url(../../static/hotelR_banner.png) no-repeat center;
		background-size: cover;
		position: relative;
		// position: relative;
		.back{
			display: inline-block;
			width: 60upx;
			height:60upx;
			background: url(../../static/hotelR_back.png) no-repeat center;
			background-size: cover;
			position: absolute;
			top: 70upx;
			left: 15upx;
		}
		.header_title{text-align: center;color: #FFFFFF;font-size: 34upx;font-weight: 600;letter-spacing: 2upx;height: 200upx;line-height: 200upx;}
	}
</style>
