const mongoose = require("mongoose");
const Question = require("./models/Question");

require("dotenv").config();

const questions = [

	{
		category:"Biblical",
		question:"Who led the Israelites out of Egypt?",
		options:["Moses","David","Peter","Paul"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"How many books are in the Bible?",
		options:["66","50","70","40"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was thrown into the lions' den?",
		options:["Daniel","Joseph","Samuel","Elijah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	}

];


mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

	console.log("MongoDB Connected");

	await Question.insertMany(questions);

	console.log("Biblical level questions added!");

	process.exit();

})
.catch(err=>{
	console.log(err);
	process.exit();
});
