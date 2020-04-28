//Filter

    // Alle data uit de database
    const dataSet = [];

    let filters = {
        Categorie: []
        }
    
    let filterValues = []
    
    const alleCategorienG = [];

    console.log(alleCategorienG)
    
     // Categorien van artikelen uitlezen
     db.collection("Artikelen")
     .get()
     .then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {

            const categorien = doc.data().Categorien

            categorien.forEach(cat => {

             alleCategorienG.push(cat);

             const data = doc.data()
             dataSet.push(data)

            })
         })
     })    

      //Filters inladen uit database

      db.collection("Themas").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc1) {

            const themas = doc1.data().Themas

            const DOM = document.getElementById("inspiratiemenu")

            const optionAlle = document.createElement("option")
            optionAlle.innerHTML = "Alle themas"
            DOM.appendChild(optionAlle)

            themas.forEach(thema => {

                const option = document.createElement("option")
    
                option.innerHTML = thema
    
                DOM.appendChild(option)
    
                })
    
        })
    })
    
     // Filter knop
    function filterMenu(){
        
            // Filters legen bij nieuwe zoekopdracht
            filterValues = []
            filters = {
                Categorie: []
            }
    
            // Alle artikelen weer laten zien
        const artikelDOM = document.getElementsByClassName("mainTekst")
        const artikelDOMarray = Array.from(artikelDOM)
    
        artikelDOMarray.forEach(art => {
            art.style.display = "flex"
        
        //Filters uitlezen
        const inputCategorien = document.getElementById("inspiratiemenu")
                        const inputOpties = inputCategorien.options;
                        let select = inputOpties[inputOpties.selectedIndex].value;  
    
    
            // Alle opties uit filter vervangen voor alle opties uit database
        if (select == "Alle themas"){
            select = alleCategorienG
        }
    
        filters.Categorie.push(select)
    
        // Filteren
        const filtersObject = Object.values(filters)

        console.log(filtersObject)
        filtersObject.forEach(filter => {
            console.log(filter)
            filter.forEach(filt => {
                console.log(filt)
                // if (typeof filt === 'object'){
                // filt.forEach(fil => {
                //     const fi = String(fil)
                //     filterValues.push(fi)
                //     console.log(fi)
                //     })
                // } else {
                    filterValues.push(filt)
                // }
            })
        })
    
        dataSet.forEach(data =>{

            console.log(data)
            console.log(data.Categorien)
            console.log(filterValues)

            if(!filterValues.includes(data.Categorien)){
    
                const filterTitel = data.Titel



        
    
                db.collection("Artikelen").where("Titel", "==", filterTitel)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const titel = doc.data().Titel

                        console.log(titel)
    
                        artikelDOMarray.forEach(artikel => {
                        
                        const coachData = artikel.dataset.titel
    
                        if(coachData == titel){
                            console.log("iets?")
                                art.style.display = "none"
    
                            } else {
                                console.log("niets")
                            }
                        })
                    })
                })
            }
        })
    })
};
    

