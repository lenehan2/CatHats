app.factory('OrderFactory', function ($http) {
    return {
        //This should probable be '/api/user/orders'
        //Seperate routes for getting users cart vs admin abilities
        getOrdersByUser: function (userId) {
            return $http.get('/api/admin/users/' + userId + '/orders')
                .then(res => res.data)
                .then(null, err => console.error(err));
        },

        adminDeleteOrder: function(orderId){
            return $http({
                method: 'PUT',
                url: '/api/admin/orders/'+orderId,
                data: {status: "Cancelled"}
            })
            .then(res => res.data)
            .then(null,err=> console.error(err))
        },

        adminGetAllOrders: function(params){
            console.log("I'm being called with", params);
            var params = params || {};

            return $http({
                method: 'GET',
                url: '/api/admin/orders',
                params: params
                })
                .then(res => res.data)
                .then(null, err => console.error(err));
        },

        adminGetOrderById: function (orderId) {
            console.log("CALLED")
            return $http.get('/api/admin/orders/' + orderId)
                .then(res => res.data)
                .then(null, err => console.error(err));
        },
        getCurrentUsersOrders: function(){
            return $http.get('/api/user/orders')
                .then(res => res.data)
                .then(null, err => console.error(err))
        },
        getOrderById: function(orderId){
            return $http.get('/api/user/orders/' + orderId)
                .then(res => res.data)
                .then(null, err => console.error(err));
        }
    }
})
