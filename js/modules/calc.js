function calc () {
    // калькулятор для расчета калорий

    const result = document.querySelector('.calculating__result span'); // переменная с тем куда выведется ответ

    let sex, 
        height, 
        weight, 
        age, 
        ratio;

    

        
    if(localStorage.getItem('sex')){                   
        sex = localStorage.getItem('sex');
    }else{
        sex='female';
        localStorage.setItem('sex','female');
    }

    if(localStorage.getItem('ratio')){                   
        ratio = localStorage.getItem('ratio');
    }else{
        ratio= 1.375;
        localStorage.setItem('ratio',1.375);
    }

    function initLocalSettings(selector,activClass){ 
        const elem = document.querySelectorAll(selector);

        elem.forEach(item => {
            item.classList.remove(activClass);  
            if(item.getAttribute('id') === localStorage.getItem('sex')){  
                item.classList.add(activClass);               
            }
            if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')){  
                item.classList.add(activClass);               
            }
        })
    
        

    }

    initLocalSettings('#gender div','calculating__choose-item_active'); // класс с полом 
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active'); // класс с активностью движений


    function calcTotal (){                
        if(!sex || !height || !weight || !age || !ratio) {    
        result.textContent = 'Введите все значения';
        return;
        }
        if(sex === 'female') { 
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else{ //для мужчин
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); 
        }
    }  

    calcTotal();

   
    function getStaticInformation (selector , activeClass) {  // parentSelector - родитель блок(их у нас 2) с которого получаем знач
                                                                    // activeClass класс активности когда мы опред какой блок
        const elements = document.querySelectorAll(selector);                // элементы внутри этого блока 
        
        elements.forEach(item =>{
            item.addEventListener('click',(e)=>{  
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio')); 
                }else{                                            
                    sex = e.target.getAttribute('id');   
                    localStorage.setItem('sex',e.target.getAttribute('id')); 
                }
                
                elements.forEach(elem =>{    
                    elem.classList.remove(activeClass);
                })
                e.target.classList.add(activeClass);
                calcTotal(); 
            })
        })
        
    

    } 
  
    getStaticInformation('#gender div','calculating__choose-item_active'); // класс с полом 
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active'); // класс с активностью движений

    

    function getDinamicInformation(selector){
        const input = document.querySelector(selector);  // selector инпута который нас интересует
        input.addEventListener('input',(e)=>{   
            if(input.value.match(/\D/ig) ){      
                input.style.border = `1px solid red`;
            } else{
                input.style.border = `none`;
            }  

        switch (input.getAttribute('id')) {        
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
        calcTotal(); 
        });
        
    }
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

}

export default calc;