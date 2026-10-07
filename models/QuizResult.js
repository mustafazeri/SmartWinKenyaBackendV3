const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({

	    username: {
		            type: String,
		            required: true
		        },

	    stake: {
		            type: Number,
		            required: true
		        },

	    reward: {
		            type: Number,
		            default: 0
		        },

	    score: {
		            type: Number,
		            default: 0
		        },

	    status: {
		            type: String,
		            enum: ["won", "lost", "quit"],
		            required: true
		        },

	    finishedAt: {
		            type: Date,
		            default: Date.now
		        }

}, {
	    timestamps: true
});

module.exports = mongoose.model("QuizResult", quizResultSchema);
