const jsonData = [
  {
    ID: "bc220d8c-2e3c-4979-9011-c968f68ecfce",
    CreatedAt: "2024-04-07T09:26:42.79351Z",
    UpdatedAt: "2024-04-07T09:26:42.79351Z",
    Name: "Anvesha",
    Subject: "Physics",
    Class: "12",
    Fees: 2800,
    FeeStatus: "PAID",
  },
  {
    ID: "bc220d8c-2e3c-4979-9011-c968f68ecfce",
    CreatedAt: "2024-04-07T09:26:42.79351Z",
    UpdatedAt: "2024-04-07T09:26:42.79351Z",
    Name: "Aarav",
    Subject: "Maths",
    Class: "8",
    Fees: 4200,
    FeeStatus: "PAID",
  },
];



function createTableFromJson(jsonData) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Create the header row
  const headerRow = document.createElement("tr");
  Object.keys(jsonData[0]).forEach((key) => {
    if (key != "ID" && key != "CreatedAt" && key != "UpdatedAt") {
      const headerCell = document.createElement("th");
      headerCell.textContent = key.toUpperCase();
      headerRow.appendChild(headerCell);
    }
  });
  thead.appendChild(headerRow);

  // Fill the table body with data rows
  jsonData.forEach((item) => {
    const row = document.createElement("tr");
    Object.keys(item).forEach((k) => {
      if (k != "ID" && k != "CreatedAt" && k != "UpdatedAt") {
        const cell = document.createElement("td");
        cell.textContent = item[k];
        row.appendChild(cell);
      }
    });

    tbody.appendChild(row);
  });

  // Append the header and body to the table
  table.appendChild(thead);
  table.appendChild(tbody);


  // Append the table to the container
  document.getElementById("table-container").appendChild(table);
}

createTableFromJson(jsonData);
