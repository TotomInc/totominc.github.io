var Player = {
    ammo: 12,
    ammoReward: 0.55,
    ammoTime: 500, // In ms
    reloadTime: 5000,
    drug: 0,
    drugTime: 15000,
    drugProd: 2,
    drugReward: 3.5,
    sellTime: 7500,
    money: 0,
}
var Misc = {
    ammoWait: "false",
    cookWait: "false",
    sellWait: "false",
    reload: "false",
}
var Upgrade = {
    // Ammo upgrades
    up1: "available",
    up2: "available",
    up3: "available",
    up4: "available",
    up5: "available",
    up6: "available",
    up7: "available",
    up8: "available",
    up9: "available",
    // Production upgrades
    up10: "available",
    up11: "available",
    up12: "available",
    up13: "available",
    up14: "available",
    up15: "available",
    up16: "available",

    up20: "available",

    up30: "available",
    up31: "available",
    up32: "available",
    up33: "available",
    up34: "available",
    up35: "available",
    up36: "available",
    up37: "available",
}

/****
 * Basic functions
 ****/
// Shoot button
$("#btn-shoot").on('click', function () {
    if (Player.ammo >= 1 && Misc.ammoWait == "false") { // Shoot function
        Player.ammo -= 1;
        Misc.ammoWait = "true";
        // Timeout of 0.5s
        setTimeout(function() {
            Player.money += Player.ammoReward;
            Misc.ammoWait = "false";
            if (Player.ammo == 0) {
                $("#btn-shoot").css('background', '#e06666');
                $("#btn-reload").css('background', '#7fb27f')
            };
        }, Player.ammoTime);
        // Bar animation
        $("#btn-filler").animate({width: "100%"}, Player.ammoTime, "linear");
        $("#btn-filler").animate({width: "0%"}, 25, "linear");
     };
});
// Reload button
$("#btn-reload").on('click', function () {
    if (Player.ammo == 0 && Misc.reload == "false") { // Reload function
        Misc.reload = "true";
        // Timeout reload of 5s
        setTimeout(function() {
            Player.ammo = 12;
            Misc.reload = "false";
            $("#btn-shoot").css('background', '#fff');
            $("#btn-reload").css('background', '#fff');
        }, Player.reloadTime);
        // Bar animation
        $("#btn-filler2").animate({width: "100%"}, Player.reloadTime, "linear");
        $("#btn-filler2").animate({width: "0%"}, 50, "linear");
    };
});
// Production bake button
$("#btn-cook").on('click', function() {
    if (Misc.cookWait == "false") { // Bake function
        Misc.cookWait = "true";
        // Timeout of 15s
        setTimeout(function() {
            Player.drug += Player.drugProd;
            Misc.cookWait = "false";
        }, Player.drugTime);
        // Bar animation
        $("#btn-filler3").animate({width: "100%"}, Player.drugTime, "linear");
        $("#btn-filler3").animate({width: "0%"}, 50, "linear");
    };
});
// Production sell button
$("#btn-sell").on('click', function() {
    if (Player.drug >= 1 && Misc.sellWait == "false") { // Sell drug function
        Misc.sellWait = "true";
        // Timeout of 7.5s
        setTimeout(function() {
            Player.drug -= 1;
            Player.money += Player.drugReward;
            Misc.sellWait = "false";
        }, Player.sellTime);
        // Bar animation
        $("#btn-filler4").animate({width: "100%"}, Player.sellTime, "linear");
        $("#btn-filler4").animate({width : "0%"}, 50, "linear");
    };
});

/****
 * Upgrades
 ****/
