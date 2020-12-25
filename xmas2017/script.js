function time() {

	/* Object for "Date" */
	var d = new Date();
	var month = d.getMonth();
	var day = d.getDate();
	var year = d.getYear();

	/* Checks if the current date is greater than or equal to the 25th December (Christmas Day)  */
	if (day >= 25 && month == 11) {
		document.getElementById("clock").innerHTML = '<span class="clocktimeunit">0 DAYS, 0 HOURS,</span><br/><span class="clocktimeunit">0 MINUTES, 0 SECONDS, </span>';
		// The return keyword ends the function here as we don't need to calculate how many days until Christmas. It's already Christmas! Ho ho ho 🎅  
		return;
	}

	/* Array storing the number of seconds in each month */
	var monthSeconds = [2678400, 2419200, 2678400, 2592000, 2678400, 2592000, 2678400, 2678400, 2592000, 2678400, 2592000, 2678400];
	
	/* Determines the amount of seconds there are in the current year depending on whether or not it is a leap year */

	if (year % 4 == 0 && year % 100 == 0 && year % 400 == 0) {
		secondsFromStart = 31622400;
		monthSeconds[1] += 86400;
	}
	else {
		secondsFromStart = 31536000;
	}
	
	/* Adds up all the seconds from the previous months */
	var secondsFromNow = 0;
	for (var i = 0; i != month; i++) {
		secondsFromNow += monthSeconds[i];
	}
	
	/* Calculates the number of seconds until Christmas (the 518400 is the number of seconds Christmas is before Jan 1st) */
	secondsFromNow = secondsFromStart - (d.getSeconds() + (d.getMinutes() * 60) + (d.getHours() * 3600) + (d.getDate() * 86400) + secondsFromNow) - 518400;
	
	/* Ensures no negative numbers are displayed (loops the clock back round to 364 days, 23 hours, 59 minutes and 59 seconds) */
	if (secondsFromNow < 0) {
		secondsFromNow += secondsFromStart;
	}
	
	/* Converts seconds into days, hours, minutes and seconds */
	var seconds = secondsFromNow % 60;
	var minutes = Math.floor(secondsFromNow / 60);
	var hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	var days = Math.floor(hours / 24);
	hours = hours % 24;
	
	/* Displays the information in a nice format */
	document.getElementById("clock").innerHTML = days + "<span class='clocktimeunit'> DAYS, </span>" + hours + "<span class='clocktimeunit'> HOURS, </span>" + "</br>" + minutes + "<span class='clocktimeunit'> MINUTES, </span> " + seconds + "<span class='clocktimeunit'> SECONDS, </span>";

}

function snow(){
	
	/*Get the canvas element and store in vars*/
	var canvas = document.getElementById("sky");
	var ctx = canvas.getContext("2d");
	
	/*Set canvas size to window height and width*/
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	/*Generate the snowflakes and apply attributes*/
	var mf = 100; //max flaxes
	var flakes = [];
	
	/*Loop through the empty flakes and apply attributes*/
	for(var i = 0; i < mf; i++)
	{
		flakes.push({
			x: Math.random()*W,
			y: Math.random()*H,
			r: Math.random()*5+2, // min of 2px and max of 7px
			d: Math.random() + 1 //density of the flake
		})
	}
	
	/*Draw flakes onto canvas */
	function drawFlakes()
	{
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle = "white";
		ctx.beginPath();
		for(var i = 0; i < mf; i++)
		{
			var f = flakes[i];
			ctx.moveTo(f.x, f.y);
			ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		moveFlakes();
	}
	
	//Animate the flakes
	var angle = 0;
	
	function moveFlakes() {
		angle += 0.01;
		for(var i = 0; i < mf; i++)
		{
			//store the current flake
			var f = flakes[i];
			
			//update X and Y coordinates of each snowflake
			f.y += Math.pow(f.d, 2) + 1;
			f.x += Math.sin(angle) * 2;
			
			//If the snowflake reaches the bottom, send a new one to the top
			if(f.y > H) {
				flakes[i] = {x: Math.random()*W, y: 0, r: f.r, d: f.d};
			}
		}
	}
	setInterval(drawFlakes, 25);
}

