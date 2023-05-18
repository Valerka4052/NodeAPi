const express = require('express');
const router = express.Router();
const { authentificate, validated, upload } = require('../../middlewares');
const { registerShema, updateSubscriptionSchema, emailShema } = require('../../models/user');
const { register, login, getCurrent, logout, updateSubscription, getAvatar, verifyEmail, resendVerifyEmail } = require('../../controllers/auth');

router.post('/register', validated(registerShema), register);
router.get('/verify/:verificationToken', verifyEmail);
router.post('/verify', validated(emailShema), resendVerifyEmail);
router.post('/login',validated(registerShema),login);
router.post('/logout',authentificate, logout);
router.get('/current', authentificate, getCurrent);
router.patch('/', authentificate, validated(updateSubscriptionSchema), updateSubscription);
router.patch('/avatars', authentificate, upload.single("avatar"), getAvatar);
module.exports = router;