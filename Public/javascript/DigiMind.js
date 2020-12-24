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
        });  
}();

// Public section

function insertProfileImage(profilePhoto){

        const profilePictureDiv = document.getElementById("profile-picture-div")

        const image = document.createElement("img")

        image.src = profilePhoto

        profilePictureDiv.appendChild(image)

}

function insertUserName(name){

        const userName = document.getElementById("name")

        userName.innerText = name

}

function welcomeMessage(userMessage){

        const welcomeMess = document.getElementById("welcome-message")
        const welcomeDiv = document.getElementById("welcome-div")

        const messageP = document.createElement("p")

        messageP.innerHTML = userMessage

        welcomeMess.appendChild(messageP)

        if(userMessage != undefined){
                welcomeDiv.style.display = "flex"
        }
}

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

// My proces
!function procesSelect(){

        const procesSelect = document.getElementById("proces-select")

        db.collectionGroup("Levensvragen")
        .where("Gebruikersnaam", "==", naam)
        .get().then(querySnapshot =>{
                querySnapshot.forEach(doc =>{

                        const procesTitle = doc.data().LevensvraagClean

                        const option = document.createElement("option")

                        option.innerText = procesTitle

                        procesSelect.appendChild(option)

                });
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

}

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

                        addLessonsTopProces(levensvraagID)

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

function addLessonsTopProces(selectedProces){

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





// Database Query
db.collection("Vitaminders").where("Gebruikersnaam", "==", naam)
.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

                const profileImage = doc.data().Profielfoto
                const username = doc.data().GebruikersnaamClean
                const coachMessage = doc.data().Introduction

                insertProfileImage(profileImage)
                insertUserName(username)
                welcomeMessage(coachMessage)

        });
});