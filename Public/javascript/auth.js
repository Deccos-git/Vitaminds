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
       const naam = doc.data().Gebruikersnaam;
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

        authPhoto.addEventListener("click", () => {
            window.open("../Vitaminders/" + [naam] + ".html", "_self");
        })
 
    const logout = document.createElement("h5")
      logout.setAttribute("id", "button-logout")
      logout.setAttribute("onclick", "logOut()")

      profilePicture.addEventListener("click", () => {
        authDiv.style.visibility = "visible"
      })
      
    logout.innerHTML = "Log uit"
    authName.innerHTML = `<a href = "../Vitaminders/${naam}">${naam}</a>`
    authProfile.innerHTML = `<a href = "../Vitaminders/${naam}">Mijn Digimind</a>`
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

      
      authDOM.appendChild(notifications)
                profilePicture.appendChild(authDiv)
                authDiv.appendChild(closeDiv)
                authDiv.appendChild(authPhoto)
                authDiv.appendChild(authName)
                authDiv.appendChild(authProfile)
                authProfile.appendChild(notificationsDiv)

                // Reacties
      db.collectionGroup("Reacties").where("Vraagsteller", "==", naam).where("New", "==", "Yes").get().then(querySnapshot => {
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

                notificationsP.innerHTML = `<b>${coach}</b> heeft gereageerd op je ${domain} <b>${levensvraag}</b>`

                notificationsDiv.addEventListener("click", () => { 
                  db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
                    querySnapshot.forEach(doc2 => { 
                      console.log(doc2)
                  db.collection("Vitaminders").doc(doc2.id).collection("Reacties").doc(doc.id).update({
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
          db.collectionGroup("Inspiration").where("User", "==", naam).where("New", "==", "Yes").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
              const docLengt = [doc]          
                    objectLength = Object.keys(docLengt).length
                    length.push(objectLength)
    
                    notifications.innerHTML = `<p id='notification-count-menu'>${length.length}</p>`
    
                    const giver = doc.data().Giver
    
                    const notificationsPDiv = document.createElement("div")
                    const notificationsP = document.createElement("p")
    
                    notificationsP.innerHTML = `Je hebt 1 nieuw inspiratiepunt ontvangen van ${giver} `
    
                    notificationsDiv.addEventListener("click", () => { 
                      
                      db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot =>{
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
                    authDiv.appendChild(logout)
                    
                    })
              }).catch((err) => {
                console.log(err)
              })

      profilePicture.appendChild(authDiv)
      profilePicture.appendChild(notifications)
      authDiv.appendChild(authPhoto)
      authDiv.appendChild(authName)
      authDiv.appendChild(authProfile)
      authDiv.appendChild(logout)

      }
    }
    }).then(() => {
     const closeDiv =document.getElementById("close-div")
     const authDiv = document.getElementById("menu-auth-div")

      closeDiv.addEventListener("click", () => {
        authDiv.style.visibility = "hidden",
        console.log("jep")
      })
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
      Email: email
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

  firebase.auth().createUserWithEmailAndPassword(email, password)
  
  .then(cred =>{
    db.collection("Vitaminders").doc(cred.user.uid).set({
      Gebruikersnaam: naam,
      Usertype: "Coach",
      Inspiratiepunten: 1,
      Email: email
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