// Alle artikel inladen in overzicht
db.collection("Artikelen").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

        //Waar de artikelen kom te staan in de DOM
        const bodyh1 = document.getElementById("alle");
        const loader = document.getElementById("loader")
       
        loader.style.display = "none"
        
        // De artikel eigenschappen
        const bodyTekst = doc.data().Body;
        const auteurTekst = doc.data().Auteur;
        const categorieTekst = doc.data().Categorien;
        const ID = doc.data().ID

        const pageTitle = doc.data().Titel
        const titelTekst  = pageTitle.replace(ID, "")

        db.collection("Vitaminders").where("Gebruikersnaam", "==", auteurTekst).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc1) {

                const IDauteur = doc1.data().ID
                const auteur = auteurTekst.replace(IDauteur, "")

       
        // De nieuwe HTML-elementen en classes
        const mainDiv = document.createElement("div");
            mainDiv.setAttribute("class", "mainTekst")
            mainDiv.setAttribute("data-titel", pageTitle)
        const headerTekst = document.createElement("div");
            headerTekst.setAttribute("class", "headerTekst")
        const nieuweTitel = document.createElement("h4");
            nieuweTitel.setAttribute("class", "titelTekst");
        const nieuweDivTekst = document.createElement("div");
            nieuweDivTekst.setAttribute("class", "divTekst");
        const nieuweBody = document.createElement("div");
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
                window.open("../Artikelen/" + ID + titelTekst + ".html", "_self");
            })

            nieuweAuteur.addEventListener('click', (e) => {
                window.open("../Vitaminders/" + auteurTekst + ".html", "_self");
            })
        
        //Profielfoto achterhalen en inladen in DOM
        db.collection("Vitaminders").where("Gebruikersnaam", "==", auteurTekst).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const profilePic = doc.data().Profielfoto
                const gebruikersnaam = doc.data().Gebruikersnaam

                const profilePicture = document.createElement("div")
                    profilePicture.setAttribute("class", "openup-profile-pic")

                profilePicture.style.backgroundImage = `url('${profilePic}')`

                profilePicture.addEventListener("click", () => {
                    window.open("../Vitaminders/" + gebruikersnaam + ".html", "_self")
                       })

                       
        // De artikel eigenschappen in de nieuwe HTML elementen zetten
      
        nieuweTitel.innerHTML = titelTekst;
        nieuweBody.innerHTML = bodyTekst;
        nieuweAuteur.innerHTML = `<u> ${auteur} </u>`;
        linkTekst.innerHTML = "Lees meer";

        categorieTekst.forEach(cat => {

            categorie.addEventListener('click', (e) => {
                window.open("../Thema/" + cat + ".html", "_self");
            })

            categorie.innerHTML = cat;
            nieuweDivTekst.appendChild(profilePicture);
            nieuweDivTekst.appendChild(nieuweAuteur);
            nieuweDivTekst.appendChild(categorie);
    })

        // De nieuwe HTML elementen vastzetten aan de DOM
       bodyh1.appendChild(mainDiv);
        mainDiv.appendChild(headerTekst);
        mainDiv.appendChild(nieuweDivTekst);
        nieuweDivTekst.appendChild(nieuweTitel);
       nieuweDivTekst.appendChild(nieuweBody);
       mainDiv.appendChild(linkTekst);
                            })                
                        })
                })
            })
        })
    }).catch(function(error) {
    console.log("Kan de artikelen niet inladen");
}).then(() => {

// Artikelen OVERZICHT formatten
const bodyTekstOverzicht = document.getElementsByClassName("bodyTekst")

const bodyTekstOverzichtArray = Array.from(bodyTekstOverzicht)

bodyTekstOverzichtArray.forEach(tekst => {

     // img verwijderen

    const tekstImg = tekst.querySelectorAll("img")

    const tekstImgArray = Array.from(tekstImg)

    tekstImgArray.forEach(img => {

    if(tekstImgArray.length > 0){

    img.style.display = "none"
    }

    // &nbsp; verwijderen
const deleteNBSPbodyOverzicht = tekst.innerHTML

    deleteNBSPbodyOverzicht.replace("&nbsp;", " ")

    // p's formateren

bodyTekstOverzichtArray.forEach(body => {

const bodyP = body.getElementsByTagName( 'p' )

const bodyPArrayOverzicht = Array.from(bodyP)

bodyPArrayOverzicht.forEach(p => {

    p.style.fontFamily = "Nunito Sans', sans-serif !important"
    p.style.color = "#25384d"
    p.style.fontSize = "18px"
    p.style.padding = "0px"
    p.style.letterSpacing = "0.6px"
    p.style.margin = "0px"
    p.style.textAlign = "left"
    p.style.fontWeight = "500"
    p.style.maxWidth = "350px"
    })

    // Spans formateren

    // bodyTekstOverzichtArray.forEach(span => {

    //     const bodySpan = span.querySelector("span")

    //     // if(!bodySpan  == null || !bodySpan == undefined ){

    //     const bodySpanArray = Array.from(bodySpan)
        
    //     bodySpanArray.forEach(s => {

    //         console.log(s)

    //         s.style.fontFamily = "Nunito Sans', sans-serif"
    //         s.style.color = "#25384d"
    //         s.style.fontSize = "18px"
    //         s.style.padding = "0px"
    //         s.style.letterSpacing = "0.6px"
    //         s.style.margin = "0px"
    //         s.style.textAlign = "left"
    //         s.style.fontWeight = "500"
    //         s.style.maxWidth = "350px"
    //         })
    //     // }
    // })

    // Strongs formateren (zodat ze geen line-break maken)

    const bodyStrongOverzicht = document.getElementsByClassName("bodyTekst")

    bodyStrongOverzichtArray = Array.from(bodyStrongOverzicht)

    bodyStrongOverzichtArray.forEach(strong => {

    const strongEle = strong.querySelectorAll("strong")

    strongEle.forEach(strong => {
        strong.style.display = "contents"
    })
})
})
})
})
})

