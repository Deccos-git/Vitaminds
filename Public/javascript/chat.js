
// Naam uit URL halen
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

// Title 
db.collection('Vitaminders').where('Gebruikersnaam', '==', titel )
    .get()
    .then(querySnapshot => {
    querySnapshot.forEach(doc => {

    const user1 = doc.data().GebruikersnaamClean

    const chatTitle = document.getElementById("chat-title")

    chatTitle.innerText = `Gesprek met ${user1}`

    });
});

// Save message to database

const DOMchatScreenChat = document.getElementById("chat-screen")
    
function saveMessage(){
    const message = document.getElementById("chat-input").value 

    auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
    
                const auth = doc.data().Gebruikersnaam

    const roomName = auth<titel ? auth+'_'+titel : titel+'_'+auth;

db.collection("Chats").where("Room", "==", roomName).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {


    db.collection("Chats").doc(doc.id).collection("Messages").doc().set({
        Auth: auth,
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        Message: message,
        Members: [auth, titel],
        Read: [auth], 
        Room: roomName,
        Status: "New"
        }).then(() => {
            db.collection("Chats").doc(doc.id).update({
                Messages: firebase.firestore.FieldValue.increment(1)
                            }).then (() => {
                                const input = document.getElementById("chat-input")

                                input.value = ""
                            })
                        });  
                    });
                });
            });
        };
    });
};
    const send = document.getElementById("send-icon")

if(send != null){

send.addEventListener("click", saveMessage, false)
};

// Get chat from database in realtime

        // functions
function emptyScreenByOnsnapshot(){
    const chatDivsUser = document.getElementsByClassName("auth-message-p")

    const chatDivsArrayUser = Array.from(chatDivsUser)

    chatDivsArrayUser.forEach(chatUser => {
        DOMchatScreenChat.removeChild(chatUser)
    });
};

function messageOptions(message, chatMessage, chatRoom, authChatter){
    const optionsDiv = document.createElement("div")
        optionsDiv.setAttribute("id", "options-div")
     const options = document.createElement("img")
        options.setAttribute("class", "message-options")
     options.src = "../images/design/mail-icon2.jpg"

     const sendAsMail = document.createElement("p")
        sendAsMail.setAttribute("class", "send-chat-as-mail")
        sendAsMail.setAttribute("data-message", chatMessage)
        sendAsMail.setAttribute("data-room", chatRoom)
        sendAsMail.setAttribute("data-auth", authChatter)
        sendAsMail.setAttribute("onclick", "sendChatAsMail(this)")
     sendAsMail.innerText = "Verstuur bericht als email"

     message.appendChild(optionsDiv)
     optionsDiv.appendChild(options)
     optionsDiv.appendChild(sendAsMail)

     toggleSendAsMail(options, sendAsMail)
};

function toggleSendAsMail(options, sendChatAsMail){

    options.addEventListener("click", () => {
            if(sendChatAsMail.style.display === "flex"){
                sendChatAsMail.style.display = "none" 
            } else {
                sendChatAsMail.style.display = "flex" 
            };
    });
};

