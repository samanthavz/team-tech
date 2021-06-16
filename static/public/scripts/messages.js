const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    timeNow: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

const Msg = mongoose.model('msg',  msgSchema);
module.exports = Msg;