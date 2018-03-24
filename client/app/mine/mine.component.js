'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './mine.routes';

export class MineComponent {
  $http;
  Auth;
  myBooks = [];
  user;
  newBook = '';
  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    'ngInject';
    this.$http = $http;
    this.Auth = Auth;
    this.socket = socket;
    this.user = Auth.getCurrentUserSync();
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('book');
    });

  }

  $onInit() {
    this.$http.get('/api/books')
      .then(response => {
        this.myBooks = response.data.filter(x=> x.owner == this.user._id);
        this.socket.syncUpdates('book', this.myBooks);
      });
  }

  addBook(form){
    var newBook = {
      name: this.newBook,
      owner: this.user._id,
      approved: false,
      img: '',
      reader: ''
    }

    this.$http.post('/api/books', newBook);
    this.newBook = '';   
  }

  removeBook(book){
    this.$http.delete('api/books/' + book._id);
  }
}

export default angular.module('myBookTradingAppApp.mine', [uiRouter])
  .config(routes)
  .component('mine', {
    template: require('./mine.html'),
    controller: MineComponent,
    controllerAs: 'mineCtrl'
  })
  .name;