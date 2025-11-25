let screens = [".screenone",".screentwo",".screenthree",[".abt__me"], 
              [".project1",".project2",".project3",".project4",".project5",".project6"]];


let tracker = [];  
const clickSound = new Audio("click.mp3");
clickSound.volume = .3;
document.addEventListener("keydown", (event) => {
    if (event.key ===  "ArrowRight" || event.key === "ArrowLeft" || event.key === "z" || event.key === "x" || event.key ===  "ArrowDown" || event.key === "ArrowUp") {
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

let typedInstance = null;
let position = 1;
let curr = null;
function switchScene(classOne, classTwo, show, isForward = true) {
    const sOne = document.querySelector(classOne);
    const sTwo = document.querySelector(classTwo);
    
    if (isForward) {
        tracker.push(classOne);
    }  else {
        step--;

    }
    curr = classTwo;

    sOne.classList.remove("show");
    sTwo.classList.remove("hide");
    sOne.classList.add("hide");
    sTwo.classList.add("show");
    const source = document.querySelector(`${classTwo} .typevalue`);

    if (source) {

        setTimeout(() => {

        if (typedInstance) {
            
            typedInstance.destroy();
            typedInstance = null;
        }

        const dialogue = document.querySelector(".dialogue");
        if (dialogue) {
            dialogue.style.display = "flex";
        }
        
        typedInstance = new Typed(`${classTwo} .auto-type`, {
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
    } else {
        cont = true;
    }

}


let navbar__pos = 0;
let step = 0;
let cont = false;
let screencount;
let select = false;
const boxes = document.querySelectorAll(".pbox");
let index = 0;
const numcol = 2;

boxes[index].classList.add("selected");

function updateSelection() {
    boxes.forEach(box => box.classList.remove("selected"));
    boxes[index].classList.add("selected");
}


document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();


    if (step === 2) {
        if (event.key === "ArrowLeft" && position>0) {
            position--;
        } else if (event.key === "ArrowRight" && position<2) {
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
    

    if (step === 3) {
        const total = boxes.length;

        switch(event.key) {
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
    }


    if (step === 4 && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
        const currentPage = document.querySelector(curr);

        const statBox    = currentPage.querySelector(".stat__box");
        const skillsBox  = currentPage.querySelector(".skill__box");
        const navMain    = currentPage.querySelector(".navbar__main");
        const navSkills  = currentPage.querySelector(".navbar__skills");

        if (navbar__pos === 0 && event.key==="ArrowRight") {
            navbar__pos++;
            statBox.style.visibility = "hidden";
            navMain.style.borderBottom = "2px solid black";
            skillsBox.style.visibility = "visible";
            navSkills.style.borderBottom = "none";


        } else if (navbar__pos === 1 && event.key==="ArrowLeft") {
            navbar__pos--;
            statBox.style.visibility = "visible";
            navMain.style.borderBottom = "none";
            skillsBox.style.visibility = "hidden";
            navSkills.style.borderBottom = "2px solid black";
        }
    }
    
    
    
    
    
    

   if(key === 'z') {
        if (step === 0) {
            switchScene(screens[step], screens[step+1], true);
            step++; 
            cont = false;
            screencount=0;
            return;

        } else if (step === 1 && cont) {
            switchScene(screens[step],screens[step+1], true);
            step++;
            cont = false;
            screencount = 1;
            return;
        } else if (position === 0 && step === 2) {
            switchScene(screens[step], screens[step+1][0], true);
            abt__hover = true;
            screencount = 2;
            step++;
            return;
        } else if (select) {
            switchScene(screens[step][0], screens[step+1][index], true);
            screencount = 3;
            select = false;
            step++;
            navbar__pos = 0;
            return;
        }
   }
    
   if (key === 'x' && tracker.length > 0 && cont) {
        switchScene(curr,tracker.pop(), true, false);
   }
})





