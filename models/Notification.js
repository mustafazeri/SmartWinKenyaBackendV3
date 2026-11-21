const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

	    username: {
		            type: String,
		            required: true
		        },

	    title: {
		            type: String,
		            required: true
		        },

	    message: {
		            type: String,
		            required: true
		        },

	    type: {
		            type: String,
		            default: "general"
		        },

	    action: {
		            type: String,
		            default: "home"
		        },

	    read: {
		            type: Boolean,
		            default: false
		        }

}, {
	    timestamps: true
});

module.exports =
	mongoose.model("Notification", notificationSchema);
