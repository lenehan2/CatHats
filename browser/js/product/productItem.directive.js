app.directive('productItem', function (CartFactory, ProductFactory, AuthService, $state) {
    return {
        restrict: 'E',
        scope: {
            product: '=',
            full: '=',
            canEdit: '='
        },
        templateUrl: 'js/product/product-item.html',
        link: function (scope) {
            scope.addToCart = CartFactory.addProduct;
            scope.editMode = false;

            scope.toggleEditMode = function () {
                scope.editMode = scope.editMode ? false : true;
            }

            scope.save = function (newData) {
                ProductFactory.updateProduct(scope.product._id, newData)
                    .then(function () {
                        scope.toggleEditMode();
                        $state.go('admin.singleProduct', { productId: scope.product._id })
                    });

            }
        }
    }
});
