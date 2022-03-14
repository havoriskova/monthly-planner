
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

// začátek

const root = document.querySelector(":root");
const preview = document.getElementById("preview");
const generatorForm = document.getElementById("generator-form");
const calendar = document.getElementById("calendar");
const formYear = document.getElementById("form-year");
let previewYear = document.getElementById("name-of-year");
let orientationForm = document.querySelectorAll(`input[name="orientation"]`);
const previewOrientation = document.querySelector("#preview-orientation");
let formLanguages = document.querySelectorAll(`input[name="language"]`);
let daysOfWeekPreview = document.querySelectorAll(".day-of-week");
let previewMonth = document.getElementById("name-of-month");
const color = document.getElementById("input-color");
const formNotes = document.getElementById("form-notes");
const notes = document.getElementById("notes");
const formFonts = document.querySelectorAll(`input[name="font"]`);



let previewLook = { 
    
        defaultYear: 2025,
        defaultColor : "#008800", // value color inputu vyžaduje hexa formát
        defaultOrientation : "portrait",
        defaultFont : "bitter",
        defaultLanguage : "czech",
        defaultNotes : "on",

        setDefaultForm: function() {
            this.changeLanguage();
            this.changeYear();
            this.changeColor();
            this.changeNotes();
            this.changeFont();
            this.changeOrientation();
        },


        changeYear: function(e) {
            let selectedYear; 

            if (!e) {
                selectedYear = previewLook.defaultYear;
                previewYear.innerText = selectedYear;
                fetching(true); // = načíst kalendář
                let option = document.querySelector(`option[value="${previewLook.defaultYear}"]`);
                option.setAttribute("selected", "");
            
            } else {
            selectedYear = parseInt(e.target.value);
            previewYear.innerText = selectedYear;
            fetching(false); // = znovu načíst kalendář
            }


            function fetching(isItFirstTime) {

            fetch("https://hungry-mirzakhani-0f7c44.netlify.app/years.json")   // netlify https://hungry-mirzakhani-0f7c44.netlify.app/years.json // http://127.0.0.1:8887/years.json "200 ok" // 5500 live server // app.js 3000
            .then(response => {
                return response.json();
            })
            .then(jsondata => useData(jsondata, isItFirstTime));
            }


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
        },

        changeLanguage: function(e) {

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


            let language;
            if (!e) {language = previewLook.defaultLanguage;
            let lang = document.getElementById(previewLook.defaultLanguage);
            lang.setAttribute("checked", "");

            }  else {language = e.path[0].id} // -> string
            
            changeMonth(language);
            changeWeek(language);

                function changeMonth(language) {
                previewMonth.innerHTML =  months[language][0]; 
                }

                function changeWeek(language) {
                for(let i = 0; i < 7; i++) {
                daysOfWeekPreview[i].innerHTML = daysOfWeek[language][i];
                }
                }       

        },

        changeColor: function(e) {
            if(!e) {
                root.style.setProperty(`--color-for-preview`, previewLook.defaultColor);
                color.setAttribute("value", `${previewLook.defaultColor}`);
            } else {
                root.style.setProperty(`--color-for-preview`, e.target.value);
            color.setAttribute("value", e.target.value)}
        },

        changeOrientation: function(e) {
            if (!e && previewLook.defaultOrientation === "landscape") {
                // v CSS mám defaultně nastavený class landscape na preview

                let orient = document.getElementById(previewLook.defaultOrientation);
                orient.setAttribute("checked", "");

            } else if (!e && previewLook.defaultOrientation === "portrait") {

                let orient = document.getElementById(previewLook.defaultOrientation);
                orient.setAttribute("checked", "");

                previewOrientation.classList.toggle("orientation-landscape");    
                previewOrientation.classList.toggle("orientation-portrait"); 
            
            } else {

                previewOrientation.classList.toggle("orientation-landscape");    
                previewOrientation.classList.toggle("orientation-portrait"); 
            }
        },

        changeFont: function(e) {

            if(!e) {
                let font = document.getElementById(previewLook.defaultFont);
                font.setAttribute("checked", "");
                preview.style.fontFamily = previewLook.defaultFont;

            } else {

                if (formFonts[1].checked) {
                    preview.style.fontFamily = `serif`;
                } else if (formFonts[2].checked) {
                    preview.style.fontFamily = `sans-serif`;
                }
                else if (formFonts[0].checked) {
                    preview.style.fontFamily = `bitter`;
                } }
        },

        changeNotes: function(e){
            if(!e && previewLook.defaultNotes == "on") {
            formNotes.setAttribute("checked", "");
            notes.classList.remove("no-notes");
            } else {
            
            notes.classList.toggle("no-notes");}
        }

        }


 //--------------


previewLook.setDefaultForm(); // ten zahrnuje všechny initial calls

formYear.addEventListener("input", previewLook.changeYear);
formLanguages.forEach(formLang => formLang.addEventListener("input", previewLook.changeLanguage));
orientationForm.forEach(orient => orient.addEventListener("input", previewLook.changeOrientation));
color.addEventListener("input", previewLook.changeColor);
formNotes.addEventListener("input", previewLook.changeNotes);
formFonts.forEach(font => font.addEventListener("input", previewLook.changeFont));


// ---------------- konec





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

//console.log(json.color);
//console.log(Object.keys(json).length); // když 5, tak to znamená, že není Notes // underfined v class OOP


    class Planner { // na pořadí u constructoru záleží
        constructor(year, color, orientation, font, language, notes) {
            this.year = year;
            this.color = color;
            this.orientation = orientation;
            this.font = font;
            this.language = language;
            this.notes = notes;
        }

        createPlanner() {
            console.log(this.year);
        }

  
    }

    let newPlanner = new Planner(...Object.values(json));
    console.log("newPlanner", newPlanner);
    newPlanner.createPlanner(); // po vytvoření planneru můžu vyvolat funkci create
    // můžu další funkci "stáhnout" vyvolat buď dalším řádkem, a nebo přímo v té funkci create

    
    // a nakonec funkce na download vytvořeného souboru
}