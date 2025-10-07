let screenone = true;
let screentwo = true;
let screenthree = true;
let abt__me = false;





const clickSound = new Audio("click.mp3");
clickSound.volume = .3;
document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === 'z' || event.key.toLowerCase() === 'x') {
        clickSound.currentTime = 0;
        clickSound.play();
    }
})




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
blink('triangle__selector',400);

function switchScene(classOne, classTwo, bool) {
    const sOne = document.querySelector(classOne);
    const sTwo = document.querySelector(classTwo);
    let text_show = bool;

    prev = classOne;
    curr = classTwo;
    kdf__dialogue = sTwo.classList.contains("dialogue");
    kdb__dialogue = sOne.classList.contains("dialogue");

    sOne.classList.add("show")
    const source = document.querySelector(`${classTwo} .typevalue`)

    if (text_show) {
        setTimeout(() => {
        sOne.style.display='none';
        sTwo.style.display='flex';
        document.querySelector(".dialogue").style.display = "flex";

        new Typed(`${classTwo} .auto-type`, {
            strings :  [ source.textContent.trim() ],
            typeSpeed:0,
            backSpeed:0,
            loop:false,
            startDelay:500,
            onComplete: () => {
                cont = true;
            }
        });


        }, 2000);
    } else {
        setTimeout(() => {
        sOne.style.display='none';
        sTwo.style.display='flex';
        document.querySelector(".dialogue").style.display = "none";

        

        }, 2000);
    }

}


let step = 0;
let cont = false;
let kdf = false;
let kdb = false;
let screencount;
let position = 1;
let prev__dialogue;
let prev = null;
let curr = null;
let kdf__dialogue = false;
let kdb__dialogue = true;

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();

    if (event.key === "ArrowLeft" && position!=0) {
        position--;
    } else if (event.key === "ArrowRight" && position!=2) {
        position++;
    }


    if (position === 0) {
        document.getElementById("triangle__selector").style.left = "23%";
        document.getElementById("triangle__selector").style.top = "48%";
    } else if (position === 1) {
        document.getElementById("triangle__selector").style.left = "41%";
        document.getElementById("triangle__selector").style.top = "56%";
    } else if (position === 2) {
        document.getElementById("triangle__selector").style.left = "65.5%";
        document.getElementById("triangle__selector").style.top = "47%";
    }

    
    
    
    
    if (curr) {
        kdf__dialogue = document.querySelector(curr).classList.contains("dialogue");
    } 
    if (prev) {
        kdb__dialogue = document.querySelector(prev).classList.contains("dialogue");
    }
    
    

   if(key === 'z') {
        if (step === 0) {
            switchScene(".screenone", ".screentwo", true);
            step++; 
            cont = false;
            screencount=0;
            return;

        } else if (step === 1 && cont) {
            switchScene(".screentwo",".screenthree", true);
            step++;
            cont = false;
            screencount = 1;
            return;
        } else if (position === 0) {
            switchScene(".screenthree", ".abt__me", kdf__dialogue);
            abt__hover = true;
            screencount = 2;
        }
   }
    
   if (key === 'x') {
    switchScene(curr,prev,kdb__dialogue);
   }


})


let abt__hover = null;
let abt__hover_pos = 0;
let abt__pos = 1;


if (abt__hover === true) {
    document.querySelector(".abt__me__heading").style.boxShadow = ""
}

