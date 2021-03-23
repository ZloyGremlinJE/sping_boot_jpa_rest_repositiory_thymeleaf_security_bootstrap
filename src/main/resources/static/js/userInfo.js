let userAPI = function () {
    let url_user = 'http://localhost:8090/userAPI/getCurrentUser';
    return {
        getUser: async function () {
            let user_json;
            let response = await fetch(url_user);
            if (response.ok) {
                user_json = await response.json();
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
            return user_json;
        }
    }
};
let api = userAPI();


$(function () {
    function updateUser() {
        let tbody = $('#body_user_table');
        let head_text = $('#header_text');
        let roles_text;
        tbody.empty();
        api.getUser().then(user_json => {
            roles_text = user_json.roles.map(r => r.name).map(r => r.replaceAll("ROLE_", "")).join(' ');
            let tr = $('<tr/>')
                .append($('<td/>').text(user_json.id))
                .append($('<td/>').text(user_json.firstName))
                .append($('<td/>').text(user_json.lastName))
                .append($('<td/>').text(user_json.age))
                .append($('<td/>').text(user_json.email))
                .append($('<td/>').append($('<span/>').text(roles_text)));
            tbody.append(tr);
            head_text.text(user_json.email + " with roles: " + roles_text);
        });
    }

    updateUser();
});
