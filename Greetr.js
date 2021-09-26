/*
 *
 * Greetr is a framework that returns greetings for users
 *
 * Supports Spanish and English
 *
 * Supports jQuery framework
 *
 * Supports method chaining
 * (ex. var g = G$("John", "Doe"); g.greet().setLang('es').greet(true))
 *
 */

(function (global, $) {
	// Greetr function constructor
	var Greetr = function (firstName, lastName, language) {
		return new Greetr.init(firstName, lastName, language);
	};

	// Supported language (hidden within scope of IIFE, not directly accessible)
	var supportedLangs = ["en", "es"];

	// Default informal greetings
	var greetings = {
		en: "Hello",
		es: "Hola",
	};

	// Default formal greetings
	var formalGreetings = {
		en: "Greetings",
		es: "Saludos",
	};

	// Log messages
	var logMessages = {
		en: "Logged In",
		es: "Inició sesión",
	};

	// Set default prototype for Greetr. Contains functions for Greetr (to save memory space)
	Greetr.prototype = {
		// 'this' refers to calling object at execution time
		fullName: function () {
			return this.firstName + " " + this.lastName;
		},

		firstName: function () {
			// Returns first name
			return this.firstName;
		},

		lastName: function () {
			// Returns last name
			return this.lastName;
		},

		validate: function () {
			// Checks for valid language
			// References externally inaccessible 'supportedLangs' within closure
			if (supportedLangs.indexOf(this.language) === -1) {
				throw "Invalid language";
			}
		},

		// Retrieve messages from object by referring to properties using [] syntax
		greeting: function () {
			return greetings[this.language] + " " + this.firstName() + "!";
		},

		formalGreeting: function () {
			return formalGreetings[this.language] + ", " + this.fullName();
		},

		// chainable methods return their own containing object
		greet: function (formal) {
			var msg;

			// If undefined or null, it will be coerced to 'false
			if (formal) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}

			if (console) {
				console.log(msg);
			}

			// 'this' refers to calling object at execution time
			// Makes the method chainable
			return this;
		},

		log: function () {
			if (console) {
				console.log(
					logMessages[this.language] + ": " + this.fullName()
				);
			}

			// Make chainable
			return this;
		},

		setLang: function (lang) {
			// Sets the language
			this.language = lang;
			// Validates language
			this.validate();

			// Make chainable
			return this;
		},

		// Accepts a jQuery selector and sets up the greeting, then updates the value
		HTMLGreeting: function (selector, formal) {
			if (!$) {
				throw "jQuery not loading";
			}

			if (!selected) {
				throw "Missing jQuery selector";
			}

			// Determine the message
			var msg;
			if (formal) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}

			// Inject message in chosen place in DOM
			$(selector).html(msg);

			// make chainable
			return this;
		},
	};

	// Actual object is created here, allowing us to create a 'new' object without calling 'new'
	Greetr.init = function (firstName, lastName, language) {
		var self = this;
		self.firstName = firstName || "";
		self.lastName = lastName || "";
		self.language = language || "en";
	};

	// Trick borrow from jQuery so we don't have to use 'new' keyword
	Greetr.init.prototype = Greetr.prototype;

	// Attach our Greetr to the global object, and provide a shorthand '$G'
	global.Greetr = global.G$ = Greetr;
})(window, jQuery);
