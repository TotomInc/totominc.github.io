var maxpx = $(document).height(); var headerpx = 45; var marginpx = 10;
$(".row").css('max-height', (maxpx-headerpx-marginpx) + 'px');
$(".col-md-4").css('max-height', (maxpx-headerpx-marginpx) + 'px');

var money; var totalMoney; var tokens; var tokensOn; var tokensRate;
var gameInit = false; var fps = 60; var interval = (1000 / fps); var version = 2.00;
var cheatAvert = 0; var V1money = 0; var V2totalMoney = 0; var V3tokens = 0; var V4multiplier = 1; var V5rate = 1; var V6magic = 1;

var totalMultiplier; var magicTotalMultiplier;
var t1owned; var t1progress; var t1multiplier; var t1time;
var t1 = [
    new Building("Lemonade Stand",      4,              1,              1.09, 1.5,  false),
    new Building("Newspaper Stand",     70,             60,             1.17, 3,    false),
    new Building("Car-Wash",            720,            540,            1.16, 6,    false),
    new Building("Gas Extractor",       8640,           4320,           1.15, 12,   false),
    new Building("Meth Lab",            103680,         51840,          1.14, 24,   false),
    new Building("Bank",                1244160,        622080,         1.13, 96,   false),
    new Building("Movie Studio",        14929920,       7464961,        1.12, 384,  false),
    new Building("Oil Company",         179159040,      89579521,       1.11, 576,  false),
    new Building("Ship Company",        2149908480,     1074954241,     1.10, 1296, false),
    new Building("Cookieverse",         25789901760,    29668737024,    1.09, 6144, false)
];

var managersOwned;
var managers = [
    new Manager("Cave Johnson (Lemonade Stand Manager)", 1000),
    new Manager("Rupert Murdoch (Newspaper Stand Manager)", 15000),
    new Manager("Gus (Car-Wash Manager)", 100000),
    new Manager("RichmanGas (Gas Extractor Manager)", 500000),
    new Manager("Heisenberg (Meth Lab Manager)", 1200000),
    new Manager("Rockfeller (Bank Manager)", 10000000),
    new Manager("Spielberg (Movie Studio Manager)", 111111111),
    new Manager("Harold Hamm (Oil Company Manager", 555555555),
    new Manager("Zoidberg (Ship Company Manager)", 10000000000),
    new Manager("Orteil (Cookieverse Manager)", 100000000000)
];

var magicupOwned;
var magicupgrades = [
    new MagicUp("Magic Up 1 : all profit x3!",      10000,      function() {magicTotalMultiplier *= 3; V6magic *= 3;}),
    new MagicUp("Magic Up 2 : tokens rate +2%!",    100000,     function() {tokensRate += 2; V5rate += 2;}),
    new MagicUp("Magic Up 3 : tokens rate +2%!",    100000000,  function() {tokensRate += 2; V5rate += 2;}),
    new MagicUp("Magic Up 4 : all profit x5!",      1000000000, function() {magicTotalMultiplier *= 5; V6magic *= 5;}),
    new MagicUp("Magic Up 5 : all profit x9!",      100000000000,   function() {magicTotalMultiplier *= 9; V6magic *= 9;}),
    new MagicUp("Magic Up 6 : all profit x11",      1000000000000,  function() {magicTotalMultiplier *= 11; V6magic *= 11;}),
    new MagicUp("Magic Up 7 : all profit x15",      1000000000000000000000,    function() {magicTotalMultiplier *= 15; V6magic *= 15;}),
    new MagicUp("Magic Up 8 : tokens rate +10%!",   1000000000000000000000000000000000,     function() {tokensRate += 10; V5rate += 10;}),
    new MagicUp("Magic Up 9 : all profit x15!",     10000000000000000000000000000000000,    function() {magicTotalMultiplier *= 15; V6magic *= 15;}),
    new MagicUp("Magic Up 10 : all profit x3!",     1000000000000000000000000000000000000,  function() {magicTotalMultiplier *= 3; V6magic *= 3;}),
    new MagicUp("Magic Up 11 : all profit x5!",     10000000000000000000000000000000000000000,   function() {magicTotalMultiplier *= 5; V6magic *= 5;}),
    new MagicUp("Magic Up 12 : all profit x3!",     1000000000000000000000000000000000000000000, function() {magicTotalMultiplier *= 3; V6magic *= 3;})
];

