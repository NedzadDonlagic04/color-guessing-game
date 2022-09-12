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