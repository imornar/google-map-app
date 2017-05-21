(function () {
     'use strict';

     angular
          .module('users')
          .component('userCard', {
               templateUrl: 'user-card.html',
               bindings: {
                    user: '<',
                    pinned: '<',
                    target: '@',
                    marker: '<'
               },
               controllerAs: 'us',
               controller: userProfile
          });

     userProfile.$inject = ['$interval'];
     function userProfile($interval) {
          const vm = this;
          let animation;
          vm.enter = enter;
          vm.leave = leave;
          const animationEnabled = () => vm.target !== 'map' && vm.pinned !== vm.user.id.value;
          const playAnimation = () => vm.marker.options.animation = google.maps.Animation.BOUNCE;
          const stopAnimation = () => vm.marker.options.animation = google.maps.Animation.jo;

          function enter() {
               if (animationEnabled()) {
                    playAnimation();
                    animation = $interval(playAnimation, 800);
               }
          }

          function leave() {
               if (animationEnabled()) {
                    stopAnimation();
                    $interval.cancel(animation);
               }
          }
     }
}());