var upgradesOwned;
var upgrades = [
    new Upgrade("Up 1 : lemonade stand profit x3!",         250000,         function() {t1multiplier[0] *= 3;}),
    new Upgrade("Up 2 : newspaper stand profit x3!",        500000,         function() {t1multiplier[1] *= 3;}),
    new Upgrade("Up 3 : car-wash profit x3!",               1000000,        function() {t1multiplier[2] *= 3;}),
    new Upgrade("Up 4 : gas extractor profit x3!",          5000000,        function() {t1multiplier[3] *= 3;}),
    new Upgrade("Up 5 : meth lab profit x3!",               10000000,       function() {t1multiplier[4] *= 3;}),
    new Upgrade("Up 6 : bank profit x3!",                   25000000,       function() {t1multiplier[5] *= 3;}),
    new Upgrade("Up 7 : movie studio profit x3!",           500000000,      function() {t1multiplier[6] *= 3;}),
    new Upgrade("Up 8 : oil company profit x3!",            10000000000,    function() {t1multiplier[7] *= 3;}),
    new Upgrade("Up 9 : ship company profit x3!",           50000000000,    function() {t1multiplier[8] *= 3;}),
    new Upgrade("Up 10 : cookieverse profit x3!",           250000000000,   function() {t1multiplier[9] *= 3;}),
    new Upgrade("Up 11 : all profit x3!",                   1000000000000,  function() {totalMultiplier *= 3; V4multiplier *= 3;}),

    new Upgrade("Up 11 : lemonade stand profit x3!",        20000000000000,     function() {t1multiplier[0] *= 3;}),
    new Upgrade("Up 12 : newspaper stand profit x3!",       50000000000000,     function() {t1multiplier[1] *= 3;}),
    new Upgrade("Up 13 : car-wash profit x3!",              100000000000000,    function() {t1multiplier[2] *= 3;}),
    new Upgrade("Up 14 : gas extractor profit x3!",         500000000000000,    function() {t1multiplier[3] *= 3;}),
    new Upgrade("Up 15 : meth lab profit x3!",              1000000000000000,   function() {t1multiplier[4] *= 3;}),
    new Upgrade("Up 16 : bank profit x3!",                  2000000000000000,   function() {t1multiplier[5] *= 3;}),
    new Upgrade("Up 17 : movie studio profit x3!",          5000000000000000,   function() {t1multiplier[6] *= 3;}),
    new Upgrade("Up 18 : oil company profit x3!",           7000000000000000,   function() {t1multiplier[7] *= 3;}),
    new Upgrade("Up 19 : ship company profit x3!",          10000000000000000,  function() {t1multiplier[8] *= 3;}),
    new Upgrade("Up 20 : cookieverse profit x3!",           20000000000000000,  function() {t1multiplier[9] *= 3;}),
    new Upgrade("Up 21 : all profit x3!",                   50000000000000000,  function() {totalMultiplier *= 3; V4multiplier *= 3;}),
    new Upgrade("Up 22 : tokens efficiency +1%",            500000000000000000, function() {tokensRate += 1; V5rate += 1;}),

    new Upgrade("Up 23 : lemonade stand profit x3!",        2000000000000000000,    function() {t1multiplier[0] *= 3;}),
    new Upgrade("Up 24 : newspaper stand profit x3!",       5000000000000000000,    function() {t1multiplier[1] *= 3;}),
    new Upgrade("Up 25 : car-wash profit x3!",              7000000000000000000,    function() {t1multiplier[2] *= 3;}),
    new Upgrade("Up 26 : gas extractor profit x3!",         10000000000000000000,   function() {t1multiplier[3] *= 3;}),
    new Upgrade("Up 27 : meth lab profit x3!",              20000000000000000000,   function() {t1multiplier[4] *= 3;}),
    new Upgrade("Up 28 : bank profit x3!",                  35000000000000000000,   function() {t1multiplier[5] *= 3;}),
    new Upgrade("Up 29 : movie studio profit x3!",          50000000000000000000,   function() {t1multiplier[6] *= 3;}),
    new Upgrade("Up 30 : oil company profit x3!",           75000000000000000000,   function() {t1multiplier[7] *= 3;}),
    new Upgrade("Up 31 : ship company profit x3!",          100000000000000000000,  function() {t1multiplier[8] *= 3;}),
    new Upgrade("Up 32 : cookieverse profit x3!",           200000000000000000000,  function() {t1multiplier[9] *= 3;}),
    new Upgrade("Up 33 : all profit x3!",                   500000000000000000000,  function() {totalMultiplier *= 3; V4multiplier *= 3;}),
    new Upgrade("Up 34 : tokens efficiency +1%",            1000000000000000000000, function() {tokensRate += 1; V5rate += 1;}),

    new Upgrade("Up 35 : lemonade stand profit x3!",        25000000000000000000000,    function() {t1multiplier[0] *= 3;}),
    new Upgrade("Up 36 : newspaper stand profit x3!",       50000000000000000000000,    function() {t1multiplier[1] *= 3;}),
    new Upgrade("Up 37 : car-wash profit x3!",              100000000000000000000000,   function() {t1multiplier[2] *= 3;}),
    new Upgrade("Up 38 : gas extractor profit x3!",         200000000000000000000000,   function() {t1multiplier[3] *= 3;}),
    new Upgrade("Up 39 : meth lab profit x3!",              300000000000000000000000,   function() {t1multiplier[4] *= 3;}),
    new Upgrade("Up 40 : bank profit x3!",                  400000000000000000000000,   function() {t1multiplier[5] *= 3;}),
    new Upgrade("Up 41 : movie studio profit x3!",          500000000000000000000000,   function() {t1multiplier[6] *= 3;}),
    new Upgrade("Up 42 : oil company profit x3!",           600000000000000000000000,   function() {t1multiplier[7] *= 3;}),
    new Upgrade("Up 43 : ship company profit x3!",          700000000000000000000000,   function() {t1multiplier[8] *= 3;}),
    new Upgrade("Up 44 : cookieverse profit x3!",           800000000000000000000000,   function() {t1multiplier[9] *= 3;}),
    new Upgrade("Up 45 : all profit x3!",                   900000000000000000000000,   function() {totalMultiplier *= 3; V4multiplier *= 3;}),
    new Upgrade("Up 46 : tokens efficiency +2%",            10000000000000000000000000, function() {tokensRate += 2; V5rate += 2;}),

    new Upgrade("Up 47 : lemonade stand profit x7!",        1000000000000000000000000000,                   function() {t1multiplier[0] *= 7;}),
    new Upgrade("Up 48 : newspaper stand profit x7!",       5000000000000000000000000000,                   function() {t1multiplier[1] *= 7;}),
    new Upgrade("Up 49 : car-wash profit x7!",              25000000000000000000000000000,                  function() {t1multiplier[2] *= 7;}),
    new Upgrade("Up 50 : gas extractor profit x7!",         100000000000000000000000000000,                 function() {t1multiplier[3] *= 7;}),
    new Upgrade("Up 51 : meth lab profit x7!",              250000000000000000000000000000,                 function() {t1multiplier[4] *= 7;}),
    new Upgrade("Up 52 : bank profit x7!",                  500000000000000000000000000000,                 function() {t1multiplier[5] *= 7;}),
    new Upgrade("Up 53 : movie studio profit x7!",          1000000000000000000000000000000,                function() {t1multiplier[6] *= 7;}),
    new Upgrade("Up 54 : oil company profit x7!",           5000000000000000000000000000000,                function() {t1multiplier[7] *= 7;}),
    new Upgrade("Up 55 : ship company profit x7!",          25000000000000000000000000000000,               function() {t1multiplier[8] *= 7;}),
    new Upgrade("Up 56 : cookieverse profit x7!",           50000000000000000000000000000000,               function() {t1multiplier[9] *= 7;}),
    new Upgrade("Up 57 : all profit x7!",                   1000000000000000000000000000000000000000000,    function() {totalMultiplier *= 7; V4multiplier *= 7;}),

    new Upgrade("Up 58 : newspaper stand profit x3!",       5000000000000000000000000000000000000000000,        function() {t1multiplier[1] *= 3;}),
    new Upgrade("Up 59 : car-wash profit x3!",              25000000000000000000000000000000000000000000,       function() {t1multiplier[2] *= 3;}),
    new Upgrade("Up 60 : gas extractor profit x3!",         50000000000000000000000000000000000000000000,       function() {t1multiplier[3] *= 3;}),
    new Upgrade("Up 61 : meth lab profit x3!",              100000000000000000000000000000000000000000000,      function() {t1multiplier[4] *= 3;}),
    new Upgrade("Up 62 : bank profit x3!",                  250000000000000000000000000000000000000000000,      function() {t1multiplier[5] *= 3;}),
    new Upgrade("Up 63 : movie studio profit x3!",          500000000000000000000000000000000000000000000,      function() {t1multiplier[6] *= 3;}),
    new Upgrade("Up 64 : oil company profit x3!",           1000000000000000000000000000000000000000000000,     function() {t1multiplier[7] *= 3;}),
    new Upgrade("Up 65 : ship company profit x3!",          5000000000000000000000000000000000000000000000,     function() {t1multiplier[8] *= 3;}),
    new Upgrade("Up 66 : cookieverse profit x3!",           10000000000000000000000000000000000000000000000,    function() {t1multiplier[9] *= 3;}),
    new Upgrade("Up 67 : lemonade stand profit x3!",        25000000000000000000000000000000000000000000000,    function() {t1multiplier[0] *= 3;}),
    new Upgrade("Up 68 : all profit x3!",                   100000000000000000000000000000000000000000000000,   function() {totalMultiplier *= 3; V4multiplier *= 3;}),

    new Upgrade("Up 69 : newspaper stand profit x3!",       250000000000000000000000000000000000000000000000,                   function() {t1multiplier[1] *= 3;}),
    new Upgrade("Up 70 : car-wash profit x3!",              500000000000000000000000000000000000000000000000,                   function() {t1multiplier[2] *= 3;}),
    new Upgrade("Up 71 : gas extractor profit x3!",         750000000000000000000000000000000000000000000000,                   function() {t1multiplier[3] *= 3;}),
    new Upgrade("Up 72 : meth lab profit x3!",              1000000000000000000000000000000000000000000000000,                  function() {t1multiplier[4] *= 3;}),
    new Upgrade("Up 73 : bank profit x3!",                  500000000000000000000000000000000000000000000000,                   function() {t1multiplier[5] *= 3;}),
    new Upgrade("Up 74 : movie studio profit x3!",          15000000000000000000000000000000000000000000000000,                 function() {t1multiplier[6] *= 3;}),
    new Upgrade("Up 75 : oil company profit x3!",           50000000000000000000000000000000000000000000000000,                 function() {t1multiplier[7] *= 3;}),
    new Upgrade("Up 76 : ship company profit x3!",          100000000000000000000000000000000000000000000000000,                function() {t1multiplier[8] *= 3;}),
    new Upgrade("Up 77 : cookieverse profit x3!",           250000000000000000000000000000000000000000000000000,                function() {t1multiplier[9] *= 3;}),
    new Upgrade("Up 78 : lemonade stand profit x3!",        500000000000000000000000000000000000000000000000000,                function() {t1multiplier[0] *= 3;}),
    new Upgrade("Up 79 : all profit x7!",                   1000000000000000000000000000000000000000000000000000,               function() {totalMultiplier *= 7; V4multiplier *= 7;}),
    new Upgrade("Up 80 : all profit x5!",                   1000000000000000000000000000000000000000000000000000000,            function() {totalMultiplier *= 5; V4multiplier *= 5;}),
    new Upgrade("Up 81 : all profit x7!",                   1000000000000000000000000000000000000000000000000000000000000,      function() {totalMultiplier *= 7; V4multiplier *= 7;})
];

