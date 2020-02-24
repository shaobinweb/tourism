<template>
	<view class="address">
		<view class="address_content">
			<view class="address_list">
				<view class="address_name">
					<view class="name">吴</view>
					<view class="phone">152****8548</view>
				</view>
				<view class="defails_address">内蒙古自治区 乌兰察布市 凉城县 尼斯搭街坊昆仑山地方打发士大夫士大夫付水电费水电费网费</view>
				<view class="address_type">
					<label><checkbox value="cb" checked="true" class="checkbox"/>默认地址</label>
					<view class="type">
						<view>编辑</view>
						<view>删除</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nothing" style="display: none;">
			<image src="../../static/meiyong/address.png"></image>
			<view class="name">你还没有收货地址呢</view>
		</view>
		<view class="addto">添加地址</view>
	</view>
</template>

<script>
	export default{
		name:'address',
		data(){
			return{
				
			}
		},
	}
</script>

<style lang="scss">
	 
		
	.address_content{
		padding: 20upx;
		.address_list{
			border: 1px solid rgba(19, 19, 19, 0.12);
			border-radius: 20upx;
			// box-shadow: 0 0 12upx 0 rgba(0, 0, 0, 0.3);
			.address_name{
				display: flex;
				padding: 20upx;
				.phone{font-size: 26upx;color: #333;}
				.name{font-size: 26upx;color: #333;margin-right: 30upx;}
			}
			.defails_address{font-size: 26upx;color: #333;padding: 20upx;}
			.address_type{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30upx 40upx;
				background: #f8f8f8;
				border-radius: 0 0 20upx 20upx;
				
				label{font-size: 26upx;color: #333}
				.type{display: flex;
					view{font-size: 26upx;color: #333;
					&:nth-of-type(1){margin-right: 66upx;}
					}
				}
			}
		}
	}
	
	
	
	.nothing{
		position: relative;
		height: 100%;
		text-align: center;
		margin-top: 300upx;
		image{height: 300upx;width: 300upx;}
		.name{
			color: #636673;
			font-size: 26upx;
		}
	}
	.addto{width: 100%;height: 80upx;line-height: 80upx;background: #333;color: #FFFFFF;font-size: 28upx;text-align: center;position: fixed;bottom: 0;}
</style>