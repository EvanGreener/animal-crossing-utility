'user strict'
const sql = require('./db')

//Object definition
var Critter = function(crit) {
    this.name = crit.name
    this.type = crit.type
    this.imgSrc = crit.imgSrc
    this.price = crit.name
    this.location = crit.name
    this.start = crit.start
    this.end = crit.end
    this.jan = crit.jan
    this.feb = crit.feb
    this.mar = crit.mar
    this.apr = crit.apr
    this.may = crit.may
    this.jun = crit.jun
    this.jul = crit.jul
    this.aug = crit.aug
    this.sep = crit.sep
    this.oct = crit.oct
    this.nov = crit.nov
    this.dec = crit.dec
}

Critter.getObtainable = function(result) {
    num = new Date().getMonth()
    sql.query(
        `SELECT * FROM critters_north WHERE month${num} IS TRUE ORDER BY price DESC`,
        function(err, res) {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('tasks : ', res)

                result(null, res)
            }
        }
    )
}

Critter.getObtainableByType = function(type, result) {
    num = new Date().getMonth()
    sql.query(
        `SELECT * FROM critters_north WHERE type = ? AND month${num} IS TRUE ORDER BY price DESC`,
        type,
        function(err, res) {
            if (err) {
                console.log('error: ', err)
                result(null, err)
            } else {
                console.log('tasks : ', res)
                result(null, res)
            }
        }
    )
}

module.exports = Critter
