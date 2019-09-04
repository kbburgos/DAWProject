const { model, Schema } = require("mongoose");
const Examen = new Schema({
    nota: String,
    cedula: String,
    imageURL: String,
    public_id: String,
    fecha: Date,
    paciente:String
});
module.exports = model("examenes",Examen);