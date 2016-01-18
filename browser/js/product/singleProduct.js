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
            }
		}
	});
});


app.controller('singleProductCtrl', function($scope, reviews, product, $state){
		$scope.reviews = reviews;
		$scope.product = product;
})

