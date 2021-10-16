const prevSlideElement = document.querySelector('.prev');
const nextSlideElement = document.querySelector('.next');
const MAX_SLIDE_ARRAY_LENGTH = 4;
let randomIndex = 0;
let currentIndex;
const allPhotos = ['./img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg']

const getPrevSlide = (currentIndex) => {
    randomIndex = currentIndex > 0 ? currentIndex -= 1 : MAX_SLIDE_ARRAY_LENGTH - 1;
    return randomIndex;
};

const getNextSlide = (currentIndex) => {
    randomIndex = currentIndex > MAX_SLIDE_ARRAY_LENGTH - 2 ? 0 : currentIndex + 1;
    return randomIndex;
};

const showPrevSlide = () => {
    console.log('prev')
    currentIndex = getPrevSlide(randomIndex);
    setBg(currentIndex);
};

const showNextSlide = () => {
    console.log('next')   
    currentIndex = getNextSlide(randomIndex);
    setBg(randomIndex);
};

const setBg = (randomIndex) => {
    document.querySelector('.slider').style.backgroundImage = `url(${allPhotos[randomIndex]})`
    return randomIndex;
};

prevSlideElement.addEventListener('click', showPrevSlide);
nextSlideElement.addEventListener('click', showNextSlide);