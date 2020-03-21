
//Ingelogd in main menu
auth.onAuthStateChanged(User =>{
  if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        naam = doc.data().Gebruikersnaam;
  
    document.getElementById("mijnAccount").innerHTML= `<a href = "../Vitaminders/${naam}">${naam}</a>`
      }
    })
  } else {
    console.log("Offline")
  }
})

// naam van auth inladen
// auth.onAuthStateChanged(User =>{
//   if(User){
//   const naam = document.querySelectorAll("[data-selector=gebruikersnaam]")
//   const useRef = db.collection("Vitaminders").doc(User.uid);
// useRef.get().then(function(doc) {
//   if (doc.exists) {
//     naam.forEach(node => {
//         node.textContent = " " + doc.data().Gebruikersnaam;
//     });
//   } else {
//       console.log("No such document!");
//   }
// }).catch(function(error) {
//   console.log("Error getting document:", error);
// })
//   } else {
//     console.log("Offline")
//   }
// })

//Inlog
function inlogVM(){

  const inlogEmail = document.getElementById("emailVM").value;
  const inlogPassword = document.getElementById("passwordVM").value;

    auth.signInWithEmailAndPassword(inlogEmail, inlogPassword).then(() => {
      auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
            if (doc.exists) {
              naam = doc.data().Gebruikersnaam;

              window.open("../Vitaminders/" + [naam] + ".html", "_self");
          }
        })
      }
    })
  })
}
  
//Log out
function logOut(){
  firebase.auth().signOut().then(function() {
      window.location.href = "../index.html"
    }).catch(function(error) {
      console.log(error)
    })
  }

  // Register VM
function register(){
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerWachtwoord').value;
  const gebruikersnaam = document.getElementById('registerGebruikersnaam').value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  
  .then(cred =>{
    db.collection('Vitaminders').doc(cred.user.uid).set({
      Gebruikersnaam: gebruikersnaam,
      Usertype: "Vitaminder",
      Inspiratiepunten: 1,
    })
  })
};

//Register CH
function registerCH(){
  const email = document.getElementById("registerEmailCH").value;
  const password = document.getElementById("registerWachtwoordCH").value;
  const naam = document.getElementById("registerGebruikersnaamCH").value;
  const thema = document.getElementById("DDThema")
  const opties = thema.options
  const keuze = opties[opties.selectedIndex].value;
  const doelgroep = document.getElementById("DDDoelgroep")
  const groep = doelgroep.options
  const selectie = groep[groep.selectedIndex].value;
  const locatie = document.getElementById("locatieCH").value;
  const stijl = document.getElementById("coachStijl").value;
  const omschrijf = document.getElementById("omschrijving").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  
  .then(cred =>{
    db.collection("Vitaminders").doc(cred.user.uid).set({
      Gebruikersnaam: naam,
      Usertype: "Coach",
      CoachCategorien: keuze,
      Doelgroep: selectie,
      Inspiratiepunten: 1,
      Locatie: locatie,
      Coachstijl: stijl,
      Omschrijving: omschrijf
    })
  })
};
