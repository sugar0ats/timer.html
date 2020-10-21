var timeLeft;
var timeList = [5, 5, 5];
var currentInt = 0;

var startTime = 0;
var currentTime = 0;

function convertSeconds(s) {
	var min = floor(s / 60);
	var sec = s % 60;
	return nf(min,2) + ":" + nf(sec, 2); // nf(number, decimal places) stands for
 	// number format. It adds a zero to the left of the number to equal the amt
	// of digits specified.
}

var ding;
function preload() {
	var context = new AudioContext();
	ding = loadSound("ding.wav");
}


timeLeft = timeList[currentInt];
//timeLeft = 10;

function setup() {
	noCanvas(); // won't use a canvas
	// add a button or sumn to set startTime to whenever a button is clicked
	startTime = millis(); // use millis() to get the amount of time elasped from
	// when the page started

	var timer = select('#timer'); // selects timer id in html
  timer.html(convertSeconds(timeLeft - currentTime)); //display the value of counter

	var done = select('#status');

	var interval = setInterval(timeIt, 1000); // setInterval wants an event to happen ever so
	// often, every 1000 milliseconds, to be exact

	function timeIt() {
		currentTime = floor((millis() - startTime)/1000);
		 //increase the counter by 1 every second

		if (currentTime == timeLeft) {
			ding.play();
			currentInt++;
			timeLeft = timeList[currentInt] + currentTime;
			//console.log("can you see this");
			//clearInterval(interval);
			//currentInt == timeList.length ? clearInterval(interval) : console.log("keep going");
		}
		timer.html(convertSeconds(timeLeft - currentTime));
	}
	//console.log("how about this?");
}

//console.log(timeList[0])
