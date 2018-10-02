var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var heroSchema = new Schema({
    id: Number,
    name: String
});

module.exports = mongoose.model('hero', heroSchema);