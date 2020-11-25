var timeLeft = 0;
var timeList = [5, 9, 2];
var currentInt = 0;
var startTime = 0;
var currentTime = 0;
var start;
var interval;
var status = "start";
var difference;
var totalTimePaused;

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

function setup() {
	noCanvas(); // won't use a canvas
	 // use millis() to get the amount of time elasped from
	// when the page started

	start = createButton(status); // create a button start that will be used to start and pause the timer
	start.mousePressed(startStopTimer); // have it perform the startStopTimer function everytime it's clicked
	 // THE PROBLEM IS NOT HERE

	var timer = select('#timer'); // selects timer id in html
	startTime = millis(); // get the time elapsed from start of sketch
	//console.log(startTime);
	var stopTime = 0;
	var timePaused = 0;
	totalTimePaused = 0;
	timeLeft = timeList[currentInt];


	function startStopTimer() {
		if (status == 'start') { // start the timer
			status = 'stop'; // change the timer to say "stop"
			timePaused = millis() - stopTime; // wtf actually is this lmfao
			totalTimePaused = timePaused + totalTimePaused;
			console.log("total time paused: " + totalTimePaused);
			console.log("time paused:" + timePaused);
			 // set timeList to the current value in timeList
			timer.html(convertSeconds(timeLeft - currentTime)); // show the value on the timer
			interval = setInterval(timeIt, 1000); // perform timeIt every 1 second
			console.log("im clicking the start button");
			console.log("time left is " + timeLeft);

		} else { // stop the timer
			stopTime = millis();
			status = 'start';
			clearInterval(interval); // stop timeIt from happening
			console.log("im clicking the stop button");
		}
	}



	function timeIt() {
		currentTime = floor((millis() - totalTimePaused)/1000); // what a hot mess
		console.log("current time: " + currentTime + " time since start: " + millis());
		//console.log("see this when the timer is actively ticking down");
		//increase the counter by 1 every second

		if (currentTime == timeLeft) {
			console.log("the ding is playing rn");
			ding.play(); // play the sfx when the timer is down to 00:00
			currentInt++; // move onto the next value in timeList
			timeLeft = timeList[currentInt] + currentTime; // set timeLeft to that value,

			// adding currentTime to make sure the time displayed isn't negative/inaccurate

		} if (currentInt == timeList.length) {
			console.log("the timer is done");
			clearInterval(interval); // stop timeIt from happening every second
			timer.html("00:00"); // revert back to 00:00
			return; // gtfo here
		}
		timer.html(convertSeconds(timeLeft - currentTime)); // if the above conditions

	} // are not met, display the timeLeft - currentTime. currentTime is meant to increment up by 1 each second.
}

function mousePressed() {

}
