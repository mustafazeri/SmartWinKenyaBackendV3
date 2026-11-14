const mongoose = require("mongoose");
const Question = require("./models/Question");

require("dotenv").config();

const questions = [

	{
		question: "Who built the ark?",
		options: ["Moses","Noah","David","Abraham"],
		answer: 1,
		category: "Biblical",
		difficulty: "Easy"
	},

	{
		question: "Who was the first man created by God?",
		options: ["Adam","Noah","Peter","John"],
		answer: 0,
		category: "Biblical",
		difficulty: "Easy"
	},

	{
		question: "Who was the mother of Jesus?",
		options: ["Mary","Sarah","Ruth","Esther"],
		answer: 0,
		category: "Biblical",
		difficulty: "Easy"
	},

	{
		question: "How many disciples did Jesus have?",
		options: ["10","12","7","20"],
		answer: 1,
		category: "Biblical",
		difficulty: "Easy"
	},

	{
		question: "Who defeated Goliath?",
		options: ["David","Saul","Samson","Joshua"],
		answer: 0,
		category: "Biblical",
		difficulty: "Easy"
	}

];


mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

	console.log("MongoDB Connected");

	await Question.insertMany(questions);

	console.log("Biblical questions added!");

	process.exit();

})
.catch(err=>{
	console.log(err);
	process.exit();
});