var achievementsOwned;
var achievements = [
    new Achievement("25 of lemonade stand", "speed x2!",   "t1owned[0]", 25, "t1time[0]",  "/2"),
    new Achievement("50 of lemonade stand", "speed x2!",   "t1owned[0]", 50, "t1time[0]",  "/2"),
    new Achievement("100 of lemonade stand", "speed x2!",   "t1owned[0]", 100, "t1time[0]",  "/2"),
    new Achievement("200 of lemonade stand", "speed x2!",   "t1owned[0]", 200, "t1time[0]",  "/2"),
    new Achievement("300 of lemonade stand", "speed x2!",   "t1owned[0]", 300, "t1time[0]",  "/2"),
    new Achievement("400 of lemonade stand", "speed x2!",   "t1owned[0]", 400, "t1time[0]",  "/2"),
    new Achievement("500 of lemonade stand", "profit x2!",   "t1owned[0]", 500, "t1multiplier[0]",  "*2"),
    new Achievement("600 of lemonade stand", "profit x2!",   "t1owned[0]", 600, "t1multiplier[0]",  "*2"),
    new Achievement("700 of lemonade stand", "profit x2!",   "t1owned[0]", 700, "t1multiplier[0]",  "*2"),
    new Achievement("800 of lemonade stand", "profit x2!",   "t1owned[0]", 800, "t1multiplier[0]",  "*2"),
    new Achievement("900 of lemonade stand", "profit x2!",   "t1owned[0]", 900, "t1multiplier[0]",  "*2"),
    new Achievement("1000 of lemonade stand", "profit x3!",   "t1owned[0]", 1000, "t1multiplier[0]",  "*2"),

    new Achievement("25 of newspaper stand", "speed x2!",   "t1owned[1]", 25, "t1time[1]",  "/2"),
    new Achievement("50 of newspaper stand", "speed x2!",   "t1owned[1]", 50, "t1time[1]",  "/2"),
    new Achievement("100 of newspaper stand", "speed x2!",   "t1owned[1]", 100, "t1time[1]",  "/2"),
    new Achievement("200 of newspaper stand", "speed x2!",   "t1owned[1]", 200, "t1time[1]",  "/2"),
    new Achievement("300 of newspaper stand", "speed x2!",   "t1owned[1]", 300, "t1time[1]",  "/2"),
    new Achievement("400 of newspaper stand", "speed x2!",   "t1owned[1]", 400, "t1time[1]",  "/2"),
    new Achievement("500 of newspaper stand", "profit x2!",   "t1owned[1]", 500, "t1multiplier[1]",  "*2"),
    new Achievement("600 of newspaper stand", "profit x2!",   "t1owned[1]", 600, "t1multiplier[1]",  "*2"),
    new Achievement("700 of newspaper stand", "profit x2!",   "t1owned[1]", 700, "t1multiplier[1]",  "*2"),
    new Achievement("800 of newspaper stand", "profit x2!",   "t1owned[1]", 800, "t1multiplier[1]",  "*2"),
    new Achievement("900 of newspaper stand", "profit x2!",   "t1owned[1]", 900, "t1multiplier[1]",  "*2"),
    new Achievement("1000 of newspaper stand", "profit x3!",   "t1owned[1]", 1000, "t1multiplier[1]",  "*2"),

    new Achievement("25 of car-wash", "speed x2!",   "t1owned[2]", 25, "t1time[2]",  "/2"),
    new Achievement("50 of car-wash", "speed x2!",   "t1owned[2]", 50, "t1time[2]",  "/2"),
    new Achievement("100 of car-wash", "speed x2!",   "t1owned[2]", 100, "t1time[2]",  "/2"),
    new Achievement("200 of car-wash", "speed x2!",   "t1owned[2]", 200, "t1time[2]",  "/2"),
    new Achievement("300 of car-wash", "speed x2!",   "t1owned[2]", 300, "t1time[2]",  "/2"),
    new Achievement("400 of car-wash", "speed x2!",   "t1owned[2]", 400, "t1time[2]",  "/2"),
    new Achievement("500 of car-wash", "profit x2!",   "t1owned[2]", 500, "t1multiplier[2]",  "*2"),
    new Achievement("600 of car-wash", "profit x2!",   "t1owned[2]", 600, "t1multiplier[2]",  "*2"),
    new Achievement("700 of car-wash", "profit x2!",   "t1owned[2]", 700, "t1multiplier[2]",  "*2"),
    new Achievement("800 of car-wash", "profit x2!",   "t1owned[2]", 800, "t1multiplier[2]",  "*2"),
    new Achievement("900 of car-wash", "profit x2!",   "t1owned[2]", 900, "t1multiplier[2]",  "*2"),
    new Achievement("1000 of car-wash", "profit x3!",   "t1owned[2]", 1000, "t1multiplier[2]",  "*2"),

    new Achievement("25 of gas extractor", "speed x2!",   "t1owned[3]", 25, "t1time[3]",  "/2"),
    new Achievement("50 of gas extractor", "speed x2!",   "t1owned[3]", 50, "t1time[3]",  "/2"),
    new Achievement("100 of gas extractor", "speed x2!",   "t1owned[3]", 100, "t1time[3]",  "/2"),
    new Achievement("200 of gas extractor", "speed x2!",   "t1owned[3]", 200, "t1time[3]",  "/2"),
    new Achievement("300 of gas extractor", "speed x2!",   "t1owned[3]", 300, "t1time[3]",  "/2"),
    new Achievement("400 of gas extractor", "speed x2!",   "t1owned[3]", 400, "t1time[3]",  "/2"),
    new Achievement("500 of gas extractor", "profit x2!",   "t1owned[3]", 500, "t1multiplier[3]",  "*2"),
    new Achievement("600 of gas extractor", "profit x2!",   "t1owned[3]", 600, "t1multiplier[3]",  "*2"),
    new Achievement("700 of gas extractor", "profit x2!",   "t1owned[3]", 700, "t1multiplier[3]",  "*2"),
    new Achievement("800 of gas extractor", "profit x2!",   "t1owned[3]", 800, "t1multiplier[3]",  "*2"),
    new Achievement("900 of gas extractor", "profit x2!",   "t1owned[3]", 900, "t1multiplier[3]",  "*2"),
    new Achievement("1000 of gas extractor", "profit x3!",   "t1owned[3]", 1000, "t1multiplier[3]",  "*2"),

    new Achievement("25 of meth lab", "speed x2!",   "t1owned[4]", 25, "t1time[4]",  "/2"),
    new Achievement("50 of meth lab", "speed x2!",   "t1owned[4]", 50, "t1time[4]",  "/2"),
    new Achievement("100 of meth lab", "speed x2!",   "t1owned[4]", 100, "t1time[4]",  "/2"),
    new Achievement("200 of meth lab", "speed x2!",   "t1owned[4]", 200, "t1time[4]",  "/2"),
    new Achievement("300 of meth lab", "speed x2!",   "t1owned[4]", 300, "t1time[4]",  "/2"),
    new Achievement("400 of meth lab", "speed x2!",   "t1owned[4]", 400, "t1time[4]",  "/2"),
    new Achievement("500 of meth lab", "profit x2!",   "t1owned[4]", 500, "t1multiplier[4]",  "*2"),
    new Achievement("600 of meth lab", "profit x2!",   "t1owned[4]", 600, "t1multiplier[4]",  "*2"),
    new Achievement("700 of meth lab", "profit x2!",   "t1owned[4]", 700, "t1multiplier[4]",  "*2"),
    new Achievement("800 of meth lab", "profit x2!",   "t1owned[4]", 800, "t1multiplier[4]",  "*2"),
    new Achievement("900 of meth lab", "profit x2!",   "t1owned[4]", 900, "t1multiplier[4]",  "*2"),
    new Achievement("1000 of meth lab", "profit x3!",   "t1owned[4]", 1000, "t1multiplier[4]",  "*2"),

    new Achievement("25 of bank", "speed x2!",   "t1owned[5]", 25, "t1time[5]",  "/2"),
    new Achievement("50 of bank", "speed x2!",   "t1owned[5]", 50, "t1time[5]",  "/2"),
    new Achievement("100 of bank", "speed x2!",   "t1owned[5]", 100, "t1time[5]",  "/2"),
    new Achievement("200 of bank", "speed x2!",   "t1owned[5]", 200, "t1time[5]",  "/2"),
    new Achievement("300 of bank", "speed x2!",   "t1owned[5]", 300, "t1time[5]",  "/2"),
    new Achievement("400 of bank", "speed x2!",   "t1owned[5]", 400, "t1time[5]",  "/2"),
    new Achievement("500 of bank", "profit x2!",   "t1owned[5]", 500, "t1multiplier[5]",  "*2"),
    new Achievement("600 of bank", "profit x2!",   "t1owned[5]", 600, "t1multiplier[5]",  "*2"),
    new Achievement("700 of bank", "profit x2!",   "t1owned[5]", 700, "t1multiplier[5]",  "*2"),
    new Achievement("800 of bank", "profit x2!",   "t1owned[5]", 800, "t1multiplier[5]",  "*2"),
    new Achievement("900 of bank", "profit x2!",   "t1owned[5]", 900, "t1multiplier[5]",  "*2"),
    new Achievement("1000 of bank", "profit x3!",   "t1owned[5]", 1000, "t1multiplier[5]",  "*2"),

    new Achievement("25 of movie studio", "speed x2!",   "t1owned[6]", 25, "t1time[6]",  "/2"),
    new Achievement("50 of movie studio", "speed x2!",   "t1owned[6]", 50, "t1time[6]",  "/2"),
    new Achievement("100 of movie studio", "speed x2!",   "t1owned[6]", 100, "t1time[6]",  "/2"),
    new Achievement("200 of movie studio", "speed x2!",   "t1owned[6]", 200, "t1time[6]",  "/2"),
    new Achievement("300 of movie studio", "speed x2!",   "t1owned[6]", 300, "t1time[6]",  "/2"),
    new Achievement("400 of movie studio", "speed x2!",   "t1owned[6]", 400, "t1time[6]",  "/2"),
    new Achievement("500 of movie studio", "profit x2!",   "t1owned[6]", 500, "t1multiplier[6]",  "*2"),
    new Achievement("600 of movie studio", "profit x2!",   "t1owned[6]", 600, "t1multiplier[6]",  "*2"),
    new Achievement("700 of movie studio", "profit x2!",   "t1owned[6]", 700, "t1multiplier[6]",  "*2"),
    new Achievement("800 of movie studio", "profit x2!",   "t1owned[6]", 800, "t1multiplier[6]",  "*2"),
    new Achievement("900 of movie studio", "profit x2!",   "t1owned[6]", 900, "t1multiplier[6]",  "*2"),
    new Achievement("1000 of movie studio", "profit x3!",   "t1owned[6]", 1000, "t1multiplier[6]",  "*2"),

    new Achievement("25 of oil company", "speed x2!",   "t1owned[7]", 25, "t1time[7]",  "/2"),
    new Achievement("50 of oil company", "speed x2!",   "t1owned[7]", 50, "t1time[7]",  "/2"),
    new Achievement("100 of oil company", "speed x2!",   "t1owned[7]", 100, "t1time[7]",  "/2"),
    new Achievement("200 of oil company", "speed x2!",   "t1owned[7]", 200, "t1time[7]",  "/2"),
    new Achievement("300 of oil company", "speed x2!",   "t1owned[7]", 300, "t1time[7]",  "/2"),
    new Achievement("400 of oil company", "speed x2!",   "t1owned[7]", 400, "t1time[7]",  "/2"),
    new Achievement("500 of oil company", "profit x2!",   "t1owned[7]", 500, "t1multiplier[7]",  "*2"),
    new Achievement("600 of oil company", "profit x2!",   "t1owned[7]", 600, "t1multiplier[7]",  "*2"),
    new Achievement("700 of oil company", "profit x2!",   "t1owned[7]", 700, "t1multiplier[7]",  "*2"),
    new Achievement("800 of oil company", "profit x2!",   "t1owned[7]", 800, "t1multiplier[7]",  "*2"),
    new Achievement("900 of oil company", "profit x2!",   "t1owned[7]", 900, "t1multiplier[7]",  "*2"),
    new Achievement("1000 of oil company", "profit x3!",   "t1owned[7]", 1000, "t1multiplier[7]",  "*2"),

    new Achievement("25 of ship company", "speed x2!",   "t1owned[8]", 25, "t1time[8]",  "/2"),
    new Achievement("50 of ship company", "speed x2!",   "t1owned[8]", 50, "t1time[8]",  "/2"),
    new Achievement("100 of ship company", "speed x2!",   "t1owned[8]", 100, "t1time[8]",  "/2"),
    new Achievement("200 of ship company", "speed x2!",   "t1owned[8]", 200, "t1time[8]",  "/2"),
    new Achievement("300 of ship company", "speed x2!",   "t1owned[8]", 300, "t1time[8]",  "/2"),
    new Achievement("400 of ship company", "speed x2!",   "t1owned[8]", 400, "t1time[8]",  "/2"),
    new Achievement("500 of ship company", "profit x2!",   "t1owned[8]", 500, "t1multiplier[8]",  "*2"),
    new Achievement("600 of ship company", "profit x2!",   "t1owned[8]", 600, "t1multiplier[8]",  "*2"),
    new Achievement("700 of ship company", "profit x2!",   "t1owned[8]", 700, "t1multiplier[8]",  "*2"),
    new Achievement("800 of ship company", "profit x2!",   "t1owned[8]", 800, "t1multiplier[8]",  "*2"),
    new Achievement("900 of ship company", "profit x2!",   "t1owned[8]", 900, "t1multiplier[8]",  "*2"),
    new Achievement("1000 of ship company", "profit x3!",   "t1owned[8]", 1000, "t1multiplier[8]",  "*2"),

    new Achievement("25 of cookieverse", "speed x2!",   "t1owned[9]", 25, "t1time[9]",  "/2"),
    new Achievement("50 of cookieverse", "speed x2!",   "t1owned[9]", 50, "t1time[9]",  "/2"),
    new Achievement("100 of cookieverse", "speed x2!",   "t1owned[9]", 100, "t1time[9]",  "/2"),
    new Achievement("200 of cookieverse", "speed x2!",   "t1owned[9]", 200, "t1time[9]",  "/2"),
    new Achievement("300 of cookieverse", "speed x2!",   "t1owned[9]", 300, "t1time[9]",  "/2"),
    new Achievement("400 of cookieverse", "speed x2!",   "t1owned[9]", 400, "t1time[9]",  "/2"),
    new Achievement("500 of cookieverse", "profit x2!",   "t1owned[9]", 500, "t1multiplier[9]",  "*2"),
    new Achievement("600 of cookieverse", "profit x2!",   "t1owned[9]", 600, "t1multiplier[9]",  "*2"),
    new Achievement("700 of cookieverse", "profit x2!",   "t1owned[9]", 700, "t1multiplier[9]",  "*2"),
    new Achievement("800 of cookieverse", "profit x2!",   "t1owned[9]", 800, "t1multiplier[9]",  "*2"),
    new Achievement("900 of cookieverse", "profit x2!",   "t1owned[9]", 900, "t1multiplier[9]",  "*2"),
    new Achievement("1000 of cookieverse", "profit x3!",   "t1owned[9]", 1000, "t1multiplier[9]",  "*2"),
];

