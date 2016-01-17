app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
        	featured: function(ProductFactory){
        		return ProductFactory.getProducts({featured: true})
        	}
        },
        controller: function($scope,featured){
        	$scope.featured = featured;
        }
    });
});