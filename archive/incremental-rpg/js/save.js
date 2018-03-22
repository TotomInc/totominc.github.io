// new saving system (pretty shitty but working)
function manualSave() {
    var toSave = {
        player: player,
        mbo: miningBuildsOwned,
        helmetsOwned: helmetsOwned,
        armoursOwned: armoursOwned,
        glovesOwned: glovesOwned,
        bootsOwned: bootsOwned,
        amuletsOwned: amuletsOwned,
        swordOwned: swordOwned
    };
    var saved = JSON.stringify(toSave);
    var exportSave = btoa(saved);
    prompt("Here is your encoded save, keep-it safe!", exportSave);
};
function manualLoad() {
    var importSave = prompt("You need to import the code from the save button.", "Put your exported-save here!");
    var cleanSave = atob(importSave); var savegame = JSON.parse(cleanSave);
    var s = savegame; var sp = savegame.player; var sps = savegame.player.stats; var spi = savegame.player.item;

    ps.hp = sps.hp;
    ps.maxHp = sps.maxHp;
    ps.hpPerSec = sps.hpPerSec;
    ps.xp = sps.xp;
    ps.xpNeeded = sps.xpNeeded;
    ps.level = sps.level;
    ps.gold = sps.gold;
    ps.diamond = sps.diamond;

    p.helmet.armor = sp.helmet.armor;
    p.helmet.itemName = sp.helmet.itemName;
    p.helmet.img = sp.helmet.img;

    p.armour.armor = sp.armour.armor;
    p.armour.itemName = sp.armour.itemName;
    p.armour.img = sp.armour.img;

    p.gloves.armor = sp.gloves.armor;
    p.gloves.itemName = sp.gloves.itemName;
    p.gloves.img = sp.gloves.img;

    p.boots.armor = sp.boots.armor;
    p.boots.itemName = sp.boots.itemName;
    p.boots.img = sp.boots.img;

    p.amulet.armor = sp.amulet.armor;
    p.amulet.itemName = sp.amulet.itemName;
    p.amulet.img = sp.amulet.img;

    p.sword.damage = sp.sword.damage;
    p.sword.itemName = sp.sword.itemName;
    p.sword.img = sp.sword.img;

    ps.totalArmor = sps.totalArmor;

    pi.coal = spi.coal;
    pi.crystal = spi.crystal;
    pi.jade = spi.jade;
    pi.ruby = spi.ruby;
    pi.saphire = spi.saphire;

    miningBuildsOwned = s.miningBuildsOwned;
    helmetsOwned = s.helmetsOwned;
    armoursOwned = s.armoursOwned;
    glovesOwned = s.glovesOwned;
    bootsOwned = s.bootsOwned;
    amuletsOwned = s.amuletsOwned;
    swordOwned = s.swordOwned;

    Mining.check();
    Shop.check();

    Log("Game loaded!");
};
function saveData() {
    if (init == true) {
        var toSave = {
            player: player,
            mbo: miningBuildsOwned,
            helmetsOwned: helmetsOwned,
            armoursOwned: armoursOwned,
            glovesOwned: glovesOwned,
            bootsOwned: bootsOwned,
            amuletsOwned: amuletsOwned,
            swordOwned: swordOwned
        };
        localStorage.setItem("IncRPG_Save", JSON.stringify(toSave));
        Log("Game saved!");
    };
};
function loadData() {
    if (init == true) {
        if (localStorage.getItem("IncRPG_Save") === null) {
            Log("No save found!");
        } else {
            var savegame = JSON.parse(localStorage.getItem("IncRPG_Save"));
            var s = savegame; var sp = savegame.player; var sps = savegame.player.stats; var spi = savegame.player.item;

            ps.hp = sps.hp;
            ps.maxHp = sps.maxHp;
            ps.hpPerSec = sps.hpPerSec;
            ps.xp = sps.xp;
            ps.xpNeeded = sps.xpNeeded;
            ps.level = sps.level;
            ps.gold = sps.gold;
            ps.diamond = sps.diamond;

            p.helmet.armor = sp.helmet.armor;
            p.helmet.itemName = sp.helmet.itemName;
            p.helmet.img = sp.helmet.img;

            p.armour.armor = sp.armour.armor;
            p.armour.itemName = sp.armour.itemName;
            p.armour.img = sp.armour.img;

            p.gloves.armor = sp.gloves.armor;
            p.gloves.itemName = sp.gloves.itemName;
            p.gloves.img = sp.gloves.img;

            p.boots.armor = sp.boots.armor;
            p.boots.itemName = sp.boots.itemName;
            p.boots.img = sp.boots.img;

            p.amulet.armor = sp.amulet.armor;
            p.amulet.itemName = sp.amulet.itemName;
            p.amulet.img = sp.amulet.img;

            p.sword.damage = sp.sword.damage;
            p.sword.itemName = sp.sword.itemName;
            p.sword.img = sp.sword.img;

            ps.totalArmor = sps.totalArmor;

            pi.coal = spi.coal;
            pi.crystal = spi.crystal;
            pi.jade = spi.jade;
            pi.ruby = spi.ruby;
            pi.saphire = spi.saphire;

            miningBuildsOwned = s.mbo;
            helmetsOwned = s.helmetsOwned;
            armoursOwned = s.armoursOwned;
            glovesOwned = s.glovesOwned;
            bootsOwned = s.bootsOwned;
            amuletsOwned = s.amuletsOwned;
            swordOwned = s.swordOwned;

            Log("Game loaded!");
        };
    };
};
function resetData() {
    if (confirm("Do you really want to wipe your save and reset everything from scratch? You will not gain any bonuses.")) {
        clearInterval(saveInterval);
        localStorage.removeItem("IncRPG_Save");
        location.reload();
    };
};