// localStorage.clear()


// Fetching title from url
const titelURLDOM = window.location.href.replace(/^.*[\\\/]/, '')
const titelURL1 = titelURLDOM.replace('.html', '')
const titelURL2 = titelURL1.replace('%20',' ')
const titelURL3 = titelURL2.replace('%20',' ')
const titelURL4 = titelURL3.replace('%20',' ')
const titelURL5 = titelURL4.replace('%20',' ')
const titelURL6 = titelURL4.replace('%20',' ')
const titelURL7 = titelURL6.replace('%20',' ')
const titelURL8 = titelURL7.replace('%20',' ')
const titelURL9 = titelURL8.replace('%20',' ')
const titelURL10 = titelURL9.replace('%20',' ')
const titelURL11 = titelURL10.replace('%20',' ')
const titelURL12 = titelURL11.split("?fb")
const titelURL = titelURL12[0]

// Random ID
const id = Math.random()
const idAlpha = id.toString(36)
const idClean = idAlpha.replace("0.", "")

// Random color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const colour = getRandomColor()
console.log(colour)

// Stripe
// const stripe = Stripe('pk_test_ZEgiqIsOgob2wWIceTh0kCV4001CPznHi4');

// Cookies notice

const cookies = localStorage.getItem("Cookies")
const cookieDiv = document.getElementById("cookie-notice")

if(cookies != "OK"){
  if(cookieDiv != null || cookieDiv != undefined){
  cookieDiv.style.display = "flex"
  };
}

function cookiesOK(){
      localStorage.setItem("Cookies", "OK")
        cookieDiv.style.display = "none"
}

// Register a pageleave

window.addEventListener("unload", (e) => { 
  
  localStorage.setItem("leftPages", [titelURL])
        
});

// Update online/offline of chat/group when user leaves page
const pageLeaves = localStorage.getItem("leftPages")

function onlineFunctionQueryGroups(authName){
  db.collection("Chats").where("Members", "array-contains", authName).where("Room", "==", pageLeaves)
  .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {

  db.collection("Chats").doc(doc.id).update({
      Online: firebase.firestore.FieldValue.arrayRemove(authName)
            }).then(() => {
              localStorage.removeItem(pageLeaves)
      });
    });
  });
};

function onlineFunctionQueryChats(authName){
  db.collection("Chats").where("Members", "array-contains", authName).where("Type", "==", "Chat")
  .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {

        const members = doc.data().Members


        if(members.includes(pageLeaves) && members.includes(authName)){

  db.collection("Chats").doc(doc.id).update({
      Online: firebase.firestore.FieldValue.arrayRemove(authName)
            }).then(() => {
              localStorage.removeItem(pageLeaves)
            })
        };
      });
  });
};

function updateOnlineStatusFromPagesLeave(){

    auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
    
                const auth = doc.data().Gebruikersnaam

                onlineFunctionQueryGroups(auth)
                onlineFunctionQueryChats(auth)
        });
      };
    });
} updateOnlineStatusFromPagesLeave()

// Inlog/uitlog verbergen
const loginDOM = document.getElementById("button-login")
const logoutDOM = document.getElementById("button-logout")


  auth.onAuthStateChanged(User =>{
      if(User){
        loginDOM.style.display = "none"
      } else {
        logoutDOM.style.display = "none"
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
        };
});

const coachMenuDOM = document.getElementById("aanmeldCH-mobile")
const coachMenuMobile = document.getElementById("coach-menu-main-mobile")

if(coachMenuDOM != null){

  coachMenuDOM.addEventListener("click", () => {
    coachMenuMobile.style.display = "flex"
  });
};


// Ingelogd in mobile-menu

auth.onAuthStateChanged(User =>{
  if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
       const naamID = doc.data().Gebruikersnaam
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
        };

        profilePicture.addEventListener("click", () => {
          window.open("../Vitaminders/" + [naamID] + ".html", "_self");
        });
      };
    });
  };
});

//Auth menu
const authDOM = document.getElementById("auth-DOM")

      if(authDOM == null){
        console.log("No auth menu")
      }; 

const lengthArray = []
const newMessageArray = []

