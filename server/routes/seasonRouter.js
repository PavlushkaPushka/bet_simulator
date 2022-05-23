const Router = require('express')
const seasonController = require('../controllers/seasonController')

const router = new Router()

router.get('/', seasonController.getSeason)

module.exports = router