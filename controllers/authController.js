const passport = require('passport');
const pool = require('../db');
const createErrors = require('http-errors');

module.exports = {
  registerApiPost: (req, res, next) => {
    console.log('test');
    passport.authenticate('register', async (error, user, info) => {
      try {
        if (info !== undefined) {
          console.log(info);
          console.log(info.message);
          return next(createErrors(400, `register ${info.message}`));
        }
        if (!user) {
          console.log('error occured in user' + ' registration or passing the user' + ' data back');

          throw error;
        }
        // const accessToken = await signAccessToken(user);
        // const refreshToken = await signRefreshToken(user);
        // TODO:undo comments for sending mail to user when registered
        // console.log(user);
        // const registerUserMsg = {
        //     to: user.email,
        //     from: "shishir@ibrew-hub.com",
        //     subject: "Registration Email",
        //     text: "Thank you for registering in our application",
        //     html:
        //         "<div><p>Hi Patron,</p><p>Welcome to this service,we are pleased to invite you" +
        //         " to our" +
        //         " team" +
        //         " we would love to cooperate with you in the future</p></div>",
        // };
        // sgMail
        //     .send(registerUserMsg)
        //     .then(
        //         () => {
        //             console.log(
        //                 "we have successfully sent the message"
        //             );
        //         },
        //         (error) => {
        //             console.error(error);

        //             if (error.response) {
        //                 console.error(error.response.body);

        //                 return next(createError(error.response.body));
        //             }
        //         }
        //     )
        //     .catch((error) => {
        //     console.error(error);
        //     next(error);
        // });
        return res.status(200).json({ message: 'Successfully Registered' });
      } catch (error) {
        console.log(error);
        next(error);
      }
    })(req, res, next);
  },
};
