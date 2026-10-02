const root = document.documentElement;
const themeButton = document.querySelector('#theme-toggle');
const themeLabel = document.querySelector('#theme-label');
function setTheme(dark) {
  root.dataset.theme = dark ? 'dark' : 'light';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeLabel.textContent = dark ? 'Light mode' : 'Dark mode';
}
try { setTheme(localStorage.getItem('elham-theme') === 'dark'); } catch { setTheme(false); }
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'dark';
  setTheme(dark);
  try { localStorage.setItem('elham-theme', dark ? 'dark' : 'light'); } catch { /* Browsing storage is optional. */ }
});
const sidebar = document.querySelector('.sidebar');
const menuButton = document.querySelector('.menu-toggle');
menuButton.hidden = false;
sidebar.classList.add('menu-collapsed');
function closeMenu() { sidebar.classList.add('menu-collapsed'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  sidebar.classList.toggle('menu-collapsed', !expanded);
});
const links = [...document.querySelectorAll('nav a')];
links.forEach(link => link.addEventListener('click', () => { closeMenu(); }));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section').forEach(section => observer.observe(section));
}
