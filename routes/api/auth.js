const express = require('express');
const router = express.Router();
const { authentificate, validated, upload } = require('../../middlewares');
const { registerShema, updateSubscriptionSchema } = require('../../models/user');
const { register, login, getCurrent, logout, updateSubscription,getAvatar } = require('../../controllers/auth');

router.post('/register',validated(registerShema),register);
router.post('/login',validated(registerShema),login);
router.post('/logout',authentificate, logout);
router.get('/current', authentificate, getCurrent);
router.patch('/', authentificate, validated(updateSubscriptionSchema), updateSubscription);
router.patch('/avatars', authentificate, upload.single("avatar"), getAvatar);
module.exports = router;