
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

console.log(idClean)

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

// Cookies notice
!function cookieNotice(){
  const cookies = localStorage.getItem("Cookies")
  const cookieDiv = document.getElementById("cookie-notice")

  if(cookies != "OK"){
    if(cookieDiv != null || cookieDiv != undefined){
    cookieDiv.style.display = "flex"
    };
  };
}();

function getTargetGroupMobile(){

  const selectGroup = document.getElementById("select-targetgroup-mobile")

  const option = selectGroup.options
  const selected = option[option.selectedIndex].innerHTML

  if(selected === "Coaches"){
    window.open("../voor-coaches.html", "_self");
  } else if (selected === "Psychologen"){
    window.open("../register-ggz.html", "_self");
  } else if (selected === "Particulieren"){
    window.open("../index.html", "_self");
  };
};

!function requestNewPassword(){

  const requestButton = document.getElementById("new-password")
  const closeButton = document.getElementById("close-new-password-modal")
  const passwordModal = document.getElementById("new-password-modal")
  const buttonNewPasword = document.getElementById("button-new-password")

  openNewPaswordModal(requestButton, passwordModal)
  closeNewPaswordModal(closeButton, passwordModal)

  if(buttonNewPasword != null){

    buttonNewPasword.addEventListener("click", () => {

      buttonNewPasword.innerText = "Email verstuurd"
      buttonNewPasword.style.backgroundColor = "#008e8e"
      buttonNewPasword.style.color = "white"

      const emailInput = document.getElementById("emailNew").value

      firebase.auth().sendPasswordResetEmail(emailInput).then(function() {
        console.log("email sent")
      }).catch(function(error) {
        alert(error)
      });
    });  
  };
}();

function openNewPaswordModal(requestButton, newPasswordModal){
  if(requestButton != null){
    requestButton.addEventListener("click", () => {
      newPasswordModal.style.display = "flex"
    });
  };
};

function closeNewPaswordModal(closeButton, passwordModal){
  if(closeButton != null){
    closeButton.addEventListener("click", () => {
      passwordModal.style.display = "none"
    });
  };
};


function getTargetGroup(){

  const selectGroup = document.getElementById("select-targetgroup")

  const option = selectGroup.options
  const selected = option[option.selectedIndex].innerHTML

  if(selected === "Coaches"){
    window.open("../voor-coaches.html", "_self");
  } else if (selected === "Psychologen"){
    window.open("../register-ggz.html", "_self");
  } else if (selected === "Particulieren"){
    window.open("../index.html", "_self");
  };
};

!function cookiesOK(){
  const button = document.getElementById("button-cookies")
  const cookieDiv = document.getElementById("cookie-notice")

  if(button != null){

    button.addEventListener("click", () => {
      localStorage.setItem("Cookies", "OK")
          cookieDiv.style.display = "none"
    });
  };
}();

// Inlog/uitlog verbergen

!function hideLogInIfAuth(){
  const loginDOM = document.getElementById("button-login")
  const logoutDOM = document.getElementById("button-logout")
  const registerButton = document.getElementById("button-register")
  const registerButtonCoach = document.getElementById("button-register-coach")

  if(loginDOM != null || loginDOM != null || registerButton != null || registerButtonCoach != null){
      auth.onAuthStateChanged(User =>{
        if(User){
          loginDOM.style.display = "none"
          registerButton.style.display = "none"
          registerButtonCoach.style.display = "none"
        } else {
          logoutDOM.style.display = "none"
        };
    });
  };
}();

// Mobile menu

!function showMobileMenu(){
  const hamburgerMenu = document.getElementById("mobile-hamburger-menu")
  const mobileMenu = document.getElementById("mobile-menu-outer-div")

  hamburgerMenu.addEventListener("click", () => {
        
          if (mobileMenu.style.display == "flex") 
          mobileMenu.style.display = "none"
          else {
          mobileMenu.style.display = "flex"    
          };
  });
}();


const coachMenuDOM = document.getElementById("aanmeldCH-mobile")
const coachMenuMobile = document.getElementById("coach-menu-main-mobile")

if(coachMenuDOM != null){

  coachMenuDOM.addEventListener("click", () => {
    coachMenuMobile.style.display = "flex"
  });
};


// Ingelogd in mobile-menu

!function loggedInMobileMenu(){
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
};

// Auth menu

