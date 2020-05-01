
// Dashboard
const landing = document.getElementById("landing")

// Vitaminders menu
const avontuur = document.getElementById("doelen");
const karakter = document.getElementById("karakter");
const dagelijksLeven = document.getElementById("dagelijks");

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

function dashboard(dashboard){

        // dashboard.style.backgroundColor = "#49beb7"
        // dashboard.style.color = "#fff"

        landing.style.display = "flex"
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
     
 }

 function contactCH(contact){

         coachContact.style.display = "flex"
        landing.style.display = "none"
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
     
 }

 function overMijCH(){
         overMij.style.display = "flex"
         landing.style.display = "none"
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
 }

 function mijnCoachingCH(){
         mijnCoaching.style.display = "flex"
         landing.style.display = "none"
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
 }

 function mijnBijdragenCH(){
         mijnBijdragen.style.display = "flex"
         landing.style.display = "none"
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
 }

 // Vitaminders menu

function klikavontuur(levensvragen){
        avontuur.style.display = "flex";
        landing.style.display = "none"
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
};

function klikkarakter(levenslessen){
        karakter.style.display = "flex";
        avontuur.style.display = "none";
        landing.style.display = "none"
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         nieuwArtikel.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
};

function klikdagelijks(dagelijks){
        dagelijksLeven.style.display = "flex"
        karakter.style.display = "none";
        landing.style.display = "none"
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         nieuwArtikel.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
}

// Tools menu

function artikel(artikel){
        nieuwArtikel.style.display = "flex"
        favoCoach.style.display = "none";
        landing.style.display = "none"
        avontuur.style.display = "none";
        karakter.style.display = "none";
        favoInspiratie.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
}

// Favorieten menu

function klikFavInspiratie(favorietenInspiratie){
        favoInspiratie.style.display = "flex";
        avontuur.style.display = "none";
        landing.style.display = "none"
        karakter.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         nieuwArtikel.style.display = "none"
         video.style.display = "none"
        podcast.style.display = "none"
        dagelijksLeven.style.display = "none"
}

function klikFavCoaches(favorietenCoaches){
        favoCoach.style.display = "flex";
        avontuur.style.display = "none";
        landing.style.display = "none"
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

//User-role
db.collection('Vitaminders').where('Gebruikersnaam', '==', naam )
    .get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        const usertype = doc.data().Usertype

        const coachMenu = document.getElementById("coach-menu")

        if(usertype != "Coach"){
                coachMenu.style.display = "none"
                }
        })
}) 


// Hide profile-elements for visiter
auth.onAuthStateChanged(User =>{
        if (User){

                console.log("Auth ingelogd")
        } else {
                const nieuweKarakterTocht = document.getElementById("nieuweKarakterTocht")
                const toolsMenu = document.getElementById("tools-menu")
                const notifications = document.getElementById("profile-notifications")
                const activeDiv = document.getElementsByClassName("active-div")
                const editDiv = document.getElementsByClassName("edit-div")
                const changePhoto = document.getElementById("profile-picture-outer-div")
             
                    const activeDivArray = Array.from(activeDiv)
                    activeDivArray.forEach(active => {
                        active.style.display = "none"
                    })

                    changePhoto.style.display = "none"
 
                    nieuweKarakterTocht.style.display = "none"
                    toolsMenu.style.display = "none"
                    notifications.style.display = "none"

                    console.log(editDiv)

                   setTimeout(() => {
                        editDiv[0].style.display = "none"
                        editDiv[1].style.display = "none"
                        editDiv[2].style.display = "none"
                        editDiv[3].style.display = "none"
                        editDiv[4].style.display = "none"
                        editDiv[5].style.display = "none"
                        editDiv[6].style.display = "none"
                        editDiv[7].style.display = "none"
                        editDiv[8].style.display = "none"
                        editDiv[9].style.display = "none"
                   }, 2000);             
        }
});

