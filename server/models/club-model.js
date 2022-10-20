const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClubSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    description: {type: String, required: true},
    members: {type: [{username: {type: String, required: true}, counter: {type: Number, required: true}}], required: true, default: []},
    subscribers: {type: [{username: {type: String, required: true}, counter: {type: Number, required: true}}], required: true, default: []},
    admins: {type: [String], required: true},
    links: {type: [String], required: true, default: []},
    times: {type: [String], required: true},
    location: {type: String, required: true}
}, 
{timestamps: true})

module.exports = mongoose.model('Club', ClubSchema);