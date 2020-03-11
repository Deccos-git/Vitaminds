// Openbare levensvragen inladen

db.collectionGroup('Levensvragen').where("Openbaar", "==", "Ja").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const levensvraag = doc.data().Levensvraag
        const gebruikersnaam = doc.data().Gebruikersnaam
        const levenslessen = doc.data().Levenslessen

       

        const DOM = document.getElementById("verzamelOpenUps")

        const vraagDIV = document.createElement("div")
        const vraag = document.createElement("h3")
        const lessenDiv = document.createElement("div")
        
        const metaDiv = document.createElement("div")
        const naam = document.createElement("p")
        
        vraag.innerHTML = levensvraag
        naam.innerHTML = gebruikersnaam

        DOM.appendChild(vraagDIV)
        vraagDIV.appendChild(vraag)
    
        levenslessen.forEach(les => {
        
            const lessen = document.createElement("h4")
            lessen.innerHTML = les
            DOM.appendChild(lessenDiv)
            lessenDiv.appendChild(lessen)

        })
        DOM.appendChild(metaDiv)
        metaDiv.appendChild(naam)
       
    })
})


    
