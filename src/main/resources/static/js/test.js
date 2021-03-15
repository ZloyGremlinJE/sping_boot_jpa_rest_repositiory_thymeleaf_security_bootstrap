async function test() {
    const url = 'http://localhost:8090/userrest/getUser';
    let response = await fetch(url);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await response.json();
        console.log(json);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

function addRow(tableID) {
    // Get a reference to the table
    const tableRef = document.getElementById(tableID);

    // Insert a row in the table at row index 0
    const newRow = tableRef.insertRow();

    // Insert a cell in the row at index 0
    let newCell = newRow.insertCell(0);

    // Append a text node to the cell
    let newText = document.createTextNode('New top row');
    newCell.appendChild(newText);
}

test();
addRow('test_table');

