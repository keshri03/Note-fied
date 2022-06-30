//logout
var email;
function logout() {
    firebase.auth().signOut().then(() => {
        console.log("logout sucessful");
        return true
    }).catch((error) => {
        console.log("An error happened");
        return false;
    });
}
// getting current user
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        email = user.email;
        var name = user.displayNmae;
        if (name != null)
            document.getElementById("greeting").innerHTML = `welcome  ${name}`;
        else
            document.getElementById("greeting").innerHTML = `welcome  ${email}!!`;
        shownote();
    } else {
        console.log("no user");
    }
});

var finaltime, finaldate;
var timearr, datearr;
var flag;
//responsivness
var w = window.innerWidth;
var h = window.innerHeight;
if(w<500)
{
 console.log("small");
 var logo=document.getElementById("logo");
 logo.style.width="50px";
 logo.style.height="50px";
 logo.style.top="5%";
 logo.style.right="0%";
}
//displaying clock
setInterval(displayclock, 700);
function displayclock() {
    var time = new Date();
    var hrs = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    var month = time.getMonth();
    var year = time.getFullYear();
    var date = time.getDate();
    if (hrs < 10) {
        hrs = "0" + hrs;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    finaldate = date + "/" + (month + 1) + "/" + year;
    finaltime = hrs + ":" + min + ":" + sec;
    if(w>500){
    document.getElementById("clock").innerHTML = finaltime + " " + finaldate;
    }
}

// add note button
function addingnote() {
    var heading = document.getElementById("notetitle");
    var text = document.getElementById("notetext");
    if (heading.value == "") {
        alert("Nothing filled in title");
    }
    else if (text.value == "") {
        alert("Nothing filled in text area");
    }
    else {
        let notes = localStorage.getItem("notes");
        let title = localStorage.getItem("title");
        let time = localStorage.getItem("time");
        let date = localStorage.getItem("date");
        let user = localStorage.getItem("user");
        if (notes == null) {
            notesarr = [];
        }
        else {
            notesarr = JSON.parse(notes);
        }
        notesarr.push(text.value);
        localStorage.setItem("notes", JSON.stringify(notesarr));
        text.value = "";
        //console.log(notesarr);

        if (title == null) {
            titlearr = [];
        }
        else {
            titlearr = JSON.parse(title);
        }
        titlearr.push(heading.value);
        localStorage.setItem("title", JSON.stringify(titlearr));
        heading.value = "";
        //console.log(titlearr);

        if (time == null) {
            timearr = [];
        }
        else {
            timearr = JSON.parse(time);
        }
        if (date == null) {
            datearr = [];
        }
        else {
            datearr = JSON.parse(date);
        }
        timearr.push(finaltime);
        datearr.push(finaldate);
        localStorage.setItem("time", JSON.stringify(timearr));
        localStorage.setItem("date", JSON.stringify(datearr));
        //console.log(timearr);
        //console.log(datearr);
        if (user == null) {
            userarr = [];
        }
        else {
            userarr = JSON.parse(user);
        }
        userarr.push(email);
        localStorage.setItem("user", JSON.stringify(userarr));
        //console.log(userarr);
        shownote();
    }
}
//showing notes
function shownote() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    let time = localStorage.getItem("time");
    let date = localStorage.getItem("date");
    let user = localStorage.getItem("user");
    if (notes == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(notes);
    }
    if (title == null) {
        titlearr = [];
    }
    else {
        titlearr = JSON.parse(title);
    }
    if (time == null) {
        timearr = [];
    }
    else {
        timearr = JSON.parse(time);
    }
    if (date == null) {
        datearr = [];
    }
    else {
        datearr = JSON.parse(date);
    }
    if (user == null) {
        userarr = [];
    }
    else {
        userarr = JSON.parse(user);
    }

    let str1 = "";
    notesarr.forEach(function (element, index) {
        if (userarr[index] == email) {
            str1 += ` <div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title"> ${titlearr[index]}</h5><h6>${datearr[index] + "  " + timearr[index]}</h6><hr><p class="card-text"> ${element}</p><button onclick="editnote(${index})" class="btn btn-primary" id="Editbtn">Edit<button><button onclick="deletenote(${index})" class="btn btn-primary" id="Deletebtn">Delete<button></div></div> `;
        }

    });
    let notesele = document.getElementById("display");
    if (notesarr.length != 0 && str1.length != 0) {
        notesele.innerHTML = str1;
    }
    else {
        notesele.innerHTML = "No notes added. Please add some notes!"
    }
}
//deleting note
function deletenote(index) {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    let time = localStorage.getItem("time");
    let date = localStorage.getItem("date");
    let user =localStorage.getItem("user");
    if (notes == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(notes);
    }
    if (title == null) {
        titlearr = [];
    }
    else {
        titlearr = JSON.parse(title);
    }
    if (time == null) {
        timearr = [];
    }
    else {
        timearr = JSON.parse(time);
    }
    if (date == null) {
        datearr = [];
    }
    else {
        datearr = JSON.parse(date);
    }
    if(user== null)
    {
        userarr=[];
    }
    else{
        userarr =JSON.parse(user);
    }
    notesarr.splice(index, 1);
    titlearr.splice(index, 1);
    timearr.splice(index, 1);
    datearr.splice(index, 1);
    userarr.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesarr));
    localStorage.setItem("title", JSON.stringify(titlearr)); localStorage.setItem("time", JSON.stringify(timearr));
    localStorage.setItem("date", JSON.stringify(datearr));
    localStorage.setItem("user", JSON.stringify(userarr));
    shownote();
}

//editing the note
function editnote(index) {
    var repbtn = document.getElementById("replacebtn");
    repbtn.style.visibility = "visible";
    var addbtn = document.getElementById("Addbtn");
    addbtn.style.visibility = "hidden";
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    let time = localStorage.getItem("time");
    notesarr = JSON.parse(notes);
    titlearr = JSON.parse(title);
    timearr = JSON.parse(time);
    var heading = document.getElementById("notetitle");
    var text = document.getElementById("notetext");
    heading.value = `${titlearr[index]}`;
    text.value = `${notesarr[index]}`;
    flag = index;

}
function replacingnote() {
    var repbtn = document.getElementById("replacebtn");
    repbtn.style.visibility = "hidden";
    var addbtn = document.getElementById("Addbtn");
    addbtn.style.visibility = "visible";
    addingnote();
    deletenote(flag);

}
