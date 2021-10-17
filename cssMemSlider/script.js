import {
    slideMessage,
    greetindUserMessage,
    crossCheckTest
} from "./data.js";

const greetingContainerWrap = document.getElementById('greeting-info');
const messagesWrapElements = greetingContainerWrap.querySelectorAll('p');
const prevSlideElement = document.querySelector('.prev');
const nextSlideElement = document.querySelector('.next');
const slider = document.querySelector('.slider');
const allBtnElements = document.querySelectorAll('.toggle-btn');
const userMessageWrapper = document.getElementById('message');
const mainBtn = document.querySelector('.button-main');
const sliderWrapElement = document.querySelector('.slider-wrap');

const MAX_SLIDE_ARRAY_LENGTH = 4;
let randomIndex = 0;
let currentIndex;
let direction;

const directionTo = {
    left: 'left',
    right: 'right',
    toggle: 'toggle',
};

const getNextSlide = (currentIndex) => {
    randomIndex = currentIndex > MAX_SLIDE_ARRAY_LENGTH - 2 ? 0 : currentIndex + 1;
    return randomIndex;
};

const showPrevSlide = () => {
    currentIndex = getNextSlide(randomIndex);
    moveSlide(currentIndex, directionTo.left);

};

const moveSlide = (currentIndex, direction) => {
    setSlideDirection(direction);
    deleteActiveBtnClass();
    if (direction === directionTo.left) {
        currentIndex = (allBtnElements.length - 1) - randomIndex;
        addBtnActiveClass(currentIndex)
        setBg(currentIndex)
    } else {
        addBtnActiveClass(currentIndex);
        setBg(currentIndex);
    }
    typeUserMessage(slideMessage[currentIndex], userMessageWrapper)
};

const showNextSlide = () => {
    currentIndex = getNextSlide(randomIndex);
    moveSlide(currentIndex, directionTo.right);
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

const setSlideDirection = (direction) => {
    slider.classList.add(`slide-${direction}`);
    slider.addEventListener('animationend', () => {
        slider.classList.remove(`slide-${direction}`);
    });
}

const toggleButton = (evt) => {
    let prevIndex = randomIndex;
    randomIndex = Number(evt.target.dataset.title);
    direction = randomIndex > prevIndex ? directionTo.right : directionTo.left
    deleteActiveBtnClass();
    addBtnActiveClass(randomIndex);
    setBg(randomIndex);
    setSlideDirection(direction);
    typeUserMessage(slideMessage[randomIndex], userMessageWrapper);
    return randomIndex;
};

const typeUserMessage = async (userMessage, parentElement) => {
    await pause(0.5);
    parentElement.textContent = '';
    let textQueue = userMessage.split("");

    while (textQueue.length) {
        let char = textQueue.shift();
        parentElement.append(char);
        await pause(0.025);
    }

    await pause(0.5);
    parentElement.classList.add("cursor");
    return;
};

const pause = (s = 0.5) => {
    return new Promise(resolve => setTimeout(resolve, 1000 * Number(s)));
};

const init = () => {
    sliderWrapElement.classList.remove('start');
    slider.style.opacity = 1;
    mainBtn.classList.remove('shake');
    greetingContainerWrap.style.display = 'none';
    typeUserMessage(slideMessage[randomIndex], userMessageWrapper);
    setBg(randomIndex);
    mainBtn.textContent = 'OFF';
}

document.addEventListener('DOMContentLoaded', () => {
    let timeoutInMs = 1500;
    typeUserMessage(greetindUserMessage[0], messagesWrapElements[0]);

    for (let i = 0; i < greetindUserMessage.length; i++) {
        timeoutInMs = timeoutInMs * (i + 1);
        setTimeout(() => {
            typeUserMessage(greetindUserMessage[i], messagesWrapElements[i]);
        }, timeoutInMs);

        i++;
    }
    mainBtn.classList.add('shake');

    mainBtn.addEventListener('click', () => {
        init();
    })
})

prevSlideElement.addEventListener('click', showPrevSlide);
nextSlideElement.addEventListener('click', showNextSlide);

allBtnElements.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
        toggleButton(evt);
    })
});

crossCheckTest.forEach((text) => {
    console.log(text)
});
