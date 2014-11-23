/****
 *  Everything in this code is under Creative Commons License by TotomInc ©, 2014.
 *  (This license : http://creativecommons.org/licenses/by-nc-nd/3.0/fr/ )
 *  With some help found on the web (like stackoverflow).
 *  This code may not be very good...
 ****/

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width; /* Device width (from stackoverflow : questions/6850164/) */

var owned;
var minAll;
var progress;
var totalMultiplier;
var totalBuildingInc;
var buildingsInc;
var buildingsTime;
var managersOwned;
var upgradesOwned;
var achievementsOwned;

var money;
var totalMoney;
var tokens;
var tokensRate;
var tokensOn;

var init;
var interval = (1000 / 60);
var fps = 60;

var buildings = [
    new Building("Build 1",     4,              1,              1.08, 1.5,  false),
    new Building("Build 2",     60,             60,             1.15, 3,    false),
    new Building("Build 3",     720,            540,            1.14, 6,    false),
    new Building("Build 4",     8640,           4320,           1.13, 12,   false),
    new Building("Build 5",     103680,         51840,          1.12, 24,   false),
    new Building("Build 6",     1244160,        622080,         1.11, 96,   false),
    new Building("Build 7",     14929920,       7464960,        1.10, 384,  false),
    new Building("Build 8",     179159040,      89579520,       1.09, 576,  false),
    new Building("Build 9",     2149908480,     1074954240,     1.08, 1296, false),
    new Building("Build 10",    25789901760,    29668737024,    1.07, 6144, false)
];
var upgrades = [
    new Upgrade("Build 1 profit x3",        250000,             function() {buildingsInc[0] *= 3}),
    new Upgrade("Build 2 profit x3",        500000,             function() {buildingsInc[1] *= 3}),
    new Upgrade("Build 3 profit x3",        1000000,            function() {buildingsInc[2] *= 3}),
    new Upgrade("Build 4 profit x3",        5000000,            function() {buildingsInc[3] *= 3}),
    new Upgrade("Build 5 profit x3",        10000000,           function() {buildingsInc[4] *= 3}),
    new Upgrade("Build 6 profit x3",        25000000,           function() {buildingsInc[5] *= 3}),
    new Upgrade("Build 7 profit x3",        100000000,          function() {buildingsInc[6] *= 3}),
    new Upgrade("Build 8 profit x3",        333333333,          function() {buildingsInc[7] *= 3}),
    new Upgrade("Build 9 profit x3",        666666666,          function() {buildingsInc[8] *= 3}),
    new Upgrade("Build 10 profit x3",       5000000000,         function() {buildingsInc[9] *= 3}),
    new Upgrade("Every Build profit x3",    50000000000,        function() {totalBuildingInc *= 3}),

    new Upgrade("Tokens efficiency of 3%",        100000000000,       function() {tokensRate *= 2}),

    new Upgrade("Build 1 profit x5",        200000000000,       function() {buildingsInc[0] *= 5}),
    new Upgrade("Build 2 profit x5",        500000000000,       function() {buildingsInc[1] *= 5}),
    new Upgrade("Build 3 profit x5",        1000000000000,      function() {buildingsInc[2] *= 5}),
    new Upgrade("Build 4 profit x5",        5000000000000,      function() {buildingsInc[3] *= 5}),
    new Upgrade("Build 5 profit x5",        10000000000000,     function() {buildingsInc[4] *= 5}),
    new Upgrade("Build 6 profit x5",        20000000000000,     function() {buildingsInc[5] *= 5}),
    new Upgrade("Build 7 profit x5",        50000000000000,     function() {buildingsInc[6] *= 5}),
    new Upgrade("Build 8 profit x5",        70000000000000,     function() {buildingsInc[7] *= 5}),
    new Upgrade("Build 9 profit x5",        100000000000000,    function() {buildingsInc[8] *= 5}),
    new Upgrade("Build 10 profit x5",       200000000000000,    function() {buildingsInc[9] *= 5}),
    new Upgrade("Every Build profit x5",    500000000000000,    function() {totalBuildingInc *= 5}),

    new Upgrade("Tokens efficiency of 6%",  750000000000000,       function() {tokensRate *= 2}),

    new Upgrade("Build 1 profit x9",        2500000000000000,       function() {buildingsInc[0] *= 9}),
    new Upgrade("Build 2 profit x9",        5000000000000000,       function() {buildingsInc[1] *= 9}),
    new Upgrade("Build 3 profit x9",        75000000000000000,      function() {buildingsInc[2] *= 9}),
    new Upgrade("Build 4 profit x9",        10000000000000000,      function() {buildingsInc[3] *= 9}),
    new Upgrade("Build 5 profit x9",        20000000000000000,     function() {buildingsInc[4] *= 9}),
    new Upgrade("Build 6 profit x9",        30000000000000000,     function() {buildingsInc[5] *= 9}),
    new Upgrade("Build 7 profit x9",        50000000000000000,     function() {buildingsInc[6] *= 9}),
    new Upgrade("Build 8 profit x9",        70000000000000000,     function() {buildingsInc[7] *= 9}),
    new Upgrade("Build 9 profit x9",        100000000000000000,    function() {buildingsInc[8] *= 9}),
    new Upgrade("Build 10 profit x9",       200000000000000000,    function() {buildingsInc[9] *= 9}),
    new Upgrade("Every Build profit x9",    750000000000000000,    function() {totalBuildingInc *= 9}),

    new Upgrade("Tokens efficiency of 12%",  10000000000000000000,       function() {tokensRate *= 2})
];
var managers = [
    new Manager("Manager Build 1", 1000),
    new Manager("Manager Build 2", 15000),
    new Manager("Manager Build 3", 100000),
    new Manager("Manager Build 4", 500000),
    new Manager("Manager Build 5", 1200000),
    new Manager("Manager Build 6", 10000000),
    new Manager("Manager Build 7", 111111111),
    new Manager("Manager Build 8", 555555555),
    new Manager("Manager Build 9", 10000000000),
    new Manager("Manager Build 10",100000000000)
];
var achievements = [
    new Achievement("Acquire 25 of the Build 1", "speed x2!",   "owned[0]", 25, "buildingsTime[0]",  "/2"),
    new Achievement("Acquire 50 of the Build 1", "speed x2!",   "owned[0]", 50, "buildingsTime[0]",  "/2"),
    new Achievement("Acquire 100 of the Build 1", "speed x3!",   "owned[0]", 100, "buildingsTime[0]",  "/3"),
    new Achievement("Acquire 150 of the Build 1", "speed x2!",   "owned[0]", 150, "buildingsTime[0]",  "/2"),
    new Achievement("Acquire 200 of the Build 1", "speed x2!",   "owned[0]", 200, "buildingsTime[0]",  "/2"),
    new Achievement("Acquire 300 of the Build 1", "speed x2!",   "owned[0]", 300, "buildingsTime[0]",  "/2"),
    new Achievement("Acquire 400 of the Build 1", "speed x2!",   "owned[0]", 400, "buildingsTime[0]",  "/2"),
    new Achievement("Acquire 500 of the Build 1", "speed x2!",   "owned[0]", 500, "buildingsTime[0]",  "/2"),
    new Achievement("Acquire 600 of the Build 1", "profit x2!",   "owned[0]", 600, "buildingsInc[0]",  "*2"),
    new Achievement("Acquire 700 of the Build 1", "profit x2!",   "owned[0]", 700, "buildingsInc[0]",  "*2"),
    new Achievement("Acquire 800 of the Build 1", "profit x2!",   "owned[0]", 800, "buildingsInc[0]",  "*2"),
    new Achievement("Acquire 900 of the Build 1", "profit x2!",   "owned[0]", 900, "buildingsInc[0]",  "*2"),
    new Achievement("Acquire 1000 of the Build 1", "profit x3!",   "owned[0]", 1000, "buildingsInc[0]",  "*3"),

    new Achievement("Acquire 25 of the Build 2", "speed x2!",   "owned[1]", 25, "buildingsTime[1]",  "/2"),
    new Achievement("Acquire 50 of the Build 2", "speed x2!",   "owned[1]", 50, "buildingsTime[1]",  "/2"),
    new Achievement("Acquire 100 of the Build 2", "speed x3!",   "owned[1]", 100, "buildingsTime[1]",  "/3"),
    new Achievement("Acquire 150 of the Build 2", "speed x2!",   "owned[1]", 150, "buildingsTime[1]",  "/2"),
    new Achievement("Acquire 200 of the Build 2", "speed x2!",   "owned[1]", 200, "buildingsTime[1]",  "/2"),
    new Achievement("Acquire 300 of the Build 2", "speed x2!",   "owned[1]", 300, "buildingsTime[1]",  "/2"),
    new Achievement("Acquire 400 of the Build 2", "speed x2!",   "owned[1]", 400, "buildingsTime[1]",  "/2"),
    new Achievement("Acquire 500 of the Build 2", "speed x2!",   "owned[1]", 500, "buildingsTime[1]",  "/2"),
    new Achievement("Acquire 600 of the Build 2", "profit x2!",   "owned[1]", 600, "buildingsInc[1]",  "*2"),
    new Achievement("Acquire 700 of the Build 2", "profit x2!",   "owned[1]", 700, "buildingsInc[1]",  "*2"),
    new Achievement("Acquire 800 of the Build 2", "profit x2!",   "owned[1]", 800, "buildingsInc[1]",  "*2"),
    new Achievement("Acquire 900 of the Build 2", "profit x2!",   "owned[1]", 900, "buildingsInc[1]",  "*2"),
    new Achievement("Acquire 1000 of the Build 2", "profit x3!",   "owned[1]", 1000, "buildingsInc[1]",  "*3"),

    new Achievement("Acquire 25 of the Build 3", "speed x2!",   "owned[2]", 25, "buildingsTime[2]",  "/2"),
    new Achievement("Acquire 50 of the Build 3", "speed x2!",   "owned[2]", 50, "buildingsTime[2]",  "/2"),
    new Achievement("Acquire 100 of the Build 3", "speed x3!",   "owned[2]", 100, "buildingsTime[2]",  "/3"),
    new Achievement("Acquire 150 of the Build 3", "speed x2!",   "owned[2]", 150, "buildingsTime[2]",  "/2"),
    new Achievement("Acquire 200 of the Build 3", "speed x2!",   "owned[2]", 200, "buildingsTime[2]",  "/2"),
    new Achievement("Acquire 300 of the Build 3", "speed x2!",   "owned[2]", 300, "buildingsTime[2]",  "/2"),
    new Achievement("Acquire 400 of the Build 3", "speed x2!",   "owned[2]", 400, "buildingsTime[2]",  "/2"),
    new Achievement("Acquire 500 of the Build 3", "speed x2!",   "owned[2]", 500, "buildingsTime[2]",  "/2"),
    new Achievement("Acquire 600 of the Build 3", "profit x2!",   "owned[2]", 600, "buildingsInc[2]",  "*2"),
    new Achievement("Acquire 700 of the Build 3", "profit x2!",   "owned[2]", 700, "buildingsInc[2]",  "*2"),
    new Achievement("Acquire 800 of the Build 3", "profit x2!",   "owned[2]", 800, "buildingsInc[2]",  "*2"),
    new Achievement("Acquire 900 of the Build 3", "profit x2!",   "owned[2]", 900, "buildingsInc[2]",  "*2"),
    new Achievement("Acquire 1000 of the Build 3", "profit x3!",   "owned[2]", 1000, "buildingsInc[2]",  "*3"),

    new Achievement("Acquire 25 of the Build 4", "speed x2!",   "owned[3]", 25, "buildingsTime[3]",  "/2"),
    new Achievement("Acquire 50 of the Build 4", "speed x2!",   "owned[3]", 50, "buildingsTime[3]",  "/2"),
    new Achievement("Acquire 100 of the Build 4", "speed x3!",   "owned[3]", 100, "buildingsTime[3]",  "/3"),
    new Achievement("Acquire 150 of the Build 4", "speed x2!",   "owned[3]", 150, "buildingsTime[3]",  "/2"),
    new Achievement("Acquire 200 of the Build 4", "speed x2!",   "owned[3]", 200, "buildingsTime[3]",  "/2"),
    new Achievement("Acquire 300 of the Build 4", "speed x2!",   "owned[3]", 300, "buildingsTime[3]",  "/2"),
    new Achievement("Acquire 400 of the Build 4", "speed x2!",   "owned[3]", 400, "buildingsTime[3]",  "/2"),
    new Achievement("Acquire 500 of the Build 4", "speed x2!",   "owned[3]", 500, "buildingsTime[3]",  "/2"),
    new Achievement("Acquire 600 of the Build 4", "profit x2!",   "owned[3]", 600, "buildingsInc[3]",  "*2"),
    new Achievement("Acquire 700 of the Build 4", "profit x2!",   "owned[3]", 700, "buildingsInc[3]",  "*2"),
    new Achievement("Acquire 800 of the Build 4", "profit x2!",   "owned[3]", 800, "buildingsInc[3]",  "*2"),
    new Achievement("Acquire 900 of the Build 4", "profit x2!",   "owned[3]", 900, "buildingsInc[3]",  "*2"),
    new Achievement("Acquire 1000 of the Build 4", "profit x3!",   "owned[3]", 1000, "buildingsInc[3]",  "*3"),

    new Achievement("Acquire 25 of the Build 5", "speed x2!",   "owned[4]", 25, "buildingsTime[4]",  "/2"),
    new Achievement("Acquire 50 of the Build 5", "speed x2!",   "owned[4]", 50, "buildingsTime[4]",  "/2"),
    new Achievement("Acquire 100 of the Build 5", "speed x3!",   "owned[4]", 100, "buildingsTime[4]",  "/3"),
    new Achievement("Acquire 150 of the Build 5", "speed x2!",   "owned[4]", 150, "buildingsTime[4]",  "/2"),
    new Achievement("Acquire 200 of the Build 5", "speed x2!",   "owned[4]", 200, "buildingsTime[4]",  "/2"),
    new Achievement("Acquire 300 of the Build 5", "speed x2!",   "owned[4]", 300, "buildingsTime[4]",  "/2"),
    new Achievement("Acquire 400 of the Build 5", "speed x2!",   "owned[4]", 400, "buildingsTime[4]",  "/2"),
    new Achievement("Acquire 500 of the Build 5", "speed x2!",   "owned[4]", 500, "buildingsTime[4]",  "/2"),
    new Achievement("Acquire 600 of the Build 5", "profit x2!",   "owned[4]", 600, "buildingsInc[4]",  "*2"),
    new Achievement("Acquire 700 of the Build 5", "profit x2!",   "owned[4]", 700, "buildingsInc[4]",  "*2"),
    new Achievement("Acquire 800 of the Build 5", "profit x2!",   "owned[4]", 800, "buildingsInc[4]",  "*2"),
    new Achievement("Acquire 900 of the Build 5", "profit x2!",   "owned[4]", 900, "buildingsInc[4]",  "*2"),
    new Achievement("Acquire 1000 of the Build 5", "profit x3!",   "owned[4]", 1000, "buildingsInc[4]",  "*3"),

    new Achievement("Acquire 25 of the Build 6", "speed x2!",   "owned[5]", 25, "buildingsTime[5]",  "/2"),
    new Achievement("Acquire 50 of the Build 6", "speed x2!",   "owned[5]", 50, "buildingsTime[5]",  "/2"),
    new Achievement("Acquire 100 of the Build 6", "speed x3!",   "owned[5]", 100, "buildingsTime[5]",  "/3"),
    new Achievement("Acquire 150 of the Build 6", "speed x2!",   "owned[5]", 150, "buildingsTime[5]",  "/2"),
    new Achievement("Acquire 200 of the Build 6", "speed x2!",   "owned[5]", 200, "buildingsTime[5]",  "/2"),
    new Achievement("Acquire 300 of the Build 6", "speed x2!",   "owned[5]", 300, "buildingsTime[5]",  "/2"),
    new Achievement("Acquire 400 of the Build 6", "speed x2!",   "owned[5]", 400, "buildingsTime[5]",  "/2"),
    new Achievement("Acquire 500 of the Build 6", "speed x2!",   "owned[5]", 500, "buildingsTime[5]",  "/2"),
    new Achievement("Acquire 600 of the Build 6", "profit x2!",   "owned[5]", 600, "buildingsInc[5]",  "*2"),
    new Achievement("Acquire 700 of the Build 6", "profit x2!",   "owned[5]", 700, "buildingsInc[5]",  "*2"),
    new Achievement("Acquire 800 of the Build 6", "profit x2!",   "owned[5]", 800, "buildingsInc[5]",  "*2"),
    new Achievement("Acquire 900 of the Build 6", "profit x2!",   "owned[5]", 900, "buildingsInc[5]",  "*2"),
    new Achievement("Acquire 1000 of the Build 6", "profit x3!",   "owned[5]", 1000, "buildingsInc[5]",  "*3"),

    new Achievement("Acquire 25 of the Build 7", "speed x2!",   "owned[6]", 25, "buildingsTime[6]",  "/2"),
    new Achievement("Acquire 50 of the Build 7", "speed x2!",   "owned[6]", 50, "buildingsTime[6]",  "/2"),
    new Achievement("Acquire 100 of the Build 7", "speed x3!",   "owned[6]", 100, "buildingsTime[6]",  "/3"),
    new Achievement("Acquire 150 of the Build 7", "speed x2!",   "owned[6]", 150, "buildingsTime[6]",  "/2"),
    new Achievement("Acquire 200 of the Build 7", "speed x2!",   "owned[6]", 200, "buildingsTime[6]",  "/2"),
    new Achievement("Acquire 300 of the Build 7", "speed x2!",   "owned[6]", 300, "buildingsTime[6]",  "/2"),
    new Achievement("Acquire 400 of the Build 7", "speed x2!",   "owned[6]", 400, "buildingsTime[6]",  "/2"),
    new Achievement("Acquire 500 of the Build 7", "speed x2!",   "owned[6]", 500, "buildingsTime[6]",  "/2"),
    new Achievement("Acquire 600 of the Build 7", "profit x2!",   "owned[6]", 600, "buildingsInc[6]",  "*2"),
    new Achievement("Acquire 700 of the Build 7", "profit x2!",   "owned[6]", 700, "buildingsInc[6]",  "*2"),
    new Achievement("Acquire 800 of the Build 7", "profit x2!",   "owned[6]", 800, "buildingsInc[6]",  "*2"),
    new Achievement("Acquire 900 of the Build 7", "profit x2!",   "owned[6]", 900, "buildingsInc[6]",  "*2"),
    new Achievement("Acquire 1000 of the Build 7", "profit x3!",   "owned[6]", 1000, "buildingsInc[6]",  "*3"),

    new Achievement("Acquire 25 of the Build 8", "speed x2!",   "owned[7]", 25, "buildingsTime[7]",  "/2"),
    new Achievement("Acquire 50 of the Build 8", "speed x2!",   "owned[7]", 50, "buildingsTime[7]",  "/2"),
    new Achievement("Acquire 100 of the Build 8", "speed x3!",   "owned[7]", 100, "buildingsTime[7]",  "/3"),
    new Achievement("Acquire 150 of the Build 8", "speed x2!",   "owned[7]", 150, "buildingsTime[7]",  "/2"),
    new Achievement("Acquire 200 of the Build 8", "speed x2!",   "owned[7]", 200, "buildingsTime[7]",  "/2"),
    new Achievement("Acquire 300 of the Build 8", "speed x2!",   "owned[7]", 300, "buildingsTime[7]",  "/2"),
    new Achievement("Acquire 400 of the Build 8", "speed x2!",   "owned[7]", 400, "buildingsTime[7]",  "/2"),
    new Achievement("Acquire 500 of the Build 8", "speed x2!",   "owned[7]", 500, "buildingsTime[7]",  "/2"),
    new Achievement("Acquire 600 of the Build 8", "profit x2!",   "owned[7]", 600, "buildingsInc[7]",  "*2"),
    new Achievement("Acquire 700 of the Build 8", "profit x2!",   "owned[7]", 700, "buildingsInc[7]",  "*2"),
    new Achievement("Acquire 800 of the Build 8", "profit x2!",   "owned[7]", 800, "buildingsInc[7]",  "*2"),
    new Achievement("Acquire 900 of the Build 8", "profit x2!",   "owned[7]", 900, "buildingsInc[7]",  "*2"),
    new Achievement("Acquire 1000 of the Build 8", "profit x3!",   "owned[7]", 1000, "buildingsInc[7]",  "*3"),

    new Achievement("Acquire 25 of the Build 9", "speed x2!",   "owned[8]", 25, "buildingsTime[8]",  "/2"),
    new Achievement("Acquire 50 of the Build 9", "speed x2!",   "owned[8]", 50, "buildingsTime[8]",  "/2"),
    new Achievement("Acquire 100 of the Build 9", "speed x3!",   "owned[8]", 100, "buildingsTime[8]",  "/3"),
    new Achievement("Acquire 150 of the Build 9", "speed x2!",   "owned[8]", 150, "buildingsTime[8]",  "/2"),
    new Achievement("Acquire 200 of the Build 9", "speed x2!",   "owned[8]", 200, "buildingsTime[8]",  "/2"),
    new Achievement("Acquire 300 of the Build 9", "speed x2!",   "owned[8]", 300, "buildingsTime[8]",  "/2"),
    new Achievement("Acquire 400 of the Build 9", "speed x2!",   "owned[8]", 400, "buildingsTime[8]",  "/2"),
    new Achievement("Acquire 500 of the Build 9", "speed x2!",   "owned[8]", 500, "buildingsTime[8]",  "/2"),
    new Achievement("Acquire 600 of the Build 9", "profit x2!",   "owned[8]", 600, "buildingsInc[8]",  "*2"),
    new Achievement("Acquire 700 of the Build 9", "profit x2!",   "owned[8]", 700, "buildingsInc[8]",  "*2"),
    new Achievement("Acquire 800 of the Build 9", "profit x2!",   "owned[8]", 800, "buildingsInc[8]",  "*2"),
    new Achievement("Acquire 900 of the Build 9", "profit x2!",   "owned[8]", 900, "buildingsInc[8]",  "*2"),
    new Achievement("Acquire 1000 of the Build 9", "profit x3!",   "owned[8]", 1000, "buildingsInc[8]",  "*3"),

    new Achievement("Acquire 25 of the Build 10","speed x2!",   "owned[9]", 25, "buildingsTime[9]",  "/2"),
    new Achievement("Acquire 50 of the Build 10","speed x2!",   "owned[9]", 50, "buildingsTime[9]",  "/2"),
    new Achievement("Acquire 100 of the Build 10","speed x3!",   "owned[9]", 100, "buildingsTime[9]",  "/3"),
    new Achievement("Acquire 150 of the Build 10","speed x2!",   "owned[9]", 150, "buildingsTime[9]",  "/2"),
    new Achievement("Acquire 200 of the Build 10","speed x2!",   "owned[9]", 200, "buildingsTime[9]",  "/2"),
    new Achievement("Acquire 300 of the Build 10","speed x2!",   "owned[9]", 300, "buildingsTime[9]",  "/2"),
    new Achievement("Acquire 400 of the Build 10","speed x2!",   "owned[9]", 400, "buildingsTime[9]",  "/2"),
    new Achievement("Acquire 500 of the Build 10","speed x2!",   "owned[9]", 500, "buildingsTime[9]",  "/2"),
    new Achievement("Acquire 600 of the Build 10", "profit x2!",   "owned[9]", 600, "buildingsInc[9]",  "*2"),
    new Achievement("Acquire 700 of the Build 10", "profit x2!",   "owned[9]", 700, "buildingsInc[9]",  "*2"),
    new Achievement("Acquire 800 of the Build 10", "profit x2!",   "owned[9]", 800, "buildingsInc[9]",  "*2"),
    new Achievement("Acquire 900 of the Build 10", "profit x2!",   "owned[9]", 900, "buildingsInc[9]",  "*2"),
    new Achievement("Acquire 1000 of the Build 10", "profit x3!",   "owned[9]", 1000, "buildingsInc[9]",  "*3"),

    new Achievement("Acquire 25 of every builds", "profit x2!",    "minAll",  25, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 50 of every builds", "profit x2!",   "minAll", 50, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 100 of every builds","profit x3!",   "minAll", 100, "totalBuildingInc",  "*3"),
    new Achievement("Acquire 150 of every builds","profit x2!",   "minAll", 150, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 200 of every builds","profit x2!",   "minAll", 200, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 300 of every builds","profit x2!",   "minAll", 300, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 400 of every builds","profit x2!",   "minAll", 400, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 500 of every builds","profit x2!",   "minAll", 500, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 600 of every builds","profit x2!",   "minAll", 600, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 700 of every builds","profit x2!",   "minAll", 700, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 800 of every builds","profit x2!",   "minAll", 800, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 900 of every builds","profit x2!",   "minAll", 900, "totalBuildingInc",  "*2"),
    new Achievement("Acquire 1000 of every builds","profit x3!",   "minAll", 1000, "totalBuildingInc",  "*3")
];
var allVars = ["owned","managersOwned","upgradesOwned","achievementsOwned","buildingsInc","totalBuildingInc","buildingsTime","minAll","progress","money","totalMoney","tokens","tokensRate"];

