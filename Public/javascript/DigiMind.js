
// Profiel inhoud
const landing = document.getElementById("landing")
const avontuur = document.getElementById("doelen");
const karakter = document.getElementById("karakter");
const dagelijksLeven = document.getElementById("dagelijks");
const coachtools = document.getElementById("coachTools");
const favoInspiratie = document.getElementById("favoInspiratie");
const favoCoach = document.getElementById("favoCoach")
const doelen = document.getElementById("doelen")
const nieuwArtikel = document.getElementById("artikel")

 //Coach menu
 const coachContact = document.getElementById("coach-contact");
 const overMij = document.getElementById("over-mij");
 const mijnCoaching = document.getElementById("mijn-coaching");
 const mijnBijdragen = document.getElementById("mijn-bijdragen");
 const mijnTools = document.getElementById("tools");

 function contactCH(){
         coachContact.style.display = "flex"
        landing.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
     
 }

 function overMijCH(){
         overMij.style.display = "flex"
         landing.style.display = "none"
         coachContact.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
 }

 function mijnCoachingCH(){
         mijnCoaching.style.display = "flex"
         landing.style.display = "none"
         coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
 }

 function mijnBijdragenCH(){
         mijnBijdragen.style.display = "flex"
         landing.style.display = "none"
         coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnTools.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
 }

 function toolsCH(){
         mijnTools.style.display = "flex"
         landing.style.display = "none"
         coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         karakter.style.display = "none";
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        nieuwArtikel.style.display = "none"
 }

 // Vitaminders menu

function klikavontuur(){
        avontuur.style.display = "flex";
        landing.style.display = "none"
        karakter.style.display = "none";
        coachtools.style.display ="none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         nieuwArtikel.style.display = "none"
};

function klikkarakter(){
        karakter.style.display = "flex";
        avontuur.style.display = "none";
        landing.style.display = "none"
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachtools.style.display ="none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         nieuwArtikel.style.display = "none"
};

function klikdagelijks(){
        dagelijksLeven.style.display = "flex"
        karakter.style.display = "none";
        landing.style.display = "none"
        avontuur.style.display = "none";
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachtools.style.display ="none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         nieuwArtikel.style.display = "none"
}

function tools(){
        coachtools.style.display ="flex";
        avontuur.style.display = "none";
        landing.style.display = "none"
        karakter.style.display = "none";  
        favoInspiratie.style.display = "none";
        favoCoach.style.display = "none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         nieuwArtikel.style.display = "none"
}

function klikFavInspiratie(){
        favoInspiratie.style.display = "block";
        avontuur.style.display = "none";
        landing.style.display = "none"
        karakter.style.display = "none";
        favoCoach.style.display = "none";
        coachtools.style.display = "none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         nieuwArtikel.style.display = "none"
}

function klikFavCoaches(){
        favoCoach.style.display = "block";
        avontuur.style.display = "none";
        landing.style.display = "none"
        karakter.style.display = "none";
        favoInspiratie.style.display = "none";
        coachtools.style.display = "none";
        coachContact.style.display = "none"
         overMij.style.display = "none"
         mijnCoaching.style.display = "none"
         mijnBijdragen.style.display = "none"
         mijnTools.style.display = "none"
         nieuwArtikel.style.display = "none"
}

// Tools menu

function artikel(){
        nieuwArtikel.style.display = "block"
        favoCoach.style.display = "none";
        landing.style.display = "none"
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

  // Naam uit URL halen
  naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
  naam1 = naamhtml.replace('.html', '')
  naam2 = naam1.replace('%20',' '),
  naam = naam2.replace('%20',' ')
  

//Userroll
db.collection('Vitaminders').where('Gebruikersnaam', '==', naam )
    .get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        const usertype = doc.data().Usertype

        const coachMenu = document.getElementById("coach-menu")
        const toolsMenu = document.getElementById("tools-menu")

        console.log(usertype)

        if(usertype == "Vitaminder"){
                coachMenu.style.display = "none"
                toolsMenu.style.display = "none"
        }

        })
})

// Informatie van Vitaminder/Coach inladen vanuit database in pagina

        //Gegevens van overeenkomende naan inladen
