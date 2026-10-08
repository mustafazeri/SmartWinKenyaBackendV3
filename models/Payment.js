const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
	  username: {
		      type: String,
		      required: true
		    },
	  phone: {
		      type: String,
		      required: true
		    },
	  checkoutRequestID: {
		      type: String,
		      required: true,
		      unique: true
		    },
	  amount: {
		      type: Number,
		      required: true
		    },
	  status: {
		      type: String,
		      default: "Pending"
		    }
}, {
	  timestamps: true
});

module.exports = mongoose.model("Payment", paymentSchema);
