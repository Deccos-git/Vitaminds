// GroupsForCoaches
// db.collection("Chats").where("Type", "==", "GroupForCoaches").get().then(querySnapshot => {
//     querySnapshot.forEach(doc => {

//         const title = doc.data().Room
//         const titleClean = doc.data().RoomClean
//         const auth = doc.data().Creater
//         const description = doc.data().Description
//         const numberParticipants = doc.data().NumberParticipants
//         const startNumber = doc.data().StartNumber
//         const coverPhoto = doc.data().CoverPhoto
//         const costs = doc.data().Costs
//         const members = doc.data().Members
//         const type = doc.data().Type


//         const DOM = document.getElementById("groups-for-coaches")

//         console.log(DOM)

//         const groupInnerDiv = document.createElement("div")
//             groupInnerDiv.setAttribute("class", "theme-groups-section")
//         const groupHeader = document.createElement("div")
//             groupHeader.setAttribute("class", "theme-groups-header")
//         const groupCoverPhoto = document.createElement("img")
//             groupCoverPhoto.setAttribute("class", "header-image-groups")
//         const authDiv = document.createElement("div")
//             authDiv.setAttribute("class", "group-auth-div")
//         const authImg = document.createElement("img")
//             authImg.setAttribute("class", "group-auth-img")
//         const authName = document.createElement("p")
//         const metaDiv = document.createElement("div")
//             metaDiv.setAttribute("class", "group-meta-div")
//         const numberParticipantsP = document.createElement("p")
//         const memberCount = document.createElement("p")
//         const startNumberP = document.createElement("p")
//         const dataP = document.createElement("p")
//         const sessionLenghtP = document.createElement("p")
//         const costsP = document.createElement("p")
//         const bottomDiv = document.createElement("div")
//             bottomDiv.setAttribute("class", "bottom-div")
//         const groupTitleH2 = document.createElement("h2")
//             groupTitleH2.setAttribute("class", "titelTekst")
//         const descriptionP = document.createElement("p")
//         const buttonDiv = document.createElement("div")
//             buttonDiv.setAttribute("id", "group-button-div")
//         const groupButton = document.createElement("button")
//             groupButton.setAttribute("class", "button-algemeen-card")
//             groupButton.setAttribute("id", "group-button")
//             groupButton.setAttribute("data-room", title)
//         const leaveGroup = document.createElement("p")
//             leaveGroup.setAttribute("class", "leave-group-button")

//             groupCoverPhoto.src = coverPhoto
//             groupTitleH2.innerText = titleClean

//             openGroup(title, groupButton)

//             hideLeaveGroupButtonIfAuthIsNotMember(members, leaveGroup)

//             // hideLandingIfAuthIsMember(members)

//             openCoachGroupAfterAgreement(title)

//             // db.collection("Vitaminders").where("Gebruikersnaam", "==", auth)
//             // .get().then(querySnapshot => {
//             //     querySnapshot.forEach(doc1 => {

//             //         const nameClean = doc1.data().GebruikersnaamClean
//             //         const profilePic = doc1.data().Profielfoto
            
//             // authImg.src = profilePic
//             // authName.innerText = nameClean

//             // authDiv.appendChild(authImg)
//             // authDiv.appendChild(authName)

//             // authDiv.addEventListener("click", () => {
//             //     window.open("../Vitaminders/" + auth + ".html", "_self");
//             // })

//             //     });
//             // });

//             numberParticipantsP.innerHTML = `<b>Max. leden:</b> ${numberParticipants}`
//             memberCount.innerHTML = `<b>Huidig aantal leden:</b> ${members.length}`
//             costsP.innerHTML = `<b>Kosten per maand:</b> ${costs} euro <br> Gratis voor Vitaminds coaches`
//             startNumberP.innerHTML = `<b>Coachgroep begint bij:</b> ${startNumber} leden`
//             leaveGroup.innerHTML = "Aanmelding annuleren"

//             // coachgroup agreement

//             coachgroupAgreementTitle()

//             db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
//                 querySnapshot.forEach(doc1 => {

//                     const profilePic = doc1.data().Profielfoto
//                     const coachNameClean = doc1.data().GebruikersnaamClean

