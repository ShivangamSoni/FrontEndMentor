function DropDownMenu(node) {
  this.root = node;
  this.btn = node.querySelector('.dropdown__btn');
  const labelledBy = this.btn.id;
  this.dropdown = node.querySelector(`[aria-labelledby=${labelledBy}]`);
  this.open = false;

  this.btn.addEventListener('click', this.toggleMenu.bind(this));
  document.addEventListener('mousedown', this.clickOutside.bind(this));
}

DropDownMenu.prototype.toggleMenu = function () {
  this.open = this.btn.getAttribute('aria-expanded') === 'true';
  this.btn.setAttribute('aria-expanded', !this.open);
  this.dropdown.setAttribute('aria-hidden', this.open);

  this.open = !this.open;
  if (this.open) {
    this.dropdown.querySelectorAll('a').forEach((node) => {
      node.setAttribute('aria-hidden', false);
      node.setAttribute('tabindex', '0');
    });
  } else {
    this.dropdown.querySelectorAll('a').forEach((node) => {
      node.setAttribute('aria-hidden', true);
      node.setAttribute('tabindex', '-1');
    });
  }
};

DropDownMenu.prototype.clickOutside = function (e) {
  if (this.open && !this.root.contains(e.target)) {
    this.toggleMenu();
  }
};

// Dropdown Setup
document
  .querySelectorAll('.nav__dropdown')
  .forEach((dropdown) => new DropDownMenu(dropdown));

const navBtn = document.querySelector('.nav__hamburger');
const navBar = document.querySelector('#nav');

const mobileMediaQuery = window.matchMedia('(max-width: 50rem)');
let isMobile = mobileMediaQuery.matches;

function onResize() {
  if (isMobile) {
    navBtn.setAttribute('aria-hidden', false);
    navBtn.classList.remove('open');
    navBar.setAttribute('aria-expanded', false);
  } else {
    navBtn.setAttribute('aria-hidden', true);
    navBar.setAttribute('aria-expanded', true);
  }
}

mobileMediaQuery.addEventListener('change', (e) => {
  isMobile = e.matches;
  onResize();
});

navBtn.addEventListener('click', () => {
  const isOpen = navBar.getAttribute('aria-expanded');

  if (isOpen === 'true') {
    navBar.setAttribute('aria-expanded', false);
    navBtn.classList.remove('open');
    navBtn.querySelector('.sr-only').textContent = 'Open Menu';
    document.body.style.overflowY = 'auto';
  } else {
    navBar.setAttribute('aria-expanded', true);
    navBtn.classList.add('open');
    navBtn.querySelector('.sr-only').textContent = 'Close Menu';
    document.body.style.overflowY = 'hidden';
  }
});

document.addEventListener('DOMContentLoaded', () => onResize());
