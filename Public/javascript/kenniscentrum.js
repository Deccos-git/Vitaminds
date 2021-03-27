 // Fetching title from url
 titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
 titel1 = titelhtml.replace('.html', '')
 titel2 = titel1.replace('%20',' '),
 titel3 = titel2.replace('%20',' ')
 titel4 = titel3.replace('%20',' ')
 titel5 = titel4.replace('%20',' ')
 titel6 = titel4.replace('%20',' ')
 titel7 = titel6.replace('%20',' ')
 titel8 = titel7.replace('%20',' ')
 titel9 = titel8.replace('%20',' ')
 titel10 = titel9.replace('%20',' ')
 titel11 = titel10.replace('%20',' ')
 titel12 = titel11.replace('%20',' ')
 titel13 = titel12.replace('%20',' ')
 titel14 = titel13.replace('%20',' ')
 titel15 = titel14.replace('%20',' ')
 titel16 = titel15.split("?fb")
 titel = titel16[0]
 
 console.log(titel)

!function hideCreateNewArticleIfAuthIsNotGijs(){

    const createNewarticle = document.getElementById("create-coach-article")

    auth.onAuthStateChanged(User =>{
        if (User){
            const docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){

                    const auth = doc.data().Gebruikersnaam

                    console.log(auth)

                    if(auth === "fbKlPnWobJh0ldPROWQRYGCezhv2Gijs van Beusekom"){
                        createNewarticle.style.display = "flex"
                    }
                });
            };
        });
}();

!function newArticleSubmitButton(){

    const saveButton = document.getElementById("save-coach-article-button")

    if(saveButton != null){

        saveButton.addEventListener("click", () => {

            const title = document.getElementById("title-input").value
            const newBody = tinyMCE.get('tiny-mce').getContent()
            const domainSelectDiv = document.getElementById("theme-select")
            const inputs = domainSelectDiv.querySelectorAll("input")
            const keywords = document.getElementById("keywords-article").value

            saveButton.innerText = "Opgeslagen"
            saveButton.setAttribute("onclick", "empty()")

            const inputsArray = Array.from(inputs)

            inputsArray.forEach(input => {

                if (input.checked) {
                    const selectedInput = input.value    

                    auth.onAuthStateChanged(User =>{
                        if (User){
                            const docRef = db.collection("Vitaminders").doc(User.uid);
                                docRef.get().then(function(doc){

                                    const auth = doc.data().Gebruikersnaam
                                    const authClean = doc.data().GebruikersnaamClean

                                db.collection("Kenniscentrum").doc().set({
                                    Author: auth,
                                    AuthorClean: authClean,
                                    Keywords: keywords,
                                    Title: title,
                                    Body: newBody,
                                    HeaderImage: "",
                                    HeaderImageSmall: "",
                                    Owner: "Vitaminds",
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Domain: selectedInput,
                                    Type: "Kenniscentrum"
                                });
                            });
                        };
                    });
                };
            });
        });
    };
}();

//Filter 

function addTimestamp(timestampP, timestamp){

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

};

function showAuthorOnPreview(coachName, photoP, userNameP, userDiv){

    db.collection("Vitaminders").where("Gebruikersnaam", "==", coachName)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const userClean = doc.data().GebruikersnaamClean
            const userPhoto = doc.data().Profielfoto

            photoP.src = userPhoto
                    
            userNameP.innerHTML = userClean

            userDiv.addEventListener("click", () => {
                window.open("../Vitaminders/" + [coachName] + ".html", "_self");
            });
        });
    });
};

