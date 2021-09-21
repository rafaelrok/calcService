const express = require('express');
const routes = express.Router();
const path = require("path")

const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');
const LoginController = require('./controllers/LoginController');

const app = express();
/* 
 * convert direto o caminho especifico, porem com "ejs" não é preciso o base path
 * pois ja reconhece automaticamente a views
 * const  = __dirname'/views'
 * const views = __dirname + '/views/' Rota alternativa para viwes na src
*/

routes.get('/login', LoginController.index)
routes.get('/dashboard', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes;