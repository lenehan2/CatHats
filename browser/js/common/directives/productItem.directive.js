app.directive('productItem', function () {
    return {
        restrict: 'E',
        scope: {
            product: '=',
            full: '='
        },
        templateUrl: 'js/product/product-item.html'
    }
})
