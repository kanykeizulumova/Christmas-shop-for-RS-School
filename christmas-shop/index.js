import './style.css';


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

document.addEventListener('DOMContentLoaded', () => {
    const deadline = new Date('2026-12-31T23:59:59Z');

    const elDays = document.querySelector('.timer__days');
    const elHours = document.querySelector('.timer__hours');
    const elMinutes = document.querySelector('.timer__minutes');
    const elSeconds = document.querySelector('.timer__seconds');

    const declensionNum = (num, words) => {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
    };

    const updateTimer = () => {
        const now = new Date().getTime();
        const diff = Math.max(0, deadline.getTime() - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        elDays.textContent = days;
        elHours.textContent = hours;
        elMinutes.textContent = minutes;
        elSeconds.textContent = seconds;

        if (diff === 0) {
            clearInterval(timerId);
        }
    };
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
});


const sliderRow = document.querySelector('.slider-row');
const sliderViewport = document.querySelector('.slider-viewport');
const btnLeft = document.querySelector('.arrow-left');
const btnRight = document.querySelector('.arrow-right');

let currentStep = 0;
let maxSteps;

function updateSlider() {
    if (window.innerWidth > 768) {
        maxSteps = 3;
    } else {
        maxSteps = 6;
    }
    const totalWidth = sliderRow.scrollWidth;
    const viewportWidth = sliderViewport.clientWidth;
    const availableScroll = totalWidth - viewportWidth;
    const stepWidth = availableScroll / maxSteps;
    const transformValue = currentStep * stepWidth;
    sliderRow.style.transform = `translateX(-${transformValue}px)`;
    btnLeft.disabled = (currentStep === 0);
    btnRight.disabled = (currentStep === maxSteps);
}

updateSlider();
btnLeft.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateSlider();
    }
});
btnRight.addEventListener('click', () => {
    if (currentStep < maxSteps) {
        currentStep++;
        updateSlider();
    }
});

window.addEventListener('resize', () => {
    currentStep = 0;
    updateSlider();
});



let catalogDt = [];

async function loadData() {
    try {
        const response = await fetch('./gifts.json');
        catalogDt = await response.json();
        console.log('Данные загружены');

        const randomGifts = shuffle(catalogDt).slice(0, 4);

        renderCards(randomGifts);

    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }
}
loadData();

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderCards(data) {
    const container = document.querySelector('.best-gifts-cards');
    container.innerHTML = '';
    data.forEach(item => {
        const giftsCard = document.createElement('div');
        giftsCard.classList.add('gifts-card');
        giftsCard.setAttribute('data-filter', item.category.toLowerCase().replace('for ', ''));

        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;

        imageCard.appendChild(img);

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('gifts-card-container');

        const p = document.createElement('p');
        p.classList.add(item.category.toLowerCase().replace('for ', ''), 'h4');
        p.textContent = item.category;

        const h3 = document.createElement('h3');
        h3.textContent = item.name;

        cardContainer.append(p, h3);

        giftsCard.append(imageCard, cardContainer);

        container.appendChild(giftsCard);

    })
}

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

function closeModal() {
    modal.style.display = "none";
    body.classList.remove('lock');
    document.documentElement.classList.remove('lock');
}

if (span) {
    span.onclick = closeModal;
}

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

function showModal(info) {
    function createStars(value) {
        const count = parseInt(value) / 100;
        let starsHtml = '';

        for (let i = 1; i <= 5; i++) {
            const opacity = i <= count ? '1' : '0.1';
            starsHtml += `<svg style="opacity: ${opacity}" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z" fill="#FF4646" />
            </svg>`
        }
        return starsHtml;
    }

    const categoryEl = document.querySelector('#category');
    categoryEl.textContent = info.category;
    categoryEl.classList.remove('work', 'health', 'harmony');
    const categoryClass = info.category.toLowerCase().replace('for ', '');
    categoryEl.classList.add(categoryClass);
    document.querySelector('#modal-img').src = info.image;
    document.querySelector('#modal-name').textContent = info.name;
    document.querySelector('#description').textContent = info.description;
    document.querySelector('#live-data').innerHTML = `
    <span>${info.superpowers.live}</span> 
    <div class="stars-wrapper">${createStars(info.superpowers.live)}</div>
`;
    document.querySelector('#create-data').innerHTML = `
        <span>${info.superpowers.create}</span> 
        <div class="stars-wrapper">${createStars(info.superpowers.create)}</div>
    `;
    document.querySelector('#love-data').innerHTML = `
        <span>${info.superpowers.love}</span> 
        <div class="stars-wrapper">${createStars(info.superpowers.love)}</div>
    `;
    document.querySelector('#dream-data').innerHTML = `
        <span>${info.superpowers.dream}</span> 
        <div class="stars-wrapper">${createStars(info.superpowers.dream)}</div>
    `;

    modal.style.display = 'flex';
    body.classList.add('lock');
    document.documentElement.classList.add('lock');
}

document.querySelector('.best-gifts-cards').addEventListener('click', (event) => {
    const card = event.target.closest('.gifts-card');

    if (card) {
        const cardTitle = card.querySelector('h3').textContent.trim();

        const foundData = catalogDt.find(item => item.name === cardTitle);

        if (foundData) {
            showModal(foundData);
        }
    }
});
