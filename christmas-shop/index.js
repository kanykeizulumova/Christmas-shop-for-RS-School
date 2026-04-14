
console.log('Christmas Shop - Home page loaded');

const burger = document.getElementById('burger');
const menu = document.getElementById('nav-menu');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
    burger.classList.toggle('active');
    menu.classList.toggle('open');
    body.classList.toggle('lock');
}
burger.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menu.classList.contains('open')) {
            toggleMenu();
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        burger.classList.remove('active');
        menu.classList.remove('open');
        body.classList.remove('lock');
    }
});