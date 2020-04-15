$(document).ready(function () {
    $('#menuA').addClass('active');

    (() => {
        let table = document.getElementById('table');
        db.collection('dessert').onSnapshot((querySnapshot) => {
            table.innerHTML = "";
            querySnapshot.forEach((doc) => {
                table.innerHTML += `<tr>
                <td class="text-center"><a onclick="readDessert('${doc.data().name}','${doc.data().price}','${doc.data().description}', '${doc.data().img}')" href="#"><i class="fa fa-info"></i></a</td>
                <td class="text-justify">${doc.data().name}</td>
                <td class="text-center">..........................................................</td>
                <td class="text-right"><strong>$${doc.data().price}</strong></td>
            </tr>`;
            });
        });
    })();
});

function readDessert(name, price, description, img) {
    document.getElementById('rName').textContent = name;
    document.getElementById('rPrice').textContent = "$" + price;
    document.getElementById('rPrice').style.fontWeight = "bold"
    document.getElementById('rDescription').textContent = description;
    document.getElementById('rImg').src = img;
    $('#viewDessertModal').modal('show');
}