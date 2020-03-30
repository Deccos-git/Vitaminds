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
        const omschrijvingP = document.createElement("h5")

        const leesMeer = document.createElement("button")
            leesMeer.setAttribute("data-vraag", levensvraag)
            leesMeer.setAttribute("class", "lees-meer-openup")

        vraag.innerHTML = "Levensvraag"
        vraag.innerHTML = levensvraag
        naam.innerHTML = gebruikersnaam
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

            })
        })
        .then(() => {
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
    })
});

 
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

db.collectionGroup('Levensvragen').where("Levensvraag", "==", titelQuestionmark).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const levensvraag = doc.data().Levensvraag
        const gebruikersnaam = doc.data().Gebruikersnaam
        const levenslessen = doc.data().Levenslessen
        const omschrijving = doc.data().Omschrijving

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
        const lessenH2 = document.createElement("h5")  
        const omschrijvingP = document.createElement("h5")
            omschrijvingP.setAttribute("class", "omschrijving-levensvraag")

        vraag.innerHTML = "Levensvraag"
        vraag.innerHTML = levensvraag
        naam.innerHTML = gebruikersnaam
        omschrijvingP.innerHTML = omschrijving

        naam.addEventListener("click", () => {
            window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
        })

        lessenH2.innerHTML = "Levenslessen"    

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
        innerDiv.appendChild(lessenH2)

        // Levenslessen metadata inladen die passen bij levensvragen

        levenslessen.forEach(les => {

        db.collectionGroup("Levenslessen").where("Levensles", "==", les).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const inspirator = doc.data().Auteur
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
                
                lessen.innerHTML ='<img class="menu-icon" src="../Images/menu-karakter.png" alt="menu contact" width="20px"> ' + les
                inspiratorP.innerHTML = "Geinspïreerd door coach " + `<u>${inspirator}</u>`

                inspiratorP.addEventListener("click", () => {
                    window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                })

                titelP.innerHTML = "Geïnspireerd in " + type + `<u>${titel}</u>`

                titelP.addEventListener("click", () => {
                    window.open("../Artikelen/" + [titel] + ".html", "_self");
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
});

// Reactie input div verwijderen voor niet coaches

const DOMnone = document.getElementById("reactie-input")

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
const inspiratieDiv = document.createElement("div")
const inspiratiep = document.createElement("p")
const inspiratieSelect = document.createElement("select")
        inspiratieSelect.setAttribute("id", "inspiratie-select")


inputH3.innerHTML = "Geef je professionele mening, " + naam
inspiratiep.innerHTML = "---- voeg eventueel passende inspiratie toe ----"

db.collection("Artikelen").where("Auteur", "==", naam).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const inspiratieTitel = doc.data().Titel

const inspiratieOption = document.createElement("option")

inspiratieOption.innerHTML = inspiratieTitel

if(DOMinput != null){

DOMinput.appendChild(inputH3)
inputH3.appendChild(inputTextarea)
DOMinput.appendChild(inspiratieDiv)
inspiratieDiv.appendChild(inspiratiep)
inspiratieDiv.appendChild(inspiratieSelect)
inspiratieSelect.appendChild(inspiratieOption)
                    } else {
                        console.log("Error")
                    }
                })
            })
        })
    }
});



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
            Vraagsteller: vrager,
            InspiratieTitel: inspiratieOption,
            Inspiratiepunten: 1
                            }).then(()=>{
                            location.reload();
                        })

                    })
                })
            }
        })    
    })
}) 
} else {
    console.log("Error")
};

// Coach reacties overview
const DOMreacties = document.getElementById("reacties-overview")


