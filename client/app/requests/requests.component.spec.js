'use strict';

describe('Component: RequestsComponent', function() {
  // load the controller's module
  beforeEach(module('myBookTradingAppApp.requests'));

  var RequestsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RequestsComponent = $componentController('requests', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
