const loaderTemp = document.querySelector(".loader-template");
let loader = loaderTemp.content.cloneNode(true);


// ---------------- navigace

const navIcon = document.getElementById("menu-icon");

function respNav () {
    const navigace = document.getElementById("resp-nav");
    navigace.classList.toggle("active-nav");
    
    navIcon.classList.toggle("active-icon");
}

navIcon.addEventListener("click", respNav);


let navGenerator = document.querySelector(`[href="#generator"]`);
let navGallery = document.querySelector(`[href="#gallery"]`);

navGenerator.addEventListener("click", respNav);
navGallery.addEventListener("click", respNav);

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

// ----------------- zobrazit preview z template


let temp, tempItem, tempPreview;

temp = document.getElementsByTagName("template")[0];
tempItem = temp.content.querySelector("div.template");
// console.log(tempItem);

tempPreview = document.importNode(tempItem, true);
tempPreview.classList.add("preview");
document.getElementById("preview-orientation").appendChild(tempPreview);


// ---------------- konec zobrazaní preview z template


// začátek

const root = document.querySelector(":root");
const preview = document.querySelector("template"); /* ono to bere jen první .preview */
const generatorForm = document.getElementById("generator-form");
const calendar = document.querySelector(".preview__calendar");
const formYear = document.getElementById("form-year");
const formMonth = document.getElementById("form-month");
let previewYear = document.querySelector(".preview__name-of-year");
let orientationForm = document.querySelectorAll(`input[name="orientation"]`);
const previewOrientation = document.querySelector("#preview-orientation");
let formLanguages = document.querySelectorAll(`input[name="language"]`);
let daysOfWeekPreview = document.querySelectorAll(".day-of-week");
let previewMonth = document.querySelector(".preview__name-of-month");
const color = document.getElementById("input-color");
const formNotes = document.getElementById("form-notes");
const notes = document.querySelector(".preview__notes");
const formFonts = document.querySelectorAll(`input[name="font"]`);
const buttonYearText = document.querySelector("#button-year");
const buttonMonthText = document.querySelector("#button-month");

const nameOfMonths = {
            czech: ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"] ,
            dutch:  ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
            english: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
            }

const nameOfDaysOfWeek = {
            czech: ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"],
            dutch: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
            english: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            }

const nameOfNotes = {
            czech: "Poznámky",
            dutch: "Notities",
            english: "Notes"
            }

