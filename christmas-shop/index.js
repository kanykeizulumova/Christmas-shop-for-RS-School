

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
    console.log({ totalWidth, viewportWidth, availableScroll, stepWidth });
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