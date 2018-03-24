'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('mine', {
      url: '/mine',
      template: '<mine></mine>',
      authenticate: true
    });
}