let previewLook = { 
    
        defaultYear: 2025,
        defaultMonth: "february",
        defaultColor : "#614FE8", // value color inputu vyžaduje hexa formát
        defaultOrientation : "portrait",
        defaultFont : "bitter",
        defaultLanguage : "czech",
        defaultNotes : "on",

        year: 2025,
        month: "february",

        setDefaultForm: function() {
            this.changeLanguage();
            this.changeYear();
            this.changeMonth();
            this.changeColor();
            this.changeNotes();
            this.changeFont();
            this.changeOrientation();
        },


        changeYear(e) {
            let selectedYear; 

            if (!e) {
                selectedYear = previewLook.defaultYear;
                previewYear.innerText = selectedYear;
                buttonYearText.innerText = selectedYear;
                renderingCal(true); // = načíst kalendář
                let option = document.querySelector(`option[value="${previewLook.defaultYear}"]`);
                option.setAttribute("selected", "");
            
            } else {
            selectedYear = parseInt(e.target.value);
            previewYear.innerText = selectedYear;
            buttonYearText.innerText = selectedYear;
            previewLook.year = selectedYear;
            renderingCal(false); // = znovu načíst kalendář
            }


            function renderingCal(isItFirstTime) {

           
                let daysBefore = yearsJS[previewLook.year][previewLook.month][1];
                //console.log(previewLook.year, previewLook.month, daysBefore);
                let days = yearsJS[previewLook.year][previewLook.month][2]; // potrebuju to nejak s this.year a this.month :/
                let daysAfter = yearsJS[previewLook.year][previewLook.month][3];

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

        changeMonth(e) {
            let selectedMonth; 

            if (!e) {
                selectedMonth = previewLook.defaultMonth;
                previewMonth.innerText = selectedMonth;
                buttonMonthText.innerText = selectedMonth;
                // renderingCal(true); // = načíst kalendář
                let option = document.querySelector(`option[value="${previewLook.defaultMonth}"]`);
                option.setAttribute("selected", "");
            
            } else {
            selectedMonth = e.target.value;
            previewMonth.innerText = selectedMonth;
            buttonMonthText.innerText = selectedMonth;
            previewLook.month = selectedMonth;
            // renderingCal(false); // = znovu načíst kalendář
            }

        },

        changeLanguage: function(e) {


            let language;
            if (!e) {
                language = previewLook.defaultLanguage;
                let lang = document.getElementById(previewLook.defaultLanguage);
                lang.setAttribute("checked", "");

            }  else {
               // language = e.path[0].id; - nefungovalo pro firefox
            language = e.target.id} // -> string
            
            changeMonth(language);
            changeWeek(language);

            changeNotesLang(language);

            function changeMonth(language) {
                previewMonth.innerHTML =  nameOfMonths[language][0]; // 
            }

            function changeWeek(language) {
                for(let i = 0; i < 7; i++) {
                daysOfWeekPreview[i].innerHTML = nameOfDaysOfWeek[language][i];
                }
            }   
            
            function changeNotesLang(language) {

                notes.innerHTML = `${nameOfNotes[language]}:`;
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

            let previewFont = document.getElementById("preview-container");

            if(!e) {
                let font = document.getElementById(previewLook.defaultFont);
                font.setAttribute("checked", "");
                previewFont.style.fontFamily = previewLook.defaultFont;

            } else {

                if (formFonts[1].checked) {
                    previewFont.style.fontFamily = `serif`;
                } else if (formFonts[2].checked) {
                    previewFont.style.fontFamily = `sans-serif`;
                }
                else if (formFonts[0].checked) {
                    previewFont.style.fontFamily = `bitter`;
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
formMonth.addEventListener("input", previewLook.changeMonth);
formLanguages.forEach((formLang) => {formLang.addEventListener("input", previewLook.changeLanguage)});
orientationForm.forEach((orient) => {orient.addEventListener("input", previewLook.changeOrientation)});
color.addEventListener("input", previewLook.changeColor);
formNotes.addEventListener("input", previewLook.changeNotes);
formFonts.forEach((font) => {font.addEventListener("input", previewLook.changeFont)});


// ---------------- konec





function handleSubmit(e) {
    e.preventDefault();

    // submit only for PC, not for phones (it is taking too long for phones to generate the planner): 

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        let alert = document.querySelector('#alertForPhones');
        alert.style.display = 'grid';
        alert.addEventListener('click', () => alert.style.display = 'none');
        return
      }


    //console.log("tadá event objekt" ,  e);
    document.getElementsByTagName("body")[0].appendChild(loader);
    document.querySelector(".loader-frame").classList.remove("loader-nonactive");

    const formEntries = new FormData(generatorForm).entries();
    const json = Object.assign(...Array.from(formEntries, ([x,y]) => ({[x]:y})));
    // console.log(new FormData(generatorForm)); // objekt, prototyp FormData
    // console.log(formEntries); // objekt, prototype Interator
    // console.log(Array.from(formEntries));
    //console.log("json", json); // objekt, prototype Object

    generatePlanner(json);
}



generatorForm.addEventListener("submit", handleSubmit);



function generatePlanner(json) {

//console.log(json.color);
//console.log(Object.keys(json).length); // když 5, tak to znamená, že není Notes // underfined v class OOP


    class Planner { // na pořadí u constructoru záleží
        constructor(year, month, color, orientation, language, font, notes) {
            this.year = year;
            this.month = month;
            this.color = color;
            this.orientation = orientation;
            this.font = font;
            this.language = language;
            this.notes = notes;
        }

        createPlanner() {


            //debugger;
           // console.log(this.year);

    
            let pageWidth;
            let pageHeight;

            if(this.orientation === "landscape") {
                    pageWidth = 297;
                    pageHeight = 210;
                } else {
                    pageWidth = 210;
                    pageHeight = 297;   
            }

            document.getElementById("preview-container").style.fontFamily = this.font;

            let  temp = document.getElementsByTagName("template")[0];            

            for(let i=0; i < 12; i++) {

                let cloneMonth, itemMonth;

                cloneMonth = temp.content.cloneNode(true);
                itemMonth = cloneMonth.querySelector(".template");
                itemMonth.classList.add("month");
                // itemMonth.style.scale = `2`; NENI RESENIM, PAC SE MENI RESPONZIVNE
              //  debugger;
                itemMonth.classList.add(`${nameOfMonths["english"][i]}`);
               // - místo toho je appenduju naráz přes jejich class měsíců ??

                let contentMonthName = itemMonth.querySelector("h3");
                contentMonthName.textContent = nameOfMonths[this.language][i];

                let contentYear = itemMonth.querySelector(".name-of-year");
                contentYear.textContent = this.year;

                let contentDaysName = itemMonth.querySelectorAll(".day-of-week");
                    for(let d = 0; d < 7; d++){
                    contentDaysName[d].textContent = nameOfDaysOfWeek[this.language][d];
                    }
          
                let contentNotes = itemMonth.querySelector(".preview__notes");
                      
                if (this.notes !== "on") {
                contentNotes.classList.add("no-notes");
                }


                // // potřebuju přiřadit ke každýmu tempMonth jinej měsíc - mám přes class ??

                // let monthCurrent = document.querySelectorAll(".month")[i];
                let calendarCurrent = itemMonth.querySelector(".calendar");
                // // console.log(monthCurrent);
                
                function generateNumbers (o, isGray){
                            
                    let day = document.createElement("span");
                    day.innerHTML = o;
                    day.classList.add("grid-child");

                    if(isGray){
                    day.classList.add("gray-numbers");
                    } else if(!isGray) {
                    day.classList.add("changing-color");
                    }        

                    calendarCurrent.appendChild(day);
                    //console.log(monthName, o); // CHYBA, KDYZ JE V ARRAY JEN JEDNO CISLO !!!!!!
                }


               
                
                    let monthName = nameOfMonths["english"][i];
                        // nebo přes class toho měsíce
                
                    //  console.log(year, notes, " funguje!");
                    
                    // console.log("zkouška" + i + years[`${selectedYear}`][`${monthName}`][1]); 
                
                    let daysBefore, days, daysAfter;

                    daysBefore = yearsJS[this.year][`${monthName}`][1];
                    days = yearsJS[this.year][`${monthName}`][2];
                    daysAfter = yearsJS[this.year][`${monthName}`][3]; //smyčku s vytvořením 
                        //kalendáře až po naplnění těchto variables
                   /* console.log(
                        daysBefore, days, daysAfter, monthName
                    );*/
                    
                        if (daysBefore.length == 1) {
                            generateNumbers(daysBefore[0], true);
                        } else {
                            for(let j = daysBefore[0]; j <= daysBefore[1]; j++) {
                                generateNumbers(j, true);
                                //console.log(monthName, j);
                            }
                        }

                        for(let k = days[0]; k <= days[1]; k++) {
                                generateNumbers(k, false);
                        }

                        if (daysAfter.length == 1) {
                            generateNumbers(daysAfter[0], true)
                        } else {
                            for(let m = daysAfter[0]; m <= daysAfter[1]; m++) {
                                generateNumbers(m, true);
                            }
                        }
                        
                

            

                 document.getElementById("preview-orientation").appendChild(cloneMonth); 
                    //*
            }
           
            

            /************ ASYNCHRONNÍ JS - MUSÍ BÝT KVŮLI HTML2CANVAS."AŽ JE FOR LOOP HOTOVÁ, UDĚLEJ TOHLE" přes if statement */
            let months = [];
            let renderingOptions = {backgroundColor: "#113", scale:1};
            let currentPlanner = new jsPDF({orientation: this.orientation, unit: "mm"});
            
            let monthsCurrent = document.querySelectorAll(".template.month");

            if (monthsCurrent.length === 12) {

                    for(let z = 0; z < 12; z++) {
                        let month = document.querySelectorAll(".month")[z]; // TOHLE MI MÁ DÁT <DIV> - potřebuju teda
                        // dopředu mít hotovejch 12 divů s class .month už v dokumentu
                        //console.log("wtf:   " + month);

                        html2canvas(month, renderingOptions)
                                .then(canvas => {
                                    let month__dataURL = canvas.toDataURL("image/png");
                                    months.push(month__dataURL); 
                                  //  console.log(months); // divný, že v console je v array rovnou 12 měsíců
                                    if (months.length == 12) { 
                                       // console.log("začátek druhýho promisu před druhou smyčkou");
                                        for(let j = 0; j < 12; j++) { /*tahle smyčka se renderuje neskutečně dlouho*/
                                            currentPlanner.addImage(months[j], `JPEG`, 0, 0, pageWidth, pageHeight);
                                            //console.log("druhý promis");
                                            if(j !== 11) {
                                                currentPlanner.addPage();}
                                            if(j == 11) {
                                                document.querySelector(".loader-frame").classList.add("loader-nonactive");
                                                currentPlanner.save(`planner.pdf`);
                                                /*a nakonec vymazat všechny .template.month kromě preview */
                                               monthsCurrent.forEach(month => month.remove());
                                               // a mozna vyresetovat nejaky variables, aby sel stahnout planner hned znovu?
                                               
                                            }
                                        } 
                                    }
                                }
                        )
                    }
            } 
            /****************** konec asynchronního JS, co mi vygeneruje 12stránkový pdf soubor*/
            
        }
    }

    let newPlanner = new Planner(...Object.values(json));
    console.log("newPlanner", newPlanner);
    newPlanner.createPlanner(); 
}

//---------- gallery 

let imagesList = document.querySelectorAll(".img-grid");



imagesList.forEach((img) => img.addEventListener("click", ()=> {
    let imgClone = img.cloneNode(true);
    imgClone.classList.add("imgOnClick");
    let pseudoEl = document.createElement("div");
    pseudoEl.classList.add("imgOnClickPseudo");
    document.body.appendChild(pseudoEl);
    pseudoEl.appendChild(imgClone);
    pseudoEl.addEventListener("click", ()=> {
        imgClone.remove();
        pseudoEl.remove()})
}));

// misto tohoto muzu mit element active-gallery-container, co bude na body, absolute position atd + defaultne display none / hidden
// Bude mit v sobe vsechny img i tlacitka, a 
// podle toho, co rozkliknes, tak se zmeni src img na ten aktivni src.
// pokud kliknes pak na cokoliv jineho nez na img, sipky, tak pujde active-gallery-container zpatky na display none



//--------- konec gallery


// --------- color picker - 

// mit barvy v hsl formatu -> and then transport into hexa format. Protoze Notes mas taky v ty barve, takze to chces mit jen tmave, mozna do pastelova
// nebo mit vlastni color picker slozeny jen z hezkych pastelovych tmavsich barev na <canvas>
// 

// --------- konec color picker

{/* fldssof jfodsfjdsfpjds sjdsfoj */}
