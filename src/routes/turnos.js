const express = require("express");
const router = express.Router();
const verifyToken = require("./validate_token")
const turnoSchema = require("../models/turno")

//Crear
router.post("/turnos", (req, res) => {
    const turno = turnoSchema({
        hora_inicio: req.body.hora_inicio,
        hora_fin: req.body.hora_fin,
        agente: req.body.agente,
    });

    turno.save().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ message: error });
    });
});

//Consultar
router.get("/turnos", (req, res) => {
    turnoSchema.find().then((data) => res.json(data)).catch((error) => res.send(error))
})

//Eliminar
router.delete("/turnos/:id", (req, res) => {
    const { id } = req.params
    turnoSchema.findByIdAndDelete(id).then((data) => {
        res.json(data)
    }).catch((error) => {
        res.json({ message: error });
    });
})
module.exports = router;