//                     // coachGroupAgreementQuestions(profilePic, coachNameClean, auth)

//                 });
//             });   

//             becomeMemberOfGroup(buttonGroupLanding, title, type)

//             DOM.appendChild(groupInnerDiv)
//             groupInnerDiv.appendChild(groupHeader)
//             groupHeader.appendChild(groupCoverPhoto)
//             groupInnerDiv.appendChild(authDiv)
//             groupInnerDiv.appendChild(bottomDiv)
//             bottomDiv.appendChild(groupTitleH2)
//             bottomDiv.appendChild(descriptionP)
//             groupInnerDiv.appendChild(metaDiv)
//             metaDiv.appendChild(numberParticipantsP)
//             metaDiv.appendChild(startNumberP)
//             metaDiv.appendChild(memberCount)
//             metaDiv.appendChild(costsP)
//             groupInnerDiv.appendChild(buttonDiv)
//             buttonDiv.appendChild(groupButton)

//             if(members.includes(auth)){
//                 buttonDiv.appendChild(leaveGroup)
//                 };

//               // Group is full message
//               groupIsFull(members.length, groupButton, numberParticipants)

//               //Already a member of the group
//             alreadyMember(members, groupButton)

//              //Leave group
//              leaveGroup.addEventListener("click", () => {

//                 leaveTheGroup(title)

//             });
//     });
// });

// // GroupsForCooperation
// db.collection("Chats").where("Type", "==", "CoachCooperate").get().then(querySnapshot => {
//     querySnapshot.forEach(doc => {

//         const title = doc.data().Room
//         const description = doc.data().Description
//         const numberParticipants = doc.data().NumberParticipants
//         const coverPhoto = doc.data().CoverPhoto
//         const members = doc.data().Members
//         const type = doc.data().Type

//         const DOM = document.getElementById("groups-for-cooperation")

//         const groupInnerDiv = document.createElement("div")
//             groupInnerDiv.setAttribute("class", "theme-groups-section")
//         const groupHeader = document.createElement("div")
//             groupHeader.setAttribute("class", "theme-groups-header")
//         const groupCoverPhoto = document.createElement("img")
//             groupCoverPhoto.setAttribute("class", "header-image-groups")
//         const authDiv = document.createElement("div")
//             authDiv.setAttribute("class", "group-auth-div")
//         const authImg = document.createElement("img")
//             authImg.setAttribute("class", "group-auth-img")
//         const authName = document.createElement("p")
//         const metaDiv = document.createElement("div")
//             metaDiv.setAttribute("class", "group-meta-div")
//         const numberParticipantsP = document.createElement("p")
//         const memberCount = document.createElement("p")
//         const bottomDiv = document.createElement("div")
//             bottomDiv.setAttribute("class", "bottom-div")
//         const groupTitleH2 = document.createElement("h2")
//             groupTitleH2.setAttribute("class", "titelTekst")
//         const descriptionP = document.createElement("p")
//         const buttonDiv = document.createElement("div")
//             buttonDiv.setAttribute("id", "group-button-div")
//         const groupButton = document.createElement("button")
//             groupButton.setAttribute("class", "button-algemeen-card")
//             groupButton.setAttribute("id", "group-button")
//             groupButton.setAttribute("data-room", title)

//             groupCoverPhoto.src = coverPhoto
//             groupTitleH2.innerText = title
//             descriptionP.innerText = description

//             groupButton.innerText = "Bekijk"

//             groupButton.addEventListener("click", () => {

//                 window.open("../Group/" + [title], "_self");
//             })

//             DOM.appendChild(groupInnerDiv)
//             groupInnerDiv.appendChild(groupHeader)
//             groupHeader.appendChild(groupCoverPhoto)
//             groupInnerDiv.appendChild(authDiv)
//             groupInnerDiv.appendChild(bottomDiv)
//             bottomDiv.appendChild(groupTitleH2)
//             bottomDiv.appendChild(descriptionP)
//             groupInnerDiv.appendChild(metaDiv)
//             metaDiv.appendChild(memberCount)
//             groupInnerDiv.appendChild(buttonDiv)
//             buttonDiv.appendChild(groupButton)

//     });
// });
