(function () {
     'use strict';

     angular
          .module('users')
          .factory('mapService', mapService);

     mapService.$inject = ['$timeout'];
     function mapService($timeout) {
          google.maps.event.addDomListener(window, 'resize', resizeHandler);
          const map = {
               center: {
                    latitude: 45,
                    longitude: -73
               },
               window: {
                    model: {},
                    show: false,
                    options: {
                         pixelOffset: {
                              width: -1,
                              height: -50
                         }
                    }
               },
               events: {
                    click: mapClickHandler
               },
               markersEvents: {
                    click: markerClickHandler
               },
               control: {},
               zoom: 8
          };
          return {
               getMap: () => map,
               generateMarkers
          };

          function generateMarkers(users) {
               return _.map(users, user => ({
                    latitude: user.coordinates[0],
                    longitude: user.coordinates[1],
                    user,
                    icon: {
                         url: user.picture.thumbnail,
                         optimized: false
                    },
                    options: {
                         animation: null,
                         labelClass: 'marker-label'
                    },
                    title: user.name.first,
                    id: user.id.value
               }));
          }

          function resizeHandler() {
               const mapRef = map.control.getGMap();
               const center = mapRef.getCenter();
               google.maps.event.trigger(mapRef, 'resize');
               mapRef.setCenter(center);
          }

          function mapClickHandler() {
               $timeout(() => {
                    map.window.hideWindow();
                    map.window.show = false;
                    map.window.pinned = '';
               })
          }

          function markerClickHandler(marker, eventName, model) {
               map.window.model = model;
               map.window.pinned = model.id;
               map.window.show = true;
          }
     }
}());
