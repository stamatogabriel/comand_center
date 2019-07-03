const routes = require('express').Router();

const AuthControler = require('./app/controllers/AuthController');
const CostCenterController = require('./app/controllers/CostCenterController');
const SmsController = require('./app/controllers/SmsController');

routes.post('/user', AuthControler.store);
routes.post('/auth', AuthControler.session);

routes.post('/cost_center', CostCenterController.store);
routes.get('/cost_center', CostCenterController.index);
routes.get('/cost_center/:id', CostCenterController.show);
routes.get('/cost_center/cod/:cod', CostCenterController.searchByCod);
routes.get('/cost_center/department/:department', CostCenterController.searchByDepartment);
routes.delete('/cost_center/:id', CostCenterController.destroy);

routes.post('/send_sms', SmsController.sendSms);

module.exports = routes;