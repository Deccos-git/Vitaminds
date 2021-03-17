
// Fetching title from url
const titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
const titelOne = titelhtml.replace('.html', '')
const titelTwo = titelOne.replace('%20',' ')
const titelThree = titelTwo.replace('%20',' ')
const titelFour = titelThree.replace('%20',' ')
const titelFive = titelFour.replace('%20',' ')
const titelSix = titelFive.replace('%20',' ')
const titelSeven = titelSix.replace('%20',' ')
const titelEight = titelSeven.replace('%20',' ')
const titelNine = titelEight.replace('%20',' ')
const titelTen = titelNine.replace('%20',' ')
const titelEleven = titelTen.replace('%20',' ')
const titelTwelve = titelEleven.replace('%20',' ')
const titel1 = titelTwelve.replace('%20',' ')
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

console.log(titel)

// Meta tags
!function setMetaAttributesArticle(){
    const titleMeta = document.getElementById("title-meta")
    const summaryMeta = document.getElementById("meta-description")
    const metaKeywords = document.getElementById("meta-keywords")
    const facebookDescription = document.getElementById("facebook-description")
    const facebookUrl = document.getElementById("facebook-url")
    const facebookTitle = document.getElementById("facebook-title")
    const facebookImg = document.getElementById("facebook-img")

    if(titleMeta != null || summaryMeta != null || metaKeywords != null || facebookDescription != null || facebookUrl != null || facebookTitle != null|| facebookImg != null){
       
        titleMeta.innerText = titel
        summaryMeta.content = titel
        metaKeywords.content = titel
        facebookDescription.content = titel
        facebookUrl.content = window.location.href
        facebookTitle.content = titel
    
        db.collection("Articles").where("Title", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                const headerImage = doc.data().HeaderImageSmall
    
                facebookImg.content = headerImage
            
            });
        });
    };
}();

// Register view count on article load
window.addEventListener("load", () => {

    db.collection("Articles").where("Title", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("Articles").doc(doc.id).update({
                Views: firebase.firestore.FieldValue.increment(1)
            }); 
        });
    });
});

// Article overview pagina

// Coach proposal

const authHeader = document.getElementById("titleSub-proposal")
const goalProposalOuterDiv = document.getElementById("goal-article-section-goal-proposal")

auth.onAuthStateChanged(User =>{
    if(User){
    db.collection("Vitaminders").doc(User.uid).get().then(function(doc) {

        const userType = doc.data().Usertype
        const nameClean = doc.data().GebruikersnaamClean

        if(userType == "Coach"){
            goalProposalOuterDiv.style.display = "flex"
            authHeader.innerText = `${nameClean},`
        };

    });
    };
});

!function loadAllArticlesOnPageLoad(){
    window.addEventListener("load", loadAllArticles)
}();

function showAuthorOnPreview(coachName, photo, userName, userDiv){

    db.collection("Vitaminders").where("Gebruikersnaam", "==", coachName)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const userClean = doc.data().GebruikersnaamClean
            const userPhoto = doc.data().Profielfoto

            if(userPhoto == undefined){
                photo.src = "images/dummy-profile-photo.jpeg"
            } else {
            photo.src = userPhoto
                    };
                    
            userName.innerHTML = userClean

            userDiv.addEventListener("click", () => {
                window.open("../Vitaminders/" + [coachName] + ".html", "_self");
            });

            photo.src = userPhoto
            userName.innerText = userClean

        });
    });
};


//Filter 

