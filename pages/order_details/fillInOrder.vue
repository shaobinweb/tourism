<template>
	<view class="fill_in">
		<view class="fill_in_list" style="margin-top: 30upx;">
			<view class="content">
				<label class="name">中文名字</label>
				<input placeholder="请输入姓名 (例:张三)" type="text" class="content_input" placeholder-class="place"/>
			</view>
		</view>
		<view class="fill_in_list" >
			<view class="content">
				<label class="name">拼音姓</label>
				<input placeholder="请输入护照上的拼音姓" type="text" class="content_input" placeholder-class="place"/>
			</view>
		</view>
		<view class="fill_in_list" >
			<view class="content">
				<label class="name">拼音名</label>
				<input placeholder="请输入护照上的拼音名" type="text" class="content_input" placeholder-class="place"/>
			</view>
		</view>
		<view  @click="open" style="margin: 30upx 0;"> 
			<view class="zj_type">
				<view class="zj_type_lef">
					<view class="zj_type_name">证件类型</view>
					<view class="option">请选择</view>
				</view>
				<view class="iconfont">&#xe603;</view>
			</view>
			<view class="zj_number" v-if="zj_id!=0">
				<view class="zj_type_name">证件号码</view>
				<input placeholder="请填写" placeholder-class="place"/>
			</view>
		</view>
		
		
		<view class="phone">
			<label class="name">手机号</label>
			<input placeholder="请输入手机号" type="number" class="content_input" placeholder-class="place"/>
		</view>
		<view class="gender">
			<view class="gender_name">性别</view>
			<view class="gender_list">
				<block v-for="(item,index) in gender" :key="index">
					<view class="list_name" :class="{'back_red':item.id==id}" @click="genderFun(item)" >{{item.name}}</view>
				</block>
			</view>
		</view>
		<view class="time">
			<view class="time_name">出生年月</view>			
			<picker mode="date" class="picker_s" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="uni-input">{{rq_data|| '请输入出生年月'}}</view>
			</picker>
			<!-- <input placeholder="" placeholder-class="place">
				
			</input> -->
		</view>
		<button class="but">保存</button>
		<view class="gx">
			<checkbox value="cb" />
			<label style="margin-left: 20upx;">阅读并同意以下内容</label>
		</view>
		<view class="Message">根据旅客法的相关要求,购买旅游度假商品需提供出行人的身份证件信息,并需在服务中出具对应身份证件用于验证
		请确保录入信息真实有效。</view>
		<uni-popup ref="popup" type="bottom">
			<view class="tips">
				<block v-for="(item,index) in certificates" :key="index">
					<view class="tips_name" @click="zj_fun(item)">
						<view class="name">{{item.name}}</view>
						<view v-if="zj_id==item.id" class="iconfont" style="color: #e8a121;">&#xe63f;</view>
					</view>
				</block>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "../../components/popup/uni-popup/uni-popup.vue"
	export default{
		components:{uniPopup},
		data(){
			 const currentDate = this.getDate({
			            format: true
			        })
			return{
				id:0,
				zj_id:0,
				gender:[{name:'男',id:1},{name:'女',id:2}],
				date: currentDate,
				rq_data:'',
				certificates:[
					{
						name:'身份证',
						id:1
					},
					{
						name:'护照',
						id:2
					},
					{
						name:'港澳通行证',
						id:3
					},
					{
						name:'台湾通行证',
						id:4
					},
					{
						name:'台胞证',
						id:5
					},
					{
						name:'回乡证',
						id:6
					},
					{
						name:'军官证',
						id:7
					}
				]
			}
		},
		methods:{
			genderFun(item){
				this.id=item.id			
			},
			zj_fun(item){
				this.zj_id=item.id
				this.$refs.popup.close()
			},
			open(){
				this.$refs.popup.open()
			},
			bindDateChange: function(e) {
				this.rq_data = e.target.value
			},
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
	}
</script>

<style lang="scss">
	page{background: #f2f3f5;}
	.back_red{background: #fec900;}
	.zj_number{display: flex;align-items: center;padding: 20upx ;background: #FFFFFF;
		.zj_type_name{width: 180upx;color: #686868;}
	}
	.tips{
		background: #FFFFFF;
		padding:0 20upx;
		.tips_name{
			padding: 20upx 0;
			border-bottom: 1px solid #EEEEEE;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.name{
				font-size: 28upx;
				letter-spacing: 2upx;
			}
		}
	}
	.place{
		font-size: 26upx;
	}
	.gx{
		padding: 0 20upx;
		color: #a7a7a7;
		font-size: 28upx;
	}
	.Message{
		padding: 0 20upx;
		color: #a7a7a7;
		font-size: 28upx;
		margin-top: 20upx;
		line-height: 50upx;
		letter-spacing: 2upx;
	}
	.fill_in_list{
		.content{
			display: flex;
			align-items: center;
			border-bottom: 1upx solid #EEEEEE;
			padding: 20upx 0;
		}
		background: #FFFFFF;
		
		padding:0 20upx;
		font-size: 30upx;
		.name{width: 180upx;color: #686868;}
		
	}
	.zj_type{
		padding: 20upx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		// margin: 30upx 0;
		.zj_type_lef{
			display: flex;
			align-items: center;
			.zj_type_name{width: 180upx;color: #686868;}
		}
	}
	
	.phone{
		padding: 20upx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		.name{width: 180upx;color: #686868;}
	}
	.gender{
		padding: 20upx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30upx 0 0;
		border-bottom: 1px solid #EEEEEE;
		.gender_name{width: 180upx;color: #686868;}	
		.gender_list{
			display: flex;
			.list_name{
				border: 1px solid #eee;
				padding: 10upx 15upx;
				font-size: 26upx;
				margin-left: 20upx;
			}
		}
	}
	.time{
		padding: 20upx;
		background: #FFFFFF;
		.time_name{display: inline-block;width: 180upx;color: #686868;}
		.picker_s{display: inline-block;width: 500upx;}
	}
	.but{
		margin:40upx 20upx;
		background: #fec900;
		height: 80upx;
		line-height: 80upx;
	}
</style>
