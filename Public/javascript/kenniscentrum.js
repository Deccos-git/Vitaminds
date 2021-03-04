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
 titel = titel14.replace('%20',' ')
 
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

            title.innerHTML = titleArticle
            headerImg.src = headerImage

            headerDiv.appendChild(headerImg)

            bodyDiv.innerHTML = body

            // loadArticlesWithSameDomain(domain)
            showAuthorOnPreview(author, metaUserPhoto, metaUserName, authorDiv)
            setH2HeadersInSummary(bodyDiv)
            sanityTinyMCE()
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

                    console.log(User.uid)
                    db.collection("Vitaminders").doc(User.uid).update({
                            FavCoaches: firebase.firestore.FieldValue.arrayRemove(coach)
                    }).then(() => {

                        followButton.innerHTML = "Ontvolgd"

                    });
            };
    });
};
