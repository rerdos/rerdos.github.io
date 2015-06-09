(function(){
    mainCtrl.$inject = ['$scope', '$http'];
    function mainCtrl($scope, $http) {
        $scope.isEdit = {"index": 0, "isEdit": false};
        $scope.isEmpty = isEmpty;
        $scope.isValid = isValid;
        $scope.newTodo = {};
        $scope.removeTodo = removeTodo;
        $scope.todos = [];
        $scope.toggleDone = toggleDone;

        function isValid() {
            if ($scope.newTodo.description !== undefined) {
                console.log($scope.newTodo.description.length);
                    return !($scope.newTodo.description.length === 0 || $scope.newTodo.description.length > 50);
            } else {
                return false;
            }
        }

        function isEmpty() {
            return !($scope.todos.length > 0);
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
