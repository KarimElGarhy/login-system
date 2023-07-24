import './style.css'


/* Sign Up Page Var */
var newUserName = document.querySelector("#NewUserName")
var NewUserMail = document.querySelector("#NewUserMail")
var newUserPassword = document.querySelector("#newUserPassword")
var signUpBtn = document.querySelector("#signUpBtn")
var noteSignUp = document.querySelector("#notesForSingUp")


/* Sign In Page Var */

var userMail = document.querySelector("#userMail")
var userPassword = document.querySelector("#userPassword")
var singInBtn = document.querySelector("#singInBtn")
var singInNote = document.querySelector("#singInNote")

/* Home Var */
var homeHint = document.querySelector("#homeHint")
var logOutBtn = document.querySelector("#logOut")

/* Public */
getAllUsers()
var allUser ;
function getAllUsers(){
    if(localStorage.users != null){
        allUser = JSON.parse(localStorage.users);
    }else{
        allUser = []
    }
}


/* Sign In */
/* Home */

homePage()
function homePage(){
    if(window.location.pathname == "./home.html"){
        if(checkIfUserLoginIn()){
            homeHint.innerHTML = `Hello Mr ${allUser[currentUser].name} <br> and you mail is ${allUser[currentUser].mail}`
            logOutBtn.style.display="block"
            logOutBtn.addEventListener("click",function(){
                sessionStorage.clear();
                homeHint.innerHTML = `You log Out. you will return to sign in page.`;
                setTimeout(function () {
                    window.location.replace("./index.html")
                }, 3000);
            })
        }
        else{
            homeHint.innerHTML = `Sorry You Don't have Permission to Enter This site ! You wil return to sing in Page.`
            setTimeout(function () {
                window.location.replace("./index.html")
            }, 3000);
        }
    }
}

checkIfUserLoginIn()

var loginSession;
var currentUser;
function checkIfUserLoginIn(){
    if(sessionStorage.isLogin){
        currentUser = sessionStorage.currentUser
        return true ;
    }else{
        return false ; 
    }
}

function saveSessionForSignInUsers(){
    sessionStorage.setItem("isLogin", loginSession);
    sessionStorage.setItem("currentUser", currentUser);
}
function checkIfUserSaved(){
    if(allUser != []){
        var flag;
        for(var i = 0 ; i <allUser.length ; i++){
            if(allUser[i].mail == userMail.value && allUser[i].password == userPassword.value){
                flag = true;
                currentUser = i;
                break;
            }
        }
        if(flag){
            return true
        }else{
            return false
        }
    }
}
if(window.location.pathname== "./index.html"){
    singInBtn.addEventListener("click",function(){
        if(checkIfUserSaved()){
            singInNote.classList.replace("text-red-500","text-green-500");
            singInNote.innerHTML=`Successfully Sing in`;
            loginSession = true;
            saveSessionForSignInUsers();
                    setTimeout(function () {
                        window.location.replace("./home.html")
                    }, 3000);
        }else{
            singInNote.classList.replace("text-green-500","text-red-500");
            singInNote.innerHTML=`Not A user Please Sign Up!`
        }
    })
}


/* Sign UP */
function createUser(){
    var newUser ={
        name : newUserName.value,
        password : newUserPassword.value,
        mail : NewUserMail.value
    }
    allUser.push(newUser);
}

function saveOnLocalStorage(){
    localStorage.setItem("users",JSON.stringify(allUser))
}

function checkIfUserExiting(){
    var flag;
    for(var i = 0 ; i < allUser.length ; i++){
        if( allUser[i].mail.toLowerCase() == NewUserMail.value.toLowerCase() ){
            flag = true;
            break;
        }else{
            flag = false
        }
    }
    if(flag){
        return false
    }else{
        return true
    }
}

function checkUserMail(mail){
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(mail)
}

function checkInputNotEmpty(input,message){
    if(input.value == "" ){
        noteSignUp.innerHTML = message;
        return false;
    }else{
        return true;
    }
}

function checkAllInputs(){
    if(checkInputNotEmpty(newUserName,"Please Enter Your Name")&&
    checkInputNotEmpty(NewUserMail,"Please Enter Your Mail")&&
    checkInputNotEmpty(newUserPassword,"Please Enter You Password")){
        return true;
    }else{
        return false;
    }
}

function reset(){
    newUserName.value ="";
    newUserPassword.value ="";
    NewUserMail.value ="";
    noteSignUp.innerHTML ="";
}
if(window.location.pathname== "/signup.html"){
    signUpBtn.addEventListener("click",function(){
        if(checkAllInputs()){
            if(checkUserMail(NewUserMail.value)){
                if(checkIfUserExiting()){
                    createUser();
                    saveOnLocalStorage();
                    reset();
                    noteSignUp.classList.replace("text-red-600","text-green-500")
                    noteSignUp.innerHTML=`Thanks For Registration, you will Redirect to Sign In`;

                    setTimeout(function () {
                        window.location.replace("/index.html")
                    }, 3000);

                }else{
                    noteSignUp.innerHTML ="this user Already Exiting"
                }
            }
            else{
                noteSignUp.innerHTML ="Please Enter Valid Mail"
            }
        }
    })
}




