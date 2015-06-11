(function(){
    mainCtrl.$inject = ['$scope', '$http'];
    function mainCtrl($scope, $http) {
        $scope.isEdit = {"value": false, "index": null};
        $scope.isEmpty = isEmpty;
        $scope.isValid = isValid;
        $scope.newTodo = {};
        $scope.removeTodo = removeTodo;
        $scope.saveTodo = saveTodo;
        $scope.todos = [];
        $scope.toggleDone = toggleDone;
        $scope.toggleEdit = toggleEdit;


        function isEmpty() {
            return $scope.todos.length === 0;
        }

        function isValid() {
            if ($scope.newTodo.description !== undefined) {
                return !($scope.newTodo.description.length === 0 || $scope.newTodo.description.length > 50);
            } else {
                return false;
            }
        }
        
        function removeTodo(index) {
            $scope.todos.splice(index, 1);
            if ($scope.isEdit.value) {
                toggleEdit(index);
            }
        }

        function saveTodo() {
            if ($scope.isEdit.value) {
                $scope.todos[$scope.isEdit.index] = angular.copy($scope.newTodo);
                toggleEdit(null);
            } else {
                $scope.newTodo.id = $scope.todos.length;
                $scope.newTodo.done = false;
                $scope.todos.push($scope.newTodo);
                $scope.newTodo = {};
            }
        }

        function toggleDone(index) {
            $scope.todos[index].done = !$scope.todos[index].done;
        }

        function toggleEdit(index) {
            if (!$scope.isEdit.value || $scope.isEdit.index !== index) {
                $scope.isEdit.value = true;
                $scope.isEdit.index = index;
                $scope.newTodo = angular.copy($scope.todos[index]);
            } else {
                $scope.isEdit.value = false;
                $scope.isEdit.id = null;
                $scope.newTodo = {};
            }
        }

        $http.get('data.json')
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function() {
                alert("Error during loading the data file!");
            })
    }
    angular.module('todo', [])
        .controller('mainCtrl', mainCtrl);
})();
