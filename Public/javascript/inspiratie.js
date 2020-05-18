//Filter

const filter = document.getElementById("inspiratiemenu")

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

// Levensvraag article overview pagina

DOMarticle = document.getElementById("levensvraag-artikel-ouyter-div")

db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Levensvraag
        const headerImage = doc.data().HeaderImage
    
        const outerSection = document.createElement("section")
            outerSection.setAttribute("class", "levensvraag-artikel-section")
        const headerDiv = document.createElement("div")
            headerDiv.setAttribute("class", "levensvraag-artikel-header")
        const headerImg = document.createElement("img")
            headerImg.setAttribute("class", "header-image-article")
        const titleDiv = document.createElement("div")
        const titleH2 = document.createElement("h2")
            titleH2.setAttribute("class", "titelTekst")
        const buttonDiv = document.createElement("button")
            buttonDiv.setAttribute("class", "button-algemeen")
            buttonDiv.setAttribute("onclick", "seeArticle(this)")

        headerImg.src = headerImage
        titleH2.innerHTML = title
        buttonDiv.innerHTML = "Bekijk"

        if(DOMarticle == null){
            console.log("null")
        } else {

        DOMarticle.appendChild(outerSection)
        outerSection.appendChild(headerDiv)
        headerDiv.appendChild(headerImg)
        outerSection.appendChild(titleDiv)
        titleDiv.appendChild(titleH2)
        outerSection.appendChild(buttonDiv)
        }
    })
})

// Levensvraag artikelen openen na onclick in overview
function seeArticle(elem){

    const title = elem.previousElementSibling.firstElementChild.innerHTML

    window.open("../Artikelen/" + title + ".html", "_self")

}


// Levensvraag artikelen detailpagina

    // Title, header-image and summary
const title = document.getElementById("title-article")
const summary = document.getElementById("summary-article")
const insightsTitle = titel
const hiddenTitleArticle = document.getElementById("hidden-title-div")
const titelHead = document.getElementsByTagName("title")
const metaKeywords = document.getElementById("meta-keywords")
const metaDescription = document.getElementById("meta-description")

