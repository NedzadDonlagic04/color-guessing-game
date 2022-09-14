// Importing the needed modules
import { HSL } from "/hslClass.mjs";
import anime from "animejs";

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

// Used to set the pointer event to the given type
// For my project it is usually either none or auto
const setPointerEvent = (elements, type) => {
    for(const element of elements)
    {
        element.style.pointerEvents = type;
    }
}

// Giving each box and event listener to be able to determine did the user win or not
colorBoxes.forEach( box => {
    box.addEventListener('click', event => {
        setPointerEvent(colorBoxes, 'none');

        if( event.target === winningBox )
        {
            streakCount++;
            animateGood();
            animateWBox();
        }
        else
        {
            streakCount = 0;
            animateBad();
            animateLBox(box);
            animateWBox();
        }
        streak.innerHTML = streakCount;
    });
});

// Used to create the first game
fillBoxes(6);

// Element that represents the streak message
const streakMsg = document.querySelector('body div div p');

// Used to make the streak message animate in a "congrats on your success" sort of way
const animateGood = () => {
    streakMsg.style.pointerEvents = 'none';

    anime({
        targets: streakMsg,
        translateY: -30,
        scale: 1.1,
        color: 'hsl(140, 80%, 50%)',
        direction: 'reverse',
        duration: 1000,
        easing: 'easeInOutSine'
    });
}

// Used to make the winning box animate in a "congrats on your success" sort of way
const animateWBox = () => {
    anime({
        targets: winningBox,
        scale: [
            { value: 1.2, duration: 1000},
            { value: 1, duration: 0}
        ],
        borderColor: [
            { value: 'hsl(140, 80%, 50%)', duration: 1000},
            { value: 'hsl(140, 80%, 100%)', duration: 0}
        ],
        complete: () => {
            streakMsg.style.pointerEvents = 'auto';

            setPointerEvent(colorBoxes, 'auto');
            fillBoxes(6);
        },
        easing: 'easeInOutSine'
    });
}

// Used to make the losing box animate in a "you made a mistake" sort of way
const animateLBox = box => {
    anime({
        targets: box,
        translateX: [
            { value: 10, duration: 250},
            { value: -10, duration: 250},
            { value: 10, duration: 250},
            { value: 0, duration: 0}
        ],
        borderColor: [
            { value: 'hsl(0, 80%, 50%)', duration: 1000},
            { value: 'hsl(140, 80%, 100%)', duration: 0}
        ],
        easing: 'easeInOutSine'
    });
}

// Used to make the streak message animate in a "you made a mistake" sort of way
const animateBad = () => {
    streakMsg.style.pointerEvents = 'none';

    anime({
        targets: streakMsg,
        translateY: [
            { value: 30, duration: 800},
            { value: 0, duration: 0}
        ],
        rotate: [
            { value: 10, duration: 800},
            { value: 0, duration: 0}
        ],
        color: [
            { value: 'hsl(0, 80%, 50%)', duration: 800},
            { value: 'hsl(0, 80%, 100%)', duration: 0}
        ],
        easing: 'easeInOutSine'
    });
}