var allVars = ["money","totalMoney","tokens","tokensOn","tokensRate","totalMultiplier","magicTotalMultiplier","achievementsOwned","magicupOwned","upgradesOwned","managersOwned","cheatAvert","t1owned","t1progress","t1time","t1multiplier","V1money","V2totalMoney","V3tokens","V4multiplier","V5rate","V6magic","cheatAvert"];

// Saving system
function setItem(key, value) { localStorage.setItem(key, JSON.stringify(value)); };
function getItem(key) { return JSON.parse(localStorage.getItem(key)); };
function removeItem(key) { localStorage.removeItem(key); };
function saveData() { for (var i = 0; i < allVars.length; i++) { setItem(allVars[i], window[allVars[i]]); }; };
function loadData() {
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(allVars[i]) != null && getItem(allVars[i]) != undefined) {
            window[allVars[i]] = getItem(allVars[i]);
        };
    };
    updateStats(); updateBuilds();
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
function cheatReset() {
    alert("You have cheated too many times, the game will hard reset.")
    for (var i = 0; i < allVars.length; i++) {
        removeItem(allVars[i]);
    }; location.reload();
};
function softReset() {
    var r = confirm("Do you want to soft reset, restart everything from the beginning and goes from " + fix(tokens, 0) + " tokens to " + fix(getTokensOn(), 0) + " tokens?")
    if (r == true) {
        var temp1 = totalMoney;
        var temp2 = getTokensOn();
        var temp3 = cheatAvert;

        initVars();
        totalMoney = temp1;
        V2totalMoney = totalMoney;
        tokens = temp2;
        V3tokens = tokens;
        cheatAvert = temp3;
        V1money = money;
        saveData();

        location.reload();
    };
};

