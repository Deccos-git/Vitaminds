// Coachvragen overview

//Filter 

function loadAllArticles(){

    DOMarticle = document.getElementById("kenniscentrum-artikel-outer-div")
    
    db.collection("Kenniscentrum").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
    
            const title = doc.data().Coachvraag
            const headerImage = doc.data().HeaderImage
        
            const outerSection = document.createElement("section")
                outerSection.setAttribute("class", "kenniscentrum-artikel-section")
                outerSection.setAttribute("data-title", title)
            const headerDiv = document.createElement("div")
                headerDiv.setAttribute("class", "kenniscentrum-artikel-header")
            const headerImg = document.createElement("img")
                headerImg.setAttribute("class", "header-image-article")
            const titleDiv = document.createElement("div")
            const titleH2 = document.createElement("h2")
                titleH2.setAttribute("class", "titelTekst")
            const buttonDiv = document.createElement("button")
                buttonDiv.setAttribute("class", "button-algemeen-card")
                buttonDiv.setAttribute("onclick", "seeArticle(this)")
    
            headerImg.src = headerImage
            titleH2.innerHTML = title
            buttonDiv.innerHTML = `<a href="../Kenniscentrum-coaching/${title}.html">Bekijk</a>`
    
    
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
    });
    
    };
    
    loadAllArticles()
    
    function getDomain(){
    
        const selectDomain = document.getElementById("kenniscentrum-filter-select")
        
            const option = selectDomain.options
            const selected = option[option.selectedIndex].innerHTML
        
        DOMarticle = document.getElementById("kenniscentrum-artikel-outer-div")
        
        DOMarticle.innerHTML = ""
        
        if(selected === "Alles"){
            loadAllArticles();
        };
    
        db.collection("Kenniscentrum").where("Domein", "==", selected).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
        
                const title = doc.data().Coachvraag
                const headerImage = doc.data().HeaderImage
            
                const outerSection = document.createElement("section")
                    outerSection.setAttribute("class", "kenniscentrum-artikel-section")
                    outerSection.setAttribute("data-title", title)
                const headerDiv = document.createElement("div")
                    headerDiv.setAttribute("class", "kenniscentrum-artikel-header")
                const headerImg = document.createElement("img")
                    headerImg.setAttribute("class", "header-image-article")
                const titleDiv = document.createElement("div")
                const titleH2 = document.createElement("h2")
                    titleH2.setAttribute("class", "titelTekst")
                const buttonDiv = document.createElement("button")
                    buttonDiv.setAttribute("class", "button-algemeen-card")
                    buttonDiv.setAttribute("onclick", "seeArticle(this)")
        
                headerImg.src = headerImage
                titleH2.innerHTML = title
                buttonDiv.innerHTML = `<a href="../Kenniscentrum-coaching/${title}.html">Bekijk</a>`
        
        
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
        });
    
    };
        
    
    // Register view count on article load
    
    !function registerViewCount(){ 
        window.addEventListener("load", () => {
    
            db.collection("Kenniscentrum").where("Coachvraag", "==", titel).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
    
                    console.log(doc.id)
    
                    db.collection("Kenniscentrum").doc(doc.id).update({
                        Views: firebase.firestore.FieldValue.increment(1)
                    }); 
                });
            });
        });
    }();
    
    // Fetching title from url
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
    titel11 = titel10.replace('%20',' ')
    titel12 = titel11.replace('%20',' ')
    titel13 = titel12.replace('%20',' ')
    titel14 = titel13.replace('%20',' ')
    titel15 = titel14.replace('%20',' ')
    titel = titel14.replace('%20',' ')
    
    console.log(titel)
    
    
    // Levensvraag artikelen detailpagina
    
        // Title, header-image and summary
        const title = document.getElementById("title-article")
        const summary = document.getElementById("summary-article")
        const hiddenTitleArticle = document.getElementById("hidden-title-div")
        const insightsTitle = document.getElementById("insight-title")
        const titelHead = document.getElementsByTagName("title")
        const metaKeywords = document.getElementById("meta-keywords")
        const metaDescription = document.getElementById("meta-description")
        const facebookUrl = document.getElementById("facebook-url")
        const facebookTitle = document.getElementById("facebook-title")
        const facebookDescription = document.getElementById("facebook-description")
        const facebookImg = document.getElementById("facebook-img")
        const headerDiv = document.getElementById("levensvraag-artikel-main-image")
        const headerImg = document.createElement("img")
        
    !function queryArticle(){  
        db.collection("Kenniscentrum").where("Coachvraag", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
        
                const titleArticle = doc.data().Coachvraag
                const summaryArticle = doc.data().Summary
                const keywords = doc.data().Keywords
                const headerImage = doc.data().HeaderImage
        
                title.innerHTML = titleArticle
                summary.innerHTML = summaryArticle
        
                headerImg.src = headerImage
        
                headerDiv.appendChild(headerImg)
        
                auth.onAuthStateChanged(User =>{
                    if(User){
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const naam = doc.data().GebruikersnaamClean
        
                            insightsTitle.innerHTML = `${naam},<br> geef je professionele inzicht over:<br> ${titleArticle}`
        
                    })
                }
            });
        }();
        
        
        
                //Non admin
                auth.onAuthStateChanged(User =>{
                    if(User){
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const admin = doc.data().Admin
        
                        if(admin != "Yes"){
                            editIcon.style.display = "none"
                        }
                    
                })
            }
            });
        
                // Visitor
                auth.onAuthStateChanged(User =>{
                    if (!User){
        
                        editIcon.style.display = "none"
                    }
                });
        
                // Pagetitle and meta's
        
                const titelHeadArray = Array.from(titelHead)
        
                titelHeadArray.forEach(tit => {
                    tit.innerHTML = titleArticle
                })
        
                metaKeywords.content = keywords
                metaDescription.content = summaryArticle
                facebookDescription.content = summaryArticle
                facebookImg.content = headerImage
                facebookTitle. content = titel
                facebookUrl. content = window.location.href
        
            })
        }).then(() => {   
        
            // Loading articles
        
        const DOM = document.getElementById("coach-insights")
        
        db.collection("Insights").where("KenniscentrumArtikel", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                const titelInsight = doc.data().Titel
                const body = doc.data().Body
                const coach = doc.data().Auteur
        
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
                        const socialDiv = document.createElement("div")
                            socialDiv.setAttribute("class", "sociale-div-insights")
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
                        const editIcon = document.createElement("img")
                            editIcon.setAttribute("src", "../images/edit-icon.png")
                            editIcon.setAttribute("class", "edit-icon-insights")
                            editIcon.setAttribute("onclick", "editIconKennis(this)")
                            editIcon.setAttribute("data-title", titelInsight)
        
                        // Loader
                        const loader = document.getElementById("loader")
                            loader.style.display = "none"
    
                            textTitle.innerHTML = titelInsight
                            textBody.innerHTML = body
                            metaPhoto.src = photo
                            metaName.innerHTML = `<a href="../Vitaminders/${coach}.html">${gebruikersnaamClean}</a>`
        
        
                             // Max height of insight
        
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
                        socialDiv.appendChild(inspirationalDiv)
                        inspirationalDiv.appendChild(inspirationalH3)
                        inspirationalDiv.appendChild(inspirationalImg)
                        inspirationalDiv.appendChild(bedankt)
    
                          // Insights title
                          auth.onAuthStateChanged(User =>{
                            if(User){
                            db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                                    const auth = doc.data().GebruikersnaamClean
                                    const gebruikersnaam = doc.data().Gebruikersnaam
        
                                    const sectionTitle = document.getElementById("insight-title")
                                    sectionTitle.innerHTML = `${auth}, <br> geef je professionele inzicht over: <br> ${titel}`
                       
                        inspirationalH3.innerHTML = "Inspirerend"
                        inspirationalImg.src = "../images/menu-karakter.png"
                        bedankt.innerHTML = `<u>${gebruikersnaamClean}</u> zegt: Bedankt!`
                    });
                };
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
                            }
                        })
                           //Non auth
        
                           const coachData = outerDiv.dataset.coach
                           
                           auth.onAuthStateChanged(User =>{
                               if(User){
                            db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                                    const auth = doc.data().Gebruikersnaam
                            
                                if(coachData != auth){
                
                                    editIcon.style.display = "none"
                
                                };
                            });
                        };
                        });
    
    
                    });
                });
            });
        });
    });
    
    // Saving coach insights to database
    
    !function hideInputForNoneAdmin(){
        const coachInput = document.getElementById("coach-input")
    
        auth.onAuthStateChanged(User =>{
            if(User){
            db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                    const auth = doc.data().Gebruikersnaam
            
                if(auth != "fbKlPnWobJh0ldPROWQRYGCezhv2Gijs van Beusekom"){
    
                    coachInput.style.display = "none"
    
                };
            });
        } else {
            coachInput.style.display = "none"
        }
        });
    }();
    
    function nieuwepostsubmit(){
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
                                    KenniscentrumArtikel: titel,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "Insight-kenniscentrum",
                                }).then(() => {
                                    location.reload()
                                })
      
                        //Storing insight in levensvraag
                db.collection("Kenniscentrum").where("Coachvraag", "==", titel).get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {
    
                        db.collection("Kenniscentrum").doc(doc1.id).update({
                            Insights: firebase.firestore.FieldValue.arrayUnion(nieuwePostTitelVar)
    
                                })
                            })
                        })
                    })     
                }
        })
    };
    
    // Paragraph-summary
    
    const paragraphSummary = document.getElementById("paragraph-list")
    
    db.collection("Insights").where("KenniscentrumArtikel", "==", titel).get().then(querySnapshot => {
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
            
    
            titelDiv.addEventListener("click", () => {
                 const insight = document.getElementsByClassName("text-div-insights")
    
            const insightArray = Array.from(insight)
    
                insightArray.forEach(ins =>{
    
                    insInner = ins.firstElementChild.nextElementSibling.innerHTML
    
                    if( insInner == titelDiv.innerHTML){
                        ins.scrollIntoView()
                    }
    
                })
            })
                })
            })
        })
    });
    
    // Edit coach insight
    
    function editIconKennis(elem){
    
        const titelInsight = elem.dataset.title
         const newInsightTitle = elem.nextElementSibling
        const newBody = elem.nextElementSibling.nextElementSibling
    
        // const tiny = document.getElementById("tiny-mce")
    
        // console.log(tiny)
    
        // tinyMCE.get('tiny-mce').setContent(newBody)
        // tiny.scrollIntoView()
    
        newInsightTitle.setAttribute("contenteditable", "true")
            newInsightTitle.style.border = "1px dotted #122b46"
    
        newBody.setAttribute("contenteditable", "true")
            newBody.style.border = "1px dotted #122b46"
    
        const saveInsightDiv = document.createElement("div")
            saveInsightDiv.setAttribute("class", "save-div")
        const saveInsightP = document.createElement("p")
    
            saveInsightDiv.appendChild(saveInsightP)
    
            elem.parentElement.appendChild(saveInsightDiv)
    
            saveInsightP.innerHTML = "Opslaan"
    
            saveInsightP.addEventListener("click", () => {   
    
        auth.onAuthStateChanged(User =>{
            if (User){
    
            db.collection("Vitaminders").doc(User.uid)
                    .get().then(function(doc){
                        const coachNaam = doc.data().Gebruikersnaam;
    
                    db.collection("Insights")
                    .where("Titel", "==", titelInsight)
                    .where("Auteur", "==", coachNaam)
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {
    
                                db.collection("Insights").doc(doc1.id).update({
                                    Titel: newInsightTitle.innerHTML,
                                    Body: newBody.innerHTML
                                })
                                .then(() => {
                                    saveInsightP.innerHTML = "Opgeslagen"
                                })
                            });
                        });
                    });
                };
            });
        });        
    };
