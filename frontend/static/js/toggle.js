let switchBtn = document.getElementById("btnSwitch");

let light = `bi bi-brightness-high-fill`;
let dark = `bi bi-moon-stars-fill`;
let prefferedMode = localStorage.getItem("prefferedMode");

if (prefferedMode && prefferedMode === "dark") {
	document.documentElement.setAttribute("data-bs-theme", "dark");
	switchBtn.firstElementChild.setAttribute("class", light);
}
switchBtn.addEventListener("click", () => {
	if (switchBtn.firstElementChild.getAttribute("class") === dark) {
		document.documentElement.setAttribute("data-bs-theme", "dark");
		localStorage.setItem("prefferedMode", "dark");
		switchBtn.firstElementChild.setAttribute("class", light);
	} else {
		document.documentElement.setAttribute("data-bs-theme", "light");
		localStorage.setItem("prefferedMode", "light");
		switchBtn.firstElementChild.setAttribute("class", dark);
	}
});
