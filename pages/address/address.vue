<template>
	<view class="content b-t">
		<view class="address_list" v-if="addressList.lists.length!=0">
			<view class="list_item" v-for="item in addressList.lists" :key="item.id" >
				<view class="item_N1_top">
					<view class="N1_top_T">
						<view class="address_name">{{item.consignee}}</view>
						<view class="address_tel">{{item.mobile}}</view>
					</view>
					<view class="N1_top_B">
						<text>{{item.address}}</text>
					</view>
				</view>
				<view class="item_N2_bottom">
					<view class="N2_b_left">
						<block  v-if="item.is_default == 1">
							<icon  type="success successicon_ad "  size="23"/>
							<text class="type_address">默认地址</text>
						</block>
						<block  v-else> 
							<icon  type="success default "  size="23" @tap="defaultAddress(item.id)"/>
							<text class="type_address">设为默认地址</text>
						</block>
						
					</view>
					<view class="N2_b_right">
						<view class="address_edit" @tap="address_fun(item.id,'edit',item)">编辑</view>
						<view class="address_del" @tap="address_fun(item.id,'del')">删除</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 没有地址显示这个 -->
		<view class="no_address" v-else>
			<image src="../../static/icon-noaddr.png" mode="aspectFill"></image>
			<text>你还没有收货地址呢</text>
		</view>
		<button class="add-btn" @click="addAddress('add')">添加新地址</button>
		<!-- 删除地址提示 -->
		<view class="del_alert" v-if="del_ads_alert">
			<view class="alert_box animated bounceIn">
				<view class="box_top">
					地址删除确认
				</view>
				<view class="box_middel">
					你确定要删除这个地址吗
				</view>
				<view class="box_bottom">
					<view class="alert_cancel" @tap="cancelFun">取消</view>
					<view class="alert_verify" @tap="delFun">确认</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// addressListFun  想在设为默认地址或删除地址执行这个方法更新地址，但是执行不了，就先替换这个方案
	import request from '@/tool/request.js'
	export default {
		data() {
			return {
				source: 0,
				addressList: [],
				del_ads_alert : false,
				ads_id : 0,
				id:0,
				type :'edit',
				item:null
			}
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
		},
		async onShow() {
			this.addressListFun()
		},
		methods: {
			//获取地址
			async addressListFun (){
				let addressList = await request.requestGet('addressList')
				this.addressList = addressList.data.data
				console.log("地址",this.addressList)
			},
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			//设为默认地址
			async defaultAddress ( id ){
				let default_data = await request.requestGet('default_address',{id:id})
				console.log(default_data)
				this.$api.msg('默认地址修改成功')
				let addressList = await request.requestGet('addressList') 
				this.addressList = addressList.data.data
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			// 编辑或删除
			address_fun : async function ( id,type,item ){
				let _this = this
				// id地址的id
				_this.ads_id = id
				if( type == 'edit'){
					uni.navigateTo({
						url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}&id=${id}`
					})
				}
				else if( type == 'del'){
					_this.del_ads_alert = true
				}
			},
			//添加或修改成功之后回调    这个方法在添加地址页面执行
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
			},
			//关闭弹窗
			cancelFun : function ( e ){
				this.del_ads_alert = false
			},
			delFun : async function (){
				let _this = this
				let id = this.ads_id
				console.log("id",id)
				let dele_address = await request.requestPost('dele_address',{id:id})
				let addressList = await request.requestGet('addressList')
				this.addressList = addressList.data.data
				this.$api.msg('删除成功')
				_this.del_ads_alert=false
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	
	.add-btn{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 32upx;
		color: #fff;
		background-color: #333;
		border-radius: 0;
	}
	.list_item{ width: 94%;height: auto;background: #fff;margin:30rpx auto auto auto;box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);}
	.item_N1_top{ padding:28rpx;font-size: 24rpx;color: #333;}
	.N1_top_T{ display:flex;align-items: center;margin-bottom:20rpx}
	.address_name{ margin-right:30rpx}
	.item_N2_bottom{ padding:28rpx;background: #f8f8f8;display: flex;align-items: center;justify-content: space-between;}
	.N2_b_left{ display:flex;align-items: center;}
	.type_address,.N2_b_right{ font-size:24rpx;color: #333;margin-left:30rpx}
	.N2_b_right{ display:flex;width:180rpx;justify-content: space-between;}
	
	.del_alert{ width:100%;height:100%;background: rgba(0,0,0,0.5);position: fixed;top: 0;left:0;right: 0;bottom: 0;z-index:100;display: flex;align-items: center;justify-content: center;font-size: 28rpx;}
	.alert_box{ width:390rpx;height:300rpx;background: #fff;border-radius: 20rpx;display: flex;flex-direction: column;justify-content: space-between;align-items: center;padding-top:20rpx;}
	.box_middel{ padding-left:20rpx;padding-right:20rpx}
	.box_bottom{ width:100%;display: flex;justify-content: space-between;align-items: center;height: 80rpx;border-top:1px solid #f1f1f1}
	.alert_cancel,.alert_verify{ flex:1;text-align: center;height: 100%;line-height: 80rpx;text-align: center;}
	.alert_verify{ border-left:1px solid #f1f1f1}
	.box_top{ font-size:32rpx}
	.box_middel{ color:#555}
	.no_address{ width:100%;height: 80vh;display: flex;align-items: center;justify-content: center;color: #636673;font-size: 32rpx;flex-direction: column;}
	.no_address image{ width:280rpx;height:280rpx}
</style>
