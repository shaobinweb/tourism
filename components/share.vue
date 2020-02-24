<template>
	<view>
		<view class="share_box" v-if="is_true">
		<!-- 	<view class="share_list">
				<view class="s_list_item" @tap="shareFc()">生成海报</view>
				<view class="s_list_item list_cancer" @tap="shareCancel">取消</view>
			</view> -->
		</view>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
		<!-- 显示图片 -->
		<view class="shou_img" v-if="show_img">
			<image :src="poster.finalPath" mode="aspectFit"></image>
		<!-- 	<view class="posterBtn">
				<view class="poster_btn poster_cancel" @tap="shareimgCancel">取消</view>
				<view class="poster_btn poster_confirm" @tap="saveImage">保存</view>
			</view> -->
			<!--  #ifdef  MP -->
			<view class="share_btns">
				<view class="share_imgBtn">
					<view class="img_btn_list">
						<button class="share-btn" open-type="share" style="background-color: none;">
							<image src="../static/icon-wx.png"></image>
							<view class="btn_title">微信好友</view>
						</button>
					</view>
					<view class="img_btn_list">
						<image src="../static/saveImg.png"></image>
						<view class="btn_title">保存图片</view>
					</view>
				</view>
				<view class="share_cancel" @tap="shareimgCancel">
					取消分享
				</view>
			</view>
			<!--  #endif -->
		</view>
	</view>
</template>
<script>
	import _app from '@/tool/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/tool/QS-SharePoster/QS-SharePoster.js';
	export default {
		props:{
			good_mage:String,//商品主图
			good_title:String,//商品标题
			is_true:Boolean,//是否显示
			good_price:Number,//价格
			user_img:String,//用户头像
			user_name:String,//用户名字
			good_cecn:Number,//购物金
		},
		data() {
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				show_img:false
			}
		},
		mounted() {
			this.shareFc()
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '自定义分享标题',
		      path: '/pages/test/test?id=123'
		    }
		},
		methods: {
			//保存图片
			saveImage(){
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			shareimgCancel(){
				this.show_img = false
			},
			shareCancel(){
				this.$emit('sharechage')
			},
			async shareFc() {
				let _this = this
				try {
					console.log('准备生成:' + new Date())
                    
					// 小程序获取图片信息要https
					// let httpsimg = this.good_mage.replace('http://jlf.db.juntest.com/','https://img.sonday.cn')
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据

						},
						backgroundImage:'https://img.sonday.cn/images/admin/upload/20191101/a1d4369844ed1f7f31a239cd59e4cbaf.png',
						posterCanvasId: this.canvasId,	//canvasId
						delayTimeScale: 20, //延时系数
						/* background: {
							width: 1080,
							height: 1920,
							backgroundColor: '#666'
						}, */
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.04;
							const lineHeight = bgObj.height * 0.08;
							let user_img = this.user_img.replace('http','https')
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([{
										type: 'custom',
										setDraw(Context) {
											Context.setFillStyle('white');
											Context.setGlobalAlpha(1);//内容透明度
											Context.fillRect(0, bgObj.height - bgObj.height * 0.3, bgObj.width, bgObj.height * 0.3);//内容阴影部分，这些宽高都是根据图片的宽高信息来算的，所以用比例来换算比较好
											Context.setGlobalAlpha(1);
										}
									},
									{
										type: 'text',
										fontStyle: 'normal',
										text: this.good_title.substring(0,22)+'...',//商品标题
										size: fontSize,//文字大小
										color: 'black',//颜色
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											
											return {
												dx: (bgObj.width - textLength)/2,
												dy: bgObj.height - lineHeight * 3
											}
										},
										serialNum: 0,
										id: 'tag1'	//自定义标识
									},
									{
										type: 'text',
										text: '¥'+this.good_price+'+'+this.good_cecn+'购物金',
										size: fontSize,
										color: 'red',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											_app.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx:bgObj.width*0.08 + bgObj.width **0.055,
												dy: bgObj.height - bgObj.height * 0.15
											}
										}
									},
									{
										//用户名
										type: 'text',
										text: '好友'+this.user_name,
										size: fontSize,
										color: 'black',
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											return {
												dx:bgObj.width*0.2 ,
												dy: bgObj.height - bgObj.height * 0.07,
											}
										}
									},
									{
										//头像
										type: 'image',
										url:user_img,
										dWidth:bgObj.width * 0.1,
										dHeight:bgObj.width * 0.1,
										dx:bgObj.width*0.08,
										dy: bgObj.height - bgObj.height * 0.11,
										circleSet:{
											r:bgObj.width*0.05,
										}
									},
									{
										type: 'qrcode',
										text: '俊网商城',
										// image: '/static/2.jpg',//二维码的中心图片，类似用户的logo
										url: '/static/ewcode.png',//二维码图片
										ewcode_size: bgObj.width * 0.2,
										dx:bgObj.width*0.7,
										dy: bgObj.height - bgObj.width * 0.245
									}
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							let canverInfo = bgObj
							canverInfo.height = bgObj.height+bgObj.height * 0.3
							this.poster = canverInfo;
						}
					});
					console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
					this.show_img = true
					console.log("显示图片",this.show_img)
					_this.$emit('sharechage')
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
			}
		}
	}
