
// Submenu
const avontuur = document.getElementById("mijnKarakterTochten");
const karakter = document.getElementById("karakter");
const dagelijksLeven = document.getElementById("dagelijks");
const coachtools = document.getElementById("coachTools");
const favoInspiratie = document.getElementById("favoInspiratie");
const favoCoach = document.getElementById("favoCoach")

 //Coach menu

 const coachContact = document.getElementById("coach-contact");
 const overMij = document.getElementById("over-mij");
 const mijnCoaching = document.getElementById("mijn-coaching");
 const mijnBijdragen = document.getElementById("mijn-bijdragen");
 const mijnTools = document.getElementById("tools");

 function contactCH(){
         coachContact.style.display = "flex"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
 }

 function overMijCH(){
         overMij.style.display = "flex"
         coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
 }

 function mijnCoachingCH(){
         mijnCoaching.style.display = "flex"
         coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
 }

 function mijnBijdragenCH(){
         mijnBijdragen.style.display = "flex"
         coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnTools.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
 }

 function toolsCH(){
         mijnTools.style.display = "flex"
         coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
 }

 // Vitaminders menu

function klikavontuur(){
        avontuur.style.display = "flex";
        karakter.style.display = "none";
        coachtools.style.display ="none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
};

function klikkarakter(){
        karakter.style.display = "flex";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachtools.style.display ="none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
};

function klikdagelijks(){
        dagelijksLeven.style.display = "flex"
        karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachtools.style.display ="none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
}

function tools(){
        coachtools.style.display ="flex";
        avontuur.style.display = "none";
        karakter.style.display = "none";  
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
}

function klikFavInspiratie(){
        favoInspiratie.style.display = "flex";
        avontuur.style.display = "none";
        karakter.style.display = "none";
        favoCoach.style.display = "none";
        coachtools.style.display = "none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
}

function klikFavCoaches(){
        favoCoach.style.display = "flex";
        avontuur.style.display = "none";
        karakter.style.display = "none";
        favoInspiratie.style.display = "none";
        coachtools.style.display = "none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
}

// Informatie van Vitaminder/Coach inladen vanuit database in pagina

        // Naam uit URL halen
naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
naam1 = naamhtml.replace('.html', '')
naam2 = naam1.replace('%20',' '),
naam = naam2.replace('%20',' ')

        //Gegevens van overeenkomende naan inladen
db.collection('Vitaminders').where('Gebruikersnaam', '==', naam )
    .get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        const username = document.getElementsByClassName('welkom')[0];
        const usertype = document.getElementsByClassName('usertype')[0];
        const bijdrage = document.getElementById("bijdragepunten");


        username.innerHTML = doc.data().Gebruikersnaam;
        usertype.innerHTML = doc.data().Usertype;
        bijdrage.innerHTML = doc.data().Inspiratiepunten;
    })
    })


// Karaktertochten inladen

