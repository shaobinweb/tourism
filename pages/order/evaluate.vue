<template>
	<view class="evaluate">
		<block v-for="(item,index) in good_data" :key="index">
			<view class="evaluate_n1">
				<view class="n1_letf">
					<image :src="item.goods_thumb" mode="aspectFit"></image>
				</view>
				<view class="n1_right">
					<view class="n1_right_sx">
						<text class="n1_sx_desc">描述相符</text>
						<sx-rate :types="0" :ids="item.id" :value="item.describe_num" @change="onChange"/>
					</view>
					<view class="n1_good_title">{{item.goods_name}}</view>
				</view>
			</view>
			<view class="evaluate_n2">
				<textarea
				 v-model="item.content"
				 v-show="isInputContentFocus"
				 placeholder="分享您的购物心得 "
				 v-bind:focus="isFocus"
				 class="textarea"
				 placeholder-style="color:#333;font-size:26upx"
				 ></textarea>
			</view>
			<view class="evaluatee_n3">
				<view class="n3_upload">
					<block v-for="(img_item,index) in item.image" :key="index">
						<image :src="img_item" mode="aspectFill"></image>
					</block>
					<image src="../../static/upload_img.png" class="upload_img" mode="aspectFill" @tap.stop="logoupload({index:index})"></image>
				</view>
			</view>
		</block>
		<view class="evaluate_n4">
			<view class="n4_list">
				<view class="n4_desc">客服服务</view>
				<sx-rate :types="1" :value="service_num" @change2="onChange2"/>
			</view>
			<view class="n4_list logistic">
				<view class="n4_desc">物流服务</view>
				<sx-rate :types="2" :value="logistics_num" @change3="onChange3"/>
			</view>
		</view>
		<view class="evaluate_btn">
			<view class="evaluate_sumbit" @tap.stop="sumbitFun">发表评论</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	import SxRate from '@/components/sx-rate'
	export default{
		components: {SxRate},
		data(){
			return {
				order_id:0,
				isContentFocus: true,
				isInputContentFocus: true,
				isFocus: false,
				content:'',
				describe_num:5,//描述的星星
				service_num:5,//客服的星星 
				logistics_num:5,//物流的星星
				good_data:[],//商品信息
			}
		},
		onLoad(pos) {
			this.order_id = pos.id
			this.get_data()
			console.log(pos.id)
		},
		onShow() {
			
		},
		methods:{
			//提交评论
			async sumbitFun(){
				console.log("评论开始")
				let _this = this
				let end_good_data = {};
				_this.good_data.forEach( (item,index) =>{
					console.log("for------",item.describe_num)
					let data = {}
					let s_data = {}
					let values = item.id
					data.description_match = item.describe_num
					data.content = item.content
					data.image = item.image
					end_good_data[values] = data
					// end_good_data.push(s_data)
				})
				console.log("最后提交的商品信息",JSON.stringify(end_good_data))
				let sumbit_api = await request.requestPost('comment_sumbit',{
					oid:this.order_id,
					service_attitude:this.service_num,
					shipping_service:this.logistics_num,
				    goods:end_good_data
				})
				if(sumbit_api.data.errorCode == 110140){
					_this.$api.msg(`${sumbit_api.data.message}`)
					setTimeout(function() {
						uni.nav
						uni.redirectTo({
							url:`/pages/order/order_desc?id=${_this.order_id}`
						})
					}, 500);
				}
				else{
					_this.$api.msg(`${sumbit_api.data.message}`)
				}
				
				console.log("提交评论api",sumbit_api)
			},
			//获取评价订单
			async get_data(){
				let _this = this
				let data_api = await request.requestGet('comment',{oid:this.order_id})
				console.log("获取",data_api)
				_this.good_data = data_api.data.data.order_goods
				// 遍历给每个商品追加评价星星和上传图片
				_this.good_data.forEach((item,index)=>{
					_this.good_data[index].describe_num = 5
					_this.good_data[index].image = []
					_this.good_data[index].content = ''
				})
				console.log("评价首页",data_api)
			},
			// 图片上传
			async logoupload(pos){
				console.log(pos)
				var _this=this
				let pre_img_length;//当前商品的图片长度，最多5张
				let index = pos.index
				pre_img_length = _this.good_data[index].image.length
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
					   _this.good_data[index].image.push(data.data.image)
				       _this.$api.msg(`${data.message}`)
					   console.log("当前图片",_this.good_data[index].image)
				    }
				});
			},
			onChange(e){
			  let _this = this
			  console.log(e)
			  // 遍历修改相对应的商品评价星星
			  _this.good_data.forEach((item,index)=>{
				  if(item.id == e.id){
					 item.describe_num = e.val
				  }
			  })
			  console.log("订单id",e.id)
			  console.log("这个订单的星星", this.describe_num)
			},
			//星星组件的回调
			onChange2(e){
			  this.service_num = e
			  console.log("客服星星",this.service_num)
			},
			onChange3(e){
			  this.logistics_num = e
			  console.log("物流星星",this.logistics_num)
			}
		}
	}
</script>

<style lang='scss'>
	page{ background: #f0f0f0;}
	.evaluate{ width:100%;height: 100%;
		.evaluate_n1{ width:100%;height:auto;border-bottom:1px solid #d9d9d9;padding:20rpx;background: #ffffff;margin-top:20rpx;display: flex;align-items: center;
			.n1_letf{ width:100rpx;height: 100rpx;
				image{ width:100%;height: 100%;}
			}
			.n1_right{ margin-left:20rpx;
				.n1_right_sx{ display:flex;align-items: center;margin-bottom:12rpx;
					.n1_sx_desc{ margin-right:30rpx}
				}
				.n1_good_title{ width:500rpx;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;word-break: break-all;white-space :normal;}
			}
		}
		.evaluate_n2{background: #fff;padding-top:20rpx;border-bottom:1px solid #d9d9d9;height: 200rpx;
			.textarea{width: 96%;margin: 0 auto;text-align: left;font-size: 26upx;display: block !important;height: 200rpx;}
		}
		.evaluatee_n3{ width:100%;height: auto;background: #ffffff;padding:20rpx;
			.n3_upload{ width:100%;height: 100rpx;display: flex;
				image{ width:100rpx;height: 100%;margin-right:20rpx;}
				.upload_img{ border:1px solid #e8e8e8}
			}
		}
		.evaluate_n4{ width:100%;height: auto;padding:20rpx 20rpx 20rpx 50rpx;background: #fff;margin-top:20rpx;
			.n4_list{ display:flex;align-items: center;
				.n4_desc{ margin-right:20rpx}
			}
			.logistic{ margin-top:20rpx}
		}
		.evaluate_btn{ width:100%;height: auto;margin-top:80rpx;display: flex;align-items: center;justify-content: center;
			.evaluate_sumbit{ width:660rpx;height: 94rpx;background: #e4393c;font-size:32rpx;border-radius: 16rpx;display: flex;align-items: center;justify-content: center;color: #fff;margin-bottom:40rpx}
		}
	}
</style>
