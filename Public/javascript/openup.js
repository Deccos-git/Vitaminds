// Openbare levensvragen inladen
db.collectionGroup('Levensvragen').where("Openbaar", "==", "Ja").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const gebruikersnaam = doc.data().Gebruikersnaam
        const omschrijving = doc.data().Omschrijving
        const ID = doc.data().ID

        const levensvraagID = doc.data().Levensvraag
        const levensvraag = levensvraagID.replace(ID, "")

        //Cleaning up ID
        db.collection("Vitaminders").where("Gebruikersnaam", "==", gebruikersnaam).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                userID = doc.data().ID

               const gebruikersnaamClean = gebruikersnaam.replace(userID, "")
          
        //Stop loader
        const loader = document.getElementById("loader")
        if(loader == null){
            console.log("Error")
        } else {

        loader.style.display = "none"

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
        const omschrijvingP = document.createElement("h5")

        const leesMeer = document.createElement("button")
            leesMeer.setAttribute("data-vraag", levensvraag)
            leesMeer.setAttribute("class", "lees-meer-openup")
            leesMeer.setAttribute("data-id", ID)

        vraag.innerHTML = "Levensvraag"
        vraag.innerHTML = levensvraag
        naam.innerHTML = gebruikersnaamClean
        omschrijvingP.innerHTML = omschrijving
        leesMeer.innerHTML = "Bekijk"

        naam.addEventListener("click", () => {
            window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
        })

         //Profielfoto achterhalen en inladen in DOM
         db.collection("Vitaminders").where("Gebruikersnaam", "==", gebruikersnaam).get()
         .then(querySnapshot => {
             querySnapshot.forEach(doc => {
                 const profilePic = doc.data().Profielfoto
 
                 const profilePicture = document.createElement("div")
                     profilePicture.setAttribute("class", "openup-profile-pic")
 
                 profilePicture.style.backgroundImage = `url('${profilePic}')`
 
                 profilePicture.addEventListener("click", () => {
                     window.open("../Vitaminders/" + gebruikersnaam + ".html", "_self")
                        })

        if(DOM == null){
            console.log("Error")
        } else {
        DOM.appendChild(innerDiv)
        innerDiv.appendChild(headDiv)
        innerDiv.appendChild(authDiv)
        authDiv.appendChild(profilePicture)
        authDiv.appendChild(naam)
        innerDiv.appendChild(vraagDiv)
        vraagDiv.appendChild(vraag)
        innerDiv.appendChild(omschrijvingDiv)
        omschrijvingDiv.appendChild(omschrijvingP)
        innerDiv.appendChild(leesMeer)
                }   
            })
        })
        .then(() => {
            // Link naar detailpagina
            const vraagData = document.getElementsByClassName("lees-meer-openup")
    
            const vraagArray = Array.from(vraagData)
            vraagArray.forEach(vraag => {
                const data = vraag.dataset.vraag
                const ID2 = vraag.dataset.id

               vraag.addEventListener("click", () => {
                   window.open("../Open/" +ID2 + data + ".html", "_self")
                    })
                })
            })
        }
    })
    })
    })
});

 
//Detail pagina inladen
titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
titel1 = titelhtml.replace('.html', '')
titel2 = titel1.replace('%20',' '),
titel3 = titel2.replace('%20',' ')
titel4 = titel3.replace('%20',' ')
titel5 = titel4.replace('%20',' ')
titel6 = titel4.replace('%20',' ')
titel7 = titel6.replace('%20',' ')
titel8 = titel7.replace('%20',' ')
titel9 = titel8.replace('%20',' ')
titel = titel9.replace('%20',' ')

