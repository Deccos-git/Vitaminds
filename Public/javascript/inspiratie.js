//Filter

const filter = document.getElementById("inspiratiemenu")

db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
querySnapshot.forEach(doc => {


    const domein = doc.data().Domein

    const option = document.createElement("option")

    option.innerHTML = domein

    filter.appendChild(option)
    })
})

function filterMenu(){

    const filter = document.getElementById("inspiratiemenu")
    const domeinOptions = filter.options;
    const domeinSelect = domeinOptions[domeinOptions.selectedIndex].value;  

    console.log(domeinSelect)
}
  



// Fetching title from webadres
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

// User-role

    // Visitor
auth.onAuthStateChanged(User =>{
    if (!User){
        const coachInput = document.getElementById("coach-input")
        const editIcon = document.getElementsByClassName("edit-icon-insights")

        const editIconArray = Array.from(editIcon)

        console.log(editIconArray)
        editIconArray.forEach(icon => {
            icon.style.display = "none"
        })

        coachInput.style.display = "none"
    }
});

    //Non coach
    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                const usertype = doc.data().Usertype

                if(usertype != "Coach"){
                    const coachInput = document.getElementById("coach-input")
                    coachInput.style.display = "none"
                }
            
        })
    });

// Levensvraag artikelen detailpagina

    // Loading Insights

const DOM = document.getElementById("coach-insights")

const hiddenTitel = document.getElementById("hidden-title-div").textContent

const geenOption = document.createElement("option")

