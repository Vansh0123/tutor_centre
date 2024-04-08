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
    await cnx.fetchData(); // Fetch data from the server
    console.log(cnx.data);
  
    //const response = await cnx.postData("http://localhost:8080/tutoring/students", dataToPost);
    //console.log('Posted Data Response:', response);
  }
  
  performOperations();