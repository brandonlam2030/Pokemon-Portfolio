let screens = [".screenone",".screentwo",".screenthree",[".abt__me"], 
              [".project1",".project2",".project3",".project4",".project5",".project6"]];


let tracker = [];  
const clickSound = new Audio("click.mp3");
clickSound.volume = .3;
document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowRight" || event.key == "ArrowLeft" || event.key == "z" || event.key == "x") {
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

let curr = null;
function forward(classOne, classTwo, show, isForward = true) {
    const sOne = document.querySelector(classOne);
    const sTwo = document.querySelector(classTwo);
    tracker.push(classOne);
    console.log(tracker);
    curr = classTwo;


    sOne.classList.add("show")
    const source = document.querySelector(`${classTwo} .typevalue`)

    if (show) {
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


        }, 1000);
    }

}

function back() {
    let sTwo = tracker.pop();
    sOne.classList.add("show")
    const source = document.querySelector(`${classTwo} .typevalue`)

}
let navbar__pos = 0;
let step = 0;
let cont = false;
let screencount;
let position = 1;
let select = false;
const boxes = document.querySelectorAll(".pbox");
let index = 0;
const numcol = 2;

boxes[index].classList.add("selected");

function updateSelection() {
    boxes.forEach(box => box.classList.remove("selected"));
    boxes[index].classList.add("selected");
}

document.addEventListener('keydown', (x) => {
    const total = boxes.length;

    switch(x.key) {
        case 'ArrowRight':
            if ((index+1) % numcol !== 0 && index + 1 < total) {
                index++;
                break;
            }
            break;
        case 'ArrowLeft':
            if (index % numcol !== 0) {
                index--;
                break;
            }
            break;
        case 'ArrowUp':
            if (index - numcol >= 0) {
                index -= numcol;
                break;
            }
            break;
        case 'ArrowDown':
            if (index + numcol < 6) {
                index += numcol;
                break;
            }
            break;
        case  'z':
        case 'Z':
            select = true;
            break;
        
        
    }

    updateSelection();
})


document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();


    if (step === 2) {
        if (event.key === "ArrowLeft" && position!=0) {
            position--;
        } else if (event.key === "ArrowRight" && position!=2) {
            position++;
        }


        if (position === 0) {
            document.getElementById("triangle__selector").style.left = "25%";
            document.getElementById("triangle__selector").style.top = "46%";
        } else if (position === 1) {
            document.getElementById("triangle__selector").style.left = "42%";
            document.getElementById("triangle__selector").style.top = "54%";
        } else if (position === 2) {
            document.getElementById("triangle__selector").style.left = "64.5%";
            document.getElementById("triangle__selector").style.top = "45%";
        }
    }
    

    if (step === 4 && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
        if (navbar__pos === 0 && event.key==="ArrowRight") {
            navbar__pos++;
            document.querySelector(".stat__box").style.visibility = "hidden";
            document.querySelector(".navbar__main").style.borderBottom = "2px solid black";
            document.querySelector(".skill__box").style.visibility = "visible";
            document.querySelector(".navbar__skills").style.borderBottom = "none";


        } else if (navbar__pos === 1 && event.key==="ArrowLeft") {
            navbar__pos--;
            document.querySelector(".stat__box").style.visibility = "visible";
            document.querySelector(".navbar__main").style.borderBottom = "none";
            document.querySelector(".skill__box").style.visibility = "hidden";
            document.querySelector(".navbar__skills").style.borderBottom = "2px solid black";
        }
    }
    
    
    
    
    
    

   if(key === 'z') {
        if (step === 0) {
            forward(screens[step], screens[step+1], true);
            step++; 
            cont = false;
            screencount=0;
            return;

        } else if (step === 1 && cont) {
            forward(screens[step],screens[step+1], true);
            step++;
            cont = false;
            screencount = 1;
            return;
        } else if (position === 0) {
            forward(screens[step], screens[step+1][0], true);
            abt__hover = true;
            screencount = 2;
            position--;
            step++;
            return;
        } else if (select) {
            forward(screens[step][0], screens[step+1][index], true);
            screencount = 3;
            select = false;
            step++;
            navbar__page();
            return;
        }
   }
    
   if (key === 'x') {
        back(screens[step])
   }


})


function navbar__page() {
    
    
} 





