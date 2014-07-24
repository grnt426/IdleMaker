window.onload = function(){
	var bar = new ProgressBar("#progressme", 50, 1, function(){console.log("Done!")});
	activeProgressBars.push(bar);
	setInterval(progressEverything, 100);
};

activeProgressBars = [];

function progressEverything(){
	for(var i in activeProgressBars){
		activeProgressBars[i].increment();
	}
}