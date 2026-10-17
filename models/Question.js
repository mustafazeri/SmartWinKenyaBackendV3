const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

	    category: {
		            type: String,
		            required: true
		        },

	    question: {
		            type: String,
		            required: true
		        },

	    options: {
		            type: [String],
		            required: true,
		            validate: v => v.length === 4
		        },

	    answer: {
		            type: Number,
		            required: true
		        },

	    difficulty: {
		        type: String,
		    default: "Medium"
	    },

	source: {
		    type: String,
		    default: "Manual"
	},

	createdByAI: {
		    type: Boolean,
		    default: false
	}

}, {
	    timestamps: true
});

module.exports = mongoose.model("Question", questionSchema);
