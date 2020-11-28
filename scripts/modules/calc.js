const clubs = {
    schelkovo: {
        monthPay: {
            oneMonth: 2999,
            sixMonth: 14990,
            nineMonth: 21990,
            twelfth: 24990
        },
    },
    mozaika: {
        monthPay: {
            oneMonth: 1999,
            sixMonth: 9900,
            nineMonth: 13900,
            twelfth: 19900
        },
    },
    promocode: 'body2020',
}

let tempPrice = clubs.mozaika.monthPay.oneMonth,
    selectedClub = clubs.mozaika,
    month = 1;

const priceTotal = document.getElementById('price-total');
priceTotal.textContent = tempPrice;

const isValid = (inputs) => {
    let status = true;
    //promocode + name + phone + selected club - check validation
    for(let key of inputs) {
        if(key.name.contains('name')) {

        }
        if(key.name.contains('tel')) {

        }
        if(key.id.contains('card_check')) {

        }
        if(key.name.contains('promo')) {
            if(key.value === clubs.promocode) {
                tempPrice *= 0.3;
                priceTotal.textContent = tempPrice;
            }
        }
    }

    return status;
}

const chooseTime = (target, club) => {
    if(target.closest('.time input')) {
        getMonth(+target.value, club);
    }
}

const getMonth = (elem, club) => {
    switch(elem){
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

const changeClub = (target) => {
    if(target.closest('.club')) {
        if(target.value === 'mozaika') {
            selectedClub = clubs.mozaika;
        } else {
            selectedClub = clubs.schelkovo;
        }     
        getMonth(month, selectedClub);   
    }
}

const formActions = () => {
    const form = document.getElementById('card_order');
    const inputs = form.querySelectorAll('input');

    form.addEventListener('click', e => {
        chooseTime(e.target, selectedClub);

        changeClub(e.target);
    })

    form.addEventListener('submit', e => {
        e.preventDefault();

        if(isValid(inputs) === false) return;


    })
}

export default formActions;