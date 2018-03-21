'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('myBookTradingAppApp.util', [])
  .factory('Util', UtilService)
  .name;
