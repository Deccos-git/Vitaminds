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
const themegroupDOM = document.getElementById("themegroups")
const coachGroupDOM = document.getElementById("coachgroups")

const themegroupTab = document.getElementById("themegroup-tab")
const coachgroupTab = document.getElementById("coachgroup-tab")

if(themegroupTab != null){
    themegroupTab.addEventListener("click", () => {
        themegroupDOM.style.display = "flex"
        coachGroupDOM.style.display = "none"
        themegroupTab.style.backgroundColor = "#122b46"
        themegroupTab.style.color = "white"
        coachgroupTab.style.backgroundColor = "white"
        coachgroupTab.style.color = "#122b46"
    });
};

if(coachgroupTab != null){
    coachgroupTab.addEventListener("click", () => {
        themegroupDOM.style.display = "none"
        coachGroupDOM.style.display = "flex"
        themegroupTab.style.backgroundColor = "white"
        themegroupTab.style.color = "#122b46"
        coachgroupTab.style.backgroundColor = "#122b46"
        coachgroupTab.style.color = "white"
    });
};

function groupMetaTags(descriptionGroup, titleGroup, bannerGroup){
    const keywords = document.getElementById("meta-keywords")
    const pageTitle = document.getElementById("page-title")
    const description = document.getElementById("meta-description")
    const facebookURL = document.getElementById("facebook-url")
    const facebookTitle = document.getElementById("facebook-title")
    const facebookDescription = document.getElementById("facebook-description")
    const facebookImage = document.getElementById("facebook-img")
    
    keywords.content = titleGroup
    description.content = descriptionGroup
    facebookURL.content = window.location.href
    facebookTitle.content = titleGroup
    pageTitle.innerText = titleGroup
    facebookDescription.content = descriptionGroup
    facebookImage.content = bannerGroup
    };
    
    db.collection("Chats").where("Room", "==", titel)
    .get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const groupTitleClean = doc.data().RoomClean
        const groupTitle = doc.data().Room
        const descriptionCoachGroup = doc.data().Description
        const coverPhotoCoachgroup = doc.data().CoverPhoto

        const type = doc.data().Type

        if(type === "Group"){
        db.collection("Levensvragen").where("Levensvraag", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {
    
                const descriptionGroup = doc1.data().Summary
                const bannerImage = doc1.data().HeaderImage
        
        
        groupMetaTags(descriptionGroup, groupTitle, bannerImage)

                });
            });
        } else if (type === "Coachgroup" || type === "GroupForCoaches" ){

            groupMetaTags(descriptionCoachGroup, groupTitleClean, coverPhotoCoachgroup)

        }
    });
});

// Group landing

const groupLandingPageOuterDiv = document.getElementById("group-landing-page")
const groupLandingTitle = document.getElementById("group-landing-title")
const buttonGroupLanding = document.getElementById("button-group-landing")
const groupDescription = document.getElementById("group-description")
const groupFactsUl = document.getElementById("group-facts")
const bannerDiv = document.getElementById("banner-div")

function groupLandingH1(roomName, roomNameClean, groupType){

    if(groupLandingTitle != null){

        if(groupType === "Group"){
            groupLandingTitle.innerText = roomName
        } else {
            groupLandingTitle.innerText = roomNameClean
        };
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

            if(typeGroup != "Group"){

            creatorDiv.appendChild(creatorName)
            creatorDiv.appendChild(creatorProfilePicture)

                };
            });
        });
    };
};

