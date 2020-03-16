// Openbare levensvragen inladen

db.collectionGroup('Levensvragen').where("Openbaar", "==", "Ja").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const levensvraag = doc.data().Levensvraag
        const gebruikersnaam = doc.data().Gebruikersnaam
        const levenslessen = doc.data().Levenslessen

        const DOM = document.getElementById("verzamelOpenUps") 

        const innerDiv = document.createElement("div")
            innerDiv.setAttribute("class", "openup-div") 
        const authDiv = document.createElement("div")
            authDiv.setAttribute("class", "auth-div")
        const vraagDiv = document.createElement("div") 
            vraagDiv.setAttribute("class", "vraag-div")      
        const vraag = document.createElement("h3")
        const naam = document.createElement("p")
            naam.setAttribute("class", "openup-meta")

        vraag.innerHTML = levensvraag
        naam.innerHTML = "Gesteld door " + `<u>${gebruikersnaam}</u>`

        naam.addEventListener("click", () => {
            window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
        })

        DOM.appendChild(innerDiv)
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

                const bronDiv = document.createElement("div")
                    bronDiv.setAttribute("class", "bron-div")   
                const lessen = document.createElement("h4")
                const titelP = document.createElement("p")
                    titelP.setAttribute("class", "openup-meta")
                const inspiratorP = document.createElement("p")
                    inspiratorP.setAttribute("class", "openup-meta")
                
                lessen.innerHTML ='<img class="menu-icon" src="../Images/menu-karakter.png" alt="menu contact" width="20px"> ' + les
                inspiratorP.innerHTML = "Geinspïreerd door " + `<u>${inspirator}</u>`

                inspiratorP.addEventListener("click", () => {
                    window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                })

                titelP.innerHTML = "Geïnspireerd in " + `<u>${titel}</u>`

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


