window.onload = function(){
	var bar = new ProgressBar("#progressme", 20, 1, prepareGame);
	bar.setLooping();
	newProgressBars.push(bar);
	setInterval(progressEverything, 150);
	progressJs("#devProgressBar").start();
	progressJs("#devProgressBar").set(1);
};

var newProgressBars = [];
var activeProgressBars = {};
var finishedProgressBars = [];

var customers = 0;
var lengthOfGame = 0;
var lengthOfGameUnit = "s";
var money = 0;

/**
 * To make sure everything is synced up and happens on regular ticks,
 * queues are maintained to ensure that progress bars are only added
 * at the start of a tick, and only removed at the end.
 */
function progressEverything(){

	for(var n in newProgressBars){
		activeProgressBars[newProgressBars[n].element] = newProgressBars[n];
	}
	while(newProgressBars.length > 0) {
		newProgressBars.pop();
	}

	for(var i in activeProgressBars){
		activeProgressBars[i].increment();
	}

	for(var f in finishedProgressBars){
		delete activeProgressBars[finishedProgressBars[f]];
	}
	while(finishedProgressBars.length > 0) {
		finishedProgressBars.pop();
	}

	updateStats();
}

function defaultProgressFinished(){
	console.log("Finished");
}

function prepareGame(){

	// Dirty hack to prevent the looping progress bar from calling this multiple
	// times.
	if(Object.keys(activeProgressBars).length > 1)
		return;

	var findCustomersAction = new ProgressBar("#findCustomersProgress", 10, 1, addCustomer);
	findCustomersAction.setLooping();
	newProgressBars.push(findCustomersAction);
	var bits = new ProgressBar("#gatherbits", 2, 1, defaultProgressFinished);
	var bytes = new ProgressBar("#gatherbytes", 8, 1, createCompany);
	newProgressBars.push(bits);
	newProgressBars.push(bytes);
}

function createCompany(){
	showIt("createCompany");
	var prepareLegal = new ProgressBar("#prepareLegal", 10, 1, defaultProgressFinished);
	var hireDevs = new ProgressBar("#hireDevs", 6, 1, defaultProgressFinished);
	var managerStuff = new ProgressBar("#managerStuff", 4, 1, defaultProgressFinished);
	var creatingCompany = new CompoundProgress("#creatingCompany",
		[prepareLegal, hireDevs, managerStuff], createFirstVersion);
	newProgressBars.push(prepareLegal);
	newProgressBars.push(hireDevs);
	newProgressBars.push(managerStuff);
	newProgressBars.push(creatingCompany);
	finishedProgressBars.push("#gatherbits");
	finishedProgressBars.push("#gatherbytes");
}

function createFirstVersion(){
	showIt("makeFirstVersion");
	showIt("statsTable");
	var architectMarvels = new ProgressBar("#architectMarvels", 300, 1, defaultProgressFinished);
	var designProgress = new ProgressBar("#designProgress", 70, 1, defaultProgressFinished);
	var removeInteractivity = new ProgressBar("#removeInteractivity", 90, 1, defaultProgressFinished);
	var makeCommits = new ProgressBar("#makeCommits", 50, 1, defaultProgressFinished);
	var testCode = new ProgressBar("#testCode", 20, 1, defaultProgressFinished);
	var appearanceOfProgression = new ProgressBar("#appearanceOfProgression", 75, 1, defaultProgressFinished);
	var createQuestionable = new ProgressBar("#createQuestionable", 10, 1, defaultProgressFinished);
	var loadingScreensLonger = new ProgressBar("#loadingScreensLonger", 150, 1, defaultProgressFinished);
	var addUnnecessaryLoading = new ProgressBar("#addUnnecessaryLoading", 200, 1, defaultProgressFinished);
	var createFirstVersion = new CompoundProgress("#createFirstVersion",
			[addUnnecessaryLoading, createQuestionable, loadingScreensLonger, appearanceOfProgression,
				testCode, makeCommits, removeInteractivity, designProgress, architectMarvels], beginRealGame);
	newProgressBars.push(architectMarvels, designProgress, removeInteractivity, makeCommits,
		testCode, appearanceOfProgression, loadingScreensLonger, createQuestionable, addUnnecessaryLoading,
		createFirstVersion);
	finishedProgressBars.push("#prepareLegal", "#hireDevs", "#creatingCompany", "#managerStuff");
}

function beginRealGame(){
	finishedProgressBars.push("#architectMarvels", "#designProgress", "#removeInteractivity",
		"#makeCommits", "#testCode", "#createQuestionable", "#loadingScreensLonger",
		"#addUnnecessaryLoading", "#appearanceOfProgression", "#createFirstVersion");
}

function addCustomer(){
	customers += 1;
	money += 1;
}

function updateStats(){
	var customerCount = document.getElementById("customerCount");
	customerCount.innerHTML = customers;
	var moneyCount = document.getElementById("moneyCount");
	moneyCount.innerHTML = money;
}

// TODO: replace with JQuery before this gets ugly
function showIt(element){
	var ele = document.getElementById(element);
	ele.style.visibility = "visible";
}