// Admin
auth.onAuthStateChanged(User =>{
        if (User){
            let docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){
                    const admin = doc.data().Admin;

                    const adminIcon = document.getElementById("profile-admin")
                    const writeArticle = document.getElementById("write-article")
                //     if (adminIcon || writeArticle == null){
                //         console.log("Error")
                //     } else {
                  
                    if(admin == "Yes"){
                        adminIcon.style.display = "flex"
                        writeArticle.style.display = "block"
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
                const editDiv = document.getElementsByClassName("edit-div")
                const changePhoto = document.getElementById("profile-picture-outer-div")
        
                if(naam != coachNaam){
                       
                changePhoto.style.display = "none"

                const activeDivArray = Array.from(activeDiv)
                activeDivArray.forEach(active => {
                active.style.display = "none"
                })

                nieuweKarakterTocht.style.display = "none"
                toolsMenu.style.display = "none"
                notifications.style.display = "none"

                setTimeout(() => {
                editDiv[0].style.display = "none"
                editDiv[1].style.display = "none"
                editDiv[2].style.display = "none"
                editDiv[3].style.display = "none"
                editDiv[4].style.display = "none"
                editDiv[5].style.display = "none"
                editDiv[6].style.display = "none"
                editDiv[7].style.display = "none"
                editDiv[8].style.display = "none"
                editDiv[9].style.display = "none"
                }, 2000);    
                }      
        })
    }
});

// Total inspirationpoints in Digimind

const inspirationPointsArray = [];

db.collectionGroup("Inspiration").where("User", "==", naam).get().then(querySnapshot => {
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

// Profile visits
auth.onAuthStateChanged(User =>{
        if (User){
            let docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){
                        const views = doc.data().Pageviews
        
        const DOMvisits = document.getElementById("pageviews")
        if(DOMvisits == null){
                console.log("Error")
        } else {
        const viewsP = document.createElement("p")

        viewsP.innerHTML = `Je profiel is in totaal ${views} keer bekeken`

        DOMvisits.appendChild(viewsP)
                        }
                })
        }
});

document.addEventListener("DOMContentLoaded", () => {
        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        db.collection("Vitaminders").doc(doc.id).update({
                                Pageviews: firebase.firestore.FieldValue.increment(1)
                        })

                })
        })
});


