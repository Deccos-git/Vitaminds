  // Naam uit URL halen
const naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
const naam1 = naamhtml.replace('.html', '')
const naam2 = naam1.replace('%20',' ')
const naam3 = naam2.replace('%20',' ')
const naam4 = naam3.replace('%20',' ')
const naam5 = naam4.replace('%20',' ')
const naam6 = naam5.replace('%20',' ')
const naam7 = naam6.replace('%20',' ')
const naam8 = naam7.replace('%20',' ')
const naam9 = naam8.replace('%20',' ')
const naam10 = naam9.replace('%20',' ')
const naam11 = naam10.replace('%20',' ')
const naam = naam11.replace('%20',' ')

function getMainGoals(){

        db.collection("Vitaminders")
        .where("Usertype", "==", "Vitaminder")   
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const mainGoal = doc.data().MainGoal
                        const gebruikersnaamClean = doc.data().Gebruikersnaam

                        if(mainGoal != undefined){
                                console.log(gebruikersnaamClean, mainGoal)
                        }

                });
        });
};

getMainGoals()

// UPDATE META TAGS
function digimindMetaTags(coachDescription, coach, profilePic){
        const keywords = document.getElementById("meta-keywords")
        const pageTitle = document.getElementById("page-title")
        const description = document.getElementById("meta-description")
        const facebookURL = document.getElementById("facebook-url")
        const facebookTitle = document.getElementById("facebook-title")
        const facebookDescription = document.getElementById("facebook-description")
        const facebookImage = document.getElementById("facebook-img")
        
        keywords.content = coach + "," + coachDescription
        description.content = coachDescription
        facebookURL.content = window.location.href
        facebookTitle.content = `Digmind van ${coach}`
        pageTitle.innerText = `Digmind van ${coach}`
        facebookDescription.content = coachDescription
        facebookImage.content = profilePic
        };

// Private/public button

!function showPrivatePublicIfAuth(){

        const privatePublicDiv = document.getElementById("private-public-div")

        auth.onAuthStateChanged(User =>{
                if(User){
                        db.collection("Vitaminders")
                        .doc(User.uid).get().then(doc =>{

                                const userName = doc.data().Gebruikersnaam

                                if(userName === naam){
                                        privatePublicDiv.style.display = "flex"
                                }

                        });
                };
        });
}();

!function publicPrivateButton(){

        const btns = document.getElementsByClassName("private-public-button");

        for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", function() {

                var current = document.getElementsByClassName("active");

                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
                });
        };
}();

!function switchPrivatePublic(){
        const privateButton = document.getElementById("private-button")
        const publicButton = document.getElementById("public-button")

        const privateSection = document.getElementById("private-section")
        const publicSection = document.getElementById("public-section")

        const myProcesOuterDiv = document.getElementsByClassName("private-outer-div")

        privateButton.addEventListener("click", () => {
                privateSection.style.display = "block"
                publicSection.style.display = "none"
                myProcesOuterDiv[0].style.display = "flex"
        });

        publicButton.addEventListener("click", () => {
                publicSection.style.display = "flex"
                privateSection.style.display = "none"
                myProcesOuterDiv[0].style.display = "none"
                myProcesOuterDiv[1].style.display = "none"
                myProcesOuterDiv[2].style.display = "none"
                myProcesOuterDiv[3].style.display = "none"
                myProcesOuterDiv[4].style.display = "none"
                myProcesOuterDiv[5].style.display = "none"
                myProcesOuterDiv[6].style.display = "none"
        });  
}();

// Public section

function insertProfileImage(profilePhoto){

        const profilePictureDiv = document.getElementById("profile-picture-div")

        const image = document.createElement("img")

        image.src = profilePhoto

        if(profilePhoto === undefined){
                image.src = "../images/dummy-profile-photo.jpeg"
        }

        profilePictureDiv.appendChild(image)

};

function insertUserName(name){

        const userName = document.getElementById("name")

        userName.innerText = name

};

function displayPublicSectionIfExist(dataPoint, div){

        if(dataPoint != undefined){
                div.style.display = "flex"
        }; 

}

function welcomeMessage(userMessage){

        const welcomeMess = document.getElementById("welcome-message")
        const welcomeDiv = document.getElementById("welcome-div")

        const messageP = document.createElement("p")

        messageP.innerHTML = userMessage

        welcomeMess.appendChild(messageP)

        displayPublicSectionIfExist(userMessage, welcomeDiv)
};

function coachingInformation(coachStyle, coachMethode, coachMotivation){

        const styleDiv = document.getElementById("coachingstyle")
        const methodeDiv = document.getElementById("methode")
        const motivationDiv = document.getElementById("motivation")
        const coachInformationDiv = document.getElementById("coaching-div")

        const styleP = document.createElement("p")
        const methodeP = document.createElement("p")
        const motivationP = document.createElement("p")
        
        styleP.innerHTML = coachStyle
        methodeP.innerHTML = coachMethode
        motivationP.innerHTML = coachMotivation

        styleDiv.appendChild(styleP)
        methodeDiv.appendChild(methodeP)
        motivationDiv.appendChild(motivationP)

        displayPublicSectionIfExist(coachStyle ,  coachInformationDiv)

        hideEmptyProfileElements(coachStyle, styleDiv)
        hideEmptyProfileElements(coachMethode, methodeDiv)
        hideEmptyProfileElements(coachMotivation, motivationDiv)

};

function experienceInformation(coachYears, coachExperience, coachEducation){

        const yearsDiv = document.getElementById("years")
        const experienceDiv = document.getElementById("experience")
        const educationDiv = document.getElementById("education")
        const coachExperienceDiv = document.getElementById("experience-div")

        const yearsP = document.createElement("p")
        const experienceP = document.createElement("p")
        const educationP = document.createElement("p")
        
        yearsP.innerHTML = coachYears
        experienceP.innerHTML = coachExperience
        educationP.innerHTML = coachEducation

        yearsDiv.appendChild(yearsP)
        experienceDiv.appendChild(experienceP)
        educationDiv.appendChild(educationP)

        displayPublicSectionIfExist(coachYears, coachExperienceDiv)

        hideEmptyProfileElements(coachYears, yearsDiv)
        hideEmptyProfileElements(coachExperience, experienceDiv)
        hideEmptyProfileElements(coachEducation, educationDiv)

};

function hideEmptyProfileElements(element, div){
        if(element === ""){
                div.style.display = "none"
        };
};

function practicalInformation(coachLocation, coachTargetgroup, coachCosts, coachWebsite, coachTelephone){

        const locationDiv = document.getElementById("location")
        const targetgroupDiv = document.getElementById("targetgroup")
        const costsDiv = document.getElementById("costs")
        const websiteDiv = document.getElementById("website")
        const telephoneDiv = document.getElementById("telephone")
        const practicalDiv = document.getElementById("practical-div")

        const locationP = document.createElement("p")
        const targetgroupP = document.createElement("p")
        const costsP = document.createElement("p")
        const websiteP = document.createElement("p")
        const telephoneP = document.createElement("p")
        
        locationP.innerHTML = coachLocation
        targetgroupP.innerHTML = coachTargetgroup
        costsP.innerHTML = coachCosts
        websiteP.innerHTML = `<a href='https://${coachWebsite}'>${coachWebsite}</a>`
        telephoneP.innerHTML = coachTelephone

        locationDiv.appendChild(locationP)
        targetgroupDiv.appendChild(targetgroupP)
        costsDiv.appendChild(costsP)
        websiteDiv.appendChild(websiteP)
        telephoneDiv.appendChild(telephoneP)

        displayPublicSectionIfExist(coachCosts, practicalDiv)

        hideEmptyProfileElements(coachLocation, locationDiv)
        hideEmptyProfileElements(coachTargetgroup, targetgroupDiv)
        hideEmptyProfileElements(coachCosts, costsDiv)
        hideEmptyProfileElements(coachWebsite, websiteDiv)
        hideEmptyProfileElements(coachTelephone, telephoneDiv)

};

// Follow coach
!function hideFollowButtonNonCoach(){
        const followButton = document.getElementById("follow-button")

        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const usertype = doc.data().Usertype

                        if(usertype === "Coach"){
                                followButton.style.display = "flex"
                        }

                })
        });
}();

!function followUnfollowCoach(){

        const followButton = document.getElementById("follow-button")

        auth.onAuthStateChanged(User =>{
                if(User){
        db.collection("Vitaminders").doc(User.uid).get().then(doc =>{

                        const followers = doc.data().FavCoaches

                        // Hide follow for auth on his own profile
                        const auth = doc.data().Gebruikersnaam

                        if(auth == naam){
                                followButton.style.display = "none" 
                        }
        
                        followersArray = Array.from(followers)
        
                        if(followersArray.includes(naam)){
        
                                followButton.innerHTML = "Ontvolgen"
                                followButton.setAttribute("onclick", "unfollowCoach()")

                        };   
                });
        };
});
}();

// Follow coach

function sendEmailNewFollower(gebruikersnaamFollower){
        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                        const email = doc1.data().Email
                        const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                        const gebruikersnaam = doc1.data().Gebruikersnaam
                

        db.collection("Mail").doc().set({
                to: email,
                cc: "info@vitaminds.nu",
                message: {
                subject: `Nieuwe volger op Vitaminds`,
                html: `Hallo ${gebruikersnaamClean},</br></br>
                
                ${gebruikersnaamFollower} volgt jouw nu op Vitaminds.</br></br>
                
                Vriendelijke groet, </br></br>
                Het Vitaminds Team </br></br>
                <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                Gebruikersnaam: gebruikersnaam
                }
                        
                }).catch((err) => {
                console.log(err)
                });
                });
        });
};

function followCoach(){

        auth.onAuthStateChanged(User =>{
                if(User){
                        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                                const gebruikersnaamCleanFollower = doc.data().GebruikersnaamClean
                        
                        db.collection("Vitaminders").doc(User.uid).update({
                                FavCoaches: firebase.firestore.FieldValue.arrayUnion(naam)
                        }).then(() => {
                                sendEmailNewFollower(gebruikersnaamCleanFollower)
                        });
                });

                        const button = document.getElementById("follow-button")
                        button.innerHTML = "Volgend"
                } else {
                        const followMassageVisitor = document.getElementById("follow-massage-visitor")
                        followMassageVisitor.style.display = "block"
                };
        });
};  

!function followButton(){
        const followButton = document.getElementById("follow-button")

                followButton.addEventListener("click", () => {

                        followCoach();
        });
}();


// Unfollow coach
function unfollowCoach(){

        auth.onAuthStateChanged(User =>{
                if(User){

                        db.collection("Vitaminders").doc(User.uid).update({
                                FavCoaches: firebase.firestore.FieldValue.arrayRemove(naam)
                        }); 

                        const button = document.getElementById("follow-button")
                        button.innerHTML = "Ontvolgd"
                };
        });
};


// Chat
function sendMailNewChat(authUserClean){

        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const email = doc.data().Email
                        const nameClean = doc.data().GebruikersnaamClean
                        const name = doc.data().Gebruikersnaam

        db.collection("Mail").doc().set({
                to: [email],
                cc: "info@vitaminds.nu",
          message: {
          subject: `Nieuw chatverzoek op Vitaminds`,
          html: `Hallo ${nameClean}, </br></br>
               ${authUserClean} heeft je een chatverzoek gestuurd.<br><br> 
                
                Klik <a href="https://vitaminds.nu/chats-groups.html"> hier </a> om naar je chats te gaan.
                Vriendelijke groet, </br></br>
                Het Vitaminds Team </br></br>
                <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
          Gebruikersnaam: name,
          Emailadres: email,
          Type: "Vitaminders"
          }        
          })
          .then(() => {
                window.open(`../Chats/${name}.html`, "_self");
                        });
                });
        });
};

