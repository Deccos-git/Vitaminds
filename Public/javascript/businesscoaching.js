!function sendIntroMail(){

    const button = document.getElementById("button-intro")
    const notice = document.getElementById("intro-notice")
    const form = document.getElementById("contact-form")

    button.addEventListener("click", () => {

        button.innerText = "Verstuurd"
        button.style.display = "none"
        form.style.display = "none"
        notice.style.display = "flex"

        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value

        introMail(name, email, phone)


    });
}();

function introMail(name, email, phone){

    db.collection("Mail").doc().set({
        to: "info@vitaminds.nu",
        message: {
        subject: `Nieuwe aanvraag businesscoaching`,
        html: `Hallo Gijs, </br></br>
            Je hebt een nieuwe aanvraag businesscoaching.<br><br>
            
            Naam: ${name}<br>
            Email: ${email}<br>
            Telefoon: ${phone}<br><br>
  
            Vriendelijke groet, </br></br>
            Het Vitaminds Team </br></br>
            <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
        Gebruikersnaam: name,
        Emailadres: email,
        Type: "Intro"
          }     
      });
};