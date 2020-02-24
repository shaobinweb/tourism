<template>
	<view class="conbox">
		<view class="container">
			<image class="back_page" src="../../static/back.png" mode="aspectFit" @tap="backFun"></image>
			<!-- 背景 -->
			<image src="../../static/img/bg.png" class="cont" mode="widthFix"></image>
			<view class="header">
				<view class="rule" @tap="showRuleDialog">
					<text >活动规则</text>
				</view>
				<view class="rule"  @click="showMyPrizeDialog">
					<text >我的奖品</text>
				</view>
			</view>
			<view class="title_box">
				<image src="../../static/banner2.png" class="title_banner" mode=widthFix></image>
			</view>
			<view class="main">
				<view class="canvas-container">
					<canvas class="canvas"  canvas-id="canvas"  :style="'width:'+canvasWidth+'px;height:'+canvasHeight+'px;'"></canvas>
					<image :src="inLottery?'../../static/img/start.png':'../../static/img/start.png'" id="start" @tap="playReward" ></image>
				</view>
			</view>
			<!-- 抽奖次数 -->
			<view class="chance_box">
				<view class="chance_btn">您当前剩余{{raffle_data.userPoints}}购物金</view>
			</view>
			<!-- 奖品列表 -->
			<view class="prize">
				<view class="prize_title">奖品列表</view>
				<view class="prize_list">
					<block v-for="(item,index) in prize_list" :key="index">
						<image :src="item" @tap.stop="preview(index)"></image>
					</block>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="showRule?'show':''"  @tap="hideRuleDialog">
			<view class="cu-dialog rule-dialog">        
				<!-- 规则 -->
				<view class="rule-container" >
					<view class="title" >
						抽奖活动说明
					</view>
					<view class="g_item">
						1.使用2元购物金可以抽奖一次。
					</view>
					<view class="g_item">
						2.中奖实物产品需支付邮费，产品免费。 
					</view>
					<view class="g_item">
						3.中奖产品不退不换，自愿参加，不喜请弃奖。
					</view>
					<view class="g_item">
						4.中奖产品按批次发货，时间略长，不喜请弃奖。 
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showMyPrize?'show':''"  @tap="hideMyPrizeDialog">
			<view class="cu-dialog my-prize-dialog">
				<view class="title">
					我的奖品
				</view>
				<view class="itembox">
					<view class="item" v-for="(items,i) in myPrizelist" :key="i">
						<text class="left" style="flex:1">{{items.result}}</text>
						<text class="right" style="flex:1">{{items.create_time.substring(0,10)}}</text>
						<view v-if="items.status == 1" style="flex:1" @tap="receiveFun({type:'freight',id:items.id})">运费支付</view>
						<view v-if="items.status == 2" style="flex:1" @tap="receiveFun({type:'receive',id:items.id})">待领取</view>
						<view v-if="items.status == 3" class="right" style="flex:1;color: #00770d;">已领取</view>
						<view v-if="items.status == 4" class="right" style="flex:1;color: #00770d;" @tap="go_pay({oid:items.oid})">待支付</view>
						<view v-if="items.status == 5" class="right" style="flex:1;color: #00770d;">待发货</view>
					</view>
				</view>
				<view class="no-prize" v-if="myPrizelist.length==0">
					您还没有获得奖品
				</view>
			</view>
		</view>
		<!-- 抽中奖品提示 -->
		<view class="raffle_alter" v-if="raffle_alter" @tap="close_raffle">
			  <view class="raffle_box animated bounceIn">
				  <view class="raffle_connent">
					  <view class="raffle_top">
						  <view class="raffle_title">恭喜你</view>
						  <view class="raffle_desc">抽中了{{awards_data.title}}</view>
					  </view>
					  <view class="raffle_btn" @tap="close_raffle">确定</view>
				  </view>
			  </view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	var turntable = require("../../tool/turntable.js");
	export default {
		data() {
			return {
				awardsList: [],
				lotteryTimes: 0,
				isSignIn:false,
				showMyPrize:false,
				myPrizelist:[],
				showNoPrize:false,
				showRule:false,
				turntable:null,
				canvasWidth:0,
				canvasHeight:0,
				inLottery:false,
				prize_list:[],
				raffle_data:null,
				raffle_alter:false,
				awards_data:{},//抽奖的结果
			}
		},
		onLoad: function() {
			var that=this;
			uni.getSystemInfo({
			    success: function (res) {
					that.canvasWidth=res.windowWidth-(res.windowWidth/90*10);
					that.canvasHeight=res.windowWidth-(res.windowWidth/90*10);
					
			        console.log(res.model);
			        console.log(res.pixelRatio);
			        console.log(res.windowWidth);
			        console.log(res.windowHeight);
			        console.log(res.language);
			        console.log(res.version);
			        console.log(res.platform);
					// 获取奖品列表
					that.initdata();
			    }});
			that.getMyPrize()
		},
		onReady: function(e) { 
		}, 
		onPullDownRefresh:async function(){
			// 获取奖品列表
			await this.initdata();
			uni.stopPullDownRefresh();
		},
		methods: {
			backFun(){
				uni.navigateBack({})
			},
			go_pay(pos){
				console.log("领取奖品------id",pos.oid)
				uni.navigateTo({
					url:`./pay?type=product&serial_id=${pos.oid}`
				})
			},
			//领取奖品或者支付运费
			async receiveFun(pos){
				uni.navigateTo({
					url:`/pages/raffle/address?source=1&id=${pos.id}`
				})
				// let data_api = await request.requestGet('luck_draw_receive',{id:pos.id})
				// console.log("领取奖品请求",data_api)
			},
			close_raffle(){
				this.raffle_alter = false
			},
			// 图片显示
			preview(index){
				uni.previewImage({
					current:index,
					urls:this.prize_list
				})
			},
			// 查看奖品
			async getMyPrize(){
				let data_api = await request.requestPost('luck_draw_mine')
				this.myPrizelist = data_api.data.data.list
				console.log('奖品记录',this.myPrizelist)
			},
			showRuleDialog(){
				this.showRule=true;
			},
			hideRuleDialog(){
				this.showRule=false;
			},
			showMyPrizeDialog(){
				this.getMyPrize();
				this.showMyPrize=true;
			},
			hideMyPrizeDialog(){
				this.showNoPrize=false;
				this.showMyPrize=false;
			},
			// 初始化抽奖数据
			initdata:async function(){
				var that = this;
				let raffleApi = await request.requestPost('luck_draw')
				console.log("抽奖",raffleApi.data.data)
				that.lotteryTimes=0;
				that.isSignIn=false;
				that.awardsList = raffleApi.data.data.giftList;
				that.raffle_data = raffleApi.data.data
				//遍历给插件要的属性
				that.awardsList.forEach((item,index)=>{
					that.awardsList[index].diskColor="#ffffff"
					if(that.awardsList[index].id==12){
						that.awardsList[index].image = 'http://img.jxshoo.cn/awards_smile.png'
					}
					else{
						that.awardsList[index].image = that.awardsList[index].pic
						that.prize_list.push(that.awardsList[index].pic)//奖品列表
					}
					that.awardsList[index].name = that.awardsList[index].title
					that.awardsList[index].winText = '遍历测试'
					
				})
				var diskColor=[];
				for (var i = 0; i < that.awardsList.length; i++) {
					diskColor.push(that.awardsList[i].diskColor);
				} 
				// 画转盘
				var width=that.canvasWidth;
				var height=width;
				that.turntable=turntable.wheelSurf("canvas",{$this:that,list:that.awardsList,width:width,height:height,outerCircle: {
				     color: '#F95151' // 外圈颜色(可选)
				 },
				 innerCircle: {
				     color: '#B33E0A' // 里圈颜色(可选)
				 },
				 dots: ["#FBF0B0", "#FFFFFF"], // 装饰点颜色(可选)
				 disk: diskColor, //中心奖盘的颜色，默认7彩(可选)

				 title: {
				     color: '#B14A29',
				     font: '13px Arial',
				     lineHeight:13
				 }});
				// that.$lotteryApi.list().then(res=>{
				// 	that.lotteryTimes=res.times;
				// 	that.isSignIn=res.signInStatus;
				// 	that.awardsList = res.awardsList;
					
				// });
			},
			playReward:function(){
				this.lottery(false);
			},
			//发起抽奖  
			lottery: async function(integralExchange=false) {
				var that = this;
				//正在抽奖则返回
				if(that.inLottery){
					that.$api.msg('正在抽奖')
					return;
				}
				that.inLottery=true;
				var angel = 360 / that.awardsList.length;
				
				let result_data = await request.requestPost('luck_draw_price')  
				console.log("抽奖结果",result_data.data.data)
				var awards=result_data.data.data.gift;//result_data.data.data.gift中奖的商品id
				let awards_id = 0
				that.awardsList.forEach((item,index)=>{
					if(awards == index){
						awards_id = item.id
						that.awards_data = item
					}
				})
				var count = 0;
				// 计算奖品角度
				for (var key in that.awardsList) {
					if (that.awardsList.hasOwnProperty(key)) {
						console.log(",,,,,,,,,",that.awardsList[key].id)
						if (awards_id == that.awardsList[key].id) {
							console.log("抽奖的商品id",awards_id)
						    break;
						}
						 count++;
					}
				}
				console.log("抽奖结果",result_data.data.data.gift)
				setTimeout(function(){
					that.raffle_alter = true
					that.getMyPrize()
				},4000)
				// 更新购物金
				let raffleApi = await request.requestPost('luck_draw')
				that.raffle_data = raffleApi.data.data
				that.turntable.lottery(count * angel + angel / 2,function (){
					that.inLottery=false;
					return;
				});
			},
			signIn:function(){
			},
			mission:function(){
			},
			integralMall:function(){
			},
			backClick(){
				uni.navigateBack();
			}
		}

	}
