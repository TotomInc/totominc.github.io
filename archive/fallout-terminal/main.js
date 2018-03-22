window.oncontextmenu = function() {
    return false;
};

/*"0x0000000A4 start memory discovery 0 0x0000A3 0x0000000000000\n" +
    "1 0 0x00000A9 0000 1 0000x2 0000x59 0000000A10 0x1000A9 0 1 0x0000A2\n" +
    "0x0000000A4 CPU0 launch EFI0 0x0000A3 error 0x00000000000A9 1 0 110000x000001\n" +
    "0 666 0 0x00000A9 0000 1 0000x2 0000x59 CPU starting cell relocation01x0A9 0x0000A2\n" +
    "0x0000A2 CPU2 start memory discovery 0 0x0000000A3 1x00000000000A9 1 0 110000x000001\n" +
    "0x0000000A4 0 1 0x00000A1 1 0x000000 cell relocation 0 0x0000A3 0x0000000000000 0 1 0x0000A2\n" +
    "CPU0 launch EFI1 0x0000A3 1 0 110000x000001 1 0x00000A1 1 0x0000000000000\n" +
    "0x0000000A4 start memory discovery 0 0x0000A3 0x00000000000A7 CPU7 failed 0 1 0x0000A2\n" +
    "0x000A3 1 0x00000A9 0000 1 0000x2 0000x59 CPU starting cell relocation 0x0000A2\n" +
    "CPU2 launch EFI6 1 0x0000A6 1 0 110000x000001 1 0x0000000000A9 1 0x000001A6\n" +
    "0x0000000A4 0 code 1 0x00000A1 1 0x000000 0 0x0000A3 0x0000000000000 A0 CPUID5 0x111111A7\n" +
    "launch failed 0x000001A4 1 0 1 0 111 0x0000A9 CPU6 cell exploitation 0x111111A9 1 0 1x0000A1\n" +
    "111 0x0000A9 CPU6 1 0x0000A6 1 0 CPU6 110000x000001 0 1 0x00000A1 1 0x000000 0x000A7\n" +
    "CPU3 launch 1 0x0000A6 1 0 110000x000001 1 CPU7 starting cell relocation 0x000001A6\n" +
    "0x0000000A4 0 code 967x0000001A6 111 0x0000A9 start memory discovery 0 0x0000A3 error\n" +
    "CPU0 launch EFI1 0x0000A3 1 0 110000x000001 CPU6 110000x000001 0x0000A3 0x00000000000 1 0 1x001\n" +
    "0 0x0000A3 error EFI8 0x0000A3 start memory discovery CPU5 110000x000001 0 1 0 0x0000A3 \n" +
    "0x000000 cell relocation 0 0x0000A3 CPU4 error failed switch CPU5 0x00000000000A7 0x000001A6";*/
var toType = "Fallout terminal.\n" +
    "There are more things to come.\n" +
    "It works better with Chrome.\n" +
    "Made by TotomInc.";

var arr = toType.split("");
var loopTimer;

function frameLooper() {
    if (arr.length > 0) {
        document.getElementById("console-text").innerHTML += arr.shift();
    } else {
        clearTimeout(loopTimer);
        return false;
    };

    loopTimer = setTimeout('frameLooper()', 50);
};

frameLooper();
