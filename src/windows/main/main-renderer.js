/* License Declaration
MIT License

Copyright (c) 2016 James Hilton

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

window.$ = window.jQuery = require("jquery");

var scheck;
var checking = false;
var aTXT = [""];
var aTXTraw = [""];
var aTXTprev = [""];

function compare_same_length() {
	var e = aTXTprev.length - 1;
	var s = 0;
	var s_move = true;
	var e_move = true;
	var changed = [-1,-1];

	// find change from start
	while(s < aTXTprev.length && s_move) {
		if(aTXTraw[s] != aTXTprev[s]) {
			changed[0] = s;
			s_move = false;
		}
		else {
			s++;
		}
		if(s == aTXTprev.length) {
			changed[0] = -1;
		}
	}

	// find change from end
	while(e >= s && e_move) {
		if(aTXTraw[e] != aTXTprev[e]) {
			changed[1] = e;
			e_move = false;
		}
		else {
			if(e == 0) {
				changed[1] = changed[0];
				e_move = false;
			}
			e--;
		}

	}
	return changed;
}

function match_length_shorter() {
	var e = aTXTraw.length - 1;
	var eo = aTXTprev.length - 1;
	var comp = true;

	while(e >= 0 && comp == true) {
		if(aTXTraw[e] != aTXTprev[eo]) {
				aTXTprev.splice(e+1,eo-e);
				aTXT.splice(e+1,eo-e);
				comp = false;
		}
		e--;
		eo--;
	}

}

function match_length_longer() {
	var e = aTXTraw.length - 1;
	var eo = aTXTprev.length -1;
	var matching = true;

	while(eo >= 0 && matching) {
		if(aTXTraw[e] != aTXTprev[eo]) {
			for(var i = 0;i< e-eo;i++) {
				aTXTprev.splice(eo+1,0," ");
				aTXT.splice(eo+1,0," ");
			}
			matching = false;
		}
		e--;
		eo--;
	}
}



function CheckSpelling(i,z) {
	// check word i
	if(scheck.isCorrect(aTXTraw[i]) == false) {
		var tmp = "";
		for(var c = 0; c < aTXTraw[i].length;c++) {
			tmp += "_";
		}
		aTXT[i] = "<span class='spelling' onclick=\"alert('a clicked!');\">" + tmp + "</span>";
	}
	else {
		var tmp = "";
		for(var c = 0; c < aTXTraw[i].length;c++) {
			tmp += " ";
		}
		aTXT[i] = tmp;
	}
	// move to next word
	i += 1;

	// check if all words checked
	if(i > z) {
		$("mainSyntax").empty();
		$("#mainSyntax").html(aTXT.join(" "));
		checking = false;
		console.log("Returned at length " + i);
		return;
	}

	// move to next word
	setTimeout(CheckSpelling(i,z), 0);
	return;
}

function repeat() {
	if(checking == false && scheck.finish) {
		aTXTprev = aTXTraw;
		aTXTraw = $("#main").val().split(" ");



		if(aTXTraw.length < aTXTprev.length) {
			match_length_shorter();
		}
		if(aTXTraw.length > aTXTprev.length) {
			match_length_longer();
		}
		var pos = compare_same_length();
		if(pos[0] != -1 && pos[1] != -1) {
			//alert(pos);
			checking = true;
			CheckSpelling(pos[0],pos[1]);
		}
	}
	setTimeout(repeat, 100);
}

// onload
$(document).ready(function() {
	// get spellchecker object
	scheck = new SpellChecker();



	$('#main').keyup(function(event) {
		repeat();

		// adjust syntax to main scroll
		$("#mainSyntax").scrollTop($("#main").scrollTop());
		// adjyst syntax to scroll left;
		$("#mainSyntax").scrollLeft($("#main").scrollLeft());

	});

	$('#main').scroll(function() {
		// adjust syntax to main scroll
		$("#mainSyntax").scrollTop($("#main").scrollTop());
		// adjyst syntax to scroll left;
		$("#mainSyntax").scrollLeft($("#main").scrollLeft());
	});

	/*$(document).click(function() {
		alert("click interceptted!");
	});*/

	repeat();
});
