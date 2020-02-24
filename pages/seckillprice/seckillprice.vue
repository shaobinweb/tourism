<template>
	<view class="seckill" id="seckill">
		<view class="seckill_pad">
			<view class="seckill_contnet">
				<view class="seckill-section_list" v-for="(item,index) in time_slot" @click="seckill(index)" :key="index">
					<view class="item" :class="{'bor':(item.status==1&&select_if == true)||  (select_nav == index&&select_if == false)}">
						<text class="icon"></text>
						<text class="item_font">{{item.time}}</text>
						<view class="line"></view>
					</view>
					<view class="list_title" v-if="item.status == 0">已结束</view>
					<view class="list_title" v-if="item.status == 1">抢购中</view>
					<view class="list_title" v-if="item.status == 2">待开始</view>
				</view>
			</view>
			<view class="time">
				<view class="time_title">距离本场结束</view>
				<view class="count_down">
					<view class="hours">{{h}}</view>
					<view>:</view>
					<view class="mintes">{{m}}</view>
					<view>:</view>
					<view class="second">{{s}}</view>
				</view>
			</view>
		</view>
		<view class="seckill_bar"></view>
		<view class="seckill_middle">
			优先秒杀
		</view>
		<view class="seckill_bar"></view>
		<view class="seckill_list">
			
		</view>
		<view class="commodity" v-if="list.length != 0">
			<view class="commodity_list" v-for="item in list" :key="item.panic_id" :data-id= "item.goods.goods_id" @tap="go_desc">
				<view class="commodity_list_left">
					<image :src="item.goods.thumb"></image>
					<view class="rig">
						<view class="title">{{item.goods.title}}</view>
						<view class="number">剩余<text>{{item.goods.stock}}</text>件</view>
						<view class="price">
							<view class="zx_price">秒杀价:¥ {{item.goods.price}}</view>
							<view class="f_price">¥{{item.goods.shop_price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default{
		name:'seckillprice',
		data(){
			return{
				time_slot:[],//抢购时间段
				id:0,
				remainingd:0,//结束时间倒计时
				h:0,
				m:0,
				s:0,
				list :[],//抢购列表
				select_nav:-1,
				select_if:true
			}
		},
		async onShow() {
			let _this = this
			let seckill = await request.requestGet('seckill')
			console.log("秒杀请求",seckill)
			let data = seckill.data.data
			_this.time_slot = data.time_slot
			_this.list = data.recommend_list//抢够列表
			//获取当前抢购时间倒计时
			Object.keys(_this.time_slot).forEach(function(key){
				if(_this.time_slot[key].status == 1){
					console.log(key,_this.time_slot[key]);
					_this.remainingd = _this.time_slot[key].end_time - Math.round(new Date().getTime()/1000)//结束时间倒计时
				}
			});
			console.log("秒杀列表",data)
		},
		onLoad() {
			this.jishiqi()
			setInterval(this.jishiqi,1000);
		},
		methods:{
			//跳转秒杀秒杀
			go_desc:function(e){
				console.log(e.currentTarget.dataset.id)
				uni.navigateTo({
					url:`./product?id=${e.currentTarget.dataset.id}`
				})
			},
			async seckill(id){
				this.select_if = false//修改是否切换，防止切换选中的状态和默认抢购的冲突
				let type = Number(id)
				let list_api = await request.requestGet('seckill',{type:type})
				let data = list_api.data.data
				this.time_slot = data.time_slot
				this.list = data.recommend_list//抢够列表
				console.log("请求",data)
				this.id=id
				this.select_nav = id
				console.log(this.select_nav)
			},
			//倒计时计时器
			jishiqi: function() {
				let that=this
				var dj = that.remainingd;
				if (dj <= 0) {
					that.remaining = "已过期";
				} else {
					var ddf = that.djs(dj); //格式化过后的时间
					that.remaining = ddf;
					//当前时间减去时间
					dj = dj - 1;
					that.remainingd = dj;
				}
			},
			//得到的秒换算成时分秒
			djs: function(ms) { 
				let h = parseInt(ms / (60 * 60)) ;
				if(h<10){
					h='0'+h
				}
				let m = parseInt((ms % (60 * 60)) / 60);
				if(m<10){
					m='0'+m
				}
				let s = (ms % (60 * 60)) % 60;
				if(s<10){
					s='0'+s
				}
				this.h=h
				this.m=m
				this.s=s
			},
			
		}
	}
</script>

<style lang="scss">
	page{background: #eee;}
	#seckill .seckill_contnet .seckill-section_list .bor{background: #333;
		.item_font{color: #fff;}
	}
	.seckill{
		.seckill_pad{
			padding: 15upx;
			width: 100%;
			background: #FFFFFF;
			.seckill_contnet{
				display: flex;
				justify-content:space-around;
				.seckill-section_list{
					width: 18%;
					margin-right: 3%;
					z-index: 1000;
					.item{
						background: #f7f7f7;
						color: #666;
						text-align: center;
						display: flex;
						flex-direction: column;
						border-radius: 10upx;
						padding: 4upx 0;
						position: relative;
						width: 100%;
						.icon{
							display: inline-block;
							width: 40upx;
							height: 40upx;
							background: url(../../static/meiyong/sz.png) no-repeat center center;
							background-size: 100% 100%;
							margin: 0 auto;
						}
						.item_font{
							width: 100%;
							font-size: 20upx;
							
						}
					}
					.line{width: 34%;position: absolute;height: 6upx;background: #F8F8F8;right: -48upx;top: 36upx;}
					.list_title{font-size: 20upx;color: #666;width: 100%;text-align: center;margin-top: 8upx;}
					&:last-child{
						margin-right: 0;
					}
				}
			}
			.time{
				text-align: center;
				margin-top: 20upx;
				.time_title{
					font-size: 24upx;
					color: #333;
						
				}
				.count_down{
					display: flex;
					justify-content: center;
					align-items: center;
					.hours,.mintes,.second{
						font-size: 18upx;
						background: #333;
						color: #fff;
						padding: 5upx 20upx;
						border-radius: 10upx;
						margin: 0 7upx;
					}
				}
			}
		}
		.seckill_bar{
			height: 20upx;
			background: #f8f8f8;
		}
		.seckill_middle{
			text-align: center;
			font-size: 24upx;
			color: #333;
			background: #FFFFFF;
			padding: 30upx 0;
			&::before{
				content: "";
				display: inline-block;
				height: 1px;
				background: #ccc;
				width: 200upx;
				vertical-align: middle;
				margin-right: 10upx;
			}
			&::after{
				content: "";
				display: inline-block;
				height: 1px;
				background: #ccc;
				width: 200upx;
				vertical-align: middle;
				margin-left: 10upx;
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
				margin-bottom:20rpx;
				.commodity_list_left{
					display: flex;
					align-items: center;
					.rig{
						view{padding: 5upx 0;}
						margin-left: 20px;
						.title{font-size: 28upx;color: #666;}
						.number{font-size: 24upx;color: #999; text{color: #333;font-weight: bold;padding: 0 4upx;}}
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
			}
		}
		
	}
</style>