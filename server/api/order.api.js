/**
 * @author Jake Hewitt
 * Description:
 */

var auth = require('../config/auth');
var orders = require('../controllers/order.controller');

module.exports = function (app) {
    app.get('/api/orders', orders.getOrders);
    // Order Crud
    app.get('/api/orders/:id', orders.getOrderById);
    app.get('/api/users/:id/orders', orders.getUserOrders);
    app.post('/api/users/:id/orders', orders.createOrder);
    app.put('/api/users/:id/orders', orders.updateOrder);
    app.delete('/api/drones/:id', orders.deleteOrder);

};
