const router = require('express').Router();
// const authController = require('../controllers/authController');

const authController = require('../controllers/authController');
// router.get('/', async (req,res)={
//   // res.send("WERO")

// });
router.post('/register', authController.registerApiPost);
router.post('/login', authController.loginUserApiPost);
module.exports = router;
