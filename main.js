$body = $("body");

function randomColorValue () {
	return Math.round((Math.random() * 255));
};

function getTheRGB(value) {
	var a = value.split("(")[1].split(")")[0];
	a = a.split(",");
	
	return a;
}

var counter = {

	val : 0,

	$timer : $("#timer .value"),

	countUp : function() {
    	counter.val++;
    	counter.$timer.text(counter.val);
    	return counter.val;
    }
}

var initCounter = window.setInterval(counter.countUp, 100);


app = {
	vars : {
		
		winWidth : ($(document).width())/255,
		winHeight: ($(document).height())/255,
		difficulty: 5,
		previousScore : null,
		bestScore : null
	},
	init : function() {
		unifiedRandom = randomColorValue();
		app.$box = $('<div id="box"></div>');
		app.$box.css("background-color", "rgb("+ randomColorValue() + "," + randomColorValue() + "," + unifiedRandom + ")");
		app.$box.appendTo("body");
	},

	reset : function() {
		unifiedRandom = randomColorValue();
	    app.$box.css("background-color", "rgb(" + randomColorValue() + "," + randomColorValue() + "," + unifiedRandom + ")");
	    counter.val = 0;
	},

	win : function() {
		var message;
		var seconds = counter.val / 10;

		if (app.vars.previousScore != null) {

			if (seconds > app.vars.previousScore) {
				message = "You did it! " + seconds + " seconds isn't bad, but you've done better!";	
			} else {
				message = "You did it! And it only took you "+ seconds + " seconds to do it. Now try and beat it!";
			}
			
		} else {
			message = "You did it! And it only took you " + seconds + " seconds to do it. Now try and beat it!";
		}
		
		alert(message);
		app.vars.previousScore = seconds;
		app.reset();
	},

	updateBackgroundColor : function(e) {

		var $pageX = parseInt(e.pageX / app.vars.winWidth, 10);
    	var $pageY = parseInt(e.pageY / app.vars.winHeight, 10);

		$body.css("background-color", "rgb(" + $pageX + "," + $pageY + "," + unifiedRandom + ")");

		app.checkForWin();
	},

	compareColors : function(a, b) {		

		var rDiff = Math.abs(a[0] - b[0]);
		var gDiff = Math.abs(a[1] - b[1]);
		var bDiff = Math.abs(a[2] - b[2]);

		if (rDiff < app.vars.difficulty && gDiff < app.vars.difficulty && bDiff < app.vars.difficulty) {			
			return true;	
		}
	},

	checkForWin : function() {
		var backgroundColor = getTheRGB($body.css("background-color"));
		var boxColor = getTheRGB(app.$box.css("background-color"));

		if (app.compareColors(backgroundColor, boxColor)) {
			app.win()
		}
	}
}

app.init();




$(document).mousemove(function(e){
	
	
	app.updateBackgroundColor(e);
    

}); 



