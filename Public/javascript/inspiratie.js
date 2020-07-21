
// Fetching title from url
const titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
const titel1 = titelhtml.replace('.html', '')
const titel2 = titel1.replace('%20',' ')
const titel3 = titel2.replace('%20',' ')
const titel4 = titel3.replace('%20',' ')
const titel5 = titel4.replace('%20',' ')
const titel6 = titel4.replace('%20',' ')
const titel7 = titel6.replace('%20',' ')
const titel8 = titel7.replace('%20',' ')
const titel9 = titel8.replace('%20',' ')
const titel10 = titel9.replace('%20',' ')
const titel11 = titel10.replace('%20',' ')
const titel12 = titel11.split("?fb")
const titel = titel12[0]


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
        if(coachInput != null){
        coachInput.style.display = "none"
        };
    };
});

    //Non coach
    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                const usertype = doc.data().Usertype

                if(usertype != "Coach"){
                    const coachInput = document.getElementById("coach-input")
                    if(coachInput != undefined){
                    coachInput.style.display = "none"
                    };
                };
            
        })
    });

// Register view count on article load
window.addEventListener("load", () => {

    // Levensvragen
    db.collection("Levensvragen").where("Levensvraag", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("Levensvragen").doc(doc.id).update({
                Views: firebase.firestore.FieldValue.increment(1)
            })  
        })
    })

    // Theme articles
    db.collection("Themas").where("Thema", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("Themas").doc(doc.id).update({
                Views: firebase.firestore.FieldValue.increment(1)
            })  
        })
    })
});

// Levensvraag article overview pagina

    // Coach proposal

    const authHeader = document.getElementById("titleSub-proposal")
    const goalProposalOuterDiv = document.getElementById("goal-article-section-goal-proposal")

    auth.onAuthStateChanged(User =>{
        if(User){
        db.collection("Vitaminders").doc(User.uid).get().then(function(doc) {

            const userType = doc.data().Usertype
            const nameClean = doc.data().GebruikersnaamClean

            if(userType == "Coach"){
                goalProposalOuterDiv.style.display = "flex"
                authHeader.innerText = `${nameClean},`
            };

        });
        };
    });

DOMarticle = document.getElementById("levensvraag-artikel-ouyter-div")

db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Levensvraag
        const headerImage = doc.data().HeaderImage
        const insights = doc.data().Insights
        const goal = doc.data().Levensvraag

        // Hidding articles with no insights for visitor  non-coach
        if (insights.length == 0){
        auth.onAuthStateChanged(User =>{
            if (!User){
                outerSection.style.display = "none"
                    }
                })
            };

         // Hidding articles with no insights for non-coach
            if (insights.length == 0){
                auth.onAuthStateChanged(User =>{
                db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                    const usertype = doc.data().Usertype
    
                    if(usertype != "Coach"){
                        outerSection.style.display = "none"
                    }
                })
            })
        };
     
        const outerSection = document.createElement("section")
            outerSection.setAttribute("class", "levensvraag-artikel-section")
            outerSection.setAttribute("data-title", title)
            outerSection.setAttribute("data-goal", goal)
        const headerDiv = document.createElement("div")
            headerDiv.setAttribute("class", "levensvraag-artikel-header")
        const headerImg = document.createElement("img")
            headerImg.setAttribute("class", "header-image-article")
        const titleDiv = document.createElement("div")
        const titleSub = document.createElement("h5")
            titleSub.setAttribute("class", "titleSub")
        const titleH2 = document.createElement("h2")
            titleH2.setAttribute("class", "titelTekst")
        const buttonDiv = document.createElement("button")
            buttonDiv.setAttribute("class", "button-algemeen-card")
            buttonDiv.setAttribute("onclick", "seeArticle(this)")

        // Dynamic title
        const count = insights.length

        titleSub.innerHTML = `${count} coaches over`

        if(count == 1){
        titleSub.innerHTML = `${count} coach over`
        }

        // Exemption on dynamic title
        if(title == "Zelfliefde"){
            titleSub.innerHTML = `${count} tips voor meer`

            if(count == 1){
            titleSub.innerHTML = `${count} tip voor meer`
        }
        }

        titleH2.innerHTML = title
        headerImg.src = headerImage
        buttonDiv.innerHTML = "Bekijk"

        if(DOMarticle == null){
            console.log("null")
        } else {

        DOMarticle.appendChild(outerSection)
        outerSection.appendChild(headerDiv)
        headerDiv.appendChild(headerImg)
        outerSection.appendChild(titleDiv)
        titleDiv.appendChild(titleSub)
        titleDiv.appendChild(titleH2)
        outerSection.appendChild(buttonDiv)
        }
    })
}).then(() => {

    //Filter

const goalFilter = localStorage.getItem("Goal")

if(goalFilter != "All goals"){

const DOMgoal = document.getElementsByClassName("levensvraag-artikel-section")

const DOMgoalArray = Array.from(DOMgoal)

    db.collection("Levensvragen").where("Levensvraag", "==", goalFilter).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const goal = doc.data().Levensvraag

            DOMgoalArray.forEach(DOM => {

            const data = DOM.dataset.goal

            if(goal != data){

                DOM.style.display = "none"
                    };
                })
            });
        });
    };
});

// Levensvraag artikelen openen na onclick in overview
function seeArticle(elem){

    const title = elem.previousElementSibling.firstElementChild.nextElementSibling.innerHTML

    window.open("../Artikelen/" + title + ".html", "_self")

};

// Theme overview page
toolDOM = document.getElementById("theme-article-outer-div")