</script>

<style lang='scss'>
	uni-button, button{ height: auto;line-height: auto;font-size: 24rpx}
	button{ padding:0rpx;font-size:24rpx;text-align: center;line-height:none}
	button::after{ border:none}
	.button-hover{ background-color: none;}
	/* 分享的按钮start */
	.share_btns{ width:100%;height: auto;background: #fff;position: fixed;bottom:0px;left:0px;right:0px;
		.share_imgBtn{ width:100%;height: auto;padding:40rpx;display: flex;align-items: center;
			.img_btn_list{font-size:24rpx;margin-right:30rpx;
				image{ width:100rpx;height: 100rpx;border-radius: 8rpx;margin-top:0rpx}		
			}
		}
		
		.share_cancel{ width:100%;height: 90rpx;display: flex;align-items: center;justify-content: center;border-top:2rpx solid #e7e7e7;font-size: 28rpx;}
	}
	
	/* 分享的按钮end */
	/* 分享赚start */
	.share_box{ width:100%;height: 100%;position: fixed;z-index:1000;left:0px;right:0rpx;top:0rpx;bottom:0px;background: rgba(0,0,0,0.4);
		.share_list{ width:100%;height:auto;position: fixed;bottom: 4rpx;display: flex;justify-content: center;align-items: center;flex-direction: column;
			.s_list_item{ width:94%;height: 80rpx;border-radius: 10rpx;display: flex;align-items: center;justify-content: center;background: #fff;}
			.list_cancer{ margin-top:20rpx}
		}
	}
	/* 分享赚end---------------------- */
	/* 显示图片 */
	.shou_img{ 
		width:100vw;height: 100vh;position: fixed;top:0px;bottom:0px;left:0px;right:0rpx;z-index:1000;background: rgba(0,0,0,0.4);display: flex;align-items: center;flex-direction: column;
		image{ width:80%;height: 700rpx;margin-top:100rpx}
		.posterBtn{ width:80%;height: 60rpx;display: flex;justify-content: center;align-items: center;margin-top:20px}
		.poster_btn{ width:140rpx;background: #fff;height: 60rpx;display: flex;justify-content: center;align-items: center;border-radius: 10rpx;}
		.poster_confirm{ margin-left:40rpx}
	}
	
	/* 海报 */
	.hideCanvasView {
		position: relative;
	}
	
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
	
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}
	
	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	
	.backgroundColor-white {
		background-color: white;
	}
	
	.border_radius_10px {
		border-radius: 10px;
	}
	
	.padding1vh {
		padding: 1vh;
	}
	
	.posterImage {
		width: 60vw;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
