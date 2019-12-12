
//Ingelogd in main menu
auth.onAuthStateChanged(User =>{
  const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        naam = doc.data().Gebruikersnaam;
  
    document.getElementById("mijnAccount").innerHTML= `<a href = "Vitaminders/${naam}.html">${naam}</a>`
  }
})
})


//Log out
function logOut(){
  firebase.auth().signOut().then(function() {
      window.location.href = "../index.html"
    }).catch(function(error) {
      // An error happened.
    })
  }

  function init(){
  }
  window.addEventListener('DOMContentLoaded', init);