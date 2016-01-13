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
				url: '/api/orders/cart/addToCart',
				data: {productId: productId}
			}).then(response => response.data)
		}
	}
})