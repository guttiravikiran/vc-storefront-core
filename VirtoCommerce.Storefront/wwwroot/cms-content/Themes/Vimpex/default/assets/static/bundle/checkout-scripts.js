var storefrontApp = angular.module('storefrontApp');

storefrontApp.service('dialogService', ['$uibModal', function ($uibModal) {
    return {
        showDialog: function (dialogData, controller, templateUrl) {
            var modalInstance = $uibModal.open({
                controller: controller,
                templateUrl: templateUrl,
                resolve: {
                    dialogData: function () {
                        return dialogData;
                    }
                }
            });
        }
    }
}]);

storefrontApp.service('feedbackService', ['$http', function ($http) {
    return {
        postFeedback: function (data) {
            return $http.post('storefrontapi/feedback', { model: data });
        }
    }
}]);

storefrontApp.service('customerService', ['$http', function ($http) {
    return {
        getCurrentCustomer: function () {
            return $http.get('storefrontapi/account?t=' + new Date().getTime());
        }
    }
}]);

storefrontApp.service('marketingService', ['$http', function ($http) {
    return {
        getDynamicContent: function (placeName) {
            return $http.get('storefrontapi/marketing/dynamiccontent/' + placeName + '?t=' + new Date().getTime());
        },
    }
}]);

storefrontApp.service('pricingService', ['$http', function ($http) {
	return {
		getActualProductPrices: function (products) {
		    return $http.post('storefrontapi/pricing/actualprices', { products: products });
		}
	}
}]);

storefrontApp.service('catalogService', ['$http', function ($http) {
    return {
        getProduct: function (productIds) {
            return $http.get('storefrontapi/products?productIds=' + productIds + '&t=' + new Date().getTime());
        },
        search: function (criteria) {
            return $http.post('storefrontapi/catalog/search', { searchCriteria: criteria });
        },
        searchCategories: function (criteria) {
            return $http.post('storefrontapi/categories/search', { searchCriteria: criteria });
        }
    }
}]);

storefrontApp.service('cartService', ['$http', function ($http) {
    return {
        getCart: function () {
            return $http.get('storefrontapi/cart?t=' + new Date().getTime());
        },
        getCartItemsCount: function () {
            return $http.get('storefrontapi/cart/itemscount?t=' + new Date().getTime());
        },
        addLineItem: function (productId, quantity) {
            return $http.post('storefrontapi/cart/items', { id: productId, quantity: quantity });
        },
        changeLineItemQuantity: function (lineItemId, quantity) {
            return $http.put('storefrontapi/cart/items', { lineItemId: lineItemId, quantity: quantity });
        },
        removeLineItem: function (lineItemId) {
            return $http.delete('storefrontapi/cart/items?lineItemId=' + lineItemId);
        },
        changeLineItemPrice: function (lineItemId, newPrice) {
        	return $http.put('storefrontapi/cart/items/price', { lineItemId: lineItemId, newPrice: newPrice});
        },
        clearCart: function () {
            return $http.post('storefrontapi/cart/clear');
        },
        getCountries: function () {
            return $http.get('storefrontapi/countries?t=' + new Date().getTime());
        },
        getCountryRegions: function (countryCode) {
        	return $http.get('storefrontapi/countries/' + countryCode + '/regions?t=' + new Date().getTime());
        },
        addCoupon: function (couponCode) {
            return $http.post('storefrontapi/cart/coupons/' + couponCode);
        },
        removeCoupon: function () {
            return $http.delete('storefrontapi/cart/coupons');
        },
        addOrUpdateShipment: function (shipment) {
            return $http.post('storefrontapi/cart/shipments', shipment);
        },
        addOrUpdatePayment: function (payment) {
            return $http.post('storefrontapi/cart/payments', payment );
        },
        getAvailableShippingMethods: function (shipmentId) {
            return $http.get('storefrontapi/cart/shipments/' + shipmentId + '/shippingmethods?t=' + new Date().getTime());
        },
        getAvailablePaymentMethods: function () {
            return $http.get('storefrontapi/cart/paymentmethods?t=' + new Date().getTime());
        },
        addOrUpdatePaymentPlan: function (plan) {
            return $http.post('storefrontapi/cart/paymentPlan', plan);
        },
        removePaymentPlan: function () {
            return $http.delete('storefrontapi/cart/paymentPlan');
        },
        createOrder: function (bankCardInfo) {
            return $http.post('storefrontapi/cart/createorder', { bankCardInfo: bankCardInfo });
        }
    }
}]);

