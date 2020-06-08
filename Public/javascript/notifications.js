auth.onAuthStateChanged(User =>{
    if (User){
        let docRef = db.collection("Vitaminders").doc(User.uid);
            docRef.get().then(function(doc){
                const naam = doc.data().Gebruikersnaam;


// Profile visits
auth.onAuthStateChanged(User =>{
    if (User){
        let docRef = db.collection("Vitaminders").doc(User.uid);
            docRef.get().then(function(doc){
                    const views = doc.data().Pageviews
    
    const DOMvisits = document.getElementById("pageviews")
    if(DOMvisits == null){
            console.log("Error")
    } else {
    const viewsP = document.createElement("p")

    viewsP.innerHTML = `Je profiel is in totaal ${views} keer bekeken`

    DOMvisits.appendChild(viewsP)
                    }
            })
    }
});

document.addEventListener("DOMContentLoaded", () => {
    db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                    db.collection("Vitaminders").doc(doc.id).update({
                            Pageviews: firebase.firestore.FieldValue.increment(1)
                    })

            })
    })
});


// Notifcations-page

    // Gamefication-notifications
    const lengthArray = [];

    auth.onAuthStateChanged(User =>{
            if(User){
              const userRef = db.collection("Vitaminders").doc(User.uid);
              userRef.get().then(function(doc) {
                if (doc.exists) {
                 const auth = doc.data().Gebruikersnaam;
                 const email = doc.data().Email

    db.collectionGroup("Inspiration").where("Reciever", "==", auth).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

            const docLengt = [doc]          
                    objectLength = Object.keys(docLengt).length
                    lengthArray.push(objectLength)

                                    })
                            }).then(() => {
                                    
                                    // Total points in Notifications
                                    const DOM =  document.getElementById("total-inspiration")

                                    if(DOM == null){
                                            console.log("Error")
                                    } else{
                                    const innerDiv = document.createElement("div")
                                            innerDiv.setAttribute("id", "inner-div-gamefication")
                                    const totalPoints = document.createElement("p")
                                    const titel = document.createElement("h2")
                                    
                                    titel.innerHTML = "Totaal aantal inspiratiepunten"

                                    totalPoints.innerHTML = lengthArray.length
                    
                                    DOM.appendChild(innerDiv)
                                    innerDiv.appendChild(titel)
                                    innerDiv.appendChild(totalPoints)

                                      
                                    // Trophies 
                                    const trophies = document.getElementById("trophies").getElementsByTagName("img")

                                    function trophiesRewarded(a,b){
                                    if(lengthArray.length >= b){
                                            trophies[a].src = `images/Trophies/${b}.png`
                                            }  
                                    }

                                    trophiesRewarded(0,1)
                                    trophiesRewarded(1,5)
                                    trophiesRewarded(2,10)
                                    trophiesRewarded(3,20)
                                    trophiesRewarded(4,40)
                                    trophiesRewarded(5,80)
                                    trophiesRewarded(6,160)
                                   
                                    }
                            }) 
                     }
            })
    }
});



    // Inspiration-notifications

    auth.onAuthStateChanged(User =>{
            let docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
                    const auth = doc.data().Gebruikersnaam;
                    const ID = doc.data().ID

    db.collectionGroup("Inspiration").where("Reciever", "==", auth).orderBy("Timestamp", "desc").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                    const giver = doc.data().Giver
                    const type = doc.data().Type
                    const titel = doc.data().Titel
                    const inspiration = doc.data().Inspiration
                    const source = doc.data().Source

                    const DOM = document.getElementById("inspiration-notifications")
                    if(DOM == null){
                            console.log("Error")
                    } else {
                    const outerDiv = document.createElement("div")
                            outerDiv.setAttribute("class", "gamefication-outer-div")
                    const dateP = document.createElement("h4")
                    const string = document.createElement("h3")
                    const innerDiv = document.createElement("div")
                            innerDiv.setAttribute("class", "gamefication-inner-div")
                    const ul = document.createElement("ul")
                    const liGiver = document.createElement("li")
                        liGiver.setAttribute("class", "meta-notifications")
                    const liType = document.createElement("li")
                    const liSource = document.createElement("li")
                        liSource.setAttribute("class", "meta-notifications")
                    const link = document.createElement("h4")

                    db.collection("Vitaminders"). where('Gebruikersnaam', "==", giver).get().then(querySnapshot => {
                            querySnapshot.forEach(doc1 => {

                                    const giverClean = doc1.data().GebruikersnaamClean

                                    //Open up
                         if (type == "Openup"){
                            db.collectionGroup("Levensvragen").where("Levensvraag", "==", titel).get().then(querySnapshot => {
                                    querySnapshot.forEach(doc3 => {
    
                                            const levensvraagClean = doc3.data().LevensvraagClean
                                            const levensvraag = doc3.data().Levensvraag
    
                            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
    
                            string.innerHTML = `Je hebt 1 nieuw inspiratiepunt ontvangen!`
                            liGiver.innerHTML = `Van <u>${giverClean}</u>`
                            liGiver.addEventListener("click", () => {
                                    window.open("../Vitaminders/" + giver + ".html", "_self");
                            })
    
                            liType.innerHTML = `Op je inzicht: ${source}`
                            link.innerHTML = `<u>${inspiration}</u>`
                            liSource.innerHTML = `Bron: <i>${type}</i> ${levensvraagClean}`
                            
                            liSource.addEventListener("click", () => {
                                window.open("../Open/" + levensvraag + ".html", "_self");
                                        })
                                    })
                            })   
                    } else if (type == "Insight"){
                            // Levensvraag artikelen
                        db.collection("Insights").where("LevensvraagArtikel", "==", titel).get().then(querySnapshot => {
                                querySnapshot.forEach(doc3 => {

                                        const levensvraag = doc3.data().LevensvraagArtikel

                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);

                        string.innerHTML = `Je hebt 1 nieuw inspiratiepunt ontvangen!`
                        liGiver.innerHTML = `Van <u>${giverClean}</u>`
                        liGiver.addEventListener("click", () => {
                                window.open("../Vitaminders/" + giver + ".html", "_self");
                        })

                        liType.innerHTML = `Op je inzicht: ${inspiration}`
                        link.innerHTML = `<u>${inspiration}</u>`
                        liSource.innerHTML = `Bron: ${levensvraag}`

                        liSource.addEventListener("click", () => {
                                window.open("../Artikelen/" + levensvraag + ".html", "_self");
                                        })
                                })
                        })   

                        // Theme artikelen
                        db.collection("Insights").where("ThemeArtikel", "==", titel).get().then(querySnapshot => {
                                querySnapshot.forEach(doc3 => {

                                        const levensvraag = doc3.data().ThemeArtikel

                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);

                        string.innerHTML = `Je hebt 1 nieuw inspiratiepunt ontvangen!`
                        liGiver.innerHTML = `Van <u>${giverClean}</u>`
                        liGiver.addEventListener("click", () => {
                                window.open("../Vitaminders/" + giver + ".html", "_self");
                        })

                        liType.innerHTML = `Op je inzicht: ${inspiration}`
                        link.innerHTML = `<u>${inspiration}</u>`
                        liSource.innerHTML = `Bron: ${levensvraag}`

                        liSource.addEventListener("click", () => {
                                window.open("../Artikelen/" + levensvraag + ".html", "_self");
                                        })
                                })
                        })   
                } 
                })
            })

                    DOM.appendChild(outerDiv)
                    outerDiv.appendChild(string)
                    outerDiv.appendChild(innerDiv)
                    innerDiv.appendChild(ul)
                    ul.appendChild(liGiver)
                    ul.appendChild(liType)
                    ul.appendChild(liSource)
                    outerDiv.appendChild(dateP)
                                            }
                                    })
                            
                            })
                    })
            });


        })
    }
});