function loadAllArticles(){

DOMarticle = document.getElementById("levensvraag-artikel-ouyter-div")

db.collection("Articles").where("Owner", "==", "Vitaminds")
.orderBy("Timestamp", "desc")
.where("Status", "==", "Approved")
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Title
        const headerImage = doc.data().HeaderImage
        const headerImageSmall = doc.data().HeaderImageSmall
        const domain = doc.data().Domain
        const author = doc.data().Author
        const timestamp = doc.data().Timestamp
        const video = doc.data().Video
        const podcast = doc.data().Podcast
     
        const outerSection = document.createElement("section")
            outerSection.setAttribute("class", "levensvraag-artikel-section")
            outerSection.setAttribute("data-title", title)
        const headerDiv = document.createElement("div")
            headerDiv.setAttribute("class", "levensvraag-artikel-header")
        const headerImg = document.createElement("img")
            headerImg.setAttribute("class", "header-image-article")
        const metaUserDiv = document.createElement("div")
            metaUserDiv.setAttribute("class", "meta-user-div")
        const metaUserPhoto = document.createElement("img")
        const metaUserName = document.createElement("p")
            metaUserName.setAttribute("id", "meta-user-name")
        const titleDiv = document.createElement("div")
        const titleSub = document.createElement("h5")
            titleSub.setAttribute("class", "titleSub")
        const titleH2 = document.createElement("h2")
            titleH2.setAttribute("class", "titelTekst")
        const timestampP = document.createElement("p")
            timestampP.setAttribute("class", "timestamp-p")
        const buttonDiv = document.createElement("button")
            buttonDiv.setAttribute("class", "button-algemeen-card")
            buttonDiv.setAttribute("onclick", "seeArticle(this)")

        showAuthorOnPreview(author, metaUserPhoto, metaUserName, metaUserDiv)

        titleH2.innerHTML = title
        headerImg.src = headerImageSmall
        buttonDiv.innerHTML = `<a href="../Artikelen/${title}.html">Bekijk</a>`
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

        if(DOMarticle == null){

        } else {

        DOMarticle.appendChild(outerSection)
        outerSection.appendChild(headerDiv)
        outerSection.appendChild(metaUserDiv)
        metaUserDiv.appendChild(metaUserPhoto)
        metaUserDiv.appendChild(metaUserName)
        showMediaType(video, podcast, headerDiv, title)
        headerDiv.appendChild(headerImg)
        outerSection.appendChild(titleDiv)
        titleDiv.appendChild(titleSub)
        titleDiv.appendChild(titleH2)
        outerSection.appendChild(timestampP)
        outerSection.appendChild(buttonDiv)
        };
    });
});
};

function getDomain(){

const selectDomain = document.getElementById("inspiratie-filter-select")

    const option = selectDomain.options
    const selected = option[option.selectedIndex].innerHTML

DOMarticle = document.getElementById("levensvraag-artikel-ouyter-div")

DOMarticle.innerHTML = ""

const selectedClean = selected.split("<")

if(selectedClean[0] === "Alles"){
    loadAllArticles();
};

loadSelectedArticles(selectedClean[0])

};

function loadSelectedArticles(selectedArticle){
    db.collection("Articles").where("Domain", "==", selectedArticle)
    .orderBy("Timestamp", "desc")
    .where("Status", "==", "Approved")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
    
            const title = doc.data().Title
            const headerImage = doc.data().HeaderImage
            const headerImageSmall = doc.data().HeaderImageSmall
            const domain = doc.data().Domain
            const author = doc.data().Author
            const video = doc.data().Video
            const podcast = doc.data().Podcast
         
            const outerSection = document.createElement("section")
                outerSection.setAttribute("class", "levensvraag-artikel-section")
                outerSection.setAttribute("data-title", title)
            const headerDiv = document.createElement("div")
                headerDiv.setAttribute("class", "levensvraag-artikel-header")
            const headerImg = document.createElement("img")
                headerImg.setAttribute("class", "header-image-article")
            const metaUserDiv = document.createElement("div")
                metaUserDiv.setAttribute("class", "meta-user-div")
            const metaUserPhoto = document.createElement("img")
            const metaUserName = document.createElement("p")
                metaUserName.setAttribute("id", "meta-user-name")
            const titleDiv = document.createElement("div")
            const titleSub = document.createElement("h5")
                titleSub.setAttribute("class", "titleSub")
            const titleH2 = document.createElement("h2")
                titleH2.setAttribute("class", "titelTekst")
            const buttonDiv = document.createElement("button")
                buttonDiv.setAttribute("class", "button-algemeen-card")
                buttonDiv.setAttribute("onclick", "seeArticle(this)")
    
            showAuthorOnPreview(author, metaUserPhoto, metaUserName, metaUserDiv)
    
            titleH2.innerHTML = title
            headerImg.src = headerImageSmall
            buttonDiv.innerHTML = `<a href="../Artikelen/${title}.html">Bekijk</a>`
    
            if(DOMarticle == null){
                console.log("null")
            } else {
    
            DOMarticle.appendChild(outerSection)
            outerSection.appendChild(headerDiv)
            outerSection.appendChild(metaUserDiv)
            metaUserDiv.appendChild(metaUserPhoto)
            metaUserDiv.appendChild(metaUserName)
            headerDiv.appendChild(headerImg)
            showMediaType(video, podcast, headerDiv, title)
            outerSection.appendChild(titleDiv)
            titleDiv.appendChild(titleSub)
            titleDiv.appendChild(titleH2)
            outerSection.appendChild(buttonDiv)
            };
        });
    });
    };

