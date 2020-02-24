<template>
	<view class="yh_data">
		<view class="yh_data_contetn">
			<form @submit="formSubmit" @reset="formReset">
                <view class="list_one" @click="logoupload('user')">
					<view class="list_name">头像</view>
					<view class="list_rig">
						<image :src="userData.head_pic" class="logo"></image>
						<input v-model="userData.head_pic" style="display: none;" name="head_pic"/>
					</view>
				</view>
				<view class=" list_one" @click="logoupload('wx_qrcode')">
					<view class="list_name">微信二维码</view>
					<view class="list_rig">
						<image :src="userData.wx_img" class="logo_ewm"></image>
						<input v-model="userData.wx_img" style="display: none;" name="wx_qrcode"/>
					</view>
				</view>
				<view class="list" @click="nickname_popup">
					<view class="list_name">昵称</view>
					<view class="list_rig">
						<!-- <image src=""></image> -->
						<input v-model="userData.nickname" type="text" placeholder="" disabled name="nickname"/>
						<image src="../../static/meiyong/you.png" class="you"></image>
					</view>
				</view>
				<view class="list" @click="nicknameS">
					<view class="list_name">性别</view>
					<view class="list_rig">
						<!-- <view class="uni-input">{{array[index]}}</view> -->
						<input v-if="userData.sex == 1" value="男" type="text" disabled />
						<input v-if="userData.sex == 0" value="女" type="text" disabled/>
						<input v-model="userData.sex" type="text" disabled name="sex" style="display: none;"/>
						<image src="../../static/meiyong/you.png" class="you"></image>
					</view>
				</view>
				<view class="list">
					<view class="list_name">生日</view>
					<view class="list_rig">
						<view class="uni-list-cell-db">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" >
								<view class="uni-input">{{userData.birthday.substring(0,10)}}</view>
							</picker>
							<input v-model="userData.birthday" style="display: none;" name="birthday"/>
						</view>
						<image src="../../static/meiyong/you.png" class="you"></image>
					</view>
				</view>
				<view class="list" @click="autographs">
					<view class="list_name">签名</view>
					<view class="list_rig">
						<!-- <image src=""></image> -->
						<input v-model="userData.signature" type="text" disabled name="signature"/>
						<image src="../../static/meiyong/you.png" class="you" ></image>
					</view>
				</view>
				<view class="list" @tap="openAddres">
					<view class="list_name">地址</view>
					<view class="list_rig">
						<!-- <image src=""></image> -->
						<!-- <view>{{addressData.addressName}}</view> -->
						<input v-model="userData.address" type="text" disabled name="address"/>
						<image src="../../static/meiyong/you.png" class="you"></image>
					</view>
				</view>
				<button class="but" form-type="submit">确定</button>
            </form>
			<!-- 昵称 -->
			<uni-popup ref="nickname_popup" type="top">
				<view class="autograph">
					<view class="autograph_content">
						<view class="name">
							<view>昵称</view>
							<input placeholder="请输入昵称" type="text" placeholder-class="name_c" v-model="nicknames"/>
						</view>
						<view class="determine" @click="determine">确定</view>
					</view>
				</view>
			</uni-popup>
			<!-- 性别 -->
			<uni-popup ref="popups" type="bottom">
				<view class="popup">
					<view class="popup_content">
						<block v-for="(item,index) in array" :key="index">
							<view @click="selectS(index)">{{item}}</view>
						</block>
					</view>
				</view>
			</uni-popup>
			<!-- 签名 -->
			<uni-popup ref="autograph_popup" type="top">
				<view class="autograph">
					<view class="autograph_content">
						<view class="name">
							<view>个性签名</view>
							<input placeholder="请输入签名" @input="signature_fun" v-model="username.signature" type="text" placeholder-class="name_c"/>
						</view>
						<view class="determine" @click="determines">确定</view>
					</view>
				</view>
			</uni-popup>
			<!-- 地图 -->
			<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
		</view>
	</view>
</template>

