const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require("../schemas/user-model");
const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
    return jwt.sign({ _id: user._id, email: user.email }, "mean_jwtPrivateKey", {expiresIn: '24hr'});
};

exports.addUser = (userDetails) => {
    return new Promise((resolve, reject) => {
        const saltRounds = 10;
        User.findOne({ email: userDetails.email }).then(user => {
            if (user) {
                reject({status: 'failed', message: 'Account already registered'})
            } else {
                bcrypt.hash(userDetails.password, saltRounds, (errorMsg, hash) => {
                    if (errorMsg) {
                        reject({status: 'failed', message: 'Error in creating hash using bCrypt'});
                    } else {
                        userDetails.password = hash;
                        User.create(userDetails)
                            .then(res => {
                                const token = generateAuthToken({_id: res._id, email: res.email});
                                resolve({status: 'success', user: res, token: token})
                            });
                    }
                });
            }
        })
    });
};

exports.loginUser = (data) => {
    return new Promise((resolve, reject) => {
        let query = {'email': {'$regex' : data.email, '$options': 'i'}};
        User.find(query, {'email': 1, 'password': 1}, ((error, result) => {
            if (error) {
                reject(error);
            } else if (result.length > 0) {
                if (result[0].password) {
                    bcrypt.compare(data.password, result[0].password, (err, isSame) => {
                        if (err) {
                            reject({status: 'failed', message: 'Error in creating hash using bCrypt'})
                        } else {
                            if (isSame) {
                                const token = generateAuthToken({_id: result[0]._id, email: result[0].email});
                                resolve({status: 'success', user: result[0], token: token})
                            } else {
                                reject({status: 'failed', message: 'Invalid Credentials'})
                            }
                        }
                    });
                }
            }
        }))
    })
}
