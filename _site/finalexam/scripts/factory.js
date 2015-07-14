angular.module('finalExam')
    .factory('menuData', function() {
        return [
            {
                "id": 0,
                "name": "My grades"
            },
            {
                "id": 1,
                "name": "Info"
            }
        ];
    })
    .factory('errorMessages', function() {
        return [
            {
                "id": 1,
                "error": "The name of the exam cannot be more than 50 characters."
            },
            {
                "id": 2,
                "error": "You must fill every input field."
            },
            {
                "id": 3,
                "error": "You have written text somewhere where you shouldn't."
            },
            {
                "id": 4,
                "error": "Earned points in the written section cannot be greater than the total points of written exam."
            },
            {
                "id": 5,
                "error": "Points of the written exam cannot be greater than the total points."
            }
        ];
    });