app.config(function($stateProvider){
	$stateProvider.state('singleProduct', {
		url: '/product/:productId',
		templateUrl: '/js/product/singleProduct.html',
		controller: 'singleProductCtrl',
		resolve: {
			product: function(ProductFactory, $stateParams){
				return ProductFactory.getSingleProduct($stateParams.productId);
			}
		}
	});
});

app.controller('singleProductCtrl', function($scope, product){

		$scope.product = product;

})