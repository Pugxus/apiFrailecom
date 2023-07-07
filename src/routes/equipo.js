const express = require("express");
const router = express.Router();
const verifyToken = require("./validate_token")
const equipoSchema = require("../models/equipo");
const userSchema = require("../models/user");
//PENDIENTEEEEEEEEEEEEEE

//crear Equipo
router.post("/equipos", async (req, res) => {
    const equipo = equipoSchema(req.body);

    const idSupervisor = req.body.supervisor

    var asignadoSupervisor = false;
    const supervisorConsultado = userSchema.findOne({ _id: idSupervisor })
    if (supervisorConsultado) {
        asignadoSupervisor = supervisorConsultado.asignado;
        if (!asignadoSupervisor) {

            await userSchema.updateOne({ _id: idSupervisor }, {
                $set: {
                    asignado: true
                }
            });

            equipo.save()
                .then((data) => { res.json(data); })
                .catch((error) => { res.json({ message: error }); });

        } else {
            res.json({ message: "Supervisor ya cuenta con equipo asignado" });
        }
    }

});



//consultar usuario
router.get("/equipos", (req, res) => {
    equipoSchema.find().then((data) => res.json(data)).catch((error) => res.send(error))
});

//Eliminar equipo
router.delete("/equipos/:id", async (req, res) => {
    const { id } = req.params
    var agentes = null
    var supervisor = null

    await equipoSchema.findOne({ _id: id }).then((data) => {
        agentes = data.agentes
        supervisor = data.supervisor
    });

     agentes.forEach(async agente => {
        console.log(agente.toString())
        let idAgente = agente.toString()
        await userSchema.updateOne({ _id: idAgente },
            { $set: { asignado: false } })
    });

    await userSchema.updateOne({ _id: supervisor },
        { $set: { asignado: false } })

    await equipoSchema.findByIdAndDelete(id).then((data) => {
        res.json(data)
    }).catch((error) => {
        res.json({ message: error });
    })
})

//Editar equipo - agregar agentes
router.put("/equipos/:id", async (req, res) => {
    const { id } = req.params
    const idAgente = req.body.idAgente

    var asignadoAgente = false;
    const agenteConsultado = userSchema.findOne({ _id: idAgente })
    if (agenteConsultado) {
        asignadoAgente = agenteConsultado.asignado;
        if (!asignadoAgente) {

            await userSchema.updateOne({ _id: idAgente }, {
                $set: {
                    asignado: true
                }
            });

            await equipoSchema.updateOne(
                { _id: id },
                { $addToSet: { agentes: idAgente } }
            ).then((data) => {
                res.json(data);
            }).catch((error) => {
                res.json({ message: error });
            });
        } else {
            res.json({ message: "Agente ya cuenta con equipo asignado" });
        }
    }
});

module.exports = router;