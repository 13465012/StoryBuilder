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

/*function SplitEvery(string, nSpaces) {
	var sCount = 0;
	for(var x = 0;x < string.length)
}*/

function CheckSpelling(i) {
	// check word i
	if(scheck.isCorrect(aTXT[i]) == false) {
		var tmp = "";
		for(var c = 0; c < aTXT[i].length;c++) {
			tmp += "_";
		}
		aTXT[i] = "<span class='spelling'>" + tmp + "</span>";
	}
	// move to next word
	i += 1;

	// check if all words checked
	if(i >= aTXT.length) {
		$("mainSyntax").empty();
		$("#mainSyntax").html(aTXT.join(" "));
		checking = false;
		console.log("Returned at length " + i);
		return;
	}

	// move to next word
	var memoryStop = setTimeout(CheckSpelling(i), 0);
	return;
}

function repeat() {
	if(checking == false) {
		aTXT = $("#main").val().split(" ");
		checking = true;
		CheckSpelling(0);
	}
	var memoryStop = setTimeout(repeat, 100);
}

// onload
$(document).ready(function() {
	// get spellchecker object
	scheck = new SpellChecker();



	$('#main').keyup(function(event) {


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


	repeat();
});
