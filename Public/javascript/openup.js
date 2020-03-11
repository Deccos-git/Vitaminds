// Openbare levensvragen inladen

const levenslessenGlobal = [];
const DOM = document.getElementById("verzamelOpenUps")

db.collectionGroup('Levensvragen').where("Openbaar", "==", "Ja").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const levensvraag = doc.data().Levensvraag
        const gebruikersnaam = doc.data().Gebruikersnaam
        const levenslessen = doc.data().Levenslessen

        levenslessenGlobal.push(levenslessen)

        const div = document.createElement("div")
            div.setAttribute("class", "openup-div")
            div.setAttribute("data-levensvraag", levenslessen)
        const vraagDIV = document.createElement("div")
        const vraag = document.createElement("h3")
        const lessenDiv = document.createElement("div")
        
        const metaDiv = document.createElement("div")
            metaDiv.setAttribute("class", "meta-div")
        const naam = document.createElement("p")
        
        vraag.innerHTML = levensvraag
        naam.innerHTML = gebruikersnaam

        DOM.appendChild(metaDiv)
        metaDiv.appendChild(vraagDIV)
        vraagDIV.appendChild(vraag)
    
        levenslessen.forEach(les => {
        
            const lessen = document.createElement("h4")
            lessen.innerHTML = les
            DOM.appendChild(div)
            div.appendChild(lessenDiv)
            lessenDiv.appendChild(lessen)

        })
        DOM.appendChild(div)
        div.appendChild(metaDiv)
        metaDiv.appendChild(naam)  
    })
}).then(() => {

// Details van levenslessen invoegen
levenslessenGlobal.forEach(levensles => {
levensles.forEach(l => {

db.collectionGroup("Levenslessen").where("Levensles", "==", l).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const inspirator = doc.data().Auteur
        const titel = doc.data().Titel

        const divData = document.querySelectorAll("[data-levensvraag]")
        const dataArray = Array.from(divData)

        dataArray.forEach(div => {
            const data = div.dataset.levensvraag

            console.log("levensles =" + l)
            console.log("data =" + data)

            if(l == data){
                const titelP = document.createElement("p")
                const inspiratorP = document.createElement("p")
                const metaDiv = document.createElement("div")
                    metaDiv.setAttribute("class", "meta-div")

                titelP.innerHTML = titel
                inspiratorP.innerHTML = inspirator

                DOM.appendChild(div)
                div.appendChild(metaDiv)
                metaDiv.appendChild(titelP) 
                metaDiv.appendChild(inspiratorP)
            }
        })
        

       
        
    })
})
})
})
})
    
