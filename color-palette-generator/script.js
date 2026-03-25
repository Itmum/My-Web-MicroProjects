const generateBtn = document.getElementById("generate-btn");
const colorBox = document.querySelectorAll(".color-box");

colorBox.forEach((e) => {
	e.addEventListener("click", copy);
	function copy() {
		const hexCode = e.querySelector(".hex-value").textContent;
		navigator.clipboard
			.writeText(hexCode)
			.then(() => {
				showCopySuccess(e);
			})
			.catch((err) => {
				console.log(err);
			});
	}
});

function showCopySuccess(e) {
	const icon = e.querySelector(".copy-btn");
	icon.classList.remove("far", "fa-copy");
	icon.classList.add("fas", "fa-check");

	icon.style.color = "#48bb78";

	setTimeout(() => {
		icon.classList.remove("fas", "fa-check");
		icon.classList.add("far", "fa-copy");
		icon.style.color = "";
	}, 1500);
}

generateBtn.addEventListener("click", generatePalatte);

function generatePalatte() {
	const colors = [];

	for (let i = 0; i < 5; i++) {
		colors.push(generateRandomColor());
	}

	updatePlatterDisplay(colors);
}

function generateRandomColor() {
	const letter = "0123456789ABCDEF";
	let color = "#";

	for (let i = 0; i < 6; i++) {
		color = color + letter[Math.floor(Math.random() * 16)];
	}

	return color;
}

function updatePlatterDisplay(colors) {
	const colorBox = document.querySelectorAll(".color-box");
	colorBox.forEach((e, i) => {
		const bgColor = e.querySelector(".color");
		const hexValue = e.querySelector(".hex-value");

		bgColor.style.backgroundColor = colors[i];
		hexValue.textContent = colors[i];
	});
}
