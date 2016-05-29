g.tutorial = g.t = {};
g.t.spacer = "<br>--------------<br>";
g.t.allElements = "#btn-1-1, #btn-1-2, #btn-1-3, #btn-2-1, #btn-3-1, #btn-buy-multiplier, #ressources-well, #upgrades-nav, #builds-nav, #dropdown-nav";
g.t.fast = {
	check: false,
};
g.t.back = {
	check: false,
	string: 'Welcome back to <b>Universe-God</b>!'
};
g.t.intro1 = {
	check: false,
	string: 'Welcome to <b>Universe-God</b>.<br> ' +
			"In this game, you are the god.<br> " +
			"Your first goal is to create your first <b>habitable</b> planet, let's call this planet <b>the Earth</b>.<br> " +
			"Reach <b>20 atoms</b> of hydrogen and <b>10 atoms</b> of oxygen." + g.t.spacer
};
g.t.intro2 = {
	check: false,
	string: 'Good job! You can now generate some <b>water</b>.<br> ' +
			"Water cost 20 hydrogen and 10 oxygen : this cost doesn't increase!<br> " +
			"You can also buy some <b>upgrades</b> to help you earn more <b>ressources/click</b>.<br> " +
			"Reach <b>3 mL</b> of water. " + g.t.spacer
};
g.t.intro3 = {
	check: false,
	string: "Nice, your planet now got some <b>water</b>, but this water is cold.<br> " +
			"You need to raise the <b>temperature</b>.<br> " +
			"Let's create a <b>sun</b>. To make it, you need :<br> " +
			"75 hydrogen, 15 helium and 10 oxygen.<br> " +
			"Then, create the Sun." + g.t.spacer
};
g.t.intro4 = {
	check: false,
	string: "You created the Sun, it's a good beginning.<br> " +
			"Your planet also need an <b>atmosphere</b>.<br> " +
			"Without atmosphere, the cells can not live.<br> " +
			"Build an <b>atmoshpere generator</b>." + g.t.spacer
};
g.t.intro5 = {
	check: false,
	string: "Great, now you can generate cells.<br> " +
			"But your amount of cells is limited by your amount of water :<br> " +
			"<b>10 cells/mL of water</b>.<br> " +
			"Each cell generate <b>0.1 meat/sec</b>. " + g.t.spacer +
			"<b>This is the end of the tutorial.<br> Keep playing to unlock new features!</b>"
};

game.tutorial.intro = function() {
	if (g.t.fast.check == true) {
		g.t.intro1.string = 'Dev mode enabled.';
		$(g.t.allElements).fadeIn('slow');
	};
	if (g.t.intro1.check == false) {
		$("#log-well").append('<p class="no-margin"><span id="intro-text-1"></span></p>');
		$("#intro-text-1").typed({
			strings: [g.t.intro1.string],
			typeSpeed: 1,
			callback: function() {
				$("#btn-1-1, #btn-1-2, #ressources-well").fadeIn('slow');
				g.display();
				h.removeCursor();
			}
		});
	};
	if (g.t.intro1.check == true && g.t.intro2.check == false) {
		$("#log-well").append('<p class="no-margin"><span id="intro-text-2"></span></p>');
		$("#intro-text-2").typed({
			strings: [g.t.intro2.string],
			typeSpeed: 1,
			callback: function() {
				$("#btn-2-1, #upgrades-nav").fadeIn('slow');
				h.removeCursor();
			}
		});
	};
	if (g.t.intro2.check == true && g.t.intro3.check == false) {
		$("#log-well").append('<p class="no-margin"><span id="intro-text-3"></span></p>');
		$("#intro-text-3").typed({
			strings: [g.t.intro3.string],
			typeSpeed: 1,
			callback: function() {
				$("#btn-1-3, #btn-3-2").fadeIn('slow');
				h.removeCursor();
			}
		});
	};
	if (g.t.intro3.check == true && g.t.intro4.check == false) {
		$("#log-well").append('<p class="no-margin"><span id="intro-text-4"></span></p>');
		$("#intro-text-4").typed({
			strings: [g.t.intro4.string],
			typeSpeed: 1,
			callback: function() {
				$("#btn-3-3").fadeIn('slow');
				h.removeCursor();
			}
		});
	};
	if (g.t.intro4.check == true && g.t.intro5.check == false) {
		$("#log-well").append('<p class="no-margin"><span id="intro-text-5"></span></p>');
		$("#intro-text-5").typed({
			strings: [g.t.intro5.string],
			typeSpeed: 1,
			callback: function() {
				$("#btn-3-1, #btn-buy-multiplier, #builds-nav, #dropdown-nav").fadeIn('slow');
				h.removeCursor();
			}
		});	
	};
};
game.tutorial.check = function() {
	if (g.t.intro1.check == false && g.ressources.owned[0] >= 20 && g.ressources.owned[1] >= 10) {
		g.t.intro1.check = true;
		g.t.intro();
	};
	if (g.t.intro2.check == false && g.ressources.owned[3] >= 3) {
		g.t.intro2.check = true;
		g.t.intro();
	};
	if (g.t.intro3.check == false && g.ressources.owned[6] == 1) {
		g.t.intro3.check = true;
		g.t.intro();
	};
	if (g.t.intro4.check == false && g.ressources.owned[7] == 1) {
		g.t.intro4.check = true;
		g.t.intro();
		g.t.intro5.check = true;
	};
};
game.tutorial.saveCheck = function() {
	$("#btn-1-1, #btn-1-2, #ressources-well").fadeIn('slow');
	if (g.t.intro1.check == true && g.t.intro2.check == false)
		$("#btn-2-1, #upgrades-nav").fadeIn('slow');
	if (g.t.intro2.check == true && g.t.intro3.check == false)
		$("#btn-1-3, #btn-3-2, #btn-2-1, #upgrades-nav").fadeIn('slow');
	if (g.t.intro3.check == true && g.t.intro4.check == false)
		$("#btn-1-3, #btn-3-2, #btn-2-1, #upgrades-nav, #btn-3-3").fadeIn('slow');
	if ((g.t.intro4.check == true && g.t.intro5.check == false) || g.t.intro5.check == true) {
		$("#btn-1-3, #btn-3-2, #btn-2-1, #upgrades-nav, #btn-3-1, #btn-buy-multiplier, #builds-nav, #dropdown-nav").fadeIn('slow');
		$("#btn-3-2").css('display', 'none');
		$("#log-well").append('<p class="no-margin"><span id="log-back"></span></p>');
		$("#log-back").typed({
			strings: [g.t.back.string],
			typeSpeed: 1,
			callback: function() {
				h.removeCursor();
			}
		});	
	};
};