const mongoose = require("mongoose");
const Question = require("./models/Question");

require("dotenv").config();

const questions = [

	{
		category:"Biblical",
		question:"Who was swallowed by a great fish?",
		options:["Jonah","Moses","David","Peter"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Jesus' earthly father?",
		options:["Joseph","John","James","Thomas"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What did Jesus turn water into?",
		options:["Wine","Oil","Bread","Milk"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who betrayed Jesus?",
		options:["Judas","Peter","John","Matthew"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who denied knowing Jesus three times?",
		options:["Peter","Paul","Judas","Thomas"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What is the last book of the Bible?",
		options:["Revelation","Genesis","Matthew","Acts"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was known for great wisdom as a king?",
		options:["Solomon","Saul","Herod","Pilate"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the strongest man in the Bible?",
		options:["Samson","David","Moses","Joshua"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"How long did God take to create the world?",
		options:["Six days","One day","Ten days","Forty days"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Jesus' cousin who baptized Him?",
		options:["John the Baptist","Peter","Paul","Andrew"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	}

];

mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

	await Question.insertMany(questions);

	console.log("Easy Biblical batch 2 added!");

	process.exit();

})
.catch(err=>{
	console.log(err);
	process.exit();
});