function loadingDOM(a){

db.collection("Levensvragen").where("Levensvraag", "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const titleArticle = doc.data().Levensvraag
        const summaryArticle = doc.data().Summary
        const keywords = doc.data().Keywords

        title.innerHTML = titleArticle
        summary.innerHTML = summaryArticle

        auth.onAuthStateChanged(User =>{
            db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                    const naam = doc.data().GebruikersnaamClean

                    insightsTitle.innerHTML = `${naam},<br> geef je professionele inzicht over:<br> ${titleArticle}`

            })
        })

        // Pagetitle and meta's

        const titelHeadArray = Array.from(titelHead)

        titelHeadArray.forEach(tit => {
            tit.innerHTML = titleArticle
        })

        metaKeywords.content = keywords
        metaDescription.content = summaryArticle

    })
}).then(() => {   

    // Loading Insight levensvraag articles

const DOM = document.getElementById("coach-insights")

db.collection("Insights").where(a, "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titelInsight = doc.data().Titel
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
                const visitProfile = document.createElement("p")
                    visitProfile.setAttribute("class", "visit-profile-button-insights")
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
                    inspirationalImg.setAttribute("data-titel", titelInsight)
                    inspirationalImg.setAttribute("data-coach", coach)
                    inspirationalImg.setAttribute("data-body", body)
                const bedankt = document.createElement("p")
                    bedankt.setAttribute("class", "social-note")
                const toevoegenLevenslesOuterDiv = document.createElement("div")
                    toevoegenLevenslesOuterDiv.setAttribute("class", "toevoegen-levensles-outer-div")
                const toevoegenLevensles = document.createElement("h3")
                    toevoegenLevensles.setAttribute("class", "toevoegen-levensles")
                const toevoegenLevenslesInput = document.createElement("input")
                    toevoegenLevenslesInput.setAttribute("placeholder", "Wat heb je geleerd?")
                const toevoegenLevenslesSelectButton = document.createElement("button")
                const toevoegenLevenslesDiv = document.createElement("div")
                    toevoegenLevenslesDiv.setAttribute("id", "toevoegen-levensles-div")
                const toevoegenLevenslesSelect = document.createElement("select")
                    toevoegenLevenslesSelect.setAttribute("class", "inspiratie-select")
                const toevoegenLevenslesToggleDiv = document.createElement("div")
                const toevoegenLevenslesButton = document.createElement("button")
                    toevoegenLevenslesButton.setAttribute("onclick", "toevoegenLevenslesButton(this)")
                    toevoegenLevenslesButton.setAttribute("data-titel", titelInsight)
                    toevoegenLevenslesButton.setAttribute("data-coach", coach)
                    toevoegenLevenslesButton.setAttribute("data-body", body)
                const opgeslagen = document.createElement("p")
                    opgeslagen.setAttribute("class", "social-note")
                const editIcon = document.createElement("img")
                    editIcon.setAttribute("src", "../images/edit-icon.png")
                    editIcon.setAttribute("class", "edit-icon-insights")
                    editIcon.setAttribute("onclick", "editIconInsights(this)")
                    editIcon.setAttribute("data-title", titelInsight)


                    //Levensvragen van auth toevoegen aan select
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
                    
                                    toevoegenLevenslesSelect.appendChild(toevoegenLevenslesOption)
                             
                
               

                            })
                        })
                    }
                });

                // Section title
                auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const auth = doc.data().GebruikersnaamClean

                            const sectionTitle = document.getElementById("insight-title")
                            sectionTitle.innerHTML = `${auth}, <br> geef je professionele inzicht over: <br> ${titel}`
                    })
                })

                toevoegenLevenslesToggleDiv.style.display = "none"
                metaPhoto.src = photo
                metaName.innerHTML = gebruikersnaamClean
                visitProfile.innerHTML = "Bekijk profiel"
                textTitle.innerHTML = titelInsight
                textBody.innerHTML = body
                themaH3.innerHTML = "Verder lezen"
                inspirationalH3.innerHTML = "Inspirerend"
                inspirationalImg.src = "../images/menu-karakter.png"
                bedankt.innerHTML = `<u>${gebruikersnaamClean}</u> zegt: Bedankt!`
                toevoegenLevensles.innerHTML = `Heeft ${gebruikersnaamClean} je geïnspireerd?`
                toevoegenLevenslesSelectButton.innerHTML = "Selecteer levensvraag"
                toevoegenLevenslesButton.innerHTML = "Opslaan"
                opgeslagen.innerHTML = `Opgeslagen in je <u>Digimind</u>`

                toevoegenLevenslesSelectButton.addEventListener("click", () => {
                    toevoegenLevenslesToggleDiv.style.display = "block"
                })

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
                    window.open("../Theme-articles/" + thema + ".html", "_self")
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
                metaDiv.appendChild(visitProfile)
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
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesDiv)
                toevoegenLevenslesDiv.appendChild(toevoegenLevenslesSelect)
                toevoegenLevenslesDiv.appendChild(toevoegenLevenslesSelectButton)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesToggleDiv)
                toevoegenLevenslesToggleDiv.appendChild(toevoegenLevenslesInput)
                toevoegenLevenslesToggleDiv.appendChild(toevoegenLevenslesButton)
                toevoegenLevenslesToggleDiv.appendChild(opgeslagen)

                // User role
                    // Visitor
                auth.onAuthStateChanged(User =>{
                    if (!User){
                        const editIcon = document.getElementsByClassName("edit-icon-insights")
                
                        const editIconArray = Array.from(editIcon)
                
                        editIconArray.forEach(icon => {
                            icon.style.display = "none"
                        })

                        toevoegenLevenslesDiv.style.display = "none"
                        

                        const CTAvisiter = document.createElement("p")
                            CTAvisiter.setAttribute("class", "CTA-visitor")

                        CTAvisiter.innerHTML = "Maak een Digimind aan en start je avontuur"
                        CTAvisiter.addEventListener("click", () => {
                            window.open("../Register.html", "_self");
                        })

                        toevoegenLevenslesOuterDiv.appendChild(CTAvisiter)
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

                    auth.onAuthStateChanged(User =>{
                        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                    const levensvragen = doc.data().Levensvragen
                    const gebruikersnaam = doc.data().Gebruikersnaam
    
                    if(levensvragen.length == 0){
                        toevoegenLevenslesDiv.style.display = "none"
                        

                        const CTAvisiter = document.createElement("p")
                            CTAvisiter.setAttribute("class", "CTA-visitor")

                        CTAvisiter.innerHTML = "Maak je eerste levensvraag aan!"
                        CTAvisiter.addEventListener("click", () => {
                            window.open(`/Vitaminders/${gebruikersnaam}.html`, "_self");
                        })

                        toevoegenLevenslesOuterDiv.appendChild(CTAvisiter)
                                    }
                            })
                        }) 
                })
            })
        })
    })
})
}   loadingDOM("LevensvraagArtikel")
    loadingDOM("ThemeArtikel")

// Paragraph-summary

const paragraphSummary = document.getElementById("paragraph-list")

db.collection("Insights").where("LevensvraagArtikel", "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const titel = doc.data().Titel
        const auteur = doc.data().Auteur

        db.collection("Vitaminders").where("Gebruikersnaam", "==", auteur).get().then(querySnapshot => {
            querySnapshot.forEach(doc1=> {

                const profielFoto = doc1.data().Profielfoto
                const gebruikersnaam = doc1.data().Gebruikersnaam
        

        const innerDiv = document.createElement("div")
        innerDiv.setAttribute("class", "paragraph-list-inner-div")
       const titelDiv = document.createElement("p")
       const photoDiv = document.createElement("div")
                photoDiv.setAttribute("class", "photo-div-paragraph")
        const photoImg = document.createElement("img")
                photoImg.setAttribute("class", "meta-photo")

        titelDiv.innerHTML = titel
        photoImg.src = profielFoto

        photoDiv.addEventListener("click", () => {
            window.open(`/Vitaminders/${gebruikersnaam}.html`, "_self");
        })

        paragraphSummary.appendChild(innerDiv)
        innerDiv.appendChild(photoDiv)
        photoDiv.appendChild(photoImg)
        innerDiv.appendChild(titelDiv)
        

        // li.addEventListener("click", () => {
        //      const insight = document.getElementsByClassName("text-div-insights")

        // const insightArray = Array.from(insight)

        //     insightArray.forEach(ins =>{

        //         insInner = ins.firstElementChild.nextElementSibling.innerHTML

        //         if( insInner == li.innerHTML){
        //             location.href = `#${ins}`
        //         }

        //     })
        // })
            })
        })
    })
});