// Copper bullets
$("#btn-up-ammo").on('click', function() {
    if (Player.money >= 30) {
        Player.money -= 30;
        Player.ammoReward = 1.35;
        Player.ammoTime = 450;
        Player.reloadTime = 4000;
        Upgrade.up1 = "bought";
        $("#btn-up-ammo").slideToggle("fast");
        $("#btn-up-ammo2").slideToggle("fast");
    };
});
// Silver bullets
$("#btn-up-ammo2").on('click', function() {
    if (Player.money >= 322.5) {
        Player.money -= 322.5;
        Player.ammoTime = 400;
        Player.ammoReward = 2.7;
        Player.reloadTime = 3500;
        Upgrade.up2 = "bought";
        $("#btn-up-ammo2").slideToggle("fast");
        $("#btn-up-ammo3").slideToggle("fast");
    };
});
// Gold bullets
$("#btn-up-ammo3").on('click', function() {
    if (Player.money >= 3466.8) {
        Player.money -= 3466.8;
        Player.ammoTime = 350;
        Player.ammoReward = 5.4;
        Player.reloadTime = 3000;
        Upgrade.up3 = "bought";
        $("#btn-up-ammo3").slideToggle("fast");
        $("#btn-up-ammo4").slideToggle("fast");
    };
});


// Production up 1
$("#btn-up-prod").on('click', function() {
    if (Player.money >= 15) {
        Player.money -= 15;
        Player.drugTime = 13500;
        Player.sellTime = 6000;
        Upgrade.up10 = "bought";
        $("#btn-up-prod").slideToggle("fast");
        $("#btn-up-prod2").slideToggle("fast");
    };
});
// Production up 2
$("#btn-up-prod2").on('click', function() {
    if (Player.money >= 150) {
        Player.money -= 150;
        Player.drugTime = 10000;
        Player.sellTime = 5000;
        Upgrade.up11 = "bought";
        $("#btn-up-prod2").slideToggle("fast");
        $("#btn-up-prod3").slideToggle("fast");
    };
});
// Production up 3
$("#btn-up-prod3").on('click', function() {
    if (Player.money >= 500) {
        Player.money -= 500;
        Player.drugTime = 8500;
        Player.sellTime = 4000;
        Upgrade.up12 = "bought";
        $("#btn-up-prod3").slideToggle("fast");
        $("#btn-up-prod4").slideToggle("fast");
    };
});
// Production up 4
$("#btn-up-prod4").on('click', function() {
    if (Player.money >= 5000) {
        Player.money -= 5000;
        Player.drugTime = 7000;
        Player.sellTime = 3000;
        Upgrade.up13 = "bought";
        $("#btn-up-prod4").slideToggle("fast");
        $("#btn-up-prod5").slideToggle("fast");
    };
});
// Production up 5
$("#btn-up-prod5").on('click', function() {
    if (Player.money >= 20000) {
        Player.money -= 20000;
        Player.drugTime = 6000;
        Player.sellTime = 2500;
        Upgrade.up14 = "bought";
        $("#btn-up-prod5").slideToggle("fast");
        $("#btn-up-prod6").slideToggle("fast");
    };
});
// Production up 6
$("#btn-up-prod6").on('click', function() {
    if (Player.money >= 75000) {
        Player.money -= 75000;
        Player.drugTime = 5000;
        Player.sellTime = 2000;
        Upgrade.up15 = "bought";
        $("#btn-up-prod6").slideToggle("fast");
    };
});

// Production up 10
$("#btn-up-prod10").on('click', function() {
    if (Player.money >= 50) {
        Player.money -= 50;
        Player.drugProd = 4;
        Upgrade.up20 = "bought";
        $("#btn-up-prod10").slideToggle("fast");
    };
});

// Production up 20
$("#btn-up-prod20").on('click', function() {
    if (Player.money >= 22.5) {
        Player.money -= 22.5;
        Player.drugReward *= 2;
        Upgrade.up30 = "bought";
        $("#btn-up-prod20").slideToggle("fast");
        $("#btn-up-prod21").slideToggle("fast");
    };
});
// Production up 21
$("#btn-up-prod21").on('click', function() {
    if (Player.money >= 75) {
        Player.money -= 75;
        Player.drugReward *= 2;
        Upgrade.up31 = "bought";
        $("#btn-up-prod21").slideToggle("fast");
        $("#btn-up-prod22").slideToggle("fast");
    };
});
// Production up 22
$("#btn-up-prod22").on('click', function() {
    if (Player.money >= 850) {
        Player.money -= 850;
        Player.drugReward *= 2;
        Upgrade.up32 = "bought";
        $("#btn-up-prod22").slideToggle("fast");
        $("#btn-up-prod23").slideToggle("fast");
    };
});
// Production up 23
$("#btn-up-prod23").on('click', function() {
    if (Player.money >= 3250) {
        Player.money -= 3250;
        Player.drugReward *= 3;
        Upgrade.up33 = "bought";
        $("#btn-up-prod23").slideToggle("fast");
        $("#btn-up-prod24").slideToggle("fast");
    };
});
// Production up 24
$("#btn-up-prod24").on('click', function() {
    if (Player.money >= 9800) {
        Player.money -= 9800;
        Player.drugReward *= 3;
        Upgrade.up34 = "bought";
        $("#btn-up-prod24").slideToggle("fast");
        $("#btn-up-prod25").slideToggle("fast");
    };
});
// Production up 25
$("#btn-up-prod25").on('click', function() {
    if (Player.money >= 22500) {
        Player.money -= 22500;
        Player.drugReward *= 3;
        Upgrade.up35 = "bought";
        $("#btn-up-prod25").slideToggle("fast");
    };
});


