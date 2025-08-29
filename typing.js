const words = 'praise flat abrupt bread scold opinion form aquatic number distinct trick grass things shaky racial office slip decorous robin craven thankful pass detail gag functional crazy flaky saddle occur quarter heady shape accept sneeze wheel collapse steep infest cry good divide retch bang fixed clutch prefer signify flashy abashed'.split(' ');

window.timer = null;
window.gameStart = null;
let infoEl = document.getElementById('info');
let minusBtn = document.getElementById('minusBtn');
let plusBtn = document.getElementById('plusBtn');
let info = parseInt(infoEl.innerText);
let gameTime = info * 1000;
const newGameBtn = document.getElementById('newGameBtn');
const wordsCount = words.length;
function addClass(el, name){
    el.className += ' '+name
}
function removeClass(el, name){
    el.className = el.className.replace(name,'')
}

function randomWord(){
    const randomIndex = Math.ceil(Math.random() * wordsCount);
    return words[randomIndex - 1];
}

function formatWord(word){
    return `<div class="word">
                <span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`
}

function updateDisplay() {
    infoEl.innerText = info;
    gameTime = info * 1000;
    minusBtn.style.display = (info === 0) ? "none" : "inline-block";
    plusBtn.style.display = (info === 75) ? "none" : "inline-block"
}

updateDisplay();

plusBtn.addEventListener('click', () => {
    info += 15;
    updateDisplay();
});

minusBtn.addEventListener('click', () => {
    if (info > 0) {
        info -= 15;
        updateDisplay();
    }
});





function newGame() {
    newGameBtn.disabled = true
    removeClass(document.getElementById('game'), 'over');
    const wordsContainer = document.getElementById('words');
    wordsContainer.innerHTML = '';
    document.querySelectorAll('.current').forEach(el => removeClass(el, 'current'));
    wordsContainer.style.marginTop = "0px"
    for(let i = 0; i < 200; i++){
        wordsContainer.innerHTML += formatWord(randomWord());
    }

    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');

    infoEl.innerText = (gameTime / 1000) + '';
    window.timer = null;
    window.gameStart = null;
}




function getWpm(){
    const words = [...document.querySelectorAll('.word')]
    const lastTypedWord = document.querySelector('.word.current')
    const lastTypedWordIndex = words.indexOf(lastTypedWord)
    const typedWords = words.slice(0, lastTypedWordIndex);
    const correctWords = typedWords.filter(word => {
        const letters = [...word.children];
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'))
        const correctLetters = letters.filter(letter => letter.className.includes('correct'))
        return incorrectLetters.length === 0 && correctLetters.length === letters.length
    })
    return correctWords.length / gameTime * 60000
}

function gameOver(){
    newGameBtn.disabled = false;
    clearInterval(window.timer);
    addClass(document.getElementById('game'), 'over')
    infoEl.innerHTML = `WPM: ${getWpm()}`
}

document.getElementById('game').addEventListener('keydown', ev => {
    minusBtn.style.display = "none";
    plusBtn.style.display = "none"
    const key = ev.key;
    const currentLetter = document.querySelector('.letter.current')
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' '
    const isSpace = key === ' '
    const currentWord = document.querySelector('.word.current')
    const isFirstLetter = currentLetter === currentWord.firstElementChild
    const isBackspace = key === 'Backspace'

    if(document.querySelector('#game.over')){
        return;
    }
    
    console.log({key, expected})

    if(!window.timer && isLetter){
        window.timer = setInterval(()=> {
            if(!window.gameStart){
                window.gameStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.gameStart;
            const sPassed = Math.round(msPassed / 1000);
            const sLeft = (gameTime / 1000) - sPassed;
            if(sLeft <= 0){
                gameOver()
                return;
            }
            infoEl.innerHTML = sLeft;
        }, 1000)
    }

    if(isLetter){
        if(currentLetter){
            addClass(currentLetter, key === expected ? 'correct' : 'incorrect')
            removeClass(currentLetter, 'current');
            if(currentLetter.nextSibling){
                addClass(currentLetter.nextSibling, 'current')
            }
            
        } else{
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerHTML = key;
            incorrectLetter.className = 'letter incorrect extra current';
            currentWord.appendChild(incorrectLetter)
        }
    }

    // what will be if the user hits space

    if(isSpace){
        if(expected !== ''){
            const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            lettersToInvalidate.forEach(letter => {
                addClass(letter, 'incorrect')
            })
        }
        removeClass(currentWord, 'current')
        addClass(currentWord.nextSibling, 'current')
        if(currentLetter){
            removeClass(currentLetter, 'current')
        }
        addClass(currentWord.nextSibling.querySelector('.letter'), 'current');
    }

    // what will be if the user hits backspace

    if (isBackspace) {
    if (currentLetter && !isFirstLetter) {
        removeClass(currentLetter, 'current');
        addClass(currentLetter.previousSibling, 'current');
        removeClass(currentLetter.previousSibling, 'incorrect');
        removeClass(currentLetter.previousSibling, 'correct');
        } 
    else if (currentLetter && isFirstLetter && currentWord.previousSibling) {
        removeClass(currentWord, 'current');
        addClass(currentWord.previousSibling, 'current');
        removeClass(currentLetter, 'current');
        const prevLast = currentWord.previousSibling.lastElementChild;
        addClass(prevLast, 'current');
        removeClass(prevLast, 'incorrect');
        removeClass(prevLast, 'correct');
        }
    if(!currentLetter){
        addClass(currentWord.lastChild, 'current');
        removeClass(currentWord.lastChild, 'correct');
        removeClass(currentWord.lastChild, 'incorrect')
        }
    }

    if(currentWord.getBoundingClientRect().top > 250){
        const words = document.getElementById('words')
        const margin = parseInt(words.style.marginTop || '0px')
        words.style.marginTop = (margin - 35) + 'px'
    }


    // moving cursor
    const nextLetter = document.querySelector('.letter.current');
    const cursor = document.getElementById('cursor');
    const gameRect = document.getElementById('game').getBoundingClientRect();
    const nextWord = document.querySelector('.word.current')
    const letterRect = (nextLetter || nextWord).getBoundingClientRect();
    cursor.style.top = (letterRect.top - gameRect.top + 2) + 'px';
    if (nextLetter) {
        cursor.style.left = (letterRect.left - gameRect.left) + 'px';
    } else {
        cursor.style.left = (letterRect.right - gameRect.left) + 'px';
    }

})
document.getElementById('newGameBtn').addEventListener('click', ()=> {
    minusBtn.style.display = "block";
    plusBtn.style.display = "block"
    newGame()
})
newGame()