db.collectionGroup('Levensvragen').where("Levensvraag", "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        
        const gebruikersnaam = doc.data().Gebruikersnaam
        const levenslessen = doc.data().Levenslessen
        const omschrijving = doc.data().Omschrijving
        const ID = doc.data().ID

        const levensvraagID = doc.data().Levensvraag
        const levensvraag = levensvraagID.replace(ID, "")

        //Cleaning up ID
        db.collection("Vitaminders").where("Gebruikersnaam", "==", gebruikersnaam).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                userID = doc.data().ID

               const gebruikersnaamClean = gebruikersnaam.replace(userID, "")

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
        const omschrijvingP = document.createElement("h5")
            omschrijvingP.setAttribute("class", "omschrijving-levensvraag")

        vraag.innerHTML = "Levensvraag"
        vraag.innerHTML = levensvraag
        naam.innerHTML = gebruikersnaamClean
        omschrijvingP.innerHTML = omschrijving

        naam.addEventListener("click", () => {
            window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
        })  

        //Profielfoto achterhalen en inladen in DOM
        db.collection("Vitaminders").where("Gebruikersnaam", "==", gebruikersnaam).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const profilePic = doc.data().Profielfoto

                const profilePicture = document.createElement("div")
                    profilePicture.setAttribute("class", "openup-profile-pic")

                profilePicture.style.backgroundImage = `url('${profilePic}')`

                profilePicture.addEventListener("click", () => {
                    window.open("../Vitaminders/" + gebruikersnaam + ".html", "_self")
                       })

        DOM.appendChild(innerDiv)
        innerDiv.appendChild(headDiv)
        innerDiv.appendChild(authDiv)
        authDiv.appendChild(profilePicture)
        authDiv.appendChild(naam)
        innerDiv.appendChild(vraagDiv)
        vraagDiv.appendChild(vraag)
        vraagDiv.appendChild(omschrijvingP)

        // Levenslessen metadata inladen die passen bij levensvragen

        const lessenH2 = document.createElement("h5") 
        innerDiv.appendChild(lessenH2)

        levenslessen.forEach(les => {

        db.collectionGroup("Levenslessen").where("Levensles", "==", les).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const inspiratorID = doc.data().Auteur
                const inspirator = inspiratorID.replace(userID, "")
                const titel = doc.data().Titel
                const type = doc.data().Type

                const outerBronDiv = document.createElement("div")
                    outerBronDiv.setAttribute("class", "outer-bron-div")
                const bronDiv = document.createElement("div")
                    bronDiv.setAttribute("class", "bron-div-detail")  
                const lessen = document.createElement("h4")
                const titelP = document.createElement("li")
                    titelP.setAttribute("class", "openup-meta-detail")
                const inspiratorP = document.createElement("li")
                    inspiratorP.setAttribute("class", "openup-meta-detail")
                
                lessen.innerHTML ='<img class="menu-icon" src="../images/menu-karakter.png" alt="menu contact" width="20px"> ' + les
                inspiratorP.innerHTML = "Geinspïreerd door coach: " + `<u>${inspirator}</u>`
                lessenH2.innerHTML = "Levenslessen"  

                inspiratorP.addEventListener("click", () => {
                    window.open("../Vitaminders/" + [inspiratorID] + ".html", "_self");
                })

                db.collection('Artikelen').where("Titel", "==", titel).get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const ID = doc1.data().ID
                        const titelClean = titel.replace(ID, "")
                
                titelP.innerHTML = `Geïnspireerd in ${type}: <u>${titelClean}</u>`

                titelP.addEventListener("click", () => {
                    window.open("../Artikelen/" + titel + ".html", "_self");
                        })
                    })
                })
                
              
                innerDiv.appendChild(outerBronDiv)
                outerBronDiv.appendChild(bronDiv)
                bronDiv.appendChild(lessen)
                lessen.appendChild(inspiratorP)
                lessen.appendChild(titelP)
                                })
                            })
                        })
                    })
                })
            })
        })
    })
});

// Reactie input div verwijderen voor niet coaches

const DOMnone = document.getElementById("reactie-input")

