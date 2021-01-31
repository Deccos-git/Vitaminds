// Check in

function installTool(button, toolName){

    const installButton = document.getElementById(button)
    const notice = document.getElementById("tool-notice-check-in")

    if(installButton != null){

        installButton.addEventListener("click", () => {

            installButton.innerText = "Geïnstalleerd"

            auth.onAuthStateChanged(User =>{
            db.collection("Vitaminders").doc(User.uid)
            .get()
                .then(doc => {
                    const naam = doc.data().Gebruikersnaam

                    notice.innerHTML =  `Je vindt deze tool in het prive gedeelte van je <a href="/Vitaminders/${naam}">account</a> onder Tools`

                    db.collection("Vitaminders")
                    .doc(doc.id)
                    .update({
                        Tools: firebase.firestore.FieldValue.arrayUnion(toolName)
                    });
                });
            }); 
        });
    };
};

installTool("install-check-in-button", "Check in")
installTool("install-happiness-button", "Happiness Chart")
installTool("install-gratitude-button", "Gratitude Journal")

function changeButtonIfToolIsInstalled(toolButton, toolNotice, tool){

    const button = document.getElementById(toolButton)
    const notice = document.getElementById(toolNotice)

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid)
        .get()
            .then(doc => {
                const tools = doc.data().Tools
                const naam = doc.data().Gebruikersnaam

                if(tools.includes(tool)){

                    button.innerText = "Geinstalleerd"
                    notice.innerHTML = `Je vindt deze tool in het prive gedeelte van je <a href="/Vitaminders/${naam}">account</a> onder Tools`

                }
            });
        });
};

changeButtonIfToolIsInstalled("install-gratitude-button", "tool-notice-gratitude", "Gratitude Journal")
changeButtonIfToolIsInstalled("install-check-in-button", "tool-notice-check-in", "Check in")
changeButtonIfToolIsInstalled("install-happiness-button", "tool-notice-happiness", "Happiness Chart")

!function showNoticeForVisitors(){

    const noticeText = document.getElementsByClassName("tool-notice")
    const installButton = document.getElementsByClassName("button-tools")

    console.log("tets")

    auth.onAuthStateChanged(User =>{
        if(User){
       
        } else {

            const noticeArray = Array.from(noticeText)

            noticeArray.forEach(notice => {
                notice.innerHTML = "Maak een gratis <u>ontwikkelomgeving</u> aan om deze tool te kunnen installeren"

                notice.addEventListener("click", () => {
                    window.open("../Register.html", "_self");
                });
            });
            buttonArray= Array.from(installButton)

                buttonArray.forEach(button => {
                    button.style.display = "none"
            });
        };
    });
}();