const authDiv = document.createElement("div")
    authDiv.setAttribute("id", "menu-auth-div")
const authName = document.createElement("h5")
    authName.setAttribute("id", "profile-name")
const authProfile = document.createElement("h5")
    authProfile.setAttribute("id", "auth-profile")
const authProfileP = document.createElement("p")
const authPhoto = document.createElement("div")
    authPhoto.setAttribute("id", "profile-photo")
const closeDiv = document.createElement("div")
    closeDiv.setAttribute("id", "close-div")
    closeDiv.setAttribute("onclick", "close(this)") 

const profilePicture = document.getElementById("profile-picture")

const logout = document.createElement("h5")
      logout.setAttribute("id", "button-logout")
      logout.setAttribute("onclick", "logOut()")

const chatsGroupDiv = document.createElement("div")
      chatsGroupDiv.setAttribute("id", "chats-groups-div-auth-menu")

const chatGroupNewMessageCountDiv = document.createElement("div")
      chatGroupNewMessageCountDiv.setAttribute("id", "chats-groups-new-message-div")
const chatGroupNewMessageCountP = document.createElement("p")

const titleLink = document.createElement("a")
const linkImg = document.createElement('img')

const notificationsTotalDivToolbar = document.createElement("div")
      notificationsTotalDivToolbar.setAttribute("id", "notification-div-menu-toolbar")
const notificationsTotalP = document.createElement("p")
const notificationsTotalPAuthMenu = document.createElement("p")
      notificationsTotalPAuthMenu.setAttribute("id", "menu-notifications")
const notificationsDiv = document.createElement("div")
      notificationsDiv.setAttribute("class", "notification-div-menu")
const notificationsTitle = document.createElement("h3")
const notificationsPDiv = document.createElement("div")
const notificationsP = document.createElement("p")

const messagesMobileMenu = document.getElementById("toolbar-inner-div-chats-groups")

