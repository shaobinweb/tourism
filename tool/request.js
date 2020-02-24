/**
 * 网络请求接口   注意每个请求头，现在requestGet   requestPost   uploading_fun   login  这几个方法的请求头都是分开的
 */
// 所有的api
import urlMap from './all_api.js'
import login from './Login/login.js'
const CryptoJS = require('./tripledes.js');
const SECRET = 'ebiz_app_token';

  // let ebizToken = uni.getStorageSync('ebizToken');
  // let ebizUuid = uni.getStorageSync('ebizUuid');
  let sessionId = uni.getStorageSync('session_id');
  let headerstr = null
console.log("在request获取缓存",)
  const Authorization = 'Bearer ' + transEBC(authSecret, json);
  const date = parseInt(+new Date() / 1000);
  const str = [date, SECRET].join(',');
  const authSecret = CryptoJS.SHA1(str).toString();
  // const params = options.data || {};
  const params =  {};
  const json = JSON.stringify({
     "Date": date,
     "Auth-Secret": authSecret
  });
  function transEBC  (key, value) {
    let key1 = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.DES.encrypt(value, key1, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString();
  }

export default {
	baseUrl: 'http://funpalau2.db.juntest.com/',
	url: '',
	params: {},
	header: {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	"App-Version": 'app/1.0',
	"request-time": date,
	"www-authorization": Authorization,
	"cookie": 'PHPSESSID=' + sessionId,
	// #ifdef  APP-PLUS
	"ebizPlatform": "app",
	// #endif
	// #ifdef  MP
	"ebizPlatform": "mp",
	// #endif
	// #ifdef  APP-PLUS
	"ebizDevice": plus.device.uuid,
	// #endif
	// #ifdef  MP
	"ebizDevice":'1',
	// #endif
  }, 
	
	requestGet: async function (urlKey,params,dataType = 'json'){
		console.log('请求api路径',this.getUrl(urlKey)) 
		console.log('请求接口参数',params) 
		// #ifdef  APP-PLUS
		console.log("手机uuid UUID:  app端 "+plus.device.uuid);
		// #endif
		// #ifdef  MP
		console.log("手机uuid UUID:  微信小程序端 ");
		// #endif
		this.params = params
		try {
		  let [error, res] = await uni.request({
		  	url: this.getUrl(urlKey),
		  	data: this.params,
			// 先条件编译加了请求头在h5用不了
		  	header:  {
			   'Accept': 'application/json',
			   'Content-Type': 'application/json',
			   "App-Version": 'app/1.0',
			   "request-time": date,
			   "www-authorization": '',
			   "cookie": 'PHPSESSID=' ,
			   // #ifdef  APP-PLUS
			   "ebizPlatform": "app",
			   // #endif
			   // #ifdef  MP
			   "ebizPlatform": "mp",
			   // #endif
			   // #ifdef  APP-PLUS
			  "ebizDevice": plus.device.uuid,
			  // #endif
			  // #ifdef  MP
			  "ebizDevice":'1',
			  // #endif
			  "ebizToken": uni.getStorageSync('ebizToken'),
			  "ebizUuid": uni.getStorageSync('ebizUuid')
				},
		  	method: "GET",
		  	timeout: 60000,
		  	dataType: dataType
		  })
		  console.log("请求数据")
		  console.log("get请求的token",uni.getStorageSync('ebizToken'))
		  if( res.data.errorCode === 100298 || res.data.errorCode === 100089 ){
		  	console.log("need login")
		  	// #ifdef APP-PLUS
			uni.setStorageSync('is_login',false)
			uni.navigateTo({
				url:'../phone/step1?type=register'
			})
		  	// #endif
		  }
		  // console.log(res);
		  console.log("请求完成请求头",this.header); 
		  return res;	
		} catch(err) {
			// alert(err.message)
		  console.log("异常查看",err)
		}
	},
	requestPost: async function (urlKey,params,dataType = 'json'){
		console.log('requestPost请求接口参数',params)
		this.params = params
		console.log("发送参数",this.params)
		let [error, res] = await uni.request({
			url: this.getUrl(urlKey),
			data: this.params,
			header:  {
				'Accept': 'application/json',
			   'Content-Type': 'application/json',
			   "App-Version": 'app/1.0',
			   "request-time": date,
			   "www-authorization": '',
			   "cookie": 'PHPSESSID=' ,
			   // #ifdef  APP-PLUS
			   "ebizPlatform": "app",
			   // #endif
			   // #ifdef  MP
			   "ebizPlatform": "mp",
			   // #endif
			   // #ifdef  APP-PLUS
			   "ebizDevice": plus.device.uuid,
			   // #endif
			   // #ifdef  MP
			   "ebizDevice":'1',
			   // #endif
			  "ebizToken": uni.getStorageSync('ebizToken'),
			  "ebizUuid": uni.getStorageSync('ebizUuid')
			},
			method: "POST",
			timeout: 30000,
			dataType: dataType
		})
		console.log("请求数据")
		console.log("post请求的token",uni.getStorageSync('ebizToken'))
		if( res.data.errorCode === 100298 || res.data.errorCode === 100089 ){
			console.log("need login")
			// 跳转登录 app端
			// #ifdef APP-PLUS
			uni.setStorageSync('is_login',false)
			uni.navigateTo({
				url:'../phone/step1?type=register'
			})
			// #endif
		}
		return res;
	},
	// 登陆     还有一个手机验证登陆的在phone/step2中修改了token和用户id
	login :  function (){
		let _self = this; 
		//#ifdef APP-PLUS
		uni.showLoading({
			title:'请等待',
			mask:true
		})
		     plus.oauth.getServices(function(services) {  
		        let auths = services;  
		        let aweixin = auths[0];  
		        if (!aweixin.authResult) {  
		            aweixin.authorize(function(e) {  
		                console.log("code",e.code);//app端获取到的code 
						 console.log("app登陆的请求头",_self.header)
						uni.request({
							url : _self.getUrl('Login'),
							data : {
								code : e.code,
								scene : "wx-app"
							},
							header : _self.header, 
							success : function ( res ){
								console.log("app登陆调试",res)
								uni.hideLoading()
								// 登陆成功修改请求头的信息
								uni.setStorageSync("ebizToken", res.data.data.loginToken);
								uni.setStorageSync('first_app',true)
								uni.setStorageSync('userInfo',res.data.data) 
								uni.setStorageSync('ebizUuid',res.data.data.id) 
								uni.setStorageSync('is_login',true)
								console.log("登陆的token,也是缓存的token",uni.getStorageSync('ebizToken'))
								console.log("登陆成功",res)
								uni.showToast({
									titel:'登录成功'
								})
								setTimeout(function(){uni.navigateBack({})})
								console.log("登陆成功跳转页面",res)
							},
							fail : function ( err ){
								console.log("登陆失败err",err) 
							}
						})
		            }, function(e) {  
							uni.showToast({  
		                        title: '微信授权失败',  
		                        icon: 'none'  
		                    })
							console.log("授权登陆失败",e)
		                }, {  
							appid:'wx97294c2cfcfc9841',
		                    scope: 'snsapi_userinfo',  
		                    state: '123'  
		                });  
		            } else {  
						console.log("已经授权",auths[0])
		                uni.showToast({  
		                    title: '已授权',  
		                    icon: 'none'  
		                })  
		            }  
					//这个是注销微信授权，调试用，
					// aweixin.logout(function(e){
					// 	plus.nativeUI.alert("注销登录认证成功!");
						
					// 	console.log("注销登录认证成功")
					// }, function(e){
					// 	plus.nativeUI.alert("注销登录认证失败: "+JSON.stringify(e));
					// });
		        }, function(e) {  
		            plus.nativeUI.alert("获取登录授权服务列表失败：" + JSON.stringify(e));   
		        });  
		//#endif
		//微信小程序端登陆start
		// #ifdef MP-WEIXIN
		console.log("获取用户encryptedData")
		uni.getUserInfo({
		      provider: 'weixin',
		      success: function (infoRes) {
		        console.log('用户昵称为：' + infoRes.userInfo.nickName);
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log("微信小程序登陆",loginRes);
					let userData = {}
				    userData['encryptedData'] = infoRes.encryptedData
					userData['iv'] = infoRes.iv
					uni.request({
						url : _self.getUrl('Login'),
						data : {
							code : loginRes.code,
							scene : "wx-mini",
							userInfo:userData
						},
						method:'POST',
						header : _self.header, 
						success : function ( res ){
							console.log("微信小程序登录的code",loginRes.code)
							uni.hideLoading()
							// 登陆成功修改请求头的信息
							uni.setStorageSync("ebizToken", res.data.data.loginToken);
							uni.setStorageSync('first_app',true)
							uni.setStorageSync('userInfo',res.data.data) 
							uni.setStorageSync('ebizUuid',res.data.data.id) 
							uni.setStorageSync('is_login',true)
							console.log("登陆的token,也是缓存的token",uni.getStorageSync('ebizToken'))
							console.log("登陆成功",res)
							uni.showToast({
								titel:'登录成功'
							})
							setTimeout(function(){uni.navigateBack({})})
							console.log("登陆成功跳转页面",res)
						},
						fail : function ( err ){
							console.log("登陆失败err",err) 
						}
					})
				  }
				});
		      },
			  fail(err) {
			  	console.log("getUserInfo失败",err)
			  }
		});
		// #endif
		//微信小程序端登陆end
	},
	//判断用户是否登陆
	is_loginFun: function(){
		let is_login = uni.getStorageSync('is_login') 
		return is_login
	},
	// 上传图片方法
	uploading_fun: async function(url) {
		let [error, res] = await uni.uploadFile({
			url: this.getUrl('upload_head'),
		 	filePath: url,
			timeout: 60000,
		 	name: 'img',
			header:  {
				'Accept': 'application/json',
				   'Content-Type': 'application/json',
				   "App-Version": 'app/1.0',
				   "request-time": date,
				   "www-authorization": '',
				   "cookie": 'PHPSESSID=' ,
				   // #ifdef  APP-PLUS
				   "ebizPlatform": "app",
				   // #endif
				   // #ifdef  MP
				   "ebizPlatform": "mp",
				   // #endif
				   // #ifdef  APP-PLUS
				   "ebizDevice": plus.device.uuid,
				   // #endif
				   // #ifdef  MP
				   "ebizDevice":'1',
				   // #endif
				 "ebizToken": uni.getStorageSync('ebizToken'),
				 "ebizUuid": uni.getStorageSync('ebizUuid')
			},
		});
		console.log('请求完成',res)
		console.log('error',error)
		return res;
	},
	// 图片转base64
     urlTobase64 : async function(url) {
		let [err,res] = await uni.request({
			url: url,
			method: 'GET',
			responseType: 'arraybuffer',
			success: res => {
				let base64 =  wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
				base64 = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
				console.log('转base64成功',base64);
				return res;
			}
		});
	},
	getUrl:function(key){
		if( key.substr(0,7) === 'http://' || key.substr(0,8) === 'https://' ){
			return key
		}
		return this.baseUrl+urlMap[key]
	}
}