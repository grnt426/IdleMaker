window.onload = function(){
	var bar = new ProgressBar("#progressme", 20, 1, prepareGame);
	bar.setLooping();
	newProgressBars.push(bar);
	setInterval(progressEverything, 150);
};

var newProgressBars = [];
var activeProgressBars = {};
var finishedProgressBars = [];

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
}

function defaultProgressFinished(){
	console.log("Finished");
}

function prepareGame(){

	// Dirty hack to prevent the looping progress bar from calling this multiple
	// times.
	if(Object.keys(activeProgressBars).length > 1)
		return;


	var bits = new ProgressBar("#gatherbits", 20, 1, defaultProgressFinished);
	var bytes = new ProgressBar("#gatherbytes", 80, 1, createCompany);
	newProgressBars.push(bits);
	newProgressBars.push(bytes);
}

function createCompany(){
	showIt("createCompany");
	var prepareLegal = new ProgressBar("#prepareLegal", 100, 1, defaultProgressFinished);
	var hireDevs = new ProgressBar("#hireDevs", 60, 1, defaultProgressFinished);
	var managerStuff = new ProgressBar("#managerStuff", 40, 1, defaultProgressFinished);
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
				testCode, makeCommits, removeInteractivity, designProgress, architectMarvels], defaultProgressFinished);
	newProgressBars.push(architectMarvels, designProgress, removeInteractivity, makeCommits,
		testCode, appearanceOfProgression, loadingScreensLonger, createQuestionable, addUnnecessaryLoading,
		createFirstVersion);
	finishedProgressBars.push("#prepareLegal", "#hireDevs", "#creatingCompany", "#managerStuff");
}

// TODO: replace with JQuery before this gets ugly
function showIt(element){
	var ele = document.getElementById(element);
	ele.style.visibility = "visible";
}