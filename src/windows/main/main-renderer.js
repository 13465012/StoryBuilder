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

// onload
$(document).ready(function() {

	$('#main').keyup(function(event) {

		// check that space has been pressed

		// get contents of text area
		var aTXT = $("#main").val();
		aTXT += "<br />";

		// apply test styling
		aTXT = aTXT.split("bold");
		aTXT = aTXT.join("<b>bold</b>");

		// copy contents to syntax
		$("#mainSyntax").html(aTXT);

		// adjust syntax to main scroll
		var y = $("#main").scrollTop();
		$("#mainSyntax").scrollTop(y);
		// adjyst syntax to scroll left;
		var y = $("#main").scrollLeft();
		$("#mainSyntax").scrollLeft(y);

	});

	$('#main').scroll(function() {
		// adjust syntax to main scroll
		var y = $("#main").scrollTop();
		$("#mainSyntax").scrollTop(y);

		// adjyst syntax to scroll left;
		var y = $("#main").scrollLeft();
		$("#mainSyntax").scrollLeft(y);
	});
});