// Notifcations-page

        // Gamefication-notifications
        const lengthArray = [];

        auth.onAuthStateChanged(User =>{
                if(User){
                  const userRef = db.collection("Vitaminders").doc(User.uid);
                  userRef.get().then(function(doc) {
                    if (doc.exists) {
                     const auth = doc.data().Gebruikersnaam;
                     const email = doc.data().Email

        db.collectionGroup("Inspiration").where("User", "==", auth).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                const docLengt = [doc]          
                        objectLength = Object.keys(docLengt).length
                        lengthArray.push(objectLength)

                                        })
                                }).then(() => {
                                        
                                        // Total points in Notifications
                                        const DOM =  document.getElementById("total-inspiration")

                                        if(DOM == null){
                                                console.log("Error")
                                        } else{
                                        const innerDiv = document.createElement("div")
                                                innerDiv.setAttribute("id", "inner-div-gamefication")
                                        const totalPoints = document.createElement("p")
                                        const titel = document.createElement("h3")
                                        
                                        titel.innerHTML = "Totaal aantal inspiratiepunten"

                                        totalPoints.innerHTML = lengthArray.length
                        
                                        DOM.appendChild(innerDiv)
                                        innerDiv.appendChild(titel)
                                        innerDiv.appendChild(totalPoints)

                                          
                                        // Trophies 
                                        const trophies = document.getElementById("trophies").getElementsByTagName("img")

                                        function trophiesRewarded(a,b){
                                        if(lengthArray.length >= b){
                                                trophies[a].src = `images/Trophies/${b}.png`
                                                }  
                                        }

                                        trophiesRewarded(0,1)
                                        trophiesRewarded(1,5)
                                        trophiesRewarded(2,10)
                                        trophiesRewarded(3,20)
                                        trophiesRewarded(4,40)
                                        trophiesRewarded(5,80)
                                        trophiesRewarded(6,160)
                                       
                                        }
                                }) 
                         }
                })
        }
});


        // Reaction-notifications

        const notificationIcon = document.getElementById("profile-notifications")
                if(notificationIcon == null){
                        console.log("Error")
                } else {
                notificationIcon.addEventListener("click", () => {
                        window.open("../notifications.html", "_self")
                })
        }

        auth.onAuthStateChanged(User =>{
                if (User){
                let docRef = db.collection("Vitaminders").doc(User.uid);
                        docRef.get().then(function(doc){
                        const auth = doc.data().Gebruikersnaam;

        db.collectionGroup("Reactions").where("Vraagsteller", "==", auth).orderBy("Timestamp", "desc").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const DOM = document.getElementById("notifications")

                        const coach = doc.data().Gebruikersnaam
                        const levensvraag = doc.data().Levensvraag
                        const reactie = doc.data().Reactie

                        const notificationsTitleDiv = document.createElement("div")
                        notificationsTitleDiv.setAttribute("class", "notification-div-profile")
                        const h3 = document.createElement("h3")
                        const notificationsTitleH4 = document.createElement("h4")
                        const reactieP = document.createElement("p")
                        const dateP = document.createElement("h5")

                        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
                                querySnapshot.forEach(doc1 => {

                                        const coachClean = doc1.data().GebruikersnaamClean

                        db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraag).get().then(querySnapshot => {
                                querySnapshot.forEach(doc2 => {

                                        const levensvraagClean = doc2.data().LevensvraagClean

                        notificationsTitleH4.innerHTML = `<a href="../Vitaminders/${coach}.html"><u>${coachClean}</u></a> heeft gereageerd op <a href="../Open/${levensvraag}.html"><u>${levensvraagClean}</u></a>`
                        reactieP.innerHTML = `"${reactie}"`
                        reactieP.addEventListener("click", () => {
                                window.open("../Open/" + levensvraag + ".html" + "#reacties-overview", "_self")
                        })
                        h3.innerHTML = 'Je hebt een nieuwe reactie ontvangen op je levensvraag'
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
                                                })
                                        })
                                })
                        })
                        DOM.appendChild(notificationsTitleDiv)
                        notificationsTitleDiv.appendChild(h3)
                        notificationsTitleDiv.appendChild(notificationsTitleH4)
                        notificationsTitleDiv.appendChild(reactieP)
                        notificationsTitleDiv.appendChild(dateP)
        
                        })
                }).catch((err) => {
                console.log("Error:" + err)
                })
                })
        }
        })


        // Inspiration-notifications

        auth.onAuthStateChanged(User =>{
                let docRef = db.collection("Vitaminders").doc(User.uid);
                        docRef.get().then(function(doc){
                        const auth = doc.data().Gebruikersnaam;
                        const ID = doc.data().ID
                        const authClean = auth.replace(ID, "")
        db.collectionGroup("Inspiration").where("User", "==", auth).orderBy("Timestamp", "desc").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                        const giver = doc.data().Giver
                        const type = doc.data().Type
                        const source = doc.data().Source 
                        const lifelesson = doc.data().Lifelesson

                        const DOM = document.getElementById("inspiration-notifications")
                        if(DOM == null){
                                console.log("Error")
                        } else {
                        const outerDiv = document.createElement("div")
                                outerDiv.setAttribute("class", "gamefication-outer-div")
                        const dateP = document.createElement("h4")
                        const string = document.createElement("h3")
                        const innerDiv = document.createElement("div")
                                innerDiv.setAttribute("class", "gamefication-inner-div")
                        const ul = document.createElement("ul")
                        const liGiver = document.createElement("li")
                        const liType = document.createElement("li")
                        const liSource = document.createElement("li")
                        const link = document.createElement("h4")

                        db.collection("Vitaminders"). where('Gebruikersnaam', "==", giver).get().then(querySnapshot => {
                                querySnapshot.forEach(doc1 => {

                                        const giverClean = doc1.data().GebruikersnaamClean

                                        console.log(source)

                        db.collection("Artikelen").where("Titel", "==", source).get().then(querySnapshot => {
                                querySnapshot.forEach(doc2 => {

                                        const titelClean = doc2.data().TitelClean

                                        console.log(titelClean)

                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);

                        string.innerHTML = `Je hebt 1 nieuw inspiratiepunt ontvangen!`
                        liGiver.innerHTML = `Van <u>${giverClean}</u>`
                        liGiver.addEventListener("click", () => {
                                window.open("../Vitaminders/" + giver + ".html", "_self");
                        })
                        liType.innerHTML = `Op je ${type} ${lifelesson}`
                        link.innerHTML = `<u>${lifelesson}</u>`
                        liSource.innerHTML = `Bron: ${titelClean}`
                                })
                        })
                    })
                })

                        DOM.appendChild(outerDiv)
                        outerDiv.appendChild(string)
                        outerDiv.appendChild(innerDiv)
                        innerDiv.appendChild(ul)
                        ul.appendChild(liGiver)
                        ul.appendChild(liType)
                        ul.appendChild(liSource)
                        outerDiv.appendChild(dateP)
                                        }
                                })
                        
                        })
                })
        });

