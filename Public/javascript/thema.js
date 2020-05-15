
const themeSection = document.getElementById("list-of-themes")

db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const domein = doc.data().Domein

        const domeinH3 = document.createElement("h3")
        const domeinDiv = document.createElement("div")
            domeinDiv.setAttribute("class", "domein-div")
        const domeinP = document.createElement("p")

        domeinH3.innerHTML = "Domein"
        domeinP.innerHTML = domein

        themeSection.appendChild(domeinDiv)
        domeinDiv.appendChild(domeinH3)
        domeinDiv.appendChild(domeinP)

        db.collection("Levensvragen").where("Domein", "==", domein).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const levensvragen = doc1.data().Levensvraag

                const levensvraagH3 = document.createElement("h3")
                const outerDiv = document.createElement("div")
                    outerDiv.setAttribute("class", "outer-div")
                const levensvraagDiv = document.createElement("div")
                    levensvraagDiv.setAttribute("class", "levensvraag-div")
                const levensvraagP = document.createElement("p")

                levensvraagH3.innerHTML = "Levensvraag"
                levensvraagP.innerHTML = levensvragen

                domeinDiv.appendChild(outerDiv)
                outerDiv.appendChild(levensvraagDiv)
                levensvraagDiv.appendChild(levensvraagH3)
                levensvraagDiv.appendChild(levensvraagP)

                db.collection("Themas").where("Levensvragen", "array-contains", levensvragen).get().then(querySnapshot => {
                    querySnapshot.forEach(doc2 => {

                        const themas = doc2.data().Thema

                        const themeH3 = document.createElement("h3")
                        const themeDiv = document.createElement("div")
                            themeDiv.setAttribute("class", "theme-div")
                        const themeP = document.createElement("p")

                        themeH3.innerHTML = "Thema"
                        themeP.innerHTML = themas

                        levensvraagDiv.appendChild(themeDiv)
                        themeDiv.appendChild(themeH3)
                        themeDiv.appendChild(themeP)
                        
                        db.collection("Themas").where("Thema", "==", themas).get().then(querySnapshot => {
                            querySnapshot.forEach(doc3 => {

                                const paragraphs = doc3.data().Paragraphs

                                const paragraphH3 = document.createElement("h3")
                                const paragraphDiv = document.createElement("div")
                                    paragraphDiv.setAttribute("class", "paragraph-div")

                                paragraphH3.innerHTML = "Paragrafen"

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