function showMediaType(video, podcast, dom, title){

    const label = document.createElement("div")
        label.setAttribute("class", "mediatype-label")
    const labelImg = document.createElement("img")

    if(video === "Yes"){
        labelImg.src = "images/design/filmroll-icon.png"
    } else if (podcast === "Yes"){
        labelImg.src = "images/design/old-microphone-icon.png"
    } else {
        labelImg.src = "images/design/old-microphone-icon.png"
        labelImg.style.visibility = "hidden"
    }

    dom.appendChild(label)
    label.appendChild(labelImg)

    label.addEventListener("click", () => {
        window.open("../Artikelen/" + title + ".html", "_self");
        });
};

// Individual article page
    
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
            const auth = doc.data().Gebruikersnaam

                db.collection("Articles").where("Title", "==", titel)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const author = doc1.data().Author
                        
                        if(admin === "Yes"){
                            icon.style.display = "block"
                        };
                    });
                });
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

        db.collection("Articles").where("Title", "==", titel).get().then(querySnapshot => {
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

        db.collection("Articles").where("Title", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                db.collection("Articles").doc(doc.id).update({
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

    db.collection("Articles").where("Title", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const titleArticle = doc.data().Title
            const headerImage = doc.data().HeaderImage
            const body = doc.data().Body
            const domain = doc.data().Domain
            const author = doc.data().Author

            title.innerHTML = titleArticle
            headerImg.src = headerImage

            headerDiv.appendChild(headerImg)

            bodyDiv.innerHTML = body

            loadArticlesWithSameDomain(domain)
            showAuthorOnPreview(author, metaUserPhoto, metaUserName, authorDiv)
            setH2HeadersInSummary(bodyDiv)
            sanityTinyMCE()
        });
    })
}();

// Inspiratiepunt wegschrijven naar reactie en coach

function inspirerend(elem){
    const titelElem = elem.dataset.titel
    const body = elem.dataset.body
    const coach = elem.dataset.coach
   

   auth.onAuthStateChanged(User =>{
    userRef = db.collection("Vitaminders").doc(User.uid)
    userRef.get()
     .then(doc => {
             const naam = doc.data().Gebruikersnaam

        // Naar Coach
    db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            db.collection("Vitaminders").doc(doc.id).collection("Inspiration").doc().set({

                New: "Yes",
                Reciever: coach,
                Inspiration: body,
                Titel: titel,
                Source: titelElem,
                Giver: naam,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Type: "Insight"
            });

            // Naar insight
            db.collectionGroup("Insights").where("Titel", "==", titelElem).where("Auteur", "==", coach).get().then(querySnapshot => {
                querySnapshot.forEach(doc3 => {

                    console.log("test")

                    db.collection("Insights").doc(doc3.id).update({

                        Inspiratiepunten: firebase.firestore.FieldValue.increment(1)
        
                    });
                });
            });
        });
    });
});
}); 
};

// Create new lifelesson