// Informatie van Vitaminder/Coach inladen vanuit database in pagina

        // Dashboard inladen\\
                // Levensvragen dashboard
        function levensvragen (){

                DOMdashboard = document.getElementById("digimind-dasboard-outer-div")
                if(DOMdashboard == null){
                        console.log("Error")
                } else {
                const titelDiv = document.createElement("div")
                        titelDiv.setAttribute("class", "dashboard-div")
                const titelEmpty = document.createElement("p")
                        titelEmpty.style.display = "none"
                const titelP = document.createElement("h2")
                const button = document.createElement("button")
                button.className = "dashboard-button"
                const exampleDiv = document.createElement("ul")
                        exampleDiv.setAttribute("id", "dasboard-example-list")

                 button.innerHTML = `Bekijk levensvragen`
                 titelP.innerHTML = "Levensvragen"
                 titelEmpty.innerHTML = `Nog geen levensvragen`

                 DOMdashboard.appendChild(titelDiv)
                titelDiv.appendChild(titelP)
                titelDiv.appendChild(titelEmpty)
               
                db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
                        querySnapshot.forEach(doc =>{
                                const ID = doc.data().ID

                                const levensvraagID = doc.data().Levensvraag
                                const levensvragen = levensvraagID.replace(ID, "")
                
                const exampleP = document.createElement("li")
                const dateP = document.createElement("p")
               
                exampleP.innerHTML = levensvragen
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
              
               titelDiv.appendChild(exampleDiv)
                exampleDiv.appendChild(exampleP)



                                         })       
                                }).catch(error => {
                                        console.log(error)
                        }).then(() => {
                                        titelDiv.appendChild(button)

                                        button.addEventListener("click", () => {
                                        menuElement = document.getElementById("menu-levensvragen")
                                        menuElement.click()
                })
        })
}
} levensvragen()

function levenslessen(){


        // Levenslessen dashboard
        DOMdashboard = document.getElementById("digimind-dasboard-outer-div")

        const titelDiv = document.createElement("div")
                titelDiv.setAttribute("class", "dashboard-div")
        const titelEmpty = document.createElement("h2")
                titelEmpty.style.display = "none"
        const titelP = document.createElement("h2")
        const button = document.createElement("button")
                button.className = "dashboard-button"
        const exampleDiv = document.createElement("ul")
                exampleDiv.setAttribute("id", "dasboard-example-list")

        button.innerHTML = "Bekijk levenslessen"
        titelP.innerHTML = "Levenslessen"
        titelEmpty.innerHTML = `Nog geen levenslessen`

        if(DOMdashboard == null){
                console.log("Error")
        } else {

        DOMdashboard.appendChild(titelDiv)
        titelDiv.appendChild(titelP)
        titelDiv.appendChild(titelEmpty)

       db.collectionGroup("Levenslessen").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
                querySnapshot.forEach(doc =>{
                        const levenslessen = doc.data().Levensles
        
        const exampleP = document.createElement("li")   

        exampleP.innerHTML = levenslessen

        titelDiv.appendChild(exampleDiv)
        exampleDiv.appendChild(exampleP)
        })       
        }).catch(error => {
        console.log(error)
        }).then(() => {

        titelDiv.appendChild(button)

        button.addEventListener("click", () => {
        menuElement = document.getElementById("menu-levenslessen")
        menuElement.click()
                        })
                })
        }
} levenslessen()

        //Gegevens van overeenkomende naan inladen in user-bar
