const sequelize = require('../db')
const Model = require('../db')
const { DataTypes } = require('sequelize')

// information cascade
const Team = sequelize.define('team', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    logo: { type: DataTypes.STRING },
})

const Leage = sequelize.define('leage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    leage: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Season = sequelize.define('season', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    season: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Match = sequelize.define('match', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    match_id: { type: DataTypes.STRING, unique: true },
    linkToMatch: { type: DataTypes.STRING, unique: true, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    stage: { type: DataTypes.STRING },
    round: { type: DataTypes.STRING },

    homeCoeff: { type: DataTypes.ARRAY(DataTypes.DECIMAL) },
    awayCoeff: { type: DataTypes.ARRAY(DataTypes.DECIMAL) },
    drawCoeff: { type: DataTypes.ARRAY(DataTypes.DECIMAL) },

    home_mainGameScore: { type: DataTypes.STRING, allowNull: false },
    home_allGameScore: { type: DataTypes.STRING, allowNull: false },
    home_firstPeriodScore: { type: DataTypes.STRING, allowNull: false },
    home_secondPeriodScore: { type: DataTypes.STRING, allowNull: false },
    home_thirdPeriodScore: { type: DataTypes.STRING, allowNull: false },
    home_overTimeScore: { type: DataTypes.STRING },
    home_bullitTimeScore: { type: DataTypes.STRING },

    away_mainGameScore: { type: DataTypes.STRING, allowNull: false },
    away_allGameScore: { type: DataTypes.STRING, allowNull: false },
    away_firstPeriodScore: { type: DataTypes.STRING, allowNull: false },
    away_secondPeriodScore: { type: DataTypes.STRING, allowNull: false },
    away_thirdPeriodScore: { type: DataTypes.STRING, allowNull: false },
    away_overTimeScore: { type: DataTypes.STRING },
    away_bullitTimeScore: { type: DataTypes.STRING },

})

const Event = sequelize.define('event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

Leage.hasMany(Match)
Match.belongsTo(Leage)

Leage.hasMany(Team)
Team.belongsTo(Leage)

Season.hasMany(Match)
Match.belongsTo(Season)

Team.hasOne(Match, { as: 'HomeTeam', foreignKey: 'homeTeamId' });
Team.hasOne(Match, { as: 'AwayTeam', foreignKey: 'awayTeamId' });











module.exports = {
    Team,
    Leage,
    Season,
    Match,
    Event,
}