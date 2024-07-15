const changer = document.getElementById('theme-changer');
const html = document.documentElement;

changer.addEventListener('change', function () {
  console.log('aaa');
  html.toggleAttribute('data-theme-dark');
});
