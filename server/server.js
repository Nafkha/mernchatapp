const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const passport = require('passport')


const app = express()
app.use(express.json());

const config = require('config')
const db = config.get('mongoURI');

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() =>  console.log("Database CONNECTED")).catch(() => console.log("Database ERROR"))

app.use(passport.initialize())
require('./config/passport')(passport)

const port = process.env.port || 5000;

app.listen(port, () => console.log("127.0.0.1:"+port+" Connected")) 

app.use('/api/users',users)