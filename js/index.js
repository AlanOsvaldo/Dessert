$(document).ready(function () {
    $('#indexA').addClass('active');

    (() => {
        let menu = document.getElementById('menu');
        db.collection('dessert').orderBy("name", "desc").limit(4).onSnapshot((querySnapshot) => {
            menu.innerHTML = "";
            querySnapshot.forEach((doc) => {
                menu.innerHTML += `<div class="col-lg-6 col-md-6">
                <div class="single_delicious d-flex align-items-center">
                    <div class="thumb">
                        <img src="${doc.data().img}" alt="" width="100%" height="100%">
                    </div>
                    <div class="info">
                        <h3 class="text-justify">${doc.data().name}</h3>
                        <p class="text-justify">${doc.data().description}</p>
                        <span>$${doc.data().price}</span>
                    </div>
                </div>
            </div>`;
            });
        })
    })();

    (() => {
        let top2 = document.getElementById('top2');
        db.collection('dessert').limit(2).onSnapshot((querySnapshot) => {
            top2.innerHTML = "";
            querySnapshot.forEach((doc) => {
                top2.innerHTML += `<div class="Burger_President_here">
                <div class="single_Burger_President">
                    <div class="room_thumb">
                        <img src="${doc.data().img}" alt="">
                        <div class="room_heading d-flex justify-content-between align-items-center">
                            <div class="room_heading_inner">
                                <span>$${doc.data().price}</span>
                                <h3>${doc.data().name}</h3>
                                <p>${doc.data().description}</p>
                            </div>
    
                        </div>
                    </div>
                </div>`;
            });
        })
    })();

});

