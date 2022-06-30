var w=window.innerWidth;
var h=window.innerHeight;
//responsive
if (w<400)
{
    var form1=document.getElementById("form1");
    var form2=document.getElementById("form2");
    var form3=document.getElementById("details");
    var form4=document.getElementById("mainbox");
    form1,form2,form3,form4.style.width="250px";
}
//sliding feature for forms
function showsignup() {
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    form1.style.left = "-50%";
    form2.style.left = "50%";

}
function loginshow() {
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    form1.style.left = "50%";
    form2.style.left = "200%";

}
function showdetails() {
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    var form3 = document.getElementById("details");
    form1.style.top = "200%";
    form2.style.top ="200%";
    form3.style.top = "50%";

}
function back() {
    var form1 = document.getElementById("form1");
    var form2 = document.getElementById("form2");
    var form3 = document.getElementById("details");
    form1.style.top = "50%";
    form2.style.top="50%";
    form3.style.top = "-50%";

}
//signup
var signupform = document.getElementById("form2");
signupform.addEventListener("submit", (e) => {

    e.preventDefault();
    var email = document.getElementById("signupemailid");
    var password = document.getElementById("signuppassword");
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then((userCredential) => {
        console.log(userCredential)
        var user = userCredential.user;
    })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(`error message: ${errorMessage}`);
        });
    password.value = "";
    email.value = "";
});
//login
function login()
{
    var email = document.getElementById("loginid");
    var password = document.getElementById("loginpassword");
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("user signed in");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error");
            alert(`error message: ${errorMessage}`);
        })
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      location.href="index2.html";
    } else {
        console.log("no user found");

    }
  });