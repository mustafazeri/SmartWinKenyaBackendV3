const mongoose = require("mongoose");
const Question = require("./models/Question");

require("dotenv").config();

const questions = [

	{
		category:"Biblical",
		question:"Who was the father of John the Baptist?",
		options:["Zechariah","Joseph","Jacob","Samuel"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the sister of Moses?",
		options:["Miriam","Mary","Ruth","Esther"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Moses' brother?",
		options:["Aaron","David","Peter","James"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which book tells about Jesus' birth?",
		options:["Matthew","Genesis","Acts","Revelation"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first murderer in the Bible?",
		options:["Cain","Abel","Saul","Judas"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was killed by Cain?",
		options:["Abel","Adam","Noah","Joseph"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who lived the longest according to the Bible?",
		options:["Methuselah","Adam","Noah","Abraham"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What did God create on the first day?",
		options:["Light","Animals","Humans","Plants"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What did Jesus ride into Jerusalem?",
		options:["Donkey","Horse","Camel","Chariot"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was called the Rock by Jesus?",
		options:["Peter","John","Paul","Andrew"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	}

];

mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

	await Question.insertMany(questions);

	console.log("Easy Biblical final batch added!");

	process.exit();

})
.catch(err=>{
	console.log(err);
	process.exit();
});
