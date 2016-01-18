app.factory('ProductFactory',function($http){

	return {
		getProducts: function(params){
			params = params || {};
			return $http({
				method: 'GET',
				url: '/api/products',
				params: params
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
		},

		updateProduct: function (id, newData) {
			return $http({
				method: 'PUT',
				url: '/api/products/' + id,
				data: newData
			})
			.then(res => res.data)
			.then(null, console.error.bind(console));
		},

        addProduct: function (newProduct) {
            return $http({
                method: 'POST',
                url: '/api/products',
                data: newProduct
            })
            .then(res => res.data)
            .then(null, console.error.bind(console));
        }
	}
})
