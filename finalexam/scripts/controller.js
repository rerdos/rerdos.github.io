mainCtrl.$inject = ['$scope', '$http', 'menuData'];
function mainCtrl($scope, $http, menuData) {
    $scope.testTypes = [];
    $scope.menuData = menuData;
    $scope.activeMenuIndex = 0;
    $scope.selectMenu = selectMenu;
    $scope.isShowEdit = false;
    $scope.toggleEdit = toggleEdit;

    function selectMenu(id) {
        $scope.activeMenuIndex = id;
    }

    function toggleEdit() {
        $scope.isShowEdit = !$scope.isShowEdit;
    }

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

