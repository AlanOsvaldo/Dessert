// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

$(document).ready(function () {

    $('#dActive').addClass("active");
    $('#placeID').text("DESSERT");

    (function () {
        let tabla = document.getElementById('table');
        db.collection("dessert").orderBy("name", "asc").onSnapshot((querySnapshot) => {
            let i = 1;
            tabla.innerHTML = '';
            querySnapshot.forEach((doc) => {
                tabla.innerHTML += `<tr>
                    <th scope="row">${i}</th>
                    <td class="text-justify">${doc.data().name}</td>
                    <td class="text-right">$${doc.data().price}</td>
                    <td class="text-center"><a onclick="readDessert('${doc.data().name}','${doc.data().price}','${doc.data().description}', '${doc.data().img}')" href="#"><i class="material-icons">visibility</i></a></td>
                    <td class="text-center"><a onclick="updateDessert('${doc.id}','${doc.data().name}','${doc.data().price}','${doc.data().description}', '${doc.data().img}', '${doc.data().imgRef}')" href="#" style="color: #2CA8FF"><i class="material-icons">cached</i></a></td>
                    <td class="text-center"><a onclick="deleteDessert('${doc.id}')" href="#" style="color: #FF3636"><i class="material-icons">delete</i></a></td>
                    </tr>`;
                i++;
            });
        });
        closeLoad();
    })();

});

function clean() {
    document.getElementById('name').value = "";
    document.getElementById('price').value = "";
    document.getElementById('description').value = "";
    document.getElementById('img').value = null;
    let img = document.getElementById('imgPreview');
    img.innerHTML = "";
}

$('#img').on('change', () => {
    let img = ($('#img'))[0].files[0];
    if (img != null) {
        let imgCodified = URL.createObjectURL(img);
        let imgHTML = `<img src="${imgCodified}" width="100%" height="100px">`;
        $('#imgPreview').html(imgHTML);
    } else {
        $('#imgPreview').html("");
    }
});

function saveDessert() {

    clean();
    let button = document.getElementById('button');
    button.innerHTML = "Save";
    $('#dessertModal').modal('show');
    button.onclick = function () {

        let name = document.getElementById('name').value;
        let price = document.getElementById('price').value;
        let description = document.getElementById('description').value;
        let img = ($('#img'))[0].files[0];
        let date = new Date().toLocaleTimeString();

        if (name != "" && price != "" && description != "" && img != null) {

            if (img.type == "image/jpeg" || img.type == "image/png") {

                viewLoad();
                var storageRef = storage.ref('dessert/' + date + '-' + img.name);
                var uploadTask = storageRef.put(img);
                uploadTask.on('state_changed', function (snapshot) {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, (error) => {
                    closeLoad();
                    sAlert("ERROR", "error uploadTask tate_change: " + error, "error");
                    console.log(error);
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        db.collection("dessert").add({
                            name: name,
                            price: price,
                            description: description,
                            img: downloadURL,
                            imgRef: date + '-' + img.name
                        }).then((docRef) => {
                            console.log("Document written with ID: ", docRef.id);
                            clean();
                            $('#dessertModal').modal('hide');
                            closeLoad();
                            sAlert("SUCCESS", "Product saved!", "success");
                        }).catch((error) => {
                            console.error("Error adding document: ", error);
                            closeLoad();
                            sAlert("ERROR", "Didn't insert product, try again: " + error, "error");
                        });
                    });
                });
            } else {
                sAlert("WARNING", "Only image ", "warning");
            }
        } else {
            sAlert("WARNING", "Wirite all data", "warning");
        }

    }
}

function readDessert(name, price, description, img) {
    document.getElementById('rName').textContent = name;
    document.getElementById('rPrice').textContent = "$" + price;
    document.getElementById('rDescription').textContent = description;
    document.getElementById('rImg').src = img;
    $('#viewDessertModal').modal('show');

}

function updateDessert(id, name, price, description, img, imgRef) {

    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('description').value = description;
    let imgHTML = `<img src="${img}" width="100%" height="100px">`;
    $('#imgPreview').html(imgHTML);
    let button = document.getElementById('button');
    button.innerHTML = "Update";
    $('#dessertModal').modal('show');
    button.onclick = function () {

        let name = document.getElementById('name').value;
        let price = document.getElementById('price').value;
        let description = document.getElementById('description').value;
        let img = ($('#img'))[0].files[0];

        console.log(name);

        if (name != "" && price != "" && description != "" && img != null) {

            if (img.type == "image/jpeg" || img.type == "image/png") {

                viewLoad();
                console.log('imgRef => ' + imgRef)
                storage.ref('dessert/' + imgRef).delete().then(() => {
                    let date = new Date().toLocaleTimeString();
                    console.log('dessert/' + date + '-' + img.name);

                    var storageRef = storage.ref('dessert/' + date + '-' + img.name);
                    var uploadTask = storageRef.put(img);
                    uploadTask.on('state_changed', function (snapshot) {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                                break;
                        }
                    }, (error) => {
                        closeLoad();
                        console.log(error);
                        sAlert("ERROR", "Error uploadTask state_change: " + error, "error");
                    }, () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            db.collection("dessert").doc(id).update({
                                name: name,
                                price: price,
                                description: description,
                                img: downloadURL,
                                imgRef: date + '-' + img.name
                            }).then(() => {
                                console.log("Document written with ID: ");
                                button.innerHTML = "Save";
                                clean();
                                $('#dessertModal').modal('hide');
                                closeLoad();
                                sAlert("SUCCESS", "Product updated!", "success");
                            }).catch((error) => {
                                console.error("Error adding document: ", error);
                                closeLoad();
                                sAlert("ERROR", "error " + error, "error");
                            });
                        }).catch((error) => {
                            closeLoad();
                            sAlert("ERROR", "error the downloadURL" + error, "error");
                        });
                    });
                }).catch((error) => {
                    closeLoad();
                    console.log("Error deleted old img => " + error);
                    sAlert("ERROR", "Error deleted old img" + error, "error");
                });

            } else {
                sAlert("WARNING", "Only image ", "warning");
            }

        } else if (name != "" && price != "" && description != "" && img == null) {

            viewLoad();
            db.collection("dessert").doc(id).update({
                name: name,
                price: price,
                description: description
            }).then(() => {
                console.log("Document written with ID: ");
                button.innerHTML = "Save";
                clean();
                $('#dessertModal').modal('hide');
                closeLoad();
                sAlert("SUCCESS", "Product updated!", "success");
            }).catch((error) => {
                console.error("Error adding document: ", error);
                closeLoad();
                sAlert("ERROR", "error " + error, "error");
            });

        } else {
            sAlert("WARNING", "Wirite all data", "warning");
        }
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
            querySnapshot.forEach(function (doc) {
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
            querySnapshot.forEach(function (doc) {
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
    Swal.fire(title, message, icon);
}

function getDate() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    console.log(year + "/" + month + "/" + day);

    return year + "/" + month + "/" + day;
}

function closeLoad() {
    document.getElementById('spinnerContainer').style.visibility = 'hidden';
    document.getElementById('spinnerContainer').style.opacity = '0';
}

function viewLoad() {
    document.getElementById('spinnerContainer').style.visibility = 'visible';
    document.getElementById('spinnerContainer').style.opacity = '100';
}