app.controller('LandingPageCtrl',function($scope, $state){
	$scope.isState = function(){
		return $state.is('landingPage')
	}
	var audio = new Audio("images/Cat_Meowing_2-Mr_Smith-780889994.mp3");
	audio.load();
	$scope.clickMe = function(){
		
		$scope.show = !$scope.show;
		setTimeout(function(){
			audio.play();
		},1500)
		setTimeout(function(){
			$state.go('home')
		},3000)
	}
})
