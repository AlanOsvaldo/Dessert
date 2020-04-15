$(document).ready(function () {

    $('#cActive').addClass("active");
    $('#placeID').text("COMMENT");

    (function () {
        let tabla = document.getElementById('table');
        db.collection("comment").orderBy("date", "asc").onSnapshot((querySnapshot) => {
            let i = 1;
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                tabla.innerHTML += `<tr>
                    <th scope="row">${i}</th>
                    <td>${doc.data().name}</td>
                    <td>${doc.data().comment}</td>
                    <td>${doc.data().date}</td>
                    <td class="text-center"><a onclick="readComment('${doc.data().name}','${doc.data().comment}','${doc.data().email}','${doc.data().phone}','${doc.data().date}')" href="#" style="color: #2CA8FF"><i class="material-icons">visibility</i></a></td>
                    <td class="text-center"><a onclick="deleteComment('${doc.id}')" href="#" style="color: #FF3636"><i class="material-icons">delete</i></a></td>
                    </tr>`;
                i++;
            });
        });

    })();

});

function readComment(name, comment, email, phone, date) {
    document.getElementById('rName').innerHTML = '<strong>' + name  + '</strong>';
    document.getElementById('rEmail').innerHTML = '<strong>Email: </strong>' + email;
    document.getElementById('rComment').textContent = comment;
    document.getElementById('rPhone').innerHTML = '<strong>Phone: </strong>' + phone;
    document.getElementById('rDate').innerHTML = '<strong>Date: </strong>' + date;
    $('#viewCommentModal').modal('show');
}

function deleteComment(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You will not recuperar the data!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '##F96332',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
            db.collection("comment").doc(id).delete().then(() => {
                sAlert("DELETED", "Comment delete", "success");
            }).catch((error) => {
                sAlert("ERROR", "error " + error, "error");
            });
        }
      });
    
}

function nSearch() {
    let name = document.getElementById("nSearch").value;
    db.collection('comment').where('name', '==', name).get().then((querySnapshot) => {
        console.log(querySnapshot);
        if (querySnapshot.empty == false) {
            let tabla = document.getElementById('table');
            let i = 1;
            tabla.innerHTML = '';
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                tabla.innerHTML += `<tr>
                    <th scope="row">${i}</th>
                    <td>${doc.data().name}</td>
                    <td>${doc.data().comment}</td>
                    <td class="text-right">${doc.data().date}</td>
                    <td><a onclick="readComment('${doc.id}')" href="#" style="color: #2CA8FF"><i class="material-icons">visibility</i></a></td>
                    <td><a onclick="deleteDessert('${doc.id}')" href="#" style="color: #FF3636"><i class="material-icons">delete</i></a></td>
                    </tr>`;
                i++;
            });
        } else {
            console.log("No such document!");
            sAlert("ERROR", "Don't exist this comment", "error");
        }
    }).catch((error) => {
        sAlert("ERROR", "Error in the query", "error");
        console.log("Error getting document:", error);
    });
}

function dSearch() {
    let date = document.getElementById("pSearch").value;
    db.collection('comment').where('date', '==', date).get().then((querySnapshot) => {
        console.log(querySnapshot);
        if (querySnapshot.empty == false) {
            let tabla = document.getElementById('table');
            let i = 1;
            tabla.innerHTML = '';
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                tabla.innerHTML += `<tr>
                    <th scope="row">${i}</th>
                    <td>${doc.data().name}</td>
                    <td>${doc.data().comment}</td>
                    <td class="text-right">${doc.data().date}</td>
                    <td><a onclick="readComment('${doc.id}')" href="#" style="color: #2CA8FF"><i class="material-icons">visibility</i></a></td>
                    <td><a onclick="deleteDessert('${doc.id}')" href="#" style="color: #FF3636"><i class="material-icons">delete</i></a></td>
                    </tr>`;
                i++;
            });
        } else {
            sAlert("ERROR", "Don't exist this comment", "error");
        }
    }).catch((error) => {
        sAlert("ERROR", "Error in the query", "error");
        console.log("Error getting document:", error);
    });
}

function sAlert(title, message, icon) {
    Swal.fire(title,message,icon);
}