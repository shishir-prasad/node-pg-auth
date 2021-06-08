const router = require('express').Router();
// const authController = require('../controllers/authController');

const { registerApiPost } = require('../controllers/authController');
// router.get('/', async (req,res)={
//   // res.send("WERO")

// });
router.post('/register', registerApiPost);

module.exports = router;
