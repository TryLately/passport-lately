# Passport-lately

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating with [Lately](http://www.trylately.com/) using the OAuth 2.0 API.

This module lets you authenticate using Lately in your Node.js [Express](http://expressjs.com/) (or [Connect](http://www.senchalabs.org/connect/)) server applications.

## Install

```bash
$ npm install passport-lately
```

## Usage

#### Configure Strategy

The Lately authentication strategy authenticates users using a Lately account and OAuth tokens. The strategy requires a `verify` callback, which accepts these credentials and calls `done` providing a user, as well as `options` specifying a client id , client secret, and callback URL.

```javascript
var LatelyStrategy = require('passport-lately').Strategy;

passport.use(new LatelyStrategy({
    clientID: Lately_CLIENT_ID,
    clientSecret: Lately_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/callback',
    state: true
  },
  function(accessToken, refreshToken, profile, done) {
    var user = profile;
    user.accessToken = accessToken;
    return done(null, user);
  }
));
```



#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'lately'` strategy, to authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/) application:

```javascript
app.get('/auth/lately',
  passport.authenticate('lately', { scope: ['lately:user/profile','lately:content/generate'] }
));

app.get('/callback', passport.authenticate('lately', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2018 Lately Inc. <[https://trylately.com](https://trylately.com)>
