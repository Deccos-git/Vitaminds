
// Dashboard
const dashboard = document.getElementById("dashboard-section")

// Ontwikkeling
const ontwikkeling = document.getElementById("ontwikkeling")

// Vitaminders menu
const avontuur = document.getElementById("doelen");
const karakter = document.getElementById("karakter");
const dagelijksLeven = document.getElementById("tools");

// Favorieten
const favoInspiratie = document.getElementById("favoInspiratie");
const favoCoach = document.getElementById("favoCoach")

// Tools
const nieuwArtikel = document.getElementById("artikel")
const video = document.getElementById("video")
const podcast = document.getElementById("podcast")

 //Coach menu
 const coachContact = document.getElementById("coach-contact");
 const mijnCoaching = document.getElementById("mijn-coaching-div");
 const mijnBijdragen = document.getElementById("mijn-bijdragen-div");
 const intervisie = document.getElementById("intervisie")

function dashboardClick(){
        dashboard.style.display = "flex"
        ontwikkeling.style.display = "none"
         coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
        video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
}

 function ontwikkelingClick(){
        ontwikkeling.style.display = "flex"
        dashboard.style.display = "none"
         coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
        video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
     
 }

 function contactCH(contact){
        coachContact.style.display = "flex"
        ontwikkeling.style.display = "none"
        dashboard.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
        video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
 }

 function overMijCH(){
         overMij.style.display = "flex"
         ontwikkeling.style.display = "none"
         dashboard.style.display = "none"
         coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
        video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
 }

 function mijnCoachingCH(){
         mijnCoaching.style.display = "flex"
         ontwikkeling.style.display = "none"
         dashboard.style.display = "none"
         coachContact.style.display = "none"
         mijnBijdragen.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
        video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
 }

 function mijnBijdragenCH(){
         mijnBijdragen.style.display = "flex"
         ontwikkeling.style.display = "none"
         dashboard.style.display = "none"
         coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
        video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
 }

 // Vitaminders menu

function klikavontuur(levensvragen){
        avontuur.style.display = "flex";
        ontwikkeling.style.display = "none"
        dashboard.style.display = "none"
        karakter.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         nieuwArtikel.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
};

function klikkarakter(levenslessen){
        karakter.style.display = "flex";
        avontuur.style.display = "none";
        ontwikkeling.style.display = "none"
        dashboard.style.display = "none"
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         nieuwArtikel.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
};

function klikdagelijks(dagelijks){
        dagelijksLeven.style.display = "flex"
        karakter.style.display = "none";
        ontwikkeling.style.display = "none"
        dashboard.style.display = "none"
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         nieuwArtikel.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
        intervisie.style.display = "none"
}

// Tools menu

function artikel(artikel){
        nieuwArtikel.style.display = "flex"
        favoCoach.style.display = "none";
        ontwikkeling.style.display = "none"
        dashboard.style.display = "none"
        avontuur.style.display = "none";
        karakter.style.display = "none";
        favoInspiratie.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
}

// Favorieten menu

function klikFavInspiratie(favorietenInspiratie){
        favoInspiratie.style.display = "flex";
        avontuur.style.display = "none";
        ontwikkeling.style.display = "none"
        dashboard.style.display = "none"
        karakter.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         nieuwArtikel.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
}

function klikFavCoaches(favorietenCoaches){
        favoCoach.style.display = "flex";
        avontuur.style.display = "none";
        ontwikkeling.style.display = "none"
        dashboard.style.display = "none"
        karakter.style.display = "none";
        favoInspiratie.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         nieuwArtikel.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
        intervisie.style.display = "none"
}

function intervisieCH(){
        intervisie.style.display = "flex"
        favoCoach.style.display = "none";
        avontuur.style.display = "none";
        ontwikkeling.style.display = "none"
        dashboard.style.display = "none"
        karakter.style.display = "none";
        favoInspiratie.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         nieuwArtikel.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
}

// Active tabs green
const dashboardTab = document.getElementById("dashboard-tab")
const ontwikkelingTab = document.getElementById("ontwikkeling-tab")
const contactTab = document.getElementById("contact-tab")
const mijnCoachingTab = document.getElementById("mijn-coaching-tab")
const mijnBijdragenTab = document.getElementById("mijn-bijdragen-tab")
const levenvragenTab = document.getElementById("levenvragen-tab")
const levenslessenTab = document.getElementById("levenlessen-tab")
const dagelijksLevenTab = document.getElementById("dagelijks-leven-tab")
const favCoachesTab = document.getElementById("fav-coaches-tab")
const favInspiratieTab = document.getElementById("fav-inspiratie-tab")
const intervisieTab = document.getElementById("intervisie-tab")

ontwikkelingTab.style.backgroundColor = "#49beb7"
ontwikkelingTab.style.color = "white"

        function active(a,b,c,d,e,f,g,h,i,j,k){
                a.addEventListener("click", () => {

                        a.style.backgroundColor = "#49beb7"
                        a.style.color = "white"
                        b.style.backgroundColor = "#122b4613"
                        b.style.color = "#122b46"
                        c.style.backgroundColor = "#122b4613"
                        c.style.color = "#122b46" 
                        d.style.backgroundColor = "#122b4613"
                        d.style.color = "#122b46"       
                        e.style.backgroundColor = "#122b4613"
                        e.style.color = "#122b46"   
                        f.style.backgroundColor = "#122b4613"
                        f.style.color = "#122b46"   
                        g.style.backgroundColor = "#122b4613"
                        g.style.color = "#122b46"        
                        h.style.backgroundColor = "#122b4613"
                        h.style.color = "#122b46"   
                        i.style.backgroundColor = "#122b4613"
                        i.style.color = "#122b46"   
                        j.style.backgroundColor = "#122b4613"
                        j.style.color = "#122b46"  
                        k.style.backgroundColor = "#122b4613"
                        k.style.color = "#122b46"  
                })
        }

        active(dashboardTab,mijnBijdragenTab,contactTab,mijnCoachingTab,levenvragenTab,levenslessenTab,dagelijksLevenTab,favCoachesTab,favInspiratieTab, intervisieTab, ontwikkelingTab)
        active(contactTab,mijnBijdragenTab,mijnCoachingTab,dashboardTab,levenvragenTab,levenslessenTab,dagelijksLevenTab,favCoachesTab,favInspiratieTab, intervisieTab, ontwikkelingTab)
        active(mijnCoachingTab,contactTab,mijnBijdragenTab,dashboardTab,levenvragenTab,levenslessenTab,dagelijksLevenTab,favCoachesTab,favInspiratieTab, intervisieTab, ontwikkelingTab)
        active(mijnBijdragenTab,contactTab,mijnCoachingTab,dashboardTab,levenvragenTab,levenslessenTab,dagelijksLevenTab,favCoachesTab,favInspiratieTab, intervisieTab, ontwikkelingTab)
        active(levenvragenTab,mijnBijdragenTab,contactTab,mijnCoachingTab,dashboardTab,levenslessenTab,dagelijksLevenTab,favCoachesTab,favInspiratieTab, intervisieTab, ontwikkelingTab)
        active(levenslessenTab,mijnBijdragenTab,contactTab,mijnCoachingTab,dashboardTab,levenvragenTab,dagelijksLevenTab,favCoachesTab,favInspiratieTab, intervisieTab, ontwikkelingTab)
        active(dagelijksLevenTab,mijnBijdragenTab,contactTab,mijnCoachingTab,dashboardTab,levenslessenTab,levenvragenTab,favCoachesTab,favInspiratieTab, intervisieTab, ontwikkelingTab)
        active(favCoachesTab,dagelijksLevenTab,mijnBijdragenTab,contactTab,mijnCoachingTab,dashboardTab,levenslessenTab,levenvragenTab,favInspiratieTab, intervisieTab, ontwikkelingTab)
        active(favInspiratieTab,dagelijksLevenTab,mijnBijdragenTab,contactTab,mijnCoachingTab,dashboardTab,levenslessenTab,levenvragenTab,favCoachesTab, intervisieTab, ontwikkelingTab)
        active(dagelijksLevenTab,mijnBijdragenTab,contactTab,mijnCoachingTab,dashboardTab,levenslessenTab,levenvragenTab,favCoachesTab,favInspiratieTab, intervisieTab, ontwikkelingTab)
        active(intervisieTab,dagelijksLevenTab,mijnBijdragenTab,contactTab,mijnCoachingTab,dashboardTab,levenslessenTab,levenvragenTab,favCoachesTab,favInspiratieTab, ontwikkelingTab)
        active(ontwikkelingTab, intervisieTab,dagelijksLevenTab,mijnBijdragenTab,contactTab,mijnCoachingTab,dashboardTab,levenslessenTab,levenvragenTab,favCoachesTab,favInspiratieTab)


  // Naam uit URL halen
const naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
const naam1 = naamhtml.replace('.html', '')
const naam2 = naam1.replace('%20',' ')
const naam3 = naam2.replace('%20',' ')
const naam4 = naam3.replace('%20',' ')
const naam5 = naam4.replace('%20',' ')
const naam6 = naam5.replace('%20',' ')
const naam7 = naam6.replace('%20',' ')
const naam8 = naam7.replace('%20',' ')
const naam9 = naam8.replace('%20',' ')
const naam10 = naam9.replace('%20',' ')
const naam11 = naam10.replace('%20',' ')
const naam = naam11.replace('%20',' ')

//Hide for non-coach Digimind
db.collection('Vitaminders').where('Gebruikersnaam', '==', naam )
    .get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        const usertype = doc.data().Usertype

        const coachMenu = document.getElementById("coach-menu")
        const toolMenu = document.getElementById("tools-menu")

        if(usertype != "Coach"){
                coachMenu.style.display = "none"
                toolMenu.style.display = "none"
                }
        })
}) 

// Hide for non-coach auth
auth.onAuthStateChanged(User =>{
        if (User){
            let docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){

                        const usertype = doc.data().Usertype
                        const intervisieMenu = document.getElementById("intervisie-tab")
                        const intervisieBar = document.getElementById("profile-notifications-intervisie")

                        if(usertype != "Coach"){
                                intervisieMenu.style.display = "none"  
                                intervisieBar.style.display = "none"   
                        }

                })
        }
});


// Hide profile-elements for visiter
auth.onAuthStateChanged(User =>{
        if (User){

                console.log("Auth ingelogd")
        } else {

                console.log("Auth offline")

                const nieuweKarakterTocht = document.getElementById("nieuweKarakterTocht")
                const notifications = document.getElementById("profile-notifications")
                const activeDiv = document.getElementsByClassName("active-div")
                const changePhoto = document.getElementById("profile-picture-outer-div")
                const intervisieMenu = document.getElementById("intervisie-tab")
                const themeOverview = document.getElementById("profile-notifications-theme-overview")
                const intervisieBar = document.getElementById("profile-notifications-intervisie")
             
                    const activeDivArray = Array.from(activeDiv)
                    activeDivArray.forEach(active => {
                        active.style.display = "none"
                    })

                    changePhoto.style.display = "none"
                    nieuweKarakterTocht.style.display = "none"
                    notifications.style.display = "none"
                    intervisieMenu.style.display = "none"
                    themeOverview.style.display = "none"
                    intervisieBar.style.display = "none"     
        }
});

// Admin
auth.onAuthStateChanged(User =>{
        if (User){
            let docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){
                    const admin = doc.data().Admin;

                    const adminIcon = document.getElementById("profile-admin")
                  
                    if(admin == "Yes"){
                        adminIcon.style.display = "flex"
                    }

                    adminIcon.addEventListener("click", () => {
                            window.open("../admin.html", "_self")
                        
                                })
                        // }
                })
        }
})

// Hide profile-elements for non-auth
auth.onAuthStateChanged(User =>{
    if (User){
        let docRef = db.collection("Vitaminders").doc(User.uid);
            docRef.get().then(function(doc){
                const coachNaam = doc.data().Gebruikersnaam;

                const nieuweKarakterTocht = document.getElementById("nieuweKarakterTocht")
                const toolsMenu = document.getElementById("tools-menu")
                const notifications = document.getElementById("profile-notifications")
                const activeDiv = document.getElementsByClassName("active-div")
                const changePhoto = document.getElementById("profile-picture-outer-div")

                console.log(notifications)
                notifications.style.display = "none"
        
                if(naam != coachNaam){
                       
                changePhoto.style.display = "none"

                const activeDivArray = Array.from(activeDiv)
                activeDivArray.forEach(active => {
                active.style.display = "none"
                })

                nieuweKarakterTocht.style.display = "none"
                toolsMenu.style.display = "none"
                

                }      
        })
    }
});

        // Hide elements for non coach
        auth.onAuthStateChanged(User =>{
                if (User){
                    let docRef = db.collection("Vitaminders").doc(User.uid);
                        docRef.get().then(function(doc){  
                                
                                const type = doc.data().Usertype
                                const themeOverview = document.getElementById("profile-notifications-theme-overview")

                                if (type != "Coach"){
                                        themeOverview.style.display = "none"
                                }

                        })
                }
        });

// Total inspirationpoints in Digimind

const inspirationPointsArray = [];

db.collectionGroup("Inspiration").where("Reciever", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                const docLengt = [doc]          
                objectLength = Object.keys(docLengt).length

                inspirationPointsArray.push(objectLength)                 
        })
        }).then(() => {
                const DOMprofile = document.getElementById("bijdragepunten");
                if(DOMprofile == null){
                        console.log("Error")
                } else {
                DOMprofile.innerHTML = inspirationPointsArray.length
                }
});


// Informatie van Vitaminder/Coach inladen vanuit database in pagina

        // Dashboard