!function routeSelectOfAuth(){

    const routeSelect = document.getElementById("route-select")
    const notice = document.getElementById("notice")
    const routeSelectDiv = document.getElementById("select-route-div")
    const saveLessonButton = document.getElementById("button-lifelesson")

    auth.onAuthStateChanged(User =>{
        if(User){
            db.collection("Vitaminders").doc(User.uid)
            .collection("Levensvragen")
            .get().then(querySnapshot =>{
                querySnapshot.forEach(doc => {

                    const routes = doc.data().LevensvraagClean

                    notice.style.display = "none"
                    routeSelectDiv.style.display = "flex"
                    saveLessonButton.style.display = "block"

                    const options = document.createElement("option")

                    options.innerText = routes

                    routeSelect.appendChild(options)

                });
            });
        };
    });
}();

!function saveLifeLesson(){

    const buttonLifelesson = document.getElementById("button-lifelesson")
    const notice = document.getElementById("notice")

            db.collection("Articles").where("Title", "==", titel).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const naam = doc.data().Author
            
                auth.onAuthStateChanged(User =>{
                    if(User){
                        const routeSelect = document.getElementById("route-select")

                        buttonLifelesson.addEventListener("click", () => {

                            const option = routeSelect.options

                            if(option.length === 0){
                                routeSelectDiv.style.display = "none"
                                buttonLifelesson.style.display = "none"
                                notice.style.display = "block"
                            };

                            const selected = option[option.selectedIndex].innerHTML
                
                            const lesson = document.getElementById("lifelesson-input").value

                          buttonLifelesson.innerText = "Opgeslagen"
                          buttonLifelesson.id = "Clicked"

                        db.collection("Vitaminders").doc(User.uid)
                        .get().then(doc1 => {

                            const auth = doc1.data().Gebruikersnaam

                            db.collection("Vitaminders").doc(User.uid)
                            .collection("Levensvragen")
                            .where("LevensvraagClean", "==", selected)
                            .get().then(querySnapshot => {
                                querySnapshot.forEach(doc2 => {

                                    const levensvraagID = doc2.data().Levensvraag
                                    const public = doc2.data().Openbaar

                                    let publicGoal = ""

                                    if(public === "Ja"){
                                        publicGoal = "Yes"
                                    } else if (public === "Nee"){
                                        publicGoal = "No"
                                    }
                        
                                    db.collection("Vitaminders").doc(User.uid)
                                    .collection("Levenslessen").doc().set({
                                        Auteur: naam,
                                        Gebruikersnaam: auth,
                                        Inspirerend: 0,
                                        Levensles: lesson,
                                        Levensvraag: levensvraagID,
                                        Public: publicGoal,
                                        Source: titel,
                                        Status: "Approved",
                                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                        Type: "Coach-inzicht"
                                    });
                                });
                            });
                        }); 
                    });
                } else {
                    buttonLifelesson.style.display = "none"
                    notice.style.display = "block"
                }
            });
        });
    });
}();

// Load lifelessons

function loadCreatorData(creatorName, innerSection){

    db.collection("Vitaminders").where("Gebruikersnaam", "==", creatorName)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const nameClean = doc.data().GebruikersnaamClean
            const photo = doc.data().Profielfoto

            const authDiv = document.createElement("div")
                authDiv.setAttribute("id", "auth-div-lifelessons")
            const photoImg = document.createElement("img")
            const nameP = document.createElement("p")

            photoImg.src = photo
            nameP.innerText = nameClean

            auth.onAuthStateChanged(User =>{
                if(User){

                    innerSection.appendChild(authDiv)
                    authDiv.appendChild(photoImg)
                    authDiv.appendChild(nameP)

                    authDiv.addEventListener("click", () => {
                        window.open("../Vitaminders/" + creatorName + ".html", "_self");
                    });
                };
            });
        });
    });
};

