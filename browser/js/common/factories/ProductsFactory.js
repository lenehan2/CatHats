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

		getAvgRating: function(reviews){
			var sum = 0;
			if(reviews.length < 1){
				return "No reviews for this product yet"
			}
			for(var i = 0; i < reviews.length; i++){
				if(reviews[i].rating){
					sum+= reviews[i].rating;
				}
			}
			var avg = sum/reviews.length
			return avg.toFixed(1);
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
        },

		deleteProduct: function (productId) {
			return $http({
				method: 'DELETE',
				url: '/api/products/' + productId
			})
			.then(res => res.data)
			.then(null, err => console.error(err));
		}
	}
})
