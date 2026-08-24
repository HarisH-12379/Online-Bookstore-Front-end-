window.onload = () =>{
// user clikcs continue , all validation checks are ran
document.getElementById("Continue").addEventListener("click" , (e)=>{
e.preventDefault();

// 1 get user inputs
const c = (document.getElementById("cardNumber").value)
const m = Number(document.getElementById("expMonth").value)
const y = Number(document.getElementById("expYear").value)
const cvv = document.getElementById("CVV").value


// 2 validate inputs  = starts with prefix 51-55 
const c_reg = /^5[1-5][0-9]{14}$/;

if(!c.match(c_reg)){
    alert("Card Number must have 16 digits and start with 51 to 55.");
    location.reload();  // user must try again , reload the page
    return;

}


// validate expiry date , must be correct = compares with todays date 
const today = new Date();
const this_year = today.getFullYear();
const this_month = today.getMonth() + 1 ; // in JS goes from 0-11 and we need 12 
if(this_year>y || (this_year == y && this_month > m)) {
    alert("You card is expired! ");
    return;

}

// CVV validation , must be 3 or 4 digits
if (cvv.length != 3 && cvv.length != 4  ) {
    alert("CVV code must 3 or 4 digits")
    return;
}





// 3 send to server - sent this data in POST request
 const data = {
"master_card": Number(c), 
 "exp_year": y, 
 "exp_month": m, 
 "cvv_code": cvv 

 }


 const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard"

 // lecture 9 JS copy picture - sends to server with the inputted card details
fetch(url , {
    method: "post" ,  // sendimng data to server
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data) // convert JS to JSON
})

.then((response) => {
    if(response.status === 200){
        return response.json();        // successful conversion
    }else if(response.status === 400){
        throw "Bad data was sent to the server"; // failed conversion
    }else{
        throw "Something went wrong" + response.status; // else different errors may occur
    }
})

.then((resJson) => {
    alert(resJson.message);
    // if successful , go to success.html page to offer feedback
    window.location.href = "success.html?cardNumber="  + c;
})
.catch((error) => {
    alert(error);  // display at top page what error has occured with my displayed message
  })

 })

}