function profilePictureInMobileMenu(profilePicture, auth){
  const DOMprofilePictureMobile = document.getElementById("profile-picture-mobile")
  const loginButton = document.getElementById("button-login-mobile")

  const profileImage = document.createElement("img")
    profileImage.setAttribute("id", "profile-image")

    DOMprofilePictureMobile.appendChild(profileImage)

    if(profilePicture === undefined){
      profileImage.src = "../images/dummy-profile-photo.jpeg"
    } else {
      profileImage.src = profilePicture
    };

  loginButton.style.display = "none"

  goToAccountFromProfilePicture(DOMprofilePictureMobile, auth)
};

function goToAccountFromProfilePicture(picture, auth){

  picture.addEventListener("click", () => {
    window.open("../Vitaminders/" + auth + ".html", "_self");
  })

}

function profilePictureInMenu(profilePicture, naam, userName){

  const DOMprofilePicture = document.getElementById("profile-picture")

  const profileImage = document.createElement("img")
    profileImage.setAttribute("id", "profile-image")

    if(profilePicture === undefined){
      profileImage.src = "../images/dummy-profile-photo.jpeg"
    } else {
      profileImage.src = profilePicture
    };

  DOMprofilePicture.appendChild(profileImage)

  expandAuthMenu(DOMprofilePicture, profilePicture, naam, userName)

};

function expandAuthMenu(DOMprofilePicture, profilePicture, naam, userName){

  const profilePicInMenu = document.getElementById("profile-image")

  const authMenu = document.createElement("div")
    authMenu.setAttribute("id", "menu-auth-div")

    DOMprofilePicture.appendChild(authMenu)

  profilePicInMenu.addEventListener("click", (e) => {

    const totalCount = document.getElementById("totalNewCountP")

    if(authMenu.style.display === "flex"){
      authMenu.style.display = "none"
      profilePicInMenu.style.display = "block"
    } else {
      authMenu.style.display = "flex"
      profilePicInMenu.style.display = "none"
      totalCount.style.display = "none"
    };
  });

  pictureAndNameInAuthMenu(authMenu, profilePicture, naam, userName)
  logOutAuthMenu(authMenu)
  closeAuthMenu(authMenu, profilePicInMenu)
};

function closeAuthMenu(authDiv, profilePicInMenu){

  const closeDiv = document.createElement("div")
  closeDiv.setAttribute("id", "close-div")
  const closeImage = document.createElement("img")

  closeImage.src = "../images/close-icon.png"

  authDiv.prepend(closeDiv)
  closeDiv.appendChild(closeImage)

  closeDiv.addEventListener("click", () => {

    const totalCount = document.getElementById("totalNewCountP")

    authDiv.style.display= "none"
    totalCount.style.display = "flex"
    profilePicInMenu.style.display = "block"
  });

}

function pictureAndNameInAuthMenu(authDiv, profilePicture, naam, userName){

  const picAndNameDiv = document.createElement("div")
    picAndNameDiv.setAttribute("id", "picture-name-div")

  const picture = document.createElement("img")
    picture.setAttribute("id", "profile-photo")
  const nameP = document.createElement("p")
    nameP.setAttribute("id", "profile-name")

    if(profilePicture === undefined){
      picture.src = "../images/dummy-profile-photo.jpeg"
    } else {
      picture.src = profilePicture
    };

  nameP.innerText = naam

  authDiv.appendChild(picAndNameDiv)
  picAndNameDiv.appendChild(picture)
  picAndNameDiv.appendChild(nameP)

  visitAccountByClickOnPictureAndName(picAndNameDiv, userName)
  authMenuLinks(authDiv, userName)

};

function visitAccountByClickOnPictureAndName(picAndNameDiv, userName){

  picAndNameDiv.addEventListener("click", () =>{
    window.open("../Vitaminders/" + userName + ".html", "_self");
  });
};

function authMenuLinks(authMenu, userName){

  const authMenuLinksDiv = document.createElement("div")
    authMenuLinksDiv.setAttribute("id", "auth-menu-links-div")

    authMenu.appendChild(authMenuLinksDiv)

    myAccountButton(authMenuLinksDiv, userName)
    myGroupsAndChats(authMenuLinksDiv)
    mySupport(authMenuLinksDiv, userName)

};

