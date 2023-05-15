const themeToggle = document.querySelector('#themeToggle');

function changeTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

themeToggle.addEventListener('change', (e) => {
  const { checked } = e.currentTarget;
  if (checked) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
  changeTheme(checked);
});

document.addEventListener('DOMContentLoaded', () => {
  // Get Theme from localStorage or Set it Based on System Preference
  const preferredTheme =
    localStorage.getItem('theme') ??
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const darkTheme = preferredTheme === 'dark';

  if (darkTheme) {
    themeToggle.checked = true;
  }

  changeTheme(darkTheme);
});
