<template>
	<view class="feedback">
		<view class="feedback_textarea">
			<textarea
			 v-model="content"
			 v-show="isInputContentFocus"
			 placeholder="请输入你的意见"
			 v-bind:focus="isFocus"
			 class="textarea"
			 placeholder-style="color:#333;font-size:26upx"
			 ></textarea>
		</view>
		<button class="but" @tap="submit_fun">提交</button>
	</view>
</template>

<script>
	import request from '@/tool/request.js'
	export default{
		name:"feedback",
		data(){
			return{
				isContentFocus: true,
				 isInputContentFocus: true,
				 isFocus: false,
				 content:''
			}
		},
		 methods: {
		    async submit_fun(){
				let data_api = await request.requestPost('submit_idea',{
					content:this.content
				})
				console.log("提交",data_api.data)
				if(data_api.data.errorCode == 100045){
					this.$api.msg(`${data_api.data.message}`)
					setTimeout(function() {
						uni.navigateBack({
							
						})
					}, 500);
				}
				
			}
		}
	}
</script>


<style lang="scss">
	page{background: #f9f9f9;}
	.feedback_textarea{background: #FFFFFF;margin-top: 30upx;padding: 30upx 0;}
	.textarea{width: 96%;margin: 0 auto;text-align: left;font-size: 26upx;}
	.but{background: #ef8f0d; font-size: 30upx;color: #FFFFFF;width:150upx;margin-top: 60upx;}
</style>