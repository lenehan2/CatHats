app.directive('productItem', function () {
    return {
        restrict: 'E',
        scope: {
            product: '='
        },
        templateUrl: 'js/product/product-item.html'
    }
})