storefrontApp.service('listService', ['$http', function ($http) {
    return {
        getWishlist: function (listName) {
            return $http.get('storefrontapi/lists/' + listName + '?t=' + new Date().getTime());
        },
        contains: function (productId, listName) {
            return $http.get('storefrontapi/lists/' + listName +'/items/'+ productId + '/contains?t=' + new Date().getTime());
        },
        addLineItem: function (productId, listName) {
            return $http.post('storefrontapi/lists/' + listName + '/items', { productId: productId });
        },
        removeLineItem: function (lineItemId, listName) {
            return $http.delete('storefrontapi/lists/' + listName + '/items/' + lineItemId);
        }
    }
}]);

storefrontApp.service('quoteRequestService', ['$http', function ($http) {
    return {
        getCurrentQuoteRequest: function () {
            return $http.get('storefrontapi/quoterequest/current?t=' + new Date().getTime());
        },
        getQuoteRequest: function (number) {
            return $http.get('storefrontapi/quoterequests/' + number + '?t=' + new Date().getTime());
        },
        getQuoteRequestItemsCount: function (number) {
            return $http.get('storefrontapi/quoterequests/' + number + '/itemscount?t=' + new Date().getTime());
        },
        addProductToQuoteRequest: function (productId, quantity) {
            return $http.post('storefrontapi/quoterequests/current/items', { productId: productId, quantity: quantity });
        },
        removeProductFromQuoteRequest: function (quoteRequestNumber, quoteItemId) {
            return $http.delete('storefrontapi/quoterequests/' + quoteRequestNumber + '/items/' + quoteItemId);
        },
        submitQuoteRequest: function (quoteRequestNumber, quoteRequest) {
            return $http.post('storefrontapi/quoterequests/' + quoteRequestNumber + '/submit', { quoteForm: quoteRequest });
        },
        rejectQuoteRequest: function (quoteRequestNumber) {
            return $http.post('storefrontapi/quoterequests/' + quoteRequestNumber + '/reject');
        },
        updateQuoteRequest: function (quoteRequestNumber, quoteRequest) {
            return $http.put('storefrontapi/quoterequests/' + quoteRequestNumber + '/update', { quoteRequest: quoteRequest });
        },
        getTotals: function (quoteRequestNumber, quoteRequest) {
            return $http.post('storefrontapi/quoterequests/' + quoteRequestNumber + '/totals', { quoteRequest: quoteRequest });
        },
        confirmQuoteRequest: function (quoteRequestNumber, quoteRequest) {
            return $http.post('storefrontapi/quoterequests/' + quoteRequestNumber + '/confirm', { quoteRequest: quoteRequest });
        }
    }
}]);

storefrontApp.service('recommendationService', ['$http', function ($http) {
    return {
        getRecommendedProducts: function (requestData) {
            return $http.post('storefrontapi/recommendations', requestData );
        }
    }
}]);

storefrontApp.service('orderService', ['$http', function ($http) {
    return {
        getOrder: function (orderNumber) {
            return $http.get('storefrontapi/orders/' + orderNumber + '?t=' + new Date().getTime());
        }
    }
}]);
var storefrontApp = angular.module('storefrontApp');

storefrontApp.directive('vcContentPlace', ['marketingService', function (marketingService) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            marketingService.getDynamicContent(attrs.id).then(function (response) {
                element.html(response.data);
            });
        },
        replace: true
    }
}]);

storefrontApp.directive('fallbackSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.on('error', errorHandler);

            scope.$on('$destroy', function() {
                element.off('error', errorHandler);
            });

            function errorHandler(event) {
                if (element.attr('src') !== attrs.fallbackSrc) {
                    element.attr('src', attrs.fallbackSrc);
                }
                else {
                    element.off(event);
                }
            };
        }
    }
});
var storefrontApp = angular.module('storefrontApp');

storefrontApp.filter('imgurl', function () {
    return function (input, type) {
        if (!type)
            return input;

        var extention = '.' + input.split('.').pop();
        var suffix = "_" + type;
        var result = input.replace(extention, suffix+extention);
        return result;
    };
});
var storefrontApp = angular.module('storefrontApp');