function dashboardFunction(){

        const dashboardDOM = document.getElementById("dashboard-section")

        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
        
                        const followers = doc.data().FavCoaches
                        const naamClean = doc.data().GebruikersnaamClean

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
                        if(auth == naam){

                        if (followers == undefined || followers.length == 0){
                                console.log("auth")
                                instructionDiv.style.display = "flex"
                        };

                                        instructionH4.innerHTML = "Je volgt nog geen coaches"
                                        instructionP.innerHTML = `De nieuwste inzichten van jouw favoriete coaches komen hier te staan <br><br>
                                                                Vind bijvoorbeeld <a href="../coaches.html"> hier</a> coaches om te volgen`
                                        instructionImg.src = "../images/menu-mijncoaches.png"
                                        } else if (auth != naam) {
                                                instructionDiv.style.display = "flex"
                                                instructionH4.innerHTML = `${naamClean} volgt nog geen coaches`
                                        };
                                })
                        });

                        dashboardDOM.appendChild(instructionDiv)
                        instructionDiv.appendChild(instructionH4)
                        instructionDiv.appendChild(instructionImg)
                        instructionDiv.appendChild(instructionP)
        
                        followers.forEach(coach => {
                                db.collection("Insights").where("Auteur", "==", coach).orderBy("Timestamp", "desc").get().then(querySnapshot => {
                                        querySnapshot.forEach(doc1 => {

                                                const titelInsight = doc1.data().Titel
                                                const coach = doc1.data().Auteur
                                                const levensvraagArtikel = doc1.data().LevensvraagArtikel
                                                const themeArtikel = doc1.data().ThemeArtikel
                                                const type = doc1.data().Type

                                                db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
                                                        querySnapshot.forEach(doc2 => {
                                                            const gebruikersnaamClean = doc2.data().GebruikersnaamClean
                                                            const photo = doc2.data().Profielfoto
                                                
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

                                                metaPhoto.src = photo
                                                metaName.innerHTML = gebruikersnaamClean
                                                textTitle.innerHTML = titelInsight
                                               
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
                                                
                                                                
                                                        })
                                                })
                                        })
                                })
                        })
                })
        })
}; dashboardFunction()

        // Ontwikkeling 
        function ontwikkelingen(){
                // Levensvragen ontwikkeling

                DOMdashboard = document.getElementById("digimind-ontwikkeling-outer-div")

                     // Instructions if no levensvragen

                const instructionDiv = document.createElement("div")
                        instructionDiv.setAttribute("id", "instruction-div-ontwikkeling")
                const instructionImg = document.createElement("img")
                const instructionH4 = document.createElement("h4")
                const instructionP = document.createElement("p")

                instructionH4.innerHTML = "Het avontuur in je eigen karakter wacht nog op je"
                instructionP.innerHTML = `<u>Stel een doel</u> en begin je avontuur.`
                                        

                instructionP.addEventListener("click", () => {
                        const levensvragenTab = document.getElementById("levenvragen-tab")
                        levensvragenTab.click()
                });

                instructionP.style.cursor = "pointer"

                instructionImg.src = "../images/menu-doelen.png"

                DOMdashboard.appendChild(instructionDiv)
                instructionDiv.appendChild(instructionH4)
                instructionDiv.appendChild(instructionImg)
                instructionDiv.appendChild(instructionP)


                db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
                        querySnapshot.forEach(doc =>{

                                instructionDiv.style.display = "none"
        
                                const ID = doc.data().ID
                                const levensvraagID = doc.data().Levensvraag
                                const levensvragen = levensvraagID.replace(ID, "")
                                const openbaar = doc.data().Openbaar
                                const description = doc.data().Omschrijving

                                const innerDiv = document.createElement("div")
                                        innerDiv.setAttribute("class", "digimind-ontwikkeling-inner-div")
                                const levensvraagTitle = document.createElement("h2")
                                const descriptionP = document.createElement("p")
                                const privateDiv = document.createElement("div")
                                        privateDiv.setAttribute("class", "private-div")
                                const private = document.createElement("div")

                                levensvraagTitle.innerHTML = levensvragen
                                descriptionP.innerHTML = description

                                // Private or public
                                if(openbaar == "Nee"){
                                private.innerHTML = '<img class="edit-icon" src="../images/private.png" alt="doel is prive" width="20px"> '

                                                // Private goals hidden for non auth
                                                auth.onAuthStateChanged(User =>{
                                                        const userRef = db.collection("Vitaminders").doc(User.uid);
                                                        userRef.get().then(function(doc) {

                                                                const auth = doc.data().Gebruikersnaam

                                                                if(auth != naam){
                                                                        innerDiv.style.display = "none"
                                                                }
                                                        })
                                                });
                                                        // Check in hidden for visitor
                                                auth.onAuthStateChanged(User =>{
                                                if(!User){
                                                        innerDiv.style.display = "none"
                                                                }                      
                                                        });

                                } else if(openbaar == "Ja"){
                                private.innerHTML = '<img class="edit-icon" src="../images/public.png" alt="doel is openbaar" width="20px"> '
                                };

                                // check in

                                DOMdashboard.appendChild(innerDiv)
                                innerDiv.appendChild(privateDiv)
                                privateDiv.appendChild(private)
                                innerDiv.appendChild(levensvraagTitle)
                                innerDiv.appendChild(descriptionP)

                                const checkInDiv = document.createElement("div")
                                        checkInDiv.setAttribute("id", "check-in-div")
                                const checkInH4 = document.createElement("h4")
                                const checkInH5 = document.createElement("h5")
                                const checkInTextArea = document.createElement("textarea")
                                        checkInTextArea.setAttribute("cols", "60")
                                        checkInTextArea.setAttribute("rows", "5")
                                        checkInTextArea.setAttribute("placeholder", `Hoe gaat het nu met "${levensvragen}"`)
                                const checkInButtonDiv = document.createElement("div")
                                const checkInButton = document.createElement("button")

                                checkInH4.innerHTML = "Check In"
                                checkInH5.innerHTML = `Hoe gaat het nu?`
                                checkInButton.innerHTML = "Opslaan"

                                        // Check in hidden for non auth
                                auth.onAuthStateChanged(User =>{
                                        const userRef = db.collection("Vitaminders").doc(User.uid);
                                        userRef.get().then(function(doc) {

                                                const auth = doc.data().Gebruikersnaam

                                                if(auth != naam){
                                                        checkInDiv.style.display = "none"
                                                }
                                        })
                                })
                                        // Check in hidden for visitor
                                auth.onAuthStateChanged(User =>{
                                if(!User){
                                        checkInDiv.style.display = "none"
                                                }                      
                                        })

                                innerDiv.appendChild(checkInDiv)
                                checkInDiv.appendChild(checkInH4)
                                checkInDiv.appendChild(checkInH5)
                                checkInDiv.appendChild(checkInTextArea)
                                checkInDiv.appendChild(checkInButtonDiv)
                                checkInButtonDiv.appendChild(checkInButton)

                                // Save check In to database

                                const input = checkInTextArea

                                checkInButton.addEventListener("click", () => {

                                auth.onAuthStateChanged(User =>{
                                        userRef = db.collection("Vitaminders").doc(User.uid)
                                        userRef.get()
                                        .then(doc => {
                                                const naam = doc.data().Gebruikersnaam

                                              

                                db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
                                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                Levensles: input.value,
                                Levensvraag: levensvraagID,
                                Gebruikersnaam: naam,
                                Inspirerend: 1,
                                Type: "Check-in"
                                        })

                                levensvraagRef = db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraagID)
                                levensvraagRef.get()
                                .then(querySnapshot => {
                                        querySnapshot.forEach(doc1 => {
                                        
                                        db.collection("Vitaminders").doc(User.uid).collection("Levensvragen").doc(doc1.id).update({
                                                Levenslessen: firebase.firestore.FieldValue.arrayUnion(input.value)
                                                                        })
                                                                })
                                                        }).then(() => {
                                                                location.reload()
                                                        })
                                                })
                                        })
                                });

                                db.collectionGroup("Levenslessen").where("Levensvraag", "==", levensvraagID).orderBy("Timestamp", "desc").get().then(querySnapshot =>{
                                        querySnapshot.forEach(doc1 =>{     

                                                const levensles = doc1.data().Levensles
                                                const type = doc1.data().Type
                                                const timestamp = doc1.data().Timestamp

                                                console.log(type)

                                                const levenslesDiv = document.createElement("div")
                                                        levenslesDiv.setAttribute("class", "levensles-div-ontwikkeling")
                                                const levenslesH3 = document.createElement("h3")
                                                const metaDiv = document.createElement("div")
                                                        metaDiv.setAttribute("class", "ontwikkeling-levensles-meta-div")
                                                const metaType = document.createElement("p")
                                                const metaTimestamp = document.createElement("p")
                                               
                                                levenslesH3.innerHTML = levensles
                                                metaType.innerHTML = type
                                                metaTimestamp.innerHTML = timestamp
                                                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                                                metaTimestamp.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

                                                innerDiv.appendChild(levenslesDiv)
                                                levenslesDiv.appendChild(levenslesH3)
                                                levenslesDiv.appendChild(metaDiv)
                                                metaDiv.appendChild(metaType)
                                                metaDiv.appendChild(metaTimestamp)

                                        })
                                });
                

                // Prive of openbaar
                if(openbaar == "Nee"){

                        // Hidden for non auth
                auth.onAuthStateChanged(User =>{
                        const userRef = db.collection("Vitaminders").doc(User.uid);
                        userRef.get().then(function(doc) {

                                const auth = doc.data().Gebruikersnaam

                                if(auth != naam){
                                        exampleP.style.display = "none"
                                }
                        })
                })
                        // Hidden for visitor
                auth.onAuthStateChanged(User =>{
                if(!User){
                        exampleP.style.display = "none"
                                }                      
                        })
                }
             })       
        }).catch(error => {
                console.log(error)
});
}; ontwikkelingen()

        //Gegevens van overeenkomende naan inladen in user-bar
db.collection('Vitaminders').where('Gebruikersnaam', '==', naam )
    .get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

        const userID = doc.data().Gebruikersnaam
        const IDuser = doc.data().ID
        const user = userID.replace(IDuser, "")
        const usertypeDB = doc.data().Usertype

        const username = document.getElementsByClassName('welkom')[0];
        const usertype = document.getElementsByClassName('usertype')[0];
        const profielfoto = document.getElementById("profielfoto");
        
        profielfoto.style.backgroundImage =`url('${doc.data().Profielfoto}')` 

        username.innerHTML = user

        if (usertypeDB == "Coach")
        usertype.innerHTML = doc.data().Coachingstyle;
        else {
        usertype.innerHTML = doc.data().Usertype;
        }
    })
  })

