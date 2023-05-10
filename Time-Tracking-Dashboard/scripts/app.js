const dailyRadio = document.querySelector('#time_daily');
const weeklyRadio = document.querySelector('#time_weekly');
const monthlyRadio = document.querySelector('#time_monthly');
const timeFrameTemplate = document.querySelector('#timeframe_template');

let DATA = [];
const cards = [];

function renderCards(timeFrame) {
  const previousString = getPreviousString(timeFrame);

  document.querySelectorAll('.timeframe').forEach((node) => node.remove());

  DATA.forEach((data) => {
    const card = timeFrameTemplate.content.firstElementChild.cloneNode(true);
    card.dataset.id = data.title;

    const header = card.querySelector('.timeframe__head');
    header.classList.add(`timeframe__head--${data.theme}`);
    const icon = card.querySelector('.timeframe__head > img');
    icon.src = data.icon;

    const title = card.querySelector('.timeframe__info > .title');
    title.textContent = data.title;

    const { current, previous } = data.timeframes[timeFrame];
    const detailsCurrent = card.querySelector('.details__current');
    detailsCurrent.textContent = `${current}hrs`;
    const detailsPrevious = card.querySelector('.details__previous');
    detailsPrevious.textContent = `${previousString} - ${previous}hrs`;

    document.querySelector('.dashboard').appendChild(card);
    cards.push(card);
  });
}

function updateCards(timeFrame) {
  const previousString = getPreviousString(timeFrame);
  cards.forEach((card) => {
    const id = card.dataset.id;
    const { current, previous } = DATA.find(({ title }) => title === id)
      .timeframes[timeFrame];

    const detailsCurrent = card.querySelector('.details__current');
    detailsCurrent.textContent = `${current}hrs`;
    const detailsPrevious = card.querySelector('.details__previous');
    detailsPrevious.textContent = `${previousString} - ${previous}hrs`;
  });
}

function getPreviousString(timeFrame) {
  let previousString = 'Yesterday';
  if (timeFrame === 'weekly') {
    previousString = 'Last Week';
  } else if (timeFrame === 'monthly') {
    previousString = 'Last Month';
  }

  return previousString;
}

function updateTimeFrame(timeFrame) {
  if (cards.length === 0) {
    renderCards(timeFrame);
  } else {
    updateCards(timeFrame);
  }
}

async function getData() {
  const resp = await fetch('./data.json');
  DATA = await resp.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  await getData();
  weeklyRadio.click();
});

dailyRadio.addEventListener('change', () => {
  updateTimeFrame('daily');
});

weeklyRadio.addEventListener('change', () => {
  updateTimeFrame('weekly');
});

monthlyRadio.addEventListener('change', () => {
  updateTimeFrame('monthly');
});
