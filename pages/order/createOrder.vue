<template>
	<view>
		<!-- 地址 -->
		<!-- 选择收货地址  -->
		<navigator v-if="addressData != null" url="/pages/order/address/address?source=1" :class="{'address-section':true, 'over_body':maskState == 1}">
			<view class="order-content">
				<text class="address_icon"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{addressData.consignee}}</text>
						<text class="mobile">{{addressData.mobile}}</text>
					</view>
					<text class="address">{{addressData.address}}</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
		</navigator>
		<view v-else class="address-section">
			<view class="order-content order-content2">
				<view class="row b-b">
					<text class="tit">姓名</text>
					<input class="input" type="text" v-model="addressData2.consignee" placeholder="收货人姓名" placeholder-class="placeholder" />
				</view>
				<view class="row b-b">
					<text class="tit">手机号</text>
					<input class="input" type="number" v-model="addressData2.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
				</view>
				<view class="row b-b" @tap="openAddres" style="display: flex;justify-content: space-between;width:100%;">
					<text class="tit">选择地址</text>
					<text  class="input">
						{{pickerText.label || '请选择地址'}}
					</text>
					<!-- <text class="yticon icon-shouhuodizhi"></text> -->
				</view>
				<view class="row b-b"> 
					<text class="tit">详情地址</text>
					<input class="input" type="text" v-model="addressData2.area" placeholder="楼号、门牌" placeholder-class="placeholder" />
				</view>
			</view>
		</view>
		<view class="goods-section">
			<!-- 商品列表 -->
			<block v-for="(items,index) in goods_data" :key="index">
				<view class="g-item" v-for="item in items" :key="item.goods_id">
					<image :src="item.goods_thumb"></image>
					<view class="right">
						<text class="title">{{item.goods_name}}</text>
						<text class="spec">{{item.spec_title}}</text>
						<view class="price-box">
							<block v-if="item.cecn_num != 0">
								<text class="price">￥{{SpreadFun(item.total_price,item.cecn_num)}} + {{item.cecn_num}}</text>
								<label class="pay_type">购物金</label>
								<text class="number">x {{item.goods_num}}</text>
							</block>
							<block v-else>
								<text class="price">￥{{item.total_price}}</text>
								<text class="number">x {{item.goods_num}}</text>
							</block>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 发票留言 -->
		<view class="message_box">
			<view class="message_box_t message_list">
				<view class="message_t_l">买家留言</view>
				<view class="message_t_r">
					<textarea auto-height placeholder-style="color:rgb(117, 117, 117);font-size:28rpx;text-align:right" :value="message_str" @input="messageFun" placeholder="选填输入输入"/>
				</view>
			</view>
			<view class="message_box_m message_list">
				<view class="message_m_l">
					发票信息
				</view>
				<view class="message_m_r" @click.stop="invoiceFun">
					<block v-if="invoice_type == -1">填写发票信息</block>
					<block v-if="invoice_type == 0">{{invoice[0].name}}</block>
					<block v-if="invoice_type == 1">{{invoice[0].name}}</block>
					<text class="yticon icon-you" style="font-size: 28rpx;"></text>
				</view>
			</view>
			<view class="message_box_b message_list" @click="toggleMask('show')">
				<view class="message_b_l">优惠卷</view>
				<block  v-if="concessions_price == 0">
					<view class="message_b_r">
						<label  style="color: #e4393c;">{{couponList_length}} 张优惠券可用</label> 
					</view>
				</block>
				<block v-else>
					<view class="message_b_r">
						<label  style="color: #e4393c;">已优惠¥{{concessions_price}}</label> 
					</view>
				</block>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="statistics">
			<view class="sta_list">
				<view class="sta_list_l">商品合计</view>
				<view class="sta_list_r">¥ {{order_payment_data.total_price || 0}}</view>
			</view>
			<view class="sta_list">
				<view class="sta_list_l">运费合计</view>
				<view class="sta_list_r">¥ {{order_payment_data.postage || 0}}</view>
			</view>
			<view class="sta_list">
				<view class="sta_list_l">优惠合计</view>
				<view class="sta_list_r">¥ {{parseFloat(order_payment_data.discount_price) + parseFloat(concessions_price) || 0}}</view>
			</view>
			<view class="sta_list">
				<view class="sta_list_l">购物金金额</view>
				<view class="sta_list_r">¥ {{order_payment_data.cecn_num || 0}}</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text class="total_num">共 {{goods_num || 0}} 件</text>
				<label class="total_n2">合计</label>
				<block v-if="order_payment_data.cecn_num == 0">
					<text class="price">￥{{SpreadFun_m(total_c_price)}}</text>
				</block>
				<block v-else>
					<text class="price">￥{{SpreadFun_m(total_c_price) || 0}}+{{order_payment_data.cecn_num || 0}}购物金</text>
				</block>
			</view>
			<text class="submit" @click="submit">提交订单</text>
		</view>
		<!-- 优惠券面板 -->
		<!-- 下单优惠卷 -->
		<view class="coupon" v-if="maskState == 1">
			<view class="coupon_box">
				<view class="coupon_header">
					<view class="c_header_left">优惠卷</view>
					<view class="c_header_right" @click="toggleMask_un"><image src="../../static/c_close.png" mode="aspectFit"></image></view>
				</view>
				<view class="coupon_type">
					<view :class="{'type_available':true, 'c_active':useable == 1}" @tap="useableFun(1)">可用优惠卷（{{couponList_length}}）</view>
					<view :class="{'type_no_ava':true,'c_active':useable == 0}" @tap="useableFun(0)">不可用优惠卷（{{un_couponList_length}}）</view>
				</view>
				<block v-if="useable == 1">
					<scroll-view class="list_box_c" scroll-y="true">
						<view class="coupon_list" v-for="item in couponList[0]" :key="item.id">
							<view class="coupon_list_l">
								<block v-if="item.discount_type ==2">
									<view class="list_l_price"><label class="price_type">¥</label>{{item.quota}}</view>
									<view class="list_l_if">满{{item.money}}可用</view>
								</block>
								<block v-if="item.discount_type ==1">
									<view class="list_l_price">{{item.quota}}<label class="price_type">折</label></view>
									<view class="list_l_if">满{{item.money}}可用</view>
								</block>
							</view>
							<view class="coupon_m">
								<view class="coupon_name">
									<view class="coupon_name_l">全平台</view>
									<view  v-if="item.discount_type ==2" class="coupon_name_r">满减{{item.quota_text}}</view>
									<view  v-if="item.discount_type ==1">满减{{item.quota}}折</view>
								</view>
								<view class="coupon_time">
									{{item.end_time}}
								</view>
							</view>
							<view class="coupon_r">
								<icon v-if="item.is_select == 0" :data-id="item.id" :data-type="item.coupon_level" @tap="select_couponFun(0,$event)"  type="success default "  size="22"/>
								<icon v-else :data-id="item.id" @tap="select_couponFun(1,$event)" type="success successicon "  size="20"/>
							</view>
						</view>
					</scroll-view>
					<view class="coupon_btn" @click="toggleMask">
						确认
					</view>
				</block>
				<block v-else>
					<!-- 不可用优惠券 -->
					<scroll-view class="list_box_c" style="height: 62vh;" scroll-y="true">
						<view class="coupon_list" v-for="item in un_useable" :key="item.id">
							<view class="coupon_list_l">
								<block v-if="item.discount_type ==2">
									<view class="list_l_price"><label class="price_type">¥</label>{{item.quota}}</view>
									<view class="list_l_if">满{{item.money}}可用</view>
								</block>
								<block v-if="item.discount_type ==1">
									<view class="list_l_price">{{item.quota}}<label class="price_type">折</label></view>
									<view class="list_l_if">满{{item.money}}可用</view>
								</block>
							</view>
							<view class="coupon_m">
								<view class="coupon_name">
									<view class="coupon_name_l">全平台</view>
									<view  v-if="item.discount_type ==2" class="coupon_name_r">满减{{item.quota_text}}</view>
									<view  v-if="item.discount_type ==1">满减{{item.quota}}折</view>
								</view>
								<view class="coupon_time">
									{{item.end_time}}
								</view>
							</view>
						</view>
					</scroll-view>
				</block>
			</view>
		</view>
