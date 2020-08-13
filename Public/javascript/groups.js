// Fetching title from url
const titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
const titel1 = titelhtml.replace('.html', '')
const titel2 = titel1.replace('%20',' ')
const titel3 = titel2.replace('%20',' ')
const titel4 = titel3.replace('%20',' ')
const titel5 = titel4.replace('%20',' ')
const titel6 = titel4.replace('%20',' ')
const titel7 = titel6.replace('%20',' ')
const titel8 = titel7.replace('%20',' ')
const titel9 = titel8.replace('%20',' ')
const titel10 = titel9.replace('%20',' ')
const titel11 = titel10.replace('%20',' ')
const titel12 = titel11.split("?fb")
const titel = titel12[0]

// Groups overview page

const practicegroupDOM = document.getElementById("practicegroups")
const themegroupDOM = document.getElementById("themegroups")

const practicegroupTab = document.getElementById("practicegroup-tab")
const themegroupTab = document.getElementById("themegroup-tab")

if(practicegroupTab != null){
    practicegroupTab.addEventListener("click", () => {
        practicegroupDOM.style.display = "flex"
        themegroupDOM.style.display = "none"
    });
};

if(themegroupTab != null){
    themegroupTab.addEventListener("click", () => {
        practicegroupDOM.style.display = "none"
        themegroupDOM.style.display = "flex"
    });
};

    // Theme groups overview

    const DOMthemeView = document.getElementById("themegroups")

    db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const title = doc.data().Levensvraag
            const headerImage = doc.data().HeaderImage

            const outerSection = document.createElement("section")
            outerSection.setAttribute("class", "theme-groups-section")
        const headerDiv = document.createElement("div")
            headerDiv.setAttribute("class", "theme-groups-header")
        const headerImg = document.createElement("img")
            headerImg.setAttribute("class", "header-image-groups")
        const titleDiv = document.createElement("div")
        const titleH2 = document.createElement("h2")
            titleH2.setAttribute("class", "titelTekst")
        const buttonDiv = document.createElement("button")
            buttonDiv.setAttribute("class", "button-algemeen-card")

        titleH2.innerHTML = title
        headerImg.src = headerImage
        buttonDiv.innerHTML = "Lid worden"

        buttonDiv.addEventListener("click", () => {

            // Add auth to list of members

            auth.onAuthStateChanged(User =>{
                if(User){
                  const userRef = db.collection("Vitaminders").doc(User.uid);
                  userRef.get().then(function(doc) {
            
                        const auth = doc.data().Gebruikersnaam

            db.collection("Chats").where("Room", "==", title).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {
            
                    db.collection("Chats").doc(doc1.id).update({
                        Members: firebase.firestore.FieldValue.arrayUnion(auth)
                    }).then(() => {
                        window.open("../Group/" + title + ".html", "_self") 
                                });
                            });
                        });
                    });
                };
            });
        });

        DOMthemeView.appendChild(outerSection)
        outerSection.appendChild(headerDiv)
        headerDiv.appendChild(headerImg)
        outerSection.appendChild(titleDiv)
        titleDiv.appendChild(titleH2)
        outerSection.appendChild(buttonDiv)

        });
    });

// Themegroup individual page

    // Title

    const DOMtitle = document.getElementById("group-title")

    DOMtitle.innerText = titel

    const DOMchatScreen = document.getElementById("chat-screen")

    // Display members 

    const listOfMembers = document.getElementById("list-of-members-inner-div")

    const roomName = titel