auth.onAuthStateChanged(User =>{
    if (User){
       userRef = db.collection("Vitaminders").doc(User.uid)
       userRef.get()
        .then(doc => {
                const naam = doc.data().Gebruikersnaam

const docRef = db.collectionGroup("Reacties").where("Levensvraag", "==", titelQuestionmark).orderBy("Inspiratiepunten", "desc")
    docRef.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const reactie = doc.data().Reactie
        const coach = doc.data().Gebruikersnaam
        const inspiratieTitel = doc.data().InspiratieTitel
        const inspiratiepunten = doc.data().Inspiratiepunten

        const reactieDiv = document.createElement("div")
            reactieDiv.setAttribute("class", "reactie-div")
            reactieDiv.setAttribute("data-reactie", reactie)
            reactieDiv.setAttribute("data-coach", coach)
        const reactieP = document.createElement("h4")
            reactieP.setAttribute("class", "openup-reactie-p")
        const inspiratie = document.createElement("li")
            inspiratie.setAttribute("class", "openup-meta-detail")
        const coachP = document.createElement("li")
            coachP.setAttribute("class", "openup-meta-detail")
        const timestampP = document.createElement("li")
            timestampP.setAttribute("class", "openup-meta-detail")
        const socialDiv = document.createElement("div")
            socialDiv.setAttribute("class", "social-div-openup")
        const inspirerend = document.createElement("p")
            inspirerend.setAttribute("class", "inspirerend-openup")
        const toevoegenLevensles = document.createElement("p")
            toevoegenLevensles.setAttribute("class", "toevoegen-levensles")
        const inspiratiepuntenP = document.createElement("p")
        const bedankt = document.createElement("p")
            bedankt.style.display = "none"
            bedankt.style.color = "#8e0000"
        const toevoegenLevenslesDiv = document.createElement("div")
            toevoegenLevenslesDiv.setAttribute("id", "toevoegen-levensles-div")
            toevoegenLevenslesDiv.style.display = "none"
        const toevoegenLevenslesP = document.createElement("p")
        const toevoegenLevenslesSelect = document.createElement("select")
        const toevoegenLevenslesButton = document.createElement("button")
        const opgeslagen = document.createElement("p")
            opgeslagen.style.display = "none"
            opgeslagen.style.color = "#8e0000"
        const geenOption = document.createElement("option")

        coachP.addEventListener('click', (e) => {
            window.open("../Vitaminders/" + coach + ".html", "_self");
        });

        reactieP.innerHTML = reactie
        inspiratie.innerHTML = "Meer inspiratie: " + `<u>${inspiratieTitel}</U>` 

        inspiratie.addEventListener("click", () => {
            window.open("../Artikelen/" + [inspiratieTitel] + ".html", "_self");
        });

        coachP.innerHTML = "Geschreven door coach " + `<u>${coach}</u>`
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timestampP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
        inspirerend.innerHTML = "Inspirerend!"
        inspiratiepuntenP.innerHTML = inspiratiepunten
        bedankt.innerHTML = "Bedankt! (Ook namens " + coach + ")"
        toevoegenLevenslesP.innerHTML = "Levensles toevoegen aan levensvraag?"
        toevoegenLevenslesButton.innerHTML = "Opslaan"
        geenOption.innerHTML = "Niet aan levensvraag toevoegen"
        opgeslagen.innerHTML = `Opgeslagen in je <u>Digimind</u>`

        opgeslagen.addEventListener("click", () => {
            window.open("../Vitaminders/" + naam + ".html", "_self");
        })

        // Inspiratiepunt wegschrijven naar reactie en coach
        inspirerend.addEventListener("click", () => {
            const div = inspirerend.parentElement.parentElement
           const reactieData = div.dataset.reactie
           const coachData = div.dataset.coach

            db.collection("Vitaminders").where("Gebruikersnaam", "==", coachData).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection("Vitaminders").doc(doc.id).update({

                        Inspiratiepunten: firebase.firestore.FieldValue.increment(1)

                    })
                    db.collectionGroup("Reacties").where("Reactie", "==", reactieData).get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {
        
                            db.collection("Vitaminders").doc(doc.id).collection("Reacties").doc(doc2.id).update({
        
                                Inspiratiepunten: firebase.firestore.FieldValue.increment(1)
        
                            })
                        })
                    })
                })
            })
            
            bedankt.style.display = "block"
        });

        // Toevoegen aan levensles verwerken in database
        toevoegenLevensles.innerHTML = "Opslaan als levensles"

        toevoegenLevensles.addEventListener("click", () => {

            toevoegenLevenslesDiv.style.display = "block"

            const inspiratieSelect = document.createElement("select")
        inspiratieSelect.setAttribute("id", "inspiratie-select")

        auth.onAuthStateChanged(User =>{
            if (User){
                db.collection("Vitaminders").doc(User.uid)
                .collection("Levensvragen").get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const levensvraag = doc.data().Levensvraag

                        console.log(levensvraag)

                        const toevoegenLevenslesOption = document.createElement("option")
                        

                        toevoegenLevenslesOption.innerHTML = levensvraag

                        toevoegenLevenslesSelect.appendChild(geenOption)
                        toevoegenLevenslesSelect.appendChild(toevoegenLevenslesOption)
                    })
                })
            }
        })
    });

    
        toevoegenLevenslesButton.addEventListener("click", () => {

            db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Levensles: reactie,
            Auteur: coach,
            Gebruikersnaam: naam,
            Titel: titel,
            Inspirerend: 1,
            Type: "Openup"
                    })

            const uitlezenOption = toevoegenLevenslesSelect.options
            const uitlezenSelect = uitlezenOption[uitlezenOption.selectedIndex].innerHTML;

            if(uitlezenSelect != "Niet aan levensvraag toevoegen"){
            
            levensvraagRef = db.collectionGroup("Levensvragen").where("Levensvraag", "==", uitlezenSelect)
            levensvraagRef.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    
                    userRef.collection("Levensvragen").doc(doc.id).update({
                        Levenslessen: firebase.firestore.FieldValue.arrayUnion(reactie)
                    })
                    
                })
            })
        }

            opgeslagen.style.display = "block"
                })

        DOMreacties.appendChild(reactieDiv)
        reactieDiv.appendChild(reactieP)
        reactieP.appendChild(coachP)
        reactieP.appendChild(timestampP)
        reactieP.appendChild(inspiratie)
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
    }
});

