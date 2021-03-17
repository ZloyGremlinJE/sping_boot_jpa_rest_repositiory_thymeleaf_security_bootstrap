async function getUser() {
    const url = 'http://localhost:8090/userAPI/getCurrentUser';
    let response = await fetch(url);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        jsonobj = await response.json();
        console.log(jsonobj);
        renderuser('test_table', jsonobj);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

}

function renderuser(tableID, jsonobj) {

    let tbody = document.getElementById('body_users_table');
    let row = document.createElement("TR");
    tbody.append(row);
    let td_id = document.createElement("TD");
    let td_firstName = document.createElement("TD");
    let td_lastName = document.createElement("TD");
    let td_age = document.createElement("TD");
    let td_email = document.createElement("TD");
    let td_role = document.createElement("TD");
    row.appendChild(td_id);
    row.appendChild(td_firstName);
    row.appendChild(td_lastName);
    row.appendChild(td_age);
    row.appendChild(td_email);
    row.appendChild(td_role);
    console.log(jsonobj.authorities);
    td_id.innerHTML = jsonobj.id.toString();
    td_firstName.innerHTML = jsonobj.firstName.toString();
    td_lastName.innerHTML = jsonobj.lastName.toString();
    td_age.innerHTML = jsonobj.age.toString();
    td_email.innerHTML = jsonobj.email.toString();
     let roles = jsonobj.authorities;
     let roles_string = "";
    for (let i = 0; i < roles.length; i++) {
        roles_string = roles_string + roles[i].name + " ";
    }
    console.log(roles_string);
    roles_string.replace(new RegExp("ROLE_",'g'),"");
    console.log(roles_string);
    td_role.innerHTML = roles_string;
}

getUser();

