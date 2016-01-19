app.factory('RecommendationFactory', function($http) {
	
	return {

		getRecommendations: function(productId){
			return $http({
                method: 'GET',
                url: '/api/recommendations/' + productId
            })
            .then(function(response){
            	var recommendationIds = response.data;
            	return recommendationIds;
            })
            .then(null, err => console.error(err));
		}

	}

})