db.collectionGroup('Ontwikkeling').where('Gebruikersnaam', '==', naam )
    .get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc2) {

        const middel = doc2.data().Middel;
        const goal = doc2.data().Doel;
        const start = doc2.data().Begin;

       
       
        //Waar de ontwikkelDiv onder komen in de DOM
        const HTMLDiv = document.getElementById("ontO");
    
        // De nieuwe HTML-elementen en classes
        const nieuweDiv = document.createElement("div");
                nieuweDiv.setAttribute("class", "ontwikkelDiv");
        const tochtHeader = document.createElement("div")
                tochtHeader.setAttribute("class", "tochtHeader")
        const tochtID = document.createElement("h2");
                tochtID.setAttribute("class", "titelTocht")
        const beginTitel = document.createElement("h3")
                beginTitel.setAttribute("class", "startpunt")
                beginTitel.setAttribute("data-goal", goal);
        const begin = document.createElement("h4");
                begin.setAttribute("class", "beginO");
        const methodeTitel = document.createElement("h3");
                methodeTitel.setAttribute("class", "methodeTitel")
        const middelDiv = document.createElement("div")
                middelDiv.setAttribute("class", "middelDiv")
        const methodeXtra = document.createElement("div");
                methodeXtra.setAttribute("class", "methodeX");
        const methodeExtraP = document.createElement("p");
                methodeExtraP.setAttribute("class", "methodeExtraP");   
        const extraInput = document.createElement("div");
                extraInput.setAttribute("class", "extraInput");
        const doels = document.createElement("h4");
                doels.setAttribute("class", "doelO");
        const select = document.createElement("select");
                select.setAttribute("class", "selectExtra");
        const option = document.createElement("option");
        const option1 = document.createElement("option");
        const buttonDiv = document.createElement("div")
        const button = document.createElement("button");
                button.setAttribute("class", "buttonExtra")

        //De inhoud in de nieuwe HTML-elementen zetten
        methodeTitel.innerHTML = " Mijn thema's"
        tochtID.innerHTML = goal;
        beginTitel.innerHTML = "Mijn startpunt"
        begin.innerHTML = start;
       

        middel.forEach(mid => {

                // Div creeren met de middelen erin
                const methode = document.createElement("div")
                methode.setAttribute("id", "methodeO")
                methode.setAttribute("data-methode", mid)
                const methodeThema = document.createElement("h3")
                const meerDiv = document.createElement("div");
                        meerDiv.setAttribute("class", "meerDiv")
                const meerLeren = document.createElement("p");
                        meerLeren.setAttribute("class", "meerLeren")
                
                methodeThema.innerHTML = mid ;
                meerLeren.innerHTML = "Meer leren";
               

                middelDiv.appendChild(methode)
                methode.appendChild(methodeThema)
                methode.appendChild(meerDiv)
                meerDiv.appendChild(meerLeren)

                // Klikken op methode in Karaktertocht
        meerLeren.addEventListener('click', () => {
                window.open("../onderwerpen/" + [mid] + ".html", "_self");
         })
        })

        methodeExtraP.innerHTML = "Kies nog een thema"
        option.innerHTML = "Dankbaarheid"
        option1.innerHTML = "Positiviteit"
        button.innerHTML = "Selecteer"

        //De HTML-elementen vastmaken aan de DOM
        HTMLDiv.appendChild(nieuweDiv)
        nieuweDiv.appendChild(tochtHeader)
        nieuweDiv.appendChild(tochtID)
        nieuweDiv.appendChild(methodeTitel)
        nieuweDiv.appendChild(methodeXtra)
        methodeXtra.appendChild(methodeExtraP)
        methodeXtra.appendChild(extraInput)
        extraInput.appendChild(select);
        select.appendChild(option)
        select.appendChild(option1)
        extraInput.appendChild(buttonDiv)
        buttonDiv.appendChild(button)
        nieuweDiv.appendChild(middelDiv)
        nieuweDiv.appendChild(beginTitel)
        nieuweDiv.appendChild(begin)
        })
    }).then(()=>{
        
        // Learnings inschrijven in methodes
        const nodeList = document.querySelectorAll("#methodeO");

        nodeList.forEach(node => {

        const thema = node.dataset.methode; 
                
        db.collectionGroup('Karakter').where('Gebruikersnaam', '==', naam ).where('Thema', '==', thema)
            .get()
            .then((querySnapshot) => {
            querySnapshot.forEach((doc3) => {

                const learning = doc3.data().Learning;
                const KTp = document.createElement("li");
                const KTul = document.createElement("ul")
                const KTdiv = document.createElement("div")
                        KTdiv.setAttribute("class", "doel-learning-lijst")
        
                KTp.innerHTML = learning;

                node.appendChild(KTdiv)
                KTdiv.appendChild(KTul)
                KTul.appendChild(KTp) 
                })
                })
        })

}).then(()=>{
                // Keuze uitlezen 
                const button = document.querySelectorAll(".buttonExtra");
                button.forEach(butt =>{

                butt.addEventListener("click", ()=>{

                const keuze = document.querySelectorAll(".selectExtra");

                keuze.forEach(keus =>{

                const keuzeOpties = keus.options;
                const keuzeSelect = keuzeOpties[keuzeOpties.selectedIndex].value;

                // Keuze wegschrijven naar database
                auth.onAuthStateChanged(User =>{
                        const userRef = db.collection("Vitaminders").doc(User.uid);
                                  userRef.get().then(doc => {
                                      naam = doc.data().Gebruikersnaam;

                        const doel = document.querySelectorAll(".startpunt");
                        doel.forEach(D =>{
                                const goalo = D.dataset.goal;
                        
                        db.collectionGroup('Ontwikkeling').where('Gebruikersnaam', '==', naam ).where("Doel", "==", goalo).get().then(querySnapshot =>{
                                querySnapshot.forEach(doc => {

                                        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
                                                querySnapshot.forEach(doc2 => {
                                        
                                                        db.collection("Vitaminders").doc(doc2.id).collection("Ontwikkeling").doc(doc.id).update({
                                                                Middel: firebase.firestore.FieldValue.arrayUnion(keuzeSelect)
                                                        })
                                        
                                        })
                                })
                                })
                        })
                        })
                        })
                        })
                        })
                        })
                        })
});

 
          
