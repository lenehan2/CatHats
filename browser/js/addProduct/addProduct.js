app.config(function ($stateProvider) {
	$stateProvider.state('addProduct',{
		url: '/User/addProduct',
		templateUrl: 'js/addProduct/addProduct.html',
		controller: 'addProductCtrl',
		resolve: {
			products: function(ProductFactory){
				return ProductFactory.getProducts()
			}
		}
	});
})

app.controller('addProductCtrl',function($scope,AuthService,products,ProductFactory){
	$scope.addProduct = ProductFactory.addProduct;
	
	$scope.products = products;

})