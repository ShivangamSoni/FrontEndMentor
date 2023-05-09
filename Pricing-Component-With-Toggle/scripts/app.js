const annualBtn = document.querySelector('#plan_annual');
const monthBtn = document.querySelector('#plan_month');

const priceToggle = document.querySelector('#priceToggle');

const priceCardPrices = document.querySelectorAll('.priceCard__price');

const PRICE_LIST = {
  monthly: ['19.99', '24.99', '39.99'],
  annually: ['199.99', '249.99', '399.99'],
};

function setPrice() {
  priceCardPrices.forEach((cardPrice, i) => {
    const priceValue = cardPrice.querySelector('.price__value');

    if (priceToggle.checked) {
      priceValue.textContent = PRICE_LIST.monthly[i];
    } else {
      priceValue.textContent = PRICE_LIST.annually[i];
    }
  });
}

priceToggle.addEventListener('change', setPrice);

annualBtn.addEventListener('click', () => {
  priceToggle.checked = false;
  priceToggle.dispatchEvent(new Event('change'));
});

monthBtn.addEventListener('click', () => {
  priceToggle.checked = true;
  priceToggle.dispatchEvent(new Event('change'));
});

document.addEventListener('DOMContentLoaded', setPrice);
