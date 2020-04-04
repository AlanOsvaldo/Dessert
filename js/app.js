document.getElementById('header').innerHTML = `<div class="header-area ">
<div id="sticky-header" class="main-header-area">
    <div class="container-fluid p-0">
        <div class="row align-items-center no-gutters">
            <div class="col-xl-5 col-lg-5">
                <div class="main-menu  d-none d-lg-block">
                    <nav>
                        <ul id="navigation">
                            <li><a class="active" href="index.html">home</a></li>
                            <li><a href="Menu.html">Menu</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="col-xl-2 col-lg-2">
                <div class="logo-img">
                    <a href="index.html">
                        <img src="img/logo.png" alt="">
                    </a>
                </div>
            </div>
            <div class="col-xl-5 col-lg-5 d-none d-lg-block">
                <div class="book_room">
                    <div class="socail_links">
                        <ul>
                            <li>
                                <a href="#">
                                    <i class="fa fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fa fa-facebook"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="book_btn d-none d-xl-block">
                        <a class="#" href="#">+10 367 453 7382</a>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mobile_menu d-block d-lg-none"></div>
            </div>
        </div>
    </div>
</div>
</div>`;

document.getElementById('footer').innerHTML = `<div class="footer_top">
<div class="container">
    <div class="row">
        <div class="col-xl-4 col-md-6 col-lg-4">
            <div class="footer_widget text-center ">
                <h3 class="footer_title pos_margin">
                        New York
                </h3>
                <p>5th flora, 700/D kings road, <br> 
                        green lane New York-1782 <br>
                        <a href="#">info@burger.com</a></p>
                <a class="number" href="#">+10 378 483 6782</a>

            </div>
        </div>
        <div class="col-xl-8 col-md-8 col-lg-8">
                <div class="footer_widget">
                        <h3 class="footer_title">
                                Stay Connected
                        </h3>
                        <form action="#" class="newsletter_form">
                            <input type="text" placeholder="Enter your mail">
                            <button type="submit">Sign Up</button>
                        </form>
                        <p class="newsletter_text">Stay connect with us to get exclusive offer!</p>
                    </div>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-4">
            <div class="socail_links text-center">
                    <ul>
                        <li>
                            <a href="#">
                                <i class="ti-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="ti-twitter-alt"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="ti-facebook"></i>
                            </a>
                        </li>
                    </ul>
                </div>
        </div>
    </div>
</div>
</div>
<div class="copy-right_text">
<div class="container">
    <div class="footer_border"></div>
    <div class="row">
        <div class="col-xl-12">
            <p class="copy_right text-center">
                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
            </p>
        </div>
    </div>
</div>
</div>`;

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
  //firebase.analytics();
  
  var db = firebase.firestore();
  //var storage = firebase.storage();