// Coach insights theme examples 
const DOMlist = document.getElementById("theme-list-insights")
const category = document.getElementById("categorieSelectie")

db.collection("Themas").where("Levensvragen", "array-contains", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const themas = doc.data().Thema

        console.log(themas)

            const p = document.createElement("p")

            p.innerHTML = themas

            DOMlist.appendChild(p)

            p.addEventListener("click", () => {
                window.open("../Theme-articles/" + thema + ".html", "_self")
            })

                // Loading Thema's in input

                const category = document.getElementById("categorieSelectie")

                const divCat = document.createElement("div")
                divCat.setAttribute("class", "category-div")
        const input = document.createElement("input")
                input.type = "radio"
                input.setAttribute("class", "category-input")
                input.setAttribute("id", themas)  
                input.name = "Categorie"
                input.value = themas
                input.innerHTML = themas
        const label = document.createElement("label")
                label.setAttribute("for", themas) 
                label.innerHTML = themas

        category.appendChild(divCat)
        divCat.appendChild(input)
        divCat.appendChild(label)
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

function nieuwepostsubmit(){
        auth.onAuthStateChanged(User =>{
            if (User){

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
                                    LevensvraagArtikel: titel,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "Insight-levensvraag",
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

    // Saving insight to lifequestion
 function toevoegenLevenslesButton(elem){

     const titel = elem.dataset.titel
     const input = elem.previousElementSibling.value
     const coach = elem.dataset.coach
     const levensvraagArtikel =  document.getElementById("hidden-title-div").innerHTML

     const uitlezenOption = elem.parentElement.previousSibling.firstElementChild.options
     const uitlezenSelect = uitlezenOption[uitlezenOption.selectedIndex].innerHTML;

     auth.onAuthStateChanged(User =>{
         userRef = db.collection("Vitaminders").doc(User.uid)
         userRef.get()
          .then(doc => {
                  const naam = doc.data().Gebruikersnaam

     db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
     Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
     Levensles: input,
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
                 Levenslessen: firebase.firestore.FieldValue.arrayUnion(input)
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
const titleThemeArticle = document.getElementById("title-theme-article")
const summaryThemeArticle = document.getElementById("subtitel-theme-article-h2")
const headerImageThemeArticle = document.getElementById("header-image-theme-article-img")
const coachInputTitle = document.getElementById("coach-input-title")
const titelHeadThemePage = document.getElementById("page-title-theme-page")
const metaKeywordsThemePage = document.getElementById("meta-keywords-theme-page")
const metaDescriptionThemePage = document.getElementById("meta-description-theme-page")

db.collection("Themas").where("Thema", "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const paragraphs = doc.data().Paragraphs
        const theme = doc.data().Thema
        const summary = doc.data().Summary
        const headerImage = doc.data().HeaderImage

        titleThemeArticle.innerHTML = theme
        summaryThemeArticle.innerHTML = summary
        headerImageThemeArticle.src = headerImage

        paragraphs.forEach(paragraph => {

            const p = document.createElement("p")

            p.innerHTML = paragraph

            DOMparagraph.appendChild(p)
        })

        auth.onAuthStateChanged(User =>{
            db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                    const naam = doc.data().GebruikersnaamClean

                    coachInputTitle.innerHTML = `${naam},<br> geef je professionele inzicht over:<br> ${titel}`

            })
        })

        // Pagetitle & meta's

        titelHeadThemePage.innerHTML = theme
        metaKeywordsThemePage.content = theme
        metaDescriptionThemePage.content = summary

    })
});

// Saving coach insights to database

function nieuwepostsubmitThemePage(){
        auth.onAuthStateChanged(User =>{
            if (User){

                let insightsRef = db.collection("Insights").doc();
                let docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
                        const coachNaam = doc.data().Gebruikersnaam;
                 
                let nieuwePostTitelVar = document.getElementById("nieuwposttitel").value;

                let nieuwePostBodyVar = tinyMCE.get('tiny-mce').getContent()

                                insightsRef.set({
                                    Titel: nieuwePostTitelVar,
                                    Body: nieuwePostBodyVar,
                                    Auteur: coachNaam,
                                    Inspiratiepunten: 1,
                                    ThemeArtikel: titel,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "Insight-theme-article",
                                }).then(() => {
                                    location.reload()
                                })
                    })     
                }
        })
};


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