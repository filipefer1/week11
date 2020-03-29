const express = require("express");
const {celebrate, Segments, Joi} = require('celebrate');

const OngControler = require("./controllers/OngController");
const IncidentControler = require("./controllers/IncidentController");
const ProfileControler = require("./controllers/ProfileController");
const SessionControler = require("./controllers/SessionController");

const routes = express.Router();

// Ongs routes
routes.get("/ongs", OngControler.index);
routes.post("/ongs", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}) ,OngControler.create);

//Incidents routes
routes.get("/incidents", celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}) ,IncidentControler.index);
routes.post("/incidents", IncidentControler.create);
routes.delete("/incidents/:id", celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}) ,IncidentControler.destroy);

//Ong incidents routes
routes.get("/profile", celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}) ,ProfileControler.index);

//Login
routes.post("/sessions", SessionControler.create);

module.exports = routes;
