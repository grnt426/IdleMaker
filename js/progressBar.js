ProgressBar = function(element, max, amount, callback){

	this.element = element;
	this.max = max;
	this.amount = amount;
	this.current = 1;
	this.callback = callback;
	this.finished = false;

	progressJs(element).start();

	this.increment = function(){
		if(this.finished)
			return;
		this.current = this.current + this.amount;
		progressJs(element).increase(this.amount);
		if(this.current == this.max){
			this.finished = true;
			this.callback();
		}
	};
};