function sendChatAsMail(elem){
    const message = elem.dataset.message
    const room = elem.dataset.room
    const coach = elem.dataset.auth

    elem.innerText = "Verstuurd"

    db.collection("Vitaminders").where("GebruikersnaamClean", "==", coach)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc2 => {

                const SenderNameClean = doc2.data().GebruikersnaamClean

    db.collection("Chats")
    .where("Room", "==", room).get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const members = doc.data().Members
            const type = doc.data().Type

            members.forEach(member => {

                if(type === "Chat"){

            db.collection("Vitaminders").where("Gebruikersnaam", "==", member)
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {

                            const email = doc1.data().Email
                            const naamMember = doc1.data().GebruikersnaamClean

                            console.log(email)

                            db.collection("Mail").doc().set({
                                to: email,
                                cc: "info@vitaminds.nu",
                        message: {
                        subject: `Je hebt een nieuw chatbericht ontvangen van ${SenderNameClean}`,
                        html: `Hallo ${naamMember}, </br></br>
                                ${SenderNameClean} heeft je een bericht gestuurd in jullie chat: <br><br>

                                ${message}<br><br>
                                
                                Ga naar jullie <a href="www.vitaminds.nu/Chats/${titel}.html">chat</a> om op het bericht te reageren.<br><br>
                                P.s. Om privacyredenen kun je je chat alleen bekijken als je bent ingelogd in Vitaminds.<br><br>
                        
                                Vriendelijke groet, </br></br>
                                Het Vitaminds Team </br></br>
                                <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                        Gebruikersnaam: titel,
                        Emailadres: email,
                        Type: "New coachmessage in chat"
                        }        
                        });  
                    });
                });
            } else if (type === "Group"){
                db.collection("Vitaminders").where("Gebruikersnaam", "==", member)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc2 => {

                        const email = doc2.data().Email
                        const naam = doc2.data().GebruikersnaamClean
                      
                        db.collection("Mail").doc().set({
                            to: email,
                            cc: "info@vitaminds.nu",
                    message: {
                    subject: `Je hebt een nieuw chatbericht ontvangen van ${SenderNameClean} in je Groep ${naam}`,
                    html: `Hallo ${naam}, </br></br>
                            ${SenderNameClean} heeft je een bericht gestuurd in de Groep ${naam} : <br><br>

                            ${message}<br><br>
                            
                            Ga naar je <a href="www.vitaminds.nu/Chats/${naam}.html">Groep</a> om op het bericht te reageren.<br><br>
                            P.s. Om privacyredenen kun je groep alleen bekijken als je bent ingelogd in Vitaminds.<br><br>
                    
                            Vriendelijke groet, </br></br>
                            Het Vitaminds Team </br></br>
                            <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                    Gebruikersnaam: naam,
                    Emailadres: email,
                    Type: "New coachmessage in chat"
                    }        
                    }); 
                });
            });
            } else if (type === "Coachgroup"){
                db.collection("Vitaminders").where("Gebruikersnaam", "==", member)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc2 => {

                        const email = doc2.data().Email
                        const naam = doc2.data().GebruikersnaamClean

                        console.log(email)

                        db.collection("Mail").doc().set({
                            to: email,
                            cc: "info@vitaminds.nu",
                    message: {
                    subject: `Je hebt een nieuw coachbericht ontvangen van ${SenderNameClean} in je Coachgroep ${naam}`,
                    html: `Hallo ${naam}, </br></br>
                            ${SenderNameClean} heeft je een bericht gestuurd in de Coachgroep ${naam} : <br><br>

                            ${message}<br><br>
                            
                            Ga naar je <a href="www.vitaminds.nu/Chats/${naam}.html">Coachgroep</a> om op het bericht te reageren.<br><br>
                            P.s. Om privacyredenen kun je coachgroep alleen bekijken als je bent ingelogd in Vitaminds.<br><br>
                    
                            Vriendelijke groet, </br></br>
                            Het Vitaminds Team </br></br>
                            <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                    Gebruikersnaam: naam,
                    Emailadres: email,
                    Type: "New coachmessage in chat"
                    }        
                    });  
                });
            });
            }
            });
        });
    });
});
});
};

    // Database query
auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);
      userRef.get().then(function(doc) {

            const auth = doc.data().Gebruikersnaam

            const roomName = auth<titel ? auth+'_'+titel : titel+'_'+auth;

            db.collectionGroup("Messages")
            .where("Room", "==", roomName)
            .orderBy("Timestamp", "asc")
            .onSnapshot(querySnapshot => {

                // Empty screen
                 emptyScreenByOnsnapshot()
                
                querySnapshot.forEach(doc2 => {

                    const authMessage = doc2.data().Message
                    const sender = doc2.data().Auth

                    const messageP = document.createElement("p")
                    messageP.setAttribute("class", "auth-message-p")

                    messageP.style.alignSelf = "flex-start"

                    const senderName = document.createElement("p")
                    senderName.setAttribute("class", "sender-name-message")

                    db.collection("Vitaminders").where("Gebruikersnaam", "==", sender).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {
    
                            const messageNameClean = doc1.data().GebruikersnaamClean
                            const colour = doc1.data().Color
                    
                    if (auth == sender){

                        senderName.innerText = messageNameClean

                        messageP.innerHTML = authMessage

                        messageP.style.alignSelf = "flex-end"
                        senderName.style.color = colour
                        senderName.style.fontWeight = "bold"
                        senderName.style.alignSelf = "flex-end"

                        messageOptions(messageP, authMessage, roomName, messageNameClean)

                    } else {

                        senderName.innerText = messageNameClean

                        messageP.innerHTML = authMessage

                        messageP.style.alignSelf = "flex-start"
                        senderName.style.color = colour
                        senderName.style.fontWeight = "bold"
                        senderName.style.alignSelf = "flex-start"
                        
                        };

                        messageP.appendChild(senderName)
                    });
                });
                    DOMchatScreenChat.appendChild(messageP)
                    
            });
        });
      });
    };
});

// Get chats of auth

        // Chat functions
function getProfilePicAndNameOfChat(chatsP, picDOMobject, user){

    db.collection("Vitaminders").where("Gebruikersnaam", "==", user).get().then(querySnapshot => {
        querySnapshot.forEach(doc => { 

            const photo = doc.data().Profielfoto
            const userClean = doc.data().GebruikersnaamClean

            picDOMobject.src = photo
            chatsP.innerText = userClean
        });
    });
};

function chatsBlaBla(){

    db.collection("Chats")
    .where("Eigenaar", "==", "Vitaminds")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const members = doc.data().Members

            db.collectionGroup("Messages")
            .where("Status", "==", "New")
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    db.collection("Chats")
                    .doc(doc.id)
                    .collection("Messages")
                    .doc(doc1.id)
                    .update({
                        Members: members
                    })

                });
            });
        });
    });
}; 

function saveAuthToReadlist(docID, authName, messages, user){

    console.log("Functie werkt")
    console.log(messages)
   
    if(messages != 0){
        db.collection("Chats")
        .doc(docID)
        .collection("Messages")
        .where("Members", "array-contains", authName)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const read = doc1.data().Read

                console.log("We're in")

                if(!read.includes(authName)){
                    db.collection("Chats")
                    .doc(docID)
                    .collection("Messages")
                    .doc(doc1.id)
                    .update({
                        Read: firebase.firestore.FieldValue.arrayUnion(authName)
                    })
                    .then(() => {
                        console.log("Readlist geupdate met auth")
                        window.open(`../Chats/${user}.html`, "_self");
                    });
                } else {
                    console.log("Auth is already on readlist")
                    setTimeout(() =>  {
                        window.open(`../Chats/${user}.html`, "_self");
                    }, 1000);
                };
            });
        });
    }else{
        console.log("Geen berichten uberhaubt")
        window.open(`../Chats/${user}.html`, "_self");
    };
}; 


function newMessageInOverview(docID, auth, chatsDivDOM){

    const newMessageCount = []

    const newMessagesP = document.createElement("p")
    newMessagesP.setAttribute("class", "new-message-count-chats")

    db.collection("Chats").doc(docID) 
    .collection("Messages")
    .where("Members", "array-contains", auth)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc2 => {

            const read = doc2.data().Read

            if(!read.includes(auth)){     
            newMessageCount.push(doc2)
            };
           
            newMessagesP.innerText = newMessageCount.length

        });
    }).then(() => {

            chatsDivDOM.appendChild(newMessagesP)

            if(newMessageCount.length === 0){
                newMessagesP.style.display = "none"
            }
    });
};

        // Database query

!function dataBaseQueryChats(){
const DOMchats = document.getElementById("overview-chats")

if (DOMchats != null){

auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);
      userRef.get().then(function(doc) {

        const auth = doc.data().Gebruikersnaam

        db.collection("Chats")
        .where("Members", "array-contains", auth)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const messages = doc1.data().Messages
                const members = doc1.data().Members

                const chatsDivChat = document.createElement("div")
                    chatsDivChat.setAttribute("class", "chats-div")
                const chatsPChat = document.createElement("p")
                const photoDivChat = document.createElement("div")
                    photoDivChat.setAttribute("class", "photo-div")
                const photoImgChat = document.createElement("img")
                const groupTypeChat = document.createElement("p")
                    groupTypeChat.setAttribute("class", "grouptype-description")
                    
                    let user = ""

                    const membersArray = Array.from(members)

                    membersArray.forEach(member => {
                        if(member != auth){
                            user = member
                        };
                    });
                
                    newMessageInOverview(doc1.id, auth, chatsDivChat)
        
                    getProfilePicAndNameOfChat(chatsPChat, photoImgChat, user)

                    // Open chat
                    chatsDivChat.addEventListener("click", () => {
                            
                         saveAuthToReadlist(doc1.id, auth, messages, user)
                    });
        
                    DOMchats.appendChild(chatsDivChat)
                    chatsDivChat.appendChild(photoDivChat)
                    photoDivChat.appendChild(photoImgChat)
                    photoDivChat.appendChild(groupTypeChat)
                    chatsDivChat.appendChild(chatsPChat)

                        });
                    });
                });
            };
        });
    };
}();


    // Add learning

    function addLearning(){

        const inspirationIcon = document.getElementById("inspiration-icon")
        const addLearningDiv = document.getElementById("add-learning-div")
        const selectGoals = document.getElementById("select-goals")
        const buttonAddLearning = document.getElementById("button-add-learning")
        const inputAddLearning = document.getElementById("input-learning")
        const addLearningH3 = document.getElementById("add-learning-h3")
        const addLearningButtonDiv = document.getElementById("add-learning-button-div")

        if(inspirationIcon != null){
    
        inspirationIcon.addEventListener("click", () => {
    
            addLearningDiv.style.display = "flex"
            addLearningDiv.scrollIntoView();
    
        });
    };
    
        // Load goals of auth in select

function showGoalsAndInputOfAuth(){

    const authDiv = document.getElementById("auth-div")
    const CTA = document.getElementById("cta-lesson-coachgroup")

    if(authDiv != null || CTA != null){

        authDiv.style.display = "flex"
        CTA.style.display = "none"
    };
}

auth.onAuthStateChanged(User =>{
    if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

        const auth = doc.data().Gebruikersnaam

            db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", auth)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const levensvraagClean = doc1.data().LevensvraagClean

                    const option = document.createElement("option")

                    option.innerText = levensvraagClean

                    if(selectGoals != null){

                    selectGoals.appendChild(option)
                    };

                    showGoalsAndInputOfAuth()
                });
            });
        });
    };
});

!function showAddLearningDiv(){

    const learningTitleDiv = document.getElementById("learnings-title-div")

    const learningInnerDiv = document.getElementById("learning-inner-div")

    if(learningInnerDiv != null){

        learningTitleDiv.addEventListener("click", () => {

            if(learningInnerDiv.style.display === "flex"){
                learningInnerDiv.style.display = "none"
            } else {
                learningInnerDiv.style.display = "flex"
            };
        });
    };
}();

    
    if (buttonAddLearning != null){
        buttonAddLearning.addEventListener("click", () => {
    
            const input = document.getElementById("input-learning").value
       
            const select = document.getElementById("select-goals")
            const option = select.options
            const selected = option[option.selectedIndex].innerHTML
       
            db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", selected).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
       
                   const levensvraagID = doc.data().Levensvraag
       
            auth.onAuthStateChanged(User =>{
                userRef = db.collection("Vitaminders").doc(User.uid)
                userRef.get()
                 .then(doc => {
                         const auth = doc.data().Gebruikersnaam
       
            db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Levensles: input,
            Gebruikersnaam: auth,
            Inspirerend: 1,
            Type: "Coachgroup-inzicht",
            Source: titel,
            Levensvraag: levensvraagID,
            Status: "Approved"
                    })
       
            levensvraagRef = db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraagID).where("Gebruikersnaam", "==", auth)
            levensvraagRef.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc4 => {
                    
                    db.collection("Vitaminders").doc(User.uid).collection("Levensvragen").doc(doc4.id).update({
                        Levenslessen: firebase.firestore.FieldValue.arrayUnion(input)
                    })
                    
                })
            })
            const savedNotice = document.getElementById("notice-learning-added")
            savedNotice.style.display = "block"
                       })
                   })
               })
           })
        }); 
    }; 
    }; addLearning()
