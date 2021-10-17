import {
    slideMessage
} from "./data.js";

const prevSlideElement = document.querySelector('.prev');
const nextSlideElement = document.querySelector('.next');
const slider = document.querySelector('.slider');
const allBtnElements = document.querySelectorAll('.toggle-btn');
const userMessageWrapper = document.getElementById('message')
const MAX_SLIDE_ARRAY_LENGTH = 4;
let randomIndex = 0;
let currentIndex;
let direction;

const directionTo = {
    left: 'left',
    right: 'right',
};

const getPrevSlide = (currentIndex) => {
    randomIndex = currentIndex > 0 ? currentIndex -= 1 : MAX_SLIDE_ARRAY_LENGTH - 1;
    return randomIndex;
};

const getNextSlide = (currentIndex) => {
    randomIndex = currentIndex > MAX_SLIDE_ARRAY_LENGTH - 2 ? 0 : currentIndex + 1;
    return randomIndex;
};

const showPrevSlide = () => {
    currentIndex = getNextSlide(randomIndex);
    moveSlide(currentIndex, directionTo.left);
    typeUserMessage(slideMessage[currentIndex], userMessageWrapper)
};

const moveSlide = (currentIndex, direction) => {
    slider.classList.add(`slide-${direction}`);

    slider.addEventListener('animationend', () => {
        slider.classList.remove(`slide-${direction}`);
    });
    deleteActiveBtnClass();
    if (direction === directionTo.left) {
        leftSlideInd = Math.abs((currentIndex - allBtnElements.length + 1) * -1)
        console.log(leftSlideInd)
        addBtnActiveClass(leftSlideInd)
    } else {
        addBtnActiveClass(currentIndex)
        setBg(currentIndex);
    }
};

console.log('- стрелки вправо работают корректно, стреки влево чудят. Проверить, как пересчитывается индекс в кнопках и проверить, как слайды меняются при перелистывании влево')

const showNextSlide = () => {
    currentIndex = getNextSlide(randomIndex);
    moveSlide(currentIndex, directionTo.right)
    typeUserMessage(slideMessage[currentIndex], userMessageWrapper)
};

const setBg = (randomIndex) => {
    slider.style.backgroundImage = `url(./img/${[randomIndex + 1]}.jpg)`
    return randomIndex;
};

const deleteActiveBtnClass = () => {
    let prevActiveBtnElement = document.querySelector('.btn-active');
    prevActiveBtnElement.classList.toggle('btn-active');
};

const addBtnActiveClass = (randomIndex) => {
    allBtnElements[randomIndex].classList.toggle('btn-active');
};

const toggleButton = (evt) => {
    prevIndex = randomIndex;
    randomIndex = Number(evt.target.dataset.title);
    direction = randomIndex > prevIndex ? directionTo.right : directionTo.left
    deleteActiveBtnClass();
    addBtnActiveClass(randomIndex);
    setBg(randomIndex);
    moveSlide(randomIndex, direction)
    return randomIndex;
};

const typeUserMessage = async (userMessage, parentElement) => {
    await pause(1);
    parentElement.textContent = '';
    let textQueue = userMessage.split("");

    while (textQueue.length) {
        let char = textQueue.shift();
        parentElement.append(char);
        await pause(0.05);
    }

    await pause(0.5);
    parentElement.classList.add("cursor");
    return;
};

const pause = (s = 1) => {
    return new Promise(resolve => setTimeout(resolve, 1000 * Number(s)));
};


typeUserMessage(slideMessage[randomIndex], userMessageWrapper);
prevSlideElement.addEventListener('click', showPrevSlide);
nextSlideElement.addEventListener('click', showNextSlide);

allBtnElements.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
        toggleButton(evt);
    })
});