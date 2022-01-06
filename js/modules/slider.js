function slider ({container,nextArrow,prevArrow,slides,totalCounter,currentCounter,wrapper,field}) {

    const   slide = document.querySelectorAll(slides),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slidesField = document.querySelector(field), // иннер
    slidesWrapper = document.querySelector(wrapper), // внешний 
    width = window.getComputedStyle(slidesWrapper).width,  // получает ширину slidesWrapper а точнее то место где будет наш слайд;
    slider = document.querySelector(container); // общий блок со слайдером,нумерацией и т д
    

    let index = 1;
    let offset = 0; 
                

    function nullsZnach (){
        if(index<10){                                 
            current.textContent = `0${index}`;
        }else { 
            current.textContent = index;  
            }
        if(slide.length < 10){
            total.textContent = `0${slide.length}`;
        }else{
            total.textContent = slide.length; 
        }
    }
    nullsZnach();

    slidesField.style.width = 100 * slide.length + '%'; 
    slidesField.style.display = 'flex'; 
    slidesField.style.transition = '0.5s all'; 
    slidesWrapper.style.overflow = 'hidden'; 

    slide.forEach(item => {
    item.style.width = width;
    }); 

    slider.style.position = 'relative'; 

    const indicators = document.createElement('ol'); 
    let dots = []; 

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
                            `; 
    slider.append(indicators);

    for(let i=0; i < slide.length;i++){
    const dot = document.createElement('li'); 
    dot.setAttribute('data-slide-to',i+1); 
                                        
                                        
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
    if(i == 0){  
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
    }

    function actinDot(){
    dots.forEach(dot => dot.style.opacity = '.5'); 
    dots[index - 1].style.opacity = 1;  
    };

    next.addEventListener('click',() =>{
    if(offset == (+width.slice(0,width.length -2) * (slide.length - 1))){  

        offset = 0;
    } else{
        offset += +width.slice(0,width.length -2); 
    }

    slidesField.style.transform = `translateX(-${offset}px)`; 

    if(index == slide.length){ 
        index = 1;
    }else {
        index++;
    }
    nullsZnach(); 
    actinDot(); 

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

    actinDot(); 
    });

    dots.forEach(dot => {
    dot.addEventListener('click',(e)=>{
        
        const slideTo = e.target.getAttribute('data-slide-to'); 

        index = slideTo; 
        offset = +width.slice(0,width.length -2) * (slideTo - 1); 
                                                                
        slidesField.style.transform = `translateX(-${offset}px)`; 

        
        nullsZnach(); 
        actinDot(); 
        });



    })

}
export default slider;