function loadAllArticles(){

    DOMarticle = document.getElementById("kenniscentrum-artikel-outer-div")
    
    db.collection("Kenniscentrum")
    .where("Owner", "==", "Vitaminds")
    .orderBy("Timestamp", "desc")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
    
            const title = doc.data().Title
            const headerImage = doc.data().HeaderImage
            const timestamp = doc.data().Timestamp
            const author = doc.data().Author
        
            const outerSection = document.createElement("section")
                outerSection.setAttribute("class", "kenniscentrum-artikel-section")
                outerSection.setAttribute("data-title", title)
            const headerDiv = document.createElement("div")
                headerDiv.setAttribute("class", "kenniscentrum-artikel-header")
            const headerImg = document.createElement("img")
                headerImg.setAttribute("class", "header-image-article")
            const metaUserDiv = document.createElement("div")
                metaUserDiv.setAttribute("class", "meta-user-div")
            const metaUserPhoto = document.createElement("img")
            const metaUserName = document.createElement("p")
                metaUserName.setAttribute("id", "meta-user-name")
            const titleDiv = document.createElement("div")
                titleDiv.setAttribute("class", "title-div-card")
            const titleH2 = document.createElement("h2")
                titleH2.setAttribute("class", "titelTekst")
            const buttonDiv = document.createElement("button")
                buttonDiv.setAttribute("class", "button-algemeen-card")
                buttonDiv.setAttribute("onclick", "seeArticle(this)")
            const timestampP = document.createElement("p")
                timestampP.setAttribute("class", "timestamp-p")
    
            headerImg.src = headerImage
            titleH2.innerHTML = title
            buttonDiv.innerHTML = `<a href="../Kenniscentrum-coaching/${title}.html">Bekijk</a>`
    
            addTimestamp(timestampP, timestamp)
            showAuthorOnPreview(author, metaUserPhoto, metaUserName, metaUserDiv)
    
            if(DOMarticle == null){
                console.log("null")
            } else {
    
            DOMarticle.appendChild(outerSection)
            outerSection.appendChild(headerDiv)
            headerDiv.appendChild(headerImg)
            outerSection.appendChild(metaUserDiv)
            metaUserDiv.appendChild(metaUserPhoto)
            metaUserDiv.appendChild(metaUserName)
            outerSection.appendChild(titleDiv)
            titleDiv.appendChild(titleH2)
            titleDiv.appendChild(timestampP)
            outerSection.appendChild(buttonDiv)
            }
        })
    });
    
    };
    
    loadAllArticles()
    
    function getDomain(){
    
        const selectDomain = document.getElementById("kenniscentrum-filter-select")
        
            const option = selectDomain.options
            const selected = option[option.selectedIndex].innerHTML
        
        DOMarticle = document.getElementById("kenniscentrum-artikel-outer-div")
        
        DOMarticle.innerHTML = ""
        
        if(selected === "Alles"){
            loadAllArticles();
        };
    
        db.collection("Kenniscentrum")
        .where("Domain", "==", selected)
        .orderBy("Timestamp", "desc")
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
        
                const title = doc.data().Title
                const headerImage = doc.data().HeaderImage
                const timestamp = doc.data().Timestamp
                const author = doc.data().Author
            
                const outerSection = document.createElement("section")
                    outerSection.setAttribute("class", "kenniscentrum-artikel-section")
                    outerSection.setAttribute("data-title", title)
                const headerDiv = document.createElement("div")
                    headerDiv.setAttribute("class", "kenniscentrum-artikel-header")
                const headerImg = document.createElement("img")
                    headerImg.setAttribute("class", "header-image-article")
                const metaUserDiv = document.createElement("div")
                    metaUserDiv.setAttribute("class", "meta-user-div")
                const metaUserPhoto = document.createElement("img")
                const metaUserName = document.createElement("p")
                    metaUserName.setAttribute("id", "meta-user-name")
                const titleDiv = document.createElement("div")
                const titleH2 = document.createElement("h2")
                    titleH2.setAttribute("class", "titelTekst")
                const buttonDiv = document.createElement("button")
                    buttonDiv.setAttribute("class", "button-algemeen-card")
                    buttonDiv.setAttribute("onclick", "seeArticle(this)")
                const timestampP = document.createElement("p")
                    timestampP.setAttribute("class", "timestamp-p")
        
                headerImg.src = headerImage
                titleH2.innerHTML = title
                buttonDiv.innerHTML = `<a href="../Kenniscentrum-coaching/${title}.html">Bekijk</a>`
        
                addTimestamp(timestampP, timestamp)
                showAuthorOnPreview(author, metaUserPhoto, metaUserName, metaUserDiv)
        
                if(DOMarticle == null){
                    console.log("null")
                } else {
        
                    DOMarticle.appendChild(outerSection)
                    outerSection.appendChild(headerDiv)
                    headerDiv.appendChild(headerImg)
                    outerSection.appendChild(metaUserDiv)
                    metaUserDiv.appendChild(metaUserPhoto)
                    metaUserDiv.appendChild(metaUserName)
                    outerSection.appendChild(titleDiv)
                    titleDiv.appendChild(titleH2)
                    titleDiv.appendChild(timestampP)
                    outerSection.appendChild(buttonDiv)
                }
            })
        });
    };
        

