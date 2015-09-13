var module = angular.module('phonecatApp', []);

module.controller('PhoneListCtrl', function ($scope, $http) {
		$scope.phones = [];
		$scope.hallo = "HELLO!";

		$http.get('phones.json')
			.success(function(response) {
				$scope.phones = response.slice(0);
			})
			.error(function(err) {
				alert(err);
			});

		$scope.orderProp = 'age';

		$scope.edit = function(phone) {
			$scope.editing = phone;
		};
	})
	.directive('setVal', function() {
		return {
			require: 'ngModel',
			//template: '<div class="myDirective">Content of DIRECTIVE! </br>can also access to the scope, e.g. orderProp = {{orderProp}}!</div>',
			//replace: false,
			link: function($scope, $element, $attrs, ngModelCtrl) {
				console.log("datedirective-value = " + $attrs.dateDirectiveValue);
 
				$attrs.$observe('setVal', function(newVal) {
					$element.val( newVal );
					console.log("newVal = " + newVal);
					//console.log( ngModelCtrl );
					setTimeout(function() {
						$scope.$apply(function() {
							ngModelCtrl.$setViewValue(newVal);
						});
					}, 50);
				});

				ngModelCtrl.$render = function() {
					if( ngModelCtrl.$viewValue ) {
						$element.val(ngModelCtrl.$viewValue + " x");
						console.log("Render");
					}
				};
			}
		}
	})
	.directive('hallo', function() {
		return {
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl) {

				var converter = function(toConvert) {
					console.log("converting");
					return toConvert ? toConvert.toLowerCase() : "";
				};
				ngModelCtrl.$formatters.push(converter);

				var parser = function(toParse) {
					console.log("parsing");
					return toParse ? toParse.toUpperCase() : "";
				}
				ngModelCtrl.$parsers.push(parser);
				
				ngModelCtrl.$render = function() {
					var contents = ngModelCtrl.$viewValue;
					$element.val(contents);
				};

				$element.on('hallomodified', function() {
					var contents = $element.val();
					ngModelCtrl.$setViewValue(contents);
					$scope.$digest();
				});

			} //link
		}
	})


/*module.controller('surveyCtrl', function($scope) {
		$scope.user = {
			username: "",
			password: ""
		}
	})
	.factory('uniqueness', function() {
		var usernames = ['javascript', 'angular', 'jquery'];

		return {
			taken: function(name) {
				return usernames.indexOf(name.toLowerCase()) >= 0;
			}
		}
	})
	.directive('uniqueCheck', function(uniqueness) {
		return {
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl) {
				var checkUnique = function(name) {
					console.log("checkUnique; name="+name+" valid="+uniqueness.taken(name));
					var isValid = uniqueness.taken(name)
					ngModelCtrl.$setValidity('unique', isValid);
					return name;
				}

				ngModelCtrl.$parsers.push(checkUnique);
			}
		}
	});*/


module.controller('stageCtrl', function($scope) {
	$scope.step = 1;

	$scope.next = function() {
		$scope.step++;
	}
})
.factory('User', function() {
	var user = {
		username: "",
		password: ""
	};

	return {
		get: function() {
			return user;
		}
	}
});

module.controller('surveyCtrlOne', function($scope, User) {
		$scope.user = User.get();
	})
	.factory('validateUser', function(User) {
		var invalidUsernames = ['javascript', 'angular', 'jquery'];

		return {
			isValid: function(name) {
				return !(invalidUsernames.indexOf(name.toLowerCase()) >= 0);
			}
		}
	})
	.directive('uniqueCheck', function(validateUser) {
		return {
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl) {
				var checkUnique = function(name) {
					var isValid = validateUser.isValid(name)
					ngModelCtrl.$setValidity('unique', isValid);
					return name;
				}

				ngModelCtrl.$parsers.push(checkUnique);
			}
		}
	});

module.controller('surveyCtrlTwo', function($scope, User) {
	$scope.user = User.get();
});
