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

const dynamicH2 = document.getElementById("dynamic-call-to-action")
const dynamicH2Dots = document.getElementById("dynamic-title-dots")

if(dynamicH2 != null && dynamicH2Dots != null){

function goalExample(a,b){

        setTimeout(() => {
                dynamicH2.innerHTML = a
                dynamicH2Dots.innerHTML = ""
                },b)
};

goalExample("Posiviteit", 0)
goalExample("Geluk", 3000)
goalExample("Je eigen leven leven", 6000)
goalExample("Los laten", 9000)
goalExample("Je eigen keuzes maken", 12000)
goalExample("Weten wat je wilt", 15000)
goalExample("Rust in je hoofd", 18000)
goalExample("Waar wil jij je op focussen?", 21000)
setTimeout(() => {
        const CTAsubHeader = document.getElementById("call-to-action-sub-header")
        CTAsubHeader.style.display = "none"
},21000)
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