db.collection("Themas").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titel = doc.data().Thema
        const img = doc.data().HeaderImage
        const insights = doc.data().Insights
        const levensvragen = doc.data().Levensvragen

        // Hidding articles with no insights for visitor  non-coach
        if (insights.length == 0){
        auth.onAuthStateChanged(User =>{
            if (!User){
                outerDiv.style.display = "none"
                    }
                })
            };

         // Hidding articles with no insights for non-coach
            if (insights.length == 0){
                auth.onAuthStateChanged(User =>{
                db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                    const usertype = doc.data().Usertype
    
                    if(usertype != "Coach"){
                        outerDiv.style.display = "none"
                    }
                })
            })
        };

        const outerDiv = document.createElement("div")
            outerDiv.setAttribute("class", "tool-outer-div")
            outerDiv.setAttribute("data-title", titel)
        const header = document.createElement("div")
            header.setAttribute("class", "tools-header")
        const textDiv = document.createElement("div")
            textDiv.setAttribute("class", "tool-text-div")
        const titleSub = document.createElement("h5")
            titleSub.setAttribute("class", "titleSub")
        const title = document.createElement("h2")
            title.setAttribute("class", "title-tool")
        const button = document.createElement("button")
            button.setAttribute("class", "button-algemeen")

        header.style.backgroundImage = `url("${img}")`

        // Dynamic title
        const count = insights.length
        titleSub.innerHTML = `${count} coaches over`

        if(count == 1){
        titleSub.innerHTML = `${count} coach over`
        }

        title.innerHTML = titel
        button.innerHTML = "Bekijk"
        button.addEventListener("click", () => {
            window.open(`../Theme-articles/${titel}.html`, "_self")
        })

        toolDOM.appendChild(outerDiv)
        outerDiv.appendChild(header)
        outerDiv.appendChild(textDiv)
        textDiv.appendChild(titleSub)
        textDiv.appendChild(title)
        outerDiv.appendChild(button)
    })
}).then(() => {

    // Filter
    const goalFilter = localStorage.getItem("Goal")

    const DOMgoal = document.getElementsByClassName("tool-outer-div")

    const DOMgoalArray = Array.from(DOMgoal)

    const themeArray = []

    if(goalFilter != null){

    db.collection("Themas").where("Levensvragen", "array-contains", goalFilter).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const thema = doc1.data().Thema

            themeArray.push(thema)

            });
        }).then(() => {

        DOMgoalArray.forEach(DOM => {

            const data = DOM.dataset.title

            if(!themeArray.includes(data)){

                DOM.style.display = "none"
                };
            });
        });
    };
}); 

// Individual levensvraag page

    // Title, header-image and summary
const title = document.getElementById("title-article")
const summary = document.getElementById("summary-article")
const insightsTitle = titel
const titelHead = document.getElementsByTagName("title")
const metaKeywords = document.getElementById("meta-keywords")
const metaDescription = document.getElementById("meta-description")
const headerDiv = document.getElementById("levensvraag-artikel-main-image")
const headerImg = document.createElement("img")
const facebookUrl = document.getElementById("facebook-url")
const facebookTitle = document.getElementById("facebook-title")
const facebookDescription = document.getElementById("facebook-description")
const facebookImg = document.getElementById("facebook-img")
const paragraphListLevensvraag= document.getElementById("paragraph-list")
const coachInsightsLevensvraag = document.getElementById("coach-insights")
const paragrphListInsightsLevensvraag = document.getElementById("paragraph-list-insights")
const selectParagraphCoachInsightLevensvraag = document.createElement("select")
    selectParagraphCoachInsightLevensvraag.setAttribute("id", "select-paragraph-coach-insight-levensvraag")


