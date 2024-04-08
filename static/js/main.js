import { Connector } from './connector.js';

const cnx = new Connector(
    "http://localhost:8080/tutoring/search"
  );
  
//   // Data to be posted
//   const dataToPost = {
//       name: 'Rian',
//       subject: 'CS',
//       class: "7",
//       fees: 2500,
//       fee_status: 'TBP'
//     };
  
  async function performOperations() {
    await cnx.fetchData();
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
  
  performOperations();
  console.log(cnx.data)
 // createTableFromJson(jsonData);
  
  