storefrontApp.controller('mainController', ['$rootScope', '$scope', '$location', '$window', 'customerService', 'storefrontApp.mainContext',
    function ($rootScope, $scope, $location, $window, customerService, mainContext) {

        //Base store url populated in layout and can be used for construction url inside controller
        $scope.baseUrl = {};

        $scope.$watch(function () {
            $scope.currentPath = $location.$$path.replace('/', '');
        });

        $rootScope.$on('storefrontError', function (event, data) {
            $rootScope.storefrontNotification = data;
            $rootScope.storefrontNotification.detailsVisible = false;
        });

        $rootScope.toggleNotificationDetails = function () {
            $rootScope.storefrontNotification.detailsVisible = !$rootScope.storefrontNotification.detailsVisible;
        }

        $rootScope.closeNotification = function () {
            $rootScope.storefrontNotification = null;
        }

        //For outside app redirect (To reload the page after changing the URL, use the lower-level API)
        $scope.outerRedirect = function (absUrl) {
            $window.location.href = absUrl;
        };

        //change in the current URL or change the current URL in the browser (for app route)
        $scope.innerRedirect = function (path) {
            $location.path(path);
            $scope.currentPath = $location.$$path.replace('/', '');
        };

        $scope.stringifyAddress = function (address) {
            var stringifiedAddress = address.firstName + ' ' + address.lastName + ', ';
            stringifiedAddress += address.organization ? address.organization + ', ' : '';
            stringifiedAddress += address.countryName + ', ';
            stringifiedAddress += address.regionName ? address.regionName + ', ' : '';
            stringifiedAddress += address.city + ' ';
            stringifiedAddress += address.line1 + ', ';
            stringifiedAddress += address.line2 ? address.line2 : '';
            stringifiedAddress += address.postalCode;
            return stringifiedAddress;
        }

        $scope.getObjectSize = function (obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    size++;
                }
            }
            return size;
        }

        mainContext.getCustomer = $scope.getCustomer = function () {
            customerService.getCurrentCustomer().then(function (response) {
                var addressId = 1;
                _.each(response.data.addresses, function (address) {
                    address.id = addressId;
                    addressId++;
                });
                response.data.isContact = response.data.memberType === 'Contact';
                mainContext.customer = $scope.customer = response.data;
            });
        };

        $scope.getCustomer();
    }])

.factory('storefrontApp.mainContext', function () {
    return {};
});
var storefrontApp = angular.module('storefrontApp');

storefrontApp.component('vcCheckoutCoupon', {
	templateUrl: "themes/assets/js/checkout/checkout-coupon.tpl.liquid",
	bindings: {
		coupon: '=',
		onApplyCoupon: '&',
		onRemoveCoupon: '&'
	},
	controller: [function () {
		var ctrl = this;	
	}]
});

var storefrontApp = angular.module('storefrontApp');

storefrontApp.component('vcCheckoutEmail', {
	templateUrl: "themes/assets/js/checkout/checkout-email.tpl.html",
	require: {
		checkoutStep: '^vcCheckoutWizardStep'
	},
	bindings: {
		email: '='
	},
	controller: [function () {
		var ctrl = this;

		this.$onInit = function () {
			ctrl.checkoutStep.addComponent(this);
		};

		this.$onDestroy = function () {
			ctrl.checkoutStep.removeComponent(this);
		};
	
		ctrl.validate = function () {
			ctrl.form.$setSubmitted();
			return !ctrl.form.$invalid;
		}

	}]
});

var storefrontApp = angular.module('storefrontApp');

storefrontApp.component('vcCheckoutShippingMethods', {
	templateUrl: "themes/assets/js/checkout/checkout-shippingMethods.tpl.liquid",
	require: {
		checkoutStep: '^vcCheckoutWizardStep'
	},
	bindings: {
		shipment: '=',
		getAvailShippingMethods: '&',
		onSelectShippingMethod: '&'
	},
	controller: [function () {

		var ctrl = this;
		
		ctrl.availShippingMethods = [];
		ctrl.selectedMethod = {};
		this.$onInit = function () {
			ctrl.checkoutStep.addComponent(this);
			ctrl.loading = true;
			ctrl.getAvailShippingMethods(ctrl.shipment).then(function (availMethods) {
				ctrl.availShippingMethods = availMethods;
				_.each(ctrl.availShippingMethods, function (x) {
					x.id = getMethodId(x);
				});
				ctrl.selectedMethod = _.find(ctrl.availShippingMethods, function (x) { return ctrl.shipment.shipmentMethodCode == x.shipmentMethodCode && ctrl.shipment.shipmentMethodOption == x.optionName });
				ctrl.loading = false;
			});
		};		
		
		this.$onDestroy = function () {
			ctrl.checkoutStep.removeComponent(this);
		};
			
		function getMethodId(method) {
			var retVal = method.shipmentMethodCode;
			if (method.optionName) {
				retVal += ':' + method.optionName;
			}
			return retVal;
		}

		ctrl.selectMethod = function (method) {
			ctrl.selectedMethod = method;
			ctrl.onSelectShippingMethod({ shippingMethod: method });
		};
	
		ctrl.validate = function () {
			ctrl.form.$setSubmitted();
			return !ctrl.form.$invalid;
		}
	}]
});