db.collection("Insights").where("LevensvraagArtikel", "==", hiddenTitel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titel = doc.data().Titel
        const body = doc.data().Body
        const coach = doc.data().Auteur
        const thema = doc.data().Thema

        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {
                const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                const photo = doc1.data().Profielfoto

                const outerDiv = document.createElement("div")
                    outerDiv.setAttribute("class", "insights-outer-div")
                const metaDiv = document.createElement("div")
                    metaDiv.setAttribute("class", "meta-div-insights")
                const metaPhoto = document.createElement("img")
                    metaPhoto.setAttribute("class", "meta-photo")
                const metaName = document.createElement("p")
                const textDiv = document.createElement("div")
                    textDiv.setAttribute("class", "text-div-insights")
                const textTitle = document.createElement("h2")
                const textBody = document.createElement("p")
                const socialDiv = document.createElement("div")
                    socialDiv.setAttribute("class", "sociale-div-insights")
                const themaDiv = document.createElement("div")
                    themaDiv.setAttribute("class", "social-div-thema-div-insights")
                const themaH3 = document.createElement("h3")
                const themaP = document.createElement("p")
                const inspirationalDiv = document.createElement("div")
                inspirationalDiv.setAttribute("class", "social-div-inspirational-div-insights")
                const inspirationalH3 = document.createElement("h3")
                const inspirationalImg = document.createElement("img")
                    inspirationalImg.setAttribute("onclick", "inspirerend(this)")
                    inspirationalImg.setAttribute("data-titel", titel)
                    inspirationalImg.setAttribute("data-coach", coach)
                    inspirationalImg.setAttribute("data-body", body)
                const bedankt = document.createElement("p")
                    bedankt.setAttribute("class", "social-note")
                const toevoegenLevenslesOuterDiv = document.createElement("div")
                    toevoegenLevenslesOuterDiv.setAttribute("class", "toevoegen-levensles-outer-div")
                const toevoegenLevensles = document.createElement("h3")
                    toevoegenLevensles.setAttribute("class", "toevoegen-levensles")
                const toevoegenLevenslesImg = document.createElement("img")
                    toevoegenLevenslesImg.setAttribute("id", "add-to-lifelesson-img")
                    toevoegenLevenslesImg.setAttribute("onclick", "toevoegenLevensles(this)")
                const toevoegenLevenslesDiv = document.createElement("div")
                    toevoegenLevenslesDiv.setAttribute("id", "toevoegen-levensles-div")
                const toevoegenLevenslesP = document.createElement("p")
                const toevoegenLevenslesSelect = document.createElement("select")
                    toevoegenLevenslesSelect.setAttribute("class", "inspiratie-select")
                const toevoegenLevenslesButton = document.createElement("button")
                    toevoegenLevenslesButton.setAttribute("onclick", "toevoegenLevenslesButton(this)")
                    toevoegenLevenslesButton.setAttribute("data-titel", titel)
                    toevoegenLevenslesButton.setAttribute("data-coach", coach)
                    toevoegenLevenslesButton.setAttribute("data-body", body)
                const opgeslagen = document.createElement("p")
                    opgeslagen.setAttribute("class", "social-note")
                const editIcon = document.createElement("img")
                    editIcon.setAttribute("src", "../images/edit-icon.png")
                    editIcon.setAttribute("class", "edit-icon-insights")
                    editIcon.setAttribute("onclick", "editIconInsights(this)")
                    editIcon.setAttribute("data-title", titel)

                metaPhoto.src = photo
                metaName.innerHTML = gebruikersnaamClean
                textTitle.innerHTML = titel
                textBody.innerHTML = body
                themaH3.innerHTML = "Verder lezen"
                inspirationalH3.innerHTML = "Inspirerend"
                inspirationalImg.src = "../Images/menu-karakter.png"
                bedankt.innerHTML = `<u>${gebruikersnaamClean}</u> zegt: Bedankt!`
                toevoegenLevensles.innerHTML = "Toevoegen aan levensvraag"
                toevoegenLevenslesImg.src = "../Images/menu-doelen.png"
                toevoegenLevenslesP.innerHTML = "Selecteer levensvraag"
                toevoegenLevenslesButton.innerHTML = "Opslaan"
                geenOption.innerHTML = "Niet aan levensvraag toevoegen"
                opgeslagen.innerHTML = `Opgeslagen in je <u>Digimind</u>`

                bedankt.addEventListener("click", () => {
                    window.open("../Vitaminders/" + coach + ".html", "_self");
                })

                auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const auth = doc.data().Gebruikersnaam
            
                            opgeslagen.addEventListener("click", () => {
                                window.open("../Vitaminders/" + auth + ".html", "_self");
                            })       
                        
                    })
                })
                

                if(thema == "Geen"){
                    themaDiv.style.display = "none"
                }else{
                themaP.innerHTML = thema

                themaP.addEventListener("click", () => {
                    window.open("../thema-artikelen/" + thema + ".html", "_self")
                })
                }

                metaDiv.addEventListener("click", () => {
                    window.open("../Vitaminders/" + coach + ".html", "_self");
                })

                const loader = document.getElementById("loader")
                    loader.style.display = "none"

                DOM.appendChild(outerDiv)
                outerDiv.appendChild(metaDiv)
                metaDiv.appendChild(metaPhoto)
                metaDiv.appendChild(metaName)
                outerDiv.appendChild(textDiv)
                textDiv.appendChild(editIcon)
                textDiv.appendChild(textTitle)
                textDiv.appendChild(textBody)
                DOM.appendChild(socialDiv)
                socialDiv.appendChild(themaDiv)
                themaDiv.appendChild(themaH3)
                themaDiv.appendChild(themaP)
                socialDiv.appendChild(inspirationalDiv)
                inspirationalDiv.appendChild(inspirationalH3)
                inspirationalDiv.appendChild(inspirationalImg)
                inspirationalDiv.appendChild(bedankt)
                socialDiv.appendChild(toevoegenLevenslesOuterDiv)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevensles)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesImg)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesDiv)
                toevoegenLevenslesDiv.appendChild(toevoegenLevenslesP)
                toevoegenLevenslesDiv.appendChild(toevoegenLevenslesSelect)
                toevoegenLevenslesDiv.appendChild(toevoegenLevenslesButton)
                toevoegenLevenslesDiv.appendChild(opgeslagen)

                // User role
                    // Visitor
                auth.onAuthStateChanged(User =>{
                    if (!User){
                        const editIcon = document.getElementsByClassName("edit-icon-insights")
                
                        const editIconArray = Array.from(editIcon)
                
                        editIconArray.forEach(icon => {
                            icon.style.display = "none"
                        })
                    }
                })
                   //Non coach
                auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                const usertype = doc.data().Usertype

                if(usertype != "Coach"){
                    const editIcon = document.getElementsByClassName("edit-icon-insights")
                
                        const editIconArray = Array.from(editIcon)
                
                        editIconArray.forEach(icon => {
                            icon.style.display = "none"
                                    })
                            }
                        
                    })
                })
            })
        })
    })
});

