mainCtrl.$inject = ['$scope', '$http', 'menuData'];
function mainCtrl($scope, $http, menuData) {
    $scope.testTypes = [];
    $scope.menuData = menuData;
    $scope.activeMenuIndex = 0;

    $http.get('data/data.json').
        success(function(data) {
            $scope.testTypes = data;
        }).
        error(function() {
            console.error("finalExam app: Error during loading the data file!");
            alert("Error during loading the data file!");
        });
}

angular.module('finalExam')
    .controller('mainCtrl', mainCtrl);

