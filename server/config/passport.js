var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({$or: [{ email: email }, { username: email }]}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'Nombre de usuario/email o contraseña': 'no es válido'}});
    }

    return done(null, user);
  }).catch(done);
}));