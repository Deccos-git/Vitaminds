// Openbare levensvragen inladen
db.collectionGroup('Levensvragen').where("Openbaar", "==", "Ja").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const gebruikersnaam = doc.data().Gebruikersnaam
        const omschrijving = doc.data().Omschrijving
        const ID = doc.data().ID
        const levenslessen = doc.data().Levenslessen

        console.log(levenslessen)

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

        // Hide goals without lessons
        if (levenslessen.length == 0){
            innerDiv.style.display = "none"
        }

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
                    profilePicture.setAttribute("class", "openup-profile-pic-detail")

                profilePicture.style.backgroundImage = `url('${profilePic}')`

                profilePicture.addEventListener("click", () => {
                    window.open("../Vitaminders/" + gebruikersnaam + ".html", "_self")
                       })

        // Pagetitle and meta's

        const titelHead = document.getElementsByTagName("title")
        const metaKeywords = document.getElementById("meta-keywords")
        const metaDescription = document.getElementById("meta-description")
        const doelTitel = document.createElement("h2")
            doelTitel.setAttribute("id", "doel-titel-h2")
        const lessenTitel = document.createElement("h2")
            lessenTitel.setAttribute("id", "lessen-titel-h2")

            const titelHeadArray = Array.from(titelHead)

            titelHeadArray.forEach(tit => {
                tit.innerHTML = levensvraag
            })

            doelTitel.innerHTML = "Doel"
            metaKeywords.content = levensvraag
            metaDescription.content = omschrijving
            lessenTitel.innerHTML = "Mijn ontwikkeling"

        DOM.appendChild(innerDiv)
        innerDiv.appendChild(headDiv)
        innerDiv.appendChild(authDiv)
        authDiv.appendChild(profilePicture)
        authDiv.appendChild(naam)
        innerDiv.appendChild(doelTitel)
        innerDiv.appendChild(vraagDiv)
        vraagDiv.appendChild(vraag)
        vraagDiv.appendChild(omschrijvingP)
        DOM.appendChild(lessenTitel)

        // Levenslessen metadata inladen die passen bij levensvragen

        db.collectionGroup("Levenslessen").where("Levensvraag", "==", titel).orderBy("Timestamp", "desc").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const les = doc.data().Levensles
                const type = doc.data().Type
                const timestamp = doc.data().Timestamp
                const inspirator = doc.data().Auteur
                const bron = doc.data().Titel

                const outerBronDiv = document.createElement("div")
                    outerBronDiv.setAttribute("class", "outer-bron-div")
                const bronDiv = document.createElement("div")
                    bronDiv.setAttribute("class", "bron-div-detail") 
                const titelH3 = document.createElement("h3") 
                const lessen = document.createElement("p")
                const metaDiv = document.createElement("div")
                    metaDiv.setAttribute("class", "meta-div-open-up")
                const typeMeta = document.createElement("p")
                const timestampMeta = document.createElement("p")
                    timestampMeta.setAttribute("class", "timestamp-meta-p")
                const titelP = document.createElement("p")
                    titelP.setAttribute("class", "openup-meta-source")
                
                // Titel
                if(type == "Coach-inzicht"){
                    titelH3.innerHTML = "Geinspireerd door coach"
                } else if (type == "Check-in"){
                    titelH3.innerHTML = "Check in"
                }
                
                lessen.innerHTML = les
                typeMeta.innerHTML = type
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                timestampMeta.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

                // Coach
                if(inspirator != undefined){

                db.collection("Vitaminders").where("Gebruikersnaam", "==", inspirator).get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const photo = doc1.data().Profielfoto

                        const photoDiv = document.createElement("div")
                            photoDiv.setAttribute("class", "photo-div-open-up-meta")
                        const photoTitel = document.createElement("p")

                        photoTitel.innerHTML = "Geïnspireerd door"
                        photoDiv.style.backgroundImage = `url(${photo}`

                        photoDiv.addEventListener("click", () => {
                            window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                            })

                            metaDiv.appendChild(photoTitel)
                            photoTitel.appendChild(photoDiv)

                        })
                    });
                };
    
                // Bron
                if(bron != undefined){

                    // Levensvraag Article
                    db.collection("Levensvragen").where("Levensvraag", "==", bron).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {

                            const titel = doc1.data().Levensvraag
                    
                    titelP.innerHTML = `Geïnspireerd in <br><u>${titel}</u>`

                    titelP.addEventListener("click", () => {
                        window.open("../Artikelen/" + titel + ".html", "_self");
                            })
                            
                        metaDiv.appendChild(titelP)

                        })
                    });

                    // Theme Article
                    db.collection("Themas").where("Thema", "==", bron).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {

                            const titel = doc1.data().Thema
                    
                    titelP.innerHTML = `Geïnspireerd in <br><u>${titel}</u>`

                    titelP.addEventListener("click", () => {
                        window.open("../Theme-articles/" + titel + ".html", "_self");
                            })
                            
                        metaDiv.appendChild(titelP)

                        })
                    });
                };
                 
               DOM.appendChild(outerBronDiv)
                outerBronDiv.appendChild(bronDiv)
                bronDiv.appendChild(titelH3)
                titelH3.appendChild(timestampMeta)
                bronDiv.appendChild(lessen)
                bronDiv.appendChild(metaDiv) 

                                })
                            })
                        })
                    })
                })
            })
        })
    });


