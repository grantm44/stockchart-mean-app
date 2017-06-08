'use strict';

describe('Service: stockService', function() {
  // load the service's module
  beforeEach(module('meanStockchartAppApp.stockService'));

  // instantiate service
  var stockService;
  beforeEach(inject(function(_stockService_) {
    stockService = _stockService_;
  }));

  it('should do something', function() {
    expect(!!stockService).to.be.true;
  });
});
