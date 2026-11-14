const mongoose = require("mongoose");
const Question = require("./models/Question");

require("dotenv").config();

const questions = [

	{
		category:"Biblical",
		question:"Who was Abraham's nephew who lived in Sodom?",
		options:["Lot","Jacob","Isaac","Joseph"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What was the name of Moses' wife?",
		options:["Zipporah","Sarah","Rachel","Leah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who interpreted Pharaoh's dreams in Egypt?",
		options:["Joseph","Daniel","Moses","Aaron"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What was the name of the mountain where Moses received the commandments?",
		options:["Mount Sinai","Mount Carmel","Mount Zion","Mount Olivet"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of John the Baptist?",
		options:["Zechariah","Joseph","Nicodemus","Simeon"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet challenged the prophets of Baal?",
		options:["Elijah","Isaiah","Jeremiah","Samuel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was swallowed by a great fish after running from God?",
		options:["Jonah","Job","Elijah","Amos"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of King Solomon?",
		options:["David","Saul","Samuel","Hezekiah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple doubted Jesus' resurrection until he saw Him?",
		options:["Thomas","Peter","Andrew","Philip"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the Roman governor who sentenced Jesus to crucifixion?",
		options:["Pontius Pilate","Herod","Caesar","Felix"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What was the first miracle performed by Moses in Egypt?",
		options:["Turning water into blood","Parting the sea","Calling fire","Healing"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the prophet who anointed David as king?",
		options:["Samuel","Nathan","Elijah","Elisha"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which book comes after the four Gospels?",
		options:["Acts","Romans","Revelation","Genesis"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Paul's companion on many journeys?",
		options:["Silas","Judas","Thomas","Stephen"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What was the name of the garden where Jesus prayed before His arrest?",
		options:["Gethsemane","Eden","Bethany","Calvary"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who helped rebuild Jerusalem's walls?",
		options:["Nehemiah","Ezra","Daniel","Joshua"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king built the first temple in Jerusalem?",
		options:["Solomon","David","Saul","Josiah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was thrown into prison with Paul and sang hymns?",
		options:["Silas","Peter","John","Barnabas"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was known as the weeping prophet?",
		options:["Jeremiah","Isaiah","Ezekiel","Daniel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What was the name of the promised land?",
		options:["Canaan","Egypt","Babylon","Rome"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},
	{
		category:"Biblical",
		question:"Who was the mother of Samuel?",
		options:["Hannah","Ruth","Mary","Deborah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet was taken up to heaven in a whirlwind?",
		options:["Elijah","Elisha","Isaiah","Jeremiah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first high priest of Israel?",
		options:["Aaron","Moses","Eli","Samuel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which woman became queen of Persia and saved her people?",
		options:["Esther","Ruth","Deborah","Mary"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Ruth's mother-in-law?",
		options:["Naomi","Martha","Sarah","Elizabeth"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who wrote many of the Psalms?",
		options:["David","Solomon","Moses","Asaph"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the strongest judge of Israel?",
		options:["Samson","Gideon","Samuel","Barak"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king asked God for wisdom?",
		options:["Solomon","David","Saul","Hezekiah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the tax collector who climbed a tree to see Jesus?",
		options:["Zacchaeus","Matthew","Levi","Bartimaeus"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was healed after touching Jesus' garment?",
		options:["A bleeding woman","A blind man","A leper","A soldier"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What was Paul's original name?",
		options:["Saul","Simon","Samuel","Silas"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple was Jesus' brother?",
		options:["James","Peter","John","Andrew"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first king of the northern kingdom of Israel?",
		options:["Jeroboam","Rehoboam","Ahab","Omri"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet was called by God while he was young?",
		options:["Samuel","Isaiah","Jeremiah","Daniel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the brother of Moses who helped him speak?",
		options:["Aaron","Joshua","Caleb","Elijah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which city was destroyed together with Gomorrah?",
		options:["Sodom","Jericho","Nineveh","Babylon"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who interpreted King Nebuchadnezzar's dreams?",
		options:["Daniel","Joseph","Ezekiel","Ezra"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who led the rebuilding of the temple after exile?",
		options:["Zerubbabel","Ezra","Nehemiah","Daniel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which book tells the story of Israel leaving Egypt?",
		options:["Exodus","Genesis","Leviticus","Numbers"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the disciple who betrayed Jesus?",
		options:["Judas Iscariot","Thomas","Matthew","Philip"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},
	{
		category:"Biblical",
		question:"Who was the prophet who warned Nineveh?",
		options:["Jonah","Nahum","Micah","Amos"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of John the Baptist's mother?",
		options:["Aaron's family","David","Jacob","Joseph"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which apostle replaced Judas Iscariot?",
		options:["Matthias","Paul","Barnabas","Silas"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who wrote the book of Acts?",
		options:["Luke","Paul","Peter","John"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple was a fisherman before following Jesus?",
		options:["Peter","Matthew","Paul","Luke"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What was the name of Abraham's first son?",
		options:["Ishmael","Isaac","Jacob","Joseph"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Isaac's wife?",
		options:["Rebekah","Rachel","Leah","Sarah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which judge defeated the Midianites with a small army?",
		options:["Gideon","Samson","Deborah","Jephthah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of King Saul?",
		options:["Kish","Jesse","David","Samuel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was David's father?",
		options:["Jesse","Kish","Saul","Samuel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet confronted King David about his sin?",
		options:["Nathan","Elijah","Samuel","Isaiah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was thrown into the lions' den?",
		options:["Daniel","Joseph","Jeremiah","Ezekiel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king became sick because of pride?",
		options:["Uzziah","David","Solomon","Saul"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the mother of Jesus?",
		options:["Mary","Elizabeth","Martha","Anna"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which Gospel was written by a tax collector?",
		options:["Matthew","Mark","Luke","John"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who baptized the Ethiopian official?",
		options:["Philip","Peter","Paul","John"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which city did Paul and Silas preach in before being imprisoned?",
		options:["Philippi","Rome","Athens","Jerusalem"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was known for building the ark?",
		options:["Noah","Moses","Abraham","David"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which book describes the creation of the world?",
		options:["Genesis","Exodus","Psalms","Matthew"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the brother of Peter?",
		options:["Andrew","James","John","Thomas"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},
	{
		category:"Biblical",
		question:"Who was the brother of John the Baptist's father?",
		options:["Aaron","Moses","David","Samuel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple was called the Zealot?",
		options:["Simon","Peter","Matthew","John"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first martyr mentioned in Acts?",
		options:["Stephen","James","Peter","Paul"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king saw the writing on the wall?",
		options:["Belshazzar","Nebuchadnezzar","Darius","Cyrus"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Daniel's friend thrown into the furnace?",
		options:["Shadrach","Silas","Stephen","Simon"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet married Gomer?",
		options:["Hosea","Isaiah","Jeremiah","Amos"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the oldest man recorded in the Bible?",
		options:["Methuselah","Adam","Noah","Enoch"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king built the wall around Jerusalem?",
		options:["Nehemiah","Solomon","David","Saul"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of the twelve tribes of Israel?",
		options:["Jacob","Abraham","Isaac","Joseph"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple was known as a physician?",
		options:["Luke","Matthew","John","Mark"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first man to receive God's covenant sign of circumcision?",
		options:["Abraham","Moses","David","Noah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which woman hid the spies in Jericho?",
		options:["Rahab","Ruth","Esther","Deborah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of John the Baptist?",
		options:["Zechariah","Joseph","Jesse","Nicodemus"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which apostle was called Saul before conversion?",
		options:["Paul","Peter","James","Thomas"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who helped carry Jesus' cross?",
		options:["Simon of Cyrene","Joseph","Peter","John"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which city was known for the Tower of Babel?",
		options:["Babel","Jerusalem","Nineveh","Rome"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of King David?",
		options:["Jesse","Saul","Kish","Samuel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet was swallowed by a fish?",
		options:["Jonah","Elijah","Isaiah","Ezekiel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first woman mentioned in the Bible?",
		options:["Eve","Sarah","Mary","Rachel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple betrayed Jesus for thirty pieces of silver?",
		options:["Judas Iscariot","Peter","Thomas","Andrew"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of Solomon?",
		options:["David","Saul","Samuel","Jesse"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which book follows the Gospel of John?",
		options:["Acts","Romans","Hebrews","Revelation"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the mother of Isaac?",
		options:["Sarah","Rebekah","Rachel","Leah"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Jacob's favorite son?",
		options:["Joseph","Benjamin","Judah","Levi"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which apostle was called the twin?",
		options:["Thomas","Peter","John","James"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	},
	{
		category:"Biblical",
		question:"Which prophet wrote about the coming Messiah?",
		options:["Isaiah","Jonah","Amos","Joel"],
		answer:0,
		difficulty:"Medium",
		source:"Manual",
		createdByAI:false
	}

];

mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

	await Question.insertMany(questions);

	console.log("Medium Biblical bulk added!");

	process.exit();

})
.catch(err=>{
	console.log(err);
	process.exit();
});
