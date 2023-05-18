const nodemailer = require("nodemailer");
require('dotenv').config();
const { META_PASS } = process.env;

const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    pool: true,
    secure: true,
    auth: {
        user: "valerka4052@ukr.net",
        pass:  META_PASS,
    },
});

const sendEmail = async (data) => {
    const email = { ...data, from: "valerka4052@ukr.net" };
    try {
        await transporter.sendMail(email)
        console.log('sucsess');
        } catch (error) {
        console.log(error)
    };
};
module.exports = sendEmail;




    // const email = { ...data, from: "valerka4052@meta.ua" };
    // transporter.sendMail(email).then(() => {
    //     console.log('sucsess');
    // }).catch(e => console.log(e));