g.tutorial = g.t = {};
g.t.spacer = "<br>--------------<br>";
g.t.fast = {
	check: true,
	string: 'dev mode enabled' + g.t.spacer
};
g.t.intro1 = {
	check: false,
	string: 'Welcome to <b>Universe-God</b>.<br> ' +
			"^2000In this game, you are the god.<br> " +
			"^2000Your first goal is to create your first <b>habitable</b> planet, let's call this planet <b>the Earth</b>.<br> " +
			"^2000Reach <b>20 atoms</b> of hydrogen and <b>10 atoms</b> of oxygen." + g.t.spacer
};
g.t.intro2 = {
	check: false,
	string: 'Good job! You can now generate some <b>water</b>.<br> ' +
			"^2000Water cost 20 hydrogen and 10 oxygen.<br> "+
			"^2000His cost <b>doesn't increase</b>.<br> " +
			"^2000Reach <b>3 mL</b> of water.<br> " +
			"^2000You can also buy some <b>upgrades</b> to help you earn more ressources/click." + g.t.spacer
};
g.t.intro3 = {
	check: false,
	string: "Nice, your planet now got some <b>water</b>, but this water is cold.<br> " +
			"^2000You need to raise the temperature.<br> " +
			"^2000Let's create a <b>sun</b>. To make it, you need :<br> " +
			"^2000 75 hydrogen, 15 helium and 10 oxygen. Then, create the Sun." + g.t.spacer
};
g.t.intro4 = {
	check: false,
	string: "You created the Sun, it's a good beginning.<br> " +
			"^2000The Sun has powers :<br> " +
			"^2000it can generate a certain amount of ressources/sec.<br> " +
			"^2000Your planet also need an <b>atmosphere</b>.<br> " +
			"^2000Without atmosphere, the cells can not live longer.<br> " +
			"^2000Buy an atmoshpere generator." + g.t.spacer
};
g.t.intro5 = {
	check: false,
	string: "Great, now you can generate cells.<br> " +
			"^2000But your amount of cells is limited by your number of water : <br>" +
			"^2000<b>10 cells/mL of water</b>.<br> " +
			"^2000Each cell generate <b>0.1 meat/sec</b>. <br>" + g.t.spacer +
			"^2000<b>This is the end of the tutorial. Keep playing to unlock new features!</b>" + g.t.spacer
};

game.tutorial.intro = function() {
	if (g.t.fast.check == true) {
		g.t.intro1.string = "intro 1";
		g.t.intro2.string = "intro 2";
		g.t.intro3.string = "intro 3";
		g.t.intro4.string = "intro 4";
		g.t.intro5.string = "intro 5 - end";
	};
	if (g.t.intro1.check == false) {
		$("#log-well").append('<p class="no-margin"><span id="intro-text-1"></span></p>');
		$("#intro-text-1").typed({
			strings: [g.t.intro1.string],
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
			callback: function() {
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
	};
};