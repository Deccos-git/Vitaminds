
// Pagina titel achterhalen
titelhtml = location.pathname.replace(/^.*[\\\/]/, '')
titel1 = titelhtml.replace('.html', '')
titel2 = titel1.replace('%20',' '),
titel3 = titel2.replace('%20',' ')
titel4 = titel3.replace('%20',' ')
titel5 = titel4.replace('%20',' ')
titel6 = titel4.replace('%20',' ')
titel = titel6.replace('%20',' ')


// Alles inladen voor dankbaarheid
db.collection("Artikelen").where("Categorie", "==", titel).get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

    titelRef = doc.data().Titel;
    naamRef = doc.data().Auteur;

    console.log(titelRef)

    //Plek waar de methoden worden ingeladen in de DOM
    const inspiratie = document.getElementById("inspiratieDank");

    // Nieuwe HTML elementen maken
    const inspiratieCollect = document.createElement("h4");
    const naamCollect = document.createElement("p");

    // De HTML elementen inhoud geven
    inspiratieCollect.innerHTML = titelRef;
    naamCollect.innerHTML = "Geschreven door " + naamRef;

    // HTML element inladen in de DOM
    inspiratie.appendChild(inspiratieCollect);
    inspiratieCollect.appendChild(naamCollect);

    // Links creeren voor ingelade elementen
    inspiratieCollect.addEventListener('click', (e) => {
        window.open("../../Artikelen/" + [doc.data().Titel] + ".html", "_self");

    })

    })
    })
 
    db.collection("Evenementen").where("Categorien", "array-contains", titel).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            titelRef = doc.data().Titel;
            naamRef = doc.data().Auteur;
    
        //Plek waar de methoden worden ingeladen in de DOM
        const evenementen = document.getElementById("evenementenDank");
        
        // Nieuwe HTML elementen maken
        const evenementenCollect = document.createElement("h4");
        const naamCollect = document.createElement("p");
    
        // De HTML elementen inhoud geven
        evenementenCollect.innerHTML = titelRef;
        naamCollect.innerHTML = "Georganiseerd door " + naamRef;

        // HTML element inladen in de DOM
        evenementen.appendChild(evenementenCollect)
        evenementenCollect.appendChild(naamCollect)

    
        })
        })

        db.collection("Vitaminders").where("CoachCategorien", "==", titel).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
        
            //Plek waar de methoden worden ingeladen in de DOM
            const coaches = document.getElementById("coachesDank");
            
            // Nieuwe HTML elementen maken
            const coachesCollect = document.createElement("h4");
        
            // De HTML elementen inhoud geven
           coachesCollect.innerHTML = doc.data().Gebruikersnaam

            // HTML element inladen in de DOM
            coaches.appendChild(coachesCollect)

            // Links creeren voor ingelade elementen
            coachesCollect.addEventListener('click', (e) => {
            window.open("../../Artikelen/" + [doc.data().Gebruikersnaam] + ".html", "_self");
            })
            })
            })

           