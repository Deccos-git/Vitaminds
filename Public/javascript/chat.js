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

// Title

db.collection('Vitaminders').where('Gebruikersnaam', '==', naam )
    .get()
    .then(querySnapshot => {
    querySnapshot.forEach(doc => {

    const user1 = doc.data().GebruikersnaamClean

    const chatTitle = document.getElementById("chat-title")

    chatTitle.innerText = `Gesprek met ${user1}`

    });
});


const DOMchatScreen = document.getElementById("chat-screen")

// Save message to database
const send = document.getElementById("send-icon")

if(send != null){

send.addEventListener("click", () => {

    const message = document.getElementById("chat-input").value 

    auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
    
                const auth = doc.data().Gebruikersnaam

    const roomName = auth<naam ? auth+'_'+naam : naam+'_'+auth;

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

            const roomName = auth<naam ? auth+'_'+naam : naam+'_'+auth;

            db.collectionGroup("Messages").where("Room", "==", roomName).orderBy("Timestamp", "asc").onSnapshot(querySnapshot => {

                // Empty screen
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

                    db.collection("Vitaminders").where("Gebruikersnaam", "==", sender).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {
    
                            const messageNameClean = doc1.data().GebruikersnaamClean
                    
                    if (auth == sender){

                        const authMessageDiv = document.createElement("div")
                        authMessageDiv.setAttribute("class", "auth-message-div-auth")
                        const authMessageP = document.createElement("p")
                            authMessageP.setAttribute("class", "auth-message-p")
                        const senderName = document.createElement("p")
                            senderName.setAttribute("class", "sender-name-message")

                        senderName.innerText = messageNameClean

                        authMessageP.innerText = authMessage

                        DOMchatScreen.appendChild(authMessageDiv)
                        authMessageDiv.appendChild(authMessageP)
                        authMessageP.appendChild(senderName)
                    } else {

                        const userMessageDiv = document.createElement("div")
                        userMessageDiv.setAttribute("class", "auth-message-div-user")
                        const userMessageP = document.createElement("p")
                            userMessageP.setAttribute("class", "user-message-p")
                        const senderName = document.createElement("p")
                        senderName.setAttribute("class", "sender-name-message")

                        senderName.innerText = messageNameClean

                        userMessageP.innerText = authMessage

                        DOMchatScreen.appendChild(userMessageDiv)
                        userMessageDiv.appendChild(userMessageP)
                        userMessageP.appendChild(senderName)
                        };
                    });
                });
            });
        });
      });
    };
});

// Get chats and groups of auth


const DOMchats = document.getElementById("overview-chats")

auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);
      userRef.get().then(function(doc) {

        const auth = doc.data().Gebruikersnaam


db.collection("Chats").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc1 => {

        const type = doc1.data().Type
        const title = doc1.data().Room
        const titleClean = doc1.data().RoomClean
        const members = doc1.data().Members
        const creator = doc1.data().Creater

        // Chats

        if(type === "Chat"){

        const users = doc1.data().Room

        const userArray = users.split("_")

        if(userArray.includes(auth)){

        userArray.forEach(user => {

                if(auth != user){        

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
                } else if(type === "Group" || type === "Practicegroup" || type === "Coachgroup"){
                
                  if (members.includes(auth)){
                
                                    const chatsDiv = document.createElement("div")
                                        chatsDiv.setAttribute("class", "chats-div")
                                    const chatsP = document.createElement("p")
                                    const photoDiv = document.createElement("div")
                                        photoDiv.setAttribute("class", "photo-div")
                                    const photoImg = document.createElement("img")
                
                                    if(type === "Group"){
                                    chatsP.innerText = title
                                    photoImg.src = "images/groups-icon.jpg"
                                    } else if (type === "Practicegroup"){
                                        chatsP.innerText = titleClean
                                        photoImg.src = "images/practicegroup-icon.png"
                                    } else if ( type === "Coachgroup"){
                                        chatsP.innerText = titleClean
                                        photoImg.src = "images/coachgroup-icon.png"
                                    };     
                                    
                                    chatsDiv.addEventListener("click", () => {
                                        window.open(`../Group/${title}.html`, "_self");
                                    })
                
                                    DOMchats.appendChild(chatsDiv)
                                    chatsDiv.appendChild(photoDiv)
                                    photoDiv.appendChild(photoImg)
                                    chatsDiv.appendChild(chatsP)
                                               
                    };                
                };
            });
        });
      });
    };
});


