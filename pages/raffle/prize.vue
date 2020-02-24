<template>
	<view class="prize">
		<image src="../../static/meiyong/banner2.jpg"></image>
		<view class="my_prize">
			<view class="my_prize_name">我的奖品</view>
		</view>
		<view class="prize_table">
			<view class="prize_table_content">
				<view class="time">中奖时间</view>
				<view class="prize_name">中奖奖品</view>
				<view class="result">受理结果</view>
			</view>
		</view>
		<view class="prize_table">
			<view class="prize_table_content andget">
				<view class="time">2019-12-19 16:40</view>
				<view class="prize_name">三等奖</view>
				<view class="result">点击领奖</view>
			</view>
		</view>
		<view class="prize_table">
			<view class="prize_table_content andget">
				<view class="time">2019-12-19 16:40</view>
				<view class="prize_name">三等奖</view>
				<view class="result">点击领奖</view>
			</view>
		</view>
		<view class="prize_return">返回</view>
	</view>
</template>

<script>
	export default{
		name:"prize",
		data(){
			
		},
	}
</script>

<style lang="scss">
	page{background: #fce243;}
	.my_prize{width: 100%;text-align: center;}
	.my_prize_name{text-align: center;background: #fc8209;color: #FFFFFF;letter-spacing: 6upx;display: inline-block;padding: 10upx 80upx;border-radius: 20upx;font-size: 30upx;margin-bottom: 30upx;}
	.prize_table{width: 90%;margin: 0 auto 4upx;}
	.prize_table_content{display: flex;justify-content: space-between;text-align: center;align-items: center;}
	.prize_table_content view{font-size: 26upx;background: #f19132;color: #fff886;height: 70upx;line-height: 70upx;font-weight:600;}
	.prize_table .andget view{color: #fff;font-size: 24upx;font-weight: 400;}
	.time{width: 41%;}
	.prize_name{width: 39%;}
	.result{width: 19%;}
	.prize_return{width: 90%;background: #fb3a13;color: #FFFFFF;font-size: 32upx;letter-spacing: 4upx;position: fixed;bottom: 10px;margin: 0 auto;text-align: center;left: 0;right: 0;height: 100upx;line-height: 100upx;border-radius: 20upx;}
</style>