<template>
	<view class="search">
		<view class="search_header">
			<view class="search_input" v-if ="is_search" @tap = "is_search_fun">
				<label class="search_icon"></label>
				<text class="search_title">零食</text>
			</view>
			<view class="search_input" v-else>
				<label class="search_icon"></label>
				<!-- @blur="blur_input" -->
				<input class="uni-input keyword_input" focus placeholder="零食" @input="search_input"  @confirm="searchFun"  placeholder-class="input-pla" />
			</view>
		</view>
		<!-- 历史搜索 -->
		<view class="history" v-if=" list.length !=0">
			<view class="history_header">
				<view class="history_left">历史搜索</view>
				<view class="history_right" @tap="clear_history" >清除历史</view>
			</view>
			<view class="history_list">
				<view class="history_item" v-for="(item,index) in list" :key="index" :data-keyword="item" @tap="go_product(item)">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_search : true,
				history_list : [],
				keyword:'',
			}
		},
		computed:{
			list:function(){
			    let _this = this
				let new_list = []
				_this.history_list.forEach( (item,index)=>{
					if(index>0){
						new_list.push(item)
					}
				})
				return new_list
			}
		},
		onLoad() {
			let get_history = uni.getStorageSync('history_search')
			let new_str = get_history
			this.history_list = new_str.split(',')
		},
		methods: {
			//搜索关键字
			async searchFun(){
				this.get_histroy()
				uni.setStorageSync('keyword', this.keyword);
				uni.setStorageSync('type', 'search')
				uni.switchTab({
					url:`/pages/product/list`
				})
			},
			//获取搜索记录
			get_histroy : function(){
				if(this.keyword !=""){
					let get_history = uni.getStorageSync('history_search')
					let new_str = get_history+',' + this.keyword 
					//设置搜索历史缓存
					uni.setStorageSync('history_search',new_str)
					let new_his = uni.getStorageSync('history_search')
					if (new_his.substr(0,1)==','){
						new_his=new_his.substr(1);
					}
					new_str = new_str.substring(0, new_str.lastIndexOf(','))
					console.log('转数组',new_his)
					this.history_list = new_his.split(',')
				}
					// console.log('搜索历史',this.history_list)
			},
			//切换搜索状态
			is_search_fun : function ( e ){
				this.is_search = false
			},
			//获取搜索内容
			search_input : function ( e ){
				this.keyword = e.detail.value
			},
			//清除历史
			clear_history : function ( e ){
				uni.clearStorage('history_search')
				this.history_list = []
			},
			//跳转
			go_product : function ( item ){
				uni.setStorageSync('keyword', item);
				console.log(item);
				
				uni.setStorageSync('type', 'search')
				uni.switchTab({
					url: `/pages/product/list`
				})
				this.keyword =item
			}
		}
	}
</script>

<style>
	@import '../../static/iconfont.css';
	page{ background: #ffffff;}
	.search_header{ width:100%;height: 90rpx;background: #F5F5F5;display: flex;align-items: center;justify-content: center;}
	.search_input{ width:90%;height: 60rpx;background: #ffffff;border-radius: 6px;display: flex;justify-content: center;align-items: center;}
	.search_icon{ width:32upx;height: 32rpx;background: url(../../static/search.png) no-repeat;background-size: 100% 100%;margin-right:20rpx}
	.search_title,.input-pla{ font-size: 28upx;color: #9b9b9b;}
	.uni-input{ width:80%;}
	
	.history{ width:100%;height: auto;padding:40rpx 30rpx}
	.history_header{ width:100%;height: auto;display: flex;justify-content: space-between;}
	.history_left{ font-size: 30rpx;color: #333;}
	.history_right{ font-size: 24rpx;color: #C72420;}
	.history_list{ width:100%;height: auto;margin-top:28rpx}
	.history_item{ display: inline-block;padding:16rpx 20rpx;color: #333;font-size: 24rpx;margin:0 30rpx 30rpx 0;background: #f8f8f8;border-radius: 4px;}
	.keyword_input{ font-size: 28rpx;}
</style>
