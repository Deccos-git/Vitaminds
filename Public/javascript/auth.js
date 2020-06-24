// Random ID
const id = Math.random()
const idAlpha = id.toString(36)
const idClean = idAlpha.replace("0.", "")

 // If goal is set in local host 
 const registerDiv = document.getElementById("register-div")
 const goalLocaleStorageDiv = document.getElementById("goal-localstorage-div")
 const registerSelect = document.getElementById("register-select")
 const goalStorage = localStorage.getItem("Goal")

 if(registerDiv != null){
   registerDiv.scrollIntoView()
  };
   
  if(goalLocaleStorageDiv != null){
   goalLocaleStorageDiv.style.display = "block"
  };

   db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

    const title = doc.data().Levensvraag
    const insights = doc.data().Insights

    const option = document.createElement("option")

    if(registerSelect != null){
      registerSelect.setAttribute("value", option)
 

    option.innerHTML = title

    if (insights.length > 0){
            registerSelect.appendChild(option)
            };
          };
    })
}).then(() => {

  if (registerSelect != null){
  const options = registerSelect.options

  const optionsArray = Array.from(options)

  optionsArray.forEach(opt =>{
    if(opt.innerText == goalStorage){
      const index = opt.index

      registerSelect.selectedIndex = index
    }
  })
};
})



// Inlog/uitlog verbergen
const login = document.getElementById("button-login")
const logout = document.getElementById("button-logout")


  auth.onAuthStateChanged(User =>{
      if(User){
        login.style.display = "none"
      } else {
        logout.style.display = "none"
      };
  });


// Mobile menu
const hamburgerMenu = document.getElementById("mobile-hamburger-menu")
const mobileMenu = document.getElementById("mobile-menu-outer-div")

hamburgerMenu.addEventListener("click", () => {
       
        if (mobileMenu.style.display == "flex") 
        mobileMenu.style.display = "none"
        else {
        mobileMenu.style.display = "flex"    
        }
})

const coachMenuDOM = document.getElementById("aanmeldCH-mobile")
const coachMenuMobile = document.getElementById("coach-menu-main-mobile")


  coachMenuDOM.addEventListener("click", () => {
    coachMenuMobile.style.display = "flex"
  })


// Ingelogd in mobile-menu

auth.onAuthStateChanged(User =>{
  if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
       const naamID = doc.data().Gebruikersnaam;
       const ID = doc.data().ID
       const naam = naamID.replace(ID, "")
       const profilePic = doc.data().Profielfoto

        const profilePicture = document.getElementById("profile-picture-mobile")
        const login = document.getElementById("button-login-mobile")

        login.style.display = "none" 

        if(profilePic == undefined){
          profilePicture.innerHTML = `<h6 class="menu-auth-name" >${naam}</h6>`
        } else {
            profilePicture.style.backgroundImage = `url('${profilePic}')`
            profilePicture.setAttribute("class", "login-logout")
        }

        profilePicture.addEventListener("click", () => {
          window.open("../Vitaminders/" + [naamID] + ".html", "_self");
        })

      }
    })
  }
});


