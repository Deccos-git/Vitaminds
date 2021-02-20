!function sendCoachCallRequest(){

    const button = document.getElementById("send-coachcall-form")

    if(button != null){

        button.addEventListener("click", () => {

            const name = document.getElementById("name").value
            const email = document.getElementById("email").value
            const phonenumber = document.getElementById("phonenumber").value

            button.innerText = "Verzonden"
            button.id = "clicked"

            db.collection("Mail").doc().set({
                to: "info@vitaminds.nu",
            message: {
            subject: `Aanvraag kennismakingsgesprek Vitaminds`,
            html: `Naam: ${name}</br>
                    Email: ${email}<br>
                    Telefoonnummer: ${phonenumber}<br>`,
            Type: "Coachcall",
            }
                    
            }).catch((err) => {
                console.log(err)
            });
        });
    };
}();

// Change layout for mobile
!function changeLayoutForMobileForCoaches(){

    const platformImage = document.getElementById("platform-img-coaches")
    const communityImage = document.getElementById("community-img-coaches")

    console.log("test")

    if (window.innerWidth < 938){
            platformImage.src = "images/design/Ipad-horizontal-for-coaches.png"
            communityImage.src = "images/design/Iphone-horizontal-for-coaches.png"
    };
}();