// Call to action verbergen voor niet ingelogde users
auth.onAuthStateChanged(User =>{
        if (User){
            const CTAAuth = document.getElementById("CTAAuth");
            CTAAuth.style.display = "flex";
        }   else {
            CTAAuth.style.display = "none";
        }
    })



// Detailpagina inladen
titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
titel1 = titelhtml.replace('.html', '')
titel2 = titel1.replace('%20',' '),
titel3 = titel2.replace('%20',' ')
titel4 = titel3.replace('%20',' ')
titel5 = titel4.replace('%20',' ')
titel6 = titel4.replace('%20',' ')
titel7 = titel6.replace('%20',' ')
titel8 = titel7.replace('%20',' ')
titel9 = titel8.replace('%20',' ')
titel10 = titel9.replace('%20',' ')
titel = titel10.replace('%20',' ')

const auteur = document.getElementById('auteur');
const thema = document.getElementById('thema');
const datum = document.getElementById('datum');
const titelArt = document.getElementById("titeltext");
const body = document.getElementById("bodytext");
const cata = document.getElementById("categorie");

db.collection('Artikelen').where('Titel', '==', titel )
    .get().then(querySnapshot =>  {
    querySnapshot.forEach(doc => {

    const auteurMeta = doc.data().Auteur
    const categorie = doc.data().Categorien
    const ID = doc.data().ID

    db.collection("Vitaminders").where("Gebruikersnaam", "==", auteurMeta).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc1) {

            const IDauthor = doc1.data().ID
            const auteurClean = auteurMeta.replace(IDauthor, "")

    categorie.forEach(cat =>{
    
            // Page title and meta 
        const DOM = document.head
 
        let title = document.title

        title = titel + "- Geschreven door " + auteurClean

        const metaDescription = document.createElement("meta")
            metaDescription.setAttribute("name", "description")
            metaDescription.setAttribute("content", title)
        const metaKeyword = document.createElement("meta")
            metaKeyword.setAttribute("name", "keywords")
            metaKeyword.setAttribute("content", cat + ", Coaching ," + auteurMeta + ", levensvragen" )

            DOM.appendChild(metaDescription)
            DOM.appendChild(metaKeyword)

        // Verder met detail pagina inladen

        auteur.innerHTML = "Geschreven door " + auteurClean
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        datum.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);

        const pageTitle = doc.data().Titel
        const pageTitleClean = pageTitle.replace(ID, "")

        titelArt.innerHTML = pageTitleClean
        body.innerHTML = doc.data().Body

        thema.innerHTML = "Over " + cat

        thema.addEventListener("click", () => {
            window.open("../Thema/" + cat, "_self");
        })

        auteur.addEventListener('click', (e) => {
            window.open("../Vitaminders/" + [doc.data().Auteur] + ".html", "_self");
        })

        auth.onAuthStateChanged(User =>{
                const userRef = db.collection("Vitaminders").doc(User.uid);
                userRef.get().then(function(doc1) {
                if (doc1.exists) {
                const nameID = doc1.data().Gebruikersnaam;
                const IDname = doc1.data().ID

                const name = nameID.replace(IDname, "")

                cata.innerHTML ="Heeft " + auteurClean +" je geinspireerd "
                 + "over " + " " + cat + "," + " " + name +"?";

                            }
                        })
                    })
                })
            })
        })
    })
}).then(() => {



// Artikelen DETAILPAGINA formatten

const bodyTekst = document.getElementById("bodytext")

const deleteNBSPbody = bodyTekst.innerHTML

    deleteNBSPbody.replace("&nbsp;", " ")

const bodyTextP = document.getElementById("bodytext").getElementsByTagName( 'p' )

const bodyPArray = Array.from(bodyTextP)

bodyPArray.forEach(p => {

    p.style.color = "#122b46"
    p.style.fontSize = "18px"
    p.style.fontFamily = "Nunito Sans', sans-serif"
    p.style.padding = "0px"
    p.style.letterSpacing = "0.6px"

    const deleteNBSP = p.innerHTML

    deleteNBSP.replace("&nbsp;", " ")

    })

    const bodyStrong = document.getElementById("bodytext").querySelectorAll("strong")

    bodyStrong.forEach(strong => {
        strong.style.display = "contents"
    })

})


