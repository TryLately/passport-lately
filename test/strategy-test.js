var util = require('util');
var expect = require('chai').expect;
var LatelyStrategy = require('../lib/strategy');

describe('Strategy', function() {
  
  describe('constructed', function() { 

    var strategy = new LatelyStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
      
    it('should be named Lately', function() {
      expect(strategy.name).to.equal('Lately');
    });
  })

  describe('constructed with undefined options', function() {
    it('should throw', function() {
      expect(function() {
        var strategy = new LatelyStrategy(undefined, function(){});
      }).to.throw(Error);
    });
  })
  
});