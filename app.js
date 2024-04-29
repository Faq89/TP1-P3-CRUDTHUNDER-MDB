const express = require('express');
const dbconnect = require('./config');
const ModelUser = require('./userModel');
const app = express();

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelUser.create(body)
        res.send(body)
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).send("Error al crear usuario");
    }
});

router.get("/", async (req, res) => {
    try {
        const respuesta = await ModelUser.find({})
        res.send(respuesta)
    } catch (error) {
        console.error("Error al traer usuarios:", error);
        res.status(500).send("Error al traer usuarios");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelUser.findById(id)
        res.send(respuesta)
    } catch (error) {
        console.error("Error al buscar usuario por id:", error);
        res.status(500).send("Error al buscar usuario por id");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelUser.findByIdAndUpdate(id, body, { new: true }); // Añadir { new: true } para devolver el documento actualizado
        res.send(respuesta);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).send("Error al actualizar usuario");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelUser.deleteOne({ _id: id })
        res.send(respuesta)
    } catch (error) {
        console.error("No se pudo eliminar usuario:", error);
        res.status(500).send("No se pudo eliminar usuario");
    }
});

app.use(express.json());
app.use(router);


app.listen(3001, () => {
    console.log("El servidor está escuchando en el puerto 3001");
})
dbconnect();