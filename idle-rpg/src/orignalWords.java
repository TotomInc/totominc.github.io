// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: braces fieldsfirst space lnc 

package com.topcog.idlequest.play;

import com.badlogic.gdx.math.MathUtils;
import com.badlogic.gdx.utils.Array;
import com.topcog.idlequest.A;
import com.topcog.idlequest.G;
import com.topcog.idlequest.play.questphases.Balance;

// Referenced classes of package com.topcog.idlequest.play:
//            Item

public class Words
{

    public static final Words INSTANCE = new Words();
    public static Array amuletPrefix;
    public static Array amuletRoot;
    public static int baseRange = 10;
    public static Array bootPrefix;
    public static Array bootRoot;
    public static Array exclamation;
    public static Array field;
    public static Array fighting;
    public static Array getting;
    public static Array monsterPrefix;
    public static Array monsterRoot;
    public static int n;
    public static int offset;
    private static float pdfRate;
    public static String prefix;
    public static int prefixN;
    public static int range;
    public static float rating;
    public static int rootN;
    public static Array swordPrefix;
    public static Array swordRoot;
    public static Array townsfolkPrefix;
    public static Array townsfolkRoot;
    public static Array traveling;
    public static Array turningIn;

    public Words()
    {
        getting = new Array(true, 64);
        traveling = new Array(true, 64);
        fighting = new Array(true, 64);
        turningIn = new Array(true, 64);
        field = new Array(true, 64);
        swordRoot = new Array(true, 64);
        swordPrefix = new Array(true, 64);
        bootRoot = new Array(true, 64);
        bootPrefix = new Array(true, 64);
        amuletRoot = new Array(true, 64);
        amuletPrefix = new Array(true, 64);
        monsterRoot = new Array(true, 64);
        monsterPrefix = new Array(true, 64);
        townsfolkRoot = new Array(true, 64);
        townsfolkPrefix = new Array(true, 64);
        exclamation = new Array(true, 64);
        exclamation.add("Huzzah!");
        exclamation.add("Hooray!");
        exclamation.add("Hoorah!");
        exclamation.add("Hooah!");
        exclamation.add("Hip Hip Huzzah!");
        exclamation.add("Hip Hip Hooray!");
        exclamation.add("Hip Hip Hoorah!");
        exclamation.add("Hip Hip Hooah!");
        exclamation.add("Yahoo!");
        exclamation.add("Wahoo!");
        exclamation.add("Woop-dee-do!");
        exclamation.add("Yahoo Kazoo!");
        exclamation.add("Wahoo Kazoo!");
        exclamation.add("Shazam!");
        exclamation.add("Kabam!");
        exclamation.add("Woop-dee-do-dee-do!");
        townsfolkRoot.add("townsfolk");
        townsfolkRoot.add("townspeople");
        townsfolkRoot.add("villagers");
        townsfolkRoot.add("sou-chefs");
        townsfolkRoot.add("philosophers");
        townsfolkRoot.add("mathematicians");
        townsfolkRoot.add("pro-gamers");
        townsfolkRoot.add("princesses");
        townsfolkRoot.add("kings");
        townsfolkRoot.add("prophets");
        townsfolkRoot.add("grad students");
        townsfolkRoot.add("kings");
        townsfolkRoot.add("jugglers");
        townsfolkRoot.add("dog walkers");
        townsfolkRoot.add("professors");
        townsfolkRoot.add("insomniacs");
        townsfolkRoot.add("engineers");
        townsfolkRoot.add("pilots");
        townsfolkRoot.add("wizards");
        townsfolkRoot.add("dudes");
        townsfolkRoot.add("hobos");
        townsfolkRoot.add("app developers");
        townsfolkRoot.add("mechanics");
        townsfolkRoot.add("bounty hunters");
        townsfolkRoot.add("doctors");
        townsfolkRoot.add("bag boys");
        townsfolkRoot.add("sidekicks");
        townsfolkRoot.add("plumbers");
        townsfolkRoot.add("skyriders");
        townsfolkRoot.add("highlanders");
        townsfolkRoot.add("chimney sweeps");
        townsfolkRoot.add("squirrels");
        townsfolkRoot.add("valley girls");
        townsfolkRoot.add("detectives");
        townsfolkRoot.add("astronauts");
        townsfolkRoot.add("authors");
        townsfolkRoot.add("scuba divers");
        townsfolkRoot.add("painters");
        townsfolkRoot.add("kids");
        townsfolkRoot.add("athletes");
        townsfolkRoot.add("...somethings");
        townsfolkRoot.add("physicists");
        townsfolkRoot.add("male models");
        townsfolkRoot.add("friends");
        townsfolkRoot.add("heroes-in-training");
        townsfolkRoot.add("robots");
        townsfolkRoot.add("clockworkers");
        townsfolkPrefix.add("elf");
        townsfolkPrefix.add("sleepwalking");
        townsfolkPrefix.add("cheery");
        townsfolkPrefix.add("rosey");
        townsfolkPrefix.add("cool");
        townsfolkPrefix.add("big-haired");
        townsfolkPrefix.add("dwarf");
        townsfolkPrefix.add("rad");
        townsfolkPrefix.add("smarty-pants");
        townsfolkPrefix.add("stargazing");
        townsfolkPrefix.add("confused");
        townsfolkPrefix.add("some random");
        townsfolkPrefix.add("fierce but oddly quiet");
        townsfolkPrefix.add("dust covered");
        townsfolkPrefix.add("amused");
        townsfolkPrefix.add("fairy");
        townsfolkPrefix.add("firefighting");
        townsfolkPrefix.add("lazy");
        townsfolkPrefix.add("most excellent");
        townsfolkPrefix.add("royal");
        townsfolkPrefix.add("crazy old");
        townsfolkPrefix.add("gorgeous");
        townsfolkPrefix.add("gnome");
        townsfolkPrefix.add("volunteer");
        townsfolkPrefix.add("silly");
        townsfolkPrefix.add("scruffy-lookin'");
        townsfolkPrefix.add("mystical");
        townsfolkPrefix.add("cross eyed");
        townsfolkPrefix.add("hobby");
        townsfolkPrefix.add("grinning");
        townsfolkPrefix.add("clearly upset");
        townsfolkPrefix.add("4th-wall breaking [hi!]");
        townsfolkPrefix.add("prototypical");
        townsfolkPrefix.add("lovable");
        townsfolkPrefix.add("stoic");
        townsfolkPrefix.add(", like,");
        townsfolkPrefix.add("angelic");
        townsfolkPrefix.add("coy");
        townsfolkPrefix.add("reptilian");
        townsfolkPrefix.add("hobo");
        townsfolkPrefix.add("part-time");
        townsfolkPrefix.add("imaginary");
        townsfolkPrefix.add("really weird");
        townsfolkPrefix.add("friendly");
        townsfolkPrefix.add("web slinging");
        townsfolkPrefix.add("super");
        townsfolkPrefix.add("cheesy");
        townsfolkPrefix.add("bacon loving");
        monsterRoot.add("monsters");
        monsterRoot.add("rats");
        monsterRoot.add("crooks");
        monsterRoot.add("spammers");
        monsterRoot.add("brutes");
        monsterRoot.add("orcs");
        monsterRoot.add("vampires");
        monsterRoot.add("salesmen");
        monsterRoot.add("wizards");
        monsterRoot.add("cronies");
        monsterRoot.add("skeletons");
        monsterRoot.add("viruses");
        monsterRoot.add("fiends");
        monsterRoot.add("werewolves");
        monsterRoot.add("knights");
        monsterRoot.add("bosses");
        monsterRoot.add("sharks");
        monsterRoot.add("MMORPGs");
        monsterRoot.add("necromancers");
        monsterRoot.add("aliens");
        monsterRoot.add("tR0L1S");
        monsterRoot.add("B-movies");
        monsterRoot.add("ghosts");
        monsterRoot.add("telemarketers");
        monsterRoot.add("ghouls");
        monsterRoot.add("forum moderators");
        monsterRoot.add("centaurs");
        monsterRoot.add("minotaurs");
        monsterRoot.add("refrigerators");
        monsterRoot.add("cyclopes");
        monsterRoot.add("CEOs");
        monsterRoot.add("serpents");
        monsterRoot.add("shopping carts");
        monsterRoot.add("villains");
        monsterRoot.add("phone chargers");
        monsterRoot.add("baddies");
        monsterRoot.add("zombies");
        monsterRoot.add("shapeshifters");
        monsterRoot.add("botnets");
        monsterRoot.add("ponies");
        monsterRoot.add("mobile apps");
        monsterRoot.add("gremlins");
        monsterRoot.add("stock brokers");
        monsterRoot.add("chimeras");
        monsterRoot.add("mummies");
        monsterRoot.add("lawnmowers");
        monsterRoot.add("demons");
        monsterRoot.add("cyborgs");
        monsterRoot.add("ogres");
        monsterRoot.add("fanboys");
        monsterRoot.add("clowns");
        monsterRoot.add("leviathans");
        monsterRoot.add("dragons");
        monsterRoot.add("jabberwockies");
        monsterPrefix.add("bad");
        monsterPrefix.add("crooked");
        monsterPrefix.add("monstrous");
        monsterPrefix.add("dreadful");
        monsterPrefix.add("cruel");
        monsterPrefix.add("diabolical");
        monsterPrefix.add("loathsome");
        monsterPrefix.add("hipster");
        monsterPrefix.add("rabid");
        monsterPrefix.add("2-bit");
        monsterPrefix.add("aberrant");
        monsterPrefix.add("raving");
        monsterPrefix.add("ranting");
        monsterPrefix.add("ravenous");
        monsterPrefix.add("rioting");
        monsterPrefix.add("grotesque");
        monsterPrefix.add("illogical");
        monsterPrefix.add("mutant");
        monsterPrefix.add("poisonous");
        monsterPrefix.add("mammoth");
        monsterPrefix.add("insulting");
        monsterPrefix.add("crazed");
        monsterPrefix.add("cheating");
        monsterPrefix.add("ugly");
        monsterPrefix.add("good-guy-turned-bad-guy");
        monsterPrefix.add("foul");
        monsterPrefix.add("stereotypical");
        monsterPrefix.add("double parking");
        monsterPrefix.add("half");
        monsterPrefix.add("two-faced");
        monsterPrefix.add("egregious");
        monsterPrefix.add("gruesome");
        monsterPrefix.add("pirating");
        monsterPrefix.add("croaking");
        monsterPrefix.add("morose");
        monsterPrefix.add("three-faced");
        monsterPrefix.add("gossipping");
        monsterPrefix.add("vicious");
        monsterPrefix.add("souless");
        monsterPrefix.add("odious");
        monsterPrefix.add("raging");
        monsterPrefix.add("fashionless");
        monsterPrefix.add("cheap");
        monsterPrefix.add("rude");
        monsterPrefix.add("macabre");
        monsterPrefix.add("music-hating");
        monsterPrefix.add("ominous");
        monsterPrefix.add("infamous");
        monsterPrefix.add("abominable");
        monsterPrefix.add("heinous");
        monsterPrefix.add("devouring");
        monsterPrefix.add("gutless");
        monsterPrefix.add("corrupted");
        amuletPrefix.add("Shiny");
        amuletPrefix.add("Magic");
        amuletPrefix.add("Enchanted");
        amuletPrefix.add("Special");
        amuletPrefix.add("Ancient");
        amuletPrefix.add("Newfangled");
        amuletPrefix.add("Electronic");
        amuletPrefix.add("Hand-Crafted");
        amuletPrefix.add("Old");
        amuletPrefix.add("Fragrant");
        amuletPrefix.add("Diamond");
        amuletPrefix.add("Decorative");
        amuletPrefix.add("Industrial");
        amuletPrefix.add("Fragile");
        amuletPrefix.add("Stellar");
        amuletPrefix.add("Radiant");
        amuletPrefix.add("Healing");
        amuletPrefix.add("Soggy");
        amuletPrefix.add("Confusing");
        amuletPrefix.add("Puzzle");
        amuletPrefix.add("Inscribed");
        amuletPrefix.add("Prismatic");
        amuletPrefix.add("Discount");
        amuletPrefix.add("Squeaky");
        amuletPrefix.add("8-Bit");
        amuletPrefix.add("Backwards");
        amuletPrefix.add("Joy-Filled");
        amuletPrefix.add("Malleable");
        amuletPrefix.add("Coffee");
        amuletPrefix.add("3 Ring");
        amuletPrefix.add("Silly");
        amuletPrefix.add("Mummified");
        amuletPrefix.add("Turbulent");
        amuletPrefix.add("Turbo");
        amuletPrefix.add("Edible");
        amuletPrefix.add("Smiling");
        amuletPrefix.add("Touchscreen");
        amuletPrefix.add("Next-Gen");
        amuletPrefix.add("Rainbow");
        amuletPrefix.add("Troubling");
        amuletPrefix.add("3D");
        amuletPrefix.add("Mesmerizing");
        amuletPrefix.add("Gnarly");
        amuletPrefix.add("Rarified");
        amuletPrefix.add("Bangerang");
        amuletPrefix.add("Name Brand");
        amuletPrefix.add("Ultimate");
        amuletPrefix.add("Nonsense");
        amuletPrefix.add("Technicolor");
        amuletPrefix.add("Bodacious");
        amuletPrefix.add("Fantasmastic");
        amuletPrefix.add("Trippy");
        amuletPrefix.add("Lady");
        amuletRoot.add("Amulet");
        amuletRoot.add("Pendant");
        amuletRoot.add("Ornament");
        amuletRoot.add("Flower");
        amuletRoot.add("Hourglass");
        amuletRoot.add("Toothpick");
        amuletRoot.add("Comb");
        amuletRoot.add("Watch");
        amuletRoot.add("Pinecone");
        amuletRoot.add("Mug");
        amuletRoot.add("Mint Pack");
        amuletRoot.add("Symbol");
        amuletRoot.add("Leaf");
        amuletRoot.add("Orb");
        amuletRoot.add("Wallet");
        amuletRoot.add("Mousetrap");
        amuletRoot.add("Relic");
        amuletRoot.add("Necklace");
        amuletRoot.add("Hairpin");
        amuletRoot.add("Pouch");
        amuletRoot.add("Spyglass");
        amuletRoot.add("MP3 Player");
        amuletRoot.add("Lightbulb");
        amuletRoot.add("Charm");
        amuletRoot.add("Pearls");
        amuletRoot.add("Tablet");
        amuletRoot.add("Arrowhead");
        amuletRoot.add("Lampshade");
        amuletRoot.add("Talisman");
        amuletRoot.add("Scarab");
        amuletRoot.add("Gemstone");
        amuletRoot.add("USB Stick");
        amuletRoot.add("Straw");
        amuletRoot.add("Brooch");
        amuletRoot.add("Flag");
        amuletRoot.add("Trinket");
        amuletRoot.add("Headphones");
        amuletRoot.add("Shoelace");
        amuletRoot.add("Pebble");
        amuletRoot.add("Locket");
        amuletRoot.add("Brain Bender");
        amuletRoot.add("Rabbit's Foot");
        amuletRoot.add("Paperclip");
        amuletRoot.add("Thing");
        amuletRoot.add("Pacemaker");
        amuletRoot.add("Madstone");
        amuletRoot.add("Tome");
        amuletRoot.add("Snowglobe");
        amuletRoot.add("Geode");
        amuletRoot.add("Sunstone");
        amuletRoot.add("Beetle");
        bootPrefix.add("Worn");
        bootPrefix.add("Rugged");
        bootPrefix.add("Mundane");
        bootPrefix.add("Steel Toed");
        bootPrefix.add("Spiked");
        bootPrefix.add("Glass");
        bootPrefix.add("Fuzzy");
        bootPrefix.add("Oversized");
        bootPrefix.add("Leather");
        bootPrefix.add("Miniature");
        bootPrefix.add("Light Up");
        bootPrefix.add("Organic");
        bootPrefix.add("Waterproof");
        bootPrefix.add("Slick");
        bootPrefix.add("Worn");
        bootPrefix.add("Blueberry");
        bootPrefix.add("Alligator Skin");
        bootPrefix.add("Wooden");
        bootPrefix.add("Plastic");
        bootPrefix.add("Rubber");
        bootPrefix.add("Platinum");
        bootPrefix.add("Desert");
        bootPrefix.add("Sport");
        bootPrefix.add("Industrial");
        bootPrefix.add("Magical");
        bootPrefix.add("Velvet");
        bootPrefix.add("Invisible");
        bootPrefix.add("Neato");
        bootPrefix.add("Indestructible");
        bootPrefix.add("Stylish");
        bootPrefix.add("Mismatched");
        bootPrefix.add("Monk-Strap");
        bootPrefix.add("Slip-on");
        bootPrefix.add("Space");
        bootPrefix.add("Ballet");
        bootPrefix.add("Coarse");
        bootPrefix.add("Divine");
        bootPrefix.add("Bovine");
        bootPrefix.add("Cute");
        bootPrefix.add("Paper");
        bootPrefix.add("Military");
        bootPrefix.add("Clown");
        bootPrefix.add("Game Dev");
        bootPrefix.add("Ruby");
        bootPrefix.add("Running");
        bootPrefix.add("Driving");
        bootPrefix.add("Tap");
        bootPrefix.add("Dance");
        bootRoot.add("Boots");
        bootRoot.add("Footwear");
        bootRoot.add("Shoes");
        bootRoot.add("Sandals");
        bootRoot.add("Cleats");
        bootRoot.add("Flippers");
        bootRoot.add("Slippers");
        bootRoot.add("Moccasins");
        bootRoot.add("Footmuffs");
        bootRoot.add("Socks");
        bootRoot.add("Footies");
        bootRoot.add("Sneakers");
        bootRoot.add("Cereal Boxes");
        bootRoot.add("Loafers");
        bootRoot.add("Boat Shoes");
        bootRoot.add("Pumps");
        bootRoot.add("Footgear");
        bootRoot.add("Flip-Flops");
        bootRoot.add("Hightops");
        bootRoot.add("High Heels");
        bootRoot.add("Crocs");
        bootRoot.add("Snowshoes");
        bootRoot.add("Dress Shoes");
        bootRoot.add("Egg Cartons");
        bootRoot.add("Clogs");
        bootRoot.add("Horseshoes");
        bootRoot.add("Tennis Shoes");
        bootRoot.add("Jam Jars");
        bootRoot.add("Waders");
        bootRoot.add("Galoshes");
        bootRoot.add("Skis");
        bootRoot.add("Platform Shoes");
        bootRoot.add("Rollerblades");
        bootRoot.add("Roller Skates");
        bootRoot.add("Ice Skaters");
        bootRoot.add("Skateboard");
        bootRoot.add("Clodhoppers");
        bootRoot.add("Stilts");
        bootRoot.add("Running Shoes");
        bootRoot.add("Booties");
        bootRoot.add("Toe Shoes");
        bootRoot.add("Pogo Stick");
        bootRoot.add("Cyborg Legs");
        bootRoot.add("Footwraps");
        bootRoot.add("Getas");
        bootRoot.add("Spring Stilts");
        turningIn.add("Turning in");
        turningIn.add("Submitting");
        turningIn.add("Unloading");
        turningIn.add("Finishing");
        turningIn.add("Unpacking");
        turningIn.add("Getting some l00t for all them");
        turningIn.add("Off-loading");
        turningIn.add("Transferring");
        turningIn.add("Dumping");
        turningIn.add("Dismissing");
        turningIn.add("Wrapping up");
        turningIn.add("Humming 'Another one bites the dust' as you turn in");
        turningIn.add("Purging");
        turningIn.add("Culminating");
        turningIn.add("Finalizing");
        turningIn.add("Disburdening");
        turningIn.add("Handing off");
        turningIn.add("Another way to say turning in");
        turningIn.add("Depositing");
        turningIn.add("Casting off");
        turningIn.add("Winding down");
        turningIn.add("Concluding");
        turningIn.add("Settling");
        turningIn.add("Mopping up");
        turningIn.add("Staring into space while turning in");
        turningIn.add("Erasing");
        turningIn.add("Relinquishing");
        turningIn.add("Retiring");
        turningIn.add("Presenting");
        turningIn.add("Yielding up");
        turningIn.add("Offering");
        turningIn.add("Writing TPS reports about");
        turningIn.add("Ceding");
        turningIn.add("Offering");
        turningIn.add("Committing");
        turningIn.add("Cooking dinner while turning in");
        turningIn.add("Tendering");
        turningIn.add("Finally being done with");
        turningIn.add("Handing in");
        turningIn.add("Giving back");
        turningIn.add("Sending back");
        turningIn.add("Returning");
        turningIn.add("Getting rid of");
        turningIn.add("Bleeding out while turning in");
        turningIn.add("Rejoicing ecstatically while turning in");
        getting.add("Getting");
        getting.add("Retrieving");
        getting.add("Asking for");
        getting.add("Soliciting");
        getting.add("Demanding");
        getting.add("Perusing your stats as you get");
        getting.add("Squeezing");
        getting.add("Compiling");
        getting.add("Recording");
        getting.add("Wondering if you will get more");
        getting.add("Hoarding");
        getting.add("Acquiring");
        getting.add("Stealing");
        getting.add("Choosing");
        getting.add("Picking up");
        getting.add("Pulling your hair out as you get");
        getting.add("Hustling");
        getting.add("Begging for");
        getting.add("Negotiating");
        getting.add("Beseeching");
        getting.add("Wooing");
        getting.add("Appropriating");
        getting.add("Assimilating");
        getting.add("Not believing what you are doing to get crazy");
        getting.add("Clutching");
        getting.add("Confiscating");
        getting.add("Pursuing");
        getting.add("Collecting");
        getting.add("Pocketing");
        getting.add("Considering the novelty of apps while getting");
        getting.add("Seeking for");
        getting.add("Obtaining");
        getting.add("Listening to an inane amount of dialogue to get");
        getting.add("Attaining");
        getting.add("Gleaning");
        getting.add("Imagining");
        getting.add("Securing");
        getting.add("Amassing");
        getting.add("Receiving");
        getting.add("Skipping breakfast to get");
        getting.add("Salvaging");
        getting.add("Snagging");
        getting.add("Garnering");
        getting.add("Fetching");
        getting.add("Commandeering");
        getting.add("Staying up all night to get");
        getting.add("Using telpathy to get");
        getting.add("Just making up your own");
        getting.add("Going insane getting");
        fighting.add("Fighting");
        fighting.add("Combating");
        fighting.add("Defeating");
        fighting.add("Wrestling");
        fighting.add("Toying with");
        fighting.add("Slaying");
        fighting.add("Exterminating");
        fighting.add("Vaporizing");
        fighting.add("Crushing");
        fighting.add("Putting down");
        fighting.add("Being awesome while fighting");
        fighting.add("Decimating");
        fighting.add("Taunting");
        fighting.add("Snuffing out");
        fighting.add("Cream-cheesing");
        fighting.add("Executing");
        fighting.add("Spiking");
        fighting.add("Extinguishing");
        fighting.add("Laughing at");
        fighting.add("Insult sword fighting");
        fighting.add("Conquering");
        fighting.add("Poking");
        fighting.add("Slashing");
        fighting.add("Hipstering");
        fighting.add("Dueling");
        fighting.add("Stamping out");
        fighting.add("Muzzling");
        fighting.add("Pwning");
        fighting.add("Quenching");
        fighting.add("Mobbing");
        fighting.add("Impressing");
        fighting.add("Pondering this message while fighting");
        fighting.add("Shushing");
        fighting.add("Squashing");
        fighting.add("Brawling with");
        fighting.add("Felling");
        fighting.add("Boxing");
        fighting.add("Repelling");
        fighting.add("Defying");
        fighting.add("Out-Sudokuing");
        fighting.add("Beating");
        fighting.add("Stopping");
        fighting.add("Out-staring");
        fighting.add("Dominating");
        fighting.add("Bossing");
        fighting.add("Some verb conveying how you are defeating");
        fighting.add("Outshining");
        fighting.add("Subjugating");
        fighting.add("Overpowering");
        fighting.add("Supressing");
        fighting.add("Vanquishing");
        fighting.add("Websurfing while fighting");
        fighting.add("Ahnihilating");
        fighting.add("Owninating");
        fighting.add("Ruinating");
        fighting.add("Utterly obliterating");
        field.add("field");
        field.add("plain");
        field.add("hill");
        field.add("cavern");
        field.add("cafeteria");
        field.add("meadow");
        field.add("desert");
        field.add("wasteland");
        field.add("forest");
        field.add("sea");
        field.add("cave");
        field.add("bubbleland");
        field.add("lake");
        field.add("school");
        field.add("continent");
        field.add("void");
        field.add("house");
        field.add("ground");
        field.add("volcano");
        field.add("trench");
        field.add("office");
        field.add("peak");
        field.add("treehouse");
        field.add("place");
        field.add("surplus store");
        field.add("iceberg");
        field.add("mall");
        field.add("pasture");
        field.add("island");
        field.add("bus");
        field.add("arena");
        field.add("lounge");
        field.add("valley");
        field.add("whirlpool");
        field.add("racetrack");
        field.add("cloud");
        field.add("matrix");
        field.add("prairie");
        field.add("melting pot");
        field.add("substation");
        field.add("ocean");
        field.add("spatula city");
        field.add("gym");
        field.add("cliff");
        field.add("subroutine");
        field.add("space station");
        field.add("asteroid");
        field.add("metropolis");
        field.add("planet");
        field.add("galaxy");
        field.add("dimension");
        field.add("universe");
        traveling.add("Traveling");
        traveling.add("Walking");
        traveling.add("Dancing");
        traveling.add("Prancing");
        traveling.add("Meandering");
        traveling.add("Sliding");
        traveling.add("Skipping");
        traveling.add("Moving");
        traveling.add("Speed walking");
        traveling.add("Running");
        traveling.add("Flying");
        traveling.add("Teleporting");
        traveling.add("Jumping");
        traveling.add("Hopping");
        traveling.add("Crawling");
        traveling.add("Maneuvering");
        traveling.add("Navigating");
        traveling.add("Walking with your eyes closed");
        traveling.add("Driving");
        traveling.add("Jaunting");
        traveling.add("Strolling");
        traveling.add("Hopscotching");
        traveling.add("Hiking");
        traveling.add("Taking a taxi to");
        traveling.add("Swimming");
        traveling.add("Floating");
        traveling.add("Marching");
        traveling.add("Chewing gum and walking");
        traveling.add("Spinning");
        traveling.add("Somersaulting");
        traveling.add("Rolling");
        traveling.add("Falling");
        traveling.add("Climbing");
        traveling.add("Rev matching");
        traveling.add("Sinking");
        traveling.add("Sailing");
        traveling.add("Riding");
        traveling.add("Shuffling");
        traveling.add("Plodding");
        traveling.add("Beatboxing");
        traveling.add("Surfing");
        traveling.add("Skating");
        traveling.add("Sleepwalking");
        traveling.add("Coasting");
        traveling.add("Crab walking");
        traveling.add("Drifting");
        traveling.add("Pacing");
        traveling.add("Tiptoeing");
        traveling.add("Cartwheeling");
        traveling.add("Sneaking");
        traveling.add("Parading");
        traveling.add("GPS navigating");
        traveling.add("Warping");
        traveling.add("Gravitating");
        traveling.add("Space-bending");
        traveling.add("Hyperspeeding");
        traveling.add("Moon walking");
        swordRoot.add("Stick");
        swordRoot.add("Pipe");
        swordRoot.add("Dagger");
        swordRoot.add("Spoon");
        swordRoot.add("Sword");
        swordRoot.add("Pin");
        swordRoot.add("Razor");
        swordRoot.add("Fork");
        swordRoot.add("Knife");
        swordRoot.add("Dirk");
        swordRoot.add("Can Opener");
        swordRoot.add("Blade");
        swordRoot.add("Bottle");
        swordRoot.add("Claymore");
        swordRoot.add("Axe");
        swordRoot.add("Halberd");
        swordRoot.add("Estoc");
        swordRoot.add("Broadsword");
        swordRoot.add("Barrel");
        swordRoot.add("Cutlass");
        swordRoot.add("Kris");
        swordRoot.add("Frying Pan");
        swordRoot.add("Rapier");
        swordRoot.add("Spatula");
        swordRoot.add("Snorkel");
        swordRoot.add("Scimitar");
        swordRoot.add("Saber");
        swordRoot.add("Shoe");
        swordRoot.add("Rod");
        swordRoot.add("Racket");
        swordRoot.add("Fan");
        swordRoot.add("Tweezers");
        swordRoot.add("Bat");
        swordRoot.add("Knuckles");
        swordRoot.add("Piano");
        swordRoot.add("Stinger");
        swordRoot.add("Claw");
        swordRoot.add("Finger");
        swordRoot.add("Sickle");
        swordRoot.add("Mist");
        swordRoot.add("Pen");
        swordRoot.add("Hammer");
        swordRoot.add("Club");
        swordRoot.add("Brick");
        swordRoot.add("Vase");
        swordRoot.add("Rock");
        swordRoot.add("Mace");
        swordRoot.add("Rake");
        swordRoot.add("Spear");
        swordRoot.add("Headrest");
        swordRoot.add("Staff");
        swordRoot.add("Wrench");
        swordRoot.add("Wand");
        swordRoot.add("Pole");
        swordRoot.add("Pillow");
        swordRoot.add("Glaive");
        swordRoot.add("Greatsword");
        swordRoot.add("Lightsaber");
        swordRoot.add("Katana");
        swordPrefix.add("Basic");
        swordPrefix.add("Plain");
        swordPrefix.add("Standard");
        swordPrefix.add("Vanilla");
        swordPrefix.add("Good");
        swordPrefix.add("Sharp");
        swordPrefix.add("Great");
        swordPrefix.add("Excellent");
        swordPrefix.add("Awesome");
        swordPrefix.add("Mediocre");
        swordPrefix.add("Ultra");
        swordPrefix.add("Cool");
        swordPrefix.add("Mundane");
        swordPrefix.add("Freezing");
        swordPrefix.add("Spastic");
        swordPrefix.add("Huge");
        swordPrefix.add("Mystical");
        swordPrefix.add("Metallic");
        swordPrefix.add("Red");
        swordPrefix.add("Green");
        swordPrefix.add("Wonderful");
        swordPrefix.add("Blue");
        swordPrefix.add("Yellow");
        swordPrefix.add("Weird");
        swordPrefix.add("Invisible");
        swordPrefix.add("Burning");
        swordPrefix.add("Chocolate");
        swordPrefix.add("Quenching");
        swordPrefix.add("Smiting");
        swordPrefix.add("Gooey");
        swordPrefix.add("Venomous");
        swordPrefix.add("Scary");
        swordPrefix.add("Ethereal");
        swordPrefix.add("Ginormous");
        swordPrefix.add("Swift");
        swordPrefix.add("Double");
        swordPrefix.add("Pristine");
        swordPrefix.add("Bogus");
        swordPrefix.add("ULTRA");
        swordPrefix.add("Sublime");
        swordPrefix.add("Exquisite");
        swordPrefix.add("Celestial");
        swordPrefix.add("GREAT");
        swordPrefix.add("Unworldly");
        swordPrefix.add("Charming");
        swordPrefix.add("Polished");
        swordPrefix.add("Glowy");
        swordPrefix.add("Superb");
        swordPrefix.add("Splendid");
        swordPrefix.add("Rare");
        swordPrefix.add("Fumigating");
        swordPrefix.add("Refined");
        swordPrefix.add("Ancient");
        swordPrefix.add("Divine");
        swordPrefix.add("Vorpal");
        swordPrefix.add("Groovy");
        swordPrefix.add("Flawless");
        swordPrefix.add("Uber");
    }

