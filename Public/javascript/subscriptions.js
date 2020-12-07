const currentTeGoed = document.getElementById("up-to-date-gelukstegoed")
const amountArray = []
const plusMinusDiv = document.getElementById("plus-minus-div")

function overviewOfPlusMinus(timestampAction, productTitel, productPrice){

    const plusMinusInnerDiv = document.createElement("div")
        plusMinusInnerDiv.setAttribute("class", "plus-minus-inner-div")
    const date = document.createElement("p")
    const productDiv = document.createElement("div")
        productDiv.setAttribute("class", "product-div")
    const productTitle = document.createElement("p")
    const price = document.createElement("p")

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date.innerHTML = timestampAction.toDate().toLocaleDateString("nl-NL", options);
    productTitle.innerHTML = productTitel
    price.innerText = `€${productPrice}`

    plusMinusDiv.appendChild(plusMinusInnerDiv)
    plusMinusInnerDiv.appendChild(date)
    plusMinusInnerDiv.appendChild(productDiv)
    productDiv.appendChild(price)
    productDiv.appendChild(productTitle)
};

auth.onAuthStateChanged(User =>{
    db.collection("Vitaminders").doc(User.uid)
    .collection("Gelukstegoed")
    .orderBy("Timestamp", "desc")
    .get().then(querySnapshot =>{
        querySnapshot.forEach(doc =>{ 

            let amount = doc.data().Amount
            const type = doc.data().Type
            const timestamp = doc.data().Timestamp
            const productTitle = doc.data().Product

            if(type === "Minus"){
                amount *= -1

            amountArray.push(amount)
            overviewOfPlusMinus(timestamp, productTitle, amount)

        } else if (type === "Plus"){

            amountArray.push(amount)
            overviewOfPlusMinus(timestamp, productTitle, amount)
        }

        });
    }).then(() => {
        sum = amountArray.reduce((pv, cv) => pv + cv, 0);

           currentTeGoed.innerText = `€${sum}`
    });
});