'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './requests.routes';

export class RequestsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('myBookTradingAppApp.requests', [uiRouter])
  .config(routes)
  .component('requests', {
    template: require('./requests.html'),
    controller: RequestsComponent,
    controllerAs: 'requestsCtrl'
  })
  .name;