db.collection("Levensvragen").where("Levensvraag", "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const paragraphs = doc.data().Paragraphs
        const titleArticle = doc.data().Levensvraag
        const summaryArticle = doc.data().Summary
        const keywords = doc.data().Keywords
        const headerImage = doc.data().HeaderImage

        title.innerHTML = titleArticle
        summary.innerHTML = summaryArticle
        headerImg.src = headerImage

        headerDiv.appendChild(headerImg)

        //Paragraphs in article summary
        paragraphs.forEach(paragraph => {

            const p = document.createElement("p")
                p.setAttribute("class", "menu-paragraph-item")

            p.innerHTML = paragraph

            paragraphListLevensvraag.appendChild(p)

            const pTitle = p.innerText

            p.style.display = "none"

            db.collection("Insights").where("LevensvraagArtikel", "==", titel).where("Paragraph", "==", pTitle).orderBy("Timestamp", "asc").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
            
                    p.style.display = "block"
                })
            });
        });

        // Paragraphs in article as subtitles
        paragraphs.forEach(paragraph => {

            const parraDiv = document.createElement("div")
                parraDiv.setAttribute("class", "article-paragraphs")

            const parra = document.createElement("h2")

            parra.innerHTML = paragraph

            coachInsightsLevensvraag.appendChild(parraDiv)
            parraDiv.appendChild(parra)
        });

            // Paragraphs in select coach insight

            paragraphs.forEach(paragraph => {

                const option = document.createElement("option")
     
                 option.innerHTML = paragraph
     
                 paragrphListInsightsLevensvraag.appendChild(selectParagraphCoachInsightLevensvraag)
                 selectParagraphCoachInsightLevensvraag.appendChild(option)
             });

        // Edit summary
        const editDiv = document.createElement("div")
        const editIcon = document.createElement("img")
            editIcon.setAttribute("src", "../images/edit-icon.png")
            editIcon.setAttribute("class", "edit-icon-insights")
            editIcon.setAttribute("onclick", "editIconSummary(this)")
            editIcon.setAttribute("data-title", titleArticle)

            editDiv.appendChild(editIcon)

        //Non admin
        auth.onAuthStateChanged(User =>{
            db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                    const admin = doc.data().Admin

                if(admin != "Yes"){
                    editIcon.style.display = "none"
                }
            
        })
    })

        // Visitor
        auth.onAuthStateChanged(User =>{
            if (!User){

                editIcon.style.display = "none"
            }
        });

       // Pagetitle & meta's & facebook crawl

        const titelHeadArray = Array.from(titelHead)

        titelHeadArray.forEach(tit => {
            tit.innerHTML = titleArticle
        });

        metaKeywords.content = keywords
        metaDescription.content = summaryArticle
        facebookUrl.content = window.location.href
        facebookTitle.content = titleArticle
        facebookDescription.content = summaryArticle
        facebookImg.content = headerImage

    })
}).then(() => {   

    // Append insight to paragraph

    const paragraphList = document.getElementsByClassName("article-paragraphs")

    const paraArray = Array.from(paragraphList)

    paraArray.forEach(parra => {

        parra.style.display = "none"

        const parraTitle = parra.innerText

    // Loading Insight levensvraag articles

const DOM = document.getElementById("coach-insights")

db.collection("Insights").where("LevensvraagArtikel", "==", titel).where("Paragraph", "==", parraTitle).orderBy("Timestamp", "asc").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titelInsight = doc.data().Titel
        const body = doc.data().Body
        const coach = doc.data().Auteur
        const thema = doc.data().Thema
        const levensvraagArtikel = doc.data().LevensvraagArtikel
        const themeArtikel = doc.data().ThemeArtikel

        parra.style.display = "block"

        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {
                const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                const photo = doc1.data().Profielfoto

                outerDiv = document.createElement("div")
                    outerDiv.setAttribute("class", "insights-outer-div")
                    outerDiv.setAttribute("data-coach", coach)
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
                const readMoreDiv = document.createElement("div")
                    readMoreDiv.setAttribute("class", "read-more-div")
                const readMore = document.createElement("button")
                    readMore.setAttribute("class", "button-read-more")
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
                    toevoegenLevenslesInput.setAttribute("class", "toevoegen-levensles-input")
                const toevoegenLevenslesDiv = document.createElement("div")
                    toevoegenLevenslesDiv.setAttribute("id", "toevoegen-levensles-div")
                const toevoegenLevenslesButtonDiv = document.createElement("div")
                const toevoegenLevenslesButton = document.createElement("button")
                    toevoegenLevenslesButton.setAttribute("onclick", "toevoegenLevenslesButton(this)")
                    toevoegenLevenslesButton.setAttribute("data-titel", titelInsight)
                    toevoegenLevenslesButton.setAttribute("data-coach", coach)
                    toevoegenLevenslesButton.setAttribute("data-body", body)
                const CTAnoGoalDiv = document.createElement("div")
                    CTAnoGoalDiv.setAttribute("id", "CTA-no-goal-auth")
                const CTAnoGoalP = document.createElement("p")
                const CTAvisitorDiv = document.createElement("div")
                    CTAvisitorDiv.setAttribute("class", "CTA-visitor")
                const CTAvisitor = document.createElement("p")
                const opgeslagen = document.createElement("p")
                    opgeslagen.setAttribute("class", "social-note")
                const editIcon = document.createElement("img")
                    editIcon.setAttribute("src", "../images/edit-icon.png")
                    editIcon.setAttribute("class", "edit-icon-insights")
                    editIcon.setAttribute("onclick", "editIconInsights(this)")
                    editIcon.setAttribute("data-title", titelInsight)
                    editIcon.setAttribute("data-levensvraagtitle", levensvraagArtikel)
                    editIcon.setAttribute("data-themetitle", themeArtikel)
                    editIcon.setAttribute("data-coach", coach)


                    //LocalStorage goal to CTA
                    const goal = localStorage.getItem("Goal")

                    // Auth has no goal
                    auth.onAuthStateChanged(User =>{
                        db.collection("Vitaminders").doc(User.uid).get().then(doc => {

                            const auth = doc.data().Gebruikersnaam

                    toevoegenLevensles.innerHTML = `Heb je iets geleerd over ${goal}?`
                    toevoegenLevenslesInput.style.display = "none"
                    toevoegenLevenslesButtonDiv.style.display = "none"

                    if(goal == null || goal == "Geen doel selecteren"){
                        toevoegenLevensles.innerHTML = `Heb je iets geleerd over jezelf?`
                    };

                    CTAnoGoalDiv.appendChild(CTAnoGoalP)

                    CTAnoGoalDiv.style.display = "block"
                    CTAnoGoalP.innerText = "Maak eerst een doel aan om je les aan te koppelen"

                    CTAnoGoalDiv.addEventListener("click", () => {
                        window.open("../Vitaminders/" + auth, "_self");
                    });

                    localStorage.setItem("DigimindGoal", goal)

                        })
                    });

                    // Auth has goal(s)

                    auth.onAuthStateChanged(User =>{
                        if (User){
                            
                            // Geen goal in storage
                            if(goal == null || goal == "Geen doel selecteren"){
                                toevoegenLevensles.innerHTML = `Heb je iets geleerd over jezelf?`
                            };

                            db.collection("Vitaminders").doc(User.uid)
                            .collection("Levensvragen").where("Goal", "==", goal).get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(doc => {
                                    const levensvraag = doc.data().LevensvraagClean

                                    toevoegenLevenslesInput.style.display = "block"
                                    toevoegenLevenslesButtonDiv.style.display = "block"
                                    CTAnoGoalDiv.style.display = "none"
                                    toevoegenLevensles.innerHTML = `Heb je iets geleerd over "${levensvraag}" ?`

                            })
                        });
                        
                    } else {
                         // Visitor

                     // Geen goal in storage
                     if(goal == null || goal == "Geen doel selecteren"){
                        toevoegenLevensles.innerHTML = `Heb je iets geleerd over jezelf?`

                        toevoegenLevenslesInput.style.display = "none"
                    toevoegenLevenslesButton.style.display = "none"

                    CTAvisitor.innerHTML = " Maak een Digimind aan om je lessen in op te slaan"
                    CTAvisitorDiv.style.cursor = "pointer"

                    CTAvisitorDiv.addEventListener("click", () => {
                        window.open("../Register.html", "_self");
                    })

                    CTAvisitorDiv.appendChild(CTAvisitor)
                    }else{

                    toevoegenLevensles.innerHTML = `Heb je iets geleerd over ${goal}?`

                    toevoegenLevenslesInput.style.display = "none"
                    toevoegenLevenslesButton.style.display = "none"

                    CTAvisitor.innerHTML = " Maak een Digimind aan om je lessen in op te slaan"
                    CTAvisitorDiv.style.cursor = "pointer"

                    CTAvisitorDiv.addEventListener("click", () => {
                        window.open("../Register.html", "_self");
                    })

                    CTAvisitorDiv.appendChild(CTAvisitor)
                        };
                    };
                });

                // Insights title
                auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const naam = doc.data().GebruikersnaamClean

                            const sectionTitle = document.getElementById("insight-title")
                            if(sectionTitle != null){
                                    // Exemptions for this title
                            if(titel == "Zelfliefde"){
                                sectionTitle.innerHTML = `${naam},<br> geef een tip voor meer<br> ${titel}`
                            } else {
                            sectionTitle.innerHTML = `${naam},<br> geef je professionele inzicht over:<br> ${titel}`
                            };
                        };    
                    })
                })

                metaPhoto.src = photo
                metaName.innerHTML = gebruikersnaamClean
                visitProfile.innerHTML = "Bekijk profiel"
                textTitle.innerHTML = titelInsight
                textBody.innerHTML = body
                readMore.innerHTML = "Lees meer"
                themaH3.innerHTML = "Verder lezen"
                inspirationalH3.innerHTML = "Inspirerend"
                inspirationalImg.src = "../images/menu-karakter.png"
                bedankt.innerHTML = `<u>${gebruikersnaamClean}</u> zegt: Bedankt!`
                toevoegenLevenslesButton.innerHTML = "Opslaan"
                opgeslagen.innerHTML = `Opgeslagen in je <u>Digimind</u>`

                bedankt.addEventListener("click", () => {
                    window.open("../Vitaminders/" + coach + ".html", "_self");
                });

                auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const auth = doc.data().Gebruikersnaam
            
                            opgeslagen.addEventListener("click", () => {
                                window.open("../Vitaminders/" + auth + ".html", "_self");
                        });       
                    });
                });
                
                // Display read more of this theme button if read more is set
                if(thema == undefined){
                    themaDiv.style.display = "none"
                }else{
                themaP.innerHTML = thema

                themaP.addEventListener("click", () => {
                    window.open("../Theme-articles/" + thema + ".html", "_self")
                })
                };

                metaDiv.addEventListener("click", () => {
                    window.open("../Vitaminders/" + coach + ".html", "_self");
                });

                readMore.addEventListener("click", () => {
                    textDiv.style.maxHeight = "max-content"
                    readMore.style.display = "none"
                });


                // Loader
                const loader = document.getElementById("loader")
                    loader.style.display = "none"

                parra.appendChild(outerDiv)
                outerDiv.appendChild(metaDiv)
                metaDiv.appendChild(metaPhoto)
                metaDiv.appendChild(metaName)
                metaDiv.appendChild(visitProfile)
                outerDiv.appendChild(textDiv)
                textDiv.appendChild(editIcon)
                textDiv.appendChild(textTitle)
                textDiv.appendChild(textBody)
                

                 // Append "read more" if max height is > 300px
                    if(textDiv.offsetHeight >= 300){
                        parra.appendChild(readMoreDiv)
                        readMoreDiv.appendChild(readMore)
                        textDiv.style.maxHeight = "290px"
                        textDiv.style.overflow = "hidden"
                        outerDiv.style.paddingBottom = "50px"
                    };

                parra.appendChild(socialDiv)
                // socialDiv.appendChild(themaDiv)
                // themaDiv.appendChild(themaH3)
                // themaDiv.appendChild(themaP)
                socialDiv.appendChild(inspirationalDiv)
                inspirationalDiv.appendChild(inspirationalH3)
                inspirationalDiv.appendChild(inspirationalImg)
                inspirationalDiv.appendChild(bedankt)
                socialDiv.appendChild(toevoegenLevenslesOuterDiv)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevensles)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesDiv)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesInput)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesButtonDiv)
                toevoegenLevenslesButtonDiv.appendChild(toevoegenLevenslesButton)
                toevoegenLevenslesOuterDiv.appendChild(CTAvisitorDiv)
                toevoegenLevenslesOuterDiv.appendChild(CTAnoGoalDiv)
                toevoegenLevenslesOuterDiv.appendChild(opgeslagen)
            
                // Menu scroll to paragraph

            const menuItem = document.getElementsByClassName("menu-paragraph-item")
            const paragraphTitle = document.getElementsByClassName("article-paragraphs")

            const menuItemArray = Array.from(menuItem)

            menuItemArray.forEach(menu => {

                const paragraphTitleArray = Array.from(paragraphTitle)

                paragraphTitleArray.forEach(para => {

                    if(menu.innerText == para.firstElementChild.innerText){
                        menu.addEventListener("click", () => {
                            para.scrollIntoView()
                        });
                    };
                })
            });

                // User role
                    // Visitor
                auth.onAuthStateChanged(User =>{
                    if (!User){
                        const editIcon = document.getElementsByClassName("edit-icon-insights")
                
                        const editIconArray = Array.from(editIcon)
                
                        editIconArray.forEach(icon => {
                            icon.style.display = "none"
                        })
                    };
                });
                   //Non auth

                   const coachData = outerDiv.dataset.coach
                   
                   auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const auth = doc.data().Gebruikersnaam
                    
                if(coachData != auth){

                    if(editIcon != undefined){
                    editIcon.style.display = "none"
                };
                    };
                        })
                            });

                        // Admin

                        auth.onAuthStateChanged(User =>{
                            db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                                    const admin = doc.data().Admin
                            
                        if(admin == "Yes"){
        
                            editIcon.style.display = "flex"
        
                                };
                            });
                        });
                    });
                });
            });
        });
    });
});


