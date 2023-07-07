const mongoose = require("mongoose")
const turnoSchema = mongoose.Schema({
    hora_inicio: {
        type: Date,
        requiered: true
    },
    hora_fin: {
        type: Date,
        requiered: true
    },
    hora_inicio_real: {
        type: Date,
        requiered: false
    },
    hora_fin_real: {
        type: Date,
        requiered: false
    },
    duracion_turno: {
        type: Date,
        requiered: false
    },
    duracion_real: {
        type: Date,
        requiered: false
    },
    calculo_diferencia: {
        type: Date,
        requiered: false
    },
    agente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requiered: true
    }
});

module.exports = mongoose.model("Turno", turnoSchema)