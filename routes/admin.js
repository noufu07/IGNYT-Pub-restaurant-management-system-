const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import Order model

// Admin login route
router.get('/', function(req, res, next) {
  res.render('admin-login', { title: 'Admin Login' });
});

// Hardcoded admin credentials
const adminUsername = 'Admin';
const adminPassword = 'admin@123';

// Admin login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Compare provided username and password with hardcoded values
  if (username === adminUsername && password === adminPassword) {
    try {
      // Fetch all orders from the database
      const orders = await Order.find();

            // Calculate total amount for each order
    orders.forEach(order => {
        order.totalAmount = order.foodPrice * order.plates;
      });




      // Render admin-orders view with orders data
      res.render('Admin-orders', { title: 'Admin Orders', orders: orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Admin authentication failed
    res.status(401).json({ message: 'Invalid username or password' });
  }
});






// router.get('/', async function(req, res, next) {
//     try {
//         const orders = await Order.find();
//         res.render('admin-orders', { title: 'Admin Orders', orders: orders });
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// Route to mark an order as done
router.post('/orders/:orderId/done', async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = true; // Set status to true
        await order.save();
        res.status(200).json({ message: 'Order marked as done' });
    } catch (error) {
        console.error('Error marking order as done:', error);
        res.status(500).json({ message: 'Failed to mark order as done' });
    }
});

// Route to clear all orders
router.post('/orders/clear', async (req, res) => {
    try {
      // Delete all orders from the database
      await Order.deleteMany({});
      res.status(200).send('All orders cleared successfully');
    } catch (error) {
      console.error('Error clearing orders:', error);
      res.status(500).send('An error occurred while clearing orders');
    }
  });
module.exports = router;
