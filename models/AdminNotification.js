const mongoose = require("mongoose");

const adminNotificationSchema = new mongoose.Schema({

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
		        },

	    readAt: {
		            type: Date,
		            default: null
		        }

}, {
	    timestamps: true
});

module.exports = mongoose.model(
	    "AdminNotification",
	    adminNotificationSchema
);
