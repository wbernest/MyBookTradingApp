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
        this.myBooks = response.data.filter(x=> x.ownerid == this.user._id);
        this.socket.syncUpdates('book', this.myBooks);
      });
  }

  addBook(form){
    var newBook = {
      name: this.newBook,
      ownerid: this.user._id,
      owner: this.user.name,
      approved: false,
      img: '',
      reader: '',
      readerid: ''
    }

    this.$http.post('/api/books', newBook);
    this.newBook = '';   
  }

  removeBook(book){
    this.$http.delete('api/books/' + book._id);
  }

  calculateRemainingHeight(){
    return window.innerHeight 
              - document.getElementsByTagName('navbar')[0].clientHeight
              - document.getElementsByTagName('banner')[0].clientHeight
              - document.getElementsByTagName('footer')[0].clientHeight - 50;
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
