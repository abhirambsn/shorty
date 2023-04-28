const express = require('express')
const {
    routeToUrl
} = require('../controllers/url')

const router = express.Router()

router.get('/:url_id', routeToUrl)

module.exports = router