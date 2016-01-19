app.directive('productItem', function (CartFactory, ProductFactory, AuthService, $state) {
    return {
        restrict: 'E',
        scope: {
            product: '=',
            averageRating: '=',
            full: '=',
            canEdit: '='
        },
        templateUrl: 'js/product/product-item.html',
        link: function (scope, element) {
            scope.inCart = false;

            scope.addToCart = function (product) {
                CartFactory.addProduct(product);
                scope.inCart = true;
            };

            scope.editMode = false;
            scope.toggleEditMode = function () {
                if (!scope.editMode) scope.editMode = true;
                else $state.reload()
            };

            scope.save = function (newData) {

                console.log(newData);
                ProductFactory.updateProduct(scope.product._id, newData)
                    .then(function () {
                        scope.toggleEditMode();
                        $state.reload();
                    });

            };
        }
    }
});
