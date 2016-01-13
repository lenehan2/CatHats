app.factory('CartFactory', function($http) {
    return {
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
        }
    }
})
