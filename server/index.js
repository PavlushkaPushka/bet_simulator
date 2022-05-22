require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models.js')
const cors = require('cors') // what is cors ??
// const router = require('./routes/index')
// const errorHandler = require('./middleWare/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')
const defaultData = require('./data/defaultData')


const PORT = process.env.PORT || 3001


const app = express()
app.use(cors())     // что бы отпралвлять запросы с браузера
app.use(express.json())     // что бы сервер мог парсить json
// app.use(express.static(path.resolve(__dirname, 'data', 'logo')))
// app.use(fileUpload({}))
// app.use('/api', router)


// app.use(errorHandler) // мидлвэйр который пробрасывает ошибки должен идти в самом конце

app.get('/', (req, res) => {
    res.status(200).json({ message: 'all is working' })
})


const start = async () => {
    try {

        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })

        const def = await defaultData.createAndCheckData()

    } catch (e) {
        console.log(e)
    }
}

start()