// Individual article page

// Register view count on article load
!function registerViewOnLoad(){
    window.addEventListener("load", () => {

        db.collection("Kenniscentrum").where("Title", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                db.collection("Kenniscentrum").doc(doc.id).update({
                    Views: firebase.firestore.FieldValue.increment(1)
                }); 
            });
        });
    });
}();

function setMetaAttributesArticle(keywords, headerImage){
    const titleMeta = document.getElementById("page-title")
    const summaryMeta = document.getElementById("meta-description")
    const metaKeywords = document.getElementById("meta-keywords")
    const facebookDescription = document.getElementById("facebook-description")
    const facebookUrl = document.getElementById("facebook-url")
    const facebookTitle = document.getElementById("facebook-title")
    const facebookImg = document.getElementById("facebook-img")

    console.log(titleMeta)

    if(titleMeta != null || summaryMeta != null || metaKeywords != null || facebookDescription != null || facebookUrl != null || facebookTitle != null|| facebookImg != null){
       
        titleMeta.innerText = titel
        summaryMeta.content = titel
        metaKeywords.content = keywords
        facebookDescription.content = titel
        facebookUrl.content = window.location.href
        facebookTitle.content = titel
        facebookImg.content = headerImage

    };
};
    
function sanityTinyMCE(){

    const tinyMCEOuterDiv = document.getElementById("article-body-div")

    const spans = tinyMCEOuterDiv.querySelectorAll("span")
    const Ps = tinyMCEOuterDiv.querySelectorAll("P")
    const H2s = tinyMCEOuterDiv.querySelectorAll("h2")
    const lis = tinyMCEOuterDiv.querySelectorAll("li")
    const imgs = tinyMCEOuterDiv.querySelectorAll("img")

    const spanArray = Array.from(spans)

    spanArray.forEach(span => {

        span.style.fontSize = ""
        span.style.fontFamily = "Nunito Sans, sans-serif"
        span.style.letterSpacing = "1px"
        span.style.color = "#122b46"

    });

    const pArray = Array.from(Ps)

    pArray.forEach(p => {

        p.style.fontSize = "18px"
        p.style.fontFamily = "Nunito Sans, sans-serif"
        p.style.letterSpacing = "1px"
        p.style.width = "auto"
        p.style.marginTop = "0px"
    });

    const H2Array = Array.from(H2s)

    H2Array.forEach(H2 => {

        H2.style.fontSize = "20px"
        H2.style.fontFamily = "Nunito Sans, sans-serif"
        H2.style.letterSpacing = "1px"
        H2.style.textAlign = "left"
        H2.style.color = "#0c6665"
        H2.style.marginBottom = "0px"
        H2.style.width = "auto"

    });

    const liArray = Array.from(lis)

    liArray.forEach(li => {

        li.style.fontSize = "18px"
        li.style.fontFamily = "Nunito Sans, sans-serif"
        li.style.letterSpacing = "1px"
        li.style.textAlign = "left"
        li.style.width = "auto"
    });

    const imgsArray = Array.from(imgs)

    imgsArray.forEach(img => {

        img.style.borderRadius = "5px"
        img.style.width = "100% !important"
        img.style.height = "auto !important"
    });

};

function showEditIconAuthorAndAdmin(icon){

    auth.onAuthStateChanged(User =>{
        if(User){
        db.collection("Vitaminders").doc(User.uid).get().then(doc =>{

            const admin = doc.data().Admin
                        
                if(admin === "Yes"){
                    icon.style.display = "block"
                };
            });
        };
    });
};

!function editArticle(){
    const editIcon = document.getElementById("edit-div")
    const tinyMCEdiv = document.getElementById("tiny-mce-div")
    const articleBody = document.getElementById("article-body-div")

    showEditIconAuthorAndAdmin(editIcon)

    editIcon.addEventListener("click", () => {

        tinyMCEdiv.style.display = "block"
        articleBody.style.display = "none"

        db.collection("Kenniscentrum").where("Title", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const body = doc.data().Body

                setTimeout(() => { 
                    tinymce.get("tiny-mce").setContent(body);
                }, 1000);

            });
        });
    });
}();

