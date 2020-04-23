// Random ID
const id = Math.random()
const idAlpha = id.toString(36)
const idClean = idAlpha.replace("0.", "")

//Ingelogd in main menu
auth.onAuthStateChanged(User =>{
  if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
       const naamID = doc.data().Gebruikersnaam;
       const ID = doc.data().ID
       const naam = naamID.replace(ID, "")
        profilePic = doc.data().Profielfoto
  
    const profilePicture = document.getElementById("profile-picture")

    if(profilePic == undefined){
      profilePicture.innerHTML = `<h6 class="menu-auth-name" >${naam}</h6>`
    } else {
        profilePicture.style.backgroundImage = `url('${profilePic}')`
        profilePicture.setAttribute("class", "login-logout")
    }

    const authDiv = document.createElement("div")
        authDiv.setAttribute("id", "menu-auth-div")
    const authName = document.createElement("h5")
        authName.setAttribute("id", "profile-name")
      const authProfile = document.createElement("h5")
        authProfile.setAttribute("id", "auth-profile")
    const notifications = document.createElement("div")
      notifications.setAttribute("id", "menu-notifications")
    const authPhoto = document.createElement("div")
        authPhoto.style.backgroundImage = `url('${profilePic}')`
        authPhoto.setAttribute("id", "profile-photo")
    const closeDiv = document.createElement("div")
        closeDiv.setAttribute("id", "close-div")
        closeDiv.setAttribute("onclick", "close(this)") 

        // Open & close
        closeDiv.addEventListener("click", () => {
          authDiv.style.display= "none"
        })

        profilePicture.addEventListener("click", () => {
          authDiv.style.display= "flex"
        })

        authPhoto.addEventListener("click", () => {
            window.open("../Vitaminders/" + [naamID] + ".html", "_self");
        })
 
    const logout = document.createElement("h5")
      logout.setAttribute("id", "button-logout")
      logout.setAttribute("onclick", "logOut()")
      
    logout.innerHTML = "Log uit"
    authName.innerHTML = `<a href = "../Vitaminders/${naamID}">${naam}</a>`
    authProfile.innerHTML = `<a href = "../Vitaminders/${naamID}">Mijn Digimind</a>`
    closeDiv.style.backgroundImage = "url(../images/close-icon.png)";

      // Notificaties in menu
      const length = []

      const notificationsDiv = document.createElement("div")
      notificationsDiv.setAttribute("class", "notification-div-menu")
      const notificationsTitle = document.createElement("h3")

      notificationsTitle.innerHTML = "Notificaties"

      const authDOM = document.getElementById("auth-DOM")
      if(authDOM == null){
        console.log("Error")
      } else {

                // Reacties
      db.collectionGroup("Reactions").where("Vraagsteller", "==", naamID).where("New", "==", "Yes").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

          const docLengt = [doc]          
                objectLength = Object.keys(docLengt).length
                length.push(objectLength)

                if(length.length == 0){
                  notifications.style.display = "none"
                }

                notifications.innerHTML = `<p id='notification-count-menu'>${length.length}</p>`

                const coach = doc.data().Gebruikersnaam
                const levensvraag = doc.data().Levensvraag
                const domain = doc.data().Domain

                const notificationsPDiv = document.createElement("div")
                const notificationsP = document.createElement("p")

                db.collection("Vitaminders").where("Gebruikersnaam", "==", coach)
                .get().then(querySnapshot => {
                  querySnapshot.forEach(doc1 => {

                  const coachID = doc1.data().ID
                  const coachClean = coach.replace(coachID, "")

                  db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraag).get().then(querySnapshot => {
                    querySnapshot.forEach(doc2 => {
                      
                      const vraagID = doc2.data().ID
                      const levensvraagClean = levensvraag.replace(vraagID, "")

                notificationsP.innerHTML = `<b>${coachClean}</b> heeft <i>gereageerd</i> op je ${domain} <b>${levensvraagClean}</b>`
                      })
                    })
                  })
                })

                notificationsDiv.addEventListener("click", () => { 
                  db.collection("Vitaminders").where("Gebruikersnaam", "==", naamID).get().then(querySnapshot =>{
                    querySnapshot.forEach(doc2 => { 
                  db.collection("Vitaminders").doc(doc2.id).collection("Reactions").doc(doc.id).update({
                    New: "No"
                  }).then(() => {
                      window.open("../notifications.html", "_self")
                  })
                })
              })
            })

                notificationsDiv.appendChild(notificationsTitle)
                notificationsTitle.appendChild(notificationsPDiv)
                notificationsPDiv.appendChild(notificationsP)
                authDiv.appendChild(logout)
                
                })
          }).catch((err) => {
            console.log(err)
          })

          // Inspirationpoints
          db.collectionGroup("Inspiration").where("User", "==", naamID).where("New", "==", "Yes").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
              const docLengt = [doc]          
                    objectLength = Object.keys(docLengt).length
                    length.push(objectLength)
    
                    notifications.innerHTML = `<p id='notification-count-menu'>${length.length}</p>`
    
                    const giver = doc.data().Giver
    
                    const notificationsPDiv = document.createElement("div")
                    const notificationsP = document.createElement("p")

                    db.collection("Vitaminders").where("Gebruikersnaam", "==", giver)
                    .get().then(querySnapshot => {
                      querySnapshot.forEach(doc3 => {

                    const giverID = doc3.data().ID
                    const giverClean = giver.replace(giverID, "")
      
                    notificationsP.innerHTML = `Je hebt 1 nieuw <i>inspiratiepunt</i> ontvangen van ${giverClean} `
                      })
                    })
    
                    notificationsDiv.addEventListener("click", () => { 
                      
                      db.collection("Vitaminders").where("Gebruikersnaam", "==", naamID).get().then(querySnapshot =>{
                        querySnapshot.forEach(doc2 => { 
                      db.collection("Vitaminders").doc(doc2.id).collection("Inspiration").doc(doc.id).update({
                        New: "No"
                      }).then(() => {
                          window.open("../notifications.html", "_self")
                      })
                    })
                  })
                    })
    
                    notificationsDiv.appendChild(notificationsTitle)
                    notificationsTitle.appendChild(notificationsPDiv)
                    notificationsPDiv.appendChild(notificationsP)
                    
                    })
              }).catch((err) => {
                console.log(err)
              })

              profilePicture.appendChild(notifications)
              authDOM.appendChild(authDiv)
             authDiv.appendChild(closeDiv)
             authDiv.appendChild(authPhoto)
             authDiv.appendChild(authName)
             authDiv.appendChild(authProfile)
             authProfile.appendChild(notificationsDiv)
             authDiv.appendChild(logout)

      }
    }
    })
  } else {
    console.log("Offline")
  }
})

// Close authmenu

function close(elem){
  elem.parentElement.style.display = "none"
}


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

              window.open("../Vitaminders/" + naam + ".html", "_self");
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
      Gebruikersnaam: cred.user.uid + gebruikersnaam,
      GebruikersnaamClean: gebruikersnaam,
      Usertype: "Vitaminder",
      Inspiratiepunten: 1,
      Email: email, 
      ID: cred.user.uid
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
  const method = document.getElementById("register-method").value;
  const city = document.getElementById("register-city").value;
  const why = document.getElementById("register-why").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  
  .then(cred =>{
    db.collection("Vitaminders").doc(cred.user.uid).set({
      Gebruikersnaam: cred.user.uid + naam,
      GebruikersnaamClean: naam,
      Usertype: "Coach",
      Inspiratiepunten: 1,
      Email: email,
      Coachingstyle: method,
      City: city,
      Why: why,
      ID: cred.user.uid

    })
  }).then(() => {
    window.open("../inlog.html")
  })
})
}
}; registerCoach();

// Gedragscode lezen

function gedragscode(){
  const code = document.getElementById("gedragscode")
if(code.style.display = "none"){
  code.style.display = "block"
} else {
  code.style.display = "none"
}
}


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
