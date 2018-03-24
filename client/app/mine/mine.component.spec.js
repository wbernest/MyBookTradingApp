'use strict';

describe('Component: MineComponent', function() {
  // load the controller's module
  beforeEach(module('myBookTradingAppApp.mine'));

  var MineComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MineComponent = $componentController('mine', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
