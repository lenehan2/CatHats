app.directive('editProductCategories', function () {
    return {
        restrict: 'E',
        scope: {
            product: '=',
            categories: '='
        },
        templateUrl: 'js/admin/edit-product-categories/edit-product-categories.html',
        link: function (scope, element) {

            // Keep product.categories up to date with what options are selected
            element.on('click', function (event) {

                // Only runfunction when the actual checkbox is clicked
                if (event.target.localName !== 'input') return;
                scope.product.categories = updateCategories();
            });

            scope.hasCategory = function (product, category) {
                for (var i = 0; i < product.categories.length; i++) {
                    if (product.categories[i]._id === category._id) return true;
                }
                return false;
            }

            function updateCategories() {
                const checkboxes = [].slice.call(element.find('input'));

                return checkboxes.reduce(function (acc, curr) {
                    if (curr.checked) acc.push(curr.value);
                    return acc;
                }, []);
            }
        }
    }
})