// Coach insights theme examples 
const DOMlist = document.getElementById("theme-list-insights")
const levensvraagList = document.getElementById("hidden-title-div").textContent
const category = document.getElementById("categorieSelectie")

db.collection("Levensvragen").where("Levensvraag", "==", levensvraagList).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const themas = doc.data().Themas

        themas.forEach(thema => {

            const p = document.createElement("p")

            p.innerHTML = thema

            DOMlist.appendChild(p)

            p.addEventListener("click", () => {
                window.open("../thema-artikelen/" + thema + ".html", "_self")
            })

                // Loading Thema's in input

                const catergory = document.getElementById("categorieSelectie")

                const divCat = document.createElement("div")
                divCat.setAttribute("class", "category-div")
        const input = document.createElement("input")
                input.type = "radio"
                input.setAttribute("class", "category-input")
                input.setAttribute("id", thema)  
                input.name = "Categorie"
                input.value = thema
                input.innerHTML = thema
        const label = document.createElement("label")
                label.setAttribute("for", thema) 
                label.innerHTML = thema

        category.appendChild(divCat)
        divCat.appendChild(input)
        divCat.appendChild(label)
        })
    })
});
    //No theme option
        const divNoCat = document.createElement("div")
                divNoCat.setAttribute("class", "category-div")
        const noInput = document.createElement("input")
                noInput.type = "radio"
                noInput.setAttribute("class", "category-input")
                noInput.setAttribute("id", "Geen") 
                noInput.setAttribute("checked", "checked") 
                noInput.name = "Categorie"
                noInput.value = "Geen"
                noInput.innerHTML = "Geen"
        const noLabel = document.createElement("label")
                noLabel.setAttribute("for", "Geen") 
                noLabel.innerHTML = "Geen"

                if (category != null){
        category.appendChild(divNoCat)
        divNoCat.appendChild(noInput)
        divNoCat.appendChild(noLabel)
            }



// Saving coach insights to database

