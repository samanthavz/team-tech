const mongoose = require('mongoose');
// const time = new Date();
// const timeNow = time.getHours() + `:` + (time.getMinutes()<10?'0':'') + time.getMinutes();
const msgSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    }
})

const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;