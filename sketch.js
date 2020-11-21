var timeLeft = 0;
var timeList = [5, 9, 2];
var currentInt = 0;
var startTime = 0;
var currentTime = 0;
var start;
var interval;
var status = "start";
var difference;

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



//timeLeft = 10;

function setup() {
	noCanvas(); // won't use a canvas
	// add a button or sumn to set startTime to whenever a button is clicked
	 // use millis() to get the amount of time elasped from
	// when the page started

	start = createButton(status);
	start.mousePressed(startStopTimer);
	 // THE PROBLEM IS NOT HERE

	 // setInterval wants an event to happen ever so
		 //often, every 1000 milliseconds, to be exact

	var timer = select('#timer'); // selects timer id in html


	function startStopTimer() {
		if (status == 'start') { // start the timer
			status = 'stop';
			startTime = millis();
			console.log("start time:" + startTime);
			timeLeft = timeList[currentInt]; // THE PROBLEM IS NOT HERE
			timer.html(convertSeconds(timeLeft - currentTime)); // the problem isnt here either


			interval = setInterval(timeIt, 1000);
			console.log("the timer has started");

		} else { // stop the timer
			status = 'start';

			clearInterval(interval);
			console.log("im clicking the stop button");
		}
	}



	function timeIt() {
		currentTime = floor((millis() - startTime)/1000); // somehow keep current time the same
		console.log("current time:" + currentTime);
		//console.log("see this when the timer is actively ticking down");
		//increase the counter by 1 every second

		if (currentTime == timeLeft) {
			console.log("the ding is playing rn");
			ding.play();
			currentInt++;
			timeLeft = timeList[currentInt] + currentTime; // the problem isnt here

		} if (currentInt == timeList.length) {
			console.log("the timer is done");
			clearInterval(interval);
			timer.html("00:00");
			return;
		}
		timer.html(convertSeconds(timeLeft - currentTime)); // THEPROBLEM IS NOT HERE
	}
}

function mousePressed() {

}
