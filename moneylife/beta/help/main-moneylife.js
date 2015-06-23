var maxpx = $(document).height(); var headerpx = 45; var marginpx = 10;
$(".row").css('max-height', (maxpx-headerpx-marginpx) + 'px');
$(".col-md-4").css('max-height', (maxpx-headerpx-marginpx) + 'px'); $(".col-md-4").css('height', (maxpx-headerpx-marginpx) + 'px')
$("#shop, #buildings").css('max-height', (maxpx-headerpx-marginpx) + 'px')

var money; var totalMoney; var tokens; var tokensOn; var tokensRate;
var gameInit = false; var fps = 60; var interval = (1000 / fps);

var totalMultiplier; var magicTotalMultiplier;
var t1owned; var t1progress; var t1multiplier; var t1time; var t1min;
var t1 = [
    new Building("Lemonade Stand",      4,              1,              1.07, 1.5,  false),
    new Building("Newspaper Stand",     70,             60,             1.15, 3,    false),
    new Building("Car-Wash",            720,            540,            1.14, 6,    false),
    new Building("Pizza Delivery",      6400,           4320,           1.13, 12,   false),
    new Building("Donut Shop",          103680,         51840,          1.12, 24,   false),
    new Building("Shrimp Boat",         1244160,        622080,         1.11, 96,   false),
    new Building("Hockey Team",         14929920,       7464961,        1.10, 384,  false),
    new Building("Movie Studio",        179159040,      89579521,       1.09, 576,  false),
    new Building("Bank",                2149908480,     1074954241,     1.08, 1296, false),
    new Building("Oil Company",         25789901760,    29668737024,    1.07, 6144, false)
];
var managersOwned;
var managers = [
    new Manager("Cave Johnson (Lemonade Stand Manager)",    1000),
    new Manager("Rupert Murdoch (Newspaper Stand Manager)", 15000),
    new Manager("W.W. Heisenberg (Car-Wash Manager)",       100000),
    new Manager("Mama Sean (Pizza Delivery Manager)",       500000),
    new Manager("Jim (Donut Shop Manager)",                 1200000),
    new Manager("Forest Shrump (Shrimp Boat Manager)",      10000000),
    new Manager("Down Cheri (Hockey Team Manager)",         111111111),
    new Manager("Spielberg (Movie Studio Manager",          555555555),
    new Manager("Dark Lord (Bank Manager)",                 10000000000),
    new Manager("Derrick (Oil Company Manager)",            100000000000)
];
var magicupOwned;
var magicupgrades = [
    new MagicUp("Magic Up 1 : all profit x3!",      10000,      function() {magicTotalMultiplier *= 3;}),
    new MagicUp("Magic Up 2 : tokens rate +2%!",    100000,     function() {tokensRate += 2;}),
    new MagicUp("Magic Up 3 : tokens rate +2%!",    100000000,  function() {tokensRate += 2;}),
    new MagicUp("Magic Up 4 : all profit x5!",      1000000000, function() {magicTotalMultiplier *= 5;}),
    new MagicUp("Magic Up 5 : all profit x9!",      100000000000,   function() {magicTotalMultiplier *= 9;}),
    new MagicUp("Magic Up 6 : all profit x11",      1000000000000,  function() {magicTotalMultiplier *= 11;}),
    new MagicUp("Magic Up 7 : all profit x15",      1000000000000000000000,    function() {magicTotalMultiplier *= 15;}),
    new MagicUp("Magic Up 8 : tokens rate +10%!",   1000000000000000000000000000000000,     function() {tokensRate += 10;}),
    new MagicUp("Magic Up 9 : all profit x15!",     10000000000000000000000000000000000,    function() {magicTotalMultiplier *= 15;}),
    new MagicUp("Magic Up 10 : all profit x3!",     1000000000000000000000000000000000000,  function() {magicTotalMultiplier *= 3;}),
    new MagicUp("Magic Up 11 : all profit x5!",     10000000000000000000000000000000000000000,   function() {magicTotalMultiplier *= 5;}),
    new MagicUp("Magic Up 12 : all profit x3!",     1000000000000000000000000000000000000000000, function() {magicTotalMultiplier *= 3;})
];
var upgradesOwned;
var upgrades = [
    new Upgrade("Lemonade stand profit x3!",        250000,         function() {t1multiplier[0] *= 3;}),
    new Upgrade("Newspaper stand profit x3!",       500000,         function() {t1multiplier[1] *= 3;}),
    new Upgrade("Car-wash profit x3!",              1000000,        function() {t1multiplier[2] *= 3;}),
    new Upgrade("Pizza delivery profit x3!",        5000000,        function() {t1multiplier[3] *= 3;}),
    new Upgrade("Donut shop profit x3!",            10000000,       function() {t1multiplier[4] *= 3;}),
    new Upgrade("Shrimp boat profit x3!",           25000000,       function() {t1multiplier[5] *= 3;}),
    new Upgrade("Hockey team profit x3!",           500000000,      function() {t1multiplier[6] *= 3;}),
    new Upgrade("Movie studio profit x3!",          10000000000,    function() {t1multiplier[7] *= 3;}),
    new Upgrade("Bank profit x3!",                  50000000000,    function() {t1multiplier[8] *= 3;}),
    new Upgrade("Oil company profit x3!",           250000000000,   function() {t1multiplier[9] *= 3;}),
    new Upgrade("All profit x3!",                   1000000000000,  function() {totalMultiplier *= 3;}),

    new Upgrade("Lemonade stand profit x3!",        20000000000000,     function() {t1multiplier[0] *= 3;}),
    new Upgrade("Newspaper stand profit x3!",       50000000000000,     function() {t1multiplier[1] *= 3;}),
    new Upgrade("Car-wash profit x3!",              100000000000000,    function() {t1multiplier[2] *= 3;}),
    new Upgrade("Pizza delivery profit x3!",        500000000000000,    function() {t1multiplier[3] *= 3;}),
    new Upgrade("Donut shop profit x3!",            1000000000000000,   function() {t1multiplier[4] *= 3;}),
    new Upgrade("Shrimp boat profit x3!",           2000000000000000,   function() {t1multiplier[5] *= 3;}),
    new Upgrade("Hockey team profit x3!",           5000000000000000,   function() {t1multiplier[6] *= 3;}),
    new Upgrade("Movie studio profit x3!",          7000000000000000,   function() {t1multiplier[7] *= 3;}),
    new Upgrade("Bank profit x3!",                  10000000000000000,  function() {t1multiplier[8] *= 3;}),
    new Upgrade("Oil company profit x3!",           20000000000000000,  function() {t1multiplier[9] *= 3;}),
    new Upgrade("All profit x3!",                   50000000000000000,  function() {totalMultiplier *= 3; ;}),
    new Upgrade("tokens efficiency +1%",            500000000000000000, function() {tokensRate += 1;}),

    new Upgrade("Lemonade stand profit x3!",        2000000000000000000,    function() {t1multiplier[0] *= 3;}),
    new Upgrade("Newspaper stand profit x3!",       5000000000000000000,    function() {t1multiplier[1] *= 3;}),
    new Upgrade("Car-wash profit x3!",              7000000000000000000,    function() {t1multiplier[2] *= 3;}),
    new Upgrade("Pizza delivery profit x3!",        10000000000000000000,   function() {t1multiplier[3] *= 3;}),
    new Upgrade("Donut shop profit x3!",            20000000000000000000,   function() {t1multiplier[4] *= 3;}),
    new Upgrade("Shrimp boat profit x3!",           35000000000000000000,   function() {t1multiplier[5] *= 3;}),
    new Upgrade("Hockey team profit x3!",           50000000000000000000,   function() {t1multiplier[6] *= 3;}),
    new Upgrade("Movie studio profit x3!",          75000000000000000000,   function() {t1multiplier[7] *= 3;}),
    new Upgrade("Bank profit x3!",                  100000000000000000000,  function() {t1multiplier[8] *= 3;}),
    new Upgrade("Oil company profit x3!",           200000000000000000000,  function() {t1multiplier[9] *= 3;}),
    new Upgrade("All profit x3!",                   500000000000000000000,  function() {totalMultiplier *= 3; ;}),
    new Upgrade("tokens efficiency +1%",            1000000000000000000000, function() {tokensRate += 1;}),

    new Upgrade("Lemonade stand profit x3!",        25000000000000000000000,    function() {t1multiplier[0] *= 3;}),
    new Upgrade("Newspaper stand profit x3!",       50000000000000000000000,    function() {t1multiplier[1] *= 3;}),
    new Upgrade("Car-wash profit x3!",              100000000000000000000000,   function() {t1multiplier[2] *= 3;}),
    new Upgrade("Pizza delivery profit x3!",        200000000000000000000000,   function() {t1multiplier[3] *= 3;}),
    new Upgrade("Donut shop profit x3!",            300000000000000000000000,   function() {t1multiplier[4] *= 3;}),
    new Upgrade("Shrimp boat profit x3!",           400000000000000000000000,   function() {t1multiplier[5] *= 3;}),
    new Upgrade("Hockey team profit x3!",           500000000000000000000000,   function() {t1multiplier[6] *= 3;}),
    new Upgrade("Movie studio profit x3!",          600000000000000000000000,   function() {t1multiplier[7] *= 3;}),
    new Upgrade("Bank profit x3!",                  700000000000000000000000,   function() {t1multiplier[8] *= 3;}),
    new Upgrade("Oil company profit x3!",           800000000000000000000000,   function() {t1multiplier[9] *= 3;}),
    new Upgrade("All profit x3!",                   900000000000000000000000,   function() {totalMultiplier *= 3; ;}),
    new Upgrade("tokens efficiency +2%",            10000000000000000000000000, function() {tokensRate += 2;}),

    new Upgrade("Lemonade stand profit x7!",        1000000000000000000000000000,                   function() {t1multiplier[0] *= 7;}),
    new Upgrade("Newspaper stand profit x7!",       5000000000000000000000000000,                   function() {t1multiplier[1] *= 7;}),
    new Upgrade("Car-wash profit x7!",              25000000000000000000000000000,                  function() {t1multiplier[2] *= 7;}),
    new Upgrade("Pizza delivery profit x7!",        100000000000000000000000000000,                 function() {t1multiplier[3] *= 7;}),
    new Upgrade("Donut shop profit x7!",            250000000000000000000000000000,                 function() {t1multiplier[4] *= 7;}),
    new Upgrade("Shrimp boat profit x7!",           500000000000000000000000000000,                 function() {t1multiplier[5] *= 7;}),
    new Upgrade("Hockey team profit x7!",           1000000000000000000000000000000,                function() {t1multiplier[6] *= 7;}),
    new Upgrade("Movie studio profit x7!",          5000000000000000000000000000000,                function() {t1multiplier[7] *= 7;}),
    new Upgrade("Bank profit x7!",                  25000000000000000000000000000000,               function() {t1multiplier[8] *= 7;}),
    new Upgrade("Oil company profit x7!",           50000000000000000000000000000000,               function() {t1multiplier[9] *= 7;}),
    new Upgrade("All profit x7!",                   1000000000000000000000000000000000000000000,    function() {totalMultiplier *= 7; ;}),

    new Upgrade("Newspaper stand profit x3!",       5000000000000000000000000000000000000000000,        function() {t1multiplier[1] *= 3;}),
    new Upgrade("Car-wash profit x3!",              25000000000000000000000000000000000000000000,       function() {t1multiplier[2] *= 3;}),
    new Upgrade("Pizza delivery profit x3!",        50000000000000000000000000000000000000000000,       function() {t1multiplier[3] *= 3;}),
    new Upgrade("Donut shop profit x3!",            100000000000000000000000000000000000000000000,      function() {t1multiplier[4] *= 3;}),
    new Upgrade("Shrimp boat profit x3!",           250000000000000000000000000000000000000000000,      function() {t1multiplier[5] *= 3;}),
    new Upgrade("Hockey team profit x3!",           500000000000000000000000000000000000000000000,      function() {t1multiplier[6] *= 3;}),
    new Upgrade("Movie studio profit x3!",          1000000000000000000000000000000000000000000000,     function() {t1multiplier[7] *= 3;}),
    new Upgrade("Bank profit x3!",                  5000000000000000000000000000000000000000000000,     function() {t1multiplier[8] *= 3;}),
    new Upgrade("Oil company profit x3!",           10000000000000000000000000000000000000000000000,    function() {t1multiplier[9] *= 3;}),
    new Upgrade("Lemonade stand profit x3!",        25000000000000000000000000000000000000000000000,    function() {t1multiplier[0] *= 3;}),
    new Upgrade("All profit x3!",                   100000000000000000000000000000000000000000000000,   function() {totalMultiplier *= 3;}),

    new Upgrade("Newspaper stand profit x3!",       250000000000000000000000000000000000000000000000,                   function() {t1multiplier[1] *= 3;}),
    new Upgrade("Car-wash profit x3!",              500000000000000000000000000000000000000000000000,                   function() {t1multiplier[2] *= 3;}),
    new Upgrade("Pizza delivery profit x3!",        750000000000000000000000000000000000000000000000,                   function() {t1multiplier[3] *= 3;}),
    new Upgrade("Donut shop profit x3!",            1000000000000000000000000000000000000000000000000,                  function() {t1multiplier[4] *= 3;}),
    new Upgrade("Shrimp boat profit x3!",           500000000000000000000000000000000000000000000000,                   function() {t1multiplier[5] *= 3;}),
    new Upgrade("Hockey team profit x3!",           15000000000000000000000000000000000000000000000000,                 function() {t1multiplier[6] *= 3;}),
    new Upgrade("Movie studio profit x3!",          50000000000000000000000000000000000000000000000000,                 function() {t1multiplier[7] *= 3;}),
    new Upgrade("Bank profit x3!",                  100000000000000000000000000000000000000000000000000,                function() {t1multiplier[8] *= 3;}),
    new Upgrade("Oil company profit x3!",           250000000000000000000000000000000000000000000000000,                function() {t1multiplier[9] *= 3;}),
    new Upgrade("Lemonade stand profit x3!",        500000000000000000000000000000000000000000000000000,                function() {t1multiplier[0] *= 3;}),
    new Upgrade("All profit x7!",                   1000000000000000000000000000000000000000000000000000,               function() {totalMultiplier *= 7;}),
    new Upgrade("All profit x5!",                   1000000000000000000000000000000000000000000000000000000,            function() {totalMultiplier *= 5;}),
    new Upgrade("All profit x7!",                   1000000000000000000000000000000000000000000000000000000000000,      function() {totalMultiplier *= 7;}),

    new Upgrade("Newspaper stand profit x3!",       10000000000000000000000000000000000000000000000000000000000000,     function() {t1multiplier[1] *= 3;}),
    new Upgrade("Car-wash profit x3!",              100000000000000000000000000000000000000000000000000000000000000,    function() {t1multiplier[2] *= 3;}),
    new Upgrade("All profit x9!",                   1000000000000000000000000000000000000000000000000000000000000000000,    function() {totalMultiplier *= 9;}),
    new Upgrade("Pizza delivery profit x3!",        10000000000000000000000000000000000000000000000000000000000000000000,   function() {t1multiplier[3] *= 3;}),
    new Upgrade("Donut shop profit x3!",            100000000000000000000000000000000000000000000000000000000000000000000,  function() {t1multiplier[5] *= 3;}),
    new Upgrade("All profit x11!",                  1000000000000000000000000000000000000000000000000000000000000000000000000,  function() {totalMultiplier *= 11;}),
    new Upgrade("Shrimp boat profit x3!",           10000000000000000000000000000000000000000000000000000000000000000000000000, function() {t1multiplier[5] *= 3;}),
    new Upgrade("Hockey team profit x3!",           100000000000000000000000000000000000000000000000000000000000000000000000000,function() {t1multiplier[6] *= 3;}),
    new Upgrade("All profit x13!",                  1000000000000000000000000000000000000000000000000000000000000000000000000000,   function() {totalMultiplier *= 13;}),
    new Upgrade("Movie studio profit x3!",          10000000000000000000000000000000000000000000000000000000000000000000000000000,  function() {t1multiplier[7] *= 3;}),
    new Upgrade("Bank profit x3!",                  100000000000000000000000000000000000000000000000000000000000000000000000000000, function() {t1multiplier[8] *= 3;}),
    new Upgrade("All profit x15!",                  1000000000000000000000000000000000000000000000000000000000000000000000000000000,    function() {totalMultiplier *= 15;}),
    new Upgrade("Oil company profit x3!",           10000000000000000000000000000000000000000000000000000000000000000000000000000000,   function() {t1multiplier[9] *= 3;}),
    new Upgrade("Lemonade stand profit x3!",        100000000000000000000000000000000000000000000000000000000000000000000000000000000,  function() {t1multiplier[0] *= 3;}),
    new Upgrade("All profit x3!",                   1000000000000000000000000000000000000000000000000000000000000000000000000000000000000,  function() {totalMultiplier *= 3; ;}),
    new Upgrade("All profit x3.1415926",            1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,   function() {totalMultiplier *= 3.1415926;}),

    new Upgrade("Newspaper profit x3!",             1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,    function() {t1multiplier[1] *= 3;}),
    new Upgrade("Car-wash profit x3!",              5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,    function() {t1multiplier[2] *= 3;}),
    new Upgrade("Pizza delivery profit x3!",        25000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,   function() {t1multiplier[3] *= 3;}),
    new Upgrade("Donut shop profit x3!",            50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,   function() {t1multiplier[4] *= 3;}),
    new Upgrade("Shrimp boat profit x3!",           100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,  function() {t1multiplier[5] *= 3;}),
    new Upgrade("Hockey team profit x3!",           250000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,  function() {t1multiplier[6] *= 3;}),
    new Upgrade("Movie studio profit x3!",          500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,  function() {t1multiplier[7] *= 3;}),
    new Upgrade("Bank profit x3!",                  1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, function() {t1multiplier[8] *= 3;}),
    new Upgrade("Oil company profit x3!",           5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, function() {t1multiplier[9] *= 3;}),
    new Upgrade("Lemonade stand profit x3!",        10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,    function() {t1multiplier[0] *= 3;}),
    new Upgrade("All profit x2!",                   500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,   function() {totalMultiplier *= 2; ;})
];
var achievementsOwned; var achievementsOwnStats;
var achievements = [
    new Achievement("25 lemonade stand", "speed x2!",   "t1owned[0]", 25, "t1time[0]",  "/2"),
    new Achievement("50 lemonade stand", "speed x2!",   "t1owned[0]", 50, "t1time[0]",  "/2"),
    new Achievement("100 lemonade stand", "speed x2!",   "t1owned[0]", 100, "t1time[0]",  "/2"),
    new Achievement("200 lemonade stand", "speed x2!",   "t1owned[0]", 200, "t1time[0]",  "/2"),
    new Achievement("300 lemonade stand", "speed x2!",   "t1owned[0]", 300, "t1time[0]",  "/2"),
    new Achievement("400 lemonade stand", "speed x2!",   "t1owned[0]", 400, "t1time[0]",  "/2"),
    new Achievement("500 lemonade stand", "profit x4!",   "t1owned[0]", 500, "t1multiplier[0]",  "*4"),
    new Achievement("600 lemonade stand", "profit x4!",   "t1owned[0]", 600, "t1multiplier[0]",  "*4"),
    new Achievement("700 lemonade stand", "profit x4!",   "t1owned[0]", 700, "t1multiplier[0]",  "*4"),
    new Achievement("800 lemonade stand", "profit x4!",   "t1owned[0]", 800, "t1multiplier[0]",  "*4"),
    new Achievement("900 lemonade stand", "profit x4!",   "t1owned[0]", 900, "t1multiplier[0]",  "*4"),
    new Achievement("1000 lemonade stand", "profit x5!",   "t1owned[0]", 1000, "t1multiplier[0]",  "*5"),
    new Achievement("1100 lemonade stand", "profit x4!",   "t1owned[0]", 1100, "t1multiplier[0]",  "*4"),
    new Achievement("1200 lemonade stand", "profit x4!",   "t1owned[0]", 1200, "t1multiplier[0]",  "*4"),
    new Achievement("1300 lemonade stand", "profit x4!",   "t1owned[0]", 1300, "t1multiplier[0]",  "*4"),
    new Achievement("1400 lemonade stand", "profit x4!",   "t1owned[0]", 1400, "t1multiplier[0]",  "*4"),
    new Achievement("1500 lemonade stand", "profit x4!",   "t1owned[0]", 1500, "t1multiplier[0]",  "*4"),
    new Achievement("1600 lemonade stand", "profit x4!",   "t1owned[0]", 1600, "t1multiplier[0]",  "*4"),
    new Achievement("1700 lemonade stand", "profit x4!",   "t1owned[0]", 1700, "t1multiplier[0]",  "*4"),
    new Achievement("1800 lemonade stand", "profit x4!",   "t1owned[0]", 1800, "t1multiplier[0]",  "*4"),
    new Achievement("1900 lemonade stand", "profit x4!",   "t1owned[0]", 1900, "t1multiplier[0]",  "*4"),
    new Achievement("2000 lemonade stand", "profit x5!",   "t1owned[0]", 2000, "t1multiplier[0]",  "*5"),
    new Achievement("2250 lemonade stand", "profit x2!",   "t1owned[0]", 2250, "t1multiplier[0]",  "*2"),
    new Achievement("2500 lemonade stand", "profit x2!",   "t1owned[0]", 2500, "t1multiplier[0]",  "*2"),
    new Achievement("2750 lemonade stand", "profit x2!",   "t1owned[0]", 2750, "t1multiplier[0]",  "*2"),
    new Achievement("3000 lemonade stand", "profit x5!",   "t1owned[0]", 3000, "t1multiplier[0]",  "*5"),
    new Achievement("3250 lemonade stand", "profit x2!",   "t1owned[0]", 3250, "t1multiplier[0]",  "*2"),
    new Achievement("3500 lemonade stand", "profit x2!",   "t1owned[0]", 3500, "t1multiplier[0]",  "*2"),
    new Achievement("3750 lemonade stand", "profit x2!",   "t1owned[0]", 3750, "t1multiplier[0]",  "*2"),
    new Achievement("4000 lemonade stand", "profit x5!",   "t1owned[0]", 4000, "t1multiplier[0]",  "*5"),
    new Achievement("4250 lemonade stand", "profit x2!",   "t1owned[0]", 4250, "t1multiplier[0]",  "*2"),
    new Achievement("4500 lemonade stand", "profit x2!",   "t1owned[0]", 4500, "t1multiplier[0]",  "*2"),
    new Achievement("4750 lemonade stand", "profit x2!",   "t1owned[0]", 4750, "t1multiplier[0]",  "*2"),
    new Achievement("5000 lemonade stand", "profit x5!",   "t1owned[0]", 5000, "t1multiplier[0]",  "*5"),
    new Achievement("5250 lemonade stand", "profit x2!",   "t1owned[0]", 5250, "t1multiplier[0]",  "*3"),
    new Achievement("5500 lemonade stand", "profit x2!",   "t1owned[0]", 5500, "t1multiplier[0]",  "*3"),
    new Achievement("5750 lemonade stand", "profit x2!",   "t1owned[0]", 5750, "t1multiplier[0]",  "*3"),
    new Achievement("6000 lemonade stand", "profit x5!",   "t1owned[0]", 6000, "t1multiplier[0]",  "*5"),
    new Achievement("6250 lemonade stand", "profit x3!",   "t1owned[0]", 6250, "t1multiplier[0]",  "*2"),
    new Achievement("6500 lemonade stand", "profit x3!",   "t1owned[0]", 6500, "t1multiplier[0]",  "*2"),
    new Achievement("6750 lemonade stand", "profit x3!",   "t1owned[0]", 6750, "t1multiplier[0]",  "*2"),
    new Achievement("7000 lemonade stand", "profit x9!",   "t1owned[0]", 7000, "t1multiplier[0]",  "*9"),

    new Achievement("25 newspaper stand", "speed x2!",              "t1owned[1]", 25, "t1time[1]",  "/2"),
    new Achievement("50 newspaper stand", "speed x2!",              "t1owned[1]", 50, "t1time[1]",  "/2"),
    new Achievement("100 newspaper stand", "speed x2!",             "t1owned[1]", 100, "t1time[1]",  "/2"),
    new Achievement("125 newspaper stand", "lemonade profit x2!",   "t1owned[1]", 125, "t1multiplier[0]",  "*2"),
    new Achievement("150 newspaper stand", "car profit x2!",        "t1owned[1]", 150, "t1multiplier[2]",  "*2"),
    new Achievement("175 newspaper stand", "pizza profit x2!",      "t1owned[1]", 175, "t1multiplier[3]",  "*2"),
    new Achievement("200 newspaper stand", "speed x2!",             "t1owned[1]", 200, "t1time[1]",  "/2"),
    new Achievement("225 newspaper stand", "donut profit x2!",      "t1owned[1]", 225, "t1multiplier[4]",  "*2"),
    new Achievement("250 newspaper stand", "lemonade profit x2!",   "t1owned[1]", 250, "t1multiplier[0]",  "*3"),
    new Achievement("275 newspaper stand", "car profit x3!",        "t1owned[1]", 275, "t1multiplier[2]",  "*3"),
    new Achievement("300 newspaper stand", "speed x2!",             "t1owned[1]", 300, "t1time[1]",  "/2"),
    new Achievement("325 newspaper stand", "pizza profit x3!",      "t1owned[1]", 325, "t1multiplier[3]",  "*3"),
    new Achievement("350 newspaper stand", "donut profit x3!",      "t1owned[1]", 350, "t1multiplier[4]",  "*3"),
    new Achievement("375 newspaper stand", "lemonade profit x4!",   "t1owned[1]", 375, "t1multiplier[1]",  "*4"),
    new Achievement("400 newspaper stand", "speed x2!",             "t1owned[1]", 400, "t1time[1]",  "/2"),
    new Achievement("425 newspaper stand", "car profit x4!",        "t1owned[1]", 425, "t1multiplier[2]",  "*4"),
    new Achievement("450 newspaper stand", "pizza profit x4!",      "t1owned[1]", 450, "t1multiplier[3]",  "*4"),
    new Achievement("475 newspaper stand", "donut profit x4!",      "t1owned[1]", 475, "t1multiplier[4]",  "*4"),
    new Achievement("500 newspaper stand", "shrimp profit x11!",    "t1owned[1]", 500, "t1multiplier[6]",  "*11"),
    new Achievement("525 newspaper stand", "lemonade profit x5!",   "t1owned[1]", 525, "t1multiplier[0]",  "*5"),
    new Achievement("550 newspaper stand", "car profit x5!",        "t1owned[1]", 550, "t1multiplier[2]",  "*5"),
    new Achievement("575 newspaper stand", "pizza profit x5!",      "t1owned[1]", 575, "t1multiplier[3]",  "*5"),
    new Achievement("600 newspaper stand", "hockey profit x11!",    "t1owned[1]", 600, "t1multiplier[7]",  "*11"),
    new Achievement("625 newspaper stand", "donut profit x5!",      "t1owned[1]", 625, "t1multiplier[4]",  "*5"),
    new Achievement("650 newspaper stand", "lemonade profit x6!",   "t1owned[1]", 650, "t1multiplier[0]",  "*6"),
    new Achievement("675 newspaper stand", "car profit x6!",        "t1owned[1]", 675, "t1multiplier[2]",  "*6"),
    new Achievement("700 newspaper stand", "movie profit x11!",     "t1owned[1]", 700, "t1multiplier[7]",  "*11"),
    new Achievement("725 newspaper stand", "pizza profit x6!",      "t1owned[1]", 725, "t1multiplier[3]",  "*6"),
    new Achievement("750 newspaper stand", "donut profit x6!",      "t1owned[1]", 750, "t1multiplier[4]",  "*6"),
    new Achievement("775 newspaper stand", "lemonade profit x7!",   "t1owned[1]", 775, "t1multiplier[0]",  "*3"),
    new Achievement("800 newspaper stand", "bank profit x11!",      "t1owned[1]", 800, "t1multiplier[8]",  "*11"),
    new Achievement("825 newspaper stand", "car profit x7!",        "t1owned[1]", 825, "t1multiplier[2]",  "*7"),
    new Achievement("850 newspaper stand", "pizza profit x7!",      "t1owned[1]", 850, "t1multiplier[3]",  "*7"),
    new Achievement("875 newspaper stand", "donut profit x7!",      "t1owned[1]", 875, "t1multiplier[4]",  "*7"),
    new Achievement("900 newspaper stand", "oil profit x11!",       "t1owned[1]", 900, "t1multiplier[9]",  "*11"),
    new Achievement("925 newspaper stand", "shrimp profit x7!",     "t1owned[1]", 925, "t1multiplier[5]",  "*7"),
    new Achievement("950 newspaper stand", "hockey profit x7!",     "t1owned[1]", 950, "t1multiplier[6]",  "*7"),
    new Achievement("975 newspaper stand", "movie profit x7!",      "t1owned[1]", 975, "t1multiplier[7]",  "*7"),
    new Achievement("1000 newspaper stand", "newspaper x7777777!",   "t1owned[1]", 1000, "t1multiplier[1]",  "*7777777"),

    new Achievement("25 car-wash", "speed x2!",   "t1owned[2]", 25, "t1time[2]",  "/2"),
    new Achievement("50 car-wash", "speed x2!",   "t1owned[2]", 50, "t1time[2]",  "/2"),
    new Achievement("100 car-wash", "speed x2!",   "t1owned[2]", 100, "t1time[2]",  "/2"),
    new Achievement("200 car-wash", "speed x2!",   "t1owned[2]", 200, "t1time[2]",  "/2"),
    new Achievement("300 car-wash", "speed x2!",   "t1owned[2]", 300, "t1time[2]",  "/2"),
    new Achievement("400 car-wash", "speed x2!",   "t1owned[2]", 400, "t1time[2]",  "/2"),
    new Achievement("500 car-wash", "profit x2!",   "t1owned[2]", 500, "t1multiplier[2]",  "*2"),
    new Achievement("600 car-wash", "profit x2!",   "t1owned[2]", 600, "t1multiplier[2]",  "*2"),
    new Achievement("700 car-wash", "profit x2!",   "t1owned[2]", 700, "t1multiplier[2]",  "*2"),
    new Achievement("800 car-wash", "profit x2!",   "t1owned[2]", 800, "t1multiplier[2]",  "*2"),
    new Achievement("900 car-wash", "profit x2!",   "t1owned[2]", 900, "t1multiplier[2]",  "*2"),
    new Achievement("1000 car-wash", "profit x3!",   "t1owned[2]", 1000, "t1multiplier[2]",  "*3"),
    new Achievement("1100 car-wash", "profit x2!",   "t1owned[2]", 1100, "t1multiplier[2]",  "*2"),
    new Achievement("1200 car-wash", "profit x2!",   "t1owned[2]", 1200, "t1multiplier[2]",  "*2"),
    new Achievement("1300 car-wash", "profit x2!",   "t1owned[2]", 1300, "t1multiplier[2]",  "*2"),
    new Achievement("1400 car-wash", "profit x2!",   "t1owned[2]", 1400, "t1multiplier[2]",  "*2"),
    new Achievement("1500 car-wash", "profit x2!",   "t1owned[2]", 1500, "t1multiplier[2]",  "*2"),
    new Achievement("1600 car-wash", "profit x2!",   "t1owned[2]", 1600, "t1multiplier[2]",  "*2"),
    new Achievement("1700 car-wash", "profit x2!",   "t1owned[2]", 1700, "t1multiplier[2]",  "*2"),
    new Achievement("1800 car-wash", "profit x2!",   "t1owned[2]", 1800, "t1multiplier[2]",  "*2"),
    new Achievement("1900 car-wash", "profit x2!",   "t1owned[2]", 1900, "t1multiplier[2]",  "*2"),
    new Achievement("2000 car-wash", "profit x5!",   "t1owned[2]", 2000, "t1multiplier[2]",  "*5"),
    new Achievement("2100 car-wash", "profit x3!",   "t1owned[2]", 2100, "t1multiplier[2]",  "*3"),
    new Achievement("2200 car-wash", "profit x3!",   "t1owned[2]", 2200, "t1multiplier[2]",  "*3"),
    new Achievement("2300 car-wash", "profit x3!",   "t1owned[2]", 2300, "t1multiplier[2]",  "*3"),
    new Achievement("2400 car-wash", "profit x3!",   "t1owned[2]", 2400, "t1multiplier[2]",  "*3"),
    new Achievement("2500 car-wash", "profit x3!",   "t1owned[2]", 2500, "t1multiplier[2]",  "*3"),
    new Achievement("2600 car-wash", "profit x3!",   "t1owned[2]", 2600, "t1multiplier[2]",  "*3"),
    new Achievement("2700 car-wash", "profit x3!",   "t1owned[2]", 2700, "t1multiplier[2]",  "*3"),
    new Achievement("2800 car-wash", "profit x3!",   "t1owned[2]", 2800, "t1multiplier[2]",  "*3"),
    new Achievement("2900 car-wash", "profit x3!",   "t1owned[2]", 2900, "t1multiplier[2]",  "*3"),
    new Achievement("3000 car-wash", "profit x3!",   "t1owned[2]", 3000, "t1multiplier[2]",  "*3"),
    new Achievement("3100 car-wash", "profit x3!",   "t1owned[2]", 3100, "t1multiplier[2]",  "*3"),
    new Achievement("3200 car-wash", "profit x3!",   "t1owned[2]", 3200, "t1multiplier[2]",  "*3"),
    new Achievement("3400 car-wash", "profit x3!",   "t1owned[2]", 3400, "t1multiplier[2]",  "*3"),
    new Achievement("3500 car-wash", "profit x3!",   "t1owned[2]", 3500, "t1multiplier[2]",  "*3"),
    new Achievement("3600 car-wash", "profit x3!",   "t1owned[2]", 3600, "t1multiplier[2]",  "*3"),
    new Achievement("3700 car-wash", "profit x3!",   "t1owned[2]", 3700, "t1multiplier[2]",  "*3"),
    new Achievement("3800 car-wash", "profit x3!",   "t1owned[2]", 3800, "t1multiplier[2]",  "*3"),
    new Achievement("3900 car-wash", "profit x3!",   "t1owned[2]", 3900, "t1multiplier[2]",  "*3"),
    new Achievement("4000 car-wash", "profit x5!",   "t1owned[2]", 4000, "t1multiplier[2]",  "*5"),

    new Achievement("25 pizza delivery", "speed x2!",   "t1owned[3]", 25, "t1time[3]",  "/2"),
    new Achievement("50 pizza delivery", "speed x2!",   "t1owned[3]", 50, "t1time[3]",  "/2"),
    new Achievement("100 pizza delivery", "speed x2!",   "t1owned[3]", 100, "t1time[3]",  "/2"),
    new Achievement("200 pizza delivery", "speed x2!",   "t1owned[3]", 200, "t1time[3]",  "/2"),
    new Achievement("300 pizza delivery", "speed x2!",   "t1owned[3]", 300, "t1time[3]",  "/2"),
    new Achievement("400 pizza delivery", "speed x2!",   "t1owned[3]", 400, "t1time[3]",  "/2"),
    new Achievement("500 pizza delivery", "profit x2!",   "t1owned[3]", 500, "t1multiplier[3]",  "*2"),
    new Achievement("600 pizza delivery", "profit x2!",   "t1owned[3]", 600, "t1multiplier[3]",  "*2"),
    new Achievement("700 pizza delivery", "profit x2!",   "t1owned[3]", 700, "t1multiplier[3]",  "*2"),
    new Achievement("800 pizza delivery", "profit x2!",   "t1owned[3]", 800, "t1multiplier[3]",  "*2"),
    new Achievement("900 pizza delivery", "profit x2!",   "t1owned[3]", 900, "t1multiplier[3]",  "*2"),
    new Achievement("1000 pizza delivery", "profit x3!",   "t1owned[3]", 1000, "t1multiplier[3]",  "*3"),
    new Achievement("1100 pizza delivery", "profit x2!",   "t1owned[3]", 1100, "t1multiplier[3]",  "*2"),
    new Achievement("1200 pizza delivery", "profit x2!",   "t1owned[3]", 1200, "t1multiplier[3]",  "*2"),
    new Achievement("1300 pizza delivery", "profit x2!",   "t1owned[3]", 1300, "t1multiplier[3]",  "*2"),
    new Achievement("1400 pizza delivery", "profit x2!",   "t1owned[3]", 1400, "t1multiplier[3]",  "*2"),
    new Achievement("1500 pizza delivery", "profit x2!",   "t1owned[3]", 1500, "t1multiplier[3]",  "*2"),
    new Achievement("1600 pizza delivery", "profit x2!",   "t1owned[3]", 1600, "t1multiplier[3]",  "*2"),
    new Achievement("1700 pizza delivery", "profit x2!",   "t1owned[3]", 1700, "t1multiplier[3]",  "*2"),
    new Achievement("1800 pizza delivery", "profit x2!",   "t1owned[3]", 1800, "t1multiplier[3]",  "*2"),
    new Achievement("1900 pizza delivery", "profit x2!",   "t1owned[3]", 1900, "t1multiplier[3]",  "*2"),
    new Achievement("2000 pizza delivery", "profit x5!",   "t1owned[3]", 2000, "t1multiplier[3]",  "*5"),
    new Achievement("2100 pizza delivery", "profit x3!",   "t1owned[3]", 2100, "t1multiplier[3]",  "*3"),
    new Achievement("2200 pizza delivery", "profit x3!",   "t1owned[3]", 2200, "t1multiplier[3]",  "*3"),
    new Achievement("2300 pizza delivery", "profit x3!",   "t1owned[3]", 2300, "t1multiplier[3]",  "*3"),
    new Achievement("2400 pizza delivery", "profit x3!",   "t1owned[3]", 2400, "t1multiplier[3]",  "*3"),
    new Achievement("2500 pizza delivery", "profit x3!",   "t1owned[3]", 2500, "t1multiplier[3]",  "*3"),
    new Achievement("2600 pizza delivery", "profit x3!",   "t1owned[3]", 2600, "t1multiplier[3]",  "*3"),
    new Achievement("2700 pizza delivery", "profit x3!",   "t1owned[3]", 2700, "t1multiplier[3]",  "*3"),
    new Achievement("2800 pizza delivery", "profit x3!",   "t1owned[3]", 2800, "t1multiplier[3]",  "*3"),
    new Achievement("2900 pizza delivery", "profit x3!",   "t1owned[3]", 2900, "t1multiplier[3]",  "*3"),
    new Achievement("3000 pizza delivery", "profit x3!",   "t1owned[3]", 3000, "t1multiplier[3]",  "*3"),
    new Achievement("3100 pizza delivery", "profit x3!",   "t1owned[3]", 3100, "t1multiplier[3]",  "*3"),
    new Achievement("3200 pizza delivery", "profit x3!",   "t1owned[3]", 3200, "t1multiplier[3]",  "*3"),
    new Achievement("3300 pizza delivery", "profit x3!",   "t1owned[3]", 3300, "t1multiplier[3]",  "*3"),
    new Achievement("3400 pizza delivery", "profit x3!",   "t1owned[3]", 3400, "t1multiplier[3]",  "*3"),
    new Achievement("3500 pizza delivery", "profit x3!",   "t1owned[3]", 3500, "t1multiplier[3]",  "*3"),
    new Achievement("3600 pizza delivery", "profit x3!",   "t1owned[3]", 3600, "t1multiplier[3]",  "*3"),
    new Achievement("3700 pizza delivery", "profit x3!",   "t1owned[3]", 3700, "t1multiplier[3]",  "*3"),
    new Achievement("3800 pizza delivery", "profit x3!",   "t1owned[3]", 3800, "t1multiplier[3]",  "*3"),
    new Achievement("3900 pizza delivery", "profit x3!",   "t1owned[3]", 3900, "t1multiplier[3]",  "*3"),
    new Achievement("4000 pizza delivery", "profit x5!",   "t1owned[3]", 4000, "t1multiplier[3]",  "*5"),
    new Achievement("4100 pizza delivery", "profit x3!",   "t1owned[3]", 4100, "t1multiplier[3]",  "*3"),

    new Achievement("25 donut shop", "speed x2!",   "t1owned[4]", 25, "t1time[4]",  "/2"),
    new Achievement("50 donut shop", "speed x2!",   "t1owned[4]", 50, "t1time[4]",  "/2"),
    new Achievement("100 donut shop", "speed x2!",   "t1owned[4]", 100, "t1time[4]",  "/2"),
    new Achievement("200 donut shop", "speed x2!",   "t1owned[4]", 200, "t1time[4]",  "/2"),
    new Achievement("300 donut shop", "speed x2!",   "t1owned[4]", 300, "t1time[4]",  "/2"),
    new Achievement("400 donut shop", "speed x2!",   "t1owned[4]", 400, "t1time[4]",  "/2"),
    new Achievement("500 donut shop", "profit x2!",   "t1owned[4]", 500, "t1multiplier[4]",  "*2"),
    new Achievement("600 donut shop", "profit x2!",   "t1owned[4]", 600, "t1multiplier[4]",  "*2"),
    new Achievement("700 donut shop", "profit x2!",   "t1owned[4]", 700, "t1multiplier[4]",  "*2"),
    new Achievement("800 donut shop", "profit x2!",   "t1owned[4]", 800, "t1multiplier[4]",  "*2"),
    new Achievement("900 donut shop", "profit x2!",   "t1owned[4]", 900, "t1multiplier[4]",  "*2"),
    new Achievement("1000 donut shop", "profit x3!",   "t1owned[4]", 1000, "t1multiplier[4]",  "*3"),
    new Achievement("1100 donut shop", "profit x2!",   "t1owned[4]", 1100, "t1multiplier[4]",  "*2"),
    new Achievement("1200 donut shop", "profit x2!",   "t1owned[4]", 1200, "t1multiplier[4]",  "*2"),
    new Achievement("1300 donut shop", "profit x2!",   "t1owned[4]", 1300, "t1multiplier[4]",  "*2"),
    new Achievement("1400 donut shop", "profit x2!",   "t1owned[4]", 1400, "t1multiplier[4]",  "*2"),
    new Achievement("1500 donut shop", "profit x2!",   "t1owned[4]", 1500, "t1multiplier[4]",  "*2"),
    new Achievement("1600 donut shop", "profit x2!",   "t1owned[4]", 1600, "t1multiplier[4]",  "*2"),
    new Achievement("1700 donut shop", "profit x2!",   "t1owned[4]", 1700, "t1multiplier[4]",  "*2"),
    new Achievement("1800 donut shop", "profit x2!",   "t1owned[4]", 1800, "t1multiplier[4]",  "*2"),
    new Achievement("1900 donut shop", "profit x2!",   "t1owned[4]", 1900, "t1multiplier[4]",  "*2"),
    new Achievement("2000 donut shop", "profit x5!",   "t1owned[4]", 2000, "t1multiplier[4]",  "*5"),
    new Achievement("2100 donut shop", "profit x3!",   "t1owned[4]", 2100, "t1multiplier[4]",  "*3"),
    new Achievement("2200 donut shop", "profit x3!",   "t1owned[4]", 2200, "t1multiplier[4]",  "*3"),
    new Achievement("2300 donut shop", "profit x3!",   "t1owned[4]", 2300, "t1multiplier[4]",  "*3"),
    new Achievement("2400 donut shop", "profit x3!",   "t1owned[4]", 2400, "t1multiplier[4]",  "*3"),
    new Achievement("2500 donut shop", "profit x3!",   "t1owned[4]", 2500, "t1multiplier[4]",  "*3"),
    new Achievement("2600 donut shop", "profit x3!",   "t1owned[4]", 2600, "t1multiplier[4]",  "*3"),
    new Achievement("2700 donut shop", "profit x3!",   "t1owned[4]", 2700, "t1multiplier[4]",  "*3"),
    new Achievement("2800 donut shop", "profit x3!",   "t1owned[4]", 2800, "t1multiplier[4]",  "*3"),
    new Achievement("2900 donut shop", "profit x3!",   "t1owned[4]", 2900, "t1multiplier[4]",  "*3"),
    new Achievement("3000 donut shop", "profit x3!",   "t1owned[4]", 3000, "t1multiplier[4]",  "*3"),
    new Achievement("3100 donut shop", "profit x3!",   "t1owned[4]", 3100, "t1multiplier[4]",  "*3"),
    new Achievement("3200 donut shop", "profit x3!",   "t1owned[4]", 3200, "t1multiplier[4]",  "*3"),
    new Achievement("3300 donut shop", "profit x3!",   "t1owned[4]", 3300, "t1multiplier[4]",  "*3"),
    new Achievement("3400 donut shop", "profit x3!",   "t1owned[4]", 3400, "t1multiplier[4]",  "*3"),
    new Achievement("3500 donut shop", "profit x3!",   "t1owned[4]", 3500, "t1multiplier[4]",  "*3"),
    new Achievement("3600 donut shop", "profit x3!",   "t1owned[4]", 3600, "t1multiplier[4]",  "*3"),
    new Achievement("3700 donut shop", "profit x3!",   "t1owned[4]", 3700, "t1multiplier[4]",  "*3"),
    new Achievement("3800 donut shop", "profit x3!",   "t1owned[4]", 3800, "t1multiplier[4]",  "*3"),
    new Achievement("3900 donut shop", "profit x3!",   "t1owned[4]", 3900, "t1multiplier[4]",  "*3"),
    new Achievement("4000 donut shop", "profit x3!",   "t1owned[4]", 4000, "t1multiplier[4]",  "*3"),
    new Achievement("4100 donut shop", "profit x3!",   "t1owned[4]", 4100, "t1multiplier[4]",  "*3"),
    new Achievement("4200 donut shop", "profit x3!",   "t1owned[4]", 4200, "t1multiplier[4]",  "*3"),
    new Achievement("4300 donut shop", "profit x3!",   "t1owned[4]", 4300, "t1multiplier[4]",  "*3"),
    new Achievement("4400 donut shop", "profit x3!",   "t1owned[4]", 4400, "t1multiplier[4]",  "*3"),

    new Achievement("25 shrimp boat", "speed x2!",   "t1owned[5]", 25, "t1time[5]",  "/2"),
    new Achievement("50 shrimp boat", "speed x2!",   "t1owned[5]", 50, "t1time[5]",  "/2"),
    new Achievement("100 shrimp boat", "speed x2!",   "t1owned[5]", 100, "t1time[5]",  "/2"),
    new Achievement("200 shrimp boat", "speed x2!",   "t1owned[5]", 200, "t1time[5]",  "/2"),
    new Achievement("300 shrimp boat", "speed x2!",   "t1owned[5]", 300, "t1time[5]",  "/2"),
    new Achievement("400 shrimp boat", "speed x2!",   "t1owned[5]", 400, "t1time[5]",  "/2"),
    new Achievement("500 shrimp boat", "profit x2!",   "t1owned[5]", 500, "t1multiplier[5]",  "*2"),
    new Achievement("600 shrimp boat", "profit x2!",   "t1owned[5]", 600, "t1multiplier[5]",  "*2"),
    new Achievement("700 shrimp boat", "profit x2!",   "t1owned[5]", 700, "t1multiplier[5]",  "*2"),
    new Achievement("800 shrimp boat", "profit x2!",   "t1owned[5]", 800, "t1multiplier[5]",  "*2"),
    new Achievement("900 shrimp boat", "profit x2!",   "t1owned[5]", 900, "t1multiplier[5]",  "*2"),
    new Achievement("1000 shrimp boat", "profit x3!",   "t1owned[5]", 1000, "t1multiplier[5]",  "*3"),
    new Achievement("1100 shrimp boat", "profit x2!",   "t1owned[5]", 1100, "t1multiplier[5]",  "*2"),
    new Achievement("1200 shrimp boat", "profit x2!",   "t1owned[5]", 1200, "t1multiplier[5]",  "*2"),
    new Achievement("1300 shrimp boat", "profit x2!",   "t1owned[5]", 1300, "t1multiplier[5]",  "*2"),
    new Achievement("1400 shrimp boat", "profit x2!",   "t1owned[5]", 1400, "t1multiplier[5]",  "*2"),
    new Achievement("1500 shrimp boat", "profit x2!",   "t1owned[5]", 1500, "t1multiplier[5]",  "*2"),
    new Achievement("1600 shrimp boat", "profit x2!",   "t1owned[5]", 1600, "t1multiplier[5]",  "*2"),
    new Achievement("1700 shrimp boat", "profit x2!",   "t1owned[5]", 1700, "t1multiplier[5]",  "*2"),
    new Achievement("1800 shrimp boat", "profit x2!",   "t1owned[5]", 1800, "t1multiplier[5]",  "*2"),
    new Achievement("1900 shrimp boat", "profit x2!",   "t1owned[5]", 1900, "t1multiplier[5]",  "*2"),
    new Achievement("2000 shrimp boat", "profit x5!",   "t1owned[5]", 2000, "t1multiplier[5]",  "*5"),
    new Achievement("2100 shrimp boat", "profit x3!",   "t1owned[5]", 2100, "t1multiplier[5]",  "*3"),
    new Achievement("2200 shrimp boat", "profit x3!",   "t1owned[5]", 2200, "t1multiplier[5]",  "*3"),
    new Achievement("2300 shrimp boat", "profit x3!",   "t1owned[5]", 2300, "t1multiplier[5]",  "*3"),
    new Achievement("2400 shrimp boat", "profit x3!",   "t1owned[5]", 2400, "t1multiplier[5]",  "*3"),
    new Achievement("2500 shrimp boat", "profit x3!",   "t1owned[5]", 2500, "t1multiplier[5]",  "*3"),
    new Achievement("2600 shrimp boat", "profit x3!",   "t1owned[5]", 2600, "t1multiplier[5]",  "*3"),
    new Achievement("2700 shrimp boat", "profit x3!",   "t1owned[5]", 2700, "t1multiplier[5]",  "*3"),
    new Achievement("2800 shrimp boat", "profit x3!",   "t1owned[5]", 2800, "t1multiplier[5]",  "*3"),
    new Achievement("2900 shrimp boat", "profit x3!",   "t1owned[5]", 2900, "t1multiplier[5]",  "*3"),
    new Achievement("3000 shrimp boat", "profit x3!",   "t1owned[5]", 3000, "t1multiplier[5]",  "*3"),
    new Achievement("3250 shrimp boat", "profit x5!",   "t1owned[5]", 3250, "t1multiplier[5]",  "*5"),
    new Achievement("3500 shrimp boat", "profit x5!",   "t1owned[5]", 3500, "t1multiplier[5]",  "*5"),
    new Achievement("3750 shrimp boat", "profit x3!",   "t1owned[5]", 3750, "t1multiplier[5]",  "*3"),
    new Achievement("4000 shrimp boat", "profit x5!",   "t1owned[5]", 4000, "t1multiplier[5]",  "*5"),
    new Achievement("4250 shrimp boat", "profit x3!",   "t1owned[5]", 4250, "t1multiplier[5]",  "*3"),
    new Achievement("4500 shrimp boat", "profit x5!",   "t1owned[5]", 4500, "t1multiplier[5]",  "*5"),

    new Achievement("25 hockey team", "speed x2!",   "t1owned[6]", 25, "t1time[6]",  "/2"),
    new Achievement("50 hockey team", "speed x2!",   "t1owned[6]", 50, "t1time[6]",  "/2"),
    new Achievement("100 hockey team", "speed x2!",   "t1owned[6]", 100, "t1time[6]",  "/2"),
    new Achievement("200 hockey team", "speed x2!",   "t1owned[6]", 200, "t1time[6]",  "/2"),
    new Achievement("300 hockey team", "speed x2!",   "t1owned[6]", 300, "t1time[6]",  "/2"),
    new Achievement("400 hockey team", "speed x2!",   "t1owned[6]", 400, "t1time[6]",  "/2"),
    new Achievement("500 hockey team", "profit x2!",   "t1owned[6]", 500, "t1multiplier[6]",  "*2"),
    new Achievement("600 hockey team", "profit x2!",   "t1owned[6]", 600, "t1multiplier[6]",  "*2"),
    new Achievement("700 hockey team", "profit x2!",   "t1owned[6]", 700, "t1multiplier[6]",  "*2"),
    new Achievement("800 hockey team", "profit x2!",   "t1owned[6]", 800, "t1multiplier[6]",  "*2"),
    new Achievement("900 hockey team", "profit x2!",   "t1owned[6]", 900, "t1multiplier[6]",  "*2"),
    new Achievement("1000 hockey team", "profit x3!",   "t1owned[6]", 1000, "t1multiplier[6]",  "*3"),
    new Achievement("1100 hockey team", "profit x2!",   "t1owned[6]", 1100, "t1multiplier[6]",  "*2"),
    new Achievement("1200 hockey team", "profit x2!",   "t1owned[6]", 1200, "t1multiplier[6]",  "*2"),
    new Achievement("1300 hockey team", "profit x2!",   "t1owned[6]", 1300, "t1multiplier[6]",  "*2"),
    new Achievement("1400 hockey team", "profit x2!",   "t1owned[6]", 1400, "t1multiplier[6]",  "*2"),
    new Achievement("1500 hockey team", "profit x2!",   "t1owned[6]", 1500, "t1multiplier[6]",  "*2"),
    new Achievement("1600 hockey team", "profit x2!",   "t1owned[6]", 1600, "t1multiplier[6]",  "*2"),
    new Achievement("1700 hockey team", "profit x2!",   "t1owned[6]", 1700, "t1multiplier[6]",  "*2"),
    new Achievement("1800 hockey team", "profit x2!",   "t1owned[6]", 1800, "t1multiplier[6]",  "*2"),
    new Achievement("1900 hockey team", "profit x2!",   "t1owned[6]", 1900, "t1multiplier[6]",  "*2"),
    new Achievement("2000 hockey team", "profit x5!",   "t1owned[6]", 2000, "t1multiplier[6]",  "*5"),
    new Achievement("2100 hockey team", "spped x2!",    "t1owned[6]", 2100, "t1time[6]",        "/2"),
    new Achievement("2200 hockey team", "profit x3!",   "t1owned[6]", 2200, "t1multiplier[6]",  "*3"),
    new Achievement("2300 hockey team", "spped x2!",    "t1owned[6]", 2300, "t1time[6]",        "/2"),
    new Achievement("2400 hockey team", "profit x3!",   "t1owned[6]", 2400, "t1multiplier[6]",  "*3"),
    new Achievement("2500 hockey team", "spped x2!",    "t1owned[6]", 2500, "t1time[6]",        "/2"),
    new Achievement("2600 hockey team", "profit x3!",   "t1owned[6]", 2600, "t1multiplier[6]",  "*3"),
    new Achievement("2700 hockey team", "spped x2!",    "t1owned[6]", 2700, "t1time[6]",        "/2"),
    new Achievement("2800 hockey team", "profit x3!",   "t1owned[6]", 2800, "t1multiplier[6]",  "*3"),
    new Achievement("2900 hockey team", "profit x3!",   "t1owned[6]", 2900, "t1multiplier[6]",  "*3"),
    new Achievement("3000 hockey team", "profit x3!",   "t1owned[6]", 3000, "t1multiplier[6]",  "*3"),
    new Achievement("3250 hockey team", "profit x3!",   "t1owned[6]", 3250, "t1multiplier[6]",  "*3"),
    new Achievement("3500 hockey team", "profit x3!",   "t1owned[6]", 3500, "t1multiplier[6]",  "*3"),
    new Achievement("3750 hockey team", "profit x3!",   "t1owned[6]", 3750, "t1multiplier[6]",  "*3"),
    new Achievement("4000 hockey team", "profit x5!",   "t1owned[6]", 4000, "t1multiplier[6]",  "*5"),
    new Achievement("4250 hockey team", "profit x3!",   "t1owned[6]", 4250, "t1multiplier[6]",  "*3"),
    new Achievement("4500 hockey team", "profit x3!",   "t1owned[6]", 4500, "t1multiplier[6]",  "*3"),
    new Achievement("4750 hockey team", "profit x3!",   "t1owned[6]", 4750, "t1multiplier[6]",  "*3"),

    new Achievement("25 movie studio", "speed x2!",   "t1owned[7]", 25, "t1time[7]",  "/2"),
    new Achievement("50 movie studio", "speed x2!",   "t1owned[7]", 50, "t1time[7]",  "/2"),
    new Achievement("100 movie studio", "speed x2!",   "t1owned[7]", 100, "t1time[7]",  "/2"),
    new Achievement("200 movie studio", "speed x2!",   "t1owned[7]", 200, "t1time[7]",  "/2"),
    new Achievement("300 movie studio", "speed x2!",   "t1owned[7]", 300, "t1time[7]",  "/2"),
    new Achievement("400 movie studio", "speed x2!",   "t1owned[7]", 400, "t1time[7]",  "/2"),
    new Achievement("500 movie studio", "profit x2!",   "t1owned[7]", 500, "t1multiplier[7]",  "*2"),
    new Achievement("600 movie studio", "profit x2!",   "t1owned[7]", 600, "t1multiplier[7]",  "*2"),
    new Achievement("700 movie studio", "profit x2!",   "t1owned[7]", 700, "t1multiplier[7]",  "*2"),
    new Achievement("800 movie studio", "profit x2!",   "t1owned[7]", 800, "t1multiplier[7]",  "*2"),
    new Achievement("900 movie studio", "profit x2!",   "t1owned[7]", 900, "t1multiplier[7]",  "*2"),
    new Achievement("1000 movie studio", "profit x3!",   "t1owned[7]", 1000, "t1multiplier[7]",  "*3"),
    new Achievement("1100 movie studio", "profit x2!",   "t1owned[7]", 1100, "t1multiplier[7]",  "*2"),
    new Achievement("1200 movie studio", "profit x2!",   "t1owned[7]", 1200, "t1multiplier[7]",  "*2"),
    new Achievement("1300 movie studio", "profit x2!",   "t1owned[7]", 1300, "t1multiplier[7]",  "*2"),
    new Achievement("1400 movie studio", "profit x2!",   "t1owned[7]", 1400, "t1multiplier[7]",  "*2"),
    new Achievement("1500 movie studio", "profit x2!",   "t1owned[7]", 1500, "t1multiplier[7]",  "*2"),
    new Achievement("1600 movie studio", "profit x2!",   "t1owned[7]", 1600, "t1multiplier[7]",  "*2"),
    new Achievement("1700 movie studio", "profit x2!",   "t1owned[7]", 1700, "t1multiplier[7]",  "*2"),
    new Achievement("1800 movie studio", "profit x2!",   "t1owned[7]", 1800, "t1multiplier[7]",  "*2"),
    new Achievement("1900 movie studio", "profit x2!",   "t1owned[7]", 1900, "t1multiplier[7]",  "*2"),
    new Achievement("2000 movie studio", "profit x5!",   "t1owned[7]", 2000, "t1multiplier[7]",  "*5"),
    new Achievement("2100 movie studio", "speed x2!",    "t1owned[7]", 2100, "t1time[7]",        "/2"),
    new Achievement("2200 movie studio", "profit x2!",   "t1owned[7]", 2200, "t1multiplier[7]",  "*2"),
    new Achievement("2300 movie studio", "speed x2!",    "t1owned[7]", 2300, "t1time[7]",        "/2"),
    new Achievement("2400 movie studio", "profit x2!",   "t1owned[7]", 2400, "t1multiplier[7]",  "*2"),
    new Achievement("2500 movie studio", "speed x2!",    "t1owned[7]", 2500, "t1time[7]",        "/2"),
    new Achievement("2600 movie studio", "profit x2!",   "t1owned[7]", 2600, "t1multiplier[7]",  "*2"),
    new Achievement("2700 movie studio", "speed x2!",    "t1owned[7]", 2700, "t1time[7]",        "/2"),
    new Achievement("2800 movie studio", "profit x2!",   "t1owned[7]", 2800, "t1multiplier[7]",  "*2"),
    new Achievement("2900 movie studio", "profit x2!",   "t1owned[7]", 2900, "t1multiplier[7]",  "*2"),
    new Achievement("3000 movie studio", "profit x2!",   "t1owned[7]", 3000, "t1multiplier[7]",  "*2"),
    new Achievement("3250 movie studio", "speed x2!",    "t1owned[7]", 3250,  "t1time[7]",        "/2"),
    new Achievement("3500 movie studio", "profit x2!",   "t1owned[7]", 3500, "t1multiplier[7]",  "*2"),
    new Achievement("3750 movie studio", "profit x2!",   "t1owned[7]", 3750, "t1multiplier[7]",  "*2"),
    new Achievement("4000 movie studio", "profit x2!",   "t1owned[7]", 4000, "t1multiplier[7]",  "*2"),
    new Achievement("4250 movie studio", "profit x3!",   "t1owned[7]", 4250, "t1multiplier[7]",  "*3"),
    new Achievement("4500 movie studio", "profit x3!",   "t1owned[7]", 4500, "t1multiplier[7]",  "*3"),
    new Achievement("4750 movie studio", "profit x3!",   "t1owned[7]", 4750, "t1multiplier[7]",  "*3"),
    new Achievement("5000 movie studio", "profit x5!",   "t1owned[7]", 5000, "t1multiplier[7]",  "*5"),
    new Achievement("5250 movie studio", "profit x3!",   "t1owned[7]", 5250, "t1multiplier[7]",  "*3"),

    new Achievement("25 bank", "speed x2!",   "t1owned[8]", 25, "t1time[8]",  "/2"),
    new Achievement("50 bank", "speed x2!",   "t1owned[8]", 50, "t1time[8]",  "/2"),
    new Achievement("100 bank", "speed x2!",   "t1owned[8]", 100, "t1time[8]",  "/2"),
    new Achievement("200 bank", "speed x2!",   "t1owned[8]", 200, "t1time[8]",  "/2"),
    new Achievement("300 bank", "speed x2!",   "t1owned[8]", 300, "t1time[8]",  "/2"),
    new Achievement("400 bank", "speed x2!",   "t1owned[8]", 400, "t1time[8]",  "/2"),
    new Achievement("500 bank", "profit x2!",   "t1owned[8]", 500, "t1multiplier[8]",  "*2"),
    new Achievement("600 bank", "profit x2!",   "t1owned[8]", 600, "t1multiplier[8]",  "*2"),
    new Achievement("700 bank", "profit x2!",   "t1owned[8]", 700, "t1multiplier[8]",  "*2"),
    new Achievement("800 bank", "profit x2!",   "t1owned[8]", 800, "t1multiplier[8]",  "*2"),
    new Achievement("900 bank", "profit x2!",   "t1owned[8]", 900, "t1multiplier[8]",  "*2"),
    new Achievement("1000 bank", "profit x3!",   "t1owned[8]", 1000, "t1multiplier[8]",  "*3"),
    new Achievement("1100 bank", "profit x2!",   "t1owned[8]", 1100, "t1multiplier[8]",  "*2"),
    new Achievement("1200 bank", "profit x2!",   "t1owned[8]", 1200, "t1multiplier[8]",  "*2"),
    new Achievement("1300 bank", "profit x2!",   "t1owned[8]", 1300, "t1multiplier[8]",  "*2"),
    new Achievement("1400 bank", "profit x2!",   "t1owned[8]", 1400, "t1multiplier[8]",  "*2"),
    new Achievement("1500 bank", "profit x2!",   "t1owned[8]", 1500, "t1multiplier[8]",  "*2"),
    new Achievement("1600 bank", "profit x2!",   "t1owned[8]", 1600, "t1multiplier[8]",  "*2"),
    new Achievement("1700 bank", "profit x2!",   "t1owned[8]", 1700, "t1multiplier[8]",  "*2"),
    new Achievement("1800 bank", "profit x2!",   "t1owned[8]", 1800, "t1multiplier[8]",  "*2"),
    new Achievement("1900 bank", "profit x2!",   "t1owned[8]", 1900, "t1multiplier[8]",  "*2"),
    new Achievement("2000 bank", "profit x5!",   "t1owned[8]", 2000, "t1multiplier[8]",  "*5"),
    new Achievement("2250 bank", "speed x2!",    "t1owned[8]", 2250, "t1time[8]",        "/2"),
    new Achievement("2500 bank", "speed x2!",    "t1owned[8]", 2500, "t1time[8]",        "/2"),
    new Achievement("2750 bank", "speed x2!",    "t1owned[8]", 2750, "t1time[8]",        "/2"),
    new Achievement("3000 bank", "speed x2!",    "t1owned[8]", 3000, "t1time[8]",        "/2"),
    new Achievement("3250 bank", "speed x2!",    "t1owned[8]", 3250, "t1time[8]",        "/2"),
    new Achievement("3500 bank", "speed x2!",    "t1owned[8]", 3500, "t1time[8]",        "/2"),
    new Achievement("3750 bank", "speed x2!",    "t1owned[8]", 3750, "t1time[8]",        "/2"),
    new Achievement("4000 bank", "speed x2!",    "t1owned[8]", 4000, "t1time[8]",        "/2"),
    new Achievement("4250 bank", "profit x3!",   "t1owned[8]", 4250, "t1multiplier[8]",  "*3"),
    new Achievement("4500 bank", "profit x3!",   "t1owned[8]", 4500, "t1multiplier[8]",  "*3"),
    new Achievement("4750 bank", "profit x3!",   "t1owned[8]", 4750, "t1multiplier[8]",  "*3"),
    new Achievement("5000 bank", "profit x5!",   "t1owned[8]", 5000, "t1multiplier[8]",  "*5"),
    new Achievement("5250 bank", "profit x5!",   "t1owned[8]", 5250, "t1multiplier[8]",  "*5"),
    new Achievement("5500 bank", "profit x3!",   "t1owned[8]", 5500, "t1multiplier[8]",  "*3"),
    new Achievement("5750 bank", "profit x3!",   "t1owned[8]", 5750, "t1multiplier[8]",  "*3"),

    new Achievement("25 oil company", "speed x2!",   "t1owned[9]", 25, "t1time[9]",  "/2"),
    new Achievement("50 oil company", "speed x2!",   "t1owned[9]", 50, "t1time[9]",  "/2"),
    new Achievement("100 oil company", "speed x2!",   "t1owned[9]", 100, "t1time[9]",  "/2"),
    new Achievement("200 oil company", "speed x2!",   "t1owned[9]", 200, "t1time[9]",  "/2"),
    new Achievement("300 oil company", "speed x2!",   "t1owned[9]", 300, "t1time[9]",  "/2"),
    new Achievement("400 oil company", "speed x2!",   "t1owned[9]", 400, "t1time[9]",  "/2"),
    new Achievement("500 oil company", "profit x2!",   "t1owned[9]", 500, "t1multiplier[9]",  "*2"),
    new Achievement("600 oil company", "profit x2!",   "t1owned[9]", 600, "t1multiplier[9]",  "*2"),
    new Achievement("700 oil company", "profit x2!",   "t1owned[9]", 700, "t1multiplier[9]",  "*2"),
    new Achievement("800 oil company", "profit x2!",   "t1owned[9]", 800, "t1multiplier[9]",  "*2"),
    new Achievement("900 oil company", "profit x2!",   "t1owned[9]", 900, "t1multiplier[9]",  "*2"),
    new Achievement("1000 oil company", "profit x2!",   "t1owned[9]", 1000, "t1multiplier[9]",  "*2"),
    new Achievement("1100 oil company", "profit x2!",   "t1owned[9]", 1100, "t1multiplier[9]",  "*2"),
    new Achievement("1200 oil company", "profit x2!",   "t1owned[9]", 1200, "t1multiplier[9]",  "*2"),
    new Achievement("1300 oil company", "profit x2!",   "t1owned[9]", 1300, "t1multiplier[9]",  "*2"),
    new Achievement("1400 oil company", "profit x2!",   "t1owned[9]", 1400, "t1multiplier[9]",  "*2"),
    new Achievement("1500 oil company", "profit x2!",   "t1owned[9]", 1500, "t1multiplier[9]",  "*2"),
    new Achievement("1600 oil company", "profit x2!",   "t1owned[9]", 1600, "t1multiplier[9]",  "*2"),
    new Achievement("1700 oil company", "profit x2!",   "t1owned[9]", 1700, "t1multiplier[9]",  "*2"),
    new Achievement("1800 oil company", "profit x2!",   "t1owned[9]", 1800, "t1multiplier[9]",  "*2"),
    new Achievement("1900 oil company", "profit x2!",   "t1owned[9]", 1900, "t1multiplier[9]",  "*2"),
    new Achievement("2000 oil company", "profit x5!",   "t1owned[9]", 2000, "t1multiplier[9]",  "*5"),
    new Achievement("2250 oil company", "speed x2!",    "t1owned[9]", 2250, "t1time[9]",        "/2"),
    new Achievement("2500 oil company", "speed x2!",    "t1owned[9]", 2500, "t1time[9]",        "/2"),
    new Achievement("2750 oil company", "speed x2!",    "t1owned[9]", 2750, "t1time[9]",        "/2"),
    new Achievement("3000 oil company", "speed x2!",    "t1owned[9]", 3000, "t1time[9]",        "/2"),
    new Achievement("3250 oil company", "speed x2!",    "t1owned[9]", 3250, "t1time[9]",        "/2"),
    new Achievement("3500 oil company", "speed x2!",    "t1owned[9]", 3500, "t1time[9]",        "/2"),
    new Achievement("3750 oil company", "speed x2!",    "t1owned[9]", 3750, "t1time[9]",        "/2"),
    new Achievement("4000 oil company", "speed x2!",    "t1owned[9]", 4000, "t1time[9]",        "/2"),
    new Achievement("4250 oil company", "speed x2!",    "t1owned[9]", 4250, "t1time[9]",        "/2"),
    new Achievement("4500 oil company", "speed x2!",    "t1owned[9]", 4500, "t1time[9]",        "/2"),
    new Achievement("4750 oil company", "speed x2!",    "t1owned[9]", 4750, "t1time[9]",        "/2"),
    new Achievement("5000 oil company", "speed x2!",    "t1owned[9]", 5000, "t1time[9]",        "/2"),
    new Achievement("5250 oil company", "profit x3!",   "t1owned[9]", 5250, "t1multiplier[9]",  "*3"),
    new Achievement("5500 oil company", "profit x3!",   "t1owned[9]", 5500, "t1multiplier[9]",  "*3"),
    new Achievement("5750 oil company", "profit x3!",   "t1owned[9]", 5750, "t1multiplier[9]",  "*3"),
    new Achievement("6000 oil company", "profit x5!",   "t1owned[9]", 6000, "t1multiplier[9]",  "*5"),
    new Achievement("6250 oil company", "profit x3!",   "t1owned[9]", 6250, "t1multiplier[9]",  "*3"),
    new Achievement("6500 oil company", "profit x3!",   "t1owned[9]", 6500, "t1multiplier[9]",  "*3"),
    new Achievement("6750 oil company", "profit x3!",   "t1owned[9]", 6750, "t1multiplier[9]",  "*3"),

    new Achievement("25 of everything", "speed of all x2!", "t1min", 25, "totalTimeMultiplier", "/2"),
    new Achievement("50 of everything", "speed of all x2!", "t1min", 50, "totalTimeMultiplier", "/2"),
    new Achievement("100 of everything", "speed of all x2!", "t1min", 100, "totalTimeMultiplier", "/2"),
    new Achievement("200 of everything", "speed of all x2!", "t1min", 200, "totalTimeMultiplier", "/2"),
    new Achievement("300 of everything", "speed of all x2!", "t1min", 300, "totalTimeMultiplier", "/2"),
    new Achievement("400 of everything", "speed of all x2!", "t1min", 400, "totalTimeMultiplier", "/2"),
    new Achievement("500 of everything", "profit of all x2!", "t1min", 500, "totalMultiplier", "*2"),
    new Achievement("600 of everything", "profit of all x2!", "t1min", 600, "totalMultiplier", "*2"),
    new Achievement("666 of everything", "profit of all x2!", "t1min", 666, "totalMultiplier", "*2"),
    new Achievement("700 of everything", "profit of all x2!", "t1min", 700, "totalMultiplier", "*2"),
    new Achievement("777 of everything", "profit of all x2!", "t1min", 777, "totalMultiplier", "*2"),
    new Achievement("800 of everything", "profit of all x2!", "t1min", 800, "totalMultiplier", "*2"),
    new Achievement("900 of everything", "profit of all x2!", "t1min", 900, "totalMultiplier", "*2"),
    new Achievement("1000 of everything", "profit of all x2!", "t1min", 1000, "totalMultiplier", "*2"),
    new Achievement("1100 of everything", "profit of all x2!", "t1min", 1100, "totalMultiplier", "*2"),
    new Achievement("1111 of everything", "profit of all x2!", "t1min", 1111, "totalMultiplier", "*2"),
    new Achievement("1200 of everything", "profit of all x2!", "t1min", 1200, "totalMultiplier", "*2"),
    new Achievement("1300 of everything", "profit of all x2!", "t1min", 1300, "totalMultiplier", "*2"),
    new Achievement("1400 of everything", "profit of all x2!", "t1min", 1400, "totalMultiplier", "*2"),
    new Achievement("1500 of everything", "profit of all x2!", "t1min", 1500, "totalMultiplier", "*2"),
    new Achievement("1600 of everything", "profit of all x2!", "t1min", 1600, "totalMultiplier", "*2"),
    new Achievement("1700 of everything", "profit of all x2!", "t1min", 1700, "totalMultiplier", "*2"),
    new Achievement("1800 of everything", "profit of all x2!", "t1min", 1800, "totalMultiplier", "*2"),
    new Achievement("1900 of everything", "profit of all x2!", "t1min", 1900, "totalMultiplier", "*2"),
    new Achievement("2000 of everything", "profit of all x2!", "t1min", 2000, "totalMultiplier", "*2"),
    new Achievement("2100 of everything", "profit of all x2!", "t1min", 2100, "totalMultiplier", "*2"),
    new Achievement("2200 of everything", "profit of all x2!", "t1min", 2200, "totalMultiplier", "*2"),
    new Achievement("2222 of everything", "profit of all x2!", "t1min", 2222, "totalMultiplier", "*2"),
    new Achievement("2300 of everything", "profit of all x2!", "t1min", 2300, "totalMultiplier", "*2"),
    new Achievement("2400 of everything", "profit of all x2!", "t1min", 2400, "totalMultiplier", "*2"),
    new Achievement("2500 of everything", "profit of all x2!", "t1min", 2500, "totalMultiplier", "*2"),
    new Achievement("2600 of everything", "profit of all x2!", "t1min", 2600, "totalMultiplier", "*2"),
    new Achievement("2700 of everything", "profit of all x2!", "t1min", 2700, "totalMultiplier", "*2"),
    new Achievement("2800 of everything", "profit of all x2!", "t1min", 2800, "totalMultiplier", "*2"),
    new Achievement("2900 of everything", "profit of all x2!", "t1min", 2900, "totalMultiplier", "*2"),
    new Achievement("3000 of everything", "profit of all x2!", "t1min", 3000, "totalMultiplier", "*2"),
    new Achievement("3100 of everything", "profit of all x2!", "t1min", 3100, "totalMultiplier", "*2"),
    new Achievement("3200 of everything", "profit of all x2!", "t1min", 3200, "totalMultiplier", "*2"),
    new Achievement("3300 of everything", "profit of all x2!", "t1min", 3300, "totalMultiplier", "*2"),
    new Achievement("3333 of everything", "profit of all x2!", "t1min", 3333, "totalMultiplier", "*2"),
    new Achievement("3400 of everything", "profit of all x2!", "t1min", 3400, "totalMultiplier", "*2"),
    new Achievement("3500 of everything", "profit of all x2!", "t1min", 3500, "totalMultiplier", "*2"),
    new Achievement("3600 of everything", "profit of all x2!", "t1min", 3600, "totalMultiplier", "*2"),
    new Achievement("3700 of everything", "profit of all x2!", "t1min", 3700, "totalMultiplier", "*2"),
    new Achievement("3800 of everything", "profit of all x2!", "t1min", 3800, "totalMultiplier", "*2"),
    new Achievement("3900 of everything", "profit of all x2!", "t1min", 3900, "totalMultiplier", "*2"),
    new Achievement("4000 of everything", "profit of all x2!", "t1min", 4000, "totalMultiplier", "*2"),
];