function nieuwepostsubmit(elem){
        auth.onAuthStateChanged(User =>{
            if (User){

                const levensvraagTitel = elem.previousElementSibling.previousElementSibling.innerHTML

                let insightsRef = db.collection("Insights").doc();
                let docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
                        const coachNaam = doc.data().Gebruikersnaam;
                 
                let nieuwePostTitelVar = document.getElementById("nieuwposttitel").value;

                let nieuwePostBodyVar = tinyMCE.get('tiny-mce').getContent()

                const cat = document.getElementsByClassName("category-input")
                catArray = Array.from(cat)

                catArray.forEach(c => {
                        const check = c.checked

                        if (check == true){
                               const categorie = c.value

                                insightsRef.set({
                                    Titel: nieuwePostTitelVar,
                                    Body: nieuwePostBodyVar,
                                    Auteur: coachNaam,
                                    Inspiratiepunten: 1,
                                    LevensvraagArtikel: levensvraagTitel,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "Insight",
                                    Thema: categorie
                                }).then(() => {
                                    location.reload()
                                })
                            }

                        })
                    })     
                }
        })
};


 // Toevoegen aan levensles verwerken in database
    
    // Add to lifequestion display flex
 function toevoegenLevensles(elem){

    elem.nextSibling.style.display = "block"
    elem.style.visibility = "hidden"

    // Adding lifequestions to select
const select = elem.nextSibling.firstElementChild.nextSibling

auth.onAuthStateChanged(User =>{
    if (User){
        db.collection("Vitaminders").doc(User.uid)
        .collection("Levensvragen").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const levensvraag = doc.data().Levensvraag
                const ID = doc.data().ID
                const levensvraagClean = levensvraag.replace(ID, "")

                const toevoegenLevenslesOption = document.createElement("option")
                
                toevoegenLevenslesOption.innerHTML = levensvraagClean

                select.appendChild(geenOption)
                select.appendChild(toevoegenLevenslesOption)
                })
            })
        }
    })
};

    // Saving insight to lifequestion
 function toevoegenLevenslesButton(elem){

     const titel = elem.dataset.titel
     const body = elem.dataset.body
     const coach = elem.dataset.coach
     const levensvraagArtikel =  document.getElementById("hidden-title-div").innerHTML

     const uitlezenOption = elem.previousSibling.options
     const uitlezenSelect = uitlezenOption[uitlezenOption.selectedIndex].innerHTML;

     console.log(uitlezenSelect)

     auth.onAuthStateChanged(User =>{
         userRef = db.collection("Vitaminders").doc(User.uid)
         userRef.get()
          .then(doc => {
                  const naam = doc.data().Gebruikersnaam

     db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
     Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
     Levensles: body,
     Auteur: coach,
     Gebruikersnaam: naam,
     Titel: titel,
     Inspirerend: 1,
     Type: "Insight",
     Source: levensvraagArtikel,
     Levensvraag: uitlezenSelect
             })

     levensvraagRef = db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", uitlezenSelect).where("Gebruikersnaam", "==", naam)
     levensvraagRef.get()
     .then(querySnapshot => {
         querySnapshot.forEach(doc => {
             
             userRef.collection("Levensvragen").doc(doc.id).update({
                 Levenslessen: firebase.firestore.FieldValue.arrayUnion(body)
             })
             
         })
     })

     elem.nextSibling.style.display = "block"
     })
})
};   

// Inspiratiepunt wegschrijven naar reactie en coach

function inspirerend(elem){
    const titel = elem.dataset.titel
    const body = elem.dataset.body
    const coach = elem.dataset.coach
    const levensvraagArtikel =  document.getElementById("hidden-title-div").innerHTML
   

   auth.onAuthStateChanged(User =>{
    userRef = db.collection("Vitaminders").doc(User.uid)
    userRef.get()
     .then(doc => {
             const naam = doc.data().Gebruikersnaam

        // Naar Coach
    db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            db.collection("Vitaminders").doc(doc.id).collection("Inspiration").doc().set({

                New: "Yes",
                Reciever: coach,
                Inspiration: body,
                Titel: titel,
                Source: levensvraagArtikel,
                Giver: naam,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Type: "Insight"
            })

            // Naar insight
            db.collectionGroup("Insights").where("Titel", "==", titel).where("Auteur", "==", coach).get().then(querySnapshot => {
                querySnapshot.forEach(doc3 => {

                    db.collection("Insights").doc(doc3.id).update({

                        Inspiratiepunten: firebase.firestore.FieldValue.increment(1)
        
                    })
                })
            })
        })
    })
    const bedankt = elem.nextSibling
    bedankt.style.display = "block"
})
})
};

// Individual theme article page

    // Paragraph examples 
const DOMparagraph = document.getElementById("paragraph-list-insights")
const hiddenTitle = document.getElementById("hidden-title-div").innerHTML

console.log(DOMparagraph)
console.log(hiddenTitle)

db.collection("Themas").where("Thema", "==", hiddenTitle).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const paragraphs = doc.data().Paragraphs

        console.log(paragraphs)

        paragraphs.forEach(paragraph => {

            const p = document.createElement("p")

            p.innerHTML = paragraph

            DOMparagraph.appendChild(p)
        })
    })
});

// Saving coach insights to database

