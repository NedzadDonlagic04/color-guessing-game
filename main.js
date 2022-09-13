// Importing the needed modules
import { HSL } from "/hslClass.mjs";

// Elements used to show and remove the help screen
const helpBtn = document.querySelector('#helpBtn');
const overlay = document.querySelector('#overlay');
const exitBtn = document.querySelector('#exitBtn');

// Used to show the help screen
helpBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

// Used to remove the help screen
exitBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Variables used to store values needed to color all the boxes and choose the winning box
let colors = null;
let winningBox = null;
const colorBoxes = document.querySelectorAll('body div div div');

// Variables used to update the streak counter
let streakCount = 0;
const streak = document.querySelector('#streak');

// Variables used to update the board
const hsl = {
    h: document.querySelector('#hue'),
    s: document.querySelector('#saturation'),
    l: document.querySelector('#lightness')
}

// Used to update the board with the passed colors
const updateBoard = ({ hue, saturation, lightness }) => {
    hsl.h.innerHTML = hue;
    hsl.s.innerHTML = saturation;
    hsl.l.innerHTML = lightness;
}

// Used to create a passed amount of randomly generated hsl colors
const createColors = count => {
    let colors = [];

    for(let i=0; i<count; i++)
    {
        colors.push( new HSL );
    }

    return colors;
}

// Used to fill the boxes with the random colors, choose the winning box and update the board
const fillBoxes = count => {
    colors = createColors(count);

    for(let i=0; i<count; i++)
    {
        colorBoxes[i].style.backgroundColor = colors[i].hsl;
    }   

    winningBox = Math.floor( Math.random() * count );

    updateBoard(colors[winningBox]);

    winningBox = colorBoxes[winningBox];
}

// Giving each box and event listener to be able to determine did the user win or not
colorBoxes.forEach( box => {
    box.addEventListener('click', event => {
        if( event.target === winningBox )
        {
            streakCount++;
        }
        else
        {
            streakCount = 0;
        }
        streak.innerHTML = streakCount;

        fillBoxes(6);
    });
});

// Used to create the first game
fillBoxes(6);