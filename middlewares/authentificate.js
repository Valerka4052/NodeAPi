const jwt = require('jsonwebtoken');
const { HttpError } = require("../helpers");
const { User } = require("../models/user")

require('dotenv').config();
const { SECRET_KEY } = process.env;

const authentificate = async(req,res,next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ")
    if (bearer !== 'Bearer') next(HttpError(401,"Not authorized"));
       try {
           const { id } = jwt.verify(token, SECRET_KEY);
        if (!id) next(HttpError(401,"Not authorized"));
        const user = await User.findById(id);
           if (!user) next(HttpError(401, "Not authorized"));
           req.user = user;
        next()
    } catch (error) {
        next(HttpError(401))
    }
};

module.exports = authentificate;