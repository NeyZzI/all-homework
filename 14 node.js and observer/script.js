const options = {
    threshold: 0.5
};

let arrNav = document.querySelectorAll('a');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            console.log(entry.target.id)
            if (entry.target.id == 0){
                arrNav.forEach(navItem => {
                    if (navItem.id != 0){
                        navItem.style.backgroundColor = 'black'
                    }
                })
                arrNav[0].style.backgroundColor = 'red'
            }
            if (entry.target.id == 1){
                arrNav.forEach(navItem => {
                    if (navItem.id != 1){
                        navItem.style.backgroundColor = 'black'
                    }
                })
                arrNav[1].style.backgroundColor = 'red'
            }
            if (entry.target.id == 2){
                arrNav.forEach(navItem => {
                    if (navItem.id != 2){
                        navItem.style.backgroundColor = 'black'
                    }
                })
                arrNav[2].style.backgroundColor = 'red'
            }
        }
        else{

        }
    }); 
}, options);

let arrArcicle = document.querySelectorAll('article')
arrArcicle.forEach(block => {
    observer.observe(block);
});