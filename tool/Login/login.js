import urlMap from '../all_api.js'
const CryptoJS = require('../tripledes.js');
const SECRET = 'ebiz_app_token';

  let ebizToken = "";
  let ebizUuid = "";
  let sessionId = "";
  let headerstr = null

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
  headerstr = {
    'Accept': 'application/json',
       'Content-Type': 'application/json',
       "App-Version": 'app/1.0',
       "request-time": date,
       "www-authorization": Authorization,
       "cookie": 'PHPSESSID=' + sessionId,
       "ebizPlatform": "app",
       "ebizDevice": "1",
       "ebizToken": ebizToken,
       "ebizUuid": ebizUuid
  };
  function transEBC  (key, value) {
    let key1 = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.DES.encrypt(value, key1, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString(); 
  }
export default{
	baseUrl: 'http://baiyue.com/',
	ebizToken: null,
	ebizUuid : null,
	url: '',
	params: {},
	header: {
		'Accept': 'application/json',
		   'Content-Type': 'application/json',
		   "App-Version": 'app/1.0',
		   "request-time": date,
		   "www-authorization": Authorization,
		   "cookie": 'PHPSESSID=' + sessionId,
		   "ebizPlatform": "app",
		   "ebizDevice": "1",
		   "ebizToken": ebizToken,
		   "ebizUuid": ebizUuid
	}, 
	login : function (){
		//#ifdef APP-PLUS
		let _self = this;  
		        plus.oauth.getServices(function(services) {  
		            let auths = services;  
		            let aweixin = auths[0];  
		            if (!aweixin.authResult) {  
		                aweixin.authorize(function(e) {  
		                    console.log("在login文件夹下直接用uni.login安卓手机获取不到code，这个可以plus.oauth.getServices",e.code);//app端获取到的code  
							uni.request({
								url : _self.getUrl('Login'),
								data : {
									code : e.code,
									scene : "wx-app"
								},
								header : _self.header, 
								success : function ( res ){
									// 登陆成功修改请求头的信息
									uni.setStorageSync("ebizToken", res.data.data.loginToken);
									console.log("登陆的token",res.data.data.loginToken)
									console.log("登陆成功",res)
									uni.setStorageSync('first_app',true)
									uni.setStorageSync('userInfo',res.data.data) 
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
	},
	getUrl:function(key){
		if( key.substr(0,7) === 'http://' || key.substr(0,8) === 'https://' ){
			return key
		}
		return this.baseUrl+urlMap[key]
	}
}