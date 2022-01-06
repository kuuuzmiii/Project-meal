
 function closeModal (modalSelector){
    const   modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');

    document.body.style.overflow = '';
    }
    function openModal(modalSelector,modalTimerrId) {
        const   modalWindow = document.querySelector(modalSelector);
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
    
        document.body.style.overflow = 'hidden';
        console.log(modalTimerrId);
        if(modalTimerrId){
            clearInterval(modalTimerrId);

        }

    }

function modal (triggerSelector, modalSelector,modalTimerrId){

    const modalOpen = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector);

    modalOpen.forEach( item => {
    item.addEventListener('click',()=>openModal(modalSelector,modalTimerrId));
    });
       

    modalWindow.addEventListener('click', (event) =>{
    if(event.target === modalWindow || event.target.getAttribute('data-close') == ''){
        closeModal(modalSelector);
    }
    });
    document.addEventListener('keydown',(e) =>{
    if(e.code === 'Escape' ){
        if(modalWindow.style.display == 'block'){
        closeModal(modalSelector);
        }
    };

    });



    function showMyModal () {
    window.addEventListener('scroll',() =>{
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal(modalSelector,modalTimerrId);
            window.removeEventListener('scroll',showMyModal);
        }
    });
    };
    window.addEventListener('scroll',showMyModal);
   
}

export default modal;
export {closeModal};
export{openModal};