db.collection("Chats").where("Room", "==", roomName).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

            const members = doc.data().Members

            members.forEach(member => {

            db.collection("Vitaminders").where("Gebruikersnaam", "==", member).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

                const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                const photo = doc1.data().Profielfoto

                const memberPhoto = document.createElement("img")
                    memberPhoto.setAttribute("class", "group-member-photo")

                
                    if(photo == undefined){
                        memberPhoto.src = "../images/dummy-profile-photo.jpeg"
                    } else {
                        memberPhoto.src = photo
                    }    

                memberPhoto.addEventListener("click", () => {

                    window.open("../Vitaminders/" + member, "_self");

                });

                listOfMembers.appendChild(memberPhoto)

                    });
                });
            });
        });
    });
     

    // Save message to database
    const send = document.getElementById("send-icon-group")

    if(send != null){

    send.addEventListener("click", () => {

        const message = document.getElementById("chat-input").value 

        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {
        
                    const auth = doc.data().Gebruikersnaam

        const roomName = titel

    db.collection("Chats").where("Room", "==", roomName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {


        db.collection("Chats").doc(doc.id).collection("Messages").doc().set({
            Auth: auth,
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Message: message,
            Room: roomName
            }).then(() => {
                db.collection("Chats").doc(doc.id).update({
                    Messages: firebase.firestore.FieldValue.increment(1)
                                });
                            });  
                        });
                    });
                });
            };
        });
    });
    };

    // Get chat from database in realtime

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

                const auth = doc.data().Gebruikersnaam

                const roomName = titel

                db.collectionGroup("Messages").where("Room", "==", roomName).orderBy("Timestamp", "asc").onSnapshot(querySnapshot => {

            // User
        const chatDivsUser = document.getElementsByClassName("auth-message-div-user")

        const chatDivsArrayUser = Array.from(chatDivsUser)

        chatDivsArrayUser.forEach(chatUser => {
            DOMchatScreen.removeChild(chatUser)
        });
            // Auth
        const chatDivsAuth = document.getElementsByClassName("auth-message-div-auth")

        const chatDivsArrayAuth = Array.from(chatDivsAuth)

        chatDivsArrayAuth.forEach(chatAuth => {
            DOMchatScreen.removeChild(chatAuth)
        });
                    
                    querySnapshot.forEach(doc2 => {

                        const authMessage = doc2.data().Message
                        const sender = doc2.data().Auth
                    
                        if (auth == sender){

                        const authMessageDiv = document.createElement("div")
                        authMessageDiv.setAttribute("class", "auth-message-div-auth")

                        const authMessageP = document.createElement("p")

                        authMessageP.innerText = authMessage

                        DOMchatScreen.appendChild(authMessageDiv)
                        authMessageDiv.appendChild(authMessageP)

                        } else {

                        const userMessageDiv = document.createElement("div")
                        userMessageDiv.setAttribute("class", "auth-message-div-user")

                        const userMessageP = document.createElement("p")

                        userMessageP.innerText = authMessage

                        DOMchatScreen.appendChild(userMessageDiv)
                        userMessageDiv.appendChild(userMessageP)
                            };
                    });
                });
        });
        };
    });

    // Get chats of auth

    const DOMchats = document.getElementById("overview-chats")

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

            const auth = doc.data().Gebruikersnaam


    db.collection("Chats").where("Eigenaar", "==", "Vitaminds").where("type", "==", "Group").get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const users = doc1.data().Room

            const userArray = users.split("_")

            if(userArray.includes(auth)){

            userArray.forEach(user => {

                    if(auth != user){

                        console.log(user)
            

                        db.collection("Vitaminders").where("Gebruikersnaam", "==", user).get().then(querySnapshot => {
                            querySnapshot.forEach(doc4 => {

                                const userClean = doc4.data().GebruikersnaamClean
                                const photo = doc4.data().Profielfoto

                        const chatsDiv = document.createElement("div")
                            chatsDiv.setAttribute("class", "chats-div")
                        const chatsP = document.createElement("p")
                        const photoDiv = document.createElement("div")
                            photoDiv.setAttribute("class", "photo-div")
                        const photoImg = document.createElement("img")

                        chatsP.innerText = userClean
                        
                        if(photo == undefined){
                            photoImg.src = "images/dummy-profile-photo.jpeg"
                        } else {
                        photoImg.src = photo
                        }

                        console.log(photo)

                        chatsDiv.addEventListener("click", () => {
                            window.open(`../Chats/${user}.html`, "_self");
                        })

                        DOMchats.appendChild(chatsDiv)
                        chatsDiv.appendChild(photoDiv)
                        photoDiv.appendChild(photoImg)
                        chatsDiv.appendChild(chatsP)

                                    });
                                });
                            };    
                    });
                };
                });
            });
        });
        };
    });


