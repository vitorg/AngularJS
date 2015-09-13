"use strict";

var app = angular.module('dubbble', ['ui.bootstrap', 'ngRoute', 'dubbble.controllers']);

app.config(function($routeProvider) {
	$routeProvider
		.when("/page1", {controller: "Page1Ctrl", templateUrl: "partials/page1.htm"})
		.when("/page2", {controller: "Page2Ctrl", templateUrl: "partials/page2.htm"})
		.when("/notfound", {templateUrl: "partials/notfound.htm"})
		.otherwise({redirectTo: "/notfound"})
});