<template>
	<view class="shipping">
		<view class="shipping_title">关于购物金怎么使用</view>
		<view class="admin">
			<image src="../../static/meiyong/jiu.png"></image>
			<view class="admin_name">管理员</view>
		</view>
		<view class="shipping_content">
			内容
		</view>
	</view>
</template>

<script>
	export default{
		name:"shoppingMoney",
		data(){
			return{
				
			}
		},
	}
</script>

<style lang="scss">
	.shipping{
		padding: 0 30upx;
		.shipping_title{
			font-size: 44upx;
			font-weight: 600;
			margin: 30upx 0 30upx 20upx;
			
		}
		.admin{
			display: flex;
			align-items: center;
			margin: 0upx 0 30upx 20upx;
			image{
				width: 60upx;
				height: 60upx;
				display: block;
			}
			.admin_name{
				font-size: 24upx;
				color: #989898;
				margin-left: 20upx;
			}
		}
	}
</style>