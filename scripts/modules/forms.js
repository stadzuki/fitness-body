import clubs from './calc';

let tempPrice = clubs.mozaika.monthPay.oneMonth,
    selectedClub = clubs.mozaika,
    month = 1,
    priceTotal,
    radioActive = 0,
    isPromo = false;

const cardOrder = document.getElementById('card_order');

for(let key of cardOrder) {
    if(key.name === 'promo') {
        priceTotal = document.getElementById('price-total');
        priceTotal.textContent = tempPrice;
    }
}

const formInit = () => {
    formPopup();
    formPage();
    formFooter();
    formCalc();
}

const formPopup = () => {
    const popup = document.querySelectorAll('.popup form');
    popup.forEach(item => {
        postForm(item.id);
    })
}

const formPage = () => {
    const form = document.getElementById('banner-form');
    postForm(form.id);
}

const formFooter = () => {
    const form = document.getElementById('footer_form');
    postForm(form.id);
}

const formCalc = () => {
    const form = document.getElementById('card_order');

    const changeClub = (target) => {
        if (target.value === 'mozaika') {
            selectedClub = clubs.mozaika;
        } else {
            selectedClub = clubs.schelkovo;
        }
        getMonth(month, selectedClub);
    }

    form.addEventListener('click', e => {
        if (e.target.closest('.time input')) {
            getMonth(+e.target.value, selectedClub);
            isPromo = false;
            updatePromo();
        }

        if (e.target.closest('.club')) {
            changeClub(e.target);
            isPromo = false;
            updatePromo();
        }
        
        // isPromo === true ? isPromo = false : isPromo = true;
    })
    postForm(form.id);
}

const getMonth = (elem, club) => {
    switch (elem) {
        case 1: {
            tempPrice = club.monthPay.oneMonth;
            month = 1;
            break;
        }
        case 6: {
            tempPrice = club.monthPay.sixMonth;
            month = 6;
            break;
        }
        case 9: {
            tempPrice = club.monthPay.nineMonth;
            month = 9;
            break;
        }
        case 12: {
            tempPrice = club.monthPay.twelfth;
            month = 12;
            break;
        }
    }
    priceTotal.textContent = tempPrice;
}

const closePopup = () => {
    const popup = document.querySelectorAll('.popup');

    for (let i = 0; i < popup.length; i++) {
        popup[i].style.display = '';
    }
}

const postData = (data) => {
    return fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include"
    });
}

const isValid = (inputs) => {
    let status = true;
    for (let key of inputs) {
        if (key.name === 'name') {
            if (/^[А-я]{2,32}$/.test(key.value) === false) {
                alert('Поле "имя" заполнено неправильно');
                status = false;
                break;
            }
        }
        if (key.name === 'phone') {
            if (/^\+?7[0-9]{3}[0-9]{7}$/.test(key.value) === false) {
                alert('Поле "телефон" заполнено неправильно');
                status = false;
                break;
            }
        }
        if (key.type === 'checkbox') {
            if (key.checked === false) {
                alert('Вы не дали право на обработку данных');
                status = false;
                break;
            }
        }
        if (key.type === 'radio' && key.name === 'club-name') {
            if (key.checked === false) {
                radioActive += 1;
            }
            if(radioActive === 2) {
                alert('Выберите клуб');
                status = false;
                radioActive = 0;
                break;
            }
        }
    }
    return status;
}

const updatePromo = () => {
    const target = document.querySelector('input[name="promo"]');

    if (target.value === clubs.promocode && isPromo === false) {
        tempPrice *= 0.7;
        priceTotal.textContent = Math.floor(tempPrice);
        isPromo = true;
    } else {
        isPromo = false;
        getMonth(month, selectedClub);
    }
}

const postForm = (selector) => {
    const form = document.getElementById(selector),
        inputs = form.querySelectorAll('input');

    document.body.addEventListener('click', e => {
        const {
            target
        } = e;

        if (target.closest('.close-form') || target.closest('.overlay') || target.closest('.close-btn')) {
            closePopup();
        }
    })

    form.addEventListener('input', e => {
        if (e.target.name === 'promo') updatePromo();
    })


    form.addEventListener('submit', e => {
        e.preventDefault();

        const {
            target
        } = e,
        notif = document.createElement('div'),
            typeErrors = {
                successPost: 'Данные успешно отправлены',
                sendingPost: 'Отправка...',
                failedPost: 'Ошибка! Данные не отправлены'
            }

        if (!isValid(inputs)) return;

        radioActive = 0;

        const formData = new FormData(form),
            data = {};

        formData.forEach((key, index) => {
            data[index] = key
        });

        form.appendChild(notif);
        notif.style.color = 'red';
        notif.style.marginTop = '20px';
        notif.textContent = typeErrors.sendingPost;

        postData(data)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('network status not 200');
                }
                notif.textContent = typeErrors.successPost;
                let timer = setTimeout(() => {
                    closePopup();
                    notif.textContent = '';
                    clearTimeout(timer);
                }, 2000);
                const thanks = document.getElementById('thanks').style.display = 'block';
            })
            .catch(error => {
                notif.textContent = typeErrors.failedPost;
                console.error(error);
            })
            .finally(() => {
                form.reset();
            })

    })
}

export default formInit;