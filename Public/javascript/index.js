var openen = document.getElementById("open-up");
var insp = document.getElementById("inspiratie");
// var act = document.getElementById("activiteiten");
var coach = document.getElementById("coaching");

if(openen != null || insp != null || coach != null){

        window.onload = function(){
                openen.style.display = "block";
                insp.style.display = "none";
                // act.style.display = "none";
                coach.style.display = "none";   
        };

        function openup(){
                openen.style.display = "block";
                insp.style.display = "none";
                // act.style.display = "none";
                coach.style.display = "none";
        };

        function inspiratie(){
                insp.style.display = "block";
                openen.style.display = "none";
                // act.style.display = "none";
                coach.style.display = "none";
        };

        // function activiteiten(){
        //         act.style.display = "block";
        //         openen.style.display = "none";
        //         insp.style.display = "none";
        //         coach.style.display = "none";
        // }

        function coaching(){
                coach.style.display = "block";
                openen.style.display = "none";
                insp.style.display = "none";
                // act.style.display = "none";
        };
};

// Filter

function setDomainToStorage(){

        const selectDomain = document.getElementById("domain-select")

        const option = selectDomain.options
        const selected = option[option.selectedIndex].innerHTML

        localStorage.setItem("Domain", selected)
};

function directToPage(){

        const selectDomain = document.getElementById("type-select")

        const option = selectDomain.options
        const selected = option[option.selectedIndex].innerHTML

        if(selected === "Artikelen"){
                window.open("/inspiratie.html", '_self');
        } else if (selected === "Workshops"){
                window.open("/workshops.html", '_self');
        } else if (selected === "Coachgroepen"){
                window.open("/groups.html", '_self');
        } else if (selected === "Coaches"){
                window.open("/coaches.html, '_self'");
        } else if (selected === "Events"){
                window.open("/events.html", '_self');
        };
};


// Main header CTA

      
        const startButton = document.getElementById("button-start")
        const select = document.getElementById("main-header-select")

        // Examples

        if(select != null || startButton != null){

                db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                
                        const title = doc.data().Levensvraag
                        const insights = doc.data().Insights

                        const option = document.createElement("option")

                        option.innerHTML = title

                        if (insights.length > 0){
                                select.appendChild(option)
                                };
                        })
                });
        };

function start(elem){
        const goalSelect = elem.previousElementSibling
        const select = goalSelect.options
        const option = select[select.selectedIndex].innerHTML

        window.open(`../Artikelen/${option}.html`, "_self")
}

// IOS PWA instructions

const isIOS = !!navigator.platform.match(/iPhone|iPod|iPad/)
const IOSpopup = document.getElementById("ios-popup")
const popupTitle = document.getElementById("ios-popup-title")
const popupInstructions = document.getElementById("ios-popup-instruction")

if(popupTitle != null){

// Title personalized

auth.onAuthStateChanged(User =>{
        if(User){
                const userRef = db.collection("Vitaminders").doc(User.uid);
                userRef.get().then(function(doc) {

                const authClean = doc.data().GebruikersnaamClean

                popupTitle.innerText = `Hoi ${authClean}, Wist je dat er ook een Vitaminds app is?`

                        });
                };
        });
};



// PWA for IOS

const downloadButton = document.getElementById("download-pwa")
const dontDownloadButton = document.getElementById("dont-download-pwa")
const PWAdownloaded = document.getElementById("downloaded-pwa")
const iosPopupNotice = document.getElementById("ios-popup-notice")

const instructionDivPopup = document.getElementById("ios-popup-instruction")

if(downloadButton != undefined){
downloadButton.addEventListener("click", (e) => {
        instructionDivPopup.style.display = "flex"
        iosPopupNotice.style.display = "none"
        });
};

