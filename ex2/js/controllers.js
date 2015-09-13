"use strict";

var controllers = angular.module('dubbble.controllers', []);

controllers.controller('AppCtrl', function($scope) {
	$scope.name = "name from AppCtrl";
});

controllers.controller('MenuCtrl', function($scope, $location) {
	$scope.active = 1;
	$scope.menu = [1,2];
	$scope.setLink = function(index) {
		$scope.active = index;
	};
	$scope.setActive = function(index) {
		$scope.active = index;
	};
});

controllers.controller('Page1Ctrl', function($scope) {
	$scope.content = "Content of page 1";
});

controllers.controller('Page2Ctrl', function($scope) {
	$scope.content = "Content of page 2";
});