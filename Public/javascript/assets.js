const DOM = document.getElementsByClassName("footer");
const DOMArray = Array.from(DOM)

DOMArray.forEach( dom => {

    const logoDiv = document.createElement("div")
    const logo = document.createElement("img")
        logo.setAttribute("src", "../images/logo-footer.png")
        logo.setAttribute("alt", "logo-vitaminds")
    const subtitelDiv = document.createElement("div")
    const subtitel = document.createElement("p")
    const socialDiv = document.createElement("div")
    const facebook = document.createElement("img")
        facebook.setAttribute("src", "../images/Logo-facebook.png")
        facebook.setAttribute("alt", "facebook-Vitaminds")
        facebook.setAttribute("width", "50px")
    const youtube = document.createElement("img")
        youtube.setAttribute("src", "../images/Logo-youtube.png")
        youtube.setAttribute("alt", "youtube-Vitaminds")
        youtube.setAttribute("width", "50px")
    const action = document.createElement("div")
    const linkVM = document.createElement("a")
        linkVM.setAttribute("href", "RegisterVM.html")
    const actionVM = document.createElement("h6")
    const linkCH = document.createElement("a")
        linkCH.setAttribute("href", "RegisterCH.html")
    const actionCH = document.createElement("h6")
        
    subtitel.innerHTML = "Op avontuur in je eigen karakter"
    actionVM.innerHTML = "Begin je avontuur"
    actionCH.innerHTML = "Aanmelden als coach"

    dom.appendChild(logoDiv)
    logoDiv.appendChild(logo)
    dom.appendChild(subtitelDiv)
    subtitelDiv.appendChild(subtitel)
    dom.appendChild(socialDiv)
    socialDiv.appendChild(facebook)
    socialDiv.appendChild(youtube)
    dom.appendChild(action)
    action.appendChild(linkVM)
    linkVM.appendChild(actionVM)
    action.appendChild(linkCH)
    linkCH.appendChild(actionCH)
})

/* <footer class="footer">
    <div id="footer-logo">
      <img src="./images/logo.png" alt="logo-vitaminds" width="200px">
    </div>
    <div>
      <p>Op avontuur in je eigen karakter</p>
    </div>
    <div>
     <img src="images/Logo-facebook.png" alt="facebook-Vitaminds" width="50px"> 
     <img src="images/logo-youtube.png" alt="youtube-Vitaminds" width="50px">
    </div>
    <div>
     <a href="RegisterVM.html"><h6>Begin je avontuur</h6></a> 
     <a href="RegisterCH.html"><h6>Aanmelden als coach</h6></a> 
    </div>
  </footer> */