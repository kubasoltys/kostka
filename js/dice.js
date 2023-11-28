const dice = document.getElementById("dice");
const result = document.getElementById("result");
const play = document.getElementById("play");

const dice2 = document.getElementById("dice2");
const result2 = document.getElementById("result2");
const celkoveBody = document.getElementById("celkoveBody");

let roll = 0; // aktualní hod
let rolls = []; // pole všech hodů
let timer = false; // promenna je vypnuta

let roll2 = 0; // aktualní hod
let rolls2 = []; // pole všech hodů
let timer2 = false; // promenna je vypnuta

let bodyH = 0;
let bodyPC = 0;


play.addEventListener("click", function () {
    if (!timer) {
        timer = setInterval(function () {
            roll = Math.ceil(Math.random() * 6); // náhodný generátor čísel od 1 do 6, Math.ceil = zaokrouhluje nahoru
            dice.src = `img/kostka${roll}.png` // meni obrazky podle toho jaka hodnota byla vygenerovana
        }, 40)
    } else {
        clearInterval(timer);
        rolls.push(roll); // přenese promennou roll do pole rolls
        result.innerHTML = stats(); // vypise funkci stats do html
        timer = false;

    }
})

play.addEventListener("click", function () {
    if (!timer2) {
        timer2 = setInterval(function () {
            roll2 = Math.ceil(Math.random() * 6); // náhodný generátor čísel od 1 do 6, Math.ceil = zaokrouhluje nahoru
            dice2.src = `img/kostka${roll2}.png` // meni obrazky podle toho jaka hodnota byla vygenerovana
        }, 40)
    } else {
        clearInterval(timer2);
        rolls2.push(roll2); // přenese promennou roll do pole rolls
        result2.innerHTML = stats2(); // vypise funkci stats do html
        timer2 = false;

        if (roll > roll2) {
            bodyH++;
        } else if (roll2 > roll) {
            bodyPC++;
        }

        celkoveBody.innerHTML = body();

        if (bodyH >= 10 && bodyPC < 10) {
            celkoveBody.innerHTML += `<br><br><b>VYHRÁL SI!<br>Hra skončila.</b>`
        } else if (bodyPC >= 10 && bodyH < 10) {
            celkoveBody.innerHTML += `<br><br><b>PROHRÁL SI!<br>Hra skončila.</b>`
        }

        if (bodyH >= 10 || bodyPC >= 10) {
            play.style.display = "none";
        }

    }
})

function sum() {
    let s = 0;
    for (let i = 0; i < rolls.length; i++) { // prochazi pole
        s += rolls[i];
    }
    return s;
}

function sum2() {
    let s = 0;
    for (let i = 0; i < rolls2.length; i++) { // prochazi pole
        s += rolls2[i];
    }
    return s;
}

function stats() {
    let result = ""; // prazdny retezec
    result += `Aktuální hod: ${roll}<br>`
    result += `Archiv hodů: ${rolls}<br>`
    result += `Počet hodů: ${rolls.length}<br>` // vypise pocet indexu z pole
    result += `Součet hodů: ${sum()}<br>`
    result += `Průměr hodů: ${(sum() / rolls.length).toFixed(1)}<br>` // toFixed = nastavi jen jedno desetinne misto

    return result;
}

function stats2() {
    let result = ""; // prazdny retezec
    result += `Aktuální hod: ${roll2}<br>`
    result += `Archiv hodů: ${rolls2}<br>`
    result += `Počet hodů: ${rolls2.length}<br>` // vypise pocet indexu z pole
    result += `Součet hodů: ${sum2()}<br>`
    result += `Průměr hodů: ${(sum2() / rolls2.length).toFixed(1)}<br>` // toFixed = nastavi jen jedno desetinne misto

    return result;
}

function body() {
    let celkoveBody = "";
    celkoveBody += `<br>Počet bodů hráče: ${bodyH}<br>`
    celkoveBody += `Počet bodů počítače: ${bodyPC}<br>`
    return celkoveBody;
}