const app = require('./app');

const mongoose = require('mongoose');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST).then(()=>{app.listen(3001);console.log("Database connection successful")}).catch(e => { console.log(e.message); process.exit(1) });
