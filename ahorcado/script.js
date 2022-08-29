const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');


var API;
var numaleahasta3 = Math.ceil(Math.random()*3);
var selectedWord;
var usedLetters;
var newLetter;
var mistakes;
var hits;


const cargarpalabras = async() => {

   const respuesta = await fetch('https://puzzle.mead.io/puzzle?wordCount='+ numaleahasta3);
   console.log(respuesta)
   const datos = await respuesta.json();
   console.log(datos.puzzle);
   API = [datos.puzzle];
}

const letterEvent = event => {
    newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[A-Za-z0-9\s]+$/g) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const selectRandomWord = () => {
    let word = API[0].toUpperCase();
    selectedWord = word.split('');
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};


const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};


const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
			children[i].classList.toggle('letter');
	        children[i].classList.toggle('lettera');
            hits++;
        }
		
    }
    if(hits === selectedWord.length) endGame();
}

const wrongLetter = () => {
	  if(!selectedWord.includes(newLetter)){
		mistakes++;
	}   
	document.getElementById("intentos").innerHTML = 6-mistakes;
    if(mistakes === 6) endGame();
	
}

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
} 	

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
	if(mistakes === 6){
	document.getElementById("texto").innerHTML = 'Buen intento, la palabra era: ' + API;
	document.getElementById("intentos").innerHTML = ''	
	} else
	{
	document.getElementById("texto").innerHTML = 'Buen trabajo! has adivinado la palabra';
	document.getElementById("intentos").innerHTML = ''
	}
	cargarpalabras();
}


const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
	numaleahasta3 = Math.ceil(Math.random()*3);
    selectRandomWord();
    drawWord();
	document.getElementById("startButton").innerHTML = 'reset'
    document.addEventListener('keydown', letterEvent);
	document.getElementById("intentos").innerHTML = 6;
	document.getElementById("texto").innerHTML = 'Intentos restantes:';
	startButton.style.display = 'block';
	
};

startButton.addEventListener('click', startGame);
cargarpalabras();
