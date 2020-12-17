var timeLeft = 0;
var timeList = [];
var currentInt = 0;
var currentTime = 0;
var interval;
var status = "start";
var totalTimePaused = 0;
var beforeTimeList = []; // basically timeList, but is supposed to be what the program displays
//(timeList should be created after all the start button is pressed and should consist of the values in beforeTimeList)

function convertSeconds(s) {
	var min = floor(s / 60);
	var sec = s % 60;
	return nf(min,2) + ":" + nf(sec, 2); // nf(number, decimal places) stands for
 	// number format. It adds a zero to the left of the number to equal the amt
	// of digits specified.
}

function repeatRounds(set, rounds) { // assuming that this will be used on timeList and only timeList
	var allSets = []; // create a local empty array
	//console.log(set);
	for ((set == timeList ? i = 1 : i = 0); i < rounds; i++) {
		allSets.push(set); // push the given set into the array for the specified # of rounds using a for loop
	}
	timeList.push(allSets.flat());
	timeList = timeList.flat() // make sure there are no arrays within arrays that will confuse the program when running the timer
	return timeList; // return timeList
}



//repeatRounds([2, 1], 3);

var ding;
function preload() {
	var context = new AudioContext();
	ding = loadSound("ding.wav"); // load the sound in
}

function setup() {
	noCanvas(); // won't use a canvas
	 // use millis() to get the amount of time elasped from
	// when the page started
	var test = select('#list');
	test.html(beforeTimeList);

	var getInput = select('#input');
	getInput.position(25, 100);
	getInput = createInput('');


	var testButton = createButton('enter');
	testButton.mousePressed(takeInput);
	//testButton.position(10, 130);

	var start = createButton(status); // create a button start that will be used to start and pause the timer
	start.mousePressed(startStopTimer); // have it perform the startStopTimer function everytime it's clicked
	start.position(10, 130);

	var timer = select('#timer'); // selects timer id in html
	var stopTime = 0;
	var timePaused = 0;
	totalTimePaused = 0;
	timeLeft = timeList[currentInt];

	function takeInput() {
		beforeTimeList.push(getInput.value());
		test.html(beforeTimeList);
	} // add what happens if getInput is undefined

	//function formatBTimeList() {
		//for (i=0; i<beforeTimeList.length; i++) {
			//text(beforeTimeList[i], 100, 100+(i * 50));

		//}
	//}


	function startStopTimer() {
		if (status == 'start') { // start the timer
			status = 'stop'; // change the timer to say "stop"
			start.html(status);
			timePaused = millis() - stopTime; // wtf actually is this lmfao
			totalTimePaused = timePaused + totalTimePaused;
			console.log("total time paused: " + totalTimePaused);
			console.log("time paused:" + timePaused);
			 // set timeList to the current value in timeList
			timer.html(convertSeconds(timeLeft - currentTime)); // show the value on the timer
			interval = setInterval(timeIt, 1000); // perform timeIt every 1 second
			console.log("im clicking the start button");
			console.log("time left is " + timeLeft);

		} else if (status == 'stop') { // stop the timer
			stopTime = millis();
			status = 'start';
			start.html(status);
			clearInterval(interval); // stop timeIt from happening
			console.log("im clicking the stop button");

		} else { // if the timer has ended, you can't play or pause anything
			timer.html("00:00"); // keep at 00:00
			console.log("you should be seeing this when the timer is over");
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

		} if ((currentInt == timeList.length) || (currentTime > timeList.reduce((a, b) => a + b))) { // if current time is ever greater than the sum of all numbers in timeList, something is horribly wrong. End the timer.
			console.log("the timer is done");
			clearInterval(interval); // stop timeIt from happening every second
			timer.html("00:00"); // revert back to 00:00
			status = 'nope';
			return; // gtfo here
		}
		console.log(timeLeft - currentTime);
		timer.html(convertSeconds(timeLeft - currentTime)); // if the above conditions
	} // are not met, display the timeLeft - currentTime. currentTime is meant to increment up by 1 each second.
}

function mousePressed() {

}
