app.config(function ($stateProvider) {
    $stateProvider.state('admin.addProduct', {
        url: '/add-product',
        templateUrl: 'js/admin/add-product/add-product.html',
        controller: 'AdminAddProductCtrl'
    });
});

app.controller('AdminAddProductCtrl', function ($scope, $state, ProductFactory) {
    $scope.newProduct = {};

    $scope.save = function (newProduct) {
        ProductFactory.addProduct(newProduct)
        .then(addedProduct => $state.go('admin.singleProduct', { id: addedProduct._id }));
    }
});