</script>
<style scoped lang="scss">
	.back_page{ width:60rpx;height: 60rpx;position: fixed;z-index:1001;left:20rpx;top:50rpx}
	// 抽奖弹窗提示 start
	.raffle_alter{ width:100%;height: 100%;position: fixed;left:0px;right:0px;top:0px;bottom:0px;z-index:1000;background: rgba(0,0,0,0.8);
		.raffle_box{ width:100%;height: 100%;background: url(../../static/dianzhui.png);background-size: cover;display: flex;justify-content: center;align-items: center;}
		.raffle_connent{ width:674rpx;height: 624rpx;background: url(../../static/bg2.png);background-size:cover;display: flex;flex-direction: column;justify-content: center;align-items: center;}
		.raffle_top{ font-size:52rpx;color: #fff;text-align: center;margin-top:60rpx}
		.raffle_btn{ font-size:44rpx;color: #f62a39;background: #ffee8d;width:360rpx;height: 70rpx;border-radius: 40rpx;display: flex;align-items: center;justify-content: center;margin-top:60rpx}
	}
	//抽奖弹窗提示 end
	.chance_box{ width:100%;height: auto;display: flex;align-items: center;justify-content: center;position: relative;z-index:3;margin-top:10rpx;
		.chance_btn{ background: #fb3a13;width:380rpx;height: 60rpx;border-radius: 40rpx;display: flex;align-items: center;justify-content: center;color: #ffffff;font-size:24rpx;}
	}
	.prize{ width:100%;height: auto;padding-left:40rpx;padding-right:40rpx;position: relative;z-index:3;font-size:30rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin-top:14rpx;
	.prize_title{ margin-bottom:14rpx;}
		.prize_list{display: flex;justify-content: center;
			image{ width:100rpx;height: 100rpx;margin-right:20rpx}
		}
	}
	.title_box{ width:100%;height: auto;display: flex;justify-content: center;align-items: center;}
	.title_banner{ width:620rpx;height: 300rpx;margin-top:-100rpx;}
	.uni-btn-icon{
		color: #fff; 
		font-size: 27px;
		position: absolute;
		top:2.5vw;
		left:2vw;
	}
	.title{
		position: relative;
		width:100%;
		text-align: center;
		padding-top:3vw;
		font-size: 18px;
		color: #fff;
	}
	
	.conbox {
		width: 750upx;
		height: 100%;
		background-color: #FC3459;
		overflow: hidden;
	}

	.container,
	image.cont {
		width: 750upx;
		height: auto;
		position: relative;
	}

	image.cont {
		position: absolute;
		z-index: 0;
	}

	image.caidai {
		position: absolute;
		top: 20px;
		left: 0;
		width: 750upx;
		height: 1024upx;
	}

	.header {
		padding: 60rpx;
		padding-top:120rpx;
		box-sizing: border-box;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}
	
	
	
	
	.header .rule{
		color:#f58d40;
        border:1px solid #f58d40;
		border-radius: 10rpx;
		width:150rpx;
		height: 60rpx;
		line-height: 56rpx;
		text-align: center;
		font-size: 32rpx;
	}
	
	
	.header .times{
		float:left;
		font-size: 35upx;
		font-weight: bold;
	}
	.header .times text{
		color:#FFFFFF;
	}
	
	
	.header .my-prize{
		float:right;
		font-size: 35upx;
		font-weight: bold;
	}
	.header .my-prize text{
		color:#FFFFFF;
	}

	/* 转盘 */
	.canvas-container {
		width: 90%;
		margin: 0 5%;
		position: relative;
		margin-top:-50rpx;
		display: flex;
		justify-content: center;
	}

	.canvas {
		/* width: 100%!important; */
	}
 
#start{
	  position: absolute;
	            top: calc(50%);
	            left: 50%;
	            width:160rpx;
	            height:200rpx;
	            margin-left: -80rpx;
	            margin-top: -15vw;
	            cursor: pointer;
}
	
	.rule-dialog{
		background-color: #f58d40!important;
	}

	.rule-container {
		min-height: 300upx;
		display: flex;
		flex-direction: column;
		z-index: 3;
		background-image: #f58d40;
		// border: 4rpx solid #E4431A;
		border-radius: 16px;
		padding:30upx;
		/* box-sizing: border-box; */
		color: #fff;
	}

	.rule-container .title {
		text-align: center;
		margin-bottom: 36upx;
		font-size: 40upx;
	}

	.rule-container .g_item {
		font-size: 30upx;
		color: #FFFFFF;
		letter-spacing: 0.5px;
		text-align: justify;
		line-height: 20px;
		margin-bottom: 10px;
	}
	

	.shadowbox {
		width: 750upx;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background: rgba(0, 0, 0, .6);
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.my-prize-dialog {
		width: 600upx;
		min-height: 180upx;
		background: #FFEEDF;
		// border: 10upx solid #F2692F;
		color: #333;
		font-size: 24upx;
		font-family: PingFang-SC-Medium;
		border-radius: 40upx;
		padding-bottom: 20upx;
	}

	.my-prize-dialog .title {
		font-family: PingFang-SC-Bold;
		font-size: 16px;
		color: #E4431A;
		letter-spacing: 0.57px;
		display: flex;
		padding: 36upx 0;
		padding-bottom:15rpx;
		justify-content: center;
	}

	.my-prize-dialog .itembox {
		max-height: 600rpx;
		overflow-y: auto;
	}

	.my-prize-dialog .item {
		width: 100%;
		height: 66upx;
		padding: 0 32upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.my-prize-dialog  .no-prize{
		padding: 40upx 0;
	}
	
	.mission-title{
		width:90%;
		margin:10px 5%;
	}
	
	.mission-list{
		position: relative;
		z-index: 3;
		text-align: center;
		color:#ffffff;
		width:90%;
		margin:0 5% 50upx 5%;
	}
	
	.mission-list .title{
		margin-top:50upx;
		background-color: #FD9383;
		border: 1upx solid #FFFFFF;
	}
	.mission-list .title view{
		border-right: 1upx solid #FFFFFF;
		padding:15upx 10upx;	
	}
	.mission-list .title view:nth-child(3){
		border-right: 0upx solid #FFFFFF;
	}
	
	
	.mission-list .mission{
		border: 1upx solid #FFFFFF;
		border-top: 0upx solid #FFFFFF;
		line-height: 60upx;
		height:100upx;
	}
	.mission-list .mission view{
		border-right: 1upx solid #FFFFFF;
		padding:20upx 10upx;	
	}
	.mission-list .mission view:nth-child(3){
		border-right: 0upx solid #FFFFFF;
	}
	
	.mission-list .mission .mission-button{
		width:100upx;
		height:50upx;
		line-height: 50upx;
		padding:5upx 10upx;
		display: inline-block;
		background-color: #FDF3AB;
		color:#FD302D;
		font-size: 30upx;
		border-radius: 8upx;
	}
	
	
	.mission-list .mission .mission-button.disabled{
		background-color: #BEBEBE;
		color: #FFFFFF;
	}
</style>
