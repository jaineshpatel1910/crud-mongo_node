const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/database')
const mongoose = require('mongoose')
const UserRoutes = require('./app/routes/routes')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected successfully')
}).catch(err => {
    console.log('Could not connect to the database ', err);
});

app.use('/user', UserRoutes)

app.get('/', (req, res) => {
    res.json({ "message": "Hello! WELCOME" })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})