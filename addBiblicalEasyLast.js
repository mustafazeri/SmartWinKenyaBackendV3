const mongoose = require("mongoose");
const Question = require("./models/Question");

require("dotenv").config();

const questions = [

	{
		category:"Biblical",
		question:"Who was the wife of Abraham?",
		options:["Sarah","Mary","Rachel","Ruth"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the wife of Isaac?",
		options:["Rebekah","Sarah","Esther","Martha"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the wife of Jacob?",
		options:["Rachel","Mary","Elizabeth","Deborah"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who became a great leader after Moses?",
		options:["Joshua","Aaron","Saul","Peter"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was known for his patience during suffering?",
		options:["Job","David","Solomon","Paul"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the mother of Samuel?",
		options:["Hannah","Mary","Sarah","Ruth"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Samuel's mother praying for a child?",
		options:["Hannah","Elizabeth","Martha","Rachel"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple was a tax collector?",
		options:["Matthew","Peter","John","James"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who wrote the book of Revelation?",
		options:["John","Paul","Peter","Luke"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Luke in the New Testament?",
		options:["A doctor and writer","A king","A fisherman","A soldier"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	}

];

mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

	await Question.insertMany(questions);

	console.log("Easy Biblical last bulk added!");

	process.exit();

})
.catch(err=>{
	console.log(err);
	process.exit();
});
