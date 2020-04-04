$(document).ready(function () {

    $('#dActive').addClass("active");
    $('#placeID').text("DESSERT");

    (function () {
        let tabla = document.getElementById('table');
        db.collection("dessert").orderBy("name", "asc").onSnapshot((querySnapshot) => {
            let i = 1;
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                tabla.innerHTML += `<tr>
                    <th scope="row">${i}</th>
                    <td>${doc.data().name}</td>
                    <td>${doc.data().description}</td>
                    <td class="text-right">${doc.data().price}</td>
                    <td hidden><a href="#"><i class="material-icons">visibility</i></a></td>
                    <td><a onclick="updateDessert('${doc.id}','${doc.data().name}','${doc.data().price}','${doc.data().description}')" href="#" style="color: #2CA8FF"><i class="material-icons">cached</i></a></td>
                    <td><a onclick="deleteDessert('${doc.id}')" href="#" style="color: #FF3636"><i class="material-icons">delete</i></a></td>
                    </tr>`;
                i++;
            });
        });

    })();

});

function clean() {
    document.getElementById('name').value = "";
    document.getElementById('price').value = "";
    document.getElementById('description').value = "";
}

function saveDessert() {
    let button = document.getElementById('button');
    button.innerHTML = "Save";
    $('#dessertModal').modal('show');
    button.onclick = function () {
        let name = document.getElementById('name').value;
        let price = document.getElementById('price').value;
        let description = document.getElementById('description').value;

        console.log(name);

        db.collection("dessert").add({
            name: name,
            price: price,
            description: description
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            clean();
            $('#dessertModal').modal('hide');
            sAlert("SUCCESS", "Product saved!", "success")
        }).catch((error) => {
            console.error("Error adding document: ", error);
            sAlert("ERROR", "error " + error, "error");
        });
    }
}

function updateDessert(id, name, price, description) {
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('description').value = description;
    let button = document.getElementById('button');
    button.innerHTML = "Update";
    $('#dessertModal').modal('show');
    button.onclick = function () {

        let name = document.getElementById('name').value;
        let price = document.getElementById('price').value;
        let description = document.getElementById('description').value;

        console.log(name);

        db.collection("dessert").doc(id).update({
            name: name,
            price: price,
            description: description
        }).then(() => {
            console.log("Document written with ID: ");
            button.innerHTML = "Save";
            clean();
            $('#dessertModal').modal('hide');
            sAlert("SUCCESS", "Product updated!", "success")
        }).catch((error) => {
            console.error("Error adding document: ", error);
            sAlert("ERROR", "error " + error, "error");
        });
    }
}

function deleteDessert(id) {
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
            db.collection("dessert").doc(id).delete().then(() => {
                sAlert("DELETED", "Product delete", "success");
            }).catch((error) => {
                sAlert("ERROR", "error " + error, "error");
            });
        }
      });
    
}

function nSearch() {
    let name = document.getElementById("nSearch").value;
    db.collection('dessert').where('name', '==', name).get().then((querySnapshot) => {
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
                    <td>${doc.data().description}</td>
                    <td class="text-right">${doc.data().price}</td>
                    <td hidden><a href="#"><i class="material-icons">visibility</i></a></td>
                    <td><a onclick="updateDessert('${doc.id}','${doc.data().name}','${doc.data().price}','${doc.data().description}')" href="#" style="color: #2CA8FF"><i class="material-icons">cached</i></a></td>
                    <td><a onclick="deleteDessert('${doc.id}')" href="#" style="color: #FF3636"><i class="material-icons">delete</i></a></td>
                    </tr>`;
                i++;
            });
        } else {
            console.log("No such document!");
            sAlert("ERROR", "Don't exist this product", "error");
        }
    }).catch((error) => {
        sAlert("ERROR", "Error in the query", "error");
        console.log("Error getting document:", error);
    });
}

function pSearch() {
    let price = document.getElementById("pSearch").value;
    db.collection('dessert').where('price', '==', price).get().then((querySnapshot) => {
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
                    <td>${doc.data().description}</td>
                    <td class="text-right">${doc.data().price}</td>
                    <td hidden><a href="#"><i class="material-icons">visibility</i></a></td>
                    <td><a onclick="updateDessert('${doc.id}','${doc.data().name}','${doc.data().price}','${doc.data().description}')" href="#" style="color: #2CA8FF"><i class="material-icons">cached</i></a></td>
                    <td><a onclick="deleteDessert('${doc.id}')" href="#" style="color: #FF3636"><i class="material-icons">delete</i></a></td>
                    </tr>`;
                i++;
            });
        } else {
            sAlert("ERROR", "Don't exist this product", "error");
        }
    }).catch((error) => {
        sAlert("ERROR", "Error in the query", "error");
        console.log("Error getting document:", error);
    });
}

function sAlert(title, message, icon) {
    Swal.fire(title,message,icon);
}