const chatsDiv = document.getElementsByClassName("chats-div")

  // Construct auth menu with naam and pic
  function constructAuthMenu(){
auth.onAuthStateChanged(User =>{
  if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {

        const naamID = doc.data().Gebruikersnaam;
        const ID = doc.data().ID
        const naam = naamID.replace(ID, "")
        const profilePic = doc.data().Profielfoto

        console.log(naamID)

    if(profilePic == undefined){
      profilePicture.innerHTML = `<h6 class="menu-auth-name" >${naam}</h6>`
    } else {
        profilePicture.style.backgroundImage = `url('${profilePic}')`
        profilePicture.setAttribute("class", "login-logout")
    };

    authPhoto.style.backgroundImage = `url('${profilePic}')`
    authName.innerHTML = `<a href = "../Vitaminders/${naamID}">${naam}</a>`
    authProfileP.innerHTML = `<a href = "../Vitaminders/${naamID}"><img id="icon-auth-menu-digimind" src="../images/menu-dashboard.png">Mijn Digimind</a>`
    authPhoto.addEventListener("click", () => {
      window.open("../Vitaminders/" + [naamID] + ".html", "_self");
    });
  });

  } else {
    const logOutMobile = document.getElementById("log-out-mobile")

    logOutMobile.style.display = "none"
    notificationsTotalPAuthMenu.style.display = "none"
    };
  });
}; constructAuthMenu()

        // Open & close
      function openCloseAutMenu(){
        
        closeDiv.style.backgroundImage = "url(../images/close-icon.png)";

        closeDiv.addEventListener("click", () => {
          authDiv.style.display= "none"
        })

        profilePicture.addEventListener("click", () => {
          authDiv.style.display= "flex"
        })
      }; openCloseAutMenu()


      // Logout
      function logOutAuthMenu(){
      
    logout.innerHTML = "Log uit"
      } logOutAuthMenu()


    // Chats & groups link
    titleLink.innerText = "Chats & Groepen"
    linkImg.src = "../images/send-icon.png"

    titleLink.addEventListener("click", () => {
      window.open("../chats-groups.html", "_self");
    })


      // Notificaties in menu
      notificationsTitle.innerHTML = "Notificaties"

      auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
      
              const naamID = doc.data().Gebruikersnaam;

             // Inspirationpoints
          db.collectionGroup("Inspiration").where("Reciever", "==", naamID).where("New", "==", "Yes").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
              const docLengt = [doc]          
                    objectLength = Object.keys(docLengt).length
                    lengthArray.push(objectLength)
    
                    const giver = doc.data().Giver

                    db.collection("Vitaminders").where("Gebruikersnaam", "==", giver)
                    .get().then(querySnapshot => {
                      querySnapshot.forEach(doc3 => {

                    const giverID = doc3.data().ID
                    const giverClean = giver.replace(giverID, "")
      
                    notificationsP.innerHTML = `Je hebt 1 nieuw <i>inspiratiepunt</i> ontvangen van ${giverClean} `
                      });
                    });
    
                    notificationsDiv.addEventListener("click", () => { 
                      
                      db.collection("Vitaminders").where("Gebruikersnaam", "==", naamID).get().then(querySnapshot =>{
                        querySnapshot.forEach(doc2 => { 
                      db.collection("Vitaminders").doc(doc2.id).collection("Inspiration").doc(doc.id).update({
                        New: "No"
                      }).then(() => {
                          window.open("../notifications.html", "_self")
                      });
                    });
                  });
                });      
              });
              }).then(() => {

                // Notifications from chats and groups

                db.collection("Chats").where("Members", "array-contains", naamID).get().then(querySnapshot =>{
                  querySnapshot.forEach(doc3 => { 

                    const type = doc3.data().Type

                  db.collection("Chats").doc(doc3.id).collection("Messages").where("Status", "==", "New").get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                      const authUser = doc1.data().Auth
                      const users = doc1.data().Room
                      const readList = doc1.data().Read

                      const userArray = users.split("_")

                      if (type === "Group" || type === "Practicegroup" || type === "Coachgroup"){
                      // Groups
                      if (readList != undefined){
                      if(!readList.includes(naamID)){
                        if(authUser != naamID){

                          newMessageArray.push(doc1.id)
                          lengthArray.push(doc1.id)
                        };
                      };
                    };
                  } else {

                    // Chats
                if(userArray.includes(naamID)){
                  if(authUser != naamID){

                    newMessageArray.push(doc1.id)
                    lengthArray.push(doc1.id)
                  };
                };
              };
              
              });
                  }).then(() => {
                    if(newMessageArray.length != 0){
                    chatGroupNewMessageCountP.innerText = newMessageArray.length
                    notificationsTotalPAuthMenu.innerText = lengthArray.length
                    messagesMobileMenu.appendChild(notificationsTotalDivToolbar)
                    notificationsTotalDivToolbar.appendChild(notificationsTotalP)
                    notificationsTotalP.innerText = lengthArray.length
                    };
                  });
                });
              }); 
                });
                });
              };
            });
    
            notificationsDiv.appendChild(notificationsTitle)
            notificationsTitle.appendChild(notificationsPDiv)
            notificationsPDiv.appendChild(notificationsP)

            notificationsDiv.appendChild(notificationsTitle)
            notificationsTitle.appendChild(notificationsPDiv)
            notificationsPDiv.appendChild(notificationsP)

            profilePicture.appendChild(notificationsTotalPAuthMenu)
            authDOM.appendChild(authDiv)
            authDiv.appendChild(closeDiv)
            authDiv.appendChild(authPhoto)
            authDiv.appendChild(authName)
            authDiv.appendChild(authProfile)
            authProfile.appendChild(authProfileP)
            authProfile.appendChild(chatsGroupDiv)
            chatsGroupDiv.appendChild(linkImg)
            chatsGroupDiv.appendChild(titleLink)
            chatsGroupDiv.appendChild(chatGroupNewMessageCountDiv)
            chatGroupNewMessageCountDiv.appendChild(chatGroupNewMessageCountP)
            authProfile.appendChild(notificationsDiv)
            authDiv.appendChild(logout)

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

  const button = document.getElementById("button-inlog")
  button.innerHTML = "Laden..."

    auth.signInWithEmailAndPassword(inlogEmail, inlogPassword).then(() => {
      auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);

          userRef.update({
            Online: "Yes"
            })
            .then(() =>{
             
          userRef.get().then(function(doc) {
            if (doc.exists) {
              naam = doc.data().Gebruikersnaam;

              window.open("../Vitaminders/" + naam + ".html", "_self");
          };
        });
      });
      };
    });
  });
};
  
