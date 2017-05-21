(function () {
     'use strict';

     angular
          .module('users')
          .factory('UsersAPI', UsersAPI);

     UsersAPI.$inject = ['$resource'];
     function UsersAPI($resource) {
          return $resource('https://randomuser.me/api');
     }
}());
