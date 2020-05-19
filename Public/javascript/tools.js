toolDOM = document.getElementById("tools-section")

db.collection("Themas").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titel = doc.data().Thema
        const img = doc.data().HeaderImage

        const outerDiv = document.createElement("div")
            outerDiv.setAttribute("class", "tool-outer-div")
        const header = document.createElement("div")
            header.setAttribute("class", "tools-header")
        const textDiv = document.createElement("div")
            textDiv.setAttribute("class", "tool-text-div")
        const title = document.createElement("h2")
            title.setAttribute("class", "title-tool")
        const button = document.createElement("button")
            button.setAttribute("class", "button-algemeen")

        header.style.backgroundImage = `url("${img}")`
        title.innerHTML = titel
        button.innerHTML = "Bekijk"
        button.addEventListener("click", () => {
            window.open(`../Theme-articles/${titel}.html`, "_self")
        })

        toolDOM.appendChild(outerDiv)
        outerDiv.appendChild(header)
        outerDiv.appendChild(textDiv)
        textDiv.appendChild(title)
        outerDiv.appendChild(button)
    })
}) 