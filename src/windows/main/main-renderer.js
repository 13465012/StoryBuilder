window.$ = window.jQuery = require("jquery");

// onload
$(document).ready(function() {

	$('#main').keyup(function(event) {

		// check that space has been pressed

		// get contents of text area
		aTXT = $("#main").val();

		// copy contents to syntax
		$("#mainSyntax").html(aTXT);

		// adjust syntax to main scroll
		var y = $("#main").scrollTop();
		$("#mainSyntax").scrollTop(y);

	});

	$('#main').scroll(function() {
		// adjust syntax to main scroll
		var y = $("#main").scrollTop();
		$("#mainSyntax").scrollTop(y);
	});
});
