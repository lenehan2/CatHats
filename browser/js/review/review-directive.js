app.directive('addReview', function (ReviewFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/review/addReview.html',
        link: function(scope){
        	scope.submitReview = ReviewFactory.submitReview;
        }

    }
})

