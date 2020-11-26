const headNavigation = () => {
    const nav = document.querySelector('.head');

    const handlerList = (children) => {
        for(let key of children) {
            if(key.tagName === 'UL') handler(key);
        }
    }

    const handler = (tag) => {
        if(!tag.style.display) {
            tag.style.display = 'block';
        } else {
            tag.style.display = '';
        }
    }

    nav.addEventListener('click', e => {
        
        const {target} = e;

        if(target.matches('.clubs-list p')) {
            const list = target.parentNode;
            handlerList(list.children);
        }

        if(target.closest('.free-visit')) {
            const modal = document.getElementById('free_visit_form');
            handler(modal); 
        }

        if(target.closest('.callback-btn')) {
            const modal = document.getElementById('callback_form');
            handler(modal);
        }

    })

    document.body.addEventListener('click', e => {
        if(e.target.closest('.fixed-gift')) {
            const modal = document.getElementById('gift');
            handler(modal);
            e.target.style.display = 'none';
        }
    })

}

export default headNavigation;