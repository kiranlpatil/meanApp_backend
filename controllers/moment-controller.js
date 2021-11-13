const momentService = require('../services/moment.service')
const UtilityService = require("../services/utility.service");


exports.addMoment = (req, res) => {
    momentService.addNewMoment(req.body, req.user._id)
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.send(error)
        })
}

exports.updateMoment = (req, res) => {
    momentService.updateMoment(req.params.id, req.body)
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.send(error)
        })
}

exports.deleteMoment = (req, res) => {
    momentService.deleteMoment(req.params.id)
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.send(error)
        })
}

exports.getMoments = (req, res) => {
    momentService.getMoment(req.params.size, req.params.page, req.user._id)
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.send(error)
        })
}

