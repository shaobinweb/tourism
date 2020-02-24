/**
 * Created by iconblog on 2017/9/12.
 */
var bizPay = function()
{
    /**
     * 店铺价格组
     * @type {{}}
     */
    var priceGroup = {};

    /**
     * 优惠券组
     * @type {{}}
     */
    var couponList = {};

    /**
     * 已经选中的优惠券
     * @type {{}}
     */
    var usedCoupon = {};

    /**
     * 当前操作的店铺id
     * @type {string}
     */
    var this_shop_id = '';

    /**
     * 当前操作的优惠券id
     * @type {string}
     */
    var this_coupon_id = '';

    /**
     * 当前优惠券信息
     * @type {{}}
     */
    var this_coupon = {};

    /**
     * 当前店铺优惠券价格
     */
    var shop_discount_price = {};

    /**
     * 总的优惠券价格
     * @type {number}
     */
    var total_discount_price = 0;

    /**
     * 当前总金额
     * @type {number}
     */
    var total_price = 0;

    /**
     * 邮费
     * @type {number}
     */
    var postage = 0;


    /**
     * 优惠券优惠金额
     * @type {number}
     */
    var total_coupon_price = 0;


    /**
     * 优惠库
     * @type {{}}
     */
    var postageGroup = {};


    /**
     * 设置价格组
     * @param new_priceGroup
     * @constructor
     */
    this.SetPrice = function (new_priceGroup,new_total_discount_price,new_total_price,postage_price) {
        total_discount_price = new_total_discount_price;
        total_price = new_total_price;
        for ( let i in new_priceGroup){
            console.log(new_priceGroup[i]);
            var shop_id = 0;//new_priceGroup[i]['shop_id']
            priceGroup[shop_id] = new_priceGroup[i]['payable_price']-new_priceGroup[i]['postage'];
            postageGroup[shop_id] = new_priceGroup[i]['postage'];
            shop_discount_price[shop_id] = 0;
        }
        if( postage_price > 0 ){
            postage = parseFloat(postage_price);
        }
    };


    /**
     * 设置优惠券
     * @param new_couponList
     * @constructor
     */
    this.SetCouponList = function (new_couponList) {
        couponList = new_couponList;
    };


    /**
     * 获取价格
     * @param coupon_id
     * @param shop_id
     * @constructor
     */
    this.GetPrice = function (coupon_id,shop_id) {
        // 获取优惠券信息
        shop_id = 0;
        this_coupon = couponList[shop_id][coupon_id];
        // 查看已使用的券中有没有这张券
        if( !usedCoupon.hasOwnProperty(shop_id) ){
            usedCoupon[shop_id] = {};
            usedCoupon[shop_id][1] = {};// 类型1 (该组内的券只能单选)
            usedCoupon[shop_id][2] = {};// 类型2 (该组内的券可以多选)
        }

        this_shop_id = shop_id;
        this_coupon_id = coupon_id;
        // 跳转操作
        this.HandleTypeOne();
    };

    /**
     * 设置价格到前台模板
     * @constructor
     */
    this.HandleTypeOne = function () {
        // 取出店铺价格
        var coupon_temp_id = '#coupon'+this_shop_id+'_'+this_coupon_id;
        var shop_price = priceGroup[this_shop_id];
        // 取出减免后的价格
        var coupon_price = 0;
        if( this_coupon['discount_type'] == 1 ){
            // 打折
            coupon_price = shop_price*(this_coupon['quota']/100);
            if( this_coupon['max_quota'] > 0 && coupon_price > this_coupon['max_quota'] ){
                coupon_price = this_coupon['max_quota'];
            }
        }else if ( this_coupon['discount_type'] == 2 ){
            // 减少金额
            coupon_price = this_coupon['quota'];
        }
        this_coupon['coupon_price'] = coupon_price;

        if( $(coupon_temp_id).is(':checked') ) {
            if( !usedCoupon.hasOwnProperty(this_shop_id) ) {
                usedCoupon[this_shop_id] = {};
            }

            if( usedCoupon[this_shop_id][this_coupon['type']].hasOwnProperty('id') && this_coupon['type'] == 1 ) {
                // 恢复上一次选中的可选
                var old_coupon = usedCoupon[this_shop_id][this_coupon['type']];
                var old_coupon_class = '.coupon' + old_coupon['id'] + '_top';

                $(old_coupon_class).show();

                // $(coupon_class).click();
                shop_discount_price[this_shop_id] = parseFloat(shop_discount_price[this_shop_id]) - parseFloat(old_coupon['coupon_price']);
                // 总的优惠
                total_discount_price = parseFloat(total_discount_price) - parseFloat(old_coupon['coupon_price']);
                // 总的金额
                total_price = parseFloat(total_price) + parseFloat(old_coupon['coupon_price']);
            }
            var new_coupon_class = '.coupon'+ this_coupon['id'] + '_top';
            var now_coupon_class = '#coupon'+ this_shop_id +'_'+this_coupon['id'];
            $(new_coupon_class).hide();
            $(now_coupon_class).parent().show();

            if( this_coupon['type'] == 1 ){
                usedCoupon[this_shop_id][this_coupon['type']] = this_coupon;
            }else{
                usedCoupon[this_shop_id][this_coupon['type']][this_coupon_id] = this_coupon;
            }
            if( !shop_discount_price.hasOwnProperty(this_shop_id) ){
                shop_discount_price[this_shop_id] = 0;
            }
            // 去除不使用优惠券checked
            var no_use = '#no_use'+this_shop_id;
            $(no_use).attr('checked',false);

            shop_discount_price[this_shop_id] = parseFloat(shop_discount_price[this_shop_id])+parseFloat(this_coupon['coupon_price']);

            var new_shop_price = parseFloat(shop_price)-parseFloat(shop_discount_price[this_shop_id]);
            // 总的优惠
            total_discount_price = parseFloat(total_discount_price)+parseFloat(coupon_price);
            // 总的金额
            total_price = parseFloat(total_price)-parseFloat(coupon_price);

        }else{
            // 取消选择---去除优惠价格,增加订单金额,增加总金额;
            var old_coupon = usedCoupon[this_shop_id][this_coupon['type']];
            var coupon_class = '.coupon'+this_coupon['id']+'_top';
            $(coupon_class).css('display','block');

            if( this_coupon['type'] == 1 ){
                if ( old_coupon['id'] == this_coupon_id ) {
                    usedCoupon[this_shop_id][this_coupon['type']] = false;
                }
            }else{
                usedCoupon[this_shop_id][this_coupon['type']][this_coupon_id] = false;
            }

            if( this_coupon['type'] == 1 ){
                shop_discount_price[this_shop_id] = parseFloat(shop_discount_price[this_shop_id]) - parseFloat(old_coupon['coupon_price']);
                var new_shop_price = parseFloat(shop_price) - parseFloat(old_coupon['coupon_price']);
                // 总的优惠
                total_discount_price = parseFloat(total_discount_price)-parseFloat(old_coupon['coupon_price']);
                // 总的金额
                total_price = parseFloat(total_price)+parseFloat(old_coupon['coupon_price']);
            }else{
                shop_discount_price[this_shop_id] = parseFloat(shop_discount_price[this_shop_id]) - parseFloat(this_coupon['coupon_price']);
                var new_shop_price = parseFloat(shop_price) - parseFloat(shop_discount_price[this_shop_id]);
                // 总的优惠
                total_discount_price = parseFloat(total_discount_price)-parseFloat(this_coupon['coupon_price']);
                // 总的金额
                total_price = parseFloat(total_price)+parseFloat(this_coupon['coupon_price']);
            }

        }

        this.showSelectCoupon();
        var show_total_price = parseFloat(total_price)+parseFloat(postage);

        new_shop_price = parseFloat(new_shop_price+postageGroup[this_shop_id]);
        if( show_total_price < 0 ){
            show_total_price = 0;
        }
        // 赋值到页面
        var shop_total_price_class = '.shop_'+this_shop_id+'_total_price span';
        $(shop_total_price_class).html('¥'+this.fmoney(new_shop_price));
        $('.total_discount_price').html('¥'+this.fmoney(total_discount_price));
        $('.total_price').html('¥'+this.fmoney(show_total_price));
        return total_discount_price;
    };


    /**
     * 不使用优惠券
     * @constructor
     */
    this.nowUseCoupon = function (shop_id) {
        shop_id = 0;
        var shop_price = priceGroup[shop_id];
        // 去除所有优惠券的选择
        if( usedCoupon.hasOwnProperty(shop_id) ) {
            // 去除单选
            if( usedCoupon[shop_id].hasOwnProperty(1) ) {
                var typeOneInfo = usedCoupon[shop_id][1];
                if( typeOneInfo.hasOwnProperty('coupon_price') ) {
                    var coupon_class = '.coupon'+typeOneInfo['id']+'_top';
                    $(coupon_class).show();
                    usedCoupon[shop_id][typeOneInfo['type']] = false;
                    // 减少金额
                    shop_discount_price[shop_id] = parseFloat(shop_discount_price[shop_id]) - parseFloat(typeOneInfo['coupon_price']);
                    var new_shop_price = parseFloat(shop_price) - parseFloat(shop_discount_price[shop_id]);
                    // 总的优惠
                    total_discount_price = parseFloat(total_discount_price) - parseFloat(typeOneInfo['coupon_price']);
                    // 总的金额
                    total_price = parseFloat(total_price) + parseFloat(typeOneInfo['coupon_price']);
                }

            }

            if( usedCoupon[shop_id].hasOwnProperty(2) ) {
                var typeTwoList = usedCoupon[shop_id][2];
                for ( i in typeTwoList ) {
                    var typeOneInfo = typeTwoList[i];
                    if( typeOneInfo != false ){
                        var coupon_class = '.coupon'+typeOneInfo['id']+'_top';
                        $(coupon_class).show();
                        var coupon_id = '#coupon'+shop_id+'_'+typeOneInfo['id'];
                        $(coupon_id).attr('checked',false);
                        usedCoupon[shop_id][typeOneInfo['type']][i] = false;
                        // 减少金额
                        shop_discount_price[shop_id] = parseFloat(shop_discount_price[shop_id]) - parseFloat(typeOneInfo['coupon_price']);

                        var new_shop_price = parseFloat(shop_price) - parseFloat(shop_discount_price[shop_id]);
                        // 总的优惠
                        total_discount_price = parseFloat(total_discount_price) - parseFloat(typeOneInfo['coupon_price']);
                        // 总的金额
                        total_price = parseFloat(total_price) + parseFloat(typeOneInfo['coupon_price']);
                    }
                }
            }
            this.showSelectCoupon();

            var show_total_price = parseFloat(total_price)+parseFloat(postage);

            new_shop_price = parseFloat(new_shop_price+postageGroup[this_shop_id]);

            var shop_total_price_class = '.shop_'+shop_id+'_total_price span';
            $(shop_total_price_class).html('¥'+this.fmoney(new_shop_price));
            $('.total_discount_price').html('¥'+this.fmoney(total_discount_price));
            $('.total_price').html('¥'+this.fmoney(show_total_price));
        }
    };


    /**
     * 放入到已选择的优惠券中
     * @return mixed
     */
    this.showSelectCoupon = function () {
        var shop_id = this_shop_id;
        var html = ' ';
        console.log(usedCoupon[0][1]);
        if(Object.getOwnPropertyNames(usedCoupon[0][1]).length === 0 ){
            if(Object.getOwnPropertyNames(usedCoupon[0][2]).length > 0){
                $("#no_use").removeAttr("checked");
            }
        }
        if( usedCoupon.hasOwnProperty(shop_id) ) {
            // 去除单选
            var coupon_html = '';
            coupon_html += '<span>¥' + this.fmoney(shop_discount_price[shop_id]) + '元</span>';

            if( coupon_html.length > 0 ){
                html += '<span style="color: #999999">已优惠金额:</span>&nbsp;&nbsp;'+coupon_html;
            }

        }
        var couponShop = '.couponShop'+this_shop_id+'>.odrcpn-item>p';
        $(couponShop).html(html);
    };

    this.fmoney = function(s)
    {
        s = s.toString();
        if (/[^0-9\.]/.test(s)) return "invalid value";
        s = s.replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
            s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        return s.replace(/^\./, "0.")
    }

};
export default bizPay;