//Log out
function logOut(){
  auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);

  userRef.update({
    Online: "No"
  }).then(() => {
    firebase.auth().signOut().then(function() {
        window.location.href = "../index.html"
      }).catch(function(error) {
        console.log(error)
      });
    });
};
  });
  };

// Register VM
const button = document.getElementById("register-button")
if(button != null){

    button.addEventListener("click", () => {
  
  const email = document.getElementById('register-email').value;
  const passwordVM = document.getElementById('register-wachtwoord').value;
  const passwordInput = document.getElementById('register-wachtwoord')
  const repeatPasswordVM = document.getElementById("register-wachtwoord-repeat").value
  const repeatPasswordVMInput = document.getElementById("register-wachtwoord-repeat")
  const firstName = document.getElementById('register-firstname').value;
  const lastName = document.getElementById('register-lastname').value;

  const colour = getRandomColor()

  let userName = ""

  if (lastName != ""){
    userName = firstName +""+ lastName
  } else {
    userName = firstName
  };

  if (passwordVM != repeatPasswordVM){
    passwordInput.style.borderColor = "red"
    repeatPasswordVMInput.style.borderColor = "red"
    alert("De wachtwoorden zijn niet gelijk")
  } else {

    if (firstName === ""){
      alert("Vergeet niet je voornaam in te vullen")

    } else {
  
  firebase.auth().createUserWithEmailAndPassword(email, passwordVM)
  .then(cred =>{
    db.collection('Vitaminders').doc(cred.user.uid).set({
      Gebruikersnaam: cred.user.uid + userName,
      GebruikersnaamClean: userName,
      Firstname: firstName,
      Lastname: lastName,
      Usertype: "Vitaminder",
      Inspiratiepunten: 1,
      Email: email, 
      ID: cred.user.uid,
      Color: colour,
      Levensvragen: [],
      Profielfoto: "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
  }).then(() => {
    db.collection("Mail").doc().set({
      to: [email],
      cc: "info@vitaminds.nu",
message: {
subject: `Verifier je account op Vitaminds! `,
html: `Hallo ${userName}, </br></br>
      Welkom bij de Vitaminds community. Het sociale netwerk voor imperfecte mensen.<br><br>
      Je kunt je vanaf nu inloggen met je emailadres en wachtwoord.<br><br> 
      
      Klik <a href="https://vitaminds.nu/inlog.html"> hier </a> om direct te beginnen.</br></br>
      Vriendelijke groet, </br></br>
      Het Vitaminds Team </br></br>
      <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
Gebruikersnaam: userName,
Emailadres: email,
Type: "Vitaminders"
}        
});
  })
.then(() => {
            const notice = document.getElementById("register-notice")
            notice.style.display = "block"
        })
    }).catch((err) => {
      alert(err)
    });
    };
  };
});
  }


function registerNoticeOK(){
  firebase.auth().signOut().then(function() {
    window.location.href = "/index.html"
  }).catch(function(error) {
    console.log(error)
  })
}

//Register CH
async function registerCoach(){

  const button = document.getElementById("register-button-coach")
  
  if(button != null){
  button.addEventListener("click", () => {

    button.innerText = "Laden.."

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

  const colour = getRandomColor()

  if (password != repeatPassword){
    passwordInput.style.borderColor = "red"
    repeatPasswordInput.style.borderColor = "red"
    alert("De wachtwoorden zijn niet gelijk")
  } else {

  firebase.auth().createUserWithEmailAndPassword(email, password)
  
  .then(cred =>{

    db.collection("Vitaminders").doc(cred.user.uid).set({
      Gebruikersnaam: idClean + naam,
      GebruikersnaamClean: naam,
      Usertype: "Coach",
      Inspiratiepunten: 1,
      Email: email,
      PhoneNumber: phone,
      Website: website,                 
      Coachingstyle: method,
      City: city,
      Online: "Ja",
      Color: colour,
      Why: why,
      Targetgroup: targetgroup,
      YearsExperience: experience,
      Experience: experienceType,
      Education: education,
      Approach: approach,
      Costs: costs,
      ID: cred.user.uid,
      Levensvragen: []
    })
//     .then(() => {
//       // the method CollectionReference.add returns a DocumentReference instance
//    // which you have to receive inside the "then" call:
//    auth.onAuthStateChanged(User =>{
//     if(User){
//       const userRef = db.collection("Vitaminders").doc(User.uid);
//       userRef.get().then(function(doc) {
//    db.collection('customers').doc(doc.id).collection('checkout_sessions')
//    .add({
//      price: 'price_1HLXnVFIim4HzRlUQQXl50Z1',
//      success_url: "https://vitaminds.nu/succes.html",
//      cancel_url: "https://vitaminds.nu/voor-coach.html",
//      tax_rates: ['txr_1HLYPxFIim4HzRlUFAvMv9ti'],
//      payment_method_types: ['sepa_debit']
//    })
//    .then(docRef => {
//      // Wait for the CheckoutSession to get attached by the extension
//      docRef.onSnapshot((snap) => {
   
//        const { sessionId } = snap.data();

//        console.log(sessionId)
//        if (sessionId) {
//          // We have a session, let's redirect to Checkout
//          // Init Stripe
//          const stripe = Stripe('pk_test_ZEgiqIsOgob2wWIceTh0kCV4001CPznHi4');
//          stripe.redirectToCheckout({ sessionId });
//        }
//      });
//    });
//   });
// };
//    });
//    });
  })

  .then(() => {
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
          
});

window.open("succes.html", "_self");
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


// Succes pagina
async function getAdminUsernameAndProfilePicture(){

  const succesQuestion = document.getElementById("succes-questions")
  
  if (succesQuestion != null){

const photoDiv = document.createElement("div")
      photoDiv.setAttribute("id", "admin-photo-img-div")
const photoImg = document.createElement("img")
const adminName = document.createElement("h3")
const adminContactMe = document.createElement("p")

 await db.collection("Vitaminders")
.where("GebruikersnaamClean", "==", "Gijs van Beusekom")
.get()
.then(querySnapshot => {
  querySnapshot.forEach(doc => {

    const gebruikersnaamClean = doc.data().GebruikersnaamClean
    const profilePicture = doc.data().Profielfoto
    const admin = doc.data().Gebruikersnaam

    photoImg.src = profilePicture
    adminName.innerText = gebruikersnaamClean
    adminContactMe.innerText = `Voor alle vragen over Vitaminds kun je mij altijd even een berichtje sturen.`

    function linkToDigimind(a){
      a.addEventListener("click", () => {
        window.open("../Vitaminders/" + admin + ".html", "_self");
      });
    } linkToDigimind(photoImg)
    linkToDigimind(adminName)
    linkToDigimind(adminContactMe)

    });
  });

  succesQuestion.appendChild(photoDiv)
    photoDiv.appendChild(adminContactMe) 
    photoDiv.appendChild(photoImg)
    photoDiv.appendChild(adminName)
  };
}; getAdminUsernameAndProfilePicture()


// Tickets

const welkomAuth = document.getElementById("welkom-auth")

auth.onAuthStateChanged(User =>{
  const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {
      if (doc.exists) {
        const Gname = doc.data().Gebruikersnaam;
        const id = doc.data().ID
        const nameClean = Gname.replace(id, "")

        const welkom = document.createElement("h2")

        welkom.innerHTML = `Houdoe, ${nameClean}`

        welkomAuth.appendChild(welkom)
  

  //Opmerking opvangen
  const buttonReact = document.getElementById("button-feedback")
  buttonReact.addEventListener("click", () => {

  const opmerking = document.getElementById("textarea").value
    
  db.collection("Tickets").doc().set({
    Gebruikersnaam: Gname,
    GebruikersnaamClean: nameClean,
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





