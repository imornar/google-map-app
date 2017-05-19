(function () {
    angular.module('test').controller('MainCtrl', MainCtrl);
    MainCtrl.$inject = ['$http'];
    function MainCtrl($http) {
        var apiUrl = 'https://randomuser.me/api/?results=5&nat=us';

        this.$onInit = function () {
        	
        }
    }
}());
