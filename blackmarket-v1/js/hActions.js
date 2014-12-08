function shoot() {
    if (ammo[0] >= 1 && helpersTrigged[0] == false) { ammo[0] -= 1; $("#shoot").attr('onclick', '');
        setTimeout(function() { money += ammo[1]; $("#shoot").attr('onclick', 'shoot()'); updateStats(); }, ammo[2]);
        $("#b-f1").animate({width: "100%"}, ammo[2], "linear");
        $("#b-f1").animate({width: "0%"}, 10);
    };
};
function reload() {
    if (ammo[0] == 0 && helpersTrigged[1] == false) { $("#reload").attr('onclick', '');
        setTimeout(function() { ammo[0] = 12; $("#reload").attr('onclick', 'reload()'); updateStats(); }, ammo[3]);
        $("#b-f2").animate({width: "100%"}, ammo[3], "linear");
        $("#b-f2").animate({width: "0%"}, 10);
    };
};
function cook() {
    if (helpersTrigged[2] == false) {
        $("#cook").attr('onclick', '');
        setTimeout(function() { drug[0] += drug[1]; $("#cook").attr('onclick', 'cook()'); updateStats(); }, drug[3]);
        $("#b-f3").animate({width: "100%"}, drug[3], "linear");
        $("#b-f3").animate({width: "0%"}, 10);
    };
};
function sell() {
    if (helpersTrigged[3] == false && drug[0] >= drug[5]) { $("#sell").attr('onclick', '');
        setTimeout(function() { drug[0] -= drug[5]; money += drug[5] * drug[2]; $("#sell").attr('onclick', 'sell()'); updateStats(); }, drug[4]);
        $("#b-f4").animate({width: "100%"}, drug[4], "linear");
        $("#b-f4").animate({width: "0%"}, 10);
    };
};

function hShoot(times) {
    if (helpersOwned[0] == true) {
        if (helpersTrigged[0] == true && ammo[0] >= 1) { // shoot
            progress[0] += times/fps; progress[0] %= ammo[2];
            var width = progress[0]/(ammo[2]/1000) * 100;
            $("#b-f1").css('width', width + '%');
            if (progress[0] > (ammo[2]/1000)) {
                progress[0] = 0; money += ammo[1]; ammo[0]--;
                $("#b-f1").css('width', 0);
            };
        };
        if (helpersTrigged[0] == false) {
            progress[0] = 0;
            $("#b-f1").css('width', 0);
        };
    };
};
function hReload(times) {
    if (helpersOwned[1] == true) {
        if (helpersTrigged[1] == true && ammo[0] == 0) { // reload
            progress[1] += times/fps; progress[1] %= ammo[3];
            var width = progress[1]/(ammo[3]/1000) * 100;
            $("#b-f2").css('width', width + '%');
            if (progress[1] > (ammo[3]/1000)) {
                progress[1] = 0; ammo[0] = 12;
                $("#b-f2").css('width', 0);
            };
        };
        if (helpersTrigged[1] == false) {
            progress[1] = 0;
            $("#b-f2").css('width', 0);
        };
    };
};
function hCook(times) {
    if (helpersOwned[2] == true) {
        if (helpersTrigged[2] == true) {
            progress[2] += times/fps; progress[2] %= drug[3];
            var width = progress[2]/(drug[3]/1000) * 100;
            $("#b-f3").css('width', width + '%');
            if (progress[2] > (drug[3]/1000)) {
                progress[2] = 0; drug[0] += drug[1];
                $("#b-f3").css('width', 0);
            };
        };
        if (helpersTrigged[2] == false) {
            progress[2] = 0;
            $("#b-f3").css('width', 0);
        };
    };
};
function hSell(times) {
    if (helpersOwned[3] == true) {
        if (helpersTrigged[3] == true && drug[0] >= drug[5]) {
            progress[3] += times/fps; progress[3] %= drug[4];
            var width = progress[3]/(drug[4]/1000) * 100;
            $("#b-f4").css('width', width + '%');
            if (progress[3] > (drug[4]/1000)) {
                progress[3] = 0; drug[0] -= drug[5]; money += drug[5] * drug[2];
                $("#b-f4").css('width', 0);
            };
        };
        if (helpersTrigged[3] == false) {
            progress[3] = 0;
            $("#b-f4").css('width', 0);
        };
    };
};