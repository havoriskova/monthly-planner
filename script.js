
// ---------------- navigace

const navIcon = document.getElementById("menu-icon");

function respNav () {
    const navigace = document.getElementById("resp-nav");
    navigace.classList.toggle("active-nav");
    
    navIcon.classList.toggle("active-icon");
}

navIcon.addEventListener("click", respNav);

// --------------- konec navigace

// ---------------- text-change - innerHTML "on the left" -> "down below" od 900px 

// + přes event se text mění až při ZMĚNĚ šířky - proto 
//ještě if statement mimo funkci
// ZÁROVEŇ nastavení výšky 100vh na main - pokud se viewport změní, už na tu výšku nebude mít vliv

const textChange = document.getElementById("text-change");
const main = document.querySelector("main");
let media = window.matchMedia(`(max-width:900px)`);

function changeText(e) {
if (e.matches){
    textChange.innerHTML = "down below";
    main.style.height = `auto`;
} else {
textChange.innerHTML = "on the left side";
 if (window.innerHeight > 700) {
    main.style.height=`${window.innerHeight}px`;
    console.log(window.innerHeight);
    } else {
    main.style.height = `700px`;
}}

console.log("funguje to!");
}

media.addEventListener("change", changeText);

if (media.matches){
    textChange.innerHTML = "down below";
    main.style.height = `auto`;
    
} else {
    if (window.innerHeight > 700) {
    main.style.height=`${window.innerHeight}px`;
    console.log(window.innerHeight);
    } else {
    main.style.height = `700px`;
}
}

//media.addEventListener("change", ({media, matches}) => console.log(media,matches));

// ---------------- konec text-change
// ---------------- konec nastavení výšky




// ---------------- JSON - díky chrom extension "Web server for chrome" mám lokální server, na kterém je i lokální json soubor, a díky tomu ho můžu využít 
// - bez serveru bych lokální .json soubor nemohla použít (musela bych data mít v .js souboru)

// JSON.parse(years); - JSON string to object
// JSON.stringify(něco) - z klasického js objektu/array udělá JSON string

// vygenerovat kalendář přímo v js - kvůli počtu řádků

const calendar = document.getElementById("calendar");
const [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12] = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const formYear = document.getElementById("form-year");

let selectedYear = 2022; // defaultně

function changeYear(e) {
    console.log(formYear.getElementsByTagName("option")[0].value); // mi dá rok podle indexu
    console.log("selected!");
    console.log(e.target.value);
    selectedYear = parseInt(e.target.value);
    console.log(selectedYear); // mi dá číslo roku, který můžu poslat do funkce useData??
    // rovnou udělat OOP objekt pro form pro větší přehlednost? Funkce changeYear, do
    // která by přijímala parametry pro rok a json - tj. jen změnit funkci useData ??
    fetching(false);
}

formYear.addEventListener("input", changeYear);


function fetching(isItFirstTime) {

fetch("http://localhost:3000/years.json")   // http://127.0.0.1:8887/years.json takhle to bylo za použítí "200 ok"
.then(response => {
    return response.json();
})
.then(jsondata => useData(jsondata, isItFirstTime));
}

fetching(true);

function useData(years, isItFirstTime) { // navíc parametr pro rok !! + když není parametr přidán, jaké je defaultní chování??
    console.log(years);
    // console.log(`${years[2022]}.${m1}[1]`); NOT WORKING
    // console.log(m1); 
    console.log(isItFirstTime);


// let weeks = years[2022].january[0]; - díky gridu nepotřebuju
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
            debugger;
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
// let elChangingColor = document.querySelectorAll(".changing-color");
const root = document.querySelector(":root");

function changeColor(e) {
    console.log(e.target.value);
    // console.log(elChangingColor);

    // elChangingColor.forEach(el => el.style.color = e.target.value);
    var rootStyles = getComputedStyle(root);
    var color = rootStyles.getPropertyValue('--color-for-preview');
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

function changeOrientation() {
preview.classList.toggle("orientation-landscape");    
preview.classList.toggle("orientation-portrait");

if(preview.classList.contains("orientation-landscape")) {
    document.getElementById("preview-container").style.placeItems = "stretch";
} else {
    document.getElementById("preview-container").style.placeItems = "center";
}
}

orientationForm.forEach(orient => orient.addEventListener("input", changeOrientation));

if(preview.classList.contains("orientation-landscape")) {
    document.getElementById("preview-container").style.placeItems = "stretch";
} else {
    document.getElementById("preview-container").style.placeItems = "center";
}


// ---------------- konec orientation

// ---------------- defaultní values pro form, musí být až dole po všech funkcích
function setDefaultForm() {
    changeMonth("english");
    changeWeek("english");
}

setDefaultForm();
// ---------------- konec nastavení defaultu 