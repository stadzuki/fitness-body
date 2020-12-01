let interval;

const caruselSlider = () => {
    const slider = document.getElementById('services'),
        btns = document.querySelectorAll('#services .arrow-slider'),
        slide = slider.querySelectorAll('.slide');

    let currientPos = 0,
        lineScroll = 235;

    btns[0].style.display = 'none';

    slider.addEventListener('click', e => {
        if(e.target.matches('.arrow-left') || e.target.matches('.arrow-left img')) {
            currientPos--;
            lineScroll = -currientPos * 235;
            for(let i = 0; i < slide.length; i++) {
                slide[i].style.transform = `translateX(${lineScroll}px)`;
            }
        }

        if(e.target.matches('.arrow-right') || e.target.matches('.arrow-right img')) {
            currientPos++;
            lineScroll = currientPos * 235;
            for(let i = 0; i < slide.length; i++) {
                slide[i].style.transform = `translateX(-${lineScroll}px)`;
            }
        }

        if(currientPos > 0) btns[0].style.display = 'block';
        else btns[0].style.display = 'none';

        if(currientPos > slide.length - 5) btns[1].style.display = 'none';
        else btns[1].style.display = 'block';
    })
}

const mainSlider = () => {
    const slider = document.querySelector('.main-slider').children;  
    play(slider);  
}

const gallerySlider = () => {
    const slider = document.querySelectorAll('.gallery-slider .slide');
    for(let key of slider) {
        key.style.display = 'none';
    } 
    slider[0].style.display = 'block';
    createDots(slider);
    play(slider, true);  
}

const createDots = (selector) => {
    const ul = document.querySelector('.gallery-slider .dots');

    for(let i = 0; i < selector.length; i++) {
        const li = document.createElement('li');
        li.classList.add('dot');
        ul.append(li);
    }

    ul.children[0].classList.add('dot-active');
}

const play = (currientSlider, styleDot) => {
    let dots;
    let counter = 0;

    if(styleDot === true) {
        dots = document.querySelectorAll('.gallery-slider .dot');
    }

    const autoplay = () => {
        interval = setInterval(() => {
            prevSlide(currientSlider[counter]);
            styleDot === true ? prevDot(dots[counter]) : false;
    
            counter++;
            if(counter > currientSlider.length - 1) counter = 0;
    
            nextSlide(currientSlider[counter]);
            styleDot === true ? nextDot(dots[counter]) : false;
        }, 2500);
    }
    autoplay();

    const startSlider = () => {
        autoplay();
    }
    
    const stopSlider = () => {
        clearInterval(interval);
    }

    if(styleDot === true) {
        const slider = currientSlider[0].parentNode;

        const clickDots = () => {
            dots.forEach((item, index) => item.addEventListener('click', e => {
                if(!e.target.matches('.dot-active')) {
                    prevSlide(currientSlider[counter]);
                    prevDot(dots[counter]);

                    counter = index;

                    nextSlide(currientSlider[counter]);
                    nextDot(dots[counter]);
                }
            }))
        }
        clickDots();

        slider.addEventListener('mouseover', e => {
            if(e.target.closest('.dot') || e.target.closest('.arrow-slider')) {
                stopSlider();
            }
        });

        slider.addEventListener('mouseout', e => {
            if(e.target.closest('.dot') || e.target.closest('.arrow-slider')) {
                startSlider();
            }
        });

        slider.addEventListener('click', e => {
            if(e.target.closest('.arrow-left')) {
                prevSlide(currientSlider[counter]);
                prevDot(dots[counter]);

                counter--;
                if(counter < 0) counter = currientSlider.length - 1;

                nextSlide(currientSlider[counter]);
                nextDot(dots[counter]);
            }

            if(e.target.closest('.arrow-right')) {
                prevSlide(currientSlider[counter]);
                prevDot(dots[counter]);

                counter++;
                if(counter > currientSlider.length - 1) counter = 0;

                nextSlide(currientSlider[counter]);
                nextDot(dots[counter]);
            }
        })
    }
}

const prevSlide = (elem) => {
    elem.style.display = 'none';
}

const nextSlide = (elem) => {
    elem.style.display = 'flex';
}

const prevDot = elem => {
    elem.classList.remove('dot-active');
}

const nextDot = elem => {
    elem.classList.add('dot-active');
}

export default function sliderInit() {
    mainSlider();
    gallerySlider();
    caruselSlider();
}