!function startChat(){
        const chatButton = document.getElementById("chat-button")

        chatButton.addEventListener("click", () => {

        auth.onAuthStateChanged(User =>{
                if(User){
                const userRef = db.collection("Vitaminders").doc(User.uid);
                userRef.get().then(function(doc) {

                        const auth = doc.data().Gebruikersnaam
                        const authClean = doc.data().GebruikersnaamClean

                        const roomName = auth<naam ? auth+'_'+naam : naam+'_'+auth;

                        const membersArray = [
                                auth,
                                naam,
                        ]

        db.collection("Chats").doc().set({
                Room: roomName,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Type: "Chat",
                Messages: 0,
                Eigenaar: "Vitaminds",
                Members: membersArray,
                Online: []
        }).then(() => {
                sendMailNewChat(authClean)
        });    
        });
                } else {
                        const notification = document.getElementById("chat-notification-visitor")

                        notification.style.display = "block"
                }
                });
        });
}();

function visitChatIfChatIf(button){

        auth.onAuthStateChanged(User =>{
                if(User){
                const userRef = db.collection("Vitaminders").doc(User.uid);
                userRef.get().then(function(doc) {

                        const auth = doc.data().Gebruikersnaam

                        db.collection("Chats")
                        .where("Members", "array-contains", auth)
                        .get().then(querySnapshot => {
                                querySnapshot.forEach(doc => {

                                        const members = doc.data().Members

                                                if(members.includes(naam)){
                                                        button.innerHTML = `<a id="show-chat" href="../Chats/${naam}.html">Bekijk chat</a>`
                                                        button.id = "show-chat-button"
                                                        button.class = "button-vitaminds"
                                                };
                                        });
                                });
                        });
                };
        });
};


!function hideChatIfAuth(){

        const chatButton = document.getElementById("chat-button")

        visitChatIfChatIf(chatButton)

        auth.onAuthStateChanged(User =>{
                if(User){
                const userRef = db.collection("Vitaminders").doc(User.uid);
                userRef.get().then(function(doc) {

                        const auth = doc.data().Gebruikersnaam
                        const userTypeAuth = doc.data().Usertype

                        if(auth != naam){
                                chatButton.style.display = "flex"   
                        }

                        hideChatIfAuthIsCoachAndUserIsVitaminder(userTypeAuth)

                        });
                };
        });
}();

function hideChatIfAuthIsCoachAndUserIsVitaminder(typeAuth){

        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                const userTypeUser = doc.data().Usertype

                if(typeAuth == "Coach" && userTypeUser == "Vitaminder"){

                        chatButton.style.display = "none"
                        };
                });
        });
};

// Select as coach

!function showSelectAsCoachButtonIfCoach(){

        const selectAsCoachButton = document.getElementById("select-button")

        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const usertype = doc.data().Usertype

                        if(usertype === "Coach"){
                                selectAsCoachButton.style.display = "block"
                        };

                        hideSelectAsCoachIfAuthIsCoach(selectAsCoachButton)
                });
        });
}();

function hideSelectAsCoachIfAuthIsCoach(button){

        auth.onAuthStateChanged(User =>{
                if(User){
                    db.collection("Vitaminders").doc(User.uid)
                    .get().then(function(doc) {
            
                    const auth = doc.data().Gebruikersnaam

                    if (auth === naam){
                            button.style.display = "none"
                    };

                    });
                };
        });
};

function createFile(){
        
}

!function showPublicProcess(){

        const publicProcesDiv = document.getElementById("public-trajects")
        const trajectDiv = document.getElementById("traject-div")

        db.collectionGroup("Levensvragen")
        .where("Gebruikersnaam", "==", naam)
        .where("Openbaar", "==", "Ja")
        .get().then(querySnapshot =>{
                querySnapshot.forEach(doc =>{

                        const ID = doc.data().ID
                        const levensvraagID = doc.data().Levensvraag
                        const levensvragen = levensvraagID.replace(ID, "")
                        const description = doc.data().Omschrijving
                        const goal = doc.data().Goal

                        addLessonsToProces(levensvraagID)

                        const innerDiv = document.createElement("div")
                                innerDiv.setAttribute("class", "digimind-proces-inner-div-public")
                        const goalDiv = document.createElement("div")
                                goalDiv.setAttribute("class", "goal-div")
                        const goalP = document.createElement("p")
                        const levensvraagTitle = document.createElement("h3")
                        const descriptionP = document.createElement("p")

                        goalP.innerHTML = goal
                        levensvraagTitle.innerHTML = levensvragen
                        descriptionP.innerHTML = description

                        publicProcesDiv.appendChild(innerDiv)
                        innerDiv.appendChild(levensvraagTitle)
                        innerDiv.appendChild(descriptionP)

                        trajectDiv.style.display = "flex"
                
                });
        });
}();

// Database Query
!function databaseQueryPublic(){
        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const profileImage = doc.data().Profielfoto
                        const username = doc.data().GebruikersnaamClean
                        const coachMessage = doc.data().Introduction
                        const coachingStyle = doc.data().Coachingstyle
                        const methode = doc.data().Approach
                        const motivation = doc.data().Why
                        const years = doc.data().YearsExperience
                        const education = doc.data().Education
                        const experience = doc.data().Experience
                        const location = doc.data().City
                        const costs = doc.data().Costs
                        const telephone = doc.data().PhoneNumber
                        const targetgroup = doc.data().Targetgroup
                        const website = doc.data().Website

                        digimindMetaTags(coachingStyle, username, profileImage)
                        insertProfileImage(profileImage)
                        insertUserName(username)
                        welcomeMessage(coachMessage)
                        coachingInformation(coachingStyle, methode, motivation)
                        experienceInformation(years, experience, education)
                        practicalInformation(location, targetgroup, costs, website, telephone)

                });
        });
}();

// Private section

!function switchMenuItem(){

        const menuItemDiv = document.getElementById("menu-div")

        const menuItem = menuItemDiv.getElementsByTagName("p")

        for (var i = 0; i < menuItem.length; i++) {
                menuItem[i].addEventListener("click", function() {

                        var current = document.getElementsByClassName("private-menu-active");

                        current[0].className = current[0].className.replace("private-menu-active", "");
                        this.className += "private-menu-active";

                });
        };
}();


function getSection(){

        const mobileMenuSelect = document.getElementById("menu-select-mobile")
        const privateOuterDiv = document.getElementsByClassName("private-outer-div")

        const option = mobileMenuSelect.options
        const selected = option[option.selectedIndex].innerHTML

        if (selected === "Mijn doelen"){
                privateOuterDiv[0].style.display = "flex"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "none"
                privateOuterDiv[6].style.display = "none"
        } else if (selected === "Favoriete coaches"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "flex"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "none"
                privateOuterDiv[6].style.display = "none"
        } else if (selected === "Tools"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "flex"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "none"
                privateOuterDiv[6].style.display = "none"
        } else if (selected === "Analytics"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "flex"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "none"
                privateOuterDiv[6].style.display = "none"
        } else if (selected === "Steunreacties"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "flex"
                privateOuterDiv[5].style.display = "none"
                privateOuterDiv[6].style.display = "none"
        } else if (selected === "Ontwikkeltegoed"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "flex"
                privateOuterDiv[6].style.display = "none"
        } else if (selected === "Mijn profiel"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "none"
                privateOuterDiv[6].style.display = "flex"
        }
};


!function switchSection(){

        const privateSection = document.getElementsByClassName("private-outer-div")

        const menuItemDiv = document.getElementById("menu-div")

        const menuItem = menuItemDiv.getElementsByTagName("p")

        menuItemswitch(menuItem, privateSection, 0, 0, 1, 2, 3, 4, 5, 6)
        menuItemswitch(menuItem, privateSection, 1, 1, 0, 2, 3, 4, 5, 6)
        menuItemswitch(menuItem, privateSection, 2, 2, 0, 1, 3, 4, 5, 6)
        menuItemswitch(menuItem, privateSection, 3, 3, 0, 1, 2, 4, 5, 6)
        menuItemswitch(menuItem, privateSection, 4, 4, 0, 1, 2, 3, 5, 6)
        menuItemswitch(menuItem, privateSection, 5, 5, 0, 1, 2, 3, 4, 6)
        menuItemswitch(menuItem, privateSection, 6, 6, 0, 1, 2, 3, 4, 5)
}();

function menuItemswitch(menuItemCount, privateSectionCount, menu, section, hide1, hide2, hide3, hide4, hide5, hide6 ){

        menuItemCount[menu].addEventListener("click", () => {
                privateSectionCount[section].style.display = "flex"
                privateSectionCount[hide1].style.display = "none"
                privateSectionCount[hide2].style.display = "none"
                privateSectionCount[hide3].style.display = "none"
                privateSectionCount[hide4].style.display = "none"
                privateSectionCount[hide5].style.display = "none"
                privateSectionCount[hide6].style.display = "none"
        });
};

// My proces
!function procesSelect(){

        const procesSelect = document.getElementById("proces-select")
        const procesSelectDiv = document.getElementById("select-proces-div")

        const optionArray = []

        db.collectionGroup("Levensvragen")
        .where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot =>{
                querySnapshot.forEach(doc =>{

                        const procesTitle = doc.data().LevensvraagClean

                        const option = document.createElement("option")

                        option.innerText = procesTitle

                        procesSelect.appendChild(option)

                        optionArray.push(option)

                });
        }).then(() => {
                        autoLoadFirstProces(optionArray[0].innerHTML)
                        showCheckInByProces()
                        procesSelectDiv.style.display = "flex"
        });
}();

function getProces(){

        const selectProces = document.getElementById("proces-select")

        const option = selectProces.options
        const selected = option[option.selectedIndex].innerHTML

        showSelectedProces(selected)
        showCheckInByProces()

};

function showCheckInByProces(){

        const checkInByProces = document.getElementById("check-in-by-proces")

        checkInByProces.style.display = "flex"

};

function saveCheckInByProgress(levensvraagID, publicGoal){

        const button = document.getElementById("save-input-button")

        button.addEventListener("click", () => {
                const input = document.getElementById("check-in-by-proces-input").value
                button.innerText = "Opgeslagen"
                button.id = "Clicked"

                db.collection("Vitaminders")
                .where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot =>{
                        querySnapshot.forEach(doc =>{

                                db.collection("Vitaminders")
                                .doc(doc.id)
                                .collection("Levenslessen")
                                .doc()
                                .set({
                                        Gebruikersnaam: naam,
                                        Levensles: input,
                                        Levensvraag: levensvraagID,
                                        Public: publicGoal,
                                        Status: "Approved",
                                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                        Type: "Check-in"
                                });    
                        });
                });
        });
};

