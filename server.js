const app = require('./app');

const mongoose = require('mongoose');
// const DB_HOST = "mongodb+srv://Valerij:yYyX7ophSwjPTr40@cluster0.ibb8iqz.mongodb.net/db_contacts?retryWrites=true&w=majority";
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST).then(()=>{app.listen(PORT);console.log("Database connection successful")}).catch(e => { console.log(e.message); process.exit(1) });
