const mongoose = require("mongoose")
const equipoSchema = mongoose.Schema({
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requiered: true
    },
    agentes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requiered: false
    }]
})

module.exports = mongoose.model("Equipo", equipoSchema)