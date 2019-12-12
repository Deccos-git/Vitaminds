//Inlog
function inlogVM(){
  const inlogEmail = document.getElementById("emailVM").value;
  const inlogPassword = document.getElementById("passwordVM").value;
    auth.signInWithEmailAndPassword(inlogEmail, inlogPassword)
}
  

  
    //Ingelogd in main menu
    auth.onAuthStateChanged(User =>{
      const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
        naam = doc.data().Gebruikersnaam;
        window.open("Vitaminders/" + [naam] + ".html", "_self");
      
      })
    });
  
  
    