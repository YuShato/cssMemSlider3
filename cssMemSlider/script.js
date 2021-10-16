const allSlideElements = Array.from(document.querySelectorAll('.slide'));
const sliderWrapperElement = document.querySelector('.slider');
const buttons = document.querySelectorAll('.btn');

const getNextPrev = () => {
    const activeSlide = document.querySelector('.slide-active');
    let activeIndex = allSlideElements.indexOf(activeSlide);
    let nextSlide, prevSlide;
    let nextIndex = activeIndex > allSlideElements.length - 2 ? 0 : activeIndex += 1;
    let prevIndex = activeIndex < 2 ? allSlideElements.length - 1 : activeIndex -= 2;

    nextSlide = allSlideElements[nextIndex];
    prevSlide = allSlideElements[prevIndex];

    return [prevSlide, nextSlide];
}


const getPosition = () => {
    const activeSlide = document.querySelector('.slide-active');
    let activeIndex = allSlideElements.indexOf(activeSlide);
    let [prevSlide, nextSlide] = getNextPrev();

    allSlideElements.forEach((slide, index) => {
        if (index === activeIndex) {
            slide.style.transform = 'translateX(0)';
        } else if (slide === prevSlide) {
            slide.style.transform = 'translateX(-100%)';
        } else if (slide === nextSlide) {
            slide.style.transform = 'translateX(100%)';
        } else {
            slide.style.transform = 'translate(100%)';
        }
    })
}

const showPrevSlide = () => {
    console.log('prev')
}

const showNextSlide = () => {
    const currentSlide = document.querySelector('.slide-active');

    let [prevSlide, nextSlide] = getNextPrev();

    currentSlide.style.transform = 'translateX(-100%)';

    currentSlide.classList.remove('slide-active');
    nextSlide.style.transform = 'translateX(0)';
    nextSlide.classList.add('slide-active');


}

getPosition()

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('prev')) {
            showPrevSlide();
        } else if (btn.classList.contains('next')) {
            showNextSlide()
        } else {
            console.log('click')
        }

    })
})