// Saving system
function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
};
function removeItem(key) {
    localStorage.removeItem(key);
};
function saveData() {
    for (var i = 0; i < allVars.length; i++)
        setItem(allVars[i], window[allVars[i]]);
};
function loadData() {
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(allVars[i]) != null && getItem(allVars[i]) != undefined) {
            window[allVars[i]] = getItem(allVars[i]);
        };
    };

    for (var i = 0; i < upgradesOwned.length; i++) {
        var u = upgradesOwned[i];
        if (u == true) {
            $("#u-" + (i+1)).attr('onclick', '');
            $("#u-c" + (i+1)).html("owned " + '<i class="fa fa-check"></i>')
        };
    };
};
function resetData() {
    var r = confirm("Are you sure to hard-reset? You will not earn tokens, and will start everything from the beginning!");
    if (r == true) {
        var r2 = confirm("Are you really sure?");
        if (r2 == true) {
            for (var i = 0; i < allVars.length; i++) {
                removeItem(allVars[i]);
            }; location.reload();
        };
    };
};

// Methods
function Building(name, basecost, basereward, inflation, time, trigger) {
    this.name = name;
    this.basecost = basecost;
    this.basereward = basereward;
    this.inflation = inflation;
    this.time = time;
    this.trigger = trigger;
};
function buyBuilding(index) {
    var b = buildings[index-1];
    var p = b.basecost * Math.pow(b.inflation, owned[index-1]);
    if (money >= p) {
        owned[index - 1]++; money -= p;
        $("#b-o" + index).html(owned[index-1] + " owned");
        $("#money").html("Money : " + fix(money, 2) + "$");
    };
    var np = b.basecost * Math.pow(b.inflation, owned[index-1]);
    $("#b-c" + index).html(fix(np, 2) + "$");
};
function startBuilding(index) {
    if (managersOwned[index-1] == false && owned[index-1] >= 1 && progress[index-1] == 0) {
        var b = buildings[index-1];
        if (b.trigger == false && owned[index-1] >= 1) { progress[index-1] = 0.01; };
    };
};

