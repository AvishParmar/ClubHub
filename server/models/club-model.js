const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClubSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    description: {type: String, required: true},
    members: {type: [{username: {type: String, required: true}, counter: {type: Number, required: true}}], required: true},
    subscribers: {type: [{username: {type: String, required: true}, counter: {type: Number, required: true}}], required: true},
    admins: {type: [String], required: true},
    links: {type: [String], required: false},
    times: {type: [String], required: true},
    location: {type: String, required: true}
}, 
{timestamps: true})