const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

console.log(process.env.mongodb)
mongoose.connect(process.env.mongodb);

const database = mongoose.connection;
database.once('connected', ()=>{
    console.log("Connected to the DB!");
})
// npm install mongoose
// npm install dotenv