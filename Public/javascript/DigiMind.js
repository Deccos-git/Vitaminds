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

        const activatedPrivateDiv = document.getElementsByClassName("activated")

        console.log(activatedPrivateDiv)

        privateButton.addEventListener("click", () => {
                privateSection.style.display = "block"
                publicSection.style.display = "none"
                activatedPrivateDiv.style.display = "flex"
        });

        publicButton.addEventListener("click", () => {
                publicSection.style.display = "flex"
                privateSection.style.display = "none"
                activatedPrivateDiv.style.display = "none"
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

}()

// My proces

function myProces(){
        
}


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