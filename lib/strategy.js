
/**
 * Module dependencies.
 */
var util = require('util'),
    OAuth2Strategy = require('passport-oauth2'),
    InternalOAuthError = require('passport-oauth2').InternalOAuthError;

/**
 * `Strategy` constructor.
 *
 * The Lately authentication strategy authenticates requests by delegating to
 * TryLately.com using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your AppExample application's client id
 *   - `clientSecret`  your AppExample application's client secret
 *   - `callbackURL`   URL to which AppExample will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new LatelyStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/appexample/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {

  // setup default urls
  options = options || {};

  options.tokenURL =  options.tokenURL || 'https://trylately.com/v1/apps/oauth/token';
  options.authorizationURL = options.authorizationURL || 'https://trylately.com/v1/apps/oauth/authorize';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'Lately';
  this._userProfileURL = options.userProfileURL || 'https://trylately.com/v1/apps/user/profile';
  this._oauth2.setAuthMethod('Bearer');
  this._oauth2.useAuthorizationHeaderforGET(true);  

}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);

/**
 * Retrieve user profile from TryLately.com
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `Lately`
 *   - `id`
 *   - `username`
 *   - `displayName`
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {

  this._oauth2.getProtectedResource( this._userProfileURL, accessToken, function (err, body ) {

    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
    
    try { 
      var json = JSON.parse(body);
      var profile = { provider: 'Lately' };
      profile.id = json.user_id;
      profile.name = json.name;
      profile._raw = body;
      profile._json = json;
      done(null, profile);
    } catch(e) {
      done(e);
    }
    
  });

};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;