if(dontDownloadButton != undefined){
dontDownloadButton.addEventListener("click", (e) => {
        auth.onAuthStateChanged(User =>{
                if(User){
                  const userRef = db.collection("Vitaminders").doc(User.uid).update({
                          PWA: "Declined"
                  }).then(() => {
                        IOSpopup.style.display = "none"
                  });
                };
        });
});
};

if(PWAdownloaded != undefined){
PWAdownloaded.addEventListener("click", (e) => {
        auth.onAuthStateChanged(User =>{
                if(User){
                  const userRef = db.collection("Vitaminders").doc(User.uid).update({
                          PWA: "Accepted"
                  }).then(() => {
                        IOSpopup.style.display = "none"
                  });
                };
        });
});
};

// Display IOS or not
if(isIOS === true){
        if (window.innerWidth < 938){
auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {

                const PWA = doc.data().PWA

                console.log(PWA)

                if(PWA == undefined){
                        IOSpopup.style.display = "flex"
                } else if (PWA == "Declined"){
                        IOSpopup.style.display = "none"
                } else if (PWA == "Accepted"){
                        IOSpopup.style.display = "none"
                }

                                });
                         };
                });
        };
};

// Mobile toolbar

const toolbarMobile = document.getElementsByClassName("toolbar-mobile")

const toolbarHome = document.getElementById("toolbar-home")
const toolbarChatsGroups = document.getElementById("toolbar-chats-groups")
const toolbarInspiration = document.getElementById("toolbar-inspiration")
const toolbarDigimind = document.getElementById("toolbar-digimind")

const toolbarInspirationOption = document.getElementById("toolbar-inspration-options")
const toolbarInspirationPublic = document.getElementById("toolbar-inspiration-public")
const toolbarInspirationPrivate = document.getElementById("toolbar-inspiration-private")


        // Hide on screen bigger then 938

        if (window.innerWidth < 938){
                const toolbarMobileArray = Array.from(toolbarMobile)

                toolbarMobileArray.forEach(TB => {
                        TB.style.display = "flex"
                });
        };

        // Links

        console.log(toolbarHome)

        toolbarHome.addEventListener("click", (e) => {
                console.log("test")
                window.open("../openup.html", "_self")
        });

        toolbarChatsGroups.addEventListener("click", (e) => {
                window.open("../chats-groups.html", "_self");
        });

        toolbarInspiration.addEventListener("click", (e) => {
                toolbarInspirationOption.style.display = "flex"
                toolbarInspiration.style.display = "none"
        });

        if(toolbarInspirationPublic != undefined){
                toolbarInspirationPublic.addEventListener("click", (e) =>{
                        window.open("../openup.html", "_self")
                });
        };

        if(toolbarInspirationPrivate != undefined){
                toolbarInspirationPrivate.addEventListener("click", (e) => {
                        linkDigimind()
                });
        };

        toolbarDigimind.addEventListener("click", (e) => {
                linkDigimind()
        });

        function linkDigimind(){
                auth.onAuthStateChanged(User =>{
                        if(User){
                          const userRef = db.collection("Vitaminders").doc(User.uid);
                          userRef.get().then(function(doc) {
        
                             const naamID = doc.data().Gebruikersnaam;

                window.open("../Vitaminders/" + [naamID] + ".html", "_self");
                          });
                        };
                });
        }


// Work on your goals

!function workOnYourGoals(){

const goalSelect = document.getElementById("goal-select")
const noAuthDiv = document.getElementById("no-auth-div")
const authDiv = document.getElementById("auth-div")

auth.onAuthStateChanged(User =>{
        if (User){
            let docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){

                        const gebruikersnaam = doc.data().Gebruikersnaam

                        // noAuthDiv.style.display = "none"
                        // authDiv.style.display = "flex"

        db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", gebruikersnaam).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const goal = doc.data().LevensvraagClean

                        const option = document.createElement("option")

                        option.innerHTML = goal

                        goalSelect.appendChild(option)

                                })
                        });
                });
        };
});
}();