function loadLifeLessonsOfArticle(){

    const lifelessonsOuterDiv = document.getElementById("lifelessons-div")

    db.collectionGroup("Levenslessen")
    .where("Source", "==", titel)
    .where("Status", "==", "Approved")
    .where("Type", "==", "Coach-inzicht")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const lifelesson = doc.data().Levensles
            const route = doc.data().Levensvraag
            const timestamp = doc.data().Timestamp
            const creator = doc.data().Gebruikersnaam

            const innerDiv = document.createElement("div")
                innerDiv.setAttribute("class", "inner-div")
            const lifelessonP = document.createElement("p")
                lifelessonP.setAttribute("id", "lifelesson-p")
            const metaDiv = document.createElement("div")
                metaDiv.setAttribute("id", "meta-div")
            const timestampP = document.createElement("p")
           
            lifelessonP.innerText = lifelesson
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                                timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options)

            // Check if route is public
            db.collectionGroup("Levensvragen")
            .where("Levensvraag", "==", route)
            .where("Openbaar", "==", "Ja")
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
            
                    lifelessonsOuterDiv.appendChild(innerDiv)
                            
                    loadCreatorData(creator, innerDiv)

                    innerDiv.appendChild(metaDiv)
                    innerDiv.appendChild(lifelessonP)
                    metaDiv.appendChild(timestampP)

                });
            });
        });
    });
};

!function hideNoticeMakeAccountIfAuth(){

    const registerNoticeArticle = document.getElementById("register-notice-article")


    auth.onAuthStateChanged(User =>{
        if(User){

            registerNoticeArticle.style.display = "none"
            loadLifeLessonsOfArticle()
        };
    });
}();

// More inspiration

function loadArticlesWithSameDomain(articleDomain){

    const loadMoreOuterDiv = document.getElementById("more-inspiration")

    db.collection("Articles").where("Domain", "==", articleDomain)
    .where("Status", "==", "Approved")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
    
             const title = doc.data().Title
            const headerImage = doc.data().HeaderImage
            const headerImageSmall = doc.data().HeaderImageSmall
            const domain = doc.data().Domain
            const author = doc.data().Author
         
            const outerSection = document.createElement("section")
                outerSection.setAttribute("class", "levensvraag-artikel-section")
                outerSection.setAttribute("data-title", title)
            const headerDiv = document.createElement("div")
                headerDiv.setAttribute("class", "levensvraag-artikel-header")
            const headerImg = document.createElement("img")
                headerImg.setAttribute("class", "header-image-article")
            const metaUserDiv = document.createElement("div")
                metaUserDiv.setAttribute("class", "meta-user-div")
            const metaUserPhoto = document.createElement("img")
            const metaUserName = document.createElement("p")
                metaUserName.setAttribute("id", "meta-user-name")
            const titleDiv = document.createElement("div")
            const titleSub = document.createElement("h5")
                titleSub.setAttribute("class", "titleSub")
            const titleH2 = document.createElement("h2")
                titleH2.setAttribute("class", "titelTekst")
            const buttonDiv = document.createElement("button")
                buttonDiv.setAttribute("class", "button-algemeen-card")
                buttonDiv.setAttribute("onclick", "seeArticle(this)")
    
            showAuthorOnPreview(author, metaUserPhoto, metaUserName, metaUserDiv)
    
            titleH2.innerHTML = title
            headerImg.src = headerImageSmall
            buttonDiv.innerHTML = `<a href="../Artikelen/${title}.html">Bekijk</a>`
    
            if(loadMoreOuterDiv == null){
                console.log("null")
            } else {
    
            loadMoreOuterDiv.appendChild(outerSection)
            outerSection.appendChild(headerDiv)
            outerSection.appendChild(metaUserDiv)
            metaUserDiv.appendChild(metaUserPhoto)
            metaUserDiv.appendChild(metaUserName)
            headerDiv.appendChild(headerImg)
            outerSection.appendChild(titleDiv)
            titleDiv.appendChild(titleSub)
            titleDiv.appendChild(titleH2)
            outerSection.appendChild(buttonDiv)
            };
        });
    });
};

// Follow coach

!function dataAttributeAuthorNameInFollowButton(){

    const followButton = document.getElementById("follow-author")

    db.collection("Articles")
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

                    console.log(User.uid)
                    db.collection("Vitaminders").doc(User.uid).update({
                            FavCoaches: firebase.firestore.FieldValue.arrayRemove(coach)
                    }).then(() => {

                        followButton.innerHTML = "Ontvolgd"

                    });
            };
    });
};



    