let urlMap = {
	Login : 'api.php/member/oauth/login',//登陆
	index: 'api.php/tourism/index/indexApi',//首页数据
	indexCateChange: 'api.php/tourism/index/cateChange',//首页第一项分类更改
	indexRouteCateChange: 'api.php/tourism/index/routeCate',//首页第二项分类更改
	
	index_goodlist : 'api.php/goodslist',//商城首页推荐商品
	index_recommend : 'api.php/shop/index/goods_list',//首页推荐商品
	classify : 'api.php/shop/index/classify',//分类首页 
	spcList: 'api.php/shop/goods/goods_spec1/goods_id/',//商品规格
	
	goodslist: 'api.php/tourism/tourismroutes/listsApi',//商品列表以及商品搜索 
	goodInfo: 'api.php/tourism/tourismroutes/detail/id/',//商品详情
	linePrice: 'api.php/tourism/tourismroutes/getlineprice/tcid/',//线路价格
	
	searchList:'api.php/shop/goods/goodslist',//商品列表----筛选
	myhome : 'api.php/member/index/index',//我的主页
	buying : 'api.php/shop/buying/commodity',//直接购买
	add_address:'api.php/member/address/save',//添加地址或者编辑地址
	addressList : 'api.php/member/address/index',//获取收货地址
	default_address : 'api.php/member/address/set_default',//设为默认地址
	dele_address : 'api.php/member/address/delete',//删除地址
	shop_pay : 'api.php/shop/cart/cart4',//支付页面
	pay_order : 'api.php/shop/Payment/getCode',//请求支付接口
	collect : 'api.php/shop/Collection/getGoodsCollectStatus',//判断商品是否被收藏
	add_collect : 'api.php/shop/Goods/goods_collect',//添加收藏
	cancel_collect : 'api.php/shop/Goods/cancel_goods_collect',//取消收藏
	my_order : 'api.php/shop/order/index',//我的订单
	userInfo : 'api.php/member/user/info',//个人资料
	upload_head:'api.php//member/user/upload_head_pic',//上传头像
	save_user_info : 'api.php/member/user/save_info',//保存用户资料
	collection:'api.php/shop/collection/index',//个人中心的收藏
	collection_del : 'api.php/shop/collection/delete',//移除收藏
	wallet:'api.php/member/user/account',//我的钱包-资金流水
	get_cart_num : 'api.php/shop/Cart/getCartNum',//获取购物车数量
	add_cart : 'api.php/shop/Cart/ajaxAddCart',//添加购物车
	del_cart : 'api.php/shop/Cart/ajaxDelCart',//删除购物车
	cart_list :'api.php/shop/cart/cart',//获取购物车列表
	cart_add_num:'api.php/shop/cart/add_num',//增加购物车商品数量
	reduce_num:'api.php/shop/cart/reduce_num',//减少购物车
	logout:'api.php/member/login/logout',//退出登陆
	choice_cart : 'api.php/shop/cart/choice_cart_api',//选择购物车商品
	confirm_cart:'api.php/shop/buying/cart',//购物车订单确定页面
	order_detail:'api.php/shop/order/detail',//订单详情
	order_cancel : 'api.php/shop/order/cancel',//取消订单
	get_phone_code:'api.php/member/login/sendLoginSmsCode',//获取验证码
	code_login:'api.php/member/login/codeLogin',//验证登陆
	bind_phoone : 'api.php/member/login/save_mobile',//绑定手机号码
	code_verfication : 'api.php/member/login/send_sms_reg_code',//绑定手机号码的获取验证码
	mobileVerfication:'api.php/member/login/mobileVerfication',//验证用户是否绑定手机号码
	//安全设置
	safety_sms:'api.php/member/Safe/send_check_sms_code',//获取安全验证手机验证码
	update_paypass_set:'api.php/member/Safe/update_paypass_set',//验证手机号码
	login_password:'api.php/member/Safe/update_password_set',//修改登陆密码
	pay_password:'api.php/member/Safe/save_paypass',//修改支付密码
	edit_phone : 'api.php/member/Safe/update_mobile_set',//修改手机号
	//钱包
	wallet_list :'api.php/member/recharge/index',//余额充值页面
	group_fl: 'api.php/shop/index/classify',//拼团分类
	group_index:'api.php/shop/Pieces/index',//拼团首页
	group_banner :'api.shop.hn.juntest.combanner',//拼团首页banner
	group_detail:'api.php/shop/pieces/detail/',//拼团详情
	pieces_banner:'api.php/shop/pieces/pieces_banner',//拼团banner
	seckill : 'api.php/ms',//秒杀列表
	coupon_index:'api.php/shop/coupon/index',//优惠卷主页
	coupon_receive:'api.php/shop/coupon/receive',//领取优惠券
	coupon_fl:'api.php/shop/coupon/index',//选择优惠券类型
	user_coupon:'api.php/member/user/coupon',//个人中心的优惠卷信息
	do_recharge:'api.php/member/recharge/do_recharge',//余额充值
	withdrawals_do:'api.php/member/withdrawals/withdrawals_do',//提现
	submit_idea:'api.php/member/feedback/submit',//意见提交
	pieces:'api.php/shop/pieces_buying/pieces',//拼团下单
	pieces_order_list:'api.php/shop/pieces_order/index/',//拼团列表
	pieces_buying:'api.php/shop/pieces_buying/pay',//拼团支付
	message_index:'api.php/member/message/index',//消息
	sign_in_index:'api.php/marketing/sign_in/index',//签到首页
	sign_in_btn:'api.php/marketing/sign_in/ajaxSignIn',//签到按钮
	luck_draw:'api.php/marketing/luck_draw/index',//抽奖首页
	luck_draw_price:'api.php/marketing/luck_draw/draw',//开始抽奖
	luck_draw_mine:'api.php/marketing/luck_draw/mine',//抽奖记录
	order_confirm:'api.php/shop/order/confirm',//确认收货
	recommend:'api.php/recommend',//推广页面
	chaxun:'api.php/shop/order/chaxun',//查看物流
	comment:'api.php/shop/order_comment/comment',//评价首页
	comment_sumbit:'api.php/shop/order_comment/comment',//提交评论
	sub_apply:'api.php/shop/AfterSales/sub_apply',//申请退换货
	vip_product:'api.php/shop/vip/product',//vip商品
	comment_index:'api.php/shop/comment/index',//评论列表
	after_sale:'api.php/shop/after_sales/apply',//售后
	check_setting_pay_pass:'api.php/member/Safe/check_setting_pay_pass',//是否支付密码
	group_user_detail:'/api.php/shop/pieces_order/detail',//拼团支付之后查看拼团详情
	team:'api.php/distribution/team/index',//团队
	after_list:'api.php/shop/after_sales/index',//售后列表
	after_list_desc:'api.php/shop/after_sales/detail',//在售后列表查看售后详情的api
	user_packet:'api.php/member/user/packet',//分享收入
	user_amoun:'api.php/member/wallet/index',//购物金流水
	team_share:'api.php/distribution/team/share',//我的奖励
	exchange:'api.php/member/wallet/exchange',//购物金兑换获取金额最多可换多少购物金  有get是获取用户金额post提交数据
	del_order:'api.php/shop/order/del_order',//删除订单 
	luck_draw_receive:'api.php/marketing/luck_draw/receive',//领取奖品
	paypostage:'api.php/marketing/luck_draw/paypostage'
}

export default urlMap