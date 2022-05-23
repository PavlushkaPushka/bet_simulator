const ApiError = require('../error/ApiError')
const { Team, Match } = require('../models/models')
const { bSearchForSortNumbMsv, compareNumeric } = require('./../auxiliary/src')

async function defineTeams(seasonId, leageId) {
    const settings = {}

    if (seasonId !== undefined) {
        settings.seasonId = seasonId
    }
    if (leageId !== undefined) {
        settings.leageId = leageId
    }

    const result = await Match.findAll({
        where: settings
    })

    const teams = []

    teams.__proto__.bSearchForSortNumbMsv = bSearchForSortNumbMsv

    result.map(elem => {
        const { homeTeamId, awayTeamId } = elem.dataValues

        !teams.bSearchForSortNumbMsv(homeTeamId) ? teams.push(homeTeamId) : !teams.bSearchForSortNumbMsv(awayTeamId) ? teams.push(awayTeamId) : 0
        teams.sort(compareNumeric)
    })

    return teams
}

class TeamController {

    async getTeam(req, res) {

        const { id, name, leageId, seasonId } = req.query
        let { limit, page } = req.body
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        if (id) {

            const result = await Team.findOne({
                where: { id }
            })

            return res.json(result)
        }

        if (name) {

            const result = await Team.findOne({

                where: { name }

            })

            return res.json(result)
        }

        if (leageId || seasonId || (leageId && seasonId)) {


            const definedTeams = await defineTeams(seasonId, leageId)

            const result = await Team.findAndCountAll({ where: { id: definedTeams }, limit, offset })

            if (result.length == 0) {

                return res.json(ApiError.badRequest('this team is not exist'))

            }

            return res.json(result)

        } else {
            const result = await Team.findAndCountAll({ limit, offset })
            return res.json(result)
        }
    }


}


module.exports = new TeamController()