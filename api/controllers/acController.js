'use strict'

var Critter = require('../models/Critter')

exports.getObtainableCritters = function(req, res) {
    Critter.getObtainable(function(err, critter) {
        console.log('controller')
        if (err) res.send(err)

        console.log('res', critter)
        res.json(critter)
    })
}

exports.getObtainableCrittersByType = function(req, res) {
    Critter.getObtainableByType(req.params.type, function(err, critter) {
        if (err) res.send(err)
        res.json(critter)
    })
}
