const express = require("express");

const OngControler = require("./controllers/OngController");
const IncidentControler = require("./controllers/IncidentController");
const ProfileControler = require("./controllers/ProfileController");
const SessionControler = require("./controllers/SessionController");

const routes = express.Router();

// Ongs routes
routes.get("/ongs", OngControler.index);
routes.post("/ongs", OngControler.create);

//Incidents routes
routes.get("/incidents", IncidentControler.index);
routes.post("/incidents", IncidentControler.create);
routes.delete("/incidents/:id", IncidentControler.destroy);

//Ong incidents routes
routes.get("/profile", ProfileControler.index);

//Login
routes.post("/sessions", SessionControler.create);

module.exports = routes;
