
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
    }).catch((error) => {
        console.log("Kan de coaches niet inladen: ", error);
    }) 


//Filter
const inputCoachCategorien = document.getElementById("filterCoachCategorien")
                 const inputOptiesCC = inputCoachCategorien.options;
                 const inputSelectCC = inputOptiesCC[inputOptiesCC.selectedIndex].value;    

const inputDoelgroep = document.getElementById("filterDoelgroep")
                 const inputOptiesDD = inputDoelgroep.options;
                 const inputSelectDD = inputOptiesDD[inputOptiesDD.selectedIndex].value;    

const inputLocatie = document.getElementById("filterLocatie")
                 const inputOptiesLC = inputLocatie.options;
                 const inputSelectLC = inputOptiesLC[inputOptiesLC.selectedIndex].value;   

const dataSet = [];

function getFilterItems({
    CoachCategorien, Locatie, Doelgroep}){
        const filters = {
            CoachCategorien: [],
            Locatie: [],
            Doelgroep: []
        };
        
        dataSet.forEach(data => {
           if(!filters.CoachCategorien.includes(data.CoachCategorien)){
                filters.CoachCategorien.push(data.CoachCategorien)
           }
        })
        return filters;        
}

db.collection("Vitaminders").where("Usertype", "==", "Coach").get().then((querySnapshot) => {
    querySnapshot.forEach( doc =>{
        dataSet.push(
            doc.data()
        );
    });
     console.log(getFilterItems({}))
})