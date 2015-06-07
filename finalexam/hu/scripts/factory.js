angular.module('finalExam')
    .factory('menuData', function() {
        return [
            {
                "id": 0,
                "name": "Jegyeim"
            },
            {
                "id": 1,
                "name": "Százalékok"
            }
        ];
    })
    .factory('errorMessages', function() {
        return [
            {
                "id": 1,
                "error": "A tantágy neve maximum 50 karakter hosszú lehet."
            },
            {
                "id": 2,
                "error": "Minde mezőt ki kell tölteni."
            },
            {
                "id": 3,
                "error": "Hupsz... Oda írtál szöveget ahova nem kéne."
            },
            {
                "id": 4,
                "error": "Az írásbelin elért pontjaid száma nem lehet több mint az írásbeli teljes pontszáma."
            },
            {
                "id": 5,
                "error": "Az írásbeli összpontszáma nem lehet több az egész vizsga pontszáma."
            }
        ];
    });