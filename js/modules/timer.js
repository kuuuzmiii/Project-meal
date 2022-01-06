

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

export default timer;