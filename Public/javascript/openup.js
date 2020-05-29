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

        // Pagetitle and meta's

        const titelHead = document.getElementsByTagName("title")
        const metaKeywords = document.getElementById("meta-keywords")
        const metaDescription = document.getElementById("meta-description")

            const titelHeadArray = Array.from(titelHead)

            titelHeadArray.forEach(tit => {
                tit.innerHTML = levensvraag
            })

            metaKeywords.content = levensvraag
            metaDescription.content = omschrijving

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

        db.collectionGroup("Levenslessen").where("Levensles", "==", les).orderBy("Timestamp", "desc").get().then(querySnapshot => {
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
                lessenH2.innerHTML = "Mijn ontwikkeling"  

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

//User roles

const InputSection = document.getElementById("reactie-input")

    // Visitor
auth.onAuthStateChanged(User =>{
    if (!User){
        
        InputSection.style.display = "none"
    }
});

    //Non coach
    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                const usertype = doc.data().Usertype

                if(usertype != "Coach"){
                    InputSection.style.display = "none"
                }
            
        })
    });




// Coach reaction input
const insightsDOM = document.getElementById("reactie-input")

const inputTitle = document.createElement("div")
const inputH3 = document.createElement("h3")
const tinyMCEdiv = document.createElement("div")
    tinyMCEdiv.setAttribute("id", "tiny-mce")
const buttonDiv = document.createElement("div")
const buttonReact = document.createElement("button")
        buttonReact.setAttribute("class", "button-algemeen")
        buttonReact.setAttribute("onclick", "shareInsightsOpenup()")

insightsDOM.appendChild(inputTitle)
insightsDOM.appendChild(tinyMCEdiv)
insightsDOM.appendChild(buttonDiv)
buttonDiv.appendChild(buttonReact)
buttonReact.innerHTML = "Deel"


        // Coachnaam in title at input
        auth.onAuthStateChanged(User =>{
            if (User){
                const docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
                    
                    const naam = doc.data().Gebruikersnaam;
                    const coachID = doc.data().ID

                    const naamClean = naam.replace(coachID, "")

        inputH3.innerHTML = `Geef je professionele inzicht over deze levensvraag, ${naamClean}`

                        inputTitle.appendChild(inputH3)

                })
            }
        });

// Coach reactie wegschrijven naar database

