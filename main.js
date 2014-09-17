random = Math.round((Math.random() * 255));
random2 = Math.round((Math.random() * 255));
random3 = Math.round((Math.random() * 255));



var box = $('<div id="box"></div');
box.css("background-color", "rgb("+random2+","+random3+","+random+")");
box.appendTo("body")



$body = $("body");

boxColor = getTheRGB(box.css("background-color"));
backColor = getTheRGB($body.css("background-color"));

var counter = 0;
var countUp = function() {

    	counter++;
    	$("#timer .value").text(counter);
    	return counter;
    }

var test= window.setInterval(countUp, 100);


/*Touch? */

// document.addEventListener('touchmove', function(e) {
//     e.preventDefault();
//     var touch = e.touches[0];

//     enclosure(e);

// }, false);

var enclosure = function(e) { 

	var $width = ($(document).width())/255;
    var $height = ($(document).height())/255;
    var $pageX = parseInt(e.pageX / $width,10);
    var $pageY = parseInt(e.pageY / $height,10);
    var difficulty = 5;
    

    var colorKeepUp = function(e) {

		    
	    $("body").css("background-color", "rgb("+$pageX+","+$pageY+","+random+")");
	    backColor = getTheRGB($body.css("background-color"));
	    boxColor = getTheRGB(box.css("background-color"));

	}

	var compareThem = function(a, b) {		

		var rDiff = Math.abs(a[0] - b[0]);
		var gDiff = Math.abs(a[1] - b[1]);
		var bDiff = Math.abs(a[2] - b[2]);

		// console.log(rDiff + "///" + gDiff + "///" + bDiff);


		if (rDiff < difficulty && gDiff < difficulty && bDiff < difficulty) {
			alert("You did it! And it only took you "+ ( counter / 10 ) + " seconds to do it!");
	    	random = Math.round((Math.random() * 255));
			random2 = Math.round((Math.random() * 255));
			random3 = Math.round((Math.random() * 255));
	    	$("body").css("background-color", "rgb("+$pageX+","+$pageY+","+random+")");
	    	box.css("background-color", "rgb("+random2+","+random3+","+random+")");
	    	counter = 0;
	
		}

	}

	colorKeepUp(e, false);
	compareThem(backColor, boxColor);

}





$(document).mousemove(function(e){
	
	
	enclosure(e);
    

}); 



function getTheRGB(value) {
	var a = value.split("(")[1].split(")")[0];
	a = a.split(",");
	
	return a;
}