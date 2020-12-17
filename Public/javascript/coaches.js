
// Filter
!function loadAuthGoalsInFilter(){

    const filterSelect = document.getElementById("coaches-filter-select")

    const options = filterSelect.options

    const optionsArray = Array.from(options)

        optionsArray.forEach(option => {


        
        db.collection("Levensvragen").where("Domein", "==", option.innerHTML)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc2) {

                const domain = doc2.data().Domein
                const lifequestion = doc2.data().Levensvraag

                auth.onAuthStateChanged(User =>{
                    if(User){
                        db.collection("Vitaminders").doc(User.uid)
                        .get().then(function(doc) {
            
                        db.collection("Vitaminders").doc(User.uid)
                        .collection("Levensvragen")
                        .where("Goal", "==", lifequestion)
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc1) {
            
                                const goal = doc1.data().LevensvraagClean

                               
                        
                                if(option.innerHTML === domain){

                                    console.log(domain, goal)

                                    console.log(goal)

                                    const goalOption = document.createElement("option")
                                        goalOption.setAttribute("id", "goal-option")

                                    goalOption.innerText = ` (Jouw doel: ${goal})`

                                    // option.appendChild(goalOption)
                                };
                            });
                        });
                    });
                };
            });
        });
    });
});
}();

function getDomain(){

    const filterSelect = document.getElementById("coaches-filter-select")
    const overview = document.getElementById("overview")

    const options = filterSelect.options
    const selectedOption = options[options.selectedIndex].innerHTML

    const selectedClean = selectedOption.split("<")

    overview.innerHTML = ""

    loadCoachesOnFilteredDomain(selectedClean[0])

    console.log(selectedClean[0])

    if(selectedClean[0] === "Alles"){
        showAllCoaches()
    }
};

function loadCoachesOnFilteredDomain(selectedOption){
    db.collection("Vitaminders").where("Usertype", "==", "Coach").where("Status", "==", "Approved")
    .where("Domains", "array-contains", selectedOption)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        
            //Waar de coachprofielen onder komen in de DOM
        const overview = document.getElementById("overview");
        const loader = document.getElementById("loader")
       
            // loader.style.display = "none"

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
                window.open(`https://${website}`, "_self");
            });

            // Exclude from list of coaches
            if(naam == "115tuwbtujsSelam" || naam == "c4r6fyfkyx6Selam" || naam == "fbKlPnWobJh0ldPROWQRYGCezhv2Gijs van Beusekom" ){
                nieuweDiv.style.display = "none"
            };
            

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
})
}


function showAllCoaches(){
db.collection("Vitaminders").where("Usertype", "==", "Coach").where("Status", "==", "Approved")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        
            //Waar de coachprofielen onder komen in de DOM
        const overview = document.getElementById("overview");
        const loader = document.getElementById("loader")
       
            // loader.style.display = "none"

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
                window.open(`https://${website}`, "_self");
            });

            // Exclude from list of coaches
            if(naam == "115tuwbtujsSelam" || naam == "c4r6fyfkyx6Selam" || naam == "fbKlPnWobJh0ldPROWQRYGCezhv2Gijs van Beusekom" ){
                nieuweDiv.style.display = "none"
            };
            

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
})
}; showAllCoaches()



