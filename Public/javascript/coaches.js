
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
        const stijl = doc.data().Coachingstyle
        const omschrijving = doc.data().Why
        const profilePic = doc.data().Profielfoto
        const locatie = doc.data().City

        const naamClean = doc.data().GebruikersnaamClean;

            // De nieuwe HTML-elementen en classes
        const nieuweDiv = document.createElement("div");
            nieuweDiv.setAttribute("class", "nieuweD")
            nieuweDiv.setAttribute("data-name", naam)
        const backgroundDiv = document.createElement("div")
            backgroundDiv.setAttribute("class", "background-div")
        const profielFoto = document.createElement("div")
            profielFoto.setAttribute("class", "profielfotoCH")
        const nieuweH3 = document.createElement("h3");
            nieuweH3.setAttribute("class", "coachnaam");
        const stijlCH = document.createElement("p")
        const locatieDiv = document.createElement("div")
            locatieDiv.setAttribute("class", "locatie-div")
        const pinImageDiv = document.createElement("div")
            pinImageDiv.setAttribute("class", "pin-image-div")
            pinImageDiv.setAttribute("style", "background-image: url(../images/locatie-pin.png)")
        const locatieCH = document.createElement("p")
        const omschrijvingCH = document.createElement("h5");
            omschrijvingCH.setAttribute("class", "omschrijving-coach")
        const link = document.createElement("button");
            link.setAttribute("class", "button-coaches-overview")
        const profilePicture = document.createElement("div")
            profilePicture.setAttribute("class", "openup-profile-pic")
        const readMoreDiv = document.createElement("div")
            readMoreDiv.setAttribute("class", "read-more-div")
        const readMore = document.createElement("p")
            readMore.setAttribute("class", "button-read-more")



            if(profilePic === undefined){
                profielFoto.style.backgroundImage = `url('images/dummy-profile-photo.jpeg')`
            } else {
                profielFoto.style.backgroundImage = `url('${profilePic}')`
            };
        
            nieuweH3.addEventListener('click', (e) => {
                window.open("Vitaminders/" + [naam], "_self");
            });

            // Exclude Gijs from list of coaches
            // if(naam == "fbKlPnWobJh0ldPROWQRYGCezhv2Gijs van Beusekom"){
            //     nieuweDiv.style.display = "none"
            // };
            

            //De coach-eigenschappen in de nieuwe HTML-elementen zetten
        nieuweH3.innerHTML = naamClean;
        stijlCH.innerHTML = stijl;  
        locatieCH.innerHTML = locatie 
        omschrijvingCH.innerHTML ='"' + omschrijving + '"'
        readMore.innerHTML = "Lees meer"
        link.innerHTML = `<a href="Vitaminders/${naam}.html">Bekijk profiel</a>`

            //De HTML-elementen vastmaken aan de DOM
        overview.appendChild(nieuweDiv)
        nieuweDiv.appendChild(backgroundDiv)
        nieuweDiv.appendChild(profielFoto)
        nieuweDiv.appendChild(nieuweH3)
        nieuweDiv.appendChild(stijlCH)

        if(stijlCH.offsetHeight >= 200){
            nieuweDiv.appendChild(readMoreDiv)
            readMoreDiv.appendChild(readMore)
            stijlCH.style.maxHeight = "50px"
            stijlCH.style.overflow = "hidden"
        };

        readMore.addEventListener("click", () => {
            stijlCH.style.maxHeight = "max-content"
            readMore.style.display = "none"
        })

        nieuweDiv.appendChild(locatieDiv)
        locatieDiv.appendChild(pinImageDiv)
        locatieDiv.appendChild(locatieCH)
        // nieuweDiv.appendChild(omschrijvingCH)
        nieuweDiv.appendChild(link)

        
    
        })
    }).catch((error) => {
        console.log("Kan de coaches niet inladen: ", error);
}).then(() => {
    

//Filter

    // Alle data uit de database
const dataSet = [];

let filters = {
    Locatie: [],
    Doelgroep: []
    }

let filterValues = []

const alleLocatieG = [];
const alleDoelgroepG = [];

 // Coaches uitlezen
 db.collection("Vitaminders").where("Usertype", "==", "Coach")
 .get()
 .then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {

         const alleLocatie = doc.data().City
         alleLocatieG.push(alleLocatie);

         const alleDoelgroep = doc.data().Targetgroup
         alleDoelgroepG.push(alleDoelgroep)

         const data = doc.data()
         dataSet.push(data)

         // Loading filters in DOM

         const locationSelect = document.getElementById("filterLocatie")
         const targetGroupSelect = document.getElementById("filterDoelgroep")

         const locationOption = document.createElement("option")
         const targetgroupOption = document.createElement("option")

         locationOption.innerHTML = alleLocatie
         targetgroupOption.innerHTML = alleDoelgroep

         locationSelect.appendChild(locationOption)
         targetGroupSelect.appendChild(targetgroupOption)

 
     })
 })    

 // Filter knop
const button = document.getElementById("filter-button")
button.addEventListener("click", () => {

        filterValues = []
        filters = {
            Locatie: [],
            Doelgroep: []
        }

    const coachDOM = document.getElementsByClassName("nieuweD")
    const coachDOMarray = Array.from(coachDOM)

    coachDOMarray.forEach(C => {
        C.style.display = "flex"
    })

    //Filters uitlezen
    const inputDoelgroep = document.getElementById("filterDoelgroep")
                    const inputOptiesDD = inputDoelgroep.options;
                    let DDselect = inputOptiesDD[inputOptiesDD.selectedIndex].value;  


    const inputLocatie = document.getElementById("filterLocatie")
                    const inputOptiesLC = inputLocatie.options;
                    let LCselect = inputOptiesLC[inputOptiesLC.selectedIndex].value;

        // Alle opties uit filter vervangen voor alle opties uit database
    if (DDselect == "Alle doelgroepen"){
        DDselect = alleDoelgroepG
    }

    if(LCselect == "Alle locaties")
        LCselect = alleLocatieG

    filters.Locatie.push(LCselect)
    filters.Doelgroep.push(DDselect)

    // Filteren
    const filtersObject = Object.values(filters)
    filtersObject.forEach(filter => {
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

        if(!filterValues.includes(data.City) || !filterValues.includes(data.Targetgroup)){

            const filterCoach = data.Gebruikersnaam

            db.collection("Vitaminders").where("Gebruikersnaam", "==", filterCoach)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const username = doc.data().Gebruikersnaam

                    coachDOMarray.forEach(CD => {
                    
                    const coachData = CD.dataset.name

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