//Ingelogd in main menu
auth.onAuthStateChanged(User =>{
  if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        const naamID = doc.data().Gebruikersnaam;
        const ID = doc.data().ID
        const naam = naamID.replace(ID, "")
        const profilePic = doc.data().Profielfoto
  
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
                };

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
          db.collectionGroup("Inspiration").where("Reciever", "==", naamID).where("New", "==", "Yes").get().then(querySnapshot => {
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

// Coach-menu

const voorCoachDOM = document.getElementById("aanmeldCH")
const coachMenu = document.getElementById("coach-menu-main")

if(coachMenu.style.display = "none"){
  voorCoachDOM.addEventListener("mouseover", () => {
    coachMenu.style.display = "flex"
  })
} else {
  voorCoachDOM.addEventListener("mouseover", () => {
    coachMenu.style.display = "none"
  })
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
  const passwordVM = document.getElementById('register-wachtwoord').value;
  const passwordInput = document.getElementById('register-wachtwoord')
  const repeatPasswordVM = document.getElementById("register-wachtwoord-repeat").value
  const repeatPasswordVMInput = document.getElementById("register-wachtwoord-repeat")
  const gebruikersnaam = document.getElementById('register-gebruikersnaam').value;

  if (passwordVM != repeatPasswordVM){
    passwordInput.style.borderColor = "red"
    repeatPasswordVMInput.style.borderColor = "red"
    alert("De wachtwoorden zijn niet gelijk")
  } else {
  
  firebase.auth().createUserWithEmailAndPassword(email, passwordVM)
  .then(cred =>{
    db.collection('Vitaminders').doc(cred.user.uid).set({
      Gebruikersnaam: cred.user.uid + gebruikersnaam,
      GebruikersnaamClean: gebruikersnaam,
      Usertype: "Vitaminder",
      Inspiratiepunten: 1,
      Email: email, 
      ID: cred.user.uid,
      Levensvragen: []
    })
  }).catch((err) => {
    alert(err)
  })
  .then(() => {
    db.collection("Mail").doc().set({
      to: [email],
      cc: "info@vitaminds.nu",
message: {
subject: `Verifier je account op Vitaminds! `,
html: `Hallo ${gebruikersnaam}, </br></br>
      Welkom bij Vitaminds! Het beging van een geweldig avontuur in je eigen karakter!<br><br>

      Je kunt je vanaf nu inloggen met je emailadres en wachtwoord.<br><br> 
      
      Klik <a href="https://vitaminds.nu/inlog.html"> hier </a> om direct te beginnen.

      Vriendelijke groet, </br></br>
      Het Vitaminds Team </br></br>
      <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
Gebruikersnaam: gebruikersnaam,
Emailadres: email,
Type: "Vitaminders"
}
          
}).then(() => {
            const notice = document.getElementById("register-notice")
            notice.style.display = "block"
        })
      })
    }
  })
};

function registerNoticeOK(){
  firebase.auth().signOut().then(function() {
    window.location.href = "/inspiratie.html"
  }).catch(function(error) {
    console.log(error)
  })
}

//Register CH
function registerCoach(){

  const button = document.getElementById("register-button-coach")
  
  if(button != null){
  button.addEventListener("click", () => {

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-wachtwoord").value;
  const passwordInput = document.getElementById("register-wachtwoord")
  const repeatPassword = document.getElementById("register-wachtwoord-repeat").value
  const repeatPasswordInput = document.getElementById("register-wachtwoord-repeat")
  const naam = document.getElementById("register-gebruikersnaam").value;
  const method = document.getElementById("register-method").value;
  const city = document.getElementById("register-city").value;
  const targetgroup = document.getElementById("register-targetgroup").value;
  const why = document.getElementById("register-why").value;
  const online = document.getElementsByClassName("input-radio-online")
  const phone = document.getElementById("register-phone").value;
  const website = document.getElementById("register-website").value;
  const costs = document.getElementById("register-costs").value;
  const approach = document.getElementById("register-style").value;
  const experience = document.getElementById("register-experience").value;
  const experienceType = document.getElementById("register-experience-type").value;
  const education = document.getElementById("register-education").value;

  if (password != repeatPassword){
    passwordInput.style.borderColor = "red"
    repeatPasswordInput.style.borderColor = "red"
    alert("De wachtwoorden zijn niet gelijk")
  } else {

  firebase.auth().createUserWithEmailAndPassword(email, password)
  
  .then(cred =>{

                onlineArray = Array.from(online)
                onlineArray.forEach(on => {
                        const check = on.checked

                        if (check == true){
                          const onlineValue = on.value

    db.collection("Vitaminders").doc(cred.user.uid).set({
      Gebruikersnaam: cred.user.uid + naam,
      GebruikersnaamClean: naam,
      Usertype: "Coach",
      Inspiratiepunten: 1,
      Email: email,
      PhoneNumber: phone,
      Website: website,                 
      Coachingstyle: method,
      City: city,
      Online: check,
      Why: why,
      Targetgroup: targetgroup,
      YearsExperience: experience,
      Experience: experienceType,
      Education: education,
      Approach: approach,
      Costs: costs,
      ID: cred.user.uid,
      Levensvragen: []
    }).catch((err) => {
      alert(err)
    });
    };
  });
  }).then(() => {
    db.collection("Mail").doc().set({
      to: [email],
      cc: "info@vitaminds.nu",
message: {
subject: `Verifier je account op Vitaminds! `,
html: `Hallo ${naam}, </br></br>
      Wat geweldig dat je een coach-account hebt aangemaakt op Vitaminds! Je bent in ieder geval van harte welkom in onze community. 
      Daarnaast hopen we van harte dat is een mooie stap is in de online vindbaarheid van je praktijk.<br><br>

      Vergeet niet om je coachgegevens goed in- en aan te vullen in je Digimind (je persoonlijke ontwikkelomgeving en tevens coachprofiel op Vitaminds).

      Je kunt je vanaf nu inloggen met je emailadres en wachtwoord.<br><br> 
      
      Klik <a href="https://vitaminds.nu/inlog.html"> hier </a> om direct te beginnen.<br><br>

      Vriendelijke groet, </br></br>
      Het Vitaminds Team </br></br>
      <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
Gebruikersnaam: naam,
Emailadres: email,
Type: "Coach"
}
          
}).then(() => {
              const notice = document.getElementById("register-notice")
              notice.style.display = "block"
          })
        })
      }
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

// Goal in legend

const goalLegend = document.getElementById("goal-legend-outer-div")
const minimizeDLegend = document.getElementById("minimized-legend")
const legendSelect = document.createElement("select")
  legendSelect.setAttribute("id", "legend-select")
const legendFocus = document.createElement("p")
let legendP = document.createElement("p")
const selectGoalBar = document.createElement("select")
  selectGoalBar.setAttribute("id", "select-goal-bar")

  // Minimize/maximize legend
  const minimizeLegend = document.createElement("p")
    minimizeLegend.setAttribute("id", "minimize-legend")
    minimizeLegend.setAttribute("onclick", "minimizeLegendClick()")
  const maximizeLegend = document.createElement("p")
    maximizeLegend.setAttribute("id", "maximize-legend")
    maximizeLegend.setAttribute("onclick", "maximizeLegendClick()")

    minimizeDLegend.appendChild(maximizeLegend)

  minimizeLegend.innerHTML = "x"
  maximizeLegend.innerHTML = "+"

  function minimizeLegendClick(){
    goalLegend.style.display = "none"
    maximizeLegend.style.display = "block"
  };

  function maximizeLegendClick(){
    goalLegend.style.display = "flex"
    maximizeLegend.style.display = "none"
  };

  const startButtonBar = document.createElement("button")
    startButtonBar.setAttribute("class", "button-legend")

  const allOptions = document.createElement("option")

        allOptions.innerHTML = "Geen doel selecteren"
  

  // Auth with goals
  auth.onAuthStateChanged(User =>{
    if(User){
      db.collection("Vitaminders").doc(User.uid).get().then(function(doc) {
          const auth = doc.data().Gebruikersnaam;
          const authClean = doc.data().GebruikersnaamClean

      db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

          const goals = doc.data().LevensvraagClean

          const legendOptions = document.createElement("option")
        
          legendOptions.innerHTML = goals
          legendFocus.innerHTML = `Wat is vandaag je focus, ${authClean}?`

          startButtonBar.innerHTML = "Selecteer"

          goalLegend.appendChild(legendFocus)
          goalLegend.appendChild(legendSelect)
          legendSelect.appendChild(allOptions)
          legendSelect.appendChild(legendOptions)
          goalLegend.appendChild(startButtonBar)
          goalLegend.appendChild(minimizeLegend)

          //Filter
          startButtonBar.addEventListener("click", () => {

            const select = legendSelect.options
            const option = select[select.selectedIndex].innerHTML

            if(option == "Geen doel selecteren"){
              localStorage.removeItem("Goal")
              location.reload()
            }else{

            db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", option).get().then(querySnapshot => {
              querySnapshot.forEach(doc1 => {

                const goal = doc1.data().Goal

            localStorage.setItem("Goal", goal);
            location.reload()

                  })
                });
              };
            });
          })
        });
      });
    } else {
      // No auth (visitor)

      legendP.innerHTML = "Mentale fitheid begint met een inspirerend doel."

      db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

          const goals = doc1.data().Levensvraag
          const insights = doc1.data().Insights

      const options = document.createElement("option")

      options.innerHTML = goals
      startButtonBar.innerHTML = "Start"

      goalLegend.appendChild(legendP)
      goalLegend.appendChild(selectGoalBar)

      if (insights.length > 0){
      selectGoalBar.appendChild(options)
      };

      goalLegend.appendChild(startButtonBar)
      goalLegend.appendChild(minimizeLegend)

          // Start
          startButtonBar.addEventListener("click", () => {

            const select = selectGoalBar.options
            const option = select[select.selectedIndex].innerHTML
            localStorage.setItem("Goal", option);
            location.reload()
            });
          })
        })
      }
  });

    // Auth has no goals yet

    const naamArray = []

    auth.onAuthStateChanged(User =>{
      if(User){
    db.collection("Vitaminders").doc(User.uid).get().then(function(doc) {
      const auth = doc.data().Gebruikersnaam;
      const authClean = doc.data().GebruikersnaamClean

    db.collectionGroup("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
      querySnapshot.forEach(doc1 => {

        const naam = doc1.data().Gebruikersnaam

        naamArray.push(naam)
        })
      }).then(() => {
    
        if(naamArray.includes(auth) == false){
          legendP.innerHTML = `${authClean}, Mentale fitheid begint met een inspirerend doel`

          db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {
    
              const goals = doc1.data().Levensvraag
              const insights = doc1.data().Insights
    
          const options = document.createElement("option")
    
          options.innerHTML = goals
          startButtonBar.innerHTML = "Start"
    
          goalLegend.appendChild(legendP)
          goalLegend.appendChild(selectGoalBar)

          if (insights.length > 0){
            selectGoalBar.appendChild(options)
            };
          goalLegend.appendChild(startButtonBar)
          goalLegend.appendChild(minimizeLegend)

           // Start
           startButtonBar.addEventListener("click", () => {

            const select = selectGoalBar.options
            const option = select[select.selectedIndex].innerHTML
            localStorage.setItem("Goal", option);
            location.reload()
                  });
                })
              })
            };
        })
      });
    };
  });

 //Goal from  storage in legend
 const goalStorageLegend = localStorage.getItem("Goal")

 if(goalStorageLegend != undefined){

 auth.onAuthStateChanged(User =>{
     db.collection("Vitaminders").doc(User.uid).get().then(function(doc) {

       const auth = doc.data().Gebruikersnaam

 db.collectionGroup("Levensvragen").where("Goal", "==", goalStorageLegend).where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
   querySnapshot.forEach(doc1=> {

     const levensvraag = doc1.data().LevensvraagClean

 const options = legendSelect.options
 const optionsArray = Array.from(options)

 optionsArray.forEach(opt =>{

   if(opt.innerText == levensvraag){
     const index = opt.index

     legendSelect.selectedIndex = index
             };       
           });
         })
       });
     })
   });
 };
   

  