!function saveEditedArticle(){
    
    const saveButton = document.getElementById("button-edited-article")

    saveButton.addEventListener("click", () => {

        saveButton.innerText = "Opgeslagen"

        const editedBody = tinymce.get("tiny-mce").getContent();

        db.collection("Kenniscentrum").where("Title", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                db.collection("Kenniscentrum").doc(doc.id).update({
                    Body: editedBody
                })
                .then(() => {
                    location.reload();
                });
            });
        });
    });
}();

function setH2HeadersInSummary(bodyText){

    const SubTitles = bodyText.querySelectorAll("h2")
    const summaryDiv = document.getElementById("paragraph-list")
    const ul = document.createElement("ul")

    const subtitleArray = Array.from(SubTitles)

    subtitleArray.forEach(title => {

        const summaryItem = document.createElement("li")
            summaryItem.setAttribute('class', 'summary-li')

        summaryItem.innerText = title.innerText

        summaryDiv.appendChild(ul)
        ul.appendChild(summaryItem)

        scrollToSummaryItem(summaryItem, title)
    });
};

function scrollToSummaryItem(summaryTitle, h2Title){

    summaryTitle.addEventListener("click", () => {

        h2Title.scrollIntoView()

    });
};

!function articleQuery(){

    const bodyDiv = document.getElementById("article-body-div")
    const metaUserPhoto = document.getElementById("author-photo")
    const metaUserName = document.getElementById("author-name")
    const authorDiv = document.getElementById("author-div")
    const title = document.getElementById("title-article")
    const headerDiv = document.getElementById("levensvraag-artikel-main-image")
    const headerImg = document.createElement("img")

    db.collection("Kenniscentrum").where("Title", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const titleArticle = doc.data().Title
            const headerImage = doc.data().HeaderImage
            const body = doc.data().Body
            const domain = doc.data().Domain
            const author = doc.data().Author
            const keywords = doc.data().Keywords

            title.innerHTML = titleArticle
            headerImg.src = headerImage

            headerDiv.appendChild(headerImg)

            bodyDiv.innerHTML = body

            // loadArticlesWithSameDomain(domain)
            showAuthorOnPreview(author, metaUserPhoto, metaUserName, authorDiv)
            setH2HeadersInSummary(bodyDiv)
            sanityTinyMCE()
            setMetaAttributesArticle(keywords, headerImage)
        });
    })
}();

// Follow coach

!function dataAttributeAuthorNameInFollowButton(){

    const followButton = document.getElementById("follow-author")

    db.collection("Kenniscentrum")
    .where("Title", "==", titel)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const author = doc.data().Author

            followButton.setAttribute("data-author", author)

        });
    })
    .then(() => {
        followUnfollowCoach()
    });
}();

function followUnfollowCoach(){

    const followButton = document.getElementById("follow-author")
    const coach = followButton.dataset.author

    console.log(coach)

    auth.onAuthStateChanged(User =>{
            if(User){
    db.collection("Vitaminders").doc(User.uid).get().then(doc =>{

                    const followers = doc.data().FavCoaches

                    // Hide follow for auth on his own profile
                    const auth = doc.data().Gebruikersnaam

                    if(auth == coach){
                            followButton.style.display = "none" 
                    }
    
                    followersArray = Array.from(followers)
    
                    if(followersArray.includes(coach)){
    
                            followButton.innerHTML = "Ontvolgen"
                            followButton.setAttribute("onclick", "unfollowCoach()")

                    };   
            });
    };
});
};

// Follow coach

function sendEmailNewFollower(gebruikersnaamFollower){

    const followButton = document.getElementById("follow-author")
    const coach = followButton.dataset.author

    db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
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

function followCoach(coach){

    const button = document.getElementById("follow-author")

    auth.onAuthStateChanged(User =>{
            if(User){
                    db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                            const gebruikersnaamCleanFollower = doc.data().GebruikersnaamClean
                    
                    db.collection("Vitaminders").doc(User.uid).update({
                            FavCoaches: firebase.firestore.FieldValue.arrayUnion(coach)
                    }).then(() => {
                            sendEmailNewFollower(gebruikersnaamCleanFollower, coach)
                    });
            });
                    button.innerHTML = "Volgend"
            } else {
                    const followMassageVisitor = document.getElementById("follow-massage-visitor")
                    followMassageVisitor.style.display = "flex"
                    button.style.display = "none"
            };
    });
};  

