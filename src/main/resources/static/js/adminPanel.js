class Role {
    id;
    name;
}

class User {
    id;
    firstName;
    lastName;
    age;
    email;
    password;
    arr_roles = [];
}

const url_users = 'http://localhost:8090/adminAPI/list';
const url_roles = 'http://localhost:8090/adminAPI/roles';
const url_save_user = 'http://localhost:8090/adminAPI/saveUser';


let adminAPI = function () {

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
        },

        getRoles: async function () {
            let roles_json;
            let response = await fetch(url_roles);
            if (response.ok) {
                roles_json = await response.json();
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
            return roles_json;
        },


        saveUser: async function (user) {
            let response = await fetch(url_save_user, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                let result = await response;
            } else {
                alert("Ошибка HTTP: " + response.status);
            }

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
            console.log(users_json);
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
                    );
                tbody.append(tr);
            }
        });

        api.getRoles().then(roles_json=>{
            console.log(roles_json);

        })
    }

    $('#button_new_user').click(function () {
        let new_user = new User();

        let role_admin = new Role();
        role_admin.id = 1;
        role_admin.name = "ROLE_ADMIN";

        let role_user = new Role();
        role_user.id = 2;
        role_user.name = "ROLE_USER";

        new_user.arr_roles.push(role_admin, role_user);

        $('#newuser .form-control').each(function (index, element) {
            new_user[element.name] = element.value;
        });
        new_user.id = 0;
        console.log(new_user);
    });


    updateUsers();

});
