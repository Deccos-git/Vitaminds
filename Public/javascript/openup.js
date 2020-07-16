// Openbare levensvragen inladen

const DOM = document.getElementById("verzamelOpenUps")


        db.collectionGroup("Levenslessen").orderBy("Timestamp", "desc").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const les = doc.data().Levensles
                const type = doc.data().Type
                const timestamp = doc.data().Timestamp
                const inspirator = doc.data().Auteur
                const bron = doc.data().Titel
                const gebruikersnaam = doc.data().Gebruikersnaam
                const levensvraag = doc.data().Levensvraag

                const outerBronDiv = document.createElement("div")
                    outerBronDiv.setAttribute("class", "outer-bron-div")
                const metaUserDiv = document.createElement("div")
                    metaUserDiv.setAttribute("class", "meta-user-div")
                const metaUserPhoto = document.createElement("img")
                const metaUserName = document.createElement("p")
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
                const editIcon = document.createElement("img")
                    editIcon.setAttribute("src", "../images/edit-icon.png")
                    editIcon.setAttribute("class", "edit-icon-insights")
                    editIcon.setAttribute("onclick", "editLessonOpenUp(this)")
                    editIcon.setAttribute("data-lesson", les)

                    // Hide private

                    db.collectionGroup('Levensvragen').where("Levenslessen", "array-contains", les).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                        
                            const public = doc.data().Openbaar

                            console.log(public)

                            if(public == "Nee"){
                                bronDiv.style.display = "none"
                            }

                    // Loader display none

                    const loader = document.getElementById("loader")
                        loader.style.display = "none"

                    // User meta
                    db.collection("Vitaminders").where("Gebruikersnaam", "==", gebruikersnaam).get().then(querySnapshot => {
                        querySnapshot.forEach(doc4 => {

                            const userClean = doc4.data().GebruikersnaamClean
                            const userPhoto = doc4.data().Profielfoto

                    metaUserPhoto.src = userPhoto
                    metaUserName.innerHTML = userClean

                    metaUserDiv.addEventListener("click", () => {
                        window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
                        });

                        })
                    });

                    metaUserDiv.appendChild(metaUserPhoto)
                    metaUserDiv.appendChild(metaUserName)

                
                // Titel
                if(type == "Coach-inzicht"){

                    db.collection("Vitaminders").where("Gebruikersnaam", "==", inspirator).get().then(querySnapshot => {
                        querySnapshot.forEach(doc3 => {

                            const coachClean = doc3.data().GebruikersnaamClean

                    titelH3.innerHTML = `Geinspireerd door <i>${coachClean}</i>`

                    titelH3.addEventListener("click", () => {
                        window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                        });

                        titelH3.style.cursor = "pointer"

                        })
                    });
                } else if (type == "Check-in"){

                    db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraag).get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {

                            const levensvraagClean = doc2.data().LevensvraagClean
                    titelH3.innerHTML = `Check in bij <i> ${levensvraagClean}</i>`

                        })
                    });
                };
                
                lessen.innerHTML = les
                typeMeta.innerHTML = type
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                timestampMeta.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

                // Coach
                // if(inspirator != undefined){

                // db.collection("Vitaminders").where("Gebruikersnaam", "==", inspirator).get().then(querySnapshot => {
                //     querySnapshot.forEach(doc1 => {

                //         const photo = doc1.data().Profielfoto
                //         const gebruikersnaamClean = doc1.data().GebruikersnaamClean

                //         const photoDiv = document.createElement("div")
                //             photoDiv.setAttribute("class", "photo-div-open-up-meta")
                //         const photoTitel = document.createElement("p")

                //         const toolTipDiv = document.createElement("div")
                //             toolTipDiv.setAttribute("class", "tool-tip-inspirator-open-up")
                //         const toolTipP = document.createElement("p")

                //             toolTipP.innerHTML = gebruikersnaamClean

                //         photoTitel.innerHTML = "Geïnspireerd door"
                //         photoDiv.style.backgroundImage = `url(${photo}`

                //         photoDiv.addEventListener("click", () => {
                //             window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                //             })

                //         toolTipDiv.addEventListener("click", () => {
                //             window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                //             })

                //         photoDiv.addEventListener("mouseover", () => {
                //             toolTipDiv.style.opacity = "100%"
                //             toolTipDiv.style.transition= "opacity 5s"
                //         })

                //             metaDiv.appendChild(photoTitel)
                //             photoTitel.appendChild(photoDiv)
                //             photoTitel.appendChild(toolTipDiv)
                //             toolTipDiv.appendChild(toolTipP)

                //         })
                //     });
                // };
    
                // // Bron
                // if(bron != undefined){

                //     // Levensvraag Article
                //     db.collection("Levensvragen").where("Levensvraag", "==", bron).get().then(querySnapshot => {
                //         querySnapshot.forEach(doc1 => {

                //             const titel = doc1.data().Levensvraag
                    
                //     titelP.innerHTML = `Geïnspireerd in <br><u>${titel}</u>`

                //     titelP.addEventListener("click", () => {
                //         window.open("../Artikelen/" + titel + ".html", "_self");
                //             })
                            
                //         metaDiv.appendChild(titelP)

                //         })
                //     });

                //     // Theme Article
                //     db.collection("Themas").where("Thema", "==", bron).get().then(querySnapshot => {
                //         querySnapshot.forEach(doc1 => {

                //             const titel = doc1.data().Thema
                    
                    // titelP.innerHTML = `Geïnspireerd in <u>${titel}</u>`

                    // titelP.addEventListener("click", () => {
                    //     window.open("../Theme-articles/" + titel + ".html", "_self");
                    //         })
                            
                    //     titelH3.appendChild(titelP)

                //         })
                //     });
                // };

                     // User role
                    // Visitor
                    auth.onAuthStateChanged(User =>{
                        if (!User){
                            editIcon.style.display = "none"
                        }
                    });
                       //Non auth
                       
                       auth.onAuthStateChanged(User =>{
                        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                                const auth = doc.data().Gebruikersnaam
                        
                    if(gebruikersnaam != auth){
    
                        editIcon.style.display = "none"
    
                            }
                        })
                    });
                 
                DOM.appendChild(outerBronDiv)
                outerBronDiv.appendChild(bronDiv)
                bronDiv.appendChild(metaUserDiv)
                bronDiv.appendChild(editIcon)
                bronDiv.appendChild(titelH3)
                bronDiv.appendChild(lessen)
                bronDiv.appendChild(timestampMeta)
                bronDiv.appendChild(metaDiv) 

                                })
                            })
                        })
                    });


