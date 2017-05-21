(function () {
     'use strict';

     angular
          .module('users')
          .filter('displayName', displayName);

     displayName.$inject = [];
     function displayName() {
          return user => `${user.name.first} ${user.name.last}`;
     }
}());
