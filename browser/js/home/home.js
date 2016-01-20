app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'js/home/home.html',
        resolve: {
        	featured: function(ProductFactory){
        		return ProductFactory.getProducts({featured: true})
        	},
            categories: function (CategoryFactory) {
                return CategoryFactory.fetchAll();
            }
        },
        controller: function($scope,featured, categories){
        	$scope.featured = featured;
            $scope.categories = categories;
            console.log($scope.categories);
        }
    });
});
