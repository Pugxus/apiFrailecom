const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router();
const userSchema = require("../models/user");


//Registro usuario
router.post("/signup", async (req, res) => {
console.log("Entrando a Signup")
    //bsucando usuario x correo
    const userFound = await userSchema.findOne({ correo: req.body.correo });

    //validar user
    if (userFound) return res.status(400).json({ error: "Un usuario con ese correo que ya existe" });

    const user = userSchema({
        usuario: req.body.usuario,
        correo: req.body.correo,
        clave: req.body.clave,
        cc: req.body.cc,
        nombre: req.body.nombre,
        vhur: req.body.vhur,
        telefono: req.body.telefono,
        sexo: req.body.sexo,
        fecha_vinculacion: new Date(req.body.fecha_vinculacion),
        rol: req.body.rol
    });
 console.log("Antes de encrypt")
    user.clave = await user.encryptClave(user.clave);
    console.log("Antes de save")
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 });

    res.json({
        auth: true,
        token
    })
});

//Inicio de sesiòn
router.post("/login", async (req, res) => {
    const { error } = userSchema.validate(req.body.correo, req.body.clave);
    if (error) return res.status(400).json({ error: error.details[0].message });

    //bsucando usuario x correo
    const user = await userSchema.findOne({ correo: req.body.correo });

    //validar user
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    //validar pass
    const validPassword = await bcrypt.compare(req.body.clave, user.clave)
    console.log(req.body.clave)
    console.log(user.clave)
    console.log(validPassword)
    if (!validPassword) return res.status(400).json({ error: "Contraseña incorrecta" });

    res.json({
        error: null,
        user,
    });
});

//consultar usuario
router.get("/users", (req, res) => {
    userSchema.find().then((data) => res.json(data)).catch((error) => res.send(error))
});

//Eliminar usuario x ID
router.delete("/users/:id", (req, res) => {
    const { id } = req.params
    userSchema.findByIdAndDelete(id).then((data) => {
        res.json(data)
    }).catch((error) => {
        res.json({ message: error });
    });
})

//Editar usuario
router.put("/users/:id", (req, res) => {
    const { id } = req.params
    const { asignado } = req.body
    userSchema.updateOne({ _id: id }, {
        $set: {
            asignado
        }
    }).then((data) => {
        res.json(data)
    }).catch((error) => {
        res.json({ message: error });
    });
});

module.exports = router;