if(DOMnone != null){

auth.onAuthStateChanged(User =>{
    if (User){
        const docRef = db.collection("Vitaminders").doc(User.uid);
            docRef.get().then(function(doc){
                const usertype = doc.data().Usertype

                if(usertype == "Vitaminder"){
                    DOMnone.style.display = "none"
                }
        })
    }
});

// Coach reactie input

const DOMinput = document.createElement("div")
            DOMinput.setAttribute("id", "reactie-innerDiv")
const inputH3 = document.createElement("h3")
const inputTextarea = document.createElement("textarea")
        inputTextarea.setAttribute("id", "input-textarea")
        inputTextarea.setAttribute("cols", "85")
        inputTextarea.setAttribute("rows", "15")
        inputTextarea.setAttribute("type", "text");
        inputTextarea.setAttribute("placeholder", "Schrijf hier je professionele visie m.b.t. deze levensvraag");
const inspiratieDiv = document.createElement("div")
const inspiratiep = document.createElement("p")
const inspiratieSelect = document.createElement("select")
        inspiratieSelect.setAttribute("id", "inspiratie-select")
const buttonReact = document.createElement("button")
        buttonReact.setAttribute("id", "button-reactie-openup")
const inspiratieNone = document.createElement("option")


        auth.onAuthStateChanged(User =>{
            if (User){
                const docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
                    
                    const naam = doc.data().Gebruikersnaam;
                    const coachID = doc.data().ID
        
                    const naamClean = naam.replace(coachID, "")

inputH3.innerHTML = "Geef je professionele visie deze levensvraag, " + naamClean
inspiratiep.innerHTML = "---- voeg eventueel passende inspiratie toe ----"
buttonReact.innerHTML = "Deel"

db.collection("Artikelen").where("Auteur", "==", naam).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const ID = doc.data().ID
        const inspiratieTitelID = doc.data().Titel
        const inspiratieTitel = inspiratieTitelID.replace(ID, "")

const inspiratieOption = document.createElement("option")

inspiratieNone.innerHTML = "Geen inspiratie bijvoegen"
inspiratieOption.innerHTML = inspiratieTitel

if(DOMinput != null){

DOMnone.appendChild(DOMinput)
DOMinput.appendChild(inputH3)
DOMinput.appendChild(inputTextarea)
DOMinput.appendChild(inspiratieDiv)
inspiratieDiv.appendChild(inspiratiep)
inspiratieDiv.appendChild(inspiratieSelect)
inspiratieSelect.appendChild(inspiratieNone)
inspiratieSelect.appendChild(inspiratieOption)
DOMinput.appendChild(buttonReact)
                    } else {
                        console.log("Error")
                    }
                })
            }).then(() => {

// Coach reactie wegschrijven naar database
const buttonReactie = document.getElementById("button-reactie-openup")

    if(buttonReactie != null){
    buttonReactie.addEventListener("click", () => {

const inspiratieDiv = document.getElementById("inspiratie-select")
const inspiratieSelect = inspiratieDiv.options
        const inspiratieOption = inspiratieSelect[inspiratieSelect.selectedIndex].innerHTML;

    // Gebruikersnaam achterhalen
    auth.onAuthStateChanged(User =>{
            const userRef = db.collection("Vitaminders").doc(User.uid);
              userRef.get().then(function(doc) {
                if (doc.exists) {
                  const Gnaam = doc.data().Gebruikersnaam;
                  const authID = doc.data().ID
                  const GnaamClean = Gnaam.replace(authID, "")

    const inputReactie = document.getElementById("input-textarea").value 

    const levensvraag = document.getElementsByClassName("vraag-div-detail")
                    const levensvraagArray = Array.from(levensvraag)
                    levensvraagArray.forEach(vraag => {
                        const levensvraag = vraag.dataset.levensvraag

                        const vraagsteller = document.getElementsByClassName("auth-div-detail")
                        const vraagstellerArray = Array.from(vraagsteller)
                        vraagstellerArray.forEach(steller => {
                            const vrager = steller.dataset.vraagsteller

            db.collectionGroup("Levensvragen").where("Levensvraag", "==", titel).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const ID = doc.data().ID
                    const vraag = doc.data().Levensvraag

            // Email versturen
            db.collection("Vitaminders").where("Gebruikersnaam", "==", vrager).get().then(querySnapshot => {
                querySnapshot.forEach(doc2 => {
                    const email = doc2.data().Email
                    const userID = doc2.data().ID
                    const vragerClean = vrager.replace(userID, "")

            const levensvraagMail = levensvraag.replace(ID, "")
            
            db.collection("Mail").doc().set({
                    to: [email],
            message: {
            subject: `${vragerClean}, je hebt een nieuwe reactie op je levensvraag ${levensvraagMail} op Vitaminds.`,
            html: `Hallo ${vragerClean}, </br></br>
                    Je hebt een reactie ontvangen van coach ${GnaamClean} op je levensvraag "${levensvraagMail}"</br>
                    Bekijk de reactie <a href="https://vitaminds.nu/Open/${vraag}.html"><u>hier.</u></a></br></br>
                    Vriendelijke groet, </br></br>
                    Het Vitaminds Team </br></br>
                    <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
            Coach: Gnaam,
            }
                        
            }).catch((err) => {
                    console.log(err)
            })
            if(inspiratieOption == "Geen inspiratie bijvoegen"){
                db.collection("Vitaminders").doc(doc2.id).collection("Reactions").doc().set({
                                Gebruikersnaam: Gnaam,
                                Reactie: inputReactie,
                                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                Levensvraag: ID + levensvraag,
                                Vraagsteller: vrager,
                                InspiratieTitel: "Geen inspiratie bijgevoegd",
                                Inspiratiepunten: 1,
                                New: "Yes",
                                Domain: "Levensvraag"
                                                }).then(()=>{
                                                location.reload();
                                            })
            } else {

            db.collection("Artikelen").where("TitelClean", "==", inspiratieOption).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const IDArtikel = doc.data().ID
          
                    db.collection("Vitaminders").doc(doc2.id).collection("Reactions").doc().set({
                                Gebruikersnaam: Gnaam,
                                Reactie: inputReactie,
                                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                Levensvraag: ID + levensvraag,
                                Vraagsteller: vrager,
                                InspiratieTitel: IDArtikel + inspiratieOption,
                                Inspiratiepunten: 1,
                                New: "Yes",
                                Domain: "Levensvraag"
                                                }).then(()=>{
                                                location.reload();
                                                    })
                                                })
                                            })
                                        }
                                    })
                                })
                            }) 
                         })
                        })
                    })
                }
                
            })
        })   
    })
} else {
    console.log("Error")
}
})
})
}
});
} else {
    console.log("Error")
}

// Coach reacties overview
const DOMreacties = document.getElementById("reacties-overview")

const reactieTitle = document.createElement("h2")
const geenOption = document.createElement("option")

reactieTitle.innerHTML = "Wat onze coaches denken"


const docRef = db.collectionGroup("Reactions").where("Levensvraag", "==", titel).orderBy("Inspiratiepunten", "desc")
    docRef.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const reactie = doc.data().Reactie


        const coach = doc.data().Gebruikersnaam
        const inspiratieTitel = doc.data().InspiratieTitel

        const inspiratiepunten = doc.data().Inspiratiepunten
        const vraagsteller = doc.data().Vraagsteller
        const levensvraag = doc.data().Levensvraag

        const reactieDiv = document.createElement("div")
            reactieDiv.setAttribute("class", "reactie-div")
            reactieDiv.setAttribute("data-reactie", reactie)
            reactieDiv.setAttribute("data-coach", coach)
            reactieDiv.setAttribute("data-vrager", vraagsteller)
            reactieDiv.setAttribute("data-levensvraag", levensvraag)
        const reactieP = document.createElement("h4")
            reactieP.setAttribute("class", "openup-reactie-p")
        const inspiratieLi = document.createElement("li")
            inspiratieLi.setAttribute("class", "openup-meta-detail")
        const coachDiv = document.createElement("div")
            coachDiv.setAttribute("class", "reaction-coach-div")
        const coachP = document.createElement("li")
            coachP.setAttribute("class", "openup-meta-detail")
        const timestampP = document.createElement("li")
            timestampP.setAttribute("class", "openup-meta-detail")
        const socialDiv = document.createElement("div")
            socialDiv.setAttribute("id", "social-div-openup")
        const inspirerend = document.createElement("p")
            inspirerend.setAttribute("class", "inspirerend-openup")
            inspirerend.setAttribute("onclick", "inspirerend(this)")
        const toevoegenLevensles = document.createElement("p")
            toevoegenLevensles.setAttribute("class", "toevoegen-levensles")
            toevoegenLevensles.setAttribute("onclick", "toevoegenLevensles(this)")
        const inspiratiepuntenP = document.createElement("p")
        const bedankt = document.createElement("p")
            bedankt.setAttribute("id", "bedankt-open-up-inspirerend")
            bedankt.style.display = "none"
            bedankt.style.color = "#8e0000"
        const toevoegenLevenslesDiv = document.createElement("div")
            toevoegenLevenslesDiv.setAttribute("id", "toevoegen-levensles-div")
            toevoegenLevenslesDiv.style.display = "none"
        const toevoegenLevenslesP = document.createElement("p")
        const toevoegenLevenslesSelect = document.createElement("select")
        const toevoegenLevenslesButton = document.createElement("button")
            toevoegenLevenslesButton.setAttribute("onclick", "toevoegenLevenslesButton(this)")
            toevoegenLevenslesButton.setAttribute("data-reactie", reactie)
            toevoegenLevenslesButton.setAttribute("data-coach", coach)
            toevoegenLevenslesButton.setAttribute("data-vrager", vraagsteller)
            toevoegenLevenslesButton.setAttribute("data-levensvraag", levensvraag)
        const opgeslagen = document.createElement("p")
            opgeslagen.style.display = "none"
            opgeslagen.style.color = "#8e0000"
       
        coachP.addEventListener('click', (e) => {
            window.open("../Vitaminders/" + coach + ".html", "_self");
        });

        reactieP.innerHTML = reactie

        if(inspiratieTitel == "Geen inspiratie bijgevoegd"){
            inspiratieLi.style.display = "none"
        } else {

        db.collection("Artikelen").where("Titel", "==", inspiratieTitel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const ID = doc.data().ID

                const inspiratieTitelClean = inspiratieTitel.replace(ID, "") 
         
        inspiratieLi.innerHTML = "Meer inspiratie: " + `<u>${inspiratieTitelClean}</U>` 

        inspiratieLi.addEventListener("click", () => {
            window.open("../Artikelen/" + [inspiratieTitelClean] + ".html", "_self");
                    })
                })
            })
        };

        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const coachID = doc1.data().ID
                const coachClean = coach.replace(coachID, "")
                const profielfoto = doc1.data().Profielfoto
                const naam = doc1.data().Gebruikersnaam

        
        const photoDiv = document.createElement("div")
                photoDiv.setAttribute("class", "openup-coach-reaction-photo")
                photoDiv.style.backgroundImage = `url(${profielfoto})`
        
                photoDiv.addEventListener("click", () => {
                    window.open("../Vitaminders/" + naam + ".html", "_self");
                                })

        coachP.innerHTML = "Geschreven door coach: " + `<u>${coachClean}</u>`
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timestampP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
        inspirerend.innerHTML = "Inspirerend!"
        inspiratiepuntenP.innerHTML = inspiratiepunten
        bedankt.innerHTML = "Bedankt! (Ook namens " + coach + ")"
        toevoegenLevensles.innerHTML = "Opslaan als levensles"
        toevoegenLevenslesP.innerHTML = "Levensles toevoegen aan levensvraag?"
        toevoegenLevenslesButton.innerHTML = "Opslaan"
        geenOption.innerHTML = "Niet aan levensvraag toevoegen"
        opgeslagen.innerHTML = `Opgeslagen in je <u>Digimind</u>`

        auth.onAuthStateChanged(User =>{
            userRef = db.collection("Vitaminders").doc(User.uid)
            userRef.get()
             .then(doc => {
                     const naam = doc.data().Gebruikersnaam
                     const naamID = doc.data().ID
                     const naamClean = naam.replace(naamID, " ")

        opgeslagen.addEventListener("click", () => {
            window.open("../Vitaminders/" + naam + ".html", "_self");
                        })
                    })
                })
                
                DOMreacties.appendChild(reactieTitle)
                DOMreacties.appendChild(reactieDiv)
                reactieDiv.appendChild(reactieP)
                reactieDiv.appendChild(coachDiv)
                coachDiv.appendChild(coachP)
                coachDiv.appendChild(photoDiv)
                reactieDiv.appendChild(timestampP)
                reactieDiv.appendChild(inspiratieLi)
                reactieDiv.appendChild(socialDiv)
                socialDiv.appendChild(inspiratiepuntenP)
                socialDiv.appendChild(inspirerend)
                inspirerend.appendChild(bedankt)
                socialDiv.appendChild(toevoegenLevensles)
                toevoegenLevensles.appendChild(toevoegenLevenslesDiv)
                toevoegenLevenslesDiv.appendChild(toevoegenLevenslesP)
                toevoegenLevenslesDiv.appendChild(toevoegenLevenslesSelect)
                toevoegenLevenslesDiv.appendChild(toevoegenLevenslesButton)
                toevoegenLevenslesDiv.appendChild(opgeslagen)
            })
        })
    })
})



   // Inspiratiepunt wegschrijven naar reactie en coach

   function inspirerend(elem){
       
            const elemDiv = elem.previousSibling.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.parentElement
           const reactieData = elemDiv.dataset.reactie
           const coachData = elemDiv.dataset.coach
           const vragerData = elemDiv.dataset.vrager
           const levensvraag = elemDiv.dataset.levensvraag

           auth.onAuthStateChanged(User =>{
            userRef = db.collection("Vitaminders").doc(User.uid)
            userRef.get()
             .then(doc => {
                     const naam = doc.data().Gebruikersnaam

                // Naar Coach
            db.collection("Vitaminders").where("Gebruikersnaam", "==", coachData).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection("Vitaminders").doc(doc.id).collection("Inspiration").doc().set({

                        New: "Yes",
                        Reciever: coachData,
                        Inspiration: reactieData,
                        Source: levensvraag,
                        Giver: naam,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        Type: "Openup"
                    })
                    // Naar reactie
                    db.collectionGroup("Reactions").where("Reactie", "==", reactieData).get().then(querySnapshot => {
                        querySnapshot.forEach(doc3 => {

                    db.collection("Vitaminders").where("Gebruikersnaam", "==", coachData).get().then(querySnapshot => {
                            querySnapshot.forEach(doc4 => {
                            db.collection("Vitaminders").doc(doc4.id).collection("Reactions").doc(doc3.id).update({
        
                                Inspiratiepunten: firebase.firestore.FieldValue.increment(1)
                
                                    })
                                })
                            })
                        })
                    })
                })
            })
            const bedankt = elem.firstElementChild
            bedankt.style.display = "block"
        })
    })
};



        // Toevoegen aan levensles verwerken in database

        function toevoegenLevensles(elem){

           elem.firstElementChild.style.display = "block"

            const inspiratieSelect = document.createElement("select")
        inspiratieSelect.setAttribute("id", "inspiratie-select")

        auth.onAuthStateChanged(User =>{
            if (User){
                db.collection("Vitaminders").doc(User.uid)
                .collection("Levensvragen").get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const levensvraag = doc.data().Levensvraag
                        const ID = doc.data().ID

                        const levensvraagClean = levensvraag.replace(ID, "")

                        const toevoegenLevenslesOption = document.createElement("option")

                        const toevoegenLevenslesSelect = elem.firstElementChild.firstElementChild.nextSibling
                        
                        toevoegenLevenslesOption.innerHTML = levensvraagClean

                        toevoegenLevenslesSelect.appendChild(geenOption)
                        toevoegenLevenslesSelect.appendChild(toevoegenLevenslesOption)
                })
            })
        }
    })
};

    
        function toevoegenLevenslesButton(elem){

            const reactie = elem.dataset.reactie
            const coach = elem.dataset.coach

            auth.onAuthStateChanged(User =>{
                userRef = db.collection("Vitaminders").doc(User.uid)
                userRef.get()
                 .then(doc => {
                         const naam = doc.data().Gebruikersnaam

            db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Levensles: reactie,
            Auteur: coach,
            Gebruikersnaam: naam,
            Titel: titel,
            Inspirerend: 1,
            Type: "Openup"
                    })

            const uitlezenOption = elem.previousSibling.options
            const uitlezenSelect = uitlezenOption[uitlezenOption.selectedIndex].innerHTML;

            
            levensvraagRef = db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", uitlezenSelect)
            levensvraagRef.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    
                    userRef.collection("Levensvragen").doc(doc.id).update({
                        Levenslessen: firebase.firestore.FieldValue.arrayUnion(reactie)
                    })
                    
                })
            })

            elem.nextSibling.style.display = "block"
            })
    })
};