// Essentials functions
function initVars() {
    money = 0; totalMoney = money;
    tokens = 0; tokensOn = 0; tokensRate = 1;
    totalMultiplier = 1; magicTotalMultiplier = 1;
    V1money = 0; V2totalMoney = 0; V3tokens = 0; V4multiplier = 1; V5rate = 1; V6magic = 1;
    before = new Date().getTime();

    t1time = [];
    for (var i = 0; i < t1.length; i++) { t1time.push(1); };

    t1owned = [];
    for (var i = 0; i < t1.length; i++) { t1owned.push(0); };
    t1owned[0] = 1;

    t1progress = [];
    for (var i = 0; i < t1.length; i++) { t1progress.push(0); };

    t1multiplier = [];
    for (var i = 0; i < t1.length; i++) { t1multiplier.push(1); };

    magicupOwned = [];
    for (var i = 0; i < magicupgrades.length; i++) { magicupOwned.push(false); };

    upgradesOwned = [];
    for (var i = 0; i < upgrades.length; i++) { upgradesOwned.push(false); };

    managersOwned = [];
    for (var i = 0; i < managersOwned.length; i++) { managersOwned.push(false); };

    achievementsOwned = [];
    for (var i = 0; i < achievements.length; i++) { achievementsOwned.push(false); };
};
function initGame() {
    $("#s-money").html("Money : " + fix(money, 2) + "$");
    $("#s-totalMoney").html("Total money : " + fix(totalMoney, 2) + "$");
    $("#s-totalMultiplier").html("Total multiplier : x" + totalMultiplier);
    $("#s-tokens").html("Tokens : " + fix(tokens, 0));
    $("#s-tokensOn").html("Tokens on reset : " + fix(getTokensOn(), 0));
    $("#s-tokensRate").html("Tokens Rate : " + fix(tokensRate, 1) + "%");

    for (var i = 0; i < t1.length; i++) {
        var t = t1[i];
        $("#t1-n" + (i+1)).html(t.name + " :");
        $("#t1-r" + (i+1)).html(" " + fix(getInc(i) * t1owned[i], 2) + "$ <br>");
        $("#t1-o" + (i+1)).html("(" + t1owned[i] + " owned)");
        $("#t1-b" + (i+1) + "tm").html("Total multiplier : x" + t1multiplier[i]);

        $("#t1-b" + (i+1) + "c1").html("x1 : " + fix(getPrice(i), 2) + "$ - ");
        $("#t1-b" + (i+1) + "c1").attr('onclick', 'buyBuilding(' + i + ', 1)');
        $("#t1-b" + (i+1) + "c2").html("x10 : " + fix(displayPrice(i, 10), 2) + "$");
        $("#t1-b" + (i+1) + "c2").attr('onclick', 'buyBuilding(' + i + ', 10)');
        $("#t1-b" + (i+1) + "c3").html("x50 : " + fix(displayPrice(i, 50), 2) + "$ - ");
        $("#t1-b" + (i+1) + "c3").attr('onclick', 'buyBuilding(' + i + ', 50)');
        $("#t1-b" + (i+1) + "c4").html("x100 : " + fix(displayPrice(i, 100), 2) + "$");
        $("#t1-b" + (i+1) + "c4").attr('onclick', 'buyBuilding(' + i + ', 100)');
        $("#t1-b" + (i+1) + "cps").html(" - " + fix(((getInc(i) * t1owned[i]) / getTime(i)), 2) + "$/second");
    };

    for (var i = 0; i < magicupgrades.length; i++) {
        var mu = magicupgrades[i];
        $("#mu-n" + (i+1)).html(mu.name + '<br>');
        $("#mu-c" + (i+1)).html(fix(mu.price, 0) + " tokens");
        if (magicupOwned[i]) { $("#s-mu" + (i+1)).css('display', 'none'); };
    };

    for (var i = 0; i < upgrades.length; i++) {
        var u = upgrades[i];
        $("#u-n" + (i+1)).html(u.name + '<br>');
        $("#u-c" + (i+1)).html(fix(u.price, 0) + "$");
        if (upgradesOwned[i]) { $("#s-u" + (i+1)).css('display', 'none'); };
    };

    for (var i = 0; i < managers.length; i++) {
        var m = managers[i];
        $("#m-n" + (i+1)).html(m.name + '<br>');
        $("#m-c" + (i+1)).html("cost : " + fix(m.price, 0) + "$");
        if (managersOwned[i]) { $("#s-m" + (i+1)).css('display', 'none'); };
    };

    for (var i = 0; i < achievements.length; i++) {
        var a = achievements[i];
        $("#a-n" + (i+1)).html(a.name);
        $("#a-t" + (i+1)).html(" - " + a.text);
        if (achievementsOwned[i]) { $("#a-t" + (i+1)).html(" - " + a.text + " (owned)"); };
    };
};