    public static void calcBaseIndex(Array array, int i)
    {
        n = (int)((float)(array.size - 1) * getBaseIndexPercent(i));
    }

    public static void calcIndexOffset(Array array, int i)
    {
        calcPdfRate(array, i);
        float f = cdf(array);
        if (MathUtils.random() * (5F + f) < 5F || n <= 10)
        {
            if (n > 10)
            {
                offset = (int)Math.floor(MathUtils.random() * 10F);
                return;
            } else
            {
                offset = (int)Math.floor(MathUtils.random() * (float)n);
                return;
            }
        } else
        {
            offset = evalPdf(array, MathUtils.random(minPDF(array), pdfRate));
            return;
        }
    }

    private static void calcPdfRate(Array array, int i)
    {
        float f = i;
        if (f <= 500F)
        {
            pdfRate = 1.0F;
            return;
        } else
        {
            pdfRate = 1.0F / (f - 500F);
            return;
        }
    }

    private static float cdf(Array array)
    {
        return (float)(1.0D - Math.exp(-pdfRate * (float)(n - 10))) / pdfRate;
    }

    private static int evalPdf(Array array, float f)
    {
        return (int)Math.floor(Math.log(pdfRate / f) / (double)pdfRate);
    }

    public static String getAmuletName(double d)
    {
        return getName(amuletRoot, amuletPrefix, getLevelForQual(d));
    }

