const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

const {User} = require('../user/user.model');
const {JWT_SECRET} = require('../config');

const LocalStrategy = new LocalStrategy((username, password, passportVerify) => {
  let user;

  User.findOne({username})
    .then(_user => {
      user = _user;

      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }

      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password'
        });
      }

      return passportVerify(null, user);
    })
    .catch(err=>{
      if(err.reason === 'LoginError') {
        return passportVerify(null, false, err.message);
      }

      return passportVerify(err, false);
    }); 
});