db.collection('Vitaminders').where('Gebruikersnaam', '==', naam )
    .get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

        const userID = doc.data().Gebruikersnaam
        const IDuser = doc.data().ID
        const user = userID.replace(IDuser, "")

        const username = document.getElementsByClassName('welkom')[0];
        const usertype = document.getElementsByClassName('usertype')[0];
        const profielfoto = document.getElementById("profielfoto");
        
        profielfoto.style.backgroundImage =`url('${doc.data().Profielfoto}')` 

        username.innerHTML = user
        usertype.innerHTML = doc.data().Usertype;
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

                function mouse(a,b){
                        a.addEventListener("mouseover", () => {
                                b.style.display = "block"
                        })
        
                        a.addEventListener("mouseout", () => {
                        b.style.display = "none"
                        })

                        b.innerHTML = '<img class="edit-icon" src="../images/aanpassen-donkerblauw.png" alt="edit icon" width="20px"> ' 
                }

                mouse(DOM, editContact)
                mouse(DOMshort, editShort)
                mouse(DOMcoach, editCoach)
                mouse(DOMExperience, editExperience)

                // Contact

                titleH2.innerHTML = "Contact"

                function dataUndefined(a,b,c,d,e,f){
                        e.innerHTML = f
                if(a == undefined){
                        b.style.display = "none"
                        console.log(a + " is undefined")
                } else {
                        c.innerHTML = d
                }
        } 
        dataUndefined(phoneNumber, phoneDiv, phoneData, phoneNumber, phoneDOM, "Bel")
        dataUndefined(website, websiteDiv, websiteData, `<a href="http://${website}" target="_blank">${website}</a>`, websiteDOM, "Website"  )

                // About info
        dataUndefined(city, cityDiv, cityData, city, cityDOM, `<img src="../images/locatie-pin.png" alt="locatie pin" width="25px">`)
        dataUndefined(targetGroup, targetDiv, targetData, targetGroup, targetDOM, "Doelgroep")
        dataUndefined(costs, costsDiv, costsData, costs, costsDOM, "Tarief")
        dataUndefined(style, styleDiv, styleData, style, styleDOM, "Coachingsstijl")
        dataUndefined(approach, approachDiv, approachData, approach, approachDOM, "Methodiek")
        dataUndefined(why, whyDiv, whyData, why, whyDOM, "Motivatie")
        dataUndefined(years, yearsDiv, yearsData, years, yearsDOM, "Aantal jaren ervaring")
        dataUndefined(experience, experienceDiv, experienceData, experience, experienceDOM, "Ervaringen")
        dataUndefined(education, educationDiv, educationData, education, educationDOM, "Opleidingen & certificaten")

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

// My contributions

const DOMcontributions = document.getElementById("my-contributions-outer-div")

const innerDivInspiration = document.createElement("div")
        innerDivInspiration.setAttribute("class", "inspiration-inner-div")

const innerDivReactions = document.createElement("div")
        innerDivReactions.setAttribute("class", "reactions-inner-div")

        const titelH3 = document.createElement("h3")
       
        titelH3.innerHTML = "Inspiratie"

        DOMcontributions.appendChild(innerDivInspiration)
        innerDivInspiration.appendChild(titelH3)

db.collection("Artikelen").where("Auteur", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
                const titel = doc.data().Titel
                const artikelID = doc.data().ID
                const titelClean = titel.replace(artikelID, "")
                
                const titelP = document.createElement("p")
                        titelP.setAttribute("data-titel", titel)
                

               
                titelP.innerHTML = `<a href="../Artikelen/${titel}.html"><u>${titelClean}</u></a>`
                const editDiv = document.createElement("div")
                        editDiv.setAttribute("class", "edit-div")
                const edit = document.createElement("div")
                edit.setAttribute("class", "edit-levensvraag")
                edit.setAttribute("onclick", "editArticle(this)")

                edit.innerHTML = '<img class="edit-icon" src="../images/aanpassen-donkerblauw.png" alt="edit icon" width="20px"> ' 

                innerDivInspiration.addEventListener("mouseover", () => {
                        edit.style.display = "block"
                })
    
                innerDivInspiration.addEventListener("mouseout", () => {
                    edit.style.display = "none"
                })


               
                innerDivInspiration.appendChild(titelP)
                titelP.appendChild(editDiv)
                editDiv.appendChild(edit)
        })
})

