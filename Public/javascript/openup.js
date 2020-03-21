// Openbare levensvragen inladen

db.collectionGroup('Levensvragen').where("Openbaar", "==", "Ja").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const levensvraag = doc.data().Levensvraag
        const gebruikersnaam = doc.data().Gebruikersnaam
        const omschrijving = doc.data().Omschrijving

        const DOM = document.getElementById("verzamelOpenUps") 

        const innerDiv = document.createElement("div")
            innerDiv.setAttribute("class", "openup-div") 
        const headDiv = document.createElement("div")
            headDiv.setAttribute("class", "header-div")
        const authDiv = document.createElement("div")
            authDiv.setAttribute("class", "auth-div")
        const vraagDiv = document.createElement("div") 
            vraagDiv.setAttribute("class", "vraag-div")      
        const vraag = document.createElement("h3")
        const naam = document.createElement("p")
            naam.setAttribute("class", "openup-meta")
        const omschrijvingDiv = document.createElement("div")
            omschrijvingDiv.setAttribute("class", "omschrijving-div")
        const omschrijvingP = document.createElement("p")

        const leesMeer = document.createElement("button")
            leesMeer.setAttribute("data-vraag", levensvraag)
            leesMeer.setAttribute("class", "lees-meer-openup")

        vraag.innerHTML = "Levensvraag"
        vraag.innerHTML = levensvraag
        naam.innerHTML = "Gesteld door " + `<u>${gebruikersnaam}</u>`
        omschrijvingP.innerHTML = omschrijving
        leesMeer.innerHTML = "Bekijk"

        naam.addEventListener("click", () => {
            window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
        })

        DOM.appendChild(innerDiv)
        innerDiv.appendChild(headDiv)
        innerDiv.appendChild(authDiv)
        authDiv.appendChild(naam)
        innerDiv.appendChild(vraagDiv)
        vraagDiv.appendChild(vraag)
        innerDiv.appendChild(omschrijvingDiv)
        omschrijvingDiv.appendChild(omschrijvingP)
        innerDiv.appendChild(leesMeer)
    })
}).then(() => {
        // Link naar detailpagina

        const vraagData = document.getElementsByClassName("lees-meer-openup")

        const vraagArray = Array.from(vraagData)

        vraagArray.forEach(vraag => {
            const data = vraag.dataset.vraag

           vraag.addEventListener("click", () => {
               window.open("../Open/" + [data] + ".html", "_self")
           })
        })
})

 
//Detail pagina inladen

titelhtml = location.pathname.replace(/^.*[\\\/]/, '')
titel1 = titelhtml.replace('.html', '')
titel2 = titel1.replace('%20',' '),
titel3 = titel2.replace('%20',' ')
titel4 = titel3.replace('%20',' ')
titel5 = titel4.replace('%20',' ')
titel6 = titel4.replace('%20',' ')
titel = titel6.replace('%20',' ')

const titelQuestionmark = titel + "?"

console.log(titelQuestionmark)

db.collectionGroup('Levensvragen').where("Levensvraag", "==", titelQuestionmark).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const levensvraag = doc.data().Levensvraag
        const gebruikersnaam = doc.data().Gebruikersnaam
        const levenslessen = doc.data().Levenslessen

        const DOM = document.getElementById("openup-overview") 

        const innerDiv = document.createElement("div")
            innerDiv.setAttribute("class", "openup-div-detail") 
        const headDiv = document.createElement("div")
            headDiv.setAttribute("class", "header-div-detail")
        const authDiv = document.createElement("div")
            authDiv.setAttribute("class", "auth-div-detail")
            authDiv.setAttribute("data-vraagsteller", gebruikersnaam)
        const vraagDiv = document.createElement("div") 
            vraagDiv.setAttribute("class", "vraag-div-detail")  
            vraagDiv.setAttribute("data-levensvraag", levensvraag)    
        const vraag = document.createElement("h3")
        const naam = document.createElement("p")
            naam.setAttribute("class", "openup-meta-detail")

        vraag.innerHTML = "Levensvraag"
        vraag.innerHTML = levensvraag
        naam.innerHTML = "Gesteld door " + `<u>${gebruikersnaam}</u>`

        naam.addEventListener("click", () => {
            window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
        })

        DOM.appendChild(innerDiv)
        innerDiv.appendChild(headDiv)
        innerDiv.appendChild(authDiv)
        authDiv.appendChild(naam)
        innerDiv.appendChild(vraagDiv)
        vraagDiv.appendChild(vraag)

        // Levenslessen metadata inladen die passen bij levensvragen

        levenslessen.forEach(les => {

        db.collectionGroup("Levenslessen").where("Levensles", "==", les).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const inspirator = doc.data().Auteur
                const titel = doc.data().Titel
                const type = doc.data().Type

                const bronDiv = document.createElement("div")
                    bronDiv.setAttribute("class", "bron-div")   
                const lessen = document.createElement("h4")
                const titelP = document.createElement("li")
                    titelP.setAttribute("class", "openup-meta")
                const inspiratorP = document.createElement("li")
                    inspiratorP.setAttribute("class", "openup-meta")
                
                lessen.innerHTML ='<img class="menu-icon" src="../Images/menu-karakter.png" alt="menu contact" width="20px"> ' + les
                inspiratorP.innerHTML = "Geinspïreerd door coach " + `<u>${inspirator}</u>`

                inspiratorP.addEventListener("click", () => {
                    window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                })

                titelP.innerHTML = "Geïnspireerd in " + type + '" "' + `<u>${titel}</u>`

                titelP.addEventListener("click", () => {
                    window.open("../Artikelen/" + [titel] + ".html", "_self");
                })
                 
                innerDiv.appendChild(bronDiv)
                bronDiv.appendChild(lessen)
                lessen.appendChild(inspiratorP)
                lessen.appendChild(titelP)

                })
            })
        })
    })
})

