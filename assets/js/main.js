"use strict"

// Variables

let letters = 'abcdefghijklmnopqrstuvwxyz';
let categoryName = document.querySelector(".category-name");
let categorySelect = document.querySelector('#categorySelect');
let randomWord = document.querySelector('.random-word');
let hintBtn = document.querySelector('.hint-btn');
let hintText = document.querySelector('.hint-text span');
let livesSection = document.querySelector('.lives');
let lives = 9;
let guessedWords = [];
let attacks = [];

livesSection.innerHTML = `You have ${lives} lives`;

// Creating letter buttons

for (let letter of letters) {
    let x = document.createElement('button');
    x.innerHTML = letter;
    document.querySelector('#letter').append(x);
}

// Word categories

let categories = {
    planet:
        [
            {
                name: 'mercury',
                explanation: 'First planet'
            },
            {
                name: 'venus',
                explanation: 'Second planet'
            },
            {
                name: 'earth',
                explanation: 'Third planet'
            },
            {
                name: 'mars',
                explanation: 'Fourth planet'
            },
            {
                name: 'jupiter',
                explanation: 'Fifth planet'
            },
            {
                name: 'saturn',
                explanation: 'Sixth planet'
            },
            {
                name: 'uranus',
                explanation: 'Seventh planet'
            },
            {
                name: 'neptune',
                explanation: 'Eighth planet'
            },
            {
                name: 'pluto',
                explanation: 'Nineth planet'
            },
        ],
    movies:
        [
            {
                name: 'green mile',
                explanation: 'Drama movie'
            },
            {
                name: 'pianist',
                explanation: 'Jew movie'
            },
            {
                name: 'avatar',
                explanation: 'Sci-fi movie'
            },
        ],
    color:
        [
            {
                name: 'blue',
                explanation: 'Color of the sky'
            },
            {
                name: 'red',
                explanation: 'Color of the blood'
            },
            {
                name: 'green',
                explanation: 'Color of the grassF'
            },
        ]
}

// Creating category option for select box

let categoryArr = Object.keys(categories);

for (let category of categoryArr) {
    let option = document.createElement('option');
    option.innerHTML = category;
    categorySelect.append(option);
    option.value = category;
}

// Select the random word

let randomCompWord = arr => {
    let randomNum = Math.floor(Math.random() * arr.length);
    return arr[randomNum].name;
}

categorySelect.addEventListener("change", function () {

    let selected = categorySelect.value;
    categoryName.innerHTML = `The chosen category is ${selected}`;

    let word = randomCompWord(categories[selected]);
    randomWord.style.visibility = "visible";

    hintBtn.addEventListener("click", function () {
        hintText.innerHTML = categories[selected].find(item => item.name === word).explanation;
    });

    if (word.indexOf(" ") >= 0) {

        let spaceWord = word.split(" ");
        let newWord = spaceWord.map(item => "_".repeat(item.length));
        randomWord.innerHTML = newWord.join(" ");

    } else {
        randomWord.innerHTML = "_".repeat(word.length);
    }

    function startGame(e) {

        let btn = document.querySelectorAll("#letter button");

        let userAttack = e.key.toLowerCase();

        let compAttack = word;
        console.log(compAttack);

        for (let i = 0; i < btn.length; i++) {
            if (btn[i].textContent == userAttack) {
                if (compAttack.indexOf(userAttack) !== -1) {
                    btn[i].style.backgroundColor = "#50C878";
                } else {
                    btn[i].style.backgroundColor = "gray";
                }

            }
        }

        if (letters.indexOf(userAttack) === -1) {
            alert('Please click any letter');
            return
        }
        else {
            if (attacks.indexOf(userAttack) === -1) {
                attacks.push(userAttack);

                if (compAttack.indexOf(userAttack) !== -1) {
                    if (lives > 0) {
                        var indices = [];
                        for (var i = 0; i < compAttack.length; i++) {
                            if (compAttack[i] === userAttack) indices.push(i);
                        }
                        var str = randomWord.textContent;

                        str = str.split('');

                        for (let index of indices) {
                            str[+index] = userAttack;
                        }

                        str = str.join('');

                        randomWord.innerHTML = str;

                        if (str === compAttack) {
                            livesSection.innerHTML = `<span class="text-success" style="font-size: 60px">YOU WIN</span>`;
                            document.querySelector('.win-section').style.display = "flex";
                            for (let i = 1; i <= 9; i++) {
                                document.querySelector('.man' + i).style.display = "block";
                                document.querySelector('.man' + i).style.marginTop = "60px";
                            }
                            document.querySelector('.man8').style.marginTop = "0px";
                            document.querySelector('.sad').style.display = "none";
                            document.querySelector('.smile').style.display = "block";
                            document.querySelector('.man7').style.display = "none";
                            document.querySelector('.thank-img').style.display = "block";
                            return;
                        }
                    }
                }
                else {
                    if (lives > 0) {
                        lives--;
                        document.querySelector('.man' + (lives + 1)).style.display = "block";
                        livesSection.innerHTML = `You have ${lives} lives`;

                    } else {
                        livesSection.innerHTML = `<span class="text-danger" style="font-size: 60px">Game over</span>`;
                        return;
                    }

                }
            }
        }
    }
    window.onkeypress = startGame;
});