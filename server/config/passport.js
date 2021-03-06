// eslint-disable-next-line prefer-destructuring
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db');
const createError = require('http-errors');

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    async (req, username, password, done) => {
      try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE user_email = $1', [username]);
        if (user) {
          return done(null, false, {
            message: 'email already registered',
          });
        }
        const createUser = await db.one(
          'INSERT INTO users (user_name,user_email,user_password) VALUES($1,$2,$3) RETURNING *',
          [req.body.name, username, password]
        );

        return done(null, createUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      try {
        const savedUser = await db.oneOrNone('SELECT * FROM users WHERE user_email = $1', [
          username,
        ]);

        if (!savedUser) {
          return done(null, false, {
            message: 'email or password not valid',
          });
        }
        if (savedUser.user_password === password) {
          const newUser = {
            id: savedUser.id,
            name: savedUser.firstName,
            email: username,
          };
          return done(null, newUser);
        }
        throw createError(400, 'email or password not valid');
      } catch (error) {
        done(error);
      }
    }
  )
);
