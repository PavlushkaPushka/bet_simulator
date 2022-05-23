const Router = require('express')
const teamController = require('../controllers/teamController')

const router = new Router()

router.get('/', teamController.getTeam)

module.exports = router