var allVars = ["money","totalMoney","tokens","tokensOn","tokensRate","totalMultiplier","magicTotalMultiplier","achievementsOwned","magicupOwned","upgradesOwned","managersOwned","t1owned","t1progress","t1time","t1multiplier","before"];

// Saving system + resets
function setItem(key, value) { localStorage.setItem(key, JSON.stringify(value)); };
function getItem(key) { return JSON.parse(localStorage.getItem(key)); };
function removeItem(key) { localStorage.removeItem(key); };
function saveData() { for (var i = 0; i < allVars.length; i++) { setItem(allVars[i], window[allVars[i]]); }; };
function loadData() {
    for (var i = 0; i < allVars.length; i++) {
        if (getItem(allVars[i]) != null && getItem(allVars[i]) != undefined) { window[allVars[i]] = getItem(allVars[i]); };
    };
    updateStats(); updateBuilds();
};
function resetData() {
    var r = confirm("Are you sure to hard-reset? You will not earn tokens, and will start everything from the beginning!");
    if (r == true) {
        var r2 = confirm("Are you really sure?");
        if (r2 == true) {
            for (var i = 0; i < allVars.length; i++) { removeItem(allVars[i]); }; location.reload();
        };
    };
};
function softReset() {
    var r = confirm("Do you want to soft reset, restart everything from the beginning and goes from " + fix(tokens, 0) + " tokens to " + fix(getTokensOn(), 0) + " tokens?")
    if (r == true) {
        var temp1 = totalMoney; var temp2 = getTokensOn();
        initVars(); totalMoney = temp1; tokens = temp2; saveData();
        location.reload();
    };
};

