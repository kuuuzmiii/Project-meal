/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc () {
    // калькулятор для расчета калорий

    const result = document.querySelector('.calculating__result span'); // переменная с тем куда выведется ответ

    let sex, 
        height, 
        weight, 
        age, 
        ratio;

        // sex ratio это дефолтные значения мы установили, чтобы если пользователь вдруг не выбрал они стоялт

        
    if(localStorage.getItem('sex')){                   // проверяем не записаны ли значнеия в localStorage если да то уст их иначе не
        sex = localStorage.getItem('sex');
    }else{
        sex='female';
        localStorage.setItem('sex','female');
    }

    if(localStorage.getItem('ratio')){                   // проверяем не записаны ли значнеия в localStorage если да то уст их иначе не
        ratio = localStorage.getItem('ratio');
    }else{
        ratio= 1.375;
        localStorage.setItem('ratio',1.375);
    }

    function initLocalSettings(selector,activClass){ // функция уст значения согластно записямlocalStorage
        const elem = document.querySelectorAll(selector);

        elem.forEach(item => {
            item.classList.remove(activClass);  // сначала удаляем класс
            if(item.getAttribute('id') === localStorage.getItem('sex')){  //если есть данные по этому элементу в localStorage 
                item.classList.add(activClass);               // уст класс активностти
            }
            if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')){  //если есть данные по этому элементу в localStorage 
                item.classList.add(activClass);               // уст класс активностти
            }
        })
    
        

    }

    initLocalSettings('#gender div','calculating__choose-item_active'); // класс с полом div т.к обращаются к блокам этого селектора
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active'); // класс с активностью движений div т.к обращаются к блокам этого селектора


    function calcTotal (){                 // функция подсчитывает конечный результат (запускается кажый раз полсе изменения(добавления значения))
        if(!sex || !height || !weight || !age || !ratio) {    // проверка(значение расчитывается когда заполнены все значения)
        result.textContent = 'Введите все значения';
        return;
        }
        if(sex === 'female') { // для женщин
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); // формулы для расчета
        } else{ //для мужчин
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); // формулы для расчета
        }
    }  //Math.round округляется до ближайшего целого значения

    calcTotal();

    // данные которые задаются с помощью клика(выбор значений со страницы)
    function getStaticInformation (selector , activeClass) {  // parentSelector - родитель блок(их у нас 2) с которого получаем знач
                                                                    // activeClass класс активности когда мы опред какой блок
        const elements = document.querySelectorAll(selector);                // элементы внутри этого блока 
        
        elements.forEach(item =>{
            item.addEventListener('click',(e)=>{  //вешаем на каждый элемент обработчик событий, чтобы при попадании на пустую область не было багов
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio'); // Если есть атрибут то мы берем его иначе будем брать айдишники
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio')); //записали localstorage чтобы запомнить значение при след заходе
                }else{                                              // Так мы определили из какого блока берется значение
                    sex = e.target.getAttribute('id');   // мужчина или женщина
                    localStorage.setItem('sex',e.target.getAttribute('id')); //записали localstorage чтобы запомнить значение при след заходе
                }
                
                elements.forEach(elem =>{    // назначение класса активности у нажатого элемента
                    elem.classList.remove(activeClass);
                })
                e.target.classList.add(activeClass);
                calcTotal(); // после изменения чтобы знач менялись если пустые
            })
        })
        
    

    } 
    // убираем и добавляем класс активности и считываем значения
    getStaticInformation('#gender div','calculating__choose-item_active'); // класс с полом div т.к обращаются к блокам этого селектора
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active'); // класс с активностью движений

    // функция которая будет обрабатывать каждый отдельный инпут

    function getDinamicInformation(selector){
        const input = document.querySelector(selector);  // selector инпута который нас интересует
        input.addEventListener('input',(e)=>{   
            if(input.value.match(/\D/ig) ){          // проверка на то что не вводится буква
                input.style.border = `1px solid red`;
            } else{
                input.style.border = `none`;
            }  

        switch (input.getAttribute('id')) {          // проверка на какой инпут мы нажимаем и вводим
                case 'height':
                height = +input.value;
                break;
                case 'weight':
                    weight = +input.value;
                break;
                case 'age':
                    age = +input.value;
                break;
        } 
        calcTotal(); // после изменения чтобы знач менялись если пустые
        });
        
    }
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards (){
    // shablonizaciya -----------------------------------------------------------------------------------------------------------------------
    const menuParent = document.querySelector('.menu__field'),
    menu = menuParent.querySelector('.container');

    class MenuCard {
    constructor(src,alt,title,opisan,stoimost,parentSelector,...classes){
        this.src = src;
        this.alt = alt; 
        this.title = title;
        this.opisan = opisan;
        this.stoimost = stoimost;
        this.selector = document.querySelector(parentSelector);
        this.classes = classes;
        this.chagetoUAH();
        
    }
    chagetoUAH () {
    this.stoimost = Math.round(this.stoimost * 27);
    }
    render () {
    const item = document.createElement('div');
    if(this.classes.length === 0){
        item.classList.add('menu__item'); // если забыли указать класс при передачи данных
    } else{
        this.classes.forEach(className => {item.classList.add(className)});
    }
    // за счет rest оператора задали classes(явл массивом), т.о. передав значение мы придали окну класс
            //item.classList.add('.menu__item');
            item.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                <div class="menu__item-descr">Меню "${this.title}" - ${this.opisan}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.stoimost}</span> грн/день</div>
                </div>`;
        this.selector.append(item);
    }
    }
    

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu') // путь по которому открыт json сервер туда уходит запрос
    .then(data => {            // запрос приходит в массиве data - ответ от сервера
        data.forEach(({img,altimg,title,descr,price}) =>{ //деструктуризация(из объекта вытаскиваем отдельные свойства в качестве отдельной переменной)
            new MenuCard(img, altimg,title,descr,price,'.menu .container').render(); // этот конструктор делает так, что он будет создаваться столько раз сколько объектов в массиве (кол-во объектов это  кол-во объектов в базе)
        
        });
    });

    const addMenu = new MenuCard ("img/tabs/vegy.jpg","vegy",'Фитнес','opisan',500,'.menu .container','menu__item');
    //addMenu.render();

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms (modalTimerrId,formsSelector){
    // отправка формы методом POST -----------------------------------------------------------------------------------------------------------------------
    const forms = document.querySelectorAll(formsSelector);
    const message = {
        loading:'img/form/spinner.svg',
        succces:'Скоро мы с вами свяжемся !',
        failore:'Что то пошло не так'
    };

    forms.forEach(item =>{
        bindpostData(item);
    });

    function bindpostData (form) {           // отвечает за привязку постинга
        form.addEventListener('submit', (event)=>{
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `display: block; 
                                        margin: 0 auto`;
            form.insertAdjacentElement('afterend',statusMessage);

            
            //request.setRequestHeader('Content-type','application/json; charset=utf-8;');
            const formData = new FormData(form);  // собирает все данные с формы с инпут элементов
            
            const json = JSON.stringify(Object.fromEntries(formData.entries())); // преобразет формдату в массив массивов, а затем в объект а после в json

            // const object = {};
            // formData.forEach(function(value,key) {
            //     object[key] = value;
            // });

                // fetch('server.php',{
                //      method:'POST',
                //      body:JSON.stringify(object),
                //      headers:{'Content-type':'application/json'}    
                // })
                (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests',json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.succces);
                    statusMessage.remove();
                }).catch(() =>{
                    showThanksModal(message.failore);
                }).finally(() => {
                    form.reset();
                })


            // const json = JSON.stringify(object);
            
            // request.send(json);

            // request.addEventListener('load', () =>{
            //     if(request.status === 200){
            //         console.log(request.response);
            //         showThanksModal(message.succces);
            //         form.reset();// очиска формы
            //         setTimeout(()=>{statusMessage.remove()},2000);// удаление innera через время
            //     }else{ showThanksModal(message.failore);}

            // });
            
        });
    }
     // улучшение модального окна(окно благодарности); -----------------------------------------------------------------------------------------------------------------------

     function showThanksModal (message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerrId);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        },4000);
    
    }




}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });

 function closeModal (modalSelector){
    const   modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    // modalWindow.style.display = 'none';
    document.body.style.overflow = '';
    }
    function openModal(modalSelector,modalTimerrId) {
        const   modalWindow = document.querySelector(modalSelector);
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        // modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log(modalTimerrId);
        if(modalTimerrId){
            clearInterval(modalTimerrId);

        }

    }

function modal (triggerSelector, modalSelector,modalTimerrId){
    // модальное окно -----------------------------------------------------------------------------------------------------------------------

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container,nextArrow,prevArrow,slides,totalCounter,currentCounter,wrapper,field}) {
    // слайдер

    const   slide = document.querySelectorAll(slides),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slidesField = document.querySelector(field), // иннер
    slidesWrapper = document.querySelector(wrapper), // внешний 
    width = window.getComputedStyle(slidesWrapper).width,  // получает ширину slidesWrapper а точнее то место где будет наш слайд;
    slider = document.querySelector(container); // общий блок со слайдером,нумерацией и т д
    //1 вариант слайда(более простой)
    // let index = 1;

    //   function showSlide(n){
    //       if(n > slide.length){
    //           index = 1;
    //       }
    //       if(n < 1){
    //         index = slide.length;
    //     }
    //     slide.forEach(item =>{
    //         item.style.display = 'none';
    //     })

    //     slide[index-1].style.display = 'block';
    //     current.innerHTML = `${zeroZnach(index)}`;
    //     total.innerHTML = `${zeroZnach(slide.length)}`;

    //   }

    //   showSlide(index);

    //   function changeSlide (n) {
    //       showSlide(index += n)
    //   }
    // //   setInterval(showSlide(),1000);

    //   next.addEventListener('click',(e)=>{
    //     e.preventDefault();
    //    changeSlide(1);
    //   });

    //   prev.addEventListener('click',(e)=>{
    //     e.preventDefault();
    //     changeSlide(-1);
    //   });

    //   function zeroZnach (z){
    //     if(z>0 && z<10){
    //          let str='0'+z;
    //          return str;
    //     }else { return z; }
    // }
    // 2 вариант слайда с анимацие по типу карусель

    let index = 1;
    let offset = 0; // чтобы передвигать слайды мы будем сдвигать блок со 
                //слайдом либо влево либо вправо таким образом ориентиром будет отсуп чтобы мы могли знать на сколько отсутпать при помощи transform 

    function nullsZnach (){
    if(index<10){                                 // Подстановка нуля перед значением чтобы юыло двухзнач число
        total.textContent = `0${slide.length}`;
        current.textContent = `0${index}`;
    }else { 
        total.textContent = slide.length; 
        current.textContent = index;  
        }
    }
    nullsZnach();

    slidesField.style.width = 100 * slide.length + '%'; // Задаем ширину блоку(она равна ширине всех слайдов вместе взятых)  процент для того чтобы мы могли поместить это в css 
    slidesField.style.display = 'flex'; // Для того чтобы у нас слайды вы строились в строку иначе перемещение было бы вертикальным только надо было задать высоту вместо ширины
    slidesField.style.transition = '0.5s all'; // чтобы плавно перемещались слайды св-во css
    slidesWrapper.style.overflow = 'hidden'; // чтобы все слайды не показывались строку, мы скрываем ненужные. т.е убираем их с области видимости которые не входят в ширину

    slide.forEach(item => {
    item.style.width = width;
    }); // Задаем шиирну каждому слайду на случай если вдруг она не определена, чтобы она была одинаковой

    slider.style.position = 'relative'; // чтобы все элементы слайдера которые абсолютно позиционировались нормально отображались

    const indicators = document.createElement('ol'); // блок с точками
    let dots = []; // массив для получения точек, а точнее для того чтобы можно было назначать класс активности при перемещении

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            z-index: 15;
                            display: flex;
                            justify-content: center;
                            margin-right: 15%;
                            margin-left: 15%;
                            list-style: none;
                            `; // добавление стилей для точек
    slider.append(indicators);

    for(let i=0; i < slide.length;i++){
    const dot = document.createElement('li'); // создаем столько точек сколько слайдеров
    dot.setAttribute('data-slide-to',i+1); // установка атрибута для точки, чтобы точка соответсвовала слайду
                                        // каждой точки атрибут data-slide-to к какому слайду она будет относиться
                                        // начиная с 1 так как 1 это первый слайд
    dot.classList.add('dot');
    dot.style.cssText = `
                        box-sizing: content-box;
                        flex: 0 1 auto;
                        width: 30px;
                        height: 6px;
                        margin-right: 3px;
                        margin-left: 3px;
                        cursor: pointer;
                        background-color: #fff;
                        background-clip: padding-box;
                        border-top: 10px solid transparent;
                        border-bottom: 10px solid transparent;
                        opacity: .5;
                        transition: opacity .6s ease;
                        `;
    if(i == 0){  // делаем точку активной, 0 т.к всегда будет открыт первый слайд в начале
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot); // добавление точки в массив
    }

    function actinDot(){
    dots.forEach(dot => dot.style.opacity = '.5'); // изначально у каждой точки устанавливаем стиль чтобы они были не активны
    dots[index - 1].style.opacity = 1;  // добавляем калсс активноти к нужной точке
    };

    next.addEventListener('click',() =>{
    if(offset == (+width.slice(0,width.length -2) * (slide.length - 1))){  
        // Ел=сли отступ равен ширене одного слайда (width * кол-во слайдов(всего их пока 4) -1 итого стало(3)) тогда возвр в самое начало
        // Т.к как в переменной ширине лежит значение из css с px, то нам надо его убрать за счет slice
        // мы вырезаем все кроме последних двух элементов как раз без px (width.length -2 все символы минус 2 последних) 
        // + преобразщует в числовой формат так как до этого была строка вообще лучше делать через регулярные выражения
        offset = 0;
    } else{
        offset += +width.slice(0,width.length -2); // если слайд не последний то смещение увеличиваем на ширину 1 cлайда
    }

    slidesField.style.transform = `translateX(-${offset}px)`; // Смещение влево так как минус, вправо был бы плюс  по иксу, использование интерполяции offset на сколько

    if(index == slide.length){ // послде последнего слайда первый
        index = 1;
    }else {
        index++;
    }
    nullsZnach(); // доавблегние нуля
    actinDot(); // добавление класса активности

    });

    prev.addEventListener('click',() =>{
    if(offset == 0){ 
        offset = +width.slice(0,width.length -2) * (slide.length - 1); 
        
    } else{
        offset -= +width.slice(0,width.length -2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`; 

    if(index == 1){
        index = slide.length;
    }else {
        index--;
    }
    nullsZnach();

    actinDot(); // добавление класса активности
    });

    dots.forEach(dot => {
    dot.addEventListener('click',(e)=>{
        const slideTo = e.target.getAttribute('data-slide-to'); // задаем атрибут при нажатии на точку

        index = slideTo; // чтобы точка соответствовала слайду
        offset = +width.slice(0,width.length -2) * (slideTo - 1); // зададим смещение как и в обработчике событий
                                                                // slideTo потому что точка указывает какой именно йлсайд сейчас
        slidesField.style.transform = `translateX(-${offset}px)`; // производим смещение

        
        nullsZnach(); // установка нуля
        actinDot(); // добавление класса активности
        });



    })

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function tabs (tabsSeelctor,tabsContentSelector,tabsParentSelector,activTabsSelector){
       //Tabs-----------------------------------------------------------------------------------------------------------------------
        const tabs = document.querySelectorAll(tabsSeelctor),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

        function hideTabContent () {
        tabsContent.forEach(item => {
        item.style.display = 'none';
        });
        tabs.forEach(item =>{
        item.classList.remove(activTabsSelector);
        });
        }

        function showTabContent (i=0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activTabsSelector);
        };

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click',(event) => {
        const target = event.target;

        if(target && target.classList.contains(tabsSeelctor.slice(1))){ // slice(1) удаляет точку вначалае т.к tabsSeelctor это селектор а здесь нужно название класса
        tabs.forEach((item,i) =>{
            if(target == item){
                hideTabContent();
                showTabContent(i);

            };
        });
        }
        });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


function timer (timerSelector,deadline){
    //taimer-----------------------------------------------------------------------------------------------------------------------

    function getTimeRemaining (endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date());

        const days = Math.floor(t/(1000*60*60*24)),
            hours = Math.floor((t/(1000*60*60))%24),
            minutes = Math.floor((t/(1000*60))%60),
            seconds = Math.floor((t/1000)%60);

        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    };

    function setClock (select,endTime) {
        const timer = document.querySelector(timerSelector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds');

        const timeInterval = setInterval(updateClock,1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endTime);
            
            days.innerHTML = getZero(t.days),
            hours.innerHTML = getZero(t.hours),
            minutes.innerHTML = getZero(t.minutes),
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);

                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

            };

        };

    };
    function getZero (num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else { return num;}
    }
    setClock(timerSelector,deadline);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async(url,data) => {                    //отвечает за постинг данных(когда мы их отправляем на сервер)
    const res = await fetch(url,{                         // настраивает наш запрос фетчит запрос на сервер и получает ответ,
        method: "POST",                             //  а затем настраивает его в json формат и передает нам
        headers:{'Content-type':'application/json'},
        body:data
    });

    return await res.json(); // промис вовзращается только после того как выполнится за счет await
}  

const getResource = async(url) => {        //Получаем данные с сервера
    const res = await fetch(url);             

    if(!res.ok){  // если не все хорошо (.ок св-во которое говорит что все хорошо или нет)
    throw new Error(`Coul not fetch ${url}, status: $${res.status}`); //  в  объекте ошибки получаем текст ошибки о том что произошло
    }
    return await res.json();
    };





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded',() => {

    const modalTimerrId = setTimeout(()=>(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal',modalTimerrId),60000);

          (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
          (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal',modalTimerrId);
          (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
          (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
          (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])(modalTimerrId,'form');
          (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
                container: '.offer__slider',
                nextArrow: '.offer__slider-next',
                prevArrow: '.offer__slider-prev',
                slides:'.offer__slide',
                totalCounter:'#total',
                currentCounter: '#current',
                wrapper:'.offer__slider-wrapper',
                field: '.offer__slider__inner'
          });
          (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer','2022-01-21');

}); 


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map