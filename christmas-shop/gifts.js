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

let modal = document.getElementById("myModal");

let span = document.getElementsByClassName("close")[0];


span.onclick = function () {
    modal.style.display = "none";
    body.classList.toggle('lock');

}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


let catalogData = [];

async function loadData() {
    try {
        const response = await fetch('./gifts.json');
        catalogData = await response.json();
        console.log('Данные загружены');
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }
}

document.querySelector('.gift-cards-container').addEventListener('click', (event) => {
    const card = event.target.closest('.gifts-card');

    if (card) {
        const cardTitle = card.querySelector('h3').textContent.trim();

        const foundData = catalogData.find(item => item.name === cardTitle);

        if (foundData) {
            showModal(foundData);
        }
    }
});

loadData();

function showModal(info) {
    document.querySelector('#modal-img').src = info.image;
    document.querySelector('#modal-name').textContent = info.name;
    document.querySelector('#description').textContent = info.description;
    document.querySelector('#category').textContent = info.category;
    document.querySelector('#live').textContent = `Live ${info.superpowers.live}`;
    document.querySelector('#create').textContent = `Create ${info.superpowers.create}`;
    document.querySelector('#love').textContent = `Love ${info.superpowers.love}`;
    document.querySelector('#dream').textContent = `Dream ${info.superpowers.dream}`;

    modal.style.display = 'flex';
}
