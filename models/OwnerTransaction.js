const mongoose = require("mongoose");

const ownerTransactionSchema = new mongoose.Schema({

	    type: {
		            type: String,
		            required: true
		        },

	    username: {
		            type: String,
		            default: ""
		        },

	    amount: {
		            type: Number,
		            required: true
		        },

	    description: {
		            type: String,
		            default: ""
		        },

	    status: {
		            type: String,
		            default: "Completed"
		        }

}, {
	    timestamps: true
});


module.exports = mongoose.model(
	    "OwnerTransaction",
	    ownerTransactionSchema
);