db.collectionGroup("Reactions").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
                const reactie = doc.data().Reactie
                const levensvraag = doc.data().Levensvraag
                const gebruikersnaam = doc.data().Gebruikersnaam
                const vraagsteller = doc.data().Vraagsteller

                db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraag).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {

                                const levensvraagID = doc1.data().ID
                                const levensvraagClean = levensvraag.replace(levensvraagID, "")

                const titelH3 = document.createElement("h3")
                const titelP = document.createElement("p")
                const sourceUl = document.createElement("ul")
                const sourceP = document.createElement("li")
                        sourceP.setAttribute("class", "meta-contributions")
                const editDiv = document.createElement("div")
                editDiv.setAttribute("class", "edit-div")
                const edit = document.createElement("div")
                edit.setAttribute("class", "edit-levensvraag")
                edit.setAttribute("onclick", "editReactions(this)")
                edit.setAttribute("data-gebruikersnaam", gebruikersnaam)
                edit.setAttribute("data-vraagsteller", vraagsteller)

                titelH3.innerHTML = "Reacties op levenvragen"
                titelP.innerHTML = reactie
                sourceP.innerHTML = `In de levensvraag <u>${levensvraagClean}</u>`

                sourceP.addEventListener("click", () => {
                        window.open("../Open/" +levensvraag+ ".html", "_self")
                })

                edit.innerHTML = '<img class="edit-icon" src="../images/aanpassen-donkerblauw.png" alt="edit icon" width="20px"> ' 

                titelP.addEventListener("click", ()=> {
                        window.open("../Open/" + levensvraag + ".html", "_self");
                })

                innerDivReactions.addEventListener("mouseover", () => {
                        edit.style.display = "block"
                })
    
                innerDivReactions.addEventListener("mouseout", () => {
                    edit.style.display = "none"
                })

                DOMcontributions.appendChild(innerDivReactions)
                innerDivReactions.appendChild(editDiv)
                editDiv.appendChild(edit)
                innerDivReactions.appendChild(titelH3)
                innerDivReactions.appendChild(titelP)
                innerDivReactions.appendChild(sourceUl)
                sourceUl.appendChild(sourceP)

                        })
                })
        })
})

// Levensvragen inladen

db.collectionGroup('Levensvragen').where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const levenslessen = doc.data().Levenslessen
            const omschrijving = doc.data().Omschrijving
            const ID = doc.data().ID

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
            const omschrijvingDiv = document.createElement("div")
                omschrijvingDiv.setAttribute("class", "omschrijving-div")
            const omschrijvingP = document.createElement("p")
            const button = document.createElement("button")
                button.setAttribute("id", "lifequestions-button")

            innerDiv.addEventListener("mouseover", () => {
                    edit.style.display = "block"
            })

            innerDiv.addEventListener("mouseout", () => {
                edit.style.display = "none"
            })
    
            vraag.innerHTML = levensvraag
            omschrijvingP.innerHTML = omschrijving
            button.innerHTML = "Bekijk levensvraag in open-up"
            edit.innerHTML = '<img class="edit-icon" src="../images/aanpassen-donkerblauw.png" alt="edit icon" width="20px"> ' 

            button.addEventListener("click", () => {
                window.open("../Open/" + ID + levensvraag + ".html", "_self")
            })
            
    
            DOM.appendChild(innerDiv)
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
                        })
                })
            })
        })
    })
 
          
