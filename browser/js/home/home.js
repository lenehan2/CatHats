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

            $scope.pickCategory = function (categoryName) {
                if (categoryName === 'Costumes') return 'fa fa-reddit-alien';
                if (categoryName === 'Outerwear') return 'glyphicon glyphicon-tree-conifer';
                if (categoryName === 'Formal') return 'fa fa-black-tie';
                if (categoryName === 'Seasonal') return 'glyphicon glyphicon-tint';
            }
        }
    });
});
