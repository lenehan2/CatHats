app.directive('productItem', function (CartFactory) {
    return {
        restrict: 'E',
        scope: {
            product: '=',
            full: '='
        },
        templateUrl: 'js/product/product-item.html',
        link: function (scope) {
            scope.addToCart = CartFactory.addProduct;
        }
    }
})
