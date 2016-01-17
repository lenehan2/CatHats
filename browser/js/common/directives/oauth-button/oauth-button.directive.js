//gratefully borrowed from the auther workshop
'use strict';

app.directive('oauthButton', function () {
	return {
		scope: {
			providerName: '@'
		},
		restrict: 'E',
		templateUrl: '/browser/js/common/directives/oauth-button/oauth-button.html'
	}
});