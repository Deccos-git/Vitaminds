
document.body.addEventListener('click', () => {
    db.collection("Vitaminders").where("Locatie", "==", 'Meppel').then(console.log);
});

// Coaches inladen in overzicht

db.collection("Vitaminders").where("Usertype", "==", "Coach")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        
            //Waar de coachprofielen onder komen in de DOM
        const overview = document.getElementById("overview");

            //De coach-eigenschappen
        const naam = doc.data().Gebruikersnaam;
        const stijl = doc.data().Coachstijl
        const omschrijving = doc.data().Omschrijving

            // De nieuwe HTML-elementen en classes
        const nieuweDiv = document.createElement("div");
            nieuweDiv.setAttribute("class", "nieuweD")
        const profielFoto = document.createElement("div")
            profielFoto.setAttribute("class", "profielfotoCH")
        const nieuweH3 = document.createElement("h3");
            nieuweH3.setAttribute("class", "coachnaam");
        const stijlCH = document.createElement("p")
        const omschrijvingCH = document.createElement("h4");
        const link = document.createElement("button");
            link.setAttribute("class", "button-algemeen")
        
            nieuweH3.addEventListener('click', (e) => {
                window.open("Vitaminders/" + [naam] + ".html", "_self");
            })

            link.addEventListener('click', (e) => {
                window.open("Vitaminders/" + [naam] + ".html", "_self");
            })   
            //De coach-eigenschappen in de nieuwe HTML-elementen zetten
        nieuweH3.innerHTML = naam;
        stijlCH.innerHTML = stijl;   
        omschrijvingCH.innerHTML ='"' + omschrijving + '"'
        link.innerHTML = "Bekijk mijn profiel"

            //De HTML-elementen vastmaken aan de DOM
        overview.appendChild(nieuweDiv)
        nieuweDiv.appendChild(profielFoto)
        nieuweDiv.appendChild(nieuweH3)
        nieuweDiv.appendChild(stijlCH)
        nieuweDiv.appendChild(omschrijvingCH)
        nieuweDiv.appendChild(link)
    
        })
    }).catch(function(error) {
        console.log("Kan de coaches niet inladen: ", error);
    }) 


//Filter
function zoek(){
const stad = document.getElementById("filterStad");
const stadOpties = stad.options;
const stadSelect = stadOpties[stadOpties.selectedIndex].value;

const thema = document.getElementById("filterThema");
const themaOpties = thema.options;
const themaSelect = themaOpties[themaOpties.selectedIndex].value;

const doelgroep = document.getElementById("filterDoelgroep");
const doelgroepOpties = doelgroep.options;
const doelgroepSelect = doelgroepOpties[doelgroepOpties.selectedIndex].value;

if (stadSelect == "Null", themaSelect == "Null" , doelgroepSelect == "Null"){
    db.collection("Vitaminders").where("Type", '==', "Coach")
} else {

db.collection("Vitaminders").where("Locatie", "==", stadSelect)
.where("CoachCategorien", "==", themaSelect)
.where("Doelgroep", "==", doelgroepSelect)
.get()
.then(querySnapshot => {
    querySnapshot.forEach(doc => {

        console.log(doc)

        if(doc.exists){

        //Waar de coachprofielen onder komen in de DOM
        const overview = document.getElementById("overview");

            //De coach-eigenschappen
        const naam = doc.data().Gebruikersnaam;
        const stijl = doc.data().Coachstijl
        const omschrijving = doc.data().Omschrijving

            // De nieuwe HTML-elementen en classes
        const filterDiv = document.createElement("div");
            filterDiv.setAttribute("class", "nieuweD")
        const profielFoto = document.createElement("div")
            profielFoto.setAttribute("class", "profielfotoCH")
        const nieuweH3 = document.createElement("h3");
            nieuweH3.setAttribute("class", "coachnaam");
        const stijlCH = document.createElement("p")
        const omschrijvingCH = document.createElement("h4");
        const link = document.createElement("button");
            link.setAttribute("class", "button-algemeen")
        
            nieuweH3.addEventListener('click', (e) => {
                window.open("Vitaminders/" + [naam] + ".html", "_self");
            })

            link.addEventListener('click', (e) => {
                window.open("Vitaminders/" + [naam] + ".html", "_self");
            })   

            //De coach-eigenschappen in de nieuwe HTML-elementen zetten
        nieuweH3.innerHTML = naam;
        stijlCH.innerHTML = stijl;   
        omschrijvingCH.innerHTML ='"' + omschrijving + '"'
        link.innerHTML = "Bekijk mijn profiel"

            //Oude div verwijderen
        const oudeDiv = document.querySelectorAll(".nieuweD")
        oudeDiv.forEach(D =>{
            D.style.display = "none"
        })

            //De HTML-elementen vastmaken aan de DOM
        overview.appendChild(filterDiv)
        filterDiv.appendChild(profielFoto)
        filterDiv.appendChild(nieuweH3)
        filterDiv.appendChild(stijlCH)
        filterDiv.appendChild(omschrijvingCH)
        filterDiv.appendChild(link)

        }else{
            const oudeDiv = document.querySelectorAll(".nieuweD")
        oudeDiv.forEach(D =>{
            D.style.display = "none"
            
        })
        }
        })
    
    }).catch(function(error) {
        console.log("Kan de coaches niet inladen: ", error);
    })
}
};
