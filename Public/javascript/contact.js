function verzendenCH(){

const input = document.getElementById("inputtextCH").value;
const DOM = document.getElementById("chat");

const textCH = document.createElement("p")
    textCH.setAttribute("class", "opmerkingCH")

    textCH.innerHTML = input

    DOM.appendChild(textCH);

}

function verzendenVM(){

    const input = document.getElementById("inputtextVM").value;
    const DOM = document.getElementById("chat");
    
    const textCH = document.createElement("p")
        textCH.setAttribute("class", "opmerkingVM")
    
        textCH.innerHTML = input
    
        DOM.appendChild(textCH);
    
    }   

//Naam auth inladen

auth.onAuthStateChanged(User =>{

    // Karaktertochten van auth inladen
   const userRef = db.collection("Vitaminders").doc(User.uid)
     userRef.get().then(function(doc2) {
           naam = doc2.data().Gebruikersnaam;

                   // Plek in DOM waar wordt ingeladen
   const DOMnaamVM = document.getElementById("naamVM");

   const naamInsert = DOMnaamVM.innerHTML =naam


                   //Nieuwe node vastzetten aan de Dom
           DOMnaamVM.appendChild(naamInsert);

   })
   })

// Karaktertochten keuze inladen

auth.onAuthStateChanged(User =>{

    // Karaktertochten van auth inladen
   const userRef = db.collection("Vitaminders").doc(User.uid)
     userRef.get().then(function(doc2) {
           naam = doc2.data().Gebruikersnaam;


   userRef.collection("Ontwikkeling").where("Gebruikersnaam", "==", naam)
        .get().then(function (querySnapshot) {
           querySnapshot.forEach(function (doc) {

                   // Plek in DOM waar wordt ingeladen
   const CTDOM = document.getElementById("CTkaraktertocht");


                   // Nieuwe node creeren
   const nieuwTocht = document.createElement("option");
    nieuwTocht.setAttribute("id", "karakterTochtenAuth")

                   //Nieuwe node inhoud geven
           nieuwTocht.innerHTML = doc.data().Doel

                   //Nieuwe node vastzetten aan de Dom
           CTDOM.appendChild(nieuwTocht);

   })
   })
})  
      
})