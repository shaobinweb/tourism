<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">姓名</text>
			<input class="input" type="text" v-model="addressData.consignee" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b"  @tap="openAddres">
			<text class="tit">选择地址</text>
			<text class="input">
				{{addressData.address}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">详情地址</text>
			<input class="input" type="text" v-model="addressData.area" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<icon v-if="addressData.is_default == 1"  type="success successicon_ad"  size="23" @tap="defaultFun(0)"/>
			<icon v-if="addressData.is_default == 0"  type="success default "  size="23" @tap="defaultFun(1)"/>
		</view>
		<button class="add-btn" @click="confirm">确认地址</button>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
	</view>
</template>

<script>
	import cityDatas from '../../tool/city.area.js';
	import uniPopup from '@/components/uni-pop.vue';
	import request from '@/tool/request.js'
	import simpleAddress from "@/components/simple-address/simple-address.nvue"
	export default {
		components: {
			uniPopup,
			simpleAddress
		},
		data() {
			return {
				addressId : null,
				addressData: {
					consignee: '',
					mobile: '',
					addressName: '',
					address: '请选择地址',
					area: '',
					is_default: 0,
				},
				// 地址插件
				cityPickerValueDefault: [0, 0, 1],
				pickerText: ''
				
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type =='edit'){
				title = '编辑收货地址'
				this.type = 'edit'
				this.addressData = JSON.parse(option.data)
				console.log("上个页面的地址",this.addressData)
				this.addressId = option.id
				let area = this.addressData.address.split(" ")
				this.addressData.area = area[3]//分割的详细地址
				this.addressData.address = `${area[0]} ${area[1]} ${area[2]}`//分割的省份地址
				
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.is_default = e.detail;
			},
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.consignee){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.address){
					this.$api.msg('请在地图选择所在位置');
					return;
				}
				if(!data.area){
					this.$api.msg('请填写门牌号信息');
					return;
				}
				console.log("添加的地址信息",data)
				
				if(this.type == 'edit'){
					let edit_end_data = {
						id : this.addressId,
						consignee : data.consignee,
						mobile : data.mobile,
						province   : this.addressData.province,
						city : this.addressData.city,
						district : this.addressData.district,
						address : data.area,
						is_default : data.is_default
					}
					//如果有更换地址就修改地址
					if(this.pickerText != ''){
						edit_end_data.province = this.pickerText.provinceCode * 10000
						edit_end_data.city = this.pickerText.cityCode * 100
						edit_end_data.district = this.pickerText.areaCode
					}
					console.log("提交的地址",edit_end_data)
					request.requestPost('add_address',edit_end_data) 
					this.$api.msg('编辑地址成功')
					setTimeout(()=>{
						uni.navigateBack()
					}, 800)
					return
				}
				let end_data = {
					consignee : data.consignee,
					mobile : data.mobile,
					province  : this.pickerText.provinceCode * 10000,
					city :  this.pickerText.cityCode * 100,
					district : this.pickerText.areaCode,
					address : data.area,
					is_default : data.is_default
				}
				request.requestPost('add_address',end_data)
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				prevPage.setData({
				isDoRefresh:true
				}) 
				setTimeout(()=>{
					uni.navigateBack()
				}, 800)
			},
			openAddres() {
			    this.$refs.simpleAddress.open();
			 },
		    onConfirm(e) {
				this.addressData.address = e.label
			    this.pickerText = e
				console.log(this.pickerText)
			 },
			//切换默认地址
			defaultFun : function( index ){
				this.addressData.is_default = index
			}
		
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 150upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
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
	
	.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 35upx;
		}
	 
		.title {
			font-size: 34upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
	 
		.cancel-icon {
			font-size: 34upx;
			color: rgba(153, 153, 153, 1);
		}
	 
		.check {
			padding-left: 17upx;
			color: #FF7E28;
		}
	 
		.select-box {
			height: 1024upx;
		}
	 
		.select-item {
			display: flex;
			align-items: center;
			padding-left: 50upx;
			margin-bottom: 20upx;
			border-bottom: 1px solid #F6F6F6;
		}
	 
		.select-list {
			width: 120upx;
			height: 40upx;
			text-align: center;
			overflow: hidden;
			/*超出部分隐藏*/
			text-overflow: ellipsis;
			/* 超出部分显示省略号 */
			white-space: nowrap;
			/*规定段落中的文本不进行换行 */
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			margin-right: 30upx;
			border-bottom: 1px solid #FFFFFF;
		}
	 
		.select-list-cont {
			padding-left: 67upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 40px;
		}
	 
		.selected {
			border-bottom: 1px solid #F0AD4E;
			color: rgba(255, 133, 0, 1);
		}

</style>
