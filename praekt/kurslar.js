const tbody = document.querySelector(".m-row");
const add = document.querySelector(".add");
const img = document.querySelector(".img");
const nameInput = document.querySelector(".name");
const surname = document.querySelector(".surname");
const phone = document.querySelector(".phone");
const dateInput = document.querySelector(".date");
const update = document.querySelector(".update");

let editData = null;

add.addEventListener("click", () => {
    let newStudent = {
        "img": img.value,
        "name": nameInput.value,
        "surname": surname.value,
        "phone": phone.value,
        "date": dateInput.value
    };

    if (newStudent.name && newStudent.surname && newStudent.phone && newStudent.date) {
        fetch("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newStudent)
        })
        .then(res => res.json())
        .then(data => {
            getStudents();
            img.value = "";
            nameInput.value = "";
            surname.value = "";
            phone.value = "";
            dateInput.value = "";
        })
        .catch(error => console.log(error));
    } else {
        alert("Formani toldiring");
    }
});

window.addEventListener("load", () => {
    getStudents();
});

function getStudents() {
    tbody.innerHTML = "";
    fetch("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => innerStudent(data))
    .catch(error => console.log(error));
}

function innerStudent(data) {
    console.log(data);
    data.forEach(element => {
        tbody.innerHTML += `
            <div class="mein-card">
                <img src="${element.img}" alt="" class="logo">
                <h2 class="mein-name">${element.name} </h2>
                <h3 class="mein-text">Kurs davomiyligi: ${element.duration} oy</h3>
                <h3 class="mein-text">Kurs narxi: ${element.price}</h3>
                <button class="btn btn-danger" onclick="removeStudent(${element.id})">Delete</button>
                <button class="btn btn-info" onclick="getId(${element.id})">Edit</button>
            </div>
        `;
    });
}

function removeStudent(id) {
    fetch(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => getStudents())
    .catch(error => console.log(error));
}

function getId(id) {
    fetch(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course/${id}`, {
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        editData = data;
        img.value = data.img;
        nameInput.value = data.name;
        surname.value = data.surname;
        phone.value = data.phone;
        dateInput.value = data.date;
    })
    .catch(error => console.log(error));
}

update.addEventListener("click", () => {
    let newStudent = {
        "img": img.value,
        "name": nameInput.value,
        "surname": surname.value,
        "phone": phone.value,
        "date": dateInput.value,
        "id": editData.id
    };

    if (newStudent.name && newStudent.surname && newStudent.phone && newStudent.date) {
        fetch(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course/${editData.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newStudent)
        })
        .then(res => res.json())
        .then(data => {
            editData = null;
            getStudents();
            img.value = "";
            nameInput.value = "";
            surname.value = "";
            phone.value = "";
            dateInput.value = "";
        })
        .catch(error => console.log(error));
    } else {
        alert("Formani toldiring");
    }
});
