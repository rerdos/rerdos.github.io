mainCtrl.$inject = ['$scope', '$http', 'menuData', 'errorMessages'];
function mainCtrl($scope, $http, menuData, errorMessages) {
    $scope.testTypes = [];
    $scope.menuData = menuData;
    $scope.activeMenuIndex = 0;
    $scope.selectMenu = selectMenu;
    $scope.isShowEdit = false;
    $scope.toggleEdit = toggleEdit;
    $scope.cancelEdit = cancelEdit;
    $scope.saveExam = saveExam;
    $scope.exam = {examName: "",type: 0, writtenTotal: "", writtenEarned: "", total: ""};
    $scope.error = false;
    $scope.Math = window.Math;
    $scope.parseInt = window.parseInt;
    $scope.deleteExam = deleteExam;
    $scope.deleteAll = deleteAll;
    $scope.updateExam = updateExam;
    $scope.isNewExam = true;

    if (localStorage.getItem('Exams')===null) {
        $scope.exams = [];
    } else {
        $scope.exams = JSON.parse(localStorage.getItem('Exams'));
    }

    function selectMenu(id) {
        $scope.activeMenuIndex = id;
    }

    function toggleEdit() {
        $scope.isShowEdit = !$scope.isShowEdit;
    }

    function cancelEdit() {
        toggleEdit();
        $scope.error = false;
        $scope.exam = {examName: "",type: 0, writtenTotal: "", writtenEarned: "", total: ""};
        $scope.isNewExam = true;
    }

    function updateExam(id) {
        $scope.isNewExam = !$scope.isNewExam;
        $scope.exam = angular.copy($scope.exams[id]);
        if ($scope.isNewExam) {
            $scope.exam = {examName: "", type: 0, writtenTotal: "", writtenEarned: "", total: ""};
        }
        toggleEdit();
    }

    function deleteExam(id) {
        if(confirm("Do you really want to delete " + $scope.exams[id].examName + " from the list?")){
            $scope.exams.splice(id, 1);
        }
        setLocalStorage();
    }

    function deleteAll() {
        if(confirm("Do you really want to delete EVERY exam from the list?")){
            $scope.exams = [];
        }
        setLocalStorage();
    }

    function saveExam(id) {
        if (formValidator()===0) {
            if ($scope.isNewExam) {
                $scope.exams.push(angular.copy($scope.exam));
                $scope.exams[$scope.exams.length - 1].id = $scope.exams.length - 1;
                $scope.exams[$scope.exams.length - 1].currentGrade = currentGrade($scope.exams[$scope.exams.length - 1].type, $scope.exams[$scope.exams.length - 1].writtenEarned / $scope.exams[$scope.exams.length - 1].total * 100);
                $scope.exams[$scope.exams.length - 1].bestGrade = bestGrade($scope.exams[$scope.exams.length - 1].type, $scope.exams[$scope.exams.length - 1].writtenEarned, $scope.exams[$scope.exams.length - 1].writtenTotal, $scope.exams[$scope.exams.length - 1].total);
                toggleEdit();
                $scope.error = false;
                $scope.exam = {examName: "", type: 0, writtenTotal: "", writtenEarned: "", total: ""};
                setLocalStorage();
            } else {
                $scope.exams[id] = angular.copy($scope.exam);
                $scope.exams[$scope.exams.length - 1].currentGrade = currentGrade($scope.exams[$scope.exams.length - 1].type, $scope.exams[$scope.exams.length - 1].writtenEarned / $scope.exams[$scope.exams.length - 1].total * 100);
                $scope.exams[$scope.exams.length - 1].bestGrade = bestGrade($scope.exams[$scope.exams.length - 1].type, $scope.exams[$scope.exams.length - 1].writtenEarned, $scope.exams[$scope.exams.length - 1].writtenTotal, $scope.exams[$scope.exams.length - 1].total);
                toggleEdit();
                $scope.exam = {examName: "", type: 0, writtenTotal: "", writtenEarned: "", total: ""};
                $scope.isNewExam = true;
                setLocalStorage();
            }
        } else {
            $scope.error = true;
            $scope.errorMessage = errorMessages[formValidator()-1].error;
        }
    }

    function currentGrade(typeId, percentage) {
        for (var i=0; i<$scope.testTypes[typeId].percentages.length && !($scope.testTypes[typeId].percentages[i].value>percentage); i++) {}
        return i;
    }

    function bestGrade(typeId, point, writtenTotal, total) {
        console.log(total-writtenTotal+parseInt(point));
        for (var i=0; i<$scope.testTypes[typeId].percentages.length && !($scope.testTypes[typeId].percentages[i].value>(total-writtenTotal+parseInt(point))/total*100); i++) {}
        return i;
    }

    function setLocalStorage() {
        localStorage.setItem('Exams', JSON.stringify($scope.exams));
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

