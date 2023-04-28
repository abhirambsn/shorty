const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

// Setup Routes Here
app.get('/health', (req, res) => res.status(200).json({status: 'ok'}))

const manageRoutes = require('./routes/manage')
const urlRoutes = require('./routes/url')

app.use('/api/v1/manage', manageRoutes)
app.use('', urlRoutes)

module.exports = app