function getGoal(elem){

        const selectDomain = document.getElementById("goal-select")

        const option = selectDomain.options
        const selected = option[option.selectedIndex].innerHTML

        articleOverview = document.getElementById("article-overview")
        workshopOverview = document.getElementById("article-overview")
        coachgroupOverview = document.getElementById("article-overview")
        eventOverview = document.getElementById("article-overview")

        articleOverview.innerHTML = ""
        workshopOverview.innerHTML = ""
        coachgroupOverview.innerHTML = ""
        eventOverview.innerHTML = ""

        db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", selected).get().then(querySnapshot => {
                querySnapshot.forEach(doc2 => {

                        const goal = doc2.data().Goal

                        console.log(goal)

        db.collection("Levensvragen").where("Levensvraag", "==", goal)
.get().then(querySnapshot => {
    querySnapshot.forEach(doc1 => {

        const domain = doc1.data().Domein

        console.log(domain)

        db.collection("Levensvragen").where("Domein", "==", domain)
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Levensvraag
        const headerImage = doc.data().HeaderImage
        const headerImageSmall = doc.data().HeaderImageSmall
        const insights = doc.data().Insights
        const goal = doc.data().Levensvraag
     
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

            // Hidding articles with no insights for non-coach
            if (insights.length == 0){
             
                outerSection.style.display = "none"
                };

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
        headerImg.src = headerImageSmall
        buttonDiv.innerHTML = `<a href="../Artikelen/${title}.html">Bekijk</a>`

        if(articleOverview == null){
            console.log("null")
        } else {

        articleOverview.appendChild(outerSection)
        outerSection.appendChild(headerDiv)
        headerDiv.appendChild(headerImg)
        outerSection.appendChild(titleDiv)
        titleDiv.appendChild(titleSub)
        titleDiv.appendChild(titleH2)
        outerSection.appendChild(buttonDiv)
        };
    });
});

db.collection("Workshops").where("Status", "==", "Public")
.where("Goal", "==", goal)
.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
    
            const title = doc.data().WorkshopTitle
            const coach = doc.data().Coach
            const headerImg = doc.data().BannerImage
            const workshopPrice = doc.data().Price

            console.log(title)
    
            db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {
    
                    const nameClean = doc1.data().GebruikersnaamClean
                    const profilePic = doc1.data().Profielfoto
    
                    const DOM = document.getElementById("workshops-overview")
    
                    const innerDiv = document.createElement("div")
                        innerDiv.setAttribute("class", "workshop-section")
                    const header = document.createElement("div")
                        header.setAttribute("class", "workshop-header")
                    const img = document.createElement("img")
                        img.setAttribute("class", "header-workshop")
                    const coachPicDiv = document.createElement("div")
                        coachPicDiv.setAttribute("class", "coach-pic-div-workshop")
                    const coachPic = document.createElement("img")
                    const titleH3 = document.createElement("h3")
                    const priceP = document.createElement("p")
                        priceP.setAttribute("id", "workshop-price")
                    const buttonDiv = document.createElement("div")
                    const button = document.createElement("button")
                        button.setAttribute("class", "button-algemeen")
                        button.setAttribute("onclick", "openWorkshop(this)")
    
                    img.src = headerImg
                    coachPic.src = profilePic
                    titleH3.innerText = title
                    priceP.innerText = `Prijs: ${workshopPrice} euro`
                    button.innerText = "Meer informatie"
    
                    if(DOM != null){
    
                    DOM.appendChild(innerDiv)
                    innerDiv.appendChild(header)
                    header.appendChild(img)
                    innerDiv.appendChild(coachPicDiv)
                    coachPicDiv.appendChild(coachPic)
                    innerDiv.appendChild(titleH3)
                    innerDiv.appendChild(priceP)
                    innerDiv.appendChild(buttonDiv)
                    buttonDiv.appendChild(button)
    
                    };
                })
            });
        })
    });

});
});
                });
        });
};


