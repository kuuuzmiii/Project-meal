"use strict";

import tabs from './modules/tabs';
import modal from './modules/modal';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';
import{openModal} from './modules/modal';
window.addEventListener('DOMContentLoaded',() => {

    const modalTimerrId = setTimeout(()=>openModal('.modal',modalTimerrId),60000);

          tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
          modal('[data-modal]','.modal',modalTimerrId);
          calc();
          cards();
          forms(modalTimerrId,'form');
          slider({
                container: '.offer__slider',
                nextArrow: '.offer__slider-next',
                prevArrow: '.offer__slider-prev',
                slides:'.offer__slide',
                totalCounter:'#total',
                currentCounter: '#current',
                wrapper:'.offer__slider-wrapper',
                field: '.offer__slider__inner'
          });
          timer('.timer','2022-01-21');

}); 