var storefrontApp = angular.module('storefrontApp');
storefrontApp.component('vcCheckoutWizardStep', {
    templateUrl: "themes/assets/js/checkout/checkout-wizard-step.tpl.html",
    transclude: true,
    require: {
        wizard: '^vcCheckoutWizard'
    },
    bindings: {
        name: '@',
        title: '@',
        stepDisabled: '=?',
        onNextStep: '&?',
        canEnter: '=?',
        final: '<?'
    },
    controller: [function () {
        var ctrl = this;
        ctrl.components = [];
        ctrl.canEnter = true;

        this.$onInit = function () {
            ctrl.wizard.addStep(this);
        };

        ctrl.addComponent = function (component) {
            ctrl.components.push(component);
        };
        ctrl.removeComponent = function (component) {
            ctrl.components = _.without(ctrl.components, component);
        };
        ctrl.validate = function () {
            return _.every(ctrl.components, function (x) { return typeof x.validate !== "function" || x.validate(); });
        }
    }]
});

var storefrontApp = angular.module('storefrontApp');
storefrontApp.component('vcCheckoutWizard', {
	transclude: true,
	templateUrl: 'themes/assets/js/checkout/checkout-wizard.tpl.html',
	bindings: {
		wizard: '=',
		loading: '=',
		onFinish: '&?',
		onInitialized: '&?'
	},
	controller: ['$scope', function ($scope) {
		var ctrl = this;
		ctrl.wizard = ctrl;
		ctrl.steps = [];	
		ctrl.goToStep = function (step) {
			if (angular.isString(step))
			{
				step = _.find(ctrl.steps, function (x) { return x.name == step; });
			}
			if (step && ctrl.currentStep != step && step.canEnter) {
				if (!step.final) {
					step.isActive = true;
					if (ctrl.currentStep) {
						ctrl.currentStep.isActive = false;
					}
					ctrl.currentStep = step;
				}
				else if (ctrl.onFinish)
				{
					ctrl.onFinish();
				}
			}
		};

		ctrl.nextStep = function () {
			if (!ctrl.currentStep.validate || ctrl.currentStep.validate()) {
				if (ctrl.currentStep.nextStep) {
					if (ctrl.currentStep.onNextStep) {
						//evaluate onNextStep function
						var promise = ctrl.currentStep.onNextStep();
						//For promise function need to delay going to next step
						if (promise && angular.isFunction(promise.then)) {
							promise.then(function () {
								ctrl.goToStep(ctrl.currentStep.nextStep);
							});
						}
						else
						{
							ctrl.goToStep(ctrl.currentStep.nextStep);
						}
					}
					else {
						ctrl.goToStep(ctrl.currentStep.nextStep);
					}
				}			
			}
		};

		ctrl.prevStep = function () {
			ctrl.goToStep(ctrl.currentStep.prevStep);
		};

		function rebuildStepsLinkedList(steps) {
			var nextStep = undefined;
			for (var i = steps.length; i-- > 0;) {
				steps[i].prevStep = undefined;
				steps[i].nextStep = undefined;
				if (nextStep && !steps[i].disabled) {
					nextStep.prevStep = steps[i]
				};				
				if (!steps[i].disabled) {
					steps[i].nextStep = nextStep;
					nextStep = steps[i];
				}
			}		
		};
		
		ctrl.addStep = function (step) {
			ctrl.steps.push(step);
			$scope.$watch(function () { return step.disabled; }, function () {
				rebuildStepsLinkedList(ctrl.steps);			
			});
			rebuildStepsLinkedList(ctrl.steps);
			if(!ctrl.currentStep)
			{
				ctrl.goToStep(step);
			}
			if (step.final && ctrl.onInitialized)
			{
				ctrl.onInitialized();
			}
		};

	}]
});

