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
		},

		getByCategory: function (category) {
			return $http({
				method: 'GET',
				url: '/api/products',
				params: {
					categories: [category]
				}
			})
			.then(response => response.data)
			.then(null, console.error.bind(console))
		}
	}
})
