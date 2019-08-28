var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistaSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
});


module.exports = mongoose.model('Artista', artistaSchema);