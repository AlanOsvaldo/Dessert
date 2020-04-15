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
firebase.analytics();
var db = firebase.firestore();

(function statusUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;

      if (!emailVerified) {
        window.location.href = "login.html";
      }
    } else {
      window.location.href = "login.html";
    }
  });
})();

let head = `<meta charset="utf-8" />
<link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
<link rel="icon" type="image/png" href="assets/img/favicon.png">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<title>
  Dessert
</title>
<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
<!--     Fonts and icons     -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
<!-- CSS Files -->
<link href="assets/css/bootstrap.min.css" rel="stylesheet" />
<link href="assets/css/now-ui-dashboard.css?v=1.5.0" rel="stylesheet" />
<!-- CSS Just for demo purpose, don't include it in your project -->
<link href="assets/demo/demo.css" rel="stylesheet" />
<link href="assets/css/style.css" rel="stylesheet" />
`;

document.head.innerHTML = head;

let tagScript = `<script src="assets/js/core/jquery.min.js"></script>
<script src="assets/js/core/popper.min.js"></script>
<script src="assets/js/core/bootstrap.min.js"></script>
<script src="assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
<!--  Google Maps Plugin    -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
<!-- Chart JS -->
<script src="assets/js/plugins/chartjs.min.js"></script>
<!--  Notifications Plugin    -->
<script src="assets/js/plugins/bootstrap-notify.js"></script>
<!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
<script src="assets/js/now-ui-dashboard.min.js?v=1.5.0" type="text/javascript"></script><!-- Now Ui Dashboard DEMO methods, don't include it in your project! -->
<script src="assets/demo/demo.js"></script>`;

document.body.insertAdjacentHTML = tagScript;

let sidebar = `<div class="sidebar" data-color="orange">
<!--
  Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
-->
<div class="logo">
    <a class="text-center simple-text logo-normal">Administrador</a>
</div>
<div class="sidebar-wrapper" id="sidebar-wrapper">
  <ul class="nav">
    <li id="cActive">
      <a href="comment.html">
        <i class="now-ui-icons ui-2_chat-round"></i>
        <p>Comments</p>
      </a>
    </li>
    <li id="dActive">
      <a href="dessert.html">
        <i class="now-ui-icons shopping_shop"></i>
        <p>Desserts</p>
      </a>
    </li>
  </ul>
</div>
</div>`;

document.getElementsByClassName('sidebar')[0].innerHTML = sidebar;

document.getElementsByClassName('navbar')[0].innerHTML = `<div class="container-fluid">
<div class="navbar-wrapper">
  <div class="navbar-toggle">
    <button type="button" class="navbar-toggler">
      <span class="navbar-toggler-bar bar1"></span>
      <span class="navbar-toggler-bar bar2"></span>
      <span class="navbar-toggler-bar bar3"></span>
    </button>
  </div>
  <a class="navbar-brand" href="#" id="placeID"></a>
</div>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-bar navbar-kebab"></span>
  <span class="navbar-toggler-bar navbar-kebab"></span>
  <span class="navbar-toggler-bar navbar-kebab"></span>
</button>
<div class="collapse navbar-collapse justify-content-end" id="navigation">
  <ul class="navbar-nav">
    <li class="nav-item">
      <a onclick="logOut()" class="nav-link" href="#">
        <i class="now-ui-icons users_single-02"></i>
        <p>
          <span class="d-lg-none d-md-block">Log Out</span>
        </p>
      </a>
    </li>
  </ul>
</div>
</div>`;

document.getElementById("footer").innerHTML = `<div class=" container-fluid ">
<nav>
  <ul>
    <li>
      <a href="https://www.creative-tim.com">
        Creative Tim
      </a>
    </li>
    <li>
      <a href="http://presentation.creative-tim.com">
        About Us
      </a>
    </li>
    <li>
      <a href="http://blog.creative-tim.com">
        Blog
      </a>
    </li>
  </ul>
</nav>
<div class="copyright" id="copyright">
  &copy; <script>
    document.getElementById('copyright').appendChild(document.createTextNode(new Date().getFullYear()))
  </script>, Designed by <a href="https://www.invisionapp.com" target="_blank">Invision</a>. Coded by <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a>.
</div>
</div>`;



function logOut() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
}