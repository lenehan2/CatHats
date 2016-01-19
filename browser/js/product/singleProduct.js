app.config(function($stateProvider){
	$stateProvider.state('singleProduct', {
		url: '/products/:productId',
		templateUrl: '/js/product/singleProduct.html',
		controller: 'singleProductCtrl',
		resolve: {
			product: function(ProductFactory, $stateParams){
				return ProductFactory.getSingleProduct($stateParams.productId);
			},
			user: function(AuthService) {
				return AuthService.getLoggedInUser();
			},
			reviews: function(ReviewFactory, $stateParams){
                return ReviewFactory.getReviewsByProduct($stateParams.productId);
            },
            recommendations: function(RecommendationFactory, $stateParams){
            	return RecommendationFactory.getRecommendations($stateParams.productId);
            }
		}
	});
});


app.controller('singleProductCtrl', function($scope, reviews, product, user, recommendations, $state, ProductFactory){
		$scope.reviews = reviews;
		$scope.product = product;
		$scope.averageRating = ProductFactory.getAvgRating(reviews);
		$scope.user = user;
		$scope.recommendations = recommendations;
});

