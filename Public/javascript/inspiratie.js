
// Filter overzichtspagina

function filterMenu(){

    const DOM = document.getElementById("inspiratieDK");

    const cat = document.getElementById("inspiratiemenu");
    const catOpties = cat.options;
    const catSelect = catOpties[catOpties.selectedIndex].value;

    console.log(catSelect)

    db.collection("Artikelen").where("Categorie", "==", catSelect).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

             // De artikel eigenschappen
        const titelTekst = doc.data().Titel;
        const bodyTekst = doc.data().Body;
        const auteurTekst = doc.data().Auteur;

        // De nieuwe HTML-elementen en classes
        const mainDiv = document.createElement("div");
            mainDiv.setAttribute("class", "mainTekst")
        const headerTekst = document.createElement("div");
            headerTekst.setAttribute("class", "headerTekst")
        const nieuweTitel = document.createElement("h4");
            nieuweTitel.setAttribute("class", "titelTekst");
        const nieuweDivTekst = document.createElement("div");
            nieuweDivTekst.setAttribute("class", "divTekst");
        const nieuweBody = document.createElement("p");
            nieuweBody.setAttribute("class", "bodyTekst");
        const nieuweAuteur = document.createElement("p");
            nieuweAuteur.setAttribute("class", "auteurTekst");
            nieuweAuteur.setAttribute("data-link", auteurTekst)
        const linkDiv = document.createElement("div");
            linkDiv.setAttribute("class", "divTekst");
        const linkTekst = document.createElement("button");
            linkTekst.setAttribute("class", "button-algemeen");
            nieuweAuteur.setAttribute("data-link", titelTekst)

            linkTekst.addEventListener('click', (e) => {
                window.open("../Artikelen/" + [titelTekst] + ".html", "_self");
            })

            nieuweAuteur.addEventListener('click', (e) => {
                window.open("../Vitaminders/" + [auteurTekst] + ".html", "_self");
            })

        // De artikel eigenschappen in de nieuwe HTML elementen zetten
        nieuweTitel.innerHTML = titelTekst;
        nieuweBody.innerHTML = bodyTekst;
        nieuweAuteur.innerHTML = "Geschreven" + " " + "door" + " " + auteurTekst 
        linkTekst.innerHTML = "Lees meer"

         //Oude div verwijderen
         const oudeDiv = document.querySelectorAll(".mainTekst")
         oudeDiv.forEach(D =>{
             D.style.display = "none"
         })

       

        // De nieuwe HTML elementen vastzetten aan de DOM
       DOM.appendChild(mainDiv);
        mainDiv.appendChild(headerTekst);
        mainDiv.appendChild(nieuweAuteur);
        mainDiv.appendChild(nieuweTitel);
        mainDiv.appendChild(nieuweDivTekst);
       nieuweDivTekst.appendChild(nieuweBody);
       mainDiv.appendChild(linkTekst);
})
}).catch(function(error) {
    console.log("Kan de artikelen niet inladen: ", error);
        })

}


