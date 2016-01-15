app.config(function ($stateProvider) {
    $stateProvider.state('userOrders', {
        url: '/users/:id/orders',
        templateUrl: 'js/orders/all-orders.html',
        controller: 'OrdersCtrl',
        resolve: {
            orders: function (OrderFactory, $stateParams) {
                console.log($stateParams.id)
                return OrderFactory.getOrdersByUser($stateParams.id);
            }
        }
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('order', {
        url: '/orders/:id',
        templateUrl: 'js/orders/order.html',
        controller: 'OrderCtrl',
        resolve: {
            order: function (OrderFactory, $stateParams) {
                return OrderFactory.getOrderById($stateParams.id);
            }
        }
    })
})

app.controller('OrdersCtrl', function ($scope, orders) {
    $scope.orders = orders;
});

app.controller('OrderCtrl', function ($scope, order) {
    $scope.order = order;
});

app.directive('orderItem', function () {
    return {
        restrict: 'E',
        scope: {
            order: '=',
            full: '='
        },
        templateUrl: 'js/orders/order-item.html'
    }
})
