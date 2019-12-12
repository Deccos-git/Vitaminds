// Titel pagina achterhalen
titelhtml = location.pathname.replace(/^.*[\\\/]/, '')
titel1 = titelhtml.replace('.html', '')
titel2 = titel1.replace('%20',' '),
titel3 = titel2.replace('%20',' ')
titel4 = titel3.replace('%20',' ')
titel5 = titel4.replace('%20',' ')
titel6 = titel4.replace('%20',' ')
titel = titel6.replace('%20',' ')

console.log(titel)
//OpenUps inladen in pagina Kernwaarden
db.collectionGroup("Karakter").where("Thema", "==", titel).orderBy("Inspirerend", "desc").get()
    .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc1) {

    const GBnaam = doc1.data().Gebruikersnaam;
    const auteur = doc1.data().Auteur;
    const time = doc1.data().Timestamp;
    const learn = doc1.data().Learning;
    const titelLearn = doc1.data().Titel;
    const GBlink = "Gedeeld door " + `<a href = "../../Vitaminders/${GBnaam}.html">${GBnaam}</a>`
    const auteurLink =`<a href = "../../Vitaminders/${auteur}.html">${auteur}</a>`
    const titelLink = `<a href = "../../Artikelen/${titelLearn}.html">${titelLearn}</a>`
    const counter = doc1.data().Inspirerend;

    // Waar de OpenUps komt te staan in de DOM
    const openUpDiv = document.getElementById("gedeeld");

    // De nieuwe HTML-elementen en classes
    const openUpDivNieuw = document.createElement("div");
        openUpDivNieuw.setAttribute("class", "OUDiv");
    const openUpAuteur =  document.createElement("p");
        openUpAuteur.setAttribute("class", "OUAuteur");
    const leraar =  document.createElement("p");
        leraar.setAttribute("class", "OUAuteur");
    const openUpTime = document.createElement("p");
        openUpTime.setAttribute("class", "OUTime");
    const openUpBody = document.createElement("p");
        openUpBody.setAttribute("class", "OUBody");
    const openUpCount = document.createElement("p");
        openUpCount.setAttribute("class", "counter")
    const openUpInteract = document.createElement("div");
        openUpInteract.setAttribute("class", "OUInteract");
    const openUpComment = document.createElement("p");
        openUpComment.setAttribute("onclick", "comment()");
    const openUpInspireer = document.createElement("p");
        openUpInspireer.setAttribute("data-naam", GBnaam);
    const openUpPlus = document.createElement("p");
        openUpPlus.setAttribute("class", "extraInfo");
    const update = document.createElement("div");
        update.setAttribute("class", "updateOO");
    const updateText = document.createElement("p");
        updateText.setAttribute("class", "updateText");

       //Geinspireerd naar auteur learning schrijven
       openUpInspireer.addEventListener('click', () => {
        //Geinspireerd naar Vitaminders schrijven
        const naam = openUpInspireer.dataset.naam;
        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
            querySnapshot.forEach(doc2 =>{
                db.collection("Vitaminders").doc(doc2.id).update({
                    Inspiratiepunten: firebase.firestore.FieldValue.increment(1)
                })
            })
        })
        // Geinspireerd naar Learning schrijven
        db.collectionGroup("Karakter").where("Learning", "==", ).doc(doc.id)
            .update({
                Inspirerend: firebase.firestore.FieldValue.increment(1)
            })
             // Show het bedankje
             update.style.display = "block"
        })

    // De OpenUp eigenschappen in de nieuwe HTML elementen zetten
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    openUpAuteur.innerHTML = GBlink + " op " + time.toDate().toLocaleDateString("nl-NL", options);
    openUpBody.innerHTML = learn;
    openUpInspireer.innerHTML = "Inspirerend!"
    openUpCount.innerHTML = counter;
    openUpPlus.innerHTML = "+";
    const naam = openUpInspireer.dataset.naam;
    updateText.innerHTML = "Bedankt! " + naam + " heeft je inspiratiepunt ontvangen."
    leraar.innerHTML = "Geinspireerd door " + auteurLink + " in " + titelLink

    // De nieuwe HTML elementen vastzetten aan de DOM
    openUpDiv.appendChild(openUpDivNieuw);
    openUpDivNieuw.appendChild(openUpAuteur);
    openUpDivNieuw.appendChild(leraar)
    openUpDivNieuw.appendChild(openUpBody);
    openUpDivNieuw.appendChild(openUpInteract);
    openUpInteract.appendChild(openUpCount);
    openUpInteract.appendChild(openUpInspireer);
    openUpInteract.appendChild(openUpComment); 
    openUpInteract.appendChild(openUpPlus); 
    openUpDivNieuw.appendChild(update);
    update.appendChild(updateText);
    })
})

// naam van auth inladen
  auth.onAuthStateChanged(User =>{
      const naam = document.querySelectorAll("[data-selector=gebruikersnaam]")
      const useRef = db.collection("Vitaminders").doc(User.uid);
  useRef.get().then(function(doc) {
      if (doc.exists) {
        naam.forEach(node => {
            node.textContent = " " + doc.data().Gebruikersnaam;
        });
      } else {
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  })
  })



 
  
