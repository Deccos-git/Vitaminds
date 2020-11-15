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

// Dynamic call to action

// const dynamicH2 = document.getElementById("dynamic-call-to-action")
// const dynamicH2Dots = document.getElementById("dynamic-title-dots")

// if(dynamicH2 != null && dynamicH2Dots != null){

// function goalExample(a,b){

//         setTimeout(() => {
//                 dynamicH2.innerHTML = a
//                 dynamicH2Dots.innerHTML = ""
//                 },b)
// };

// goalExample("Posiviteit", 0)
// goalExample("Geluk", 3000)
// goalExample("Je eigen leven leven", 6000)
// goalExample("Los laten", 9000)
// goalExample("Je eigen keuzes maken", 12000)
// goalExample("Weten wat je wilt", 15000)
// goalExample("Rust in je hoofd", 18000)
// goalExample("Waar wil jij je op focussen?", 21000)
// setTimeout(() => {
//         const CTAsubHeader = document.getElementById("call-to-action-sub-header")
//         CTAsubHeader.style.display = "none"
// },21000)
// };


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

                        console.log(TB)
                        TB.style.display = "flex"
                });
        };

        // Links

        toolbarHome.addEventListener("click", (e) => {
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

// Show followed coaches wall for auth

//Favorieten Coaches
function favCoach(authNaam){
        const favCoachDOM = document.getElementById("coach-overview")
        
        db.collection("Vitaminders").where("Gebruikersnaam", "==", authNaam).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
        
                        const followers = doc.data().FavCoaches
        
                        if (followers == undefined || followers.length == 0){
                                instructionDiv.style.display = "flex"
                        } else {
        
                        followers.forEach(coach => {
                                db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
                                        querySnapshot.forEach(doc1 => {
        
                                                const profilePicture = doc1.data().Profielfoto
                                                const coachName = doc1.data().GebruikersnaamClean
        
                                                const fotoDiv = document.createElement("div")
                                                        fotoDiv.setAttribute("class", "favCoachDiv")
                                                const fotoImg = document.createElement("img")
                                                const name = document.createElement("p")
        
                                                

                                                if(profilePicture == undefined){
                                                        fotoImg.style.backgroundImage ="url('/images/dummy-profile-photo.jpeg')"
                                                    } else {
                                                        fotoImg.src = profilePicture
                                                    };

                                                name.innerHTML = coachName
        
                                                fotoDiv.addEventListener("click", () => {
                                                        window.open("../Vitaminders/" + coach + ".html", "_self")
                                                })
        
                                                favCoachDOM.appendChild(fotoDiv)
                                                fotoDiv.appendChild(fotoImg)
                                                fotoDiv.appendChild(name)
        
                                                })
                                        })
                                })
                        };
                })
        });
   }; 

        function dashboardFunction(authNaam){

                const dashboardDOM = document.getElementById("coach-updates")
        
                db.collection("Vitaminders").where("Gebruikersnaam", "==", authNaam).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                
                                const followers = doc.data().FavCoaches
        
                                const instructionDiv = document.createElement("div")
                                        instructionDiv.setAttribute("id", "instruction-div")
                                const instructionImg = document.createElement("img")
                                const instructionH4 = document.createElement("h4")
                                const instructionP = document.createElement("p")
        
                                // No following yet
                                auth.onAuthStateChanged(User =>{
                                          const userRef = db.collection("Vitaminders").doc(User.uid);
                                          userRef.get().then(function(doc) {
                                             const auth = doc.data().Gebruikersnaam;

                                if(auth == authNaam){
        
                                if (followers == undefined || followers.length == 0){
                                        console.log("auth")
                                        instructionDiv.style.display = "flex"
                                
        
                                                instructionH4.innerHTML = "Je volgt nog geen coaches"
                                                instructionP.innerHTML = `De nieuwste updates van jouw favoriete coaches komen hier te staan <br><br>
                                                                        Vind bijvoorbeeld <a href="/inspiratie.html"> hier</a> coaches om te volgen`
                                                instructionImg.src = "/images/coach-row-dummy.jpeg"
                                                };
                                        };
                                        })
                                });
        
                                dashboardDOM.appendChild(instructionDiv)
                                instructionDiv.appendChild(instructionH4)
                                instructionDiv.appendChild(instructionImg)
                                instructionDiv.appendChild(instructionP)
        
                                if(followers != undefined){
                
                                followers.forEach(coach => {
                                        db.collection("Insights").orderBy("Timestamp", "desc").where("Auteur", "==", coach).get().then(querySnapshot => {
                                                querySnapshot.forEach(doc1 => {
        
                                                        const titelInsight = doc1.data().Titel
                                                        const coach = doc1.data().Auteur
                                                        const levensvraagArtikel = doc1.data().LevensvraagArtikel
                                                        const themeArtikel = doc1.data().ThemeArtikel
                                                        const type = doc1.data().Type
                                                        const date = doc1.data().Timestamp
        
                                                        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
                                                                querySnapshot.forEach(doc2 => {
                                                                    const gebruikersnaamClean = doc2.data().GebruikersnaamClean
                                                                    const photo = doc2.data().Profielfoto

                                                                    metaPhoto.src = photo
                                                                    metaName.innerHTML = gebruikersnaamClean
                                                                })
                                                        })
                                                        
                                                        const outerDiv = document.createElement("div")
                                                        outerDiv.setAttribute("class", "insights-outer-div")
                                                        outerDiv.setAttribute("data-coach", coach)
                                                        const metaDiv = document.createElement("div")
                                                        metaDiv.setAttribute("class", "meta-div-insights")
                                                        const metaPhoto = document.createElement("img")
                                                        metaPhoto.setAttribute("class", "meta-photo")
                                                        const metaName = document.createElement("p")
                                                        const textDiv = document.createElement("div")
                                                        textDiv.setAttribute("class", "text-div-insights")
                                                        const textTitle = document.createElement("h2") 
                                                        const timeStamp = document.createElement("p")
                                                        timeStamp.setAttribute("class", "coach-wall-timestamp")
        
                                                       
                                                        textTitle.innerHTML = titelInsight
                                                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                                                        timeStamp.innerHTML = date.toDate().toLocaleDateString("nl-NL", options);
                                                       
                                                        // Hide kenniscentrum insights
        
                                                        if(type == "Insight-kenniscentrum"){
                                                                outerDiv.style.display = "none"
                                                        }
        
                                                        function windowOpen(a,b){
                                                        if(a != undefined){
        
                                                        textDiv.addEventListener("click", () => {
                                                                window.open( b + a + ".html", "_self");
                                                                })
                                                                }
                                                        }; 
                                                        
                                                        windowOpen(levensvraagArtikel, "../Artikelen/")
                                                        windowOpen(themeArtikel, "../Theme-articles/")
        
                                                        metaDiv.addEventListener("click", () => {
                                                                window.open("../Vitaminders/" + coach + ".html", "_self");
                                                        });
        
                                                        
        
                                                        dashboardDOM.appendChild(outerDiv)
                                                        outerDiv.appendChild(metaDiv)
                                                        metaDiv.appendChild(metaPhoto)
                                                        metaDiv.appendChild(metaName)
                                                        outerDiv.appendChild(textDiv)
                                                        textDiv.appendChild(textTitle)
                                                        outerDiv.appendChild(timeStamp)
                                                        
                                                                        
                                                                  
                                                        })
                                                })
                                        })
                                };
                        })
                })
        }; 

auth.onAuthStateChanged(User =>{
        if(User){
                db.collection("Vitaminders").doc(User.uid).get().then(doc =>{

                        const auth = doc.data().Gebruikersnaam

                const noAuthDiv = document.getElementById("no-auth-div")
                const authDiv = document.getElementById("auth-div")

                noAuthDiv.style.display = "none"
                authDiv.style.display = "block"

                favCoach(auth);
                dashboardFunction(auth)

                });  
        };
});