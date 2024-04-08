import { Connector } from './connector.js';
 
  async function makePage() {
    const cnx = new Connector(
        "http://localhost:8000/tutoring"
      );
    await cnx.getData('/search');
    createTableFromJson(cnx.data['user'])
  }

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
makePage();
  
  