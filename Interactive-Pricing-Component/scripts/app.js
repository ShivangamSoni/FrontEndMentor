const quantity = document.querySelector(".quantity__value");
const total = document.querySelector(".cost__total");
const duration = document.querySelector(".cost__duration");
const durationSwitch = document.querySelector("#duration-checkbox");
const priceSlider = document.querySelector(".card__slider");

const costPerMonth = 0.00016;
const costPerYear = 0.0018;

const numberFormatter = new Intl.NumberFormat("en-us", {
    compactDisplay: "short",
    notation: "compact",
});

const currencyFormatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
});

function setTotal() {
    let totalCost = 0;
    if (durationSwitch.checked) {
        totalCost = currencyFormatter.format(priceSlider.value * costPerYear);
    } else {
        totalCost = currencyFormatter.format(priceSlider.value * costPerMonth);
    }

    total.textContent = totalCost;
}

durationSwitch.addEventListener("input", (e) => {
    const { checked } = e.currentTarget;
    duration.textContent = checked ? "/ year" : "/ month";
    setTotal();
});

priceSlider.addEventListener("input", (e) => {
    const { min, max, value } = e.currentTarget;

    const size = ((value - min) / (max - min)) * 100;
    priceSlider.style.setProperty("--fill-level", `${size}%`);

    quantity.textContent = numberFormatter.format(value);
    currentQuantity = +value;

    setTotal();
});

(function () {
    priceSlider.value = 500_000;
    priceSlider.dispatchEvent(new Event("input"));
})();
