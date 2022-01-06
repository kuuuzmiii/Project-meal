import {closeModal,openModal} from './modal';
import {postData} from '../services/services';

function forms (modalTimerrId,formsSelector){
 
    const forms = document.querySelectorAll(formsSelector);
    const message = {
        loading:'img/form/spinner.svg',
        succces:'Скоро мы с вами свяжемся !',
        failore:'Что то пошло не так'
    };

    forms.forEach(item =>{
        bindpostData(item);
    });

    function bindpostData (form) {           
        form.addEventListener('submit', (event)=>{
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `display: block; 
                                        margin: 0 auto`;
            form.insertAdjacentElement('afterend',statusMessage);

            
            
            const formData = new FormData(form); 
            
            const json = JSON.stringify(Object.fromEntries(formData.entries())); 

           
                postData('http://localhost:3000/requests',json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.succces);
                    statusMessage.remove();
                }).catch(() =>{
                    showThanksModal(message.failore);
                }).finally(() => {
                    form.reset();
                })



            
        });
    }
     // улучшение модального окна(окно благодарности); -----------------------------------------------------------------------------------------------------------------------

     function showThanksModal (message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal('.modal', modalTimerrId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div  class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        },4000);
    
    }




}

export default forms;