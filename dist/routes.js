"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _LinhaController = require('./app/controllers/LinhaController'); var _LinhaController2 = _interopRequireDefault(_LinhaController);
var _LinhasVivoController = require('./app/controllers/LinhasVivoController'); var _LinhasVivoController2 = _interopRequireDefault(_LinhasVivoController);
var _LinhasOiController = require('./app/controllers/LinhasOiController'); var _LinhasOiController2 = _interopRequireDefault(_LinhasOiController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();

routes.post('/users', _UserController2.default.store);
routes.post('/sessions', _SessionController2.default.store);

routes.use(_auth2.default);

routes.put('/users', _UserController2.default.update);
routes.post('/linhas', _LinhaController2.default.store);
routes.get('/linhas', _LinhaController2.default.index);
routes.put('/linhas/:id', _LinhaController2.default.update);
routes.delete('/linhas/:id', _LinhaController2.default.delete);

routes.get('/linhas/vivo', _LinhasVivoController2.default.index);
routes.get('/linhas/oi', _LinhasOiController2.default.index);

exports. default = routes;
