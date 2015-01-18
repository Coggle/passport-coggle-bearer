# coggle-auth-bearer

Usage:

``` Javascript
var conf = require('./config');
var passport = require('passport');
var CoggleBearerStrategy = require('coggle-auth-bearer').Strategy;
var User = require('./models/User');

passport.use(new CoggleBearerStrategy({},
  function(profile, done) {
  	done(false, new User(profile));
  }
));
```
