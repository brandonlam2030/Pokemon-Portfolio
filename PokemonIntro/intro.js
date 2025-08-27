




function blink(elementID, interval) {
    const element = document.getElementById(elementID);
    let isVisible = true;

    setInterval(() => {
        if (isVisible) {
            element.style.visibility='hidden';
        } else {
            element.style.visibility='visible';
        }
        isVisible=!isVisible;
    }, interval);
}


blink('start', 700);

function switchScene(classOne, classTwo) {
    const sOne = document.querySelector(classOne);
    const sTwo = document.querySelector(classTwo);

    sOne.classList.add("show")
    const source = document.querySelector(`${classTwo} .typevalue`)

    setTimeout(() => {
        sOne.style.display='none';
        sTwo.style.display='flex';

        new Typed(`${classTwo} .auto-type`, {
            strings :  [ source.textContent.trim() ],
            typeSpeed:40,
            backSpeed:40,
            loop:false,
            startDelay:500,
            backDelay:2000
        });
        }, 2000);
}

let step = 0;
let cont = false;
document.addEventListener('click', () => { 
    if (step === 0) {
        switchScene(".screenone", ".screentwo");
        step = 1; 
        cont = false;
        setTimeout(() => {cont = true;}, 11000);
        return;

    } 
    

    if (step === 1) {
        if (!cont) return;
        switchScene(".screentwo", ".screenthree");
        step = 2;
    }
})




