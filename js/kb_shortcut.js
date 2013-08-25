/*************************************************************
 * This script is developed by Arturs Sosins aka ar2rsawseen, http://webcodingeasy.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * Keyboard shortcut class provides ability to bind functions
 * to custom key combinations.
 *
 * For more information, examples and online documentation visit: 
 * http://webcodingeasy.com/JS-classes/Multiple-key-combinations-using-javascript
**************************************************************/
var kb_shortcut = function() {
	var ob = this;
	var collection = [];
	var trans = {"107" : 47, "109" : 45, "189" : 45, "106" : 42, "191" : 47, "111" : 47, "186" : 59, "187" : 61, "188" : 44, "190" : 46, "192" : 96, "219" : 91, "220" : 92, "221" : 93};
	var buffer = [];
	var holdon = [];
	this.construct = function(){
		add_event(document, "keydown", function(e){
			e = get_event(e);
			//get codes cross browser
			var code = (trans[e.keyCode]) ? trans[e.keyCode] : e.keyCode;
			//add code to buffer
			buffer.push(code);
			//create combination template
			buffer.sort();
			var template = buffer.join("_");
			//if template exists
			if(collection[template] && !collection[template][3])
			{
				var comb = collection[template];
				if(comb[1] > 0)
				{	
					comb[0]();
					if(!holdon[code])
					{
						comb[3] = true;
						holdon[code] = [setInterval(comb[0], comb[1]), template];
					}
				}
				else
				{
					//if have a match, execute callback function
					comb[0]();
				}
				//should event be prevented
				if(comb[2])
				{
					//prevent default behavoir
					prevent_default(e);
				}
				//empty buffer
				buffer = [];
			}
		});
		//if keys are released, no combination needed
		add_event(document, "keyup", function(e){
			e = get_event(e);
			//get codes cross browser
			var code = (trans[e.keyCode]) ? trans[e.keyCode] : e.keyCode;
			if(holdon[code])
			{
				clearInterval(holdon[code][0]);
				collection[holdon[code][1]][3] = false;
				delete holdon[code];
			}
			//empty buffer
			buffer = [];
		});
	};
	
	this.add = function(arr, callback, hold, stop){
		hold = (!hold) ? 0 : hold;
		stop = (!stop) ? false : stop;
		if(typeof(arr) != "object")
		{
			//convert to array
			arr = [arr];
		}
		for(var i in arr)
		{
			//get code of provided string
			arr[i] = get_code(String(arr[i]).toUpperCase());
		}
		//create template of conmbination
		arr.sort();
		arr = arr.join("_");
		//add to combination collection
		collection[arr] = [callback, hold, stop, false];
	};
	
	//get button code
	var get_code = function(key){
		if(key.length == 1)
		{
			var code = key.charCodeAt(0);
			if(code >= 65 || code <= 90)
			{
				return code;
			}
		}
		var ret = {
			"SPACE" : 32, "ENTER" : 13, "TAB" : 9, "ESC" : 27, "BACKSPACE" : 8, "SHIFT" : 16, "CTRL" : 17, "ALT" : 18, "CAPS LOCK" : 20, "NUM LOCK" : 144, "LEFT" : 37, "UP" : 38, "RIGHT" : 39, "DOWN" : 40, "INS" : 45, "DEL" : 46, "HOME" : 36, "END" : 35, "PAGE UP" : 33, "PAGE DOWN" : 34, "F1" : 112, "F2" : 113, "F3" : 114, "F4" : 115, "F5" : 116, "F6" : 117, "F7" : 118, "F8" : 119, "F9" : 120, "F10" : 121, "F11" : 122, "F12" : 123, "0" : 48, "1" : 49, "2" : 50, "3" : 51, "4" : 52, "5" : 53, "6" : 54, "7" : 55, "8" : 56, "9" : 57, "+" : 43, "-" : 45, "*" : 42, "/" : 47, ";" : 59, "=" : 61, "," : 44, "." : 46, "`" : 96, "[" : 91, "\\" : 92, "]" : 93, "'" : 222
		};
		return ret[key];
	};
	
	//add event
	var add_event = function(element, type, listener){
		if(element.addEventListener)
		{
			element.addEventListener(type, listener, false);
		}
		else
		{
			element.attachEvent('on' +  type, listener);
		}
	};
	
	//get event object
	var get_event = function(event){
		return (!event) ? window.event : event;
	};
	
	//prevent default event behavior
	var prevent_default = function(event){
		if(window.event)
		{
			window.event.returnValue = false;
		}
		else if(event.preventDefault)
		{
			event.preventDefault();
		}
		else
		{
			event.returnValue = false;
		}
	};
	
	this.construct();
}