    private static float getBaseIndexPercent(int i)
    {
        float f = i;
        if (f <= 100F)
        {
            return (0.5F * f) / 100F;
        }
        if (f <= 200F)
        {
            return (0.2F * (f - 100F)) / 100F + 0.5F;
        }
        if (f <= 300F)
        {
            return 0.7F + ((f - 200F) * 0.15F) / 100F;
        }
        if (f <= 500F)
        {
            return 0.85F + ((f - 300F) * 0.15F) / 200F;
        } else
        {
            return 1.0F;
        }
    }

    public static String getBootName(double d)
    {
        return getName(bootRoot, bootPrefix, getLevelForQual(d));
    }

    public static String getExclamation()
    {
        int i = (int)Math.floor((G.level + 1L) / 100L);
        if (i < exclamation.size)
        {
            return (String)exclamation.get(i);
        } else
        {
            return (new StringBuilder(String.valueOf((String)exclamation.get(exclamation.size - 1)))).append("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!".substring(0, (i - exclamation.size) + 1)).toString();
        }
    }

    public static String getField()
    {
        String s = getName(field, (int)G.questLevel);
        if (s.equals("spatula city") && G.sword.baseName.contains("Spatula") && G.amulet.baseName.contains("Discount"))
        {
            A.spatulaC = true;
        }
        return s;
    }