// Loading coach info
db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                // Contact info
                const usertype = doc.data().Usertype
                const phoneNumber = doc.data().PhoneNumber
                const website = doc.data().Website

                // About coaching
                const adress = doc.data().adress
                const city = doc.data().City
                const targetGroup = doc.data().Targetgroup

                const costs = doc.data().Costs
                const style = doc.data().Coachingstyle
                const approach = doc.data().Approach
                const why = doc.data().Why

                const years = doc.data().YearsExperience
                const experience = doc.data().Experience
                const education = doc.data().Ecudation

                if(usertype == "Coach"){

                // Contact info
                const DOM = document.getElementById("contact-inner-div")

                const titleH2 = document.createElement("h2")
                const phoneDiv = document.createElement("div")
                        phoneDiv.setAttribute("class", "item-div")
                const phoneDOM = document.createElement("p")
                const phoneData = document.createElement("h6")
                const websiteDiv = document.createElement("div")
                        websiteDiv.setAttribute("class", "item-div")
                const websiteDOM = document.createElement("p")
                const websiteData = document.createElement("h6")
                //Edit coach info
                const editDivContact = document.createElement("div")
                        editDivContact.setAttribute("class", "edit-div")
                const editContact = document.createElement("div")
                        editContact.setAttribute("class", "edit-levensvraag")
                        editContact.setAttribute("onclick", "editContact(this)")

                // About info
                const DOMshort = document.getElementById("short-inner-div")
                const cityDiv = document.createElement("div")
                        cityDiv.setAttribute("class", "item-div")
                const cityDOM = document.createElement("p")
                const cityData = document.createElement("h6")
                const targetDiv = document.createElement("div")
                        targetDiv.setAttribute("class", "item-div")
                const targetDOM = document.createElement("p")
                const targetData = document.createElement("h6")
                const costsDiv = document.createElement("div")
                        costsDiv.setAttribute("class", "item-div")
                const costsDOM = document.createElement("p")
                const costsData = document.createElement("h6")
                //Edit coach info
                const editDivShort = document.createElement("div")
                        editDivShort.setAttribute("class", "edit-div")
                const editShort = document.createElement("div")
                        editShort.setAttribute("class", "edit-levensvraag")
                        editShort.setAttribute("onclick", "editShort(this)")

                const DOMcoach = document.getElementById("coach-inner-div")
                const styleDiv = document.createElement("div")
                        styleDiv.setAttribute("class", "item-div")
                const styleDOM = document.createElement("p")
                const styleData = document.createElement("h6")
                const approachDiv = document.createElement("div")
                        approachDiv.setAttribute("class", "item-div")
                const approachDOM = document.createElement("p")
                const approachData = document.createElement("h6")
                const whyDiv = document.createElement("div")
                        whyDiv.setAttribute("class", "item-div")
                const whyDOM = document.createElement("p")
                const whyData = document.createElement("h6")
                //Edit coach info
                const editDivCoach = document.createElement("div")
                        editDivCoach.setAttribute("class", "edit-div")
                const editCoach = document.createElement("div")
                        editCoach.setAttribute("class", "edit-levensvraag")
                        editCoach.setAttribute("onclick", "editCoach(this)")

                const DOMExperience = document.getElementById("experience-inner-div")
                const yearsDiv = document.createElement("div")
                        yearsDiv.setAttribute("class", "item-div")
                const yearsDOM = document.createElement("p")
                const yearsData = document.createElement("h6")
                const experienceDiv = document.createElement("div")
                        experienceDiv.setAttribute("class", "item-div")
                const experienceDOM = document.createElement("p")
                const experienceData = document.createElement("h6")
                const educationDiv = document.createElement("div")
                        educationDiv.setAttribute("class", "item-div")
                const educationDOM = document.createElement("p")
                const educationData = document.createElement("h6")
        
                //Edit coach info
                const editDivExperience = document.createElement("div")
                        editDivExperience.setAttribute("class", "edit-div")
                const editExperience = document.createElement("div")
                        editExperience.setAttribute("class", "edit-levensvraag")
                        editExperience.setAttribute("onclick", "editExperience(this)")

                function mouse(b){
                       
                        b.style.display = "block"
                        b.innerHTML = '<img class="edit-icon" src="../images/edit-icon.png" alt="edit icon" width="20px"> ' 
                }

                mouse(editContact)
                mouse(editShort)
                mouse(editCoach)
                mouse(editExperience)

                // Contact

                titleH2.innerHTML = "Contact"

                // Not yet filled in coach details

                function dataUndefined(a,b,c,d,e,f){
                        e.innerHTML = f
                if(a == undefined){
                        b.style.display = "none"
                } else {
                        c.innerHTML = d
                }
        } 
        dataUndefined(phoneNumber, phoneDiv, phoneData, phoneNumber, phoneDOM, "Bel")
        dataUndefined(website, websiteDiv, websiteData, `<a href="http://${website}" target="_blank">${website}</a>`, websiteDOM, "Website"  )

                // About info
        dataUndefined(city, cityDiv, cityData, city, cityDOM, `Stad of dorp`)
        dataUndefined(targetGroup, targetDiv, targetData, targetGroup, targetDOM, "Doelgroep")
        dataUndefined(costs, costsDiv, costsData, costs, costsDOM, "Tarief")
        dataUndefined(style, styleDiv, styleData, style, styleDOM, "Coachingsstijl")
        dataUndefined(approach, approachDiv, approachData, approach, approachDOM, "Methodiek")
        dataUndefined(why, whyDiv, whyData, why, whyDOM, "Motivatie")
        dataUndefined(years, yearsDiv, yearsData, years, yearsDOM, "Aantal jaren ervaring")
        dataUndefined(experience, experienceDiv, experienceData, experience, experienceDOM, "Ervaringen")
        dataUndefined(education, educationDiv, educationData, education, educationDOM, "Opleidingen & certificaten")


        // Undefined coach details visible for auth

        auth.onAuthStateChanged(User =>{
                if(User){
                  const userRef = db.collection("Vitaminders").doc(User.uid);
                  userRef.get().then(function(doc) {
                    if (doc.exists) {
                      const auth = doc.data().Gebruikersnaam;

                      if(naam == auth){
                        editShort.click()
                        editCoach.click()
                        editExperience.click()
                        editContact.click()

                                        }
                                }
                        })
                }
        });


        //Hide edit Icons
                // For non auth
                auth.onAuthStateChanged(User =>{
                        if(User){
                          const userRef = db.collection("Vitaminders").doc(User.uid);
                          userRef.get().then(function(doc) {
                            if (doc.exists) {
                              const auth = doc.data().Gebruikersnaam;
        
                              if(naam != auth){
                                editShort.style.display = "none"
                                editCoach.style.display = "none"
                                editExperience.style.display = "none"
                                editContact.style.display = "none"
        
                                                }
                                        }
                                })
                        }
                });

                // For visitor
                auth.onAuthStateChanged(User =>{
                        if(!User){
                          
                                editShort.style.display = "none"
                                editCoach.style.display = "none"
                                editExperience.style.display = "none"
                                editContact.style.display = "none"
                        }
                });

                //Contact
                DOM.appendChild(editDivContact)
                editDivContact.appendChild(editContact)
                DOM.appendChild(titleH2)
                DOM.appendChild(phoneDiv)
                phoneDiv.appendChild(phoneDOM)
                phoneDiv.appendChild(phoneData)
                DOM.appendChild(websiteDiv)
                websiteDiv.appendChild(websiteDOM)
                websiteDiv.appendChild(websiteData)

                // About info
                DOMshort.appendChild(editDivShort)
                editDivShort.appendChild(editShort)
                DOMshort.appendChild(cityDiv)
                cityDiv.appendChild(cityDOM)
                cityDiv.appendChild(cityData)
                DOMshort.appendChild(targetDiv)
                targetDiv.appendChild(targetDOM)
                targetDiv.appendChild(targetData)
                DOMshort.appendChild(costsDiv)
                costsDiv.appendChild(costsDOM)
                costsDiv.appendChild(costsData)

                DOMcoach.appendChild(editDivCoach)
                editDivCoach.appendChild(editCoach)
                DOMcoach.appendChild(styleDiv)
                styleDiv.appendChild(styleDOM)
                styleDiv.appendChild(styleData)
                DOMcoach.appendChild(approachDiv)
                approachDiv.appendChild(approachDOM)
                approachDiv.appendChild(approachData)
                DOMcoach.appendChild(whyDiv)
                whyDiv.appendChild(whyDOM)
                whyDiv.appendChild(whyData)

                DOMExperience.appendChild(editDivExperience)
                editDivExperience.appendChild(editExperience)
                DOMExperience.appendChild(yearsDiv)
                yearsDiv.appendChild(yearsDOM)
                yearsDiv.appendChild(yearsData)
                DOMExperience.appendChild(experienceDiv)
                experienceDiv.appendChild(experienceDOM)
                experienceDiv.appendChild(experienceData)
                DOMExperience.appendChild(educationDiv)
                educationDiv.appendChild(educationDOM)
                educationDiv.appendChild(educationData)

                }
        })
})

