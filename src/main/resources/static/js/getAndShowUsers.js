
let API =function (){
    return {
        getUsers: async function(){
            const url = 'http://localhost:8090/adminAPI/list';
            let users_json;
            let response = await fetch(url);

            if (response.ok) { // если HTTP-статус в диапазоне 200-299
                // получаем тело ответа (см. про этот метод ниже)
                users_json = await response.json();
                console.log(users_json);
                renderusers('body_users_table', users_json);
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
            return users_json;
        }
    }

}




// async function getAndShowUsers() {
//     const url = 'http://localhost:8090/adminAPI/list';
//     let response = await fetch(url);
//
//     if (response.ok) { // если HTTP-статус в диапазоне 200-299
//         // получаем тело ответа (см. про этот метод ниже)
//        let users_json = await response.json();
//         console.log(users_json);
//         renderusers('body_users_table', users_json);
//     } else {
//         alert("Ошибка HTTP: " + response.status);
//     }
//
// }

function renderusers(bodyUsersTable, jsonobj) {

    let tbody = document.getElementById(bodyUsersTable);
    //create row and column with data from user_json
    for (let i = 0; i < jsonobj.length; i++) {
        let row = document.createElement("TR");
        tbody.append(row);
        let td_id = document.createElement("TD");
        let td_firstName = document.createElement("TD");
        let td_lastName = document.createElement("TD");
        let td_age = document.createElement("TD");
        let td_email = document.createElement("TD");
        let td_role = document.createElement("TD");
        let td_edit_delete_buttons = document.createElement("TD");
        row.appendChild(td_id);
        row.appendChild(td_firstName);
        row.appendChild(td_lastName);
        row.appendChild(td_age);
        row.appendChild(td_email);
        row.appendChild(td_role);

        td_id.innerHTML = jsonobj[i].id.toString();
        td_firstName.innerHTML = jsonobj[i].firstName.toString();
        td_lastName.innerHTML = jsonobj[i].lastName.toString();
        td_age.innerHTML = jsonobj[i].age.toString();
        td_email.innerHTML = jsonobj[i].email.toString();
        let roles = jsonobj[i].authorities;
        let roles_string = "";
        for (let i = 0; i < roles.length; i++) {
            roles_string = roles_string + roles[i].name + " ";
        }
        roles_string = roles_string.replaceAll("ROLE_", "");
        td_role.innerHTML = roles_string;
        td_edit_delete_buttons.innerHTML = "<div class=\"row\">\n" +
            "                        <div class=\"col-small\">\n" +
            "                            <button onclick=\"getAndShowUser()\" type=\"button\" class=\"btn btn-info btn-sm ml-4 mr-2\">\n" +
            "                                Edit\n" +
            "                            </button>\n" +
            "                        </div>\n" +
            "                        <div class=\"col-small\">\n" +
            "                            <button  type=\"button\" class=\"btn btn-danger btn-sm\">\n" +
            "                                Delete\n" +
            "                            </button>\n" +
            "                        </div>\n" +
            "                    </div>"
        row.appendChild(td_edit_delete_buttons);
    }

}

// getAndShowUsers();
let api = API();
api.getUsers();