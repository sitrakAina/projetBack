const PORT = process.env.PORT || 8090;
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Conf = require('./Config/db.js')
const mongoose = require('mongoose')
const r = require('./routes/route')
const cors= require('cors')
const fileUpload = require('express-fileupload')

app.use(cors())
app.use(methodOverride('X-HTTP-Method')) 
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('X-Method-Override'))
app.use(methodOverride('_method'))
app.use(cors())
app.use(fileUpload())
app.use('/public', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/',r)

mongoose.Promise = global.Promise

// Connecting to the database
mongoose.connect(Conf.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database")    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})

app.use('/',r)
app.listen(PORT);