// Nieuwe levensvraag openen na onclick
function nieuweLevensvraag(){

        const DOM = document.getElementById("nieuweO");

        const vraagH3 = document.createElement("h3");
        const vraagSelect = document.createElement("input");
                vraagSelect.setAttribute("id", "ontwikkelDoel");
                vraagSelect.setAttribute("type", "text");
                vraagSelect.setAttribute("placeholder", "Wat is je levensvraag?");

        const beschrijvingH3 =  document.createElement("h4");
        const beschrijvingSelect = document.createElement("textarea");
                beschrijvingSelect.setAttribute("id", "levensvraag-beschrijving");
                beschrijvingSelect.setAttribute("cols", "63")
                beschrijvingSelect.setAttribute("rows", "15")
                beschrijvingSelect.setAttribute("type", "text");
                const placeholder = "Omschrijf je levensvraag. Hoe voel je je op dit moment en hoe zou je je willen voelen?"
                beschrijvingSelect.setAttribute("placeholder", placeholder);

                //Public Yes/No
         const publicDiv = document.createElement("div")
         const publicP = document.createElement("p")
         publicDiv.setAttribute("class", "public-div-lifequestion")
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
 
         publicP.innerHTML = "Levensvraag openbaar of prive?"
         publicLabelYes.innerHTML = "Openbaar"
         publicLabelNo.innerHTML = "Prive"

          // Pre-check public/private
          publicInputYes.checked = true

        
        const button = document.createElement("button");
                button.setAttribute("onclick", "startTocht()");
                button.setAttribute("class", "button-algemeen");

                vraagH3.innerHTML = "Wat is je levensvraag?"
                beschrijvingH3.innerHTML = "Geef een korte omschrijving van je levensvraag"

                button.innerHTML = "Opslaan"

                DOM.appendChild(vraagH3)
                DOM.appendChild(vraagSelect)
                DOM.appendChild(beschrijvingH3)
                beschrijvingH3.appendChild(beschrijvingSelect)
                DOM.appendChild(publicDiv)
                publicDiv.appendChild(publicP)
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

                        db.collectionGroup('Levenslessen').where('Gebruikersnaam', '==', naam )
                            .get()
                            .then(function(querySnapshot) {   

                            querySnapshot.forEach(function(doc1) {

                                const auteur = doc1.data().Auteur;
                                const time = doc1.data().Timestamp;
                                const learn = doc1.data().Levensles;
                                const titelLearn = doc1.data().Titel;

                                db.collection("Vitaminders").where("Gebruikersnaam", "==", auteur).get()
                                        .then(querySnapshot => {
                                        querySnapshot.forEach(doc1 => {
                                const ID = doc1.data().ID
                                const auteurClean = auteur.replace(ID, "")
                               
                                const badge = document.createElement("div");
                                        badge.setAttribute("class", "badge")
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
                                const learnDiv = document.createElement("div")
                                        learnDiv.setAttribute("class", "learn")
                                const levensles = document.createElement("h3");
                                const editDiv = document.createElement("div")
                                editDiv.setAttribute("class", "edit-div")
                            const edit = document.createElement("div")
                                edit.setAttribute("class", "edit-levensvraag")
                                edit.setAttribute("onclick", "editLessons(this)")
                                edit.setAttribute("data-levensles", learn)

                                edit.innerHTML = '<img class="edit-icon" src="../images/aanpassen-donkerblauw.png" alt="edit icon" width="20px"> ' 

                                badge.addEventListener("mouseover", () => {
                                        edit.style.display = "block"
                                })
                    
                                badge.addEventListener("mouseout", () => {
                                    edit.style.display = "none"
                                })

                        auteurP.innerHTML = "Geïnspireerd door: " + `<u>${auteurClean}</u>`;

                                auteurP.addEventListener("click", () => {
                                        window.open("../Vitaminders/" + auteur + ".html", "_self");
                                })

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

                        levensles.innerHTML = learn;
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        timeP.innerHTML = "Op: " + time.toDate().toLocaleDateString("nl-NL", options);

                        DOMlearnings.appendChild(badge)
                        badge.appendChild(editDiv)
                        editDiv.appendChild(edit)
                        badge.appendChild(levensles)
                        badge.appendChild(auteurP)
                        badge.appendChild(titel)
                        badge.appendChild(timeP)
                        })
                })
        })
})  




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
        
        db.collectionGroup("Favorieten").where("Gebruikersnaam", "==", naam).where("Type", "==", "Coach").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                        const auteur = doc.data().Auteur;
                        const datum = doc.data().Timestamp;
        
                const DOM = document.getElementById("favoCoach");
        
                const div = document.createElement("div");
                        div.setAttribute("class", "favoCoachDiv")
                const titelH2 = document.createElement("h2");
                const metaDatum = document.createElement("p");
        
                titelH2.innerHTML = auteur;
                titelH2.addEventListener("click", () => {
                        window.open("../Vitaminders/" + auteur + ".html", "_self")
                })
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                metaDatum.innerHTML = "Op: " + datum.toDate().toLocaleDateString("nl-NL", options);
        
                DOM.appendChild(div);
                div.appendChild(titelH2);
                div.appendChild(metaDatum);
        
                })
        })