function myAccountButton(authMenuLinksDiv, userName){

  const myAccountDiv = document.createElement("div")
    myAccountDiv.setAttribute("class", "auth-menu-links-innerdiv")
  const myAccountIcon = document.createElement("img")
  const myAccountP = document.createElement("p")

  myAccountIcon.src = "../images/menu-dashboard.png"
  myAccountP.innerText = "Mijn account"

  authMenuLinksDiv.appendChild(myAccountDiv)
  myAccountDiv.appendChild(myAccountIcon)
  myAccountDiv.appendChild(myAccountP)

  myAccountDiv.addEventListener("click", () =>{
    window.open("../Vitaminders/" + userName + ".html", "_self");
  });
};

function myGroupsAndChats(authMenuLinksDiv){
  const myGroupsAndChatsDiv = document.createElement("div")
  myGroupsAndChatsDiv.setAttribute("class", "auth-menu-links-innerdiv")
  myGroupsAndChatsDiv.setAttribute("id", "groups-chats-div")
  const myGroupsAndChatsIcon = document.createElement("img")
  const myGroupsAndChatsP = document.createElement("p")

  myGroupsAndChatsIcon.src = "../images/send-icon.png"
  myGroupsAndChatsP.innerText = "Chats & groepen"

  authMenuLinksDiv.appendChild(myGroupsAndChatsDiv)
  myGroupsAndChatsDiv.appendChild(myGroupsAndChatsIcon)
  myGroupsAndChatsDiv.appendChild(myGroupsAndChatsP)

  myGroupsAndChatsDiv.addEventListener("click", () =>{
    window.open("../chats-groups.html", "_self");
  });
}

function mySupport(authMenuLinksDiv, userName){
  const mySupportDiv = document.createElement("div")
  mySupportDiv.setAttribute("class", "auth-menu-links-innerdiv")
  mySupportDiv.setAttribute("id", "my-support-div")
  const mySupportIcon = document.createElement("img")
  const mySupportP = document.createElement("p")

  mySupportIcon.src = "../images/comparison-icon.png"
  mySupportP.innerText = "Mijn steunreacties"

  authMenuLinksDiv.appendChild(mySupportDiv)
  mySupportDiv.appendChild(mySupportIcon)
  mySupportDiv.appendChild(mySupportP)

  mySupportDiv.addEventListener("click", () =>{
    window.open("../Vitaminders/" + userName + ".html", "_self");
  });
}

function logOutAuthMenu(authMenu){
    
  const logout = document.createElement("h5")
  logout.setAttribute("id", "button-logout")
  logout.setAttribute("onclick", "logOut()")
  
    logout.innerHTML = "Log uit"

    authMenu.appendChild(logout)
};

!function authQuery(){

  auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);
      userRef.get().then(function(doc) {

          const naamID = doc.data().Gebruikersnaam;
          const naam = doc.data().GebruikersnaamClean
          const profilePicture = doc.data().Profielfoto

          

          profilePictureInMenu(profilePicture, naam, naamID)
          profilePictureInMobileMenu(profilePicture, naamID)

      });
    };
  });
}(); 

// Notifications in authMenu

function supportNotificationInAuthMenu(status){

  if(status === "New"){
          newArray.push("New")
          totalNew.push("New")
  };
};

 function appendNewCountToAuthMenu(newSupportCount, div){

  const authMenuDiv = document.getElementById(div)

  const newCountMenuPrivate = document.createElement("p")
  newCountMenuPrivate.setAttribute("class", "newSupportCountP")

  newCountMenuPrivate.innerText = newSupportCount

  authMenuDiv.appendChild(newCountMenuPrivate)

  if(newSupportCount === 0){
          newCountMenuPrivate.style.display = "none"
  };
};

const totalNew = [];
const newArray = [];

function totalCountInProfilePicture(){

  const profilePicInMenu = document.getElementById("profile-picture")

  const totalP = document.createElement("p")
  totalP.setAttribute("id", "totalNewCountP")

  totalP.innerText = totalNew.length

  profilePicInMenu.prepend(totalP)

  if(totalNew.length === 0){
    totalP.style.display = "none"
  };
};

