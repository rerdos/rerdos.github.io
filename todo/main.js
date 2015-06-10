(function(){
    mainCtrl.$inject = ['$scope', '$http'];
    function mainCtrl($scope, $http) {
        $scope.isEdit = {"value": false, "id": 0};
        $scope.isEmpty = isEmpty;
        $scope.isValid = isValid;
        $scope.newTodo = {};
        $scope.removeTodo = removeTodo;
        $scope.todos = [];
        $scope.toggleDone = toggleDone;

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
        }

        function toggleDone(index) {
            $scope.todos[index].done = !$scope.todos[index].done;
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
