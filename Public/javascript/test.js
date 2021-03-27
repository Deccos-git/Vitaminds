
    
        // Get chat from database in realtime
    
            // Variables
    
            const senderNameArray = []
    
            //Functions
            function emptyScreenByOnsnapshot(){

                const DOMchatScreenGroupChat = document.getElementById("chat-screen")

                const chatDivsUser = document.getElementsByClassName("message-div")
            
                const chatDivsArrayUser = Array.from(chatDivsUser)
            
                chatDivsArrayUser.forEach(chatUser => {
                    DOMchatScreenGroupChat.removeChild(chatUser)
                });
            };
    

    
    function addDataToSocial(supportType, userName, message){
    
        supportType.setAttribute("data-username", userName)
        supportType.setAttribute("data-message", message)
    
    };
    
    function addSocialIconsToMessage(messageP, userName, message){
    
        const socialIconDiv = document.createElement("div")
        socialIconDiv.setAttribute("class", "social-div") 
    
        const IFeelForYouIconDiv = document.createElement("div")
        const IUnderstandIconDiv = document.createElement("div")
        const yourGoodTheWayYouAreDiv = document.createElement("div")
        const keepAtItDiv = document.createElement("div")
        const yourNotAloneDiv = document.createElement("div")
    
        const IFeelForYouIconP = document.createElement("p")
        const IUnderstandIconP = document.createElement("p")
        const yourGoodTheWayYouAreP = document.createElement("p")
        const keepAtItP = document.createElement("p")
        const yourNotAloneP = document.createElement("p")
    
        IFeelForYouIconP.innerHTML = "Ik leef <br> met je mee"
        IUnderstandIconP.innerHTML = "Ik begrijp wat <br> je voelt"
        yourGoodTheWayYouAreP.innerHTML = "Je bent goed <br> zoals je bent"
        keepAtItP.innerHTML = "Ga zo door!"
        yourNotAloneP.innerHTML = "Je staat er <br> niet alleen voor"
    
        IFeelForYouIconDiv.setAttribute("class", "social-icon-div") 
        IUnderstandIconDiv.setAttribute("class", "social-icon-div")  
        yourGoodTheWayYouAreDiv.setAttribute("class", "social-icon-div") 
        keepAtItDiv.setAttribute("class", "social-icon-div") 
        yourNotAloneDiv.setAttribute("class", "social-icon-div") 
    
        addDataToSocial(IFeelForYouIconDiv, userName, message)
        addDataToSocial(IUnderstandIconDiv, userName, message)
        addDataToSocial(yourGoodTheWayYouAreDiv, userName, message)
        addDataToSocial(keepAtItDiv, userName, message)
        addDataToSocial(yourNotAloneDiv, userName, message)
    
        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {
    
                    const auth = doc.data().Gebruikersnaam
    
                    savebutton(IFeelForYouIconDiv, "IFeelForYou", auth, IFeelForYouIconP, "Ik leef met je mee")
                    savebutton(IUnderstandIconDiv, "IUnderstandYou", auth, IUnderstandIconP, "Ik begrijp wat je voelt")
                    savebutton(yourGoodTheWayYouAreDiv, "YourGoodTheWayYouAre", auth, yourGoodTheWayYouAreP, "Je bent goed zoals je bent")
                    savebutton(keepAtItDiv, "KeepAtIt", auth, keepAtItP, "Ga zo door!")
                    savebutton(yourNotAloneDiv, "YourNotAlone", auth, yourNotAloneP, "Je staat er niet alleen voor")
    
                });
            };
        });
    
        const IFeelForYouIcon = document.createElement("img")
        const IUnderstandIcon = document.createElement("img")
        const yourGoodTheWayYouAre = document.createElement("img")
        const keepAtIt = document.createElement("img")
        const yourNotAlone = document.createElement("img")
    
        IFeelForYouIcon.src = "../images/design/person-24px-heart.png"
        IUnderstandIcon.src = "../images/comparison-icon.png"
        yourGoodTheWayYouAre.src = "../images/design/person-24px-check.png"
        keepAtIt.src = "../images/heart-icon.png"
        yourNotAlone.src = "../images/design/group-24px.png"
    
        socialIconDiv.appendChild(IFeelForYouIconDiv)
        IFeelForYouIconDiv.appendChild(IFeelForYouIcon)
        IFeelForYouIconDiv.appendChild(IFeelForYouIconP)
        socialIconDiv.appendChild(IUnderstandIconDiv)
        IUnderstandIconDiv.appendChild(IUnderstandIcon)
        IUnderstandIconDiv.appendChild(IUnderstandIconP)
        socialIconDiv.appendChild(yourGoodTheWayYouAreDiv)
        yourGoodTheWayYouAreDiv.appendChild(yourGoodTheWayYouAre)
        yourGoodTheWayYouAreDiv.appendChild(yourGoodTheWayYouAreP)
        socialIconDiv.appendChild(keepAtItDiv)
        keepAtItDiv.appendChild(keepAtIt)
        keepAtItDiv.appendChild(keepAtItP)
        socialIconDiv.appendChild(yourNotAloneDiv)
        yourNotAloneDiv.appendChild(yourNotAlone)
        yourNotAloneDiv.appendChild(yourNotAloneP)
    
        messageP.appendChild(socialIconDiv)
    }
    
    function savebutton(supportType, support, auth, notice, socialTypeWritten){
    
        supportType.addEventListener("click", () => {
    
            const username = supportType.dataset.username
            const message = supportType.dataset.message
    
            saveInMessage(support, username, message)
            saveInUser(username, auth, message, support, socialTypeWritten)
    
            notice.innerText = "Verstuurd"
            notice.style.color = "#8e0000"
    
        });
    };
    
    function saveInMessage(support, username, message){
    
        db.collection("GroupsForCoaches")
        .where("Room", "==", titelCG)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                db.collection("GroupsForCoaches")
                .doc(doc.id)
                .collection("Messages")
                .where("Room", "==", titelCG)
                .where("Auth", "==", username)
                .where("Message", "==", message)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {
    
                        db.collection("GroupsForCoaches")
                        .doc(doc.id)
                        .collection("Messages")
                        .doc(doc1.id)
                        .update({
                            Support: firebase.firestore.FieldValue.arrayUnion(support)
                        });
                    });
                });
            });
        });
    };
    
    
    function saveInUser(username, giver, message, support, socialTypeWritten){
    
        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", username)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                const email = doc.data().Email
                const usernameClean = doc.data().GebruikersnaamClean
    
                sendMailNewSocial(email, usernameClean, socialTypeWritten)
    
                db.collection("Vitaminders")
                .doc(doc.id)
                .collection("Support")
                .doc()
                .set({
                    Type: support,
                    Giver: giver,
                    Reciever: username,
                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    Message: message,
                    SourceType: "OpenUp",
                    Status: "New"
                });
            });
        });
    };
    
    function sendMailNewSocial(email, gebruikersnaamClean, socialTypeWritten){
    
        console.log(email)
    
        db.collection("Mail").doc().set({
            to: email,
            cc: "info@vitaminds.nu",
            message: {
            subject: `Nieuwe steunreactie op Vitaminds`,
            html: `Hallo ${gebruikersnaamClean},</br></br>
            
            Je hebt een nieuwe steunreactie: <b>"${socialTypeWritten}"</b>.</br></br>
    
            Ga naar <a href="www.vitaminds.nu">Vitaminds</a> en bekijk je nieuwe reactie.</br></br>
            
            Vriendelijke groet, </br></br>
            Het Vitaminds Team </br></br>
            <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`
            }
                    
            }).catch((err) => {
            console.log(err)
            });
    
    }

    function appendReactionInputToMessage(messageDiv, message, id, sender){

        const inputDiv = document.createElement("div")
            inputDiv.setAttribute("id", "input-div-reaction")

        const sendImage = document.createElement("img")
        const input = document.createElement("textarea")
            input.placeholder = "Schrijf hier je reactie"
            input.id = "reaction-input-id"
            input.setAttribute("rows", "1")
            input.setAttribute("class", "reaction-input")
            input.setAttribute("data-message", message)
            input.setAttribute("data-id", id)
            input.setAttribute("data-sender", sender)
        
        sendImage.src = "../images/send-icon.png"

        saveFirstReactionToDatabase(sendImage, input)
        
        messageDiv.appendChild(inputDiv)
        inputDiv.appendChild(input)
        inputDiv.appendChild(sendImage)

    };

    function showReactions(message, id){

        const showReactionsDiv = document.createElement("div")
            showReactionsDiv.setAttribute("class", "show-reactions-div")

        const showReactionP = document.createElement("p")
            showReactionP.setAttribute("data-id", id)

        displayNumberOfReactionsOnMessage(showReactionP, id)

        message.appendChild(showReactionsDiv)
        showReactionsDiv.appendChild(showReactionP)

        displayReactionDiv(showReactionP, message)
    };

    function displayNumberOfReactionsOnMessage(showReactionP, id){

        const reactionArray = []

        db.collectionGroup("Reactions")
        .where("ParentID", "==", id)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const reaction = doc.data().Message

                reactionArray.push(reaction)
                
            });
        })
        .then(() => {
            const numberOfReactions = reactionArray.length

            console.log(numberOfReactions)

            if(numberOfReactions === 1){
                showReactionP.innerText = `Bekijk ${numberOfReactions} opmerking`
            } else {
                showReactionP.innerText = `Bekijk ${numberOfReactions} opmerkingen`
            };
        });
    };

    function saveFirstReactionToDatabase(sendImage, input){

        sendImage.addEventListener("click", () => {

            const id = input.dataset.id
            const message = input.dataset.message
            const sender = input.dataset.sender

            const reaction = input.value

            const idRandom = Math.random()
            const idAlpha = idRandom.toString(36)
            const idMessage = idAlpha.replace("0.", "")

            console.log(idMessage)
    
            input.value = ""

            auth.onAuthStateChanged(User =>{
                if(User){
                db.collection("Vitaminders")
                .doc(User.uid)
                .get().then(function(doc2) {

                    const auth = doc2.data().Gebruikersnaam

                        db.collection("GroupsForCoaches")
                        .where("Room", "==", roomName)
                        .get().then(querySnapshot => {
                            querySnapshot.forEach(doc => {

                                const messages = doc.data().Messages

                                db.collection("GroupsForCoaches")
                                .doc(doc.id)
                                .collection("Reactions")
                                .doc()
                                .set({
                                    Message: reaction,
                                    ParentID: id,
                                    Dept: 1,
                                    ReadList: [],
                                    ID: idMessage,
                                    ParentMessage: message,
                                    ParentSender: sender,
                                    Auth: auth,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                                })
                                .then(() => {
                                    db.collection("GroupsForCoaches")
                                    .where("Room", "==", roomName)
                                    .get().then(querySnapshot => {
                                        querySnapshot.forEach(doc => {

                                            db.collectionGroup("Messages")
                                            .where("ID", "==", id)
                                            .get().then(querySnapshot => {
                                                querySnapshot.forEach(doc1 => {

                                                    db.collection("GroupsForCoaches")
                                                    .doc(doc.id)
                                                    .collection("Messages")
                                                    .doc(doc1.id)
                                                    .update({
                                                        Reactions: firebase.firestore.FieldValue.increment(1)
                                                    });
                                                });
                                            });
                                        });
                                    });
                                })
                            });
                        });
                    });
                };
            });
        });
    };

    function displayReactionDiv(showReactionP, message){

        const reactionsDiv = document.createElement("div")
        reactionsDiv.setAttribute("class", "reactions-div")

        showReactionP.addEventListener("click", () => {

            if (reactionsDiv.style.display === "flex"){
                reactionsDiv.style.display = "none"
                reactionsDiv.innerHTML = ""
            } else {
                reactionsDiv.style.display = "flex"
                appendReactionToMessage(showReactionP, message, reactionsDiv)
            };
        });
    };

    function appendReactionsToReaction(id, parentReaction){

        db.collectionGroup("Reactions")
        .where("ParentID", "==", id)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const reaction = doc.data().Message
                const userName = doc.data().Auth
                const timestamp = doc.data().Timestamp
                const idReaction = doc.data().ID

                const reactionInnerDiv = document.createElement("div")
                    reactionInnerDiv.setAttribute("class", "reaction-inner-div-second-layer")
                const metaDiv = document.createElement("div")
                    metaDiv.setAttribute("class", "reaction-meta-div")
                const timestampP = document.createElement("p")
                    timestampP.setAttribute("class", "reaction-timestamp")
                const nameP = document.createElement("p")
                    nameP.setAttribute("class", "reaction-name")
                const reactionP = document.createElement("p")
                const numberOfReactionsP = document.createElement("p")

                displayNumberOfReactionsOnMessage(numberOfReactionsP, idReaction)

                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);
                displayUserNameInReaction(userName, nameP)
                reactionP.innerText = reaction

                parentReaction.appendChild(numberOfReactionsP)
                parentReaction.appendChild(reactionInnerDiv)
                reactionInnerDiv.appendChild(metaDiv)
                metaDiv.appendChild(timestampP)
                metaDiv.appendChild(nameP)
                reactionInnerDiv.appendChild(reactionP)
                appendInputToReaction(reactionInnerDiv, reaction, id, userName, id)
            });
        });
    };

    function appendReactionToMessage(showReactionP, message, reactionsDiv){
       
        const id = showReactionP.dataset.id

        db.collectionGroup("Reactions")
        .where("ParentID", "==", id)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const reaction = doc.data().Message
                const userName = doc.data().Auth
                const timestamp = doc.data().Timestamp
                const idReaction = doc.data().ID

                const reactionInnerDiv = document.createElement("div")
                    reactionInnerDiv.setAttribute("class", "reaction-inner-div")
                const metaDiv = document.createElement("div")
                    metaDiv.setAttribute("class", "reaction-meta-div")
                const timestampP = document.createElement("p")
                    timestampP.setAttribute("class", "reaction-timestamp")
                const nameP = document.createElement("p")
                    nameP.setAttribute("class", "reaction-name")
                const reactionP = document.createElement("p")
                const showReactionDiv = document.createElement("div")

                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);
                displayUserNameInReaction(userName, nameP)
                reactionP.innerText = reaction

                message.appendChild(reactionsDiv)
                reactionsDiv.appendChild(reactionInnerDiv)
                reactionInnerDiv.appendChild(metaDiv)
                metaDiv.appendChild(timestampP)
                metaDiv.appendChild(nameP)
                reactionInnerDiv.appendChild(reactionP)
                reactionInnerDiv.appendChild(showReactionDiv)
                appendInputToReaction(reactionInnerDiv, reaction, idReaction, userName, id)

                appendReactionsToReaction(idReaction, reactionInnerDiv)
            });
        });
    };

    function appendInputToReaction(reactionInnerDiv, message, id, sender){

        const inputDiv = document.createElement("div")
            inputDiv.setAttribute("class", "reaction-input-div")
        const input = document.createElement("input")
            input.setAttribute("data-message", message)
            input.setAttribute("data-id", id)
            input.setAttribute("data-sender", sender)
        const saveButton = document.createElement("img")

        saveSecondairyReaction(saveButton, input)

        input.placeholder = "Schrijf hier je reactie"
        saveButton.src = "../images/send-icon.png"

        reactionInnerDiv.appendChild(inputDiv)
        inputDiv.appendChild(input)
        inputDiv.appendChild(saveButton)

    };

    function displayUserNameInReaction(userName, nameP){

        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", userName)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const userNameClean = doc.data().GebruikersnaamClean

                nameP.innerText = userNameClean

            });
        });
    };

    function saveSecondairyReaction(saveButton, input){

        saveButton.addEventListener("click", () => {

            const id = input.dataset.id
            const message = input.dataset.message
            const sender = input.dataset.sender

            const reaction = input.value

            const idRandom = Math.random()
            const idAlpha = idRandom.toString(36)
            const idMessage = idAlpha.replace("0.", "")

            input.value = ""

            auth.onAuthStateChanged(User =>{
                if(User){
                db.collection("Vitaminders")
                .doc(User.uid)
                .get().then(function(doc2) {

                    const auth = doc2.data().Gebruikersnaam

                        db.collection("GroupsForCoaches")
                        .where("Room", "==", roomName)
                        .get().then(querySnapshot => {
                            querySnapshot.forEach(doc => {

                                const messages = doc.data().Messages

                                db.collection("GroupsForCoaches")
                                .doc(doc.id)
                                .collection("Reactions")
                                .doc()
                                .set({
                                    Message: reaction,
                                    ParentID: id,
                                    Dept: 1,
                                    ReadList: [],
                                    ID: idMessage,
                                    ParentMessage: message,
                                    ParentSender: sender,
                                    Auth: auth,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                                });
                            });
                        });
                    });
                };
            });
        });
    };
    
    // Load messages in realtime
    !function loadMessageInRealtime(){
        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {
    
                    const auth = doc.data().Gebruikersnaam
    
                    const roomName = titelCG
    
                    db.collection("GroupsForCoaches")
                    .where("Room", "==", roomName)
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc3 => {
    
                            const admin = doc3.data().Creater
    
                    db.collectionGroup("Messages")
                    .where("Room", "==", roomName)
                    .orderBy("Timestamp", "asc")
                    .onSnapshot(querySnapshot => {
    
                    emptyScreenByOnsnapshot()
                        
                        querySnapshot.forEach(doc2 => {
    
                            const authMessage = doc2.data().Message
                            const sender = doc2.data().Auth
                            const members = doc2.data().Members
                            const id = doc2.data().ID
                            const timestamp = doc2.data().Timestamp

                            const messageDiv = document.createElement("div")
                                messageDiv.setAttribute("class", "message-div")
                                messageDiv.setAttribute("data-id", id)
    
                            const messageP = document.createElement("p")
                            messageP.setAttribute("class", "auth-message-p")
        
                            const senderName = document.createElement("p")
                            senderName.setAttribute("class", "sender-name-message")

                            const timestampP = document.createElement("p")
                            timestampP.setAttribute("class", "message-timestamp")

                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);
    
        
                    db.collection("Vitaminders").where("Gebruikersnaam", "==", sender).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {
    
                            const messageNameClean = doc1.data().GebruikersnaamClean
                            const colour = doc1.data().Color
                        
                            if (auth == sender){
                                senderName.innerText = messageNameClean
        
                                // messageDiv.style.alignSelf = "flex-end"
                                messageP.innerText = authMessage
                                senderName.style.color = colour
                                senderName.style.fontWeight = "bold"
                                senderName.style.alignSelf = "flex-end"
                                timestampP.style.alignSelf = "flex-start"
    
                                if(admin.includes(sender)){
                                messageOptions(senderName, authMessage, roomName, messageNameClean)
                                };
        
                            } else {
    
                                senderName.innerText = messageNameClean
        
                                // messageDiv.style.alignSelf = "flex-start"
                                messageP.innerText = authMessage
                                senderName.style.fontWeight = "bold"
                                senderName.style.alignSelf = "flex-start"
                                timestampP.style.alignSelf = "flex-start"
                                senderName.style.color = colour
                                
                                };
                                messageDiv.appendChild(senderName)
                                messageDiv.appendChild(timestampP)
                                messageDiv.appendChild(messageP)
                                addSocialIconsToMessage(messageDiv, sender, authMessage, auth)
                                appendReactionInputToMessage(messageDiv, authMessage, id, sender)
                                showReactions(messageDiv, id)
    
                            });
                        });
                        DOMchatScreen.appendChild(messageDiv)
                    });
                });
            });
        });
            });
        };
    });
    }();