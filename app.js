// Gets a new object
var g = G$("John", "Doe");

// Use object on click of login button
$("#login").bind("click", function () {
	// Create new Greetr object
	var loginGrtr = G$("John", "Doe");

	// Hide login on screen
	$("#logindiv").hide();

	// Fire off HTML greeting, using jQuery selector and chosen language
	var lang = $("#lang").val();
	loginGrtr.setLang(lang).HTMLGreeting("#greeting", true).log();
});
