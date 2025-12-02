let screens = [".screenone",".screentwo",".screenthree",[".abt__me", ".profile"], 
              [".project1",".project2",".project3",".project4",".project5",".project6"]];
let tracker = [];  
let links = ["https://www.linkedin.com/in/brandonlam2007/","https://www.instagram.com/thebrandonlambb/", "https://github.com/brandonlam2030", "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"]
const clickSound = new Audio("click.mp3");
//https://open.spotify.com/user/i4kku4hodc0qt4amb3at6t99e?si=7db89689f0104289//
clickSound.volume = .3;
document.addEventListener("keydown", (event) => {
    if (event.key ===  "ArrowRight" || event.key === "ArrowLeft" || event.key === "z" || event.key === "x" || event.key ===  "ArrowDown" || event.key === "ArrowUp") {
        clickSound.currentTime = 0;
        clickSound.play();
    }
})




function blink(elementID, interval) {
    const element = document.querySelector(elementID);
    let isVisible = true;

    const id = setInterval(() => {
        if (isVisible) {
            element.style.visibility='hidden';
        } else {
            element.style.visibility='visible';
        }
        isVisible=!isVisible;
    }, interval);
    return id;
}


const blinkDown = blink('.triangle__selector__down',400);
let blinkRight = blink('.triangle__selector__right',500);
let blinkLeft;


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
                ready = true;
            }
        });


        }, 1000);
    } else {
        cont = true;
        ready = true;
    }

}


let navbar__pos = 0;
let profile__pos = 0;
let contact__pos = 0;
let step = 0;
let cont = false;
let screencount;
let select = false;
const boxes = document.querySelectorAll(".pbox");
const contacts = document.querySelectorAll(".cbox");
let index = 0;
const numcol = 2;
let pb = 0;
let ready = true;
let inputLocked = false;

boxes[index].classList.add("selected");
contacts[contact__pos].classList.add("selected");


function updateSelection(list, index) {
    list.forEach(box => box.classList.remove("selected"));
    list[index].classList.add("selected");
}


document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    


    if (step === 2) {
        if (event.key === "ArrowLeft" && position>0) {
            position--;
        } else if (event.key === "ArrowRight" && position<2) {
            position++;
        }

        let element = document.querySelector(".triangle__selector__down")
        if (position === 0) {
            element.style.left = "25%";
            element.style.top = "46%";
        } else if (position === 1) {
            element.style.left = "42%";
            element.style.top = "54%";
        } else if (position === 2) {
            element.style.left = "64.5%";
            element.style.top = "45%";
        }
    }
    

    if (step === 3 && curr === ".abt__me") {
        const total = boxes.length;
        ready = true;
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

        updateSelection(boxes,index);
    } else if (step === 3 && curr === ".profile") {
        const currentPage = document.querySelector(curr);
        const main = currentPage.querySelector(".profile__main");
        const second = currentPage.querySelector(".secondary__page");
        const buttonRight = currentPage.querySelector(".triangle__selector__right");
        const buttonLeft = currentPage.querySelector(".triangle__selector__left");
        const third = currentPage.querySelector(".third__page");

        switch (event.key) {
            case "ArrowRight":
                if (profile__pos === 0) {
                    profile__pos++;
                    main.style.visibility = "hidden";
                    second.style.visibility = "visible";
                    buttonLeft.style.visibility = "visible";
                    blinkLeft = blink(".triangle__selector__left", 500);
                    console.log("1");
                    break;
                } else if (profile__pos === 1) {
                    profile__pos++;
                    clearInterval(blinkRight);
                    second.style.visibility =  "hidden";
                    buttonRight.style.visibility = "hidden";
                    third.style.visibility = "visible";
                    console.log("2");
                    break;
                }
                break;
            case "ArrowLeft":
                if (profile__pos === 1) {
                    profile__pos--;
                    clearInterval(blinkLeft);
                    main.style.visibility = "visible";
                    second.style.visibility = "hidden";
                    buttonLeft.style.visibility = "hidden";
                    console.log("3");
                    break;
                } else if (profile__pos === 2) {
                    profile__pos--;
                    second.style.visibility = "visible";
                    buttonRight.style.visibility = "visible";
                    third.style.visibility = "hidden";
                    blinkRight = blink(".triangle__selector__right", 500);
                    console.log("4");
                    break;
                }
                break;
            case "ArrowDown" :
                if (profile__pos === 2 && contact__pos < 3) {
                    contact__pos++;
                    console.log("5");
                    break;
                } 
                break;
            case "ArrowUp" :
                if (profile__pos === 2 && contact__pos > 0) {
                    contact__pos--;
                    console.log("6");
                    break;
                }
                break;
            case "z":
                openTab();
                break;

        }
        updateSelection(contacts,contact__pos);
    }


    if (step === 4 && (event.key === "ArrowRight" || event.key === "ArrowLeft") && tracker[tracker.length-1] === ".abt__me") {
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
        if (inputLocked) return;

        wait(500);
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
        } else if (step === 2 && cont) {
            switchScene(screens[step], screens[step+1][position], true);
            abt__hover = true;  
            screencount = 2;
            step++;
            profile__pos = 0;
            clearInterval(blinkLeft);

            
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
        if (inputLocked) return;
        wait(2000);
        switchScene(curr,tracker.pop(), true, false);
   }
})

function wait(time) {
    setTimeout(() => {
        inputLocked = false;
    },time);
    inputLocked = true;
}


function openTab() {
    window.open(links[contact__pos], "_blank");
}


function updateTime() {
    let currentDay = new Date().getDate();

    setInterval(() => {
        const now = new Date();
        const newDay = now.getDate();

        if (newDay != currentDay) {
            let num = parseInt(document.querySelector(".score").textContent,10);
            num++;
            document.querySelector(".score").textContent = num.toString();
        }
        let hours = now.getHours();
        const min = now.getMinutes().toString().padStart(2,"0");
        const sec = now.getSeconds().toString().padStart(2,"0");

        if (hours > 12) {
        hours-=12;
        }
        hours.toString().padStart(2,"0");
    
        document.querySelector(".time").textContent = `${hours}:${min}:${sec}`;
    },1000);
    

}


setInterval(updateTime, 1000);
updateTime();
