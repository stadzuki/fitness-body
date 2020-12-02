const burgerBtn = document.querySelector('.top-menu .menu-button'),
    menu = document.querySelector('.top-menu'),
    burger = document.querySelector('.popup-menu');

const scrollTop = () => {
    const arrow = document.getElementById('totop');

    window.addEventListener('scroll', () => {
        if(window.scrollY >= 740) {
            arrow.style.display = 'block';
        } else {
            arrow.style.display = '';
        }
    })
}

const mobile = () => {
    if(window.screen.availWidth < 768) {
        burgerBtn.classList.remove('hidden-large');

        burgerBtn.addEventListener('click', (e) => {
            if(e.target.closest('img')) {
                burger.style.display = 'flex';
            }
        });

        burger.addEventListener('click', e => {
            if(e.target.closest('.close-menu-btn') || e.target.closest('li')) {
                burger.style.display = 'none'; 
            }
        })
        window.addEventListener('scroll', () => {
            if(window.scrollY >= 185 && window.screen.availWidth < 768) {
                menu.classList.add('posFixed');
            } else {
                menu.classList.remove('posFixed');
            }
        })
    }
}

const desk = () => {
    if (window.screen.availWidth > 768){
        burgerBtn.classList.add('hidden-large');
        burger.style.display = 'none';
    }
}

const isMobile = () => {
    mobile();
    desk();

    window.addEventListener('resize', () => {
        mobile();
        desk();
    })
    
}

export default function init(){
    scrollTop();
    isMobile();
}