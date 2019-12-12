//Register VM
function register(){
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerWachtwoord').value;
    const gebruikersnaam = document.getElementById('registerGebruikersnaam').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred =>{
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
  
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred =>{
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



