app.directive('productCategories', function () {
    return {
        restrict: 'E',
        scope: {
            categories: '='
        },
        templateUrl: 'js/product/product-categories/product-categories.html'
    }
})
