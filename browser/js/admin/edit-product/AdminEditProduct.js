app.config(function ($stateProvider) {
    $stateProvider.state('admin.singleProduct', {
        url: '/products/:id',
        templateUrl: 'js/admin/edit-product/edit-product.html',
        controller: 'AdminEditProductCtrl',
        resolve: {
            product: function (ProductFactory, $stateParams) {
                return ProductFactory.getSingleProduct($stateParams.id);
            }
        }
    });
});

app.controller('AdminEditProductCtrl', function ($scope, $state, product, ProductFactory) {
    $scope.product = product;
    $scope.deleting = false;

    $scope.attemptDeletion = function () {
        $scope.deleting = true;
    }

    $scope.deleteProduct = function (productId) {
        ProductFactory.deleteProduct(productId)
            .then(function () {
                $state.go('admin.products');
            });
    }

    $scope.changedFeatured = function (product) {
        var status = product.featured ? false : true;
        ProductFactory.updateProduct(product._id, {
            featured: status
        })
        .then(product => $scope.product = product);
    }
});
