const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    clave: {
        type: String,
        required: true
    },
    cc: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    vhur: {
        type: Number,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    fecha_vinculacion: {
        type: Date,
        required: true
    },
    rol: {
        type: Number, //1 Supervisor - 2 Agente - 3 Administrador
        required: true
    },
    asignado: {
        type: Boolean, 
        required: false
    }
});

userSchema.methods.encryptClave = async (clave) => {
    console.log("El modelo usuario ", clave)
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(clave, salt);
};

module.exports = mongoose.model("User", userSchema);