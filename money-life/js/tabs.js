var anc_onglet = "1";
tabclick(anc_onglet);
function tabclick(a) {
	document.getElementById("content-" + anc_onglet).style.display = "none",
    document.getElementById("content-" + a).style.display = "block", anc_onglet = a
}