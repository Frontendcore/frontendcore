FrontendCore.define('cart', [], function () {
	return {
        sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
            cartColumns: [
                { view: function(item, column){
                    return	"<span>"+item.get('quantity')+"</span>" +
                        "<div>" +
                        "<a href='javascript:;' class='simpleCart_increment'><i class='icon-caret-up'></i> </a>" +
                        "<a href='javascript:;' class='simpleCart_decrement'><i class='icon-caret-down'></i></a>" +
                        "</div>";
                }, attr: 'custom' },
                { attr: "name" , label: false },
                { view: 'currency', attr: "total" , label: false  }

            ],
            currency: "EUR",
            language: "spanish-es",
            cartStyle: 'div',
            shippingFreeSince: 1000,
            shippingCost: 15,
            taxRate: 0.21,
            checkout: {
                type: "PayPal",
                email: "you@yours.com"
            }
		},

		onStart: function () {

			var self = this,
                aTargets = FrontendTools.getDataModules('cart'),
                oSettings = {},
                oOptions = {},
                aClasses = ['cart-checkout','cart-empty','cart-items','cart-total','cart-quantity','cart-tax','cart-tax-rate','cart-shipping','cart-grand-total','cart-shelf-item','cart-item-name','cart-item-price','cart-item-add','cart-item-quantity'],
                aSimpleClasses = ['simpleCart_checkout','simpleCart_empty','simpleCart_items','simpleCart_total','simpleCart_quantity','simpleCart_tax','simpleCart_taxRate','simpleCart_shipping','simpleCart_grandTotal','simpleCart_shelfItem','item_name','item_price','item_add','item_Quantity'];

			FrontendTools.loadCSS(this.sPathCss);

            for( nKey = 0; nKey < aClasses.length; nKey++ ) {
                self.prepareBind( aClasses[nKey], aSimpleClasses[nKey] );
            }

            $(aTargets).each(function () {

                self.autobind(this);

                if (this.getAttribute("data-fc-email") !== null) {
                    oOptions.checkout = {};
                    oOptions.checkout.type = "PayPal";
                    oOptions.checkout.email = this.getAttribute("data-fc-email");
                }

                if (this.getAttribute("data-fc-currency") !== null) {
                    oOptions.currency = parseFloat(this.getAttribute("data-fc-currency"));
                }

                if (this.getAttribute("data-fc-shipping-free-since") !== null) {
                    oOptions.shippingFreeSince = parseFloat(this.getAttribute("data-fc-shipping-free-since"));
                } else {
                    oOptions.shippingFreeSince = self.oDefault.shippingFreeSince;
                }

                if (this.getAttribute("data-fc-shipping-cost") !== null) {
                    oOptions.shippingCost = parseFloat(this.getAttribute("data-fc-shipping-cost"));
                } else {
                    oOptions.shippingCost = self.oDefault.shippingCost;
                }

                if (this.getAttribute("data-fc-tax-rate") !== null) {
                    oOptions.taxRate = parseFloat(this.getAttribute("data-fc-tax-rate"));
                }

                oOptions.shippingCustom = function(){
                    if( simpleCart.total() > oOptions.shippingFreeSince ){
                        oOptions.taxShipping = false;
                        return 0;
                    } else {
                        return oOptions.shippingCost;
                    }
                };

                FrontendTools.removeLoading(this);

            });

            oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

            simpleCart(oSettings);

            simpleCart.init();

            FrontendTools.trackModule('JS_Libraries', 'call', 'autocomplete');


		},
        prepareBind: function( sTargetClass, sNewClass ) {
            $('.' +  sTargetClass).each( function(){
                $(this).addClass(sNewClass);
            });
        },
        autobind: function(oTarget) {
            var self = this;

            $(oTarget).bind('click',function(e){
                e.preventDefault();
                self.toggleCart(this);
            });
        },
		toggleCart: function (oTarget) {

			var self = this,
				$Target = $(oTarget),
				$Cart = $(document.getElementById(oTarget.href.split('#')[1]));
				$Cart.toggleClass('hidden');
		},
		onStop: function () {
			this.sPathCss = null;
			this.oDefault = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
			delete this.oDefault;
		}
	};
});