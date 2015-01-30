var cookies = 0;

function gagnerCookie() {
	cookies = cookies + 1;
	document.getElementById("affichageCookies").innerHTML = cookies;
};

window.onload = function() {
	document.getElementById("affichageCookies").innerHTML = cookies;
};