// Helpers
function getInc(source) { return t1[source].reward * t1multiplier[source] * totalMultiplier * magicTotalMultiplier * (1 + tokens * tokensRate / 100); };
function getMoney(amount) { money += amount; totalMoney += amount; V1money += amount; V2totalMoney += amount; };
function getPrice(index) { var t = t1[index]; return t.price * Math.pow(t.inflation, t1owned[index]); };
function getTokensOn() { return Math.floor(10 * Math.sqrt(totalMoney/1e13)); };
function getTime(index) { return t1[index].time * t1time[index]; };
function displayPrice(index, amount) {
    var a = amount; var t = t1[index];
    var totalPrice = 0; var totalOwn = a + t1owned[index];
    while (totalOwn > t1owned[index]) {
        a--; totalOwn = a + t1owned[index];
        totalPrice += t.price * Math.pow(t.inflation, totalOwn);
    };
    return totalPrice;
};
function startBuild(index) {
    if (t1[index].trigger == false) {
        t1progress[index] = 0.01;
        t1[index].trigger = true;
    };
};
function updateGame(times) {
    if (gameInit == true) {
        for (var i = 0; i < t1.length; i++) {
            if (t1owned[i] > 0 && (t1progress[i] > 0 || managersOwned[i])) {
                var b = t1[i]; var t = getTime(i);
                t1progress[i] += times/fps;
                if (managersOwned[i]) {
                    getMoney(Math.floor(t1progress[i]/t) * getInc(i) * t1owned[i]);
                    t1progress[i] %= t;
                    var width = t1progress[i]/t * 100;
                    if (t < 0.1 * 1) { width = 100; };
                    width = Math.max(width, 1);
                    $("#b-f" + (i+1)).css("width", width + "%");
                } else {
                    if (t1progress[i] >= t && b.trigger == true) {
                        getMoney(getInc(i) * t1owned[i]);
                        t1progress[i] = 0;
                        b.trigger = false;
                        $("#b-f" + (i+1)).css("width", 0);
                    } else {
                        var width = t1progress[i]/t * 100;
                        width = Math.max(width,1);
                        b.trigger = true;
                        $("#b-f" + (i+1)).css("width", width + "%");
                    };
                };
            };
        };

        updateAchievements();
        updateStats();
        a98q7w3q8z();
    };
};
function updateBuilds() {
    for (var i = 0; i < t1.length; i++) {
        var t = t1[i];
        $("#t1-n" + (i+1)).html(t.name + " :");
        $("#t1-r" + (i+1)).html(" " + fix(getInc(i) * t1owned[i], 2) + "$ <br>");
        $("#t1-o" + (i+1)).html("(" + t1owned[i] + " owned)");
        $("#t1-b" + (i+1) + "tm").html("Total multiplier : x" + t1multiplier[i]);

        $("#t1-b" + (i+1) + "c1").html("x1 : " + fix(getPrice(i), 2) + "$ - ");
        $("#t1-b" + (i+1) + "c2").html("x10 : " + fix(displayPrice(i, 10), 2) + "$");
        $("#t1-b" + (i+1) + "c3").html("x50 : " + fix(displayPrice(i, 50), 2) + "$ - ");
        $("#t1-b" + (i+1) + "c4").html("x100 : " + fix(displayPrice(i, 100), 2) + "$");
        $("#t1-b" + (i+1) + "cps").html(" - " + fix(((getInc(i) * t1owned[i]) / getTime(i)), 2) + "$/second");
    };
};
function updateStats() {
    $("#s-money").html("Money : " + fix(money, 2) + "$");
    $("#s-totalMoney").html("Total money : " + fix(totalMoney, 2) + "$");
    $("#s-totalMultiplier").html("Total multiplier : x" + totalMultiplier * magicTotalMultiplier);
    $("#s-tokens").html("Tokens : " + fix(tokens, 0));
    $("#s-tokensOn").html("Tokens on reset : " + fix(getTokensOn(), 0));
    $("#s-tokensRate").html("Tokens Rate : " + fix(tokensRate, 1) + "%");
};
function recoverLost() {
    now = new Date().getTime();
    var elapsedTime = now - before;
    if (elapsedTime > interval) { updateGame(Math.floor(elapsedTime/interval)); }
    else { updateGame(1); };
    before = new Date().getTime();
};
function a98q7w3q8z() {
    if (fps < 60) { cheatAvert++; alert("CHEAT DETECTED ! FPS changed, you have " + cheatAvert + "/3 alerts. If you continue your data will be wiped!"); fps = 60; };
    if (fps > 60) { cheatAvert++; alert("CHEAT DETECTED ! FPS changed, you have " + cheatAvert + "/3 alerts. If you continue your data will be wiped!"); fps = 60; };
    if (money > V1money) { cheatAvert++; alert("CHEAT DETECTED ! Money changed, you have " + cheatAvert + "/3 alerts. If you continue your data will be wiped!"); money = V1money; };
    if (totalMoney > V2totalMoney) { cheatAvert++; alert("CHEAT DETECTED ! Total money changed, you have " + cheatAvert + "/3 alerts. If you continue your data will be wiped!"); totalMoney = V2totalMoney; };
    if (tokens > V3tokens) { cheatAvert++; alert("CHEAT DETECTED ! Tokens changed, you have " + cheatAvert + "/3 alerts. If you continue your data will be wiped!"); tokens = V3tokens; };
    if (totalMultiplier > V4multiplier) { cheatAvert++; alert("CHEAT DETECTED ! Total multiplier changed, you have " + cheatAvert + "/3 alert. If you continue your data will be wiped!"); totalMultiplier = V4multiplier; };
    if (tokensRate > V5rate) { cheatAvert++; alert("CHEAT DETECTED ! Tokens rate changed, you have " + cheatAvert + "/3 alert. If you continue your data will be wiped!"); tokensRate = V5rate;};
    if (magicTotalMultiplier > V6magic) { cheatAvert++; alert("CHEAT DETECTED ! Magic total multiplier changed, you have " + cheatAvert + "/3 alert. If you continue your data will be wiped!"); magicTotalMultiplier = V6magic; };
    if (cheatAvert == 3) { cheatReset(); };
};

