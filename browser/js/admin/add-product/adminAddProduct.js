app.config(function ($stateProvider) {
    $stateProvider.state('admin.addProduct', {
        url: '/add-product',
        templateUrl: 'js/admin/add-product/add-product.html',
        controller: 'AdminAddProductCtrl',
        resolve: {
            categories: function (CategoryFactory) {
                return CategoryFactory.fetchAll();
            }
        }
    });
});

app.controller('AdminAddProductCtrl', function ($scope, $state, ProductFactory, categories) {
    $scope.newProduct = {};
    $scope.categories = categories;

    $scope.save = function (newProduct) {
        ProductFactory.addProduct(newProduct)
        .then(addedProduct => $state.go('admin.singleProduct', { id: addedProduct._id }));
    }
});
