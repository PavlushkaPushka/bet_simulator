const Router = require('express')
// const leageRouter = require('./leageRouter')
// const matchRouter = require('./matchRouter')
// const seasonRouter = require('./seasonRouter')
const teamRouter = require('./teamRouter')


const router = new Router()


// router.use('/leage', leageRouter)
// router.use('/match', matchRouter)
// router.use('/season', seasonRouter)
router.use('/team', teamRouter)



module.exports = router