window.onload = function(){
	var bar = new ProgressBar("#progressme", 20, 1, prepareGame);
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
	var bits = new ProgressBar("#gatherbits", 20, 1, defaultProgressFinished);
	var bytes = new ProgressBar("#gatherbytes", 80, 1, createCompany);
	newProgressBars.push(bits);
	newProgressBars.push(bytes);
	finishedProgressBars.push("#progressme");
}

function createCompany(){
	var prepareLegal = new ProgressBar("#prepareLegal", 100, 1, defaultProgressFinished);
	var hireDevs = new ProgressBar("#hireDevs", 60, 1, defaultProgressFinished);
	var managerStuff = new ProgressBar("#managerStuff", 40, 1, defaultProgressFinished);
	var creatingCompany = new CompoundProgress("#creatingCompany",
		[prepareLegal, hireDevs, managerStuff], defaultProgressFinished);
	newProgressBars.push(prepareLegal);
	newProgressBars.push(hireDevs);
	newProgressBars.push(managerStuff);
	newProgressBars.push(creatingCompany);
	finishedProgressBars.push("#gatherbits");
	finishedProgressBars.push("#gatherbytes");
}