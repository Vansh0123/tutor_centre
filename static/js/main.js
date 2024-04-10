import { Connector } from "./connector.js";

async function makePage() {
  const cnx = new Connector("http://localhost:8000/tutoring");
  await cnx.getData("/search");
  createTableFromJson(cnx.data["user"]);
}

async function updateFeeStat(endpoint){
  var cnx = new Connector("http://localhost:8000/tutoring");
  await cnx.updateFeeStatus(endpoint);  
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
  jsonData.forEach((item, rowIndex) => {
    const row = document.createElement("tr");
    Object.keys(item).forEach((k) => {
      if (k != "ID" && k != "CreatedAt" && k != "UpdatedAt") {
        const cell = document.createElement("td");
        if (k=="FeeStatus"){
          const select = document.createElement("select");
          const options = ["PAID", "TBP", "NA"];
          options.forEach((optionValue) => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.text = optionValue;
            if (optionValue === item['FeeStatus']) {
              option.selected = true;
            }
            
            select.appendChild(option);
          });
          select.addEventListener('change', (event) => {
            handleSelectChange(event.target.value, rowIndex, k, item);
          });
          
          cell.appendChild(select);
        } 
        else{
          cell.textContent = item[k];
        }
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

function handleSelectChange(selectedValue, rowIndex, columnKey, item) {
  console.log(`Row ${rowIndex}, Column ${columnKey}, New Value: ${selectedValue}`);
  console.log(`/students/${item['Name']}/${selectedValue}`)
  updateFeeStat(`/students/${item['Name']}/feestatus/${selectedValue}`)
  // Implement your logic here, knowing exactly which select was changed
}

makePage();
