ProgressBar = function(element, max, amount, callback){

	this.element = element;
	this.max = max;
	this.amount = amount;
	this.current = 0;
	this.callback = callback;
	this.finished = false;
	this.running = true;

	progressJs(element).start();

	this.increment = function(){
		if(this.finished || !this.running)
			return;
		this.current = this.current + this.amount;
		progressJs(element).set(this.current / this.max * 100);
		if(this.current >= this.max){
			this.finished = true;
			this.callback();
		}
	};

	this.stop = function(){
		this.running = false;
	};

	this.start = function(){
		this.running = true;
	};
};