mainCtrl.$inject = ['$scope', '$http', 'menuData', 'errorMessages'];
function mainCtrl($scope, $http, menuData, errorMessages) {
    $scope.testTypes = [];
    $scope.menuData = menuData;
    $scope.activeMenuIndex = 0;
    $scope.selectMenu = selectMenu;
    $scope.isShowEdit = false;
    $scope.toggleEdit = toggleEdit;
    $scope.saveExam = saveExam;
    $scope.exam = {examName: "",type: 0, writtenTotal: "", writtenEarned: "", total: ""};
    $scope.error = false;

    $scope.exams = [];

    function selectMenu(id) {
        $scope.activeMenuIndex = id;
    }

    function toggleEdit() {
        $scope.isShowEdit = !$scope.isShowEdit;
    }

    function saveExam() {
        if (formValidator()===0) {
            $scope.error = false;
            $scope.exams.push(angular.copy($scope.exam));
            $scope.exams[$scope.exams.length-1].id = $scope.exams.length-1;
            toggleEdit();
            $scope.exam = {examName: "",type: 0, writtenTotal: "", writtenEarned: "", total: ""};
        } else {
            $scope.error = true;
            $scope.errorMessage = errorMessages[formValidator()-1].error;
        }
    }

    function formValidator() {
        if ($scope.exam.examName.length>50) {
            return(1);
        } else if ($scope.exam.examName==="" || $scope.exam.writtenTotal==="" || $scope.exam.writtenEarned==="" || $scope.exam.total ==="") {
            return (2);
        } else if (isNaN($scope.exam.writtenTotal) || isNaN($scope.exam.writtenEarned) || isNaN($scope.exam.total)) {
            return(3);
        } else if (parseInt($scope.exam.writtenTotal)<parseInt($scope.exam.writtenEarned)) {
            return(4);
        } else if (parseInt($scope.exam.writtenTotal)>parseInt($scope.exam.total)) {
            return(5);
        } else {
            return(0);
        }
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

