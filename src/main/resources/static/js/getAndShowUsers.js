async function getAndShowUsers() {
    const url = 'http://localhost:8080/adminAPI/list';
    let response = await fetch(url);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        jsonobj = await response.json();
        console.log(jsonobj);
        renderusers('body_users_table', jsonobj);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

}

function renderusers(bodyUsersTable, jsonobj) {




}

getAndShowUsers();