//Call this to register our module to main application
var moduleName = "storefront.checkout";

if (storefrontAppDependencies != undefined) {
    storefrontAppDependencies.push(moduleName);
}
angular.module(moduleName, ['credit-cards', 'angular.filter'])
.controller('checkoutController', ['$rootScope', '$scope', '$window', 'cartService',
    function ($rootScope, $scope, $window, cartService) {
        $scope.checkout = {
            wizard: {},
            paymentMethod: {},
            shipment: {},
            payment: {},
            coupon: {},
            availCountries: [],
            loading: false,
            isValid: false
        };

        $scope.validateCheckout = function (checkout) {
            checkout.isValid = checkout.payment && checkout.payment.paymentGatewayCode;
            if (checkout.isValid && !checkout.billingAddressEqualsShipping) {
                checkout.isValid = angular.isObject(checkout.payment.billingAddress);
            }
            if (checkout.isValid && checkout.cart && checkout.cart.hasPhysicalProducts) {
                checkout.isValid = angular.isObject(checkout.shipment)
                                && checkout.shipment.shipmentMethodCode
                                && angular.isObject(checkout.shipment.deliveryAddress);
            }
        };

        $scope.reloadCart = function () {
            return cartService.getCart().then(function (response) {
                var cart = response.data;
                if (!cart || !cart.id) {
                    $scope.outerRedirect($scope.baseUrl + 'cart');
                }
                else {
                    $scope.checkout.cart = cart;
                    $scope.checkout.coupon = cart.coupon || $scope.checkout.coupon;
                    if ($scope.checkout.coupon.code && !$scope.checkout.coupon.appliedSuccessfully) {
                        $scope.checkout.coupon.errorCode = 'InvalidCouponCode';
                    }
                    if (cart.payments.length) {
                        $scope.checkout.payment = cart.payments[0];
                        $scope.checkout.paymentMethod.code = $scope.checkout.payment.paymentGatewayCode;
                    }
                    if (cart.shipments.length) {
                        $scope.checkout.shipment = cart.shipments[0];
                    }
                    $scope.checkout.billingAddressEqualsShipping = cart.hasPhysicalProducts && !angular.isObject($scope.checkout.payment.billingAddress);

                    $scope.checkout.canCartBeRecurring = $scope.customer.isRegisteredUser && _.all(cart.items, function (x) { return !x.isReccuring });
                    $scope.checkout.paymentPlan = cart.paymentPlan && _.findWhere($scope.checkout.availablePaymentPlans, { intervalCount: cart.paymentPlan.intervalCount, interval: cart.paymentPlan.interval }) ||
                                                                      _.findWhere($scope.checkout.availablePaymentPlans, { intervalCount: 1, interval: 'months' });
                }
                $scope.validateCheckout($scope.checkout);
                return cart;
            });
        };

        $scope.applyCoupon = function (coupon) {
            coupon.processing = true;
            cartService.addCoupon(coupon.code).then(function () {
                coupon.processing = false;
                $scope.reloadCart();
            }, function (response) {
                coupon.processing = false;
            });
        }

        $scope.removeCoupon = function (coupon) {
            coupon.processing = true;
            cartService.removeCoupon().then(function (response) {
                coupon.processing = false;
                $scope.checkout.coupon = {};
                $scope.reloadCart();
            }, function (response) {
                coupon.processing = false;
            });
        }

        $scope.selectPaymentMethod = function (paymentMethod) {
            angular.extend($scope.checkout.payment, paymentMethod);
            $scope.checkout.payment.paymentGatewayCode = paymentMethod.code;
            $scope.checkout.payment.amount = angular.copy($scope.checkout.cart.total);
            $scope.checkout.payment.amount.amount += paymentMethod.totalWithTax.amount;

            updatePayment($scope.checkout.payment);
        };

        function getAvailCountries() {
            //Load avail countries
            return cartService.getCountries().then(function (response) {
                return response.data;
            });
        };

        $scope.getCountryRegions = function (country) {
            return cartService.getCountryRegions(country.code3).then(function (response) {
                return response.data;
            });
        };

        $scope.getAvailShippingMethods = function (shipment) {
            return wrapLoading(function () {
                return cartService.getAvailableShippingMethods(shipment.id).then(function (response) {
                    return response.data;
                });
            });
        }

        $scope.getAvailPaymentMethods = function () {
            return wrapLoading(function () {
                return cartService.getAvailablePaymentMethods().then(function (response) {
                    return response.data;
                });
            });
        };

        $scope.selectShippingMethod = function (shippingMethod) {
            if (shippingMethod) {
                $scope.checkout.shipment.shipmentMethodCode = shippingMethod.shipmentMethodCode;
                $scope.checkout.shipment.shipmentMethodOption = shippingMethod.optionName;
            }
            else {
                $scope.checkout.shipment.shipmentMethodCode = undefined;
                $scope.checkout.shipment.shipmentMethodOption = undefined;
            }
            $scope.updateShipment($scope.checkout.shipment);
        };

        $scope.updateShipment = function (shipment) {
            if (shipment.deliveryAddress) {
                $scope.checkout.shipment.deliveryAddress.type = 'Shipping';
            };
            //Does not pass validation errors to API
            shipment.validationErrors = undefined;
            return wrapLoading(function () {
                return cartService.addOrUpdateShipment(shipment).then($scope.reloadCart);
            });
        };

        $scope.createOrder = function () {
            updatePayment($scope.checkout.payment).then(function () {
                $scope.checkout.loading = true;
                cartService.createOrder($scope.checkout.paymentMethod.card).then(function (response) {
                    var order = response.data.order;
                    var orderProcessingResult = response.data.orderProcessingResult;
                    var paymentMethod = response.data.paymentMethod;
                    handlePostPaymentResult(order, orderProcessingResult, paymentMethod);
                });
            });
        };

        $scope.savePaymentPlan = function () {
            wrapLoading(function () {
                return cartService.addOrUpdatePaymentPlan($scope.checkout.paymentPlan).then(function () {
                    $scope.checkout.cart.paymentPlan = $scope.checkout.paymentPlan;
                });
            });
        };

        $scope.isRecurringChanged = function (isRecurring) {
            if ($scope.checkout.paymentPlan) {
                if (isRecurring) {
                    $scope.savePaymentPlan();
                } else {
                    wrapLoading(function () {
                        return cartService.removePaymentPlan().then(function () {
                            $scope.checkout.cart.paymentPlan = undefined;
                        });
                    });
                }
            }
        };

        function updatePayment(payment) {
            if ($scope.checkout.billingAddressEqualsShipping) {
                payment.billingAddress = undefined;
            }

            if (payment.billingAddress) {
                payment.billingAddress.type = 'Billing';
            }
            return wrapLoading(function () {
                return cartService.addOrUpdatePayment(payment).then($scope.reloadCart);
            });
        }

        function handlePostPaymentResult(order, orderProcessingResult, paymentMethod) {
            if (!orderProcessingResult.isSuccess) {
                $scope.checkout.loading = false;
                $rootScope.$broadcast('storefrontError', {
                    type: 'error',
                    title: ['Error in new order processing: ', orderProcessingResult.error, 'New Payment status: ' + orderProcessingResult.newPaymentStatus].join(' '),
                    message: orderProcessingResult.error,
                });
                return;
            }

            if (paymentMethod.paymentMethodType && paymentMethod.paymentMethodType.toLowerCase() == 'preparedform' && orderProcessingResult.htmlForm) {
                $scope.outerRedirect($scope.baseUrl + 'cart/checkout/paymentform?orderNumber=' + order.number);
            } else if (paymentMethod.paymentMethodType && paymentMethod.paymentMethodType.toLowerCase() == 'redirection' && orderProcessingResult.redirectUrl) {
                $window.location.href = orderProcessingResult.redirectUrl;
            } else {
                if (!$scope.customer.isRegisteredUser) {
                    $scope.outerRedirect($scope.baseUrl + 'cart/thanks/' + order.number);
                } else {
                    $scope.outerRedirect($scope.baseUrl + 'account#/orders/' + order.number);
                }
            }
        }

        function wrapLoading(func) {
            $scope.checkout.loading = true;
            return func().then(function (result) {
                $scope.checkout.loading = false;
                return result;
            },
                function () {
                    $scope.checkout.loading = false;
                });
        }

        $scope.initialize = function () {

            $scope.reloadCart().then(function (cart) {
                $scope.checkout.wizard.goToStep(cart.hasPhysicalProducts ? 'shipping-address' : 'payment-method');
            });
        };

        getAvailCountries().then(function (countries) {
            $scope.checkout.availCountries = countries;
        });

    }]);