// Essentials functions
function initVars() {
    money = 0; totalMoney = money;
    tokens = 0; tokensOn = 0; tokensRate = 1;
    totalMultiplier = 1; magicTotalMultiplier = 1; totalTimeMultiplier = 1;
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

    achievementsOwned = []; achievementsOwnStats = [];
    for (var i = 0; i < achievements.length; i++) { achievementsOwned.push(false); };

    t1min = t1owned[0];
    for (var i = 0; i < t1owned.length; i++) { t1min = Math.min(t1min, t1owned[i]); };
};
function initGame() {
    $("#s-money, #h-money").html("Money : " + fix(money, 2) + "$");
    $("#s-totalMoney").html("Total money : " + fix(totalMoney, 2) + "$");
    $("#s-totalMultiplier").html("Total multiplier : x" + totalMultiplier);
    $("#s-tokens").html("Tokens : " + fix(tokens, 0));
    $("#s-tokensOn").html("Tokens on reset : " + fix(getTokensOn(), 0));
    $("#s-tokensRate").html("Tokens Rate : " + fix(tokensRate, 1) + "%");
    $("#s-totAch").html("(" + achievementsOwnStats.length + "/" + achievements.length + ")");

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

    updateBuilds();
};

// Helpers
function getInc(source) { return t1[source].reward * t1multiplier[source] * totalMultiplier * magicTotalMultiplier * (1 + tokens * tokensRate / 100); };
function getMoney(amount) { money += amount; totalMoney += amount; };
function getPrice(index) { var t = t1[index]; return t.price * Math.pow(t.inflation, t1owned[index]); };
function getTokensOn() { return Math.floor(10 * Math.sqrt(totalMoney/1e13)); };
function getTime(index) { return t1[index].time * t1time[index] * totalTimeMultiplier; };
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
        t1progress[index] = 0.01; t1[index].trigger = true;
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
        updateBuilds();
        updateStats();
    };
};
function updateBuilds() {
    for (var i = 0; i < t1.length; i++) {
        var t = t1[i];
        $("#t1-n" + (i+1)).html(t.name + " :");
        $("#t1-r" + (i+1)).html(" " + fix(getInc(i) * t1owned[i], 2) + "$ <br>");
        $("#t1-o" + (i+1)).html("(" + t1owned[i] + " owned)");
        $("#t1-b" + (i+1) + "tm").html("Total multiplier : x" + fix(t1multiplier[i], 0));

        $("#t1-b" + (i+1) + "c1").html("x1 : " + fix(getPrice(i), 2) + "$ <br>");
        $("#t1-b" + (i+1) + "c2").html("x10 : " + fix(displayPrice(i, 10), 2) + "$ <br>");
        $("#t1-b" + (i+1) + "c3").html("x50 : " + fix(displayPrice(i, 50), 2) + "$ <br>");
        $("#t1-b" + (i+1) + "c4").html("x100 : " + fix(displayPrice(i, 100), 2) + "$");
        $("#t1-b" + (i+1) + "cps").html("<br>" + fix(((getInc(i) * t1owned[i]) / getTime(i)), 2) + "$/second");
    };

    t1min = t1owned[0];
    for (var i = 0; i < t1owned.length; i++) { t1min = Math.min(t1min, t1owned[i]); };
};
function updateStats() {
    $("#s-money, #h-money").html("Money : " + fix(money, 2) + "$");
    $("#s-totalMoney").html("Total money : " + fix(totalMoney, 2) + "$");
    $("#s-totalMultiplier").html("Total multiplier : x" + totalMultiplier * magicTotalMultiplier);
    $("#s-tokens").html("Tokens : " + fix(tokens, 0));
    $("#s-tokensOn").html("Tokens on reset : " + fix(getTokensOn(), 0));
    $("#s-tokensRate").html("Tokens Rate : " + fix(tokensRate, 1) + "%");
    $("#s-totAch").html("(" + achievementsOwnStats.length + "/" + achievements.length + ")");
};
function recoverLost() {
    if (gameInit == true) {
        now = new Date().getTime(); var elapsedTime = now - before;
        if (elapsedTime > interval) { updateGame(Math.floor(elapsedTime/interval)); }
        else { updateGame(1); };
        before = new Date().getTime();
    };
};
function offlineGain() {
    console.log("Cash before offline gain : " + fix(money, 2) + "$");
    var now = new Date().getTime(); var offTime = now - before;
    updateGame(Math.floor(offTime/interval));
    console.log("Offline time without saving : " + offTime + "ms or " + fix(offTime/1000, 2) + "s");
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
    updateBuilds(); updateStats();
};
function buyBuildingOnce(index) {
    if (money < getPrice(index)) { return; }
    else { money -= getPrice(index); t1owned[index]++; };
};

function MagicUp(name, price, run) {
    this.name = name;
    this.price = price;
    this.run = run;
};
function buyMagicUp(index) {
    if (tokens >= magicupgrades[index].price) {
        tokens -= magicupgrades[index].price;
        magicupOwned[index] = true;
        magicupgrades[index].run(); updateStats(); updateBuilds();
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
        money -= upgrades[index].price;
        upgradesOwned[index] = true;
        upgrades[index].run(); updateStats(); updateBuilds();
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
            achievementsOwnStats[i] = true;
            updateStats();
            for (var i = 0; i < achievements.length; i++) {
                var a = achievements[i];
                if (achievementsOwned[i]) {
                    $("#a-t" + (i+1)).html(" - " + a.text + " (owned)");
                };
            };
        };
};

// Onload + loops
window.onload = function() {
    initVars(); loadData(); initGame(); offlineGain();
    gameInit = true;
};
window.setInterval(function() {
    if (gameInit == true) { recoverLost(); };
}, interval);
window.setInterval(function() {
    saveData();
}, 30000);