// Nieuwe karakter tocht openen na onclick
function nieuweTocht(){

        const DOMdisplay = document.getElementById("nieuweO");

        DOMdisplay.style.display = "flex"


        const DOMdoel = document.getElementById("nieuweO");
       
        const modulesH3 = document.createElement("h3");
        const moduleSelect = document.createElement("select");
                moduleSelect.setAttribute("name", "modules");
                moduleSelect.setAttribute("id", "ontwikkelModule");

        const doelH3 = document.createElement("h3");
        const doelSelect = document.createElement("select");
                doelSelect.setAttribute("name", "ontwikkelDoel");
                doelSelect.setAttribute("id", "ontwikkelDoel");

        const themaH3 = document.createElement("h3");
        const themaSelect = document.createElement("select");
                themaSelect.setAttribute("name", "ontwikkelThema");
                themaSelect.setAttribute("id", "ontwikkelThema");
        
        const beginH3 = document.createElement("H3");
        const beginInput = document.createElement("input");
                beginInput.setAttribute("id", "beginInput");
                beginInput.setAttribute("type", "text");
                beginInput.setAttribute("placeholder", "Hoe gaat het nu?");
        
        const button = document.createElement("button");
                button.setAttribute("onclick", "startTocht()");
                button.setAttribute("class", "button-algemeen");


                modulesH3.innerHTML = "Kies een module"
                
                doelH3.innerHTML = "Kies een doel"
        
                themaH3.innerHTML = "Kies een thema"
               
                beginH3.innerHTML = "Hoe gaat het nu met je?"
                button.innerHTML = "Begin"

                db.collection("Themas").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                                const modules = doc.data().Module;
                                const doelen = doc.data().Doel;
                                const thema = doc.data().Thema;
                                
                                const moduleOption = document.createElement("option");
                                        moduleOption.setAttribute("value", modules);
                                        moduleOption.setAttribute("id", "moduleOption");
                                const doelOption = document.createElement("option");
                                        doelOption.setAttribute("value", doelen);
                                const themaOption = document.createElement("option");
                                        themaOption.setAttribute("value", thema)
                               
                                moduleOption.innerHTML = modules;
                                doelOption.innerHTML = doelen;
                                themaOption.innerHTML = thema;

                                DOMdoel.appendChild(modulesH3)
                                modulesH3.appendChild(moduleSelect) 
                                moduleSelect.appendChild(moduleOption)
                                DOMdoel.appendChild(doelH3)
                                doelH3.appendChild(doelSelect)
                                doelSelect.appendChild(doelOption)
                                DOMdoel.appendChild(themaH3)
                                themaH3.appendChild(themaSelect)
                                themaSelect.appendChild(themaOption)
                                DOMdoel.appendChild(beginH3)
                                beginH3.appendChild(beginInput)
                                DOMdoel.appendChild(button)

                                //Verwijder dubbelen uit options

                                console.log(moduleOption)
                                console.log(doelOption)
                                console.log(themaOption)
                })
                })         

       

};

//Input nieuwe Karaktertocht wegschrijven naar database
function startTocht(){

        // Gebruikersnaam achterhalen
        auth.onAuthStateChanged(User =>{
                const userRef = db.collection("Vitaminders").doc(User.uid);
                  userRef.get().then(function(doc) {
                    if (doc.exists) {
                      Gnaam = doc.data().Gebruikersnaam;

        const inputDoel = document.getElementById("ontwikkelDoel")
                 const doelOpties = inputDoel.options;
                 const doelSelect = doelOpties[doelOpties.selectedIndex].value;

        const inputThema = document.getElementById("ontwikkelThema")
                 const themaOpties = inputThema.options;
                 const themaSelect = themaOpties[themaOpties.selectedIndex].value;

        const inputModule = document.getElementById("ontwikkelModule")
                 const moduleOpties = inputModule.options;
                 const moduleSelect = moduleOpties[moduleOpties.selectedIndex].value;   

        const inputBegin = document.getElementById("beginInput").value;
                
              
       db.collection('Vitaminders').doc(User.uid).collection("Ontwikkeling").doc().set({
                Begin: inputBegin,
                Middel: firebase.firestore.FieldValue.arrayUnion(themaSelect),
                Doel: doelSelect,
                Module: moduleSelect,
                Gebruikersnaam: Gnaam,
                
        }).then(()=>{
                location.reload();
        })
        }
        })    
        })
}