// Intervisie

function startCasus(){
       const nieuweCasus = document.getElementById("new-casus-section")
       nieuweCasus.style.display = "flex"
}

function shareNewCasus(){

        const title = document.getElementById("new-casus-title").value
        const textarea = document.getElementById("new-casus-textarea").value

        auth.onAuthStateChanged(User =>{
                if (User){
                    let docRef = db.collection("Vitaminders").doc(User.uid);
                        docRef.get().then(function(doc){

                                const coach = doc.data().Gebruikersnaam
                                const ID = doc.data().ID
                                const coachClean = coach.replace(ID, "")

        db.collection("Intervisie").doc().set({
                Owner: "Vitaminds",
                Coach: coach,
                CoachClean: coachClean,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Titel: title,
                Omschrijving: textarea
                                })

                        })
                }
        })
}

// My contributions

        // Insights

const DOMcontributions = document.getElementById("my-contributions-outer-div")

const innerDivInspiration = document.createElement("div")
        innerDivInspiration.setAttribute("class", "inspiration-inner-div")

        DOMcontributions.appendChild(innerDivInspiration)

        // Lifequestions article insights
db.collection("Insights").where("Auteur", "==", naam).where("Type", "==", "Insight-levensvraag").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
                const titel = doc.data().Titel
                 const levensvraagArtikel = doc.data().LevensvraagArtikel
                 const themeArtikel = doc.data().ThemeArtikel
                 const timestamp = doc.data().Timestamp

                const innerDiv = document.createElement('div')
                        innerDiv.setAttribute("class", "inner-div-contributions")
                const titelP = document.createElement("p")
                        titelP.setAttribute("data-titel", titel)
                const metaDiv = document.createElement("div")
                        metaDiv.setAttribute("class", "meta-div-contributions")
                const timestampMeta = document.createElement("p")
                const source = document.createElement("p")
                
                titelP.innerHTML = `<a href="../Artikelen/${levensvraagArtikel}.html">${titel}</a>`
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                timestampMeta.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

                if(themeArtikel == undefined){
                        source.innerHTML = levensvraagArtikel
                        source.addEventListener("click", () => {
                                window.open("/Artikelen/" + levensvraagArtikel + ".html", "_self")
                        })
                } else {
                        source.innerHTML = themeArtikel
                        source.addEventListener("click", () => {
                                window.open("/Theme-articles/" + themeArtikel + ".html", "_self")
                        })
                }
                
                innerDivInspiration.appendChild(innerDiv)
                innerDiv.appendChild(titelP)
                innerDiv.appendChild(metaDiv)
                metaDiv.appendChild(timestampMeta)
                metaDiv.appendChild(source)


        })
});

 // Theme article insights
 db.collection("Insights").where("Auteur", "==", naam).where("Type", "==", "Insight-theme-article").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
                const titel = doc.data().Titel
                 const themeArtikel = doc.data().ThemeArtikel
                
                const titelP = document.createElement("p")
                        titelP.setAttribute("data-titel", titel)
                
                titelP.innerHTML = `<a href="../Theme-articles/${themeArtikel}.html"><u>${titel}</u></a>`
                
                innerDivInspiration.appendChild(titelP)

        })
});
       


// Levensvragen inladen

db.collectionGroup('Levensvragen').where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const levenslessen = doc.data().Levenslessen
            const omschrijving = doc.data().Omschrijving
            const ID = doc.data().ID
            const openbaar = doc.data().Openbaar

            const levensvraagID = doc.data().Levensvraag
            const levensvraag = levensvraagID.replace(ID, "")
            
    
            const DOM = document.getElementById("overzichtLevensvragen")
    
            const innerDiv = document.createElement("div")
                innerDiv.setAttribute("class", "openup-div")
            const authDiv = document.createElement("div")
                authDiv.setAttribute("class", "auth-div")
            const vraagDiv = document.createElement("div") 
                vraagDiv.setAttribute("class", "vraag-div")     
            const vraag = document.createElement("h2")
                vraag.setAttribute("class", "vraag-h2")
                vraag.setAttribute("id", "vraag-id")
            const editDiv = document.createElement("div")
                editDiv.setAttribute("class", "edit-div")
            const edit = document.createElement("div")
                edit.setAttribute("class", "edit-levensvraag")
                edit.setAttribute("onclick", "edit(this)")
                edit.setAttribute("data-levensvraag", levensvraagID)
            const privateDiv = document.createElement("div")
            const private = document.createElement("div")
            const omschrijvingDiv = document.createElement("div")
                omschrijvingDiv.setAttribute("class", "omschrijving-div")
            const omschrijvingP = document.createElement("p")
            const button = document.createElement("button")
                button.setAttribute("id", "lifequestions-button")

                    edit.style.display = "block"
    
            vraag.innerHTML = levensvraag
            omschrijvingP.innerHTML = omschrijving

            if(openbaar == "Nee"){
                    button.style.visibility = "hidden"
            };

            button.innerHTML = "Bekijk doel in open-up"
            edit.innerHTML = '<img class="edit-icon" src="../images/edit-icon.png" alt="edit icon" width="20px"> ' 

            // Private or public
            if(openbaar == "Nee"){
            private.innerHTML = '<img class="edit-icon" src="../images/private.png" alt="doel is prive" width="20px"> '
            } else if(openbaar == "Ja"){
            private.innerHTML = '<img class="edit-icon" src="../images/public.png" alt="doel is openbaar" width="20px"> '
            }

            button.addEventListener("click", () => {
                window.open("../Open/" + ID + levensvraag + ".html", "_self")
            })

            // Private or public
            if(openbaar == "Nee"){
                        // private goal hidden for non auth
                auth.onAuthStateChanged(User =>{
                          const userRef = db.collection("Vitaminders").doc(User.uid);
                          userRef.get().then(function(doc) {

                                const auth = doc.data().Gebruikersnaam

                                if(auth != naam){
                                        innerDiv.style.display = "none"
                                }
                        })
                })
                        // Privat goal hidden for visitor
                auth.onAuthStateChanged(User =>{
                       if(!User){
                        innerDiv.style.display = "none"
                       }                      
                })
            }

            //Hide edit Icons
                // For non auth
                auth.onAuthStateChanged(User =>{
                        if(User){
                          const userRef = db.collection("Vitaminders").doc(User.uid);
                          userRef.get().then(function(doc) {
                            if (doc.exists) {
                              const auth = doc.data().Gebruikersnaam;
        
                              if(naam != auth){
                                editDiv.style.display = "none"
                                                }
                                        }
                                })
                        }
                });

                // For visitor
                auth.onAuthStateChanged(User =>{
                        if(!User){
                                editDiv.style.display = "none"
                        }
                });
            
    
            DOM.appendChild(innerDiv)
            innerDiv.appendChild(privateDiv)
            privateDiv.appendChild(private)
            innerDiv.appendChild(editDiv)
            editDiv.appendChild(edit)
            innerDiv.appendChild(authDiv)
            innerDiv.appendChild(vraagDiv)
            vraagDiv.appendChild(vraag)
            vraagDiv.appendChild(editDiv)
            vraagDiv.appendChild(omschrijvingDiv)
            vraagDiv.appendChild(button)
            omschrijvingDiv.appendChild(omschrijvingP)
    
            // Levenslessen metadata inladen die passen bij levensvragen
    
            levenslessen.forEach(les => {
    
            db.collectionGroup("Levenslessen").where("Levensles", "==", les).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const inspirator = doc.data().Auteur
                    const source = doc.data().Titel

                    if (inspirator != undefined){

                    db.collection("Vitaminders").where("Gebruikersnaam", "==", inspirator).get()
                        .then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {
                                const ID = doc1.data().ID
                                const inspiratorClean = inspirator.replace(ID, "")
    
                    const bronDiv = document.createElement("div")
                        bronDiv.setAttribute("class", "bron-div")   
                    const lessen = document.createElement("h4")
                    const titelP = document.createElement("p")
                        titelP.setAttribute("class", "openup-meta")
                    const inspiratorP = document.createElement("p")
                        inspiratorP.setAttribute("class", "openup-meta")
                    
                    lessen.innerHTML ='<img class="menu-icon" src="../images/menu-karakter.png" alt="menu contact" width="20px"> ' + les
                    inspiratorP.innerHTML = "Geinspïreerd door " + `<u>${inspiratorClean}</u>`
    
                    inspiratorP.addEventListener("click", () => {
                        window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                    })

                        db.collection("Artikelen").where("Titel", "==", source).get().then(querySnapshot => {
                                querySnapshot.forEach(doc2 => {

                                        const IDsource = doc2.data().ID
                                        const titelClean = source.replace(IDsource, "")
    
                    titelP.innerHTML = "Geïnspireerd in " + `<u>${titelClean}</u>`
    
                    titelP.addEventListener("click", () => {
                        window.open("../Artikelen/" + source + ".html", "_self");
                    })
                     
                    innerDiv.appendChild(bronDiv)
                    bronDiv.appendChild(lessen)
                    lessen.appendChild(inspiratorP)
                    lessen.appendChild(titelP)
                                                        })
                                                })
                                        })
                                })
                        }
                        })
                })
            })
        })
    })
 
          
