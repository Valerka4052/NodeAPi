const express = require('express');
const router = express.Router();
const {  authentificate,validated } = require('../../middlewares');
const { registerShema,updateSubscriptionSchema } = require('../../models/user');
const { register, login, getCurrent, logout, updateSubscription } = require('../../controllers/auth');


router.post('/register',validated(registerShema),register);
router.post('/login',validated(registerShema),login);
router.post('/logout',authentificate, logout);
router.get('/current', authentificate, getCurrent);
router.patch('/', authentificate, validated(updateSubscriptionSchema), updateSubscription);

module.exports = router;