const ApiError = require("../error/ApiError")
const { Season } = require("../models/models")

class SeasonController {


    async getSeason(req, res) {

        const { id, season } = req.query

        if (season) {

            const result = await Season.findOne({
                where: { season }
            })

            return res.json(result)

        } else if (id) {

            const result = await Season.findOne({
                where: { id }
            })

            return res.json(result)

        } else {

            const result = await Season.findAll()
            return res.json(result)

        }
    }



}


module.exports = new SeasonController()