// Nieuwe levensvraag openen na onclick
function nieuweLevensvraag(){

        const DOM = document.getElementById("nieuweO");
        DOM.style.display = "flex"

        const vraagH3 = document.createElement("h3");
        const vraagInspirationDiv = document.createElement("div")
                vraagInspirationDiv.setAttribute("id", "doel-inspiratie-div")
        const vraagInspirationTitel = document.createElement("p")
        const vraagInspirationSelect = document.createElement("select")

        const vraagSelect = document.createElement("input");
                vraagSelect.setAttribute("id", "ontwikkelDoel");
                vraagSelect.setAttribute("type", "text");
                vraagSelect.setAttribute("placeholder", "Wat is je doel?");

        const beschrijvingH3 =  document.createElement("h4");
        const beschrijvingSelect = document.createElement("textarea");
                beschrijvingSelect.setAttribute("id", "levensvraag-beschrijving");
                beschrijvingSelect.setAttribute("cols", "63")
                beschrijvingSelect.setAttribute("rows", "15")
                beschrijvingSelect.setAttribute("type", "text");
                const placeholder = "Omschrijf je doel. Hoe gaat het nu met je en waar zou je energie van krijgen. Als het zou gaan zoals jij zou willen, hoe zou dat eruit zien? "
                beschrijvingSelect.setAttribute("placeholder", placeholder);

                //Public Yes/No
         const publicDiv = document.createElement("div")
                publicDiv.setAttribute("class", "public-div-lifequestion")
         const publicP = document.createElement("p")
         const publicExplaination = document.createElement("p")
                publicExplaination.setAttribute("id", "public-explanation")
         const publicForm = document.createElement("form")
                publicForm.setAttribute("id", "public-lifequestion")
         const publicInputYes = document.createElement("input")
                 publicInputYes.setAttribute("type", "radio")
                 publicInputYes.setAttribute("id", "Ja")
                 publicInputYes.setAttribute("name", "Public")
         const publicLabelYes = document.createElement("label")
                 publicLabelYes.setAttribute("for", "Ja")
         const publicInputNo = document.createElement("input")
                 publicInputNo.setAttribute("type", "radio")
                 publicInputNo.setAttribute("id", "Nee")
                 publicInputNo.setAttribute("name", "Public")
         const publicLabelNo = document.createElement("label")
                 publicLabelNo.setAttribute("for", "Nee")
 
         publicP.innerHTML = "Doel openbaar of prive?"
         publicExplaination.innerHTML = "Prive doelen zijn alleen zichbaar voor jezelf. Openbare doelen zijn zichtbaar voor bezoekers van je profiel en in Openup (Openbare doelen zijn zichtbaar in Open-up nadat je minimaal 1 levensles hebt toegevoegd)."
         publicLabelYes.innerHTML = "Openbaar"
         publicLabelNo.innerHTML = "Prive"

         // Examples of goals 
         db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
                 querySnapshot.forEach(doc=> {
                         const doel = doc.data().Levensvraag

                         const option = document.createElement("option")

                         option.innerHTML = doel

                         vraagInspirationSelect.appendChild(option)


                 })
         })

          // Pre-check public/private
          publicInputYes.checked = true

        
        const button = document.createElement("button");
                button.setAttribute("onclick", "startTocht()");
                button.setAttribute("class", "button-algemeen");

                vraagH3.innerHTML = "Wat is je doel?"
                vraagInspirationTitel.innerHTML = "Voorbeelden van doelen"
                beschrijvingH3.innerHTML = "Geef een korte omschrijving van je doel"

                button.innerHTML = "Opslaan"

                DOM.appendChild(vraagH3)
                DOM.appendChild(vraagSelect)
                DOM.appendChild(vraagInspirationDiv)
                vraagInspirationDiv.appendChild(vraagInspirationTitel)
                vraagInspirationDiv.appendChild(vraagInspirationSelect)
                DOM.appendChild(beschrijvingH3)
                DOM.appendChild(beschrijvingSelect)
                DOM.appendChild(publicDiv)
                publicDiv.appendChild(publicP)
                publicDiv.appendChild(publicExplaination)
                publicDiv.appendChild(publicForm)
                publicForm.appendChild(publicInputYes)
                publicForm.appendChild(publicLabelYes)
                publicForm.appendChild(publicInputNo)
                publicForm.appendChild(publicLabelNo)
                DOM.appendChild(button)     
};

//Input nieuwe levensvraag wegschrijven naar database
function startTocht(){

        // Gebruikersnaam achterhalen
        auth.onAuthStateChanged(User =>{
                const userRef = db.collection("Vitaminders").doc(User.uid);
                  userRef.get().then(function(doc) {
                    if (doc.exists) {
                      Gnaam = doc.data().Gebruikersnaam;

        const inputDoel = document.getElementById("ontwikkelDoel").value 
        const omschrijving = document.getElementById("levensvraag-beschrijving").value

        const form = document.getElementById("public-lifequestion")

        const InputArray = Array.from(form.getElementsByTagName("input"))
        
        InputArray.forEach(arr => {

                if (arr.checked == true){            
              
       db.collection('Vitaminders').doc(User.uid).collection("Levensvragen").doc().set({
                ID: idClean,
                Levensvraag: idClean + inputDoel,
                LevensvraagClean: inputDoel,
                Levenslessen: [],
                Gebruikersnaam: Gnaam,
                Openbaar: arr.id,
                Omschrijving: omschrijving,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                
        }).then(()=>{
                location.reload();
                                                })
                                        }
                                })
                        }
                })    
        })
};

