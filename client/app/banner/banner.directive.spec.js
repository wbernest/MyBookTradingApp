'use strict';

describe('Directive: banner', function() {
  // load the directive's module and view
  beforeEach(module('myBookTradingAppApp.banner'));
  beforeEach(module('app/banner/banner.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<banner></banner>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the banner directive');
  }));
});