// Call to action verbergen voor niet ingelogde users
auth.onAuthStateChanged(User =>{
        if (User){
            const CTAAuth = document.getElementById("CTAAuth");
            CTAAuth.style.display = "flex";
        }   else {
            CTAAuth.style.display = "none";
        }
    })

// Learning verwerken in Karakter, Levensvraag en onder artikel

        // Levensvragen inladen in select

        const selectLevensvraag = document.getElementById("learning-levensvraag")

        auth.onAuthStateChanged(User =>{
            if (User){
                const docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
    
                    const naam = doc.data().Gebruikersnaam;

        db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const q = doc.data().LevensvraagClean

                const options = document.createElement("option")
               
                options.innerHTML = q

                selectLevensvraag.appendChild(options)

                })
            })
        })
    }
})

        //Learning werwerken in levenslessen en levensvraag

        function submitKT(){

        const learning = document.getElementById("inputDB").value;

         auth.onAuthStateChanged(User =>{
         if (User){
            const docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){

                const naamPost = doc.data().Gebruikersnaam;

                 // Learning verwerken in levensvraag 
                const levensvraagSelect = selectLevensvraag.options
                const levensvraagOption = levensvraagSelect[levensvraagSelect.selectedIndex].innerHTML;

                const KarakterRef = db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc()

                db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", levensvraagOption).get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {
                        const levensvraag = doc1.data().Levensvraag

                db.collection("Vitaminders").doc(User.uid).collection("Levensvragen")
                .where("Levensvraag", "==", levensvraag).get().then(querySnapshot => {
                    querySnapshot.forEach(doc2 => {
                        const id = doc2.id


                const levensvraagRef = db.collection("Vitaminders").doc(User.uid).collection("Levensvragen").doc(id)
                 
                    db.collection("Artikelen").where("Titel", "==", titel).get().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {

                            const auteur = doc.data().Auteur;

            KarakterRef.set({
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Levensles: learning,
                Auteur: auteur,
                Gebruikersnaam: naamPost,
                Titel: titel,
                Inspirerend: 1,
                Type: "Inspiratie"
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
            })
        })
        }
    })
}


// Learnings inladen onder artikel
db.collectionGroup("Levenslessen").where("Titel", "==", titel).orderBy("Inspirerend", "desc").get()
    .then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {

    const learn = doc.data().Levensles;
    const GB = doc.data().Gebruikersnaam;
    const inspirationPoints = doc.data().Inspirerend

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
    const socialDiv = document.createElement("div")
        socialDiv.setAttribute("class", "social-div-inspiration")
    const inspireer = document.createElement("p");
        inspireer.setAttribute("class", "inspireerClass");
        inspireer.setAttribute("data-naam", GB);
    const pointsDiv = document.createElement("div")
    const pointsP = document.createElement("p")
    const levenslesDiv = document.createElement("div")
    const levenslesP = document.createElement("p")
    const bedanktDiv = document.createElement("div")
        bedanktDiv.setAttribute("class", "bedankt-div")
    const bedanktP = document.createElement("p")
    

         //Geinspireerd naar auteur learning schrijven
         inspireer.addEventListener('click', () => {

            //Geinspireerd naar Vitaminders schrijven
            const naam = inspireer.dataset.naam;

            auth.onAuthStateChanged(User =>{
                if (User){
                    const docRef = db.collection("Vitaminders").doc(User.uid);
                        docRef.get().then(function(doc){
        
                        const auth = doc.data().Gebruikersnaam;

            db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
                querySnapshot.forEach(doc2 =>{
                    db.collection("Vitaminders").doc(doc2.id).collection("Inspiration").doc().set({

                        New: "Yes",
                        User: naam,
                        Source: titel,
                        Lifelesson: learn,
                        Giver: auth,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        Type: "levensles"
                            })
                        })
                    })
                })
            }
        }) 

        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
            querySnapshot.forEach(doc2 =>{
                db.collection("Vitaminders").doc(doc2.id).collection("Levenslessen").doc(doc.id).update({
                    Inspirerend: firebase.firestore.FieldValue.increment(1)
                })
        bedanktDiv.style.display = "block" 
        
                })
        })
    })

        db.collection('Artikelen').where('Titel', '==', titel )
            .get().then(querySnapshot =>  {
            querySnapshot.forEach(doc => {
        
            const ID = doc.data().ID

    learnH2.innerHTML = "Wat andere mensen hebben geleerd van " + titel.replace(ID, "");
            })
        })

        
        db.collection("Vitaminders").where("Gebruikersnaam", "==", GB).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const GBID = doc1.data().ID
                const GBClean = GB.replace(GBID, "")

                learnGB.innerHTML = `Door <u>${GBClean}</u>`;
            })
        })

    learnTitel.innerHTML ='"' + learn + '"';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    learnTijd.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
    inspireer.innerHTML = "Inspirerend!"
    pointsP.innerHTML = inspirationPoints 
    levenslesP.innerHTML = "Opslaan als levensles"
    bedanktP.innerHTML = "Bedankt! (Ook namens " + GB + ")"

    learnGB.addEventListener('click', (e) => {
        window.open("../Vitaminders/" + GB + ".html", "_self");
    })

    DOM.appendChild(sectionDiv);
    sectionDiv.appendChild(learnTitel);
    learnTitel.appendChild(learnGB);
    learnTitel.appendChild(learnTijd);
    sectionDiv.appendChild(socialDiv)
    socialDiv.appendChild(pointsDiv)
    pointsDiv.appendChild(pointsP)
    socialDiv.appendChild(inspireer)
    inspireer.appendChild(bedanktDiv)
    bedanktDiv.appendChild(bedanktP)
    socialDiv.appendChild(levenslesDiv)
    levenslesDiv.appendChild(levenslesP)
   
})
});

// Favorieten Artikel wegschrijven naar database
function favArtikel(){

    db.collection('Artikelen').where('Titel', '==', titel )
    .get()
    .then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        
        schrijver = doc.data().Auteur

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid).collection("Favorieten").doc().set({
        
            Type: "Inspiratie",
            Auteur: schrijver,
            Titel: titel,
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Gebruikersnaam: naam
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
            Gebruikersnaam: naam
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