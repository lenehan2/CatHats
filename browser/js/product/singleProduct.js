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
			}
		}
	});
});

app.controller('singleProductCtrl', function($scope, product, user){
		$scope.product = product;
});
