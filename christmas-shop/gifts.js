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

const tabs = document.querySelectorAll('.gift-tabs .action-small');
const cards = document.querySelectorAll('.gifts-card');

function filterCards(filterValue) {
    cards.forEach(card => {
        if (filterValue === 'all' || card.dataset.filter === filterValue) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });
}

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.dataset.filter;

        filterCards(filterValue);
    });
});

const scrollToUp = {
    el: document.querySelector('.scroll-top'),
    show() {
        this.el.classList.remove('scroll-top_hide');
    },
    hide() {
        this.el.classList.add('scroll-top_hide');
    },
    addEventListener() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            scrollY > 300 ? this.show() : this.hide();
        });
        document.querySelector('.scroll-top').onclick = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}

scrollToUp.addEventListener();

