const getBtn = document.querySelector(".advice-get");
const loadingSpinner = document.querySelector(".loading-spinner");

window.addEventListener("DOMContentLoaded", getAndDisplayAdvice);
getBtn.addEventListener("click", getAndDisplayAdvice);

async function getAndDisplayAdvice() {
    loadingSpinner.setAttribute("aria-hidden", false);
    const data = await fetchAdvice();
    setTimeout(() => {
        loadingSpinner.setAttribute("aria-hidden", true);
    }, 500);
    if (!data) return;

    const id = document.querySelector(".advice-id");
    id.textContent = `Advice #${data.id}`;

    const quote = document.querySelector(".advice-quote");
    quote.setAttribute("cite", `https://api.adviceslip.com/advice/${data.id}`);

    const quotePara = quote.querySelector("p");
    quotePara.textContent = data.advice;
}

async function fetchAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-cache",
    });
    if (!response.ok) return;

    const { slip } = await response.json();

    return slip;
}
