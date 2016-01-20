app.directive('orderSearch', function($state) {
    return {
        restrict: 'E',
        scope: {
            items: '='
        },
        templateUrl: 'js/admin.orders/orderSearch/order-search.html',
        link: function(scope, element) {
            scope.searchOrders = function(param,search) {
                var searchParam;
                if(param==="_id") {
                    searchParam = {_id: search}
                }
                else if (param ==="name") {
                    searchParam = {name: search}
                }
                else if (param ==="status"){
                    searchParam = {status: search}
                }
                $state.go('adminAllOrders', searchParam);
            };
        }
    }
})
