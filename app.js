var g = G$("John", "Doe");

$("#login").bind("click", function () {
	var loginGrtr = G$("John", "Doe");

	$("#logindiv").hide();

	var lang = $("#lang").val();
	loginGrtr.setLang(lang).HTMLGreeting(greeting, true).log();
});
