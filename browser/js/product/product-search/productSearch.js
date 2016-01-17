app.directive('productSearch', function ($state) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/product/product-search/product-search.html',
        link: function (scope, element) {
            scope.searchProducts = function (title) {
                $state.go('products', { title: title, categories: null })
            };
        }
    }
})