function procesPrivatePublic(openbaarSetting, privateSetting, privateTip){

        // Private or public
        if(openbaarSetting == "Nee"){
                privateSetting.innerHTML = '<img class="edit-icon" src="../images/private.png" alt="Proces is prive" width="20px"> '
                privateSetting.addEventListener("mouseover", () => {
                        privateTip.innerHTML = "Prive"
                        privateTip.style.display = "block"
                });

                } else if(openbaarSetting == "Ja"){
                privateSetting.innerHTML = '<img class="edit-icon" src="../images/public.png" alt="Proces is openbaar" width="20px"> '
                privateSetting.addEventListener("mouseover", () => {
                        privateTip.innerHTML = "Openbaar"
                        privateTip.style.display = "block"
                        });
                };
};

function progressBox(goal, DOCID){

        const progressBoxDOM = document.getElementById("progress-box-outer-div")
        const progressBoxOuterDiv = document.createElement("div")
                progressBoxOuterDiv.setAttribute("id", "progress-box")
        const canvas = document.createElement("canvas")
                canvas.setAttribute("id", "progress-chart")
        
        const title = document.createElement("h3")

        title.innerText = "Ontwikkeling"

        progressBoxDOM.prepend(title)
        progressBoxDOM.appendChild(progressBoxOuterDiv)
        progressBoxOuterDiv.appendChild(canvas)
        selectProgressNumber(progressBoxOuterDiv, goal)

        saveProgressNumberOnClick(goal, DOCID)

};

function selectProgressNumber(progressBoxDiv, goal){

        const numberDiv = document.createElement("div")
                numberDiv.setAttribute("id", "number-div")
                numberDiv.setAttribute("data-goal", goal)
        
        const numberBox1 = document.createElement("p")
        numberBox1.setAttribute("class", "number-inner-box")
        const numberBox2 = document.createElement("p")
        numberBox2.setAttribute("class", "number-inner-box")
        const numberBox3 = document.createElement("p")
        numberBox3.setAttribute("class", "number-inner-box")
        const numberBox4 = document.createElement("p")
        numberBox4.setAttribute("class", "number-inner-box")
        const numberBox5 = document.createElement("p")
        numberBox5.setAttribute("class", "number-inner-box")
        const numberBox6 = document.createElement("p")
        numberBox6.setAttribute("class", "number-inner-box")
        const numberBox7 = document.createElement("p")
        numberBox7.setAttribute("class", "number-inner-box")
        const numberBox8 = document.createElement("p")
        numberBox8.setAttribute("class", "number-inner-box")
        const numberBox9 = document.createElement("p")
        numberBox9.setAttribute("class", "number-inner-box")
        const numberBox10 = document.createElement("p")
        numberBox10.setAttribute("class", "number-inner-box")

        numberBox1.innerText = "1"
        numberBox2.innerText = "2"
        numberBox3.innerText = "3"
        numberBox4.innerText = "4"
        numberBox5.innerText = "5"
        numberBox6.innerText = "6"
        numberBox7.innerText = "7"
        numberBox8.innerText = "8"
        numberBox9.innerText = "9"
        numberBox10.innerText = "10"

        numberBoxCTA(progressBoxDiv)
        progressBoxDiv.appendChild(numberDiv)
        numberDiv.appendChild(numberBox1)
        numberDiv.appendChild(numberBox2)
        numberDiv.appendChild(numberBox3)
        numberDiv.appendChild(numberBox4)
        numberDiv.appendChild(numberBox5)
        numberDiv.appendChild(numberBox6)
        numberDiv.appendChild(numberBox7)
        numberDiv.appendChild(numberBox8)
        numberDiv.appendChild(numberBox9)
        numberDiv.appendChild(numberBox10)

};

function saveProgressNumberOnClick(goal, DOCID){

        const numberInnerDiv = document.getElementsByClassName("number-inner-box")

        const numberInnerDivArray = Array.from(numberInnerDiv)

        numberInnerDivArray.forEach(div => {

                div.addEventListener("click", () => {

                        const number = div.innerText
                        div.setAttribute("class", "Clicked")

                        db.collection("Vitaminders")
                        .where("Gebruikersnaam", "==", naam)
                        .get().then(querySnapshot =>{
                                querySnapshot.forEach(doc =>{

                                        db.collection("Vitaminders")
                                        .doc(doc.id)
                                        .collection("Levensvragen")
                                        .doc(DOCID)
                                        .collection("Progress")
                                        .doc()
                                        .set({
                                                Number: number,
                                                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                                User: naam,
                                                Goal: goal
                                        });
                                });
                        });
                });
        });
};

function numberBoxCTA(progressBoxDiv){

        const numberDivCTATitle = document.createElement("p")
                numberDivCTATitle.setAttribute("id", "number-div-CTA-title")

        numberDivCTATitle.innerText = "Hoe gaat het nu met dit doel?"

        progressBoxDiv.appendChild(numberDivCTATitle)
};

function progressChartAxis(dates, numbers){

        const hapinessChart = document.getElementById('progress-chart').getContext('2d');

const myChart = new Chart(hapinessChart, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Ontwikkeling',
                data: numbers,
                backgroundColor: [
                        "#0c66650D"
                ],
                borderColor: [
                        "#0c6665"
                ],
                borderWidth: 1
            }]
        },
        options: {
                legend: {
                        display: false
                },           
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(label, index, labels) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(label) === label) {
                                    return label;
                                }
                        }
                    }
                }]
            }
        }
    });
};

function fillProgressChartWithData(goal){

        const dateArray = []
        const numberArray = []

        db.collectionGroup("Progress")
        .where("Goal", "==", goal)
        .where("User", "==", naam)
        .orderBy("Timestamp", "asc")
        .onSnapshot(querySnapshot =>{
                querySnapshot.forEach(doc =>{

                        const number = doc.data().Number
                        const date = doc.data().Timestamp

                        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                        const dateLocale = date.toDate().toLocaleDateString("nl-NL", options);
    
                        dateArray.push(dateLocale) 
                        numberArray.push(number)

                        progressChartAxis(dateArray, numberArray)

                });
        });
};


function autoLoadFirstProces(optionZero){

        const procesInnerDiv = document.getElementById("proces-inner-div")

        db.collectionGroup("Levensvragen")
        .where("Gebruikersnaam", "==", naam)
        .where("LevensvraagClean", "==", optionZero)
        .get().then(querySnapshot =>{
                querySnapshot.forEach(doc =>{

                        const ID = doc.data().ID
                        const levensvraagID = doc.data().Levensvraag
                        const levensvragen = levensvraagID.replace(ID, "")
                        const openbaar = doc.data().Openbaar
                        const description = doc.data().Omschrijving
                        const goal = doc.data().Goal
                        const domain = doc.data().Domain

                        addLessonsToProces(levensvraagID)
                        progressBox(levensvraagID, doc.id)
                        fillProgressChartWithData(levensvraagID)
                        saveCheckInByProgress(levensvraagID, openbaar)
                        // showArticles(domain)

                        const innerDiv = document.createElement("div")
                                innerDiv.setAttribute("class", "digimind-proces-inner-div")
                        const goalDiv = document.createElement("div")
                                goalDiv.setAttribute("class", "goal-div")
                        const goalP = document.createElement("p")
                        const levensvraagTitle = document.createElement("h2")
                        const descriptionP = document.createElement("p")
                        const privateDiv = document.createElement("div")
                                privateDiv.setAttribute("class", "private-div")
                        const private = document.createElement("div")
                        const privateTooltip = document.createElement("p")
                                privateTooltip.setAttribute("class", "private-tooltip")

                        goalP.innerHTML = goal
                        levensvraagTitle.innerHTML = levensvragen
                        descriptionP.innerHTML = description

                        procesPrivatePublic(openbaar, private, privateTooltip)

                        procesInnerDiv.appendChild(innerDiv)
                        innerDiv.appendChild(privateDiv)
                        privateDiv.appendChild(private)
                        privateDiv.appendChild(privateTooltip)
                        // innerDiv.appendChild(goalDiv)
                        // goalDiv.appendChild(goalP)
                        innerDiv.appendChild(levensvraagTitle)
                        innerDiv.appendChild(descriptionP)
                
                });
        });
};

function showSelectedProces(selectedProces){

        const procesInnerDiv = document.getElementById("proces-inner-div")
        const progressBoxFilled = document.getElementById("progress-box-outer-div")

        procesInnerDiv.innerHTML = ""
        progressBoxFilled.innerHTML = ""

        db.collectionGroup("Levensvragen")
        .where("Gebruikersnaam", "==", naam)
        .where("LevensvraagClean", "==", selectedProces)
        .get().then(querySnapshot =>{
                querySnapshot.forEach(doc =>{

                        const ID = doc.data().ID
                        const levensvraagID = doc.data().Levensvraag
                        const levensvragen = levensvraagID.replace(ID, "")
                        const openbaar = doc.data().Openbaar
                        const description = doc.data().Omschrijving
                        const goal = doc.data().Goal
                        const domain = doc.data().Domain

                        addLessonsToProces(levensvraagID)
                        progressBox(levensvraagID, doc.id)
                        fillProgressChartWithData(levensvraagID)
                        saveCheckInByProgress(levensvraagID, openbaar)
                        // showArticles(domain)

                        const innerDiv = document.createElement("div")
                                innerDiv.setAttribute("class", "digimind-proces-inner-div")
                        const goalDiv = document.createElement("div")
                                goalDiv.setAttribute("class", "goal-div")
                        const goalP = document.createElement("p")
                        const levensvraagTitle = document.createElement("h2")
                        const descriptionP = document.createElement("p")
                        const privateDiv = document.createElement("div")
                                privateDiv.setAttribute("class", "private-div")
                        const private = document.createElement("div")
                        const privateTooltip = document.createElement("p")
                                privateTooltip.setAttribute("class", "private-tooltip")

                        goalP.innerHTML = goal
                        levensvraagTitle.innerHTML = levensvragen
                        descriptionP.innerHTML = description

                        procesPrivatePublic(openbaar, private, privateTooltip)

                        procesInnerDiv.appendChild(innerDiv)
                        innerDiv.appendChild(privateDiv)
                        privateDiv.appendChild(private)
                        privateDiv.appendChild(privateTooltip)
                        // innerDiv.appendChild(goalDiv)
                        // goalDiv.appendChild(goalP)
                        innerDiv.appendChild(levensvraagTitle)
                        innerDiv.appendChild(descriptionP)

                });
        });
};

