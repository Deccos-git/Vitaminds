// Testing

const welkomAuth = document.getElementById("welkom-auth")

auth.onAuthStateChanged(User =>{
  const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        Gnaam = doc.data().Gebruikersnaam;

        const welkom = document.createElement("h3")

        welkom.innerHTML = `Houdoe, ${Gnaam}`

        welkomAuth.appendChild(welkom)
  

  //Opmerking opvangen
  const buttonReact = document.getElementById("button")
  buttonReact.addEventListener("click", () => {

  const opmerking = document.getElementById("textarea").value
    
  db.collection("Tickets").doc().set({
    Gebruikersnaam: Gnaam,
    Opmerking: opmerking,
    Verwerkt: "Nee"
        }).then(() => {
          location.reload();
        })
      })
    }
  })
});

  // Opmerkingen in DOM zetten
  const DOMreact = document.getElementById("tips-trucs")

  db.collection("Tickets").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

      const naam = doc.data().Gebruikersnaam
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

      DOMreact.appendChild(reactDiv)
      reactDiv.appendChild(opmerkingP)
      reactDiv.appendChild(naamP)
      reactDiv.appendChild(verwerktP)
    })
  })

// Alfa landing

const home = document.getElementById("home");
const modal = document.getElementById("alfa-modal")

if (home != null){
home.addEventListener( "click", () => {
    modal.style.display = "none"
})

};

function buttonBack(){

    const naam = document.getElementById("alfa-naam").value
const email = document.getElementById("alfa-mail").value
const bedankt = document.getElementById("alfa-bedankt")

    console.log("werkt")
db.collection("Alfa").doc().set({
    Naam: naam,
    Email: email
  })

console.log(bedankt)

  bedankt.style.display = "block"

}

