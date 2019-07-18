const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/username', auth.checkUsername);
router.post('/email', auth.checkEmail);

module.exports = router;