function becomeMemberOfGroup(buttonLanding,  groupLandingPageOuterDiv,){
    if(buttonLanding != null){
    buttonLanding.addEventListener("click", () => {
           // Add auth to list of members

           auth.onAuthStateChanged(User =>{
            if(User){
              const userRef = db.collection("Vitaminders").doc(User.uid);
              userRef.get().then(function(doc) {
        
                    const auth = doc.data().Gebruikersnaam
                    const authClean = doc.data().GebruikersnaamClean

        db.collection("Chats").where("Room", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const type = doc1.data().Type
                const creator = doc1.data().Creater
                const roomClean = doc1.data().RoomClean

                // Store members in database
        
                db.collection("Chats").doc(doc1.id).update({
                    Members: firebase.firestore.FieldValue.arrayUnion(auth)
                }).then(() => {

                    if(type != "Group"){
                    // Send Email

                    db.collection("Vitaminders").where("Gebruikersnaam", "==", creator)
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {

                            const email = doc2.data().Email
                            const naam = doc2.data().GebruikersnaamClean

                            console.log(email)

                    db.collection("Mail").doc().set({
                        to: email,
                        cc: "info@vitaminds.nu",
                  message: {
                  subject: `Je coachgroep heeft een nieuw lid.`,
                  html: `Hallo ${naam}, </br></br>
                        ${authClean} is lid geworden van je coachgroep ${roomClean} op Vitaminds! <br><br>
                        
                        Vergeet niet om ${authClean} een maandelijkse factuur te sturen.<br><br>

                        Het emailadres van ${authClean} is ${email}. </br></br>
                  
                        Vriendelijke groet, </br></br>
                        Het Vitaminds Team </br></br>
                        <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                  Gebruikersnaam: naam,
                  Emailadres: email,
                  Type: "New coachgroep member"
                  }        
                  })  
                  .then(() => {

                    if(type === "Group" || type === "Practicegroup" ){
                    // Hide landing
                    groupLandingPageOuterDiv.style.display = "none"
                    } else if (type === "Coachgroup" || type === "GroupForCoaches"){
                        window.open(`../coachgroup-agreement.html`, "_self");
                    }
                            });
                });
            });
        };
                })
              
                        });
                    });
                });
            } else {

                const buttonDiv = document.getElementById("button-div-landing")

                const notice = document.createElement("p")
                notice.setAttribute("class", "notice-group-visitor")

            notice.innerHTML = "Maak een gratis <u>Digimind</u> aan om lid te worden van een groep"
            notice.addEventListener("click", () => {
                window.open("../Register.html", "_self")
            })

            buttonDiv.appendChild(notice)
            buttonDiv.removeChild(buttonLanding)

                };
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
                    groupLandingPageOuterDiv.style.display = "none"
                };
            });
        };
    });
}; 

function groupDescriptionLanding(roomName, groupDescription){

    db.collection("Levensvragen").where("Levensvraag", "==", roomName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const description = doc.data().Summary

            groupDescription.innerHTML = description

        });
    });
};

function groupFactsLanding(memberCount, messageCount, montlyFee, maximumMembersCount, groupType){

    const numberOfMembersLi = document.createElement("li")
    const maximumMembers = document.createElement("li")
    const numberOfMessagesLi = document.createElement("li")
    const costsPerMonth = document.createElement("li")

    numberOfMembersLi.innerText = `Aantal leden: ${memberCount.length}`
    numberOfMessagesLi.innerText = `Aantal berichten: ${messageCount}`

    if(groupType != "Group"){
        costsPerMonth.innerText = `Kosten per maand: ${montlyFee} euro`
        maximumMembers.innerText = `Maximum aantal leden: ${maximumMembersCount}`
        groupFactsUl.appendChild(maximumMembers)
        groupFactsUl.appendChild(costsPerMonth)
    }


    if(groupFactsUl != null){

    groupFactsUl.appendChild(numberOfMembersLi)
    groupFactsUl.appendChild(numberOfMessagesLi)
    };
};

function groupLandingBanner(imagePhoto){

    const bannerImg = document.createElement("img")

    bannerImg.src = imagePhoto

    bannerDiv.appendChild(bannerImg)
}

function noticeVisitor(buttonDiv, button){
    const notice = document.createElement("p")
        notice.setAttribute("class", "notice-group-visitor")

    notice.innerText = "Maak een Digimind aan om deel te nemen in een groep"
    notice.addEventListener("click", () => {
        window.open("Register.html", "_self")
    })

    buttonDiv.appendChild(notice)
    buttonDiv.removeChild(button)
}; 

function openGroup(roomName, buttonName){
    buttonName.innerHTML = `<a href="../group/${roomName}.html">Meer informatie</a>`

};

function hideLandingModal(typeGroup){
    const hideIcon = document.getElementById("hide-landing-modal")

    if (typeGroup === "GroupForCoaches"){

        hideIcon.href = "../groups-for-coaches.html"

    } else {

    hideIcon.href = "../groups.html"
    };
}

!function fillLandingWithGroupData(){
    db.collection("Chats").where("Room", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const members = doc1.data().Members
            const messages = doc1.data().Messages
            const roomClean = doc1.data().RoomClean
            const type1 = doc1.data().Type
            const room1 = doc1.data().Room
            const creator = doc1.data().Creater
            const bannerImage = doc1.data().CoverPhoto
            const price = doc1.data().Costs
            const maxMembers = doc1.data().NumberParticipants

            groupLandingH1(room1, roomClean, type1)

            groupLandingCreatorInformation(creator, type1)

            groupFactsLanding(members, messages, price, maxMembers, type1)
    
            hideLandingIfAuthIsMember(members, groupLandingPageOuterDiv)
    
            groupDescriptionLanding(room1, groupDescription)

            hideLandingModal(type1)

            if(type1 != "Group"){

            groupLandingBanner(bannerImage)
            } else {
                groupLandingBanner("/images/avontuur2-250.jpg")
            }
    
            becomeMemberOfGroup(buttonGroupLanding,  groupLandingPageOuterDiv)

        });
    });
}();

    // Theme groups overview

    const DOMthemeView = document.getElementById("themegroups")

    db.collection("Chats")
    .where("Type", "==", "Group")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const type = doc.data().Type
            const room = doc.data().Room
            const members = doc.data().Members

            const outerSection = document.createElement("section")
            outerSection.setAttribute("class", "theme-groups-section")
        const headerDiv = document.createElement("div")
            headerDiv.setAttribute("class", "theme-groups-header")
        const headerImg = document.createElement("img")
            headerImg.setAttribute("class", "header-image-groups")
        const titleDiv = document.createElement("div")
            titleDiv.setAttribute("class", "title-div-themegroups")
        const titleH2 = document.createElement("h2")
            titleH2.setAttribute("class", "titelTekst")
        const subTitle = document.createElement("h5")
        const buttonDiv = document.createElement("div")
            buttonDiv.setAttribute("id", "button-div-theme-group")
        const button = document.createElement("button")
            button.setAttribute("class", "button-algemeen-card")
            button.setAttribute("id", "button-theme-group")
        const leaveGroup = document.createElement("p")
            leaveGroup.setAttribute("class", "leave-group-button")
        
    db.collection("Levensvragen").where("Levensvraag", "==", room).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const title = doc1.data().Levensvraag
            const headerImageSmall = doc1.data().HeaderImageSmall

        titleH2.innerHTML = title
        headerImg.src = headerImageSmall
        leaveGroup.innerText = "Groep verlaten"

        hideLeaveGroupButtonIfAuthIsNotMember(members, leaveGroup)

        openGroup(room, button)

        auth.onAuthStateChanged(User =>{
            if(User){
              const userRef = db.collection("Vitaminders").doc(User.uid);
              userRef.get().then(function(doc) {
        
                    const auth = doc.data().Gebruikersnaam

        db.collection("Chats").where("Room", "==", title).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const members = doc1.data().Members

                // Display number of members in the title

                const numberOfMembers = members.length

                if(numberOfMembers === 1){
                    subTitle.innerText = `${numberOfMembers} mens praat over`
                } else {
                    subTitle.innerText = `${numberOfMembers} mensen praten over`
                };

                //Already a member of the group
                alreadyMember(members, button)

                 //Leave group
                leaveGroup.addEventListener("click", () => {

                leaveTheGroup(title)

                });

            if(members.includes(auth)){
                buttonDiv.appendChild(leaveGroup)
                };

                        });
                    });
                });
            };
        });

        if(DOMthemeView != null){

        DOMthemeView.appendChild(outerSection)
        outerSection.appendChild(headerDiv)
        headerDiv.appendChild(headerImg)
        outerSection.appendChild(titleDiv)
        titleDiv.appendChild(subTitle)
        titleDiv.appendChild(titleH2)
        outerSection.appendChild(buttonDiv)
        buttonDiv.appendChild(button)

        };

            });
        });
    });
});

// Load coachgroups from database to overview

    const agreementButton = document.getElementById("visitCoachgroup")

function coachgroupAgreementTitle(welkomMessage){
    const title = document.getElementById("coachgroup-member-agreement-title")
    const goalAndAmountExercises = document.getElementById("goal-coachgroup")
    
    if (title != null){
    
    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().GebruikersnaamClean
    
    title.innerText = `Welkom bij mijn coachgroep, ${auth}`
    goalAndAmountExercises.innerText = welkomMessage
    
                    });
                };
            });
        };
    };
    
    // Coachgroup payment agreement questions
    function coachGroupAgreementQuestions(imageSource, coachNameClean, coachName){
    
        const DOM = document.getElementById("questions-coachgroup-agreement")
    
        if (DOM != null){
    
        const imgAndNameDiv = document.createElement("div")
            imgAndNameDiv.setAttribute("id", "img-name-div-coachgroup-agreement-questions")
        const img = document.createElement("img")
        const name = document.createElement("p")
    
        img.src = imageSource
        name.innerText = coachNameClean
    
        DOM.appendChild(imgAndNameDiv)
        imgAndNameDiv.appendChild(img)
        imgAndNameDiv.appendChild(name)
    
        imgAndNameDiv.addEventListener("click", () => {
            window.open("../Vitaminders/" + coachName + ".html", "_self");
            });
        };
    };

    function openCoachGroupAfterAgreement(titleRoom){
        const goToCoachgroup = document.getElementById("visitCoachgroup")

        if(goToCoachgroup != null){

        goToCoachgroup.innerHTML = `<a href="../group/${titleRoom}.html">Bekijk coachgroep</a>`
        };
    }

db.collection("Chats").where("Type", "==", "Coachgroup").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Room
        const titleClean = doc.data().RoomClean
        const auth = doc.data().Creater
        const description = doc.data().Description
        const numberParticipants = doc.data().NumberParticipants
        const startNumber = doc.data().StartNumber
        const coverPhoto = doc.data().CoverPhoto
        const costs = doc.data().Costs
        const members = doc.data().Members
        const data = doc.data().Data
        const sessionLenght =doc.data().SessionLenght
        const type = doc.data().Type

        const DOM = document.getElementById("coachgroups")

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
        const startNumberP = document.createElement("p")
        const dataP = document.createElement("p")
        const sessionLenghtP = document.createElement("p")
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
            // descriptionP.innerText = description

            openGroup(title, groupButton)

            hideLeaveGroupButtonIfAuthIsNotMember(members, leaveGroup)

            // hideLandingIfAuthIsMember(members)

            if(groupDescription != null){

                groupDescription.innerHTML = description
            };

            openCoachGroupAfterAgreement(title)

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
            })

                });
            });

            numberParticipantsP.innerHTML = `<b>Max. leden:</b> ${numberParticipants}`
            memberCount.innerHTML = `<b>Huidig aantal leden:</b> ${members.length}`
            costsP.innerHTML = `<b>Kosten per sessie:</b> ${costs} euro`
            startNumberP.innerHTML = `<b>Coachgroep begint bij:</b> ${startNumber} leden`
            dataP.innerHTML = `<b>Moment waarop groep bijeenkomt:</b> Iedere ${data}`
            sessionLenghtP.innerHTML = `<b>De bijeenkomsten duren:</b> ${sessionLenght} minuten`
            leaveGroup.innerHTML = "Groep verlaten"

            // coachgroup agreement

            coachgroupAgreementTitle(`${description} Ik stuur je iedere week een nieuwe opdracht.`)

            db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const profilePic = doc1.data().Profielfoto
                    const coachNameClean = doc1.data().GebruikersnaamClean

                    coachGroupAgreementQuestions(profilePic, coachNameClean, auth)

                });
            });   

            becomeMemberOfGroup(buttonGroupLanding, title, type)

            DOM.appendChild(groupInnerDiv)
            groupInnerDiv.appendChild(groupHeader)
            groupHeader.appendChild(groupCoverPhoto)
            groupInnerDiv.appendChild(authDiv)
            groupInnerDiv.appendChild(bottomDiv)
            bottomDiv.appendChild(groupTitleH2)
            bottomDiv.appendChild(descriptionP)
            groupInnerDiv.appendChild(metaDiv)
            metaDiv.appendChild(dataP)
            metaDiv.appendChild(sessionLenghtP)
            metaDiv.appendChild(numberParticipantsP)
            metaDiv.appendChild(startNumberP)
            metaDiv.appendChild(memberCount)
            metaDiv.appendChild(costsP)
            groupInnerDiv.appendChild(buttonDiv)
            buttonDiv.appendChild(groupButton)

            if(members.includes(auth)){
                buttonDiv.appendChild(leaveGroup)
                };

              // Group is full message
              groupIsFull(members.length, groupButton, numberParticipants)

              //Already a member of the group
            alreadyMember(members, groupButton)

             //Leave group
             leaveGroup.addEventListener("click", () => {

                leaveTheGroup(title)

            });

    });
});


// GroupsForCoaches
db.collection("Chats").where("Type", "==", "GroupForCoaches").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Room
        const titleClean = doc.data().RoomClean
        const auth = doc.data().Creater
        const description = doc.data().Description
        const numberParticipants = doc.data().NumberParticipants
        const startNumber = doc.data().StartNumber
        const coverPhoto = doc.data().CoverPhoto
        const costs = doc.data().Costs
        const members = doc.data().Members
        const data = doc.data().Data
        const sessionLenght =doc.data().SessionLenght
        const type = doc.data().Type

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
        const startNumberP = document.createElement("p")
        const dataP = document.createElement("p")
        const sessionLenghtP = document.createElement("p")
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
            // descriptionP.innerText = description

            openGroup(title, groupButton)

            hideLeaveGroupButtonIfAuthIsNotMember(members, leaveGroup)

            // hideLandingIfAuthIsMember(members)

            if(groupDescription != null){

                groupDescription.innerHTML = description
            };

            openCoachGroupAfterAgreement(title)

            // db.collection("Vitaminders").where("Gebruikersnaam", "==", auth)
            // .get().then(querySnapshot => {
            //     querySnapshot.forEach(doc1 => {

            //         const nameClean = doc1.data().GebruikersnaamClean
            //         const profilePic = doc1.data().Profielfoto
            
            // authImg.src = profilePic
            // authName.innerText = nameClean

            // authDiv.appendChild(authImg)
            // authDiv.appendChild(authName)

            // authDiv.addEventListener("click", () => {
            //     window.open("../Vitaminders/" + auth + ".html", "_self");
            // })

            //     });
            // });

            numberParticipantsP.innerHTML = `<b>Max. leden:</b> ${numberParticipants}`
            memberCount.innerHTML = `<b>Huidig aantal leden:</b> ${members.length}`
            costsP.innerHTML = `<b>Kosten per maand:</b> ${costs} euro <br> Gratis voor Vitaminds coaches`
            startNumberP.innerHTML = `<b>Coachgroep begint bij:</b> ${startNumber} leden`
            leaveGroup.innerHTML = "Groep verlaten"

            // coachgroup agreement

            coachgroupAgreementTitle(`${description} Ik stuur je iedere week een nieuwe opdracht.`)

            db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const profilePic = doc1.data().Profielfoto
                    const coachNameClean = doc1.data().GebruikersnaamClean

                    coachGroupAgreementQuestions(profilePic, coachNameClean, auth)

                });
            });   

            becomeMemberOfGroup(buttonGroupLanding, title, type)

            DOM.appendChild(groupInnerDiv)
            groupInnerDiv.appendChild(groupHeader)
            groupHeader.appendChild(groupCoverPhoto)
            groupInnerDiv.appendChild(authDiv)
            groupInnerDiv.appendChild(bottomDiv)
            bottomDiv.appendChild(groupTitleH2)
            bottomDiv.appendChild(descriptionP)
            groupInnerDiv.appendChild(metaDiv)
            metaDiv.appendChild(numberParticipantsP)
            metaDiv.appendChild(startNumberP)
            metaDiv.appendChild(memberCount)
            metaDiv.appendChild(costsP)
            groupInnerDiv.appendChild(buttonDiv)
            buttonDiv.appendChild(groupButton)

            if(members.includes(auth)){
                buttonDiv.appendChild(leaveGroup)
                };

              // Group is full message
              groupIsFull(members.length, groupButton, numberParticipants)

              //Already a member of the group
            alreadyMember(members, groupButton)

             //Leave group
             leaveGroup.addEventListener("click", () => {

                leaveTheGroup(title)

            });
    });
});

// GroupsForCooperation
db.collection("Chats").where("Type", "==", "CoachCooperate").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Room
        const description = doc.data().Description
        const numberParticipants = doc.data().NumberParticipants
        const coverPhoto = doc.data().CoverPhoto
        const members = doc.data().Members
        const type = doc.data().Type

        const DOM = document.getElementById("groups-for-cooperation")

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

            groupCoverPhoto.src = coverPhoto
            groupTitleH2.innerText = title
            descriptionP.innerText = description

            groupButton.innerText = "Bekijk"

            groupButton.addEventListener("click", () => {

                window.open("../Group/" + [title], "_self");
            })

            DOM.appendChild(groupInnerDiv)
            groupInnerDiv.appendChild(groupHeader)
            groupHeader.appendChild(groupCoverPhoto)
            groupInnerDiv.appendChild(authDiv)
            groupInnerDiv.appendChild(bottomDiv)
            bottomDiv.appendChild(groupTitleH2)
            bottomDiv.appendChild(descriptionP)
            groupInnerDiv.appendChild(metaDiv)
            metaDiv.appendChild(memberCount)
            groupInnerDiv.appendChild(buttonDiv)
            buttonDiv.appendChild(groupButton)

    });
});



function hideCoachgroupBuilderForNoneCoach(){
    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam

            db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const userType = doc.data().Usertype

                    const coachGroupBuiderDiv = document.getElementById("coachgroup-builder-div")

                    if(userType === "Coach" ){
                        coachGroupBuiderDiv.style.display = "block"
                    }

                    });
                });
            });
        };
    });
}; 
hideCoachgroupBuilderForNoneCoach()

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

const NewChatsCountArray = []

// New member
function saveNewMemberToGroup(a){

    const groupButton = document.getElementById("group-button")
    const groupButtonDiv = document.getElementById("group-button-div")
    const leaveGroupButton = document.getElementById("leave-group-button")

    groupButton.innerText = "Laden..."

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam

    db.collection("Chats").where("Room", "==", a ).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const type = doc1.data().Type
            const groupName = doc1.data().RoomClean
            const coach = doc1.data().Creater

           db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
               querySnapshot.forEach(doc => {
              
                      const coachNameClean = doc.data().GebruikersnaamClean;

            groupButton.setAttribute("data-groupname", groupName)
            groupButton.setAttribute("data-coachname", coachNameClean)

                });
            });

            db.collection("Chats").doc(doc1.id).update({
                Members: firebase.firestore.FieldValue.arrayUnion(auth)
                        }).then(() => {
                            window.open("../Group/" + a + ".html", "_self") 
                        });
                    });
                });
            });
        } else {
           noticeVisitor(groupButtonDiv, groupButton)
        }
    });
};

function memberPracticeGroups(elem){

    const roomTitle = elem.dataset.room

   saveNewMemberToGroup(roomTitle)
};


 // Group is full message

 function groupIsFull(a,b,c){

    if (a === c){
        b.innerText = "Groep is vol"
        b.setAttribute("onclick", "null()")
    }; 
 };

 // Already a member notice

 function alreadyMember(a,b){

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam
     if(a.includes(auth)){
            b.innerText = "Je bent lid"
            b.setAttribute("onclick", "null()")

                };
            });
        };
    });
;}

// Leave group
function leaveTheGroup(roomTitle){
    const button = document.getElementById("group-button")
    const buttonThemeGroup = document.getElementById("button-theme-group")

    button.innerText = "Groep is verlaten"
    buttonThemeGroup.innerText = "Groep is verlaten"

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

            const auth = doc.data().Gebruikersnaam

            db.collection("Chats").where("Room", "==", roomTitle ).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
        
                db.collection("Chats").doc(doc.id).update({
                    Members: firebase.firestore.FieldValue.arrayRemove(auth)
                            });
                        });
                    });
            });
        };
    });
};



// Themegroup individual page

    // Title

    const DOMtitle = document.getElementById("group-title")

    if(DOMtitle != null){

        db.collection("Chats").where("Room", "==", titel).get().then(querySnapshot => {
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
        db.collection("Chats").where("Room", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const goal = doc.data().Goal

                auth.onAuthStateChanged(User =>{
                    if(User){
                      const userRef = db.collection("Vitaminders").doc(User.uid);
                      userRef.get().then(function(doc) {
            
                        const auth = doc.data().Gebruikersnaam

                        console.log(goal)
                
                        db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", auth).where("Goal", "==", goal)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc1 => {
            
                                const levensvraagClean = doc1.data().LevensvraagClean
            
                                const option = document.createElement("option")
            
                                option.innerText = levensvraagClean
            
                                selectGoals.appendChild(option)
                            });
                        });
                      });
                    };
                });
    
            });
        });
    
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
            Type: "Group-inzicht",
            Source: titel,
            Levensvraag: levensvraagID,
            Status: "Approved"
                    })
       
            levensvraagRef = db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraagID).where("Gebruikersnaam", "==", auth)
            levensvraagRef.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc4 => {
    
                    console.log(input)
                    
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

    const DOMchatScreenChat = document.getElementById("chat-screen")

    function saveMessage(){
        const message = document.getElementById("chat-input").value 

        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {
        
                    const auth = doc.data().Gebruikersnaam

        const roomName = titel

    db.collection("Chats").where("Room", "==", roomName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const members = doc.data().Members

        db.collection("Chats").doc(doc.id).collection("Messages").doc().set({
            Auth: auth,
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Message: message,
            Room: roomName,
            Members: members,
            Read: [],
            Status: "New"
            }).then(() => {
                db.collection("Chats").doc(doc.id).update({
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
    const send = document.getElementById("send-icon-group")

    if(send != null){

    send.addEventListener("click", saveMessage, false)
    send.addEventListener("submit", saveMessage, false)

    };

    // Get chat from database in realtime

        // Variables

        const senderNameArray = []

        //Functions
        function emptyScreenByOnsnapshot(){
            const chatDivsUser = document.getElementsByClassName("auth-message-p")
        
            const chatDivsArrayUser = Array.from(chatDivsUser)
        
            chatDivsArrayUser.forEach(chatUser => {
                DOMchatScreenChat.removeChild(chatUser)
            });
        };

        function messageOptions(message, chatMessage, chatRoom, authChatter){
            const options = document.createElement("p")
               options.setAttribute("class", "message-options")
            options.innerText = "..."
       
            const sendAsMail = document.createElement("p")
               sendAsMail.setAttribute("class", "send-chat-as-mail")
               sendAsMail.setAttribute("data-message", chatMessage)
               sendAsMail.setAttribute("data-room", chatRoom)
               sendAsMail.setAttribute("data-auth", authChatter)
               sendAsMail.setAttribute("onclick", "sendChatAsMail(this)")
            sendAsMail.innerText = "Verstuur bericht als email"
       
            message.appendChild(options)
            options.appendChild(sendAsMail)
       
            options.addEventListener("click", () => {
                   sendAsMail.style.display = "block" 
            });
       };
       
       function sendChatAsMail(elem){
           const message = elem.dataset.message
           const room = elem.dataset.room
           const coach = elem.dataset.auth
       
           console.log(coach)
       
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
                   const titelClean = doc.data().RoomClean
                   const titel = doc.data().Room
       
                   members.forEach(member => {
       
                       console.log(type)
       
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
                                       
                                       Ga naar jullie <a href="www.vitaminds.nu/Chats/${naam}.html">chat</a> om op het bericht te reageren.<br><br>
                                       P.s. Om privacyredenen kun je chat alleen bekijken als je bent ingelogd in Vitaminds.<br><br>
                               
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
                   } else if (type === "Group"){
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
                           subject: `Je hebt een nieuw chatbericht ontvangen van ${SenderNameClean} in je Groep ${titel}`,
                           html: `Hallo ${naam}, </br></br>
                                   ${SenderNameClean} heeft je een bericht gestuurd in de Groep ${titel} : <br><br>
       
                                   ${message}<br><br>
                                   
                                   Ga naar je <a href="www.vitaminds.nu/Group/${titel}.html">Groep</a> om op het bericht te reageren.<br><br>
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
                           subject: `Je hebt een nieuw coachbericht ontvangen van ${SenderNameClean} in je Coachgroep ${titelClean}`,
                           html: `Hallo ${naam}, </br></br>
                                   ${SenderNameClean} heeft je een bericht gestuurd in de Coachgroep ${titelClean} : <br><br>
       
                                   ${message}<br><br>
                                   
                                   Ga naar je <a href="www.vitaminds.nu/Group/${titel}.html">Coachgroep</a> om op het bericht te reageren.<br><br>
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

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

                const auth = doc.data().Gebruikersnaam

                const roomName = titel

                db.collection("Chats")
                .where("Room", "==", roomName)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc3 => {

                        const admin = doc3.data().Admin

                        console.log(admin)

                db.collectionGroup("Messages")
                .where("Room", "==", roomName)
                .orderBy("Timestamp", "asc")
                .onSnapshot(querySnapshot => {

                emptyScreenByOnsnapshot()
                    
                    querySnapshot.forEach(doc2 => {

                        const authMessage = doc2.data().Message
                        const sender = doc2.data().Auth
                        const members = doc2.data().Members

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
    
                            messageP.innerText = authMessage
    
                            messageP.style.alignSelf = "flex-end"
                            senderName.style.color = colour
                            senderName.style.fontWeight = "bold"
                            senderName.style.alignSelf = "flex-end"

                            console.log(admin)

                            if(admin.includes(sender)){

                            messageOptions(messageP, authMessage, roomName, messageNameClean)
                            };
    
                        } else {
    
                            senderName.innerText = messageNameClean
    
                            messageP.innerText = authMessage
    
                            messageP.style.alignSelf = "flex-start"
                            senderName.style.fontWeight = "bold"
                            senderName.style.alignSelf = "flex-start"
                            senderName.style.color = colour
                            
                            };
    
                            messageP.appendChild(senderName)

                        });
                    });

                    DOMchatScreen.appendChild(messageP)
                });
            });
        });
    });
        });
    };
});



    // Get chats and groups of auth in overview

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
                            photoImg.src = "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
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


// Group builder

function startCoachgroupBuilder(){
    window.open("coachgroup-builder.html", "_self");
}

function startPracticegroupBuilder(){
    window.open("practicegroup-builder.html", "_self");
}

// Group goal

const groupGoalSelect = document.getElementById("create-practicegroup-goal-select")

if(groupGoalSelect != null){

db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc=> {
            const doel = doc.data().Levensvraag

            const option = document.createElement("option")

            option.innerHTML = doel

            groupGoalSelect.appendChild(option)
        });
    });
};

const coachgroupGoalSelect = document.getElementById("create-coachgroup-goal-select")

if(coachgroupGoalSelect != null){

db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc=> {
            const doel = doc.data().Levensvraag

            const option = document.createElement("option")

            option.innerHTML = doel

            coachgroupGoalSelect.appendChild(option)
        });
    });
};

// Title

function groupTitle(a,b){

const coachGroupTitle = document.getElementById(a)

if (coachGroupTitle != null){

const authRef = auth.onAuthStateChanged(User =>{
    if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {

        const auth = doc.data().GebruikersnaamClean
        const usertype = doc.data().Usertype

        coachGroupTitle.innerText = `Wat leuk dat je een ${b} gaat starten, ${auth}`

                });
            };
        });
    };
}   groupTitle("coachgroup-builder-title", "coachgroep")
    groupTitle("practicegroup-builder-title", "oefengroep")

    // Save to database
    const uploadCoverPhotoButton = document.getElementById("upload-cover-photo-coachgroup")

    if(uploadCoverPhotoButton != null){

    uploadCoverPhotoButton.addEventListener("click", () => {
        const selectedFile = document.getElementById('foto-upload').files[0];
        const progressBar = document.getElementById("progress-bar")

        uploadCoverPhotoButton.innerText = "Uploaden..."
        
        const storageRef = firebase.storage().ref("/GroupCoverPhotos/" + selectedFile.name);
        
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
              uploadCoverPhotoButton.innerText = "Geupload"
              window.coverPhoto = downloadURL

                });
            });
        });
    });
};

    const uploadCoverPhotoButtonPracticegroup = document.getElementById("upload-cover-photo-practicegroup")

    if (uploadCoverPhotoButtonPracticegroup != null){
    uploadCoverPhotoButtonPracticegroup.addEventListener("click", () => {
        const selectedFile = document.getElementById('foto-upload').files[0];
        const progressBar = document.getElementById("progress-bar")

        uploadCoverPhotoButtonPracticegroup.innerText = "Uploaden..."
        
        const storageRef = firebase.storage().ref("/GroupCoverPhotos/" + selectedFile.name);
        
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
              uploadCoverPhotoButtonPracticegroup.innerText = "Geupload"
              window.coverPhoto = downloadURL

                });
            });
        });
    });
};

function saveCoachgroup(){

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam
    
    const title = document.getElementById("coachgroup-title").value
    const description = document.getElementById("coachgroup-description").value
    const numberParticipants = document.getElementById("coachgroup-number-participants").value
    const costs = document.getElementById("coachgroup-costs").value
    const startNumber = document.getElementById("coachgroup-start-number").value
    const data = document.getElementById("coachgroup-data-gatherings").value
    const sessionLenght = document.getElementById("coachgroup-lenght-sessions").value

    // Group goal
    const groupGoalSelect = document.getElementById("create-coachgroup-goal-select")

    const select = groupGoalSelect.options
    const option = select[select.selectedIndex].innerHTML

   db.collection("Chats").doc().set({
        Eigenaar: "Vitaminds",
        Room: idClean + title,
        RoomClean: title,
        Creater: auth,
        Description: description,
        NumberParticipants: numberParticipants,
        Costs: costs,
        StartNumber: startNumber,
        Members: firebase.firestore.FieldValue.arrayUnion(auth),
        Goal: option,
        Data: data,
        Online: [],
        SessionLenght: sessionLenght,
        Messages: 0,
        Type: "Coachgroup", 
        CoverPhoto: coverPhoto
                }).then(() => {
                        const notice = document.createElement("p")

                        notice.innerText = "Je groep is aangemaakt!"

                        const buttonCoachGroup = document.getElementById("button-coachgroup")

                        buttonCoachGroup.appendChild(notice)

                        notice.style.cursor = "pointer"

                        notice.addEventListener("click", () => {
                            window.open(`../Group/${idClean + title}.html`, "_self");
                        });
                });
            });
        };
    });
};


// F
