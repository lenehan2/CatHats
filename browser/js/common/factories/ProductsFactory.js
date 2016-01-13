app.factory('ProductFactory',function($http){

	return {
		getProducts: function(){
			return $http({
				method: 'GET',
				url: '/api/products'
			}).then(response => response.data)
		},
		addProduct: function(productId){
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
		}
	}
})
