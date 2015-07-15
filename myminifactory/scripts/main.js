'use strict';

function mainCtrl($scope, modelsFactory, $modal) {
    modelsFactory.success(function(data){
        $scope.models = data;
    });

    $scope.openModal = function (selectedModel) {
        $modal.open({
            templateUrl: 'templates/modal.html',
            controller: modalCtrl,
            resolve: {
                selectedModel: function () {
                    return selectedModel;
                }
            }
        });
    };
}

function modalCtrl($modalInstance, $scope, selectedModel){
    $scope.activeModel = selectedModel;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function modelsFactory($http){
    return $http.get('data/assignment.json').
        error(function() {
            console.error("Error during loading the data file!");
            alert("Error during loading the data file!");
        });
}

angular.module('myMiniFactory', ['mm.foundation'])
    .controller('mainCtrl', mainCtrl)
    .controller('modalCtrl', mainCtrl)
    .factory('modelsFactory', modelsFactory);