const mongoose = require("mongoose");

const securityLogSchema = new mongoose.Schema({

	    username: {
		            type: String,
		            default: "System"
		        },

	    event: {
		            type: String,
		            required: true
		        },

	    description: {
		            type: String,
		            required: true
		        },

	    ipAddress: {
		            type: String,
		            default: ""
		        }

}, {
	    timestamps: true
});

module.exports = mongoose.model(
	    "SecurityLog",
	    securityLogSchema
);