function addLessonsToProces(selectedProces){

        const lessonsDiv = document.getElementById("proces-lessons")
        const lessonDivTitle = document.createElement("h3")
                lessonDivTitle.setAttribute("id", "lesson-div-title")
        lessonDivTitle.innerText = "Lessen"

        lessonsDiv.innerHTML = ""

        db.collectionGroup("Levenslessen").where("Levensvraag", "==", selectedProces)
        .orderBy("Timestamp", "desc").get().then(querySnapshot =>{
                querySnapshot.forEach(doc1 =>{     

                        const levensles = doc1.data().Levensles
                        const type = doc1.data().Type
                        const timestamp = doc1.data().Timestamp

                        const levenslesDiv = document.createElement("div")
                                levenslesDiv.setAttribute("class", "levensles-div-ontwikkeling")
                        const levenslesH3 = document.createElement("h3")
                        const metaDiv = document.createElement("div")
                                metaDiv.setAttribute("class", "ontwikkeling-levensles-meta-div")
                        const metaType = document.createElement("p")
                        const metaTimestamp = document.createElement("p")
                
                        levenslesH3.innerHTML = levensles
                        metaType.innerHTML = type
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        metaTimestamp.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

                        lessonsDiv.prepend(lessonDivTitle)
                        lessonsDiv.appendChild(levenslesDiv)
                        levenslesDiv.appendChild(levenslesH3)
                        levenslesDiv.appendChild(metaDiv)
                        metaDiv.appendChild(metaType)
                        metaDiv.appendChild(metaTimestamp)

                });
        });
};

function showInspirationDiv(div){
        div.style.display = "flex"
};

function showArticles(domainAuth){

        const inspirationOuterDiv = document.getElementById("inspiration-outer-div")
        const inspirationDiv = document.getElementById("inspiration-div")

        inspirationOuterDiv.innerHTML = ""

        db.collection("Articles").where("Domain", "==", domainAuth)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const title = doc.data().Title
                        const headerImageSmall = doc.data().HeaderImageSmall
                        
                        inspirationDiv.style.display = "flex"
                
                        const outerSection = document.createElement("section")
                        outerSection.setAttribute("class", "levensvraag-artikel-section")
                        outerSection.setAttribute("data-title", title)
                        const headerDiv = document.createElement("div")
                        headerDiv.setAttribute("class", "levensvraag-artikel-header")
                        const headerImg = document.createElement("img")
                        headerImg.setAttribute("class", "header-image-article")
                        const titleDiv = document.createElement("div")
                        const titleSub = document.createElement("h5")
                        titleSub.setAttribute("class", "titleSub")
                        const titleH2 = document.createElement("h2")
                        titleH2.setAttribute("class", "titelTekst")
                        const buttonDiv = document.createElement("button")
                        buttonDiv.setAttribute("class", "button-algemeen-card")
                        buttonDiv.setAttribute("onclick", "seeArticle(this)")
                
                        titleH2.innerHTML = title
                        headerImg.src = headerImageSmall
                        buttonDiv.innerHTML = `<a href="../Artikelen/${title}.html">Bekijk</a>`
                
                        if(inspirationOuterDiv != null){
                
                        inspirationOuterDiv.appendChild(outerSection)
                        outerSection.appendChild(headerDiv)
                        headerDiv.appendChild(headerImg)
                        outerSection.appendChild(titleDiv)
                        titleDiv.appendChild(titleSub)
                        titleDiv.appendChild(titleH2)
                        outerSection.appendChild(buttonDiv)
                        };
                });
        });
}

// Favorite coaches section

function displayCoachSelectAndOverviewIfFavoriteCoaches(favoriteCoachesQuery){

        const coachSelectDiv = document.getElementById("coach-select-div")
        const overViewDiv = document.getElementById("favorite-coaches-div")

        if (favoriteCoachesQuery != undefined){
                coachSelectDiv.style.display = "flex"
                overViewDiv.style.display = "flex"
        };

};

!function favoriteCoachesQuery(){
        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const favoriteCoaches = doc.data().FavCoaches

                        displayCoachSelectAndOverviewIfFavoriteCoaches(favoriteCoaches)

                        favoriteCoaches.forEach(coach => {

                                loadCoach(coach)
                                getFavoriteCoaches(coach)
                                
                        });
                });
        });
}();

function coachSelect(nameCoach){

        const favoriteCoachesSelect = document.getElementById("favorite-coaches-select")

        const option = document.createElement("option")

        option.innerText = nameCoach

        favoriteCoachesSelect.appendChild(option)
};

function getFavoriteCoaches(naam){

        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const name = doc.data().GebruikersnaamClean

                        coachSelect(name)

                });
        });
};

function loadCoach(coach){

        db.collection("Articles").where("Author", "==", coach)
        .orderBy("Timestamp", "desc")
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const titelInsight = doc.data().Title
                        const coach = doc.data().Author
                        const timestamp = doc.data().Timestamp

                        createCoachDOMElements(coach, titelInsight, timestamp)

                });
        });
};

function selectCoach(){

        const selectCoach = document.getElementById("favorite-coaches-select")

        const favoriteCoachesOuterDiv = document.getElementById("favorite-coaches-div")

        favoriteCoachesOuterDiv.innerHTML = ""

        const option = selectCoach.options
        const selected = option[option.selectedIndex].innerHTML

        db.collection("Vitaminders").where("GebruikersnaamClean", "==", selected)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const name = doc.data().Gebruikersnaam

                        loadCoach(name)

                });
        });     
};

function createCoachDOMElements(coachName, title,time){

        const favoriteCoachesOuterDiv = document.getElementById("favorite-coaches-div")

        db.collection("Vitaminders").where("Gebruikersnaam", "==", coachName)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const gebruikersnaamClean = doc.data().GebruikersnaamClean
                    const photo = doc.data().Profielfoto
        
        const outerDiv = document.createElement("div")
                outerDiv.setAttribute("class", "insights-outer-div")
                outerDiv.setAttribute("data-coach", coachName)
        const metaDiv = document.createElement("div")
                metaDiv.setAttribute("class", "meta-div-insights")
        const metaPhoto = document.createElement("img")
                metaPhoto.setAttribute("class", "meta-photo")
        const metaName = document.createElement("p")
        const textDiv = document.createElement("div")
                textDiv.setAttribute("class", "text-div-insights")
        const textTitle = document.createElement("h2") 
        const date = document.createElement("p")
                date.setAttribute("id", "insight-timestamp")

        metaPhoto.src = photo
        metaName.innerHTML = gebruikersnaamClean
        textTitle.innerHTML = title
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        date.innerHTML = time.toDate().toLocaleDateString("nl-NL", options);

        if(title != undefined){

        textDiv.addEventListener("click", () => {
                window.open("../Artikelen/" + title + ".html", "_self");
                });
        };


        metaDiv.addEventListener("click", () => {
                window.open("../Vitaminders/" + coachName + ".html", "_self");
        });

        favoriteCoachesOuterDiv.appendChild(outerDiv)
        outerDiv.appendChild(metaDiv)
        metaDiv.appendChild(metaPhoto)
        metaDiv.appendChild(metaName)
        outerDiv.appendChild(textDiv)
        textDiv.appendChild(textTitle)
        textTitle.appendChild(date)
        
                        
                });
        });
};

// Tools

function getTool(){

        const toolSelect = document.getElementById("select-tool")
        const happinessChartDiv = document.getElementById("happiness-scale-div")
        const checkInDiv = document.getElementById("check-in-div")
        const gratitudeDiv = document.getElementById("gratitute-journal-div")
        const resourcesDiv = document.getElementById("resources-div")

        const option = toolSelect.options
        const selected = option[option.selectedIndex].innerHTML

        if(selected === "Geluksschaal"){
                happinessChartDiv.style.display = "flex"
                checkInDiv.style.display = "none"
                gratitudeDiv.style.display = "none"
                resourcesDiv.style.display = "none"
        } else if (selected === "Stok achter de deur"){
                checkInDiv.style.display = "flex"
                gratitudeDiv.style.display = "none" 
                happinessChartDiv.style.display = "none"
                resourcesDiv.style.display = "none"
        } else if (selected === "Dankbaarheidsdagboek"){
                gratitudeDiv.style.display = "flex"
                checkInDiv.style.display = "none"
                happinessChartDiv.style.display = "none"
                resourcesDiv.style.display = "none"
        } else if (selected === "Hulpbronnen"){
                resourcesDiv.style.display = "flex"
                gratitudeDiv.style.display = "none"
                checkInDiv.style.display = "none"
                happinessChartDiv.style.display = "none"
        };
};

function showToolOptionIfInstalled(toolName, optionID, optionValue, optionText){

        const selectDiv = document.getElementById("select-div")

        const toolSelect = document.getElementById("select-tool")
        const option = document.createElement("option")
                option.setAttribute("id", optionID)
                option.setAttribute("value", optionValue)

        option.innerText = optionText

        auth.onAuthStateChanged(User =>{
                db.collection("Vitaminders").doc(User.uid)
                .get()
                    .then(doc => {
                        const tools = doc.data().Tools

                        if(tools.includes(toolName)){
                                toolSelect.appendChild(option)

                                selectDiv.style.display = "block"
                        };
                })
                .then(() => {
                        showFirstToolInSelect(toolSelect)
                })
        });
};

showToolOptionIfInstalled("Check in", "check-in-option", "check-in", "Stok achter de deur")
showToolOptionIfInstalled("Happiness Chart", "happiness-option", "happiness-scale", "Geluksschaal")
showToolOptionIfInstalled("Gratitude Journal", "gratitude-option", "gratitude-journal", "Dankbaarheidsdagboek")
showToolOptionIfInstalled("Resources", "resource-option", "resource", "Hulpbronnen")

function showFirstToolInSelect(toolSelect){

        const option = toolSelect.querySelectorAll("option")[0].value

        const hapinessChart = document.getElementById("happiness-scale-div")
        const checkInDiv = document.getElementById("check-in-div")
        const gratitudeDiv = document.getElementById("gratitute-journal-div")

        if(option === "happiness-scale"){
                hapinessChart.style.display = "flex"
        } else if (option === "gratitude-journal"){
                gratitudeDiv.style.display = "flex"
        } else if (option === "check-in"){
                checkInDiv.style.display = "flex"
        }; 
};

   
function hapinessChartAxis(dates, heightOfHapiness){

        const hapinessChart = document.getElementById('happiness-chart').getContext('2d');

const myChart = new Chart(hapinessChart, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Geluksniveau',
                data: heightOfHapiness,
                backgroundColor: [
                        "#0c66650D"
                ],
                borderColor: [
                        "#0c6665"
                ],
                borderWidth: 1
            }]
        },
        options: {
                legend: {
                        display: false
                },           
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(label, index, labels) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(label) === label) {
                                    return label;
                                }
                        }
                    }
                }]
            }
        }
    });
};

!function fillHapinessChartWithData(){
const dateArray = []
const heightArray = []

        db.collectionGroup("HapinessScale")
        .orderBy("Timestamp", "asc")
        .where("User", "==", naam)
        .onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const height = doc.data().Height
                    const date = doc.data().Timestamp

                    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                    const dateLocale = date.toDate().toLocaleDateString("nl-NL", options);

                    dateArray.push(dateLocale) 
                    heightArray.push(height)

                    hapinessChartAxis(dateArray, heightArray)

                });
        });
}();

