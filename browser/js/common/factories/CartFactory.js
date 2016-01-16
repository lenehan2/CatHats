app.factory('CartFactory', function($http,AuthService) {


    var cartFactoryObj = {
        getCart: function() {
            return $http({
                method: 'GET',
                url: '/api/cart'
            }).then(response => response.data)
        },
        addProduct: function(productId) {
            return $http({
                    method: 'POST',
                    url: '/api/cart',
                    data: {
                        product: productId,
                        quantity: 1
                    }
                })
                .then(response => {
                    console.log('server response: ', response.data);
                    return response.data
                })
        },
        updateCart: function(cart){
            var cartToSend = cart.map(function (item) {
                return {
                    product: item.product._id ? item.product._id : item.product,
                    quantity: item.quantity
                }
            })
        	return $http({
        		method: 'PUT',
        		url: '/api/cart',
        		data: cartToSend
        	}).then(response => response.data)
        },
        removeItem: function(productId,cart){
        	var newCart = cart.filter(function(item){
        		// console.log("productId: ",productId)
        		// console.log("cart: ",cart)

        		return item.product._id.toString() !== productId.toString();
        	});
        	console.log(newCart)
        	return cartFactoryObj.updateCart(newCart)
        },
        checkout: function(order){
            //Nested promises? This doesn't feel right
            //but I need to get the user first, then make
            //a put request using that object
           return cartFactoryObj.createValidOrderObject(order)
            .then(validOrderObj =>{
                return $http({
                    method: 'POST',
                    url: '/api/cart/checkout',
                    data: validOrderObj
                })
            })
            .then(response => response.data) 
        },
        createValidOrderObject: function(cartObj){
            var validObj = {
                products: []
            }
            //Add products to orderObj in correct form
            cartObj.cart.forEach(function(item){
                var orderItem = {
                    product: item.product._id,
                    price: item.product.price,
                    quantity: item.quantity
                }
                validObj.products.push(orderItem);
            })

            //Add Payment Information
            validObj.payment = cartObj.billing;
            
            //Add Shipping Information
            validObj.shipping = cartObj.shipping;

            
            //Add Billing Address
            if(cartObj.sameAddress){
                validObj.payment.billingAddress = cartObj.shipping;
            }else{
                validObj.payment.billingAddress = cartObj.billingAddress;
            }

            //Add User Id
            return AuthService.getLoggedInUser()
            .then(user => {
                if(user){
                    validObj.user = user._id;
                }
                return validObj;
            })
        }
    }

    return cartFactoryObj;
})
