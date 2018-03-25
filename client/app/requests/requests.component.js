'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './requests.routes';
import _ from 'lodash';

export class RequestsComponent {
  /*@ngInject*/
  allBooks = [];
  myRequests =[];
  theirRequests = [];
  $http;
  me;
  socket;

  constructor($http, $scope, socket, Auth) {
    'ngInject';
    this.me = Auth.getCurrentUserSync();
    this.$http = $http;
    this.socket = socket;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('book');
    });

  }

  $onInit() {
    this.$http.get('/api/books')
      .then(response => {
        this.books = response.data;
        this.myRequests = this.books.filter( x => x.readerid == this.me._id);
        this.theirRequests = this.books.filter( x => x.ownerid == this.me._id && x.readerid != "" && x.readerid != this.me._id);
        this.socket.syncUpdates('book', this.books, msg => {
          this.myRequests = this.books.filter( x => x.readerid == this.me._id);
          this.theirRequests = this.books.filter( x => x.ownerid == this.me._id && x.readerid != "" && x.readerid != this.me._id);
        });
      });
  }

  returnBook(book){
    this.$http.patch('/api/books/'+book._id, [{op: 'replace', path: '/readerid', value: ''},{op: 'replace', path: '/reader', value: ''},{op: 'replace', path: '/approved', value: false}])
  }

  approveRequest(book){
    this.$http.patch('/api/books/'+book._id, [{op: 'replace', path: '/approved', value: true}])
  }

  denyRequest(book){
    this.$http.patch('/api/books/'+book._id, [{op: 'replace', path: '/readerid', value: ''},{op: 'replace', path: '/reader', value: ''},{op: 'replace', path: '/approved', value: false}])
  }

  calculateRemainingHeight(){
    return window.innerHeight 
              - document.getElementsByTagName('navbar')[0].clientHeight
              - document.getElementsByTagName('banner')[0].clientHeight
              - document.getElementsByTagName('footer')[0].clientHeight - 50;
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
