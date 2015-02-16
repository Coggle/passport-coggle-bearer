/**
 * Module dependencies.
 */
var BearerStrategy = require('passport-http-bearer');
var util = require('util');
var request = require('request');

/**
 * Creates an instance of `Strategy`.
 *
 * The Coggle Bearer authentication strategy authenticates requests based on
 * a bearer token contained in the `Authorization` header field, `access_token`
 * body parameter, or `access_token` query parameter.
 *
 */
function CoggleBearerStrategy(options, verify) {
  if (!options.profile_url)
    options.profile_url = "https://coggle.it/api/1/badge"

  this.coggle_verify = verify;

  var strategy = BearerStrategy.call(this, options, this.verify.bind(this));

  this.name = 'coggle-bearer';
  this.options = options;
}

/**
 * Inherit from `BearerStrategy`.
 */
util.inherits(CoggleBearerStrategy, BearerStrategy);

/**
 * Verify request based on the contents of a HTTP Bearer authorization
 * header, body parameter, or query parameter.
 */
CoggleBearerStrategy.prototype.verify =  function(token, done) {
  request(this.options.profile_url, {
    headers: {
      Authorization: "Bearer "+token
    }
  }, function(err, res, body){
    if (err) return done(err);
    if (res.statusCode !== 200) {
      var err = new Error('invalid token');
      err.code = res.statusCode ? res.statusCode : 400;
      return done(err);
    }
    else {
      var profile = JSON.parse(body);
      this.coggle_verify ? this.coggle_verify(token, profile, done) : done(false, profile);
    }
  }.bind(this));
}

/**
 * Expose `Strategy`.
 */
module.exports = CoggleBearerStrategy;
