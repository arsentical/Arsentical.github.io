const fg = document.getElementById("fg");
window.addEventListener("mousemove", ev => {
    fg.style.width = (100 * ev.clientX / window.innerWidth).toString() + "vw";
})/*cool sunglasses*/;