!function newHappinessEntry(){
        const veryLow = document.getElementsByClassName("hapiness-scale-img")

        veryLow[0].addEventListener("mouseover", () => {
                veryLow[0].src = "../images/hapiness-scale/heel-laag-hover.png"
                veryLow[1].src = "../images/hapiness-scale/laag.png"
                veryLow[2].src = "../images/hapiness-scale/neutral.png"
                veryLow[3].src = "../images/hapiness-scale/hoog.png"
                veryLow[4].src = "../images/hapiness-scale/heel hoog.png"
        });

        veryLow[1].addEventListener("mouseover", () => {
                veryLow[0].src = "../images/hapiness-scale/heel-laag-hover.png"
                veryLow[1].src = "../images/hapiness-scale/laag-hover.png"
                veryLow[2].src = "../images/hapiness-scale/neutral.png"
                veryLow[3].src = "../images/hapiness-scale/hoog.png"
                veryLow[4].src = "../images/hapiness-scale/heel hoog.png"
        });

        veryLow[2].addEventListener("mouseover", () => {
                veryLow[0].src = "../images/hapiness-scale/heel-laag-hover.png"
                veryLow[1].src = "../images/hapiness-scale/laag-hover.png"
                veryLow[2].src = "../images/hapiness-scale/neutral-hover.png"
                veryLow[3].src = "../images/hapiness-scale/hoog.png"
                veryLow[4].src = "../images/hapiness-scale/heel hoog.png"
        });

        veryLow[3].addEventListener("mouseover", () => {
                veryLow[0].src = "../images/hapiness-scale/heel-laag-hover.png"
                veryLow[1].src = "../images/hapiness-scale/laag-hover.png"
                veryLow[2].src = "../images/hapiness-scale/neutral-hover.png"
                veryLow[3].src = "../images/hapiness-scale/hoog-hover.png"
                veryLow[4].src = "../images/hapiness-scale/heel hoog.png"
        });

        veryLow[4].addEventListener("mouseover", () => {
                veryLow[0].src = "../images/hapiness-scale/heel-laag-hover.png"
                veryLow[1].src = "../images/hapiness-scale/laag-hover.png"
                veryLow[2].src = "../images/hapiness-scale/neutral-hover.png"
                veryLow[3].src = "../images/hapiness-scale/hoog-hover.png"
                veryLow[4].src = "../images/hapiness-scale/heel hoog-hover.png"
        });

        saveHapiness(0, veryLow)
        saveHapiness(1, veryLow)
        saveHapiness(2, veryLow)
        saveHapiness(3, veryLow)
        saveHapiness(4, veryLow)
}();


function saveHapiness(heightOfHapiness, veryLow){

        const happinessEntryNotice = document.getElementById("happiness-entry-notice")

        veryLow[heightOfHapiness].addEventListener("click", () => { 

                auth.onAuthStateChanged(User =>{
                        if (User){
                        db.collection("Vitaminders").doc(User.uid)
                        .collection("HapinessScale").doc()
                                .set({
                                        Height: heightOfHapiness,
                                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                        Eigenaar: "Vitaminds",
                                        User: naam
                                })
                        };
                });
        });
};




!function saveNewGratitute(){

        const saveNewGratituteButton = document.getElementById("save-new-gratitude-button")

        saveNewGratituteButton.addEventListener("click", () => {

                const privatePublicOption = document.querySelector('input[name="public-private-gratitude"]:checked').value;

                const newInput = document.getElementById("gratitude-input").value
                saveNewGratituteButton.innerText = "Opgeslagen"
                saveNewGratituteButton.id = "Clicked"
                newInput.value = ""

                db.collection("Tools").doc().set({
                        Type: "Gratitude",
                        Gratitude: newInput,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        Owner: "Vitaminds",
                        User: naam,
                        PublicPrivate: privatePublicOption,
                });
        });
}();

function emptyScreenByOnsnapshot(){
        const gratitudeDivsUser = document.getElementsByClassName("gratitude-div")
        const DOMgratitudeScreen = document.getElementById("page-div")
    
        const gratitudeDivsArrayUser = Array.from(gratitudeDivsUser)
    
        gratitudeDivsArrayUser.forEach(gratitudeUser => {
                DOMgratitudeScreen.removeChild(gratitudeUser)
        });
    };

!function displayGratitudesInOverview(){

        const journalPage = document.getElementById("page-div")

        db.collection("Tools")
        .where("Type", "==", "Gratitude")
        .where("User", "==", naam)
        .orderBy("Timestamp", "desc")
        .onSnapshot(querySnapshot => {

                emptyScreenByOnsnapshot()

                querySnapshot.forEach(doc => {

                        const gratitude = doc.data().Gratitude
                        const timestamp = doc.data().Timestamp
                        const publicPrivate = doc.data().PublicPrivate

                        const gratitudeDiv = document.createElement("div")
                                gratitudeDiv.setAttribute("class", "gratitude-div")
                        const gratitudeH3 = document.createElement("h3")
                        const publicPrivateImgDiv = document.createElement("div")
                                publicPrivateImgDiv.setAttribute("class", "public-private-image-div")
                        const publicPrivateImg = document.createElement("img")
                        const dateP = document.createElement("p")

                        gratitudeH3.innerText = gratitude
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options)

                        showPublicPrivateOptionOnHoverOverIcon(publicPrivateImgDiv, publicPrivate, publicPrivateImg, gratitude)

                        if(publicPrivate === "Private"){
                                publicPrivateImg.src = "../images/private.png"
                        } else if (publicPrivate === "Public"){
                                publicPrivateImg.src = "../images/public.png"
                        };

                        journalPage.appendChild(gratitudeDiv)
                        gratitudeDiv.appendChild(dateP)
                        gratitudeDiv.appendChild(publicPrivateImgDiv)
                        publicPrivateImgDiv.appendChild(publicPrivateImg)
                        gratitudeDiv.appendChild(gratitudeH3)

                });
        });
}();

function setPublicPrivateStatusOfGratitude(elem){

        elem.innerHTML = `<p id="changed-notice">Gewijzigd</p>`

        const gratitudeTitle = elem.gratitude
        const privatePublicStatus = elem.dataset.status

        let status = ""

        if(privatePublicStatus === "Private"){
                status = "Public"
        } else if (privatePublicStatus === "Public"){
                status = "Private"
        };

        db.collection("Tools")
        .where("Type", "==", "Gratitude")
        .where("Gratitude", "==", gratitudeTitle)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        db.collection("Tools")
                        .doc(doc.id).update({
                                PublicPrivate: status
                        })
                });
        });
};

function showPublicPrivateOptionOnHoverOverIcon(icon, status, image, gratitude){

        image.addEventListener("click", () => {

                const optionsDiv = document.createElement("div")
                        optionsDiv.setAttribute("class", "options-div")
                const noticeP = document.createElement("p")
                const changeStatusDiv = document.createElement("div")
                        changeStatusDiv.setAttribute("class", "change-status-div")
                        changeStatusDiv.setAttribute("onclick", "setPublicPrivateStatusOfGratitude(this)")
                        changeStatusDiv.setAttribute("data-gratitude", gratitude)
                        changeStatusDiv.setAttribute("data-status", status)
                const changeStatusImg = document.createElement("img")
                const changeStatusP = document.createElement("p")
                        changeStatusP.setAttribute("class", "change-status-public-private-gratitude")

                if(status === "Private"){
                        noticeP.innerHTML = `Huidige status: <b>prive</b>` 
                        changeStatusP.innerHTML = `Verander naar <b>openbaar</b>`
                } else if (status === "Public"){
                        noticeP.innerHTML = `Huidige status: <b>openbaar</b>`
                        changeStatusP.innerHTML = `Verander naar <b>prive</b>`
                };

                changeStatusImg.src = "../images/design/change-icon.png"

                icon.appendChild(optionsDiv)
                optionsDiv.appendChild(noticeP)
                optionsDiv.appendChild(changeStatusDiv)
                changeStatusDiv.appendChild(changeStatusImg)
                changeStatusDiv.appendChild(changeStatusP)
        });
};

!function queryCheckinsUser(){
        db.collection("Tools").where("Tool", "==", "Check-in")
        .where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const goal = doc.data().Levensvraag

                });
        });
}();

!function userGoalsInSelectCheckinTool(){

const goalSelect = document.getElementById("check-in-select-goals")

        db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const goal = doc.data().LevensvraagClean

                        const option = document.createElement("option")

                        option.innerHTML = goal

                        goalSelect.appendChild(option)

                })
        });
}();

function activateCheckIn(){

        // Filtered goal
        const goalOptionDiv = document.getElementById("check-in-select-goals")

        const goalSelect = goalOptionDiv.options
        const goalOption = goalSelect[goalSelect.selectedIndex].innerHTML;

        // Filtered frequence
        // const freqOptionDiv = document.getElementById("check-in-select-frequence")

        // const freqSelect = freqOptionDiv.options
        // const freqOption = freqSelect[freqSelect.selectedIndex].innerHTML;

        db.collection("Practice").doc().set({
                Gebruikersnaam: naam,
                Levensvraag: goalOption,
                Practice: "Check-in",
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        }).then(() => {
                const activateNotice = document.getElementById("activate-notice")

                activateNotice.innerHTML = `Stok achter de deur geactiveerd voor ${goalOption}`
                activateNotice.style.display = "block"
        }).then(() => {
                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", goalOption).get().then(querySnapshot => {
                                        querySnapshot.forEach(doc1 => {
        
                                                const levensvraag = doc1.data().Levensvraag

                                db.collection("Vitaminders").doc(doc.id).collection("Levenslessen").doc().set({
                                        Type: "Tool: Check in",
                                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                        Gebruikersnaam: naam,
                                        Levensvraag: levensvraag,
                                        Levensles: "Tool geactiveerd: Check in"
                                                })
                                        })
                                })
                        });
                });
        }).then(() => {
                db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", goalOption).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                const levensvraag = doc.data().Levensvraag

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {
                db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraag).get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {

                                db.collection("Vitaminders").doc(doc1.id).collection("Levensvragen").doc(doc2.id).update({
                                        Levenslessen: firebase.firestore.FieldValue.arrayUnion("Tool geactiveerd: Check in")
                                                        });
                                                })
                                        });
                                })
                        });
                })
        })
})
};

// Display activated goals

const activeGoalsDiv = document.getElementById("activated-goals")

const activatedGoalsInnerDiv = document.createElement("div")
const activeGoalsH3 = document.createElement("h3")

activeGoalsH3.innerHTML = "Geactiveerde doelen"

db.collectionGroup("Levensvragen").where("Levenslessen", "array-contains", "Tool geactiveerd: Check in")
.where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const levensvragen = doc.data().LevensvraagClean
                        const activeGoalP = document.createElement("p")

                        activeGoalP.innerHTML = levensvragen

                        activeGoalsDiv.appendChild(activeGoalsH3)
                        activeGoalsDiv.appendChild(activatedGoalsInnerDiv)
                        activatedGoalsInnerDiv.appendChild(activeGoalP)
        });
});

// Resources tool

!function saveNewResource(){

        const saveNewResourceButton = document.getElementById("save-new-resource")

        saveNewResourceButton.addEventListener("click", () => {

                const privatePublicOption = document.querySelector('input[name="public-private-resource"]:checked').value;

                const newInput = document.getElementById("resource-input").value
                saveNewResourceButton.innerText = "Opgeslagen"

                db.collection("Tools").doc().set({
                        Type: "Resource",
                        Resource: newInput,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        Owner: "Vitaminds",
                        User: naam,
                        PublicPrivate: privatePublicOption,
                });
        });
}();

