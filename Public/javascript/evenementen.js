//Evenementen inladen in pagina evenementen

db.collection("Evenementen").orderBy("Timestamp").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

        console.log(doc)

        //Waar de evenementen komen te staan in de DOM

        const overzicht = document.getElementById("lijst");
        
        // De evenement eigenschappen

        const titelEve = doc.data().Titel;
        const bodyEve = doc.data().Body;
        const auteurEve = doc.data().Auteur;
        const categorieEve = doc.data().Categorie;
        const locatieEve = doc.data().Locatie;
        const timeEve = doc.data().Timestamp;

        // De nieuwe HTML-elementen en classes

        const mainDivEve = document.createElement("div");
            mainDivEve.setAttribute("class", "mainDivEve")
        const headerEve = document.createElement("div");
            headerEve.setAttribute("class", "headerEve")
        const timeEvene = document.createElement("p");
            timeEvene.setAttribute("class", "timeEvene")
        const titelEvene = document.createElement("h4");
            titelEvene.setAttribute("class", "titelEve");
        const bodyEvene = document.createElement("p");
            bodyEvene.setAttribute("class", "bodyEve");
        const auteurEvene = document.createElement("p");
            auteurEvene.setAttribute("class", "auteurEve");
        const linkEvene = document.createElement("button");
            linkEvene.setAttribute("class", "button-algemeen");

        // De artikel eigenschappen in de nieuwe HTML elementen zetten
        titelEvene.innerHTML = titelEve;
        bodyEvene.innerHTML = bodyEve;
        auteurEvene.innerHTML = "Georganiseerd door " + auteurEve;
        linkEvene.innerHTML = "Lees meer";
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timeEvene.innerHTML = timeEve.toDate().toLocaleDateString("nl-NL", options)

        // De nieuwe HTML elementen vastzetten aan de DOM
       overzicht.appendChild(mainDivEve);
       mainDivEve.appendChild(timeEvene)
        mainDivEve.appendChild(headerEve);
        mainDivEve.appendChild(auteurEvene);
        mainDivEve.appendChild(titelEvene);
        mainDivEve.appendChild(bodyEvene);
       mainDivEve.appendChild(linkEvene);

})
}).catch(function(error) {
    console.log("Kan de artikelen niet inladen: ", error);
});
