var express = require('express');
var router = express.Router();
const Order = require('../models/Order'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lager', { title: 'Express' });
});

// Handle form submission
router.post('/submit-order', async (req, res) => {
  console.log(req.body);

  try {
    const { foodName, foodPrice, name, phone, table, plates } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      foodName,
      foodPrice,
      name,
      phone,
      table,
      plates
    });
    // Save the order to the database
    await newOrder.save();

    res.status(201).send('Order submitted successfully');
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting order');
  }
});



module.exports = router;
