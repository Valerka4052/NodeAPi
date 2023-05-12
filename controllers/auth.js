const { User } = require('../models/user');
const { HttpError, funcWrapper } = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) throw HttpError(409, "Email in use");
    const hashPassword = await bcrypt.hash(password, 7);
    const newUser = await User.create({ email, password: hashPassword });
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, "Email or password is wrong");
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) throw HttpError(401, "Email or password is wrong");
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
};

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
};

const logout = async (req, res) => {
    User.findByIdAndUpdate(req.user._id, { token: '' });
    res.status(204);
};

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const user = await User.findOneAndUpdate(_id, req.body,{ new: true });
    res.json({ subscription: user.subscription });
};

module.exports = {
    register: funcWrapper(register),
    login: funcWrapper(login),
    getCurrent: funcWrapper(getCurrent),
    logout: funcWrapper(logout),
    updateSubscription:funcWrapper(updateSubscription),
};