function Upgrade(name, price, run) {
    this.name = name;
    this.price = price;
    this.run = run;
};
function buyUpgrade(index) {
    if (money >= upgrades[index-1].price) {
        money -= upgrades[index-1].price;
        upgradesOwned[index-1] = true;
        upgrades[index-1].run();
        $("#u-" + index).attr('onclick', '');
        $("#u-c" + index).html("owned " + '<i class="fa fa-check"></i>');
    };
};

function Manager(name, price) {
    this.name = name;
    this.price = price;
};
function buyManager(index) {
    if (money >= managers[index-1].price) {
        money -= managers[index-1].price;
        managersOwned[index-1] = true;
        $("#m-" + index).attr('onclick', '');
        $("#m-c" + index).html("owned " + '<i class="fa fa-check"></i>');
    };
};

function Achievement(name, text, reqName, reqNum, changeName, changeString) {
    this.name = name;
    this.text = text;
    this.reqName = reqName;
    this.reqNum = reqNum;
    this.changeName = changeName;
    this.changeString = changeString;
};
Achievement.prototype.isComplete = function() {
    var value;
    var index = this.reqName.indexOf("[");
    if (index < 0)
        value = window[this.reqName];
    else {
        var str = this.reqName.substring(0,index);
        var i = parseInt(this.reqName.substring(index+1,this.reqName.length-1));
        value = window[str][i];
    }
    return value >= this.reqNum;
};
Achievement.prototype.achieve = function() {
    var index = this.changeName.indexOf("[");
    if (index < 0) {
        var value = window[this.changeName];
        window[this.changeName] = eval(value + this.changeString);
    }
    else {
        var str = this.changeName.substring(0,index);
        var i = parseInt(this.changeName.substring(index+1,this.changeName.length-1));
        var value = window[str][i];
        window[str][i] = eval(value + this.changeString)
    };
};
function updateAchievements() {
    for (var i = 0; i < achievements.length; i++)
        if (!achievementsOwned[i] && achievements[i].isComplete()) {
            achievements[i].achieve();
            achievementsOwned[i] = true;
            for (var i = 0; i < achievements.length; i++) {
                var a = achievements[i];
                if (achievementsOwned[i]) {
                    $("#a-t" + (i+1)).html(a.text + " " + '<i class="fa fa-check"></i>');
                };
            };
        };
};

