require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/userShema");
const { dbConnection } = require("./config/db");
const app = express();
// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
dbConnection();
let db = require("./database/db");
// Levanto el servidor
app.listen(process.env.PORT, () => {
  console.log("\x1b[34m ******************************************* \x1b[0m");
  console.log(
    `\x1b[34m **  Se levanta la API en el puerto ${process.env.PORT}  ** \x1b[0m`
  );
  console.log("\x1b[34m ******************************************* \x1b[0m");
});

// localhost:5000
// localhost:5000/
app.get("/", (req, res) => {
  res.send("Hola estan en mi api");
});

// localhost:5000/users
app.get("/users", async (req, res) => {
  try {
    msgFormatCons("Lista de usuarios");
    const users = await User.find({});
    respApi(res, "Success", users);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
});

// localhost:5000/users
app.post("/users", async (req, res) => {
  try {
    msgFormatCons("Creación de usuario");
    db.users.push(req.body);
    const user = await User.create(req.body);
    respApi(res, "Success", user);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
});

// localhost:5000/users/1
app.put("/users/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    msgFormatCons("Actualización de usuario");
    const newUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    respApi(res, "Success", newUpdate);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al actualizar el usuario",
    });
  }
});

// localhost:5000/users/1
app.delete("/users/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    msgFormatCons("Eliminar usuario");
    const newUpdate = await User.findByIdAndRemove({ _id: req.params.id });
    respApi(res, "Success", newUpdate);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al actualizar el usuario",
    });
  }
});

// Funcion general para la parte de respuesta
const respApi = (res, msg, data) => {
  res.json({
    msg: msg,
    total: data.length,
    data: data,
  });
};

// Funcion general para la parte de respuesta
const respApiError = (res, msg, status) => {
  res.status(status).json({
    msg: msg,
  });
};

const msgFormatCons = (msj) => {
  console.log(`\x1b[33m ${msj}\x1b[0m`);
};
