const parser = require('body-parser')
const express = require('express')
const app = express()
const port = 5000
//const agenteRoutes = require('./routes/agente')
const userRoutes = require('./routes/user')
const equipoRoutes = require('./routes/equipo')
const turnoRoutes = require('./routes/turnos')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.use('/api', equipoRoutes);
app.use('/api', userRoutes);
app.use('/api', turnoRoutes);
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hola mundo")
})

//Conexión
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Conexión Exitosa")).catch((error) => console.log(error));

app.listen(port, () => { console.log("La apliación se está ejecutando en el puerto " + `${port}`) });