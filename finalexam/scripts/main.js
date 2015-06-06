'use strict';
mainCtrl.$inject = ['$scope', '$http'];
function mainCtrl($scope, $http) {
    $scope.testTypes = [];

    $http.get('data/data.json').
        success(function(data) {
            $scope.testTypes = data;
        }).
        error(function() {
            console.error("finalExam app: Error during loading the data file!");
            alert("Error during loading the data file!");
        });
}

angular.module('finalExam', [])
    .controller('mainCtrl', mainCtrl);

