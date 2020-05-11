
// Filter
const select = document.getElementById("filter-thema")

db.collection("Themas").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const themas = doc.data().Themas

        themas.forEach(thema => {
            const option = document.createElement("option")

            option.innerHTML = thema

            select.appendChild(option)
        })

        
    })
}).then(() => {

    const button = document.getElementById("filter-thema-button")

    button.addEventListener("click", () => {

                    const selectOpties = select.options;
                    let selectValue = selectOpties[selectOpties.selectedIndex].innerHTML;

                    console.log(selectValue)

                    window.open("../Thema/" + [selectValue], "_self");
    })
})

// Pagina titel achterhalen
titelhtml = location.pathname.replace(/^.*[\\\/]/, '')
titel1 = titelhtml.replace('.html', '')
titel2 = titel1.replace('%20',' '),
titel3 = titel2.replace('%20',' ')
titel4 = titel3.replace('%20',' ')
titel5 = titel4.replace('%20',' ')
titel6 = titel4.replace('%20',' ')
titel = titel6.replace('%20',' ')


const thema = document.getElementById("thema")
thema.innerHTML = titel

// Artikel inladen
db.collection("Artikelen").where("Categorien", "array-contains", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titelDB = doc.data().Titel
        const titelClean = doc.data().TitelClean
        const auteur = doc.data().Auteur

        const DOM = document.getElementById("inspiratie-thema")

        const div = document.createElement("div")
            div.setAttribute("class", "inner-div-thema")
        const titelH3 = document.createElement("h4")

        titelH3.addEventListener("click", () => {
            window.open("../Artikelen/" + [titelDB] + ".html", "_self");
        })

        db.collection("Vitaminders").where("Gebruikersnaam", "==", auteur).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

               const auteurClean = doc1.data().GebruikersnaamClean
               const photo = doc1.data().Profielfoto

               const auteurDiv = document.createElement("div")
                    auteurDiv.setAttribute("class", "themas-auteur-div")
                const photoDiv = document.createElement("div")
                    photoDiv.setAttribute("class", "auteur-photo-div")
        const auteurP = document.createElement("p")

        photoDiv.style.backgroundImage = `url(${photo})`

        auteurDiv.addEventListener("click", () => {
            window.open("../Vitaminders/" + [auteur] + ".html", "_self");
        })

        titelH3.innerHTML = titelClean
        auteurP.innerHTML = auteurClean

        DOM.appendChild(div)
        div.appendChild(titelH3)
        div.appendChild(auteurDiv)
        auteurDiv.appendChild(photoDiv)
        auteurDiv.appendChild(auteurP)
            })
        })
    })
}) 

