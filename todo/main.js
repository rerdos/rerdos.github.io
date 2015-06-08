(function(){
    mainCtrl.$inject = ['$scope', '$http'];
    function mainCtrl($scope, $http) {
        $scope.addTodo = addTodo;
        $scope.editTodo = editTodo;
        $scope.isEdit = false;
        $scope.error = {"errorId": 0, "isError": false};
        $scope.editDone = editDone;
        $scope.toggleDone = toggleDone;
        $scope.newTodo = {};
        $scope.todos = [];
        $scope.removeError = removeError;
        $scope.removeTodo = removeTodo;

        function addTodo(){
            if (formValidator()===true){
                $scope.error.isError = false;

                if ($scope.todos.length>0) {
                    $scope.newTodo.id = $scope.todos.length;
                } else {
                    $scope.newTodo.id = 0;
                }

                $scope.newTodo.done = false;

                $scope.todos.push(angular.copy($scope.newTodo));
                $scope.newTodo = {};
            } else {
                $scope.error.errorId = formValidator();
                $scope.error.isError = true;
            }
        }

        function editTodo(id) {
            if(!$scope.isEdit) {
                var i = getIdById(id);
                $scope.isEdit = id;
                $scope.newTodo = angular.copy($scope.todos[i]);
            } else {
                $scope.isEdit = false;
                $scope.newTodo = {};
            }
        }

        function editDone(id) {
            if($scope.isEdit || $scope.isEdit===0){
                if (formValidator()===true){
                    var i = getIdById(id);
                    $scope.error.isError = false;

                    $scope.todos[i] = angular.copy($scope.newTodo);
                    $scope.newTodo = {};
                } else {
                    $scope.error.errorId = formValidator();
                    $scope.error.isError = true;
                }
            }
        }

        function toggleDone(id) {
            var i = getIdById(id);
            $scope.todos[i].done = !$scope.todos[i].done;
        }

        function removeTodo(id) {
            var i = getIdById(id);
            $scope.todos.splice(i,1);
        }

        function getIdById(id) {
            for (var i = 0; i<$scope.todos.length && $scope.todos[i].id!==id; i++) {}
            return i;
        }

        function formValidator() {
            if ($scope.newTodo.description===undefined || $scope.newTodo.description.length===0) {
                return 0;
            } else if ($scope.newTodo.description.length>50) {
                return 1;
            } else {
                return true;
            }
        }

        function removeError() {
            $scope.error.isError = false;
        }

        $http.get('data.json')
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function() {
                alert("Error during loading the data file!");
            });

        $scope.errorMessages = [
            {
                "id": 0,
                "error": "You can't save an empty todo."
            },
            {
                "id": 1,
                "error": "Your todo cannot be longer than 50 characters."
            }
        ];

    }
    angular.module('todo', [])
        .controller('mainCtrl', mainCtrl);
})();
