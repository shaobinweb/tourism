<template>
	<!-- 发票页面 -->
	<view class="invoice">
		<!-- 头部 -->
		<view class="invoice_header">
			<view class="header_l">*发票类型</view>
			<view class="header_r">
				<view :class="{'personage':true, 'header_btn':true,'nav_activy':personage}" @tap="cut_navFun(0)">个人</view>
				<view :class="{ 'company':true, 'header_btn':true,'nav_activy':!personage}" @tap="cut_navFun(1)">企业</view>
			</view>
		</view>
		<!-- 个人发票 -->
		<view class="personage_box" v-if="personage">
			<view class="personage_n1">
				<input @input="per_name_fun" :value="personage_list[0].name" placeholder="请输入个人或姓名" placeholder-style="font-size:28rpx"/>
			</view>
			<view class="personage_n2">
				<view class="n2_l">发票内容:</view>
				<text class="n2_r">明细</text>
			</view>
			<view class="personage_n3">
				<view class="per_n3_l">*发票人手机号:</view>
				<view class="per_n3_r">
					<input @input="per_tel_fun" :value="personage_list[0].tel" placeholder="请输入手机号码" placeholder-style="font-size:28rpx"/>
				</view>
			</view>
			<view class="per_desc">
				<text class="per_desc_t">发票一经开具，不可修改发票抬头</text>
				<text class="per_desc_b">企业型发票必须填写纳税人识别号，一般为 15、18或20位纯数字或数字加大写字母组合。</text>
			</view>
			
		</view>
		<!-- 企业发票 -->
		<view class="personage_box" v-else>
			<view class="personage_n1">
				<input @input="com_name_fun" :value="company_list[0].name" placeholder="请输入企业名称" placeholder-style="font-size:28rpx"/>
			</view>
			<view class="personage_n2">
				<view class="n2_l">发票内容:</view>
				<text class="n2_r">明细</text>
			</view>
			<view class="personage_n3">
				<view class="per_n3_l">*纳税人识别号:</view>
				<view class="per_n3_r">
					<input @input="com_num_fun" :value="company_list[0].num" placeholder="或统一社会信用代码" placeholder-style="font-size:28rpx"/>
				</view>
			</view>
			<view class="personage_n3">
				<view class="per_n3_l">*发票人手机号:</view>
				<view class="per_n3_r">
					<input @input="com_tel_fun" :value="company_list[0].tel" placeholder="请输入手机号码" placeholder-style="font-size:28rpx"/>
				</view>
			</view>
			<view class="per_desc">
				<text class="per_desc_t">发票一经开具，不可修改发票抬头</text>
				<text class="per_desc_b">企业型发票必须填写纳税人识别号，一般为 15、18或20位纯数字或数字加大写字母组合。</text>
			</view>
			
		</view>
		<!-- 下方的两个按钮 -->
		<view class="invoice_footer">
			<view class="footer_L_btn" @tap="back_fun">取消</view>
			<view class="footer_R_btn" @tap="invoice_submit">保存</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				personage : true ,
				personage_list : [
					{
						name : '',
						tel : '',
						num:''
					}
				],
				company_list : [
					{
						name : '',
						num : '',
						tel : ''
					}
				]
			}
		},
		onShow() {
			let p = uni.getStorageSync('invoice_personage')
			let c = uni.getStorageSync('invoice_company')
			console.log(uni.getStorageSync('invoice_company'))
			if( p != ""){this.personage_list =  p}
			if( c!= ""){this.company_list = c}
		},
		methods: {
			// 切换菜单
			cut_navFun : function ( item ){
				this.personage = item == 0 ? true :false
			},
			//个人发票名字
			per_name_fun : function ( e ){
				this.personage_list[0].name = e.detail.value 
				console.log("个人发票数据",this.personage_list)
			},
			//个人发票名字
			per_tel_fun : function ( e ){
				this.personage_list[0].tel = e.detail.value 
				console.log("个人发票数据",this.personage_list)
			},
			//企业发票名字
			com_name_fun : function ( e ){
				console.log("企业发票数据",e.detail.value)
				console.log(this.company_list)
				this.company_list[0].name = e.detail.value
				
			},
			//企业识别号
			com_num_fun : function ( e ){
				this.company_list[0].num = e.detail.value
				console.log("企业发票数据",this.company_list)
			},
			//企业发票手机号
			com_tel_fun : function ( e ){
				this.company_list[0].tel = e.detail.value
				console.log("企业发票数据",this.company_list)
			},
			//保存返回上一页
			invoice_submit : function ( e ){
				// 发票是通过修改main.js里面vue原型的变量 也可以用vuex
				if ( this.personage ){
					if(this.personage_list[0].name == "" || this.personage_list[0].tel == ""){
						this.$api.msg('个人发票不完整')
						return
					}
					// 个人
					Vue.prototype.$invoice = 0
					uni.setStorageSync('invoice_personage',this.personage_list)
				}
				else{
					//公司
					if(this.company_list[0].name == ""||this.company_list[0].num==""||this.company_list[0].tel ==""){
						this.$api.msg('企业发票不完整')
						return
					}
					Vue.prototype.$invoice = 1
					uni.setStorageSync('invoice_company',this.company_list)
				}
				console.log('个人发票',uni.getStorageSync('invoice_personage'))
				console.log('公司发票',uni.getStorageSync('invoice_company'))
				uni.navigateBack({})
			},
			//取消
			back_fun : function (){
				uni.navigateBack({
					
				})
			}
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	//头部
	.invoice_header{ margin-left:30rpx;margin-right:30rpx;padding:30rpx 30rpx 30rpx 0;border-bottom:1px solid #e8e8e8;display: flex;align-items: center;
		.header_l{ font-size:28rpx;color: #333;}
		.header_r{ font-size:28rpx;margin-left:50rpx;display: flex;align-items: center;}
		.header_btn{ padding:0 50rpx;height: 74rpx;line-height: 70rpx;text-align: center;border-radius: 200rpx;}
		.personage{ margin-right:50rpx;}
		.nav_activy { background: #333;color: #fff;}
		.company{ border:1px solid #d8d8d8}
	}
	//个人发票
	.personage_box{ width:auto;height: 100px;background: #fff;margin-left:30rpx;margin-right:30rpx;
		.personage_n1,.personage_n2,.personage_n3{ height: 100rpx;border-bottom:1px solid #e8e8e8;display: flex;align-items: center;}
		.n2_l{ font-size: 28rpx;color: #333;margin-right:60rpx}
		.n2_r{ font-size: 28rpx;color: #000;}
		.per_n3_l{ font-size:28rpx;color: #333;margin-right:40rpx}
		.per_desc{ font-size:24rpx;color: #999;}
		.per_desc_t{ display:block;margin-bottom:40rpx;margin-top:40rpx}
	}
	// 页脚两个按钮
	.invoice_footer{ position: fixed;left:0;right:0;bottom:0;height: 96rpx;line-height: 96rpx;font-size: 28rpx;display: flex;align-items: center;justify-content: space-between;text-align: center;
		.footer_L_btn{ flex: 1;height: 100%;color: #333;background: #f9f9f9;}
		.footer_R_btn{ flex : 1;height: 100%;color: #ffffff;background: #e4393c;}
	}
</style>
