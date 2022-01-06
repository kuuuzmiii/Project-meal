import {getResource} from '../services/services';

function cards (){
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
    

    getResource('http://localhost:3000/menu') // путь по которому открыт json сервер туда уходит запрос
    .then(data => {            
        data.forEach(({img,altimg,title,descr,price}) =>{ 
            new MenuCard(img, altimg,title,descr,price,'.menu .container').render();
        
        });
    });

    const addMenu = new MenuCard ("img/tabs/vegy.jpg","vegy",'Фитнес','opisan',500,'.menu .container','menu__item');
    //addMenu.render();

}

export default cards;