!function querySupportAuth(){

  auth.onAuthStateChanged(User =>{
    if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {

      const auth = doc.data().Gebruikersnaam

        db.collectionGroup("Support")
        .where("Reciever", "==", auth)
        .orderBy("Timestamp", "desc")
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const status = doc.data().Status

                        supportNotificationInAuthMenu(status)

                });
        }).then(() => {

                const newSupportCount = newArray.length
                appendNewCountToAuthMenu(newSupportCount, "my-support-div")
                appendNewCountToAuthMenu(newSupportCount, "toolbar-digimind-div")
        });
      });
    };
  });
}();

const newMessageArray = [];

!function newMessageChatsInAuthMenu(){

  auth.onAuthStateChanged(User =>{
    if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {

      const auth = doc.data().Gebruikersnaam

        db.collectionGroup("Messages")
        .where("Members", "array-contains", auth)
        // .where("Read", "not-in", [auth])
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

              const read = doc.data().Read
              const message = doc.data().Message

              if(!read.includes(auth)){
           
              newMessageArray.push(doc)
              totalNew.push(doc)
              };

                });
            }).then(() => {

              const newMessageCount = newMessageArray.length

                appendNewCountToAuthMenu(newMessageCount, "groups-chats-div")
                appendNewCountToAuthMenu(newMessageCount, "toolbar-inner-div-chats-groups")

                totalCountInProfilePicture()
        });
      });
    };
  });
}();


// Coach-menu

const voorCoachDOM = document.getElementById("aanmeldCH")
const coachMenu = document.getElementById("coach-menu-main")

if(coachMenu != null){

if(coachMenu.style.display = "none"){
  voorCoachDOM.addEventListener("mouseover", () => {
    coachMenu.style.display = "flex"
  });
} else {
  voorCoachDOM.addEventListener("mouseover", () => {
    coachMenu.style.display = "none"
  });
};
};

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

              window.open("/index.html", "_self");
          };
        });
      });
      };
    });
  }).catch(err => {

    alert("Er heeft zich een fout voor gedaan: " + err)

  })
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

      const notice = document.getElementById("register-notice")
  
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
    userName = firstName +" "+ lastName
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
  })
  .then(() => {
    createFirstGelukstegoed(cred.user.uid)
  })
  .then(() => {
    addNewMemberToHuiskamer(cred.user.uid, userName)
  })
  .then(() => {
    sendConfirmationEmail(email, userName) 
  })
  .then(() => {
            notice.style.display = "flex"
  })
  }).catch((err) => {
    alert(err)
  });
    };
  };
});
};

