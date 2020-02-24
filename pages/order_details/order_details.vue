<template>
	<view class="details">
		<view v-if="time_type">
		<view class="details_box">
			<view class="box_content">
				<view class="box_content_title">香港直飞塞班5天/6天自由行（特别赠送精品行程/赠接送机/已含税费/全程领队）</view>
				<view class="setmeal_type">
					<text class="type">套餐类型:</text>
					<text class="type_name">倍加尔湖畔</text>
				</view>
				<view class="setmeal_type">
					<text class="type">出游人群:</text>
					<text class="type_name">成人</text>
				</view>
				<view class="setmeal_type" style="display: flex;justify-content: space-between;align-items: center;">
					<view>
						<text class="type">出行时间:</text>
						<text class="type_name">2020-2-20</text>
					</view>
					<view class="type_rig" style="color: #e3b35a;">
						<text>预定须知</text>
						<text class="iconfont" style="font-size: 28upx;">&#xe603;</text>
					</view>
				</view>
			</view>
		</view>
		<view class="details_box1">
			<view class="box1_content"><view class="box1_title">【此商品需二次确定】</view>付款后卖家将在18个工作小时内(工作日9:00-18:00)核实是否有位,若核实无位或超时未确定,将自动退款</view>
		</view>
		<view class="details_box2">
			<view class="box2_purchase_title">购买数量</view>
			<view class="purchase_list">
				<view class="list_lef">
					<view class="list_lef_top">
						<view class="lef_name">成人</view>
						<view class="price">￥7999</view>/人
					</view>
					<view class="list_lef_bot">该订单1个成人起订</view>
				</view>
				<view class="list_right">
					<view class="iconfont" style="font-weight: 600;" @tap="reduce('cr')">&#xe620;</view>
					<input type="number" class="list_rig_input" :value="cr_valueinput"/>
					<view class="iconfont" style="font-weight: 600;" @tap="add('cr')">&#xe645;</view>
				</view>
			</view>
			<view class="purchase_list">
				<view class="list_lef">
					<view class="list_lef_top">
						<view class="lef_name">儿童</view>
						<view class="price">￥2999</view>/人
					</view>
					<view class="list_lef_bot">该订单1个成人起订</view>
				</view>
				<view class="list_right">
					<view class="iconfont" style="font-weight: 600;" @tap="reduce('et')">&#xe620;</view>
					<input type="number" class="list_rig_input" :value="et_valueinput"/>
					<view class="iconfont" style="font-weight: 600;" @tap="add('et')">&#xe645;</view>
				</view>
			</view>
		</view>
		<view class="details_box3">
			<view class="box3_name">我要付款后填写出行人</view>
			<switch @change="switch2Change" color="red"/>
		</view>
		<view class="details_box4">
			<view class="box4_title">出行人</view>
			<view class="box4_content">
				<view class="box4_content_num">出行人</view>
				<view class="box4_content_num">添加<view class="num_color">2位</view>出行人</view>
				<view class="box4_content_bot" @tap="opens">选择出行人</view>
			</view>
			<view class="people_list">
				<view class="iconfont" style="color: red;">&#xe75a;</view>
				<view class="people_name">吴浩宇</view>
				<view class="sf_id">36012719607284518</view>
			</view>
		</view>
		<view class="details_box5">
			<view class="box5_name">卖家留言</view>
			<input class="box5_input" placeholder="选填,请先和商家协商一致" placeholder-style="font-size:26upx"/>
		</view>
		<view class="details_box6">
			<view class="box6_title">联系人</view>
			<view class="box6_list">
				<view class="list_content">
					<view class="list_content_name">姓名</view>
					<input type="text" placeholder="请输入姓名" placeholder-class="place"/>
				</view>
			</view>
			<view class="box6_list">
				<view class="list_content">
					<view class="list_content_name">手机号</view>
					<input type="text" placeholder="请输入手机号" placeholder-class="place"/>
				</view>
			</view>
			<view class="box6_list">
				<view class="list_content">
					<view class="list_content_name">邮箱</view>
					<input type="text" placeholder="请输入邮箱" placeholder-class="place"/>
				</view>
			</view>
		</view>
		<view class="details_box7">
			<view class="box7_title">出行保障</view>
			<view class="box7_content">80%的出境游客选择购买保险,为自己的出行增添保障;若放弃购买,请自行承担风险</view>
		</view>
		<view class="details_box8">
			<view class="box8_title">旅游意外险</view>
			<view class="box8_content">
				<view class="box8_lef">
					<view class="box8_lef_top">
						<view class="lef_name">安盛AXA 全球旅游保险_150万总保障</view>
					</view>
					<view class="box8_lef_bot">
						<view class="box8_bot_con">申报&全球保险</view>
						<view class="box8_bot_con1">80%购买保险</view>
					</view>
				</view>
				<view class="box8_rig">
					<view class="price_box8">￥190.0/份起</view>
					<checkbox value="cb" />
				</view>
			</view>
			<view class="box8_s">
				<view class="box4_content " >
					<view class="box4_content_num">被保人</view>
					<view class="box4_content_num">添加<view class="num_color">2位</view>被保人</view>
					<view class="box4_content_bot" @click="opens">添加被保人</view>
				</view>
				<view class="people_list">
					<view class="iconfont" style="color: red;">&#xe75a;</view>
					<view class="people_name">吴浩宇</view>
					<view class="sf_id">36012719607284518</view>
				</view>
				<view class="time" @click="option_time">
					<view class="time_lef">
						<view class="time_lef_name">保障期限</view>
						<view class="time_content">{{time || '请选择保障日期'}}</view>
					</view>
					<view class="iconfont">&#xe603;</view>
				</view>
				<view class="list_content" style="display: flex;">
					<view class="list_content_name" style="width: 200upx;">保险发票</view>
					<input type="text" placeholder="如需发票,请输入电子邮箱" placeholder-class="place"/>
				</view>
			</view>
		</view>
		<view class="coupon">
			<view class="coupon_left">
				<view class="coupon_name">优惠券</view>
			</view>
			<view class="iconfont" >&#xe603;</view>
		</view>
		<view class="footer">
			<view class="footer_lef">
				<view class="footer_price"><text >￥</text><text class="enlarge">9999.00</text></view>
				<view class="delete">￥9888.00</view>
			</view>
			<view class="footer_rig">
				<view class="footer_rig_detailed" @click="detailed">
					<text class="detailed">明细</text>
					<text class="iconfont" :class="{'types':types}">&#xe683;</text>
				</view>
				<view class="total">去付款</view>
			</view>
		</view>
		</view>
		<uni-popup ref="detailed" type="bottom">
			<view class="detailed_content">
				<view class="detailed_title">费用明细</view>
				<view class="detailed_list">
					<view class="gs_name">购买数量</view>
					<view class="gs_prie">￥188.00x2人</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup" type="bottom">
			<view class="tips">
				<view class="tips_top">
					<view class="list" @click="close">取消</view>
					<view class="list" @click="close">确定</view>
				</view>
				<view class="tips_content_add" @click="order">+新增</view>
				<view style="height: 20upx;background: #f2f3f5;border-top: 1px solid #ebebeb;border-bottom: 1px solid #ebebeb;"></view>
				<view class="content_list">
					<view class="list_item">
						<view class="list_lef">
							<view class="iconfont" style="font-size:60upx;" @click="order">&#xe655;</view>
							<view class="list_information">
								<view class="name">吴丽华</view>
								<view class="user_id">36012419901202413</view>
								<view class="incomplete">信息不全,请补充</view>
							</view>
						</view>
						<checkbox value="cb" color="#FFCC33"  />
					</view>
					<view class="list_item">
						<view class="list_lef">
							<view class="iconfont" style="font-size:60upx;" @click="order">&#xe655;</view>
							<view class="list_information">
								<view class="name">吴丽华</view>
								<view class="user_id">36012419901202413</view>
								<view class="incomplete">信息不全,请补充</view>
							</view>
						</view>
						<checkbox value="cb" color="#FFCC33"  />
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- <view v-if="!time_type">
			<times @timeFun="timeFun"></times>
		</view> -->
		<calendar @change="change" :modal="true" :show="showCaledar"></calendar>
	</view>