<!-- 地址选择 -->
    <simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
	</view>
</template>

<script>
	import Vue from 'vue'
	import cityDatas from '../../tool/city.area.js';
	import uniPopup from '@/components/uni-pop.vue';
	import request from '@/tool/request.js'
	import simpleAddress from "@/components/simple-address/simple-address.nvue"
	import bizPay from '@/tool/bizPay.js'
	export default {
		components: {
			uniPopup,
			simpleAddress
		},
		data() {
			return {
				maskState: 0, //优惠券面板显示状态
				desc: '', //备注
				payType: 1, //1微信 2支付宝
				couponList: [],
				addressData: {},//默认的地址
				address_list : [],
				goods_data : [],
				select_coupon : [],
				concessions_price:0,//优惠的总价格
				total_c_price:0,//最后的合计
				message_str : '',
				invoice: [],
				good_id : 0,//商品id
				goods_spec : '',//商品规格
				goods_num : '',//商品数量
				type : '',//类型（分位直接购买和在购物车里面的创建订单）
				order_payment_data : null,//商品合计
				invoice_type : -1,///发票类型
				useable:1,
				un_useable:[],//不可用优惠券
				
				//xxxxxxxxxxxx没有地址下方的变量都是添加地址xxxxxxxxxxxxxxxxxxxxxx
				addressId : null,
				addressData2: {
					consignee: '',
					mobile: '',
					addressName: '',
					address: '请选择地址',
					area: '',
					is_default: 0,
				},
				// 地址选择
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				couponList_length:0,//可用
				un_couponList_length:0,//不可用优惠券长度
			}
		},
		async onLoad(option){
			console.log("请求购买规格",option.type)
			this.type = option.type
			if( this.type == "product"){
				//在商品详情页过来的
				//商品数据
				this.good_id = option.goods_id
				this.goods_spec = option.goods_spec
				this.goods_num = option.goods_num
				
			}
			this.getFun()
		},
		onShow ( ){
			let pages = getCurrentPages();
			let currPage = pages[pages.length-1];
			if (currPage.data.isDoRefresh == true){
			currPage.data.isDoRefresh = false;
			console.log("需要刷新")
			this.getFun()
			}else{
			//不用刷新
			console.log("不需要刷新")
			} 
			// 发票是通过修改main.js里面vue原型的变量 也可以用vuex
			// addressData 是要显示的地址    address_list是所有地址列表     Vue.prototype.$address_id 是在原型上的地址id，记录在地址列表用户选择的地址
			let _this = this
			console.log("发票",Vue.prototype.$invoice)
			console.log("地址id",Vue.prototype.$address_id)
			console.log("所有地址",_this.address_list)
			_this.invoice = Vue.prototype.$invoice
			_this.address_list.forEach( item =>{
				console.log("遍历",item)
				if ( item.id == Vue.prototype.$address_id ){
					console.log("有执行")
					_this.addressData = item
				}
			})
			console.log()
			_this.invoice_type = Vue.prototype.$invoice
			if(_this.invoice_type == 0){
				_this.invoice = uni.getStorageSync('invoice_personage')//个人发票
			}
			if(_this.invoice_type == 1){
				_this.invoice = uni.getStorageSync('invoice_company')//公司发票
			}
			console.log("发票xxxxxxxxxxx",_this.invoice[0])
			console.log("最后的地址",_this.addressData)
		},
		onHide ( ){
			//页面卸载就清空发票
			Vue.prototype.$invoice = -1
		},
		methods: {
			SpreadFun_m:function(m1){
				return m1.toFixed(2)
			},
			SpreadFun:function(m1,m2){
				let money = m1 - m2
				return money.toFixed(2)
			},
			//优惠券切换
			useableFun(id){
				this.useable = id
			},
			// 优惠卷里面的属性money最低满足价格   quota 优惠的金额    
			//discount_type为1是打折，为2是抵扣
			//选择优惠卷
			select_couponFun(type,event){
				let _this = this
				let id =event.target.dataset.id
				let coupon_level = event.target.dataset.type//等级
				let _price = parseFloat(_this.concessions_price)//优惠价格
				let present_price = parseInt((parseFloat(_this.order_payment_data.total_price) - _price).toFixed(2))//当前的价格包括优惠卷
				_this.get_concessions()//获取优惠总价格
				console.log("类型",typeof present_price)
				console.log("当前的价格判断是否符合条件",present_price)
				if(type == 0){
					//选中选择
					console.log("选中",id)
					_this.$forceUpdate();//解决视图不更新
					Object.keys(_this.couponList[0]).forEach(function(key){
						 _this.$set(_this.couponList[0][key],'is_select',0)//只能单选
						 if(_this.couponList[0][key].id == id){
							 //判断是否符合最低价格
							 console.log(parseInt(_this.couponList[0][key].money))
							 console.log(present_price)
							 if(parseInt(_this.couponList[0][key].money) < present_price && (present_price>_this.couponList[0][key].quota)){
								 _this.$set(_this.couponList[0][key],'is_select',1)
								 _this.concessions_price = _this.couponList[0][key].quota
							 }
							 else{
								 _this.$set(_this.couponList[0][key],'is_select',0)
								 _this.$api.msg('不满足最低价钱')
								 return
							 }
						 }
					});
					_this.get_concessions()//获取优惠总价格
				}
				else{
					//取消优惠卷
					console.log("取消")
					_this.$forceUpdate();//解决视图不更新
					Object.keys(_this.couponList[0]).forEach(function(key){
						 if(_this.couponList[0][key].id == id){
							  _this.couponList[0][key].is_select = 0 
						 }
					});
					_this.get_concessions()//获取优惠总价格
				}
			},
			//获取选择优惠卷的优惠价格
			get_concessions(){
				let _this = this
				_this.concessions_price = 0
				Object.keys(_this.couponList[0]).forEach(function(key){
					
					 if(_this.couponList[0][key].is_select == 1  ){
						 //金额抵扣
						 if(_this.couponList[0][key].discount_type == 2){
							 let n = Number(_this.couponList[0][key].quota)
							  _this.concessions_price  = parseFloat(_this.concessions_price) + parseFloat(n)
						 }
						 //打折
						 if(_this.couponList[0][key].discount_type == 1){
							 console.log("打折的金额",_this.total_c_price)
						 	let n = Number(_this.couponList[0][key].quota)
							let discount = _this.order_payment_data.total_price * [1-(n *0.1)]//用总金额去打折
						 	_this.concessions_price  = (parseFloat(_this.concessions_price) + parseFloat(discount)).toFixed(2)
						 }
					 }
				});
				let _price = parseFloat(_this.concessions_price)//优惠价格
				_this.total_c_price = (parseFloat(_this.order_payment_data.payable_price) - _price)
				console.log("优惠的总价格",_this.concessions_price)
			},
			async getFun(){
				let _this = this
				if(this.type == "product"){
					//商品详情页过来的
					// 创建订单
					//如果规格为null就不用goods_spec这个参数
					let buy_api
					if( this.goods_spec == "null" ){
						buy_api = await request.requestGet('buying',{
							goods_id : this.good_id,
							goods_num : this.goods_num
						})
					}
				    else{
						buy_api = await request.requestGet('buying',{
							goods_id : this.good_id,
							goods_spec : this.goods_spec,
							goods_num : this.goods_num
						})
					}
					console.log("api请求xxxxxxxxxxxx",buy_api)
					let data = buy_api.data.data
					// 判断是否是新人优惠,新人优惠只能买一次,根据是否有order_goods_list字段是否买过
					if(data.order_goods_list == undefined || data.order_goods_list  == 0 ){
						this.$api.msg(`${buy_api.data.message}`)
						setTimeout(function() {
							uni.navigateBack({
							})
						}, 1500);
					}
					this.addressData = data.address//默认地址
					this.goods_data = data.order_goods_list//订单商品
					this.order_payment_data = data.order_payment_data //商品合计
					this.address_list = data.address_list//所有地址
					this.couponList = data.couponList//优惠卷列表
					this.total_c_price = parseFloat(this.order_payment_data.payable_price)
				
					Object.keys(_this.couponList[0]).forEach(function(key){
						 _this.couponList[0][key].is_select = 0 //初始化优惠卷的选择
						var date = new Date(_this.couponList[0][key].end_time*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
						var Y = date.getFullYear() + '-';
						var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
						_this.couponList[0][key].end_time = Y+M+D
						if(_this.couponList[0][key].money>_this.order_payment_data.total_price){
							_this.un_useable.push(_this.couponList[0][key])
							delete(_this.couponList[0][key]);
							_this.un_couponList_length++
							return
						}
						_this.couponList_length ++//优惠卷的长度
					    
					});
				}
				else{
					//购物车过来的
					let cart_order = await request.requestGet('confirm_cart')
					let data = cart_order.data.data
					this.addressData = data.address//默认地址
					this.goods_data = data.order_goods_list//订单商品
					this.order_payment_data = data.order_payment_data //商品合计
					this.couponList = data.couponList//优惠卷列表
					this.total_c_price = parseFloat(this.order_payment_data.payable_price)
					Object.keys(_this.couponList[0]).forEach(function(key){
						 console.log(key,_this.couponList[0][key].id);
						 _this.couponList[0][key].is_select = 0 //初始化优惠卷的选择
						 var date = new Date(_this.couponList[0][key].end_time*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
						 var Y = date.getFullYear() + '-';
						 var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						 var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
						 _this.couponList[0][key].end_time = Y+M+D
						if(_this.couponList[0][key].money>_this.order_payment_data.total_price){
							_this.un_useable.push(_this.couponList[0][key])
							delete(_this.couponList[0][key]);
							_this.un_couponList_length++
							return
						}
						_this.couponList_length ++//优惠卷的长度
					});
					console.log("购物车过来的订单请求",cart_order)
				}
				
			},
			//获取字符串出现的总次数
			patch:function(re,s){
				re=eval_r("/"+re+"/ig"); //不区分大小写，如须则去掉i,改为 re=eval_r("/"+re+"/g")
				var len = s.match(re).length;
				return len;
			},
			//显示优惠券面板
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			//取消
			toggleMask_un(type){
				let _this = this
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				_this.maskState = 2;
				Object.keys(_this.couponList[0]).forEach(function(key){
					_this.couponList[0][key].is_select = 0 //初始化优惠卷的选择
				})
				_this.get_concessions()//重新获取价格
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			check_coupon : function ( id ){
				let _this = this
				_this.select_coupon= []
				_this.couponList.forEach( item => {
					//只选一张优惠卷   选多张可以去掉
					item.select = false
					if ( item.id === id ){
						item.select = !item.select
						_this.select_coupon.push(item)
					}
				})
			},
			// 监听留言事件
			messageFun : function ( e ){
				this.message_str = e.detail.value
				console.log(this.message_str)
			},
			//跳转发票
			invoiceFun : function ( e ){
				uni.navigateTo({
					url:'./invoice'
				})
			},
			numberChange(data) {
				this.number = data.number;
			},
			changePayType(type){
				this.payType = type;
			},
			async submit(){
				let _this = this
				// 提交订单
				let address_id_end;
				if( this.addressData == null){
					let data = this.addressData2;
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
					let end_data = {
						consignee : data.consignee,
						mobile : data.mobile,
						province  : this.pickerText.provinceCode * 10000,
						city :  this.pickerText.cityCode * 100,
						district : this.pickerText.areaCode,
						address : data.area,
						is_default : data.is_default
					}
					let address_add = await request.requestPost('add_address',end_data)
					address_id_end = address_add.data.data.address
					console.log("打印地址添加",address_id_end)
				}
				if( this.addressData != null){
					address_id_end = this.addressData.id
				}
				//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				let end_invoice=[{
					name : '',
					num : '',
					tel : ''
				}] ;
				let end_type;
				//优惠卷处理
				let  coupon1 = []
				let  coupon2 = []
				Object.keys(_this.couponList[0]).forEach(function(key){
				    if(_this.couponList[0][key].is_select == 1){
						if(_this.couponList[0][key].coupon_level == 1){
							coupon1.push(_this.couponList[0][key].id)//多选
						}
				        else{
							coupon2.push(_this.couponList[0][key].id)//单选
						}
				    }
				    });
				let coupon = [];
				    coupon[1] = coupon1,
				    coupon[2] = coupon2
				console.log("我选择的发票类型",JSON.stringify(end_invoice))
				let post_data
				console.log("发票类型",Vue.prototype.$invoice)
				if( Vue.prototype.$invoice == 0){ 
				     end_invoice = uni.getStorageSync('invoice_personage')//个人发票
					 end_type = 1
				}
				if(Vue.prototype.$invoice == 1){
					end_invoice = uni.getStorageSync('invoice_company')//公司发票
					end_type = 2
				}
				if( Vue.prototype.$invoice == -1){
					post_data = {
					  "goods_id": this.good_id || 1,
					  "goods_num": this.goods_num || 1,
					  "goods_spec":  this.goods_spec == "null" ? "":this.goods_spec || "",
					  "address_id": address_id_end,
					  "invoice":{},
					  "coupon": coupon,
					  "user_remark":  this.message_str
					}
				}
				else{
					post_data = {
					  "goods_id": this.good_id || 1,
					  "goods_num": this.goods_num || 1,
					   "goods_spec":  this.goods_spec == "null" ? "":this.goods_spec || "",
					  "address_id": address_id_end,
					  "invoice":{
						  "type":end_type,
						  "taxpayer":end_invoice[0].name,
						  "number":end_invoice[0].num,
						  "mobile":end_invoice[0].tel
					  },
					  "coupon": coupon,
					  "user_remark":  this.message_str
					}
				}
				//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  end
				if( this.type =="product"){
					let submit_post = await request.requestPost('buying',post_data)
					let data = submit_post.data.data
					uni.redirectTo({
						url:`/pages/money/pay?serial_id=${data.serial_id}&type=product`
					})
				}
				else{
					let cart_order = await request.requestPost('confirm_cart',post_data)
					let data = cart_order.data.data
					uni.redirectTo({
						url:`/pages/money/pay?serial_id=${data.serial_id}&type=product`
					})
					console.log("购物车的创建的订单",cart_order)
				}
				
			},
			stopPrevent(){},
			//地址选择器
			 openAddres() {
			    this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
			    this.pickerText = e
			}
		}
	}
</script>

<style lang="scss">
	// 下单的优惠卷
	.coupon{ width:100%;height:100vh;position: fixed;z-index:200;left:0px;right:0px;top:0px;bottom:0px;background: rgba(0,0,0,0.4);z-index:2000;
		.coupon_box{ width:100%;height:80vh;background: #fff;border-radius: 10px 10px 0px 0px;position: fixed;left:0px;right:0px;bottom:0px;z-index:2000;padding-bottom:40px;overflow-x: auto;
			.coupon_header{ width:100%;height: 100rpx;padding-left:30rpx;padding-right:30rpx;display: flex;align-items: center;justify-content: space-between;color: #333;font-size:30rpx;font-weight: bold;position: absolute;left:0px;top:0px;right:0px;
				image{ width:26rpx;height: 26rpx;}
			}
			.coupon_type{ width:100%;height: 80rpx;border-bottom:1px solid #e8e8e8;display: flex;align-items: center;justify-content: space-between;font-size:24rpx;margin-top:100rpx;
				.type_available{ flex:1;text-align: center;}
				.type_no_ava{ flex:1;text-align: center;}
				.c_active{ 
					color: #e93b3d;font-weight: bold;position: relative;
				}
				.c_active::after{content:'';width:40px;height: 4rpx;position: absolute;background: red;bottom:-12rpx;left:130rpx}
			}
			.list_box_c{ width:100%;height: 55vh;overflow: auto;}
			.coupon_list{ width:700rpx;height: 100px;margin:30rpx auto;background: url(../../static/coupon_bg.png) no-repeat;background-size:cover;display: flex;justify-content: flex-start;position: relative;
				.coupon_list_l{ color: #fff;display: flex;flex-direction: column;justify-content: center;align-items: center;width:200rpx;height:200rpx;
					.list_l_price{ font-size:76rpx;
						.price_type{ font-size:26rpx}
					}
					.list_l_if{ font-size:24rpx;border-radius: 20rpx;background: #DD2C15;padding: 4rpx 8rpx}
				}
				.coupon_m{ margin-left:30rpx;
					.coupon_name{ font-size:28rpx;display: flex;
						.coupon_name_l{ background: #5aa5d7;color: #ffffff;padding:4rpx 14rpx;border-radius: 20rpx;margin-right:20rpx;font-size:28rpx;}
					}
					.coupon_time{ color:#666666;font-size:24rpx;margin-top:40rpx}
				}
				.coupon_r{ display:flex;flex-direction: column;align-items: center;justify-content: center;position: absolute;right:40rpx;height: 200rpx;}
			}
		}
		.coupon_btn{ width:90%;height: 90rpx;line-height: 90rpx;text-align: center;background: #f34b0c;color: #fff;font-size: 30rpx;position: fixed;bottom:10rpx;border-radius: 40rpx;margin-left:5%}
	}
	
	page {
		background: #f0f0f0;
		padding:20rpx 0rpx 50rpx 0rpx;
	    width:94%;margin: auto;
	}

	.address-section {
		padding: 40upx 0;
		background: #fff;
		border-radius: 10rpx;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}
		.order-content2 {
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name,.mobile {
			font-size: 28upx;
			margin-right: 24upx;
			color: #666;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: #333;
			font-size: 24rpx;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;
		border-radius: 10rpx;
		padding-top:2rpx;
		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 30upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 24upx;
				color: #333;
				line-height: 32rpx;
				overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
			}

			.spec {
				font-size: 24upx;
				color: #999;
				line-height: 24rpx;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 24upx;
				color: #e4393c;

				.price {
					margin-bottom: 4upx;
				}
				.number{
					font-size: 24upx;
					color: #666;
					margin-left: 20upx;
				}
			}
			.pay_type{ margin-left:8rpx}
			.step-box {
				position: relative;
			}
		}
	}
	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}
			&.red{
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
	
	/* 支付列表 */
	.pay-list{
		padding-left: 40upx;
		margin-top: 16upx;
		background: #fff;
		.pay-item{
			display: flex;
			align-items: center;
			padding-right: 20upx;
			line-height: 1;
			height: 110upx;	
			position: relative;
		}
		.icon-weixinzhifu{
			width: 80upx;
			font-size: 40upx;
			color: #6BCC03;
		}
		.icon-alipay{
			width: 80upx;
			font-size: 40upx;
			color: #06B4FD;
		}
		.icon-xuanzhong2{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60upx;
			height: 60upx;
			font-size: 40upx;
			color: $base-color;
		}
		.tit{
			font-size: 32upx;
			color: $font-color-dark;
			flex: 1;
		}
	}
	
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 120upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 100;
		color: $font-color-base;
		.price-content{
			padding-left: 30upx;
		}
		.price-tip{
			color: $base-color;
			margin-left: 8upx;
		}
		.price{
			font-size: 28upx;
			color:#e4393c;
		}
		.submit{
			display:flex;
			align-items:center;
			justify-content: center;
			width: 210rpx;
			height: 76rpx;
			border-radius: 40rpx;
			color: #fff;
			font-size: 28upx;
			background-color: #e4393c;
			margin-right:20rpx;
			line-height: 76rpx;
		}
	}
	
	/* 优惠券面板 */
	.mask{
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 9995;
		transition: .3s;
		
		.mask-content{
			width: 100%;
			min-height: 30vh;
			max-height: 70vh;
			background: #fff;
			transform: translateY(100%);
			transition: .3s;
			overflow-y:scroll;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.mask-content{
				transform: translateY(0);
			}
		}
	}

	/* 优惠券列表 */
	.coupon-item{
		display: flex;
		flex-direction: column;
		margin:0upx 24upx;
		background: #fff;
		
	}
	.address_icon{ width:50rpx;height:50rpx;background:url(../../static/icon-location.png) no-repeat;background-size: 100%;margin-left:30rpx;margin-right:20rpx}
	// 发票留言
	.message_box{ width:100%;height: auto;background: #fff;border-radius: 10rpx;margin-top:16rpx;font-size: 28rpx;}
	.message_list{ border-bottom:1px solid #d9d9d9;padding:20rpx 0rpx;display: flex;align-items: center;justify-content: space-between;color: #333;margin-left: 20rpx;margin-right:20rpx;}
	.message_box_b{ border:0 !important;}
	.message_t_l{ flex:1}
	.message_t_r{ width:196rpx;display: flex;justify-content: flex-end;
		
	}
	.message_m_r { color:#666}
	// 商品统计
	.statistics{ width:100%;height: auto;background: #fff;margin-top:16rpx;padding:18rpx;font-size: 24rpx;display: flex;flex-direction: column;justify-content: space-between;border-radius: 10rpx;color: #666;margin-bottom:10rpx}
	.sta_list{ display:flex;align-items: center;justify-content: space-between;margin-bottom:20rpx}
	.statistics .sta_list:last-child{ color:#B8860B;margin-bottom:0}
	// 重构优惠卷列表
	.coupon_list{ width:100%;height: auto;border-bottom:1px solid #d9d9d9;padding:14rpx 0rpx;display: flex;align-items: center;justify-content: space-between;}
	.coupon_list_l{ font-size:28rpx;color: #333;}
	.coupon_list_r{ font-size:24rpx}
	.mask_header{ width:100%;height:auto;background: #fbf9fe;padding:20rpx 20rpx;font-size: 28rpx;display: flex;justify-content: space-between;align-items: center;}
	.mask_h_r{ color:#586c94}
	.total_num{ font-size:30rpx;color: #606266;margin-right:12rpx;display: inline-block;}
	.total_n2{ font-size:28rpx;color: #930000;margin-right:12rpx;font-weight: bold;}
	//没有地址就显示添加地址框
	.row{
		width:100%;
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30rpx;
		height: 80rpx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 150rpx;
			font-size: 28rpx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 28rpx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 32rpx;
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
		.over_body{ overflow: hidden;height: 10vh;}
</style>
