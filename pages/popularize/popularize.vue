<template>
	<view class="popularize">
		<view class="pop_bg">
			<image src="/static/popularize_bg.jpg" mode="aspectFill"></image>
		</view>
		<!-- 两个按钮 -->
		<view class="pop_btn">
			<view class="pop_btn_l">
				<image src="../../static/link_btn.png" mode="aspectFill" :data-url="line_share_data" @tap="line_share"></image>
			</view>
			<view class="php_btn_r">
				<image src="../../static/post_btn.png" mode="aspectFill" @tap="poster_share"></image>
			</view>
		</view>
		<!-- 海报分享弹窗 -->
		<view class="poster_alert" v-if="poster_alert">
			<view class="alert_close" @tap="close_poster"></view>
			<view class="alert_box">
				<view class="alert_box_title">分享海报</view>
				<view class="box_image">
					<image v-for="(item,index) in share_img_url" :src="item" :key="index" mode="aspectFill" @tap="preview_img(item)"></image>
				</view>
			</view>
		</view>
		<view class="preview" v-if="preview_alert">
			<view class="preview_close" @tap="preview_close"></view>
			<view class="preview_box">
				<image :src="preview_img_src" mode="aspectFill"></image>
			    <!-- 官方的保存图片接口不兼容h5  屏蔽了h5端的保存图片 -->
				<!--  #ifndef H5 -->
					<view class="save_img">
						<image src="../../static/get_post.png" mode="aspectFill" @tap="save_imgFun"></image>
					</view>
				<!--  #endif -->
				
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default {
		data() {
			return {
				url:'http://senior.db.juntest.com/',
				line_share_str : '',
				poster_alert: false,
				share_img_url : [],
				preview_alert: false,
				preview_img_src : [],
				line_share_data : '',//链接分享
			}
		},
		async onShow() {
			let _this = this
			let data_api = await request.requestGet('recommend')
			_this.share_img_url = data_api.data.data.recommendPicList 
			_this.line_share_data = data_api.data.data.url
			_this.share_img_url.forEach((item,index)=>{
				_this.share_img_url[index] = _this.url + item
			})
		},
		methods: {
			// 链接分享
			line_share : function ( e ){
				let _this = this
				let line_str = e.currentTarget.dataset.url
				//#ifndef H5
				// 这个代码不存在h5端
					uni.setClipboardData({
						data: line_str,
						success: function () {
							console.log("app端或者小程序复制成功",line_str)
						}
					});
				//#endif

			},
			//海报分享
			poster_share : function ( e ){
				this.poster_alert = true
			},
			close_poster : function ( e ){
				this.poster_alert = false
			},
			//预览海报
			preview_img : function ( src ){
				let _this = this
				this.preview_img_src.push(src)
				uni.previewImage({
				    urls: _this.share_img_url,
				    longPressActions: {
				        itemList: ['发送给朋友', '保存图片', '收藏'],
				        success: function(data) {
				            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
							
				        },
				        fail: function(err) {
				            console.log(err.errMsg);
				        }
				    }
				});
			},
			preview_close : function ( e ){
				this.preview_alert = false
				this.poster_alert = true
			},
			//保存海报
			save_imgFun : function ( e ){
				let _this = this
				uni.saveImageToPhotosAlbum({
				            filePath: _this.preview_img_src,
				            success: function () {
				                console.log('save success');
				            }
				        });
			}
		}
	}
</script>

<style  lang='scss'>
	uni-page-body, uni-page-refresh{ height:100%;overflow: hidden}
    .popularize{ width:100%;height: 100%;position: relative;
		.pop_bg{ width:100%;height: 100vh;overflow: hidden;
			image{ width:100%;height: 100%;}
		}
		.pop_btn{ width:100%;height:auto;position: absolute;left:0;right:0;bottom:54rpx;padding-left:80rpx;padding-right:80rpx;display: flex;justify-content: space-between;}
		.pop_btn_l,.php_btn_r{ width:234rpx;height: 82rpx;
			image{ width:100%;height:100%}
		}
		.poster_alert{ position: fixed;left:0;right: 0;top:0;bottom:0;background: rgba(0,0,0,0.6);display: flex;align-items: center;justify-content: center;flex-direction: column;}
		.alert_box{ width:560rpx;height:840rpx ;background: #ffffff;padding:24rpx;border-radius: 16rpx;
			image{ width:244rpx;height: 350rpx;margin-bottom:20rpx}
		}
		.alert_box_title{ width:100%;height: auto;margin-bottom:28rpx;text-align: center;color: rgba(51,51,51,1);font-size: 32rpx;}
		.box_image{ display: flex;align-items: center;justify-content: space-between;flex-wrap: wrap;}
		.alert_close{ width:60rpx;height:60rpx;background: url(../../static/close.png) no-repeat;background-size:60rpx 60rpx;margin-bottom:20rpx;text-align: right;}
		
		/* 预览图片 */
		.preview{ position: fixed;left:0;right: 0;top:0;bottom:0;background: rgba(0,0,0,0.6);display: flex;align-items: center;justify-content: center;flex-direction: column;}
	}
	.preview_box{ width:472rpx;height: 920rpx;
		image{ width:100%;height: 688rpx;}
	}
	.preview_close{ width:60rpx;height:60rpx;background: url(../../static/back.png) no-repeat;background-size:60rpx 60rpx;margin-bottom:20rpx;text-align: right;}
	.save_img{ width:100%;height: 66rpx;margin-top:20rpx;
		image{ width:100%;height:100%;}
	}
</style>
