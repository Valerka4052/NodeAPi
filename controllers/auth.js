const { User } = require('../models/user');
const { HttpError, funcWrapper, resizeAvatar, sendEmail } = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const path = require('path');
const gravatar = require('gravatar');
const shortid = require('shortid');
require('dotenv').config();
const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(email,{s: '250'});
    const user = await User.findOne({ email });
    if (user) throw HttpError(409, "Email in use");
    const hashPassword = await bcrypt.hash(password, 7);
    const verificationToken = shortid()
    const newUser = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
    const verifyEmail = { to: email, subject: "Verification", html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">click here to verify</a>` };
    await sendEmail(verifyEmail);
    res.status(201).json({
        user: {
        email: newUser.email,
        subscription: newUser.subscription
    }});
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, "Email or password is wrong");
    if (!user.verify) throw HttpError(404, 'User not found');
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
   await User.findOneAndUpdate(req.user._id, { token: "" });
    res.status(204).json()
};

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, req.body,{ new: true });
    res.json({ subscription: user.subscription });
};


const getAvatar = async (req, res) => {
    const { _id: id } = req.user;
    const { originalname } = req.file;
    const fileName = (id + originalname);
    const newPath = path.join(__dirname, '../', 'public', 'avatars');
    const uploadResult = path.join(newPath, fileName);
    await resizeAvatar(req.file.path);
    await fs.rename(req.file.path, uploadResult);
    const avatar = path.join('avatars', fileName);
    await User.findByIdAndUpdate(id, { avatarURL: avatar });
    res.status(200).json({ avatarURL: avatar });
};

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) throw HttpError(404, 'User not found');
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });
    res.status(200).json({ message: 'Verification successful' });
};
const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(404, 'User not found');
    if (user.verify) throw HttpError(400, "Verification has already been passed");
    const verifyEmail = { to: email, subject: "Verification", html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">click here to verify</a>` };
    await sendEmail(verifyEmail);
    res.status(200).json({ message: "Verification email send" });
};

module.exports = {
    register: funcWrapper(register),
    login: funcWrapper(login),
    getCurrent: funcWrapper(getCurrent),
    logout: funcWrapper(logout),
    updateSubscription: funcWrapper(updateSubscription),
    getAvatar: funcWrapper(getAvatar),
    verifyEmail: funcWrapper(verifyEmail),
    resendVerifyEmail: funcWrapper(resendVerifyEmail),
};