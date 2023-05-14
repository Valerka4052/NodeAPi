const Jimp = require("jimp");
const  HttpError  = require('./HttpError');

const resizeAvatar = async (avatar) => {
    try {
        const img = await Jimp.read(avatar);
        return img.cover(250, 250).writeAsync(avatar);
    } catch (error) {
        HttpError(400, error.message);
    };
};

module.exports = resizeAvatar;
