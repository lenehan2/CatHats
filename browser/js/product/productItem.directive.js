app.directive('productItem', function (CartFactory, ProductFactory, AuthService, $state) {
    return {
        restrict: 'E',
        scope: {
            product: '=',
            full: '='
        },
        templateUrl: 'js/product/product-item.html',
        link: function (scope) {
            scope.addToCart = CartFactory.addProduct;

            scope.isAdmin = false;
            scope.editMode = false;

            //TODO move this to the singleProduct controller
            AuthService.getLoggedInUser()
                .then(user => scope.isAdmin = user ? user.isAdmin : false);

            scope.toggleEditMode = function () {
                if (!scope.isAdmin) return;
                scope.editMode = scope.editMode ? false : true;
            }

            scope.save = function (newData) {
                ProductFactory.updateProduct(scope.product._id, newData)
                    .then(function () {
                        scope.toggleEditMode();
                        $state.go('singleProduct', { productId: scope.product._id })
                    });

            }
        }
    }
});
