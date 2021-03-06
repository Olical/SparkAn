/*!
 * SparkAn - A animation function created for the Spark JavaScript library
 * http://flowdev.co.uk/
 * 
 * Copyright 2011, Oliver Caldwell
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/SparkAn
 */

// Create the function
function SparkAn(element, properties, timeframe, easing, callback) {
	/*!
	 * Set up all of the easing methods
	 * frame (time or t)
	 * start (begin or b)
	 * change (c)
	 * duration (d)
	 */
	var easingMethods = {
		inQuad: function (t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		outQuad: function (t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		inOutQuad: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		inCubic: function (t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		outCubic: function (t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		inOutCubic: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
		inQuart: function (t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		outQuart: function (t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		inOutQuart: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		inQuint: function (t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		outQuint: function (t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		inOutQuint: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		inSine: function (t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		outSine: function (t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		inOutSine: function (t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		inExpo: function (t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		outExpo: function (t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		inOutExpo: function (t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		inCirc: function (t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		outCirc: function (t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		inOutCirc: function (t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		inElastic: function (t, b, c, d, a, p) {
			if (t==0) { return b; } 
			if ((t/=d)==1) { return b+c; }
			if (!p) { p=d*.3; }
			if (a < Math.abs(c)) {  a=c; s=p/4; }
			else { a=Math.abs(c); s: p/(2*Math.PI) * Math.asin(c/a);}
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		outElastic: function (t, b, c, d, a, p) {
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else {   a=Math.abs(c); var s= p/(2*Math.PI) * Math.asin (c/a);}
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		inOutElastic: function (t, b, c, d, a, p) {
			if (t==0) return b;  
			if ((t/=d/2)==2) return b+c;  
			if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else {a=Math.abs(c);var s= p/(2*Math.PI) * Math.asin (c/a);}
			if (t < 1) {return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;}
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		inBack: function (t, b, c, d, s) {
			if (s== undefined) s: 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		outBack: function (t, b, c, d, s) {
			if (s== undefined) s: 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		inOutBack: function (t, b, c, d, s) {
			if (s== undefined) s: 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		inBounce: function (t, b, c, d) {
			return c - this.outBounce (d-t, 0, c, d) + b;
		},
		outBounce: function (t, b, c, d) {
			if ((t/=d) < (1/2.75)) { return c*(7.5625*t*t) + b;} 
			else if (t < (2/2.75)) { return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;} 
			else if (t < (2.5/2.75)) { return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;}
			else { return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b; }
		},
		inOutBounce: function (t, b, c, d) {
			if (t < d/2) return this.inBounce (t*2, 0, c, d) * .5 + b;
			return this.outBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	};
	
	// Set a default timeframe
	if(!timeframe) {
		var timeframe = 800;
	}
	
	// Set a default easing
	if(!easing) {
		var easing = 'outQuint';
	}
	
	// Set up the FPS
	var fps = 60;
	
	// Set up any required variables
	var computed = null;
	var original = null;
	var difference = null;
	var frames = null;
	var change = null;
	var unit = null;
	var calculated = null;
	
	// Loop through all of the properties
	for(var p in properties) {
		// Make sure the style is set
		if(element.style[p] === undefined || element.style[p] === '') {
			computed = getComputed(element)[p];
			element.style[p] = (computed) ? computed : 1;
		}
		
		// Fix for IE stuff
		if(element.style[p] == 'auto' && p == 'height') element.style[p] = element.offsetHeight;
		else if(element.style[p] == 'auto' && p == 'width') element.style[p] = element.offsetWidth;
		
		// Get the original
		original = (p == 'opacity') ? parseFloat(element.style[p]) : parseInt(element.style[p]);
		
		// Work out the difference
		difference = ((p == 'opacity') ? parseFloat(properties[p]) : parseInt(properties[p])) - original;
		
		// Work out how many frames
		frames = timeframe / (1000 / fps);
		
		// Work out the unit of measurement
		unit = (isNaN(properties[p])) ? properties[p].replace(/[0-9]/g, '') : 'px';
		
		// Make sure we do not have a unit when setting opacity
		if(p == 'opacity') {
			unit = '';
		}
		
		// Loop through each frame
		for(var i = 0; i <= frames; i++) {
			// Work out the calculated value
			calculated = easingMethods[easing](i, original, difference, frames) + unit;
			
			setTimeout((function(exti, extelement, extp, extcalculated) {
				return function() {
					setStyle(extelement, extp, extcalculated);
				}
			})(i, element, p, calculated), i * (1000 / fps), element, p, calculated);
		}
		
		// Stop the floating point problem
		setTimeout((function(extelement, extp, extproperties, extunit) {
			return function() {
				setStyle(extelement, extp, extproperties[extp] + extunit);
			}
		})(element, p, properties, unit), timeframe, element, p, properties, unit);
	}
	
	// Set callback timer
	if(callback) {
		setTimeout(callback, timeframe);
	}
}

function getComputed(element) {
	// If we can use getComputedStyle
	if(window.getComputedStyle) {
		// Return getComputedStyle
		return window.getComputedStyle(element, null);
	}
	
	// Otherwise return currentStyle
	return element.currentStyle;
};

function setStyle(element, attribute, value) {
	// Check if they provided a css object
	if(attribute !== undefined) {
		// If the selector contains dashes then convert it to the JavaScript version
		if(attribute.indexOf('-') !== -1) {
			element.style[attribute.replace(/-([a-z])/gi, function(s, g1) { return g1.toUpperCase() })] = value;
		}
		else {
			element.style[attribute] = value;
		}
		
		// If opacity is being set we need to set all the other values for cross browser opacity
		if(attribute == 'opacity') {
			element.style.MozOpacity = value;
			element.style.KhtmlOpacity = value;
			element.style.filter = 'alpha(opacity=' + (value * 100) + ')';
			element.style.zoom = '1';
		}
	}
	else {
		// Return the elements attributes
		return element.style;
	}
}