// Reactie input div verwijderen voor niet coaches

const DOMnone = document.getElementById("reactie-input")

auth.onAuthStateChanged(User =>{
    if (User){
        const docRef = db.collection("Vitaminders").doc(User.uid);
            docRef.get().then(function(doc){
                const usertype = doc.data().Usertype

                if(usertype != "Coach"){
                    DOMnone.style.display = "none"
                }
        })
    }
})

// Coach reactie input
auth.onAuthStateChanged(User =>{
    if (User){
        const docRef = db.collection("Vitaminders").doc(User.uid);
            docRef.get().then(function(doc){
            
            
            const naam = doc.data().Gebruikersnaam;

const DOMinput = document.getElementById("reactie-innerDiv")

const inputH3 = document.createElement("h3")
const inputTextarea = document.createElement("textarea")
        inputTextarea.setAttribute("id", "input-textarea")
        inputTextarea.setAttribute("cols", "85")
        inputTextarea.setAttribute("rows", "15")
        inputTextarea.setAttribute("type", "text");
        inputTextarea.setAttribute("placeholder", "Schrijf hier je professionele mening");

inputH3.innerHTML = "Geef je professionele mening, " + naam

DOMinput.appendChild(inputH3)
inputH3.appendChild(inputTextarea)

        })
    }
})



// Reactie wegschrijven naar database

const buttonReactie = document.getElementById("button-reactie-openup")

    buttonReactie.addEventListener("click", () => {

    // Gebruikersnaam achterhalen
    auth.onAuthStateChanged(User =>{
            const userRef = db.collection("Vitaminders").doc(User.uid);
              userRef.get().then(function(doc) {
                if (doc.exists) {
                  Gnaam = doc.data().Gebruikersnaam;

    const inputReactie = document.getElementById("input-textarea").value 
    const levensvraag = document.getElementsByClassName("vraag-div-detail")
                    const levensvraagArray = Array.from(levensvraag)
                    levensvraagArray.forEach(vraag => {
                        const levensvraag = vraag.dataset.levensvraag

                        const vraagsteller = document.getElementsByClassName("auth-div-detail")
                        const vraagstellerArray = Array.from(vraagsteller)
                        vraagstellerArray.forEach(steller => {
                            const vrager = steller.dataset.vraagsteller
                     
          
   db.collection('Vitaminders').doc(User.uid).collection("Reacties").doc().set({
            Gebruikersnaam: Gnaam,
            Reactie: inputReactie,
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Levensvraag: levensvraag,
            Vraagsteller: vrager
                            }).then(()=>{
                            location.reload();
                        })

                    })
                })
            }
        })    
    })
})





// Coach reacties overview

const DOMreacties = document.getElementById("reacties-overview")

db.collectionGroup("Reacties").where("Levensvraag", "==", titelQuestionmark).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const reactie = doc.data().Reactie
        const coach = doc.data().Gebruikersnaam

        const reactieDiv = document.createElement("div")
            reactieDiv.setAttribute("class", "reactie-div")
        const reactieP = document.createElement("h4")
        const coachP = document.createElement("li")
            coachP.setAttribute("class", "openup-meta")
        const timestampP = document.createElement("li")
            timestampP.setAttribute("class", "openup-meta")

        coachP.addEventListener('click', (e) => {
            window.open("../Vitaminders/" + coach + ".html", "_self");
        })

        reactieP.innerHTML = reactie
        coachP.innerHTML = "Geschreven door coach " + `<u>${coach}</u>`
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timestampP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);

        DOMreacties.appendChild(reactieDiv)
        reactieDiv.appendChild(reactieP)
        reactieP.appendChild(coachP)
        reactieP.appendChild(timestampP)
    })
})