// Nieuwe karaktertocht aanmaken verbergen voor profielbezoekers
auth.onAuthStateChanged(User =>{

       

        const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
              GBnaam = doc.data().Gebruikersnaam;

              naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
              naam1 = naamhtml.replace('.html', '')
              naam2 = naam1.replace('%20',' '),
              naam = naam2.replace('%20',' ')

              console.log(GBnaam)
              console.log(naam)
        if(GBnaam != naam){
                const nieuweKT = document.querySelectorAll(".button-karakter");

                nieuweKT.forEach(KT => {

                KT.style.display = "none"

        })
        }
        })
})




//Karakter

        // Hoofd-element selecteren
        const DOMlearnings = document.getElementById("learnings");
        const DOMnav = document.getElementById("karakterMenu")

        // Menu Karakter
        DOMmenu = document.getElementById("karakter");

        db.collection("Themas").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                        const thema = doc.data().Thema

                       

                        const navDiv = document.createElement("div");
                                navDiv.setAttribute("class", "nav");
                                navDiv.setAttribute("data-thema", thema)
                        const plus = document.createElement("a");
                                plus.setAttribute("href", `onderwerpen/${thema}.html`);
                                plus.setAttribute("class", "extraInfo");
                        const navP = document.createElement("p");
                                navP.setAttribute("class", "karakter-nav-p")

                        navP.innerHTML = thema;
                        plus.innerHTML = "+";

                        DOMnav.appendChild(navDiv);
                        navDiv.appendChild(plus);
                        navDiv.appendChild(navP);
                        
                })
        }).then(()=>{

               

        const navMenu = document.querySelectorAll(".nav");

        navMenu.forEach(nav => {
                const thema1 = nav.dataset.thema

                nav.addEventListener("click", ()=>{

                // Naam uit URL halen
                naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
                naam1 = naamhtml.replace('.html', '')
                naam2 = naam1.replace('%20',' '),
                naam = naam2.replace('%20',' ')

                        db.collectionGroup('Karakter').where('Gebruikersnaam', '==', naam ).where("Thema", "==", thema1)
                            .get()
                            .then(function(querySnapshot) {

                              
                
                            querySnapshot.forEach(function(doc1) {
                
                                const auteur = doc1.data().Auteur;
                                const time = doc1.data().Timestamp;
                                const learn = doc1.data().Learning;
                                const titelLearn = doc1.data().Titel;
                                const thema2 = doc1.data().Thema;
                               
                                const badge = document.createElement("div");
                                        badge.setAttribute("class", "badge")
                                        badge.setAttribute("data-thema", thema2)
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
                                const ele = document.createElement("p");

                        auteurP.innerHTML = "Geïnspireerd door: " + auteur;
                        titel.innerHTML = "In: " + titelLearn;
                        ele.innerHTML = learn;
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        timeP.innerHTML = "Op: " + time.toDate().toLocaleDateString("nl-NL", options);

                        DOMlearnings.appendChild(badge)
                        badge.appendChild(ele)
                        badge.appendChild(auteurP)
                        badge.appendChild(timeP)
                      
                        })
                
                        }).then(()=>{

                     
                                // Remove badges van DOM
                                const badges = document.querySelectorAll(".badge");
                                const DOM = document.getElementById("learnings");

                                badges.forEach(badg => {
                            
                                        const thema2 = badg.dataset.thema
                                        
                                        const alien = (thema2 != thema1)

                                        console.log(badges)
        
                                        if(alien == true){
                                                DOM.removeChild(badg)
                                        }
                                })
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
                const thema = doc.data().Thema;

        const DOM = document.getElementById("favoInspiratieDiv");

        const div = document.createElement("div");
        const titelH2 = document.createElement("h2");
        const metaAut = document.createElement("p");
        const metaDatum = document.createElement("p");
        const metaThema = document.createElement("p");

        titelH2.innerHTML = titel;
        metaAut.innerHTML = auteur;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        metaDatum.innerHTML = "Op: " + datum.toDate().toLocaleDateString("nl-NL", options);
        metaThema.innerHTML = thema;

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

                        console.log(auteur)
        
                const DOM = document.getElementById("favoCoachDiv");
        
                const div = document.createElement("div");
                const titelH2 = document.createElement("h2");
                const metaDatum = document.createElement("p");
        
                titelH2.innerHTML = auteur;
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                metaDatum.innerHTML = "Op: " + datum.toDate().toLocaleDateString("nl-NL", options);
        
                DOM.appendChild(div);
                div.appendChild(titelH2);
                div.appendChild(metaDatum);
        
                })
        })


//Coach deel

       