!function displayResourcesInOverview(){

        const resourcesOverview = document.getElementById("resources-overview-div")

        db.collection("Tools")
        .where("Type", "==", "Resource")
        .where("User", "==", naam)
        .orderBy("Timestamp", "desc")
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const resource = doc.data().Resource
                        const timestamp = doc.data().Timestamp
                        const publicPrivate = doc.data().PublicPrivate

                        const resourceDiv = document.createElement("div")
                                resourceDiv.setAttribute("class", "resource-inner-div")
                        const resourceH3 = document.createElement("h3")
                        const publicPrivateImgDiv = document.createElement("div")
                                publicPrivateImgDiv.setAttribute("class", "public-private-image-div")
                        const publicPrivateImg = document.createElement("img")
                        const dateP = document.createElement("p")

                        resourceH3.innerText = resource
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options)

                        showPublicPrivateOptionOnHoverOverIconResource(publicPrivateImgDiv, publicPrivate, publicPrivateImg, resource)

                        if(publicPrivate === "Private"){
                                publicPrivateImg.src = "../images/private.png"
                        } else if (publicPrivate === "Public"){
                                publicPrivateImg.src = "../images/public.png"
                        };

                        resourcesOverview.appendChild(resourceDiv)
                        resourceDiv.appendChild(dateP)
                        resourceDiv.appendChild(publicPrivateImgDiv)
                        publicPrivateImgDiv.appendChild(publicPrivateImg)
                        resourceDiv.appendChild(resourceH3)

                });
        });
}();

function setPublicPrivateStatusOfResource(elem){

        elem.innerHTML = `<p id="changed-notice">Gewijzigd</p>`

        const resourceTitle = elem.dataset.resource
        const privatePublicStatus = elem.dataset.status

        let status = ""

        if(privatePublicStatus === "Private"){
                status = "Public"
        } else if (privatePublicStatus === "Public"){
                status = "Private"
        };

        db.collection("Tools")
        .where("Type", "==", "Resource")
        .where("Resource", "==", resourceTitle)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        db.collection("Tools")
                        .doc(doc.id).update({
                                PublicPrivate: status
                        })
                });
        });
};

function showPublicPrivateOptionOnHoverOverIconResource(icon, status, image, resource){

        image.addEventListener("click", () => {

                const optionsDiv = document.createElement("div")
                        optionsDiv.setAttribute("class", "options-div")
                const noticeP = document.createElement("p")
                const changeStatusDiv = document.createElement("div")
                        changeStatusDiv.setAttribute("class", "change-status-div")
                        changeStatusDiv.setAttribute("onclick", "setPublicPrivateStatusOfResource(this)")
                        changeStatusDiv.setAttribute("data-resource", resource)
                        changeStatusDiv.setAttribute("data-status", status)
                const changeStatusImg = document.createElement("img")
                const changeStatusP = document.createElement("p")
                        changeStatusP.setAttribute("class", "change-status-public-private-resourse")

                if(status === "Private"){
                        noticeP.innerHTML = `Huidige status: <b>prive</b>` 
                        changeStatusP.innerHTML = `Verander naar <b>openbaar</b>`
                } else if (status === "Public"){
                        noticeP.innerHTML = `Huidige status: <b>openbaar</b>`
                        changeStatusP.innerHTML = `Verander naar <b>prive</b>`
                };

                changeStatusImg.src = "../images/design/change-icon.png"

                icon.appendChild(optionsDiv)
                optionsDiv.appendChild(noticeP)
                optionsDiv.appendChild(changeStatusDiv)
                changeStatusDiv.appendChild(changeStatusImg)
                changeStatusDiv.appendChild(changeStatusP)
        });
};

// Analytics

const adminDiv = document.getElementById("admin-analytics")
 const earningsDiv = document.getElementById("earnings-analytics")
 const tractionDiv = document.getElementById("traction-analytics")

 function hideAnalyticsIfNoCoach(type){

        const analyticsMenuItem = document.getElementById("analytics-menu-item")

                if(type === "Coach"){

                        analyticsMenuItem.style.display = "flex"
                };
 };

 function showAdminAnalyticsForAdmin(adminType){
     if(adminType === "Yes"){
         adminDiv.style.display = "flex"
     }
 }

 function numberOfWebsiteClicks(amountOfClicks){

    const websiteClicksCard = document.getElementById("website-clicks")

    const numberOfClicks = document.createElement("p")
        numberOfClicks.setAttribute("class", "numbers-analytics")

    numberOfClicks.innerText = amountOfClicks

    websiteClicksCard.appendChild(numberOfClicks)
 };

 function numberOfProfileViews(amountOfViews){

    const profileViewsCard = document.getElementById("profile-views")

        const numberOfViews = document.createElement("p")
            numberOfViews.setAttribute("class", "numbers-analytics")

        numberOfViews.innerText = amountOfViews

        profileViewsCard.appendChild(numberOfViews)
 };

 function numberOfArticleViews(authCreator){

    const articleViewCard = document.getElementById("article-views")

    const numberOfViews = document.createElement("p")
        numberOfViews.setAttribute("class", "numbers-analytics")

    db.collection("Insights").where("Type", "==", "Insight-levensvraag")
    .where("Auteur", "==", authCreator)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const article = doc.data().LevensvraagArtikel

            db.collection("Levensvragen").where("Levensvraag", "==", article)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const views = doc1.data().Views

                    numberOfViews.innerText = views

                    articleViewCard.appendChild(numberOfViews)
                });
            });
        });
    });
 };

 function numberOfWorkshopViews(authCoach){

    const workshopViewsCard = document.getElementById("workshop-views")

    const numberOfWorkshopViews = document.createElement("p")
        numberOfWorkshopViews.setAttribute("class", "numbers-analytics")

    db.collection("Workshops").where("Coach", "==", authCoach)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const views = doc.data().Views

            numberOfWorkshopViews.innerText = views

            workshopViewsCard.appendChild(numberOfWorkshopViews)
        });
    });
 };

 function earnings(docReference){

    const earningsDiv = document.getElementById("earnings-inner-div")
    const earningsTotal = document.getElementById("total-earnings")
    const earningsTotalUnbilled = document.getElementById("total-earnings-unbilled")

    const unbilledAmountArray = []
    const amountArray = []

    docReference.collection("Earnings")
    .orderBy("Timestamp", "desc")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const amount = doc.data().Earning
            const source = doc.data().Source
            const date = doc.data().Timestamp
            const billed = doc.data().Billed
            const billingDate = doc.data().BillingDate

            const card = document.createElement("div")
                card.setAttribute("class", "analytics-card")
            const amountP = document.createElement("p")
                amountP.setAttribute("class", "numbers-analytics")
            const sourceP = document.createElement("p")
            const dateP = document.createElement("p")
                dateP.setAttribute("id", "date-p")
            const billedP = document.createElement("p")

            // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            //     billingDate.innerHTML = date.toDate().toLocaleDateString("nl-NL", options);

            if(billed === "No"){
                billedP.innerText = "Niet gefacturereerd"
            } else if (billed === "Yes"){
                billedP.innerText = `Gefactureerd op ${billingDate}`
            }

            amountP.innerText = `€${amount}`
            sourceP.innerHTML = source
            const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                dateP.innerHTML = date.toDate().toLocaleDateString("nl-NL", optionsDate);
            
            earningsDiv.appendChild(card)
            card.appendChild(amountP)
            card.appendChild(sourceP)
            card.appendChild(dateP)

            // Total earnings
            amountArray.push(amount)

            const sum = amountArray.reduce((pv, cv) => pv + cv, 0);

            earningsTotal.innerText = `€${sum}`

            // Total unbilled earnings 
            docReference.collection("Earnings")
            .where("Billed", "==", "No")
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const amountUnbilled = doc.data().Earning

            unbilledAmountArray.push(amountUnbilled)

            const sumUnbilled = unbilledAmountArray.reduce((pv, cv) => pv + cv, 0);

            earningsTotalUnbilled.innerText = `€${sumUnbilled}`

                });
            });
        });
    });
 }

 auth.onAuthStateChanged(User =>{
    if (User){
        const docRef = db.collection("Vitaminders").doc(User.uid);
            docRef.get().then(function(doc){

                const auth = doc.data().Gebruikersnaam
                const admin = doc.data().Admin
                const websiteClicks = doc.data().WebsiteClicks
                const profileViews = doc.data().ProfileViews
                const usertype = doc.data().Usertype

                if(auth === naam){

                    showAdminAnalyticsForAdmin(admin)
                    numberOfWebsiteClicks(websiteClicks)
                    numberOfProfileViews(profileViews)
                    numberOfArticleViews(auth)
                    numberOfWorkshopViews(auth)
                    earnings(docRef)
                };

                hideAnalyticsIfNoCoach(usertype)

            });
        };
    });


// Admin

!function flaggedAnalytics(){
    const flaggedCard = document.getElementById("analytics-card-flagged")
    const ul = document.createElement("ul")

    db.collectionGroup("Levenslessen")
    .where("Status", "==", "Under review")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const username = doc.data().Gebruikersnaam

            const li = document.createElement("li")

            li.innerText = username

            flaggedCard.appendChild(ul)
            ul.appendChild(li)

        });
    });
}();

!function numberOfCoaches(){

    const basicCoachesArray = []
    const premiumCoachesArray = []

    const numberOfBasicCoaches = document.getElementById("basic-coaches")
    const neumberOfPremiumCoaches = document.getElementById("premium-coaches")

    const basicCoachesP = document.createElement("p")
    const premiumCoachesP = document.createElement("p")

    db.collection("Vitaminders").where("Usertype", "==", "Coach")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const subscriptionType = doc.data().SubscriptionType

            if (subscriptionType === "Basic"){
                basicCoachesArray.push(subscriptionType)
            } else if (subscriptionType === "Premium"){
                premiumCoachesArray.push(subscriptionType)
            };
        });
    }).then(() => {

        basicCoachesP.innerText = basicCoachesArray.length
        premiumCoachesP.innerText = premiumCoachesArray.length

        numberOfBasicCoaches.appendChild(basicCoachesP)
        neumberOfPremiumCoaches.appendChild(premiumCoachesP)
    });
}();

!function numberOfVitaminders(){

    const vitamindersArray = []

    const numberOfVitaminders = document.getElementById("vitaminders")

    const vitamindersP = document.createElement("p")

    db.collection("Vitaminders").where("Usertype", "==", "Vitaminder")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                vitamindersArray.push(doc)

        });
    }).then(() => {

        vitamindersP.innerText = vitamindersArray.length

        numberOfVitaminders.appendChild(vitamindersP)
    });

}();

!function numberOfWorkshops(){

    const workshopsArray = []

    const numberOfWorkshops = document.getElementById("workshops")

    const workshopsP = document.createElement("p")

    db.collection("Workshops").where("Eigenaar", "==", "Vitaminds")
    .where("Status", "==", "Public")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                workshopsArray.push(doc)

        });
    }).then(() => {

        workshopsP.innerText = workshopsArray.length

        numberOfWorkshops.appendChild(workshopsP)
    });

}();

