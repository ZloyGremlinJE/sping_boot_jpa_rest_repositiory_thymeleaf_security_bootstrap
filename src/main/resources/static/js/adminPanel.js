// $(function () {
//     let user_json;
//     const url_user = 'http://localhost:8080/userAPI/getCurrentUser';
//
//     async function getAndShowUser() {
//         let response = await fetch(url_user);
//         if (response.ok) { // если HTTP-статус в диапазоне 200-299
//             // получаем тело ответа (см. про этот метод ниже)
//             user_json = await response.json();
//             console.log(user_json);
//             renderuser('body_user_table', user_json);
//         } else {
//             alert("Ошибка HTTP: " + response.status);
//         }
//     }
//
//     function renderuser(tableUserBody, jsonobj) {
//
//         let tbody = document.getElementById(tableUserBody);
//         let row = document.createElement("TR");
//         tbody.append(row);
//         let td_id = document.createElement("TD");
//         let td_firstName = document.createElement("TD");
//         let td_lastName = document.createElement("TD");
//         let td_age = document.createElement("TD");
//         let td_email = document.createElement("TD");
//         let td_role = document.createElement("TD");
//         row.appendChild(td_id);
//         row.appendChild(td_firstName);
//         row.appendChild(td_lastName);
//         row.appendChild(td_age);
//         row.appendChild(td_email);
//         row.appendChild(td_role);
//         console.log(jsonobj.authorities);
//         td_id.innerHTML = jsonobj.id.toString();
//         td_firstName.innerHTML = jsonobj.firstName.toString();
//         td_lastName.innerHTML = jsonobj.lastName.toString();
//         td_age.innerHTML = jsonobj.age.toString();
//         td_email.innerHTML = jsonobj.email.toString();
//         let roles = jsonobj.authorities;
//         let roles_string = "";
//         for (let i = 0; i < roles.length; i++) {
//             roles_string = roles_string + roles[i].name + " ";
//         }
//         roles_string = roles_string.replaceAll("ROLE_", "");
//         td_role.innerHTML = roles_string;
//         let header = document.getElementById('header_text');
//         header.innerHTML = jsonobj.email.toString() + " with roles: " + roles_string;
//         let btn = document.getElementById('btest');
//         btn.setAttribute('data-test', JSON.stringify(jsonobj));
//     }
//
//     $(document).on('show.bs.modal', '#updateModal', function (e) {
//         document.getElementById("roles").options.length = 0;
//         let jsonstring = e.relatedTarget.dataset.test;
//         let jsonobject = JSON.parse(jsonstring);
//         console.log(jsonstring);
//         // $(“h3”) – получить все <h3> элементы
//         // $(“div#content .photo”) – получить все элементы с классом =”photo” которые находятся в элементе div с id=”content”
//         // $("#yes div.wrapper p").addClass("newClassName");
//         // Этот код получает любой p-тег в любом div с классом "wrapper", который находится в элементе с идентификатором "yes".
//
//
//         let input_modal = $("div.modal-body  .form-control");
//         input_modal.eq(0).val(jsonobject.id);
//         input_modal.eq(1).val(jsonobject.firstName);
//         input_modal.eq(2).val(jsonobject.lastName);
//         input_modal.eq(3).val(jsonobject.age);
//         input_modal.eq(4).val(jsonobject.email);
//         let roles = jsonobject.roles;
//         input_modal.eq(6).append($("<option>").text(roles[0].name).val(roles[0].name));
//
//     })
//
//     getAndShowUser();
//
// });

let adminAPI = function () {
    let url_users = 'http://localhost:8080/adminAPI/list';
    return {
        getUsers: async function () {
            let users_json;
            let response = await fetch(url_users);
            if (response.ok) {
                users_json = await response.json();
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
            return users_json;
        }
    }
};


$(function () {
    let api = adminAPI();

    function updateUsers() {
        let tbody = $('#body_users_table');
        let roles_text;
        tbody.empty();
        api.getUsers().then(users_json => {
            for (let i = 0; i < users_json.length; i++) {
                roles_text = users_json[i].roles.map(r => r.name).map(r => r.replaceAll("ROLE_", "")).join(' ');
                let tr = $('<tr/>')
                    .append($('<td/>').text(users_json[i].id))
                    .append($('<td/>').text(users_json[i].firstName))
                    .append($('<td/>').text(users_json[i].lastName))
                    .append($('<td/>').text(users_json[i].age))
                    .append($('<td/>').text(users_json[i].email))
                    .append($('<td/>').append($('<span/>').text(roles_text)))
                    .append($('<td/>')
                        .append('<button type="button" class="btn btn-info btn-sm ml-4 mr-2" data-toggle="modal" data-target="#updateModal">Edit</button>')
                        .append('<button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteModal">Delete</button>')
                    )
                ;


                tbody.append(tr);
            }
        });
    }




    updateUsers();
});
