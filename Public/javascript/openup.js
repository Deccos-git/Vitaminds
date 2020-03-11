// Openbare levensvragen inladen

db.collectionGroup('Levensvragen').where("Openbaar", "==", "Ja").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const levensvraag = doc.data().Levensvraag
        const gebruikersnaam = doc.data().Gebruikersnaam
        const levenslessen = doc.data().Levenslessen

        const DOM = document.getElementById("verzamelOpenUps") 
                
        const vraag = document.createElement("h3")
            vraag.setAttribute("class", "openup-div")
        const naam = document.createElement("p")
            naam.setAttribute("class", "openup-meta")

        vraag.innerHTML = levensvraag
        naam.innerHTML = "Gesteld door " + `<u>${gebruikersnaam}</u>`

        naam.addEventListener("click", () => {
            window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
        })

        DOM.appendChild(vraag)
        vraag.appendChild(naam)

        // Levenslessen metadata inladen die passen bij levensvragen

        levenslessen.forEach(les => {

        db.collectionGroup("Levenslessen").where("Levensles", "==", les).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const inspirator = doc.data().Auteur
                const titel = doc.data().Titel

                const lessen = document.createElement("h4")
                const titelP = document.createElement("p")
                    titelP.setAttribute("class", "openup-meta")
                const inspiratorP = document.createElement("p")
                    inspiratorP.setAttribute("class", "openup-meta")
                
                lessen.innerHTML ='<img class="menu-icon" src="../Images/menu-karakter.png" alt="menu contact" width="20px">' + les
                inspiratorP.innerHTML = "Geinspïreerd door " + `<u>${inspirator}</u>`

                inspiratorP.addEventListener("click", () => {
                    window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                })

                titelP.innerHTML = "Geïnspireerd in " + `<u>${titel}</u>`

                titelP.addEventListener("click", () => {
                    window.open("../Artikelen/" + [titel] + ".html", "_self");
                })
                 
                vraag.appendChild(lessen)
                lessen.appendChild(inspiratorP)
                lessen.appendChild(titelP)
                })
            })
        })
    })
})

// const levenslessenGlobal = [];
// const lesGlobal = [];

// const DOM = document.getElementById("verzamelOpenUps")

// db.collectionGroup('Levensvragen').where("Openbaar", "==", "Ja").get().then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//         const levensvraag = doc.data().Levensvraag
//         const gebruikersnaam = doc.data().Gebruikersnaam
//         const levenslessen = doc.data().Levenslessen

//         levenslessenGlobal.push(levenslessen)

//         levenslessen.forEach(les => {
//             lesGlobal.push(les)
//         })

//         const div = document.createElement("div")
//             div.setAttribute("class", "openup-div")
//         const vraagDIV = document.createElement("div")
//             vraagDIV.setAttribute("class", "vraag-div")
//             vraagDIV.setAttribute("data-levensles", lesGlobal)
//         const vraag = document.createElement("h3")
//         const lessenDiv = document.createElement("div")
//             lessenDiv.setAttribute("class", "lessen-div")
//             lessenDiv.setAttribute("data-levensles", lesGlobal)
//         const metaDiv = document.createElement("div")
//             metaDiv.setAttribute("class", "meta-div")
//         const naamDiv = document.createElement("div")
//         const naam = document.createElement("p")
        
//         vraag.innerHTML = levensvraag
//         naam.innerHTML = gebruikersnaam

//         DOM.appendChild(div)
//         div.appendChild(vraagDIV)
//         vraagDIV.appendChild(vraag)
    
//         levenslessen.forEach(les => {
        
//             const lessen = document.createElement("h4")
//             lessen.innerHTML = les
//             DOM.appendChild(div)
//             div.appendChild(lessenDiv)
//             lessenDiv.appendChild(lessen)

//         })
//         DOM.appendChild(div)
//         div.appendChild(naamDiv)
//         naamDiv.appendChild(naam)  
//     })
// }).then(() => {

// // Details van levenslessen invoegen
// levenslessenGlobal.forEach(levensles => {
// levensles.forEach(l => {

// db.collectionGroup("Levenslessen").where("Levensles", "==", l).get().then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//         const inspirator = doc.data().Auteur
//         const titel = doc.data().Titel

//         const vraagDivData = document.querySelectorAll(".vraag-div")
//         const vragenDivDataArray = Array.from(vraagDivData)

//         vragenDivDataArray.forEach(vragenData => {
//             console.log(vragenData)

//             const dataH3 = vragenData.dataset.levensles
//             const vragenSplit = dataH3.split(',')

//             vragenSplit.forEach(vraag => {

//                 if(l == vraag){

                   
               

//         const lessenDivData = document.querySelectorAll(".lessen-div")
//         const lessenDataArray = Array.from(lessenDivData)

//         lessenDataArray.forEach(lessenData => {
//             const data = lessenData.dataset.levensles
//             const lessenSplit = data.split(',');

//             lessenSplit.forEach(les => {

//             if(l == les){
//                 const titelP = document.createElement("p")
//                 const inspiratorP = document.createElement("p")
//                 const metaDiv = document.createElement("div")
//                     metaDiv.setAttribute("class", "meta-div")

//                 titelP.innerHTML = titel
//                 inspiratorP.innerHTML = inspirator

//                 DOM.appendChild(vragenData)
//                 vragenData.appendChild(lessenData)
//                 lessenData.appendChild(metaDiv)
//                 metaDiv.appendChild(titelP) 
//                 metaDiv.appendChild(inspiratorP)
//             }
//         })
//     })

// }
// })
// })
        
//     })

// })
// })
// })
// })
    