!function numberOfWorkshopsDraft(){

        const workshopsArray = []
    
        const numberOfWorkshopsDraft = document.getElementById("analytics-card-workshops")
    
        const workshopsP = document.createElement("p")
    
        db.collection("Workshops").where("Eigenaar", "==", "Vitaminds")
        .where("Status", "==", "Draft")
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                    workshopsArray.push(doc)
    
            });
        }).then(() => {
    
            workshopsP.innerText = workshopsArray.length
    
            numberOfWorkshopsDraft.appendChild(workshopsP)
        });
    
    }();

!function numberOfArticles(){

    const insightsArray = []

    const numberOfInsights = document.getElementById("insights")

    const insightsP = document.createElement("p")

    db.collection("Articles").where("Owner", "==", "Vitaminds")
    .where("Status", "==", "Approved")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                insightsArray.push(doc)
        });
    }).then(() => {

        insightsP.innerText = insightsArray.length

        numberOfInsights.appendChild(insightsP)
    });

}();

!function numberOfArticlesDraft(){

        const insightsArray = []
    
        const numberOfNewArticles = document.getElementById("analytics-card-articles")
    
        const insightsP = document.createElement("p")
    
        db.collection("Articles").where("Owner", "==", "Vitaminds")
        .where("Status", "==", "Draft")
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                    insightsArray.push(doc)
            });
        }).then(() => {
    
            insightsP.innerText = insightsArray.length
    
            numberOfNewArticles.appendChild(insightsP)
        });
    
    }();

!function numberOCoachgroups(){

    const coachgroupsArray = []

    const numberOfCoachgroups = document.getElementById("coachgroups")

    const coachgroupsP = document.createElement("p")

    db.collection("Coachgroups").where("Eigenaar", "==", "Vitaminds")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                coachgroupsArray.push(doc)
        });
    }).then(() => {

        coachgroupsP.innerText = coachgroupsArray.length

        numberOfCoachgroups.appendChild(coachgroupsP)
    });

}();

!function numberOEvents(){

    const eventsArray = []

    const numberOfEvents = document.getElementById("events")

    const eventsP = document.createElement("p")

    db.collection("Events").where("Owner", "==", "Vitaminds")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                eventsArray.push(doc)
        });
    }).then(() => {

        eventsP.innerText = eventsArray.length

        numberOfEvents.appendChild(eventsP)
    });

}();

// Support

function typeOfSupportOnCard(type, typeP){

        if(type === "YourNotAlone"){
                typeP.innerText = "Je staat er niet alleen voor"
        } else if(type === "KeepAtIt"){
                typeP.innerText = "Ga zo door!"
        } else if(type === "YourGoodTheWayYouAre"){
                typeP.innerText = "Je bent goed zoals je bent"
        } else if(type === "IFeelForYou"){
                typeP.innerText = "Ik voel met je mee"
        } else if(type === "IUnderstandYou"){
                typeP.innerText = "Ik weet wat je voelt"
        };
};

function giverOnCard(giver, giverP){

        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", giver)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const userNameClean = doc.data().GebruikersnaamClean

                        giverP.innerText = userNameClean

                        giverP.style.cursor = "pointer"

                        giverP.addEventListener("click", () => {
                                window.open("../Vitaminders/" + [giver] + ".html", "_self");
                        })

                });
        });
};

function metaBSupportCard(sourceType, source, sourceLink){

        if(sourceType === "Coachgroup"){
        sourceLink.innerHTML = `<a href="../Group/${source}.html">Bekijk bericht in groep</a>`
        }
};

function supportCard(timestamp, type, message, sourceType, source, giver){

        const DOM = document.getElementById("reactions-overview")

        const supportCard = document.createElement("div")
                supportCard.setAttribute("class", "support-card")

        const typeP = document.createElement("p")
                typeP.setAttribute("class", "support-card-type")
        const messageP = document.createElement("p")
                messageP.setAttribute("class", "support-card-message")
        const metaADiv = document.createElement("div")
                metaADiv.setAttribute("class", "meta-a-div")
        const giverP = document.createElement("p")
        const timestampP = document.createElement("p")
        const metaBDiv = document.createElement("div")
                metaBDiv.setAttribute("class", "meta-b-div")
        const sourceLink = document.createElement("p")

        typeOfSupportOnCard(type, typeP)
        metaBSupportCard(sourceType, source, sourceLink)
        giverOnCard(giver, giverP)

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);
        messageP.innerText = message

        DOM.appendChild(supportCard)
        supportCard.appendChild(typeP)
        supportCard.appendChild(messageP)
        supportCard.appendChild(metaADiv)
        metaADiv.appendChild(giverP)
        metaADiv.appendChild(timestampP)
        supportCard.appendChild(metaBDiv)
        metaBDiv.appendChild(sourceLink)
        
}

function supportCount(supportType, typeCounter){

        const DOMtype = document.getElementById(typeCounter)

        const docArray = []

        db.collectionGroup("Support")
        .where("Reciever", "==", naam)
        .where("Type", "==", supportType)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        docArray.push(doc)


                });
        })
        .then(() => {

                const typeCount = docArray.length

                DOMtype.innerText = typeCount

        });
};

supportCount("YourNotAlone", "yourNotAloneCount")
supportCount("KeepAtIt", "keepAtItCount")
supportCount("YourGoodTheWayYouAre", "yourGoodTheWayYouAreCount")
supportCount("IUnderstandYou", "IUnderstandCount")
supportCount("IFeelForYou", "IFeelForYouCount")

function supportNotificationInDigimind(newArray, status){

        if(status === "New"){
                newArray.push("New")
        };
};

function appendNewCountToDOM(newSupportCount){

        const privateMenuSupport = document.getElementById("support-menu-item")
        const privateMenu = document.getElementById("private-button")

        const newCountMenuSupport = document.createElement("p")
        newCountMenuSupport.setAttribute("class", "newSupportCountP")

        newCountMenuSupport.innerText = newSupportCount

        const newCountMenuPrivate = document.createElement("p")
        newCountMenuPrivate.setAttribute("class", "newSupportCountP")

        newCountMenuPrivate.innerText = newSupportCount

        privateMenuSupport.appendChild(newCountMenuSupport)
        privateMenu.appendChild(newCountMenuPrivate)

        if(newSupportCount === 0){
                newCountMenuPrivate.style.display = "none"
                newCountMenuSupport.style.display = "none"
        };
};

!function querySupport(){

        const newArray = []

        db.collectionGroup("Support")
        .where("Reciever", "==", naam)
        .orderBy("Timestamp", "desc")
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const type = doc.data().Type
                        const giver = doc.data().Giver
                        const message = doc.data().Message
                        const source = doc.data().Source
                        const sourceType = doc.data().SourceType
                        const status = doc.data().Status
                        const timestamp = doc.data().Timestamp

                        supportCard(timestamp, type, message, sourceType, source, giver)
                        supportNotificationInDigimind(newArray, status)

                });
        }).then(() => {

                const newSupportCount = newArray.length
                appendNewCountToDOM(newSupportCount)
        });
}();

!function updateNewStatuSupport(){

        const menuItemSupport = document.getElementById("support-menu-item")

        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        db.collection("Vitaminders")
                        .doc(doc.id)
                        .collection("Support")
                        .where("Reciever", "==", naam)
                        .where("Status", "==", "New")
                        .get().then(querySnapshot => {
                                querySnapshot.forEach(doc1 => {

                                        menuItemSupport.addEventListener("click", () => {

                                                db.collection("Vitaminders")
                                                .doc(doc.id)
                                                .collection("Support")
                                                .doc(doc1.id)
                                                .update({
                                                Status: "Read"
                                                });
                                        });
                                });
                        });
                });
        });
}();
    


// Ontwikkeltegoed

!function ontwikkelTegoedInit(){

        const currentTeGoed = document.getElementById("up-to-date-gelukstegoed")
        const amountArray = []
        const plusMinusDiv = document.getElementById("plus-minus-div")

        function overviewOfPlusMinus(timestampAction, productTitel, productPrice){

        const plusMinusInnerDiv = document.createElement("div")
                plusMinusInnerDiv.setAttribute("class", "plus-minus-inner-div")
        const date = document.createElement("p")
        const productDiv = document.createElement("div")
                productDiv.setAttribute("class", "product-div")
        const productTitle = document.createElement("p")
        const price = document.createElement("p")

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        date.innerHTML = timestampAction.toDate().toLocaleDateString("nl-NL", options);
        productTitle.innerHTML = productTitel
        price.innerText = `€${productPrice}`

        if(productTitel != "Account created"){
                productDiv.style.display = "none"
        };

                plusMinusDiv.appendChild(plusMinusInnerDiv)
                plusMinusInnerDiv.appendChild(date)
                plusMinusInnerDiv.appendChild(productDiv)
                productDiv.appendChild(price)
                productDiv.appendChild(productTitle)
        };

        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot =>{
                querySnapshot.forEach(doc1 =>{ 

        db.collection("Vitaminders").doc(doc1.id)
        .collection("Gelukstegoed")
        .orderBy("Timestamp", "desc")
        .get().then(querySnapshot =>{
                querySnapshot.forEach(doc =>{ 

                let amount = doc.data().Amount
                const type = doc.data().Type
                const timestamp = doc.data().Timestamp
                const productTitle = doc.data().Product

                if(type === "Minus"){
                        amount *= -1

                amountArray.push(amount)
                overviewOfPlusMinus(timestamp, productTitle, amount)

                } else if (type === "Plus"){

                amountArray.push(amount)
                overviewOfPlusMinus(timestamp, productTitle, amount)
                }

                });
        }).then(() => {
                sum = amountArray.reduce((pv, cv) => pv + cv, 0);

                currentTeGoed.innerText = `€${sum}`
        });
});
        });
}();

// Coach information

function editMeTextIfUndefined(message, text){

        if(message === ""){
                text.innerText = "Klik hier om in te vullen"
                text.style.color = "#a7bdbd"
        };
};

function editWelcomeMessage(elem){

        const tinyMCE = document.getElementById("tiny-mce-div")

        tinyMCE.style.display = "block"

        tinymce.get("tiny-welcome").setContent(elem.innerHTML)

        elem.style.display = "none"; 
};

!function saveEditedWelcomeMessage(){

        const button = document.getElementById("save-button-welcome")

        button.addEventListener("click", () => {

                const welcomeMessage = tinymce.get("tiny-welcome").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        Introduction: welcomeMessage
                                });
                        });
                });
        });
}();

function editProfilPicture(elem){

        const inputDiv = document.getElementById("upload-div")
        const saveImageButton = document.getElementById("saveImageButton")
        const image = document.getElementById("profile-image")

        inputDiv.style.display = "flex"

        saveImageButton.addEventListener("click", () => {

                const selectedFile = document.getElementById("upload-profile-picture").files[0]

                const storageRef = firebase.storage().ref("/Profielfotos/" + selectedFile.name);
        
                const uploadTask = storageRef.put(selectedFile)
                uploadTask.then(() => {
                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', function(snapshot){
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.innerHTML = ` ${progress} %`;
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
                }, function(error) {
                // Handle unsuccessful uploads
                }, function() {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);

                saveImageButton.innerText = "Opgeslagen"
                image.src = downloadURL

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
        
                                db.collection("Vitaminders").doc(doc.id).update({
                                        Profielfoto: downloadURL
                                })
                        });
                });
        });
        });
        });
        });     
};

