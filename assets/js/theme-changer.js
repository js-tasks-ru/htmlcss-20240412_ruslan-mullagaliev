const changer = document.getElementById('theme-changer');
const changerBurgerMenu = document.getElementById('theme-changer-burger-menu');
const html = document.documentElement;

changer.addEventListener('change', function () {
  html.toggleAttribute('data-theme-dark');
});
changerBurgerMenu.addEventListener('change', function () {
  html.toggleAttribute('data-theme-dark');
});
