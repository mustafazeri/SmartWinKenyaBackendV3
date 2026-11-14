const mongoose = require("mongoose");
const Question = require("./models/Question");

require("dotenv").config();

const questions = [

	{
		category:"Biblical",
		question:"Who was Abraham's son promised by God?",
		options:["Isaac","Jacob","Joseph","Samuel"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Jacob's son who became a ruler in Egypt?",
		options:["Joseph","Benjamin","Judah","Levi"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who led the Israelites after Moses?",
		options:["Joshua","Aaron","David","Solomon"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What sea did Moses divide?",
		options:["Red Sea","Dead Sea","Mediterranean Sea","Galilee Sea"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first king of Israel?",
		options:["Saul","David","Solomon","Herod"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who followed Saul as king of Israel?",
		options:["David","Solomon","Samuel","Joshua"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who built the temple in Jerusalem?",
		options:["Solomon","David","Moses","Noah"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What did David use to defeat Goliath?",
		options:["A sling and stone","A sword","A spear","A bow"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Jesus' brother mentioned in the Bible?",
		options:["James","John","Peter","Paul"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What was Jesus' profession before His ministry?",
		options:["Carpenter","Fisherman","Soldier","Farmer"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who were the first people to visit baby Jesus?",
		options:["Shepherds","Kings","Soldiers","Fishermen"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"How many days did Jesus fast in the wilderness?",
		options:["40","7","12","30"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who wrote many letters in the New Testament?",
		options:["Paul","Peter","John","Matthew"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was known as the father of many nations?",
		options:["Abraham","Moses","David","Noah"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What did Noah build?",
		options:["An ark","A temple","A palace","A tower"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},
	{
		category:"Biblical",
			question:"Who was the mother of John the Baptist?",
			options:["Elizabeth","Mary","Martha","Sarah"],
			answer:0,
			difficulty:"Easy",
			source:"Manual",
			createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who baptized Jesus?",
		options:["John the Baptist","Peter","Paul","James"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple walked on water with Jesus?",
		options:["Peter","John","Matthew","Thomas"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What did Jesus feed to the five thousand?",
		options:["Bread and fish","Meat and rice","Fruit and water","Milk and honey"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was raised from the dead by Jesus after four days?",
		options:["Lazarus","Jairus","Stephen","Barnabas"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What is the shortest book in the Bible?",
		options:["3 John","Genesis","Psalms","Matthew"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who received the Ten Commandments?",
		options:["Moses","Abraham","David","Peter"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of Isaac?",
		options:["Abraham","Jacob","Joseph","Noah"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Isaac's son who had twelve sons?",
		options:["Jacob","Joseph","David","Samuel"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who interpreted dreams in Egypt?",
		options:["Joseph","Daniel","Moses","Aaron"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was thrown into a furnace with his friends?",
		options:["Shadrach, Meshach and Abednego","Peter and John","Paul and Silas","Moses and Aaron"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first Christian martyr?",
		options:["Stephen","Paul","Peter","James"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Where did Adam and Eve live at first?",
		options:["Garden of Eden","Jerusalem","Egypt","Bethlehem"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the angel that announced Jesus' birth?",
		options:["Gabriel","Michael","Raphael","Uriel"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What language was much of the Old Testament written in?",
		options:["Hebrew","Latin","Greek","English"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

];
mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

	await Question.insertMany(questions);

	console.log("Easy Biblical bulk questions added!");

	process.exit();

})
.catch(err=>{
	console.log(err);
	process.exit();
});
