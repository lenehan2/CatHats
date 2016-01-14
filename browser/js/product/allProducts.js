app.config(function($stateProvider){
	$stateProvider.state('allProducts', {
		url: '/allProducts',
		templateUrl: '/js/product/allProducts.html',
		controller: 'allProductsCtrl',
		resolve: {
			products: function(ProductFactory){
				return ProductFactory.getProducts()
			}
		}
	});
});

app.controller('allProductsCtrl', function($scope, products){

		$scope.products = products;

})