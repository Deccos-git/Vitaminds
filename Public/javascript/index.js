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


// Feedback

const welkomAuth = document.getElementById("welkom-auth")

auth.onAuthStateChanged(User =>{
  const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        const Gnaam = doc.data().Gebruikersnaam;
        const id = doc.data().ID
        const naamClean = Gnaam.replace(id, "")

        const welkom = document.createElement("h2")

        welkom.innerHTML = `Houdoe, ${naamClean}`

        welkomAuth.appendChild(welkom)
  

  //Opmerking opvangen
  const buttonReact = document.getElementById("button")
  buttonReact.addEventListener("click", () => {

  const opmerking = document.getElementById("textarea").value
    
  db.collection("Tickets").doc().set({
    Gebruikersnaam: Gnaam,
    GebruikersnaamClean, naamClean,
    Opmerking: opmerking,
    Verwerkt: "Nee",
    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    Type: "Feedback-general"
        }).then(() => {
          location.reload();
        })
      })
    }
  })
});

  // Opmerkingen in DOM zetten
  const DOMreact = document.getElementById("tips-trucs")

  db.collection("Tickets").where("Type", "==", "Feedback-general").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

      const naam = doc.data().GebruikersnaamClean
      const opmerking = doc.data().Opmerking
      const verwerkt = doc.data().Verwerkt


      const reactDiv = document.createElement("div")
        reactDiv.className = "react-div"
      const naamP = document.createElement("h5")
      const opmerkingP = document.createElement("p")
      const verwerktP = document.createElement("h5")

      naamP.innerHTML = "Door: " + naam
      opmerkingP.innerHTML = opmerking
      verwerktP.innerHTML = "Opgelost: " + verwerkt

      if(verwerkt == "Nee"){
        opmerkingP.style.color = "#8e0000"
      } else {
        opmerkingP.style.color = "#0c6665"
      }

      DOMreact.appendChild(reactDiv)
      reactDiv.appendChild(opmerkingP)
      reactDiv.appendChild(naamP)
      reactDiv.appendChild(verwerktP)
    })
  })

