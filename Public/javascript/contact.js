!function sendQuestion(){

        const button = document.getElementById("button-message")
        const notice = document.getElementById("contact-form-notice")

        button.addEventListener("click", () => {

                button.id = "send-question-button"
                button.innerText = "Verstuurd"
                notice.style.display = "block"

                const email = document.getElementById("email-input").value
                const question = document.getElementById("question-input").value
                const client = document.getElementById("name-input").value
                const phone = document.getElementById("phone-input").value

                questionMail(question, client, email, phone)

        });
}();

function questionMail(question, client, email, phone){

        db.collection("Mail").doc().set({
                to: "info@vitaminds.nu",
        message: {
        subject: `Nieuw bericht via contactformulier`,
        html: `Hallo, <br><br>
                Er is een nieuw bericht via het contactformulier: <br><br>
                
                <b>Vraag</b><br>
                ${question}<br><br>

                <b>Naam</b><br>
                ${client}<br><br>

                <b>Email</b><br>
                ${email}<br><br>

                <b>Telefoonnummer</b><br>
                ${phone}<br><br>

                Vriendelijke groet, <br></br>
                Het Vitaminds Team <br></br>
                <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
        Type: "Contactform"
        }        
    }); 
};