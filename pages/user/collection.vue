<template>
	<view class="collection">
		<view class="collection_content">
			 <checkbox-group class="checkgroup" @change="checkboxChange">
				 <block v-for="(item,index) in coolection_list" :key="index">
						<view class="collection_list">
							<view class="mask" v-show="show" >
								<checkbox :value="item.id" color="#333" style="transform:scale(0.7)" :checked="item.checkeds"/>
							</view>
							<block  @tap.stop="go_product(item.goods_id)">
								<image :src="item.thumb" mode="widthFix"></image>
								<view class="sketch"> {{item.title}}</view>
								<view class="morey">￥{{item.shop_price}}</view>
								<view class="paid">已付款:{{item.sales_sum}}人</view>
							</block>
						</view>
      			</block>
			 </checkbox-group>
		</view>
		<view class="delete" v-show="show">
			<view class="delete_name" @click="deletes">移除收藏</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default{
		name:'collection',
		data(){
			return{
				show:false,
				check:[],
				coolection_list:null
			}
		},
	    onLoad() {
			this.get_cole()
		},
		methods:{
			//跳转详情页
			go_product: function(id){
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			checkboxChange(e){
				this.check=e.detail.value
			},
			async get_cole(){
				let collection = await request.requestGet('collection')
				let data = collection.data.data
				this.coolection_list = data.collection_goods
				console.log("收藏列表请求",collection)
			},
			async deletes(){
				uni.showLoading({
					title: '移除中',
					mask: true
				});
				let check=this.check
				console.log(check)
				//移除收藏
				let delect_col = await request.requestPost('collection_del',{
					id : check.toString()
				})
				console.log("del",delect_col)
				this.get_cole()
				uni.hideLoading()
				// console.log(this.$refs.popup)
			},
		},
		onNavigationBarButtonTap(e) {
			console.log("你点击了编辑")
			const index = e.index;   
			this.show=!this.show
			let len=this.coolection_list
			for(let i=0;i<len.length;i++){
				let item = len[i]
				this.$set(item,'checked',false)
				console.log(len[i].checked)
			}
			this.coolection_list=len
			console.log(this.coolection_list)
			 if (index === 0) {  
				 let pages = getCurrentPages();
				 let page = pages[pages.length - 1];
				 // #ifdef APP-PLUS 	 
				if (e.text === "编辑") {  
					var currentWebview = page.$getAppWebview();  
					currentWebview.setTitleNViewButtonStyle(0, {  
						text: "完成",  
					});  
					this.showChecked = true;  
				} else {  
					var currentWebview = page.$getAppWebview();  
					currentWebview.setTitleNViewButtonStyle(0, {  
						text: "编辑",  
					});  
					this.showChecked = false;  

				}  
				// #endif
			}  
		},
	}
</script>

<style lang="scss">
	page{background: #eee;}
	.show{display: block;}
	.hide{display: none;}
	.collection{margin-top: 20px;}
	.collection_content{
		.checkgroup{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 14upx;
		}
		.collection_list{
			width: 49%;
			background: #fff;
			border-radius: 10upx;
			position: relative;
			margin-bottom: 14upx;
			.mask{position: absolute;width: 100%;height: 100%;background: #333;opacity: .7;z-index: 100;border-radius: 10upx;}
			image{display: block;width: 100%;height: 350rpx;border-radius: 10upx 10upx 0 0;}
			
			.sketch{font-size:24upx;line-height: 36upx;color: #333;padding:10upx 10upx;}
			.morey{color: #e4393c;font-size: 24upx;padding:0 10upx;}
			.paid{font-size: 20upx;color: #707070;text-align: right;padding:0 10upx 20upx 0 ;}
		}
		
	}
	.delete{
		background: #FFFFFF;
		padding: 20upx 0;
		text-align: right;
		padding-right: 10upx;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index:100;
		.delete_name{border: 1px solid #999;font-size: 28upx;border-radius: 30upx;display: inline-block;padding: 10upx 20upx;}
	}
</style>