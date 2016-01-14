app.factory('ProductFactory',function($http){

	return {
		getProducts: function(){
			return $http({
				method: 'GET',
				url: '/api/products'
			}).then(response => response.data)
		},

		getSingleProduct: function(productId){
			return $http({
				method: 'GET',
				url: '/api/products/' + productId
			}).then(response => response.data)
		}
	}
})