</template>

<script>
	import uniPopup from "../../components/popup/uni-popup/uni-popup.vue"
	import calendar from '@/components/xinAdd/date-picker.vue';
	export default{
		components:{uniPopup,calendar},
		data(){
			return{
				showCaledar: true,
				cr_valueinput:1,//成人人数
				et_valueinput:1,//儿童人数
				types:true,
				time_type:true,
				time:''
			}
		},
		onShow() {
		
		},	
		methods:{
			change({ choiceDate, dayCount }) {
				//参数解释
				//1.choiceDate 时间区间（开始时间和结束时间）
				//2.dayCount 共多少晚
				this.time=choiceDate[0].re + '  到 ' + choiceDate[1].re 
				console.log(choiceDate, dayCount);
				// console.log('入住从 ' + choiceDate[0].re + '  到 ' + choiceDate[1].re + '  共 ' + dayCount + ' 晚');
			},
			
			option_time(){
				console.log(11111)
				// this.time_type=false
				this.showCaledar=!this.showCaledar
			},
			detailed(){
				this.$refs.detailed.open()
			},
			reduce(item){
				if(item=='cr'){
					if(this.cr_valueinput==1){
						this.cr_valueinput=1
					}else{
						this.cr_valueinput--
					}
				}else{
					if(this.et_valueinput==1){
						this.et_valueinput=1
					}else{
						this.et_valueinput--
					}
				}
			},
			switch2Change(e){},
			add(item){
				if(item=='cr'){
					this.cr_valueinput++
				}else{
					this.et_valueinput++
				}
			},
			opens(){
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			order(){
				uni.navigateTo({
					url:'/pages/order_details/fillInOrder'
				})
			},
		}
	}
</script>

<style lang="scss">
	.detailed_content{
		background: #FFFFFF;
		padding-bottom: 120upx;
		.detailed_title{height: 80upx;line-height: 80upx;text-align: center;font-size: 34upx;border-bottom: 1px solid #EEEEEE;}
		.detailed_list{
			display: flex;
			align-items: center;
			
			justify-content: space-between;
			padding: 20upx;
			.gs_prie{color: #ff401b;}
		}
	}
	.footer{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100upx;
		padding: 0 20upx;
		background: #FFFFFF;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 1000;
		.footer_lef{
			display: flex;
			align-items: center;
			.footer_price{color: #e75b1c;}
			.enlarge{font-size: 35upx;}
			.delete{color: #a4a4a4;text-decoration:line-through;margin-left: 10upx;}
		}
		.footer_rig{
			display: flex;
			align-items: center;
			.detailed{color: #a4a4a4;}
			.total{
				background: #ff401b;
				color: #FFFFFF;
				border-radius: 20upx;
				padding: 15upx 30upx;
				margin-left: 20upx;
			}
		}
	}
	.types{transform: rotate(180deg);}
	// 弹窗
	.tips{
		background: #FFFFFF;
		.tips_top{
			display: flex;
			justify-content: space-between;
			padding: 30upx;
			background: #f2f3f5;
			border-bottom: 1px solid #ebedec;
		}
		.tips_content_add{background: #FFFFFF;font-size: 30upx;font-weight: 600;text-align: center;padding: 20upx 0;color: #e4ac41;}
		.content_list{
			// margin-top: 20upx;
			.list_item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:  20upx ;
				border-bottom: 1px solid #EEEEEE;
				.list_lef{
					display: flex;
					align-items: center;
					.list_information{
						margin-left: 20upx;
						.name{font-weight: 600;font-size: 32upx;}
						.user_id{padding: 10upx 0;}
						.incomplete{font-size: 30upx;color: #e6ac40;}
					}
				}
			}
			&::last-child{border-bottom: none;}
		}
	}
	page{background: #f4f4f4;}
	.details_box8 .box8_s{
		background: #FFFFFF;
		padding: 20upx;
	}
	.time{
		display: flex;
		justify-content: space-between;
		padding: 20upx 0;
		.time_lef{
			display: flex;
			align-items: center;
			.time_lef_name{
				width: 200upx;
				font-size: 30upx;
			}
			.time_content{font-size: 30upx;color: #999999;}
		}
	}
	.details{position: relative;}
	.coupon{
		width: 96%;
		margin: 0 auto;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		padding:20upx ;
		.coupon_name{width: 200upx;}
	}
	.details_box{
		background-image: linear-gradient(180deg, #fed700, #fbdd47,#f7eba5,#FFFFFF);
		padding: 30upx 0upx 110upx;
		.box_content{
			width: 96%;
			margin: 0 auto;
			background: #FFFFFF;
			border-radius: 10upx;
			padding: 20upx;
			.box_content_title{font-size: 30upx;font-weight: 600;}
			.setmeal_type{
				margin-top: 12upx;
				.type{margin-right: 12upx;}
			}
		}
	}
	.details_box1{
		width: 96%;
		margin: 0 auto;
		background: #FFFFFF;
		border-radius: 10upx;
		padding: 20upx;
		display: flex;
		position: absolute;
		top: 340upx;
		left: 2%;
		// flex-wrap: wrap;
		// align-items: center;
		.box1_title{color: #c38950;font-weight: 600;font-size: 28upx;display: inline-block;}
	}
	.details_box2{
		border-radius: 10upx;
		background: #fff;
		width: 96%;
		margin: 126upx auto 30upx;
		padding:0 20upx;
		.box2_purchase_title{font-size: 34upx;font-weight: 600;border-bottom: 1upx solid #EEEEEE;padding: 20upx 0;}
		.purchase_list{
			margin-top: 15upx;
			border-bottom: 1upx solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.list_lef{
				.list_lef_top{display: flex;align-items: center;font-size: 32upx;
					.lef_name{font-weight: 600;margin-right: 18upx;}
					.price{font-weight: 600;color: #f9ba7b;margin-right: 4upx;}
				}
				.list_lef_bot{padding: 10upx 0;font-size: 28upx;}
			}
			.list_right{
				border: 1px solid #eee;
				display: flex;
				align-items: center;
				height:70upx;
				padding: 8upx 20upx;
				.list_rig_input{display: inline-block;width: 100upx;text-align: center;}
			}
		}
	}
	.details_box3{
		border-radius: 10upx;
		background: #fff;
		width: 96%;
		margin:0 auto 30upx;
		padding:20upx 20upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.box4_content{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0 0;
		.num_color{color: #eeaf38;display: inline-block;}
		.box4_content_bot{background: #fedc00;padding: 15upx;border-radius: 8upx;}
	}
	.people_list{
		display: flex;
		align-items: center;
		padding: 10upx 0;
		.people_name{margin: 0 20upx;}
	}
	.details_box4{
		border-radius: 10upx;
		background: #fff;
		width: 96%;
		margin:0 auto 30upx;
		padding:20upx 20upx;
		.box4_title{
			font-size: 17px;
			font-weight: 600;
			border-bottom: 0.5px solid #EEEEEE;
			padding: 10px 0;
		}
		
		
	}
	.details_box5{
		border-radius: 10upx;
		background: #fff;
		width: 96%;
		margin:0 auto 30upx;
		padding:30upx 20upx;
		display: flex;
		align-items: center;
		.box5_input{font-size: 26upx;margin-left: 15upx;}
	}
	.details_box6{
		border-radius: 10upx;
		background: #fff;
		width: 96%;
		margin:0 auto 30upx;
		padding:20upx 20upx;
		.box6_title{
			font-size: 34upx;
			font-weight: 600;
			border-bottom: 0.5px solid #EEEEEE;
			padding: 10px 0;
		}
		.box6_list{
			border-bottom: 1px solid #eee;
			padding: 15upx 0;
			.list_content{
				display: flex;
				align-items: center;
				.list_content_name{color: #797979;margin-right: 20upx;width: 100upx;}
				.place{font-size: 26upx;}
			}
		}
	}
	.details_box7{
		border-radius: 10upx;
		background: #fff;
		width: 96%;
		margin:0 auto 0upx;
		padding:20upx 0upx 0;
		.box7_title{
			margin: 0 20upx;
			font-size: 34upx;
			font-weight: 600;
			border-bottom: 0.5px solid #EEEEEE;
			padding: 10px 0;
		}
		.box7_content{
			background: #fffbe8;
			font-size: 28upx;
			letter-spacing: 2upx;
			color: #c48f58;
			padding: 20upx;
		}
	}
	.details_box8{
		width: 96%;
		margin:0 auto 30upx;
		padding:0upx 0upx;
		.box8_title{
			margin: 0 20upx;
			font-size: 30upx;
			font-weight: 500;
			border-bottom: 0.5px solid #EEEEEE;
			padding: 10px 0;
			color: #999999;
		}
		.box8_content{
			background: #FFFFFF;
			padding: 20upx ;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.box8_lef{
			
			.lef_name{width: 400upx;}
			.box8_lef_bot{
				display: flex;align-items: center;
				margin-top: 20upx;
				.box8_bot_con{
					border: 1upx solid #f9edcf;
					padding: 8upx;
					font-size: 24upx;
					color: #f6ab1e;
				}
				.box8_bot_con1{
					margin-left: 20upx;
					border: 1upx solid #dedede;
					padding: 8upx;
					font-size: 24upx;
					color: #a6a6a6;
				}
			}
		}
		.box8_rig{display: flex;align-items: center;}
		.price_box8{
			font-size: 30upx;
			font-weight: 600;
			color: #e56226;
			margin-right: 10upx;
		}
	}
</style>