// Resets
function softReset() {
    var r = confirm("Are you sure to soft reset? You will start from the beginning. You will goes from " + fix(tokens,2) + " tokens to " + fix(tokensOn, 2) + " tokens.");
    if (r == true) {
        var t1 = totalMoney;
        var t2 = tokensOn;
        initVariable();
        totalMoney = t1;
        tokens = t2;
        saveData();
        location.reload();
    };
};

// Loop + needed
function update(times) {
    times = 1;

    if (init == true) {
        for (var i = 0; i < buildings.length; i++) {
            if (owned[i] > 0 && (progress[i] > 0 || managersOwned[i])) {
                var b = buildings[i];
                var t = getTime(i);
                progress[i] += times/fps;
                if (managersOwned[i]) {
                    gainMoney(Math.floor(progress[i]/t) * getInc(i) * owned[i]); progress[i] %= t; var width = progress[i]/t * 100;
                    if (t < 0.1 * 1)
                        width = 100; // Always full
                    width = Math.max(width, 1);
                    $("#b-f" + (i+1)).css("width", width + "%");
                } else {
                    if (progress[i] >= t && b.trigger == true) {
                        gainMoney(getInc(i) * owned[i]);
                        progress[i] = 0;
                        b.trigger = false;
                        $("#b-f" + (i+1)).css("width", 0);
                    } else {
                        var width = progress[i]/t * 100;
                        width = Math.max(width,1);
                        b.trigger = true;
                        $("#b-f" + (i+1)).css("width", width + "%");
                    }
                }
            }
        };

        for (var i = 0; i < owned.length; i++) {minAll = Math.min(owned[0], owned[9]);};
        for (var i = 0; i < buildings.length; i++) {
            var o = buildings[i];
            $("#b-r" + (i+1)).html(fix((buildings[i].basereward * owned[i] * buildingsInc[i]) * totalBuildingInc * (1 + tokens * tokensRate / 100) * totalMultiplier, 2) + "$");
        };

        tokensOn = Math.floor(150 * Math.sqrt(totalMoney/1e9));

        $("#money").html("Money : " + fix(money, 2) + "$");
        $("#s-money").html("Money : " + fix(money, 2) + "$");
        $("#s-totalmoney").html("All money earned : " + fix(totalMoney, 2) + "$");
        $("#s-tokens").html("Tokens : " + tokens);
        $("#s-tokenson").html("Tokens on reset : " + fix(tokensOn, 2));

        document.title = "Money Life - " + fix(money, 2) + "$";

        updateAchievements();
    };
};
function getTime(index) {
    return buildings[index].time * buildingsTime[index];
};
function getInc(index) {
    return buildings[index].basereward * buildingsInc[index] * totalBuildingInc * (1 + tokens * tokensRate / 100) * totalMultiplier;
};
function gainMoney(amount) {
    money += amount;
    totalMoney += amount;
};

