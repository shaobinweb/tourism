<template>
	<view class="after_sale">
		<view class="after_n1" :key="index">
			<view class="after_type">
				<view class="type_title">选择售后类型：</view>
				<view class="type_btns">
					<view class="type_btn">退货</view>
				</view>
			</view>
			<view class="after_price">
				<view class="price_left">退款金额 (￥)：</view>
				<view class="price_input">{{order_data.payable_price}}</view>
			</view>
			<view class="after_good">
				<view class="good_left">
					<image :src="good_data.goods_thumb" mode="aspectFill"></image>
				</view>
				<view class="good_right">
					<view class="good_name">{{good_data.goods_name}}</view>
					<view class="good_spec">{{good_data.spec_title}}</view>
					<view class="good_price">
						<view class="price">￥ {{good_data.payable_price}} </view>
						<view class="good_num">x{{good_data.goods_num}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="after_n2">
			<view class="n2_header">原因描述</view>
			<view class="n2_content">
				<textarea
				 v-model="content"
				 v-show="isInputContentFocus"
				 placeholder="请简短描述退货的原因 "
				 v-bind:focus="isFocus"
				 class="textarea"
				 placeholder-style="color:#333;font-size:26upx"
				 ></textarea>
			</view>
			<view class="n2_upload">
				<view class="upload_title">图片上传</view>
				<view class="upload_list">
					<block v-if="image.length !=0" v-for="(item,index) in image" :key="index">
						<image :src="item" class="upload_img" mode="aspectFill"></image>
					</block>
					<image src="../../static/upload_img.png" class="upload_img" mode="aspectFill" @tap.stop="logoupload({index:index})"></image>
				</view>
			</view>
		</view>
		<view class="after_btn" @tap="after_submit">提交</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default {
		data() {
			return {
				order_id:0,//订单id
				isContentFocus: true,
				isInputContentFocus: true,
				isFocus: false,
				content:'',
				order_data:'',//订单信息
				good_data:[],//商品信息
				image:[],//售后图片
			}
		},
		onLoad(pos) {
			console.log(pos)
			this.order_id = pos.id
			this.get_data()
		},
		methods: {
			//提交
			async after_submit(){
				let _this = this
				if(this.content == ""){
					this.$api.msg('请输入退货原因')
					return
				}
				console.log("id",this.order_id)
				let img_str = ""
				let s
				_this.image.forEach((item,index)=>{
					let str = item
					img_str = img_str + '#'  + str 
				})
				console.log("图片",img_str.substring(1))
				let data_api = await request.requestPost('sub_apply',{
					og_id:this.order_id,
					servicetype:1,
					money:this.order_data.payable_price,
					reason:this.content,
					images:img_str.substring(1)
				})
				console.log("申请售后",data_api)
				if(data_api.data.errorCode == 110002){
					this.$api.msg(`${data_api.data.message}`)
					uni.redirectTo({
						url:`/pages/order/after_desc?id=${this.order_id}`
					})
				}
				else{
					this.$api.msg(`${data_api.data.message}`)
				}
			},
			//获取售后订单
			async get_data(){
				let _this = this
				let data_api = await request.requestGet('after_sale',{og_id:this.order_id})
				_this.good_data = data_api.data.data.order_goods_info
				_this.order_data = data_api.data.data.order_info
				console.log("评价首页",data_api)
			},
			// 图片上传
			async logoupload(){
				var _this=this
				let pre_img_length;//当前商品的图片长度，最多5张
				pre_img_length = _this.image.length
				if( pre_img_length >=5){
					_this.$api.msg("最多只能上传5张")
					return
				}
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: async function (res) {
					   let upload_img = await request.uploading_fun(res.tempFilePaths[0])
					   let data = JSON.parse(upload_img.data)
					   console.log("上传图片的状态",JSON.parse(upload_img.data))
					   _this.$forceUpdate();//加上这个，要不然视图不会更新
					   _this.image.push(data.data.image)
				       _this.$api.msg(`${data.message}`)
					   console.log("当前图片",_this.image)
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.upload_img{ width:100rpx;height: 100rpx;margin-top:20rpx;margin-bottom:20rpx}
	.after_sale{ width:100%;height: 100%;background: #f0f0f0;}
	.after_n1{ width:100%;height: auto;padding:30rpx;background: #fff;}
	.type_title{ width:100%;height: 50rpx;font-size:28rpx;color: #333;border-bottom:1px solid #e8e8e8}
	.type_btns{ width:100%;height: auto;display: flex;justify-content: center;align-items: center;margin:26rpx 0px}
	.type_btn{ width:140rpx;height: 60rpx;background: #e4393c;display: flex;align-items: center;justify-content: center;border-radius: 40rpx;color: #fff;}
	.after_price{ width:100%;height: auto;display: flex;align-items: center;border-top:1px solid #e8e8e8;padding:10rpx 0rpx;border-bottom:#e8e8e8}
	.price_input{ width:300rpx;height: 60rpx;display: flex;align-items: center;border:1px solid #efefef;padding-left:30rpx}
	.after_good{ width:100%;height: auto;margin-top:40rpx;display: flex;}
	.good_left{ width:148rpx;height: 148rpx;margin-right:20rpx;
		image{ width: 100%;height: 100%;}
	}
	.good_right{ width:520rpx;font-size:24rpx;display: flex;flex-direction: column;justify-content: space-between;}
	.good_name{ display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;word-break: break-all;white-space :normal;}
	.good_price{ display: flex;
		.price{ color:#e4393c;margin-right:40rpx}
	}
	.after_n2{ width:100%;height: auto;background: #FFFFFF;margin-top:40rpx;padding:20rpx}
	.n2_header{ width:100%;border-bottom:1px solid #d9d9d9;height: 60rpx;}
	.n2_content{ margin-top:20rpx}
	.textarea{width: 100%;margin: 0 auto;text-align: left;font-size: 26upx;display: block !important;height: 200rpx;}
	.n2_upload{ margin-top:20rpx;border-top:1px solid #e8e8e8;padding-top:20rpx}
	.upload_list{ width:100%;height: 100rpx;margin-right:20rpx;display: flex;
		image{ width:100rpx;height:100%;margin-right:20rpx}
	}
	.after_btn{ width:100%;height: 96rpx;background: #e4393c;color: #fff;position: fixed;right:0px;bottom:0rpx;left:0px;display: flex;align-items: center;justify-content: center;}
</style>
