app.config(function($stateProvider){
	$stateProvider.state('products', {
		url: '/products',
		abstract: true,
		template: '<ui-view/>',
	});

	$stateProvider.state('products.all', {
		url: '',
		templateUrl: 'js/product/product-list.html',
		resolve: {
			products: function(ProductFactory){
				return ProductFactory.getProducts()
			}
		},
		controller: function ($scope, products) {
			$scope.products = products;
			$scope.$parent.categories = products.reduce((acc, curr) => {
				return acc.concat(
					curr.categories.filter(
						cat => acc.indexOf(cat) === -1
					)
				)
			}, [])
		}
	});

    $stateProvider.state('products.byCategory', {
        url: '/?category',
        templateUrl: 'js/product/product-list.html',
        resolve: {
            products: function (ProductFactory, $stateParams) {
                return ProductFactory.getByCategory($stateParams.category);
            }
        },
        controller: function ($scope, products) {
            $scope.products = products;
        }
    });
});
//
// app.controller('ProductsCtrl', function($scope, products){
// 		$scope.products = products;
// 		$scope.$parent.categories = products.reduce((acc, curr) => {
// 			return acc.concat(
// 				curr.categories.filter(cat => acc.indexOf(cat) === -1)
// 			)
// 		}, [])
//
// })