// Saving coach insights to database

function nieuwepostsubmit(){
        auth.onAuthStateChanged(User =>{
            if (User){

                const insightsRef = db.collection("Insights").doc();
                const docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
                        const coachNaam = doc.data().Gebruikersnaam;
                 
                const nieuwePostTitelVar = document.getElementById("nieuwposttitel").value;
                const titelInput = document.getElementById("nieuwposttitel")

                if (nieuwePostTitelVar == ""){
                    titelInput.style.borderColor = "red"
                    titelInput.scrollIntoView()
                }

                const paragraphSelect = document.getElementById("select-paragraph-coach-insight-levensvraag")

                const option = paragraphSelect.options
                const selected = option[option.selectedIndex].innerHTML

                let nieuwePostBodyVar = tinyMCE.get('tiny-mce').getContent()

                                insightsRef.set({
                                    Titel: nieuwePostTitelVar,
                                    Body: nieuwePostBodyVar,
                                    Auteur: coachNaam,
                                    Inspiratiepunten: 1,
                                    LevensvraagArtikel: titel,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "Insight-levensvraag",
                                    Paragraph: selected,
                                    Content: "Text",
                                });
                         
                        //Storing insight in levensvraag
                db.collection("Levensvragen").where("Levensvraag", "==", titel).get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        db.collection("Levensvragen").doc(doc1.id).update({
                            Insights: firebase.firestore.FieldValue.arrayUnion(nieuwePostTitelVar)

                                })
                            });
                        }).then(() => {
                            location.reload()
                        });
                    }) ;    
                };
        });
};

 // Toevoegen aan levensles verwerken in database

    // Saving insight to lifequestion
 function toevoegenLevenslesButton(elem){

     const titelElem = elem.dataset.titel
     const input = elem.parentElement.previousElementSibling.value
     const coach = elem.dataset.coach

     const goalTitleStorage = localStorage.getItem("GoalTitle")

     db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", goalTitleStorage).get()
     .then(querySnapshot => {
         querySnapshot.forEach(doc => {

            const levensvraagID = doc.data().Levensvraag

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
     Type: "Coach-inzicht",
     Source: titelElem,
     Levensvraag: levensvraagID
             })

     levensvraagRef = db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraagID).where("Gebruikersnaam", "==", naam)
     levensvraagRef.get()
     .then(querySnapshot => {
         querySnapshot.forEach(doc => {
             
             userRef.collection("Levensvragen").doc(doc.id).update({
                 Levenslessen: firebase.firestore.FieldValue.arrayUnion(input)
             })
             
         })
     })

     elem.parentElement.nextSibling.nextSibling.style.display = "block"
                })
            })
        })
    })
};  

