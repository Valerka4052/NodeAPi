const app = require('./app');

const mongoose = require('mongoose');
<<<<<<< Updated upstream
// const DB_HOST = "mongodb+srv://Valerij:yYyX7ophSwjPTr40@cluster0.ibb8iqz.mongodb.net/db_contacts?retryWrites=true&w=majority";
const { DB_HOST, PORT = 300 } = process.env;


mongoose.connect(DB_HOST).then(()=>{app.listen(3001);console.log("Database connection successful");}).catch(e => { console.log(e.message); process.exit(1) });
=======
// const DB_HOST = "mongodb+srv://Valerij:yYyX7ophSwjPTr40@cluster0.ibb8iqz.mongodb.net/contacts_reader?retryWrites=true&w=majority";
// const PORT = 3000
const { PORT = 3000, DB_HOST } = process.env;
mongoose.connect(DB_HOST).then(()=>{console.log("Database connection successful"); app.listen(PORT)}).catch(e => { console.log(e.message); process.exit(1) });
// app.listen(3001, console.log('server running on port 3000'));
>>>>>>> Stashed changes
