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
        });  
}();

// Public section

function insertProfileImage(profilePhoto){

        const profilePictureDiv = document.getElementById("profile-picture-div")

        const image = document.createElement("img")

        image.src = profilePhoto

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

;}

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

                        console.log(User.uid)
                        db.collection("Vitaminders").doc(User.uid).update({
                                FavCoaches: firebase.firestore.FieldValue.arrayRemove(naam)
                        }); 

                        const button = document.getElementById("follow-button")
                        button.innerHTML = "Ontvolgd"
                };
        });
};

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
                
                Klik <a href="https://vitaminds.nu/inlog.html"> hier </a> om naar je chats te gaan.
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
                sendMailNewChat(auth)
        });    
        });
                } else {
                        const notification = document.getElementById("chat-notification-visitor")

                        notification.style.display = "block"
                }
                });
        });
}();


!function hideChatIfAuth(){

        const chatButton = document.getElementById("chat-button")

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

        if (selected === "Mijn trajecten"){
                privateOuterDiv[0].style.display = "flex"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "none"
        } else if (selected === "Favoriete coaches"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "flex"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "none"
        } else if (selected === "Tools"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "flex"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "none"
        } else if (selected === "Analytics"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "flex"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "none"
        } else if (selected === "Notificaties"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "flex"
                privateOuterDiv[5].style.display = "none"
        } else if (selected === "Ontwikkeltegoed"){
                privateOuterDiv[0].style.display = "none"
                privateOuterDiv[1].style.display = "none"
                privateOuterDiv[2].style.display = "none"
                privateOuterDiv[3].style.display = "none"
                privateOuterDiv[4].style.display = "none"
                privateOuterDiv[5].style.display = "flex"
        }
};


!function switchSection(){

        const privateSection = document.getElementsByClassName("private-outer-div")

        const menuItemDiv = document.getElementById("menu-div")

        const menuItem = menuItemDiv.getElementsByTagName("p")

        menuItemswitch(menuItem, privateSection, 0, 0, 1, 2, 3, 4, 5)
        menuItemswitch(menuItem, privateSection, 1, 1, 0, 2, 3, 4, 5)
        menuItemswitch(menuItem, privateSection, 2, 2, 0, 1, 3, 4, 5)
        menuItemswitch(menuItem, privateSection, 3, 3, 0, 1, 2, 4, 5)
        menuItemswitch(menuItem, privateSection, 4, 4, 0, 1, 2, 3, 5)
        menuItemswitch(menuItem, privateSection, 5, 5, 0, 1, 2, 3, 4)
}();

function menuItemswitch(menuItemCount, privateSectionCount, menu, section, hide1, hide2, hide3, hide4, hide5 ){

        menuItemCount[menu].addEventListener("click", () => {
                privateSectionCount[section].style.display = "flex"
                privateSectionCount[hide1].style.display = "none"
                privateSectionCount[hide2].style.display = "none"
                privateSectionCount[hide3].style.display = "none"
                privateSectionCount[hide4].style.display = "none"
                privateSectionCount[hide5].style.display = "none"

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

                        addLessonsToProces(levensvraagID)
                        showArticles(goal)

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

        procesInnerDiv.innerHTML = ""

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

                        addLessonsToProces(levensvraagID)
                        showArticles(goal)

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
                        metaTimestamp.innerHTML = timestamp
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        metaTimestamp.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

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

function showArticles(goalAuth){

        const inspirationOuterDiv = document.getElementById("inspiration-outer-div")
        const inspirationDiv = document.getElementById("inspiration-div")

        inspirationOuterDiv.innerHTML = ""

        db.collection("Levensvragen").where("Levensvraag", "==", goalAuth)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                        const domain = doc1.data().Domein

                        showInspirationDiv(inspirationDiv)

                        db.collection("Levensvragen").where("Domein", "==", domain)
                        .get().then(querySnapshot => {
                                querySnapshot.forEach(doc => {

                                        const title = doc.data().Levensvraag
                                        const headerImageSmall = doc.data().HeaderImageSmall
                                        const insights = doc.data().Insights
                                        const goal = doc.data().Levensvraag

                                        console.log(title)
                                
                                        // Hidding articles with no insights for non-coach
                                        if (insights.length == 0){
                                                auth.onAuthStateChanged(User =>{
                                                if(User){
                                                db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                                                const usertype = doc.data().Usertype
                                
                                                console.log(usertype)
                                
                                                if(usertype != "Coach"){
                                                        outerSection.style.display = "none"
                                                }
                                                })
                                        } else {
                                                outerSection.style.display = "none"
                                        }
                                        })
                                        };
                                
                                        const outerSection = document.createElement("section")
                                        outerSection.setAttribute("class", "levensvraag-artikel-section")
                                        outerSection.setAttribute("data-title", title)
                                        outerSection.setAttribute("data-goal", goal)
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
                                
                                        // Dynamic title
                                        const count = insights.length
                                
                                        titleSub.innerHTML = `${count} coaches over`
                                
                                        if(count == 1){
                                        titleSub.innerHTML = `${count} coach over`
                                        }
                                
                                        // Exemption on dynamic title
                                        if(title == "Zelfliefde"){
                                        titleSub.innerHTML = `${count} tips voor meer`
                                
                                                if(count == 1){
                                                titleSub.innerHTML = `${count} tip voor meer`
                                                };
                                        };
                                        
                                
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
                });
        });
}

// Favorite coaches section
!function favoriteCoachesQuery(){
        db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const favoriteCoaches = doc.data().FavCoaches

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

        db.collection("Insights").where("Auteur", "==", coach)
        .orderBy("Timestamp", "desc")
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const titelInsight = doc.data().Titel
                        const coach = doc.data().Auteur
                        const levensvraagArtikel = doc.data().LevensvraagArtikel
                        const type = doc.data().Type
                        const timestamp = doc.data().Timestamp

                        createCoachDOMElements(coach, levensvraagArtikel, type, titelInsight, timestamp)

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

function createCoachDOMElements(coachName, article, typeInsight, title,time){

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
       
        // Hide kenniscentrum insights

        if(typeInsight == "Insight-kenniscentrum"){
                outerDiv.style.display = "none"
        }

        if(article != undefined){

        textDiv.addEventListener("click", () => {
                window.open("../Artikelen/" + article + ".html", "_self");
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

!function showHapinessToolIfInstalled(){

        const happinessDiv = document.getElementById("happiness-scale-div")

        db.collection("Tools")
        .where("Tool", "==", "HapinessChart")
        .where("Installs", "array-contains", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        happinessDiv.style.display = "flex"

                });
        });
}();

!function showCheckInDiv(){

        const checkInDiv = document.getElementById("check-in-div")

        db.collection("Tools")
        .where("Tool", "==", "Check-in")
        .where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        checkInDiv.style.display = "flex"

                });
        });

}();

