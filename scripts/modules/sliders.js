const mainSlider = () => {
    const slider = document.querySelector('.main-slider').children;  
    autoplay(slider);  
}

const autoplay = (currientSlider) => {
    let counter = 0;

    setInterval(() => {
        prevSlide(currientSlider[counter]);

        counter++;
        if(counter > currientSlider.length - 1) counter = 0;

        nextSlide(currientSlider[counter]);
    }, 2500);
}

const prevSlide = (elem) => {
    elem.style.display = 'none';
}

const nextSlide = (elem) => {
    elem.style.display = 'flex';
}

export default function sliderInit() {
    mainSlider();
}