// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBs6ySu3ut5-paTRqRuwfHoEGS9yYoNS_w",
    authDomain: "dessert-7fce1.firebaseapp.com",
    databaseURL: "https://dessert-7fce1.firebaseio.com",
    projectId: "dessert-7fce1",
    storageBucket: "dessert-7fce1.appspot.com",
    messagingSenderId: "364085455444",
    appId: "1:364085455444:web:5cf4797debb28e1f699bc1",
    measurementId: "G-WWT7FMWXFJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

(function statusUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;

            if (emailVerified) {
                window.location.href = "comment.html";
            } else {
                sAlert("Verefication requerid", "You must verify your email", "warning");
            }
            // ...
        } else {
            // User is signed out.
            // ...
        }
    });
})();

// Show/hide password onClick of button using Javascript only

// https://stackoverflow.com/questions/31224651/show-hide-password-onclick-of-button-using-javascript-only

function show() {
    var p = document.getElementById('pwd');
    document.getElementById('eye').textContent = "visibility_off";
    p.setAttribute('type', 'text');
}

function hide() {
    var p = document.getElementById('pwd');
    document.getElementById('eye').textContent = "visibility";
    p.setAttribute('type', 'password');
}

var pwShown = 0;

document.getElementById("eye").addEventListener("click", function () {
    if (pwShown == 0) {
        pwShown = 1;
        show();
    } else {
        pwShown = 0;
        hide();
    }
}, false);

function logIn() {
    let email = document.getElementById('email').value;
    let password = document.getElementById("password").value;

    if (email == "") {
        sAlert('Insert Email!', "The email is empty", "warning");
    } else if (password == "") {
        sAlert("Insert Password", "The password is empty", "warning");
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            sAlert("ERROR", "Error : " + errorMessage, "error");
            // ...
        });
    }
}

function forgotPassword() {
    let content = document.getElementById('content');

    content.innerHTML = `<div class="con">
    <!--     Start  header Content  -->
    <header class="head-form">
        <h2>Forgot Password</h2>
        <!--     A welcome message or an explanation of the login form -->
    </header>
    <!--     End  header Content  -->
    <br>
    <div class="field-set">

        <!--   user name -->
        <span class="input-item">
            <span class="material-icons">
                email
            </span>
        </span>
        <!--   user name Input-->
        <input class="form-input" id="email" type="email" placeholder="@UserName" required>

        <br>
        <!--        buttons -->
    </div>

    <!--   other buttons -->
    <div class="other">
        <!--      Forgot Password button-->
        <button id="btnFP" class="btn sign-up">Send Email</button>
    </div>

    <!--   End Conrainer  -->
</div>`;
    let btn = document.getElementById('btnFP');
    btn.onclick = () => {
        let email = document.getElementById('email').value;

        firebase.auth().sendPasswordResetEmail(email).then(function () {
            // Email sent.
            sAlert("SEND!", "Check your email to change your password", "success");
            setTimeout((function () {
                location.reload();
            }), 700);
        }).catch(function (error) {
            // An error happened.
            sAlert("ERROR", "Try again, error: " + error, "error");
        });
    }
}


/*function logUp() {
    firebase.auth().createUserWithEmailAndPassword("ing.alan.mayorga@gmail.com", "qwerty123").then(() => {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function () {
            sAlert("Send Email!", "Verify your email!", "success");
        }).catch(function (error) {
            sAlert("Error", "Error send email verification", "error");
        });
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}
logUp();*/

function sAlert(title, text, icon) {
    Swal.fire(
        title,
        text,
        icon
    );
}