const passport = require('passport');
const hash = require('hash.js');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('./database');
//const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'cedula',
  passwordField: 'pass',
  passReqToCallback: true
}, async (req, cedula, pass, done) => {
  const rows = await pool.query('SELECT * FROM cooperativa WHERE ruc = ?', [cedula]);
  if (rows.length == 1) {
    const user = rows[0];
    const passCifrada =  hash.sha256().update(pass).digest('hex');
    const validPassword = (user.pass == passCifrada);
    if (validPassword) {
      done(null, user, req.flash('success',  user.nombre));
    } else {
      done(null, false, req.flash('message', 'Contraseña erronea.'));
    }
  } else {
    return done(null, false, req.flash('message', 'El RUC no esta registrado en el sistema.'));
  }
}));

/*passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const { fullname } = req.body;
  let newUser = {
    fullname,
    username,
    password
  };
  newUser.password = await helpers.encryptPassword(password);
  // Saving in the Database
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));*/

passport.serializeUser((user, done) => {
  done(null, user.ruc);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM cooperativa WHERE ruc = ?', [id]);
  done(null, rows[0]);
});
