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

app.controller('addProductCtrl',function($scope,AuthService,products,CartFactory){
	$scope.addProduct = CartFactory.addProduct;
	
	$scope.products = products;

})