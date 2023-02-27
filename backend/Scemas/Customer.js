const mongoose = require('mongoose');



const customerScema = new mongoose.Schema({
   Special_id:{
        type:Number    
    },
    email: {
        type: String,
    },
     first_name: {
        type: String,
    },
     last_name: {
        type: String,
    }, 
    orders_count: {
        type: String,
    },
     phone: {
        type:Number,
    }, 
    created_at: {
        type: String,
    }
})



const Customer = mongoose.model('Customers', customerScema);

module.exports = Customer;