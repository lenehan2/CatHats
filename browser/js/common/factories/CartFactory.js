app.factory('CartFactory', function($http) {


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
        }
    }

    return cartFactoryObj;
})
