app.config(function($stateProvider) {
    $stateProvider.state('adminAllOrders', {
        url: '/admin/orders?_id?name?status',
        templateUrl: '/js/admin.orders/orders.html',
        resolve: {
            orders: function(OrderFactory, $stateParams) {
                return OrderFactory.adminGetAllOrders($stateParams)
            }
        },
        controller: function($scope, orders) {
            $scope.orders = orders;
            $scope.items = [{
                id: 1,
                label: 'ID',
                value: '_id'
            }, {
                id: 2,
                label: 'User name',
                value: 'name'
            }, {
                id: 3,
                label: 'Status',
                value: 'status'
            }];

        }
    })
})

app.config(function($stateProvider) {
    $stateProvider.state('adminOrder', {
        url: '/admin/orders/:id',
        templateUrl: '/js/admin.orders/order.html',
        resolve: {
            order: function(OrderFactory, $stateParams) {
                return OrderFactory.adminGetOrderById($stateParams.id)
            }
        },
        controller: function($scope, order, OrderFactory,$state) {
            $scope.order = order;
            $scope.cancel = function(id){
                OrderFactory.adminDeleteOrder(id)
                .then(function(){
                    $state.reload()
                })
            }

            $scope.test = "TEST"
        }
    })
})
