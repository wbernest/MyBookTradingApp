'use strict';

export default class SettingsController {
  user = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errors = {
    other: undefined
  };
  message = '';
  submitted = false;

  me = {
    _id : '',
    city: '',
    state: '',
    name: ''
  };
  /*@ngInject*/
  constructor(Auth, $http) {
    this.Auth = Auth;
    this.$http = $http;
    this.$http.get('/api/users/me').then(response=> {
      this.me._id = response.data._id;
      this.me.city = response.data.city;
      this.me.state = response.data.state;
      this.me.name = response.data.name;
    })
  }

  changePassword(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }

  changeInformation(form) {
    var patchObject = [
      {op: 'replace', path: '/name', value: this.me.name}, 
      {op: 'replace', path: '/city', value: this.me.city}, 
      {op: 'replace', path: '/state', value: this.me.state}
    ];

    if(form.$valid) {
      this.$http.patch('/api/users/' + this.me._id, patchObject ).then(response => {
        this.me._id = response.data._id;
        this.me.city = response.data.city;
        this.me.state = response.data.state;     
      });
    }
  }

}