function nieuwepostsubmitThemePage(elem){
        auth.onAuthStateChanged(User =>{
            if (User){

                const levensvraagTitel = elem.previousElementSibling.previousElementSibling.innerHTML

                let insightsRef = db.collection("Insights").doc();
                let docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
                        const coachNaam = doc.data().Gebruikersnaam;
                 
                let nieuwePostTitelVar = document.getElementById("nieuwposttitel").value;

                let nieuwePostBodyVar = tinyMCE.get('tiny-mce').getContent()

                const cat = document.getElementsByClassName("category-input")
                catArray = Array.from(cat)

                catArray.forEach(c => {
                        const check = c.checked

                        if (check == true){
                               const categorie = c.value

                                insightsRef.set({
                                    Titel: nieuwePostTitelVar,
                                    Body: nieuwePostBodyVar,
                                    Auteur: coachNaam,
                                    Inspiratiepunten: 1,
                                    LevensvraagArtikel: levensvraagTitel,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "Insight",
                                    Thema: categorie
                                }).then(() => {
                                    location.reload()
                                })
                            } else {
                                insightsRef.set({
                                    Titel: nieuwePostTitelVar,
                                    Body: nieuwePostBodyVar,
                                    Auteur: coachNaam,
                                    Inspiratiepunten: 1,
                                    LevensvraagArtikel: levensvraagTitel,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "Insight",
                                    Thema: "Geen"
                                }).then(() => {
                                    location.reload()
                                })
                            }

                        })
                    })     
                }
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

        thema.innerHTML = cat

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
                const levensvraagOption = levensvraagSelect[levensvraagSelect.selectedIndex];

                if(levensvraagOption == undefined){
                    const noticeP = document.createElement("p")
                    const input = document.getElementById("learning-levensvraag")
                    const notice = document.getElementById("levenvraag-notice")

                    noticeP.innerHTML = `Om een levensles op te slaan moet je eerst een levensvraag aanmaken.Ga naar je <a href='../Vitaminders/${naamPost}'><u>Digimind</u></a> om een levenvraag aan te maken.`

                    notice.appendChild(noticeP)

                    input.style.borderColor = "red"
                    notice.style.display = "block"
                }

                const levensvraagOptionInnerHTML = levensvraagOption.innerHTML

                const KarakterRef = db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc()

                db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", levensvraagOptionInnerHTML).get().then(querySnapshot => {
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
                            const titelClean = doc.data().TitelClean

            KarakterRef.set({
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Levensles: learning,
                Auteur: auteur,
                Gebruikersnaam: naamPost,
                Titel: titel,
                Inspirerend: 1,
                Type: "Inspiratie"
            })

            db.collection("Vitaminders").where("Gebruikersnaam", "==", auteur).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc3) {

                    const email = doc3.data().Email
                    const naamClean = doc3.data().GebruikersnaamClean

            db.collection("Mail").doc().set({
                to: [email],
            message: {
            subject: `${naamClean}, iemand heeft een levemsles gehaald uit je inspiratie ${titelClean} op Vitaminds! `,
            html: `Hallo ${naamClean}, </br></br>
                    Iemand heeft een levensles gehaald uit je inspiratie ${titelClean}</br>
                    Bekijk de levensles <a href="https://vitaminds.nu/Artikelen/${titel}.html"><u>hier.</u></a></br></br>
                    Vriendelijke groet, </br></br>
                    Het Vitaminds Team </br></br>
                    <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
            }
                        
            }).catch((err) => {
                    console.log(err)
                    })

                })
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
    // const levenslesDiv = document.createElement("div")
    // const levenslesP = document.createElement("p")
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
                        Reciever: naam,
                        Source: titel,
                        Inspiration: learn,
                        Giver: auth,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        Type: "Inspiratie"
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

    learnTitel.innerHTML = learn;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    learnTijd.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
    inspireer.innerHTML = "Inspirerend!"
    pointsP.innerHTML = inspirationPoints 
    // levenslesP.innerHTML = "Opslaan als levensles"
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
    // socialDiv.appendChild(levenslesDiv)
    // levenslesDiv.appendChild(levenslesP)
   
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