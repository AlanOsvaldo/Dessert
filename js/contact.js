$(document).ready(function () {

    (function ($) {
        "use strict";


        jQuery.validator.addMethod('answercheck', function (value, element) {
            return this.optional(element) || /^\bcat\b$/.test(value)
        }, "type the correct answer -_-");

        // validate contactForm form
        $(function () {
            $('#contactForm').validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    subject: {
                        required: true,
                        minlength: 4
                    },
                    number: {
                        required: true,
                        minlength: 5
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 20
                    }
                },
                messages: {
                    name: {
                        required: "come on, you have a name, don't you?",
                        minlength: "your name must consist of at least 2 characters"
                    },
                    subject: {
                        required: "come on, you have a subject, don't you?",
                        minlength: "your subject must consist of at least 4 characters"
                    },
                    number: {
                        required: "come on, you have a number, don't you?",
                        minlength: "your Number must consist of at least 5 characters"
                    },
                    email: {
                        required: "no email, no message"
                    },
                    message: {
                        required: "um...yea, you have to write something to send this form.",
                        minlength: "thats all? really?"
                    }
                },
                submitHandler: function (form) {

                }
            })
        })

    })(jQuery)

    $('#contactA').addClass('active');
});

function sendComment() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if(day < 10) {
        day = '0' + day;
    } 
     
    if(month<10) {
        month = '0' + month;
    }

    console.log(year + "/" + month + "/" + day);
    

    let comment = document.getElementById('message').value;
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;

    console.log(comment);

    if (comment != "" || name != "") {
        db.collection('comment').add({
            comment: comment,
            name: name,
            date: year + "/" + month + "/" + day,
            phone: phone,
            email: email
        }).then((docRef) => {
            Swal.fire("SEND", "The message sended", "success");
            document.getElementById('message').value = "";
            document.getElementById('name').value = "";
            document.getElementById('phone').value = "";
            document.getElementById('email').value = "";
        }).catch((error) => {
            Swal.fire("ERROR", "Send the message again", "error");
        });
    } else {
        Swal.fire("WARNING", "LLene all data", "warning");
    }

}

/* */