// Knop "Nieuwe levenvraag" verbergen voor profielbezoekers
auth.onAuthStateChanged(User =>{

        const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
              GBnaam = doc.data().Gebruikersnaam;

             const naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
             const naam1 = naamhtml.replace('.html', '')
             const naam2 = naam1.replace('%20',' ')
             const naam = naam2.replace('%20',' ')

        if(GBnaam != naam){
                const nieuweKT = document.querySelectorAll(".button-karakter");

                nieuweKT.forEach(KT => {

                KT.style.display = "none"

                        })
                }
        })
})




//Levenslessen
        const DOMlearnings = document.getElementById("learnings");  

        // Instruction if no learnings
        const instructionDiv = document.createElement("div")
                        instructionDiv.setAttribute("id", "instruction-div-ontwikkeling")
                const instructionImg = document.createElement("img")
                const instructionH4 = document.createElement("h4")
                const instructionP = document.createElement("p")

                instructionH4.innerHTML = "Je hebt nog niets over jezelf geleerd in je Digimind"
                instructionP.innerHTML = "Je kunt dingen over jezelf leren in:<br><br>- <a href='../inspiratie.html'>Inspiratie</a><br><br>- <a href='../tools.html'>Tools</a><br><br>"

                instructionP.addEventListener("click", () => {
                        const levensvragenTab = document.getElementById("levenvragen-tab")
                        levensvragenTab.click()
                });

                instructionP.style.cursor = "pointer"

                instructionImg.src = "../images/menu-karakter.png"

                DOMlearnings.appendChild(instructionDiv)
                instructionDiv.appendChild(instructionH4)
                instructionDiv.appendChild(instructionImg)
                instructionDiv.appendChild(instructionP)


                        db.collectionGroup('Levenslessen').where('Gebruikersnaam', '==', naam )
                            .get()
                            .then(function(querySnapshot) {   

                            querySnapshot.forEach(function(doc1) {

                                instructionDiv.style.display = "none"

                                const auteur = doc1.data().Auteur;
                                const time = doc1.data().Timestamp;
                                const learn = doc1.data().Levensles;
                                const titelLearn = doc1.data().Titel;
                                const type = doc1.data().Type
                               
                                const badge = document.createElement("div");
                                        badge.setAttribute("class", "badge")
                                        badge.setAttribute("data-lesson", learn)
                                const bron = document.createElement("p")
                                        bron.setAttribute("class", "dank-meta")
                                const methode = document.createElement("p");
                                        methode.setAttribute("class", "dank-meta")
                                const auteurP = document.createElement("p");
                                        auteurP.setAttribute("class", "dank-meta")
                                const titel = document.createElement("p");
                                        titel.setAttribute("class", "dank-meta")
                                const timeP = document.createElement("p");
                                        timeP.setAttribute("class", "dank-meta")
                                const typeP = document.createElement("p")
                                        typeP.setAttribute("class", "dank-meta")
                                const learnDiv = document.createElement("div")
                                        learnDiv.setAttribute("class", "learn")
                                const levensles = document.createElement("h3");
                                const editDiv = document.createElement("div")
                                editDiv.setAttribute("class", "edit-div")
                            const edit = document.createElement("div")
                                edit.setAttribute("class", "edit-levensvraag")
                                edit.setAttribute("onclick", "editLessons(this)")
                                edit.setAttribute("data-levensles", learn)

                                edit.innerHTML = '<img class="edit-icon" src="../images/edit-icon.png" alt="edit icon" width="20px"> ' 

                                edit.style.display = "block"

                                if(auteur != undefined){

                                        db.collection("Vitaminders").where("Gebruikersnaam", "==", auteur).get()
                                                .then(querySnapshot => {
                                                querySnapshot.forEach(doc1 => {
                                        const ID = doc1.data().ID
                                        const auteurClean = auteur.replace(ID, "")

                        auteurP.innerHTML = "Geïnspireerd door: " + `<u>${auteurClean}</u>`;

                                auteurP.addEventListener("click", () => {
                                        window.open("../Vitaminders/" + auteur + ".html", "_self");
                                })
                                })
                        })

                        };

                        if(titelLearn != undefined){

                        db.collection("Artikelen").where("Titel", "==", titelLearn).get().then(querySnapshot => {
                                querySnapshot.forEach(doc => {
                                        const ID = doc.data().ID

                                        const titelLearnClean = titelLearn.replace(ID, "")

                        titel.innerHTML = "In: " + `<u>${titelLearnClean}</u>`;

                                titel.addEventListener("click", () => {
                                        window.open("../Artikelen/" + titelLearn + ".html", "_self");
                                        })
                                })
                        })
                };

                        levensles.innerHTML = learn;
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        timeP.innerHTML = "Op: " + time.toDate().toLocaleDateString("nl-NL", options);
                        typeP.innerHTML = type

                         //Hide edit Icons
                // For non auth
                auth.onAuthStateChanged(User =>{
                        if(User){
                          const userRef = db.collection("Vitaminders").doc(User.uid);
                          userRef.get().then(function(doc) {
                            if (doc.exists) {
                              const auth = doc.data().Gebruikersnaam;
        
                              if(naam != auth){
                                editDiv.style.display = "none"
                                                }
                                        }
                                })
                        }
                });

                // For visitor
                auth.onAuthStateChanged(User =>{
                        if(!User){
                                editDiv.style.display = "none"
                        }
                });
            

                // Hide lessons form private goals
                db.collectionGroup("Levensvragen").where("Levenslessen", "array-contains", learn).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                const private = doc.data().Openbaar

                                if(private == "Nee"){
                                        // For non auth
                                        auth.onAuthStateChanged(User =>{
                                                const userRef = db.collection("Vitaminders").doc(User.uid);
                                                userRef.get().then(function(doc) {
                                                const auth = doc.data().Gebruikersnaam;
                                
                                                if(naam != auth){
                                                        badge.style.display = "none"
                                                                        }
                                                        })
                                        });

                                        // For visitor
                                        auth.onAuthStateChanged(User =>{
                                                if(!User){
                                                        badge.style.display = "none"
                                                }
                                        });
                                }

                        })
                });

                        DOMlearnings.appendChild(badge)
                        badge.appendChild(editDiv)
                        editDiv.appendChild(edit)
                        badge.appendChild(levensles)
                        badge.appendChild(auteurP)
                        badge.appendChild(titel)
                        badge.appendChild(timeP)
                        badge.appendChild(typeP)
                      
                })
}); 


// Favorieten

        // Favorieten Inspiratie

db.collectionGroup("Favorieten").where("Gebruikersnaam", "==", naam).where("Type", "==", "Inspiratie").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
                const titel = doc.data().Titel;
                const auteur = doc.data().Auteur;
                const datum = doc.data().Timestamp;
                // const thema = doc.data().Thema;

                db.collection("Vitaminders").where("Gebruikersnaam", "==", auteur).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {

                                const naamClean = doc.data().GebruikersnaamClean

                        })
                })

        const DOM = document.getElementById("favoInspiratie");

        const div = document.createElement("div");
                div.setAttribute("class", "favoInspDiv")
        const titelH2 = document.createElement("h2");
        const metaAut = document.createElement("p");
        const metaDatum = document.createElement("p");
        const metaThema = document.createElement("p");

        titelH2.innerHTML = titel;
                titelH2.addEventListener("click", () => {
                        window.open("../Artikelen/" + titel + ".html", "_self")
                })
        metaAut.innerHTML = "Geschreven door " + `<u>${auteur}</u>`;
                metaAut.addEventListener("click", () => {
                        window.open("../Vitaminders/" + auteur + ".html", "_self")
                })
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        metaDatum.innerHTML = "Op: " + datum.toDate().toLocaleDateString("nl-NL", options);
        // metaThema.innerHTML = thema;

        DOM.appendChild(div);
        div.appendChild(titelH2);
        div.appendChild(metaAut);
        div.appendChild(metaDatum);
        div.appendChild(metaThema);

        })
})

