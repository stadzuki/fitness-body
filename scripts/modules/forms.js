let radiuStatus = false;

const formInit = () => {
    formPopup();
    formPage();
    formFooter();
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

const closePopup = () => {
    const popup = document.querySelectorAll('.popup');

    for(let i = 0; i < popup.length; i++) {
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
    for(let key of inputs) {
        if (key.name === 'name') {
            if(/^[А-я]{0,32}$/.test(key.value) === false) {
                alert('Поле "имя" заполнено неправильно');
                status = false;
                break;
            }
        }
        if (key.name === 'phone') {
            if(/^\+?7[0-9]{3}[0-9]{7}$/.test(key.value) === false) {
                alert('Поле "телефон" заполнено неправильно');
                status = false;
                break;
            }
        }  
        if(key.type === 'checkbox') {
            if(key.checked === false) {
                alert('Вы не дали право на обработку данных');
                status = false;
                break;
            }
        }
        if(key.type === 'radio') {
            if(!radiuStatus) {
                alert('Выберите клуб');
                status = false;
                break;
            }
        }
    }
    return status;
}


const postForm = (selector) => {
    const form = document.getElementById(selector),
        inputs = form.querySelectorAll('input');

    document.body.addEventListener('click', e => {
        const {target } = e;

        if (target.closest('.close-form') || target.closest('.overlay')) {
            closePopup();
        }

        if(target.closest('.club')) {
            radiuStatus = true;
        }
    })

    form.addEventListener('submit', e => {
        e.preventDefault();

        const {target} = e,
            notif = document.createElement('div'),
            typeErrors = {
                successPost: 'Данные успешно отправлены',
                sendingPost: 'Отправка...',
                failedPost: 'Ошибка! Данные не отправлены'
            }

        if(isValid(inputs) === false) return;

        const formData = new FormData(form),
            data = {};

        formData.forEach((key, index) => {
            data[index] = key
        });
        
        form.appendChild(notif);
        notif.style.color = 'white';
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
                    clearTimeout(timer);
                }, 2000)
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