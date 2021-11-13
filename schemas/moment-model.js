const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const momentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: [true, 'Title is required to proceed'],
    },
    tags: {
        type: [String],
    },
    imageUrl: {
        type: String
    }
},  { timestamps: true, versionKey: false })

module.exports = mongoose.model('Moment', momentSchema);
