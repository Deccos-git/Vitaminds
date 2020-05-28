

// Theme overview Zelfkennis
const themeSection = document.getElementById("list-of-themes")

db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const domein = doc.data().Domein
        console.log(domein)

        const domeinH3 = document.createElement("h3")
        const domeinDiv = document.createElement("div")
            domeinDiv.setAttribute("class", "domein-div")
        const domeinP = document.createElement("p")

        domeinH3.innerHTML = "<u>Domein</u>"
        domeinP.innerHTML = domein

        themeSection.appendChild(domeinDiv)
        domeinDiv.appendChild(domeinH3)
        domeinDiv.appendChild(domeinP)

        // Levensvragen
        db.collection("Levensvragen").where("Domein", "==", domein).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const levensvragen = doc1.data().Levensvraag
                const insights = doc1.data().Insights

                const levensvraagH3 = document.createElement("h3")
                const outerDiv = document.createElement("div")
                    outerDiv.setAttribute("class", "outer-div")
                const levensvraagDiv = document.createElement("div")
                    levensvraagDiv.setAttribute("class", "levensvraag-div")
                const levensvraagP = document.createElement("p")
                const numberOfInsights = document.createElement("p")
                    numberOfInsights.setAttribute("class", "number-of-insights")

                levensvraagP.style.cursor = "pointer"

                levensvraagH3.innerHTML = "<u>Levensvraag</u>"
                levensvraagP.innerHTML = levensvragen
                numberOfInsights.innerHTML = `Aantal inzichten: (${insights.length})`

                levensvraagP.addEventListener("click", () => {
                    window.open(`../Artikelen/${levensvragen}.html`, "_self");
                })    

                domeinDiv.appendChild(outerDiv)
                outerDiv.appendChild(levensvraagDiv)
                levensvraagDiv.appendChild(levensvraagH3)
                levensvraagDiv.appendChild(levensvraagP)
                levensvraagP.appendChild(numberOfInsights)

                // Themas
                db.collection("Themas").where("Levensvragen", "array-contains", levensvragen).get().then(querySnapshot => {
                    querySnapshot.forEach(doc2 => {

                        const themas = doc2.data().Thema
                        const insights = doc2.data().Insights

                        console.log(themas + insights.length)

                        const themeH3 = document.createElement("h3")
                        const themeDiv = document.createElement("div")
                            themeDiv.setAttribute("class", "theme-div")
                        const themeP = document.createElement("p")
                        const numberOfInsights = document.createElement("p")
                            numberOfInsights.setAttribute("class", "number-of-insights")

                            themeP.style.cursor = "pointer"

                        themeH3.innerHTML = "<u>Tool</u>"
                        themeP.innerHTML = themas
                        numberOfInsights.innerHTML = `Aantal inzichten: (${insights.length})`

                        themeP.addEventListener("click", () => {
                            window.open(`../Theme-articles/${themas}.html`, "_self");
                        })

                        levensvraagDiv.appendChild(themeDiv)
                        themeDiv.appendChild(themeH3)
                        themeDiv.appendChild(themeP)
                        themeP.appendChild(numberOfInsights)
                        
                        // Paragrafen
                        db.collection("Themas").where("Thema", "==", themas).get().then(querySnapshot => {
                            querySnapshot.forEach(doc3 => {

                                const paragraphs = doc3.data().Paragraphs

                                const paragraphH3 = document.createElement("h3")
                                const paragraphDiv = document.createElement("div")
                                    paragraphDiv.setAttribute("class", "paragraph-div")

                                paragraphH3.innerHTML = "<u>Paragrafen</u>"

                                themeP.appendChild(paragraphDiv)
                                paragraphDiv.appendChild(paragraphH3)

                                paragraphs.forEach(parra => {

                                    const paragraphsP = document.createElement("p")

                                    paragraphsP.innerHTML = parra

                                    paragraphDiv.appendChild(paragraphsP)
                                })
                            })
                        })
                    })
                })
            })
        }) 
    })
});

// Theme overview Coaches
const themeSectionCoach = document.getElementById("list-of-themes-coaching")

db.collection("Kenniscentrum").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const coachvraag = doc.data().Coachvraag

        console.log(coachvraag)

        const domeinH3 = document.createElement("h3")
        const domeinDiv = document.createElement("div")
            domeinDiv.setAttribute("class", "domein-div")
        const domeinP = document.createElement("p")

        domeinH3.innerHTML = "<u>Coachvraag</u>"
        domeinP.innerHTML = coachvraag

        themeSectionCoach.appendChild(domeinDiv)
        domeinDiv.appendChild(domeinH3)
        domeinDiv.appendChild(domeinP)

    })
});


// Feedback themas

function feedback(){

const DOMfeedback = document.getElementById("feedback-thema")
const feedbackArea = document.getElementById("feedback-div")

const titelH2 = document.createElement("h2")
const closeDiv = document.createElement("div")
    closeDiv.setAttribute("id", "close-div-feedback")

DOMfeedback.appendChild(titelH2)
DOMfeedback.appendChild(closeDiv)

titelH2.addEventListener("click", () => {
    feedbackArea.style.display = "flex"
    closeDiv.style.display = "flex"
    titelH2.style.display = "none"
})

closeDiv.addEventListener("click", () => {
    feedbackArea.style.display = "none"
    closeDiv.style.display = "none"
    titelH2.style.display = "block"
})

const welkomDiv = document.createElement("div")
    welkomDiv.setAttribute("id", "welkom-div")
    
    closeDiv.innerHTML = "X"
    titelH2.innerHTML = "Suggesties, aanvulling, aanpassingen"

auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);
      userRef.get().then(function(doc) {
        if (doc.exists) {
         const naam = doc.data().GebruikersnaamClean;

         const welkomP = document.getElementById("welkom-p")
welkomP.innerHTML = `Hoi ${naam},<br> geef hier je suggesties, aanvulling en/of aanpassingen op de thema-lijst.`

                }
            })
        }
    })
}; feedback()

function feedbackThemeList(){

    let input = tinyMCE.get('tiny-mce').getContent()
    auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
            if (doc.exists) {
             const naamClean = doc.data().GebruikersnaamClean;
             const naam = doc.data().Gebruikersnaam

    db.collection("Tickets").doc().set({
        Gebruikersnaam: naam,
        GebruikersnaamClean: naamClean,
        Opmerking: input,
        Verwerkt: "Nee",
        Type: "Theme-list",
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            }).then(() => {
              location.reload();
                    })
                }
            })
        }
    })
}; 

     // Feedback in DOM zetten
  const DOMfeedback = document.getElementById("input-area")

  db.collection("Tickets").where("Type", "==", "Theme-list").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

      const naam = doc.data().GebruikersnaamClean
      const opmerking = doc.data().Opmerking
      const verwerkt = doc.data().Verwerkt

      const reactDiv = document.createElement("div")
        reactDiv.className = "react-div"
      const naamP = document.createElement("h5")
      const opmerkingP = document.createElement("p")
      const verwerktP = document.createElement("h5")

      naamP.innerHTML = "Door: " + naam
      opmerkingP.innerHTML = opmerking
      verwerktP.innerHTML = "Verwerkt: " + verwerkt

      if(verwerkt == "Nee"){
        opmerkingP.style.color = "#8e0000"
      } else {
        opmerkingP.style.color = "#0c6665"
      }

      DOMfeedback.appendChild(reactDiv)
      reactDiv.appendChild(opmerkingP)
      reactDiv.appendChild(naamP)
      reactDiv.appendChild(verwerktP)
    })
  })

