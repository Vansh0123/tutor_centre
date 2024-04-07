// Assuming the JSON data is already parsed into a JavaScript object
const users = [
    {"name": "John Doe", "email": "john@example.com", "age": 30},
    {"name": "Jane Doe", "email": "jane@example.com", "age": 25},
    {"name": "Mike Smith", "email": "mike@example.com", "age": 28}
];

// Function to generate table from JSON data
function generateTableFromJSON(jsonData) {
    // Create table and table body elements
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    // Create header row
    const headerRow = document.createElement('tr');
    Object.keys(jsonData[0]).forEach(key => {
        const headerCell = document.createElement('th');
        headerCell.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize header
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // Populate the table with data
    jsonData.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(text => {
            const cell = document.createElement('td');
            cell.textContent = text;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });

    // Append the table body to the table and the table to the container
    table.appendChild(tableBody);
    document.getElementById('table-container').appendChild(table);

    // Optional: Add some basic styles to the table
    table.setAttribute('border', '1');
    table.setAttribute('cellspacing', '0');
    table.setAttribute('cellpadding', '5');
}

// Call the function with the JSON data
generateTableFromJSON(users);