<script>
	import uniPopup from "../../components/popup/uni-popup/uni-popup.vue"
	import cityDatas from '../../tool/city.area.js';
	import simpleAddress from "@/components/simple-address/simple-address.nvue"
	import request from '@/tool/request.js'
	export default{
		name:"administration",
		components: {uniPopup,simpleAddress},
		data(){
			const currentDate = this.getDate({
					format: true
				})
			return{
				userData : {
					 "username": "5cb71a3fa26f4",
					 "head_pic": "../../static/tourist.png",
					 "level": 1,
					 "nickname": "游客",
					 "truename": null,
					 "sex": "性别",
					 "birthday": "0000-00-00",
					 "mobile": "手机号",
					 "address":'',
					 "signature":'个人签名'
				},//用户所有信息
				logo_img:"",
				ewm_img:"",
				addressData: {	
					addressName: '',
				},
				nickname:"",
				nicknames:'',
				autograph:"",
				autograph_s:"",
				date: currentDate,
				array:["女(Female)","男(Male)"],
				times:"",
				index:'',
				// 地址选择
				// 新的地址插件变量
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		async onLoad() {
			let userInfo = await request.requestPost('userInfo')
			this.userData = userInfo.data.data.user_info
			console.log("获取个人中心成功",userInfo)
			console.log("获取个人中心成功",userInfo.head_pic)
		},
		methods:{
			// 图片上传
			async logoupload(type){
				// type 判断是头像或者是微信二维码
				var _this=this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: async function (res) {
					   let upload_img = await request.uploading_fun(res.tempFilePaths[0])
					   let data = JSON.parse(upload_img.data)
					   console.log("上传图片的状态",JSON.parse(upload_img.data))
					   if(type == 'user'){
						   _this.userData.head_pic = data.data.image
					   }
					   if( type == 'wx_qrcode'){
						    _this.userData.wx_img = data.data.image
					   }
				       _this.$api.msg(`${data.message}`)
				    }
				});
			},
			bindDateChange: function(e) {
				this.userData.birthday =  e.target.value
				console.log(this.userData.birthday)
			},
			// 性别
			nicknameS(){
				// 需要在 popup 组件，指定 ref 为 popup
				 this.$refs.popups.open()
			},
			selectS(index){
				this.$refs.popups.close()
				this.index=index
				this.userData.sex = index
			},
			// 签名
			autographs(){
				this.$refs.autograph_popup.open()
			},
			determines(e){
				this.$refs.autograph_popup.close()
				
			},
			signature_fun(e){
				this.userData.signature=e.detail.value
				console.log("签名的input",this.userData)
			},
			// 昵称
			nickname_popup(){
				this.$refs.nickname_popup.open()
			},
			determine(){
				this.$refs.nickname_popup.close()
				this.nickname=this.nicknames
			},
			// 时间
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 地址
			//打开地址选择插件
			openAddres() {
			    this.$refs.simpleAddress.open();
			},
			//地址选择
			onConfirm(e) {
			    this.pickerText = e
				this.userData.address = e.label
				console.log(this.pickerText)
			},
			
			// 表单数据
			formSubmit: async function(e) {
				//如果有更换地址就修改地址
				// if(this.pickerText != ''){
				// 	edit_end_data.province = this.pickerText.provinceCode * 10000
				// 	edit_end_data.city = this.pickerText.cityCode * 100
				// 	edit_end_data.district = this.pickerText.areaCode
				// }
				console.log('form发生了submit事件，携带数据为：' , e.detail.value)
				let save_data = await request.requestPost('save_user_info',e.detail.value)
				console.log('保存数据',save_data)
				this.$api.msg("保存成功")
			},
		},
		
	}
</script>

<style lang="scss">
	.popup{
		background: #FFFFFF;
		.popup_content{
			text-align: center;
			view{
				border-bottom: 1px solid #EEEEEE;
				font-size: 36upx;
				padding: 20upx 0;
			}
		}
	}
	.autograph{
		background: #FFFFFF;
		padding: 80upx 20upx 20upx;
		.autograph_content{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.name{display: flex;align-items: center;
				view{font-size: 28upx;width:150upx;}
				input{font-size: 28upx;}
				.name_c{font-size: 26upx;}
			}
			.determine{font-size: 28upx;border-left: 1px solid #EEEEEE;height: 50upx;line-height: 50upx;font-size: 34upx;color: #3cc51f;width:150upx;text-align: center;} //padding: 0 15upx 0 35upx;
			// view{
			// 	border-bottom: 1px solid #EEEEEE;
			// 	font-size: 36upx;
			// 	padding: 20upx 0;
			// }
		}
	}
	.yh_data{
		padding: 0 20upx;
		.yh_data_contetn{
			.list{
				height: 80upx;
				line-height: 80upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #eee;
				.list_name{font-size: 26upx;color: #333;width: 20%;}
				.list_rig{
					input{text-align: right;font-size: 26upx;color: #333;}
					
					image{width: 40upx;height: 40upx;}
					display: flex;
					align-items: center;
					
					.uni-list-cell-db{
						// width: 400upx;
					}
					.uni-input{
						width: 500upx;
						height: 80upx;
						text-align: right;
						font-size: 26upx;
						color: #333;
					}
				}
			}
			.list_one{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #eee;
				height: 120upx;line-height: 120upx;
				.list_name{font-size: 26upx;color: #333;}
				.list_rig{
					
					display: flex;
					align-items: center;
					.logo{
						width: 100upx;
						height: 100upx;
						border-radius: 60upx;
						display: inline-block;
					}
					.logo_ewm{
						width: 80upx;
						height: 80upx;
						
						display: inline-block;
					}
					image{width: 40upx;height: 40upx;}
					.uni-list-cell-db{}
				}
			}
		}
		.but{color: #fff;background: #333;border-radius: 0;margin-top: 30upx;}
	}
	// 地址
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