db.collection('Vitaminders').where('Gebruikersnaam', '==', naam )
    .get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        const username = document.getElementsByClassName('welkom')[0];
        const usertype = document.getElementsByClassName('usertype')[0];
        const bijdrage = document.getElementById("bijdragepunten");
        const profielfoto = document.getElementById("profielfoto");
        console.log(profielfoto)

        
        profielfoto.style.backgroundImage =`url('${doc.data().Profielfoto}')` 
        console.log(doc.data().Profielfoto)
        username.innerHTML = doc.data().Gebruikersnaam;
        usertype.innerHTML = doc.data().Usertype;
        bijdrage.innerHTML = doc.data().Inspiratiepunten;
    })
    })


// Levensvragen inladen

db.collectionGroup('Levensvragen').where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const levensvraag = doc.data().Levensvraag
            const levenslessen = doc.data().Levenslessen
            const omschrijving = doc.data().Omschrijving
    
            const DOM = document.getElementById("overzichtLevensvragen")
    
            const innerDiv = document.createElement("div")
                innerDiv.setAttribute("class", "openup-div") 
            const authDiv = document.createElement("div")
                authDiv.setAttribute("class", "auth-div")
            const vraagDiv = document.createElement("div") 
                vraagDiv.setAttribute("class", "vraag-div")      
            const vraag = document.createElement("h3")
            const omschrijvingDiv = document.createElement("div")
                omschrijvingDiv.setAttribute("class", "omschrijving-div")
            const omschrijvingP = document.createElement("p")
    
            vraag.innerHTML = levensvraag
            omschrijvingP.innerHTML = omschrijving
            
    
            DOM.appendChild(innerDiv)
            innerDiv.appendChild(authDiv)
            innerDiv.appendChild(vraagDiv)
            vraagDiv.appendChild(vraag)
            vraagDiv.appendChild(omschrijvingDiv)
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
                Levensvraag: inputDoel,
                Levenslessen: [],
                Gebruikersnaam: Gnaam,
                Openbaar: "Ja",
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

              naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
              naam1 = naamhtml.replace('.html', '')
              naam2 = naam1.replace('%20',' '),
              naam = naam2.replace('%20',' ')

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

                // Naam uit URL halen
                naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
                naam1 = naamhtml.replace('.html', '')
                naam2 = naam1.replace('%20',' '),
                naam = naam2.replace('%20',' ')

                        db.collectionGroup('Levenslessen').where('Gebruikersnaam', '==', naam )
                            .get()
                            .then(function(querySnapshot) {    
                
                            querySnapshot.forEach(function(doc1) {
                
                                const auteur = doc1.data().Auteur;
                                const time = doc1.data().Timestamp;
                                const learn = doc1.data().Levensles;
                                const titelLearn = doc1.data().Titel;
                                const thema = doc1.data().Thema;
                               
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
                                const themaP = document.createElement("p")
                                        themaP.setAttribute("class", "levensles-thema")

                        auteurP.innerHTML = "Geïnspireerd door: " + `<u>${auteur}</u>`;
                        titel.innerHTML = "In: " + `<u>${titelLearn}</u>`;
                        levensles.innerHTML = learn;
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        timeP.innerHTML = "Op: " + time.toDate().toLocaleDateString("nl-NL", options);
                        themaP.innerHTML = thema

                        DOMlearnings.appendChild(badge)
                        badge.appendChild(levensles)
                        badge.appendChild(auteurP)
                        badge.appendChild(titel)
                        badge.appendChild(timeP)
                        badge.appendChild(themaP)
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

                        console.log(auteur)
        
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
                    Titel: nieuwePostTitelVar,
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


// Profiel aanpassen

    // Profielfoto
    function showChangeProfilePicture(){
            const profielfotoAanpassenDiv = document.getElementById("profielfoto-aanpassen")
            profielfotoAanpassenDiv.style.display = "block"
    }

    function changeProfilePicture(){
            const uploadProfilePic = document.getElementById("foto-upload-div")
            uploadProfilePic.style.display = "flex"
    }

    function uploadFile(){

        auth.onAuthStateChanged(User =>{
                if (User){
                    db.collection("Vitaminders").doc(User.uid).get().then(doc =>{     
                                    const id = doc.id
    
                        const docRef = db.collection("Vitaminders").doc(id);
                           
    const selectedFile = document.getElementById('foto-upload').files[0];

    const storageRef = firebase.storage().ref("/Profielfotos/" + selectedFile.name);

       const uploadTask = storageRef.put(selectedFile)
       uploadTask.then(() => {
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          docRef.update({
                        Profielfoto: downloadURL
                                                        }) 
                                                })
                                                // .then(()=>{
                                                //         location.reload();
                                                // })       
                                        })
                                })
                        })
                }
        })    
};
