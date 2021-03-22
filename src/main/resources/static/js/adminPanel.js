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
    roles = [];
}

const url_users = 'http://localhost:8080/adminAPI/list';
const url_roles = 'http://localhost:8080/adminAPI/roles';
const url_save_user = 'http://localhost:8080/adminAPI/saveUser';


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
        //добавляем все возможные роли в селект нового пользователя
        api.getRoles().then(roles_json=>{
            console.log(roles_json);
       let roles = $('#user_roles_new_user');
            $.each(roles_json, function(key, value) {
                roles.append('<option value="' + value.id + '">' + value.name.replaceAll("ROLE_", "") + '</option>');
            });
        })
    }


     //собираем нового пользователя и отправляем запрос на его создание кликом по кнопке с id= "button_new_user"
    $('#button_new_user').click(function () {
        let new_user = new User();

        //заполняем нового пользователя данными (у всех полей ввода на вкладке с id="newuser" атрибут class="form-control"
        $('#newuser .form-control').each(function (index, element) {
            new_user[element.name] = element.value;
        });
        new_user.id = 0;//поскольку новый , то id=0

       //получаем массив выбранных ролей и добавляем их новому пользователю
      let userRolesSelect = $('#user_roles_new_user');
      let selected_roles =  userRolesSelect.find('option:selected').map(function () {
            let role = new Role();
            role.id = $(this).val();
            role.name = "ROLE_"+ $(this).text();
            return role ;
        }).toArray();
        new_user.roles = selected_roles;

        //очищаем поля input  и селектора ролей
        //отправляем нового пользователя и обновляем таблицу пользователей
        api.saveUser(new_user).then(r =>{
            $('#newuser').find('input').val('');
            $('#user_roles_new_user').find('option').remove();
            updateUsers();
            $('#users').tab('show');
        });

     });


    updateUsers();

});
