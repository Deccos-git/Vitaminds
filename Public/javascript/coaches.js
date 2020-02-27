
// Coaches inladen in overzicht

// db.collection("Vitaminders").where("Usertype", "==", "Coach")
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
        
//             //Waar de coachprofielen onder komen in de DOM
//         const overview = document.getElementById("overview");
//         const loader = document.getElementById("loader")

       
//             loader.style.display = "none"

//             //De coach-eigenschappen
//         const naam = doc.data().Gebruikersnaam;
//         const stijl = doc.data().Coachstijl
//         const omschrijving = doc.data().Omschrijving

//             // De nieuwe HTML-elementen en classes
//         const nieuweDiv = document.createElement("div");
//             nieuweDiv.setAttribute("class", "nieuweD")
//         const profielFoto = document.createElement("div")
//             profielFoto.setAttribute("class", "profielfotoCH")
//         const nieuweH3 = document.createElement("h3");
//             nieuweH3.setAttribute("class", "coachnaam");
//         const stijlCH = document.createElement("p")
//         const omschrijvingCH = document.createElement("h4");
//         const link = document.createElement("button");
//             link.setAttribute("class", "button-algemeen")
        
//             nieuweH3.addEventListener('click', (e) => {
//                 window.open("Vitaminders/" + [naam] + ".html", "_self");
//             })

//             link.addEventListener('click', (e) => {
//                 window.open("Vitaminders/" + [naam] + ".html", "_self");
//             })   
//             //De coach-eigenschappen in de nieuwe HTML-elementen zetten
//         nieuweH3.innerHTML = naam;
//         stijlCH.innerHTML = stijl;   
//         omschrijvingCH.innerHTML ='"' + omschrijving + '"'
//         link.innerHTML = "Bekijk mijn profiel"

//             //De HTML-elementen vastmaken aan de DOM
//         overview.appendChild(nieuweDiv)
//         nieuweDiv.appendChild(profielFoto)
//         nieuweDiv.appendChild(nieuweH3)
//         nieuweDiv.appendChild(stijlCH)
//         nieuweDiv.appendChild(omschrijvingCH)
//         nieuweDiv.appendChild(link)
    
//         })
//     }).catch((error) => {
//         console.log("Kan de coaches niet inladen: ", error);
//     }) 

//Filter
function filter(){

    // Coaches uitlezen
    db.collection("Vitaminders").where("Usertype", "==", "Coach").get().then((querySnapshot) => {
        querySnapshot.forEach( doc =>{

            const alleCategorie = doc.data().CoachCategorien
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

    const filters = {
        CoachCategorien: [],
        Locatie: [],
        Doelgroep: []
        }

    console.log(filters.CoachCategorien)

    const alleCategorieG =[];
    const alleLocatieG = [];
    const alleDoelgroepG = [];

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

    const dataSet = [];

    console.log(dataSet)

    console.log(Object.entries(dataSet));
    
    // console.log(dataSet[0][CoachCategorien])

    dataSet.forEach( data =>{
        console.log(data)
        if(!filters.CoachCategorien.includes(data.CoachCategorien)){
            console.log(data.Gebruikersnaam)
            }  
        })
}



// const locatie = doc.data().Locatie
// const doelgroep = doc.data().Doelgroep
// const CoachCategorien =  doc.data().CoachCategorien

// dataSet.push(
//     locatie,
//     doelgroep,
//     CoachCategorien

// const dataSet = [];

// function getFilterItems({
//     CoachCategorien, Locatie, Doelgroep}){
//         const filters = {
//             CoachCategorien: [],
//             Locatie: [],
//             Doelgroep: []
//         };

//         console.log(filters)
        
//         dataSet.forEach(data => {
//            if(!filters.CoachCategorien.includes(data.CoachCategorien)){
//                 filters.CoachCategorien.push(data.CoachCategorien)
//            }
//         })
//         return filters;        
// }

// db.collection("Vitaminders").where("Usertype", "==", "Coach").get().then((querySnapshot) => {
//     querySnapshot.forEach( doc =>{
//         dataSet.push(
//             doc.data()
//         );
//     });
//      console.log(getFilterItems({}))

// })