// Alle artikel inladen in overzicht
db.collection("Artikelen").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

        //Waar de artikelen kom te staan in de DOM
        const bodyh1 = document.getElementById("alle");
        const loader = document.getElementById("loader")
       
        loader.style.display = "none"
        
        // De artikel eigenschappen
        const titelTekst = doc.data().Titel;
        const bodyTekst = doc.data().Body;
        const auteurTekst = doc.data().Auteur;
        const categorieTekst = doc.data().Categorie;

        // De nieuwe HTML-elementen en classes
        const mainDiv = document.createElement("div");
            mainDiv.setAttribute("class", "mainTekst")
        const headerTekst = document.createElement("div");
            headerTekst.setAttribute("class", "headerTekst")
        const nieuweTitel = document.createElement("h4");
            nieuweTitel.setAttribute("class", "titelTekst");
        const nieuweDivTekst = document.createElement("div");
            nieuweDivTekst.setAttribute("class", "divTekst");
        const nieuweBody = document.createElement("p");
            nieuweBody.setAttribute("class", "bodyTekst");
        const nieuweAuteur = document.createElement("p");
            nieuweAuteur.setAttribute("class", "auteurTekst");
            nieuweAuteur.setAttribute("data-link", auteurTekst)
        const categorie = document.createElement("p");
            categorie.setAttribute("class", "categorieTekst")
        const linkDiv = document.createElement("div");
            linkDiv.setAttribute("class", "divTekst");
        const linkTekst = document.createElement("button");
            linkTekst.setAttribute("class", "button-algemeen");
            nieuweAuteur.setAttribute("data-link", titelTekst)

            linkTekst.addEventListener('click', (e) => {
                window.open("../Artikelen/" + [titelTekst] + ".html", "_self");
            })

            nieuweAuteur.addEventListener('click', (e) => {
                window.open("../Vitaminders/" + [auteurTekst] + ".html", "_self");
            })

        // De artikel eigenschappen in de nieuwe HTML elementen zetten
        categorie.innerHTML = categorieTekst;
        nieuweTitel.innerHTML = titelTekst;
        nieuweBody.innerHTML = bodyTekst;
        nieuweAuteur.innerHTML = "Geschreven" + " " + "door" + " " + `<u> ${auteurTekst} </u>`;
        linkTekst.innerHTML = "Lees meer";

        // De nieuwe HTML elementen vastzetten aan de DOM
       bodyh1.appendChild(mainDiv);
        mainDiv.appendChild(headerTekst);
        mainDiv.appendChild(nieuweDivTekst);
        nieuweDivTekst.appendChild(categorie);
        nieuweDivTekst.appendChild(nieuweTitel);
        nieuweDivTekst.appendChild(nieuweAuteur);
       nieuweDivTekst.appendChild(nieuweBody);
       mainDiv.appendChild(linkTekst);
})
}).catch(function(error) {
    console.log("Kan de artikelen niet inladen");
});

  
//Nieuw artikel schrijven        
function nieuwepostsubmit(){
    auth.onAuthStateChanged(User =>{
        if (User){
            let artikelRef = db.collection("Artikelen").doc();
            let docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

            const cat = document.getElementById("categorieSelectie");
            const catOpties = cat.options;
            const catSelect = catOpties[catOpties.selectedIndex].value;
            let nieuwePostTitelVar = document.getElementById("nieuwposttitel").value;
            let nieuwePostBodyVar = document.getElementById("postbody").innerHTML;
            
            artikelRef.set({
                Titel: nieuwePostTitelVar,
                Body: nieuwePostBodyVar,
                Auteur: coachNaam,
                Categorie: catSelect,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            })
            },{ merge: true })
        } 
    })
}

//Teksteditor bij nieuw artikel schrijven
const style = document.querySelectorAll("button");

for(let st of style){
    st.addEventListener("click", () =>{
    let cmd = st.dataset['command'];
    const test = document.execCommand(cmd, false, null)
})
}

// Detailpagina inladen
titelhtml = location.pathname.replace(/^.*[\\\/]/, '')
titel1 = titelhtml.replace('.html', '')
titel2 = titel1.replace('%20',' '),
titel3 = titel2.replace('%20',' ')
titel4 = titel3.replace('%20',' ')
titel5 = titel4.replace('%20',' ')
titel6 = titel4.replace('%20',' ')
titel = titel6.replace('%20',' ')

const auteur = document.getElementById('auteur');
const thema = document.getElementById('thema');
const datum = document.getElementById('datum');
const titelArt = document.getElementById("titeltext");
const body = document.getElementById("bodytext");
const cat = document.getElementById("categorie");

db.collection('Artikelen').where('Titel', '==', titel )
    .get()
    .then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        
        auteur.innerHTML = "Geschreven door " + doc.data().Auteur
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        datum.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
        titelArt.innerHTML = doc.data().Titel
        body.innerHTML = doc.data().Body
        thema.innerHTML = "Over " + doc.data().Categorie

        auteur.addEventListener('click', (e) => {
            window.open("../Vitaminders/" + [doc.data().Auteur] + ".html", "_self");
        })

        auth.onAuthStateChanged(User =>{
                const userRef = db.collection("Vitaminders").doc(User.uid);
                userRef.get().then(function(doc1) {
                if (doc1.exists) {
                naam = doc1.data().Gebruikersnaam;

                cat.innerHTML ="Heeft " + doc.data().Auteur +" je geinspireerd "
                 + "over " + " " + doc.data().Categorie + "," + " " + naam +"?";

        }
        })
        })
    })
    })


// Call to action verbergen voor niet ingelogde users
auth.onAuthStateChanged(User =>{
        if (User){
            const CTAAuth = document.getElementById("CTAAuth");
            CTAAuth.style.display = "flex";
        }   
        })

