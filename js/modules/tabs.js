

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

        if(target && target.classList.contains(tabsSeelctor.slice(1))){ 
        tabs.forEach((item,i) =>{
            if(target == item){
                hideTabContent();
                showTabContent(i);

            };
        });
        }
        });

}

export default tabs;