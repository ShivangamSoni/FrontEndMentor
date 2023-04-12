const navBtn = document.querySelector("#nav-btn");
const navBar = document.querySelector("#nav");

const mobileMediaQuery = window.matchMedia("(max-width: 599px)");

let isMobile = mobileMediaQuery.matches;

function onResize() {
    if (isMobile) {
        navBtn.setAttribute("aria-hidden", false);
        navBtn.classList.remove("open");
        navBar.setAttribute("aria-expanded", false);
    } else {
        navBtn.setAttribute("aria-hidden", true);
        navBar.setAttribute("aria-expanded", true);
    }
}

mobileMediaQuery.addEventListener("change", (e) => {
    isMobile = e.matches;
    onResize();
});

navBtn.addEventListener("click", () => {
    const isOpen = navBar.getAttribute("aria-expanded");

    if (isOpen === "true") {
        navBar.setAttribute("aria-expanded", false);
        navBtn.classList.remove("open");
        document.body.style.overflowY = "auto";
    } else {
        navBar.setAttribute("aria-expanded", true);
        navBtn.classList.add("open");
        document.body.style.overflowY = "hidden";
    }
});

document.addEventListener("DOMContentLoaded", () => onResize());
