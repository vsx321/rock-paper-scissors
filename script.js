// Here, 0 means rock, 1 means paper, 2 means scissor
let randomNumber1;
let randomNumber2;
const sources=["rock.png", "paper.png", "scissors.png"];

// html elements
const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const text2 = document.querySelector('.text-2');
const overlay = document.querySelector('.overlay');

// funtions and event listeners

function fade(element) {                        // souce: stack overflow
    let op = 1;  // initial opacity
    const timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function init()
{
    fade(document.querySelector('.text-3'));
    initialized=true;
}

function randomNo()             // to generate random no for player1 and player2 and display image accordingly
{
    randomNumber1 = Math.floor(Math.random() * 3);
    randomNumber2 = Math.floor(Math.random() * 3);
    img1.src = sources[randomNumber1];
    img2.src = sources[randomNumber2];
}

function computeWinner()        // to compute winner of the game
{
    // total there will be 9 cases (i.e 3*3 basic permutation)
    // for draw there will be 3 cases and 6 cases other wise.
    if(randomNumber1 === randomNumber2)      // Draw
    {
        text2.innerText = "Draw";
    }
    else                                    
    {
        if(randomNumber1 === 0)          // Rock
        {
            if(randomNumber2 === 1)     // player2: paper
            {
                text2.innerText = "Player-2 won";
            }
            else                        // player2: scissor
            {
                text2.innerText = "Player-1 won";
            }
            
        }
        
        else if (randomNumber1 == 1)        // paper
        {
            if(randomNumber2 === 0)     // rock
            {
                text2.innerText = "Player-1 won";
            }
            else                        // scissors
            {
                text2.innerText = "Player-2 won";
            }
        }
        
        else                            // scissors
        {
            if(randomNumber2 === 0)     // rock
            {
                text2.innerText = "Player-2 won";
            }
            else                        // paper
            {
                text2.innerText = "Player-1 won";
            }
        }
    }
}


let initialized=false;          // flag to know if init function has been called
let flagrunning = false;           // to avoid function to execute more than once when it it already executing
document.querySelector('.overlay').addEventListener("click", function() {
    if(!flagrunning)
    {
        flagrunning = true;
        if(!initialized)
        {
            init();
        }
        rock.classList.add("grey-background");
        scissors.classList.remove("grey-background"); 
        const timer0 = setInterval(randomNo, 125);
        const timer1 = setInterval(function() { 
            rock.classList.remove("grey-background"); 
            paper.classList.add("grey-background"); 
            clearInterval(timer1);
        }, 1000);
    
        const timer2 = setInterval(function() { 
            paper.classList.remove("grey-background"); 
            scissors.classList.add("grey-background"); 
            clearInterval(timer0);
            computeWinner();
            clearInterval(timer2);
            flagrunning = false;
        }, 2000);

    }
})