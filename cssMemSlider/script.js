const prevSlideElement = document.querySelector('.prev');
const nextSlideElement = document.querySelector('.next');
const slider = document.querySelector('.slider');
const allBtnElements = document.querySelectorAll('.toggle-btn');
const MAX_SLIDE_ARRAY_LENGTH = 4;
let randomIndex = 0;
let currentIndex;
let direction;


const getPrevSlide = (currentIndex) => {
    randomIndex = currentIndex > 0 ? currentIndex -= 1 : MAX_SLIDE_ARRAY_LENGTH - 1;
    return randomIndex;
};

const getNextSlide = (currentIndex) => {
    randomIndex = currentIndex > MAX_SLIDE_ARRAY_LENGTH - 2 ? 0 : currentIndex + 1;
    return randomIndex;
};

const showPrevSlide = () => {
    moveSlide('left')
};

const moveSlide = (direction) => {
    currentIndex = getNextSlide(randomIndex);
    slider.classList.add(`slide-${direction}`);
    setBg(currentIndex);
    slider.addEventListener('animationend', () => {
        slider.classList.remove(`slide-${direction}`);
    });
}

const showNextSlide = () => {
    moveSlide('right')
};

const setBg = (randomIndex) => {
    slider.style.backgroundImage = `url(./img/${[randomIndex + 1]}.jpg)`
    return randomIndex;
};

prevSlideElement.addEventListener('click', showPrevSlide);
nextSlideElement.addEventListener('click', showNextSlide);

allBtnElements.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
        prevIndex = randomIndex;
        randomIndex = Number(evt.target.dataset.title);
        let prevActiveBtnElement = document.querySelector('.btn-active');
        prevActiveBtnElement.classList.toggle('btn-active');
        allBtnElements[randomIndex].classList.toggle('btn-active');
        direction = prevIndex > randomIndex ? 'left' : 'right';
        setBg(randomIndex);
        moveSlide(direction)
        return randomIndex;
    })
})