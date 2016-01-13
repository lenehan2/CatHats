app.factory('ProductFactory',function($http){

	return {
		getProducts: function(){
			return $http({
				method: 'GET',
				url: '/api/products'
			}).then(response => {
				console.log("in ProductFactory ", response)
				return response.data;
			})
		}
	}
})
