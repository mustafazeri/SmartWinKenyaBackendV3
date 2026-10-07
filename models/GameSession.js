const mongoose = require("mongoose");

const gameSessionSchema = new mongoose.Schema({

	    username: String,

	    stake: Number,

	    reward: Number,

	    questions: [{
		            type: mongoose.Schema.Types.ObjectId,
		            ref: "Question"
		        }],

	    currentQuestion: {
		            type: Number,
		            default: 0
		        },

	    score: {
		            type: Number,
		            default: 0
		        },

	    status: {
		            type: String,
		            enum: ["playing","won","lost","quit"],
		            default: "playing"
		        }

}, {
	    timestamps: true
});

module.exports = mongoose.model("GameSession", gameSessionSchema);
