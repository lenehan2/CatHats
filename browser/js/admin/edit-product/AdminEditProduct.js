app.config(function ($stateProvider) {
    $stateProvider.state('admin.singleProduct', {
        url: '/products/:id',
        templateUrl: 'js/admin/edit-product/edit-product.html',
        resolve: {
            product: function (ProductFactory, $stateParams) {
                return ProductFactory.getSingleProduct($stateParams.id);
            }
        },
        controller: function ($scope, product) {
            $scope.product = product;
        }
    });
});