!function queryCheckinsUser(){
        db.collection("Tools").where("Tool", "==", "Check-in")
        .where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const goal = doc.data().Levensvraag

                });
        });
}();

function userGoalsInSelectCheckinTool(){

}
const goalSelect = document.getElementById("check-in-select-goals")

db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                const goal = doc.data().LevensvraagClean

                const option = document.createElement("option")

                option.innerHTML = goal

                goalSelect.appendChild(option)

        })
});

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

                activateNotice.innerHTML = `Check in geactiveerd voor ${goalOption}`
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

db.collectionGroup("Levensvragen").where("Levenslessen", "array-contains", "Tool geactiveerd: Check in")
.where("Gebruikersnaam", "==", naam).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const levensvragen = doc.data().LevensvraagClean

                        const activeGoalsH3 = document.createElement("h3")
                        const activeGoalP = document.createElement("p")

                        activeGoalsH3.innerHTML = "Geactiveerde doelen"
                        activeGoalP.innerHTML = levensvragen

                        activeGoalsDiv.appendChild(activeGoalsH3)
                        activeGoalsDiv.appendChild(activeGoalP)

})
});

// Analytics

const adminDiv = document.getElementById("admin-analytics")
 const earningsDiv = document.getElementById("earnings-analytics")
 const tractionDiv = document.getElementById("traction-analytics")

 function hideAnalyticsIfNoCoach(type){

        const analyticsMenuItem = document.getElementsByClassName("analytics-menu-item")

        const itemArray = Array.from(analyticsMenuItem)

        itemArray.forEach(item => {
                if(type === "Coach"){

                        item.style.display = "flex"
                };
        });
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
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                workshopsArray.push(doc)

        });
    }).then(() => {

        workshopsP.innerText = workshopsArray.length

        numberOfWorkshops.appendChild(workshopsP)
    });

}();

!function numberOfInsights(){

    const insightsArray = []

    const numberOfInsights = document.getElementById("insights")

    const insightsP = document.createElement("p")

    db.collection("Insights").where("Type", "==", "Insight-levensvraag")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                insightsArray.push(doc)
        });
    }).then(() => {

        insightsP.innerText = insightsArray.length

        numberOfInsights.appendChild(insightsP)
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

// Notifications
!function notificationsInit(){
const lengthArray = [];

auth.onAuthStateChanged(User =>{
        if(User){
                const userRef = db.collection("Vitaminders").doc(User.uid);
                userRef.get().then(function(doc) {
                if (doc.exists) {
                const auth = doc.data().Gebruikersnaam;
                const email = doc.data().Email

db.collectionGroup("Inspiration").where("Reciever", "==", auth).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

        const docLengt = [doc]          
                objectLength = Object.keys(docLengt).length
                lengthArray.push(objectLength)

                                })
                        }).then(() => {
                                
                                // Total points in Notifications
                                const DOM =  document.getElementById("total-inspiration")

                                if(DOM == null){
                                        console.log("Error")
                                } else{
                                const innerDiv = document.createElement("div")
                                        innerDiv.setAttribute("id", "inner-div-gamefication")
                                const totalPoints = document.createElement("p")
                                const titel = document.createElement("h2")
                                
                                titel.innerHTML = "Totaal aantal inspiratiepunten"

                                totalPoints.innerHTML = lengthArray.length
                
                                DOM.appendChild(innerDiv)
                                innerDiv.appendChild(titel)
                                innerDiv.appendChild(totalPoints)

                                        
                                // Trophies 
                                const trophies = document.getElementById("trophies").getElementsByTagName("img")

                                function trophiesRewarded(a,b){
                                if(lengthArray.length >= b){
                                        trophies[a].src = `../images/Trophies/${b}.png`
                                        }  
                                }

                                trophiesRewarded(0,1)
                                trophiesRewarded(1,5)
                                trophiesRewarded(2,10)
                                trophiesRewarded(3,20)
                                trophiesRewarded(4,40)
                                trophiesRewarded(5,80)
                                trophiesRewarded(6,160)
                                
                                };
                        });
                };
        });
}
});



