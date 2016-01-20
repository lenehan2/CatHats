app.factory('RecommendationFactory', function($http, ProductFactory, $q) {

	return {

		getRecommendations: function(productId){
            $http.defaults.useXDomain = true;

            return $http({
                method: 'GET',
                url: '/api/recommendations/' + productId
            })
            .then(function(response){
                return response.data;
            })
            .then(null, err => console.error(err));
		}

	}

})
