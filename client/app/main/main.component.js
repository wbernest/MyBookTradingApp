import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';
  isAuthenticated = false;
  books = [];
  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.Auth = Auth;
    this.me = Auth.getCurrentUserSync();
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('book');
    });

    this.Auth.isLoggedIn(res => {
      this.isAuthenticated = (res != "");
    });

  }

  $onInit() {
    this.$http.get('/api/books')
      .then(response => {
        this.books = response.data.filter( x => x.reader == "");
        this.socket.syncUpdates('book', this.books, msg => this.books = this.books.filter(x => x.readerid ==""));
      });
  }

  requestBook(book){
    this.$http.patch('/api/books/'+book._id, [{op: 'replace', path: '/readerid', value: this.me._id},{op: 'replace', path: '/reader', value: this.me.name}])
  }

  calculateRemainingHeight(){
    return window.innerHeight 
              - document.getElementsByTagName('navbar')[0].clientHeight
              - document.getElementsByTagName('banner')[0].clientHeight
              - document.getElementsByTagName('footer')[0].clientHeight - 50;
  }
}

export default angular.module('myBookTradingAppApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
