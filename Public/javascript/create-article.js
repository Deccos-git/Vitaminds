function openTipsOverview(elem){

    const nextElement = elem.nextElementSibling
    
    if(nextElement.style.display === "block")
    nextElement.style.display = "none",
    elem.parentElement.style.width = "360px"
    else {
        nextElement.style.display = "block",
        elem.parentElement.style.width = "fit-content"
    };
};

function openTipDetails(elem){

    const nextElement = elem.parentElement.nextElementSibling

    if(nextElement.style.display === "block")
    nextElement.style.display = "none"
    else {
        nextElement.style.display = "block"
    };
};

function welcomeMessage(authUser){

    const welcomeMessageP = document.getElementById("auth-welcome")

    welcomeMessageP.innerHTML = `Hallo ${authUser},`

};

!function authQuery(){

    auth.onAuthStateChanged(User =>{
        if (User){
            const docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){

                    const auth = doc.data().GebruikersnaamClean

                    welcomeMessage(auth)

                });
            };
        });
}();

function newArticleSubmitButton(){

    const saveButton = document.getElementById("save-article-button")
    const title = document.getElementById("title-input").value
    const newBody = tinyMCE.get('tiny-mce').getContent()
    const domainSelectDiv = document.getElementById("theme-select")
    const inputs = domainSelectDiv.querySelectorAll("input")

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

                        db.collection("Articles").doc().set({
                            Author: auth,
                            Title: title,
                            Body: newBody,
                            Owner: "Vitaminds",
                            Status: "Draft",
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Inspiratiepunten: 1,
                            Domain: selectedInput
                        }).then(()=> {
                            sendMailToFollowers("Vitaminder", auth, authClean, title)
                            sendMailToFollowers("Coach", auth, authClean, title)
                        })
                    });
                };
            });
        };
    });
};

function sendMailToFollowers(type, auth, authClean, title){

    db.collection("Vitaminders")
    .where("Usertype", "==", type)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const favoriteCoaches = doc.data().FavCoaches
            const gebruikersnaamClean = doc.data().GebruikersnaamClean
            const gebruikersnaam = doc.data().Gebruikersnaam
            const email = doc.data().Email

                if(favoriteCoaches != undefined){
        
                if(favoriteCoaches.includes(auth)){

                    db.collection("Mail").doc().set({
                        to: email,
                        cc: "info@vitaminds.nu",
                    message: {
                    subject: `Je favoriete coach ${authClean} heeft een nieuw artikel geplaatst`,
                    html: `Hallo, ${gebruikersnaamClean}</br></br>
                    Je favoriete coach ${authClean} heeft een nieuw artikel geplaatst op Vitaminds<br><br>
                        
                        Bekijk het artikel <a href="https://vitaminds.nu/Artikelen/${title}.html"> hier </a>.<br><br> 
                    
                        Vriendelijke groet, </br></br>
                        Het Vitaminds Team </br></br>
                        <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
                    Type: "Vitaminders",
                    gebruikersnaam: gebruikersnaam
                    }
                            
                    }).catch((err) => {
                        console.log(err)
                    });
                };
            };
        });
    });
};
