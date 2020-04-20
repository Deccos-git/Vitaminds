
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

 function contactCH(elem){

        // elem.style.backgroundColor = "#49beb7"
        // elem.style.color = "#fff"

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

function klikavontuur(){
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

function klikkarakter(){
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

function klikdagelijks(){
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

function klikFavInspiratie(){
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

function klikFavCoaches(){
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

// Tools menu

function artikel(){
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

  // Naam uit URL halen
const naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
const naam1 = naamhtml.replace('.html', '')
const naam2 = naam1.replace('%20',' ')
const naam = naam2.replace('%20',' ')
  

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

                const toolsMenu = document.getElementById("tools-menu")
                const activeDiv = document.getElementById("active-div")
                const notifications = document.getElementById("profile-notifications")
             
                if(naam != coachNaam){
                    activeDiv.style.display = "none"
                    toolsMenu.style.display = "none"
                    notifications.style.display = "none"
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

                 // Trophies 
                 const trophies = document.getElementById("trophies-digimind").getElementsByTagName("img")

                 function trophiesRewarded(a,b){
                 if(inspirationPointsArray.length >= b){
                         trophies[a].src = `../images/Trophies/${b}.png`
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

                        console.log("geladen")
                        db.collection("Vitaminders").doc(doc.id).update({
                                Pageviews: firebase.firestore.FieldValue.increment(1)
                        })

                })
        })
});


// // Hide profile-elements for visiter
auth.onAuthStateChanged(User =>{
        if (!User){
                    const toolsMenu = document.getElementById("tools-menu")
                    const activeDiv = document.getElementById("active-div")
                    const notifications = document.getElementById("profile-notifications")
    
                        editProfile.style.display = "none"
                        activeDiv.style.display = "none"
                        toolsMenu.style.display = "none"
                        notifications.style.display = "none"
        }
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

                        notificationsTitleH4.innerHTML = `<a href="../Vitaminders/${coach}.html"><u>${coach}</u></a> heeft gereageerd op <a href="../Open/${levensvraag}.html"><u>${levensvraag}</u></a>`
                        reactieP.innerHTML = `"${reactie}"`
                        reactieP.addEventListener("click", () => {
                                window.open("../Open/" + levensvraag + ".html" + "#reacties-overview", "_self")
                        })
                        h3.innerHTML = 'Je hebt een nieuwe reactie ontvangen op je levensvraag'
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);

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
        db.collectionGroup("Inspiration").where("User", "==", auth).orderBy("Timestamp", "desc").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                        const giver = doc.data().Giver
                        const type = doc.data().Type
                        const action = doc.data().Action
                        const source = doc.data().Source 
                        const lifequestion = doc.data().Lifequestion

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

                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);
                        string.innerHTML = `Je hebt 1 nieuw inspiratiepunt ontvangen!`
                        liGiver.innerHTML = `van <u>${giver}</u>`
                        liGiver.addEventListener("click", () => {
                                window.open("../Vitaminders/" + giver + ".html", "_self");
                        })
                        liType.innerHTML = `op je ${type} ${action}`
                        link.innerHTML = `<u>${lifequestion}</u>`
                        liSource.innerHTML = `in ${source}: ${link.innerHTML}`
                        liSource.addEventListener("click", () => {
                                window.open("../Open/" + lifequestion + ".html" + "#reacties-overview", "_self")
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
               
                exampleP.innerHTML = levensvragen
              
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

        const dbRef = db.collectionGroup("Levenslessen").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
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
        const username = document.getElementsByClassName('welkom')[0];
        const usertype = document.getElementsByClassName('usertype')[0];
        const profielfoto = document.getElementById("profielfoto");
        
        profielfoto.style.backgroundImage =`url('${doc.data().Profielfoto}')` 

        username.innerHTML = doc.data().Gebruikersnaam;
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
                const onlineDiv = document.createElement("div")
                        onlineDiv.setAttribute("class", "item-div")
                const onlineDOM = document.createElement("p")
                const onlineData = document.createElement("h6")
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

                        b.innerHTML = '<img class="edit-icon" src="../Images/aanpassen-donkerblauw.png" alt="edit icon" width="20px"> ' 
                }

                mouse(DOM, editContact)
                mouse(DOMshort, editShort)
                mouse(DOMcoach, editCoach)
                mouse(DOMExperience, editExperience)

                // Contact
                onlineDOM.innerHTML = "Online"
                onlineData.innerHTML = "Begin chat"

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
        dataUndefined(website, websiteDiv, websiteData, `<a href="https://${website}">${website}</a>`, websiteDOM, "Website"  )

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
                DOM.appendChild(onlineDiv)
                onlineDiv.appendChild(onlineDOM)
                onlineDiv.appendChild(onlineData)
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

db.collection("Artikelen").where("Auteur", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
                const titel = doc.data().Titel

                const titelH3 = document.createElement("h3")
                const titelP = document.createElement("p")
                const edit = document.createElement("div")
                edit.setAttribute("class", "edit-levensvraag")
                edit.setAttribute("onclick", "editArticle(this)")

                titelH3.innerHTML = "Inspiratie"
                titelP.innerHTML = `<img src="../images/Article-icon.png" width="30px"><a href="../Artikelen/${titel}.html"><u>${titel}</u></a>`
                edit.innerHTML = '<img class="edit-icon" src="../Images/aanpassen-donkerblauw.png" alt="edit icon" width="20px"> ' 

                innerDivInspiration.addEventListener("mouseover", () => {
                        edit.style.display = "block"
                })
    
                innerDivInspiration.addEventListener("mouseout", () => {
                    edit.style.display = "none"
                })

                DOMcontributions.appendChild(innerDivInspiration)
                innerDivInspiration.appendChild(edit)
                innerDivInspiration.appendChild(titelH3)
                innerDivInspiration.appendChild(titelP)
        })
})

db.collectionGroup("Reactions").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
                const reactie = doc.data().Reactie
                const levensvraag = doc.data().Levensvraag
                const gebruikersnaam = doc.data().Gebruikersnaam
                const vraagsteller = doc.data().Vraagsteller

                const titelH3 = document.createElement("h3")
                const titelP = document.createElement("p")
                const edit = document.createElement("div")
                edit.setAttribute("class", "edit-levensvraag")
                edit.setAttribute("onclick", "editReactions(this)")
                edit.setAttribute("data-gebruikersnaam", gebruikersnaam)
                edit.setAttribute("data-vraagsteller", vraagsteller)

                titelH3.innerHTML = "Reacties op levenvragen"
                titelP.innerHTML = reactie
                edit.innerHTML = '<img class="edit-icon" src="../Images/aanpassen-donkerblauw.png" alt="edit icon" width="20px"> ' 

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
                innerDivReactions.appendChild(edit)
                innerDivReactions.appendChild(titelH3)
                innerDivReactions.appendChild(titelP)
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
            edit.innerHTML = '<img class="edit-icon" src="../Images/aanpassen-donkerblauw.png" alt="edit icon" width="20px"> ' 

            button.addEventListener("click", () => {
                window.open("../Open/" + ID + levensvraag + ".html", "_self")
            })
            
    
            DOM.appendChild(innerDiv)
            innerDiv.appendChild(edit)
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
                    const titel = doc.data().Titel
    
                    const bronDiv = document.createElement("div")
                        bronDiv.setAttribute("class", "bron-div")   
                    const lessen = document.createElement("h4")
                    const titelP = document.createElement("p")
                        titelP.setAttribute("class", "openup-meta")
                    const inspiratorP = document.createElement("p")
                        inspiratorP.setAttribute("class", "openup-meta")
                    
                    lessen.innerHTML ='<img class="menu-icon" src="../Images/menu-karakter.png" alt="menu contact" width="20px"> ' + les
                    inspiratorP.innerHTML = "Geinspïreerd door " + `<u>${inspirator}</u>`
    
                    inspiratorP.addEventListener("click", () => {
                        window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                    })
    
                    titelP.innerHTML = "Geïnspireerd in " + `<u>${titel}</u>`
    
                    titelP.addEventListener("click", () => {
                        window.open("../Artikelen/" + [titel] + ".html", "_self");
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
                beschrijvingSelect.setAttribute("placeholder", "Geef een korte omschrijving");
        
        const button = document.createElement("button");
                button.setAttribute("onclick", "startTocht()");
                button.setAttribute("class", "button-algemeen");

                vraagH3.innerHTML = "Wat is je levensvraag?"
                beschrijvingH3.innerHTML = "Geef een korte omschrijving"

                button.innerHTML = "Ga"

                DOM.appendChild(vraagH3)
                vraagH3.appendChild(vraagSelect)
                DOM.appendChild(beschrijvingH3)
                beschrijvingH3.appendChild(beschrijvingSelect)
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
              
       db.collection('Vitaminders').doc(User.uid).collection("Levensvragen").doc().set({
                ID: idClean,
                Levensvraag: idClean + inputDoel,
                Levenslessen: [],
                Gebruikersnaam: Gnaam,
                Openbaar: "Nee",
                Omschrijving: omschrijving,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                
        }).then(()=>{
                location.reload();
        })
        }
        })    
        })
}

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

                                edit.innerHTML = '<img class="edit-icon" src="../Images/aanpassen-donkerblauw.png" alt="edit icon" width="20px"> ' 

                                badge.addEventListener("mouseover", () => {
                                        edit.style.display = "block"
                                })
                    
                                badge.addEventListener("mouseout", () => {
                                    edit.style.display = "none"
                                })

                        auteurP.innerHTML = "Geïnspireerd door: " + `<u>${auteur}</u>`;

                                auteurP.addEventListener("click", () => {
                                        window.open("../Vitaminders/" + auteur + ".html", "_self");
                                })

                        db.collectionGroup("Levensvragen").where("Titel", "==", titelLearn).get().then(querySnapshot => {
                                querySnapshot.forEach(doc => {
                                        const ID = doc.data().ID

                                        const titelLearnClean = titelLearn.replace(ID, "")

                        titel.innerHTML = "In: " + `<u>${titelLearnClean}</u>`;

                                titel.addEventListener("click", () => {
                                        window.open("../Artikelen/" + titelLearnClean + ".html", "_self");
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




// Favorieten

        // Favorieten Inspiratie

db.collectionGroup("Favorieten").where("Gebruikersnaam", "==", naam).where("Type", "==", "Inspiratie").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
                const titel = doc.data().Titel;
                const auteur = doc.data().Auteur;
                const datum = doc.data().Timestamp;
                // const thema = doc.data().Thema;

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
function nieuwepostsubmit(){
        auth.onAuthStateChanged(User =>{
            if (User){
                let artikelRef = db.collection("Artikelen").doc();
                let docRef = db.collection("Vitaminders").doc(User.uid);
                    docRef.get().then(function(doc){
                        const coachNaam = doc.data().Gebruikersnaam;
    
                const cat = document.getElementById("categorieSelectie");
                const catOpties = cat.options;
                const catSelect = catOpties[catOpties.selectedIndex].value;
                let nieuwePostTitelVar = document.getElementById("nieuwposttitel").value;
                let nieuwePostBodyVar = document.getElementById("postbody").innerHTML;
                
                artikelRef.set({
                    ID: idClean,
                    Titel: idClean + nieuwePostTitelVar,
                    Body: nieuwePostBodyVar,
                    Auteur: coachNaam,
                    Categorien: firebase.firestore.FieldValue.arrayUnion(catSelect),
                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    Type: "Artikel"
                })
                })
            } 
        })
    }
    
    //Teksteditor bij nieuw artikel schrijven
    const style = document.querySelectorAll("button");
    
    for(let st of style){
        st.addEventListener("click", () =>{
        let cmd = st.dataset['command'];
        const test = document.execCommand(cmd, false, null)
    })
    }


