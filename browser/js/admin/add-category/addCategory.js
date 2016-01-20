app.directive('addCategory', function (CategoryFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/admin/add-category/category-add.html',
		link: function (scope) {
			scope.addCategory = function(categoryName){
				CategoryFactory.addCategory(categoryName);
			};
		}
	};
});