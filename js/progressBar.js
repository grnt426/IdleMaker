ProgressBar = function(element, max, amount, callback){

	this.element = element;
	this.max = max;
	this.amount = amount;
	this.current = 0;
	this.callback = callback;
	this.finished = false;
	this.running = true;
	this.loop = false;
	this.iterations = 0;

	progressJs(element).start();

	this.increment = function(){
		if(this.finished || !this.running)
			return;
		this.current = this.current + this.amount;
		progressJs(element).set(this.current / this.max * 100);
		if(this.current >= this.max){
			if(this.loop){
				progressJs(element).set(0);
				this.current = 0;
			}
			else{
				this.finished = true;
			}
			this.iterations += 1;
			this.callback();
		}
	};

	this.stop = function(){
		this.running = false;
	};

	this.start = function(){
		this.running = true;
	};

	this.setLooping = function(){
		this.loop = true;
	};
};