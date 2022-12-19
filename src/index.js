require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/userShema");
const { dbConnection } = require("./config/db");
const app = express();

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
app.post("/users", (req, res) => {
  db.users.push(req.body);
  respApi(res, "Success", db.users);
});

// localhost:5000/address
app.post("/address", (req, res) => {
  db.address.push(req.body);
  respApi(res, "Success", db.address);
});

// localhost:5000/address
app.get("/address", (req, res) => {
  respApi(res, "Success", db.address);
});

// localhost:5000/address/1
app.put("/address/:id", (req, res) => {
  const found = db.address.find(
    (element) => parseInt(element.id) === parseInt(req.params.id)
  );
  if (!found) {
    respApiError(res, "El id no existe", 400);
  } else {
    db.address = db.address.map((element) => {
      if (parseInt(element.id) === parseInt(req.params.id)) {
        element.address = req.body.address;
      }
      return element;
    });
    respApi(res, "Success", db.address);
  }
});

// localhost:5000/users/1
app.put("/users/:id", (req, res) => {
  const found = db.users.find(
    (element) => parseInt(element.id) === parseInt(req.params.id)
  );
  if (!found) {
    respApiError(res, "El id no existe", 400);
  } else {
    db.users = db.users.map((element) => {
      if (parseInt(element.id) === parseInt(req.params.id)) {
        element.user_name = req.body.name;
      }
      return element;
    });
    respApi(res, "Success", db.users);
  }
});

// localhost:5000/users/1
app.delete("/users/:id", (req, res) => {
  const found = db.users.find(
    (element) => parseInt(element.id) === parseInt(req.params.id)
  );
  if (!found) {
    respApiError(res, "El id no existe", 400);
  } else {
    db.users = db.users.filter(
      (element) => parseInt(element.id) !== parseInt(req.params.id)
    );
    respApi(res, "Success", db.users);
  }
});

// localhost:5000/address/1
app.delete("/address/:id", (req, res) => {
  const found = db.address.find(
    (element) => parseInt(element.id) === parseInt(req.params.id)
  );
  if (!found) {
    respApiError(res, "El id no existe", 400);
  } else {
    db.address = db.address.filter(
      (element) => parseInt(element.id) !== parseInt(req.params.id)
    );
    respApi(res, "Success", db.address);
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
  console.log("\x1b[33m ************************\x1b[0m");
  console.log(`\x1b[33m ${msj}\x1b[0m`);
  console.log("\x1b[33m ************************\x1b[0m");
};
