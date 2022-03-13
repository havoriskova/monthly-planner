
// ---------------- navigace

const navIcon = document.getElementById("menu-icon");

function respNav () {
    const navigace = document.getElementById("resp-nav");
    navigace.classList.toggle("active-nav");
    
    navIcon.classList.toggle("active-icon");
}

navIcon.addEventListener("click", respNav);

// --------------- konec navigace

//------navigace s eventem na scroll nahoru - že se zobrazí fixed ?

// --------------- konec navigace scroll fixed

// ---------------- text-change - innerHTML "on the left" -> "down below" od 900px 

const textChange = document.getElementById("text-change");

let media = window.matchMedia(`(max-width:900px)`);

function changeText(e) {
if (e.matches){
     textChange.innerHTML = "down below";
 } else {
 textChange.innerHTML = "on the left side";

 }
}

media.addEventListener("change", changeText);

 if (media.matches){ // initial call
 textChange.innerHTML = "down below";
 }

// ---------------- konec text-change

// výška sekce na available výšku:

function changeWidth() {

const main = document.querySelector("main");

let myHeight = window.screen.availHeight;

if(window.innerWidth > 900) {
main.style.height= `${myHeight-110}px`;
} else {
    main.style.height= "min-content";
}
}

window.addEventListener("resize", changeWidth);

changeWidth();
// ---------------- konec nastavení výšky


// ---------------- JSON - vygenerovat kalendář přímo v js kvůli počtu řádků

const calendar = document.getElementById("calendar");
const [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12] = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const formYear = document.getElementById("form-year");
let previewYear = document.getElementById("name-of-year");

let selectedYear = 2022; // defaultně

function changeYear(e) {
 
    selectedYear = parseInt(e.target.value);
    previewYear.innerText = selectedYear;
    fetching(false);
}

formYear.addEventListener("input", changeYear);

function fetching(isItFirstTime) {
fetch("http://localhost:3000/years.json") // app.js  http://localhost:3000/years.json 
// netlify https://hungry-mirzakhani-0f7c44.netlify.app/years.json
.then(response => {
    return response.json();
})
.then(jsondata => useData(jsondata, isItFirstTime));
}

fetching(true); //initial call

function useData(years, isItFirstTime) {

let daysBefore = years[`${selectedYear}`].january[1];
let days = years[`${selectedYear}`].january[2];
let daysAfter = years[`${selectedYear}`].january[3];

if (!isItFirstTime) {calendar.innerHTML= ``;}

    for(let i = daysBefore[0]; i <= daysBefore[1]; i++) {
        generateNumbers(i, true);
    }

    for(let i = days[0]; i <= days[1]; i++) {
        generateNumbers(i, false);
    }

    for(let i = daysAfter[0]; i <= daysAfter[1]; i++) {
      generateNumbers(i, true);
    }
}


function generateNumbers (i, isGray){
    
    let day = document.createElement("span");
        day.innerHTML = i;
        calendar.appendChild(day);
        day.classList.add("grid-child");

        if(isGray){
        day.classList.add("gray-numbers");
    } else if(!isGray) {
        day.classList.add("changing-color");
        }
   

}

// ---------------- konec JSON


// ---------------- jak stáhnout pdf  - MDN Blob
// let href = URL.createObjectURL(new Blob([], {type: "application/pdf"}));
// to mi hodí http adresu, na které bude ten soubor ke stažení
// po použití linku je dobré link smazat URL.revokeObjectURL(href);

// ---------------- konec jak stáhnout pdf


// ---------------- FORM - notes

const formNotes = document.getElementById("form-notes");
const notes = document.getElementById("notes");

function changeNotes(e) {
notes.classList.toggle("no-notes");
}

formNotes.addEventListener("input", changeNotes);

// ---------------- konec notes

// ---------------- FORM - font 

const preview = document.getElementById("preview");
const formFonts = document.querySelectorAll(`input[name="font"]`);

function changeFont(e) {

if (formFonts[1].checked) {
    preview.style.fontFamily = `serif`;
} else if (formFonts[2].checked) {
    preview.style.fontFamily = `sans-serif`;
}
else if (formFonts[0].checked) {
    preview.style.fontFamily = `Bitter`;
}
}

formFonts.forEach(font => font.addEventListener("input", changeFont));

// ---------------- konec font

// ---------------- FORM - color BOOOM

const color = document.getElementById("color");
const root = document.querySelector(":root");

function changeColor(e) {
    root.style.setProperty(`--color-for-preview`, e.target.value);
}

color.addEventListener("input", changeColor);

// ---------------- konec color

// ---------------- FORM - language

let formLanguages = document.querySelectorAll(`input[name="language"]`);
let daysOfWeekPreview = document.querySelectorAll(".day-of-week");

const months = {
 czech: ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"] ,
 dutch:  ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
 english: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
}

const daysOfWeek = {
 czech: ["pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota", "neděle"],
 dutch: ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"],
 english: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
}

function changeMonth(lang) {
let previewMonth = document.getElementById("name-of-month");

previewMonth.innerHTML =  months[lang][0]; 
}

function changeWeek(lang) {

for(let i = 0; i < 7; i++) {
daysOfWeekPreview[i].innerHTML = daysOfWeek[lang][i];
}
}

function changeLanguage(e) {
let language = e.path[0].id; // language je string

changeMonth(language);
changeWeek(language);
}

formLanguages.forEach(formLang => formLang.addEventListener("input", changeLanguage));

// ---------------- konec language

// ---------------- FORM orientation - toggle .orientation-portrait
let orientationForm = document.querySelectorAll(`input[name="orientation"]`);
const previewOrientation = document.querySelector("#preview-orientation");

function changeOrientation() {
previewOrientation.classList.toggle("orientation-landscape");    
previewOrientation.classList.toggle("orientation-portrait");
}

orientationForm.forEach(orient => orient.addEventListener("input", changeOrientation));

// ---------------- konec orientation

// ---------------- defaultní values pro form, musí být až dole po všech funkcích
function setDefaultForm() {
    changeMonth("english");
    changeWeek("english");
}

setDefaultForm();
// ---------------- konec nastavení defaultu 


const generatorForm = document.getElementById("generator-form");

function handleSubmit(e) {
 e.preventDefault();
 console.log("tadá event objekt" ,  e);

const formEntries = new FormData(generatorForm).entries();
const json = Object.assign(...Array.from(formEntries, ([x,y]) => ({[x]:y})));
// console.log(new FormData(generatorForm)); // objekt, prototyp FormData
// console.log(formEntries); // objekt, prototype Interator
// console.log(Array.from(formEntries));
console.log("json", json); // objekt, prototype Object

generatePlanner(json);
}

generatorForm.addEventListener("submit", handleSubmit);



function generatePlanner(json) {

console.log(json.color);
console.log(Object.keys(json).length); // když 5, tak to znamená, že není Notes // underfined v class OOP


    class Planner { // na pořadí u constructoru záleží
        constructor(year, color, orientation, font, language, notes) {
            this.year = year;
            this.color = color;
            this.orientation = orientation;
            this.font = font;
            this.language = language;
            this.notes = notes;
        }

        createPlanner = function() {
            console.log(this.year, newPlanner.year);
}
    }

    let newPlanner = new Planner(...Object.values(json));
    console.log("newPlanner", newPlanner);
    newPlanner.createPlanner();

    // a nakonec funkce na download vytvořeného souboru
}