const body = document.getElementsByTagName("body")[0];

//Ingelogd in main menu
auth.onAuthStateChanged(User =>{
  if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
       const naam = doc.data().Gebruikersnaam;
        profilePic = doc.data().Profielfoto
  
    const profilePicture = document.getElementById("profile-picture")
        profilePicture.style.backgroundImage = `url('${profilePic}')`
        profilePicture.setAttribute("class", "login-logout")
      
    const authDiv = document.createElement("div")
        authDiv.setAttribute("id", "menu-auth-div")
    const authName = document.createElement("h5")
        authName.setAttribute("id", "profile-name")
      const authProfile = document.createElement("h5")
        authProfile.setAttribute("id", "auth-profile")
    const authPhoto = document.createElement("div")
        authPhoto.style.backgroundImage = `url('${profilePic}')`
        authPhoto.setAttribute("id", "profile-photo")
        
        authPhoto.addEventListener("click", () => {
            window.open("../Vitaminders/" + [naam] + ".html", "_self");
        })
    
    const logout = document.createElement("h5")
      logout.setAttribute("id", "button-logout")
      logout.setAttribute("onclick", "logOut()")

      profilePicture.addEventListener("click", () => {
        authDiv.style.display = "flex"
      })

    // if(authDiv.style.display == "flex" == true){
    //   console.log("joh")
    // } else {
    //   console.log("moi")
    // }
      
  
    logout.innerHTML = "Log uit"
    authName.innerHTML = `<a href = "../Vitaminders/${naam}">${naam}</a>`
    authProfile.innerHTML = `<a href = "../Vitaminders/${naam}">Mijn Digimind</a>`

    profilePicture.appendChild(authDiv)
    authDiv.appendChild(authPhoto)
    authDiv.appendChild(authName)
    authDiv.appendChild(authProfile)
    authDiv.appendChild(logout)

      }
    })
  } else {
    console.log("Offline")
  }
})


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
const button = document.getElementById("register-button")
if(button != null){

    button.addEventListener("click", () => {
  
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-wachtwoord').value;
  const gebruikersnaam = document.getElementById('register-gebruikersnaam').value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(cred =>{
    db.collection('Vitaminders').doc(cred.user.uid).set({
      Gebruikersnaam: gebruikersnaam,
      Usertype: "Vitaminder",
      Inspiratiepunten: 1,
    })
  }).then(() => {
    window.open("../inlog.html")
  })
})
};

//Register CH
function registerCoach(){

  const button = document.getElementById("register-button-coach")
  
  if(button != null){
  button.addEventListener("click", () => {

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-wachtwoord").value;
  const naam = document.getElementById("register-gebruikersnaam").value;
  const locatie = document.getElementById("plaats-praktijk").value;
  const stijl = document.getElementById("coach-methodiek").value;
  const omschrijf = document.getElementById("coach-omschrijving").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  
  .then(cred =>{
    db.collection("Vitaminders").doc(cred.user.uid).set({
      Gebruikersnaam: naam,
      Usertype: "Coach",
      Inspiratiepunten: 1,
      Locatie: locatie,
      Coachstijl: stijl,
      Omschrijving: omschrijf
    })
  }).then(() => {
    window.open("../inlog.html")
  })
})
}
}; registerCoach();


// Inlog/uitlog verbergen
const login = document.getElementById("button-login")
const logout = document.getElementById("button-logout")

auth.onAuthStateChanged(User =>{
  if(User){
    login.style.display = "none"
  } else {
    logout.style.display = "none"
  }
});