/****
 * Save functions
 ****/
function saveGame() {
    localStorage.setItem("save",JSON.stringify(Player));
    localStorage.setItem("saveup",JSON.stringify(Upgrade));
};
function loadGame() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    Player.ammo = savegame.ammo;
    Player.ammoReward = savegame.ammoReward;
    Player.ammoTime = savegame.ammoTime;
    Player.reloadTime = savegame.reloadTime;
    Player.drug = savegame.drug;
    Player.drugTime = savegame.drugTime;
    Player.drugProd = savegame.drugProd;
    Player.drugReward = savegame.drugReward;
    Player.sellTime = savegame.sellTime;
    Player.money = savegame.money;
    var saveupgame = JSON.parse(localStorage.getItem("saveup"));
    Upgrade.up1 = saveupgame.up1;
    Upgrade.up2 = saveupgame.up2;
    Upgrade.up3 = saveupgame.up3;
    Upgrade.up4 = saveupgame.up4;
    Upgrade.up5 = saveupgame.up5;
    Upgrade.up6 = saveupgame.up6;
    Upgrade.up7 = saveupgame.up7;
    Upgrade.up8 = saveupgame.up8;
    Upgrade.up9 = saveupgame.up9;
    Upgrade.up10 = saveupgame.up10;
    Upgrade.up11 = saveupgame.up11;
    Upgrade.up12 = saveupgame.up12;
    Upgrade.up13 = saveupgame.up13;
    Upgrade.up14 = saveupgame.up14;
    Upgrade.up15 = saveupgame.up15;
    Upgrade.up16 = saveupgame.up16;
    Upgrade.up20 = saveupgame.up20;
    Upgrade.up30 = saveupgame.up30;
    Upgrade.up31 = saveupgame.up31;
    Upgrade.up32 = saveupgame.up32;
    Upgrade.up33 = saveupgame.up33;
    Upgrade.up34 = saveupgame.up34;
    Upgrade.up35 = saveupgame.up35;
    Upgrade.up36 = saveupgame.up36;
    // Ammo upgrades
    if (Upgrade.up1 == "available") {
        $("#btn-up-ammo").css('display', 'block');
    };
    if (Upgrade.up1 == "bought" && Upgrade.up2 == "available") {
        $("#btn-up-ammo").css('display' , 'none'); // Hide 1st upgrade
        $("#btn-up-ammo2").css('display', 'block'); // Show 2nd upgrade
    };
    if (Upgrade.up2 == "bought" && Upgrade.up3 == "available") {
        $("#btn-up-ammo").css('display', 'none');
        $("#btn-up-ammo3").css('display', 'block');
    };
    if (Upgrade.up3 == "bought") {
        $("#btn-up-ammo").css('display', 'none');
    };
    // Production upgrades
    if (Upgrade.up10 == "available") {
        $("#btn-up-prod").css('display', 'block');
    };
    if (Upgrade.up10 == "bought" && Upgrade.up11 == "available") {
        $("#btn-up-prod").css('display' , 'none'); // Hide 1st upgrade
        $("#btn-up-prod2").css('display', 'block'); // Show 2nd upgrade
    };
    if (Upgrade.up11 == "bought" && Upgrade.up12 == "available") {
        $("#btn-up-prod").css('display' , 'none');
        $("#btn-up-prod3").css('display', 'block');
    };
    if (Upgrade.up12 == "bought" && Upgrade.up13 == "available") {
        $("#btn-up-prod").css('display' , 'none');
        $("#btn-up-prod4").css('display', 'block');
    };
    if (Upgrade.up13 == "bought" && Upgrade.up14 == "available") {
        $("#btn-up-prod").css('display' , 'none');
        $("#btn-up-prod5").css('display', 'block');
    };
    if (Upgrade.up14 == "bought" && Upgrade.up15 == "available") {
        $("#btn-up-prod").css('display' , 'none');
        $("#btn-up-prod6").css('display', 'block');
    };
    if (Upgrade.up15 == "bought") {
        $("#btn-up-prod").css('display' , 'none');
        $("#btn-up-prod6").css('display' , 'none');
    };

    if (Upgrade.up20 == "available") {
        $("#btn-up-prod10").css('display', 'block');
    };
    if (Upgrade.up20 == "bought") {
        $("#btn-up-prod10").css('display', 'none');
    };

    if (Upgrade.up30 == "available") {
        $("#btn-up-prod20").css('display' , 'block');
    };
    if (Upgrade.up30 == "bought" && Upgrade.up31 == "available") {
        $("#btn-up-prod20").css('display' , 'none');
        $("#btn-up-prod21").css('display', 'block');
    };
    if (Upgrade.up31 == "bought" && Upgrade.up32 == "available") {
        $("#btn-up-prod20").css('display' , 'none');
        $("#btn-up-prod22").css('display', 'block');
    };
    if (Upgrade.up32 == "bought" && Upgrade.up33 == "available") {
        $("#btn-up-prod20").css('display' , 'none');
        $("#btn-up-prod23").css('display', 'block');
    };
    if (Upgrade.up33 == "bought" && Upgrade.up34 == "available") {
        $("#btn-up-prod20").css('display' , 'none');
        $("#btn-up-prod24").css('display', 'block');
    };
    if (Upgrade.up34 == "bought" && Upgrade.up35 == "available") {
        $("#btn-up-prod20").css('display' , 'none');
        $("#btn-up-prod25").css('display', 'block');
    };
    if (Upgrade.up34 == "bought") {
        $("#btn-up-prod20").css('display' , 'none');
        $("#btn-up-prod25").css('display', 'none');
    };

};
function resetGame() {
    localStorage.removeItem("save");
    localStorage.removeItem("saveup");
    location.reload();
};