// Inspiration-notifications

auth.onAuthStateChanged(User =>{
        let docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){
                const auth = doc.data().Gebruikersnaam;

db.collectionGroup("Inspiration").where("Reciever", "==", auth).orderBy("Timestamp", "desc").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
                const giver = doc.data().Giver
                const type = doc.data().Type
                const titel = doc.data().Titel
                const inspiration = doc.data().Inspiration
                const source = doc.data().Source

                const DOM = document.getElementById("inspiration-notifications")
                if(DOM == null){
                        console.log("Error")
                } else {
                const outerDiv = document.createElement("div")
                        outerDiv.setAttribute("class", "gamefication-outer-div")
                const dateP = document.createElement("h4")
                const string = document.createElement("h3")
                const innerDiv = document.createElement("div")
                        innerDiv.setAttribute("class", "gamefication-inner-div")
                const ul = document.createElement("ul")
                const liGiver = document.createElement("li")
                        liGiver.setAttribute("class", "meta-notifications")
                const liType = document.createElement("li")
                const liSource = document.createElement("li")
                        liSource.setAttribute("class", "meta-notifications")
                const link = document.createElement("h4")

                db.collection("Vitaminders"). where('Gebruikersnaam', "==", giver).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {

                                const giverClean = doc1.data().GebruikersnaamClean

                                //Open up
                        if (type == "Levensles"){

                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);

                        string.innerHTML = `Je hebt 1 nieuw like ontvangen!`
                        liGiver.innerHTML = `Van <u>${giverClean}</u>`
                        liGiver.addEventListener("click", () => {
                                window.open("../Vitaminders/" + giver + ".html", "_self");
                        })

                        liType.innerHTML = `Op je levensles: ${inspiration}`
                        link.innerHTML = `<u>${inspiration}</u>`

                        liSource.style.display = "none"
                        
                } else if (type == "Insight"){
                        // Levensvraag artikelen
                        db.collection("Insights").where("LevensvraagArtikel", "==", titel).get().then(querySnapshot => {
                                querySnapshot.forEach(doc3 => {

                                        const levensvraag = doc3.data().LevensvraagArtikel

                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);

                        string.innerHTML = `Je hebt 1 nieuw like ontvangen!`
                        liGiver.innerHTML = `Van <u>${giverClean}</u>`
                        liGiver.addEventListener("click", () => {
                                window.open("../Vitaminders/" + giver + ".html", "_self");
                        })

                        liType.innerHTML = `Op je inzicht: ${inspiration}`
                        link.innerHTML = `<u>${inspiration}</u>`
                        liSource.innerHTML = `Bron: ${levensvraag}`

                        liSource.addEventListener("click", () => {
                                window.open("../Artikelen/" + levensvraag + ".html", "_self");
                                        })
                                })
                        })   

                        // Theme artikelen
                        db.collection("Insights").where("ThemeArtikel", "==", titel).get().then(querySnapshot => {
                                querySnapshot.forEach(doc3 => {

                                        const levensvraag = doc3.data().ThemeArtikel

                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = "Op " + doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", options);

                        string.innerHTML = `Je hebt 1 nieuw like ontvangen!`
                        liGiver.innerHTML = `Van <u>${giverClean}</u>`
                        liGiver.addEventListener("click", () => {
                                window.open("../Vitaminders/" + giver + ".html", "_self");
                        })

                        liType.innerHTML = `Op je inzicht: ${inspiration}`
                        link.innerHTML = `<u>${inspiration}</u>`
                        liSource.innerHTML = `Bron: ${levensvraag}`

                        liSource.addEventListener("click", () => {
                                window.open("../Artikelen/" + levensvraag + ".html", "_self");
                                        })
                                })
                        })   
                } 
                })
        })

                DOM.appendChild(outerDiv)
                outerDiv.appendChild(string)
                outerDiv.appendChild(innerDiv)
                innerDiv.appendChild(ul)
                ul.appendChild(liGiver)
                ul.appendChild(liType)
                ul.appendChild(liSource)
                outerDiv.appendChild(dateP)
                                }
                        })
                
                })
        })
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

        plusMinusDiv.appendChild(plusMinusInnerDiv)
        plusMinusInnerDiv.appendChild(date)
        plusMinusInnerDiv.appendChild(productDiv)
        productDiv.appendChild(price)
        productDiv.appendChild(productTitle)
        };

        auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid)
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
}();