// Game initialization
function initVariable() {
    money = 0;
    totalMoney = 0;
    tokens = 0;
    tokensRate = 1.5;
    tokensOn = 0;
    totalBuildingInc = 1;
    totalMultiplier = 1;

    owned = [];
    for (var i = 0; i < buildings.length; i++) {owned.push(0);};
    owned[0] = 1;

    progress = [];
    for (var i = 0; i < buildings.length; i++) {progress.push(0);};

    buildingsInc = [];
    for (var i = 0; i < buildings.length; i++) {buildingsInc.push(1);};

    buildingsTime = [];
    for (var i = 0; i < buildings.length; i++) {buildingsTime.push(1);};

    managersOwned = [];
    for (var i = 0; i < buildings.length; i++) {managersOwned.push(false);};

    upgradesOwned = [];
    for (var i = 0; i < upgrades.length; i++) {upgradesOwned.push(false);};

    achievementsOwned = [];
    for (var i = 0; i < achievements.length; i++) {achievementsOwned.push(false);};

    minAll = 0;
    for (var i = 0; i < owned.length; i++) {minAll = Math.min(minAll, owned[i]);};

    init = true;
};
window.onload = function() {
    initVariable();
    loadData();

    if (init == true) {
        for (var i = 0; i < buildings.length; i++) {
            var b = buildings[i];
            $("#b-n" + (i+1)).html(b.name + " - ");
            $("#b-o" + (i+1)).html(owned[i] + " owned");
            $("#b-r" + (i+1)).html(fix((buildings[i].basereward * owned[i] * buildingsInc[i]) * totalBuildingInc * (1 + tokens * tokensRate / 100) * totalMultiplier, 2) + "$");
            $("#b-c" + (i+1)).html(fix(b.basecost * Math.pow(b.inflation, owned[i]), 2) + "$");
        };

        for (var i = 0; i < managers.length; i++) {
            var m = managers[i];
            $("#m-n" + (i+1)).html(m.name + " : ");
            $("#m-c" + (i+1)).html("cost " + fix(m.price, 2) + "$");
            if (managersOwned[i]) {
                $("#m-" + (i+1)).attr('onclick', '');
                $("#m-n" + (i+1)).html(m.name + " : ");
                $("#m-c" + (i+1)).html("owned " + '<i class="fa fa-check"></i>');
            };
        };

        for (var i = 0; i < upgrades.length; i++) {
            var u = upgrades[i];
            $("#u-n" + (i+1)).html(u.name + " : ");
            $("#u-c" + (i+1)).html("cost " + fix(u.price, 2) + "$");
            if (upgradesOwned[i] == true) {
                $("#u-" + (i+1)).attr('onclick', '');
                $("#u-n" + (i+1)).html(u.name + " : ");
                $("#u-c" + (i+1)).html("owned " + '<i class="fa fa-check"></i>');
                $("#b-r" + (i+1)).html(fix(buildings[i].basereward * owned[i] * buildingsInc[i] * totalBuildingInc, 2) + "$");
            };
        };

        for (var i = 0; i < achievements.length; i++) {
            var a = achievements[i];
            $("#a-n" + (i+1)).html(a.name + " - ");
            $("#a-t" + (i+1)).html(a.text + " " + '<i class="fa fa-lock"></i>')
            if (achievementsOwned[i] == true) {
                $("#a-t" + (i+1)).html(a.text + " " + '<i class="fa fa-check"></i>');
            };
        };
    };
};
window.setInterval(function() {
    update();
}, interval);
window.setInterval(function() {
    saveData();
}, 10000);