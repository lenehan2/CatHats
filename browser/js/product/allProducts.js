app.config(function($stateProvider){
	$stateProvider.state('products', {
		url: '/products/?title?categories',
		templateUrl: 'js/product/product-list.html',
		resolve: {
			products: function (ProductFactory, $stateParams) {
				return ProductFactory.getProducts($stateParams);
			}
		},
		controller: 'ProductsCtrl'
	})
});

app.controller('ProductsCtrl', function($scope, products){
		$scope.products = products;
		$scope.categories = products.reduce((acc, curr) => {
			return acc.concat(
				curr.categories.filter(cat => acc.indexOf(cat) === -1)
			)
		}, [])

})
