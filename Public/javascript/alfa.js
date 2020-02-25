const home = document.getElementById("home");
const modal = document.getElementById("alfa-modal")

home.addEventListener( "click", () => {
    modal.style.display = "none"
})




function button(){

    const naam = document.getElementById("alfa-naam").value
const email = document.getElementById("alfa-mail").value
const bedankt = document.getElementById("alfa-bedankt")

    console.log("werkt")
db.collection("Alfa").doc().set({
    Naam: naam,
    Email: email
  })

console.log(bedankt)

  bedankt.style.display = "block"

}