!function followButton(){
    const followButton = document.getElementById("follow-author")

            followButton.addEventListener("click", () => {

                const coach = followButton.dataset.author

                    followCoach(coach);
                    
    });
}();


// Unfollow coach
function unfollowCoach(){

    const followButton = document.getElementById("follow-author")
    const coach = followButton.dataset.author

    auth.onAuthStateChanged(User =>{
            if(User){
                    db.collection("Vitaminders").doc(User.uid).update({
                            FavCoaches: firebase.firestore.FieldValue.arrayRemove(coach)
                    }).then(() => {

                        followButton.innerHTML = "Ontvolgd"

                    });
            };
    });
};

// Add learning

!function fillGoalSelect(){

    const select = document.getElementById("goal-select")

    auth.onAuthStateChanged(User =>{
        if(User){
            db.collection("Vitaminders")
            .doc(User.uid)
            .collection("Coachgoals")
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const goalClean = doc.data().GoalClean

                    const option = document.createElement("option")

                    option.innerText = goalClean

                    select.appendChild(option)
                });
            });
        };
    });
}();

function articleMeta(DOCID, userName, userNameClean){

    db.collection("Kenniscentrum")
    .where("Title", "==", titel)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const author = doc.data().Author
            const authorClean = doc.data().AuthorClean

            saveLesson(DOCID, userName, userNameClean, author, authorClean, id)

        });
    });
};

!function displayCreateGoalMessageIfNoGoals(){

    const select = document.getElementById("goal-select")
    const selectDiv = document.getElementById("select-div")
    const saveButton = document.getElementById("save-learning")

    auth.onAuthStateChanged(User =>{
        if(User){
            db.collection("Vitaminders")
            .doc(User.uid)
            .get().then(doc => {

                const coachGoals = doc.data().CoachGoals
                const userName = doc.data().Gebruikersnaam
                const userNameClean = doc.data().GebruikersnaamClean

                const message = document.createElement("p")
                    message.setAttribute("id", "no-goal-meassage")

                    articleMeta(User.uid, userName, userNameClean)
                    hideNoAuthNoticeIfAuth()

                message.innerHTML = `Je hebt nog geen doel om je les aan te koppelen. Klik <u>hier</u> om direct een doel aan te maken.`

                if(coachGoals === undefined){

                    select.style.display = "none"
                    saveButton.style.display = "none"
                    selectDiv.appendChild(message)

                    createNexGoalDiv(message)
                    
                };
            });
        };
    });
}();

function hideNoAuthNoticeIfAuth(){

    const notice = document.getElementById("no-auth-notice")
    const learningDiv = document.getElementById("new-learning-div")

    notice.style.display = "none"
    learningDiv.style.display = "flex"

};

function saveLesson(DOCID, userName, userNameClean, coach, coachClean, id){

    const saveButton = document.getElementById("save-learning")

    saveButton.addEventListener("click", () => {

        const lesson = document.getElementById("learning-input").value
        const goalSelect = document.getElementById("goal-select")

        const option = goalSelect.options
        const selected = option[option.selectedIndex].innerHTML

        saveButton.innerText = "Opgeslagen"

        db.collectionGroup("Coachgoals")
        .where("GoalClean", "==", selected)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const idGoal = doc.data().ID

                db.collection("Vitaminders")
                .doc(DOCID)
                .collection("CoachLessons")
                .doc()
                .set({
                    Username: userName,
                    UserNameClean: userNameClean,
                    Lesson: lesson,
                    Coachgoal: selected,
                    ID: idGoal,
                    Source: titel,
                    Inspirator: coach,
                    InspiratorClean: coachClean,
                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                })
                .then(() => {
                    db.collection("Vitaminders")
                    .doc(DOCID)
                    .collection("CoachSocialWall")
                    .doc()
                    .set({
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        Username: userName,
                        UserNameClean: userNameClean,
                        Lesson: lesson,
                        Coachgoal: selected,
                        ID: idGoal,
                        Source: titel,
                        Inspirator: coach,
                        InspiratorClean: coachClean,
                        Type: "ArticleLesson"
                    });
                    })
                    .then(() => {
                        db.collection("Vitaminders")
                        .doc(DOCID)
                        .collection("Coachgoals")
                        .doc(doc.id)
                        .update({
                            LastActive:firebase.firestore.Timestamp.fromDate(new Date()),
                            Lessons: firebase.firestore.FieldValue.arrayUnion(lesson)
                        });
                    });
            });
        });
    });
};

