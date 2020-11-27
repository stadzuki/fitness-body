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

const isMobile = () => {
    const burgerBtn = document.querySelector('.top-menu .menu-button');
    const menu = document.querySelector('.top-menu');
    const burger = document.querySelector('.popup-menu');

    if(window.screen.availWidth < 768) {
        burgerBtn.classList.remove('hidden-large');

        burgerBtn.addEventListener('click', () => {
            burger.style.display = 'flex';
        });

        burger.addEventListener('click', e => {
            if(e.target.closest('.close-menu-btn') || e.target.closest('li')) {
                burger.style.display = 'none'; 
            }
        })

        window.addEventListener('scroll', () => {
            if(window.scrollY >= 185) {
                menu.classList.add('posFixed');
            } else {
                menu.classList.remove('posFixed');
            }
        })
    }
}

export default function init(){
    scrollTop();
    isMobile();
}