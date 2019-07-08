const routes = require('express').Router();

const AuthControler = require('./app/controllers/AuthController');
const CostCenterController = require('./app/controllers/CostCenterController');
const SmsController = require('./app/controllers/SmsController');
const EmailController = require('./app/controllers/EmailController');
const BillController = require('./app/controllers/BillController');

const AuthMiddleware = require('./app/middlewares/auth');

routes.post('/auth', AuthControler.session);

routes.use(AuthMiddleware);

routes.post('/user', AuthControler.store);
routes.post('/cost_center', CostCenterController.store);
routes.get('/cost_center', CostCenterController.index);
routes.get('/cost_center/:id', CostCenterController.show);
routes.get('/cost_center/cod/:cod', CostCenterController.searchByCod);
routes.get('/cost_center/department/:department', CostCenterController.searchByDepartment);
routes.delete('/cost_center/:id', CostCenterController.destroy);

routes.post('/send_sms', SmsController.sendSms);
routes.get('/sms/date', SmsController.searchForDate);
routes.get('/sms/:id', SmsController.showById);

routes.post('/send_email', EmailController.sendEmail);
routes.get('/email/date', EmailController.searchForDate);
routes.get('/email/:id', EmailController.showById);

routes.get('/billing', BillController.calculate);

module.exports = routes;