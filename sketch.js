var timeLeft = 0;
var timeList = [];
var currentInt = 0;
var currentTime = 0;
var interval;
var status = "start";
var totalTimePaused = 0;
var enterShown = true;
//var resetted = false;
var shownText;
var textX = 100;
var textY = 220;
var selectBoxes = [];

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

var ding; // load in the ding sfx for when an interval ends
function preload() {
	var context = new AudioContext();
	ding = loadSound("ding.wav"); // load the sound in
}

function setup() {
	createCanvas(1000, 1000); // create a canvas for all the text to appear on

	intervalTable = new p5.Table(); // create a Table to display the intervals in a list formation

	var getInput = select('#input'); // is the text input box
	getInput = createInput(''); // show nothing in the input box when you first load it
	getInput.position(60, 150); // create variables for these values?


	var enter = createButton('enter'); // is the button to press to store value in input box in timeList/display it
	enter.mousePressed(takeInput); // when the enter button is pressed, store the value in the box, add it to intervalTable/display it, and add it to timeList
	enter.position(10, 150);

	var start = createButton(status); // create a button start that will be used to start and pause the timer
	start.hide();
	start.mousePressed(startStopTimer); // have it perform the startStopTimer function everytime it's clicked
	start.position(10, 100);

	var timer = select('#timer'); // selects timer id in html
	timer.position(80, 0);
	var stopTime = 0;
	var timePaused = 0;
	totalTimePaused = 0;

	var reset = createButton('reset');
	reset.hide();
	reset.mousePressed(resetEverything);
	reset.position(10, 100);

	var selectButton = createButton('select intervals');
	selectButton.mousePressed(selectMode);
	selectButton.position(10, 180);



	function takeInput() {
		//resetted = false;
		//intervalTable.addColumn(getInput.value()); // add the value in the input box to intervalTable
		(getInput.value() <= 0 || isNaN(parseInt(getInput.value())) ? invalidInput() : timeList.push(+getInput.value())); // also, convert the string into a number & add it to timeList (array)
		//console.log(parseInt(getInput.value()));
		//console.log(typeof parseInt(getInput.value()) == NaN);

		 // set the first timeLeft to timeList[currentInt] (takeInput shouldn't happen when the timer is going!!)
		if (timeList.length > 0) { // if there's more than one interval, then show the start button (you can't start a timer with no intervals!)
			timeLeft = timeList[currentInt];
			start.show();
		}
	} // add what happens if getInput is undefined

	function invalidInput() {
		var warning = createDiv('enter a valid interval please!');
		warning.position(40, 170);
		warning.style('font-size', '12px');
		warning.style('color', 'red');
		setTimeout(removeWarning = () => {
			warning.remove();
		}, 3000)
		//setInterval(background(255, 255, 255), 3000);
	}

	function startStopTimer() {

		removeShowEnter();
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
			start.remove();
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
			status = 'done';
			start.hide();
			reset.show();
			//removeShowEnter();
			return; // gtfo here
		}
		console.log(timeLeft - currentTime);
		timer.html(convertSeconds(timeLeft - currentTime)); // if the above conditions
	} // are not met, display the timeLeft - currentTime. currentTime is meant to increment up by 1 each second.

	function removeShowEnter() {
		if (enterShown) {
			enter.hide();
			getInput.hide();
			enterShown = false;
		} else {
			enter.show();
			getInput.show();
			enterShown = true;
		}
	}

	function resetEverything() {
		background(255, 255, 255); // paint the canvas completely white, remove all the intervals from the display
		timeLeft = 0; // reset alll timer values to be 0
		currentInt = 0;
		currentTime = 0;
		totalTimePaused = 0;

		stopTime = 0;
		timePaused = 0;

		timeList = []; // make timeList empty
		removeShowEnter();
		status = 'start';
		start.html(status);
		//start.show();
		reset.hide();

	}

	function selectMode() {
		for (i=0; i < timeList.length; i++) {
			currentBox = new selectBox(i); // create a new "select box" for the newly drawn interval
			selectBoxes.push(currentBox);
			currentBox.drawBox(); // draw this box
			console.log("is this working?");
		}
	}
}

function draw() {

	text("Intervals:", textX, textY); // this is the title of intervalTable



	for (i=0; i < timeList.length; i++) {
			fill('black');
			(i+1 == currentInt ? text("x", textX-15, (textY + 20) + 12 * i) : text(""));
			// if the interval being drawn is the current interval, display an x next to that interval
			// that "x" stays there after the interval is over and the timer moves onto the next one

			shownText = text(convertSeconds(timeList[i]), textX, (textY + 20) + 12 * i);
			// convert the raw number stored in getInput into its display form
			// use a for loop to go through intervalTable, taking each value and putting it into a list format
	}

}

class selectBox {
	constructor(i) {
		let selectNum = i + 1;
		this.name = "selector " + selectNum;
		this.x = textX;
		this.y = (textY + 10) + 12 * i;
		this.color = 'green';
		this.interval = timeList[i];
		//this.color = color('clear');
	}

	drawBox() {
		//fill(this.color);

		return rect(this.x, this.y, 50, 12);
	}

	selected() {
		console.log('location of button: ' + this.x, this.y);
		//var d = dist(mouseX, mouseY, this.x, this.y);
		if (mouseX > this.x && mouseX < this.x + 50 && mouseY > this.y && mouseY < this.y + 12) {
			fill(this.color);
			rect(this.x, this.y, 50, 12);
			console.log("fjaiogpsb");
		}

	}

	//selectBox.mousePressed(() => {
		//this.color = color('green');
		//return rect(textX, (textY + 10) + 12 * i, 50, 12);
	//});
}



function mousePressed() {
	console.log(mouseX, mouseY);
	console.log(mouseX > this.x && mouseX < this.x + 50 && mouseY < this.y && mouseY > this.y + 12);
	for (i=0; i < selectBoxes.length; i++) {
		selectBoxes[i].selected();
		console.log('hello');
	}
}