function shareInsightsOpenup(){
    
    let inputCoach = tinyMCE.get('tiny-mce').getContent()

    // Gebruikersnaam achterhalen
    auth.onAuthStateChanged(User =>{
        const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {

              const Gnaam = doc.data().Gebruikersnaam;
              const authID = doc.data().ID
              const GnaamClean = Gnaam.replace(authID, "")


              db.collectionGroup("Levensvragen").where("Levensvraag", "==", titel).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const vrager = doc1.data().Gebruikersnaam
                    const levensvraagClean = doc1.data().LevensvraagClean
                    const levensvraag = doc1.data().Levensvraag

            db.collection("Vitaminders").where("Gebruikersnaam", "==", vrager).get().then(querySnapshot => {
                querySnapshot.forEach(doc2 => {

                    const gebruikersnaamClean = doc2.data().GebruikersnaamClean
                    const email = doc2.data().Email

              // Saving openup insight
              db.collection("Insights").doc().set({
                Auteur: Gnaam,
                Body: inputCoach,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Levensvraag: titel,
                Vraagsteller: gebruikersnaamClean,
                Inspiratiepunten: 1,
                New: "Yes",
                Type: "Insight-Openup"
                    })

            //Sending mail
            db.collection("Mail").doc().set({
                    to: [email],
            message: {
            subject: `${gebruikersnaamClean}, je hebt een nieuwe reactie op je levensvraag ${levensvraagClean} op Vitaminds.`,
            html: `Hallo ${gebruikersnaamClean}, </br></br>
                    Je hebt een reactie ontvangen van coach ${GnaamClean} op je levensvraag "${levensvraagClean}"</br>
                    Bekijk de reactie <a href="https://vitaminds.nu/Open/${levensvraag}.html"><u>hier.</u></a></br></br>
                    Vriendelijke groet, </br></br>
                    Het Vitaminds Team </br></br>
                    <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
            Coach: Gnaam,
            }
                        
            }).catch((err) => {
                    console.log(err)
            })
            .then(()=>{
                    location.reload();
                            })
                        })
                    })
                })
            })
        })
    })
};
 

// Coach reacties overview
const DOMreacties = document.getElementById("insights-overview")

const reactieTitle = document.getElementById("insights-title")

reactieTitle.innerHTML = "Inzichten van onze coaches"

db.collectionGroup("Insights").where("Levensvraag", "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const reactie = doc.data().Body


        const coach = doc.data().Auteur

        const inspiratiepunten = doc.data().Inspiratiepunten
        const vraagsteller = doc.data().Vraagsteller
        const levensvraag = doc.data().Levensvraag

        const innerDiv = document.createElement("div")
            innerDiv.setAttribute("class", "inner-div-openup")
            innerDiv.setAttribute("data-coach", coach)
        const reactieDiv = document.createElement("div")
            reactieDiv.setAttribute("class", "reactie-div")
        const reactieP = document.createElement("h4")
            reactieP.setAttribute("class", "openup-reactie-p")
        const metaDiv = document.createElement("div")
            metaDiv.setAttribute("class", "meta-div-openup")
        const inspiratieLi = document.createElement("div")
            inspiratieLi.setAttribute("class", "openup-meta-detail")
        const coachDiv = document.createElement("div")
            coachDiv.setAttribute("class", "reaction-coach-div")
        const coachP = document.createElement("p")
            coachP.setAttribute("class", "openup-meta-detail")
        const coachLink = document.createElement("p")
            coachLink.setAttribute("class", "coach-link-openup")
        const timestampP = document.createElement("p")
            timestampP.setAttribute("class", "openup-meta-detail")
        const socialDiv = document.createElement("div")
            socialDiv.setAttribute("id", "social-div-openup")
        const inspirerendDiv = document.createElement("div")
            inspirerendDiv.setAttribute("onclick", "inspirerend(this)")
            inspirerendDiv.setAttribute("data-reactie", reactie)
            inspirerendDiv.setAttribute("data-coach", coach)
            inspirerendDiv.setAttribute("data-vrager", vraagsteller)
            inspirerendDiv.setAttribute("data-levensvraag", levensvraag)
        const inspirationalImg = document.createElement("img")
        const inspirerendP = document.createElement("p")
            inspirerendP.setAttribute("class", "inspirerend-openup")
        const toevoegenLevensles = document.createElement("p")
            toevoegenLevensles.setAttribute("class", "toevoegen-levensles")
        const bedankt = document.createElement("p")
            bedankt.setAttribute("id", "bedankt-open-up-inspirerend")
            bedankt.style.display = "none"
        const toevoegenLevenslesDiv = document.createElement("div")
            toevoegenLevenslesDiv.setAttribute("id", "toevoegen-levensles-div")
        const toevoegenLevenslesSelect = document.createElement("select")
            toevoegenLevenslesSelect.setAttribute("class", "toevoegen-levensles-select")
        const selectLevensvraagButtonDiv = document.createElement("div")
        const selectLevensvraagButton = document.createElement("button")
        const input = document.createElement("input")
            input.setAttribute("placeholder", "Wat heb je geleerd?")
            input.style.display = "none"
        const toevoegenLevenslesButton = document.createElement("button")
            toevoegenLevenslesButton.style.display = "none"
            toevoegenLevenslesButton.setAttribute("onclick", "toevoegenLevenslesButtonFunction(this)")
            toevoegenLevenslesButton.setAttribute("data-reactie", reactie)
            toevoegenLevenslesButton.setAttribute("data-coach", coach)
            toevoegenLevenslesButton.setAttribute("data-vrager", vraagsteller)
            toevoegenLevenslesButton.setAttribute("data-levensvraag", levensvraag)
        const opgeslagen = document.createElement("p")
            opgeslagen.style.display = "none"
            opgeslagen.style.color = "#49beb7"
        const editIcon = document.createElement("img")
            editIcon.setAttribute("src", "/images/edit-icon.png")
            editIcon.setAttribute("class", "edit-icon-insights")
            editIcon.setAttribute("onclick", "editIconInsightsOpenUp(this)")
            editIcon.setAttribute("data-reactie", reactie)
       
        coachP.addEventListener('click', (e) => {
            window.open("../Vitaminders/" + coach + ".html", "_self");
        });

        selectLevensvraagButton.addEventListener("click", () => {
            input.style.display = "block"
            toevoegenLevenslesButton.style.display = "block"
        });

        reactieP.innerHTML = reactie
        coachLink.innerHTML = "Bekijk profiel"

        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const coachID = doc1.data().ID
                const coachClean = coach.replace(coachID, "")
                const profielfoto = doc1.data().Profielfoto
                const naam = doc1.data().Gebruikersnaam

                coachDiv.addEventListener("click", () => {
                    window.open("../Vitaminders/" + naam + ".html", "_self");
                });
        
        const photoDiv = document.createElement("div")
                photoDiv.setAttribute("class", "openup-coach-reaction-photo")
                photoDiv.style.backgroundImage = `url(${profielfoto})`
        
                photoDiv.addEventListener("click", () => {
                    window.open("../Vitaminders/" + naam + ".html", "_self");
                                });

        coachP.innerHTML = coachClean
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timestampP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
        inspirerendP.innerHTML = "Inspirerend!"
        inspirationalImg.src = "/images/menu-karakter.png"
        bedankt.innerHTML = `${coachClean} zegt: bedankt!`
        toevoegenLevensles.innerHTML = "Heb je iets over jezelf geleerd?"
        selectLevensvraagButton.innerHTML = "Selecteer levensvraag"
        toevoegenLevenslesButton.innerHTML = "Opslaan"
        opgeslagen.innerHTML = `Opgeslagen in je <u>Digimind</u>`

        auth.onAuthStateChanged(User =>{
            userRef = db.collection("Vitaminders").doc(User.uid)
            userRef.get()
             .then(doc => {
                     const naam = doc.data().Gebruikersnaam
                     const naamID = doc.data().ID

        opgeslagen.addEventListener("click", () => {
            window.open("../Vitaminders/" + naam + ".html", "_self");
                        })
                    })
                });

                DOMreacties.appendChild(innerDiv)
                innerDiv.appendChild(metaDiv)
                metaDiv.appendChild(coachDiv)
                coachDiv.appendChild(photoDiv)
                coachDiv.appendChild(coachP)
                coachDiv.appendChild(coachLink)
                innerDiv.appendChild(reactieDiv)
                reactieDiv.appendChild(editIcon)
                reactieDiv.appendChild(reactieP)
                DOMreacties.appendChild(socialDiv)
                socialDiv.appendChild(inspirerendDiv)
                inspirerendDiv.appendChild(inspirerendP)
                // inspirerendDiv,appendChild(inspirationalImg)
                inspirerendDiv.appendChild(bedankt)
                socialDiv.appendChild(toevoegenLevensles)
                toevoegenLevensles.appendChild(toevoegenLevenslesDiv)
                toevoegenLevenslesDiv.appendChild(toevoegenLevenslesSelect)
                toevoegenLevenslesDiv.appendChild(selectLevensvraagButtonDiv)
                selectLevensvraagButtonDiv.appendChild(selectLevensvraagButton)
                toevoegenLevenslesDiv.appendChild(input)
                toevoegenLevenslesDiv.appendChild(toevoegenLevenslesButton)
                toevoegenLevenslesDiv.appendChild(opgeslagen)

                 // Levensvragen van auth in select
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
                            
                            toevoegenLevenslesOption.innerHTML = levensvraagClean

                            toevoegenLevenslesSelect.appendChild(toevoegenLevenslesOption)
                                    
                            })
                        })
                    }
                });

                //User roles

                    // Visitor
                    auth.onAuthStateChanged(User =>{
                    if (!User){
                        
                        editIcon.style.display = "none"
                    }
                    });

                    //Non auth
                    const coachData = innerDiv.dataset.coach
                   
                    auth.onAuthStateChanged(User =>{
                     db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                             const auth = doc.data().Gebruikersnaam
 
                             console.log(auth)
                             console.log(coachData)
                     
                 if(coachData != auth){
 
                     editIcon.style.display = "none"
 
                        }
                        
                    })
                });
            })
        })
    })
});



   // Inspiratiepunt wegschrijven naar reactie en coach

   function inspirerend(elem){
       
           const reactieData = elem.dataset.reactie
           const coachData = elem.dataset.coach
           const vragerData = elem.dataset.vrager
           const levensvraag = elem.dataset.levensvraag

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
                        Source: reactieData,
                        Titel: levensvraag,
                        Giver: naam,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        Type: "Openup"
                    })

                })
            })
                    // Naar reactie
                    db.collectionGroup("Insights").where("Body", "==", reactieData).where("Type", "==", "Insight-Openup").get().then(querySnapshot => {
                        querySnapshot.forEach(doc3 => {

                    db.collection("Insights").doc(doc3.id).update({
        
                                Inspiratiepunten: firebase.firestore.FieldValue.increment(1)
                
                                    })
                                })
                })
            const bedankt = elem.firstElementChild.nextSibling
            bedankt.style.display = "block"
        })
    })
};

 // Toevoegen aan levensles verwerken in database
    
function toevoegenLevenslesButtonFunction(elem){

            const input = elem.previousElementSibling.value
            const reactie = elem.dataset.reactie
            const coach = elem.dataset.coach

            const uitlezenOption = elem.previousElementSibling.previousElementSibling.previousElementSibling.options
            const uitlezenSelect = uitlezenOption[uitlezenOption.selectedIndex].innerHTML;

            auth.onAuthStateChanged(User =>{
                userRef = db.collection("Vitaminders").doc(User.uid)
                userRef.get()
                 .then(doc => {
                         const naam = doc.data().Gebruikersnaam

            db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Levensles: input,
            Levensvraag: uitlezenSelect,
            Auteur: coach,
            Gebruikersnaam: naam,
            Titel: titel,
            Source: reactie,
            Inspirerend: 1,
            Type: "Openup"
                    })


            
            levensvraagRef = db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", uitlezenSelect)
            levensvraagRef.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc1 => {
                    
                    db.collection("Vitaminders").doc(User.uid).collection("Levensvragen").doc(doc1.id).update({
                        Levenslessen: firebase.firestore.FieldValue.arrayUnion(input)
                    })
                    
                })
            })

            elem.nextSibling.style.display = "block"
        })
    })
};
