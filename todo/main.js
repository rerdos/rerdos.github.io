(function(){
    mainCtrl.$inject = ['$scope', '$http'];
    function mainCtrl($scope, $http) {
        $scope.isEmpty = isEmpty;
        $scope.removeTodo = removeTodo;
        $scope.todos = [];
        $scope.toggleDone = toggleDone;

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
