


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


// Change layout for mobile
!function changeLayoutForMobile(){

        const featuresMobileImage = document.getElementById("image-mobile")
        const featuresImage = document.getElementById("feautures-img")
        const communityImage = document.getElementById("community-img")
        const coachesImage = document.getElementById("coaches-image")

        if (window.innerWidth < 938){
                featuresImage.style.display = "none"
                featuresMobileImage.src = "images/design/iphone-horizontal.png"
                communityImage.src = "images/design/ipad-horizontal.png"
                coachesImage.src = "images/design/coaches-image-horizontal.png"
        };
}();