//Coach deel
     
//Nieuw artikel schrijven  

        // Themas inladen
const catergory = document.getElementById("categorieSelectie")

db.collection("Themas").get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

                        const themas = doc1.data().Themas

                        themas.forEach(thema => {
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

                                catergory.appendChild(divCat)
                                divCat.appendChild(input)
                                divCat.appendChild(label)
                        })
                })
        })

// Add category

function addCategory(){

        const addCat = document.getElementById("add-category").value
        
        
        db.collection("Themas").doc("CtXRWx6w0hTGrAyfnTd9").update({
                Themas: firebase.firestore.FieldValue.arrayUnion(addCat)
        }).then(()=> {
                nieuwepostsubmit()

        }).then(() => {
                const titel = document.getElementById("nieuwposttitel").value;
                const body = tinymce.get('tiny-mce').getContent()

                localStorage.setItem('Titel', titel);
                localStorage.setItem('Body', body);
                localStorage.setItem('Category', addCat)
        }).then(() => {
                location.reload()
        })
};

        // Artikel opslaan
function nieuwepostsubmit(){
        auth.onAuthStateChanged(User =>{
            if (User){

                let artikelRef = db.collection("Artikelen").doc();
                let docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
                        const coachNaam = doc.data().Gebruikersnaam;
    
                const cat = document.getElementsByClassName("category-input")
                catArray = Array.from(cat)

                catArray.forEach(c => {
                        const check = c.checked

                        if (check == true){
                               const categories = c.value
                 
                let nieuwePostTitelVar = document.getElementById("nieuwposttitel").value;

                let nieuwePostBodyVar = tinyMCE.get('tiny-mce').getContent()

                        const hiddenID = document.getElementById("hidden-ID").innerHTML

                        if (hiddenID == ""){

                                artikelRef.set({
                                    ID: idClean,
                                    Titel: idClean + nieuwePostTitelVar,
                                    TitelClean: nieuwePostTitelVar,
                                    Body: nieuwePostBodyVar,
                                    Auteur: coachNaam,
                                    Categorien: firebase.firestore.FieldValue.arrayUnion(categories),
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "Artikel"
                                })
                                console.log("Opgeslagen")
                        } 

                        db.collection("Artikelen").where("ID", "==", hiddenID).get().then(querySnapshot => {
                                querySnapshot.forEach(doc2 => {
        
                          db.collection("Artikelen").doc(doc2.id).update({
                            ID: hiddenID,
                            Titel: hiddenID + nieuwePostTitelVar,
                            TitelClean: nieuwePostTitelVar,
                            Body: nieuwePostBodyVar,
                            Auteur: coachNaam,
                            Categorien: firebase.firestore.FieldValue.arrayUnion(categories),
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Type: "Artikel"
                        })
        
                        console.log("Geupdate")  
                     })
                    
                        }).then(() => {
                                const saved = document.getElementById("article-saved")
                                saved.innerHTML = "Je artikel is opgeslagen."
                                        // saved.addEventListener("click", () => {
                                        //         window.open("../Artikelen/" + titelClean + ".html", "_self");
                                        // })
                                saved.style.display = "block"
                        }).then(() => {
                        localStorage.clear()
                                                 })
                                        }  
                                })
                        })
                }
        })
    };

    document.addEventListener('readystatechange', event => { 
    
        // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
        if (event.target.readyState === "complete") {

           // Get article out of local storage
           if (localStorage.getItem("Titel") == null){
                console.log("Nothing in storage")
        } else {
        const titelStorage = localStorage.getItem('Titel');
        const bodyStorage = localStorage.getItem('Body');
        const checkedCategory = localStorage.getItem("Category")

        const cate = document.getElementById(checkedCategory)
        // cate.checked = true

        document.getElementById("nieuwposttitel").value = titelStorage
        tinymce.get("tiny-mce").setContent(bodyStorage);
                }
        }
    });
 
    
    //Teksteditor bij nieuw artikel schrijven
//     const style = document.querySelectorAll("button");
    
//     for(let st of style){
//         st.addEventListener("click", () =>{
//         let cmd = st.dataset['command'];
//         const test = document.execCommand(cmd, false, null)
//     })
//     }