// Methods
function Building(name, price, reward, inflation, time, trigger) {
    this.name = name;
    this.price = price;
    this.reward = reward;
    this.inflation = inflation;
    this.time = time;
    this.trigger = trigger;
};
function buyBuilding(index, buyAmount) {
    var amount = buyAmount;
    if (amount > 0) { for (var i = 0; i < amount; i++) { buyBuildingOnce(index); }; }
    else { while (money >= getPrice(index)) { buyBuildingOnce(index); }; };
    updateBuilds();
    updateStats();
};
function buyBuildingOnce(index) {
    if (money < getPrice(index)) { return; }
    else { money -= getPrice(index); V1money -= getPrice(index); t1owned[index]++; };
};

function MagicUp(name, price, run) {
    this.name = name;
    this.price = price;
    this.run = run;
};
function buyMagicUp(index) {
    if (tokens >= magicupgrades[index].price) {
        tokens -= magicupgrades[index].price; V3tokens -= magicupgrades[index].price;
        magicupOwned[index] = true;
        magicupgrades[index].run();
        updateStats(); updateBuilds();
        $("#s-mu" + (index+1)).css('display', 'none');
    };
};

function Upgrade(name, price, run) {
    this.name = name;
    this.price = price;
    this.run = run;
};
function buyUpgrade(index) {
    if (money >= upgrades[index].price) {
        money -= upgrades[index].price; V1money -= upgrades[index].price;
        upgradesOwned[index] = true;
        upgrades[index].run();
        updateStats(); updateBuilds();
        $("#s-u" + (index+1)).css('display', 'none');
    };
};

function Manager(name, price) {
    this.name = name;
    this.price = price;
};
function buyManager(index) {
    if (money >= managers[index].price) {
        money -= managers[index].price;
        V1money -= managers[index].price;
        managersOwned[index] = true;
        $("#s-m" + (index+1)).css('display', 'none');
        updateStats();
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
    updateBuilds();
};
function updateAchievements() {
    for (var i = 0; i < achievements.length; i++)
        if (!achievementsOwned[i] && achievements[i].isComplete()) {
            achievements[i].achieve();
            achievementsOwned[i] = true;
            for (var i = 0; i < achievements.length; i++) {
                var a = achievements[i];
                if (achievementsOwned[i]) {
                    $("#a-t" + (i+1)).html(a.text + " (owned)");
                };
            };
        };
};

// Onload + loops
window.onload = function() {
    initVars();
    loadData();
    initGame();
    gameInit = true;
};
window.setInterval(function() {
    recoverLost();
}, interval);
window.setInterval(function() {
    saveData();
}, 30000);