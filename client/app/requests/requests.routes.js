'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('requests', {
      url: '/requests',
      template: '<requests></requests>',
      authenticate: true
    });
}
