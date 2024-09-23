const express = require('express');
const Auth = require('../controllers/auth');
const router = express.Router();


router.post('/send-code', Auth.sendEmployeeVerificationCode);
router.post('/change-pass', Auth.changeEmployeePassword);

module.exports = router;
