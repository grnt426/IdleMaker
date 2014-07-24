CompoundProgress = function(element, children, callback){

	this.max = 0;
	for(var c in children){
		this.max += children[c].max;
	}

	this.children = children;
	this.finished = false;
	this.callback = callback;

	progressJs(element).start();

	this.increment = function(){
		if(this.finished)
			return;
		var current = 0;
		for(var c in this.children){
			current += this.children[c].current;
		}
		progressJs(element).set(current / this.max * 100);
		if(current >= this.max){
			this.finished = true;
			this.callback();
		}
	};
};
