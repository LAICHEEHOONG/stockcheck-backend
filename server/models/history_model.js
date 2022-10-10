const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    data: Object,
    date: String,
    time: Number
})



const History00 = mongoose.model('History00', historySchema);
const History01 = mongoose.model('History01', historySchema);
const History02 = mongoose.model('History02', historySchema);
const History03 = mongoose.model('History03', historySchema);
const History04 = mongoose.model('History04', historySchema);
const History05 = mongoose.model('History05', historySchema);
const History06 = mongoose.model('History06', historySchema);
const History07 = mongoose.model('History07', historySchema);
const History08 = mongoose.model('History08', historySchema);
const History09 = mongoose.model('History09', historySchema);







module.exports = { History00, History01, History02, History03, History04, History05, History06, History07, History08, History09 };