class LotteryApi {
	/**
	 * 奖品列表
	 */
	async list() {
		return await new Promise((resolve, reject) => {
			try {
				uni.showLoading({title: '加载中'});
				uni.hideLoading();
				var data={
				  "response": {
					"code": 200,
					"data": {
					  "awardsList": [
						{
						  "diskColor": "#ffffff",
						  "id": 8,
						  "name": "谢谢参与",
						  "winText": "很遗憾，未中奖",
						  "image": "http://img.jxshoo.cn/awards_smile.png"
						},
						{
						  "diskColor": "#FBF0B0",
						  "id": 7,
						  "name": "AppleWatchS5",
						  "winText": "恭喜您获得1部iPhoneXS 64G手机一台，请联系客服人员核实！",
						  "image": "http://img.jxshoo.cn/awards_applewatch.png"
						},
						{
						  "diskColor": "#ffffff",
						  "id": 5,
						  "name": "1元\r\n现金红包",
						  "winText": "恭喜您获得1元现金红包奖励！",
						  "image": "http://img.jxshoo.cn/awards_redpack.png"
						},
						{
						  "diskColor": "#FBF0B0",
						  "id": 6,
						  "name": "iPhone\r\nXS 64G",
						  "winText": "恭喜您获得1部iPhone\r\nXS 64G手机一台，请联系客服人员核实！",
						  "image": "http://img.jxshoo.cn/awards_iponexs.png"
						},
						{
						  "diskColor": "#ffffff",
						  "id": 2,
						  "name": "5积分",
						  "winText": "恭喜您获得5积分奖励！",
						  "image": "http://img.jxshoo.cn/awards_integral.png"
						},
						{
						  "diskColor": "#FBF0B0",
						  "id": 4,
						  "name": "10元\r\n现金红包",
						  "winText": "恭喜您获得10元现金红包奖励！",
						  "image": "http://img.jxshoo.cn/awards_redpack.png"
						}
					  ],
					  "signInStatus": false,
					  "times": "0"
					},
					"message": "请求成功",
					"success": true
				  }
				};
				if(data.response.code=='200'){
					resolve(data.response.data);
				}else{
					resolve(data.response);
				}
			} catch (e) {
				uni.hideLoading();
				reject(e);
			}
		});
	}
	/**
	 * 抽奖
	 */
	async lottery(integralExchange=false) {
		return await new Promise((resolve, reject) => {
			try {
				uni.showLoading({title: '加载中'});
				uni.hideLoading();
				var data={
					  "response": {
						"code": 200,
						"data": {
							times:0,
							awards:{
							  "amount": 0,
							  "diskColor": "#ffffff",
							  "id":13,
							  "name": "谢谢参与",
							  "remark": "谢谢参与",
							  "type": 0,
							  "winText": "很遗憾，未中奖",
							  "image": "http://img.jxshoo.cn/awards_smile.png"
							}
						},
						"message": "请求成功",
						"success": true
					  }
					};
				if(data.response.code=='200'){
					resolve(data.response.data);
				}else{
					resolve(data.response);
				}
			} catch (e) {
				uni.hideLoading();
				reject(e);
			}
		});
	}
	
	/**
	 * 获取我的奖品列表
	 */
	async myPrizeList() {
		return await new Promise((resolve, reject) => {
			try {
				uni.showLoading({title: '加载中'});
				uni.hideLoading();
				var data={
					  "response": {
						"code": 200,
						"data": [
						  {
							"awardsId": 2,
							"awardsName": "5积分",
							"createTime": "2019-10-23 21:23:36"
						  },
						  {
							"awardsId": 2,
							"awardsName": "5积分",
							"createTime": "2019-10-23 09:34:53"
						  }
						],
						"message": "请求成功",
						"success": true
					  }
					};
				if(data.response.code=='200'){
					resolve(data.response.data);
				}else{
					resolve(data.response);
				}
			} catch (e) {
				uni.hideLoading();
				reject(e);
			}
		});
	}
}
export{
	LotteryApi
}