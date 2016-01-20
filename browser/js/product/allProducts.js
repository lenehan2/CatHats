app.config(function($stateProvider){
	$stateProvider.state('products', {
		url: '/products/?title?categories',
		templateUrl: 'js/product/product-list.html',
		resolve: {
			products: function (ProductFactory, $stateParams) {
				return ProductFactory.getProducts($stateParams);
			},
            categories: function (CategoryFactory) {
                return CategoryFactory.fetchAll();
            }
		},
		controller: 'ProductsCtrl'
	})
});

app.controller('ProductsCtrl', function($scope, products, categories){
		$scope.products = products;
        $scope.categories = categories;
		$scope.inStock = $scope.products.filter(product => product.inventory > 0);
})
