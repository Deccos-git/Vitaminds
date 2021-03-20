!function GroupsForCoachesInit(){

    const titelhtmlCG = window.location.href.replace(/^.*[\\\/]/, '')
    const titel1CG = titelhtmlCG.replace('.html', '')
    const titel2CG = titel1CG.replace('%20',' ')
    const titel3CG = titel2CG.replace('%20',' ')
    const titel4CG = titel3CG.replace('%20',' ')
    const titel5CG = titel4CG.replace('%20',' ')
    const titel6CG = titel4CG.replace('%20',' ')
    const titel7CG = titel6CG.replace('%20',' ')
    const titel8CG = titel7CG.replace('%20',' ')
    const titel9CG = titel8CG.replace('%20',' ')
    const titel10CG = titel9CG.replace('%20',' ')
    const titel11CG = titel10CG.replace('%20',' ')
    const titel12CG = titel11CG.split("?fb")
    const titelCG = titel12CG[0]
    
    function groupsForCoachesMetaTags(descriptionGroup, titleGroup, bannerGroup){
        const keywords = document.getElementById("meta-keywords")
        const pageTitle = document.getElementById("page-title")
        const description = document.getElementById("meta-description")
        const facebookURL = document.getElementById("facebook-url")
        const facebookTitle = document.getElementById("facebook-title")
        const facebookDescription = document.getElementById("facebook-description")
        const facebookImage = document.getElementById("facebook-img")

        if(pageTitle != null){
        
        keywords.content = titleGroup
        description.content = descriptionGroup
        facebookURL.content = window.location.href
        facebookTitle.content = titleGroup
        pageTitle.innerText = titleGroup
        facebookDescription.content = descriptionGroup
        facebookImage.content = bannerGroup
        };
    };
    
    // GroupsForCoaches in Chats&Groups
    
    function setNameOfGroup(groupsP, roomClean){
        groupsP.innerText = roomClean
      };
    
    function setImageGroup(photoImg){
        photoImg.src = "/images/groups-icon.jpg"
    };

    function displayGroupsForCoachesTitleInChatsAndGroups(){

        const title = document.getElementById("overview-groups-for-coaches-title")

        title.innerText = "Groepen voor coaches"
    };
    
    function newMessageInOverviewGroup(docID, groupsDivDOM, auth){
    
        const newMessageCount = []
    
        const newMessagesP = document.createElement("p")
        newMessagesP.setAttribute("class", "new-message-count-chats")
    
        db.collection("GroupsForCoaches").doc(docID) 
        .collection("Messages")
        .where("Status", "==", "New")
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                const read = doc.data().Read
    
                if(!read.includes(auth)){
           
                newMessageCount.push(doc)
    
                };
               
                newMessagesP.innerText = newMessageCount.length
    
            })
        }).then(() => {
    
                groupsDivDOM.appendChild(newMessagesP)
    
                if(newMessageCount.length === 0){
                    newMessagesP.style.display = "none"
                }
    
        });
    };
    
    function updateReadList(docID, authName, titleURL, messages){
    
        if(messages != 0){
            db.collection("GroupsForCoaches")
            .doc(docID)
            .collection("Messages")
            .where("Members", "array-contains", authName)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {
    
                    const read = doc1.data().Read
    
                    if(!read.includes(authName)){
                        db.collection("GroupsForCoaches")
                        .doc(docID)
                        .collection("Messages")
                        .doc(doc1.id)
                        .update({
                            Read: firebase.firestore.FieldValue.arrayUnion(authName)
                        })
                        .then(() => {
                            console.log("Readlist geupdate met auth")
                            window.open(`../groups-coaches/${titleURL}.html`, "_self");
                        });
                    } else {
                        console.log("Auth is already on readlist")
                        setTimeout(() => {
                            window.open(`../groups-coaches/${titleURL}.html`, "_self");
                         }, 1000);
                    };
                });
            });
        }else{
            console.log("Geen berichten uberhaubt")
            window.open(`../groups-coaches/${titleURL}.html`, "_self");
        };
    };
    
    !function dataBaseQueryGroups(){
    const DOMgroups = document.getElementById("overview-groups-for-coaches")
    
    if (DOMgroups != null){
    
    auth.onAuthStateChanged(User =>{
        if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam
    
                db.collection("GroupsForCoaches")
                .where("Members", "array-contains", auth)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
    
                        const roomClean = doc.data().RoomClean
                        const room = doc.data().Room
                        const messages = doc.data().Messages
    
                        const groupsDiv = document.createElement("div")
                            groupsDiv.setAttribute("class", "groups-div")
                        const groupsP = document.createElement("p")
                        const photoDiv = document.createElement("div")
                            photoDiv.setAttribute("class", "photo-div")
                        const photoImg = document.createElement("img")
                        const groupType = document.createElement("p")
                            groupType.setAttribute("class", "grouptype-description")    
    
                                    newMessageInOverviewGroup(doc.id, groupsDiv, auth)
                                    setNameOfGroup(groupsP, roomClean);
                                    setImageGroup(photoImg)
                                    displayGroupsForCoachesTitleInChatsAndGroups()
    
                                    // Open chat
                                    groupsDiv.addEventListener("click", () => {
                                            
                                            updateReadList(doc.id, auth, room, messages)
                                    });
                        
                                    DOMgroups.appendChild(groupsDiv)
                                    groupsDiv.appendChild(photoDiv)
                                    photoDiv.appendChild(photoImg)
                                    photoDiv.appendChild(groupType)
                                    groupsDiv.appendChild(groupsP)
                
                            });
                        });
                    });
                };
            });
        };
    }();
    
    
    // Overviewpage

    function showNumberOfParticipants(numberParticipantsP, numberParticipants){

        numberParticipantsP.innerHTML = `<b>Max. aantal deelnemers:</b><br> ${numberParticipants}`

        if(numberParticipants === undefined){
            numberParticipantsP.style.display = "none"
        };
    };

    function showDurationOfGroup(duration, groupLenghtP){
        if( duration === "Doorlopend"){
            groupLenghtP.innerHTML = `<b>Duur van coachgroep:</b> ${duration}` 
        } else if (duration != undefined){
            groupLenghtP.innerHTML = `<b>Duur van coachgroep:</b> ${duration} maanden`
        } else if (duration === undefined){
            groupLenghtP.style.display = "none"
        };
    };

    function vitamindsLivingRoomExceptions(title, memberCount, costsP, leaveGroup){
        if (title === "54qd48ydediVitaminds huiskamer"){
            memberCount.style.display = "none"
            costsP.style.display = "none"
            leaveGroup.style.display = "none"

            console.log(leaveGroup)
        };
    };

    function organizerInfo(authImg, authName, authDiv, auth){
        
        db.collection("Vitaminders").where("Gebruikersnaam", "==", auth)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const nameClean = doc1.data().GebruikersnaamClean
                const profilePic = doc1.data().Profielfoto
        
                authImg.src = profilePic
                authName.innerText = nameClean

                authDiv.appendChild(authImg)
                authDiv.appendChild(authName)

                authDiv.addEventListener("click", () => {
                    window.open("../Vitaminders/" + auth + ".html", "_self");
                });
            });
        });
    };

    function showLeaveGroupForMember(members, auth, buttonDiv, leaveGroup){
        if(members.includes(auth)){
            buttonDiv.appendChild(leaveGroup)
            };
    };

    function leaveGroupForCoaches(leaveGroup, title){
        leaveGroup.addEventListener("click", () => {
    
            leaveTheGroup(title)
        });
    };
    
    db.collection("GroupsForCoaches")
    .where("Type", "==", "GroupsForCoaches")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
    
            const title = doc.data().Room
            const titleClean = doc.data().RoomClean
            const auth = doc.data().Creater
            const description = doc.data().Description
            const numberParticipants = doc.data().NumberParticipants
            const coverPhoto = doc.data().CoverPhoto
            const costs = doc.data().Costs
            const members = doc.data().Members
            const type = doc.data().Type
            const duration = doc.data().GroupLength
            const startdate = doc.data().StartDate
    
            const DOM = document.getElementById("groups-for-coaches")
    
            const groupInnerDiv = document.createElement("div")
                groupInnerDiv.setAttribute("class", "theme-groups-section")
            const groupHeader = document.createElement("div")
                groupHeader.setAttribute("class", "theme-groups-header")
            const groupCoverPhoto = document.createElement("img")
                groupCoverPhoto.setAttribute("class", "header-image-groups")
            const authDiv = document.createElement("div")
                authDiv.setAttribute("class", "group-auth-div")
            const authImg = document.createElement("img")
                authImg.setAttribute("class", "group-auth-img")
            const authName = document.createElement("p")
            const metaDiv = document.createElement("div")
                metaDiv.setAttribute("class", "group-meta-div")
            const numberParticipantsP = document.createElement("p")
            const memberCount = document.createElement("p")
            const startdateP = document.createElement("p")
            const groupLenghtP = document.createElement("p")
            const costsP = document.createElement("p")
            const bottomDiv = document.createElement("div")
                bottomDiv.setAttribute("class", "bottom-div")
            const groupTitleH2 = document.createElement("h2")
                groupTitleH2.setAttribute("class", "titelTekst")
            const descriptionP = document.createElement("p")
            const buttonDiv = document.createElement("div")
                buttonDiv.setAttribute("id", "group-button-div")
            const groupButton = document.createElement("button")
                groupButton.setAttribute("class", "button-algemeen-card")
                groupButton.setAttribute("id", "group-button")
                groupButton.setAttribute("data-room", title)
            const leaveGroup = document.createElement("p")
                leaveGroup.setAttribute("class", "leave-group-button")
    
                groupCoverPhoto.src = coverPhoto
                groupTitleH2.innerText = titleClean
    
                openGroup(title, groupButton)
                showDurationOfGroup(duration, groupLenghtP)
                hideLeaveGroupButtonIfAuthIsNotMember(members, leaveGroup)
                showVisitGroupIfAuthIsMember(members, groupButton, title)
                showNumberOfParticipants(numberParticipantsP, numberParticipants)
                organizerInfo(authImg, authName, authDiv, auth)
                groupsForCoachesMetaTags(description, titleClean, coverPhoto)
                showLeaveGroupForMember(members, auth, buttonDiv, leaveGroup)
                vitamindsLivingRoomExceptions(title, memberCount, costsP, leaveGroup)
                groupIsFull(members.length, groupButton, numberParticipants)
                leaveGroupForCoaches(leaveGroup, title)
    
                memberCount.innerHTML = `<b>Aantal aanmeldingen:</b><br> ${members.length}`
                costsP.innerHTML = `<b>Kosten:</b><br> Eenmalig €${costs}`
                leaveGroup.innerHTML = "Aanmelding annuleren"
    
                if(DOM != null){
    
                DOM.appendChild(groupInnerDiv)
                groupInnerDiv.appendChild(groupHeader)
                groupHeader.appendChild(groupCoverPhoto)
                groupInnerDiv.appendChild(authDiv)
                groupInnerDiv.appendChild(bottomDiv)
                bottomDiv.appendChild(groupTitleH2)
                bottomDiv.appendChild(descriptionP)
                groupInnerDiv.appendChild(metaDiv)
                metaDiv.appendChild(numberParticipantsP)
                metaDiv.appendChild(memberCount)
                metaDiv.appendChild(groupLenghtP)
                metaDiv.appendChild(startdateP)
                metaDiv.appendChild(costsP)
                groupInnerDiv.appendChild(buttonDiv)
                buttonDiv.appendChild(groupButton)
    
                };
        });
    });

    
    function hideLeaveGroupButtonIfAuthIsNotMember(membersOfGroup, leaveGroupButton){
    
        auth.onAuthStateChanged(User =>{
            if (User){
        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
    
            const auth = doc.data().Gebruikersnaam
    
            if(membersOfGroup.includes(auth)){
                leaveGroupButton.style.display = "block"
            }
    
                });
            };
        });
    };
    
    function showVisitGroupIfAuthIsMember(membersOfGroup, button, title){
        auth.onAuthStateChanged(User =>{
            if (User){
        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
    
            const auth = doc.data().Gebruikersnaam
    
            if(membersOfGroup.includes(auth)){
                button.innerHTML = `<a class="visit-group" href='../groups-coaches/${title}.html'>Ga naar groep</a>`
            }
    
                });
            };
        });
    }
    
     // Group is full message
    
     function groupIsFull(a,b,c){
    
        if (a === c){
            b.innerText = "Groep is vol"
            b.setAttribute("onclick", "null()")
        }; 
     };
    
    // Leave group
    function leaveTheGroup(roomTitle){
        const button = document.getElementById("group-button")

        if(button != null){
        button.innerText = "Aanmelding is geannuleerd"
        };
    
        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders")
            .doc(User.uid);
            userRef.get()
            .then(function(doc) {
    
                const auth = doc.data().Gebruikersnaam
    
                db.collection("GroupsForCoaches")
                .where("Room", "==", roomTitle )
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {
            
                    db.collection("GroupsForCoaches")
                    .doc(doc1.id)
                    .update({
                        Members: firebase.firestore.FieldValue.arrayRemove(auth)
                                });
                        
                                db.collection("GroupsForCoaches")
                                .doc(doc1.id)
                                .collection("Messages")
                                .where("Members", "array-contains", auth)
                                .get().then(querySnapshot => {
                                    querySnapshot.forEach(doc2 => {
    
                                        db.collection("GroupsForCoaches")
                                        .doc(doc.id)
                                        .collection("Messages")
                                        .doc(doc2.id)
                                        .update({
                                            Members:firebase.firestore.FieldValue.arrayRemove(auth)
                                        });   
                                    });
                                });
                            });
                        });
                });
            };
        });
    };
    
    function openGroup(roomName, buttonName){
        buttonName.innerHTML = `<a href="../groups-coaches/${roomName}.html">Meer informatie</a>`
    
    };
    
    // Group landing
    
    const groupLandingPageOuterDiv = document.getElementById("group-landing-page")
    const groupLandingTitle = document.getElementById("group-landing-title")
    const buttonGroupLanding = document.getElementById("button-group-landing")
    const groupDescription = document.getElementById("group-description")
    const groupFactsUl = document.getElementById("group-facts")
    const bannerDiv = document.getElementById("banner-div")
    const agreementModal = document.getElementById("coachgroup-agreement")
    
    function groupLandingH1(roomNameClean){
    
        if(groupLandingTitle != null){
    
                groupLandingTitle.innerText = roomNameClean
        };
    };
    
    function groupLandingCreatorInformation(creatorCoach, typeGroup){
        const creatorDiv = document.getElementById("creator-information-div")
    
        const creatorName = document.createElement("h2")
        const creatorProfilePicture = document.createElement("img")
    
        if(creatorCoach != undefined){
    
        db.collection("Vitaminders").where("Gebruikersnaam", "==", creatorCoach)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                const gebruikersnaamClean = doc.data().GebruikersnaamClean
                const profilePicture = doc.data().Profielfoto
    
                creatorName.innerText = gebruikersnaamClean
                creatorProfilePicture.src = profilePicture
    
                creatorDiv.addEventListener("click", () => {
                    window.open("../Vitaminders/" + [creatorCoach] + ".html", "_self");
                })
    
                creatorDiv.appendChild(creatorName)
                creatorDiv.appendChild(creatorProfilePicture)
                });
            });
        };
    };
    
    function hideLandingIfAuthIsMember(membersArray, groupLandingPageOuterDiv){
    
        auth.onAuthStateChanged(User =>{
            if(User){
              const userRef = db.collection("Vitaminders").doc(User.uid);
              userRef.get().then(function(doc) {
        
                    const auth = doc.data().Gebruikersnaam
    
                    if(membersArray.includes(auth)){

                        console.log(membersArray)
                        groupLandingPageOuterDiv.style.display = "none"
                    };
                });
            };
        });
    }; 
    
    function groupFactsLanding(memberCount, totalCosts, maximumMembersCount, durationTime, startDate){
    
        const numberOfMembersLi = document.createElement("li")
        const maximumMembers = document.createElement("li")
        const costs = document.createElement("li")
        const duration = document.createElement("li")
        const start = document.createElement("li")
    
            numberOfMembersLi.innerHTML = `<b>Aantal aanmeldingen:</b> ${memberCount.length}`
            costs.innerHTML = `<b>Kosten:</b> ${totalCosts} euro`
            maximumMembers.innerHTML = `<b>Aantal deelnemers:</b> ${maximumMembersCount}`
    
            if(durationTime === "Doorlopend"){
                duration.innerHTML = `<b>Duur van coachgroep:</b> ${durationTime}` 
            } else {
                duration.innerHTML = `<b>Duur van coachgroep:</b> ${durationTime} maanden`
            }
            start.innerHTML = `<b>Start datum:</b> ${startDate}`
    
            groupFactsUl.appendChild(maximumMembers)
            if(groupFactsUl != null){
                groupFactsUl.appendChild(numberOfMembersLi)
                };
            groupFactsUl.appendChild(duration)
            groupFactsUl.appendChild(costs)
            groupFactsUl.appendChild(start)
    };
    
    function groupDescriptionLanding(descriptionOfGroup){
        
    
        groupDescription.innerHTML = descriptionOfGroup
    }
    
    function groupLandingBanner(imagePhoto){
    
        const bannerImg = document.createElement("img")
    
        bannerImg.src = imagePhoto
    
        bannerDiv.appendChild(bannerImg)
    }
    
    function hideLandingModal(){
        const hideIcon = document.getElementById("hide-landing-modal")
    
        hideIcon.addEventListener("click", () => {
            window.open("../groups.html", "_self");
        });
    };
    
    !function editDescriptionEvent(){
    
        const editIcon = document.createElement("img")
            editIcon.setAttribute("id", "edit-icon-event-description")
        editIcon.src = "/images/edit-icon.png"
    
        const dom = document.getElementById("description-div")
    
        const tinyMCEDiv = document.getElementById("tiny-mce-div")
    
        displayEditIconIfAuthIsAdmin(editIcon)
    
        editIcon.addEventListener("click", () => {
    
            tinyMCEDiv.style.display = "flex"
            dom.style.display = "none"
    
            db.collection("GroupsForCoaches").where("Room", "==", titelCG)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
    
                    const description = doc.data().Description
    
                        tinymce.get("tiny-mce").setContent(description);
    
                });
            });
        });
    }();
    
    function displayEditIconIfAuthIsAdmin(editIcon){
    
        const dom = document.getElementById("description-div")
    
        if(dom != null){
    
            auth.onAuthStateChanged(User =>{
                db.collection("Vitaminders").doc(User.uid)
                .get().then(doc => {
    
                    const admin = doc.data().Admin
    
                    if(admin === "Yes"){
    
                        dom.appendChild(editIcon)
    
                    };
                });
            });
        };
    };
    
    !function saveEditedDescription(){
    
        const button = document.getElementById("button-edit-group-description")
    
        if(button != null){
    
            button.addEventListener("click", () => {
    
                const description = tinymce.get("tiny-mce").getContent();
    
                button.innerText = "Opgeslagen"
                button.id = "Clicked"
    
                db.collection("GroupsforCoaches").where("Room", "==", titelCG)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
    
                        db.collection("GroupsForCoaches").doc(doc.id).update({
                            Description: description
                        })
                        .then(() => {
                            location.reload(); 
                        });
                    });
                });
            });
        };
    }();

    function formatDateLanding(start){

        if(start != undefined){

        const dateArray = start.split("-")
    
        const date = `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`
        };
    };
    
    !function fillLandingWithGroupData(){
        db.collection("GroupsForCoaches").where("Room", "==", titelCG).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {
    
                const members = doc1.data().Members
                const roomClean = doc1.data().RoomClean
                const type1 = doc1.data().Type
                const creator = doc1.data().Creater
                const bannerImage = doc1.data().CoverPhoto
                const price = doc1.data().Costs
                const maxMembers = doc1.data().NumberParticipants
                const groupDescription = doc1.data().Description
                const duration = doc1.data().GroupLength
                const start = doc1.data().StartDate
    
                groupLandingH1(roomClean)
    
                groupLandingCreatorInformation(creator, type1)
    
                groupFactsLanding(members, price, maxMembers, duration)
        
                hideLandingIfAuthIsMember(members, groupLandingPageOuterDiv)
        
                groupDescriptionLanding(groupDescription)
    
                hideLandingModal()
    
                groupLandingBanner(bannerImage)

                formatDateLanding(start)
    
            });
        });
    }();
    
    // Coachgroup individual page
    
    !function scrollToTextInputOnLoad(){
    
        const textInput = document.getElementById("chat-input")
    
        if(textInput != null){
    
        textInput.scrollIntoView();
    
        };
    }();
    
        // Title
    
        const DOMtitle = document.getElementById("group-title")
    
        if(DOMtitle != null){
    
            db.collection("GroupsForCoaches").where("Room", "==", titelCG).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
    
                    const roomClean = doc.data().RoomClean
                    const room = doc.data().Room
    
                    if(roomClean == undefined){
                        DOMtitle.innerText = room
                    } else {
                        DOMtitle.innerText = roomClean
                    }
        
                });
            });
        }
    
        const DOMchatScreen = document.getElementById("chat-screen")
    
        // Display members 
    
        const listOfMembers = document.getElementById("list-of-members-inner-div")
    
        const roomName = titelCG
    
    db.collection("GroupsForCoaches").where("Room", "==", roomName).get().then(querySnapshot => {
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
                            memberPhoto.src = "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
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
    
                if(learningInnerDiv.style.display === "none"){
                    learningInnerDiv.style.display = "flex"
                } else {
                    learningInnerDiv.style.display = "none"
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
                Source: titeCGl,
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
         
    
        // Save message to database
    
        const DOMchatScreenGroupChat = document.getElementById("chat-screen")
    
        function saveMessage(){
            const message = document.getElementById("chat-input").value 
    
            auth.onAuthStateChanged(User =>{
                if(User){
                const userRef = db.collection("Vitaminders").doc(User.uid);
                userRef.get().then(function(doc) {
            
                        const auth = doc.data().Gebruikersnaam
    
            const roomName = titelCG
    
        db.collection("GroupsForCoaches").where("Room", "==", roomName).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                const members = doc.data().Members
    
            db.collection("GroupsForCoaches").doc(doc.id).collection("Messages").doc().set({
                Auth: auth,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Message: message,
                Room: roomName,
                Members: members,
                ID: idClean,
                Read: [auth],
                Status: "New"
                }).then(() => {
                    db.collection("GroupsForCoaches").doc(doc.id).update({
                        Messages: firebase.firestore.FieldValue.increment(1)
                                    }).then(() => {
                                        const input = document.getElementById("chat-input")
    
                                        input.value = ""
                                    });
                                });  
                            });
                        });
                    });
                };
            });
        };
        const sendGroupChat = document.getElementById("send-icon-group")
    
        if(sendGroupChat != null){
    
            sendGroupChat.addEventListener("click", saveMessage, false)
            sendGroupChat.addEventListener("submit", saveMessage, false)
    
        };
    
        // Get chat from database in realtime
    
            // Variables
    
            const senderNameArray = []
    
            //Functions
            function emptyScreenByOnsnapshot(){
                const chatDivsUser = document.getElementsByClassName("message-div")
            
                const chatDivsArrayUser = Array.from(chatDivsUser)
            
                chatDivsArrayUser.forEach(chatUser => {
                    DOMchatScreenGroupChat.removeChild(chatUser)
                });
            };
    
            function chooseRecipientForMail(sendAsMailDiv){
    
                const selectMember = document.createElement("select")
                selectMember.setAttribute("id", "select-member-to-send-mail")
                const optionAllMembers = document.createElement("option")
                optionAllMembers.innerText = "Iedereen"
                selectMember.appendChild(optionAllMembers)
                
                db.collection("GroupsForCoaches")
                    .where("Room", "==", roomName)
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
    
                            const members = doc.data().Members
    
                            members.forEach(member => {
    
                                db.collection("Vitaminders")
                            .where("Gebruikersnaam", "==", member)
                            .get().then(querySnapshot => {
                                querySnapshot.forEach(doc1 => {
    
                                    const usernameClean = doc1.data().GebruikersnaamClean
                                    const option = document.createElement("option")
                                    option.innerText = usernameClean
                                    selectMember.appendChild(option)
                            });
                        });
    
                            sendAsMailDiv.appendChild(selectMember)
    
                        });
                    });
                });
            }; 
    
            function sendMessageAsMailButton(sendAsMailDiv){
    
                const sendButton = document.createElement("button")
                sendButton.setAttribute("id", "sendAsMailButton")
                sendButton.setAttribute("onclick", "sendChatAsMail(this)")
                sendButton.innerText = "Verstuur bericht als mail"
    
                sendAsMailDiv.appendChild(sendButton)
            }
    
            function messageOptions(sender, chatMessage, chatRoom, authChatter){
                const options = document.createElement("img")
                   options.setAttribute("class", "message-options")
                options.src = "../images/design/mail-icon2.jpg"
    
                const sendAsMailDiv = document.createElement("div")
                   sendAsMailDiv.setAttribute("class", "send-chat-as-mail-div")
                   sendAsMailDiv.setAttribute("data-message", chatMessage)
                   sendAsMailDiv.setAttribute("data-room", chatRoom)
                   sendAsMailDiv.setAttribute("data-auth", authChatter)
    
                sender.appendChild(options)
                sender.appendChild(sendAsMailDiv)
                chooseRecipientForMail(sendAsMailDiv)
                sendMessageAsMailButton(sendAsMailDiv)
                toggleSendAsMail(options, sendAsMailDiv)
           
           };
    
           function toggleSendAsMail(options, sendChatAsMailDiv){
    
                options.addEventListener("click", () => {
                        if(sendChatAsMailDiv.style.display === "flex"){
                            sendChatAsMailDiv.style.display = "none" 
                        } else {
                            sendChatAsMailDiv.style.display = "flex" 
                        };
                });
           };
           
           function sendChatAsMail(elem){
               const message = elem.parentElement.dataset.message
               const room = elem.parentElement.dataset.room
               const coach = elem.parentElement.dataset.auth
           
               elem.innerText = "Verstuurd"
    
               const memberSelect = elem.nextSibling
    
               const option = memberSelect.options
               const selected = option[option.selectedIndex].innerHTML
    
               db.collection("Vitaminders").where("GebruikersnaamClean", "==", coach)
                   .get().then(querySnapshot => {
                       querySnapshot.forEach(doc2 => {
           
                           const SenderNameClean = doc2.data().GebruikersnaamClean
           
               db.collection("GroupsForCoaches")
               .where("Room", "==", room).get()
               .then(querySnapshot => {
                   querySnapshot.forEach(doc => {
           
                       const members = doc.data().Members
                       const type = doc.data().Type
                       const titelClean = doc.data().RoomClean
                       const titel = doc.data().Room
           
                       members.forEach(member => {
    
                           db.collection("Vitaminders").where("Gebruikersnaam", "==", member)
                           .get().then(querySnapshot => {
                               querySnapshot.forEach(doc2 => {
           
                                   const email = doc2.data().Email
                                   const naam = doc2.data().GebruikersnaamClean
    
                                   if(selected === naam){
                                        console.log(email)
                                        emailLayout(email, SenderNameClean, titelClean, message, titel, naam)
                                   
                                   } else if (selected === "Iedereen") {
                                        console.log(email)
                                        emailLayout(email, SenderNameClean, titelClean, message, titel, naam)
                                   };
                                });
                            });
                       });
                   });
               });
           });
        });
    };
    
    function emailLayout(emailAdress, SenderNameClean, titelClean, message, titel, naam){
               db.collection("Mail").doc().set({
                    to: emailAdress,
                    cc: "info@vitaminds.nu",
            message: {
            subject: `Je hebt een nieuw coachbericht ontvangen van ${SenderNameClean} in je Coachgroep ${titelClean}`,
            html: `Hallo ${naam}, <br><br>
                    ${SenderNameClean} heeft je een bericht gestuurd in de Coachgroep ${titelClean} : <br><br>
    
                    "${message}"<br><br>
                    
                    Ga naar je <a href="www.vitaminds.nu/Group/${titel}.html">Coachgroep</a> om op het bericht te reageren.<br><br>
                    P.s. Om privacyredenen kun je coachgroep alleen bekijken als je bent ingelogd in Vitaminds.<br><br>
            
                    Vriendelijke groet, <br></br>
                    Het Vitaminds Team <br></br>
                    <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
            Gebruikersnaam: naam,
            Emailadres: emailAdress,
            Type: "New coachmessage in chat"
            }        
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
            input.placeholder = "Opmerking plaatsen"
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

        showReactionP.innerText = "Bekijk opmerkingen"

        message.appendChild(showReactionsDiv)
        showReactionsDiv.appendChild(showReactionP)

        displayReactionDiv(showReactionP, message)
    };

    function saveFirstReactionToDatabase(sendImage, input){

        sendImage.addEventListener("click", () => {

            const id = input.dataset.id
            const message = input.dataset.message
            const sender = input.dataset.sender

            const reaction = input.value

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
                                    ID: idClean,
                                    ParentMessage: message,
                                    ParentSender: sender,
                                    Auth: auth
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

            reactionsDiv.style.display = "flex"

            appendReactionToMessage(showReactionP, message, reactionsDiv)

        });
    };

    function appendReactionToMessage(showReactionP, message, reactionsDiv){
       
        const id = showReactionP.dataset.id
            
        displayReactionDiv(showReactionP, reactionsDiv)

        console.log(message, reactionsDiv)

        db.collectionGroup("Reactions")
        .where("ParentID", "==", id)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const reaction = doc.data().Message

                const reactionInnerDiv = document.createElement("div")
                const reactionP = document.createElement("p")

                reactionP.innerText = reaction

                message.appendChild(reactionsDiv)
                reactionsDiv.appendChild(reactionInnerDiv)
                reactionInnerDiv.appendChild(reactionP)
            });
        });
    };
    
    // Load massages in realtime
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

                            const messageDiv = document.createElement("div")
                                messageDiv.setAttribute("class", "message-div")
                                messageDiv.setAttribute("data-id", id)
    
                            const messageP = document.createElement("p")
                            messageP.setAttribute("class", "auth-message-p")
        
                            const senderName = document.createElement("p")
                            senderName.setAttribute("class", "sender-name-message")
        
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
    
                                if(admin.includes(sender)){
                                messageOptions(senderName, authMessage, roomName, messageNameClean)
                                };
        
                            } else {
    
                                senderName.innerText = messageNameClean
        
                                // messageDiv.style.alignSelf = "flex-start"
                                messageP.innerText = authMessage
                                senderName.style.fontWeight = "bold"
                                senderName.style.alignSelf = "flex-start"
                                senderName.style.color = colour
                                
                                };
                                messageDiv.appendChild(senderName)
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
    
    // Groups of auth AND notifications
    
    function getProfilePicOfChat(pic, picDOMobject){
        if(pic == undefined){
            picDOMobject.src = "images/dummy-profile-photo.jpeg"
        } else {
        picDOMobject.src = pic
        };
    };
    
    function setInnerTextOfDOMobjects(chat, grouptype, user, typeOfGroup){
        chat.innerText = user
        grouptype.innerText = typeOfGroup
      };
    
    
      function updateReadListGroup(docID, authName, messages, user){
       
        if(messages != 0){
            db.collection("GroupsForCoaches")
            .doc(docID)
            .collection("Messages")
            .where("Members", "array-contains", authName)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {
    
                    const read = doc1.data().Read
    
                    if(!read.includes(authName)){
                        db.collection("GroupsForCoaches")
                        .doc(docID)
                        .collection("Messages")
                        .doc(doc1.id)
                        .update({
                            Read: firebase.firestore.FieldValue.arrayUnion(authName)
                        })
                        .then(() => {
                            console.log("Readlist geupdate met auth")
                            window.open(`../Group/${user}.html`, "_self");
                        });
                    } else {
                        console.log("Auth is already on readlist")
                            window.open(`../Group/${user}.html`, "_self");
                    };
                });
            });
        }else{
            console.log("Geen berichten uberhaubt")
            window.open(`../Group/${user}.html`, "_self");
        };
    }; 
    
    function groupsOverviewTitleGroup(title, group, photo, typeDescription){
    
        group.innerText = title
        photo.src = "/images/groups-icon.jpg"
        typeDescription.innerText = "Coachgroup"
    };
    
    
            // Database query
    const DOMGroupChats = document.getElementById("overview-groups")
    
    if (DOMGroupChats != null){
    
    auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam
    
    db.collection("GroupsForCoaches").where("Members", "array-contains", auth).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {
    
            const type = doc1.data().Type
            const title = doc1.data().Room
            const titleClean = doc1.data().RoomClean
            const members = doc1.data().Members
            const creator = doc1.data().Creater
            const online = doc1.data().Online
            const messages = doc1.data().Messages
    
            const chatsDiv = document.createElement("div")
                chatsDiv.setAttribute("class", "chats-div")
            const chatsP = document.createElement("p")
            const photoDiv = document.createElement("div")
                photoDiv.setAttribute("class", "photo-div")
            const photoImg = document.createElement("img")
            const groupType = document.createElement("p")
                groupType.setAttribute("class", "grouptype-description")
                    
                      if (members.includes(auth)){
    
    
                        groupsOverviewTitleGroup(titleClean, chatsP, photoImg, groupType)
                                        
                        // Open group
                        chatsDiv.addEventListener("click", () => {
                        
                            updateReadListGroup(doc1.id, auth, title)
    
                        });

                    DOMGroupChats.appendChild(chatsDiv)
                    chatsDiv.appendChild(photoDiv)
                    photoDiv.appendChild(photoImg)
                    photoDiv.appendChild(groupType)
                    chatsDiv.appendChild(chatsP)
    
                        // New messages
                        const newMessagesPGroups = document.createElement("p")
                            newMessagesPGroups.setAttribute("class", "new-message-count-chats")
                            
                        newMessageInOverviewGroups(doc1.id, chatsDiv, newMessagesPGroups) 
                        };                
                });
            });
          });
        };
    });
    };
    
    function upgradeModal(notice){
    
        const upgradeModal = document.getElementById("upgrade-account-modal")
    
        notice.addEventListener("click", () => {
    
            upgradeModal.style.display = "flex"
        });
    };
    
    !function upgradeMessage(){
    
        const title = document.getElementById("welcome-message-upgrade")
    
        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {
    
                const name = doc.data().GebruikersnaamClean
    
                    if(title != null){
    
                        title.innerHTML = `Wat leuk dat je wilt updragen naar een Premium abonnement, ${name}!`
                    };
                });
            };
        });
    }();
    
    !function sendUpgradeRequest(){
        const requestButton = document.getElementById("upgrade-button")
    
        if(requestButton != null){
    
            requestButton.addEventListener("click", () => {
    
                auth.onAuthStateChanged(User =>{
                    if(User){
                    const userRef = db.collection("Vitaminders").doc(User.uid);
                    userRef.get().then(function(doc) {
    
                        const email = doc.data().Email
                        const nameClean = doc.data().GebruikersnaamClean
    
                            db.collection("Mail").doc().set({
                                to: [email],
                                cc: "info@vitaminds.nu",
                                message: {
                                subject: `Upgrade naar Premium Vitaminds account`,
                                html: `Hallo ${nameClean}, </br></br>
                                        Wat leuk dat je een Premium-account hebt aangevraagd!<br><br> 
                                        
                                        We gaan je account direct upgraden. Je ontvangt een mailtje zodra je account is ge-upgrade.</br></br>
    
                                        Vriendelijke groet, </br></br>
                                        Het Vitaminds Team </br></br>
                                        <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                                Gebruikersnaam: nameClean,
                                Emailadres: email,
                                Type: "Upgrade request"
                                }        
                                })
                            .then(() => {
    
                                requestButton.innerText = "Je upgrade is aangevraagd!"
    
                            });
                        });
                    };
                });
            });
        };
    }();
}();