// Inspiratiepunt wegschrijven naar reactie en coach

function inspirerend(elem){
    const titelElem = elem.dataset.titel
    const body = elem.dataset.body
    const coach = elem.dataset.coach
   

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
                Source: titelElem,
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

const DOMparagraph = document.getElementById("paragraph-list-insights")
const titleThemeArticle = document.getElementById("title-theme-article")
const summaryThemeArticle = document.getElementById("subtitel-theme-article-h2")
const headerImageThemeArticle = document.getElementById("header-image-theme-article-img")
const coachInputTitle = document.getElementById("coach-input-title")
const titelHeadThemePage = document.getElementById("page-title-theme-page")
const metaKeywordsThemePage = document.getElementById("meta-keywords-theme-page")
const metaDescriptionThemePage = document.getElementById("meta-description-theme-page")
const paragraphListTheme = document.getElementById("paragraph-list-theme")
const coachInsights = document.getElementById("coach-insights-theme")
const paragrphListInsights = document.getElementById("paragraph-list-insights")
const selectParagraphCoachInsight = document.createElement("select")
    selectParagraphCoachInsight.setAttribute("id", "select-paragraph-coach-insight-theme")



db.collection("Themas").where("Thema", "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const paragraphs = doc.data().Paragraphs
        const theme = doc.data().Thema
        const summary = doc.data().Summary
        const headerImage = doc.data().HeaderImage 

        titleThemeArticle.innerHTML = theme
        summaryThemeArticle.innerHTML = summary
        headerImageThemeArticle.src = headerImage

        //Paragraphs in article summary
        paragraphs.forEach(paragraph => {

            const p = document.createElement("p")
                p.setAttribute("class", "menu-paragraph-item-theme")

            p.innerHTML = paragraph

            paragraphListTheme.appendChild(p)

            const pTitle = p.innerText

            p.style.display = "none"

            db.collection("Insights").where("ThemeArtikel", "==", titel).where("Paragraph", "==", pTitle).orderBy("Timestamp", "asc").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
            
                    p.style.display = "block"
                })
            });
        });

        // Paragraphs in article as subtitles
        paragraphs.forEach(paragraph => {

            const parraDiv = document.createElement("div")
                parraDiv.setAttribute("class", "article-paragraphs-theme")

            const parra = document.createElement("h2")

            parra.innerHTML = paragraph

            coachInsights.appendChild(parraDiv)
            parraDiv.appendChild(parra)
            
        });
    

        // Paragraphs in select coach insight

        paragraphs.forEach(paragraph => {

           const option = document.createElement("option")

            option.innerHTML = paragraph

            paragrphListInsights.appendChild(selectParagraphCoachInsight)
            selectParagraphCoachInsight.appendChild(option)
        });

        auth.onAuthStateChanged(User =>{
            db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                    const naam = doc.data().GebruikersnaamClean

                    coachInputTitle.innerHTML = `${naam},<br> geef je professionele inzicht over:<br> ${titel}`

            })
        });

        // Pagetitle & meta's & facebook crawl
        const facebookUrl = document.getElementById("facebook-url")
        const facebookTitle = document.getElementById("facebook-title")
        const facebookDescription = document.getElementById("facebook-description")
        const facebookImg = document.getElementById("facebook-img")

        titelHeadThemePage.innerHTML = theme
        metaKeywordsThemePage.content = theme
        metaDescriptionThemePage.content = summary
        facebookUrl.content = window.location.href
        facebookTitle.content = theme
        facebookDescription.content = summary
        facebookImg.content = headerImage

    })
}).then(() => {
   
   // Loading Insight theme articles

        // Append insight to paragraph

        const paragraphList = document.getElementsByClassName("article-paragraphs-theme")

        const paraArray = Array.from(paragraphList)

        paraArray.forEach(parra => {

            parra.style.display = "none"

            const parraTitle = parra.innerText


db.collection("Insights").where("ThemeArtikel", "==", titel).where("Paragraph", "==", parraTitle).orderBy("Timestamp", "asc").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titelInsight = doc.data().Titel
        const body = doc.data().Body
        const coach = doc.data().Auteur
        const thema = doc.data().Thema
        const levensvraagArtikel = doc.data().LevensvraagArtikel
        const themeArtikel = doc.data().ThemeArtikel

        parra.style.display = "block"

        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {
                const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                const photo = doc1.data().Profielfoto

                outerDiv = document.createElement("div")
                    outerDiv.setAttribute("class", "insights-outer-div")
                    outerDiv.setAttribute("data-coach", coach)
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
                const readMoreDiv = document.createElement("div")
                    readMoreDiv.setAttribute("class", "read-more-div")
                const readMore = document.createElement("button")
                    readMore.setAttribute("class", "button-read-more")
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
                const toevoegenLevenslesSelectDiv = document.createElement("div")
                    toevoegenLevenslesSelectDiv.setAttribute("class", "toeveogen-levensles-select-div")
                const toevoegenLevenslesSelect = document.createElement("select")
                    toevoegenLevenslesSelect.setAttribute("class", "toevoegen-levensles-select")
                const toevoegenLevensles = document.createElement("h3")
                    toevoegenLevensles.setAttribute("class", "toevoegen-levensles")
                const toevoegenLevenslesInput = document.createElement("input")
                    toevoegenLevenslesInput.setAttribute("placeholder", "Wat heb je geleerd?")
                    toevoegenLevenslesInput.setAttribute("class", "toevoegen-levensles-input")
                const toevoegenLevenslesDiv = document.createElement("div")
                    toevoegenLevenslesDiv.setAttribute("id", "toevoegen-levensles-div")
                const toevoegenLevenslesButtonDiv = document.createElement("div")
                const toevoegenLevenslesButton = document.createElement("button")
                    toevoegenLevenslesButton.setAttribute("onclick", "toevoegenLevenslesButton(this)")
                    toevoegenLevenslesButton.setAttribute("data-titel", titelInsight)
                    toevoegenLevenslesButton.setAttribute("data-coach", coach)
                    toevoegenLevenslesButton.setAttribute("data-body", body)
                const CTAnoGoalDiv = document.createElement("div")
                    CTAnoGoalDiv.setAttribute("id", "CTA-no-goal-auth")
                const CTAnoGoalP = document.createElement("p")
                const CTAvisitorDiv = document.createElement("div")
                    CTAvisitorDiv.setAttribute("class", "CTA-visitor")
                const CTAvisitor = document.createElement("p")
                const opgeslagen = document.createElement("p")
                    opgeslagen.setAttribute("class", "social-note")
                const editIcon = document.createElement("img")
                    editIcon.setAttribute("src", "../images/edit-icon.png")
                    editIcon.setAttribute("class", "edit-icon-insights")
                    editIcon.setAttribute("onclick", "editIconInsightsTheme(this)")
                    editIcon.setAttribute("data-title", titelInsight)
                    editIcon.setAttribute("data-levensvraagtitle", levensvraagArtikel)
                    editIcon.setAttribute("data-themetitle", themeArtikel)
                    editIcon.setAttribute("data-coach", coach)

                    
                toevoegenLevensles.innerText = "Heb je iets geleerd over:"
               

                auth.onAuthStateChanged(User =>{
                    if (User){
                db.collection("Vitaminders").doc(User.uid).get().then(doc => {

                    const goals = doc.data().Goals
                    const auth = doc.data().Gebruikersnaam

                    if(goals == undefined){

                    toevoegenLevensles.innerHTML = `Heb je iets geleerd over jezelf?`
    
                    toevoegenLevenslesInput.style.display = "none"
                    toevoegenLevenslesButton.style.display = "none"
                    toevoegenLevenslesSelect.style.display = "none"

                    CTAnoGoalDiv.appendChild(CTAnoGoalP)

                    CTAnoGoalDiv.style.display = "block"
                    CTAnoGoalP.innerText = "Maak eerst een doel aan om je les aan te koppelen"

                    CTAnoGoalDiv.addEventListener("click", () => {
                        window.open("../Vitaminders/" + auth, "_self");
                    });

                    } else {

                    goals.forEach(goal => {

                        db.collectionGroup("Levensvragen").where("Goal", "==", goal).where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
                            querySnapshot.forEach(doc1 => {

                                const levensvraag = doc1.data().LevensvraagClean

                                const toevoegenLevenslesOptions = document.createElement("option")

                                toevoegenLevenslesOptions.innerHTML = levensvraag  

                                toevoegenLevenslesSelect.appendChild(toevoegenLevenslesOptions)
                                            
                                        }); 
                                    });
                                });
                            }
                        });
                    } else {

                                toevoegenLevensles.innerHTML = `Heb je iets geleerd over jezelf?`
        
                                toevoegenLevenslesInput.style.display = "none"
                                toevoegenLevenslesButton.style.display = "none"
                                toevoegenLevenslesSelect.style.display = "none"
        
                                CTAvisitor.innerHTML = " Maak een Digimind aan om je lessen in op te slaan"
                                CTAvisitorDiv.style.cursor = "pointer"
        
                                CTAvisitorDiv.addEventListener("click", () => {
                                    window.open("../Register.html", "_self");
                                })
        
                                CTAvisitorDiv.appendChild(CTAvisitor)
        
                                };
                });

                //     //LocalStorage goal to CTA

                //     const goal = localStorage.getItem("Goal")

                //     // Auth has no goal
                //     auth.onAuthStateChanged(User =>{
                //         db.collection("Vitaminders").doc(User.uid).get().then(doc => {

                //             const auth = doc.data().Gebruikersnaam

                //     toevoegenLevensles.innerHTML = `Heb je iets geleerd over ${goal}?`
                //     toevoegenLevenslesInput.style.display = "none"
                //     toevoegenLevenslesButtonDiv.style.display = "none"

                //     if(goal == null || goal == "Geen doel selecteren"){
                //         toevoegenLevensles.innerHTML = `Heb je iets geleerd over jezelf?`
                //     };

                //     CTAnoGoalDiv.appendChild(CTAnoGoalP)

                //     CTAnoGoalDiv.style.display = "block"
                //     CTAnoGoalP.innerText = "Maak eerst een doel aan om je les aan te koppelen"

                //     CTAnoGoalDiv.addEventListener("click", () => {
                //         window.open("../Vitaminders/" + auth, "_self");
                //     });

                //     localStorage.setItem("DigimindGoal", goal)

                //         })
                //     });

                //     // Auth has goal(s)
                //     auth.onAuthStateChanged(User =>{
                //         if (User){

                //             if(goal == null || goal == "Geen doel selecteren"){
                //                 console.log("test")
                //                 toevoegenLevensles.innerHTML = `Heb je iets geleerd over jezelf?`
                //             }

                //             db.collection("Vitaminders").doc(User.uid)
                //             .collection("Levensvragen").where("Goal", "==", goal).get()
                //             .then(querySnapshot => {
                //                 querySnapshot.forEach(doc => {
                //                     const levensvraag = doc.data().LevensvraagClean

                //                     toevoegenLevenslesInput.style.display = "block"
                //                     toevoegenLevenslesButtonDiv.style.display = "block"
                //                     toevoegenLevensles.innerHTML = `Heb je iets geleerd over "${levensvraag}" ?`
                //             })
                //         });
                //         // Visitor
                //     } else {
                //         // Geen goal in storage
                //         if(goal == null || goal == "Geen doel selecteren"){
                //             toevoegenLevensles.innerHTML = `Heb je iets geleerd over jezelf?`

                //             toevoegenLevenslesInput.style.display = "none"
                //             toevoegenLevenslesButton.style.display = "none"
    
                //             CTAvisitor.innerHTML = " Maak een Digimind aan om je lessen in op te slaan"
                //             CTAvisitorDiv.style.cursor = "pointer"
    
                //             CTAvisitorDiv.addEventListener("click", () => {
                //                 window.open("../Register.html", "_self");
                //             })
    
                //             CTAvisitorDiv.appendChild(CTAvisitor)
                //         } else {

                //         toevoegenLevensles.innerHTML = `Heb je iets geleerd over ${goal}?`

                //         toevoegenLevenslesInput.style.display = "none"
                //         toevoegenLevenslesButton.style.display = "none"

                //         CTAvisitor.innerHTML = " Maak een Digimind aan om je lessen in op te slaan"
                //         CTAvisitorDiv.style.cursor = "pointer"

                //         CTAvisitorDiv.addEventListener("click", () => {
                //             window.open("../Register.html", "_self");
                //         })

                //         CTAvisitorDiv.appendChild(CTAvisitor)

                //         };
                //     };
                // });

                // Insights title
                auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const naam = doc.data().GebruikersnaamClean

                            const sectionTitle = document.getElementById("insight-title")
                            if(sectionTitle != null){

                                    // Exemptions for this title
                            if(titel == "Zelfliefde"){
                                sectionTitle.innerHTML = `${naam},<br> geef een tip voor meer<br> ${titel}`
                            } else {
                            sectionTitle.innerHTML = `${naam},<br> geef je professionele inzicht over:<br> ${titel}`
                            };
                        };
                    })
                })

                metaPhoto.src = photo
                metaName.innerHTML = gebruikersnaamClean
                visitProfile.innerHTML = "Bekijk profiel"
                textTitle.innerHTML = titelInsight
                textBody.innerHTML = body
                readMore.innerHTML = "Lees meer"
                themaH3.innerHTML = "Verder lezen"
                inspirationalH3.innerHTML = "Inspirerend"
                inspirationalImg.src = "../images/menu-karakter.png"
                bedankt.innerHTML = `<u>${gebruikersnaamClean}</u> zegt: Bedankt!`
                toevoegenLevenslesButton.innerHTML = "Opslaan"
                opgeslagen.innerHTML = `Opgeslagen in je <u>Digimind</u>`

                bedankt.addEventListener("click", () => {
                    window.open("../Vitaminders/" + coach + ".html", "_self");
                });

                auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const auth = doc.data().Gebruikersnaam
            
                            opgeslagen.addEventListener("click", () => {
                                window.open("../Vitaminders/" + auth + ".html", "_self");
                        })       
                    });
                });
                
                // Display read more of this theme button if read more is set
                if(thema == undefined){
                    themaDiv.style.display = "none"
                }else{
                themaP.innerHTML = thema

                themaP.addEventListener("click", () => {
                    window.open("../Theme-articles/" + thema + ".html", "_self")
                })
                };

                metaDiv.addEventListener("click", () => {
                    window.open("../Vitaminders/" + coach + ".html", "_self");
                });

                readMore.addEventListener("click", () => {
                    textDiv.style.maxHeight = "max-content"
                    readMore.style.display = "none"
                });

                 // Loader
                 const loader = document.getElementById("loader")
                 loader.style.display = "none"
            
                parra.appendChild(outerDiv)
                outerDiv.appendChild(metaDiv)
                metaDiv.appendChild(metaPhoto)
                metaDiv.appendChild(metaName)
                metaDiv.appendChild(visitProfile)
                outerDiv.appendChild(textDiv)
                textDiv.appendChild(editIcon)
                textDiv.appendChild(textTitle)
                textDiv.appendChild(textBody)
                

                 // Append "read more" if max height is > 300px
                    if(textDiv.offsetHeight >= 300){
                        parra.appendChild(readMoreDiv)
                        readMoreDiv.appendChild(readMore)
                        textDiv.style.maxHeight = "290px"
                        textDiv.style.overflow = "hidden"
                        outerDiv.style.paddingBottom = "50px"
                    };

                parra.appendChild(socialDiv)
                socialDiv.appendChild(themaDiv)
                themaDiv.appendChild(themaH3)
                themaDiv.appendChild(themaP)
                socialDiv.appendChild(inspirationalDiv)
                inspirationalDiv.appendChild(inspirationalH3)
                inspirationalDiv.appendChild(inspirationalImg)
                inspirationalDiv.appendChild(bedankt)
                socialDiv.appendChild(toevoegenLevenslesOuterDiv)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesSelectDiv)
                toevoegenLevenslesSelectDiv.appendChild(toevoegenLevensles)
                toevoegenLevenslesSelectDiv.appendChild(toevoegenLevenslesSelect)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesDiv)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesInput)
                toevoegenLevenslesOuterDiv.appendChild(toevoegenLevenslesButtonDiv)
                toevoegenLevenslesButtonDiv.appendChild(toevoegenLevenslesButton)
                toevoegenLevenslesOuterDiv.appendChild(CTAvisitorDiv)
                toevoegenLevenslesOuterDiv.appendChild(CTAnoGoalDiv)
                toevoegenLevenslesOuterDiv.appendChild(opgeslagen)
            

            // Menu scroll to paragraph

            const menuItem = document.getElementsByClassName("menu-paragraph-item-theme")
            const paragraphTitle = document.getElementsByClassName("article-paragraphs")

            const menuItemArray = Array.from(menuItem)

            menuItemArray.forEach(menu => {

                const paragraphTitleArray = Array.from(paragraphTitle)

                paragraphTitleArray.forEach(para => {

                    if(menu.innerText == para.firstElementChild.innerText){
                        menu.addEventListener("click", () => {
                            para.scrollIntoView()
                        });
                    };
                })
            });

                // User role
                    // Visitor
                auth.onAuthStateChanged(User =>{
                    if (!User){
                        const editIcon = document.getElementsByClassName("edit-icon-insights")
                
                        const editIconArray = Array.from(editIcon)
                
                        editIconArray.forEach(icon => {
                            icon.style.display = "none"
                        })
                    };
                });
            
                   //Non auth

                   const coachData = outerDiv.dataset.coach
                   
                   auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const auth = doc.data().Gebruikersnaam
                    
                if(coachData != auth){

                    if(editIcon != undefined){
                    editIcon.style.display = "none"
                    };
                        };
                            })
                                });

                        // Admin

                        auth.onAuthStateChanged(User =>{
                            db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                                    const admin = doc.data().Admin
                            
                        if(admin == "Yes"){
        
                            editIcon.style.display = "flex"
        
                                };
                            })
                        });
                    });
                }); 
            });
        });
    });
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
                const titelInput = document.getElementById("nieuwposttitel")

                if (nieuwePostTitelVar == ""){
                    titelInput.style.borderColor = "red"
                    titelInput.scrollIntoView()
                }

                const paragraphSelect = document.getElementById("select-paragraph-coach-insight-theme")

                const option = paragraphSelect.options
                const selected = option[option.selectedIndex].innerHTML

                let nieuwePostBodyVar = tinyMCE.get('tiny-mce').getContent()

                                insightsRef.set({
                                    Titel: nieuwePostTitelVar,
                                    Body: nieuwePostBodyVar,
                                    Auteur: coachNaam,
                                    Inspiratiepunten: 1,
                                    ThemeArtikel: titel,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "Insight-theme-article",
                                    Paragraph: selected,
                                    Content: "Text"
                                });

                                           //Storing insight in theme-article
                db.collection("Themas").where("Thema", "==", titel).get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {


                        db.collection("Themas").doc(doc1.id).update({
                            Insights: firebase.firestore.FieldValue.arrayUnion(nieuwePostTitelVar)

                                });
                            })
                        }).then(() => {
                            location.reload()
                        });
                    })     
                }
        })
};