function insertProfileImagePrivate(profilePhoto){

        const profilePictureDiv = document.getElementById("profile-picture-div-private")

        const image = document.createElement("img")
                image.setAttribute("onclick", "editProfilPicture(this)")
                image.setAttribute("class", "edit-element")
                image.setAttribute("id", "profile-image")

        image.src = profilePhoto

        if(profilePhoto === undefined){
                image.src = "../images/dummy-profile-photo.jpeg"
        }

        profilePictureDiv.appendChild(image)

};

function welcomeMessagePrivate(userMessage){

        const welcomeMess = document.getElementById("welcome-message-private")

        const messageP = document.createElement("p")
                messageP.setAttribute("class", "edit-element")
                messageP.setAttribute("onclick", "editWelcomeMessage(this)")

        messageP.innerHTML = userMessage

        if(userMessage === undefined){
                messageP.innerText = "Klik hier om een welkomsboodschap te schrijven"
                messageP.style.color = "#a7bdbd"
        };

        welcomeMess.appendChild(messageP)
};

function editStyle(elem){

        const tinyStyleDiv = document.getElementById("tiny-style-div")

                tinyStyleDiv.style.display = "block"

        tinymce.get("tiny-style").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedStyle(){
        const button = document.getElementById("save-button-style")

        button.addEventListener("click", () => {

                const style = tinymce.get("tiny-style").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        Coachingstyle: style
                                });
                        });
                });
        });

}();

function editMethode(elem){

        const tinyDiv = document.getElementById("tiny-methode-div")

                tinyDiv.style.display = "block"

        tinymce.get("tiny-methode").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedMethode(){
        const button = document.getElementById("save-button-methode")

        button.addEventListener("click", () => {

                const methode = tinymce.get("tiny-methode").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        Approach: methode
                                });
                        });
                });
        });
}();

function editMotivation(elem){

        const tinyDiv = document.getElementById("tiny-motivation-div")

                tinyDiv.style.display = "block"

        tinymce.get("tiny-motivation").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedMotivation(){
        const button = document.getElementById("save-button-motivation")

        button.addEventListener("click", () => {

                const motivation = tinymce.get("tiny-motivation").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        Why: motivation
                                });
                        });
                });
        });

}();

function coachingInformationPrivate(coachStyle, coachMethode, coachMotivation){

        const styleDiv = document.getElementById("coachingstyle-private")
        const methodeDiv = document.getElementById("methode-private")
        const motivationDiv = document.getElementById("motivation-private")
        const coachInformationDiv = document.getElementById("coaching-div-private")

        const styleP = document.createElement("p")
                styleP.setAttribute("class", "edit-element")
                styleP.setAttribute("onclick", "editStyle(this)")
        const methodeP = document.createElement("p")
                methodeP.setAttribute("class", "edit-element")
                methodeP.setAttribute("onclick", "editMethode(this)")
        const motivationP = document.createElement("p")
                motivationP.setAttribute("class", "edit-element")
                motivationP.setAttribute("onclick", "editMotivation(this)")
        
        styleP.innerHTML = coachStyle
        methodeP.innerHTML = coachMethode
        motivationP.innerHTML = coachMotivation

        styleDiv.appendChild(styleP)
        methodeDiv.appendChild(methodeP)
        motivationDiv.appendChild(motivationP)

        editMeTextIfUndefined(coachStyle, styleP)
        editMeTextIfUndefined(coachMethode, methodeP)
        editMeTextIfUndefined(coachMotivation, motivationP)

};

function editYears(elem){

        const tinyDiv = document.getElementById("tiny-years-div")

                tinyDiv.style.display = "block"

        tinymce.get("tiny-years").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedYears(){
        const button = document.getElementById("save-button-years")

        button.addEventListener("click", () => {

                const years = tinymce.get("tiny-years").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        YearsExperience: years
                                });
                        });
                });
        });

}();

function editExperience(elem){

        const tinyDiv = document.getElementById("tiny-experience-div")

                tinyDiv.style.display = "block"

        tinymce.get("tiny-experience").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedExperience(){
        const button = document.getElementById("save-button-experience")

        button.addEventListener("click", () => {

                const experience = tinymce.get("tiny-experience").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        Experience: experience
                                });
                        });
                });
        });

}();

function editEducation(elem){

        const tinyDiv = document.getElementById("tiny-education-div")

                tinyDiv.style.display = "block"

        tinymce.get("tiny-education").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedEducation(){
        const button = document.getElementById("save-button-education")

        button.addEventListener("click", () => {

                const education = tinymce.get("tiny-education").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        Education: education
                                });
                        });
                });
        });

}();

function experienceInformationPrivate(coachYears, coachExperience, coachEducation){

        const yearsDiv = document.getElementById("years-private")
        const experienceDiv = document.getElementById("experience-private")
        const educationDiv = document.getElementById("education-private")
        const coachExperienceDiv = document.getElementById("experience-div-private")

        const yearsP = document.createElement("p")
                yearsP.setAttribute("class", "edit-element")
                yearsP.setAttribute("onclick", "editYears(this)")
        const experienceP = document.createElement("p")
                experienceP.setAttribute("class", "edit-element")
                experienceP.setAttribute("onclick", "editExperience(this)")
        const educationP = document.createElement("p")
                educationP.setAttribute("class", "edit-element")
                educationP.setAttribute("onclick", "editEducation(this)")
        
        yearsP.innerHTML = coachYears
        experienceP.innerHTML = coachExperience
        educationP.innerHTML = coachEducation

        yearsDiv.appendChild(yearsP)
        experienceDiv.appendChild(experienceP)
        educationDiv.appendChild(educationP)

        editMeTextIfUndefined(coachYears, yearsP)
        editMeTextIfUndefined(coachExperience, experienceP)
        editMeTextIfUndefined(coachEducation, educationP)

};

function editLocation(elem){

        const tinyDiv = document.getElementById("tiny-location-div")

                tinyDiv.style.display = "block"

        tinymce.get("tiny-location").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedLocation(){
        const button = document.getElementById("save-button-location")

        button.addEventListener("click", () => {

                const location = tinymce.get("tiny-location").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        City: location
                                });
                        });
                });
        });
}();

function editTargetgroup(elem){

        const tinyDiv = document.getElementById("tiny-targetgroup-div")

                tinyDiv.style.display = "block"

        tinymce.get("tiny-targetgroup").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedTargetgroup(){
        const button = document.getElementById("save-button-targetgroup")

        button.addEventListener("click", () => {

                const targetgroup = tinymce.get("tiny-targetgroup").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        Targetgroup: targetgroup
                                });
                        });
                });
        });
}();

function editCosts(elem){

        const tinyDiv = document.getElementById("tiny-costs-div")

                tinyDiv.style.display = "block"

        tinymce.get("tiny-costs").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedCosts(){
        const button = document.getElementById("save-button-costs")

        button.addEventListener("click", () => {

                const costs = tinymce.get("tiny-costs").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        Costs: costs
                                });
                        });
                });
        });

}();

function editWebsite(elem){

        const tinyDiv = document.getElementById("tiny-website-div")

                tinyDiv.style.display = "block"

        tinymce.get("tiny-website").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedWebsite(){
        const button = document.getElementById("save-button-website")

        button.addEventListener("click", () => {

                const website = tinymce.get("tiny-website").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        Website: website
                                });
                        });
                });
        });

}();

function editTelephone(elem){

        const tinyDiv = document.getElementById("tiny-telephone-div")

                tinyDiv.style.display = "block"

        tinymce.get("tiny-telephone").setContent(elem.innerHTML)

        elem.style.display = "none"
};

!function saveEditedTelephone(){
        const button = document.getElementById("save-button-telephone")

        button.addEventListener("click", () => {

                const telephone = tinymce.get("tiny-telephone").getContent();
                button.innerText = "Opgeslagen"

                db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
                .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {

                                db.collection("Vitaminders").doc(doc.id).update({
                                        PhoneNumber: telephone
                                });
                        });
                });
        });

}();

function practicalInformationPrivate(coachLocation, coachTargetgroup, coachCosts, coachWebsite, coachTelephone){

        const locationDiv = document.getElementById("location-private")
        const targetgroupDiv = document.getElementById("targetgroup-private")
        const costsDiv = document.getElementById("costs-private")
        const websiteDiv = document.getElementById("website-private")
        const telephoneDiv = document.getElementById("telephone-private")
        const practicalDiv = document.getElementById("practical-div-private")

        const locationP = document.createElement("p")
                locationP.setAttribute("class", "edit-element")
                locationP.setAttribute("onclick", "editLocation(this)")
        const targetgroupP = document.createElement("p")
                targetgroupP.setAttribute("class", "edit-element")
                targetgroupP.setAttribute("onclick", "editTargetgroup(this)")
        const costsP = document.createElement("p")
                costsP.setAttribute("class", "edit-element")
                costsP.setAttribute("onclick", "editCosts(this)")
        const websiteP = document.createElement("p")
                websiteP.setAttribute("class", "edit-element")
                websiteP.setAttribute("onclick", "editWebsite(this)")
        const telephoneP = document.createElement("p")
                telephoneP.setAttribute("class", "edit-element")
                telephoneP.setAttribute("onclick", "editTelephone(this)")
        
        locationP.innerHTML = coachLocation
        targetgroupP.innerHTML = coachTargetgroup
        costsP.innerHTML = coachCosts
        websiteP.innerHTML = coachWebsite
        telephoneP.innerHTML = coachTelephone

        locationDiv.appendChild(locationP)
        targetgroupDiv.appendChild(targetgroupP)
        costsDiv.appendChild(costsP)
        websiteDiv.appendChild(websiteP)
        telephoneDiv.appendChild(telephoneP)

        editMeTextIfUndefined(coachLocation, locationP)
        editMeTextIfUndefined(coachTargetgroup, targetgroupP)
        editMeTextIfUndefined(coachCosts, costsP)
        editMeTextIfUndefined(coachWebsite, websiteP)
        editMeTextIfUndefined(coachTelephone, telephoneP)

};

// Database Query
!function databaseQueryPublic(){
        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const profileImage = doc.data().Profielfoto
                        const coachMessage = doc.data().Introduction
                        const coachingStyle = doc.data().Coachingstyle
                        const methode = doc.data().Approach
                        const motivation = doc.data().Why
                        const years = doc.data().YearsExperience
                        const education = doc.data().Education
                        const experience = doc.data().Experience
                        const location = doc.data().City
                        const costs = doc.data().Costs
                        const telephone = doc.data().PhoneNumber
                        const targetgroup = doc.data().Targetgroup
                        const website = doc.data().Website
                        const usertype = doc.data().Usertype

                        insertProfileImagePrivate(profileImage)
                        welcomeMessagePrivate(coachMessage)
                        coachingInformationPrivate(coachingStyle, methode, motivation)
                        experienceInformationPrivate(years, experience, education)
                        practicalInformationPrivate(location, targetgroup, costs, website, telephone)
                        showCoachProfileInformationIfCoach(usertype)

                });
        });
}();

function showCoachProfileInformationIfCoach(type){

        const coachProfileInformation = document.getElementById("coach-profile-private")

        if(type === "Coach"){
                coachProfileInformation.style.display = "flex"
        };
};

