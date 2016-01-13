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
                .then(response => response.data)
                .then(console.log.bind(console));
        },
        updateCart: function(cart){
        	return $http({
        		method: 'PUT',
        		url: '/api/cart',
        		data: cart
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