// De meest dankbare plek van het internet

    // Insights count on overview page
    const titelSubGrateful = document.getElementById("titleSub-Grateful")

    db.collection("Practice").where("Practice", "==", "Grateful").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const count = doc.data().Grateful

            const countArray = []

            countArray.push(count)

            const lengthSub = countArray.length

            if(titelSubGrateful != null){

            if(lengthSub == 1){
                titelSubGrateful.innerHTML = `${lengthSub} mens heeft bijgedragen aan`
            } else {
                titelSubGrateful.innerHTML = `${lengthSub} mensen hebben bijgedragen aan`
            };
        };
    })
});


const titelH2Grateful = document.getElementById("insight-title-dankbaar")

if(titelH2Grateful != null){

    auth.onAuthStateChanged(User =>{
        if (User){
            db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const naamClean = doc.data().GebruikersnaamClean;

    titelH2Grateful.innerHTML = `Waar ben jij vandaag dankbaar voor, ${naamClean}`

            })
        } else {
            const visitorCTA = document.getElementById("visitorCTA")
            const inputGrateful = document.getElementById("input-grateful")

            inputGrateful.style.display = "none"
            visitorCTA.style.display = "block"
        }
    });
};

    // Saving new submits to database

    function nieuwepostsubmitDankbaar(elem){

        const grateful = elem.previousElementSibling.value

        auth.onAuthStateChanged(User =>{
            if(User){
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {

                            const naam = doc.data().Gebruikersnaam

                            console.log(naam)

                            db.collection("Practice").doc().set({
                                Gebruikersnaam: naam,
                                Grateful: grateful,
                                Practice: "Grateful",
                                Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                        }).then(() => {
                                location.reload()
                        });
                    })
                }
        });
    };

    // Loading gratefuls in DOM

    const gratefulsDiv = document.getElementById("grateful-div")

    if(gratefulsDiv != null){

    db.collection("Practice").where("Practice", "==", "Grateful").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const grateful = doc.data().Grateful
            const naam = doc.data().Gebruikersnaam

            const innerDiv = document.createElement("div")
                innerDiv.setAttribute("class", "inner-div-grateful")
            const gratefulsP = document.createElement("p")

            gratefulsP.innerHTML = grateful

            db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const profielfoto = doc1.data().Profielfoto
                    const naamClean = doc1.data().GebruikersnaamClean

                    const img = document.createElement("img")
                        img.setAttribute("class", "meta-photo-grateful")

                    img.src = profielfoto

                    img.addEventListener("click", () => {
                        window.open(`/Vitaminders/${gebruikersnaam}.html`, "_self");
                    })

            gratefulsDiv.appendChild(innerDiv)
            innerDiv.appendChild(img)
            innerDiv.appendChild(gratefulsP)

                })
            });
        })
    });
};
    