    public static String getFighting()
    {
        return getName(fighting, (int)G.questLevel);
    }

    public static String getGetting()
    {
        return getName(getting, (int)G.questLevel);
    }

    public static int getLevelForQual(double d)
    {
        return (int)(Balance.coefLog * Math.log(d));
    }

    public static String getMonster()
    {
        return getName(monsterRoot, monsterPrefix, (int)G.questLevel);
    }

    public static String getName(Array array, int i)
    {
        calcBaseIndex(array, i);
        calcIndexOffset(array, i);
        return getValue(array);
    }

    public static String getName(Array array, Array array1, int i)
    {
        calcBaseIndex(array1, i);
        calcIndexOffset(array1, i);
        prefix = getValue(array1);
        if (prefix.equals("Vorpal"))
        {
            A.vorpalC = true;
        }
        calcBaseIndex(array, i);
        calcIndexOffset(array, i);
        if (getValue(array).equals("Pillow"))
        {
            A.pillowC = true;
        }
        return (new StringBuilder(String.valueOf(prefix))).append(" ").append(getValue(array)).toString();
    }

    public static void getPrefixRoot(Array array, int i)
    {
        prefix = (String)array.get(prefixN);
    }

    public static double getQualForLevel(double d)
    {
        return Math.pow(Balance.coef1, d);
    }

    public static String getSwordName(double d)
    {
        return getName(swordRoot, swordPrefix, getLevelForQual(d));
    }

    public static String getTownsfolk()
    {
        String s;
        if ((int)G.questLevel <= 500)
        {
            s = "townsfolk";
        } else
        {
            String s1 = getName(townsfolkRoot, townsfolkPrefix, (int)G.questLevel - 500);
            s = s1;
            if (s1.equals("hobo hobos"))
            {
                A.hoboC = true;
                return s1;
            }
        }
        return s;
    }

    public static String getTraveling()
    {
        return getName(traveling, (int)G.questLevel);
    }

    public static String getTurningIn()
    {
        return getName(turningIn, (int)G.questLevel);
    }

    private static String getValue(Array array)
    {
        int j = n - offset;
        int i = j;
        if (j < 0)
        {
            i = 0;
        }
        j = i;
        if (i > array.size - 1)
        {
            j = array.size - 1;
        }
        return (String)array.get(j);
    }

    private static float minPDF(Array array)
    {
        return (float)Math.exp((float)(-(n - 10)) * pdfRate) * pdfRate;
    }

}