function createNexGoalDiv(message){

    const createNewGoalModal = document.getElementById("create-goal-modal")

    closeModal(createNewGoalModal)

    message.addEventListener("click", () => {

        createNewGoalModal.style.display = "flex"

    });
};

function closeModal(modal){

    const closeModal = document.getElementById("close-modal")

    closeModal.addEventListener("click", () => {
        modal.style.display = "none"
    });
};

function coachMeta(coach, profilePhoto, coachName){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", coach)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const userNameClean = doc.data().GebruikersnaamClean
            const photo = doc.data().Profielfoto

            profilePhoto.src = photo
            coachName.innerText = userNameClean

        });
    });
};

function metaDivLinkToProfile(metaDiv, coachName){

    metaDiv.addEventListener("click", () => {
        window.open("../Vitaminders/" + coachName + ".html", "_self");
    });
};

!function learningsOverview(){

    const overview = document.getElementById("learnings-overiew")

    db.collectionGroup("CoachLessons")
    .where("Source", "==", titel)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const lesson = doc.data().Lesson
            const timestamp = doc.data().Timestamp
            const coach = doc.data().Username

            const title = document.createElement("h3")
            const lessonDiv = document.createElement("div")
                lessonDiv.setAttribute("class", "lesson-div")
            const metaDiv = document.createElement("div")
                metaDiv.setAttribute("class", "meta-div")
            const profilePhoto = document.createElement("img")
                profilePhoto.setAttribute("class", "profile-photo")
            const coachName = document.createElement("p")
                coachName.setAttribute("class", "coach-name")
            const lessonP = document.createElement("p")
                lessonP.setAttribute("class", "lesson-learning")
            const dateP = document.createElement("p")
                dateP.setAttribute("class", "timestamp-learning")

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);
            title.innerText = "Wat anderen over hun coachpraktijk hebben geleerd"
            coachMeta(coach, profilePhoto, coachName)
            lessonP.innerText = lesson

            metaDivLinkToProfile(metaDiv, coach)

            overview.appendChild(title)
            overview.appendChild(lessonDiv)
            lessonDiv.appendChild(metaDiv)
            metaDiv.appendChild(profilePhoto)
            metaDiv.appendChild(coachName)
            lessonDiv.appendChild(lessonP)
            lessonDiv.appendChild(dateP)

        });
    });
}();

!function saveNewGoal(){

    const saveButton = document.getElementById("save-new-goal")

    if(saveButton != null){

        saveButton.addEventListener("click", () => {

            const goalTitle = document.getElementById("new-goal-input").value
            const goalDescription = document.getElementById("new-goal-description").value

            saveButton.innerText = "Opgeslagen"

            auth.onAuthStateChanged(User =>{
                if(User){
                    db.collection("Vitaminders").doc(User.uid).get()
                    .then(doc => {

                        const auth = doc.data().Gebruikersnaam

                        db.collection("Vitaminders")
                        .doc(doc.id).collection("Coachgoals").doc()
                        .set({
                            Eigenaar: "Vitaminds",
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            LastActive: firebase.firestore.Timestamp.fromDate(new Date()),
                            Gebruikersnaam: auth,
                            Lessons: [],
                            Tips: [],
                            ID: idClean,
                            Goal: idClean + goalTitle,
                            GoalClean: goalTitle,
                            Omschrijving: goalDescription,
                            Openbaar: "public",
                            Type: "Coachgoal"
                        })
                        .then(() => {
                            db.collection("Vitaminders")
                            .doc(doc.id)
                            .update({
                                CoachGoals: firebase.firestore.FieldValue.increment(1)
                            }) 
                        })
                    });
                };
            });
        });
    };
}();
