
// Coaches inladen in overzicht

db.collection("Vitaminders").where("Usertype", "==", "Coach")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        
            //Waar de coachprofielen onder komen in de DOM
        const overview = document.getElementById("overview");
        const loader = document.getElementById("loader")
       
            loader.style.display = "none"

            //De coach-eigenschappen
        const naam = doc.data().Gebruikersnaam;
        const stijl = doc.data().Coachstijl
        const omschrijving = doc.data().Omschrijving

            // De nieuwe HTML-elementen en classes
        const nieuweDiv = document.createElement("div");
            nieuweDiv.setAttribute("class", "nieuweD")
            nieuweDiv.setAttribute("data-name", naam)
        const profielFoto = document.createElement("div")
            profielFoto.setAttribute("class", "profielfotoCH")
        const nieuweH3 = document.createElement("h3");
            nieuweH3.setAttribute("class", "coachnaam");
        const stijlCH = document.createElement("p")
        const omschrijvingCH = document.createElement("h4");
        const link = document.createElement("button");
            link.setAttribute("class", "button-algemeen")
        
            nieuweH3.addEventListener('click', (e) => {
                window.open("Vitaminders/" + [naam], "_self");
            })

            link.addEventListener('click', (e) => {
                window.open("Vitaminders/" + [naam], "_self");
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
}).then(() => {
    




//Filter

const dataSet = [];

const filters = {
    CoachCategorien: [],
    Locatie: [],
    Doelgroep: []
    }

const filterValues = []

const alleCategorieG =[];
const alleLocatieG = [];
const alleDoelgroepG = [];

const button = document.getElementById("filter-button")
button.addEventListener("click", () => {

    const coachDOM = document.getElementsByClassName("nieuweD")
    const coachDOMarray = Array.from(coachDOM)

    coachDOMarray.forEach(C => {
        C.style.display = "flex"
    })

    // Coaches uitlezen
    db.collection("Vitaminders").where("Usertype", "==", "Coach")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            const alleCategorie = doc.data().Categorien
            alleCategorieG.push(alleCategorie);

            const alleLocatie = doc.data().Locatie
            alleLocatieG.push(alleLocatie);

            const alleDoelgroep = doc.data().Doelgroep
            alleDoelgroepG.push(alleDoelgroep)

            const data = doc.data()
            dataSet.push(data)
    
        })
    })    

    //Filters uitlezen
    const cat = document.getElementById("filterCoachCategorien")
                    const catOpties = cat.options;
                    let catSelect = catOpties[catOpties.selectedIndex].value;

    const inputDoelgroep = document.getElementById("filterDoelgroep")
                    const inputOptiesDD = inputDoelgroep.options;
                    let DDselect = inputOptiesDD[inputOptiesDD.selectedIndex].value;  

    const inputLocatie = document.getElementById("filterLocatie")
                    const inputOptiesLC = inputLocatie.options;
                    let LCselect = inputOptiesLC[inputOptiesLC.selectedIndex].value;

        // Alle opties uit filter vervangen voor alle opties uit database
    if (catSelect == "Alle thema's"){
        catSelect = alleCategorieG
    }

    if (DDselect == "Alle doelgroepen"){
        DDselect = alleDoelgroepG
    }

    if(LCselect == "Alle locaties")
        LCselect = alleLocatieG

    filters.CoachCategorien.push(catSelect)
    filters.Locatie.push(LCselect)
    filters.Doelgroep.push(DDselect)

    // Filteren
    const filtersValues = Object.values(filters)
    filtersValues.forEach(filter => {
        filter.forEach(filt => {
            if (typeof filt === 'object'){
            filt.forEach(fil => {
                const fi = String(fil)
                    filterValues.push(fi)
                })
            } else {
                filterValues.push(filt)
            }
        })
    })

    dataSet.forEach(data =>{
        if(!filterValues.includes(data.Locatie, data.Doelgroep)){

            const filterCoach = data.Gebruikersnaam

            db.collection("Vitaminders").where("Gebruikersnaam", "==", filterCoach)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const username = doc.data().Gebruikersnaam

                    coachDOMarray.forEach(CD => {
                    
                    const coachData = CD.dataset.name
                    console.log(username)
                    console.log(coachData)
                    

                    if(coachData == username){
                        console.log("iets?")
                            CD.style.display = "none"

                        } else {
                            console.log("niets")
                        }
                    })
                })
            })
        }  
    })
})
}) 


