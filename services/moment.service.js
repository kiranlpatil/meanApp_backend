const Moment = require("../schemas/moment-model");

exports.addNewMoment = (moment, userId) => {
    return new Promise((resolve, reject) => {
        delete moment._id
        moment.userId = userId;
        let query = {'userId': userId.toString() , 'title': moment.title};
        Moment.findOne(query, {'title': 1})
            .then(user => {
                if (user) {
                    reject({status: 'failed', message: 'Moment with same title is already added'})
                } else {
                    Moment.create(moment)
                        .then(result => {
                            resolve({status: 'success', data: result})
                        })
                        .catch(error => {
                            reject(error)
                        })
                }
            })
    })
}

exports.updateMoment = (momentId, moment) => {
    return new Promise((resolve, reject) => {
        Moment.findByIdAndUpdate(momentId, moment)
            .then((result) => resolve({status: 'success', data: result}))
            .catch((error) => reject(error))
    })
}

exports.deleteMoment = (momentId) => {
    return new Promise((resolve, reject) => {
        Moment.deleteOne({'_id': momentId.toString()})
            .then(() => resolve({status: 'success', message: 'Deleted Moment'}))
            .catch((error) => reject(error))
    })
}

exports.getMoment = (size, page, userId) => {
    return new Promise((resolve, reject) => {
        let query = {'userId': userId.toString()};
        let options = { skip: (page * size), limit: Number(size), sort: { createdAt: -1 } };
        Moment.countDocuments({})
            .then(count => {
            Moment.find(query, null, options, ((error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve({status: 'success', count: count, data: result})
                }
            }));
        })
    })
}
