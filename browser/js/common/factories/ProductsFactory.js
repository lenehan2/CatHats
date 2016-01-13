app.factory('ProductFactory',function($http){

	return {
		getProducts: function(){
			return $http({
				method: 'GET',
				url: '/api/products'
			}).then(response => response.data)
		}
		
	}
})