function createFirstGelukstegoed(usercred){

  db.collection('Vitaminders')
  .doc(usercred)
  .collection("Gelukstegoed")
  .doc().set({
    Amount: 0,
    PaymentId: "none",
    Product: "Account created",
    Type: "Plus",
    Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
};

function sendConfirmationEmail(email, userName){

  db.collection("Mail").doc().set({
    to: [email],
    cc: "info@vitaminds.nu",
    message: {
    subject: `Verifier je account op Vitaminds! `,
    html: `Hallo ${userName}, </br></br>
    Welkom bij de Vitaminds community. Het sociale netwerk voor imperfecte mensen.<br>
    Een community van mensen die het lef hebben om kwetsbaar te zijn en verantwoordelijkheid durven te nemen voor hun eigen leven en persoonlijke ontwikkeling.
    <br><br>
    Je kunt je vanaf nu inloggen met je emailadres en wachtwoord.<br>
    Klik <a href="https://vitaminds.nu/inlog.html"> hier </a> om direct te beginnen.</br></br> 

    Vriendelijke groet, </br></br>
    Het Vitaminds Team </br></br>
    <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
    Gebruikersnaam: userName,
    Emailadres: email,
    Type: "Vitaminders"
    }        
});

};

!function registerVitaminderCoachQuestion(){

  const button = document.getElementById("register-button-question")
  const modal = document.getElementById("register-modal-coaching")

  if(button != null){

  button.addEventListener("click", () => {

    const email = document.getElementById('register-email-question').value;
    const passwordVM = document.getElementById('register-wachtwoord-question').value;
    const passwordInput = document.getElementById('register-wachtwoord-question')
    const repeatPasswordVM = document.getElementById("register-wachtwoord-repeat-question").value
    const repeatPasswordVMInput = document.getElementById("register-wachtwoord-repeat-question")
    const firstName = document.getElementById('register-firstname-question').value;
    const lastName = document.getElementById('register-lastname-question').value;
    const colour = getRandomColor()
 
  let userName = ""

  if (lastName != ""){
    userName = firstName +" "+ lastName
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
      MainGoal: "",
      ID: cred.user.uid,
      Color: colour,
      Levensvragen: [],
      Profielfoto: "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
  })
  .then(() => {
    createFirstGelukstegoed(cred.user.uid)
    modal.style.display = "none"
    showInputAfterRegister()
  });
  }).catch((err) => {
    alert(err)
  });
    };
  };

  });
};
}();


function showInputAfterRegister(){
  const input = document.getElementById("question-input")
  const notice = document.getElementById("visitor-notice")
  const anonymous = document.getElementById("radio-outer-div")
  const button = document.getElementById("button-coach-question")

  input.style.display = "block"
  notice.style.display = "none"
  anonymous.style.display = "block"
  button.style.display = "block"
}

function addNewMemberToHuiskamer(cred, userName){

  db.collection("Coachgroups")
  .doc("4Sxwb5DaZFkM5QqDAu52")
  .update({
    Members: firebase.firestore.FieldValue.arrayUnion(cred + userName)
  });
};

function registerNoticeOK(){
  firebase.auth().signOut().then(function() {
    window.location.href = "/index.html"
  }).catch(function(error) {
    console.log(error)
  })
};

!function registerVitaminderCoachgroup(){

  const button = document.getElementById("register-button-coachgroup")
  const modal = document.getElementById("register-modal-coachgroup")
  const groupLanding = document.getElementById("group-landing-page")

  if(button != null){

  button.addEventListener("click", () => {

    const email = document.getElementById('register-email-coachgroup').value;
    const passwordVM = document.getElementById('register-wachtwoord-coachgroup').value;
    const passwordInput = document.getElementById('register-wachtwoord-coachgroup')
    const repeatPasswordVM = document.getElementById("register-wachtwoord-repeat-coachgroup").value
    const repeatPasswordVMInput = document.getElementById("register-wachtwoord-repeat-coachgroup")
    const firstName = document.getElementById('register-firstname-coachgroup').value;
    const lastName = document.getElementById('register-lastname-coachgroup').value;
    const colour = getRandomColor()
 
  let userName = ""

  if (lastName != ""){
    userName = firstName +" "+ lastName
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
      MainGoal: "",
      ID: cred.user.uid,
      Color: colour,
      Levensvragen: [],
      Profielfoto: "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
  })
  .then(() => {
    createFirstGelukstegoed(cred.user.uid)
    modal.style.display = "none"
    groupLanding.style.display = "none"
  });
  }).catch((err) => {
    alert(err)
  });
    };
  };

  });
};
}();


// Mobile toolbar

!function toolBarMobileInit(){

  const toolbarMobile = document.getElementsByClassName("toolbar-mobile")

  const toolbarCommunity = document.getElementById("toolbar-community")
  const toolbarChatsGroups = document.getElementById("toolbar-chats-groups")
  const toolbarDigimind = document.getElementById("toolbar-digimind-div")


  // Hide on screen bigger then 938
function showToolbarOnMobile(){
  if (window.innerWidth < 938){
          const toolbarMobileArray = Array.from(toolbarMobile)

          toolbarMobileArray.forEach(TB => {
                  TB.style.display = "flex"
          });
  };
};

  !function hideToolBarForVisitor(){

    auth.onAuthStateChanged(User =>{
      if(User){
        showToolbarOnMobile()
        toolBarLinks()
      };
    });
  }();

  // Links
function toolBarLinks(){
  toolbarCommunity.addEventListener("click", (e) => {
          window.open("../cooperations.html", "_self")
  });

  toolbarChatsGroups.addEventListener("click", (e) => {
          window.open("../chats-groups.html", "_self");
  });

  toolbarDigimind.addEventListener("click", (e) => {
          linkDigimind()
  });

  function linkDigimind(){
          auth.onAuthStateChanged(User =>{
                  if(User){
                          const userRef = db.collection("Vitaminders").doc(User.uid);
                          userRef.get().then(function(doc) {

                          const naamID = doc.data().Gebruikersnaam;

                          window.open("../Vitaminders/" + [naamID] + ".html", "_self");
                          });
                  };
          });
  };
};
}();

!function hideRegisterButtonCoachIfAuth(){

  const button = document.getElementById("button-register-coach")

  auth.onAuthStateChanged(User =>{
    if(User){

      button.style.display = "none"

    };
  });
}();