//Favorieten Coaches
function favCoach(){
const favCoachDOM = document.getElementById("favoCoach")

// No favorite coaches yet
const instructionDiv = document.createElement("div")
instructionDiv.setAttribute("id", "instruction-div-fav-coaches")
const instructionImg = document.createElement("img")
const instructionH4 = document.createElement("h4")
const instructionP = document.createElement("p")

instructionH4.innerHTML = "Je hebt nog geen favoriete coaches"
instructionP.innerHTML = "Bekijk onze coaches in actie:<br><br>- <a href='../inspiratie.html'>Inspiratie</a><br><br>- <a href='../tools.html'>Tools</a><br><br>"
                

instructionP.addEventListener("click", () => {
const levensvragenTab = document.getElementById("levenvragen-tab")
levensvragenTab.click()
});

instructionP.style.cursor = "pointer"

instructionImg.src = "../images/menu-doelen.png"

favCoachDOM.appendChild(instructionDiv)
instructionDiv.appendChild(instructionH4)
instructionDiv.appendChild(instructionImg)
instructionDiv.appendChild(instructionP)

db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                instructionDiv.style.display = "none"

                const followers = doc.data().FavCoaches

                if (followers == undefined || followers.length == 0){
                        instructionDiv.style.display = "flex"
                };

                followers.forEach(coach => {
                        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
                                querySnapshot.forEach(doc1 => {

                                        const profilePicture = doc1.data().Profielfoto
                                        const coachName = doc1.data().GebruikersnaamClean

                                        const fotoDiv = document.createElement("div")
                                                fotoDiv.setAttribute("class", "favCoachDiv")
                                        const fotoImg = document.createElement("img")
                                        const name = document.createElement("p")

                                        fotoImg.src = profilePicture
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

        })
});
}; favCoach();


// Follow coach
        // Follow button hidden on non-coach Digimind
        const followButton = document.getElementById("follow-button-digimind")

        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const usertype = doc.data().Usertype

                        if(usertype != "Coach"){
                                followButton.style.display = "none"
                        }

                })
        });

        // Follow or unfollow
        auth.onAuthStateChanged(User =>{
                if(User){
        db.collection("Vitaminders").doc(User.uid).get().then(doc =>{

                        const followers = doc.data().FavCoaches
        
                        followersArray = Array.from(followers)
        
                        if(followersArray.includes(naam)){
                                const button = document.getElementById("follow-button-digimind")
        
                                button.innerHTML = "ONTVOLGEN"
                                button.setAttribute("onclick", "unfollow()")

                        }   
                })
        }
});
        // Follow coach
        function follow(){

                auth.onAuthStateChanged(User =>{
                        if(User){
                                db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                                        const gebruikersnaamCleanFollower = doc.data().GebruikersnaamClean
                                
                                db.collection("Vitaminders").doc(User.uid).update({
                                FavCoaches: firebase.firestore.FieldValue.arrayUnion(naam)
                                }).then(() => {

                                        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                                                querySnapshot.forEach(doc1 => {

                                                        const email = doc1.data().Email
                                                        const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                                                        const gebruikersnaam = doc1.data().Gebruikersnaam
                                         

                                        db.collection("Mail").doc().set({
                                                to: email,
                                                cc: "info@vitaminds.nu",
                                            message: {
                                            subject: `Nieuwe volger op Vitaminds`,
                                            html: `Hallo, ${gebruikersnaamClean}</br></br>
                                                
                                                ${gebruikersnaamCleanFollower} volgt jouw nu op Vitaminds.</br></br>
                                            
                                                Vriendelijke groet, </br></br>
                                                Het Vitaminds Team </br></br>
                                                <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                                            Gebruikersnaam: gebruikersnaam
                                            }
                                                    
                                            }).catch((err) => {
                                                console.log(err)
                                            })
                                                })
                                        })
                                });
                        });

                                const button = document.getElementById("follow-button-digimind")
                                button.innerHTML = "VOLGEND"
                        }
                })
        };

        // Unfollow coach
        function unfollow(){

                auth.onAuthStateChanged(User =>{
                        if(User){
                                db.collection("Vitaminders").doc(User.uid).update({
                                FavCoaches: firebase.firestore.FieldValue.arrayRemove(naam)
                                }); 

                                const button = document.getElementById("follow-button-digimind")
                                button.innerHTML = "ONTVOLGD"
                        }
                })
        };

// Tools

        // Check in

        const goalSelect = document.getElementById("check-in-select-goals")

        db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const goal = doc.data().LevensvraagClean

                        const option = document.createElement("option")

                        option.innerHTML = goal

                        goalSelect.appendChild(option)

                })
        });

        function activateCheckIn(){

                // Filtered goal
                const goalOptionDiv = document.getElementById("check-in-select-goals")

                const goalSelect = goalOptionDiv.options
                const goalOption = goalSelect[goalSelect.selectedIndex].innerHTML;

                // Filtered frequence
                // const freqOptionDiv = document.getElementById("check-in-select-frequence")

                // const freqSelect = freqOptionDiv.options
                // const freqOption = freqSelect[freqSelect.selectedIndex].innerHTML;

                db.collection("Practice").doc().set({
                        Gebruikersnaam: naam,
                        Levensvraag: goalOption,
                        Practice: "Check-in",
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                }).then(() => {
                        const activateNotice = document.getElementById("activate-notice")

                        activateNotice.innerHTML = `Check in geactiveerd voor ${goalOption}`
                        activateNotice.style.display = "block"
                }).then(() => {
                        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                                querySnapshot.forEach(doc => {

                                        db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", goalOption).get().then(querySnapshot => {
                                                querySnapshot.forEach(doc1 => {
                
                                                        const levensvraag = doc1.data().Levensvraag

                                        db.collection("Vitaminders").doc(doc.id).collection("Levenslessen").doc().set({
                                                Type: "Tool: Check in",
                                                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                                Gebruikersnaam: naam,
                                                Levensvraag: levensvraag,
                                                Levensles: "Tool geactiveerd: Check in"
                                                        })
                                                })
                                        })
                                });
                        });
                }).then(() => {
                        db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", goalOption).get().then(querySnapshot => {
                                querySnapshot.forEach(doc => {

                                        const levensvraag = doc.data().Levensvraag

                        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                                querySnapshot.forEach(doc1 => {
                        db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraag).get().then(querySnapshot => {
                                querySnapshot.forEach(doc2 => {

                                        db.collection("Vitaminders").doc(doc1.id).collection("Levensvragen").doc(doc2.id).update({
                                                Levenslessen: firebase.firestore.FieldValue.arrayUnion("Tool geactiveerd: Check in")
                                                                });
                                                        })
                                                });
                                        })
                                });
                        })
                })
        })
};

// Display activated goals

const activeGoalsDiv = document.getElementById("activated-goals")

db.collectionGroup("Levensvragen").where("Levenslessen", "array-contains", "Tool geactiveerd: Check in").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                const levensvragen = doc.data().LevensvraagClean

                                const activeGoalsH3 = document.createElement("h3")
                                const activeGoalP = document.createElement("p")

                                activeGoalsH3.innerHTML = "Geactiveerde doelen"
                                activeGoalP.innerHTML = levensvragen

                                activeGoalsDiv.appendChild(activeGoalsH3)
                                activeGoalsDiv.appendChild(activeGoalP)

        })
});

// Hide tool setting for non-auth en visitor

        // Non-auth
        auth.onAuthStateChanged(User =>{
                if (User){
                    let docRef = db.collection("Vitaminders").doc(User.uid);
                        docRef.get().then(function(doc){
                            const coachNaam = doc.data().Gebruikersnaam;
            
                            const settingDiv = document.getElementById("tool-settings")
                            const activeDiv = document.getElementById("activate-div")
                            const activatedDiv = document.getElementById("activated-goals")
                    
                            if(naam != coachNaam){
                                   
                                settingDiv.style.display = "none"
                                activeDiv.style.display = "none"
                                activatedDiv.style.display = "none"
                           
                            }      
                    })
                }
            });

            // Visitor
        auth.onAuthStateChanged(User =>{
                if (User){
                        console.log("Auth ingelogd")
                } else {
        
                        const settingDiv = document.getElementById("tool-settings")
                        const activeDiv = document.getElementById("activate-div")
                        const activatedDiv = document.getElementById("activated-goals")
                                
                        settingDiv.style.display = "none"
                        activeDiv.style.display = "none"
                        activatedDiv.style.display = "none"   
                }
        });
        
      
        