/****
 * Init/loop functions
 ****/
function init() {
    // Upgrades init
    $("#btn-up-ammo").css('display', 'block');
    $("#btn-up-prod").css('display', 'block');
    $("#btn-up-prod10").css('display', 'block');
    $("#btn-up-prod20").css('display', 'block');
    // Guns
    $("#btn-shoot-info").html("+" + Player.ammoReward + "$/shoot");
    $("#btn-shoot-time").html("Time : " + "0.5s");
    $("#btn-reload-time").html("Time : " + "5s")
    // Production
    $("#btn-cook-info").html("+" + Player.drugProd + "g/click");
    $("#btn-cook-time").html("Time : " + "15s");
    $("#btn-sell-info").html("+" + Player.drugReward + "$/g");
    $("#btn-sell-time").html("Time : " + "7.5s")
};
function loop() {
    // Headers
    $("#header-money").html(Player.money.toFixed(2) + "$");
    $("#header-drug").html(Player.drug.toFixed(2) + "g");
    $("#header-bullets").html(Player.ammo + " ammo");
    // On buttons
    $("#btn-shoot-info").html("+" + Player.ammoReward.toFixed(2) + "$/shoot");
    $("#btn-shoot-time").html("Time : " + Player.ammoTime / 1000 + "s");
    $("#btn-reload-time").html("Time : " + Player.reloadTime / 1000 + "s");
    $("#btn-cook-info").html("+" + Player.drugProd.toFixed(2) + "g/click");
    $("#btn-cook-time").html("Time : " + Player.drugTime / 1000 + "s");
    $("#btn-sell-info").html("+" + Player.drugReward.toFixed(2) + "$/g");
    $("#btn-sell-time").html("Time : " + Player.sellTime / 1000 + "s");
};
window.setInterval(function() {
    loop();
}, 10);