window.onload = function(){
	var bar = new ProgressBar("#progressme", 10, 1, startGame);
	newProgressBars.push(bar);
	setInterval(progressEverything, 500);
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

function startGame(){
	var bits = new ProgressBar("#gatherbits", 10, 1, defaultProgressFinished);
	var bytes = new ProgressBar("#gatherbytes", 80, 1, defaultProgressFinished);
	newProgressBars.push(bits);
	newProgressBars.push(bytes);
	finishedProgressBars.push("#progressme");
}