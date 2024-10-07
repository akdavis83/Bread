gsap.registerPlugin(CustomEase);
var toast = document.getElementById("toastd");
var tl = gsap.timeline();
CustomEase.create(
	"toastIn",
	"M0,0 C0,0.502 0.073,0.674 0.2,0.8 0.331,0.932 0.504,1 1,1 "
);
CustomEase.create("toastOut", "M0,0 C0.532,0 0.954,0.461 1,1 ");

tl.pause();
tl.fromTo(
	"#toastd",
	{
		y: "100%",
		opacty: 0,
		rotation: 18,
		scaleX: 0.5,
		scaleY: 2.6,
		color: "transparent",
		height: 140,
		width: 100
	},
	{
		y: -360,
		opacity: 2,
		rotation: -18,
		duration: 0.66,
		scaleX: 1.2,
		scaleY: 0.7,
		ease: "toastIn"
	}
);
tl.to(
	"#toastd",
	{
		rotation: 420,
		scale: 1,
		duration: 1,
		height: "auto",
		width: "auto",
		ease: "circ.inOut"
	},
	">-0.45"
);
tl.to(
	"#toastd",
	{
		color: "white",
		backgroundColor: "#795129",
		duration: 0.2
	},
	"<0.4"
);
tl.to("#toastd", {
	y: 0,
	rotation: 360,
	opacity: 1,
	backgroundColor: "#272a2d",
	backgroundImage: "none",
	duration: 1.3,
	ease: "bounce.out"
});
tl.to("#toastd", { y: 200, opacity: 0, duration: 1, delay: 3, ease: "circ.in" });

function showToast() {
	tl.play(0);
}

document.addEventListener("DOMContentLoaded", function () {
	setTimeout(() => {
		showToast();
	}, 300);
});
document.body.addEventListener("click", function () {
	showToast();
});