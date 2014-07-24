window.onload = function(){
	progressJs("#progressme").start();
	progressMe("#progressme", 50, 1000);
};

function progressMe(element, i, delay){
	progressJs(element).increase();
	setTimeout(function(){
		progressMe(element, i + 1, delay);
	}, delay);
}