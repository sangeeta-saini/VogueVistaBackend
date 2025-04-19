const mongoose = require('mongoose');
const schema = mongoose.Schema;

const placeorderSchema = new schema({
    
    productid:{
        type: String,
    },
    
    
    userid:{
        type:String,
    },
     
    address:{
        id: UUID,
        userId: UUID,
        fullName: String,
        street: String,
        city: String,
        state: String,
        pinCode: String,
        country: String,
        phone: Number,
        },

        deliverestimates:{
            date: String,
        },

        pricedetails:{
            bagTotal: Number,
            discounts: Number,
            shippingCharges: Number,
            totalAmount: Number,
          },

          
})

module.exports = placeorderSchema