// Learning verwerken in Karakter, Levensvraag en onder artikel

        // Levensvragen inladen in select

        const select = document.getElementById("learning-levensvraag")

        auth.onAuthStateChanged(User =>{
            if (User){
                const docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
    
                    const naam = doc.data().Gebruikersnaam;

        db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const vraag = doc.data().Levensvraag

                const options = document.createElement("option")
               
                options.innerHTML = vraag

                select.appendChild(options)

                })
            })
        })
    }
})

        //Learning werwerken in karakter en levensvraag

        function submitKT(){

        const learning = document.getElementById("inputDB").value;

         auth.onAuthStateChanged(User =>{
         if (User){
            const docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){

                const naamPost = doc.data().Gebruikersnaam;

                 // Learning verwerken in levensvraag 
                const levensvraagSelect = select.options
                const levensvraagOption = levensvraagSelect[levensvraagSelect.selectedIndex].innerHTML;

                const KarakterRef = db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc()

                db.collection("Vitaminders").doc(User.uid).collection("Levensvragen")
                .where("Levensvraag", "==", levensvraagOption).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const id = doc.id
                        console.log(id)
                

                const levensvraagRef = db.collection("Vitaminders").doc(User.uid).collection("Levensvragen").doc(id)
               
                   
                    db.collection("Artikelen").where("Titel", "==", titel).get().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {

                            const auteur = doc.data().Auteur;
                            const thema = doc.data().Categorie;

            KarakterRef.set({
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Learning: learning,
                Auteur: auteur,
                Gebruikersnaam: naamPost,
                Thema: thema,
                Titel: titel,
                Inspirerend: 1,
            })

            levensvraagRef.update({
                Levenslessen: firebase.firestore.FieldValue.arrayUnion(learning)

            }).then(()=>{
                location.reload();
            }) 
            })
            })   
            })
            })
        })
        }
    })
}


// Learnings inladen onder artikel
db.collectionGroup("Levenslessen").where("Titel", "==", titel).get()
    .then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {

    const learn = doc.data().Learning;
    const GB = doc.data().Gebruikersnaam;

    const DOM = document.getElementById("learningsOutput");
    const learnH2 = document.getElementById("learnH2");
    const sectionDiv = document.createElement("div");
        sectionDiv.setAttribute("class", "sectionDiv")
    const learnDiv = document.createElement("div");
        learnDiv.setAttribute("class", "learnDiv");
    const learnTitel = document.createElement("h4");
    const learnGB = document.createElement("p");
        learnGB.setAttribute("class", "GBlink")
    const learnTijd = document.createElement("p");
    const inspireer = document.createElement("p");
        inspireer.setAttribute("class", "inspireerClass");
        inspireer.setAttribute("data-naam", GB);

         //Geinspireerd naar auteur learning schrijven
         inspireer.addEventListener('click', () => {
            //Geinspireerd naar Vitaminders schrijven
            const naam = inspireer.dataset.naam;
            console.log(naam)
            db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
                querySnapshot.forEach(doc2 =>{
                    db.collection("Vitaminders").doc(doc2.id).update({
                        Inspiratiepunten: firebase.firestore.FieldValue.increment(1)
                    })
                })
            })
        })

    learnH2.innerHTML = "Wat andere mensen hebben geleerd van " + titel;
    learnTitel.innerHTML ='"' + learn + '"';
    learnGB.innerHTML = "Door " + GB;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    learnTijd.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
    inspireer.innerHTML = "Inspirerend!"


    learnGB.addEventListener('click', (e) => {
        window.open("../Vitaminders/" + [GB] + ".html", "_self");
    })


    DOM.appendChild(sectionDiv);
    sectionDiv.appendChild(learnTitel);
    learnTitel.appendChild(learnGB);
    learnGB.appendChild(learnTijd);
    sectionDiv.appendChild(inspireer)
    })
})

// Favorieten Artikel wegschrijven naar database
function favArtikel(){

    db.collection('Artikelen').where('Titel', '==', titel )
    .get()
    .then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        
        schrijver = doc.data().Auteur
        thema = doc.data().Categorie

    auth.onAuthStateChanged(User =>{
      const userRef = db.collection("Vitaminders").doc(User.uid)
        userRef.get().then(doc2 =>{
          const naam = doc2.data().Gebruikersnaam;

      
      userRef.collection("Favorieten").doc().set({
        
            Type: "Inspiratie",
            Titel: titel,
            Auteur: schrijver,
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Thema: thema,
            Gebruikersnaam: naam,

        })

        const DOM = document.getElementById("favArtikel");

       const alertDiv = document.createElement("p");
            alertDiv.setAttribute("class", "favAut");
       const alert = document.createElement("p");

        alert.innerHTML = "Opgeslagen in je favorieten!"
        alert.style.backgroundColor = "#0c6665";

        DOM.appendChild(alertDiv);
        alertDiv.appendChild(alert);
            })  
        })
    })
})
}

// Favorieten Auteur wegschrijven naar database
function favAuteur(){

    db.collection('Artikelen').where('Titel', '==', titel )
    .get()
    .then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        
        schrijver = doc.data().Auteur

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid).collection("Favorieten").doc().set({
        
            Type: "Coach",
            Auteur: schrijver,
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        })

       const DOM = document.getElementById("favAuteur");

       const alertDiv = document.createElement("p");
            alertDiv.setAttribute("class", "favAut");
       const alert = document.createElement("p");

        alert.innerHTML = "Opgeslagen in je favorieten!"
        alert.style.backgroundColor = "#0c6665";

        DOM.appendChild(alertDiv);
        alertDiv.appendChild(alert);

            })  
        })
    })
}