app.factory('RecommendationFactory', function($http) {
	
	return {

		getRecommendations: function(productId){

            $http.defaults.useXDomain = true;

            return $http({
                method: 'GET',
                url: 'http://localhost:8080/api/recommendations/' + productId
            })
            .then(function(response){
                var recommendationIds = response.data;
                console.log("recommendationIds", recommendationIds);
            	return recommendationIds;
            })
            .then(null, err => console.error(err));
		}

	}

})